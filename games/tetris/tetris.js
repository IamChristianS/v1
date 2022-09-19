/**
 * @license Tetris v1.0.0 08/04/2014
 * http://www.xarg.org/project/tetris/
 *
 * Copyright (c) 2014, Robert Eisele (robert@xarg.org)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 **/

(function(window) {

    var document = window['document'];
    var location = window['location'];
    var navigator = window['navigator'];

    var canvas = document.getElementById('canvas');
    var preview = document.getElementById('preview');

    var favicon = document.getElementById('favicon');
    var fav = document.getElementById('fav');

    var divBest = document.getElementById('best');
    var divEdit = document.getElementById('edit');
    var divOpen = document.getElementById('open');
    var divOpenScore = document.getElementById('open2');

    var divScore = document.getElementById('score');
    var divLines = document.getElementById('lines');

    var divTables = document.getElementById('tables');

    var highscore = document.getElementById('highscore');
    var submit = document.getElementById('submit');
    var nick = document.getElementById('nick');

    var sFB = document.getElementById('sFB');
    var sTW = document.getElementById('sTW');
    var sGP = document.getElementById('sGP');

    var ctx = canvas.getContext('2d');
    var ptx = preview.getContext('2d');
    var ftx = favicon.getContext('2d');

    var originalFavicon = fav['href'];


    /**
     * Game Speed
     * 
     * @type number
     */
    var speed = 200;


    /**
     * Score for current speed
     * 
     * @type number
     */
    var speedScore = 5;

    /**
     * Somehow cheated? Entering the highscore isn't possible anymore
     * 
     * @type {boolean}
     */
    var expelled = false;


    /**
     * Game score
     * 
     * @type number
     */
    var score = 0;

    /**
     * Number of lines cleared
     * 
     * @type number
     */
    var clearedLines = 0;

    /**
     * Tile border width
     * 
     * @type number
     */
    var tileBorder = 2;

    /**
     * Number of tiles on the board in X direction
     * 
     * @type number
     */
    var tilesX = 21;

    /**
     * Number of tiles on the board in Y direction
     * 
     * @type number
     */
    var tilesY = 35;

    /**
     * The inner tile size - border exclusive
     * 
     * @type number
     */
    var tileSize = 16;


    /**
     * Game status types, enum doesn't fold properly :/
     */
    /**
     * 
     * @type {number}
     * @const
     */
    var STATUS_INIT = 0;
    /** 
     * @type {number}
     * @const
     */
    var STATUS_PLAY = 1;
    /** 
     * @type {number}
     * @const
     */
    var STATUS_PAUSE = 2;
    /** 
     * @type {number}
     * @const
     */
    var STATUS_GAMEOVER = 3;
    /** 
     * @type {number}
     * @const
     */
    var STATUS_WAIT = 4;

    /**
     * The actual game status
     * 
     * @type number
     */
    var gameStatus = STATUS_INIT;

    /**
     * Has the window lost the foucs?
     * 
     * @type boolean
     */
    var leftWindow = false;

    /**
     * Is the AI playing?
     * 
     * @type boolean
     */
    var autoMode = false;

    /**
     * Is the the helping shadow visible?
     * 
     * @type boolean
     */
    var showShadow = true;

    /**
     * Is the favicon animated?
     * 
     * @type boolean
     */
    var showFavicon = !!favicon.toDataURL;


    /**
     * Is the preview box visible?
     * 
     * @type boolean
     */
    var showPreview = true;

    /**
     * The actual game board to work on (a Y/X matrix)
     * 
     * @type Array
     */
    var board;

    /**
     * The highest Y positions of all columns
     * 
     * @type Array
     */
    var topY;

    /**
     * The actual piece X position
     * 
     * @type number
     */
    var curX;

    /**
     * The actual piece Y position
     * @type number
     */
    var curY;

    /**
     * Game piece description, enum doesn't fold properly :/
     */

    /** 
     * @type {number}
     * @const
     */
    var PIECE_PROBABILITY = 0;
    /** 
     * @type {number}
     * @const
     */
    var PIECE_ROTATABLE = 1;
    /** 
     * @type {number}
     * @const
     */
    var PIECE_COLOR = 2;
    /** 
     * @type {number}
     * @const
     */
    var PIECE_SHAPE = 3;


    /**
     * The actual piece direction
     * @type number
     */
    var direction = PIECE_SHAPE;


    /**
     * Is Edit menu currently closed?
     * 
     * @type boolean
     */
    var menuOpen = false;


    /**
     * 
     * @type number
     */
    var pixelRatio = window['devicePixelRatio'] || 1;


    /**
     * All available piece definitions, see PIECE enum
     * @type Array
     */
    var pieces = [
        [
            1.0, // probability
            1, // rotatable
            [202, 81, 249], // pink
            [0, -1, -1, 0, 0, 0, 1, 0]
        ], [
            1.0, // probability
            1, // rotatable
            [255, 102, 0], // orange
            [0, -1, 0, 0, 0, 1, 1, 1]
        ], [
            1.0, // probability
            1, // rotatable
            [0, 255, 0], // green
            [0, -1, 0, 0, -1, 0, 1, -1]
        ], [
            1.0, // probability
            1, // rotatable
            [255, 0, 0], // red
            [0, -1, 0, 0, -1, 0, -1, 1]
        ], [
            1.0, // probability
            1, // rotatable
            [102, 204, 255], // light blue
            [-1, 0, 0, 0, 1, 0, 2, 0]
        ], [
            0.2, // probability
            1, // rotatable
            [255, 255, 255], // white - the haxx0r one
            [-1, 1, 0, 1, 1, 1, 1, 0, 0, -1]
        ], [
            1.0, // probability
            1, // rotatable
            [0, 0, 255], // blue
            [-1, -1, -1, 0, 0, 0, 1, 0]
        ], [
            0.8, // probability
            0, // rotatable
            [255, 255, 0], // yellow
            [0, 0, 1, 0, 1, 1, 0, 1]
        ]/*, [
         0.1, // probability
         0, // rotatable
         [255, 0, 0], // red
         [
         -2, -6,
         -1, -6,
         0, -6,
         1, -6,
         2, -6,
         -2, -5,
         -1, -5,
         0, -5,
         1, -5,
         2, -5,
         -2, -4,
         0, -4,
         2, -4,
         -2, -3,
         -1, -3,
         0, -3,
         1, -3,
         2, -3,
         -2, -2,
         -1, -2,
         0, -2,
         1, -2,
         2, -2,
         -2, -1,
         -1, -1,
         0, -1,
         1, -1,
         2, -1,
         -2, 0,
         -1, 0,
         0, 0,
         1, 0,
         2, 0,
         -2, 1,
         -1, 1,
         0, 1,
         1, 1,
         2, 1,
         -2, 2,
         -1, 2,
         0, 2,
         1, 2,
         2, 2,
         -2, 3,
         -1, 3,
         0, 3,
         1, 3,
         2, 3,
         -2, 4,
         -1, 4,
         0, 4,
         1, 4,
         2, 4,
         -2, 5,
         -1, 5,
         0, 5,
         1, 5,
         2, 5,
         -2, -7,
         -2, -8,
         2, -7,
         2, -8,
         -3, -8,
         3, -8,
         -4, -8,
         4, -8,
         -5, -8,
         5, -8,
         -6, -8,
         6, -8,
         -4, -9,
         4, -9,
         -5, -9,
         5, -9,
         -4, -7,
         4, -7,
         -5, -7,
         5, -7,
         3, -1,
         3, 0,
         3, 1,
         3, 2,
         3, 3,
         3, 4,
         3, 5,
         3, 6,
         3, 7,
         -2, 6,
         2, 6,
         -3, -1,
         -3, 0,
         -3, 1,
         -3, 2,
         -3, 3,
         -3, 4,
         -3, 5,
         -3, 6,
         -3, 7,
         4, 1,
         4, 2,
         4, 3,
         4, 4,
         4, 5,
         -4, 1,
         -4, 2,
         -4, 3,
         -4, 4,
         -4, 5,
         5, 0,
         5, 1,
         5, 2,
         -5, 0,
         -5, 1,
         -5, 2,
         5, 4,
         5, 5,
         -5, 4,
         -5, 5,
         6, 4,
         7, 4,
         6, 5,
         7, 5,
         -6, 4,
         -7, 4,
         -6, 5,
         -7, 5,
         7, 2,
         7, 3,
         -7, 3,
         -7, 2,
         8, 1,
         8, 2,
         -8, 1,
         -8, 2,
         9, 0,
         9, 1,
         -9, 0,
         -9, 1,
         10, 0,
         -10, 0,
         4, 7,
         4, 8,
         -4, 7,
         -4, 8,
         -5, 8,
         5, 8,
         -6, 8,
         6, 8,
         -6, 7,
         6, 7
         
         ]
         ]*/
    ];

    /**
     * The fastest timer we can get
     * 
     * @type {Function}
     */
    var NOW;

    /**
     * The time when a game started
     * 
     * @type {Date}
     */
    var startTime = new Date;

    /**
     * The current piece flying around
     * 
     * @type Array
     */
    var curPiece;

    /**
     * The next piece in the queue
     * 
     * @type Array
     */
    var nextPiece;

    /**
     * The timeout ID of the running game
     * 
     * @type number
     */
    var loopTimeout;

    /**
     * The time of the flash effect in ms
     * @type number
     * @const
     */
    var flashTime = 350;


    /**
     * Generates a rotated version of the piece
     * 
     * @param {Array} form the original piece
     * @returns {Array} The rotated piece
     */
    var getRotatedPiece = function(form) {

        var newForm = new Array(form.length);
        for (var i = 0; i < newForm.length; i+= 2) {
            newForm[i] = -form[i + 1];
            newForm[i + 1] = form[i];
        }
        return newForm;
    };


    /**
     * Get a new weighted random piece
     * 
     * @returns {Array} 
     */
    var getNextPiece = function() {

        var rnd = Math.random();
        for (var i = pieces.length; i--; ) {
            if (rnd < pieces[i][PIECE_PROBABILITY])
                return pieces[i];
            rnd-= pieces[i][PIECE_PROBABILITY];
        }
        return pieces[0];
    };


    /**
     * Take the next piece
     */
    var newPiece = function() {

        curPiece = nextPiece;
        nextPiece = getNextPiece();

        calcInitCoord();

        updatePreview();
    };


    /**
     * Calculate the initial coordinate of a new piece
     */
    var calcInitCoord = function() {

        var minY = -10;

        var cur = curPiece[direction];

        direction = PIECE_SHAPE + Math.random() * 4 | 0;

        for (var i = 0; i < cur.length; i+= 2) {

            minY = Math.max(minY, cur[i + 1]);
        }
        curX = tilesX >> 1;
        curY = -minY;
    };


    /**
     * Take the URL hash and set the initial settings
     */
    var prepareUrlHash = function(hash) {

        if (!hash) {
            return;
        }

        try {
            hash = JSON.parse(window['atob'](hash.slice(1)));
        } catch (e) {
            return;
        }

        // No highscore participation 
        setExpelled(true);

        if (hash['P']) {
            pieces = hash['P'];
        }

        if (hash['X']) {
            tilesX = hash['X'];
        }

        if (hash['Y']) {
            tilesY = hash['Y'];
        }

        if (hash['S']) {
            tileSize = hash['S'];
        }

        if (hash['B']) {
            tileBorder = hash['B'];
        }

        if (hash['Q']) {
            speed = hash['Q'];
        }
    };


    /**
     * Try if a move vertical move is valid 
     * 
     * @param {number} newY The new Y position to try
     * @returns {boolean} Indicator if it's possible to move
     */
    var tryDown = function(newY) {

        var cur = curPiece[direction];

        for (var i = 0; i < cur.length; i+= 2) {

            var x = cur[i] + curX;
            var y = cur[i + 1] + newY;

            if (y >= tilesY || board[y] !== undefined && board[y][x] !== undefined) {
                return false;
            }
        }
        curY = newY;
        return true;
    };


    /**
     * Try if a horizontal move is valid 
     * 
     * @param {number} newX The new X position to try
     * @param {number} dir The direction to try
     * @returns {boolean} Indicator if it's possible to move
     */
    var tryMove = function(newX, dir) {

        var cur = curPiece[dir];

        for (var i = 0; i < cur.length; i+= 2) {

            var x = cur[i] + newX;
            var y = cur[i + 1] + curY;

            if (x < 0 || x >= tilesX || y >= 0 && board[y][x] !== undefined) {
                return false;
            }
        }
        curX = newX;
        direction = dir;
        return true;
    };


    /**
     * Integrate the current piece into the board
     */
    var integratePiece = function() {

        var cur = curPiece[direction];

        for (var i = 0; i < cur.length; i+= 2) {

            // Check for game over
            if (cur[i + 1] + curY <= 0) {
                gameOver();
                break;
            } else {
                board[cur[i + 1] + curY][cur[i] + curX] = curPiece[PIECE_COLOR];
                topY[cur[i] + curX] = Math.min(topY[cur[i] + curX], cur[i + 1] + curY);
            }
        }

        if (gameStatus === STATUS_GAMEOVER) {
            pauseLoop();
        } else {
            checkFullLines();
        }

        updateScore(speedScore);
    };


    /**
     * Show the game over overlay
     */
    var gameOver = function() {

        gameStatus = STATUS_GAMEOVER;

        if (expelled) {

        } else {
            highscore.style.display = 'block';
            nick.focus();
        }
    };


    /**
     * Ultimately remove lines from the board
     * 
     * @param {Array} remove A stack of lines to be removed
     */
    var removeLines = function(remove) {

        var rp = remove.length - 1;
        var wp = remove[rp--];
        var mp = wp - 1;

        for (; mp >= 0; mp--) {

            if (rp >= 0 && remove[rp] === mp) {
                rp--;
            } else {
                board[wp--] = board[mp];
            }
        }

        while (wp >= 0) {
            board[wp--] = new Array(tilesX);
        }

        for (mp = tilesX; mp--; ) {

            topY[mp]+= remove.length;

            // It's not possible to simply add remove.length, because you can clear lines in arbitrary order
            while (topY[mp] < tilesY && board[topY[mp]][mp] === undefined) {
                topY[mp]++;
            }
        }

        // Calculate line scoring                    
        clearedLines+= remove.length;
        updateScore(remove.length * 20);
    };


    /**
     * Check for full lines and drop them using removeLines()
     */
    var checkFullLines = function() {

        var flashColor = ['#fff', '#fff', '#fff'];

        var remove = [];

        for (var x, y = 0; y < tilesY; y++) {

            for (x = tilesX; x--; ) {

                if (board[y][x] === undefined) {
                    break;
                }
            }

            if (x < 0) {
                remove.push(y);
            }
        }

        if (remove.length > 0) {

            if (flashTime > 0) {

                gameStatus = STATUS_WAIT;
                pauseLoop();

                animate(flashTime, function(pos) {

                    var cond = pos * 10 & 1;

                    // Simply paint a flash effect over the current tiles
                    for (var i = 0; i < remove.length; i++) {

                        for (var x = tilesX; x--; ) {

                            if (cond) {
                                drawTile(ctx, x, remove[i], flashColor);
                            } else if (board[remove[i]][x] !== undefined) {
                                drawTile(ctx, x, remove[i], board[remove[i]][x]);
                            }
                        }
                    }

                }, function() {

                    removeLines(remove);

                    newPiece();

                    draw();
                    gameStatus = STATUS_PLAY;
                    loop();

                }, flashTime / 10);

            } else {

                removeLines(remove);

                newPiece();

                draw();
            }

        } else {
            newPiece();
        }
    };


    /**
     * The main loop of the game
     */
    var loop = function() {

        // If AI
        if (autoMode) {

            if (findOptimalSpot()) {
                integratePiece();
            }

        } else if (!tryDown(curY + 1)) {
            integratePiece();
        }

        draw();

        // AI or normal game
        if (gameStatus === STATUS_PLAY) {
            loopTimeout = window.setTimeout(loop, speed);
        }
    };


    /**
     * Pause the main loop
     */
    var pauseLoop = function() {

        window.clearTimeout(loopTimeout);
    };


    /**
     * Update the score
     * 
     * @param {number} n The number of points to add to the actual score
     */
    var updateScore = function(n) {

        score+= n;

        divScore.innerHTML = score;
        divLines.innerHTML = clearedLines;
    };


    /**
     * Find the optimal spot of a tile
     * 
     * @returns {boolean} Indicator if we found the spot already (false to indicate a small step)
     */
    var findOptimalSpot = function() {

        /**
         * @type number
         */
        var minCost = 100;
        
        /**
         * @type number
         */
        var minDir;
        
        /**
         * @type number
         */
        var minX;

        for (var o = PIECE_SHAPE; o < PIECE_SHAPE + 4; o++) {

            for (var x = tilesX; x--; ) {

                if (tryMove(x, o)) {

                    var cost = calcCost(x, o);

                    if (cost < minCost) {
                        minCost = cost;
                        minDir = o;
                        minX = x;
                    }
                }
            }

        }

        curX = minX;
        direction = minDir;
        
        while (tryDown(curY + 1)) {}
        
        return true;
    };


    /**
     * Calculate the cost to set the new element at the curX and rotation position
     * 
     * @param {number} curX The position to be checked
     * @param {number} rotation The rotation to be checked
     * @returns {number} The actual cost of the position
     */
    var calcCost = function(curX, rotation) {

        var cur = curPiece[rotation];

        // Calculate the height
        var dist = tilesY;
        for (var i = 0; i < cur.length; i+= 2) {
            dist = Math.min(dist, topY[curX + cur[i]] - curY - cur[i + 1]);
        }

        var minY = tilesY;
        for (var i = 0; i < cur.length; i+= 2) {
            minY = Math.min(minY, cur[i + 1] + curY + dist - 1);
        }

        if (minY < 0)
            return tilesY; // Something big

        // Count existing holes
        var holes = 0;
        for (var i = topY[curX + cur[i]]; i < tilesY; i++) {
            holes+= board[curX + cur[i]][i] === undefined;
        }

        // Count holes we're creating now
        var newHoles = 0;

        for (var i = 0; i < cur.length; i+= 2) {

            // Shadow-Tile position
            var x = cur[i] + curX;
            var y = cur[i + 1] + curY + dist - 1;
            var take = true;

            // Ignore tiles in the same column that are higher
            for (var j = 0; j < cur.length; j+= 2) {

                if (i !== j) {

                    if (cur[i] === cur[j] && cur[i + 1] < cur[j + 1]) {
                        take = false;
                        break;
                    }
                }
            }

            if (take) {

                for (j = y + 1; j < tilesY && board[j][x] === undefined; j++) {
                    newHoles++;
                }
            }
        }

        return (1 / minY + holes + newHoles);
    };


    /**
     * Draw a single tile on the screen
     * 
     * @param {CanvasRenderingContext2D} ctx The context to be used
     * @param {number} x X position on the grid
     * @param {number} y Y position on the grid
     * @param {Array} color - A RGB array
     */
    var drawTile = function(ctx, x, y, color) {

        ctx.save();

        ctx.translate(tileBorder + x * (tileBorder + tileSize), tileBorder + y * (tileBorder + tileSize));

        // Draw the tile border
        ctx.fillStyle = "#000";
        ctx.fillRect(-tileBorder, -tileBorder, tileSize + tileBorder + tileBorder, tileSize + tileBorder + tileBorder);

        // Draw a light inner border
        ctx.fillStyle = color[2];
        ctx.fillRect(0, 0, tileSize, tileSize);

        // Draw a dark inner border
        ctx.fillStyle = color[1];
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, tileSize);
        ctx.lineTo(tileSize, tileSize);
        ctx.closePath();
        ctx.fill();

        // Draw the actual tile
        ctx.fillStyle = color[0];
        ctx.fillRect(tileBorder, tileBorder, tileSize - 2 * tileBorder, tileSize - 2 * tileBorder);

        ctx.restore();

        if (showFavicon) {
            ftx.fillStyle = color[0];
            ftx.fillRect(x * favicon.width / tilesX, y * favicon.width / tilesY, 1, 1);
        }
    };


    /**
     * Draw a single tile in shadow color
     * 
     * @param {CanvasRenderingContext2D} ctx The context to be used
     * @param {number} x X position on the grid
     * @param {number} y Y position on the grid
     */
    var drawShadow = function(ctx, x, y) {

        ctx.save();

        ctx.translate(tileBorder + x * (tileBorder + tileSize), tileBorder + y * (tileBorder + tileSize));

        ctx.fillStyle = "#b7c7e4";
        ctx.fillRect(0, 0, tileSize, tileSize);

        ctx.restore();
    };


    /**
     * Draw a text on the screen
     * 
     * @param text The text to be drawn
     */
    var drawTextScreen = function(text) {

        ctx.font = "60px Lemon";

        // Background layer
        ctx.fillStyle = "rgba(119,136,170,0.5)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        var size = ctx.measureText(text);

        ctx.fillStyle = "#fff";
        ctx.fillText(text, (canvas.width - size.width) / 2, canvas.height / 3);
    };


    /**
     * Initialize the game with a countdown
     */
    var init = function() {

        var cnt = 4;

        prepareBoard();

        curPiece = getNextPiece();
        nextPiece = getNextPiece();

        calcInitCoord();

        updatePreview();

        gameStatus = STATUS_INIT;

        score = clearedLines = 0;

        animate(4000, function() {

            cnt--;

            if (!cnt) {
                cnt = 'Go';
                ctx.fillStyle = "#0d0";
            } else {
                ctx.fillStyle = "#fff";
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Set the font once
            ctx.font = "60px Lemon";

            var size = ctx.measureText(cnt);

            ctx.fillText(cnt, (canvas.width - size.width) / 2, canvas.height / 3);

        }, function() {

            gameStatus = STATUS_PLAY;
            loop();

        }, 1000);
    };
    
    
    /**
     * Pause or unpause the game, according to gameStatus
     */
    var pause = function() {

        if (gameStatus === STATUS_PAUSE) {
            gameStatus = STATUS_PLAY;
            document.getElementById('Cpause').checked = false;
            loop();
        } else if (gameStatus === STATUS_PLAY) {
            gameStatus = STATUS_PAUSE;
            document.getElementById('Cpause').checked = true;
            pauseLoop();
        }
        draw();
    };


    /**
     * Update the social links
     */
    var updateSocialLinks = function() {

        var fb = 'https://www.facebook.com/sharer/sharer.php?u=';
        var tw = 'http://twitter.com/share?text=Check%20out%20my%20custom%20HTML5%20Tetris%20(made%20by%20%40RobertEisele)&amp;url=';
        var gp = 'https://plus.google.com/share?url=';

        var P = [];
        
        for (var i = pieces.length; i--; ) {

            P[i] = pieces[i].slice(0, 1 + PIECE_SHAPE); // Upper slice() bound is exclusive, so 1+x
            P[i][PIECE_PROBABILITY] = 1; // We kill the probability for sake of string length. Maybe we'll find a better solution
           
            P[i][PIECE_COLOR] = P[i][PIECE_COLOR][0].substring(4, P[i][PIECE_COLOR][0].length - 1).split(',');
        }

        try {

            // See prepareUrlHash() as the opposite endpoint
            location.hash = window['btoa'](JSON.stringify({
                'P': P,
                'X': tilesX,
                'Y': tilesY,
                'S': tileSize,
                'B': tileBorder,
                'Q': speed
            }));
            
        } catch (e) {
            return;
        }

        var url = encodeURIComponent(location.href);
        sFB.setAttribute('href', fb + url);
        sTW.setAttribute('href', tw + url);
        sGP.setAttribute('href', gp + url);
    };

    /**
     * Draw all components on the screen
     */
    var draw = function() {

        // http://jsperf.com/ctx-clearrect-vs-canvas-width-canvas-width/3
        // Should be fine and also the standard way to go
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (showFavicon) {
            ftx.clearRect(0, 0, favicon.width, favicon.width);
        }

        var cur = curPiece[direction];

        for (var y = tilesY; y--; ) {

            // Draw board
            for (var x = tilesX; x--; ) {

                if (board[y][x] !== undefined) {
                    drawTile(ctx, x, y, board[y][x]);
                }
            }
        }

        if (showShadow && !autoMode) {

            var dist = tilesY;
            for (var i = 0; i < cur.length; i+= 2) {
                dist = Math.min(dist, topY[cur[i] + curX] - (curY + cur[i + 1]));
            }

            for (var i = 0; i < cur.length; i+= 2) {
                drawShadow(ctx, cur[i] + curX, cur[i + 1] + curY + dist - 1);
            }
        }

        // Draw current piece
        for (var i = 0; i < cur.length; i+= 2) {

            drawTile(ctx, cur[i] + curX, cur[i + 1] + curY, curPiece[PIECE_COLOR]);
        }

        if (showFavicon) {

            var s = favicon.width;
            var v = s / 2;

            if (gameStatus === STATUS_GAMEOVER) {

                ftx.clearRect(0, 0, s, s);

                var p = 3 * pixelRatio;

                ftx.fillStyle = '#000';
                ftx.arc(v, v, v, 0, Math.PI * 2, false);
                ftx.closePath();
                ftx.fill();

                ftx.lineWidth = pixelRatio * 4;
                ftx.strokeStyle = '#fff';
                ftx.beginPath();
                ftx.moveTo(p, p);
                ftx.lineTo(s - p, s - p);

                ftx.moveTo(s - p, p);
                ftx.lineTo(p, s - p);
                ftx.stroke();

            } else if (gameStatus === STATUS_PAUSE) {

                ftx.clearRect(0, 0, s, s);

                ftx.fillStyle = '#000';
                ftx.arc(v, v, v, 0, Math.PI * 2, false);
                ftx.closePath();
                ftx.fill();

                ftx.fillStyle = '#fff';
                ftx.fillRect(5 * v / 8 - 1, v / 2, v / 4 + 1, v);
                ftx.fillRect(v + v / 8, v / 2, v / 4 + 1, v);
            }

            setFavicon();
        }

        /* DEBUG LINES
         for (var i = 0; i < tilesX; i++) {
            ctx.save();
            ctx.fillStyle = "orange";
            ctx.translate(tileBorder + i * (tileBorder + tileSize), topY[i] * (tileBorder + tileSize) - tileBorder);
            ctx.fillRect(0, 0, tileSize, 2);
         
            ctx.restore();
         }
         */

        // Draw text overlay
        if (gameStatus === STATUS_PAUSE) {
            drawTextScreen("PAUSE");
        } else if (gameStatus === STATUS_GAMEOVER) {
            drawTextScreen("GAME OVER");

            if (expelled) {
                document.getElementById('restart').style.display = 'block';
            }
        }
    };


    /**
     * Update the tiles on the preview monitor
     */
    var updatePreview = function() {

        if (!showPreview)
            return;

        ptx.clearRect(0, 0, preview.width, preview.height);

        var cur = nextPiece[direction];

        for (var i = 0; i < cur.length; i+= 2) {
            drawTile(ptx, cur[i] + 5, cur[i + 1] + 5, nextPiece[PIECE_COLOR]);
        }
    };


    /**
     * Prepare the board
     */
    var prepareBoard = function() {

        board = new Array(tilesY);
        for (var y = tilesY; y--; ) {
            board[y] = new Array(tilesX);
        }

        topY = new Array(tilesX);
        for (var i = tilesX; i--; ) {
            topY[i] = tilesY;
        }

        preview.width = /* void */
        preview.height = tileBorder + 11 * (tileBorder + tileSize);

        canvas.width = tileBorder + tilesX * (tileBorder + tileSize);
        canvas.height = tileBorder + tilesY * (tileBorder + tileSize);

        favicon.width = /* void */
        favicon.height = 16 * pixelRatio;
    };


    /**
     * Prepare the pieces and caches some values
     * 
     * @param {Array} pieces The array of pieces
     */
    var preparePieces = function(pieces) {

        var sum = 0;
        var opacity = 0.2;

        for (var i = pieces.length; i--; ) {

            // Pre-compute tile colors
            var color = pieces[i][PIECE_COLOR];

            color[0]|= 0;
            color[1]|= 0;
            color[2]|= 0;

            pieces[i][PIECE_COLOR] = [
                // Normal color
                "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")",
                // Dark color
                "rgb(" + Math.round(color[0] - color[0] * opacity) + "," + Math.round(color[1] - color[1] * opacity) + "," + Math.round(color[2] - color[2] * opacity) + ")",
                // Light color
                "rgb(" + Math.round(color[0] + (255 - color[0]) * opacity) + "," + Math.round(color[1] + (255 - color[1]) * opacity) + "," + Math.round(color[2] + (255 - color[2]) * opacity) + ")"
            ];

            // Add rotations
            for (var j = PIECE_SHAPE; j < 4 - 1 + PIECE_SHAPE; j++) {

                if (pieces[i][PIECE_ROTATABLE])
                    pieces[i][j + 1] = getRotatedPiece(pieces[i][j]);
                else
                    pieces[i][j + 1] = pieces[i][PIECE_SHAPE].slice(0);
            }

            // Calculate weight sum
            sum+= pieces[i][PIECE_PROBABILITY];
        }

        // Adjust the weights
        for (var i = pieces.length; i--; ) {
            pieces[i][PIECE_PROBABILITY]/= sum;

            // Append tables to the menu
            appendEditTable(divTables, pieces[i]);
        }
    };


    /**
     * Set the actual rendered favicon
     */
    var setFavicon = function() {
        fav['href'] = favicon['toDataURL']('image/png');
    };


    /**
     * A simple animation loop
     * 
     * @param {number} duration The animation duration in ms
     * @param {Function} fn The callback for every animation step
     * @param {Function=} done The finish callback
     * @param {number=} speed The speed of the animation 
     */
    var animate = function(duration, fn, done, speed) {

        var start = NOW();
        var loop;

        // We could use the requestAni shim, but yea...it's just fine
        (loop = function() {

            var now = NOW();

            var pct = (now - start) / duration;
            if (pct > 1)
                pct = 1;

            fn(pct);

            if (pct === 1) {
                done();
            } else {
                window.setTimeout(loop, speed || /* 1000 / 60*/ 16);
            }
        })();
    };


    /**
     * Attach a new event listener
     * 
     * @param {Object} obj DOM node
     * @param {string} type The event type
     * @param {Function} fn The Callback
     */
    var addEvent = function(obj, type, fn) {

        if (obj.addEventListener) {
            return obj.addEventListener(type, fn, false);
        } else if (obj.attachEvent) {
            return obj.attachEvent("on" + type, fn);
        }
    };

    
    /**
     * Set the game mode to expelled, means highscore participation is disabled (because of custom game)
     * 
     * @param {boolean=} diag Prevent the dialogue
     */
    var setExpelled = function(diag) {

        if (!expelled && !diag) {
            alert("This disables highscore participation.");
        }
        expelled = true;
        displayHomeLink();
    };
    
    /*
     * Display the home link when needed
     */
    var displayHomeLink = function() {
        document.getElementById('home').style.display = 'block';
    };


    /**
     * Add form edit tables
     * 
     * @param {Object} root The root element
     * @param {Array} piece The forms array
     */
    var appendEditTable = function(root, piece) {

        var isSet = function(piece, x, y) {

            piece = piece[PIECE_SHAPE];

            for (var i = 0; i < piece.length; i+= 2) {
                if (piece[i] === x - 4 && piece[i + 1] === y - 4)
                    return i;
            }
            return -1;
        };

        var table = document.createElement('table');

        for (var i = 0; i < 9; i++) {

            var tr = document.createElement('tr');

            for (var j = 0; j < 9; j++) {

                var td = document.createElement('td');
                td.style.background = isSet(piece, j, i) >= 0 ? piece[PIECE_COLOR][0] : '#ccc';
                tr.appendChild(td);

                (function(x, y, td, piece) {

                    addEvent(td, 'click', function() {

                        var start;

                        if (-1 === (start = isSet(piece, x, y))) {
                            td.style.background = piece[PIECE_COLOR][0];

                            // Add new coordinate
                            piece[PIECE_SHAPE].push(x - 4, y - 4);

                        } else {
                            td.style.background = '#ccc';

                            // Delete coordinate
                            piece[PIECE_SHAPE].splice(start, 2);
                        }

                        // Append new rotated pieces
                        for (var j = PIECE_SHAPE; j < 4 - 1 + PIECE_SHAPE; j++) {

                            if (piece[PIECE_ROTATABLE])
                                piece[j + 1] = getRotatedPiece(piece[j]);
                            else
                                piece[j + 1] = piece[PIECE_SHAPE].slice(0);
                        }
                        
                        setExpelled();
                        updateSocialLinks();
                    });

                })(j, i, td, piece);
            }
            table.appendChild(tr);

        }
        root.appendChild(table);
    };


    /**
     * Initialize the motion handling of mobile devices
     */
    var initMotion = function() {

        var motionX = 0;
        var motionY = 0;
        var prevX = 0;
        var prevY = 0;

        var ceil = function(n) {

            n = Math.round(n / 30);

            return (0 < n) - (n < 0);
        };

        addEvent(window, 'devicemotion', function(ev) {

            var acc = ev.rotationRate;

            var alpha = 0.05;

            motionX = motionX * (1 - alpha) + acc.alpha * alpha;
            motionY = motionY * (1 - alpha) + acc.beta * alpha;

            var X = ceil(motionX);
            var Y = ceil(motionY);

            if (prevX === X) {
                X = 0;
            }
            prevX = X;

            if (prevY === Y) {
                Y = 0;
            }
            prevY = Y;

            tryMove(curX + X, 3 + (direction + 1 + Y) % 4);
        });
    };


    // Set the click handler for the submit button
    addEvent(submit, 'click', function() {

        var name = nick.value;

        var img = document.createElement('img');

        if (expelled) {
            return;
        }

        if (name) {

            img.onload = function() {
                img.onload = null;
            };

            // Dafaq, it's tetris! Stop cheating and find a new hobby...
            img.src = '/pixel.php?name=' + encodeURIComponent(name) + "&score=" + score + "&lines=" + clearedLines + "&date=" + Date.now();

            highscore.style.display = 'none';

            init();

        } else {
            nick.focus();
        }
    });


    // Set the click handler for menu opening
    var evTabOpen = function(ev) {

        var elm = ev.target.parentNode;

        if (elm === divEdit) {
            divEdit.style.zIndex = 4;
            divBest.style.zIndex = 2;
        } else {
            divEdit.style.zIndex = 2;
            divBest.style.zIndex = 4;
        }

        animate(600, function(k) {
            /*
             var pos = k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
             
             pos = editClosed + pos * (1 - 2 * editClosed);
             
             edit.style.right = (-pos * 420 | 0) + 'px';
             */
            elm.style.right = (420 * ((k === 1 ? 1 : 1 - Math.pow(2, -10 * k)) * (1 - 2 * menuOpen) + menuOpen - 1) | 0) + 'px';
        }, function() {
            menuOpen = !menuOpen;
        });
    };
    addEvent(divOpen, 'click', evTabOpen);
    addEvent(divOpenScore, 'click', evTabOpen);

    // Set keydown event listener
    addEvent(window, "keydown", function(ev) {

        if (gameStatus !== STATUS_PLAY && ev.keyCode !== 80 && ev.keyCode !== 9)
            return;

        switch (ev.keyCode) {
            case 37: // left
                tryMove(curX - 1, direction);
                draw();
                break;
            case 39: // right
                tryMove(curX + 1, direction);
                draw();
                break;
            case 38: // up
                tryMove(curX, PIECE_SHAPE + (direction - PIECE_SHAPE + 1) % 4);
                draw();
                break;
            case 40: // down
                if (!tryDown(curY + 1))
                    integratePiece();
                draw();
                break;
            case 32: // space
                while (tryDown(curY + 1)) {
                }
                integratePiece();
                draw();
                break;
            case 80: // p
                pause();
                break;
            case 65: // a
                autoMode = !autoMode;
                document.getElementById('Cauto').checked = autoMode;
                setExpelled();
                return;
            case 83: // s
                showShadow = !showShadow;
                document.getElementById('Cshadow').checked = showShadow;
                return;
            case 9:
                // fall to preventDefault, as we forbid tab selection (we have hidden input fields. chrome scrolls to them)
                break;
            default:
                return;
        }
        ev.preventDefault();
    });

    // Set window leave listener
    addEvent(window, 'blur', function() {

        if (gameStatus !== STATUS_PLAY)
            return;

        gameStatus = STATUS_PAUSE;

        leftWindow = true;

        pauseLoop();

        draw();
    });

    // Set comeback listener
    addEvent(window, 'focus', function() {

        if (!leftWindow || gameStatus !== STATUS_PAUSE) {
            return;
        }

        gameStatus = STATUS_PLAY;

        leftWindow = false;

        loop();
    });

    // Set canvas click handler (for restarting the game in custom mode)
    addEvent(canvas, 'click', function() {

        if (expelled && gameStatus === STATUS_GAMEOVER) {

            document.getElementById('restart').style.display = 'none';

            init();
        }

    });


    if (window['performance'] !== undefined && window['performance']['now'] !== undefined) {
        NOW = function() {
            return window.performance.now();
        };
    } else if (Date.now !== undefined) {
        NOW = Date.now;
    } else {
        NOW = function() {
            return new Date().valueOf();
        };
    }

    window['textBoxEdit'] = function(elm) {

        var value = parseInt(elm.value, 10);

        switch (elm.getAttribute('id')) {

            case 'border':
                tileBorder = value;
                setExpelled();
                break;

            case 'tilesX':
                tilesX = value;
                setExpelled();
                break;

            case 'tilesY':
                tilesY = value;
                setExpelled();
                break;

            case 'tilesSize':
                tileSize = value;
                setExpelled();
                break;

            case 'Cpreview':
                showPreview = elm.checked;
                if (showPreview) {
                    preview.style.display = 'block';
                } else {
                    preview.style.display = 'none';
                }
                return;

            case 'Cpause':
                pause();
                return;

            case 'Cauto':
                autoMode = elm.checked;
                setExpelled();
                return;

            case 'Cshadow':
                showShadow = elm.checked;
                return;

            case 'speedDelay':
                speed = parseFloat(elm.value);

                /**
                 * Find a function for the following "speed : speedScore" mapping
                 * 
                 1000 = 1
                 200  = 5
                 40   = 20
                 
                 We need a function such that
                 speedScore = a * exp(b * speed)
                 
                 => log(speedScore) = log(a) + b * speed
                 => linear regression
                 
                 */
                speedScore = Math.max(1, Math.round(28.2632 * Math.exp(-0.00864879 * speed)));
                return;

            case 'Cfavicon':
                showFavicon = elm.checked;
                if (!showFavicon) {
                    fav['href'] = originalFavicon;
                }
                return;

            case 'Cgamepad':
                if (elm.checked) {
                    Gamepad.startPolling();
                } else {
                    Gamepad.stopPolling();
                }
                return;
        }

        updateSocialLinks();

        prepareBoard();

        //newPiece();
        calcInitCoord();

        draw();

        updatePreview();
    };

    // Display the open buttons for the menus
    window.setTimeout(function() {

        animate(400, function(pos) {

            var start = -442;
            var end = -420;

            var p1 = Math.min(1, pos / 0.5);
            var p2 = Math.max(0, (pos - 0.5) / 0.5);

            divEdit.style.right = (start + (p1 * (end - start))) + "px";
            divBest.style.right = (start + (p2 * (end - start))) + "px";

        }, function() { });

    }, 800);


    if (!showFavicon) {
        document.getElementById('showFavicon').parentNode.style.display = 'none';
    }

    /**
     * Copyright 2012 Google Inc. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *     http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var Gamepad = {
        // Heavily modified version of
        // http://www.html5rocks.com/en/tutorials/doodles/gamepad/gamepad-tester/gamepad.js

        ticking: false,
        gamepads: [],
        prevRawGamepadTypes: [],
        prevAxesTime: 0,
        prevAxesHash: 0,
        prevButtonTime: 0,
        prevButtonHash: 0,
        init: function() {

            if (navigator['getGamepads'] ||
                    !!navigator['webkitGetGamepads'] ||
                    !!navigator['webkitGamepads']) {

                if ('ongamepadconnected' in window) {
                    window.addEventListener('gamepadconnected',
                            Gamepad.onGamepadConnect, false);
                    window.addEventListener('gamepaddisconnected',
                            Gamepad.onGamepadDisconnect, false);
                }
            }
        },
        onGamepadConnect: function(event) {

            Gamepad.gamepads.push(event['gamepad']);

            Gamepad.startPolling();
        },
        onGamepadDisconnect: function(event) {

            for (var i in Gamepad.gamepads) {

                if (Gamepad.gamepads[i]['index'] === event['gamepad']['index']) {
                    Gamepad.gamepads.splice(i, 1);
                    break;
                }
            }

            if (Gamepad.gamepads.length === 0) {
                Gamepad.stopPolling();
            }
        },
        startPolling: function() {

            document.getElementById('Cgamepad').checked = true;

            if (!Gamepad.ticking) {
                Gamepad.ticking = true;
                Gamepad.tick();
            }
        },
        stopPolling: function() {

            document.getElementById('Cgamepad').checked = false;

            Gamepad.ticking = false;
        },
        tick: function() {
            Gamepad.pollStatus();
            Gamepad.nextTick();
        },
        nextTick: function() {

            if (Gamepad.ticking) {
                if (window.requestAnimationFrame) {
                    window.requestAnimationFrame(Gamepad.tick);
                } else if (window.mozRequestAnimationFrame) {
                    window.mozRequestAnimationFrame(Gamepad.tick);
                } else if (window.webkitRequestAnimationFrame) {
                    window.webkitRequestAnimationFrame(Gamepad.tick);
                }
            }
        },
        pollStatus: function() {

            // Let's get dirty!

            Gamepad.pollGamepads();
            var now = Date.now();

            var gamepad = Gamepad.gamepads[0];

            if (gamepad === undefined) {
                //Gamepad.stopPolling();
                return;
            }

            var hash = 0;
            for (var j = gamepad['buttons'].length; j--; ) {
                if (gamepad['buttons'][j])
                    hash|= 1 << j;
            }

            if (hash !== Gamepad.prevButtonHash) {
                Gamepad.prevButtonHash = hash;
                Gamepad.prevButtonTime = now;
            } else if (hash !== 0) {

                if (now - Gamepad.prevButtonTime < 200) {
                    // Prevent 200ms after first kick
                    return;
                }

                if ((now - Gamepad.prevButtonTime) % 50 >= 10) { // Math.floor((now - Gamepad.prevButtonTime) / 10) % 5 !== 0
                    // Now pass every 50ms
                    return;
                }
            } else {

                // Now test for the axes  
                hash = 0;
                for (j = gamepad['axes'].length; j--; ) {
                    if (Math.abs(gamepad['axes'][j]) > 0.7)
                        hash|= 1 << j;
                }

                if (hash !== Gamepad.prevAxesHash) {
                    Gamepad.prevAxesHash = hash;
                    Gamepad.prevAxesTime = now;
                } else if (hash !== 0) {

                    if (now - Gamepad.prevAxesTime < 100) {
                        // Prevent 100ms after first kick
                        return;
                    }

                    if ((now - Gamepad.prevAxesTime) % 50 >= 10) { // Math.floor((now - Gamepad.prevAxesTime) / 10) % 5 !== 0
                        // Now pass every 50ms
                        return;
                    }

                } else {
                    // If no movement at all, exit here
                    return;
                }
            }

            Gamepad.updateMove(gamepad);
        },
        pollGamepads: function() {

            var rawGamepads =
                    (navigator['getGamepads'] && navigator['getGamepads']()) ||
                    (navigator['webkitGetGamepads'] && navigator['webkitGetGamepads']());

            if (rawGamepads) {

                Gamepad.gamepads = [];

                for (var i = 0; i < rawGamepads.length; i++) {

                    if (typeof rawGamepads[i] !== Gamepad.prevRawGamepadTypes[i]) {

                        Gamepad.prevRawGamepadTypes[i] = typeof rawGamepads[i];
                    }

                    if (rawGamepads[i]) {
                        Gamepad.gamepads.push(rawGamepads[i]);
                    }
                }
            }
        },
        updateMove: function(gamepad) {

            var y1 = gamepad['axes'][1];
            var y2 = gamepad['axes'][3];
            var x1 = gamepad['axes'][0];
            var x2 = gamepad['axes'][2];

            if (gamepad['buttons'][9]) {
                pause();
                return;
            }

            // up
            if (gamepad['buttons'][12] || gamepad['buttons'][3]) {
                tryMove(curX, PIECE_SHAPE + (direction - PIECE_SHAPE + 1) % 4);
                draw();
            }

            // left
            if (gamepad['buttons'][14] || x1 < -0.5 || x2 < -0.5) {
                tryMove(curX - 1, direction);
                draw();
            }

            // right
            if (gamepad['buttons'][15] || x1 > 0.5 || x2 > 0.5) {
                tryMove(curX + 1, direction);
                draw();
            }

            // down
            if (gamepad['buttons'][13] || y1 > 0.5 || y2 > 0.5) {
                if (!tryDown(curY + 1))
                    integratePiece();
                draw();
            }

            // fall
            if (gamepad['buttons'][0]) {

                while (tryDown(curY + 1)) {
                }
                integratePiece();
                draw();
            }
        }
    };

    // Overwrite a custom setting with the defaults
    prepareUrlHash(location['hash']);
    
    // Prepare the pieces and pre-calculate some caches
    preparePieces(pieces);
    
    if (location['hash']) {
        // If a URL was given, update social links
        updateSocialLinks();
    }
    
    // Prepare the board
    prepareBoard();
    
    // Initialize the game
    init();
    
    // Initialize the gamepad
    Gamepad.init();
    
    // Initialize the motion handler for mobile devices
    initMotion();
    
})(this);
