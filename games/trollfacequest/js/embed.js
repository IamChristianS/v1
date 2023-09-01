var Embed = {
	embedId: $('.embed-code:first'),
	ruffleCreated: false,
	init: function(){
		Embed.pushEmbedCode();
		Embed.resetReplayButton();
		Embed.scaleFlashPlayer();
		Embed.activePopup();
	},
	pushEmbedCode: function(){
		if(FlashDetect.installed && (GAME.reqEmulator == null || GAME.reqEmulator == 'ruffle')){
			$('.loader-box').hide();
			var code = '';
				if(GAME.extension == 'HTML' || GAME.extension == 'HTML5'){
					code = '<iframe src="'+ GAME.src +'" width="100%" height="100%" scrolling="no" frameborder="0" marginheight="0" marginwidth="0" webkitAllowFullScreen="webkitAllowFullScreen" mozallowfullscreen="mozallowfullscreen" allowFullScreen="allowFullScreen"></iframe>';
					Embed.embedId.html(code);
				}else if(GAME.extension == 'SWF'){
					var srcFile = GAME.src;
						try{
							var f = JSON.parse(GAME.src);
								if(f.flash != undefined && f.flash != null){
									srcFile = f.flash;
								}
						}
						catch(e){
							console.log(e);
						}
						code = '<object id="FlashObject" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" width="100%" height="100%">';
						code += '<param name="movie" value="'+ srcFile +'?at='+ GAME.updatedAt +'"/>';
						code += '<param name="quality" value="high"/>';
						code += '<param name="bgcolor" value="#000000"/>';
						code += GAME.paramOptionsCode;
						code += '<embed src="'+ srcFile +'?at='+ GAME.updatedAt +'"'+GAME.embedOptionsCode+' bgcolor="#000000" width="100%" height="100%" allowfullscreen="true" quality="high" type="application/x-shockwave-flash"'; 
						code += 'pluginspage="http://www.macromedia.com/go/getflashplayer"/>';
						code += '</object>';
						Embed.embedId.html(code);
				}else if(GAME.extension == 'UNITY3D'){
					code = '<object id="UnityObject" classid="clsid:444785F1-DE89-4295-863A-D46C3A781394" width="100%" height="100%" ';
					code += 'codebase="http://webplayer.unity3d.com/download_webplayer/UnityWebPlayer.cab#version=2,0,0,0">';
					code += '<param name="quality" value="high"/>';
					code += '<param name="bgcolor" value="#000000"/>';
					code += GAME.paramOptionsCode;
					code += '<param name="'+ GAME.src +'" value="'+ GAME.src +'?at='+ GAME.updatedAt +'" />';
					code += '<embed src="'+ GAME.src +'?at='+ GAME.updatedAt +'"'+GAME.embedOptionsCode+' width="100%" height="100%" type="application/vnd.unity"  pluginspage="http://www.unity3d.com/unity-web-player-2.x" />';
					code += '</object>';
					Embed.embedId.html(code);
				}else if(GAME.extension == 'DCR'){
					code = '<object id="DcrObject" classid="clsid:166B1BCA-3F9C-11CF-8075-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/director/sw.cab#version=8,5,1,0" width="100%" height="100%" >';
					code += '<param name="src" value="'+ GAME.src +'?at='+ GAME.updatedAt +'">';
					code += '<param name="quality" value="high"/>'; 
					code += '<param name="bgcolor" value="#000000"/>';
					code += GAME.paramOptionsCode;
					code += '<embed src="'+ GAME.src +'?at='+ GAME.updatedAt +'"'+GAME.embedOptionsCode+' bgcolor="#000000" width="100%" height="100%" type="application/x-director" pluginspage="http://www.macromedia.com/shockwave/download/"/>';
					code += '</object>';
					Embed.embedId.html(code);
				}else if(GAME.extension == '_blank'){	
					code = '<div class="info-error-box" style="background: linear-gradient(90deg, #4b6cb7 0%, #182848 100%)">';
					code += '<div class="warning-content">';
					code += GAME.name;
					code += '<div class="game-box"><img class="fs-thumb-img" src="'+ GAME.image +'"/></div>';
					code += '<a class="playnow play_in_newtab" href="'+ GAME.src +'" target="_blank">'+langs.play_now+'</a> <span style="font:Italic 11px/14px Arial">('+ langs.new_window +')</span> <br />';
					code += '</div></div>';
					Embed.embedId.html(code);
					$('.info-error-box').show();
				}else if(GAME.extension == 'POPUP'){
					code = '<div class="info-error-box" style="background: linear-gradient(90deg, #4b6cb7 0%, #182848 100%)">';	
					code += '<div class="warning-content">';	
					code += GAME.name;
					code += '<div class="game-box"><img class="fs-thumb-img" src="'+ GAME.image +'"/></div>';	
					code += '<a id="play_popup_game" class="playnow" data-file="'+ GAME.src +'" data-name="'+GAME.name+'" data-width="'+ GAME.width +'" data-height="'+ GAME.height+'">'+langs.play_now+'</a> <span style="font:Italic 11px/14px Arial">('+ langs.new_window +')</span> <br />';
					code += '</div></div>';	
					Embed.embedId.html(code);
					Embed.activePopup();
					$('.info-error-box').show();
				}else{
					$('.loader-box').hide();
					$('.info-error-box').show();
				}
		}else{
			if(GAME.playable == 0 && GAME.avm != 0){
				$('.loader-box').hide();
				$('.info-error-box').show();
			}else if(GAME.extension == 'HTML' || GAME.extension == 'HTML5'){
				Embed.embedId.html('<iframe src="'+ GAME.src +'" width="100%" height="100%" scrolling="no" frameborder="0" marginheight="0" marginwidth="0" webkitAllowFullScreen="webkitAllowFullScreen" mozallowfullscreen="mozallowfullscreen" allowFullScreen="allowFullScreen"></iframe>');
			}else{
				if(GAME.extension == 'SWF' && GAME.fileType == 1){
					$('.loader-box').show();
					Embed.ruffleCreate();
				}else{
					$('.loader-box').hide();
					$('.info-error-box').show();
				}
			}
		}
	},
	ruffleCreate: function(){
		var ruffleCounter = 0;
		var ruffleInterval = setInterval(function(){			
			if(typeof(window.RufflePlayer) != 'undefined' && typeof(window.RufflePlayer.newest) == 'function' && Embed.ruffleCreated == false){
				Embed.ruffleCreated = true;
				var ruffle = window.RufflePlayer.newest();
				var player = ruffle.createPlayer();
					Embed.embedId.get(0).appendChild(player);
					player.load({url: GAME.src, allowScriptAccess: true})
						.then(() => {
							var metadataConter = 0;
							var metadataInterval = setInterval(function(){
								if(player.metadata != null && typeof(player.metadata) != 'undefined'){
									if(player.metadata != null && player.metadata.isActionScript3 == true){									
										console.info("AMV2");
										$('.loader-box').hide();
										/* Force */
										if(GAME.playable != 1){
											$('.info-error-box').show();
										}
										if(GAME.avm == 0){
											Embed.updateGameAVM(2, player.metadata.width, player.metadata.height);
										}
									};
									/* Send result to client */
									if(player.metadata != null && !player.metadata.isActionScript3){
										console.info("AMV1");
										player.style.width = '100%';
										player.style.height = '100%';
										$('.loader-box').hide();
										if(GAME.avm == 0){
											Embed.updateGameAVM(1, player.metadata.width, player.metadata.height);
										}
									};
									clearInterval(metadataInterval);
								}	
								if(metadataConter > 50){
									clearInterval(metadataInterval);
								}
								metadataConter++;
							}, 100);
							console.info("Ruffle successfully loaded the file");
						}).catch((e) => {
							if(typeof(error) != 'undefined'){
								error(player);
							}
							console.error('Ruffle failed to load the file: '+ e);
						});
					clearInterval(ruffleInterval);
			}	
			if(ruffleCounter > 100){
				clearInterval(ruffleInterval);
			}
			ruffleCounter++;
		}, 100);
	},
	updateGameAVM: function(avm, width, height){
		var _csrfToken = $('meta[name="csrf-token"]').attr('content');
			$.post(settings.baseUrl+ 'api/update/avm', {
				'_token'   : _csrfToken, 
				game_slug  : GAME.slug, 
				game_width : width, 
				game_height: height, 
				avm: avm
			}, function(res){ alert(res);
				if(res != 1){
					console.log('Update AVM failed! AVM: ', avm, ' / width: '+width, ' / height: '+height);
				}else{
					console.log('Update AVM successfull! AVM: ', avm, ' / width: '+width, ' / height: '+height);
				}
			});
	},
	popupwindow: function(url, title, w, h) {
		var left = (screen.width/2)-(w/2);
		var top = (screen.height/2)-(h/2);			
			window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
	},	
	clickCounter: 0,
	activePopup: function(){
		var popup = $('#play_popup_game'),
			gameFile = popup.data('file');
			popup.unbind('click');
			popup.bind('click', function(){
				Embed.clickCounter++;
				if(Embed.clickCounter > 1){
					var _this = popup.get(0);
						_this.href = gameFile;
						_this.target = '_blank';
				}else{					
					var gameName = popup.data('name'),
						gameWidth = parseInt(popup.data('width')),
						gameHeight = parseInt(popup.data('height'));
						Embed.popupwindow(gameFile, gameName, gameWidth, gameHeight);
				};
				setTimeout(function(){ Embed.clickCounter = 0; }, 5 * 1000);
			});
	},
	resetReplayButton: function(){
		$('.playnow').click(function(){
			$(this).html(langs.loading);
			var counter = 1;
			var pti = setInterval(function(){
				$('.playnow').html(langs.loading + '('+counter+')');
				if(counter > 15){
					$('.playnow').html(langs.play_now);
					clearInterval(pti);
				}
				counter++;
			}, 200);
		});
	},
	scaleFlashPlayer: function(){
		if(GAME.resizable == 0){
			var playId = $('#flash_player_no_resizable');
			var playHeight = $(window).height(),
				playWidth = (playHeight/GAME.height) * GAME.width;
				if(playWidth > $(window).width()){
					playWidth = $(window).width();
					playHeight = (playWidth/GAME.width) * GAME.height;
				} 
			var marginTop = ($(window).height() - playHeight)/2,
				mt = (marginTop < 0) ? 0 : marginTop;
			var marginLeft = ($(window).width() - playWidth)/2,
				ml = (marginLeft < 0) ? 0 : marginLeft;
				playId.css({marginTop: mt +'px', marginLeft: ml +'px', width: playWidth + 'px', height: playHeight + 'px', float: 'left'});
				console.log('Margin top of game: ', mt + 'px');
		}
	},
	getOSName: function() {
		var userAgent = window.navigator.userAgent,
			platform = window.navigator.platform,
			macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
			windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
			iosPlatforms = ['iPhone', 'iPad', 'iPod'],
			os = null;

		if (macosPlatforms.indexOf(platform) !== -1) {
			os = 'macos';
		} else if (iosPlatforms.indexOf(platform) !== -1) {
			os = 'ios';
		} else if (windowsPlatforms.indexOf(platform) !== -1) {
			os = 'windows';
		} else if (/Android/.test(userAgent)) {
			os = 'android';
		} else if (/Linux/.test(platform)) {
			os = 'linux';
		};
		return os;
	}
};

$(document).ready(function(){
	Embed.init();
});