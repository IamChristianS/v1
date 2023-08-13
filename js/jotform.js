/*jslint nomen:false, debug:true, evil:true, vars:false, browser:true, forin:true, undef:false, white:false */
/**
 * JotForm Form object
 */

/* eslint-disable */
var JotForm = {
    /**
     * JotForm domain
     * @var String
     */
    url: "//www.jotform.com/", // Will get the correct URL from this.getServerURL() method
    /**
     * JotForm request server location
     * @var String
     */
    server: "//www.jotform.com/server.php", // Will get the correct URL from this.getServerURL() method
    /**
     * JotForm api location
     * @var String
     */
    APIUrl: "//www.jotform.com/API", // Will get the correct URL from this.setAPIUrl() method
    /**
     * All conditions defined on the form
     * @var Object
     */
    conditions: {},
    /**
     * All calculations defined on the form
     * @var Object
     */
    calculations: {},
    /**
     * Condition Values
     * @var Object
     */
    condValues: {},
    /**
     * Coupon applied check to display discounted price
     */
    couponApplied: false,
    /**
     * Progress bar object above form
     * @var Object
     */
    progressBar: false,
    /**
     * All JotForm forms on the page
     * @var Array
     */
    forms: [],
    /**
     * Will this form be saved on page changes
     * @var Boolean
     */
    saveForm: false,
    /**
     * Array of extensions
     * @var Array
     */
    imageFiles: ["png", "jpg", "jpeg", "ico", "tiff", "bmp", "gif", "apng", "jp2", "jfif"],
    /**
     * array of autocomplete elements
     * @var Object
     */
    autoCompletes: {},
    /**
     * Array of default values associated with element IDs
     * @var Object
     */
    defaultValues: {},
    /**
     * Debug mode
     * @var Boolean
     */
    debug: false,
    /**
     * Check if the focused inputs must be highligted or not
     * @var Boolean
     */
    highlightInputs: true,
    /**
     * it will disable the automatic jump to top on form collapse
     * @var Boolean
     */
    noJump: false,
    /**
     * Indicates that form is still under initialization
     * @var Boolean
     */
    initializing: true,
    /**
     * Keeps the last focused input
     * @var Boolean
     */
    lastFocus: false,
    /**
     * Form's payment type, if any
     * @var String
     */
    payment: false,
    /**
     * Fields to preserve (or duplicate) prior to encryption
     * @var Array
     */
    fieldsToPreserve: [],
    /**
     * Status of multipage save
     * @var Boolean
     */
    saving: false,

    /**
     * Status of fetching pending submission data
     * @var Boolean
     */
    loadingPendingSubmission: false,

    /**
     * ID of current submission session
     * @var String
     */
    sessionID: null,

    /**
     * Unique token of current submission session
     * @var String
     */
    submissionToken: null,

    /**
     * Submission ID for edit mode
     * @var String
     */
    submissionID: null,
    /**
     * Texts used in the form
     * @var Object
     */
    texts: {
        confirmEmail: 'E-mail does not match',
        pleaseWait: 'Please wait...',
        validateEmail: 'You need to validate this e-mail',
        confirmClearForm: 'Are you sure you want to clear the form',
        lessThan: 'Your score should be less than or equal to',
        incompleteFields: 'There are incomplete required fields. Please complete them.',
        required: 'This field is required.',
        requireOne: 'At least one field required.',
        requireEveryRow: 'Every row is required.',
        requireEveryCell: 'Every cell is required.',
        email: 'Enter a valid e-mail address',
        alphabetic: 'This field can only contain letters',
        numeric: 'This field can only contain numeric values',
        alphanumeric: 'This field can only contain letters and numbers.',
        cyrillic: 'This field can only contain cyrillic characters',
        url: 'This field can only contain a valid URL',
        currency: 'This field can only contain currency values.',
        fillMask: 'Field value must fill mask.',
        uploadExtensions: 'You can only upload following files:',
        noUploadExtensions: 'File has no extension file type (e.g. .txt, .png, .jpeg)',
        uploadFilesize: 'File size cannot be bigger than:',
        uploadFilesizemin: 'File size cannot be smaller than:',
        gradingScoreError: 'Score total should only be less than or equal to',
        inputCarretErrorA: 'Input should not be less than the minimum value:',
        inputCarretErrorB: 'Input should not be greater than the maximum value:',
        maxDigitsError: 'The maximum digits allowed is',
        minCharactersError: 'The number of characters should not be less than the minimum value:',
        freeEmailError: 'Free email accounts are not allowed',
        minSelectionsError: 'The minimum required number of selections is ',
        maxSelectionsError: 'The maximum number of selections allowed is ',
        pastDatesDisallowed: 'Date must not be in the past.',
        dateLimited: 'This date is unavailable.',
        dateInvalid: 'This date is not valid. The date format is {format}',
        dateInvalidSeparate: 'This date is not valid. Enter a valid {element}.',
        ageVerificationError: 'You must be older than {minAge} years old to submit this form.',
        multipleFileUploads_typeError: '{file} has invalid extension. Only {extensions} are allowed.',
        multipleFileUploads_sizeError: '{file} is too large, maximum file size is {sizeLimit}.',
        multipleFileUploads_minSizeError: '{file} is too small, minimum file size is {minSizeLimit}.',
        multipleFileUploads_emptyError: '{file} is empty, please select files again without it.',
        multipleFileUploads_uploadFailed: 'File upload failed, please remove it and upload the file again.',
        multipleFileUploads_onLeave: 'The files are being uploaded, if you leave now the upload will be cancelled.',
        multipleFileUploads_fileLimitError: 'Only {fileLimit} file uploads allowed.',
        dragAndDropFilesHere_infoMessage: "Drag and drop files here",
        chooseAFile_infoMessage: "Choose a file",
        maxFileSize_infoMessage: "Max. file size",
        generalError: 'There are errors on the form. Please fix them before continuing.',
        generalPageError: 'There are errors on this page. Please fix them before continuing.',
        wordLimitError: 'Too many words. The limit is',
        wordMinLimitError: 'Too few words.  The minimum is',
        characterLimitError: 'Too many Characters.  The limit is',
        characterMinLimitError: 'Too few characters. The minimum is',
        ccInvalidNumber: 'Credit Card Number is invalid.',
        ccInvalidCVC: 'CVC number is invalid.',
        ccInvalidExpireDate: 'Expire date is invalid.',
        ccInvalidExpireMonth: 'Expiration month is invalid.',
        ccInvalidExpireYear: 'Expiration year is invalid.',
        ccMissingDetails: 'Please fill up the credit card details.',
        ccMissingProduct: 'Please select at least one product.',
        ccMissingDonation: 'Please enter numeric values for donation amount.',
        disallowDecimals: 'Please enter a whole number.',
        restrictedDomain: 'This domain is not allowed',
        ccDonationMinLimitError: 'Minimum amount is {minAmount} {currency}',
        requiredLegend: 'All fields marked with * are required and must be filled.',
        geoPermissionTitle: 'Permission Denied',
        geoPermissionDesc: 'Check your browser\'s privacy settings.',
        geoNotAvailableTitle: 'Position Unavailable',
        geoNotAvailableDesc: 'Location provider not available. Please enter the address manually.',
        geoTimeoutTitle: 'Timeout',
        geoTimeoutDesc: 'Please check your internet connection and try again.',
        appointmentSelected: 'You’ve selected {time} on {date}',
        noSlotsAvailable: 'No slots available',
        slotUnavailable: '{time} on {date} has been selected is unavailable. Please select another slot.',
        multipleError: 'There are {count} errors on this page. Please correct them before moving on.',
        oneError: 'There is {count} error on this page. Please correct it before moving on.',
        doneMessage: 'Well done! All errors are fixed.',
        doneButton: 'Done',
        reviewSubmitText: 'Review and Submit', 
        nextButtonText: 'Next', 
        prevButtonText: 'Previous',
        seeErrorsButton: 'See Errors',
        notEnoughStock: 'Not enough stock for the current selection',
        notEnoughStock_remainedItems: 'Not enough stock for the current selection ({count} items left)',
        soldOut: 'Sold Out',
        justSoldOut: 'Just Sold Out',
        selectionSoldOut: 'Selection Sold Out',
        subProductItemsLeft: '({count} items left)',
        startButtonText: 'START',
        submitButtonText: 'Submit',
    },
    paymentTexts: {
        couponApply: 'Apply',
        couponChange: 'Change',
        couponEnter: 'Enter Coupon',
        couponExpired: 'Coupon is expired. Please try another one.',
        couponInvalid: 'Coupon is invalid. Please try another one.',
        couponRatelimiter: 'You have reached the rate limit. Please try again after one minute.',
        couponValid: 'Coupon is valid.',
        couponBlank: 'Please enter a coupon.',
        shippingShipping: 'Shipping',
        totalTotal: 'Total',
        totalSubtotal: 'Subtotal',
        taxTax: 'Tax',
    },
    validationRegexes: {
        email: /^(?:[\a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[\a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\s\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z](?:[a-zA-Z0-9-]*[a-zA-Z0-9]){1,}|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
        alphanumeric: /^[\u00C0-\u1FFF\u2C00-\uD7FFa-zA-Z0-9\s]+$/,
        numeric: /^(-?\d+[\.\,]?)+$/,
        numericDotStart: /^([\.]\d+)+$/,  //accept numbers starting with dot
        currency: /^-?[\$\£\€]?\d*,?\d*,?\d*(\.\d\d)?¥?$/,
        alphabetic: /^[\u00C0-\u1FFF\u2C00-\uD7FFa-zA-Z\s]+$/,
        cyrillic: /^[абвгдеёжзийклмнопрстуфхцчшщьыъэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЬЫЪЭЮЯ\s]*$/,
    },
    freeEmailAddresses: [
        'gmail.',
        'aim.',
        'outlook.',
        'hotmail.',
        'yahoo.',
        'mail.',
        'inbox.',
        'gmx.',
        'yandex.',
        'tutanota.',
        'ymail.',
        'mailfence.',
        'hushmail.',
        'protonmail.',
        'rediffmail.',
        'msn.',
        'live.',
        'aol.',
        'currently.',
        'att.',
        'mailinator.',
        'getnada.',
        'abyssmail.',
        'boximail.',
        'clrmail.',
        'dropjar.',
        'getairmail.',
        'givmail.',
        'inboxbear.',
        'tafmail.',
        'vomoto.',
        'zetmail.',
        'sharklasers.',
        'guerrillamail.',
        'grr.',
        'guerrillamailblock.',
        'pokemail.',
        'spam4.',
        'emailcu.',
        'mybx.',
        'fsmilitary.',
        'yopmail.',
        'cool.',
        'jetable.',
        'nospam.',
        'nomail.',
        'monmail.',
        'monemail.',
        'moncourrier.',
        'courriel.',
        'speed.',
        'mega.',
        'icloud.',
        'googlemail.',
        'qq.',
        'mac.',
        'email.com',
        'comcast.net',
        'mail.com',
        'usa.com',
        'myself.com',
        'consultant.com',
        'post.com',
        'europe.com',
        'asia.com',
        'iname.com',
        'writeme.com',
        'dr.com',
        'engineer.com',
        'cheerful.com'
    ],

    paymentFields: [
      'control_2co',
      'control_authnet',
      'control_bluepay',
      'control_bluesnap',
      'control_boxpayment',
      'control_braintree',
      'control_cardconnect',
      'control_chargify',
      'control_clickbank',
      'control_dwolla',
      'control_echeck',
      'control_eway',
      'control_firstdata',
      'control_paypalInvoicing',
      'control_gocardless',
      'control_googleco',
      'control_moneris',
      'control_mollie',
      'control_onebip',
      'control_pagseguro',
      'control_payjunction',
      'control_payment',
      'control_paysafe',
      'control_iyzico',
      'control_paypal',
      'control_paypalexpress',
      'control_paypalpro',
      'control_paypalcomplete',
      'control_payu',
      'control_sofort',
      'control_skrill',
      'control_square',
      'control_stripe',
      'control_stripeACH',
      'control_stripeACHManual',
      'control_worldpay',
      'control_sensepass',
      'control_paypalSPB',
      'control_cybersource',
      'control_stripeCheckout',
      'control_payfast'
    ],
    tempStripeCEForms: [
        '230024636370952', 
        '230894369312966', 
        '33361556326858', 
        '230841251513446', 
        '62366391795266', 
        '220392206656353', 
        '230923831008349',  // from here
        '73394165522963',
        '83003904243346',
        '90764025629360',
        '90831342951355',
        '90852034658360',
        '92226427822356',
        '92581787545371',
        '92762018229358',
        '92872381567368',
        '93091396563364',
        '200432081549348',
        '200524754914353',
        '200672628663358',
        '200714281980352',
        '201545466622353',
        '202666382145355',
        '203216090201336',
        '203594925705361',
        '210313694786360',
        '210373149515351',
        '210596520458357',
        '210705631271345',
        '210736300449349',
        '210804961245352',
        '211401327963349',
        '211424822700343',
        '211571514935354',
        '213042959945363',
        '213126472737355',
        '220167135758357',
        '220301706806345',
        '220724495641356',
        '220885098968375',
        '222471409754357',
        '222777403556360',
        '223413865360353',
        '223605826686364',
        '230012143712336',
        '230092900090344',
        '230274621472350',
        '230494425755360',
        '230923288296364',
        '230923831008349',
        '230952526252050'  // to here belongs to * lidingoslalom * user 44 forms 
    ],
    
    isEncrypted : false,
    /* Control to prevent injection of <input name="temp_upload_folder"> more than once. */
    tempUploadFolderInjected: false,
    disableSubmitButton: false,
    disableSubmitButtonMessage: '',
    encryptAll  : function(e, callback) {
        e.stop();

        var fields = getFieldsToEncrypt();

        if (JotForm.encryptionProtocol === 'JF-CSE-V2') {
            if (JotForm.isEditMode()) {
                var form = document.querySelector('.jotform-form');
                var formID = form ? form.getAttribute('id') : '';
                var privateKey = JotCrypto.getEncryptionKey('JF-CSE-V2', formID);
                var encryptionKey = JotForm.submissionDecryptionKey;
                if (!privateKey) {
                    callback(false);
                    JotForm.error('Missing encryption key!');
                    return;
                }
                Promise.all(fields.map(function (field) {
                    setUnencryptedValueToForm(field);
                    return JotCrypto.reEncrypt(privateKey, encryptionKey)(field.value).then(function (encVal) {
                        return Promise.resolve({
                            field: field,
                            encryptedValue: encVal
                        });
                    });
                })).then(function (encFields) {
                    encFields.map(setEncryptedValue);
                    var submitFormAfterEncrypt = shouldSubmitFormAfterEncrypt();
                    callback(submitFormAfterEncrypt);
                }).catch(function (err) {
                    console.log('Encryption v2 error ', err.message);
                })
            } else {
                JotCrypto.encrypt(
                    JotForm.encryptionPublicKey
                ).then(function (enc) {
                    appendHiddenInput('submissionEncryptionKey', enc.encryptedAESKey);
                    return Promise.all(fields.map(function (field) {
                        setUnencryptedValueToForm(field);
                        return enc.run(field.value).then(function (encVal) {
                            return Promise.resolve({
                                field: field,
                                encryptedValue: encVal
                            });
                        });
                    }));
                }).then(function (encFields) {
                    encFields.map(setEncryptedValue);
                    var submitFormAfterEncrypt = shouldSubmitFormAfterEncrypt();
                    callback(submitFormAfterEncrypt);
                }).catch(function (err) {
                    console.log('Encryption v2 error ', err.message);
                })
            };
        } else {
            fields.forEach(function (field) {
                setUnencryptedValueToForm(field);
                var encryptedField = {
                    field: field,
                    encryptedValue: JotEncrypted.encrypt(field.value)
                };
                setEncryptedValue(encryptedField);
            });
            var submitFormAfterEncrypt = shouldSubmitFormAfterEncrypt();
            callback(submitFormAfterEncrypt);
        }
    },
    /**
     * Find the correct server url from forms action url, if there is no form use the defaults
     */
    getServerURL: function () {
        var form = $$('.jotform-form')[0];
        var action;
        var origin = window.location.origin || (window.location.protocol + '//' + window.location.hostname);

        if (form) {
            if (origin.include('.jotform.pro')) {
                this.server = origin + "/server.php";
                this.url = origin + '/';
                return;
            }

            if ((action = form.readAttribute('action'))) {
                if (action.include('submit.php') || action.include('server.php')) {
                    var n = !action.include('server.php') ? "submit" : "server";
                    this.server = action.replace(n + '.php', 'server.php');
                    this.url = action.replace(n + '.php', '');
                } else {
                    var d = action.replace(/\/submit\/.*?$/, '/');

                    if (action.include('pci.jotform.com')) {
                        d = d.replace('pci.','submit.');
                    }
                    
                    if (typeof JotForm.enterprise !== 'undefined' && JotForm.enterprise) {
                        d = "https://"+ JotForm.enterprise + "/";
                    } else if (typeof JotForm.hipaa !== 'undefined' && JotForm.hipaa) {
                        d = "https://hipaa.jotform.com/";
                    }

                    this.server = d + 'server.php';
                    this.url = d;
                }
            }
        }
    },
    /**
     * Initializes sentry for classic forms
    */
    initSentry: function() {
        var origin = window.location.origin ?
            window.location.origin :
            // Fix for Internet Exporer 10 - window.location doesn't have origin property in IE10
            window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');

        var isHIPAAEnterprise = typeof JotForm.enterprise !== 'undefined' && JotForm.enterprise && typeof JotForm.hipaa !== 'undefined' && JotForm.hipaa;
        if (!window.Sentry && window.FORM_MODE !== 'cardform' && !origin.include('jotform.pro') && !isHIPAAEnterprise) {
            var script = new Element('script', {
                src: 'https://browser.sentry-cdn.com/5.19.0/bundle.min.js',
                integrity: 'sha384-edPCPWtQrj57nipnV3wt78Frrb12XdZsyMbmpIKZ9zZRi4uAxNWiC6S8xtGCqwDG',
                crossOrigin: 'anonymous'
            });

            script.addEventListener('load', function() {
                if (window.Sentry) {
                    window.Sentry.init({
                        // ignore common browser extensions, plugins and only allow jotform domain errors
                        dsn: 'https://fc3f70667fb1400caf8c27ed635bd4e1@sentry.io/4142374',
                        enviroment: 'production',
                        whitelistUrls: [
                            /https?:\/\/.*jotform\.com/,
                            /https?:\/\/cdn\.jotfor\.ms/
                        ],
                        integrations: [
                          new Sentry.Integrations.GlobalHandlers({
                            onunhandledrejection: false 
                          })
                        ],
                        denyUrls: [
                            // Facebook flakiness
                            /graph\.facebook\.com/i,
                            // Facebook blocked
                            /connect\.facebook\.net\/en_US\/all\.js/i,
                            // Woopra flakiness
                            /eatdifferent\.com\.woopra-ns\.com/i,
                            /static\.woopra\.com\/js\/woopra\.js/i,
                            // Chrome extensions
                            /extensions\//i,
                            /^chrome:\/\//i,
                            // Other plugins
                            /127\.0\.0\.1:4001\/isrunning/i, // Cacaoweb
                            /webappstoolbarba\.texthelp\.com\//i,
                            /metrics\.itunes\.apple\.com\.edgesuite\.net\//i,
                            /tinymce/i
                        ],
                        ignoreErrors: [
                            // Random plugins/extensions
                            'top.GLOBALS',
                            // See: http://blog.errorception.com/2012/03/tale-of-unfindable-js-error. html
                            'originalCreateNotification',
                            'canvas.contentDocument',
                            'MyApp_RemoveAllHighlights',
                            'http://tt.epicplay.com',
                            'Can\'t find variable: ZiteReader',
                            'jigsaw is not defined',
                            'ComboSearch is not defined',
                            'http://loading.retry.widdit.com/',
                            'atomicFindClose',
                            // Facebook borked
                            'fb_xd_fragment',
                            // ISP "optimizing" proxy - `Cache-Control: no-transform` seems to
                            // reduce this. (thanks @acdha)
                            // See http://stackoverflow.com/questions/4113268
                            'bmi_SafeAddOnload',
                            'EBCallBackMessageReceived',
                            // See http://toolbar.conduit.com/Developer/HtmlAndGadget/Methods/JSInjection.aspx
                            'conduitPage',
                            'tinymce',
                            // Common error caused by test software on a specific chrome version
                            'GetScreenshotBoundingBox',
                            'Can\'t execute code from a freed script',
                            'for=',
                            'JotForm.handleIFrameHeight',
                            // See https://stackoverflow.com/questions/49384120
                            'ResizeObserver loop limit exceeded',
                            // variables that does not originate from our codebase
                            'SB_ModifyLinkTargets',
                            'RegisterEvent'
                        ],
                        beforeSend: function(event){
                            // whitelistUrls paramater is unreliable
                            // do not collect errors from source code embed
                            if(window.parent === window && event.request && event.request.url &&
                            !event.request.url.match(/(https?:\/\/.*jotform\.com)|(https?:\/\/cdn\.jotfor\.ms)/)){
                                return null;
                            }

                            // Don't log errors that comes from the facebook browser
                            if (window.navigator.userAgent.indexOf('FB_IAB') !== -1) {
                                return null;
                            }
                            
                            return event;
                        }
                    });
                }
            });
            $$('head')[0].insert(script);
        }
    },
    getAPIEndpoint: function() {
        if(!this.APIUrl){
            this.setAPIUrl();
        }
        return this.APIUrl;
    },
    /**
     * Changes only the given texsts
     * @param {Object} newTexts
     */
    alterTexts: function (newTexts, payment) {
        if (payment && !!newTexts) {
            Object.extend(this.paymentTexts, newTexts);
            this.changePaymentStrings(newTexts);
        } else {
            Object.extend(this.texts, newTexts || {});
        }
    },
    /**
     * A short snippet for detecting versions of IE in JavaScript
     * without resorting to user-agent sniffing
     */
    ie: function () {
        var undef,
            v = 3,
            div = document.createElement('div'),
            all = div.getElementsByTagName('i');

        while (
            div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
                all[0]
            );

        return v > 4 ? v : undef;
    },

    errorCatcherLog: function (err, logTitle) {
        try {
            if (!location.href.includes('form-templates')) {
                var currFormID = document.getElementsByName('formID')[0].value;
                var errorData = JSON.stringify({ 
                    data: { stack: err.stack || err.message, agent: navigator.userAgent, referrer: location.href }, 
                    title: logTitle
                });
                JotForm.createXHRRequest(JotForm.getAPIEndpoint() + '/formInitCatchLogger/' + currFormID, 'post', errorData, function cb(res) {
                    console.log(res)
                }, function errCb(err) {
                    console.log(err)
                });
            }
        } catch (_err) {
            console.log(_err);
        }
    },
    /**
     * Creates the console arguments
     */
    createConsole: function () {
        var consoleFunc = ['log', 'info', 'warn', 'error'];
        $A(consoleFunc).each(function (c) {
            this[c] = function () {
                if (JotForm.debug) {
                    if ('console' in window) {
                        try {
                            console[c].apply(this, arguments);
                        } catch (e) {
                            if (typeof arguments[0] == "string") {
                                console.log(c.toUpperCase() + ": " + $A(arguments).join(', '));
                            } else {
                                if (Prototype.Browser.IE) {
                                    alert(c + ": " + arguments[0]);
                                } else {
                                    console[c](arguments[0]);
                                }
                            }
                        }
                    }
                }
            };
        }.bind(this));

        if (JotForm.debug) {
            JotForm.debugOptions = document.readJsonCookie('debug_options');
        }
    },

    /**
     * Set Transaction ID for Payment
     */
    generatePaymentTransactionId: function () {
        var paymentTransactionIdInput = document.getElementById('paymentTransactionId');
        if (typeof(paymentTransactionIdInput) != 'undefined' && paymentTransactionIdInput != null) {
            var msTransaction = Date.now();
            JotForm._xdr(JotForm.getAPIEndpoint() + '/payment/generateTransactionId?ms=' + msTransaction, 'GET', null, function (responseData) {
                if (responseData.content) {
                    paymentTransactionIdInput.value = responseData.content;
                }
            }, function (err) {
                console.log('err', err);
            });
        }
    },
    
    /**
     * Initiates the form and all actions
     */
    init: function (callback) {
        var ready = function () {
            try {
                // this.initSentry();

                // refresh the page upon browser back button on iOS devices.
                // #2584491

                if (!!navigator.userAgent.match(/iPhone|iPad/g)) {
                    window.onpageshow = function (e) {
                        if (e.persisted) {
                            window.location.reload();
                        }
                    }
                }

                var jotformForm = document.querySelector('.jotform-form');
                if (jotformForm && jotformForm.reset && 
                jotformForm.autocomplete && jotformForm.autocomplete == 'off') {
                        if ( window.navigator.userAgent.indexOf("MSIE ") !== -1 || window.navigator.userAgent.indexOf('Trident/') !== -1 ) {
                            jotformForm.reset();
                        }
                }
                
                this.populateGet();

                if (document.get.debug == "1") {
                    this.debug = true;
                }
                this.createConsole();

                this.getServerURL();

                this.checkJSON();
                
                if (callback) {
                    /**
                     * When callback function threw an error
                     * all init function stopped to functioning.
                     * To avoid this behaviour,
                     * callback function has been wrapped by a try/catch block
                     */
                    try {
                        callback();
                    } catch (error) {
                        console.log(error)
                    }
                }

                $A(document.forms).each(function (form) {
                    if (form.name == "form_" + form.id || form.name == "q_form_" + form.id) {
                        this.forms.push(form);
                    }
                }.bind(this));


                /**
                 * If the form is iframe embedded form, recalculate
                 * the height of the iframe after the form is fully loaded.
                 */
                if (isIframeEmbedFormPure()) {
                    window.addEventListener('DOMContentLoaded', function() {
                        JotForm.handleIFrameHeight(); 
                    });
                }
                
                if (window.location.href.indexOf("/edit/") !== -1) { 
                   var urlParts = window.location.href.split("/");
                   //  Submission ID should be given after "edit"
                   document.get.sid = urlParts[urlParts.indexOf('edit') + 1];
                   this.editMode();
               }

                //will load editMode script dynamically
                if ((document.get.mode == "edit" || document.get.mode == "inlineEdit" || document.get.mode == 'submissionToPDF' || document.get.offline_forms == 'true') && document.get.sid) {
                    this.editMode();
                }

                this.noJump = ("nojump" in document.get);
                this.uniqueID = this.uniqid();
                this.sessionID = ('session' in document.get) && (document.get.session.length > 0) ? document.get.session : false;
                this.submissionToken = ('stoken' in document.get) && (document.get.stoken.length > 0) ? document.get.stoken : false;
                this.submissionID = ('sid' in document.get) && (document.get.sid.length > 0) ? document.get.sid : false;
                this.handleSavedForm();
                this.setHTMLClass();
                this.getDefaults();
                if(this.noJump) {
                    window.parent.postMessage("removeIframeOnloadAttr", '*');
                }

                var inputSimpleFpc = document.querySelector('input[name="simple_fpc"]');
                if (inputSimpleFpc) {
                    this.payment = inputSimpleFpc.getAttribute('data-payment_type');
                }
                if (!!document.querySelector('.form-product-custom_price')) {
                    this.handleSubscriptionPrice();
                }

                if (!!document.querySelector('#payment-category-dropdown')) {
                    this.handleProductCategoryDropdown();
                }

                if (this.payment === "paypalpro") {
                    this.handlePaypalPro();
                }

                if (this.payment === "cybersource") {
                    this.handleCybersource();
                }

                if (this.payment === "braintree") {
                    this.handleBraintree();
                }

                if (this.payment === "pagseguro") {
                  this.handlePagseguro();
                }

                if (this.payment === "square") {
                    this.handleSquare();
                }
  
                if (this.payment === "mollie") {
                  this.handleMollie();
                }

                if (this.payment === "stripeACH") {
                    this.handleStripeACH();
                }
                if (this.payment === "authnet") {
                    this.handleAuthNet();
                }
  
                if (this.payment === "bluepay") {
                  this.handleBluepay();
                }

                if (this.payment === "bluesnap") {
                    this.handleBluesnap();
                }

                if (['cardconnect', 'paysafe', 'chargify', 'firstdata', 'payjunction'].include(this.payment)) {
                    this.PCIGatewaysCardInputValidate();
                }

                if (this.payment === "paypalexpress") {
                    this.handlePaypalExpress();
                }

                if (this.payment === 'echeck') {
                    this.handleEcheck();
                }

                if (this.payment === "paypalSPB") {
                  if (typeof JotForm.browserInformations === 'function') {
                    var browserInfoVal = JotForm.browserInformations();

                    if (jotformForm) {
                        jotformForm.insert(new Element('input', {type: 'hidden', name: 'browserDetails'}).putValue(browserInfoVal));
                    }
                  };
                  var interval = setInterval(function() {
                    if (typeof __paypalSPB !== "undefined" && typeof paypal !== "undefined") {
                      clearInterval(interval);
                      this.handlePaypalSPB();
                    }
                  }.bind(this), 100);
                }

                // If coupon button exists, load checkCoupon
                if ($('coupon-button')) {
                    this.handleCoupon();
                }

                if (typeof PaymentStock !== 'undefined') {
                    // var _pStock = new PaymentStock();
                    // Settimeout is needed to get correct api url.
                    setTimeout(function() { PaymentStock.initialize(); }, 0);
                }

                if (document.querySelector('.paypal-button') && $('use_paypal_button')) {
                    this.handlePaypalButtons();
                }
                this.handleFormCollapse();
                this.handlePages();
                this.checkEmbed();
                this.checkPwa();
                

                if (document.querySelector('.form-product-has-subproducts')) {
                    if (JotForm.newPaymentUI) {
                        this.handlePaymentSubProductsV1();
                    } else {
                        this.handlePaymentSubProducts();
                    }
                }

                if (window.location.hash === "#hw-izmir") {
                    $(document.body).addClassName('hw-izmir');
                }

                // If form is hosted in an iframe, calculate the iframe height
                if (window.parent && window.parent != window) {
                    var queryString =  document.referrer && document.referrer.split('?')[1] || '';

                    // Disable smart embed on forcing action or iframe embed forms
                    if(queryString.indexOf('disableSmartEmbed') > -1 || !this.jsForm) {
                        // Remove smart embed class to prevent applying embed styling
                        $$('.isSmartEmbed').each(function(el) {
                            el.removeClassName('isSmartEmbed');
                        });
                    }
                    this.setIFrameDeviceType();
                    this.handleIFrameHeight();
                    if (this.isMobileTouchlessModeTestEnv()) {
                        this.mobileTouchlessModeTest();
                    }
                    // this.removeCover();

                    // if there is a recaptcha
                    var visibleCaptcha = document.querySelector('li[data-type="control_captcha"]:not(.always-hidden)');

                    if (visibleCaptcha) {
                        var count = 0;
                        var captchaInterval = setInterval(function () {
                            if (count > 5) {
                                clearInterval(captchaInterval);
                            }

                            if (visibleCaptcha.querySelectorAll('iframe').length > 0) {
                                JotForm.handleIFrameHeight();
                                clearInterval(captchaInterval);
                            }
                            count++;
                        }, 1000);
                    }
                } else {
                    // Remove smart embed class to prevent applying embed styling
                    $$('.isSmartEmbed').each(function(el) {
                        el.removeClassName('isSmartEmbed');
                    });
                }

                // set triggerEvent function for elements
                Element.prototype.triggerEvent = function (eventName) {
                    var disabled = this.hasClassName('form-dropdown') && this.disabled ? !!(this.enable()) : false;

                    if (document.createEvent) {
                        var evt = document.createEvent('HTMLEvents');
                        evt.initEvent(eventName, true, true);
                        this.dispatchEvent(evt);
                    } else if (this.fireEvent) {
                        this.fireEvent('on' + eventName);
                    }

                    if (disabled) {
                        this.disable();
                    }
                }

                this.jumpToPage();

                if (!JotForm.getPrefillToken()) { // if prefill token is empty, not wait the 'PrefillCompleted' event
                    this.highLightLines();
                } else { // if token is available, wait the event
                    document.addEventListener('PrefillCompleted', this.highLightLines);
                }
                this.handleWidgetMessage();
                this.setButtonActions();
                this.initGradingInputs();
                this.initSpinnerInputs();
                this.initNumberInputs();
                this.initTextboxValidation();
                this.setAPIUrl();
                this.initPrefills();
                this.createManualPrefill();
                if(document.querySelector('.js-new-sacl-button, .jfFormUser-header-saveAndContinueLater-button') && !window.JotForm.isNewSACL){
                    this.getIsNewSACL();
                }

                if (this.payment === "paypalcomplete") {
                    this.handlePaypalComplete();
                }
                // if (JotForm.jsForm !== true) {
                //     this.setJotFormUserInfo();
                // }

                // Enable autofill if a form is opened from an App
                if (getQuerystring('jotform_pwa') === '1') {
                    this.setJotFormUserInfo();
                }

                if (getQuerystring('asanaTaskID', false)) {
                    this.setAsanaTaskID();
                }

                this.setConditionEvents();
                this.setCalculationEvents();
                this.runAllCalculations();
                this.setCalculationResultReadOnly();
                this.prePopulations();

                JotForm.onTranslationsFetch(function () {
                    if (document.createEvent) {
                        try {
                            var event = new CustomEvent('PrepopulationCompleted');
                            document.dispatchEvent(event);
                        } catch (error) {
                            console.log(error);
                        }
                    }
                });

                this.handleSSOPrefill();
                this.handleAutoCompletes();
                this.handleTextareaLimits();
                this.handleDateTimeChecks();
                this.handleTimeChecks();
                this.handleOtherOptions(); // renamed from handleRadioButtons
                this.setFocusEvents();
                this.disableAcceptonChrome();
                this.handleScreenshot();
                this.handleSignatureEvents();
                this.handleSignSignatureInputs();
                this.handleFITBInputs();
                if (JotForm.newDefaultTheme || JotForm.extendsNewTheme) {
                    // createNewComponent(data-type, function).render()
                    // createNewComponent({ selector: '.form-radio + label', type: 'field' }, this.initRadioInputV2).render();
                    // createNewComponent({ selector: '.form-section.page-section', type: 'element' }, this.initHeaderSection).render();
                    this.initTestEnvForNewDefaultTheme();
                    this.initTimev2Inputs();
                    this.initDateV2Inputs();
                    this.getMessageFormTermsAndCondition();
                    this.initOtherV2Options();
                    this.dropDownColorChange();
                }

                // this.handleChinaCensorship();

                this.validator();
                this.fixIESubmitURL();
                this.disableHTML5FormValidation();
                this.adjustWorkflowFeatures();
                this.generatePaymentTransactionId();

                if ($('progressBar')) {
                    this.setupProgressBar();
                }

                // if there is a donation field
                if (document.querySelector('input[id*="_donation"]')) {
                    this.handleDonationAmount();
                }
                //disable submit if nosubmit=true on request parameters
                if (getQuerystring('nosubmit')) {
                    $$('.form-submit-button').each(function (b) {
                        b.disable();
                        b.addClassName('conditionallyDisabled');
                    });
                }
                //display all sections
                //used for pdf generation
                if (getQuerystring('displayAllSections')) {
                    var sections = $$('.form-section');
                    // First hide all the pages
                    sections.each(function (section) {
                        section.setStyle({display: 'block'});
                    });
                }

                var isPreview = getQuerystring('preview');
                isPreview = isPreview ? isPreview === 'true' : false;
                if (isPreview) {
                    this.handlePreview(getQuerystring('filled') === 'true');
                } else if(this.initializing) {
                    this.track();
                }

                // when a form is embedded via a 3rd party app
                this.additionalActionsFormEmbedded();

                // old form footer
                var constructSubmitBanner = function(){
                    var button = Array.from(document.querySelectorAll('.form-submit-button')).find(function(el) {return !(el.hasClassName('form-sacl-button') || el.hasClassName('js-new-sacl-button')) });
                    var brandingText = (JotForm.newDefaultTheme && JotForm.poweredByText) ? JotForm.poweredByText.replace(/Jotform/, '<b>Jotform</b>') : JotForm.poweredByText;
                    if (window && window.location.href.indexOf('branding21') !== -1) {
                      brandingText = brandingText.replace('JotForm', 'Jotform');
                    }
                    if(button) {
                        var _formID = jotformForm.getAttribute('id');
                        var buttonWrapper = button.parentNode;
                        var banner = document.createElement('a');
                        banner.target = '_blank';
                        banner.href = 'https://www.jotform.com/?utm_source=powered_by_jotform&utm_medium=banner&utm_term=' + _formID + '&utm_content=powered_by_jotform_text&utm_campaign=powered_by_jotform_signup_hp';
                        banner.setText(brandingText);
                        banner.style.display = 'inline-block';
                        banner.style.textDecoration = 'none';
                        var fontColor = '#000000';
                        var fontFamily = '';
                        var sampleLabel = document.querySelector('.form-label');
                        if(sampleLabel !== null) {
                            fontColor = getComputedStyle(document.querySelector('.form-label')).color;
                            fontFamily = getComputedStyle(document.querySelector('.form-label')).fontFamily;
                        }
                        banner.style.opacity = 0.8;
                        // banner.style.textShadow = '0 0 1px rgba(0,0,0,0.3)';
                        banner.style.webkitFontSmoothing = 'antialiased';
                        banner.style.color = fontColor;
                        banner.style.fontFamily  = fontFamily;
                        banner.style.fontSize = JotForm.newDefaultTheme ? '12px' : '11px';
                        banner.className = 'jf-branding';
                        banner.style.paddingTop = '10px';

                        if (JotForm.newDefaultTheme) {
                            var submitWrapper = document.createElement('div');
                            submitWrapper.className = 'submitBrandingWrapper';
                            submitWrapper.style.flexDirection = 'column';
                            submitWrapper.appendChild(button);
                            submitWrapper.appendChild(banner);
                            buttonWrapper.appendChild(submitWrapper);
                        } else {
                            var buttonsParent = buttonWrapper.parentNode
                            buttonsParent.appendChild(banner);
                            buttonsParent.style.display = 'flex';
                            buttonsParent.style.flexDirection = 'column';
                            banner.style.textAlign = 'center';
                            banner.style.paddingBottom = '10px';
                        }

                        if(getComputedStyle(buttonWrapper).textAlign !== 'center') {
                          var linkDimensions = banner.getBoundingClientRect();
                          var buttonDimensions = button.getBoundingClientRect();
                          var mr = Math.abs((linkDimensions.width - buttonDimensions.width) / 2);
                          if(linkDimensions.width > buttonDimensions.width) {
                            banner.style.marginLeft = '-' + mr + 'px';
                          } else {
                            banner.style.marginLeft = mr + 'px';
                          }
                        }
                    }
                }

                var createBadgeWrapperEl = function() {
                    var div = document.createElement('div');
                    div.setAttribute('class', 'badge-wrapper');
                    return div;
                }
                var appendBadgeWrapperIntoForm = function() {
                    var selectParentPosition = document.querySelector('.form-all')
                    var badgeWrapper = selectParentPosition.querySelector('.badge-wrapper');
                    if (badgeWrapper) return badgeWrapper;
                    var el = createBadgeWrapperEl();
                    selectParentPosition.appendChild(el);
                    return el;
                }
                var appendBadgeIntoForm = function(banner) {
                    var badgeWrapper = appendBadgeWrapperIntoForm();
                    badgeWrapper.appendChild(banner);
                    banner.addEventListener('load', JotForm.handleIFrameHeight);
                }
                var displayBadge = function(badgeUrl, badgeClass, badgeAlt, badgeLink, utmParameter, urlParameter) {
                    var formID = document.querySelector('input[name="formID"]').value;
                    var banner = new Element('img', {
                        class: badgeClass,
                        src: badgeUrl,
                        alt: badgeAlt,
                        style: 'display:block;width:95px;',
                    });
                    var badgeWrapper = document.createElement('a');
                    badgeWrapper.setAttribute('class', badgeClass + '-wrapper');
                    if (!JotForm.enterprise) {
                        badgeWrapper.setAttribute('href', badgeLink + '/?utm_source=formfooter&utm_medium=banner&utm_term=' + formID + '&utm_content=' + utmParameter + '&utm_campaign=form_badges' + urlParameter);
                        badgeWrapper.setAttribute('target', '_blank');
                    }
                    badgeWrapper.appendChild(banner);
                    appendBadgeIntoForm(badgeWrapper);
                }

                if (JotForm.showHIPAABadge) {
                    displayBadge(
                        'https://cdn.jotfor.ms/assets/img/uncategorized/hipaa-badge' + (JotForm.showAlternateHIPAABadge ? '-compliance' : '') + '.png',
                        'hipaa-badge',
                        'HIPAA ' + (JotForm.showAlternateHIPAABadge ? 'Compliance' : 'Compliant') + ' Form',
                        'https://www.jotform.com/hipaa',
                        'hipaa_compliant',
                        ''
                    );
                } else if (JotForm.showJotFormPowered == "old_footer" && window.JotForm.useJotformSign !== 'Yes') {
                    constructSubmitBanner();
                }

                if (JotForm.isEncrypted && window.FORM_MODE !== 'cardform') {
                    displayBadge('https://cdn.jotfor.ms/assets/img/uncategorized/encrypted-form-badge.png', 'encrypted-form-badge', 'Encrypted Form', 'https://www.jotform.com/encrypted-forms', 'encrypted_form', '');
                }

                if (JotForm.showA11yBadge) {
                    var formID = document.querySelector('input[name="formID"]').value;
                    var banner = new Element('img', {
                        class: 'accessibility-badge',
                        src: 'https://cdn.jotfor.ms/assets/img/uncategorized/access-image.png',
                        alt: 'accessibility badge',
                        style: 'display:block;width:54px;',
                    });
                    var A11yWrapper = document.createElement('a');
                    A11yWrapper.setAttribute('class', 'accessibility-badge-wrapper');
                    if (!JotForm.enterprise) {
                        A11yWrapper.setAttribute('href', 'https://www.jotform.com/accessible-forms/?utm_source=formfooter&utm_medium=banner&utm_term=' + formID + '&utm_content=accessibility_enabled_form&utm_campaign=form_badges');
                        A11yWrapper.setAttribute('target', '_blank');
                    }

                    var A11yContent = document.createElement('div');
                    A11yContent.setAttribute('class', 'a11y-content');

                    var A11yTitle = document.createElement('div');
                    A11yTitle.setAttribute('class', 'a11y-title');
                    A11yTitle.textContent = 'ACCESSIBILITY';

                    var A11ySubTitle = document.createElement('div');
                    A11ySubTitle.setAttribute('class', 'a11y-subtitle');
                    A11ySubTitle.textContent = 'ENABLED FORM';

                    A11yContent.appendChild(A11yTitle);
                    A11yContent.appendChild(A11ySubTitle);

                    A11yWrapper.appendChild(banner);
                    A11yWrapper.appendChild(A11yContent);
                    appendBadgeIntoForm(A11yWrapper);
                }

                if (typeof JotForm.enterprise !== "undefined" && JotForm.enterprise) {
                    var form = document.querySelector('.jotform-form');
                    var enterpriseServer = new Element('input', { id: 'enterprise_server', type: 'hidden', name: 'enterprise_server', value: JotForm.enterprise });
                    form.appendChild(enterpriseServer);
                }

                if (JotForm.hipaa) {
                    var form = document.querySelector('.jotform-form');
                    var fileServer = new Element('input', { id: 'file_server', type: 'hidden', name: 'file_server', value: 'hipaa-app1' });
                    form.appendChild(fileServer);

                    var targetEnv = new Element('input', { id: 'target_env', type: 'hidden', name: 'target_env', value: 'hipaa' });
                    form.appendChild(targetEnv);
                }

                // Campaign Injection
                if (typeof JotForm.forms[0].id !== "undefined" && false) {
                    JotForm.loadScript('https://www.jotform.com/jfFormFooter/assets/js/main.min.js?v_' + (new Date()).getTime());
                }
                // only chrome support IDNs:  https://www.jotform.com/ticket-categorize/1711024
                if (jotformForm) {

                    var mobileSubmitBlock = false;
                    if (/Android|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent) ) {
                        var selectorInputs = 'form input:not([type="hidden"], [name="website"], [data-age]), form textarea:not([type="hidden"])';
                        var getFields = document.querySelectorAll(selectorInputs);
                        Array.from(getFields).forEach(function(item, index) {
                            item.addEventListener('keypress', function (keyEvent) {
                                var nextItem = getFields[index + 1];
                                if (keyEvent.keyCode == 13 && nextItem && keyEvent.target.type !== 'textarea') {
                                    keyEvent.preventDefault();
                                    mobileSubmitBlock = true;
                                    $(nextItem).focus();
                                } else {
                                    mobileSubmitBlock = false;
                                }
                            })
                        });
                    }

                  jotformForm.addEventListener('submit', function (e) {

                    var fields = $$('input[type="email"]');
                    if (typeof punycode !== "undefined") {
                      fields.forEach(function(field) {
                        field.value = punycode.toASCII(field.value);
                      })
                    }

                    if (mobileSubmitBlock) {
                        e.preventDefault();
                    }
                  });
                }

                this.handleWidgetStyles();
                if (typeof window.CardForm !== 'undefined') {
                    window.addEventListener('load', function () {
                        if (history.state !== null && typeof history.state.submitted !== 'undefined' && history.state.submitted) {
                            history.replaceState({submitted: false}, null, null);
                            var productIndex = null;
                            CardForm.cards.forEach(function (item, index) {
                                if (item.type === 'products') {
                                    productIndex = index;
                                }
                            });
                            if (productIndex !== null) {
                                CardForm.setFormMode('form');
                                CardForm.setCardIndex(productIndex);
                            }
                        }
                    });
                }
            } catch (err) {
                JotForm.error(err);
                if (!JotForm.validatorExecuted) {
                    try {
                        this.errorCatcherLog(err, 'FORM_VALIDATION_NOT_ATTACHED');
                        this.validator();
                        this.disableHTML5FormValidation();
                    } catch (err) {
                        this.errorCatcherLog(err, 'FORM_VALIDATOR_ERROR');
                    }
                } else {
                    this.errorCatcherLog(err, 'FORM_INIT_ERROR');
                }
            }

            this.initializing = false; // Initialization is over
            var event = new CustomEvent('JotformReady');
            document.dispatchEvent(event);
        }.bind(this);

        if (document.readyState == 'complete' || (this.jsForm && (document.readyState === undefined || document.readyState === 'interactive'))) {
            ready();
        } else {
            document.ready(ready);
        }
    },

    /**
     * Checks browser or device agent
     */
    browserIs: {
        userAgent: 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '',
        vendor: 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '',
        appVersion: 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '',
        chrome: function(){return /chrome|chromium/i.test(this.userAgent) && /google inc/.test(this.vendor)},
        firefox: function(){return /firefox/i.test(this.userAgent)},
        ie: function(){return /msie/i.test(this.userAgent) || "ActiveXObject" in window || /edge\//i.test(this.userAgent)},
        safari: function(){return /safari/i.test(this.userAgent) && /apple computer/i.test(this.vendor)},
        operabrowser: function(){return this.userAgent.indexOf("Opera") > -1},
        iphone: function(){return /iphone/i.test(this.userAgent) || /iphone/i.test(this.appVersion)},
        ipad: function(){return /ipad/i.test(this.userAgent) || /ipad/i.test(this.appVersion)},
        ios: function(){return this.iphone() || this.ipad()},
        android: function(){return /android/i.test(this.userAgent)},
        androidPhone: function(){return this.android() && /mobile/i.test(this.userAgent)},
        androidTablet: function(){return this.android() && !this.androidPhone()},
        blackberry: function(){return /blackberry/i.test(this.userAgent) || /BB10/i.test(this.userAgent)},
        linux: function(){return /linux/i.test(this.appVersion)},
        mac: function(){return /mac/i.test(this.appVersion)},
        windows: function(){return /win/i.test(this.appVersion)},
        windowsPhone: function(){return this.windows() && /phone/i.test(this.userAgent)},
        windowsTablet: function(){return this.windows() && !this.windowsPhone() && /touch/i.test(this.userAgent)},
        mobile: function(){return this.iphone() || this.androidPhone() || this.blackberry() || this.windowsPhone();},
        tablet: function(){return this.ipad() || this.androidTablet() || this.windowsTablet()},
        desktop: function(){return !this.mobile() && !this.tablet()}
    },

    iframeRezizeTimeout: null,
    /**
    ** Call handleIFrameHeight only periodically so millions of messages are not sent when user has lots of conditions
    */
    iframeHeightCaller: function() {
        if (window.parent && window.parent != window) {
            clearTimeout(this.iframeRezizeTimeout);
            this.iframeRezizeTimeout = setTimeout((function() {
                this.handleIFrameHeight();
            }).bind(this), 50);
        }
    },

    setIFrameDeviceType: function() {
        if (window.FORM_MODE !== 'cardform') {
            return;
        }
        window.parent.postMessage('setDeviceType:' + window.CardLayout.layoutParams.deviceType + ':', '*');
    },

    isMobileTouchlessModeTestEnv: function (){
        try {
            return ((window.self !== window.top) && (window.location.href.indexOf("mobileDebugMode") > -1));
        } catch (e) {
            return false;
        }
    },

    mobileTouchlessModeTest: function () {
        var touchlessBox = '<div class="touchless-wrapper"> <div class="touchless-box"> <div class="touchless-info"> <span class="touchless-title">Contactless Form</span> <span class="touchless-desc">Scan QR code for fill the form on your device or continue to fill it here.</span> </div><div class="touchless-qr"> <img src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAYAAACLz2ctAAAAAXNSR0IArs4c6QAAAHhlWElmTU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAIdpAAQAAAABAAAATgAAAAAAAACQAAAAAQAAAJAAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAKCgAwAEAAAAAQAAAKAAAAAAdWGhKAAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAABxpRE9UAAAAAgAAAAAAAABQAAAAKAAAAFAAAABQAAAKwS3X340AAAqNSURBVHgB7F1PqE1fFL4DAwMDycDARAZSkqSkDF6MjKRM1EtJ0ZNS5JUSRRElIYkkmShkgPx5JEohJBGhCPVMFIp4xP3d791zfvfctb513t733Hvuw9q1u2evt/bea6/znbXXPnud/SqVSqU6GvOxY8eqoenNmzd0DN+/f1dNvH//nvJ+/fpV8X748IHyxugLbYSmHTt2qP6WLFkSWt3kgy5jZC6Z1wEIhTsAu4aDrnWc+1S6BazfF7eAXZqiHYAOwFwL1Wk/wQH4DwOwr6+vevXq1dLypEmTFNgtAD5+/Lh669atpnzz5k0q6+/fv5VjPjQ0RHl//fqleH/8+EF5mW4OHz6sxoCHlC1C0JccA8rXr19X/T169EjJBcLg4KBqA7phCbqUBgM6Z+PoFA2YkjIkZe0DQogy0+zZs5VwFgAXLFigePfv31+muLSvz58/K7ksAGLBw24GVuihCWOWbUA3LDEAQudlJmBKypuUHYDtuBEOwHwtOgDz9VP4rw7AfBU6APP1U/ivDsB8FToA8/VT+K8OwHwVtgWAU6ZMqY4fP77lfPbsWSplpxYhvb29LcuKcW7fvp3K29/fr9rdsGED5d26daviXb16NeVlRKzamc5fv37N2CktZhGCe8T6C6UBIyy1BYAQwljJBNFPnjzJZKt2CoDYRSgi76ZNm6i8a9euVe2CxhLakDIsX76csVIa9rNlfZSx/x2aYgCIe8T6C6UBIyw5AFvY0XEA6jckIwHRAZh5/NwC1pXhFjCxPj4F1y2KT8FNlrWpMDz/Y75m6U/zAe/du1c9d+5cU2Yxd9a0EjMF9/T0VB88eKDywMBAU/+Q5/Lly4oPdX/+/KnUjm07OQaUsXUn+3vx4oWqD4JbwC5ZQHY3rIBUBsIYALL6oLG94NG8FeeLkASseGpZKroX7ACsz3jWXrAD0AHInjtF61QwggPQAajAxggOwAQolu/D6GWvgtmN8ynYp2CFi5idEFRGoGk2v3r1qootoJDMgl/ZwwLa2LFjaZugW3UknS1Cvnz5QutDtpAxgGfcuHGqjXbEA/oUPMIUrNBbI1ifZUowdKPMAGitgovK5wAcYVpuxxTsANTvbVPgOgAdgGpadAtYNxl/TTCCW8B/2AIiVgzTaKv57du3DD9R4VisgRgfcP78+cHyb9u2TVm0dLqTv7NmzaLt3r17t/rkyZOmfP/+fcrbql7TeviqjqWYrTjoMm2vlV8r5rMtFpANrh202FWw7DMGgNgLDk2YPiXQrHKn4gFDZc3jiwFgXjtF/uYATPxTB2D+e8AiIMur6wB0ADZZc2svOA9ERf7mAHQAOgCtJ8h9QEsz7aH/cT4gtoQAirLymDFjmp5OOPpWOBa+KJNyHT16tIrATZkXLVqk2rV8wC1btqh2d+/erdpEHytXrlTttmMRgjHLsVlf22GFKnmtr+0YAKFzWb+T5ZwtUPu9krXiK4NuATAmHpB9E2IBEGHyclwxAantACBkkzJY5wMWjYaR/XSx7ADEROcA7BoOutaxetqzT6FbwPp9cQuYrB6z4Cjj2gH4jwAQN3o0ZusLrxgf8Nq1a2psFy5cqL58+VJlbNHJB2vx4sWKD3Wx3SR1dvv2bbpkxbab5MWBmizhMErJe+rUKSrDihUrlLxWNAx0KdsdLeUKU8RopsUAkI0jJiJaAjIt4yCispJ1NEcqS/bXAmBZsrbSjwOwBRfDAdgK1HgdB6ADkCOjJKoD0AFYEtR4Nw5AByBHRknUChxXmXHmSJkJW0hShkuXLlERwJd1vHGNbR5Z3yofOnRo+AwWnMPSat65c2dwf8xfxMLCkk/S586dq8aLMT98+FDJj75kfatsbdtRpdeIVjuhdOtfSNTGol9EI3SmzIQ9SCkHXhOwhAFL3piytRXH+rJo2HYL7bNT34QgCFcmPFChckHnoQmfwIa2a/HhMCWWavwOQKaYPJoDUGOG4ShLcwAmD5pbwDp43AJmTIxPwfEW5a+ZghHWI7P19dq7d++GTyHA4NuZEc8nZbh48SLt4/jx44p31apVwT4Kol5CZf/06VPmMWlcsil4+vTpSi6M6du3b42KyZV1NEd2yhrp+syZM2ocz58/pzJI3aKMeEKWcGqD1A+OPmFtsHhLS25zCmZCWLSiJ6RawiHIUybsuTJ+doooFMZ4i9LaEQ8ox4Vy2UdzMBksGoAp9YazaFjCSa2S1yo7AMliy1JWSncA1l0DB2AGPG4BbX8Rr6iKJreAiQZ9CraBllpo+esAzFgqqZy8svuA8WBj+vwjAYiQb5mt/9JddBGyb9++KrahZMaqUsqAQEzJh/LGjRsV74kTJyjvwoULlZO8fv16yovgU3lTLR8QboCUjbkG1nRorYKhd9muVd68ebOS1wIgAnOlfq3y1KlTVbuWDwjDYckn6ey/10M/NZ3rp8/aiisKQGvpX/Q9IF4RsAQly/FZL6JjPkpifcXQrFUwgmVDE8Ysx2YBENuakjembAEwVNY8vpocDkAoyAGocZBiwwGYeYTwlKeKSX/dAtbB4xaQWNMUJPj1Kbj+JPkU3LAoFfhEMuOgQ/gjMuOoCsnLnHeADUddSN6nT582es5cwUeRvPh6TfaP8syZM5UFXLNmDeWdN2+e4kU/LJ0/f17JcOPGDcZaRdwdky2Uhi0zOV6UsTgJTZ3yAZcuXapk27t3Lx1vzMLLGheNiMa2SdZypdesEQSvpn/P/lqrHtYGo1nvAbN9tHJtAZDJYNHYXnCMLPA3i6ZOARCnucpkxQO2I3DZASi1HVB2ANZ9TgfgCD4ns0puAe3VLvTlFjCxQD4F55tin4IT/bgPmG9RmBV2H7DxcFWgDJnnzJlDFxa9vb2KF//9G68VZF63bp3ivXPnTqPnzBVWzFIGdlYLu5mxNGsKPnLkiJJBypSW2WGLy5YtUzqATthhlhMnTgzuC9uXLJVpAdG/vL8osz18JitomNpT/WV/a/cv/gnO1kFQIkt4e57lw3XMe0BZt11lC4BQSpE+sDBhCfvJRdrFdiJLZQOQyRBDizqkPEZhDsD6A+wAzIejAzCx9G4B82c8tgrOh1bYXx2ADsAgV2BUA7C/v78KnyabBwYGqvj6X2bmqFs+4IEDB5razLYvrydMmBCkSMuNsCzg6dOnlQxYdFntSLo1BV+5ckW1K8eUVz548KDSLXSNRZ6UoR3BCNCDvJcfP34MM3MJl6yPMu6xlDcp55vkbCUmhfUaJlsvvbYAyNq1aCwaJm0/5NcCIOsPigtpEzwWAFm7MTQEdobK0A4Asr5iw7FYGzk0B6AFCAdgHRsOwAxC3ALaBsMtYOLoW+bWp+DMkxR46VNwBlRMZ+4D1i2S+4ANdFgGyKDbJl1W6OvrG3a2oew09/T0BDvJlgXctWvX/+2l7Vq/7MMo/D81BImG5GfPntG+hoaGGhpMrmJ8wMmTJ9N2Y4JM8UZBjnvPnj1B48LYBwcHVX20N2PGDHWPpk2bFtwu9CDlssox9wIy1zAWDsCivBYA2VdxMX1hWyo0IWqZtY29TZliAMjaBA1thCas0GU71lYcaxMRyrK+Ve7U8WwwEDGpJp8DEDpwANqwsSKiGXZiAfgfAAAA//8eNioCAAALVElEQVTtXVuoTV0UPkmSJA8ePIg8ScmDvCmJB+WB5EnEg1JE3kRKUgghPJGEhHJCiHJLbrk+CCnCcdcJHXIX+9/fXnv95h7jG3uvuW//dv4xa7bWHHuMMecc65tjXtfabW1tbblmxf379+dYGDVqVE1l2LJlC1NLaa9fv6Z5ff78WfG/ffuW8sbYCzqyhtWrV6v8pk6dmlU89/PnTyVvlRU2zxp+//6dWW///v2zqi3w5cvnAIQNHIA2bhoKwAULFuSyxp49e6qWMHr06Mzyx48fz3348EHFFStWKB0TJ05UeQEos2fPVrznz5+n1gOoZH6XL1+meu/fv694b968SXljGm2tHnDs2LGqXLJOafrVq1fKNtazXbt2LbXZjx8/VH6oA9ODZy9tYXlAeOe0nOG1jZbCIEK5zPDo0aMGtybfvXtXyUPfr1+/FPPDhw8pLyqSNaD7kuVtdrpWAMaUd/z48VlNY/JhmCTzHDp0KOXHs5e8FgBPnz6teAuyVLNBdADGD1ccgAmYHIBNHOuGXsEB6ADkrr9JgHQAOgAdgMaQipFbYgzY0dGRW7p0qYpsFmxNQtavX6/kT5w4kYNHkHHdunWKF3olH9KbNm1SvFeuXGG2zH38+JHqYHrZrHvmzJlUPmZyg7xkwEyT2Xf48OGqsYwZM4aWYdGiRYo3ZhKCpRVWhmvXrqn83rx5Q3lRtnC4gXtrEoI6M7vTWfClS5eUYplRmrYAiJlTypNeYxaid+7cKZ9bIQ0jp/rSa8xCNFWaJ86aNUvpxQNiAUsSad6VrgyAWB6qJJf+bi1Eo84pT3qNASBWHlK58IqVChkaug4oM0PaAZjMdh2ACTocgEErcQ+YGMM9YHEW6V1w+bVB74ID70Fu2zAekfHChQuFMRHGRWHs0aOHGjfEAHDDhg0qL+S9ePHiknyQZ3t7O+Vdvny54j116hSpGiehO5H1RRqTprCuuD948CBVsmfPHsU7adIkZRuMrRgAP336RHknTJig9K5atYqWd8mSJUqHNQbE7pGsc2dnp5JHeU+ePKl4u7q6VLlgnxEjRigdffv2VfIy7zCdz1O3YKxasxCzE8ImISwv0Bq1FcfqEHMahslbNOxvsvoxAOIBMF6UTYZv375RXiZvARATOsaflRazFZdVZ8DnAIQxAIpaggNQ4ygAWbkGoAXdA8ZD0QGoceQAJDjyLjgeKN4FB+PUmONYBH85B+BfAEBsS+F4uIwxW3Exk5Bly5apvKZPn07HDZgxy3Lh4CgLmElLXtAAQhl37dqleKVsufT8+fNpeefOnav0Lly4kPKiTDJYk5Bjx46pOrx7906KF9JfvnxRvLL+5dLPnj1TdYAtsGFRTi78bePGjbTO+W46vkWEMjHLMKFcPe+trTi2ZwvDsYBlhXqWqRpdeGAyWAB8+vSpZG1Y2toJuXXrVuY8zfOA1RgqlHEA1taAQ1s6AKvwhg5AB2AWN+gesNi4vAvOApdSnqZ3wTiXhvGTjGwrbvv27TmMU2ScM2eOkpf6qkljqyfstnCP7TmZP9Kgyzx27NhBeadMmaL0Dhw4UMlD34ABAxQvaDIvpKFDltdK3759W5UNb7ox/uvXryteZoNYGsDGAqvbo0ePGCuloW5MR75uuguJWYhm8qBZFaGliyCy0zBWGWB8GTDOsvglPeY4Fs4IsgAdUm8rp9l5QFavetHytnAAMhuA5gCsF8xsPQ5A0gBTQDoAbeDU6xcHoAOwZIjgXXCFpuVjQD1kSj12Pa7dGoDYKsKuRZZ47949CsUYAGIWLPM6fPhwDrsIMo4bN67EE+BhWl3w+/fvlfydO3dUXsh75MiRSi/ykvlbacx26wGsrDrwJqC0GbYpWXj8+LHilbKV0vly6RbVqFkwWhfLj9Fi3opj8hYtZh3QAiB7GNZxLFYObPtlDZjJMx3NpLX0aRjLEGwZxgGYNHYHYInTK0kUWpt7wMQm7gETO7gHDPqrmDEg887eBWuHw+wU0hoKQDxQGa1jNpMnT1a8UjZNB5j59/bJkyeZ5fF2FgvQHxon9j4GgDjjhwOwMrJyxYwBp02bpnTKPNI0JjypTcMr2+Lr3bs35Q3lKt0PGjRI2Xfw4MG0vPjUSiV9lX6nn+ZgBm4VGioUC7qQPwaAoVx4D7DJEAPAUFele+yfsoDZpZSFbWoN7ONEMp80bTmqmDI4AIvWijmQ6gBMunEHIFlCSlundXUPWN4/uQcsb5/CmMMCVxa6A7C8gR2A5e3jACzap9uMAbHj0IrxwYMHFIovXrzI4Qv6Ydy3b58akMMbXrx4sYQPMjdu3KD1xYHJUCfu8boB86rY4pM2O3TokJKHDnbQlem0aEOGDFF5IW/8fYOUsSYhsKUs75EjR6h9Yzwg/jJD6t27dy/VaxHzdYhfF2qGDCqWNWAflZUp5kAq+zQHvuvC9DJaKxxItQAIW8oyW/+UFANAqRNp6wup1rPMyzgAYQMHYAIRB2CxQbgHjHcM7gHr6E0dgP9jAGKbB2OEZkX2yY9GARDjOlavr1+/qmGKNQYcNmyY0oH/u8N3DmXEPwCw/BiNfX8xZohkeUBMOGR+M2bMUPUFgXXBeBtSyltpTI6kDdj3H9PM6RjQOg2TCtX7ispIQzcKgDFltwAYsxMCHVkD1iilHWLSFgCz5g8+BkDrMIKll5UZ35FhIc+rXb0DMDGVAzDBhgOQNZ2AFrMME4hVvHUAOgArggQMDsAEKN4FZ4KLZvIxYGITHwMWx4PWGBDbTRikVhvxoUMWGgXAzZs3V11W1HHlypV0UhAzCYEOaa+rV68yMxQ+AsnG5FlpOEwq84pNs63Dfv36Ub04LMsCK29dJiG1LhPAGCw0CoDMEPWgxQCQ5We9lFSrB2R5NZJmnQdkeToAyWyfGSoLzQGYjDkdgEV3ak1CsoCpGh4HoAOwpCd3ACaAqKYx1SLjHrAIw5cvX+awWCoj2+Lr06eP4oNcr1696ISDPaAYD4htTVku/Nk0XtyXEecMZX4ol5RHmn2oU8qmaXw8k+nISsOZxFRXeMV5S1kHbLuFPOl9tx4DlrjDIIE3ylIDpNdmH8lnW3HWf8WlZQyvMW/FhXLhPQ7G1hIAslBfNfcOwOIkxAEYD0UHYLzNChLuAZOxoXvAovdp1DqghU8HoAOwZOzgAEyaio8B/7iM/HhST+GtrbhW3QnBf6HhDTYZseWFpYIwYjAs+ZBm//7NbANazCyYTUIwUwzLVO4edWDlRT3KyYW/nTlzhupgehntwIEDJY7Esks5ereehFjrgDFvxZUznvytVgD+af+V76wPVKLOWQMO98o6NDvtACw+rZj/CbEekgNQ95qWrVK6A9AB+J96QQegA/DvByC2bjARqTbiPCELjTqOxV42f/78OX0Q2NqS9bK2u9gfQ+NsnJRHurOzk1U5M+379+9UL+qRNWzbto3WmZXXoqVdaZYr01EXD5i1wrF8jQJgFmOlPAys1jshqUx4rcenOdj/BcfYEl9VDctU7h42zxpidkIAPhawsmKURw8orWUYprgeNAdg8gwcgMU1QQdg0qzcAyZ2cA9Ywc1a64CGy6ddgXfBtpEdgLZtCr84ABMDdZsx4Lx583LohpsV2V8OWJ/mwBaTLNeaNWuoV2tvb89h9pUlnj17VundunUr1bt7926lE/+bxkJHR4fitcpz7tw5VQZZ1zTNdnksAOL7NDJPHCZNdVW6YitPyiMNnMhexpqEdHV1UR15eT0JaQWaBUC8fJ21fOwhMZCAVutX8i29MfSYt+LYVpwFQHYcyzq5zGyL5TcWsG8s+S0AMnnQ8vIOQBjCAWjjwAEIhBSDe8AEKO4BG+w5vQu2PRJ6LQegAzB1ynW7/h/HgP8A5W+9/maOy+sAAAAASUVORK5CYII=" width="80" height="80"/> </div><style>.jfCard-wrapper.with-qr{padding-top:220px;padding-bottom:50px}.isMobile .jfCard-wrapper.with-qr{padding-top:150px}.jfCard-wrapper.with-qr .jfCard-question,.jfCard-wrapper.with-qr .jfReview-content{max-height:100%!important}.touchless-wrapper{display:flex;align-items:center;justify-content:center;width:100%;padding:20px 14px;text-align:left}.touchless-wrapper,.touchless-wrapper *{box-sizing:border-box}.jfCardForm .touchless-wrapper{padding:12px 30px}.formMode .jfWelcome .touchless-wrapper{display:none}.jfCard-wrapper .touchless-wrapper{position:absolute;top:0}.touchless-box{position:relative;display:flex;flex-direction:row;align-items:center;max-width:500px;padding:20px;background-color:#606d8f;border-radius:10px;box-shadow:0 4px 4px rgba(0,0,0,.05);border:1px solid rgba(44,51,69,.3)}.jfCardForm .touchless-box{background-color:#fff}.isMobile .touchless-box{max-width:400px;padding:16px}.touchless-wrapper:first-child{margin-bottom:0;padding-bottom:0}.touchless-info{flex:1;margin-right:20px;padding-left:5px}.isMobile .touchless-info{margin-right:16px}.touchless-title{display:block;margin-bottom:15px;font-size:22px;font-weight:700;color:#fff}.jfCardForm .touchless-title{color:#2c3345}.isMobile .touchless-title{margin-bottom:10px;font-size:20px}.touchless-desc{display:block;font-size:15px;line-height:19px;color:#fff}.jfCardForm .touchless-desc{color:#2c3345}.isMobile .touchless-desc{font-size:12px;line-height:16px}.touchless-qr{padding:5px;background-color:#fff;border-radius:4px}.touchless-qr img{display:block;width:100px;height:100px}.isMobile .touchless-qr img{width:80px;height:80px}@media screen and (max-width:400px){.jfCardForm .touchless-wrapper{padding:12px 10px}.isMobile .touchless-box{padding:12px}.touchless-title{margin-bottom:7px;font-size:17px}}</style> </div></div>'
        var maskWrapper = document.querySelector('.jfForm-background-mask');
        var welcomeWrapper = document.querySelector('.jfWelcome-wrapper');
        if (window.FORM_MODE == 'cardform') {
          if (window.CardForm.hasWelcome || document.querySelector('.jfWelcome-wrapper').classList.contains('isHeader')) {
            var welcomePage = document.querySelector('.jfWelcome');
            var startButton = welcomePage.querySelector('.jfWelcome-buttonWrapper');

            if (startButton) {
                startButton.insertAdjacentHTML('beforebegin', touchlessBox);
            } else {
                welcomePage.insertAdjacentHTML('beforeend', touchlessBox);
            }
          } else {
            var firstCardWrapper = document.querySelector('.form-line:not(.always-hidden) .jfCard-wrapper');
            var firstCard = firstCardWrapper.querySelector('.jfCard');

            if (firstCard) {
                firstCardWrapper.classList.add('with-qr')
                firstCard.insertAdjacentHTML('afterend', touchlessBox);
            }
          }

          window.onload = function() {
            if (maskWrapper && welcomeWrapper) {
                maskWrapper.style.width = welcomeWrapper.getBoundingClientRect().width;
                maskWrapper.style.height = welcomeWrapper.getBoundingClientRect().height;
            }
          }
        } else {
            var formAll = document.querySelector('.form-all');
            var firstPage = formAll.querySelector('.form-section');
            var firstElement = firstPage.querySelector('li');
            var isFirstElementHead = firstElement.dataset.type === 'control_head';
            
            if ( isFirstElementHead ) {
              firstElement.insertAdjacentHTML('afterend', touchlessBox);
            } else {
              firstPage.insertAdjacentHTML('afterbegin', touchlessBox);
            }
        }
    },

    calendarCheck: function(){
      var section = JotForm.currentSection;
      
      if(!section){
        section = document.querySelector('.form-section');
      }
      
      var formLineCount = section.querySelectorAll('.form-line').length;
      var calendar = false;

      section.querySelectorAll('.form-line').forEach(function (element, index) {
        if(index >= formLineCount - 2 && element.dataset.type === 'control_datetime'){
          var elementId = element.id.split('_')[1];
          calendar = JotForm.getCalendar(elementId);
        }
      });

      return calendar;
    },
    handleIFrameHeight: function () {
        var form = $$('.jotform-form').length > 0 ? $$('.jotform-form')[0] : $$('body')[0];
        var height = Math.max(form.getHeight(), form.scrollHeight, form.offsetHeight);
        var isEmbedForm = $$(".supernova.isEmbeded").length > 0;
        var isEmbeddedInPortal = $$(".supernova.isEmbeddedInPortal").length > 0;
        var calendar = JotForm.calendarCheck()

        // Cover Image
        var formWrapper = document.querySelector('.form-all');
        var formWrapperComputedStyle = getComputedStyle(formWrapper);
        var marginTop = parseInt(formWrapperComputedStyle.marginTop, 10);
        var marginBottom = parseInt(formWrapperComputedStyle.marginBottom, 10);
        if (!isNaN(marginTop)) {
          height += marginTop;
        }
        if (!isNaN(marginBottom) && !isEmbeddedInPortal) {
            height += marginBottom;
        }

        if(calendar){
          height += (calendar.offsetHeight / 2);
        }
        // if this is a captcha verification page, set height to 300
        height = ( document.title === 'Please Complete' ) ? 300 : height;

        if (window.FORM_MODE === 'cardform') {
            $(document.body).addClassName('isEmbed');
            var nextHeight = 0;
            var hasWelcome = $(document.body).hasClassName('welcomeMode');

            // Calculating welcome mode height
            var welcomeModeHeight = 0;
            if (hasWelcome) {
                var welcomeModeWrapper = $$('.welcomeMode .jfWelcome-wrapper');
                if (welcomeModeWrapper.length > 0) {
                    welcomeModeHeight = welcomeModeWrapper[0].getHeight();
                    var additionalPadding = 100;
                    welcomeModeHeight = welcomeModeHeight + additionalPadding;
                }
            }

            var welcomeDescriptionHeight = 0;
            var welcomeModeWrapper = $$('.welcomeMode');
            // Welcome texts are hidden below 768px
            if (welcomeModeWrapper.length > 0 && window.innerWidth > 768) {
                // Approx.
                welcomeDescriptionHeight = 60;
            }

            var formModeWrapperHeight = welcomeDescriptionHeight;
            var formModeWrapper = $$('.jfWelcome-header');
            if (formModeWrapper.length > 0) {
                formModeWrapperHeight += (formModeWrapper[0]).getHeight();
            }

            var maxQFieldsHeight = 0;
            $$('.jfQuestion-fields').each(function(field) {
                maxQFieldsHeight = Math.max(field.getHeight(), maxQFieldsHeight);
            });

            var maxCardHeight = 0;
            $$('.jfCard').forEach(function(card) {
                var children = card.getElementsBySelector('.jfQuestion-label, .jfQuestion-description');
                var childrenHeight = 0;
                children.forEach(function(child) {
                    childrenHeight = childrenHeight + child.getHeight();
                });
                return Math.max(maxCardHeight, childrenHeight);
            }, 0);

            // var emInPx = window.getComputedStyle(document.querySelector('.jfCard')).fontSize.slice(0,-2);
            var jfCard = document.querySelector('jfCard');
            if(jfCard) {
                var emInPx = jfCard.getStyle("fontSize").slice(0,-2);
                var approxSpacingsInEm = 8.725;
                var spacingsInPx = emInPx * approxSpacingsInEm;
                var formHeight = (((formModeWrapperHeight * 2) + maxCardHeight) + spacingsInPx) * (50 / 29);
            }
            var isSmartEmbed = $(document.body).hasClassName('isSmartEmbed');
            // height = Math.max(formHeight, welcomeModeHeight);
            // this calculation should be calculated from ground
            height = isSmartEmbed ? 464 : 640;

            // checking for smart and/or inline embed settings
            try {
                var formFrame = window.parent.document.querySelector('[id="' + form.id + '"], [id="JotFormIFrame-' + form.id + '"]');
                if (formFrame && formFrame.hasAttribute('data-frameHeight')) {
                    height = formFrame.getAttribute('data-frameHeight');
                }
            } catch(e) {
                /* noop */
            }
        }
        if (isEmbedForm) {
          var computedStyles = getComputedStyle(document.querySelector(".supernova.isEmbeded"));
          var backgroundImage = computedStyles.getPropertyValue("background-image");
    
          if (backgroundImage && backgroundImage != 'none') {
            var backgroundStyles = new URLSearchParams();
            var properties = ["background-image", "background-size", "background-position", "background-repeat", "background-attachment", "background-color"];
              properties.forEach(function (property) {
                backgroundStyles.set(property, computedStyles.getPropertyValue(property));
              });
            window.parent.postMessage('backgroundStyles:' + backgroundStyles.toString() + ':' + form.id, '*');
          }
        }
        if ("console" in window) {
            if ("log" in console && JotForm.debug) {
                console.log('Debug : setting height to ', height, ' from iframe');
            }
        }

        window.parent.postMessage('setHeight:' + height + ':' + form.id, '*');
    },
    removeCover: function () {
        $$('.form-cover-wrapper').each(function (el) {
            el.remove();
        });
        $$('.form-all').each(function (el) {
            el.removeClassName('top-cover').removeClassName('left-cover').removeClassName('right-cover');
        });
    },
    fixIESubmitURL: function () {
        try {
            // IE on XP does not support TLS SSL
            // http://en.wikipedia.org/wiki/Server_Name_Indication#Support
            if (this.ie() <= 8 && navigator.appVersion.indexOf('NT 5.')) {
                $A(this.forms).each(function (form) {
                    if (form.action.include("s://submit.")) {
                        form.action = form.action.replace(/\/\/submit\..*?\//, "//secure.jotform.com/");
                    }
                });
            }
        } catch (e) {
        }
    },
    screenshot: false, // Cached version of screenshot
    passive: false, // States if wishbox iis getting screenshot passively
    onprogress: false, // Are we currently processing a screenshot?
    compact: false, // Use the compact mode of the editor
    imageSaved: false, // Check if the image saved by screenshot editor
    /**
     * Find screenshot buttons and set events
     * HIDE or SHOW according to the environment
     */
    handleScreenshot: function () {
        var $this = this;
        setTimeout(function () {
            $$('.form-screen-button').each(function (button) {
                //$this.getContainer(button).hide();
                // If window parent has feedback then show screenshot
                if (window.parent && window.parent.JotformFeedbackManager) {
                    $this.getContainer(button).show();
                    button.observe('click', function () {
                        $this.passive = false;
                        try {
                            $this.takeScreenShot(button.id.replace('button_', ''));
                        } catch (e) {
                            console.error(e);
                        }
                    });
                    setTimeout(function () {
                        $this.passive = !window.parent.wishboxInstantLoad;
                        $this.takeScreenShot(button.id.replace('button_', ''));
                    }, 0);
                }
            });
        }, 300);
    },
    getCharset: function (doc) {
        if (!doc) {
            doc = document;
        }

        return doc.characterSet || doc.defaultCharset || doc.charset || 'UTF-8';
    },
    /**
     * Convert number of bytes into human readable format
     *
     * @param integer bytes     Number of bytes to convert
     * @param integer precision Number of digits after the decimal separator
     * @return string
     */
    bytesToSize: function (bytes, precision) {
        var sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        var posttxt = 0;
        if (bytes == 0) return 'n/a';
        if (bytes < 1024) {
            return Number(bytes) + " " + sizes[posttxt];
        }
        while (bytes >= 1024) {
            posttxt++;
            bytes = bytes / 1024;
        }
        return bytes.toFixed(precision || 2) + " " + sizes[posttxt];
    },
    /*
     * Disables HTML5 validation for stopping browsers to stop submission process
     * (fixes bug of pending submissions when jotform validator accepts email field
     * and browsers' own validator doesn't )
     */
    disableHTML5FormValidation: function () {
        $$("form").each(function (f) {
            f.setAttribute("novalidate", true);
        });
    },
    /**
     * When button clicked take the screenshot and display it in the editor
     */
    takeScreenShot: function (id) {
        var p = window.parent;          // parent window
        var pleaseWait = '<div id="js_loading" ' +
            'style="position:fixed; z-index:10000000; text-align:center; ' +
            'background:#333; border-radius:5px; top: 20px; right: 20px; ' +
            'padding:10px; box-shadow:0 0 5 rgba(0,0,0,0.5);">' +
            '<img src="' + this.url + 'images/loader-black.gif" />' +
            '<div style="font-family:verdana; font-size:12px;color:#fff;">' +
            'Please Wait' +
            '</div></div>';

        if (this.onprogress) {
            p.$jot(pleaseWait).appendTo('body');
            return;
        }

        if (p.wishboxCompactLoad) {
            this.compact = true;
        }

        if (this.screenshot) {
            if (this.compact) {
                p.$jot('.jt-dimmer').hide();
            } else {
                p.$jot('.jt-dimmer, .jotform-feedback-link, .jt-feedback').hide();
            }

            p.jotformScreenshotURL = this.screenshot.data;
            this.injectEditor(this.screenshot.data, this.screenshot.shotURL);
            return;
        }

        this.scuniq = JotForm.uniqid(); // Unique ID to be used in the screenshot
        this.scID = id;               // Field if which we will place the screen shot in
        var f = JotForm.getForm($('button_' + this.scID));
        this.sformID = f.formID.value;
        this.onprogress = true;
        var $this = this;             // Cache the scope
        //this.wishboxServer = '//ec2-107-22-70-25.compute-1.amazonaws.com/wishbox-bot.php';
        this.wishboxServer = 'https://screenshots.jotform.com/wishbox-server.php'; //kemal: made this http since https not working anyway
        //this.wishboxServer = "//beta23.jotform.com/server.php";//JotForm.server;
        // Create a form element to make a hidden post. We need this to overcome xDomain Ajax restrictions
        var form = new Element('form', {
            action: this.wishboxServer,
            target: 'screen_frame',
            id: 'screen_form',
            method: 'post',
            "accept-charset": 'utf-8'
        }).hide();
        // Create a syntethic doctype for page source. This is the most common doctype so I choose this
        var doc = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en" >';
        // Hide Jotform specific page element on the parent, so they do not appear on screenshot

        /*if(this.compact){
         p.$jot('.jt-dimmer').hide();
         }else{*/
        p.$jot('.jt-dimmer, .jotform-feedback-link, .jt-feedback').hide();
        //}

        p.$jot('.hide-on-screenshot, .hide-on-screenshot *').css({'visibility': 'hidden'});
        // Read the source of parent window
        var parentSource = p.document.getElementsByTagName('html')[0].innerHTML;
        parentSource = parentSource.replace(/(<noscript\b[^>]*>.*?<\/noscript>)+/gim, '');         // remove single line tags
        parentSource = parentSource.replace(/(<noscript\b[^>]*>(\s+.*\s+)+)+<\/noscript>/gim, ''); // remove multi line tags
        p.$jot('.hide-on-screenshot, .hide-on-screenshot *').css({'visibility': 'visible'});
        parentSource = parentSource.replace(/(\<\/head\>)/gim, "<style>body,html{ min-height: 800px; }</style>$1");
        var ie = $this.ie();
        // When it's the broken IE use a totally different aproach but IE9 works correctly so skip it
        if (ie !== undefined && ie < 9) {
            parentSource = parentSource.replace(/(\<\/head\>)/gim, "<style>*{ border-radius:0 !important; text-shadow:none !important; box-shadow:none !important; }</style>$1");
        }

        if (this.passive) {
            p.$jot('.jt-dimmer, .jotform-feedback-link, .jt-feedback').show();
        } else {
            p.$jot('.jotform-feedback-link').show();
            p.$jot(pleaseWait).appendTo('body');
        }

        // create form elements and place the values respectively
        var html = new Element('textarea', {name: 'html'});

        var nozip = this.getCharset(p.document).toLowerCase() !== 'utf-8';

        if (nozip) {
            html.value = encodeURIComponent(doc + parentSource + "</html>");
            form.insert(new Element('input', {type: 'hidden', name: 'nozip'}).putValue("1"));
        } else {
            form.insert(new Element('input', {type: 'hidden', name: 'nozip'}).putValue("0"));
            html.value = encodeURIComponent(p.$jot.jSEND((doc + parentSource + "</html>")));
        }
        var charset = new Element('input', {type: 'hidden', name: 'charset'}).putValue(this.getCharset(p.document));
        var height = new Element('input', {type: 'hidden', name: 'height'}).putValue(parseFloat(p.$jot(p).height()));
        var scrollTop = new Element('input', {type: 'hidden', name: 'scrollTop'}).putValue(p.$jot(p).scrollTop());
        var url = new Element('input', {type: 'hidden', name: 'url'}).putValue(p.location.href);
        var uid = new Element('input', {type: 'hidden', name: 'uniqID'}).putValue(this.scuniq);
        var fid = new Element('input', {type: 'hidden', name: 'formID'}).putValue(this.sformID);
        var action = new Element('input', {type: 'hidden', name: 'action'}).putValue("getScreenshot");
        // This is the iframe that we will submit the form into
        var iframe = new Element('iframe', {name: 'screen_frame', id: 'screen_frame_id'}).hide();
        // When iframe is loaded it usually means screenshot is completed but we still need to make sure.
        iframe.observe('load', function () {
            // Let's check server if screenshot correctly created there
            $this.checkScreenShot();
        });

        if (p.wishboxInstantLoad && (ie === undefined || ie > 8)) {
            this.injectEditor(false, false);
        }

        // Insert all created elements on the page and directly submit the form
        form.insert(html).insert(height).insert(scrollTop).insert(action).insert(uid).insert(url).insert(fid).insert(charset);
        $(document.body).insert(form).insert(iframe);
        form.submit();
    },
    /**
     * Checks if JSON is available and loads it if not
     */
    checkJSON: function () {
        if (typeof JSON !== 'object') {
            var script = document.createElement('script');
            script.type = "text/javascript";
            script.src = "/js/vendor/json2.js";
            $(document.body).appendChild(script);
        }
    },
    /**
     * Send a request to server and asks if given screenshot is created
     */
    checkScreenShot: function () {
        var $this = this;
        var p = window.parent;
        var count = 10; // will try 10 times after that it will fail

        p.$jot.getJSON('https://screenshots.jotform.com/queue/' + this.scuniq + '?callback=?',
            function (data) {
                if (data.success === true) {
                    p.$jot.getJSON(data.dataURL + '?callback=?', function (res) {
                        if ($this.passive === false) {
                            p.jotformScreenshotURL = res.data;
                            $this.injectEditor(res.data, res.shotURL); // If screenshot is created inject the editor on the page
                        }
                        $this.screenshot = res;
                        $this.onprogress = false;
                        // Remove the form and iframe since we don't need them anymore
                        $('screen_form') && $('screen_form').remove();
                        $('screen_frame_id') && $('screen_frame_id').remove();
                    });
                } else {
                    if ((data.status == 'waiting' || data.status == 'working') && --count) {
                        setTimeout(function () {
                            $this.checkScreenShot(); // If not try again. {TODO: We need to limit this check}
                        }, 1000);
                    } else {
                        alert('We are under heavy load right now. Please try again later.');
                        p.$jot('.jt-dimmer, .jotform-feedback-link').show();
                        p.$jot('.jt-feedback').show('slow');
                    }
                }
            }
        );
    },
    /**
     * Injects the screenshot editor on the page and sets necessery functions for editor to use
     */
    injectEditor: function (data, url) {

        if (this.injected) {
            return;
        }

        this.injected = true;
        var $this = this;
        var p = window.parent;
        p.$jot('#js_loading').remove();

        // Ask for editor template code
        p.$jot.getJSON(this.server + '?callback=?', {
                action: 'getScreenEditorTemplate',
                compact: this.compact
            },
            function (res) {
                var iff = '<iframe allowtransparency="true" id="wishbox-frame" src="" ' +
                    'frameborder="0" style="display:none;border:none;display:block; ';
                if (!$this.compact) {
                    iff += 'position:fixed;top:0;width:100%;height:100%;left:0;z-index:100000000;';
                } else {
                    iff += ('position:absolute;left:0;top:10px;height:' + (p.$jot(p).height() - 120) + 'px;width:' + ((p.$jot(p).width() - 100) - p.$jot('#js-form-content').width()) + 'px;');
                }
                iff += '" scrolling="no"></iframe>';
                var editorFrame;

                p.iframeWidth = ((p.$jot(p).width() - 100) - p.$jot('#js-form-content').width());
                p.iframeHeight = (p.$jot(p).height() - 120);

                // create an empty iframe on the page, we will then write the contents of this iframe manually
                if ($this.compact) {
                    editorFrame = p.$jot(iff).insertBefore('#js-form-content');
                } else {
                    editorFrame = p.$jot(iff).appendTo('body');
                }

                if ($this.compact) {
                    p.$jot('#js-form-content').css({  // when compact
                        'float': 'right'
                    });
                }
                var ie = $this.ie();

                // When it's the broken IE use a totally different aproach but IE9 works correctly so skip it
                if (ie !== undefined && ie < 9) {
                    // Set src for iframe inseat of writing the editor template in it.
                    editorFrame.attr('src', 'https://screenshots.jotform.com/opt/templates/screen_editor.html?shot=' + url + '&uniq=' + $this.scuniq);
                    // Put a close button outside of the iframe
                    var b = p.$jot('<button style="color:#fff;font-size:14px;background:#F59202;border:1px solid #Fa98a2;font-weight:bold;position:fixed;top:5px;right:40px;width:100px;z-index:100000001;">Close Editor</button>').appendTo('body');
                    // When close button clicked go fetch the saved image, if image is not saved then ask user are they sure?
                    b.click(function () {

                        p.$jot.getJSON('https://screenshots.jotform.com/wishbox-server.php?callback=?', {
                            action: 'getImage',
                            uniqID: $this.scuniq
                        }, function (res) {
                            if (!res.success) {
                                if (confirm('You haven\'t save your edits. Are you sure you want to close the editor?')) {
                                    closeFrame();
                                    b.remove();
                                }
                            } else {
                                closeFrame();
                                b.remove();

                                putImageOnForm(res.data, res.shotURL);
                            }
                        });
                    });
                } else {
                    // Write retrieved editor template into newly created iframe
                    var e = editorFrame[0];
                    var frameDocument = (e.contentWindow) ? e.contentWindow : (e.contentDocument.document) ? e.contentDocument.document : e.contentDocument;
                    frameDocument.document.open();
                    frameDocument.document.write(res.template);
                    setTimeout(function () {
                        frameDocument.document.close();
                    }, 200);

                    // Cache the screenshot URL on parent window so editor can find it
                    p.jotformScreenshotURL = data;
                }

                // Closes the frame and removes all trace behind it
                var closeFrame = function () {
                    if ($this.compact) {
                        editorFrame.remove();
                        p.$jot('#js-form-content').css('width', '100%');
//                        p.$jot('.jt-content, .jt-title').css('width', 'auto');
                    } else {
                        editorFrame.hide('slow', function () {
                            editorFrame.remove();
                        });
                    }
                    $this.injected = false;
                    p.$jot('.jt-dimmer, .jotform-feedback-link').show();
                    p.$jot('.jt-feedback').show('slow');
                };

                // When image saved. Places it on the form
                var putImageOnForm = function (image, url) {
                    // if(!$this.compact){
                    $('screen_' + $this.scID).update('<img width="100%" align="center" src="' + (url ? url : image) + '" />');
                    $('data_' + $this.scID).value = image;
                    $('screen_' + $this.scID).up().show();
                    // }
                };

                // Cancel  and close the editor
                p.JotformCancelEditor = function () {
                    closeFrame();
                };

                // When editing completed retrive the edited screenshot code and place it on the form
                p.JotformFinishEditing = function (image) {
                    closeFrame();
                    putImageOnForm(image);
                    $this.imageSaved = true;
                    if ($this.compact) {
                        setTimeout(function () {
                            $(document).fire('image:loaded');
                        }, 100);
                    }
                };
            }
        );
    },

    /**
     * Will get additional URL queries from SCRIPT embed or feedback widget
     */
    populateGet: function () {
        try {
            if ('FrameBuilder' in window.parent && "get" in window.parent.FrameBuilder && window.parent.FrameBuilder.get != []) {

                var outVals = {};
                var getVals = window.parent.FrameBuilder.get;
                $H(getVals).each(function (pair) {
                    if (typeof pair[1] === 'object') {
                        for (prop in pair[1]) {
                            outVals[pair[0] + "[" + prop + "]"] = pair[1][prop];
                        }
                    } else {
                        outVals[pair[0]] = pair[1];
                    }


                });
                document.get = Object.extend(document.get, outVals);
            }
        } catch (e) {
        }
    },
    /**
     * Php.js uniqueID generator
     * @param {Object} prefix
     * @param {Object} more_entropy
     */
    uniqid: function (prefix, more_entropy) {
        if (typeof prefix == 'undefined') {
            prefix = "";
        }
        var retId;
        var formatSeed = function (seed, reqWidth) {
            seed = parseInt(seed, 10).toString(16); // to hex str
            if (reqWidth < seed.length) {
                return seed.slice(seed.length - reqWidth);
            }
            if (reqWidth > seed.length) {
                return Array(1 + (reqWidth - seed.length)).join('0') + seed;
            }
            return seed;
        };
        if (!this.php_js) {
            this.php_js = {};
        }
        if (!this.php_js.uniqidSeed) {
            this.php_js.uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
        }
        this.php_js.uniqidSeed++;
        retId = prefix;
        retId += formatSeed(parseInt(new Date().getTime() / 1000, 10), 8);
        retId += formatSeed(this.php_js.uniqidSeed, 5);
        if (more_entropy) {
            retId += (Math.random() * 10).toFixed(8).toString();
        }
        return retId;
    },

    /**
     * Initiates multiple upload scripts
     */
    initMultipleUploads: function () {
        var self = this;
        // for mobile; prevent device sleep
        // but not in jotform next. fix for #1816394, #1878538, #1879000
        var isJotFormNext = JotForm.isJotFormNext || /jotformNext=1/.test(window.location.href);
        if (JotForm.browserIs.mobile() && !isJotFormNext) {
            var loadingNoSleepScript = true;
            var baseScriptURL = 'https://cdn.jotfor.ms';
            if (JotForm.enterprise || window.location.href.indexOf('jotform.pro') > -1) {
                baseScriptURL = window.location.origin;
            }
            var noSleepURL = baseScriptURL + '/js/vendor/NoSleep.min.js';
            JotForm.loadScript(noSleepURL, function () {
                loadingNoSleepScript = false;
            });
      
            var toggleNoSleep = function () {
                if (loadingNoSleepScript || typeof NoSleep === 'undefined') { return; }
                var noSleep = new NoSleep();
                noSleep.enable();
                document.removeEventListener('click', toggleNoSleep, true);
            };
            document.addEventListener('click', toggleNoSleep, true);
        }

        if (isJotFormNext && JotForm.switchedToOffline && JotForm.rawMultipleFileInputs) {
            JotForm.resetMultipleUploadsBasicMarkup();
        }

        JotForm.uploader = {};
        $$('.form-upload-multiple').each(function (file) {
            var parent = file.up('div');
            var f = JotForm.getForm(file);
            var formID = f.formID.value;

            if (isJotFormNext) {
                // Keeping raw inputs in case of user goes offline while filling on JotFormNext.
                JotForm.captureMultipleUploadsBasicMarkup(file);
            }

            var uniq = formID + "_" + JotForm.uniqueID;

            // Handle upload fail validation
            parent.addClassName('validate[multipleUpload]');

            // Handle default validations. reuired field
            var className = file.className;
            if (className.include("validate[required]")) {
                if (parent.className.indexOf("validate[required]") === -1) {
                    parent.addClassName("validate[required]");
                }
            }

            parent.validateInput = function() {
                var _isVisible = JotForm.isVisible(parent);
                if (JotForm.doubleValidationFlag()) {
                    _isVisible = !(JotForm.isInputAlwaysHidden(parent));
                }
                // Don't fire validations for hidden elements
                if (!_isVisible) {
                    JotForm.corrected(parent);
                    return true;
                }

                if (JotForm.isFillingOffline()) {
                  return JotForm.corrected(parent);
                }


                var fileList = parent.select('.qq-upload-list li:not(.file-deleted)');
                if (fileList.length < 1) {
                    if (parent.match('[class*=validate[required]]')) {
                        JotForm.corrected(parent);
                        return JotForm.errored(parent, JotForm.texts.required);
                    }else{
                        JotForm.corrected(parent);
                        return true;
                    }
                } else {
                    var status = true;
                    fileList.each(function(elem) {
                        if (elem.getAttribute('class') && elem.getAttribute('class').indexOf('fail') >= 0) {
                            status = false;
                        }
                    });
                    if (status) {
                        JotForm.corrected(parent);
                        return true;
                    } else {
                        JotForm.errored(parent, JotForm.texts.multipleFileUploads_uploadFailed);
                        return false;
                    }
                }
            }

            // Create temp upload folder key
            if (!JotForm.tempUploadFolderInjected) {
                var hidden = new Element('input', {type: 'hidden', name: 'temp_upload_folder'}).setValue(uniq);
                f.insert({bottom: hidden});
                JotForm.tempUploadFolderInjected = true;
            }

            // Handle limited extensions
            var exts = (file.readAttribute('data-file-accept') || file.readAttribute('file-accept') || "").strip();
            exts = (exts !== '*') ? exts.split(',').map(function (item) { return item.trim(); }) : [];

            // Handle sublabels
            var n, subLabel = "";
            if ((n = file.next()) && n.hasClassName('form-sub-label')) {
                subLabel = n.innerHTML;
            }

            //Emre: to make editing "text of multifile upload button" possible (33318)
            var m, buttonText, cancelText = 'Cancel', ofText = 'of';
            if (m = file.previous('.qq-uploader-buttonText-value')) {
                buttonText = m.innerHTML;
            }
            if (m = file.up('li.form-line').querySelector('.jfUpload-button')) {
                var isV2 = m.readAttribute('data-version') === 'v2';
                buttonText = isV2 ? m.innerHTML : m.innerText;
            }
            if (!buttonText) {
                buttonText = "Upload a File";
            }
            // Select & Assign cancel and of text
            if (subLabel){
                if (m = parent.querySelector(".cancelText")) {
                    cancelText = m.innerText;
                }
                if (m = parent.querySelector(".ofText")) {
                    ofText = m.innerText;
                }
            }
            else {
                if (m = parent.siblings().find(function (el) { return el.className === 'cancelText'})) {
                    cancelText = m.innerText;
                }
                if (m = parent.siblings().find(function (el) { return el.className === 'ofText'})) {
                    ofText = m.innerText;
                }
            }

            // Hasan
            // Get button style class
            var classNames = file.className.split(' ');
            var buttonStyle = '';
            $A(classNames).each(function (className) {
                if (className.indexOf('form-submit-button-') === 0) {
                    buttonStyle = className;
                }
            });

            // Initiate ajax uploader
            try {
                var uploader = JotForm.isFillingOffline() ? false : new qq.FileUploader({
                    debug: JotForm.debug,
                    element: parent,
                    action: JotForm.server,
                    subLabel: subLabel,
                    buttonText: buttonText,
                    buttonStyle: buttonStyle,
                    fileLimit: file.readAttribute('data-file-limit') || file.readAttribute('file-limit'),
                    sizeLimitActive: file.readAttribute('data-limit-file-size') || file.readAttribute('limit-file-size'),
                    sizeLimit: parseInt((file.readAttribute('data-file-maxsize') || file.readAttribute('file-maxsize')), 10) * 1024, // Set file size limit
                    minSizeLimit: parseInt((file.readAttribute('data-file-minsize') || file.readAttribute('file-minsize')), 10) * 1024,
                    allowedExtensions: exts,
                    cancelText: cancelText,
                    ofText: ofText,
                    messages: {
                        typeError: self.texts.multipleFileUploads_typeError,
                        sizeError: self.texts.multipleFileUploads_sizeError,
                        minSizeError: self.texts.multipleFileUploads_minSizeError,
                        emptyError: self.texts.multipleFileUploads_emptyError,
                        onLeave: self.texts.multipleFileUploads_onLeave,
                        fileLimitError: self.texts.multipleFileUploads_fileLimitError
                    },
                    onComplete: function (id, filename, response) {
                        console.log('onComplete', arguments);
                        if (response.success) {
                            // append uploaded filename to a hidden input for backend validation
                            var qFolder = file.name.replace('[]', '');
                            if ('message' in response) {
                                filename = response.message;
                            }
                            var uploadHiddenID = [this.params.folder, qFolder, filename].join('_');
                            var uploadHidden = $(uploadHiddenID);
                            if (!uploadHidden) {
                                uploadHidden = new Element('input', {
                                    id: uploadHiddenID,
                                    type: 'hidden',
                                    name: 'temp_upload[' + qFolder + '][]'
                                });
                                f.insert({ bottom: uploadHidden });
                            }
                            uploadHidden.setValue(filename);

                            var $fileServer = $('file_server');
                            if (!$fileServer) {
                                $fileServer = new Element('input', { id: 'file_server', type: 'hidden', name: 'file_server' });
                                f.insert({ bottom: $fileServer });
                            }
                            $fileServer.setValue(response.fileServer);

                            // This is needed for validations. Removes required message
                            parent.value = 'uploaded';
                            parent.validateInput();
                        }
                    },
                    onDelete: function(folder, field, filename) {
                        var id = [folder, field, filename].join('_');
                        if ($(id)) {
                            $(id).remove();
                        }
                        // validate field after deletion
                        parent.validateInput();
                    },
                    showMessage: function (message) {
                        console.log('showMessage', arguments);
                        // clear any previous error
                        JotForm.corrected(parent);
                        // show error
                        JotForm.errored(parent, message);
                    },
                    params: {
                        action: 'multipleUpload',
                        field: file.name ? file.name.replace('[]', '') : '',
                        origin: window.location.origin || (window.location.protocol + '//' + window.location.hostname),
                        folder: uniq
                    },
                    onSubmit: function() {
                        this.params.folder = document.querySelector("input[name='temp_upload_folder']").value;
                    }
                });

                var initWarningTranslations = function(t) {
                    setTimeout(function () {
                        if (uploader && uploader._options) {
                            uploader._options.messages = {
                                typeError: self.texts.multipleFileUploads_typeError,
                                sizeError: self.texts.multipleFileUploads_sizeError,
                                minSizeError: self.texts.multipleFileUploads_minSizeError,
                                emptyError: self.texts.multipleFileUploads_emptyError,
                                onLeave: self.texts.multipleFileUploads_onLeave,
                                fileLimitError: self.texts.multipleFileUploads_fileLimitError
                            };
                        }
                    }, t);
                };

                initWarningTranslations(1000);
                JotForm.uploader[file.id] = uploader;
            } catch (e) {
                console.log(e);
            }
        });

        // Get fileupload heading texts from form warnings
        Array.from(document.querySelectorAll('.jfUpload-text, .qq-upload-button')).forEach(function(field) {
            var heading = field.querySelector('.jfUpload-heading.forDesktop');
            heading && (heading.textContent = JotForm.texts.dragAndDropFilesHere_infoMessage);
            //for Mobile
            var headingMobile = field.querySelector('.jfUpload-heading.forMobile');
            headingMobile && (headingMobile.textContent = JotForm.texts.chooseAFile_infoMessage);
            var subHeading = field.querySelector('.maxFileSize');
            subHeading && (subHeading.textContent = JotForm.texts.maxFileSize_infoMessage);
        });
    },

    /**
     *  Captures multiple file upload markup in order to reset multiple uploads later.
     */
    captureMultipleUploadsBasicMarkup: function (fileInput) {
        if (!JotForm.rawMultipleFileInputs) JotForm.rawMultipleFileInputs = {};

        var qID = fileInput.getAttribute('id').match(/input_(.*)/)[1];
        if (qID) {
            JotForm.rawMultipleFileInputs[qID] = fileInput.outerHTML;
        }
    },

    /**
     *  Restores multiple file upload markup (with uploaded file info) to it's original (not scripted yet) state.
     */
    resetMultipleUploadsBasicMarkup: function () {
        Object.keys(JotForm.rawMultipleFileInputs).forEach(function(qID) {
            var fileInput = document.querySelector('li#id_' + qID + ' input[type="file"]');
            var inputContainer = fileInput.up('div.validate\\[multipleUpload\\]');
            var rawInput = JotForm.rawMultipleFileInputs[qID];
            if (!inputContainer || !rawInput) return;

            var fileList = inputContainer.querySelector('ul.qq-upload-list');
            var fileListMarkup = '';
            if (fileList) {
              // Removing delete buttons
              fileList.querySelectorAll('.qq-upload-delete').forEach(function (each) {
                each.remove();
              });
              fileListMarkup = fileList.outerHTML;
            }

            while (inputContainer.firstChild) inputContainer.removeChild(inputContainer.firstChild);

            inputContainer.insertAdjacentHTML('afterbegin', rawInput);
            inputContainer.insertAdjacentHTML('beforeend', fileListMarkup);
        });;
    },

    /* Initiate new multi upload */
    initNewMultipleUploads: function () {
        var self = this;

        $$('.form-upload-multiple-new').each(function (file) {
            var parent = file.up('div');
            var f = JotForm.getForm(file);
            var formID = f.formID.value;
            var uniq = formID + "_" + JotForm.uniqueID;

            // Handle default validations. reuired field
            var className = file.className;
            if (className.include("validate[required]")) {
                if (parent.className.indexOf("validate[required]") === -1) {
                    parent.addClassName("validate[required]");
                }
                parent.validateInput = function () {
                    var _isVisible = JotForm.isVisible(parent);
                    if (JotForm.doubleValidationFlag()) {
                        _isVisible = !(JotForm.isInputAlwaysHidden(parent));
                    }
                    // Don't fire validations for hidden elements
                    if (!_isVisible) {
                        JotForm.corrected(parent);
                        return true;
                    }
                    if (parent.select('.new-file-list li').length < 1) {
                        JotForm.errored(parent, JotForm.texts.required);
                        return false;
                    } else {
                        JotForm.corrected(parent);
                        return true;
                    }
                };
            }

            // Create temp upload folder key
            if (!JotForm.tempUploadFolderInjected) {
                var hidden = new Element('input', {type: 'hidden', name: 'temp_upload_folder'}).setValue(uniq);
                f.insert({top: hidden});
                JotForm.tempUploadFolderInjected = true;
                window.setFolder();
            }

            // Handle limited extensions
            var exts = (file.readAttribute('data-file-accept') || file.readAttribute('file-accept') || "").strip();
            exts = (exts !== '*') ? exts.split(', ') : [];

            // Handle sublabels
            var n, subLabel = "";
            if ((n = file.next()) && n.hasClassName('form-sub-label')) {
                subLabel = n.innerHTML;
            }

            //Emre: to make editing "text of multifile upload button" possible (33318)
            var m, buttonText;
            if (m = file.previous('.qq-uploader-buttonText-value')) {
                buttonText = m.innerHTML;
            }
            if (!buttonText) {
                buttonText = "Upload a File";
            }
        });
    },

    /**
     * Hiddenly submits the form on backend
     */
    hiddenSubmit: function (frm, options) {
        var checkPagesNumber = document.querySelectorAll('.form-section') || null;  
        var currentPage = JotForm.currentSection.pagesIndex;
        var selectPageBreak = (JotForm.newDefaultTheme && checkPagesNumber.length === currentPage) ? '.form-pagebreak-back-container' : '.form-pagebreak';

        if (JotForm.currentSection) {
            JotForm.currentSection.select(selectPageBreak)[0].insert(
                new Element('div', {className: 'form-saving-indicator'})
                    .setStyle('float:right;padding:21px 12px 10px')
                    .update('<img src="' + JotForm.url + 'images/ajax-loader.gif" align="absmiddle" /> Saving...')
            );
        }

        /**
         * Wait just a little to set saving status.
         * We need this because of the back button hack for last page.
         * Last page back button has two click events they both should work
         * but saving status prevents second one to be working
         */
        setTimeout(function () {
            JotForm.saving = true;
            JotForm.disableButtons();
        }, 10);
        var isCardForm = window.FORM_MODE == 'cardform';

        if (!$('hidden_submit_form')) {
            var iframe = new Element('iframe', {name: 'hidden_submit', id: 'hidden_submit_form'}).hide();
            iframe.observe('load', function () {
                JotForm.makeUploadChecks();
                $$('.form-saving-indicator').invoke('remove');
                JotForm.saving = false;
                JotForm.enableButtons();
            });
            $(document.body).insert(iframe);
        }
        $$('.form-radio-other,.form-checkbox-other').each(function (el) { //disable other textbox if not "other" option selected
            if (!el.checked && JotForm.getOptionOtherInput(el)) {
                JotForm.getOptionOtherInput(el).disable();
            }
        });
        $$('.custom-hint-group').each(function (elem) { //remove textarea hints
            elem.hideCustomPlaceHolder();
        });
        if($('current_page')) {
          $('current_page').value = JotForm.currentSection.pagesIndex;
        }
        frm.writeAttribute('target', 'hidden_submit');
        frm.insert({
            top: new Element('input', {
                type: 'hidden',
                name: 'hidden_submission',
                id: 'hidden_submission'
            }).putValue("1")
        });

        if (isCardForm) {
            frm.insert({
                top: new Element('input', {
                    type: 'hidden',
                    name: 'continueLater',
                    id: 'continueLater'
                }).putValue("1")
            });
        }
        if(options && !!options.async){
            var frmAction = new URL(frm.action);
            if (frm.action.include('pci.jotform')) {
              var formUrl = new URL(this.url);
              frmAction.hostname = formUrl.hostname;
            }

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.open('POST', frmAction, true);
            xhr.addEventListener('load', function () {
                var response = this;
                if (isCardForm) {
                    JotForm.saving = false;
                    JotForm.enableButtons();
                }
                if (200 === response.status) {
                    if (options.onSuccessCb) options.onSuccessCb(response);
                } else {
                    if (options.onFailureCb) options.onFailureCb();
                }

                if (options.onCompleteCb) options.onCompleteCb();

                frm.writeAttribute('target', '');
                if (isCardForm) {
                    $('continueLater') && $('continueLater').remove();
                }
                $('hidden_submission') && $('hidden_submission').remove();

                $$('.custom-hint-group').each(function (elem) { //reapply textarea hints
                    elem.showCustomPlaceHolder();
                });

                $$('.form-radio-other,.form-checkbox-other').each(function (el) { //reenable other textbox if not "other" option selected
                    if (!el.checked && JotForm.getOptionOtherInput(el)) {
                        JotForm.getOptionOtherInput(el).enable();
                    }
                });
            });
            // this action is for dummyForm that come from SCLManager that in Common
            if (options && options.isClone) {
                var allInputs = frm.querySelectorAll('input[type="hidden"]');
                for (var i = 0; i < allInputs.length; i++) {
                    if (allInputs[i].getAttribute('name') && allInputs[i].getAttribute('name').indexOf('other') > -1 && allInputs[i].value === '') {
                        allInputs[i].remove();
                    }
                } 
            }
            xhr.send(new FormData(frm));
        }else{
          frm.submit();
          frm.writeAttribute('target', '');
          if (isCardForm) {
            $('continueLater').remove();
          }
          $('hidden_submission').remove();

          $$('.custom-hint-group').each(function (elem) { //reapply textarea hints
            elem.showCustomPlaceHolder();
          });

          $$('.form-radio-other,.form-checkbox-other').each(function (el) { //reenable other textbox if not "other" option selected
            if (!el.checked && JotForm.getOptionOtherInput(el)) {
              JotForm.getOptionOtherInput(el).enable();
            }
          });
        }
    },
    /**
     * Checks the upload fields after hidden submission
     * If they are completed, then makes them empty to prevent
     * Multiple upload of the same file
     */
    makeUploadChecks: function () {
        var formIDField = $$('input[name="formID"]')[0];
        var parameters = {
            action: 'getSavedUploadResults',
            formID: formIDField.value,
            sessionID: this.sessionID
        };
        if (this.submissionID) {
            parameters.submissionID = this.submissionID;
        }
        if (this.submissionToken) {
            parameters.submissionToken = this.submissionToken;
        }

        var a = new Ajax.Jsonp(JotForm.server, {
            parameters: parameters,
            evalJSON: 'force',
            onComplete: function (t) {
                var res = t.responseJSON;
                if (res && res.success) {
                    if (res.submissionID && !$('submission_id')) {
                        if (!JotForm.submissionID) {
                            JotForm.setSubmissionID(res.submissionID);
                        }
                        formIDField.insert({
                            after: new Element('input', {
                                type: 'hidden',
                                name: 'submission_id',
                                id: 'submission_id'
                            }).putValue(res.submissionID)
                        });
                    }
                    if (window.FORM_MODE === 'cardform') {
                        JotForm.editMode(res, true, null, true); // Don't reset fields and skip card index update
                    } else {
                        JotForm.editMode(res, true); // Don't reset fields
                    }
                }
            }
        });
    },
    /**
     * Handles the form being saved stuation
     */
    handleSavedForm: function () {
        if (!JotForm.sessionID) {
            return;
        }
        JotForm.saveForm = true;

        var isCardForm = window.FORM_MODE == 'cardform';
        var formIDField = $$('input[name="formID"]')[0];
        var sessionIDField = document.getElementById('session');
        if (!sessionIDField) {
            formIDField.insert({
                after: new Element('input', {
                    type: 'hidden',
                    name: 'session_id',
                    id: "session"
                }).putValue(JotForm.sessionID)
            });
        }

        var tokenField = document.getElementById('submission_token');
        if (!tokenField && !isCardForm && this.submissionToken) {
          formIDField.insert({
              after: new Element('input', {
                  type: 'hidden',
                  name: 'submission_token',
                  id: "submission_token"
              }).putValue(this.submissionToken)
          });
        }

        if (!isCardForm) {
            formIDField.insert({
                after: new Element('input', {
                    type: 'hidden',
                    id: 'current_page',
                    name: 'current_page'
                }).putValue(0)
            });
        }

        // Flag for blocking pressing next/prev button while loading submission data
        JotForm.loadingPendingSubmission = true;
        var parameters = {
            action: 'getSavedSubmissionResults',
            formID: formIDField.value,
            sessionID: this.sessionID,
            URLparams: window.location.href
        };
        if (this.submissionID) {
            parameters.submissionID = this.submissionID;
        }
        if (this.submissionToken) {
            parameters.submissionToken = this.submissionToken;
        }

        if (window.JFAppsManager && window.JFAppsManager.isProductListForm) {
            parameters.platform = 'APP';
            parameters.platform_id = window.JFAppsManager.appID;
            parameters.checkoutKey = window.JFAppsManager.checkoutKey;
            parameters.submissionID = window.JFAppsManager.submissionID;
        }

        var a = new Ajax.Jsonp(JotForm.url + '/server.php', {
            parameters: parameters,
            evalJSON: 'force',
            onComplete: function (t) {
                var res = t.responseJSON;
                var isRealSuccess = res.success && !!res.submissionID;
                if (isRealSuccess) {
                    if (res.submissionID) {
                        if (!$('submission_id')) {
                            var submissionID = JotForm.submissionID || res.submissionID;
                            formIDField.insert({
                                after: new Element('input', {
                                    type: 'hidden',
                                    name: 'submission_id',
                                    id: 'submission_id'
                                }).putValue(submissionID)
                            });

                            if (!JotForm.submissionID) {
                                JotForm.setSubmissionID(res.submissionID);
                            }
                        }
                        if (!$('submission_token')) {
                            var submissionToken = this.submissionToken || res.token;
                            if(submissionToken){
                                formIDField.insert({
                                    after: new Element('input', {
                                        type: 'hidden',
                                        name: 'submission_token',
                                        id: 'submission_token'
                                    }).putValue(submissionToken)
                                });

                                if (!this.submissionToken) {
                                    this.submissionToken = submissionToken;
                                }
                            }
                        }

                        try {
                            if (window.FORM_MODE === 'cardform') {
                                JotForm.editMode(res, true, null, true);
                            } else {
                                JotForm.editMode(res, true);
                            }
                        } catch (e) {
                            JotForm.loadingPendingSubmission = false;
                        }
                        JotForm.openInitially = res.currentPage - 1;
                    }

                    if (res.jfFormUserSCL_emailSentTo && !$('jfFormUserSCL_emailSentTo')) {
                        formIDField.insert({
                            after: new Element('input', {
                                type: 'hidden',
                                name: 'jfFormUserSCL_emailSentTo',
                                id: 'jfFormUserSCL_emailSentTo'
                            }).putValue(res.jfFormUserSCL_emailSentTo)
                        });
                    }
                }

                // Releasing blocking of next/prev buttons after submissin data filling has done
                JotForm.loadingPendingSubmission = false;
            }
        });
    },
    setSubmissionID: function(submissionID) {
        this.submissionID = submissionID;
    },
    /*
     * Add browser class to html element.
     */
    setHTMLClass: function () {
        // only ie for now
        var ie = this.ie();
        if (ie) {
            $$('html')[0].addClassName('ie-' + ie);
        }
    },
    /**
     * Sets the last focus event to keep latest focused element
     */
    setFocusEvents: function () {
        $$('.form-radio, .form-checkbox, .newDefaultTheme-dateIcon').each(function (input) { //Neil: use mousedown event for radio & checkbox (Webkit bug:181934)
            input.observe('mousedown', function () {
                JotForm.lastFocus = input;
            })
            input.observe('focus', function () { // To set lastFocus when Tab key is used
                JotForm.lastFocus = input;
            })
        });
        $$('.form-textbox, .form-password, .form-textarea, .form-upload, .form-dropdown').each(function (input) {
            input.observe('focus', function () {
                JotForm.lastFocus = input;
            });
        });

        if ((JotForm.newPaymentUI) && (window.paymentType !== 'product' && window.paymentType !== 'subscription') && window.FORM_MODE !== 'cardform') {
          // if donation and has a source field
          $$('[data-component="paymentDonation"]').each(function (element) {
            element.up('.form-line').classList.add('donation_cont');
          });
        }

        // Will be removed after requirement completed
        if ((JotForm.newPaymentUI) && window.paymentType === 'product' && window.FORM_MODE !== 'cardform') {

            // Select the product if clicked the product line except image area
            var productContainers = document.querySelectorAll('.form-product-container');
            Array.from(productContainers).forEach(function(container, i) {
                var productItem = document.querySelectorAll('.form-product-item')[i];
                container.addEventListener('click', function(event) {
                    if (
                        event.target.tagName !== 'LABEL' &&
                        !['text', 'select-one', 'checkbox', 'radio'].includes(event.target.type) &&
                        !event.target.hasClassName('image_zoom')
                    ) {
                        if (productItem.querySelector('.form-checkbox')) {
                            if (JotForm.browserIs.firefox() && event.target.tagName === 'OPTION' && isSelectedProduct) {
                                return;
                            }
                            productItem.querySelector('.form-checkbox').click();
                        } else {
                            productItem.querySelector('.form-radio').click();
                        }
                    }

                    if (event.target.type === 'checkbox') {
                        var dropDownElement = productItem.querySelector('.form-dropdown');
                        if (dropDownElement) {
                            var dropDownElementOptions = dropDownElement.options;
                            var isZeroOptionExistInDropDownElementsOptions = false;

                            for (var i = 0; i < dropDownElementOptions.length; i++) {
                                if(dropDownElementOptions[i].value === '0' ) {
                                    isZeroOptionExistInDropDownElementsOptions = true;
                                    break;
                                }
                            }

                            if (!event.target.checked && isZeroOptionExistInDropDownElementsOptions) {
                                dropDownElement.value = "0";
                                JotForm.runConditionForId(dropDownElement.id); // needed for dropdown value reset
                            }
                        }

                        // SubTotal
                        if(typeof event.target.checked !== 'undefined' && event.target.checked === false) {
                            var itemSubTotal = $(event.target.id + '_item_subtotal');
                            if (itemSubTotal) itemSubTotal.update("0.00");
                        }
                    }
                });

                // add or remove p_selected class
                productItem.addEventListener('change', function (event) {
                    function deselectProduct(quantityType) {
                        var subProductTable = $(event.target).up('.form-product-child-table');
                        if (subProductTable && typeof subProductTable !== 'undefined') {
                            var quantityInputClass = quantityType === 'select-one' ? '.select_cont .form-subproduct-quantity' : '.form-subproduct-quantity.form-product-custom_quantity';
                            var quantityList = subProductTable.querySelectorAll(quantityInputClass);
                            if (quantityList.length > 0 && Array.from(quantityList).every(function(el) { return ['', '0'].includes(el.value); })) {
                                productItem.classList.remove('p_selected');
                            }
                        } else {
                            productItem.classList.remove('p_selected');
                        }
                    }
                    // quantity dropdown-text input
                    if (['select-one', 'text'].includes(event.target.type)) {
                        if (['', '0'].includes(event.target.value)) {
                            deselectProduct(event.target.type);
                        } else {
                            productItem.classList.add('p_selected');
                        }
                    }
                });
            });

            $$('.form-checkbox').each(function (element) {
                if (element.up('.form-product-item') && element.checked) {
                    element.up('.form-product-item').classList.add('p_selected');
                }

                element.observe('click', function () {
                    if (element.checked && element.up('.form-product-item')) {
                        element.up('.form-product-item').classList.add('p_selected');
                    } else {
                        if (element.up('.form-product-item') && element.up('.form-product-item').classList.contains('p_selected')) {
                            element.up('.form-product-item').classList.remove('p_selected');
                        }
                    }
                });
            });
        }

        if ((JotForm.newPaymentUI) && window.paymentType === 'subscription') {

            // Select the product if clicked the product line
            $$('.form-product-item').each(function (element) {
                element.observe('click', function (event) {
                    if (event.target.type !== 'radio' &&
                        event.target.type !== 'text' &&
                        event.target.type !== 'select-one' &&
                        !event.target.hasClassName('image_zoom'))
                    {
                        element.down('.form-radio').click();
                    }
                });
            });

            $$('.form-product-item').each(function (element) {
                element.up('.form-line').classList.add('subscription_cont');
            });

            $$('.form-product-item .form-radio').each(function (element) {
                if (element.checked) {
                    element.up('.form-product-item').classList.add('p_selected');
                }
                element.observe('change', function () {
                    element.up('.form-product-item').classList.add('p_selected')
                    $$('.form-product-item .form-radio').each(function (subElement) {
                        if (subElement !== element) subElement.up('.form-product-item').classList.remove('p_selected')
                    });
                });
            });
        }
    },
    /**
     * Disables Accept for Google Chrome browsers
     */
    disableAcceptonChrome: function () {
        if (!Prototype.Browser.WebKit) {
            return;
        }
        $$('.form-upload').each(function (input) {
            if (input.hasAttribute('accept')) {
                var r = input.readAttribute('accept');
                input.writeAttribute('accept', '');
                input.writeAttribute('data-file-accept', r);
                input.writeAttribute('file-accept', r);
            }
        });
    },

    browserInformations: function () {
        var is = JotForm.browserIs;

        function OS() {
            if (is.android()) return "Android";
            else if (is.windows()) return "Windows";
            else if (is.blackberry()) return "Blackberry";
            else if (is.linux()) return "Linux";
            else if (is.ios()) return "iOS";
            else if (is.mac() && !is.ios()) return "MacOS";
            return "Unknown OS";
        }

        function device() {
            if (is.mobile()) {
                // separate ios detection because the new windows phone user agent now includes ios
                // http://www.neowin.net/news/ie11-fakes-user-agent-to-fool-gmail-in-windows-phone-81-gdr1-update
                if (is.windowsPhone() || is.androidPhone() || is.blackberry()) return "Mobile";
                else if (is.ios()) return "iPhone";
            }
            else if (is.tablet()) {
                // same above
                if (is.windowsTablet() || is.androidTablet()) return "Tablet";
                else if (is.ios()) return "iPad";
            }
            else if (is.desktop()) return "Desktop";
            return "Unknown Device";
        }

        function browser() {
            if (is.ie()) return "Internet Explorer";
            else if (is.firefox()) return "Firefox";
            else if (is.chrome()) return "Chrome";
            else if (is.safari()) return "Safari";
            else if (is.operabrowser()) return "Opera";
            return "Unknown Browser";
        }

        var offset = new Date().getTimezoneOffset();
        var sign = (offset < 0) ? "+" : "";
        var timeZone = 'GMT ' + sign + -(offset / 60);
        var lang = navigator.language || navigator.browserLanguage || navigator.userLanguage;
        var val = [
            'BROWSER: ' + browser(),
            'OS: ' + OS(),
            'DEVICE: ' + device(),
            'LANGUAGE: ' + lang,
            'RESOLUTION: ' + screen.width + "*" + screen.height,
            'TIMEZONE: ' + timeZone,
            'USER AGENT: ' + navigator.userAgent
        ].join('\n');

        return val;
    },

    /**
     * Populate hidden field with user's browser info
     */
    populateBrowserInfo: function (id) {
        var val = JotForm.browserInformations();

        setTimeout(function(){
            if ($(id).getValue().length > 0) {
                val = [$(id).getValue(), val].join('\n');
            }
            $(id).setValue(val);
        }, 20);
    },

    /**
     * Show Difference Between time ranges
     */
    displayTimeRangeDuration: function (id, justCalculate) {
        var displayDuration = function () {
            if ($('input_' + id + '_hourSelectRange')) {
                var sHour = $('input_' + id + '_hourSelect').value;
                var sMin = $('input_' + id + '_minuteSelect').value || '00';
                var sAMPM = $('input_' + id + '_ampm') ? $('input_' + id + '_ampm').value : 'no';
                var eHour = $('input_' + id + '_hourSelectRange').value;
                var eMin = $('input_' + id + '_minuteSelectRange').value || '00';
                var eAMPM = $('input_' + id + '_ampmRange') ? $('input_' + id + '_ampmRange').value : 'no';
                var lab = $('input_' + id + '_ampmRange') && !JotForm.newDefaultTheme ? '_ampmRange' : '_dummy';

                var durationLabel = $$('label[for=input_' + id + lab + ']').first();
                if (window.FORM_MODE === 'cardform') {
                    if (lab == '_ampmRange') {
                        durationLabel = $$('label[for=input_' + id + lab + ']').first();
                    } else {
                        durationLabel = $$('#input_' + id + lab).first();
                    }
                }

                // var durationLabel = window.FORM_MODE === 'cardform' ? $$('div[for=input_' + id + lab + ']').first() : $$('label[for=input_' + id + lab + ']').first();

                if (sHour.length > 0 && sMin.length > 0 && eHour.length > 0 && eMin.length > 0) {
                    if (sAMPM == 'PM' && sHour != 12) sHour = parseInt(sHour) + 12;
                    if (sAMPM == 'AM' && sHour == 12) sHour = 0;
                    if (eAMPM == 'PM' && eHour != 12) eHour = parseInt(eHour) + 12;
                    if (eAMPM == 'AM' && eHour == 12) eHour = 0;

                    var start = new Date(0, 0, 0, sHour, sMin, 0);
                    var end = new Date(0, 0, 0, eHour, eMin, 0);
                    var diff = end.getTime() - start.getTime();
                    if (diff < 0) { //end time is next day
                        end = new Date(0, 0, 1, eHour, eMin, 0);
                        diff = end.getTime() - start.getTime();
                    }
                    var hours = Math.floor(diff / 1000 / 60 / 60);
                    diff -= hours * 1000 * 60 * 60;
                    var min = Math.floor(diff / 1000 / 60);
                    if (min < 10) min = '0' + min;
                    if(justCalculate){
                        return [hours, min];
                    }
                    durationLabel.update('<b>Total ' + hours + ':' + min + '</b>');
                    durationLabel.setStyle({'color': 'black'});
                    $$('input[id=duration_' + id + '_ampmRange][type="hidden"]').first().setValue(hours + ':' + min);
                } else if (!justCalculate) {
                    durationLabel.update('&nbsp');
                }

                if ($('input_' + id + '_timeInput') && $('input_' + id + '_hourSelect') && $('input_' + id + '_hourSelect').triggerEvent) {
                    $('input_' + id + '_hourSelect').triggerEvent('change');
                }
            }
        };

        if ($('input_' + id + '_timeInput')) {
            $('input_' + id + '_timeInput').observe('blur', displayDuration);
            $('input_' + id + '_timeInputRange').observe('blur', displayDuration);
        } else {
            $('input_' + id + '_hourSelect').observe('change', displayDuration);
            $('input_' + id + '_minuteSelect').observe('change', displayDuration);
            $('input_' + id + '_hourSelectRange').observe('change', displayDuration);
            $('input_' + id + '_minuteSelectRange').observe('change', displayDuration);
        }

        if ($('input_' + id + '_ampm') && $('input_' + id + '_ampmRange')) {
            $('input_' + id + '_ampm').observe('change', displayDuration);
            $('input_' + id + '_ampmRange').observe('change', displayDuration);
        }
        var timeDiff;
        if(JotForm.isEditMode()){
            var waitDom = function () {
                if($('input_' + id + '_hourSelectRange') && $('input_' + id + '_hourSelectRange').value.empty()) {
                    window.setTimeout(waitDom, 100);
                } else {
                    timeDiff = displayDuration();
                }
            }
            waitDom();
        } else{
            timeDiff = displayDuration();
        }
        return timeDiff;
    },


    /**
     * Set current local time if nodefault not set
     */
    displayLocalTime: function (hh, ii, ampm, v2, fixCurrentAmPm) {
        if (JotForm.isEditMode() && fixCurrentAmPm) return;

        if ($(hh) && !$(hh).hasClassName('noDefault')) {
            var date = new Date();
            var hour = date.getHours();

            var currentAmpm = "";
            var twentyFour = true;
            if ($(ampm)) {
                twentyFour = false;
                currentAmpm = (hour > 11) ? 'PM' : 'AM';
                hour = (hour > 12) ? hour - 12 : hour;
                hour = (hour == 0) ? 12 : hour;
            }

            var min = date.getMinutes();
            if (!v2) {
                var step = Number($(ii).options[2].value) - Number($(ii).options[1].value);
                min = Math.round(min / step) * step;
            }
            min = this.addZeros(min, 2);
            if (min >= 60) { //ntw roll over to next hour/day
                min = "00";
                hour++;
                if (twentyFour) {
                    if (hour == 24) hour = 0;
                } else {
                    if (currentAmpm == 'AM' && hour == 12) currentAmpm = 'PM';
                    else if (currentAmpm == 'PM' && hour == 12) currentAmpm = 'AM';
                    else if (hour == 13) hour = 1;
                }
            }
            // prepend with zero
            if (hour < 10 && (!!v2 || $(hh).options[1].value.length > 1)) {
                hour = '0' + hour;
            }

            if ($(ampm)) {
                if (currentAmpm == 'PM') {
                    if ($(ampm).select('option[value="PM"]').length > 0) $(ampm).value = 'PM';
                    if ($(ampm + 'Range') && $(ampm + 'Range').select('option[value="PM"]').length > 0) $(ampm + 'Range').value = 'PM';
                } else {
                    if ($(ampm).select('option[value="AM"]').length > 0) $(ampm).value = 'AM';
                    if ($(ampm + 'Range') && $(ampm + 'Range').select('option[value="AM"]').length > 0) $(ampm + 'Range').value = 'AM';
                }
            }

            if (fixCurrentAmPm) return;

            $(hh).value = hour;
            $(ii).value = min;

            if ($(hh + 'Range')) {
                $(hh + 'Range').value = hour;
                $(ii + 'Range').value = min;
            }

            if ($(v2 + 'Range')) {
                $(v2 + 'Range').value = hour + ':' + min;
            }
            if (v2) {
                $(v2).value = hour + ':' + min;
            }
        }
    },

    /**
     * Sets field item value to field
     * @param {Object} fieldItem
     * @param {String} qid
     */
    setDateTimeFieldItem: function (fieldItem, qid) {
        var isHourOrMin = fieldItem.key === 'hour' || fieldItem.key === 'min';
        var value = fieldItem.value;
        var element;
        if (isHourOrMin) {
            var _key = fieldItem.key === 'hour' ? 'hour' : 'minute';
            var hourOrMinEl = document.querySelector('#input_' + qid + '_' + _key + 'Select');
            if (hourOrMinEl) {
                hourOrMinEl.value = value.length < 2 && value < 10 ? '0' + value : value;
            }
        }
        var timeInputElement = $("input_" + qid + "_" + fieldItem.key)
        if($(fieldItem.key + "_" + qid)) {
            element = $(fieldItem.key + "_" + qid);
            element.value = value;
        } else if (timeInputElement && (JotForm.newDefaultTheme || timeInputElement.dataset.version === "v2")) {
            element = timeInputElement;
            element.value = value;
        }
        var elementIsSelect = element && element.nodeName === 'SELECT';
        if (elementIsSelect && isHourOrMin && element.options.selectedIndex === -1) {
            element.value = '0' + value;
        }
    },

    displayDynamicDate: function (id, dynamic) {
        var offset = parseInt(dynamic.split('today')[1]) || 0;
        var dynamicDate = new Date();
        dynamicDate.setDate(dynamicDate.getDate() + offset);
        JotForm.formatDate({date: dynamicDate, dateField: $("id_" + id)});
    },

    dateLimits: {},

    /**
     * Sets calendar to field
     * @param {Object} id
     */
    getCalendar: function (id) {
      var calendar = document.querySelector('#calendar_' + id);
      return calendar;
    },
    setCalendar: function (id, startOnMonday, limits, parent) {
        try {
            var triggerElement = "input_" + id + "_pick";
            JotForm.dateLimits[id] = limits;
            var field = $('id_' + id);
            var calendar = Calendar.setup({
                triggerElement: triggerElement,
                dateField: "year_" + id,
                parentElement: parent,
                closeHandler: function () {
                    JotForm.calendarClose.apply(this, arguments);
                    if ($('lite_mode_' + id)) {
                        if(JotForm.newDefaultTheme && ($('lite_mode_' + id).hasClassName('calendar-opened'))){
                            $('lite_mode_' + id).removeClassName('calendar-opened');
                        }
                        if (id.indexOf('-') > -1) {
                            // for control_inline date conditions
                            $('lite_mode_' + id).triggerEvent('change');
                        }
                        $('lite_mode_' + id).triggerEvent('blur');
                    }
                },
                selectHandler: function () {
                    JotForm.formatDate.apply(this, arguments);
                },
                startOnMonday: startOnMonday,
                limits: limits
            });
            var calendarButton = document.querySelector('#' + triggerElement);
            calendarButton.observe('click', function () {
              if($('lite_mode_' + id).hasClassName('calendar-opened')){
                JotForm.handleIFrameHeight();
              }
            })
            field.observe('keyup', function () {
                field.fire('date:changed');
            });
            var clearDate = function() {
                $("month_"+id).value = $("day_"+id).value = $("year_"+id).value = "";
            }
            var invalidDate = function(invalidDate, calendar) {
                invalidDate.addClassName("invalidDate");
                clearDate();
            }
            if ($('lite_mode_' + id)) {

                $('lite_mode_' + id).dateChanged = function (e, calendar, doNotTriggerErrors) {
                    var lite_mode = e.currentTarget;
                    var seperator = lite_mode.readAttribute('seperator') || lite_mode.readAttribute('data-seperator');
                    var format = (lite_mode.readAttribute('format') || lite_mode.readAttribute('data-format')).toLowerCase();

                    lite_mode.removeClassName("invalidDate");
                    field.removeClassName('form-line-error');
                    field.removeClassName('form-datetime-validation-error');
                    if(lite_mode.value === "") {
                        field.fire('date:changed');
                        return clearDate();
                    }
                    // Trim input in NDT, since value is like '19-19-199Y'
                    var inputLength = calendar.isNewTheme ? lite_mode.value.replace(new RegExp('[^\\d' + seperator + ']'), '').length : lite_mode.value.length;
                    if(inputLength == ((seperator.length*2) + format.length)){
                        var _yIn = format.indexOf("yy");
                        var _mIn = format.indexOf("mm");
                        var _dIn = format.indexOf("dd");
                        var _sorter = new Array(_yIn, _mIn, _dIn);
                        _sorter = _sorter.sort();
                        var _sortIndex = {
                            year: _sorter.indexOf(_yIn),
                            month: _sorter.indexOf(_mIn),
                            day: _sorter.indexOf(_dIn)
                        }

                        var year = parseInt(lite_mode.value.split(seperator)[_sortIndex.year]);
                        var month = parseInt(lite_mode.value.split(seperator)[_sortIndex.month])-1;
                        var day = parseInt(lite_mode.value.split(seperator)[_sortIndex.day]);
                        var isPreview = getQuerystring('preview');

                        if (!isPreview) {
                            var _tempDate = new Date(year, month, day);

                            if (!_tempDate || !_tempDate.getDate()) {
                                if (!doNotTriggerErrors) invalidDate(lite_mode, calendar);
                            } else {
                                calendar.setDate(_tempDate);
                                calendar.selectHandler(calendar);
                            }
                        }
                    } else {
                        if (!doNotTriggerErrors) invalidDate(lite_mode, calendar);
                    }

                    if(lite_mode.hasClassName("invalidDate")) {
                        JotForm.errored(lite_mode, 'Enter a valid date');
                        field.addClassName('form-line-error');
                        field.addClassName('form-datetime-validation-error');
                    }
                }


                $('lite_mode_' + id).observe('blur', function (e) {
                    e.stopPropagation();
                    /*Dogus: set new date value and run handler*/
                    e.currentTarget.dateChanged(e, calendar);
                    e.currentTarget.setAttribute("date-val", calendar.date.getTime());
                    return false;
                });

                if (!JotForm.newDefaultTheme && !JotForm.extendsNewTheme && !calendar.isNewTheme) {
                    $('lite_mode_' + id).observe('keydown', function (e) {
                        var input = e.target.value;
                        if(e.key === 'Backspace' && input[input.length-1] === e.target.dataset.seperator) {
                            input = input.substr(0, input.length-1);
                        }
                        e.target.value = input.substr(0, 10);
                    });

                    $('lite_mode_' + id).observe('input', function (e) {
                        var input = e.target.value;
                        var values = input.split(e.target.dataset.seperator).map(function(v) {
                            return v.replace(/\D/g, '')
                        });
                        var output = [];
                        if (e.target.dataset.format !== 'yyyymmdd'){
                            output = values.map(function(v, i) {
                                return v.length == 2 && i < 2 ? v + e.target.dataset.seperator : v;
                            });
                        } else {
                            output = values.map(function(v,i) {
                                return (v.length == 4 && i == 0) || (v.length == 2 && i == 1) ? v + e.target.dataset.seperator : v;
                            });
                        }
                        e.target.value = output.join('').substr(0, 10);
                        e.currentTarget.dateChanged(e, calendar, true); // the third argument for disabling the error handling for oninput event
                    });
                }
            }

            if (!parent) { // if parent its embedded and show hide will be handled by the parent container
                var openCalendar = function() {
                    var ele = this;
                    setTimeout(function() {
                        if (JotForm.newDefaultTheme) {
                            handlePopupUI(calendar, { width: ele.parentNode.parentNode.offsetWidth });
                        }
                        calendar.showAtElement(ele);
                    }, 50);

                };
                if ($('input_' + id + '_pick').hasClassName('showAutoCalendar') || JotForm.isSourceTeam) {
                    var _selectors = [('#day_' + id), ('#month_' + id), ('#year_' + id), ('#lite_mode_' + id)];
                    $$(_selectors.join(',')).each(function(elem) {
                        if(!elem.onclick) {
                            elem.observe('focus', openCalendar);
                            elem.observe('click', openCalendar);
                        }
                    });
                }
                $("year_" + id).observe("blur", function() {
                    calendar.hide();
                });
                if ($("lite_mode_" + id)) {
                    $("lite_mode_" + id).observe("blur", function() {
                        calendar.hide();
                    });
                }
            }

        } catch (e) {
            JotForm.error(e);
        }
    },

    currentDateReadonly: function () {},

    calendarClose: function (calendar) {
        var calendar_id = !calendar.isNewTheme ? calendar.id : calendar.dateField.id[calendar.dateField.id.length -1];
        var found = calendar.dateField.id.match(/_[a-z0-9]+/);
        var selector = Array.isArray(found) ? found[0] : '';
        var calendarFields = selector ? $$('input[id*="' + selector + '"]') : [];
        var validations = calendar.dateField.className.replace(/.*validate\[(.*)\].*/, '$1').split(/\s*,\s*/);
        var incomplete = calendarFields.any(function (c) {
            return c.value.empty()
        });
        if ((validations.include("required") || validations.include("disallowPast"))
            && incomplete) {
            calendar.dateField.validateInput();
        }
        if(validations.include("required") && !incomplete ){
            JotForm.corrected($('id_' + calendar_id));
        }
        calendar.hide();
    },

    /**
     * Collects all inital values of the fields and saves them as default values
     * to be restored later
     */
    getDefaults: function () {
        $$('.form-textbox, .form-dropdown, .form-textarea, .form-hidden-time').each(function (input) {
            if (input.hinted || input.value === "") {
                return;
                /* continue; */
            }

            JotForm.defaultValues[input.id] = input.value;
        });

        $$('.form-radio, .form-checkbox').each(function (input) {
            if (!input.checked) {
                return;
                /* continue; */
            }
            JotForm.defaultValues[input.id] = input.value;
        });
    },
    /**
     * Enables or disables the Other option on radiobuttons/checkboxes
     */
    handleOtherOptions: function () {
        $$('.form-radio-other-input, .form-checkbox-other-input').each(function (inp) {
            inp.hint(inp.getAttribute('data-otherhint') || 'Other');
        });

        $$('.form-radio, .form-checkbox').each(function (input) {

            var id = input.id.replace(/input_(\d+)_\d+/gim, '$1');

            if (id.match('other_')) {
                id = input.id.replace(/other_(\d+)/, '$1');
            }
            var other = $('other_' + id); // radio button
            if (other) {
                var other_input = $('input_' + id); // text input

                other_input.observe('keyup', function () {
                    other.value = other_input.value;
                    var willInputBeChecked = other_input.value !== '';
                    var isInputChecked = other.checked;
                    if (!isInputChecked && willInputBeChecked) {
                        other_input.click();
                    }
                    setTimeout(function() { // Thank you safari.
                        other.checked = willInputBeChecked;
                    });
                });
                other_input.observe('click', function (e) {
                    // if(e.handled) { return; } e.handled = true; // Prevent the block from running total option count times, uncomment if you dare.
                    other_input.value = other_input.value === other_input.getAttribute('data-otherhint') ? '' : other_input.value;

                    if(!other.checked){
                      other.checked = true;
                    }
                });

                // perform only on the "Other" option if input is check box
                other.observe('click', function (event) {
                    if ( other.getAttribute('class').indexOf('[required]') > -1) {
                        other_input.value = other_input.value === other_input.getAttribute('data-otherhint') ? '' : other_input.value;
                    } else {
                        other_input.value = other_input.value !== '' ? other_input.value : other_input.getAttribute('data-otherhint');
                    }

                    if (other.checked) {
                        other_input.select();
                    } else {
                        if (other_input.hintClear) {
                            other_input.hintClear();
                        }
                    }
                });

                // delete other option's value if this option is not selected
                input.observe('click', function (e) {
                  if (input !== other && input.checked && !other.checked) {
                    other_input.value = '';
                  }
                });
            }
        });
    },

    shuffleOptions: function (id) {
        var type = JotForm.calculationType(id);
        if (type === "radio" || type === "checkbox") {
            try {
                var options = $("id_" + id).select('.form-' + type + '-item');
                var length = $("id_" + id).down('.form-' + type + '-other-input') ? options.length - 1 : options.length; //don't shuffle "other"

                for (var i = 0; i < length - 1; i++) {
                    var toSwap = $("id_" + id).select('.form-' + type + '-item')[i];
                    var randy = Math.floor(Math.random() * length);
                    var swappedOut = options[randy].replace(toSwap);
                    var next = toSwap.next();
                    var insertAfter = (next && next !== options[length]) ? next : toSwap;
                    insertAfter.insert({after: swappedOut});
                }

                //deal with columns
                if ($("id_" + id).down('.form-multiple-column')) {
                    var columnCount = $("id_" + id).down('.form-multiple-column').readAttribute("data-columncount");
                    $("id_" + id).select('.form-' + type + '-item').each(function (item, i) {
                        item.setStyle({'clear': (i % columnCount == 0) ? 'left' : 'none'});
                    });
                }
            } catch (e) {
                console.log(e);
            }

        } else if (type === "select") {
            try {
                var clone = $('input_' + id).clone(true);
                $('input_' + id).update("");
                var length = clone.length;
                $('input_' + id).insert(clone[0].clone(true));
                for (var i = 1; i < length; i++) {
                    var randy = Math.floor(Math.random() * (clone.length - 1)) + 1;
                    $('input_' + id).insert(clone[randy].clone(true));
                    clone[randy].remove();
                }
            } catch (e) {
                console.log(e);
            }
        } else if (type === "matrix") {
            try {
                var rows = $("id_" + id).select('tr');
                var len = rows.length
                for(var i=1; i<len; i++) {
                    var randy = Math.floor(Math.random() * (len-1)) + 1;
                    var swappedOut = rows[randy].replace(rows[i]);
                    var insertAfter = rows[i].next() ? rows[i].next() : rows[i];
                    insertAfter.insert({after: swappedOut});
                }
            } catch(e) {
                console.log(e);
            }
        }
    },

    handleSingleChoiceWithMultiTypeColumns: function () {
        /*
            This function is used for additional check when used input table with multi-type
            column and single choice. It takes all item in matrix and then check any radio
            button is checked. If check in same row on the matrix, remove other checked values
        */
        var listItem = Array.prototype.slice.call(document.querySelectorAll('td.form-matrix-values'));
        if (listItem) {
            listItem.forEach(function(e) {e.children[0].addEventListener('click', function() {
                if (e.children[0] &&  e.getElementsByClassName("form-radio")) {
                    if (e.getElementsByClassName("form-radio")[0]) {
                        var selectedItem = e.getElementsByClassName("form-radio")[0];
                        if(selectedItem && selectedItem.name && e.parentElement) {
                            var selectedElementName = selectedItem.name;
                            var parent = e.parentElement;
                            if (selectedElementName && parent && parent.cells && parent.cells.length) {
                                var parentCells = parent.cells;
                                var parentCellsLength = parent.cells.length;
                                for (var i = 0; i < parentCellsLength; i ++) {
                                    var item = parentCells[i];
                                    if(item && item.className && selectedItem.type && item.children[0] && item.children[0].name) {
                                        if (item.className === "form-matrix-values" && selectedItem.type === "radio" && item.children[0].name !== selectedElementName) {
                                            var notSelectedItem = item.children[0];
                                            notSelectedItem.type === "radio" ? notSelectedItem.setValue(null) : "";
                                        }
                                    }
                                }
                            } 
                        }
                    }
                }
            })});
        }
    },

    handleSingleChoiceWithMultiTypeColumnsForCardForms: function () {},

    handleDateTimeChecks: function () {
        try {
        $$('[name$=\[month\]]').each(function (monthElement) {
            var isBirthdate = monthElement.type !== "tel" && monthElement.type !== "text";
            var questionId = isBirthdate ? monthElement.id.replace(new RegExp('.*?([0-9]+).*', 'gim'), '$1') :  monthElement.id.split('month_').last() ;
            var dateElement = $('id_' + questionId);
            if (!dateElement)
                return;

            var dayElement = dateElement.down('[id*=day]');
            var yearElement = dateElement.down('[id*=year]');

            var hourElement = dateElement.select('#hour_' + questionId).first();
            var minElement = dateElement.select('#min_' + questionId).first();
            var ampmElement = dateElement.select('#ampm_' + questionId).first();

            if (JotForm.newDefaultTheme) {
                hourElement = dateElement.select('#input_' + questionId + '_hourSelect').first();
                minElement = dateElement.select('#input_' + questionId + '_minuteSelect').first();
                ampmElement = dateElement.select('#input_' + questionId + '_ampm').first();
            } else {
                if(dateElement.querySelector('#input_' + questionId + '_hourSelect') && dateElement.querySelector('#input_' + questionId + '_minuteSelect')) {
                    hourElement = dateElement.select('#input_' + questionId + '_hourSelect').first();
                    minElement = dateElement.select('#input_' + questionId + '_minuteSelect').first();
                    ampmElement = dateElement.select('#input_' + questionId + '_ampm').first();
                }
            }

            monthElement.dateTimeCheck = function (e) {
                var erroredElement = null;
                var ignoreBirthdate = isBirthdate && (monthElement.value === "" || dayElement.value === "" || yearElement.value === "");
                if (!ignoreBirthdate && (monthElement.value != "" || dayElement.value != "" || yearElement.value != "")) {
                    var _month = isBirthdate ? monthElement.selectedIndex :  monthElement.value;
                    var month = parseInt(_month, 10);
                    var day = +dayElement.value;
                    var year = +yearElement.value;

                    if (isNaN(year) || year < 1 || year.toString().length < 4) {
                        erroredElement = yearElement;
                    } else if (isNaN(_month) || isNaN(month) || month < 1 || month > 12) { // second isNaN check to handle cases like null or "".
                        erroredElement = monthElement;
                    } else if ((isNaN(day) || day < 1)) {
                        erroredElement = dayElement;
                    } else {
                        switch (month) {
                            case 2:
                                if ((year % 4 == 0) ? day > 29 : day > 28) {
                                    erroredElement = dayElement;
                                }
                                break;
                            case 4:
                            case 6:
                            case 9:
                            case 11:
                                if (day > 30) {
                                    erroredElement = dayElement;
                                }
                                break;
                            default:
                                if (day > 31) {
                                    erroredElement = dayElement;
                                }
                                break;
                        }
                    }
                }

                var isTargetActive = e && e.target && e.target === document.activeElement;
                if (window.FORM_MODE === 'cardform' && typeof document.activeElement !== 'undefined' && document.activeElement && typeof document.activeElement.up === 'function' && monthElement) {
                    isTargetActive = monthElement.up('.jfCard-question') === document.activeElement.up('.jfCard-question');
                }

                if (!erroredElement && hourElement && minElement && (hourElement.value != "" || minElement.value != "")
                    && !isTargetActive) // do not produce an error yet if target is currently active
                {
                    var hour = (hourElement.value.strip() == '') ? -1 : +hourElement.value;
                    var min = (minElement.value.strip() == '') ? -1 : +minElement.value;
                    if (isNaN(hour) || (ampmElement ? (hour < 0 || hour > 12) : (hour < 0 || hour > 23))) {
                        erroredElement = hourElement;
                    } else if (isNaN(min) || min < 0 || min > 59) {
                        erroredElement = minElement;
                    }
                }

                var active = document.activeElement;
                var hasErrorInLiteModeEl = false;
                if (!erroredElement) {
                    var liteDateInput = dateElement.down('input[class*="validateLiteDate"]');
                    if (liteDateInput && liteDateInput.hasClassName('invalidDate')) {
                        erroredElement = liteDateInput;
                        hasErrorInLiteModeEl = true;
                    }
                }
                if (erroredElement && active!=yearElement && active!=monthElement && active!=dayElement) {
                    if (erroredElement === hourElement || erroredElement === minElement) {
                        erroredElement.errored = false;
                        JotForm.errored(erroredElement, 'Enter a valid time');
                    } else if (hasErrorInLiteModeEl) { // https://www.jotform.com/ticket-categorize/2800532
                        erroredElement.errored = false;
                        var errorTxt = JotForm.texts.dateInvalid.replace("{format}", erroredElement.readAttribute("placeholder"));
                        JotForm.errored(erroredElement, errorTxt);
                    } else {
                        erroredElement.errored = false;
                        var errorTxt = JotForm.texts.dateInvalidSeparate.replace('{element}', erroredElement.id.replace("_"+questionId,""))
                        JotForm.errored(erroredElement, errorTxt);
                    }
                    dateElement.addClassName('form-line-error');
                    dateElement.addClassName('form-datetime-validation-error');
                    return false;
                } else {
                    JotForm.corrected(monthElement);
                    JotForm.corrected(dayElement);
                    JotForm.corrected(yearElement);
                    if (hourElement && minElement) {
                        JotForm.corrected(hourElement);
                        JotForm.corrected(minElement);
                    }
                    dateElement.removeClassName('form-line-error');
                    dateElement.removeClassName('form-datetime-validation-error');
                }
                return true;
            };

            if (hourElement && minElement) {
                hourElement.observe('change',  function(e) { monthElement.dateTimeCheck(e)});
                minElement.observe('change',  function(e) { monthElement.dateTimeCheck(e)});
            }
        });
        } catch(e) {
            console.error(e);
        }
    },

    handleTimeChecks: function () {
        try {
            $$('.form-line[data-type=control_time]').each(function (timeField) {

                var questionId = timeField.id.split('_')[1];

                var hourElement = timeField.select('#input_' + questionId + '_hourSelect').first();
                var minElement = timeField.select('#input_' + questionId + '_minuteSelect').first();
                var ampmElement = timeField.select('#input_' + questionId + '_ampm').first();

                var hourRangeElement = timeField.select('#input_' + questionId + '_hourSelectRange').first();
                var minRangeElement = timeField.select('#input_' + questionId + '_minuteSelectRange').first();
                var ampmRangeElement = timeField.select('#input_' + questionId + '_ampmRange').first();

                hourElement.timeCheck = function() {
                    var erroredElement = null;

                    if (!erroredElement && hourElement && minElement && (hourElement.value != "" || minElement.value != "")) {
                        var hour = (hourElement.value.strip() == '') ? -1 : +hourElement.value;
                        var min = (minElement.value.strip() == '') ? -1 : +minElement.value;
                        if (isNaN(hour) || (ampmElement ? (hour < 0 || hour > 12) : (hour < 0 || hour > 23))) {
                            erroredElement = hourElement;
                        } else if (isNaN(min) || min < 0 || min > 59) {
                            erroredElement = minElement;
                        }
                    }

                    if (!erroredElement && hourRangeElement && minRangeElement && (hourRangeElement.value != "" || minRangeElement.value != "")) {
                        var hour = (hourRangeElement.value.strip() == '') ? -1 : +hourRangeElement.value;
                        var min = (minRangeElement.value.strip() == '') ? -1 : +minRangeElement.value;
                        if (isNaN(hour) || (ampmRangeElement ? (hour < 0 || hour > 12) : (hour < 0 || hour > 23))) {
                            erroredElement = hourRangeElement;
                        } else if (isNaN(min) || min < 0 || min > 59) {
                            erroredElement = minRangeElement;
                        }
                    }

                    if (erroredElement) {
                        JotForm.errored(erroredElement, 'Enter a valid time');
                        timeField.addClassName('form-line-error');
                        return false;
                    } else {
                        if (hourElement && minElement) {
                            JotForm.corrected(hourElement);
                            JotForm.corrected(minElement);
                        }
                        if (hourRangeElement && minRangeElement) {
                            JotForm.corrected(hourRangeElement);
                            JotForm.corrected(minRangeElement);
                        }
                    }
                    return true;
                }

                if (hourElement && minElement) {
                    hourElement.observe('change', function() { hourElement.timeCheck()});
                    minElement.observe('change', function() { hourElement.timeCheck()});
                }

                if(hourRangeElement && minRangeElement) {
                    hourRangeElement.observe('change', function() { hourElement.timeCheck()});
                    minRangeElement.observe('change', function() { hourElement.timeCheck()});
                }

            });
        } catch(e) {
            console.error(e);
        }
    },

    handleTextareaLimits: function (firstRun) {
        if (typeof firstRun === 'undefined') {
            firstRun = true;
        }
        $$('.form-textarea-limit-indicator span').each(function (el) {
            var inpID = el.id.split('-')[0];
            if (!$(inpID)) {
                return;
            } // cannot find the main element

            var minimum = el.readAttribute('data-minimum');
            var limit = el.readAttribute('data-limit');
            var input = $(inpID);
            var count;

            var countText = function (firstRun) {
                if (input.value === "" || input.hasClassName('form-custom-hint')) {
                    $(el.parentNode).removeClassName('form-textarea-limit-indicator-error');
                    el.update("0/" + (minimum > -1 ? minimum : limit));
                    return JotForm.corrected(el);
                }

                var contents;
                if (input.hasClassName("form-textarea") && input.up('div').down('.nicEdit-main')) { //rich text
                    contents = input.value.stripTags(' ').replace(/&nbsp;/g, ' ');
                } else {
                    contents = input.value;
                }

                if (input.up('div').down('.nicEdit-main')) {
                    // When copying text from MS WORD it comes with style and causes wrong word counting
                    var isStyled = input.up('div').down('.nicEdit-main').querySelector('style');
                    if (isStyled) isStyled.remove();
                  }

                // remove html tags and space chars, to prevent wrong counts on text copied from MS WORD
                var cleaned_contents = contents.replace(/(\<\w*)((\s\/\>)|(.*\<\/\w*\>))/gm, ' ').replace(/&nbsp;|&#160;/gi, ' ');

                $(el.parentNode).removeClassName('form-textarea-limit-indicator-error');
                JotForm.corrected(el.up('.form-line').down('textarea'));

                var limitByType = function (type) {
                    var limitType = type == "min" ? el.readAttribute('data-typeminimum') : el.readAttribute('type');
                    if (limitType == 'Words') {
                        count = $A(cleaned_contents.split(/\s+/)).without("").length;
                    } else if (limitType == 'Letters') {
                        count = cleaned_contents.length;
                    }
                    var limiting = false;
                    if (((type == "min" && count < minimum) || (type == "max" && count > limit)) && !(firstRun === true)) {
                        $(el.parentNode).addClassName('form-textarea-limit-indicator-error');
                        var minMax = type == "min" ? "Min" : "";
                        var lim = type == "min" ? minimum : limit;
                        var lettersWords = limitType === "Words" ? "word" : "character";
                        var msg = JotForm.getValidMessage(JotForm.texts[lettersWords + minMax + "LimitError"], lim);
                        JotForm.errored(el.up('.form-line').down('textarea'), msg);
                        limiting = true;
                    }
                    el.update(count + "/" + ((minimum && count < minimum && type == "min") || limit == -1 ? minimum : limit));
                    return limiting;
                }
                var runMax = true;
                if (minimum && minimum > 0) {
                    runMax = !limitByType("min")
                }
                if (limit && limit > 0 && runMax) {
                    limitByType("max");
                }
            };
            countText(firstRun);
            input.observe('change', countText);
            input.observe('focus', countText);
            input.observe('keyup', countText);

            //check whether rich text
            if (input.hasClassName("form-textarea") && input.up('div').down('.nicEdit-main')) {
                var cEditable = input.up('div').down('.nicEdit-main');
                var runCount = function() {
                    input.value = cEditable.innerHTML;
                    countText();
                };
                cEditable.observe('keyup', runCount);
                cEditable.observe('blur', function() {
                    setTimeout(runCount, 0);
                });
            }
        });
    },

    /**
     * Activates all autocomplete fields
     */
    handleAutoCompletes: function () {
      // Edit mode first initialize
        var editModeFirst = [];
        // Get all autocomplete fields
        $H(JotForm.autoCompletes).each(function (pair) {
            var el = $(pair.key); // Field itself

            el.writeAttribute('autocomplete', 'off');

            var parent = $(el.parentNode); // Parent of the field for list to be inserted
            var pairs = pair.value.split(/\r\n|\r|\n|\|/g);
            var values = $A(pairs); // Values for auto complete

            var lastValue; // Last entered value
            var selectCount = 0; // Index of the currently selected element
            //parent.setStyle('position:relative;z-index:1000;'); // Set parent position to relative for inserting absolute positioned list
            var liHeight = 0; // Height of the list element

            // Create List element with must have styles initially
            var list = new Element('div', {
                className: 'form-autocomplete-list'
            }).setStyle({
                    listStyle: 'none',
                    listStylePosition: 'outside',
                    position: 'absolute',
                    zIndex: '10000'
                }).hide();

            var render = function () {

                var isCardForm = window.FORM_MODE === 'cardform';
                if(isCardForm) {
                    var ebcr = el.getBoundingClientRect();
                    var top = ((ebcr.top + ebcr.height)) - 5 + 'px';
                    var left = (ebcr.left) + 'px';
                    var width = (ebcr.width < 1 ? 100 : ebcr.width) + 'px';

                    list.setStyle({
                        top: top,
                        left: left,
                        width: width
                    });
                    list.show();
                } else {
                    var dims = el.getDimensions(); // Dimensions of the input box
                    var offs = el.cumulativeOffset();

                    list.setStyle({
                        backgroundColor: '#f0f8ff',
                        top: ((dims.height + offs[1])) + 'px',
                        left: offs[0] + 'px',
                        width: ((dims.width < 1 ? 100 : dims.width) - 2) + 'px'
                    });
                    list.show();
                }
            };

            // Insert list onto page
            // parent.insert(list);
            $(document.body).insert(list);

            list.close = function () {
                list.update();
                list.hide();
                selectCount = 0;
            };

            // Hide list when field get blurred
            el.observe('blur', function () {
                list.close();
            });

            // Search entry in values when user presses a key
            el.observe('keyup', function (e) {
                var word = el.value;
                // If entered value is the same as the old one do nothing
                if (lastValue == word) {
                    return;
                }
                lastValue = word; // Set last entered word
                list.update(); // Clean up the list first
                if (!word) {
                    list.close();
                    return;
                } // If input is empty then close the list and do nothing
                // Get matches

                var fuzzy = el.readAttribute('data-fuzzySearch') == 'Yes';
                var matches;
    
                var string = word.toLowerCase();
                matches = values.collect(function (v) {
                    if ((fuzzy && v.toLowerCase().include(string)) || v.toLowerCase().indexOf(string) == 0) {
                        return v;
                    }
                }).compact();
                
                // If matches found
                var maxMatches = el.readAttribute('data-maxMatches');
                if (maxMatches > 0) matches = matches.slice(0, maxMatches);
                if (matches.length > 0) {
                    matches.each(function (match) {
                        var li = new Element('li', {
                            className: 'form-autocomplete-list-item'
                        });
                        var val = match;
                        li.val = val;
                        try {
                            val = match.replace(new RegExp('(' + word + ')', 'gim'), '<b>$1</b>');
                        }
                        catch (e) {
                            JotForm.error(e);
                        }
                        li.insert(val);
                        li.onmousedown = function () {
                            el.value = JotForm.decodeHtmlEntities(match);
                            el.triggerEvent('change');
                            list.close();
                        };
                        list.insert(li);
                    });

                    render();

                    // Get li height by adding margins and paddings for calculating 10 item long list height
                    liHeight = liHeight || $(list.firstChild).getHeight() + (parseInt($(list.firstChild).getStyle('padding'), 10) || 0) + (parseInt($(list.firstChild).getStyle('margin'), 10) || 0);
                    // limit list to show only 10 item at once
                    list.setStyle({
                        height: (liHeight * ((matches.length > 9) ? 10 : matches.length) + 4) + 'px',
                        overflow: 'auto'
                    });
                    // EditMode Check
                    // hide list for the first time for each field
                    if (JotForm.isEditMode() && editModeFirst.indexOf(el.id) === -1) {
                        list.hide();
                        editModeFirst.push(el.id);
                    }

                    if(!e.isTrusted) {
                        list.close();
                    }
                } else {
                    list.close(); // If no match found clean the list and close
                }
            });

            // handle navigation through the list
            el.observe('keydown', function (e) {

                //e = document.getEvent(e);
                var selected; // Currently selected item
                // If the list is not visible or list empty then don't run any key actions
                if (!list.visible() || !list.firstChild) {
                    return;
                }

                // Get the selected item
                selected = list.select('.form-autocomplete-list-item-selected')[0];
                if (selected) {
                    selected.removeClassName('form-autocomplete-list-item-selected');
                }

                switch (e.keyCode) {
                    case Event.KEY_UP: // UP
                        if (selected && selected.previousSibling) {
                            $(selected.previousSibling).addClassName('form-autocomplete-list-item-selected');
                        } else {
                            $(list.lastChild).addClassName('form-autocomplete-list-item-selected');
                        }

                        if (selectCount <= 1) { // selected element is at the top of the list
                            if (selected && selected.previousSibling) {
                                $(selected.previousSibling).scrollIntoView(true);
                                selectCount = 0; // scroll element into view then reset the number
                            } else {
                                $(list.lastChild).scrollIntoView(false);
                                selectCount = 10; // reverse the list
                            }
                        } else {
                            selectCount--;
                        }

                        break;
                    case Event.KEY_DOWN: // Down
                        if (selected && selected.nextSibling) {
                            $(selected.nextSibling).addClassName('form-autocomplete-list-item-selected');
                        } else {
                            $(list.firstChild).addClassName('form-autocomplete-list-item-selected');
                        }

                        if (selectCount >= 9) { // if selected element is at the bottom of the list
                            if (selected && selected.nextSibling) {
                                $(selected.nextSibling).scrollIntoView(false);
                                selectCount = 10; // scroll element into view then reset the number
                            } else {
                                $(list.firstChild).scrollIntoView(true);
                                selectCount = 0; // reverse the list
                            }
                        } else {
                            selectCount++;
                        }
                        break;
                    case Event.KEY_ESC:
                        list.close(); // Close list when pressed esc
                        break;
                    case Event.KEY_TAB:
                    case Event.KEY_RETURN:
                        if (selected) { // put selected field into the input bıx
                            el.value = JotForm.decodeHtmlEntities(selected.val);
                            lastValue = el.value;
                        }
                        list.close();
                        if (e.keyCode == Event.KEY_RETURN) {
                            e.stop();
                        } // Prevent return key to submit the form
                        break;
                    default:
                        return;
                }
            });

            // close on initial setup
            list.close();
        });

    },

    /**
     * Clever way to decode htmlentities
     * it even preserve tags if it's html
     * @param {string} html
     * @return {[string]} [the parsed string]
     */
    decodeHtmlEntities: function(str) {
        var textarea = document.createElement('textarea');
        textarea.innerHTML = str;
        return textarea.value;
    },

    /**
     * Returns the extension of a file
     * @param {Object} filename
     */
    getFileExtension: function (filename) {
        return (/[.]/.exec(filename)) ? (/[^.]+$/.exec(filename))[0] : undefined;
    },

    /**
     * Set APIUrl field according to current domain
     */
    setAPIUrl: function () {
        if (JotForm.enterprise !== 'undefined' && JotForm.enterprise) {
            this.APIUrl = 'https://' + JotForm.enterprise + '/API';
            return;
          }
        
          var isEUDomain = /(?:eu\.jotform)|(jotformeu\.com)/.test(window.location.host);
          var isHipaaDomain = /(?:hipaa\.jotform)/.test(window.location.host);
          switch (true) {
            case isEUDomain:
              this.APIUrl = 'https://eu-api.jotform.com';
              break;
            case isHipaaDomain:
              this.APIUrl = 'https://hipaa-api.jotform.com';
              break;
            case /form.jotform/.test(window.location.host):
            case /fb.jotform/.test(window.location.host):
            case /form.myjotform/.test(window.location.host):
              this.APIUrl = 'https://api.jotform.com';
              break;
            case Boolean(window.JotFormAPIEndpoint):
              this.APIUrl = window.JotFormAPIEndpoint;
              break;
            case window.parent !== window:
                var form = $$('.jotform-form')[0];
                var formAction = form.readAttribute('action');
                switch (true) {
                    case Boolean(JotForm.hipaa):
                        this.APIUrl = 'https://hipaa-api.jotform.com';
                        break;
                    case /jotformeu\./.test(formAction):
                        this.APIUrl = 'https://eu-api.jotform.com';
                        break
                    default:
                        this.APIUrl = 'https://api.jotform.com';
                        break;
                }
            break;
            default:
              this.APIUrl = '/API';
          }
    },

    /**
     * Get current session user and set it to JFUser property of window object
     */
    setJotFormUserInfo: function () {
        var formID = $$('input[name="formID"]')[0].value;
        JotForm.createXHRRequest(JotForm.APIUrl + '/formuser/'+ formID +'/combinedinfo?master=1', 'GET', null, function (responseData) {
            var user = responseData.content.credentials;
            if (!user) {
                return;
            }
            if (user.accountType === 'GUEST' || user.account_type === 'GUEST') {
                return;
            }
            if (user.account_type && user.account_type.name && user.account_type.name === 'GUEST') {
                return;
            }
            window.JFUser = { name: user.name, email: user.email }

            if (window.parent.isBuilder) {
                return;
            }
            JotForm.setNameAndEmailFieldsFromUserCredentials();
        }, function (err) {}, true);
    },

    getIsNewSACL: function () {
        var formID = $$('input[name="formID"]')[0].value;
        JotForm.createXHRRequest(JotForm.getAPIEndpoint() + '/sacl/' + formID + '/isNewSaclAllowed', 'GET', null, function(responseData){
            JotForm.isNewSACL = responseData.content;
        }, function (err) {}, true);
    },

    setAsanaTaskID: function () {
        var taskID = getQuerystring('asanaTaskID');
        var form = $$('.jotform-form')[0];
        form.insert(new Element('input', {type: 'hidden', name: 'asanaTaskID'}).setValue(taskID));
    },

    /**
     * Takes a field element and if it is empty, fills it with provided value
     * @param {Object} element
     * @param {string} value
     */
    fillFieldElementIfEmpty: function (element, value) {
        if (element && !element.value) {
            element.value = value;
            if (window.FORM_MODE === 'cardform') {
                element.up().addClassName('isFilled');
            }
        }
    },

    /**
     * It reads window.JFUser, takes name and email and fills first matched fields with these
     */
    setNameAndEmailFieldsFromUserCredentials: function () {
        if (!window.JFUser || getQuerystring('preview')) {
            return;
        }
        // It gets only the first field which matches
        var firstName = $$("input[data-component='first']").first();
        var lastName = $$("input[data-component='last']").first();
        var middleName = $$("input[data-component='middle']").first();
        var email = $$("input[data-component='email']").first();
        var user = window.JFUser;

        // Trigger runAllConditions in async way. So it will be executed after all set field operations
        setTimeout(function(){
            JotForm.runAllConditions();
        }, 1200);

        // Set the email but if it has another pre-set value, don't change it
        if (user.email) {
            JotForm.fillFieldElementIfEmpty(email, user.email);
        }
        if (!user.name) {
            return;
        }

        var names = user.name.split(' ');

        if (names.length > 1) {

            // Set the last name but if it has another pre-set value, don't change it
            JotForm.fillFieldElementIfEmpty(lastName, names[names.length - 1]);

            // If it has more than 2 words
            // If middle name field exist then fill it with all words (except last one and first one)
            // If middle name field does not exist then fill first name field with all words (except only last one)
            if (names.length > 2) {
                if (middleName) {
                    JotForm.fillFieldElementIfEmpty(middleName, user.name.substring(user.name.indexOf(" "), user.name.lastIndexOf(" ")));
                } else {
                    // Set the first name but if it has another pre-set value, don't change it
                    JotForm.fillFieldElementIfEmpty(firstName, user.name.substring(0, user.name.lastIndexOf(" ")));
                }

            }
        }

        // If name has 2 and less words or form has middle name field than first name field should be only first word in the name
        JotForm.fillFieldElementIfEmpty(firstName, names[0]);

    },

    /**
     * Fill fields from the get values prepopulate
     */
    prePopulations: function (fields, isPrefill) {
        var _data = fields || document.get;
        $H(_data).each(function (pair) {
            if (typeof pair.value === 'undefined') {
                return;
            }
            // Some email clients add unnecessary carriage return so clean them
            if (pair.key.match(/[\s\S]+;/)) pair.key = pair.key.replace(/[\s\S]+;/, '');

            var stricterMatch = pair.key.length < 3 ? true : false; //this will prevent "a=fill" matching any name that starts with an a
            var n = stricterMatch ? '[name$="_' + pair.key + '"]' : '[name*="_' + pair.key + '"]';
            var checkbox_n = '[name*="_' + pair.key + '"]';
            var radio_n = '[name$="_' + pair.key + '"]';
            var strict = '[name$="_' + pair.key + '"]';
            var input;

            if(window.FORM_MODE !== 'cardform'){
                input = $$('.form-star-rating' + n)[0];
                if (input) {
                    input.setRating(parseInt(pair.value));
                    return;
                }
            }
            // if there are  two or more similar params e.g., ?name=John&name=Dave
            if (typeof pair.value === 'object') {
                pair.value = pair.value[0] || "";
            }

            input = $$('.form-slider' + n)[0]; //Add classname in builder?
            if (input) {
                input.setSliderValue(parseInt(pair.value));
                return;
            }

            if (pair.key == "coupon-input" && $('coupon-input')) {
                $('coupon-input').setValue(pair.value);
                $('coupon-button').triggerEvent('click');
                $(window).scrollTo(0,0);
                return;
            }


            input = $$('.form-textbox%s, .form-dropdown%s, .form-textarea%s, .form-hidden%s'.replace(/\%s/gim, strict))[0];
            if (!input) {
                input = $$('.form-textbox%s, .form-dropdown%s, .form-textarea%s, .form-hidden%s'.replace(/\%s/gim, n))
                    .filter(function(x) { return x.value === ''; })[0];
            }

            if (!input && pair.key.indexOf("[") > 0) {
                var name = pair.key.substr(0, pair.key.lastIndexOf('['));
                if (name.length > 0 && $$("select[name*=" + name + "], input[name*=" + name + "]").length > 0) {
                    var index = pair.key.substr(pair.key.lastIndexOf('[') + 1).replace("]", "");
                    if (index && Number(index) > -1 && $$("select[name*=" + name + "], input[name*=" + name + "]").length > index) {
                        var type = $$("select[name*=" + name + "]").length > 0 ? "select" : $$("input[name*=" + name + "]")[index].type;

                        switch (type) {
                            case "select":
                                if ($$("select[name*=" + name + "]")[index]) {
                                    $$("select[name*=" + name + "]")[index].value = pair.value.replace(/\+/g, ' ');
                                }
                                break;
                            case "text":
                            case "tel":
                            case "number":
                                $$("input[name*=" + name + "]")[index].value = pair.value.replace(/\+/g, ' ');
                                break;
                            case "radio":
                            case "checkbox":
                                try {
                                if ((pair.value == "true" || pair.value == 1) && $$("input[name*=" + name + "]")[index]
                                    && !($$("input[name*=" + name + "]").first().up('.form-line').readAttribute('data-type') === 'control_matrix' && name.indexOf('[') < 0)) {
                                    $$("input[name*=" + name + "]")[index].click();
                                }
                                }catch(e) {console.log(e);}
                                break;
                        }
                    }
                }
            }

            if (input && input.readAttribute('data-type') == 'input-grading') {
                var grades = pair.value.split(',');
                var stub = input.id.substr(0, input.id.lastIndexOf('_') + 1);
                for (var i = 0; i < grades.length; i++) {
                    if ($(stub + i)) $(stub + i).value = grades[i];
                }
            } else if (input && (input.hasClassName('form-checkbox-other-input') || input.hasClassName('form-radio-other-input'))) {
                JotForm.onTranslationsFetch(function () {
                    input = $(input.id); // Get input from DOM again because in setTimeout callback, input does not refer to the input in DOM.
                    var inputId = input.id.split("_").pop();
                    if (n.indexOf('[other]') > -1) {
                        input.value = pair.value.replace(/\+/g, ' ');
                        JotForm.defaultValues[input.id] = input.value;
                    } else {
                        try {
                            var valuesArray = input.up('.form-line').readAttribute('data-type') === "control_checkbox" ? pair.value.split(',') : [pair.value];
                            for(var i=0; i<valuesArray.length; i++){
                                var normalInputWithValue = input.up('.form-input, .form-input-wide').select('input[type="radio"], input[type="checkbox"]').any(function (inp) {
                                    if (typeof FormTranslation !== 'undefined' && Object.keys(FormTranslation.dictionary).length > 0) {
                                        return Object.values(FormTranslation.dictionary)
                                            .map(function(language) { return language[inp.value]; })
                                            .filter(function(translation) { return translation; })
                                            .any(function(translatedValue) { 
                                                return valuesArray[i] === translatedValue;
                                            });
                                    }
                                    return valuesArray[i] === inp.value;
                                });
                                if (!normalInputWithValue && RegExp(pair.key + '\\[other\\]$').test(input.name)) {
                                    input.value = valuesArray[i];
                                    valuesArray[i] = "other";
                                    var other = $('other_' + inputId);
                                    other.value = input.value;
                                }
                            }
                            pair.value = valuesArray.join(",");
                        } catch(e) {
                            console.error(e);
                        }
                    }
                });
            } else if (input && input.hasClassName("form-textarea") && input.up('div').down('.nicEdit-main')) {
                var val = pair.value.replace(/\+/g, ' ').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                input.up('div').down('.nicEdit-main').update(val);
            } else if (input && input.hasClassName("form-textarea") && input.up('div').down('.jfTextArea-editor')) {
                input.up('div').down('.jfTextArea-editor').update(pair.value);
            } else if (input && input.hasClassName("form-dropdown")) {
                var val = pair.value.replace(/\+/g, ' ');
                var arr = input.readAttribute("multiple") ? val.split(",") : [val];
                var options = input.select('option');

                input.value = arr;
                $A(options).each(function(option) {
                    option.writeAttribute("selected", arr.include(option.value) ? "selected" : false);
                });
            } else if (input) {
                input.value = pair.value.replace(/\{\+\}/g,'{plusSign}').replace(/\+/g, ' ').replace(/\{plusSign\}/g,'+');

                var formLine = input.up('.form-line');
                var dontStripPlusIn = ["control_textarea"];

                // do not strip plus signs when value is passed from another jotform (b#1231139)
                // Don't strip plus sign if the input is email (#1416809)
                // do not strip plus signs if the input is textarea, textbox or address (#2168454)
                if (document.referrer.match(/jotform/) || input.getAttribute('type') === 'email' || (formLine && (dontStripPlusIn.indexOf(formLine.readAttribute('data-type')) > -1))) {
                    input.value = pair.value;
                }
                JotForm.defaultValues[input.id] = input.value;
                try{
                    if (formLine && (formLine.readAttribute('data-type') === "control_datetime" || formLine.readAttribute('data-type') === "control_inline")) {
                        var dateField = formLine.readAttribute('data-type') === 'control_datetime' ? formLine : input.up('[data-type=datebox]');
                        if(dateField){
                            var year = dateField.down('input[id*="year_"]').value;
                            var month = dateField.down('input[id*="month_"]').value;
                            var day = dateField.down('input[id*="day_"]').value;
                            if (year !== "" && month !== "" && day !== "") {
                                JotForm.formatDate({
                                    date: new Date(year, month - 1, day),
                                    dateField: dateField
                                });
                                // We need to set default value for lite mode field and date field because
                                // if there is no default value, prepopulated values will delete after condition checking
                                var dateInput = dateField.down('input[id*="input_"]');
                                var liteModeInput = dateField.down('input[id*="lite_mode_"]');
                                if (dateInput && dateInput.getAttribute('id').indexOf("timeInput") === -1) {
                                    // Card Form's date field is standard HTML5 date field and HTML5 date field's value must be in ISO Format(yyyy-mm-dd)
                                    var ISODate = year + '-' + month + '-' + day;
                                    JotForm.defaultValues[dateInput.id] = ISODate;
                                    dateInput.value = ISODate;
                                }
                                if (liteModeInput) {
                                    JotForm.defaultValues[liteModeInput.id] = liteModeInput.value;
                                }
                            }
                        }
                    }
                } catch (e) {
                    console.log(e)
                }

            }
            $$('.form-textbox%s, .form-textarea%s, .form-hidden%s'.replace(/\%s/gim, n)).each(function (input) {
                //simulate 'keyup' event to execute conditions upon prepopulation
                input.triggerEvent('keyup');
            });
            $$('.form-dropdown%s'.replace(/\%s/gim, n)).each(function (input) {
                //simulate 'change' event to execute conditions upon prepopulation
                input.triggerEvent('change');
            });

            JotForm.onTranslationsFetch(function() {
                var checkboxNaming = '(_' + pair.key + '([(.*?)])?)$';
                var checkboxNamingRegex = new RegExp(checkboxNaming.replace(/\[/g, '\\[').replace(/\]/g, '\\]'));
                var checkboxParam = '.form-radio%s'.replace(/\%s/gim, radio_n) + ', ' + '.form-checkbox%s'.replace(/\%s/gim, checkbox_n)
                $$(checkboxParam).each(function (input) {
                    input = $(input.id);
                    if (isPrefill && input.type === 'checkbox' && !checkboxNamingRegex.test(input.name)) return;
                    //input.checked = $A(pair.value.split(',')).include(input.value);
                    //Emre: when checkboxed is checked, total count does not increase on payment forms  (79814)

                    var disabled = input.disabled ? !!(input.enable()) : false;
                    var value = pair.value.replace(/\{\+\}/g,'{plusSign}').replace(/\+/g, ' ').replace(/\{plusSign\}/g,'+');

                    var allTranslations = [];

                    if (typeof FormTranslation !== 'undefined') {
                        Object.values(FormTranslation.dictionary).forEach(
                            function processTranslations(e) {
                                if (e[input.value]) {
                                    allTranslations.push(e[input.value].replace(/\{\+\}/g,'{plusSign}').replace(/\+/g, ' ').replace(/\{plusSign\}/g,'+'));
                                }
                            }
                        );
                    }

                    if (allTranslations.length === 0) {
                        allTranslations.push(input.value.replace(/\{\+\}/g,'{plusSign}').replace(/\+/g, ' ').replace(/\{plusSign\}/g,'+')); // There is no translation so just compare actual values
                    }

                    allTranslations.each(function(inputValue) {
                        // if input value contains comma, escape it
                        if(inputValue.indexOf(',') && !(value.includes('<br>'))) {
                            inputValue = inputValue.replace(/,/g, "\\,");
                        }

                        if (value == inputValue || $A(value.replace(/([^\\]),/g, '$1\u000B').split('\u000B')).include(inputValue) || $A(value.split('<br>')).include(inputValue)) {
                            if (!input.checked) {
                                if(input.disabled) {
                                    // Ticket ID: 1479721
                                    // Values were prepopulating with setTimeout function before but that was not working properly.
                                    // Sometimes,Inputs were disabling before prepopulation and radio fields were prepopulating wrong.
                                    // I replaced setTimeout part but I think this if block meaningless because input disables after prepopulation.
                                    // I didn't remove because if somehow input disables before prepopulation, values will populate here.
                                    input.enable();
                                    input.click();
                                    input.disable();
                                } else {
                                    input.click();
                                }
                                JotForm.defaultValues[input.id] = inputValue;
                            }
                        } else if ($A(pair.value.split(',')).include('other')) {
                            if ((input.name.indexOf('[other]') > -1) || (input.id && input.id.indexOf('other_') > -1)) {
                                input.click(); //select other option
                            }
                        }
        
                        if(disabled) setTimeout(function() { input.disable(); });
                    });
                });
            });

            //if textarea is hinted and has content remove the hint class
            if (input && input.hasClassName('form-textarea') && input.hasClassName('form-custom-hint') && input.hasContent) {
                input.removeClassName('form-custom-hint');
            }
        });

        setTimeout(function(){
            JotForm.runAllConditions();
        }, 1500);

        // When the form is embeded (with single script tag), fields are prepopulated after isFilled check.
        // This causes placaholders and texts overlap. We need to explicitly call this method again.
        if (window.FORM_MODE === 'cardform') {
            var cards = window.CardForm.cards;
            window.CardForm.checkCardsIfFilled(cards);
        }
    },
    /**
     * Reset form while keeping the values of hidden fields
     * @param {Object} frm
     */
    resetForm: function (frm) {
        var hiddens = $(frm).select('input[type="hidden"], #input_language');
        hiddens.each(function (h) {
            h.__defaultValue = h.value;
        });
        $(frm).reset();
        hiddens.each(function (h) {
            h.value = h.__defaultValue;
        });
        return frm;
    },
    /**
     * Bring the form data for edit mode
     *
     * dynamically load editMode function from form.edit.mode.js
     * it will add a function named editModeFunction to global scope
     */
    editMode: function (data, noreset, skipField, skipCardIndex, cb, errorCb) {
        if (cb === undefined) {
            cb = function() { };
        }

        if (errorCb === undefined) {
            errorCb = function() { };
        }

        if (this.isNewSaveAndContinueLaterActive && this.isEditMode()) {
            $$('.js-new-sacl-button').forEach(function (saveBtn) {
                saveBtn.hide();
            });
        }
        var preLink = "";
        if (!JotForm.debug) {
            // if (this.url.search("https") == -1) {
            //     preLink = "http://cdn.jotfor.ms/";
            // } else {
            //     preLink = "https://cdn.jotfor.ms/";
            // }
            preLink = "https://cdn.jotfor.ms/";
        }

        if (document.get.offline_forms == 'true' && document.get.jotformNext == 1) {
            preLink = window.location.pathname.replace('/index.html', '');
        }

        var self = this;
        if (!window.editModeFunction) {
            this.loadScript(preLink + '/js/form.edit.mode.js?v_' + (new Date()).getTime(), function () {
                //editModeFunction is function name defined in form.edit.mode.js
                self.editMode = editModeFunction;
                if (JotForm.sessionID && data) {
                    data.fromSession = true;
                }
                self.editMode(data, noreset, skipField, skipCardIndex, errorCb);
                cb()
            });
        } else {
            self.editMode(data, noreset, skipField, skipCardIndex, cb);
        }
    },
    /**
     * Helper function that will tell if form is in edit mode
     */
    isEditMode: function () {
        if (window.FORM_MODE === 'cardform') {
            return CardForm.layoutParams.isEditMode;
        }
        return window.location.pathname.match(/^\/edit\//) ||
          window.location.pathname.match(/^\/\/edit/) ||
          window.location.href.match(/mode=inlineEdit/) ||
          window.location.href.match(/mode=submissionToPDF/);
    },
    /**
     * add the given condition to conditions array to be used in the form
     * @param {Object} qid id of the field
     * @param {Object} condition condition array
     */
    setConditions: function (conditions) {

        conditions.reverse();

        JotForm.conditions = conditions;
        // Ozan, IMPORTANT NOTE: To enable chainig multiple field/email actions to a single/multiple conditions,
        // any "condition.action" is expected to be an array, regardless of "condition.type". Since old conditions
        // are stored in the database with a single action, "condition.action" is converted to an array, concatting
        // the only action which condition has.
        conditions.each(function (condition) {
            condition.action = [].concat(condition.action);
        });
    },

    setCalculations: function (calculations) {
        if(!JotForm.calculations || Object.keys(JotForm.calculations).length === 0) {
            JotForm.calculations = calculations;
        } else {
            Object.values(calculations).forEach(function(calculation) {
                JotForm.calculations.push(calculation);
            });
        }
    },

    prepareCalculationsOnTheFly: function (questions) {
        var questions_by_name = [];
        var questions_by_type = [];

        function transpose(a) {
          return a[0].map(function (val, c) {
            return a.map(function (r) {
              return r[c];
            });
          });
        }

        if (questions.length > 0) {
            // if no calculation is set, calculations equals to an empty object
            if (Object.keys(JotForm.calculations).length <= 0) {
                JotForm.calculations = [];
            }

            questions.each(function(question) {
                if (question) {
                    // Create lookup array
                    questions_by_name[question.name] = question.qid;
                    // Create type array in order to differentiate between inline field and multi-valued fields (address, fullname) when colon is used
                    questions_by_type[question.name] = question.type;                   
                }
            });

            questions.each(function(question) {
                if (question) {
                    var values = [];
                    switch (question.type) {
                        // some questions may have their values on a different place
                        case 'control_textbox':
                          question.text !== '' ? values.push(question.text) : void(0);
                          question.subLabel !== '' ? values.push(question.subLabel) : void(0);
                          question.description !== '' ? values.push(question.description) :void(0);
                          break;
                        case 'control_image':
                          question.labelText !== '' ? values.push(question.labelText) : void(0);
                          break;
                        case 'control_inline':
                          question.template !== '' ? values.push(question.template) : void(0);
                          break;
                        default:
                          question.text !== '' ? values.push(question.text) : void(0);
                          question.description !== '' ? values.push(question.description) :void(0);
                    }

                    for(var value; value = values.shift();) {
                      var regex = /\{([^\}]*)\}/gim;
                      // collect all questions in array
                      for (var questions = []; result = regex.exec(value); questions.push(result));

                      if (questions.length > 0) {
                          // reorganise the matrix
                          questions = transpose(questions);

                          questions[1].forEach(function(question_name) {
                              var qname, qtype;
                              var seperator = question_name.indexOf(':') > -1 ? ':' : '[';
                              qname = questions_by_name[question_name.split(seperator)[0]];
                              qtype = questions_by_type[question_name.split(seperator)[0]];
                              
                              // there may be a multiline question field in the question_name:
                              var multilineFieldRegex = /\[(.*?)\]/gi;
                              var multilineFieldResult = multilineFieldRegex.exec(question_name);
                              var multilineFieldEquation = multilineFieldResult ? qname + '|' + multilineFieldResult[1] : '';

                              if (qtype === 'control_inline') {
                                  var inlineFieldRegex = /(\:)(.*)/gi;
                                  var inlineFieldResult = inlineFieldRegex.exec(question_name);
                                  if (inlineFieldResult) {
                                      var subfield = inlineFieldResult[2];
                                      var subfieldSplit = subfield.split('-');
                                      var fieldId = Number(subfieldSplit[0]) ? subfieldSplit[0] : subfieldSplit[1];
                                      multilineFieldEquation = qname + '|' + fieldId;
                                  }
                              }

                              JotForm.calculations.push({
                                  decimalPlaces: "2",
                                  defaultValue: "",
                                  equation: "{" + (multilineFieldEquation || qname) + "}",
                                  ignoreHiddenFields: "",
                                  insertAsText: "1",
                                  isLabel: ["control_text", "control_inline"].indexOf(question.type) > -1 ? "" : "1",
                                  newCalculationType: "1",
                                  operands: (multilineFieldEquation || qname),
                                  readOnly: "",
                                  replaceText: question_name,
                                  resultField: question.qid,
                                  showBeforeInput: "",
                                  tagReplacement: "1",
                                  useCommasForDecimals: ""
                              });
                          });
                      }
                    }
                }
            });
        }
    },

    runConditionForId: function (id) {
        $H(JotForm.fieldConditions).each(function (pair) {
            var conds = pair.value.conditions;
            $A(conds).each(function (cond) {
                $A(cond.terms).each(function (term) {
                    // calls checkCondition on product quantity checkbox state
                    var inputTermField = "input_" + term.field;
                    if (term.field === id || id === inputTermField) {
                        JotForm.checkCondition(cond);
                    }
                });
            });
        });
    },

    otherConditionTrue: function (field, visibility) {
        visibility = visibility.replace(/multiple/, "");
        var otherConditionTrue = false;
        $H(JotForm.fieldConditions).each(function (pair) {
            var conds = pair.value.conditions;
            $A(conds).each(function (cond) {
                $A(cond.action).each(function (action) {
                    if (action.fields) {
                        action.fields.each(function (multiField) {
                            if (multiField === field && action.visibility && action.visibility.toLowerCase().replace(/multiple/, "") === visibility && action.hasOwnProperty('currentlyTrue') && action.currentlyTrue) {
                                otherConditionTrue = true;
                                return;
                            }
                        });
                    }
                    if (action.field === field && action.visibility && action.visibility.toLowerCase() === visibility && action.hasOwnProperty('currentlyTrue') && action.currentlyTrue) {
                        otherConditionTrue = true;
                    }
                });
            });
        });

        return otherConditionTrue;
    },

    /**
     * Shows a field
     * @param {Object} field
     */
    showField: function (field, isConditionActive) {
        if (JotForm.otherConditionTrue(field, 'hide')) return;
        // Default value for isConditionActive
        isConditionActive = typeof isConditionActive == 'undefined' ? true : isConditionActive
        var element = null;
        var idField = $('id_' + field);
        var cidField = $('cid_' + field);
        var sectionField = $('section_' + field);

        if (sectionField && cidField) { // Form collapse
            element = sectionField;
        } else if (cidField && !idField) { // Heading
            element = cidField;
        } else { // Regular field
            element = idField;
        }

        //If no form element is found check for hidden single product field
        if (!element) {
            var productField = $$('input[name*="q' + field + '"][type="hidden"]');

            if (productField.length > 0) {
                productField[0].setAttribute('selected', true);
            }

            return element;
        }

        this.getSubmitButton(element).show();

        // check if element is currently hidden
        var wasHidden = element.hasClassName('form-field-hidden') || element.hasClassName('always-hidden');

        element.removeClassName('form-field-hidden');
        if (isConditionActive || window.FORM_MODE === 'cardform') {
            element.removeClassName('always-hidden');
        }
        if(!(element.hasClassName("form-section") || element.hasClassName("form-section-closed")) && element.down(".always-hidden")) {
            element.down(".always-hidden").removeClassName('always-hidden');
        }

        if (JotForm.paymentFields.indexOf(element.getAttribute('data-type')) > -1 && $('hiddenPaymentField')) {
            $('hiddenPaymentField').remove();
        }

        // kemal:bug::#145986 Form collapse bug
        if (sectionField) {
            if (element.hasClassName('form-section-closed')) { //if a closed form-section
                //check for .form-collapse-table has class form-collapse-hidden
                if (element.select('.form-collapse-table')[0].hasClassName('form-collapse-hidden')) {
                    //element is hidden remove class add class
                    element.removeClassName('form-section-closed');
                    element.addClassName('form-section');
                    element.setStyle({
                        height: "auto",
                        overflow: "visible"
                    });
                } else {
                    //element is visible do not add auto height
                    element.setStyle({
                        overflow: "hidden"
                    });
                }
            } else {
                //case for status = closed
                element.setStyle({
                    height: "auto",
                    overflow: "visible"
                });
            }
        }

        if (JotForm.getInputType(field) === 'html' && $('text_' + field).innerHTML.match(/google.*maps/gi)) { //google maps hack to get the iframe to redisplay in the right place
            $('text_' + field).innerHTML = $('text_' + field).innerHTML;
        }

        var elemShown = element.show();

        if (JotForm.getInputType(field) === 'widget') {
            JotForm.showWidget(field);
        }
        if (JotForm.getInputType(field) === 'signature' && wasHidden) {
            JotForm.showAndResizeESignature(field);
        }

        // kenneth: form callapse + condition + widgets bug when collapse opened by default
        if (JotForm.getInputType(field) === 'collapse') {
            // do something under collapse bar if shown opened by default
            if (sectionField && !element.hasClassName('form-section-closed')) {
                element.select('li.form-line').each(function (node, i) {
                    var id = node.id.split('_')[1];

                    // show widget fields
                    if (JotForm.getInputType(id) === 'widget') {
                        JotForm.showWidget(id);
                    } else if (JotForm.getInputType(id) === 'signature') {
                        JotForm.showAndResizeESignature(id);
                    }
                });
            }
        }

        // Re-calculate cardform matrix size
        if (window.FORM_MODE == 'cardform' && wasHidden && ($('id_' + field) && $('id_' + field).readAttribute('data-type') == 'control_matrix')) {
            JotForm.setMatrixLayout(field, false);
        }

        // if donation and has a source field
        if (JotForm.donationField && element.down('[data-component="paymentDonation"][data-custom-amount-field]')) {
            JotForm.updateDonationAmount();
        }

        if (element.getAttribute('data-type') === "control_paypalSPB" && $$('[data-paypal-button="Yes"]')[0]) {
            var paypalButton = $$('.paypal-buttons.paypal-buttons-context-iframe')[0];

            if (paypalButton) {
                var paypalButtonContainer = JotForm.getContainer(paypalButton);

                if (paypalButtonContainer) {
                    paypalButtonContainer.setAttribute('paypal-button-status', 'show');
                }
            }
        }

        return elemShown;
    },

    collectStylesheet: function () {
        var styles = $$('style, link');
        var styleTags = [];

        styles.forEach(function (style) {
            if (style.type === 'text/css' || style.rel === 'stylesheet') {
                styleTags.push(style.outerHTML);
            }
        });

        return styleTags;
    },

    handleWidgetStyles: function () {
        var team = getQuerystring('team')

        if (JotForm.newDefaultTheme) {
            window.newDefaultTheme = 'v2';
        }

        if (team === 'marvel' || team === 'muse') {
            var styleTags = JotForm.collectStylesheet();
            $$('[data-type=control_widget] iframe').forEach(function (frame) {
                frame.addEventListener("load", function() {
                    frame.contentWindow.postMessage({ cmd: 'injectStyle', styleTags: styleTags }, '*');
                });
            });
        }
    },

    showWidget: function (id, postTranslate) {
        var referrer = document.getElementById("customFieldFrame_" + id) ? document.getElementById("customFieldFrame_" + id).src : false;
        if (referrer) {
            var frame = (navigator.userAgent.indexOf("Firefox") != -1 && typeof getIframeWindow !== 'undefined') ? getIframeWindow(window.frames["customFieldFrame_" + id]) : window.frames["customFieldFrame_" + id];
            var isFrameXDready = (!$("customFieldFrame_" + id).hasClassName('frame-xd-ready') && !$("customFieldFrame_" + id).retrieve('frame-xd-ready')) ? false : true;

            // only post a message when its ready to receive a post message
            if (frame && isFrameXDready) {
                XD.postMessage(JSON.stringify({type: "show", qid: id}), referrer, frame);

                // send ready message event at the same time for widgets
                // that doesn't work with show
                if (typeof window.JCFServerCommon !== 'undefined') {
                    // only send ready if the section of the frame is current visible
                    if (JotForm.isVisible(JotForm.getSection($("id_" + id))) && JotForm.isVisible($("id_" + id))) {
                        // verify existence of widget frame
                        if (window.JCFServerCommon.frames.hasOwnProperty(id)) {
                            window.JCFServerCommon.frames[id].sendReadyMessage(id);
                        }
                    }
                }

                // BUGFIX#2781483 :: send translate message event for configurable list widgets
                if (postTranslate && JotForm.getWidgetType(id) === 'configurableList' && typeof FormTranslation !== 'undefined') {
                    var message = {
                        type: "translate",
                        id: id,
                        dictionary: FormTranslation.dictionary,
                        to: FormTranslation.to,
                        success: true
                    };
                    XD.postMessage(JSON.stringify(message), referrer, frame); 
                }
            }
        }
    },

    reloadWidget: function (id) {
        var referrer = document.getElementById("customFieldFrame_" + id) ? document.getElementById("customFieldFrame_" + id).src : false;
        if (referrer) {
            var frame = (navigator.userAgent.indexOf("Firefox") != -1 && typeof getIframeWindow !== 'undefined') ? getIframeWindow(window.frames["customFieldFrame_" + id]) : window.frames["customFieldFrame_" + id];
            var isFrameXDready = (!$("customFieldFrame_" + id).hasClassName('frame-xd-ready') && !$("customFieldFrame_" + id).retrieve('frame-xd-ready')) ? false : true;

            // only post a message when its ready to receive a post message
            if (frame && isFrameXDready) {
                XD.postMessage(JSON.stringify({type: "reload", qid: id}), referrer, frame);
            }
        }
    },

    /**
     * Determines if widgets should skip submitting the form or not
     * Some other processes, like payments or encryption, might have to perform the submit action
     * @returns {boolean}
     */
    shouldWidgetSkipSubmit: function () {
        if (JotForm.isEncrypted || JotForm.disableSubmitButton) { return true; }

        var selfSubmittingPayments = ["stripe", "braintree", "square", "eway", "bluepay", "moneris", "paypalcomplete", "mollie"];
        if (!JotForm.isEditMode() && JotForm.isPaymentSelected() &&  selfSubmittingPayments.indexOf(JotForm.payment) > -1) {
            return JotForm.paymentTotal > 0 || (JotForm.payment == 'stripe' && window.paymentType == 'subscription');
        }

        return false;
    },

    showAndResizeESignature: function(id) {
        // resize field and reset, only when visible
        var element = $('id_' + id);
        if (element && JotForm.isVisible(element) && element.select('.pad').length > 0) {
            element.select('.pad').first().fire('on:sigresize');
        }
    },

    /**
     * Hides a field
     * @param {Object} field
     */
    hideField: function (field, multiple, dontClear) {
        if (JotForm.otherConditionTrue(field, 'show')) return;

        var idPrefix = 'id_';

        // For headings
        if ($('cid_' + field) && !$('id_' + field)) {
            idPrefix = 'cid_';
        }

        // For form collapses
        if ($('cid_' + field) && $('section_' + field)) {
            idPrefix = 'section_';
        }
        var element = $(idPrefix + field);

        if (element) {
            element.addClassName('form-field-hidden');
            // add field to identify that payment is conditionally hidden
            if (JotForm.paymentFields.indexOf(element.getAttribute('data-type')) > -1 && !$('hiddenPaymentField')) {
                $$('form')[0].insert(new Element('input', {
                    type: 'hidden',
                    name: 'hiddenPaymentField',
                    id: 'hiddenPaymentField',
                    value: 1
                }));
            }

            if (element.getAttribute('data-type') === "control_paypalSPB" && $$('[data-paypal-button="Yes"]')[0]) {
                var paypalButton = $$('.paypal-buttons.paypal-buttons-context-iframe')[0];

                if (paypalButton) {
                    var paypalButtonContainer = JotForm.getContainer(paypalButton);
    
                    if (paypalButtonContainer) {
                        paypalButtonContainer.setAttribute('paypal-button-status', 'hide');
                    }
                }
            }
            
            if (JotForm.clearFieldOnHide == "enable" && !dontClear && !JotForm.ignoreInsertionCondition) {
                try {
                    JotForm.clearField(field);
                } catch (e) {
                    console.log(e);
                }
            }

            if(element.style.setProperty) {
                this.getSubmitButton(element).style.setProperty('display', 'none', 'important');
            } else {
                this.getSubmitButton(element).hide();
            }
            
            // if donation and has a source field
            if (JotForm.donationField && element.down('[data-component="paymentDonation"][data-custom-amount-field]')) {
                JotForm.updateDonationAmount(0);
            }
            // correct this field
            JotForm.corrected(element);

            return element;
        }

        //If no form element is found check for hidden single product field
        var productField = $$('input[name*="q' + field + '"][type="hidden"]');

        if (productField.length > 0) {
            productField[0].setAttribute('selected', false);
        }
    },

    /**
     * Get Submit Button Element
     * @param {HTMLElement} targetElement
     */
    getSubmitButton: function (targetElement) {
        if (
            targetElement.getAttribute('data-type') === 'control_button' &&
            targetElement.getElementsBySelector('button').length > 1
        ) {
            targetElement.getElementsBySelector('button').each(function (item) {
                if (item.hasClassName('submit-button')) {
                    targetElement = item;
                }
            });
        }

        return targetElement;
    },

    clearField: function (field, subfield, dontTrigger) {

        var type = JotForm.calculationType(field);

        if (!type) return;

        var defaultValue = "input_"+field in JotForm.defaultValues ? JotForm.defaultValues["input_"+field] : "";

        if (field.indexOf('|') > -1) {
            var fieldSplit = field.split('|');
            field = fieldSplit[0];
            if (!subfield) {
                subfield = fieldSplit[1];
            }
        }

        if (type == "file") {
            $("id_" + field).select('ul').each(function (element) {
                if(element.getElementsByTagName('li').length > 0) {
                    element.querySelectorAll('span.qq-upload-delete').forEach(function(item) {
                        item.click();
                    });
                }
            });
        }

        if (type == "collapse") {
            $("section_" + field).select(".form-line").each(function (el) {
                var id = el.id.replace("id_", "");
                JotForm.clearField(id);
            });
            return;
        }

        if(type === "matrix" && subfield && $(subfield)) {
            $(subfield).value = "";
            if(!dontTrigger && $(subfield).triggerEvent) {
                $(subfield).triggerEvent('keyup');
            }

        } else if(type === "matrix") {

            $('id_' + field).select('input[type="text"], input[type="tel"], input[type="number"]').each(function (el) {
                el.value = (el.id in JotForm.defaultValues) ? JotForm.defaultValues[el.id] : "";
            });

            $("id_" + field).select('input[type="radio"], input[type="checkbox"]').each(function (input) {
                if (!JotForm.defaultValues[input.id]) {
                    input.checked = false;
                }
            });

            $('id_' + field).select('select').each(function (el) {
                if(el.id in JotForm.defaultValues) {
                    el.value = JotForm.defaultValues[el.id];
                } else {
                    el.selectedIndex = 0;
                }
            });


            if($('id_' + field).select('input, select').length === 0) return;

            var firstField = $('id_' + field).select('input, select').first();
            if(firstField && firstField.triggerEvent) {
                var eventType;
                if(firstField.nodeName.toLowerCase() === 'input') {
                    if(firstField.type === "checkbox" || firstField.type === "radio") {
                        firstField.up().triggerEvent('click');
                    } else {
                        firstField.triggerEvent('keyup');
                    }
                } else {
                    firstField.triggerEvent('change');
                }
            }

        } else if (["address", "combined", "datetime", "time"].include(type)) {
            if ($('id_' + field).readAttribute('data-type') === 'control_mixed') {
                $('id_' + field).select('.jfField').each( function (el) {
                    if (el.readAttribute('data-type') === 'mixed-dropdown') {
                        var dropdownID = el.querySelector('select').id;
                        if (el.querySelector('input')) {
                            el.querySelector('input').value = (dropdownID in JotForm.defaultValues) ? JotForm.defaultValues[dropdownID] : "";
                        }
                    }
                })
            } else {
                $('id_' + field).select('input').each(function (el) {
                    el.value = (el.id in JotForm.defaultValues) ? JotForm.defaultValues[el.id] : "";
                });
            }

            $('id_' + field).select('select').each(function (el) {
                if(el.id in JotForm.defaultValues) {
                    el.value = JotForm.defaultValues[el.id];
                } else {
                    el.selectedIndex = 0;
                }
            });

            var triggerMe = $('input_' + field) ? $('input_' + field) : $('id_' + field).select('input').first();
            if (triggerMe && triggerMe.triggerEvent) {
                triggerMe.triggerEvent('keyup');
            }

            if ($('input_' + field + '_full') && $('input_' + field + '_full').readAttribute("data-masked") == "true") {
                JotForm.setQuestionMasking("#input_" + field + "_full", "textMasking", $('input_' + field + '_full').readAttribute("maskValue"));
            }

        } else if (["braintree", "stripe", "paypalpro", "authnet"].include(type)) {
            $('id_' + field).select('input[type="text"], .form-address-country').each(function (el) {
                el.value = (el.id in JotForm.defaultValues) ? JotForm.defaultValues[el.id] : "";
            });
        } else if (type === "html") {
            try {
                $('id_' + field).select(".replaceTag").each(function(span) {
                    var def = span.readAttribute("default");
                    span.update(def);
                });
            } catch (e) {
                console.log(e);
            }
        } else if (type === "inline") {
            var selector = 'input, select';
            if (subfield) {
                var TIMESTAMP_OF_2019 = 1546300000000;
                var isNewIDType = Number(subfield) < TIMESTAMP_OF_2019; // old: 1546312345678-firstname / new: firstname-12
                selector = isNewIDType ? 'input[id$=-' + subfield + '], select[id$=-' + subfield + ']' : 'input[id*=' + subfield + '-], select[id*=' + subfield + '-]'
            }
            $('id_' + field).select(selector).each(function (el) {
                if (['radio', 'checkbox'].indexOf(el.type) > -1) {
                    if (el.id in JotForm.defaultValues) {
                        el.checked = true;
                    } else {
                        el.checked = false;
                    }
                } else {
                    if (el.parentNode.dataset.type === 'signaturebox') {
                        // clear image as well
                        var signatureImage = el.parentNode.querySelector('.FITB-sign-image');
                        if (signatureImage) signatureImage.setAttribute('src', '');
                    }
                    el.value = (el.id in JotForm.defaultValues) ? JotForm.defaultValues[el.id] : "";
                }
            });
        } else if (type == "textarea") {
            $('input_' + field).value = defaultValue;
            if($('input_' + field).triggerEvent && !dontTrigger) $('input_' + field).triggerEvent("keyup");
            if ($('input_' + field).showCustomPlaceHolder) {
                $('input_' + field).showCustomPlaceHolder();
            }
            var richArea = $("id_" + field).down('.nicEdit-main');
            if (richArea) {
                richArea.innerHTML = defaultValue;
                if ($('input_' + field).hasClassName('custom-hint-group') && !$('input_' + field).hasContent) {
                    richArea.setStyle({'color': '#babbc0'});
                }
            }
        } else {
            if (type == "checkbox" || type == "radio") {
                $("id_" + field).select('input[type="radio"], input[type="checkbox"]').each(function (input) {
                    if(input.id in JotForm.defaultValues) {
                        input.checked = true;
                    } else {
                        input.checked = false;
                    }
                });
                if ($('id_' + field).triggerEvent && !dontTrigger) $('id_' + field).triggerEvent('change');
            } else if (type == "select") {
                if ($('input_' + field)) {
                    $('input_' + field).value = defaultValue;
                    if ($('input_' + field).triggerEvent && !dontTrigger) $('input_' + field).triggerEvent('change');
                } else { //select matrices
                    $("id_" + field).select('select').each(function (element) {
                        if (element.readAttribute('data-component') !== 'mixed-dropdown') {
                            element.value = '';
                            if (element.triggerEvent && !dontTrigger) element.triggerEvent('change');
                        }
                    });
                }
            } else if ($('input_' + field)) {
                $('input_' + field).value = defaultValue;
                if ($('input_' + field).triggerEvent && !dontTrigger) {
                    if (type == "widget") {
                        var widgetEl = $('input_' + field);
                        widgetEl.fire('widget:clear', {qid: parseInt(widgetEl.id.split('_')[1])});
                        widgetEl.triggerEvent('change');
                    } else {
                        $('input_' + field).triggerEvent('keyup');
                    }
                }
                if(defaultValue === "" && $('input_' + field).hintClear) {
                    $('input_' + field).hintClear(); //ie8&9
                }
                if ($('input_' + field).readAttribute("data-masked") == "true") {
                    JotForm.setQuestionMasking("#input_" + field, "textMasking", $('input_' + field).readAttribute("maskValue"));
                }
                if ($('input_' + field).hasClassName("form-star-rating") && $('input_' + field).setRating) {
                    $('input_' + field).setRating(0);
                }
                if (type == "email") {
                    var parent = $('input_' + field).parentElement;
                    if(window.FORM_MODE == 'cardform' && parent && parent.hasClassName('isFilled')) {
                        parent.removeClassName('isFilled');
                    }
                }
            }
        }
    },

    /**
     * Checks the fieldValue by given operator string
     * @param {Object} operator
     * @param {Object} condValue
     * @param {Object} fieldValue
     */
    checkValueByOperator: function (operator, condValueOrg, fieldValueOrg, termField) {
        try {
            if (typeof condValueOrg == "string" && condValueOrg.indexOf("{") > -1 && condValueOrg.indexOf("}") > -1) { //contains other field reference
                condValueOrg = condValueOrg.replace(/\{.*?\}/gi, function (match, contents, offset, s) {
                    var stripped = match.replace(/[\{\}]/g, "");
                    var elements = $$('input[name$="_' + stripped + '"], input[name$="_' + stripped + '[date]"], input[name$="_' + stripped + '[0]"]'); // updated to fetch emoji slider elements
                    
                    elements = Array.from(elements);
                    if (elements.length > 0) {
                        var element = elements.first();
                        // fixes value for radio type input elems that are set to another field
                        var nonRadioElement = elements.find(function(el) { return el.type !== 'radio'});
                        if (element && !nonRadioElement) {
                            var checkedElement = elements.find(function(el) { return el.checked });
                            if (checkedElement) {
                                return checkedElement.value;
                            }
                            return;
                        }
                        if (element && element.value) {
                            return element.value;
                        }
                    }
                    return match;
                });
            }
        } catch (e) {
            console.log(e);

        }

        var fieldType = JotForm.getInputType(termField);

        var fieldValue = Object.isBoolean(fieldValueOrg) ? fieldValueOrg : fieldValueOrg.toString().strip().toLowerCase();
        var condValue = Object.isBoolean(condValueOrg) ? condValueOrg : condValueOrg.toString().strip().toLowerCase();

        if (fieldType === 'appointment') {
            fieldValue = fieldValue ? new Date(fieldValue.replace(/-/g, '/')).getTime() : 0;
            condValue = condValue ? new Date(condValue.replace(/-/g, '/')).getTime() : 0;
        }

        switch (operator) {
            case "equals":
                return fieldType == 'number' ?  parseFloat(fieldValue) == parseFloat(condValue) : fieldValue == condValue;
            case "quantityEquals":
            case "equalDate":
                return fieldValue == condValue;
            case "equalDay":
                return JotForm.getDayOfWeek(fieldValue) == condValueOrg.toLowerCase();
            case "notEquals":
            case "notEqualDate":
            case "quantityNotEquals":
                return fieldValue != condValue;
            case "notEqualDay":
                return JotForm.getDayOfWeek(fieldValue) != condValue;
            case "endsWith":
                return fieldValue.endsWith(condValue);
            case "notEndsWith":
                return !fieldValue.endsWith(condValue);
            case "startsWith":
                return fieldValue.startsWith(condValue);
            case "notStartsWith":
                return !fieldValue.startsWith(condValue);
            case "contains":
                condValues = condValue != "," ? condValue.split(",") : condValue.split(" ");
                return $A(condValues).any(function (cv) {
                    return fieldValue.include(cv.replace(/^\s+|\s+$/g, ''));
                });
            case "notContains":
                condValues = condValue.split(",");
                return !$A(condValues).any(function (cv) {
                    return fieldValue.include(cv.replace(/^\s+|\s+$/g, ''));
                });
            case "greaterThan":
            case "quantityGreater":
                return (parseFloat(fieldValue, 10) || 0) > (parseFloat(condValue, 10) || 0);
            case "lessThan":
            case "quantityLess":
                //Emre: if Scale Rating doesn't have value it returns "true" so we need to check wheater its length is greater than 0 (52809)
                //fieldValue is string, not number
                if (fieldValue.length) {
                    return (parseFloat(fieldValue, 10) || 0) < (parseFloat(condValue, 10) || 0);
                } else {
                    return false;
                }
            case "isEmpty":
                if (Object.isBoolean(fieldValue) || !fieldValue.empty) {
                    return !fieldValue;
                }
                return fieldValue.empty();
            case "isFilled":
                if (Object.isBoolean(fieldValue) || !fieldValue.empty) {
                    return fieldValue;
                }
                return !fieldValue.empty();
            case "before":
                return fieldValueOrg < condValueOrg;
            case "after":
                return fieldValueOrg > condValueOrg;
            default:
                JotForm.error("Could not find this operator", operator);
        }
        return false;
    },

    getDayOfWeek: function (date) {
        date = new Date(date);
        var days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        return days[date.getDay()];
    },

    typeCache: {},   // Cahcke the check type results for performance
    /**
     *
     * @param {Object} id
     */
    getInputType: function (id) {
        if (JotForm.typeCache[id]) {
            return JotForm.typeCache[id];
        }

        if (typeof id === 'string' && id.indexOf('|') > -1) {
            var tempField = id.split( '|' );
            if ($('id_' + tempField[0]) && $('id_' + tempField[0]).readAttribute('data-type') == "control_inline") {
                id = tempField[0];
            } else {
                id = tempField[0] + '_field_' + tempField[1];
            }
        }

        var type = "other";
        if ($('id_' + id) && $('id_' + id).readAttribute('data-type') == "control_text") {
            type = 'html';
        } else if ($('id_' + id) && $('id_' + id).readAttribute('data-type') == "control_inline") {
            type = 'inline';
        } else if ($('input_' + id + '_pick') || ($('id_' + id) && $('id_' + id).readAttribute('data-type') == "control_datetime")) {
          type = 'datetime';
        } else if ($('input_' + id + '_duration')) {
          type = 'appointment';
        } else if ($('input_' + id)) {
            type = $('input_' + id).nodeName.toLowerCase() == 'input' ? $('input_' + id).readAttribute('type').toLowerCase() : $('input_' + id).nodeName.toLowerCase();
            if ($('input_' + id).hasClassName("form-radio-other-input")) {
                type = "radio";
            }

            if ($('input_' + id).hasClassName("js-forMixed")) {
                type = "mixed";
            }

            if ($('input_' + id).hasClassName("form-checkbox-other-input")) {
                type = "checkbox";
            }

            if ($('input_' + id).hasClassName('form-autocomplete')) {
                type = "autocomplete";
            }

            if ($$('#id_' + id + ' .pad').length > 0) {
                type = 'signature';
            }

            if ($('input_' + id).hasClassName('form-slider')) {
                type = 'slider';
            }

            if ($('input_' + id).hasClassName('form-widget')) {
                type = 'widget';
            }

            if ($('input_' + id).hasClassName('form-star-rating')) {
                type = "rating";
            }

        } else if ($('input_' + id + '_month')) {
            type = 'birthdate';
        } else if ($('input_' + id + '_hourSelect')) {
            type = 'time';
        } else if ($("cid_" + id) && $("cid_" + id).getAttribute("data-type") == "control_collapse") {
            return 'collapse';
        } else if ($$('#id_' + id + ' .form-product-item').length > 0) {
            type = $$('#id_' + id + ' .form-product-item')[0].select('input')[0].readAttribute('type').toLowerCase();
        } else if ($$('#id_' + id + ' .product--subscription').length > 0) {
            type = $$('#id_' + id + ' .product--subscription')[0].select('input')[0].readAttribute('type').toLowerCase();
        } else if ($$('#id_' + id + ' .form-address-table').length > 0) {
            type = 'address';
        } else if ($$('input[id^=input_' + id + '_]')[0] && $$('input[id^=input_' + id + '_]')[0].hasClassName('form-grading-input')) {
            type = 'grading';
        } else if ($('id_' + id) && $('id_' + id).getAttribute('data-type') == 'control_mixed') {
            type = 'mixed';
        } else {
            if ($$('#id_' + id + ' input')[0]) {
                type = $$('#id_' + id + ' input')[0].readAttribute('type').toLowerCase();
                if (type == "text" || type == 'tel' || type === 'number') {
                    type = "combined";
                }
                var matrixInputs = $$('#id_' + id + ' input,' + '#id_' + id + ' select');
                if (!matrixInputs.every(function (input) { return input.type === matrixInputs[0].type })) {
                    // Multi-type matrix
                    type = "combined";
                }
            } else if ($$('#id_' + id + ' select')[0]) {
                type = "select"; //select matrices
            }
        }

        JotForm.typeCache[id] = type;
        return type;
    },
    /**
     * Parses ISO Date string to a real date
     * @param {Object} str
     */
    strToDate: function (str) {
        // When cannot parse return an invalid date
        var invalid = new Date(undefined);
        var match = /(\d{4})\-(\d{2})-(\d{2})T?(\d{2})?\:?(\d{2})?/gim;

        if (str.empty()) {
            return invalid;
        }

        // if(!str.include("T")){ str += "T00:00"; }

        if (!match.test(str)) {
            return invalid;
        }

        var d = new Date();
        str.replace(match, function (all, year, month, day, hour, minutes) {
            if (hour) {
                d = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10), parseInt(hour, 10), parseInt(minutes, 10));
            } else {
                d = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
            }
            return all;
        });

        return d;
    },

    getBirthDate: function (id) {
        var day = $('input_' + id + '_day').getValue() || "%empty%";
        var month = $('input_' + id + '_month').selectedIndex || "%empty%";
        month = String(month);
        var year = $('input_' + id + '_year').getValue() || "%empty%";
        var date = year + "-" + (month.length == 1 ? '0' + month : month) + "-" + (day.length == 1 ? '0' + day : day);
        if (date.include("%empty%")) return "";
        return date;
    },

    get24HourTime: function (id) {
        var hour = $('input_' + id + '_hourSelect').getValue();
        if (hour == "") return "";
        var minute = $('input_' + id + '_minuteSelect').getValue();
        if (minute.length == 0) minute = "00";
        var ampm = ($('input_' + id + '_ampm')) ? $('input_' + id + '_ampm').getValue() : '';
        hour = Number(hour);
        if (ampm == 'PM' && hour != 12) {
            hour += 12;
        } else if (ampm == 'AM' && hour == 12) {
            hour = 0;
        }
        hour = (hour < 10) ? "0" + hour : String(hour);
        return hour + minute;
    },

    getDateValue: function (id) {
        var date = "";
        if ($('year_' + id)) {
            date += ($('year_' + id).value || "%empty%");
        }
        if ($('month_' + id)) {
            var mm = $('month_' + id).value ? ($('month_' + id).value.length > 1 ? $('month_' + id).value : "0" + $('month_' + id).value) : "%empty%";
            date += "-" + mm;
        }
        if ($('day_' + id)) {
            var dd = $('day_' + id).value ? ($('day_' + id).value.length > 1 ? $('day_' + id).value : "0" + $('day_' + id).value) : "%empty%";
            date += "-" + dd;
        }

        if (date.include("%empty%")) {
            JotForm.info("Wrong date: " + date);
            return "";
        }
        var h = "";
        if ($('ampm_' + id)) {
            if ($('hour_' + id)) {
                h = $('hour_' + id).value;
                if ($('ampm_' + id).value == 'pm') {
                    h = parseInt(h, 10) + 12;
                }
                if (h == "24") {
                    h = 0;
                }
                date += "T" + ((h.length == 1 ? "0" + h : h) || "00");
            }
        } else {
            if ($('hour_' + id)) {
                h = $('hour_' + id).value;
                date += "T" + ((h.length == 1 ? "0" + h : h) || "00");
            }
        }

        if ($('min_' + id)) {
            date += ":" + ($('min_' + id).value || "00");
        }
        if (h === "") {
            date += "T00:00";
        }
        return date;
    },
    hidePages: {},

    getAdditionalRequiredValidationArray: function (action, qIdForMultiple) {
        if(!action.additionalRequireTypes) return;
        var values = [];

        if(qIdForMultiple) {
            Object.keys(action.additionalRequireTypes).forEach(function(qKey) {
                var qidFromQKey = typeof qKey === 'string' && qKey.split('-').length >= 2 && qKey.split('-')[1]
                if(qIdForMultiple === qidFromQKey) {
                    Object.keys(action.additionalRequireTypes[qKey]).forEach(function(val) {
                        values.push(action.additionalRequireTypes[qKey][val]);
                    });
                }
            });
        }else {
            Object.keys(action.additionalRequireTypes).forEach(function(qKey) {
                Object.keys(action.additionalRequireTypes[qKey]).forEach(function(val) {
                    values.push(action.additionalRequireTypes[qKey][val]);
                });
            });
        }
        return values;
    },

    getFieldFromID: function (questionID) {
        return $$('.form-line#id_' + questionID)[0];
    },

    /**
     *
     * @param {Object} condition
     */
    checkCondition: function (condition, sourceField, sourceEvent) {
        var any = false, all = true;
        var filled;
        // Handle notEqual and Equal differently
        var anyCalculationForMultiInput = {
            notEquals: [],
            equals: [],
            equalsCount: 0,
            notEqualsCount: 0
        };

        if(condition.link === undefined) {
            condition.link = 'Any';
        }

        $A(condition.terms).each(function (term) {
            var value;
            var anotherField = JotForm.getFieldIdFromFieldRef(term.value);
            term.field = String(term.field);
            try {
                var fieldType = JotForm.getInputType(term.field);
                switch (fieldType) {
                    case "combined":
                        if (['isEmpty', 'isFilled'].include(term.operator)) {
                            filled = $$('#id_' + term.field + ' input,' + '#id_' + term.field + ' select').collect(function (e) {
                                return e.getAttribute('type') === 'checkbox' || e.getAttribute('type') === 'radio' ? (e.checked ? e.value : '') : e.value;
                            }).any();

                            if (JotForm.checkValueByOperator(term.operator, term.value, filled)) {
                                any = true;
                            } else {
                                all = false;
                            }

                            return;
                            /* continue; */
                        } else {
                            //for matrices
                            value = $$('#id_' + term.field + ' input,' + '#id_' + term.field + ' select').collect(function (e) {
                                return e.getAttribute('type') === 'checkbox' ? (e.checked ? e.value : '') : e.value;
                            });
                            if (JotForm.checkValueByOperator(term.operator, term.value, value)) {
                                any = true;
                            } else {
                                all = false;
                            }
                        }
                        break;
                    case "address":
                        if (['isEmpty', 'isFilled'].include(term.operator)) {
                            filled = $$('#id_' + term.field + ' input:not(.jfDropdown-search)', '#id_' + term.field + ' select').collect(function (e) {
                                return e.value;
                            }).any();
                            if (JotForm.checkValueByOperator(term.operator, term.value, filled)) {
                                any = true;
                            } else {
                                all = false;
                            }
                        } else if(term.operator == "equalCountry" || term.operator == 'notEqualCountry') {
                            var option;
                            var termValue = term.value;

                            if (anotherField) {
                                termValue = $('input_'+anotherField+'_country').value;
                            }

                            $('input_' + term.field + '_country').select("option").each(function(opt) {
                                if(termValue === opt.value) {
                                    option = opt;
                                    throw $break;
                                }
                            });

                            if(option) {
                                if (term.operator == 'equalCountry') {
                                    if (option.selected) {
                                        any = true;
                                    } else {
                                        all = false;
                                    }
                                } else if (term.operator == 'notEqualCountry') {
                                    if (!option.selected) {
                                        any = true;
                                    } else {
                                        all = false;
                                    }
                                }
                            }
                        } else {
                            var inputValue;
                            var termValue = term.value;
                            if (anotherField) {
                                termValue = $('input_'+anotherField+'_state').value;
                            }
                            inputValue = $('input_' + term.field + '_state').value 
                            if(inputValue) {
                                if (term.operator == 'equalState') {
                                    if (inputValue == termValue) {
                                        any = true;
                                    } else {
                                        all = false;
                                    }
                                } else if (term.operator == 'notEqualState') {
                                    if (!(inputValue == termValue)) {
                                        any = true;
                                    } else {
                                        all = false;
                                    }
                                }
                            }
                        }
                        break;
                    case "birthdate":
                    case "datetime":
                        value = (fieldType == "datetime") ? JotForm.getDateValue(term.field) : JotForm.getBirthDate(term.field);
                        if (value === undefined) {
                            return;
                            /* continue; */
                        }

                        if (['isEmpty', 'isFilled'].include(term.operator)) {
                            if (JotForm.checkValueByOperator(term.operator, term.value, value)) {
                                any = true;
                            } else {
                                all = false;
                            }

                        } else {
                            var termValue = term.value;
                            termValue = term.value.toLowerCase().replace(/\s/g,"");
                            if (termValue.indexOf('today') > -1) {
                                var offset = parseInt(termValue.split('today')[1]) || 0;
                                var comparativeDate = new Date();
                                comparativeDate.setDate(comparativeDate.getDate() + offset);
                                var year = comparativeDate.getFullYear();
                                var month = comparativeDate.getMonth() + 1;
                                month = (month < 10) ? '0' + month : month;
                                var day = comparativeDate.getDate();
                                day = (day < 10) ? '0' + day : day;
                                termValue = year + "-" + month + "-" + day;
                            } else if(anotherField) {
                                var year = $("year_"+anotherField).value;
                                var month = $("month_"+anotherField).value;
                                var day = $("day_"+anotherField).value;

                                if(term.operator === "equalDay" || term.operator === "notEqualDay") {
                                    termValue = JotForm.getDayOfWeek(JotForm.strToDate(year+"-"+month+"-"+day));
                                } else {
                                    termValue = year+"-"+month+"-"+day;
                                }

                            }

                            if (['equalDate', 'notEqualDate', 'after'].include(term.operator)) {
                                if (JotForm.checkValueByOperator(term.operator, JotForm.strToDate(termValue), JotForm.strToDate(value.split('T')[0]))) {
                                    any = true;
                                } else {
                                    all = false;
                                }
                            } else if (['equalDay', 'notEqualDay'].include(term.operator)) {
                                if (JotForm.checkValueByOperator(term.operator, termValue, JotForm.strToDate(value))) {
                                    any = true;
                                } else {
                                    all = false;
                                }
                            } else {
                                if (JotForm.checkValueByOperator(term.operator, JotForm.strToDate(termValue), JotForm.strToDate(value))) {
                                    any = true;
                                } else {
                                    all = false;
                                }
                            }
                        }
                        break;
                    case "time":
                        value = JotForm.get24HourTime(term.field);
                        var termValue = (!term.value) ? "" : term.value.replace(/:/, "");
                        if(anotherField) {
                            termValue = JotForm.get24HourTime(anotherField);
                        }

                        if (termValue.length == 3) termValue = "0" + termValue;
                        if (term.operator == 'before' && value.empty()) {
                            all = false;
                        } else {
                            if (JotForm.checkValueByOperator(term.operator, termValue, value))
                                any = true;
                            else
                                all = false;
                        }
                        break;
                    case "checkbox":
                    case "radio":
                        if (['isEmpty', 'isFilled'].include(term.operator)) {
                            filled = $$('#id_' + term.field + ' input').collect(function (e) {
                                return e.checked;
                            }).any();

                            if (JotForm.checkValueByOperator(term.operator, term.value, filled)) {
                                any = true;
                            } else {
                                all = false;
                            }

                            return;
                            /* continue; */
                        }
                        if (term.value) term.value = term.value.replace(/&amp;/g, '&').replace(/&gt;/g, '>').replace(/&lt;/g, '<');

                        if (['lessThan', 'greaterThan'].include(term.operator)) {
                            var localResult = false;
                            $$('#id_' + term.field + ' input').each(function (input) {
                                value = input.checked ? input.value : '';
                                if (JotForm.checkValueByOperator(term.operator, term.value, value)) {
                                    any = true;
                                    localResult = true;
                                }
                            });
                            if (!localResult) all = false;
                            return;
                        }

                        var otherValue = $('id_' + term.field).down(".form-"+fieldType+"-other-input") ? $('id_' + term.field).down(".form-"+fieldType+"-other-input").getAttribute('data-otherhint').replace(/&amp;/g, '&').replace(/&gt;/g, '>').replace(/&lt;/g, '<') : "";
                        // Count terms
                        if(term.operator == 'notEquals' || term.operator == 'equals') {
                            anyCalculationForMultiInput[term.operator + 'Count']++;
                        }
                        $$('#id_' + term.field + ' input').each(function (input) {
                            if (input.hasClassName('form-' + fieldType + '-other') && input.checked) {
                                value = '-- '+otherValue+' --';
                            } else {
                                value = input.checked ? input.value : '';
                                value = value.replace(/_expanded/, '');
                            }
                            var termValue = term.value.strip();
                            var checkResult = JotForm.checkValueByOperator(term.operator, termValue, value);
                            // Push condition result for each input
                            if(term.operator == 'notEquals' || term.operator == 'equals') {
                                anyCalculationForMultiInput[term.operator].push(checkResult)
                            }
                            if (checkResult) {
                                any = true;
                            } else {
                                if (term.operator == 'notEquals' && termValue == value) {
                                    // If not equals item is found 'all' condition should fail
                                    all = false;
                                    // If condition is interested in 'all', then we can break each loop
                                    if(condition.link.toLowerCase() == 'all') {
                                        throw $break;
                                    }
                                } else if (input.value == termValue || (input.hasClassName('form-' + fieldType + '-other') && termValue == '-- '+otherValue+' --')) {
                                    all = false;
                                }
                            }
                        });
                        break;
                    case "select":

                        if (term.value) {
                          term.value = term.value.replace(/&amp;/g, '&');
                        }

                        var tempInput = '';
                        if (term.field.indexOf('|') > -1) {
                          var tempSplit = term.field.split( '|' );
                          tempInput = 'input_' + tempSplit[0] + '_field_' + tempSplit[1];
                        } else {
                          tempInput = 'input_' + term.field;
                        }

                        if ($(tempInput) && $(tempInput).multiple) {
                            if (term.operator == 'equals') {
                                var option = $(tempInput).select('option[value=' + term.value + ']');
                                if (option.length > 0 && option[0].selected) {
                                    any = true;
                                } else {
                                    all = false;
                                }
                            } else if (term.operator == 'notEquals') {
                                var option = $(tempInput).select('option[value=' + term.value + ']');
                                if (option.length > 0 && !option[0].selected) {
                                    any = true;
                                } else {
                                    all = false;
                                }
                            } else if (['isEmpty', 'isFilled'].include(term.operator)) {
                                var selected = false;
                                var arr = $(tempInput).options;
                                for (var i = 0; i < arr.length; i++) {
                                    if (!arr[i].value.empty() && arr[i].selected == true) {
                                        selected = true;
                                    }
                                }
                                if (term.operator == 'isEmpty') {
                                    if (!selected) any = true;
                                    else all = false;
                                }
                                if (term.operator == 'isFilled') {
                                    if (selected) any = true;
                                    else all = false;
                                }
                            }
                        } else if ($(tempInput)) {
                            value = $(tempInput).value;
                            if (value === undefined) {
                                return;
                                /* continue; */
                            }
                            if (JotForm.checkValueByOperator(term.operator, term.value, value)) {
                                any = true;
                            } else {
                                all = false;
                            }
                        } else if (['isEmpty', 'isFilled'].include(term.operator)) {
                            filled = $$('#id_' + term.field + ' select').collect(function (e) {
                                return e.value;
                            }).any();
                            if (JotForm.checkValueByOperator(term.operator, term.value, filled)) {
                                any = true;
                            } else {
                                all = false;
                            }
                        } else {
                            value = $$('#id_' + term.field + ' select').collect(function (e) {
                                return e.value;
                            });
                            if (JotForm.checkValueByOperator(term.operator, term.value, value)) {
                                any = true;
                            } else {
                                all = false;
                            }
                        }
                        break;
                    case "grading":
                        if (['isEmpty', 'isFilled'].include(term.operator)) {
                            filled = $$('input[id^=input_' + term.field + '_]').collect(function (e) {
                                return e.value;
                            }).any();
                            if (JotForm.checkValueByOperator(term.operator, term.value, filled)) {
                                any = true;
                            } else {
                                all = false;
                            }
                        } else {
                            value = $('grade_point_' + term.field).innerHTML.stripTags();
                            if (JotForm.checkValueByOperator(term.operator, term.value, value)) {
                                any = true;
                            } else {
                                all = false;
                            }
                        }
                        break;
                    case "file":
                        if ($('id_' + term.field).select('.qq-uploader').length > 0) {
                            value = $('id_' + term.field).select('.qq-upload-file').length > 0;
                        } else {
                            if ($('input_' + term.field).uploadMarked) {
                                value = $('input_' + term.field).uploadMarked;
                            } else {
                                value = $('input_' + term.field).value;
                            }
                        }

                        if (value === undefined) {
                            return;
                            /* continue; */
                        }
                        if (JotForm.checkValueByOperator(term.operator, term.value, value, term.field)) {
                            any = true;
                        } else {
                            all = false;
                        }
                        break;

                    case "textarea":
                        value = $('input_' + term.field).value;
                        if ($('input_' + term.field).hinted || $('input_' + term.field).hasClassName('form-custom-hint')) {
                            value = "";
                        }
                        if (value === undefined) {
                            return;
                            /* continue; */
                        }
                        var rich = $('id_' + term.field).down('.nicEdit-main');
                        if (rich) {
                            value = value.stripTags().replace(/\s/g, ' ').replace(/&nbsp;/g, ' ');
                        }

                        if (JotForm.checkValueByOperator(term.operator, term.value, value, term.field)) {
                            any = true;
                        } else {
                            all = false;
                        }
                        break;

                    case "widget":
                        value = $('input_' + term.field).value;
                        if (value === undefined) {
                            return;
                        }
                        if (value.indexOf("widget_metadata") > -1) { //object not simple
                            try {
                                value = JSON.parse(value).widget_metadata.value;
                                var matchingItem = false;
                                for (var i = 0; i < value.length; i++) {
                                    var obj = value[i];
                                    for (var item in obj) {
                                        if (JotForm.checkValueByOperator(term.operator, term.value, obj[item], term.field)) {
                                            any = true;
                                            matchingItem = true;
                                        }
                                    }
                                }
                                if (!matchingItem) all = false;
                            } catch (e) {
                                console.log(e);
                            }

                        } else {

                            value = (term.operator === "greaterThan" || term.operator === "lessThan") && typeof value === "string" ? value.replace(/,/g, '') : value;

                            if (JotForm.checkValueByOperator(term.operator, term.value, value, term.field)) {
                                any = true;
                            } else {
                                all = false;
                            }
                        }

                        break;

                    case "hidden":
                        if($('input_' + term.field + "_donation")) {
                            value = $('input_' + term.field + "_donation").value;
                        } else {
                            value = $('input_' + term.field).value;
                        }
                        if (JotForm.checkValueByOperator(term.operator, term.value, value, term.field)) {
                            any = true;
                        } else {
                            all = false;
                        }
                        break;

                    case "rating":
                        value = $('input_' + term.field).value || '';
                        if (JotForm.checkValueByOperator(term.operator, term.value, value, term.field)) {
                            any = true;
                        } else {
                            all = false;
                        }
                        break;
                    case "inline":
                        var selector = '';
                        if (term.field.indexOf('|') > -1) {
                            var tempSplit = term.field.split( '|' );
                            var questionId = tempSplit[0];
                            var fieldId = tempSplit[1];
                            var TIMESTAMP_OF_2019 = 1546300000000;
                            var isNewIDType = Number(fieldId) > TIMESTAMP_OF_2019; // old: 1546312345678-firstname / new: firstname-12
                            var selector = isNewIDType ? '[id*=' + fieldId + '-]' : '[id$=-' + fieldId + ']';
                            selector = '#id_' + questionId + ' input' + selector + ', #id_' + questionId + ' select' + selector;
                        } else {
                            return;
                        }
                        var inputs = $$(selector);
                        if (inputs.length === 0) {
                            return;
                        }
                        value = inputs.collect(function(e) {
                            return ['checkbox', 'radio'].indexOf(e.getAttribute('type')) > -1 ? (e.checked ? e.value : '') : e.value;
                        }).filter(function(val) {return val;}).join(' ');
                        if (JotForm.checkValueByOperator(term.operator, term.value, value, term.field)) {
                            any = true;
                        } else {
                            all = false;
                        }
                        break;
                    case "appointment":
                        value = JotForm.appointments[term.field].getComparableValue();
                        if (JotForm.checkValueByOperator(term.operator, term.value, value, term.field)) {
                            any = true;
                        } else {
                            all = false;
                        }
                        break;
                    default:
                        var tempInput = '';

                        if (term.field.indexOf('|') > -1) {
                          var tempSplit = term.field.split( '|' );
                          tempInput = 'input_' + tempSplit[0] + '_field_' + tempSplit[1];
                        } else {
                          tempInput = 'input_' + term.field;
                        }
                        if(!$(tempInput)) {
                            return;
                        }

                        if ($(tempInput) && $(tempInput).multiple) {
                            if (term.operator == 'equals') {
                                var option = $(tempInput).select('option[value=' + term.value + ']');
                                if (option.length > 0 && option[0].selected) {
                                    any = true;
                                } else {
                                    all = false;
                                }
                            } else if (term.operator == 'notEquals') {
                                var option = $(tempInput).select('option[value=' + term.value + ']');
                                if (option.length > 0 && !option[0].selected) {
                                    any = true;
                                } else {
                                    all = false;
                                }
                            } else if (['isEmpty', 'isFilled'].include(term.operator)) {
                                var selected = false;
                                var arr = $(tempInput).options;
                                for (var i = 0; i < arr.length; i++) {
                                    if (!arr[i].value.empty() && arr[i].selected == true) {
                                        selected = true;
                                    }
                                }
                                if (term.operator == 'isEmpty') {
                                    if (!selected) any = true;
                                    else all = false;
                                }
                                if (term.operator == 'isFilled') {
                                    if (selected) any = true;
                                    else all = false;
                                }
                            }
                        } else if ($(tempInput)) {
                            value = $(tempInput).value;
                            if (value === undefined) {
                                return;
                                /* continue; */
                            }
                            if (JotForm.checkValueByOperator(term.operator, term.value, value, term.field)) {
                                any = true;
                            } else {
                                all = false;
                            }
                        } else if (['isEmpty', 'isFilled'].include(term.operator)) {
                            filled = $$('#id_' + term.field + ' select').collect(function (e) {
                                return e.value;
                            }).any();
                            if (JotForm.checkValueByOperator(term.operator, term.value, filled, term.field)) {
                                any = true;
                            } else {
                                all = false;
                            }
                        } else {
                            value = $$('#id_' + term.field + ' select').collect(function (e) {
                                return e.value;
                            });
                            if (JotForm.checkValueByOperator(term.operator, term.value, value, term.field)) {
                                any = true;
                            } else {
                                all = false;
                            }
                        }
                }

            } catch (e) {
                JotForm.error(e);
            }
        });

        // TLDR Ticket ID: http://www.jotform.com/answers/1389173
        // First of all, I'm ashamed of this particular fix. Sadly, that's how we roll in conditions
        // What we were doing was that, for 'any', if we match a case that brakes condition 'any' turns into false and loop breaks
        // This should only work for 'all' however it was already including 'any' option
        // That was resulted in above ticket. This bug was not only for ImageChoice but for both MultipleChoice and Radio fields
        // What I am doing is that, I am taking responses for both notEquals and equals from checkCondition
        // anyCalculationForMultiInput object hold info for both terms
        // This object will only be filled in 'equals' and 'notEquals' cases, it will not interfere with other input and condition types
        //
        // If condition is not for 'any' or 'any' is false, there is no need to look for terms
        if(condition.link.toLowerCase() == 'any' && any) {
            // Check if there are other conditions except notEquals or equals
            // If there are, do not alter 'any'
            if(condition.terms.length == anyCalculationForMultiInput.notEqualsCount + anyCalculationForMultiInput.equalsCount) {
                // Find matching cases for equals and notEquals
                anyLengthNotEquals = anyCalculationForMultiInput.notEquals.reduce(function(prev, curr) {
                    if(!curr) prev++;
                    return prev;
                }, 0);
                anyLengthEquals = anyCalculationForMultiInput.equals.reduce(function(prev, curr) {
                    if(curr) prev++;
                    return prev;
                }, 0);
                // If there is equals term and none of them passed condition
                // If there is notEquals term and and all of them passed condition
                if((anyCalculationForMultiInput.equalsCount && !anyLengthEquals) ||
                    (anyCalculationForMultiInput.notEqualsCount && anyLengthNotEquals && anyLengthNotEquals === anyCalculationForMultiInput.notEqualsCount)) {
                    any = false;
                }
            }
        }

        var conditionInfiniteLoop = function () {
            // prevent calculation&condition infinite loop by limiting the nuber of times
            // a calculation can be run on an element in a 500ms period
            var timestamp = new Date().getTime();
            var msPart = timestamp % 1000;
            if (msPart < 500) {
                msPart = "0";
            } else {
                msPart = "1";
            }
            var secPart = parseInt(timestamp / 1000);
            var antiLoopKey = condition.id + '-' + secPart + '-' + msPart;
            var conditionBasedMaxLoop = (Array.isArray(JotForm.conditions) && (19 * ((JotForm.conditions.length / 100) + 1))) || 19;
            var limitedMaxLoop = conditionBasedMaxLoop > 100 ? 100 : conditionBasedMaxLoop;
            var maxLoopSize = JotForm.clearFieldOnHide == "enable" ? 3 : limitedMaxLoop;

            window.lastConditionTimeStamp = window.lastConditionTimeStamp || new Date().getTime();
            var betweenLookUp = (timestamp - window.lastConditionTimeStamp) / 1000;
            if (betweenLookUp > 10) {
                window.__antiConditionLoopCache = {};
                window.lastConditionTimeStamp = null;
            }
            //create global antiLoop variable if not created yet
              if (!("__antiConditionLoopCache" in window)) {
                  window.__antiConditionLoopCache = {};
              }
            if (antiLoopKey in window.__antiConditionLoopCache) {
                window.__antiConditionLoopCache[antiLoopKey]++;
                if (window.__antiConditionLoopCache[antiLoopKey] > maxLoopSize) {
                    return true; //only allow same calc to trigger nine times in half a secondmultiple are needed for things like sliders that change quickly
                }
            } else {
                window.__antiConditionLoopCache[antiLoopKey] = 1;
            }

            return false;
        }

        if(conditionInfiniteLoop()) return;


        if (condition.type == 'field') { // Field Condition
            // JotForm.log("any: %s, all: %s, link: %s", any, all, condition.link.toLowerCase());
            var isConditionValid = (condition.link.toLowerCase() == 'any' && any) || (condition.link.toLowerCase() == 'all' && all);
            if (condition.disabled == true) return;

            condition.action.each(function (action) {
                var matchingTermAction = condition.terms.any(function (term) {
                    return term.field == action.field;
                });

                if (isConditionValid) {
                    action.currentlyTrue = true;
                    if (action.visibility.toLowerCase() == 'show') {
                        JotForm.showField(action.field);
                    } else if (action.visibility.toLowerCase() == 'hide') {
                        JotForm.hideField(action.field, false, matchingTermAction);
                    } else if (action.visibility.toLowerCase() == 'showmultiple' && action.fields) {
                        if (JotForm.showOrHideMultipleFields) {
                            JotForm.showOrHideMultipleFields(true, action.fields, true);
                        } else {
                            action.fields.each(function (field) {
                                JotForm.showField(field, true);	
                            });
                        }
                    } else if (action.visibility.toLowerCase() == 'hidemultiple' && action.fields) {
                        if (JotForm.showOrHideMultipleFields) {
                            JotForm.showOrHideMultipleFields(false, action.fields, true, matchingTermAction);
                        } else {
                            action.fields.each(function (field) {
                                JotForm.hideField(field, true, matchingTermAction);
                            });
                        }
                    }
                } else {
                    action.currentlyTrue = false;
                    if (action.visibility.toLowerCase() == 'show') {
                        JotForm.hideField(action.field, false, matchingTermAction);
                    } else if (action.visibility.toLowerCase() == 'hide') {
                        JotForm.showField(action.field, false);
                    } else if (action.visibility.toLowerCase() == 'showmultiple' && action.fields) {
                        if (JotForm.showOrHideMultipleFields) {
                            JotForm.showOrHideMultipleFields(false, action.fields, true, matchingTermAction);
                        } else {
                            action.fields.each(function (field) {
                                JotForm.hideField(field, true, matchingTermAction);
                            });
                        }
                    } else if (action.visibility.toLowerCase() == 'hidemultiple' && action.fields) {
                        if (JotForm.showOrHideMultipleFields) {
                            JotForm.showOrHideMultipleFields(true, action.fields, true);
                        } else {
                            action.fields.each(function (field) {
                                JotForm.showField(field, true);
                            });
                        }
                    }
                }

                if (window.FORM_MODE !== 'cardform') JotForm.iframeHeightCaller();

                if ($('section_' + action.field) || ('fields' in action)) {
                    JotForm.runAllCalculations(true);
                }
                if ($('input_' + action.field) && $('input_' + action.field).triggerEvent) {
                    if (!matchingTermAction && $('input_' + action.field).className.indexOf("-other-") < 0) {
                        $('input_' + action.field).triggerEvent('keyup'); //trigger calculations when hiding/showing
                    }
                }

            });
        } else if (condition.type == 'require') {
            var isConditionValid = (condition.link.toLowerCase() == 'any' && any) || (condition.link.toLowerCase() == 'all' && all);
            condition.action.each(function (action) {
                action.currentlyTrue = isConditionValid;

                if (action.visibility.toLowerCase() == 'require') {
                    var additionalRequireType = JotForm.getAdditionalRequiredValidationArray(action, false);
                    JotForm.requireField(action.field, isConditionValid, additionalRequireType);
                } else if (action.visibility.toLowerCase() == 'unrequire') {
                    JotForm.requireField(action.field, !isConditionValid);
                } else if (action.visibility.toLowerCase() == 'requiremultiple' && action.fields) {
                    action.fields.each(function (field) {
                        var additionalRequireType = JotForm.getAdditionalRequiredValidationArray(action, field);
                        JotForm.requireField(field, isConditionValid, additionalRequireType);
                    });
                } else if (action.visibility.toLowerCase() == 'unrequiremultiple' && action.fields) {
                    action.fields.each(function (field) {
                        JotForm.requireField(field, !isConditionValid);
                    });
                } else if(action.visibility.toLowerCase() == 'enable') {
                    JotForm.enableDisableField(action.field, isConditionValid);
                } else if(action.visibility.toLowerCase() == 'disable') {
                    JotForm.enableDisableField(action.field, !isConditionValid);
                } else if(action.visibility.toLowerCase() == 'disablesubmit') {
                    JotForm.disableSubmitForCard(action, isConditionValid);
                }
            });
        } else if (condition.type == 'mask') {
          try {
            condition.action.each(function (action) {
                if ((condition.link.toLowerCase() == 'any' && any) || (condition.link.toLowerCase() == 'all' && all)) {
                    condition.conditionTrue = true;
                    JotForm.setQuestionMasking("#input_" + action.field, "textMasking", action.mask);
                    if ($("input_" + action.field))
                    {
                        $("input_" + action.field).writeAttribute('data-masked', "true");
                        !$("input_" + action.field).hasClassName('validate[Fill Mask]') && $("input_" + action.field).addClassName('validate[Fill Mask]');
                        $("input_" + action.field).writeAttribute('masked', "true");
                        JotForm.setFieldValidation($("input_" + action.field));
                    }
                } else {
                    condition.conditionTrue = false;
                    //if no other mask conditions for this field are true remove the mask
                    var removeMask = true;
                    $A(JotForm.conditions).each(function (cond) {
                        if (cond.disabled == true) return; //go to next condition
                        if (cond.type !== 'mask') return;
                        if (!cond.conditionTrue) return;
                        $A(cond.action).each(function (act) {
                            if (act.field == action.field) {
                                removeMask = false; //there is a different true mask cond on this field so do not remove mask
                            }
                        });
                    });

                    if (removeMask) {
                        JotForm.setQuestionMasking("#input_" + action.field, "", "", true);
                        if ($("input_" + action.field))
                        {
                            $("input_" + action.field).writeAttribute('masked', "false");
                        }
                    }
                }
            });
          } catch (error) {
            console.log(error);
          }
        } else if (condition.type == 'calculation') {
          var tempResultField = condition.action[0].resultField;

          var tempInput = $("id_" + tempResultField );

          if (tempResultField.indexOf('|') > -1) {
              var slicedQid = tempResultField.split('|');
              var qid = slicedQid[0];
              var fieldId = slicedQid[1];
              if ($("id_" + qid) && $("id_" + qid).getAttribute('data-type') === 'control_inline') {
                tempInput = $$("#id_" + qid + ' input[id*=' + fieldId + ']');
              } else {
                tempResultField = 'input_' + qid + '_field_' + fieldId;
                tempInput = $(tempResultField );
              }
            }

            if (!tempInput) {
                return;
            }

            var calcs = JotForm.calculations;
            var cond = null;
            for (var i = 0; i < calcs.length; i++) {
                if (calcs[i].conditionId === condition.id) {
                    calc = calcs[i];
                }
            }
            if ((condition.link.toLowerCase() == 'any' && any) || (condition.link.toLowerCase() == 'all' && all)) {
                calc.conditionTrue = true;
                if(JotForm.ignoreInsertionCondition) return;
                JotForm.checkCalculation(calc, sourceField, sourceEvent);
            } else {
                calc.conditionTrue = false;

                if (calc.resultFieldProp === 'startdate') {
                    JotForm.appointments[calc.resultField].forceStartDate();
                }

                if (calc.resultFieldProp === 'enddate') {
                    JotForm.appointments[calc.resultField].forceEndDate();
                }

                if(JotForm.ignoreInsertionCondition) return;

                //check if any other conditions are true for this result field
                setTimeout(function (calc) {
                    var matchForThisResult = {};
                    var subfield;
                    for (var i = 0; i < calcs.length; i++) {
                        if ((condition.action[0].resultField == calcs[i].resultField && calcs[i].hasOwnProperty('conditionTrue') && calcs[i].conditionTrue)
                            && !(JotForm.getInputType(condition.action[0].resultField) === "html" && condition.action[0].replaceText !== calcs[i].replaceText)) {
                            subfield = calcs[i].resultSubField || "";
                            matchForThisResult[calcs[i].resultField+subfield] = true;
                        }
                    }

                    subfield = "resultSubField" in condition.action[0] ? condition.action[0].resultSubField : "";
                    if (!matchForThisResult[condition.action[0].resultField+subfield]) {
                        try {
                            var dontTrigger = condition.terms.map(function (term) {
                                return term.field === condition.action[0].resultField;
                            }).any();
                            if(!dontTrigger) {
                                dontTrigger = condition.action[0].operands && condition.action[0].operands.split(',').include(condition.action[0].resultField);
                            }

                            var toBeClearField = condition.action[0].resultField;
                            if (!JotForm.isEditMode() && !document.getElementById('draftID')) {
                                JotForm.clearField(toBeClearField, subfield, dontTrigger);
                            }

                            // when clearing a field from condition calculation, remove them from __antiLoopCache as well
                            // so recalculation will be triggered on the result field once again
                            if (typeof window.__antiLoopCache === "object" && toBeClearField in window.__antiLoopCache) {
                              delete window.__antiLoopCache[toBeClearField];
                            }
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }, 50, calc);
            }
        } else if (condition.type == 'url') {
            return (condition.link.toLowerCase() == 'any' && any) || (condition.link.toLowerCase() == 'all' && all);
        } else { // Page condition
            
            var isConditionValid = (condition.link.toLowerCase() == 'any' && any) || (condition.link.toLowerCase() == 'all' && all);
            if($A(condition.action).length > 0 && condition.action.first().skipHide === 'hidePage') {
                var action = condition.action.first();

                if (window.FORM_MODE == 'cardform') {
                  if ((condition.link.toLowerCase() == 'any' && any) || (condition.link.toLowerCase() == 'all' && all)) {
                    JotForm.hideField(action.skipTo);
                  } else {
                    JotForm.showField(action.skipTo);
                  }
                } else {
                    if ((condition.link.toLowerCase() == 'any' && any) || (condition.link.toLowerCase() == 'all' && all)) {
                        JotForm.hidePages[parseInt(action.skipTo.replace('page-', ''), 10)] = true;
                    } else {
                        JotForm.hidePages[parseInt(action.skipTo.replace('page-', ''), 10)] = false;
                    }
                }
                return;
            }

            var action = condition.action[0];
            var sections;

            if (window.FORM_MODE == 'cardform'){
                sections = $$('.form-all > .form-line');

                var currentQuestionIndex;
                var nextQuestionIndex;

                try {
                    var allQuestions = window.CardLayout.layoutParams.allQuestions;
                    var currentSection = sections.find(function(section) { return section.firstChild && section.firstChild.classList.contains('isVisible');});
                    allQuestions.some(function(q, index) {
                        if (q.id === currentSection.id.substring(currentSection.id.indexOf('_') + 1)) {
                            currentQuestionIndex = index;
                            return true;
                        }
                    });
                    if (action.skipTo == 'end') {
                        nextQuestionIndex = allQuestions.length - 1;
                    } else {
                        allQuestions.some(function(q, index) {
                            if (q.id === action.skipTo || q.id === action.skipTo.replace('page-', '')) {
                                nextQuestionIndex = index;
                                return true;
                            };
                        });
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                sections = $$('.form-all > .page-section');
            }


            if (window.FORM_MODE == 'cardform' && !isConditionValid) {
                for(var i = nextQuestionIndex; i < allQuestions.length; i++) {
                    if(allQuestions[nextQuestionIndex] && allQuestions[nextQuestionIndex].type === 'control_head') {
                        nextQuestionIndex++;
                    }
                }
           
                if (currentQuestionIndex < nextQuestionIndex) {
                    for (var i = currentQuestionIndex + 1; i < nextQuestionIndex; i++) {
                        var card = JotForm.getFieldFromID(allQuestions[i].id);
                        if (card && !card.hasClassName('always-hidden') && card.getAttribute('data-skipped-by') !== allQuestions[currentQuestionIndex].id) {
                            JotForm.showField(allQuestions[i].id);
                        }
                    }
                }
            }

            if (JotForm.nextPage) {
                return;
            }

            if (isConditionValid) {        
                if (window.FORM_MODE == 'cardform') {
                  if (action.skipTo == 'end') {
                    JotForm.nextPage = sections[sections.length - 1];
                  } else {
                    try {
                      JotForm.headerInBetween = false;
                      for(var i = nextQuestionIndex; i < allQuestions.length; i++) {
                          if(allQuestions[nextQuestionIndex] && allQuestions[nextQuestionIndex].type === 'control_head') {
                              JotForm.headerInBetween = true;
                              nextQuestionIndex++;
                          }
                      }
                      var skipTo = allQuestions[nextQuestionIndex].id;


                      var next = sections.find(function(section) { return section.id === 'id_' + skipTo;});
                      if (next) {
                        JotForm.nextPage = sections.find(function(section) { return section.id === 'id_' + skipTo;});
                        JotForm.prevPage = currentSection;
                        if (currentQuestionIndex < nextQuestionIndex) {
                            for (var i = currentQuestionIndex + 1; i < nextQuestionIndex; i++) {
                                var card = JotForm.getFieldFromID(allQuestions[i].id);
                                if (card && !card.hasClassName('always-hidden')) {
                                    JotForm.hideField(allQuestions[i].id);
                                    card.setAttribute('data-skipped-by', allQuestions[currentQuestionIndex].id); 
                                }
                            }
                        } else {
                            for (var i = currentQuestionIndex - 1; i >= nextQuestionIndex; i--) {
                                var card = JotForm.getFieldFromID(allQuestions[i].id);
                                if (card && !card.hasClassName('always-hidden')) {
                                    JotForm.showField(allQuestions[i].id);
                                }
                            }
                        }
                      }
                    } catch (error) {
                      console.log(error);
                    }
                  }
                } else {
                  if (action.skipTo == 'end') {
                      JotForm.nextPage = sections[sections.length - 1];
                  } else {
                      JotForm.nextPage = sections[parseInt(action.skipTo.replace('page-', ''), 10) - 1];
                  }
                }

                if ($$('[data-type="control_paypalSPB"]')[0] && $$('[data-paypal-button="Yes"]')[0]) {
                    var paypalSection = JotForm.getSection($$('[data-type="control_paypalSPB"]')[0]).pagesIndex;
                    var currentSection = JotForm.currentSection.pagesIndex;
                    var nextSection = JotForm.nextPage.pagesIndex;

                    if (
                        (paypalSection > currentSection && paypalSection < nextSection)
                        || (paypalSection < currentSection && paypalSection > nextSection)
                    ) {
                        var paypalButton = $$('.paypal-buttons.paypal-buttons-context-iframe')[0];
                        var paypalButtonContainer = JotForm.getContainer(paypalButton);

                        if (paypalButton && paypalButtonContainer) {
                            paypalButtonContainer.setAttribute('paypal-button-status', 'hide');
                        }
                    }
                }

            } else {

                JotForm.info('Fail: Skip To: page-' + JotForm.currentPage + 1);

                JotForm.nextPage = false;
            }
        }
        if (JotForm.nextPage && JotForm.isEditMode()) {
            // because on edit mode, fields are populated, some conditions may already be satisfied
          if(window.FORM_MODE !== 'cardform'){
            var currentPageIndex = $$('.page-section').indexOf(JotForm.currentSection);
            var skipCondition = function() {
                if (condition.link.toLowerCase() == 'any') {
                    // skip if all fields are ahead
                    return condition.terms.every(function(term) {
                        return $$('.page-section').indexOf($('id_' + term.field).up('.page-section')) > currentPageIndex;
                    });
                }
                // skip if any  of the fields are ahead
                return condition.terms.some(function(term) {
                    return $$('.page-section').indexOf($('id_' + term.field).up('.page-section')) > currentPageIndex;
                });
            }
            // ignore this skip-to-page condition at this moment
            JotForm.nextPage = skipCondition() ? false : JotForm.nextPage;
          }
        }
        JotForm.enableDisableButtonsInMultiForms();
    },
    currentPage: false,
    nextPage: false,
    previousPage: false,
    fieldConditions: {},

    setFieldConditions: function (field, event, condition) {
        var tempField = '';
        if (field.indexOf('|') > -1) {
          var fieldSplit = field.split( '|' );
          tempField = fieldSplit[0] + '_field_' + fieldSplit[1];
        } else {
          tempField = field;
        }

        if (!JotForm.fieldConditions[tempField]) {
            JotForm.fieldConditions[tempField] = {
                event: event,
                conditions: []
            };
        }
        JotForm.fieldConditions[tempField].conditions.push(condition);
        this.setSubproductQuantityConditions(tempField, condition); // b#5022272
    },

    setSubproductQuantityConditions: function (tempField, condition) {
        if (tempField.match(/input_[0-9]+_quantity_[0-9]+_[0-9]+/)) {
            var qid = tempField.split('_')[1], pid = tempField.split('_')[3];
            var pItem = document.querySelector('.form-product-item[pid="' + pid + '"], .form-product-item[data-pid="' + pid + '"]');
            var subQuantities = pItem.querySelectorAll(
                '#input_' + qid + '_' + pid + '_subproducts.form-product-child-table .form-subproduct-quantity'
            );

            if (subQuantities.length === 0) { return; }

            Array.from(subQuantities).forEach(function(quantityInput) {
                var _condition = JSON.parse(JSON.stringify(condition));
                _condition.terms[0].field = quantityInput.id.replace('input_', '');
                var c = {
                    conditions: [],
                    event: 'change'
                };
                c.conditions.push(_condition);

                JotForm.fieldConditions[quantityInput.id] = c;
            });
        }
    },

    widgetsAsCalculationOperands: [],

    /*
     * Require or Unrequire a field
     */
    requireField: function (qid, req, additionalRequireType) {
        var subfieldID = null;
        if (qid.indexOf('|') > -1) {
            var subfieldID = qid.split('|')[1];
            qid = qid.split('|')[0];
        }
        if (!$('id_' + qid)) return;
        if (JotForm.otherConditionTrue(qid, req ? 'unrequire' : 'require')) return;

        var elements = [];
        if (subfieldID) {
            elements = $$('#id_' + qid + ' input[id*=' + subfieldID + '], #id_' + qid + ' textarea[id*=' + subfieldID + '], #id_' + qid + ' select[id*=' + subfieldID + ']')
        } else {
            elements = $$('#id_' + qid + ' input, #id_' + qid + ' textarea, #id_' + qid + ' select');
        }
        elements.each(function (el) {

            //do not required non-necessary parts of combined field
            if (el.id === 'coupon-input'
                || (el.type === 'hidden' && !el.up('.form-star-rating') && !el.hasClassName('form-widget') && !el.up('.FITB-inptCont[data-type="signaturebox"]'))
                || el.hasClassName('form-checkbox-other-input') || el.hasClassName('form-radio-other-input')
                || el.hasClassName('jfModal-input')
                || $A(['prefix', 'middle', 'suffix', 'addr_line2']).any(function (name) {
                    return el.name.indexOf("[" + name + "]") > -1;
                })
                || el.hasClassName('jfDropdown-search')
                || el.hasClassName('jfRating-shortcut-input')
                || el.hasClassName('__PrivateStripeElement-input')
                || el.up('.product-container-wrapper .filter-container #payment-category-dropdown') // product category
                || (el.up('.product-container-wrapper .filter-container') && el.id === 'productSearch-input')) { // product search
                return;
            }

            //get all validations
            var validations = [];
            if (el.className.indexOf('validate[') > -1) {
                validations = el.className.substr(el.className.indexOf('validate[') + 9);
                validations = validations.substr(0, validations.indexOf(']')).split(/\s*,\s*/);
            } else {
                validations = [];
            }

            if (JotForm.getInputType(qid) == "file" && el.getAttribute("multiple") == "multiple" && el.up('[class*=validate[multipleUpload]]')) {
                var uploadWrapper = el.up('[class*=validate[multipleUpload]]');
                uploadWrapper.className = uploadWrapper.className.replace(/validate\[required\]/gi, '');
                if (req) {
                    uploadWrapper.addClassName("validate[required]");
                } else {
                    uploadWrapper.removeClassName("form-validation-error");
                }
            }

            if (JotForm.getInputType(qid) == "appointment" && $("input_" + qid + "_date")) {
                if (req) {
                    $("input_" + qid + "_date").addClassName("validate");
                } else {
                    $("input_" + qid + "_date").removeClassName("validate");
                }
            }

            //remove all validation from class
            el.className = el.className.replace(/validate\[.*\]/, '');
            //remove required from validations array
            for (var i = validations.length - 1; i >= 0; i--) {
                if (validations[i] === 'required' || additionalRequireType && additionalRequireType.some(function(t) { return t === validations[i]; })) {
                    validations.splice(i, 1);
                }
            }

            if (req) {
                validations.push('required'); //add required to validations
                additionalRequireType && additionalRequireType.forEach(function(t) { validations.push(t) });
                if (el.hasClassName('form-widget')) {
                    el.addClassName('widget-required');
                }
            } else {
                el.removeClassName('form-validation-error');
                el.removeClassName('widget-required');
            }

            //add validations back to class
            if (validations.length > 0) {
                el.addClassName('validate[' + validations.join(',') + ']');
            }
            JotForm.setFieldValidation(el);
        });

        // signature
        var sigPad = $$('div.pad#sig_pad_' + qid)[0];
        if (sigPad) {
            sigPad.setAttribute('data-required', req);
            sigPad.className = sigPad.className.replace('validate[required]', '').trim()
            if (req) {
                sigPad.className = sigPad.className + ' validate[required]';
            }
        }

        if (req) {
            if ($('label_' + qid) && !$('label_' + qid).down('.form-required')) {
                $('label_' + qid).insert('<span class="form-required">*</span>');
            }

            // FITB exception
            elements.each(function(e) {
                if (e.up('.FITB-inptCont') && !e.up('.FITB-inptCont').down('.form-required')) {
                    e.up('.FITB-inptCont').insert('<span class="form-required">*</span>');
                }
            });
        } else {
            if ($('label_' + qid) && $('label_' + qid).down('.form-required')) {
                $('label_' + qid).down('.form-required').remove();
            }

            // FITB exception
            elements.each(function(e) {
                if (e.up('.FITB-inptCont') && e.up('.FITB-inptCont').down('.form-required')) {
                    e.up('.FITB-inptCont').down('.form-required').remove();
                }
            });

            //remove any existing errors
            if ($("id_" + qid).down('.form-error-message')) {
                $("id_" + qid).down('.form-error-message').remove();
            }
            $("id_" + qid).removeClassName('form-line-error');

            if ($$('.form-line-error').length == 0) {
                JotForm.hideButtonMessage();
            }
        }
    },

    enableDisableField: function(qid, enable) {
        var subfieldID = null;
        if (qid.indexOf('|') > -1) {
            var subfieldID = qid.split('|')[1];
            qid = qid.split('|')[0];
        }
        if (!$('id_' + qid)) return;

        try {
            var isSignatureField = $('id_' + qid).getAttribute('data-type') === "control_signature";
            var isAppointmentField = $('id_' + qid).getAttribute('data-type') === "control_appointment";
            var appointmentElements = isAppointmentField ? Array.from($('id_' + qid).querySelectorAll(".calendarDay:not(.isUnavailable):not(.empty), .calendarDay.conditionallyDisabled, .appointmentSlot:not(.disabled), .appointmentSlot.conditionallyDisabled")) : [];
            var notDisabledWidgets = [ "configurableList" ]; // widgets that cannot be disabled
            var isNDWidget = $('id_' + qid).readAttribute('data-type') === 'control_widget' && JotForm.getWidgetType(qid) && notDisabledWidgets.indexOf(JotForm.getWidgetType(qid)) !== -1;
            var notDisabledWidget = isNDWidget ? $('id_' + qid).down("iframe") : false;

            var elements = [];
            if (subfieldID) {
                elements = $('id_' + qid).select("input[id*=" + subfieldID + "], select[id*=" + subfieldID + "]");
            } else {
                elements = $('id_' + qid).select("input, textarea, select, button").concat(appointmentElements);
            }

            elements.each(function(input) {
                var isAppointmentSlot = isAppointmentField && input.hasClassName("appointmentSlot");
                var isAppointmentCalendarDay = isAppointmentField && input.hasClassName("calendarDay");
                var isActiveSlot = isAppointmentSlot && input.hasClassName('active');
                var isDataRichText = input.hasAttribute('data-richtext') && input.getAttribute('data-richtext') == "Yes";
                var signaturePad = isSignatureField ? jQuery('#sig_pad_' + qid + '.pad') : null;
                var isMatrixButtonForMobileView = input.hasClassName("js-mobileMatrixPrevButton") || input.hasClassName("js-mobileMatrixNextButton");

                /** SHORT CIRCUIT **/
                if(isMatrixButtonForMobileView) {
                    return;
                }

                /** ENABLE **/
                if (enable) {
                    input.removeClassName("conditionallyDisabled");
                    if (signaturePad && signaturePad.jSignature) {
                        signaturePad.jSignature('enable');
                    }
                    if (notDisabledWidget) {
                        notDisabledWidget.setStyle({ 'pointer-events': '' });
                    }
                    if (!JotForm.isEditMode()) {
                        input.enable();
                        // needs to call parent div of star rating input to enable
                        if (input.classList.contains('form-star-rating-star')) {
                            input.parentNode.enable();
                        }
                        if (isActiveSlot) {
                            input.setStyle({'pointer-events': 'all'});
                        } else if (isDataRichText) {
                            var richTextArea = input.parentElement.querySelector(".nicEdit-main");
                            if (richTextArea) { richTextArea.setAttribute("contenteditable", "true") };
                        } else {
                            input.removeClassName(isAppointmentSlot ? "disabled" : (isAppointmentCalendarDay ? "isUnavailable" : ""));
                        }
                        return;
                    }
                    // edit mode
                    switch (input.tagName) {
                        case 'SELECT':
                            $$('#' + input.id + ' > option').each(function (opt) {
                                opt.enable();
                            });
                            break;
                        case 'TEXTAREA':
                            if(isDataRichText) { 
                                var richTextArea = input.parentElement.querySelector(".nicEdit-main");
                                if (richTextArea) { richTextArea.setAttribute("contenteditable", "true") };
                            }
                        default:
                            input.removeAttribute('readonly');
                            input.enable();
                            break;
                    }
                    return;
                }
                /** DISABLE **/
                if (!(input.hasClassName('form-radio-other-input') || input.hasClassName('form-checkbox-other-input'))) {
                    input.addClassName("conditionallyDisabled");
                }
                if (signaturePad && signaturePad.jSignature) {
                    signaturePad.jSignature('disable');
                }
                if (notDisabledWidget) {
                    notDisabledWidget.setStyle({ 'pointer-events': 'none' });
                }
                if (!JotForm.isEditMode()) {
                    input.disable();
                    // needs to call parent div of star rating input to disable
                    if (input.classList.contains('form-star-rating-star')) {
                        input.parentNode.disable();
                    }
                    
                    if (isActiveSlot) {
                        input.setStyle({'pointer-events': 'none'});
                    } else if (isDataRichText) {
                        var richTextArea = input.parentElement.querySelector(".nicEdit-main");
                        if (richTextArea) { richTextArea.setAttribute("contenteditable", "false") };
                    } else {
                        input.addClassName(isAppointmentSlot ? "disabled" : (isAppointmentCalendarDay ? "isUnavailable" : ""));
                    }
                    return;
                }
                // edit mode
                switch (input.tagName) {
                    case 'SELECT':
                        $$('#' + input.id + ' > option').each(function (opt) {
                            opt.disabled = !opt.selected;
                        });
                        break;
                    case 'INPUT':
                        if (['checkbox', 'radio'].include(input.type) || input.type === 'file'
                            || (['year_' + qid, 'month_' + qid, 'day_' + qid, 'lite_mode_' + qid ]).include(input.id) || (input.getAttribute('data-type') === 'input-spinner'))
                        {
                            input.disable();
                        }
                    case 'TEXTAREA':
                        if(isDataRichText) { 
                            var richTextArea = input.parentElement.querySelector(".nicEdit-main");
                            if (richTextArea) { richTextArea.setAttribute("contenteditable", "false") };
                        }
                    default:
                        input.setAttribute('readonly', '');
                        break;
                }
            });
        } catch(e) {console.log(e);}
    },

    /**
     * When widget value is updated check whether to trigger calculation
     */
    triggerWidgetCalculation: function (id) {
        if (JotForm.widgetsAsCalculationOperands.include(id)) {
            if (document.createEvent) {
                var evt = document.createEvent('HTMLEvents');
                evt.initEvent('change', true, true);
                $('input_' + id).dispatchEvent(evt);
            } else if ($('input_' + id).fireEvent) {
                return $('input_' + id).fireEvent('onchange');
            }
        }
    },


    setCalculationResultReadOnly: function () {
        $A(JotForm.calculations).each(function (calc, index) {
            if ((calc.readOnly && calc.readOnly != "0") && $('input_' + calc.resultField) != null) {
                $('input_' + calc.resultField).setAttribute('readOnly', 'true');
            }
        });
    },

    setCalculationEvents: function () {
        var setCalculationListener = function (el, ev, calc) {
            $(el).observe(ev, function () {
                if (ev === "paste") { //same action as other events but wait for the text to be pasted
                    setTimeout(function () {
                        el.addClassName('calculatedOperand');
                        JotForm.checkCalculation(calc, el, ev);
                    }, 10);
                } else {
                    el.addClassName('calculatedOperand');
                    JotForm.checkCalculation(calc, el, ev);
                }
            });
        };

        $A(JotForm.calculations).each(function (calc, index) {
            if (!calc.operands || typeof calc.operands === 'function') return;
            var ops = calc.operands.split(',');
            for (var i = 0; i < ops.length; i++) {

                var opField = ops[i];
                var mixedOpField = '';
                if(opField.indexOf('|') > -1) {
                    var splitResult = opField.split('|');
                    var qid = splitResult[0];
                    var fieldId =  splitResult[1];
                    if ($('id_' + qid) && $('id_' + qid).getAttribute('data-type') === 'control_inline') {
                        mixedOpField = 'id_' + qid;
                    } else {
                        mixedOpField = 'input_' + qid + '_field_' + fieldId;
                    }
                }

                if (!opField || opField.empty() || (!$('id_' + opField) && !$(mixedOpField))) continue;

                var type = JotForm.calculationType(opField), ev;

                switch (type) {
                    case "mixed":
                        if ($(mixedOpField)) {
                            setCalculationListener($(mixedOpField), 'change', calc, index);
                            setCalculationListener($(mixedOpField), 'blur', calc, index);
                            setCalculationListener($(mixedOpField), 'keyup', calc, index);
                            setCalculationListener($(mixedOpField), 'paste', calc, index);
                        }
                        break;

                    case 'inline':
                        var el = $(mixedOpField) ? $(mixedOpField) : $('id_' + opField);
                        setCalculationListener(el, 'change', calc, index);
                        break;

                    case "widget":
                        setCalculationListener($('id_' + opField), 'change', calc);
                        JotForm.widgetsAsCalculationOperands.push(opField);
                        break;

                    case 'radio':
                    case 'checkbox':
                        setCalculationListener($('id_' + opField), 'change', calc);
                        if ($('input_' + opField)) {
                            setCalculationListener($('id_' + opField), 'keyup', calc);
                        }
                        break;

                    case 'select':
                    case 'file':
                        if (Protoplus && Protoplus.getIEVersion && Protoplus.getIEVersion() == 8) {
                            setCalculationListener($('id_' + opField), 'click', calc);
                        } else {
                            setCalculationListener($('id_' + opField), 'change', calc);
                        }
                        break;

                    case 'datetime':
                        setCalculationListener($('id_' + opField), 'date:changed', calc);
                        setCalculationListener($('id_' + opField), 'paste', calc);
                        setCalculationListener($('id_' + opField), 'keyup', calc);
                        $$('#id_' + opField + ' input').each(function (el) {
                          setCalculationListener($(el), 'blur', calc);
                        });
                        $$("#id_" + opField + ' select').each(function (el) {
                            setCalculationListener($(el), 'change', calc);
                        });
                        break;

                    case 'time':
                        $$("#id_" + opField + ' select').each(function (el) {
                            setCalculationListener($(el), 'change', calc, index);
                        });
                        if (JotForm.newDefaultTheme || JotForm.extendsNewTheme) {
                            $$("#id_" + opField + " input[class*='form-textbox']").each(function (el) {
                                setCalculationListener($(el), 'keyup', calc, index);
                                setCalculationListener($(el), 'blur', calc, index);
                            });
                        }
                        break;
                    case 'birthdate':
                        $$("#id_" + opField + ' select').each(function (el) {
                            setCalculationListener($(el), 'change', calc, index);
                        });
                        break;

                    case 'address':
                        setCalculationListener($('id_' + opField), 'change', calc, index);
                        setCalculationListener($('id_' + opField), 'blur', calc, index);
                        setCalculationListener($('id_' + opField), 'keyup', calc, index);
                        $$("#id_" + opField + ' select').each(function (el) {
                            setCalculationListener($(el), 'change', calc, index);
                        });
                        break;

                    case 'number':
                        setCalculationListener($('id_' + opField), 'keyup', calc, index);
                        setCalculationListener($('id_' + opField), 'paste', calc, index);
                        setCalculationListener($('id_' + opField), 'click', calc, index);
                        break;

                    default:
                        setCalculationListener($('id_' + opField), 'change', calc, index);
                        setCalculationListener($('id_' + opField), 'blur', calc, index);
                        setCalculationListener($('id_' + opField), 'keyup', calc, index);
                        setCalculationListener($('id_' + opField), 'paste', calc, index);
                        if(window.FORM_MODE === 'cardform' && $('id_' + opField).querySelector(".jfQuestion-fullscreen") && !$('id_' + opField).querySelector(".jfQuestion-fullscreen").hasClassName("isHidden")) {
                           setCalculationListener($('id_' + opField), 'click', calc, index);
                        }
                        break;
                }
            }
        });
    },

    runAllCalculations: function (ignoreEditable, htmlOnly) {
        $A(JotForm.calculations).each(function (calc, index) {
            if(htmlOnly && JotForm.getInputType(calc.resultField) !== "html") return;
            if (!(ignoreEditable && (!calc.readOnly || calc.readOnly == "0")) && !!calc.equation) {
                JotForm.checkCalculation(calc);
            }
        });
    },

    calculationType: function (id) {
        var paymentTypes = [
         'control_stripe',
         'control_stripeCheckout',
         'control_stripeACH',
         'control_stripeACHManual',
         'control_payment',
         'control_paymentwall',
         'control_paypal',
         'control_paypalexpress',
         'control_paypalpro',
         'control_paypalcomplete',
         'control_clickbank',
         'control_2co',
         'control_googleco',
         'control_worldpay',
         'control_onebip',
         'control_authnet',
         'control_dwolla',
         'control_braintree',
         'control_square',
         'control_boxpayment',
         'control_eway',
         'control_bluepay',
         'control_firstdata',
         'control_paypalInvoicing',
         'control_payjunction',
         'control_chargify',
         'control_cardconnect',
         'control_echeck',
         'control_bluesnap',
         'control_payu',
         'control_pagseguro',
         'control_moneris',
         'control_mollie',
         'control_sofort',
         'control_skrill',
         'control_sensepass',
         'control_paysafe',
         'control_iyzico',
         'control_gocardless',
         'control_paypalSPB',
         'control_cybersource',
         'control_payfast'
        ];
        if ($('id_' + id) && $('id_' + id).readAttribute('data-type') && paymentTypes.include($('id_' + id).readAttribute('data-type'))) {
            return $('id_' + id).readAttribute('data-type').replace("control_", "");
        } else if ($('id_' + id) && $('id_' + id).readAttribute('data-type') == 'control_matrix') {
            return 'matrix';
        } else {
            return JotForm.getInputType(id);
        }
    },

    isTimeObject: function (id) {
        var ndtTimeIDs = ['time', 'hour', 'min', 'ampm'];
        for (var i = 0 ; i < ndtTimeIDs.length ; i++) {
            if (id.indexOf(ndtTimeIDs[i]) >= 0) {
                return true;
            }
        }
        return false;
    },

    checkCalculation: function (calc, sourceField, sourceEvent) {
        if (!calc.resultField || (calc.hasOwnProperty('conditionTrue') && !calc.conditionTrue)) {
            return '';
        }

        var result = calc.resultField;
        // Check for multiline
        var mixedResult = false;
        if(result.indexOf('|') > -1) {
            var splitResult = result.split('|');
            var qid = splitResult[0];
            var fieldId =  splitResult[1];
            if ($('id_' + qid) && $('id_' + qid).getAttribute('data-type') === 'control_inline') {
                mixedResult = 'id_' + qid;
            } else {
                mixedResult = 'input_' + qid + '_field_' + fieldId;
            }
        }
        var showBeforeInput = (calc.showBeforeInput && calc.showBeforeInput != "0") ? calc.showBeforeInput : false;
        var ignoreHidden = (calc.ignoreHiddenFields && calc.ignoreHiddenFields != "0") ? calc.ignoreHiddenFields : false;
        var useCommasForDecimals = (calc.useCommasForDecimals && calc.useCommasForDecimals != "0") ? calc.useCommasForDecimals : false;

        if (!$('id_' + result) && !$(mixedResult)) return;
        try {
            if (![
                'text', 'email', 'textarea', 'calculation', 'combined', 'address', 'datetime', 'time', 'html', 'authnet', 'paypalpro', 'number', 'radio', 'checkbox',
                'select', 'matrix', 'widget', 'signature', 'braintree', 'stripe', 'square', 'eway', 'bluepay', 'firstdata', 'chargify', 'echeck', 'payu', 'pagseguro', 'moneris', 'paypal',
                'dwolla', 'bluesnap', 'paymentwall', 'payment', 'paypalexpress', 'payjunction', '2co', 'cardconnect', 'clickbank', 'onebip', 'worldpay', 'rating', 'hidden',
                'file', 'other', 'mixed', 'sofort', 'sensepass', 'paysafe', 'iyzico', 'gocardless', 'stripeACH', 'paypalSPB', 'cybersource', "paypalcomplete", 'inline', 'appointment',
                'stripeCheckout', 'payfast', 'stripeACHManual', 'sensepass'
                ].include(JotForm.calculationType(result))) return;
        } catch (e) {
            console.log(e);
        }

        var combinedObject = {};

        var getValue = function (data, numeric) {
            var subField = "";
            if (data.indexOf("_") > -1) { //matrix sub field
                subField = data.substring(data.indexOf("_"));
                data = data.substring(0, data.indexOf("_"));
            }

            var hasMixedTypeChar = false;
            if (data.indexOf("|") > -1) {
              hasMixedTypeChar = true;
              // subField = data.substring(data.indexOf("|"));
              // data = data.substring(0, data.indexOf("|"));
            }

            if (hasMixedTypeChar == false) {
              if ($('id_' + data)){
                  if (!$('id_' + data).hasClassName('calculatedOperand') && showBeforeInput) return ''; //no input yet so ignore field
                  if (ignoreHidden && ($('id_' + data).hasClassName("form-field-hidden") || ($('id_' + data).up(".form-section") && $('id_' + data).up(".form-section").hasClassName("form-field-hidden")))) {
                      return numeric ? 0 : '';
                  }
              } else if(!$('input_' + data)){
                    return '';
              }
            }

            var type = JotForm.calculationType(data);
            var val = '';

            switch (type) {
                case 'matrix':
                    if ($("input_" + data + subField)) {
                        var subFieldType = $("input_" + data + subField).type;
                        if (["checkbox", "radio"].indexOf(subFieldType) > -1) {
                            if ($("input_" + data + subField).checked) {
                                var chk = $("input_" + data + subField);
                                if (chk.readAttribute('data-calcvalue')) {
                                    val = chk.readAttribute('data-calcvalue');
                                } else {
                                    val = chk.value;
                                }
                            }
                        } else {
                            val = $("input_" + data + subField).value;
                        }
                    } else if ($("id_" + data).down('.form-radio')) {
                        $$('input[id^="input_'+data+subField+'_"]').each(function (radio) {
                            if (radio.checked) {
                              val = radio.readAttribute('data-calcvalue') ? radio.readAttribute('data-calcvalue') : radio.value;
                            }
                        });
                    }
                    break;

                case 'mixed':
                  var tempFieldId;
                  var slicedQid;
                  var fieldId;

                  if (data.indexOf('|') > -1) {
                    slicedQid = data.split('|');
                    questionId = slicedQid[0];
                    fieldId = slicedQid[1];
                  }

                  var tempInput = $('input_' + questionId + '_field_' + fieldId);

                  if (tempInput && typeof tempInput.value !== 'undefined') {
                    val = tempInput.value;
                  }

                  break;

                case '2co':
                case 'authnet':
                case 'bluepay':
                case 'bluesnap':
                case 'boxpayment':
                case 'braintree':
                case 'cardconnect':
                case 'chargify':
                case 'clickbank':
                case 'cybersource':
                case 'dwolla':
                case 'echeck':
                case 'eway':
                case 'firstdata':
                case 'gocardless':
                case 'googleco':
                case 'mollie':
                case 'moneris':
                case 'onebip':
                case 'pagseguro':
                case 'payjunction':
                case 'payment':
                case 'paysafe':
                case 'iyzico':    
                case 'sensepass':
                case 'paypal':
                case 'paypalexpress':
                case 'paypalSPB':
                case 'paypalpro':
                case 'paypalcomplete':
                case 'payu':
                case 'square':
                case 'sofort':
                case 'stripe':
                case 'stripeCheckout':
                case 'stripeACH':
                case 'stripeACHManual':
                case 'worldpay':
                case 'payfast':
                    if ($("id_" + data).down('#payment_total')) {
                        val = $("id_" + data).down('#payment_total').innerHTML;
                    } else if ($('input_' + data + '_donation')) {
                        val = $('input_' + data + '_donation').value;
                    }
                    if(JotForm.currencyFormat && JotForm.currencyFormat.dSeparator === ",") {
                        val = val.replace(/\./g, "").replace(/\,/g, ".");
                    }
                    break;

                case 'radio':
                    $$("#id_" + data + ' input[type="radio"]').each(function (rad, i) {
                        if (rad.checked) {
                            if (rad.readAttribute('data-calcvalue')) {
                                val = rad.readAttribute('data-calcvalue');
                            } else {
                                var otherOption = JotForm.getOptionOtherInput(rad);
                                if (typeof FormTranslation !== 'undefined' && otherOption && otherOption.innerText) {
                                    val = JotForm.getOptionOtherInput(rad).innerText;
                                } else {
                                    val = rad.value;

                                    if (typeof FormTranslation !== 'undefined') {
                                        val = FormTranslation.translate(val);
                                    }
                                }
                            }
                        }
                    });
                    break;

                case 'checkbox':

                    var valArr = [];
                    $$("#id_" + data + ' input[type="checkbox"]').each(function (chk, i) {
                        if (chk.checked) {
                            if (chk.readAttribute('data-calcvalue')) {
                                valArr.push(chk.readAttribute('data-calcvalue'));
                            } else {
                                if (typeof FormTranslation !== 'undefined') {
                                    valArr.push(FormTranslation.translate(chk.value));
                                } else {
                                    valArr.push(chk.value);
                                }
                            }
                        }
                    });

                    if (numeric) {
                        val = valArr.inject(0, function (accum, thisVal) {
                            return accum + (parseFloat(thisVal.replace(/-?([^0-9])/g, "$1").replace(/[^0-9\.-]/g, "")) || 0);
                        });
                    } else {
                        val = valArr.join();
                    }
                    break;

                case 'select':
                    var optionValue = function(option) {
                        if(JotForm.newDefaultTheme && option.value === '') return '';
                        if(option.textContent) return option.textContent.replace(/^\s+|\s+$/g, '');
                        return option.innerText.replace(/^\s+|\s+$/g, '');
                    };

                    if (numeric) val = 0;

                    var tempInput;
                    if (data.indexOf('|') > -1) {
                        slicedQid = data.split('|');
                        var questionId = slicedQid[0];
                        var fieldId = slicedQid[1];

                        tempInput = $('input_' + questionId + '_field_' + fieldId);
                    } else {
                        tempInput = $('input_' + data);
                    }

                    tempInput.select('option').each(function (option, ind) {
                        var option = tempInput.options[ind];
                        if (option && option.selected) {
                            var current = option.readAttribute('data-calcvalue') ? option.readAttribute('data-calcvalue') : optionValue(option);
                            if(numeric) {
                                if (/\d/.test(current)) {   // is really numeric?
                                    val += (current === "") ? 0 : parseFloat(current.replace(/[^\-0-9.]/g, ""));
                                } else {
                                    val += 0;
                                }
                            } else {
                                val +=  current;
                            }
                        }
                    });
                    break;

                case 'number':
                    if ($$("#id_" + data + ' input[type="number"]').length > 1) { //ranges
                        var valArr = [];
                        $$("#id_" + data + ' input[type="number"]').each(function (el) {
                            valArr.push(el.value);
                        });
                        val = valArr.join(' ');
                    } else {
                        if (!$('input_' + data).value.empty() && !isNaN($('input_' + data).value)) {
                            val = parseFloat($('input_' + data).value);
                        }
                    }
                    break;
                case 'inline':
                    var qid = '';
                    var fieldID = '';
                    if (data.indexOf('|') > -1) {
                        qid = data.split('|')[0];
                        fieldID = data.split('|')[1];
                        var valArr = [];
                        combinedObject = {};
                        var TIMESTAMP_OF_2019 = 1546300000000;
                        var isDate = false;
                        var selector = Number(fieldId) > TIMESTAMP_OF_2019 ? '#id_' + qid + ' input[id*=' + fieldID + '-]' + ', select[id*=' + fieldID + '-]' : '#id_' + qid + ' input[id$=-' + fieldID + ']' + ', select[id$=-' + fieldID + ']'
                        $$(selector).each(function (el) {
                            if (!el.value.empty() && JotForm.isVisible(el) && (!(el.getAttribute('type') === 'checkbox') || el.checked)) {
                                valArr.push(el.value);
                            }
                            var id = el.id.replace(Number(fieldId) > TIMESTAMP_OF_2019 ? /^[^-]*-/ : /-[^-]*$/, '');
                            combinedObject[id] = el.value;
                            // check if calculation is done on a date field
                            if (el && el.parentNode && el.parentNode.getAttribute("data-type") === 'datebox') isDate = true;
                        });
                        val = valArr.join(' ');
                        if (isDate) {
                            var date = new Date(combinedObject['year_' + qid + '-date'], combinedObject['month_' + qid + '-date'] - 1, combinedObject['day_' + qid + '-date']);
                            val = date / 60 / 60 / 24 / 1000;
                        } 
                    } else {
                        qid = data;
                        var valArr = [];
                        combinedObject = {};
                        $$("#id_" + qid + ' input[type="text"]').each(function (el) {
                            if (!el.value.empty() && JotForm.isVisible(el)) {
                                valArr.push(el.value);
                            }
                            var id = el.id;
                            combinedObject[id] = el.value;

                        });
                        $$("#id_" + qid + ' input[type="tel"]').each(function (el) {
                            if (!el.value.empty() && JotForm.isVisible(el)) {
                                valArr.push(el.value);
                            }
                            var id = el.id;
                            combinedObject[id] = el.value;
                        });
                        $$("#id_" + qid + ' input[type="checkbox"]').each(function (chk, i) {
                            if (chk.checked) {
                                if (typeof FormTranslation !== 'undefined') {
                                    valArr.push(FormTranslation.translate(chk.value));
                                } else {
                                    valArr.push(chk.value);
                                }
                            }
                            var id = chk.id;
                            combinedObject[id] = chk.checked ? chk.value : '';
                        });
                        val = valArr.join(' ');
                    }
                    break;
                case 'combined':
                case 'grading':
                    var valArr = [];
                    combinedObject = {};
                    $$("#id_" + data + ' input[type="text"]').each(function (el) {
                        if (!el.value.empty()) {
                            valArr.push(el.value);
                        }
                        var id = el.id.replace(/_.*/, "");
                        combinedObject[id] = el.value;

                    });
                    $$("#id_" + data + ' input[type="tel"]').each(function (el) {
                        if (!el.value.empty()) {
                            valArr.push(el.value);
                        }
                        var id = el.id.replace(/input_[0-9].*_+/, "");
                        combinedObject[id] = el.value;
                    });
                    val = valArr.join(' ');
                    break;

                case 'datetime':
                    var valArr = [];
                    if (numeric) {
                        valArr.push($("month_" + data).value);
                        valArr.push($("day_" + data).value);
                        valArr.push($("year_" + data).value);
                        if (!(JotForm.newDefaultTheme || JotForm.extendsNewTheme) || window.FORM_MODE == 'cardform') {
                            $$("#id_" + data + ' select').each(function (el) {
                                valArr.push(el.value);
                            });
                        } else {
                            $$("#id_" + data + ' input,' + "#id_" + data + ' select').each(function (el) {
                                var splittedID = el.id.split("_");
                                var id = JotForm.isTimeObject(el.id) ? splittedID[splittedID.length - 1] : el.id.replace(/_.*/, "");
                                if (['hourSelect', 'minuteSelect', 'ampm'].indexOf(id) > -1) {
                                    valArr.push(el.value);                         
                                }
                            });
                        }
                    } else {
                        $$("#id_" + data + ' input[type="tel"]').each(function (el) {
                            valArr.push(el.value);

                            var id = el.id.replace(/_.*/, "");
                            combinedObject[id] = el.value;
                        });
                        if (!(JotForm.newDefaultTheme || JotForm.extendsNewTheme) || window.FORM_MODE == 'cardform') {
                            $$("#id_" + data + ' select').each(function (el) {
                                var id = el.id.replace(/_.*/, "");
                                combinedObject[id] = el.value;
                                valArr.push(el.value);
                            });
                        } else {
                            $$("#id_" + data + ' input,' + "#id_" + data + ' select').each(function (el) {
                                if (el.id.indexOf('lite') === -1) {
                                    var splittedID = el.id.split("_");
                                    var id = JotForm.isTimeObject(el.id) ? splittedID[splittedID.length - 1] : el.id.replace(/_.*/, "");
                                    combinedObject[id] = el.value;
                                    if (['hourSelect', 'minuteSelect', 'ampm'].indexOf(id) > -1) {
                                        valArr.push(el.value);                         
                                    }
                                }
                            });
                        }                        
                    }

                    //if numeric calculation calculate the number of days in epoch
                    if (numeric) {

                        if(!valArr[0].empty() && !valArr[1].empty() && !valArr[2].empty()) {
                            var hours = mins = ampm = '';
                            if (valArr.length > 4 && !valArr[3].empty() && !valArr[4].empty()) {
                                hours = parseInt(valArr[3]);
                                //convert to 24hours
                                if (valArr.length == 6 && !valArr[5].empty()) {
                                    ampm = valArr[5];
                                    if (ampm == 'PM' && hours != 12) {
                                        hours += 12;
                                    } else if (ampm == 'AM' && hours == 12) {
                                        hours = 0;
                                    }
                                }
                                mins = valArr[4];
                            }
                            var millis = new Date(valArr[2], valArr[0] - 1, valArr[1], hours, mins).getTime();
                            val = millis / 60 / 60 / 24 / 1000;
                        } else {
                            val = 0;
                        }
                    } else {
                        if (valArr.length > 2 && !valArr[0].empty() && !valArr[1].empty() && !valArr[0].empty()) {
                            var separator = "-";
                            var separatorEl = $$("#id_" + data + " span[class=date-separate]").first();

                            if (separatorEl) {
                                separator = separatorEl.innerHTML.replace(/[^\/\-\.]/g, '');
                            }

                            val = valArr[0] + separator + valArr[1] + separator + valArr[2];
                        }
                        if (valArr.length > 4 && !valArr[3].empty() && !valArr[4].empty()) {
                            val += ' ' + valArr[3] + ':' + valArr[4];
                            if (valArr.length == 6 && !valArr[5].empty()) val += ' ' + valArr[5]; //ampm
                        }
                    }

                    break;

                case 'time':
                    if ($('until_' + data)) {
                        if ($("duration_" + data + "_ampmRange") && !$("duration_" + data + "_ampmRange").value.empty()) {
                            if (numeric) {
                                var duration = $("duration_" + data + "_ampmRange").value;
                                if (duration.indexOf(":") > -1) {
                                    var time = duration.split(":");
                                    var hours = time[0] || 0;
                                    var mins = time[1] || 0;
                                    var millis = Date.UTC('1970', '0', '1', hours, mins);
                                    val = millis / 60 / 60 / 1000;
                                }
                            } else {
                                val = $("duration_" + data + "_ampmRange").value;
                            }
                        } else {
                            var res = JotForm.displayTimeRangeDuration(data, true);
                            if(res){ 
                                var hours = res[0] || 0;
                                var mins = res[1] || 0;
                                var millis = Date.UTC('1970', '0', '1', hours, mins);
                                val = numeric ? millis / 60 / 60 / 1000 : (hour + ":" + mins);
                            }
                        }
                        break;
                    }

                    var valArr = [];
                    combinedObject = {};
                    var timeElements = JotForm.newDefaultTheme || JotForm.extendsNewTheme ? "#id_" + data + " select," + "#id_" + data + " input," +", #id_" + data + " input:not(.form-textbox)" : "#id_" + data + " select";

                    if (numeric) {
                        $$(timeElements).each(function (el) {
                            var isNDTtimeInput = (JotForm.newDefaultTheme || JotForm.extendsNewTheme) && el.getAttribute('id').indexOf('timeInput') >= 0;
                            if (!isNDTtimeInput) {
                                valArr.push(el.value);
                            }
                        });
                        var hour, mins, ampm = '';
                        hours = parseInt(valArr[0]) || 0;
                        if (valArr.length == 3 && !valArr[2].empty()) {
                            ampm = valArr[2];
                            if (ampm == 'PM' && hours != 12) {
                                hours += 12;
                            } else if (ampm == 'AM' && hours == 12) {
                                hours = 0;
                            }
                        }
                        mins = valArr[1];
                        var millis = Date.UTC('1970', '0', '1', hours, mins);
                        val = millis / 60 / 60 / 1000;
                    } else {

                        if ($("input_" + data + "_hourSelect") && !$("input_" + data + "_hourSelect").value.empty() && $("input_" + data + "_minuteSelect") && !$("input_" + data + "_minuteSelect").value.empty()) {
                            val = $("input_" + data + "_hourSelect").value + ":" + $("input_" + data + "_minuteSelect").value;
                            if ($("input_" + data + "_ampm")) {
                                val += " " + $("input_" + data + "_ampm").value;
                            }
                        }

                        if ($("input_" + data + "_hourSelectRange") && !$("input_" + data + "_hourSelectRange").value.empty() && $("input_" + data + "_minuteSelectRange") && !$("input_" + data + "_minuteSelectRange").value.empty()) {
                            val += " - " + $("input_" + data + "_hourSelectRange").value + ":" + $("input_" + data + "_minuteSelectRange").value;
                            if ($("input_" + data + "_ampmRange")) {
                                val += " " + $("input_" + data + "_ampmRange").value;
                            }

                            if ($("duration_" + data + "_ampmRange") && !$("duration_" + data + "_ampmRange").value.empty()) {
                                val += " (" + $("duration_" + data + "_ampmRange").value + ")";
                            }
                        }
                        $$(timeElements).each(function (el) {
                            var splittedID = el.id.split("_");
                            var id = splittedID[splittedID.length - 1];
                            combinedObject[id] = el.value;
                        });
                    }
                    break;

                case 'birthdate':
                    var valArr = [];
                    if (numeric) {
                        try {
                            var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                            var months = monthNames.indexOf($("input_" + data + "_month").value);
                            var days = $("input_" + data + "_day").value;
                            var years = $("input_" + data + "_year").value;
                            var millis = new Date(years, months, days).getTime();
                            val = millis / 60 / 60 / 24 / 1000;
                        } catch (e) {
                            console.log("birthdate error");
                            console.log(e);
                        }
                    } else {
                        $$("#id_" + data + ' select').each(function (el) {
                            valArr.push(el.value);
                        });
                        if (!valArr[0].empty() && !valArr[1].empty() && !valArr[2].empty()) {
                            val = valArr[0] + ' ' + valArr[1] + ' ' + valArr[2];
                        }
                    }
                    break;

                case 'address':
                    var valArr = [];
                    combinedObject = {};
                    var inputSelector = "#id_" + data + (window.FORM_MODE == 'cardform' ? ' .jfField:not(.isHidden)' : '') + ' input[type="text"]:not(.jfDropdown-search)';
                    var dropdownSelector = "#id_" + data + (window.FORM_MODE == 'cardform' ? ' .jfField:not(.isHidden)' : '') + ' select';

                    $$(inputSelector).each(function (el) {
                        var isDuplicate = false;
                        // Do not use .includes here as IE11 does not support it.
                        if (!el.value.empty() && valArr[0] && valArr[0].indexOf(el.value) > -1){
                            isDuplicate = true;
                        }
                        if (!el.value.empty() && !isDuplicate) {
                            valArr.push(el.value);
                        }
                        var id = el.id.replace(/input_[0-9].*?_+/, "");
                        combinedObject[id] = el.value;

                    });
                    $$(dropdownSelector).each(function (el) {
                        var isDuplicate = false;
                        if (!el.value.empty() && valArr[0] && valArr[0].includes(el.value)){
                            isDuplicate = true;
                        }
                        if (!el.value.empty() && !isDuplicate) {
                            valArr.push(el.value);
                        }
                        var id = el.id.replace(/input_[0-9].*_+/, "");
                        combinedObject[id] = el.value;
                    });
                    val = valArr.join(', ');
                    break;

                case 'file':
                    val = $('input_' + data).value;
                    val = val.substring(val.lastIndexOf("\\") + 1);
                    break;

                case 'textarea':
                    if ($('input_' + data) && typeof $('input_' + data).value !== 'undefined') {
                        val = $('input_' + data).value;
                        var rich = $('id_' + data).down('.nicEdit-main');
                        if (rich) {
                            val = val.stripTags().replace(/\s/g, ' ').replace(/&nbsp;/g, ' ');
                        }
                    }
                    break;

                case 'widget':
                    var widgetType = JotForm.getWidgetType(data);
                    switch(widgetType) {
                        case "timer":
                        case "fancyTimer":
                            if(numeric) {
                                val = $('input_' + data).value;
                            } else {
                                var seconds = $('input_' + data).value;
                                var minutes = Math.floor(seconds/60);
                                seconds = seconds -  (minutes*60);
                                seconds = JotForm.addZeros(seconds, 2);
                                val = minutes + ":" + seconds;
                            }
                            break;

                        case "configurableList":
                        case "dynMatrix":
                            var br = JotForm.calculationType(result) === "html" ? "<br/>" : "\n";
                            var json = $('input_' + data).value;
                            if (numeric) {
                              val = 0;
                            }
                            try {
                                json = JSON.parse(json);
                                for(var i=0; i<json.length; i++) {
                                    var valArr = [];
                                    for(line in json[i]) {
                                        if(!json[i].hasOwnProperty(line)) continue;
                                        if(!json[i][line].empty()) {
                                          if (numeric) {
                                            var isNumber = /^[-]?\d+(\.\d+)?$/.test(json[i][line]);
                                            if (isNumber) {
                                              val += parseFloat(json[i][line]);
                                            }
                                          } else {
                                            valArr.push(json[i][line]);
                                          }
                                        }
                                    }
                                    if (valArr.length > 0) {
                                      val += valArr.join(",") + br;
                                    }
                                }
                            } catch(e) {
                                console.log($('input_' + data).value);
                                console.log(calc);
                            }
                            break;

                        case "giftRegistry":
                            val = $('input_' + data).value;
                            if(JotForm.calculationType(result) === "html") {
                                val = val.replace(/\n/g, "<br/>");
                            }
                            break;

                        case "imagelinks":
                        case "links":
                            var br = JotForm.calculationType(result) === "html" ? "<br/>" : "\n";
                            var json = JSON.parse($('input_' + data).value).widget_metadata.value;
                            for(var i=0; i<json.length; i++) {
                                if(json[i].url.replace(/\s/g, "").empty()) continue;
                                var showName = json[i].name && !json[i].name.replace(/\s/g, "").empty();
                                if(JotForm.calculationType(result) === "html") {
                                    if(widgetType === "imagelinks") {
                                        val += '<a href="'+json[i].url+'"><img src="'+json[i].url+'" /></a>';
                                    } else {
                                        val += '<a href="'+json[i].url+'">'+(showName ? json[i].name : json[i].url)+'</a>';
                                    }
                                } else {
                                    val += showName ? json[i].name + ": " : "";
                                    val += json[i].url + br;
                                }
                            }
                            break;

                        case "htmltext":
                            var b64 =  JSON.parse($('input_' + data).value).widget_metadata.value;
                            val = window.atob ? window.atob(b64) : "";
                            if(JotForm.calculationType(result) !== "html") {
                                val = val.strip().replace(/<br>/g, "\n").stripTags().replace(/&nbsp;/g,' ');
                            }
                            break;

                        case "drivingDistance":
                            val = $('input_' + data).value;
                            if(val.indexOf("Distance") > -1) {
                                var matches = val.match(/Distance(.*)/);
                                if (matches.length > 1) {
                                    val = matches[1];
                                }
                            }
                            break;

                        case "pickers":
                            var val = $('input_' + data).value;
                            if (numeric && $('customFieldFrame_' + data).src.indexOf('datepicker.html') !== -1) {
                                var valArr = val.split("/");
                                var millis = Date.UTC(valArr[2], valArr[0] - 1, valArr[1], 0, 0);
                                val = millis / 60 / 60 / 24 / 1000;
                            }
                            break;

                        case "ios7Date":
                            var val = $('input_' + data).value;
                            if (numeric && val) {
                              var valArr = val.split("/");
                              var millis = Date.UTC(valArr[2], valArr[0] - 1, valArr[1], 0, 0);
                              val = millis / 60 / 60 / 24 / 1000;
                            }
                            break;

                        default:
                            val = $('input_' + data).value;
                            break;
                    }

                    break;
                case 'appointment':
                    if (numeric) {
                        var value = JotForm.appointments[data].getComparableValue();
                        return value ? new Date(value.replace(/-/g, '/')).getTime() : 0;
                    }

                    var selection = $$('#cid_' + data + ' .jsAppointmentValue');
                    if (!selection.length) {
                        val = '';
                    } else {
                        val = selection[0].dataset.untranslated;
                    }
                    break;
                default:
                    if ($('input_' + data) && typeof $('input_' + data).value !== 'undefined') {
                        val = $('input_' + data).value;
                    }
                    break;
            }

            if (numeric && typeof val !== 'number') {
              if(useCommasForDecimals) {
                if(/\..*\,/.test(val)) { //dot used as units separator before comma
                  val = val.replace(/\./g, "");
                }
                val = val.replace(",",".");
              }
              val = val.replace(/-?([^0-9])/g, "$1").replace(/[^0-9\.-]/g, "");
            }

            if (numeric && val < 0) { //ntw 343248 - this is to patch a weirdness in the parser whereby x+-y will not parse
              val = '(' + val + ')';
            }

            if (numeric && val === '') {
              val = 0;
            }
            return val;
        };

        var secondsMS = 1000;
        var minutesMS = secondsMS * 60;
        var hoursMS = minutesMS * 60;
        var daysMS = hoursMS * 24;
        var weeksMS = daysMS * 7;
        var monthsMS = daysMS * 30;
        var yearsMS = daysMS * 365;

        var calculate = function (equation, numeric) {
            var out = '';
            var acceptableFunctions = {
                "abs": Math.abs,
                "acos": Math.acos,
                "acosh": Math.acosh,
                "asin": Math.asin,
                "asinh": Math.asinh,
                "atan": Math.atan,
                "atanh": Math.atanh,
                "atan2": Math.atan2,
                "cbrt": Math.cbrt,
                "ceil": Math.ceil,
                "cos": Math.cos,
                "cosh": Math.cosh,
                "exp": Math.exp,
                "expm1": Math.expm1,
                "floor": Math.floor,
                "fround": Math.fround,
                "hypot": Math.hypot,
                "imul": Math.imul,
                "log": Math.log,
                "log1p": Math.log1p,
                "log10": Math.log10,
                "log2": Math.log2,
                "max": Math.max,
                "min": Math.min,
                "pow": Math.pow,
                "random": Math.random,
                "round": Math.round,
                "sign": Math.sign,
                "sin": Math.sin,
                "sinh": Math.sinh,
                "sqrt": Math.sqrt,
                "tan": Math.tan,
                "tanh": Math.tanh,
                "toSource": Math.toSource,
                "trunc": Math.trunc,
                "E": Math.E,
                "LN2": Math.LN2,
                "LN10": Math.LN10,
                "LOG2E": Math.LOG2E,
                "LOG10E": Math.LOG10E,
                "PI": Math.PI,
                "SQRT1_2": Math.SQRT1_2,
                "SQRT2": Math.SQRT2,
                "minutes": function (p) {return minutesMS * p},
                "hours": function (p) {return hoursMS * p},
                "days": function (p) {return daysMS * p },
                "weeks": function(p) { return weeksMS * p},
                "months": function(p) { return monthsMS * p},
                "years": function(p) { return yearsMS * p}
            };
            for (var i = 0; i < equation.length; i++) {

                character = equation.charAt(i);

                if (character === '[' && !numeric) {
                    var end = equation.indexOf(']', i);
                    try {
                        var num = calculate(equation.substring(i + 1, end), true);
                        if (num) {
                            if (num.indexOf(",") == -1) { //normal calc string
                                num = new MathProcessor().parse(num);
                                if (JotForm.getInputType(calc.resultField) !== "datetime") {
                                    num = JotForm.morePreciseToFixed(num, calc.decimalPlaces);
                                    if (!calc.showEmptyDecimals || calc.showEmptyDecimals == "0") {
                                        num = parseFloat(num);

                                        // if num is decimal, fixed decimal places
                                        if (num % 1 !== 0) {
                                          num = JotForm.morePreciseToFixed(num, calc.decimalPlaces);
                                        }
                                    }
                                }
                                if (!isFinite(num)) {
                                    num = 0;
                                }
                            }
                            if(useCommasForDecimals) {
                                num = num.toString().replace(".", ",");
                            }
                            out += num;
                        }
                    } catch (e) {
                        console.log('exception in ' + calc.conditionId + " : " + num + "(" + equation + ")");
                    }
                    i = end;
                } else if (equation.substr(i, 3) === '|*|') {
                    try {
                        i += 3;
                        var end = equation.indexOf('|*|', i);
                        if (end === -1) continue;
                        var specOp = equation.substring(i, end);
                        i += end + 2 - i;
                        if (equation.charAt(i + 1) === '(' || (equation.charAt(i + 1) === '[' && equation.charAt(i + 2) === '(')) {
                            i += (equation.charAt(i + 1) === '[') ? 3 : 2;
                            var endSpecial = -1;
                            var balance = 1;
                            for (var k = i; k < equation.length; k++) {
                                if (equation.charAt(k) === ')') {
                                    balance--;
                                    if (balance === 0) {
                                        endSpecial = k;
                                        break;
                                    }
                                } else if (equation.charAt(k) === '(') {
                                    balance++;
                                }
                            }

                            if (endSpecial === -1) continue;
                            var args = equation.substring(i, endSpecial);
                            args = args.split(',');
                            var originalArgs = args.slice(0);

                            // Check parantheses equality and if it fails then join strings until fixed
                            for (var el = 0; el < args.length; el++) {
                                var p = 1;
                                while (!JotForm.calcParanthesesBalance(args[el])) {
                                    args[el] = args[el] + ',' + args[el + p];
                                    args[el + p] = '';
                                    p++;
                                }
                            }

                            // let remove empty strings
                            args = args.filter(function (str) { return str !== '' });

                            for (var j = 0; j < args.length; j++) {
                                args[j] = calculate(args[j], true);
                                if (args[j]) {
                                    args[j] = new MathProcessor().parse(args[j]);
                                }
                            }
                            i += endSpecial - i;
                            if (specOp === 'dateString') {
                                var millis = args[0] * 24 * 60 * 60 * 1000 + 6000000;
                                var date = new Date(millis);

                                var getStringDate = function(date) {
                                var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                                    var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                                    var day = dayNames[date.getDay()];
                                    var month = monthNames[date.getMonth()];
                                    var dayOfMonth = JotForm.addZeros(date.getDate(), 2);
                                    var year = date.getFullYear();
                                    return day+" "+month+" "+dayOfMonth+" "+year;
                                };
                                out += getStringDate(date);

                                if (equation.charAt(i) === ']') {
                                    i++;
                                } else {
                                    equation = equation.substr(0, i + 1) + '[' + equation.substr(i + 1);
                                }
                            } else if (specOp === 'date') {
                                if (args.length > 2) {
                                    var millis = Date.UTC(args[0], args[1] - 1, args[2]);
                                    out += millis / 60 / 60 / 24 / 1000;
                                }
                            } else if (specOp === 'nth') {
                                var n = args[0];
                                args = args.splice(1);
                                args = args.sort(function (a, b) {
                                    if (parseFloat(a) > parseFloat(b)) return 1;
                                    if (parseFloat(b) > parseFloat(a)) return -1;
                                    return 0;
                                });
                                args = args.reverse();
                                out += args[parseFloat(n) - 1];
                            } else if (specOp === 'avg' || specOp === 'avgNoZero') {
                                var len = sum = 0;
                                for (var j = 0; j < args.length; j++) {
                                    if (parseFloat(args[j]) > 0) {
                                        len++;
                                        sum += parseFloat(args[j]);
                                    }
                                }
                                out += specOp === 'avg' ? sum / args.length : sum / len;
                            } else if (specOp === 'count') {
                                var field = originalArgs[0];
                                field = field.replace(/[\{\}]/g, '');
                                var type = JotForm.getInputType(field);
                                var len = $$("#id_" + field + ' input[type="' + type + '"]:checked').length;
                                out += len;
                            } else if (specOp === 'commaSeparate') {
                                if (typeof args[0] == "number") {
                                    args[0] = args[0].toFixed(calc.decimalPlaces);
                                    var parts = args[0].toString().split(".");
                                    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                    out += parts.join(".");
                                } else {
                                    out += args[0];
                                }
                            } else {
                                out += acceptableFunctions[specOp].apply(undefined, args);
                            }

                        } else if (specOp === 'random') {
                            out += Math.random();
                        } else {
                            out += acceptableFunctions[specOp];
                        }
                    } catch (e) {
                        console.log(e);
                    }
                } else if (character === '{') {
                    var end = equation.indexOf('}', i);
                    var qid = equation.substring(i + 1, end);
                    try {
                        var val = getValue(qid, numeric);
                        if (numeric && typeof val !== 'number' && (val.indexOf('(') == -1 && val.indexOf(')') == -1)) {
                            val = Number(val) || 0;
                        }
                    } catch (e) {
                        console.log("error catching value");
                        console.log(e);
                    }
                    if (val === '' && numeric) return false;
                    out += val;

                    i += end - i;
                } else {
                    out += character;
                }
            }
            return out;
        };

        var output = calculate(calc.equation);
        if (!(typeof output== "string" && output.length > 1) && parseFloat(output) === 0 && $('input_' + result) && ($('input_' + result).readAttribute('defaultValue') != null || $('input_' + result).readAttribute('data-defaultvalue') != null)) {
            output = $('input_' + result).readAttribute('defaultValue') || $('input_' + result).readAttribute('data-defaultvalue');
        }

        var resultFieldType = calc.isLabel ? "html" : JotForm.calculationType(result);

        switch (resultFieldType) {
            case "inline":
                if (result.indexOf('|') > -1) {
                    var idPatcher = { addr_line1: 'streetaddress', addr_line2: 'addressline2', postal: 'zip' };
                    var selectFieldId = [ "country" ]; // used for replace the input tag with select tag

                    var splitResult = result.split('|');
                    var qid = splitResult[0];
                    var fieldId = splitResult[1];
                    var TIMESTAMP_OF_2019 = 1546300000000;
                    var isNewIDType = Number(fieldId) > TIMESTAMP_OF_2019; // old: 1546312345678-firstname / new: firstname-12
                    var selector = isNewIDType ? '#id_' + qid + ' input[id*=' + fieldId + '-]' : '#id_' + qid + ' input[id$=-' + fieldId + ']';
                    var resultFields = $$(selector);
                    var hasCombinedField = false;
                    Object.keys(combinedObject).forEach(function(id) {
                        var patchedId = idPatcher[id] ? idPatcher[id] : id;
                        var selectInput = selectFieldId.indexOf(patchedId) > -1 ? 'select' : 'input';

                        var selector = isNewIDType ? '#id_' + qid + ' input[id*=' + fieldId + '-' + id + ']' : '#id_' + qid + ' ' + selectInput + '[id*=' + patchedId + '][id$=-' + fieldId + ']';
                        var visibleFields = $$(selector).filter(function (field) {
                            return JotForm.isVisible(field) || field.id.indexOf('lite_mode' > -1);
                        });
                        if (visibleFields[0] && (isNaN(output) && output.indexOf(combinedObject[id]) > -1)) {
                            hasCombinedField = true;
                            visibleFields[0].value = combinedObject[id];
                            visibleFields[0].triggerEvent('blur');
                        }
                    });
                    if (!hasCombinedField && resultFields[0]) {
                        if (resultFields[0].parentNode.getAttribute("data-type") === "datebox") {
                            var date = new Date(output * 60 * 60 * 24 * 1000);
                            JotForm.formatDate({ date: date, dateField: $("lite_mode_" + qid + "-date-" + fieldId) });                        
                        }
                        else {
                            resultFields[0].value = output;
                        }
                    }
                    break;
                }
            case "html":
                try {

                    if(!calc.replaceText) calc.replaceText = "";
                    if(calc.replaceText.indexOf(":") > -1) {
                        var subfield = calc.replaceText.substr(calc.replaceText.indexOf(":")+1);
                        if (calc.equation.indexOf('|') > -1) {
                            var splitResult = calc.operands.split('|');
                            var qid = splitResult[0];
                            var fieldId = splitResult[1];

                            // Correct matching of inline field's subfield name with combinedObject's one
                            subfield = qid + '_' + subfield.split('-')[0];
                        } 
                        if(subfield in combinedObject) {
                            output = combinedObject[subfield];
                        }
                    }
                    if (output.empty() && calc.defaultValue) {
                        output = calc.defaultValue;
                    }

                    var className = result + "_" + calc.replaceText.replace(/\[/g,"_field_").replace(/\:/g,"_");;
                    className = className.replace(']', '');
                    var spans = Array.from(document.getElementsByClassName(className));

                    var subLabel = [];
                    if (window.FORM_MODE == 'cardform') {
                      subLabel = $$('.' + 'jfField-sublabel').filter(function(el) { return el.htmlFor == 'input_' + result; });
                    }
                    else {
                      subLabel = $$('.' + 'form-sub-label').filter(function(el) { return el.htmlFor == 'input_' + result; });
                    }

                    var replaceRegex = calc.replaceText.replace('[','\\[' );

                    var re = new RegExp("\{" + replaceRegex + "\}", "g");
                    var def = calc.defaultValue || "";

                    var links = $$('a[href="{'+replaceRegex+'}"]');
                    var replaceLinks = $$('a[replace-link="'+className+'"]');
                    var linkRegex = new RegExp(/([--:\w?@%&+~#=]*\.[a-z]{2,4}\/{0,2})((?:[?&](?:\w+)=(?:\w+))+|[--:\w?@%&+~#=]+)?/);
                    var matchLink = output.match(linkRegex);
                    links.each(function (link) {
                        link.setAttribute('replace-link', className);
                        link.setAttribute('href', '');
                        if (matchLink) {
                            var url = matchLink[0].indexOf('//') === -1 ? '//' + matchLink[0] : matchLink[0];
                            link.setAttribute('href', url);
                        }
                    });
                    replaceLinks.each(function (link) {
                        if (matchLink) {
                            var url = matchLink[0].indexOf('//') === -1 ? '//' + matchLink[0] : matchLink[0]
                            link.setAttribute('href', url);
                        }
                    })

                    if (spans.length == 0) {
                      if (resultFieldType === 'inline') {
                        var fitbFormFields = $$('#FITB_' + result + ' .fitb-replace-tag');
                        var fieldRegex = new RegExp("([^<>]*)\{" + replaceRegex + "\}([^<>]*)", "g");
                        fitbFormFields.forEach(function(el) {
                          if (el.innerHTML) {
                            el.innerHTML = el.innerHTML.replace(fieldRegex, '$1<span class="replaceTag ' + className + '" default="'+def+'">' + output + '</span>$2');
                          }
                        });
                      } else {
                        var contents = calc.isLabel ? $('label_' + result).innerHTML : $('text_' + result).innerHTML;
                        if (calc.isLabel) {
                          contents = contents.replace(re, '<span class="replaceTag ' + className + '" default="'+def+'">' + output + '</span>');
                        } else {
                          var localRe = new RegExp("(>[^<>]*)\{" + replaceRegex + "\}([^<>]*<)", "g");
                          while (contents.match(localRe) && output.indexOf('{' + replaceRegex + '}') === -1) {
                            contents = contents.replace(localRe, '$1<span style="white-space: pre-wrap" class="replaceTag ' + className + '" default="'+def+'">' + output + '</span>$2');
                          }
                        }
                        calc.isLabel ? $('label_' + result).update(contents) : $('text_' + result).update(contents);
                      }
                    } else {
                        spans.each(function (span) {
                            if (output != null) {
                                if (window.DomPurify) {
                                    span.update(window.DomPurify.sanitize(output, { ADD_ATTR: ['target'] }));
                                } else {
                                    span.update(output.stripScripts().stripEvents());
                                }
                            }
                        });
                    }

                    subLabel.each(function (subl){
                        var content = subl.innerHTML.replace(re, '<span class="replaceTag ' + className + '" default="'+def+'">' + output + '</span>');
                        subl.update(content);
                    });

                    var description = $('id_' + result + '_description');
                    if (description) {
                        var descriptionContent = description.innerHTML;
                        if (descriptionContent.indexOf(calc.replaceText) > -1) {
                          descriptionContent = descriptionContent.replace(re, '<span class="replaceTag ' + className + '" default="'+def+'">' + output + '</span>');
                          description.update(descriptionContent);
                        }
                    }

                } catch (e) {
                    console.log(e);
                }

                break;
            case "address":
            case "authnet":
            case "paypalpro":
            case "combined":
            case "braintree":
            case "stripe":
               for (var inputId in combinedObject) {
                    if (inputId !== "") {
                        if ($('id_' + result).select('input[id*=' + inputId + '], select[id*=' + inputId + ']').length > 0) {
                            var fieldInputElement = $('id_' + result).select('input[id*=' + inputId + '], select[id*=' + inputId + ']').first()
                            fieldInputElement.value = combinedObject[inputId];
                            if(resultFieldType == 'address' &&  window.FORM_MODE == 'cardform'){
                              var parentElement = fieldInputElement.parentElement;
                              if (parentElement.querySelector('input')) {
                                parentElement.querySelector('input').value = combinedObject[inputId];
                              } else if (parentElement.querySelector('select')) { // Address fields can have states as dropdown type
                                parentElement.querySelector('select').value = combinedObject[inputId];
                                parentElement.querySelector(".jfDropdown-chip.isSingle").innerText = combinedObject[inputId];
                              }
                            }
                            if (combinedObject[inputId]) {
                              fieldInputElement.parentNode.addClassName('isFilled');
                            }
                        }
                    }
                }
                if ($('input_' + result + '_full') && $('input_' + result + '_full').readAttribute("masked") == "true") { //mask if phone is masked
                    JotForm.setQuestionMasking('#input_' + result + '_full', "textMasking", $('input_' + result + '_full').readAttribute("maskValue"));
                }
                break;
            case "time":
            case "datetime":
                var setTimeValues = function(date) {
                    var hour = date.getHours();
                    var minute = JotForm.addZeros(date.getMinutes(), 2);

                    if (!isNaN(hour) && !isNaN(minute)) {
                        var ampmField = $('input_'+result+'_ampm') || $('ampm_' + result);
                        if (ampmField) {
                            ampmField.value = hour >= 12 ? 'PM' : 'AM';
                            hour = hour % 12 || 12;
                            ampmField.triggerEvent('change');
                        }

                        var hourSelect = $("input_" + result+ "_hourSelect") || $("hour_" + result);
                        if (hourSelect) {
                            if(!ampmField)
                                hour = JotForm.addZeros(hour, 2);
                            hourSelect.value = hour;
                            hourSelect.triggerEvent('change');
                        }

                        var minuteSelect = $("input_" + result+ "_minuteSelect") || $("min_" + result);
                        if (minuteSelect) {
                            if (minuteSelect.options) {
                                var roundedMinute = '00';
                                for(var i = 0; i < minuteSelect.options.length; i++) {
                                    roundedMinute = minuteSelect.options[i].value;
                                    if (minuteSelect.options[i].value >= minute) {
                                        break;
                                    }
                                }
                                minute = roundedMinute;
                            }
                            minuteSelect.value = minute;
                            minuteSelect.triggerEvent('change');
                        }

                        var timeInput = $('input_'+result+'_timeInput');
                        if (timeInput) {
                            var calculatedHour = hour.toString().length === 1 ? '0' + hour : hour;
                            calculatedHour = calculatedHour == 0 ? '12' : calculatedHour;
                            timeInput.value = calculatedHour+":"+minute;
                            timeInput.triggerEvent('change');
                        }
                    }
                };

                if (combinedObject && "year" in combinedObject || resultFieldType === 'time') {
                    if (output.length === 13) {
                        output = parseFloat(output, 10);
                        var date = new Date(output);
                        setTimeValues(date);
                    } else {
                        var dateObject = new Date(output);
                        if (dateObject.getTime() && resultFieldType === 'time') {
                            setTimeValues(dateObject);
                        } else {
                            for (var inputId in combinedObject) {
                                if (JotForm.isTimeObject(inputId)) {
        
                                    var ndtTimeQuery = $('id_' + result).select('input[id*=input_' + result + '_' + inputId + '], select[id*=input_' + result + '_' + inputId + ']');
                                    var targetTimeObject = JotForm.newDefaultTheme && ndtTimeQuery.length > 0 ? ndtTimeQuery.first() : '';
        
                                    var ldtTimeQuery = $('id_' + result).select('input[id*=' + inputId + '], select[id*=' + inputId + ']');
                                    targetTimeObject = !JotForm.newDefaultTheme && ldtTimeQuery.length > 0 ? ldtTimeQuery.first() : targetTimeObject;
        
                                    var cardFormTimeQuery = $('id_' + result).select('input[id*=' + inputId + '_' + result + '], select[id*=' + inputId + '_' + result + ']');
                                    targetTimeObject = window.FORM_MODE == 'cardform' && cardFormTimeQuery.length > 0 ? cardFormTimeQuery.first() : targetTimeObject;
        
                                    targetTimeObject.value = combinedObject[inputId];
        
                                    if (window.FORM_MODE == 'cardform') {
                                        var tempInputID = inputId.indexOf('Range') >= 0 ? inputId.replace('Range', '') + '-range' : inputId;
                                        tempInputID = tempInputID.indexOf('Select') >= 0 ? tempInputID.replace('Select', '') : tempInputID;
        
                                        var dataType = resultFieldType === 'time' ? 'data-type*="' + 'time-' + tempInputID + '"' : 'data-type*="' + inputId + '"';
                                        var dateQuery = $('id_' + result).select('div[class*=jfField][' + dataType + ']');
                                        for (var i = 0; i < dateQuery.length; i++) {
                                            dateQuery[i].querySelector(".jfDropdown-chip.isSingle").innerText = combinedObject[inputId];
                                        }
                                    }
                                } else {
                                    var dateQuery = $('id_' + result).select('input[id*=' + inputId + '_' + result + '], select[id*=' + inputId + '_' + result + ']');
                                    var targetDateEl = dateQuery.length > 0 ? dateQuery.first() : '';
                                    targetDateEl.value = combinedObject[inputId];
                                }
                            }    
                        }
                    }
                } else {
                    try {
                        if ((typeof output == "number" && output > 0) || (typeof output == "string" && output.replace(/\s/g, "").length > 0 && output !== "0")) {
                            if (!isNaN(output)) {
                                if (output.length === 13) {
                                    output = parseFloat(output, 10);
                                } else {
                                    output = Math.round(output * 60 * 60 * 24 * 1000);
                                }
                            }

                            var date = new Date(output);
                            var year = date.getFullYear();
                            var month = JotForm.addZeros(date.getMonth() + 1, 2);
                            var day = JotForm.addZeros(date.getDate(), 2);

                            if ($('input_'+result)) {
                              $('input_'+result).value = year+'-'+month+'-'+day;

                              // set the year, month and date for card forms
                              if (!isNaN(year)) $$('#cid_'+result+' .jfField[data-type="year"] input')[0].value = year;
                              if (!isNaN(month)) $$('#cid_'+result+' .jfField[data-type="month"] input')[0].value = month;
                              if (!isNaN(day)) $$('#cid_'+result+' .jfField[data-type="day"] input')[0].value = day;

                            } else {
                              if (!isNaN(year)) $("year_" + result).value = year;
                              if (!isNaN(month)) $("month_" + result).value = month;
                              if (!isNaN(day)) $("day_" + result).value = day;
                            }

                            setTimeValues(date);
                        }
                    } catch (e) {
                        console.log(e);
                    }
                }
                if ($('lite_mode_' + result)) {
                    var date = new Date($("year_" + result).value, ($("month_" + result).value - 1), $("day_" + result).value);
                    if(date.getTime()) {
                        JotForm.formatDate({date: date, dateField: $('id_' + result)});
                    }
                }

                break;
            case "number":
                var lastCommaIndex = output.lastIndexOf(',');
                if ( lastCommaIndex > -1 && lastCommaIndex === output.length - calc.decimalPlaces - 1) {
                    output = output.substring(0, lastCommaIndex) + "." + output.substring(lastCommaIndex + 1);
                }
                output = output.replace(/[^\-0-9\.]/g, "");
                $('input_' + result).value = output;
                var parent = $('input_' + result).parentElement;
                if(window.FORM_MODE == 'cardform' && parent && !parent.hasClassName('isFilled')) {
                    parent.addClassName('isFilled');
                }
                break;
            case "radio":
                var sources = $$('#id_'+calc.operands+' input[type="radio"]:checked');

                var outputs = sources.length ? sources.collect(function(out){
                    if (out.value){
                        return out.value;
                    }
                }) : output.strip();

                var radios = $$("#id_" + result + ' input[type="radio"]');
                $A(radios).each(function (rad) {
                    rad.checked = false;
                    if(typeof outputs === 'string') {
                        if (rad.value == output.strip()) {
                            rad.checked = true;
                        }
                    } else {
                        if (rad.value == output.strip() || outputs.include(rad.value)) {
                            rad.checked = true;
                        }
                    }

                });
                break;
            case "checkbox":
                var sources = $$('#id_'+calc.operands+' input[type="checkbox"]:checked');

                var outputs = sources.length ? sources.collect(function(out){
                    /**
                     * Check if there is data-calcvalue attribute within the target element
                     */
                    var dataCalcValue = out.getAttribute('data-calcvalue')

                    /**
                     * If element has data-calcvalue attribute then return it,
                     * so value of the attribute can be pushed to the array called outputs.
                     * Because outputs array's elements will be used to be checked or unchecked
                     * somewhere in the following lines.
                     */
                    if(dataCalcValue){
                        return dataCalcValue
                    }

                    /**
                     * If element hasn't data-calcvalue,
                     * then use value attribute instead.
                     */
                  return out.value.strip();
                }) : output.strip();

                var checks = $$("#id_" + result + ' input[type="checkbox"]');

                /* Detect if the base field (which the calculation's term belong to) is a radio field
                    (As we don't want to uncheck everything from the checkbox field when the base is radio)
                If radio:
                        If the calculation is an insertion of the radio field's value ( calc.equation will be like {baseFieldId} )
                            Then collect values of the base inputs into the array calcBaseInputValues
                        Else
                            Get the calculation values of the calculations which has the same base & result fields with calc.
                            Collect those values into the array calcBaseInputValues
                        Filter the checks by using the calcBaseInputValues and assign to variable toBeChecked
                    
                Standart flow with $A(checks).each(function (chk)
                    
                Make the necessary recheckings if there are any.
                */
                var toBeChecked = [];

                var calcBaseInputs = $$('[id^=input_'+calc.baseField+'_')
                var calcBaseIsRadio = calcBaseInputs.length && calcBaseInputs[0].type === 'radio';
                if (calcBaseIsRadio) {
                    var calcBaseInputValues = []
                    if ('{'+calc.baseField+'}' === calc.equation) {
                        calcBaseInputValues = calcBaseInputs.map(function(calcBaseInput) {
                            if (calcBaseInput.dataset.calcvalue) {
                                return calcBaseInput.dataset.calcvalue;
                            } else {
                                return calcBaseInput.value;
                            }
                        });
                    } else {
                        var tempCalcs = JotForm.calculations;
                        calcBaseInputValues = tempCalcs.filter(function(c) {
                            return c.baseField === calc.baseField && c.resultField === calc.resultField;
                        }).map(function (calcBaseInput) { return calcBaseInput.equation; });
                    }
                    toBeChecked = checks.filter(function(check) { return check.checked === true && !calcBaseInputValues.include(check.value); });
                }

                $A(checks).each(function (chk) {
                    if (!JotForm.defaultValues[chk.id]) {
                        chk.checked = false;
                    }
                    if (outputs.include(chk.value)) {
                        chk.checked = true;
                    }
                });

                toBeChecked.forEach(function(input) { input.checked = true; });
                break;
            case "select":
                 try {
                    var source = $$('#id_'+calc.operands+' select');
                    var out = (source[0] ? source[0].value : output);
                    /**
                     * Sometimes users can create options with one or more spaces in them.
                     * This code block was malfunctioning in such cases.
                     * Hence, if the string which is the value of the selected option
                     * ends with one or more spaces, those spaces are going to be removed anymore.
                     */
                    var stripped = (/\s$/).test(out) ? out.strip() + ' ' : out.strip();
                    if (result.indexOf('|') > 0) {
                        $('input_' + result.split('|').join('_field_')).setValue(stripped);
                    } else {
                        $('input_' + result).setValue(stripped);
                    }
                    break;
                } catch (error) {
                    console.log(error);
                }
            case "matrix":
                if ("resultSubField" in calc) {
                    if ($(calc.resultSubField)) {
                        $(calc.resultSubField).value = output;
                    }
                }
                break;

            case "textarea":
                output = output.replace(/<br>|<br\/>/gi, "\r\n");
                if (output && output.length > 0) {
                    $('input_' + result).removeClassName('form-custom-hint').removeAttribute('spellcheck');
                }
                var richAreaSelector = window.FORM_MODE == 'cardform' ? "#input_"+result+"_editor" : ".nicEdit-main"
                var richArea = $("id_" + result).down(richAreaSelector);
                if (richArea) {
                    richArea.innerHTML = output;
                    richArea.setStyle({'color': ''});
                }
                $('input_' + result).value = output;
                break;
            case "mixed":
                if($(mixedResult)) {
                    $(mixedResult).value = output;
                    var parent = $(mixedResult).up();
                    if(window.FORM_MODE == 'cardform' && parent && !parent.hasClassName('isFilled')) {
                        parent.addClassName('isFilled');
                    }
                }
                break;
            case "email":
                if ($('input_' + result)) {
                    $('input_' + result).value = output;
                }
                var parent = $('input_' + result).parentElement;
                if(window.FORM_MODE == 'cardform' && parent && !parent.hasClassName('isFilled')) {
                    parent.addClassName('isFilled');
                }
                break;
            case "appointment":
                var parsedOutput = calc.conditionTrue ? parseInt(output) : false;

                setTimeout(function() {
                    if (calc.resultFieldProp === 'startdate') {
                        JotForm.appointments[result].forceStartDate(parsedOutput, calc.equation);
                    }

                    if (calc.resultFieldProp === 'enddate') {
                        JotForm.appointments[result].forceEndDate(parsedOutput);
                    }
                }, 100);
                break;
            default:
                try {
                    if ($('input_' + result) && $('input_' + result).hinted === true) { //IE8&9 make sure inserted value is not hinted
                        $('input_' + result).clearHint();
                    }

                    if ($('input_' + result)) {
                        if ((calc.equation === '0' || calc.equation === '[0]') && resultFieldType === 'text') {
                            $('input_' + result).value = '0';
                        } else {
                            $('input_' + result).value = output;
                        }
                    }

                    if ( $('input_' + result) && output && output.length === 0 && $('input_' + result).hintClear) { //IE8&9 if value is empty reapply hint
                        $('input_' + result).hintClear();
                    }

                    if ($('input_' + result) && $('input_' + result).readAttribute("data-masked") == "true") {
                        JotForm.setQuestionMasking("#input_" + result, "textMasking", $('input_' + result).readAttribute("maskValue"));
                    }

                    if (resultFieldType === 'widget') {
                        var widgetEl = $('input_' + result);
                        var iframe = document.getElementById('customFieldFrame_' + result);
                        if (widgetEl && iframe) {
                            if ($(iframe).hasClassName('frame-xd-ready')) { // the iframe is already loaded
                                widgetEl.fire('widget:populate', { qid: result, value: output });
                                widgetEl.triggerEvent('change');
                            } else {
                                // wait for iframe to load
                                iframe.addEventListener('load', function() {
                                    widgetEl.fire('widget:populate', { qid: result, value: output });
                                    widgetEl.triggerEvent('change');
                                });
                            }
                        }
                    }

                    break;
                } catch (error) {
                    console.log(error);
                }
        }

        var infiniteLoop = function () {

            var checkVal = typeof output === 'object' ? JSON.stringify(output) : output;
            var checkField = calc.resultSubField||calc.resultField;
            //create global antiLoop variable if not created yet
            if (!("__antiLoopCache" in window)) {
                window.__antiLoopCache = {};
            }
            if (window.__antiLoopCache[checkField] === checkVal) {
                return true;
            }

            window.__antiLoopCache[checkField] = checkVal;

            return false;
        }

        var calculationInfiniteLoop = function () {
            var timestamp = new Date().getTime();
            var msPart = timestamp % 1000;
            if (msPart < 500) {
                msPart = "0";
            } else {
                msPart = "1";
            }
            var secPart = parseInt(timestamp / 1000);
            var antiLoopKey = (calc.id || calc.resultField) + '-' + secPart + '-' + msPart;
            var maxLoopSize = 19;

            window.lastCalculationTimeStamp = window.lastCalculationTimeStamp || new Date().getTime();
            var betweenLookUp = (timestamp - window.lastCalculationTimeStamp) / 1000;
            if (betweenLookUp > 10) {
                window.__antiCalculationLoopCache = {};
                window.lastCalculationTimeStamp = null;
            }
            if (!("__antiCalculationLoopCache" in window)) {
                window.__antiCalculationLoopCache = {};
            }
            if (antiLoopKey in window.__antiCalculationLoopCache) {
                window.__antiCalculationLoopCache[antiLoopKey]++;
                if (window.__antiCalculationLoopCache[antiLoopKey] > maxLoopSize) {
                    return true;
                }
            } else {
                window.__antiCalculationLoopCache[antiLoopKey] = 1;
            }

            return false;
        }

        if (infiniteLoop() || calculationInfiniteLoop()) {
            return;
        }

        if (!mixedResult && $('id_' + result).hasClassName("form-line-error")) {
            $('id_' + result).select("select[class*='required'], textarea[class*='required'], input[class*='required']").each(function (el) {
                if (el.validateInput) {
                    el.validateInput();
                }
            });
        }

        var triggerMe;
        var eventType;

        if (resultFieldType == "checkbox" || resultFieldType == "radio") {
            eventType = "change";
            triggerMe = $('id_' + result)
        } else if (resultFieldType == "select") {
            eventType = "change";
            if (result.indexOf('|') > 0) {
                if ($('input_' + result.split('|').join('_field_'))) {
                    triggerMe = $('input_' + result.split('|').join('_field_'));
                }
            } else {
                if ($('input_' + result)) {
                    triggerMe = $('input_' + result);
                }
            }
        } else if(resultFieldType == "mixed") {
            eventType = "change";
            if(result.indexOf('|') > 0){
                triggerMe = $('input_' + result.split('|').join('_field_'));
            }
        } else if (resultFieldType === 'inline') {
            return;
        }
        else {
            eventType = "keyup";
            if($(mixedResult)) {
                triggerMe = $(mixedResult);
            } else if (!calc.isLabel) {
                triggerMe = $('input_' + result) ? $('input_' + result) : $('id_' + result).select('input').first();
            }
        }

        var sourceFieldElement = sourceField && $(sourceField);
        var preventRetriggerItself = sourceEvent && sourceFieldElement && sourceFieldElement.contains(triggerMe) && eventType === sourceEvent;
        if (preventRetriggerItself) return;

        if (!triggerMe) return;
        if (document.createEvent) {
            var evt = document.createEvent('HTMLEvents');
            evt.initEvent(eventType, true, true);
            triggerMe.dispatchEvent(evt);
        }
        if (triggerMe.fireEvent) {
            triggerMe.fireEvent('on' + eventType);
        }
    },

    // It checks parantheses equality for a given string
    calcParanthesesBalance: function (str) {
        var openPar = (str.match(/\(/g) || []).length;
        var closePar = (str.match(/\)/g) || []).length;
        return openPar === closePar;
    },

    getWidgetType: function(qid) {
        try {
            if(!$("id_"+qid || $("id_"+qid).down("iframe"))) return false;
            if($('input_' + qid).value.indexOf("widget_metadata") > 1) {
                return JSON.parse($('input_' + qid).value).widget_metadata.type;
            }
            var iframe = $("id_"+qid).down("iframe");
            var src = iframe.src;
            var reg = new RegExp( 'jotform.io/(.*)/');
            var widget = reg.exec(src);
            if(!widget || widget.length < 2 || !widget[1]) return false;
            return widget[1];
        } catch(e) {
            console.error("get widget type error");
            return false;
        }
    },

    widgetsWithConditions: [],

    /**
     * When widget value is updated check whether to trigger conditions
     */
    triggerWidgetCondition: function (id) {
        if (JotForm.widgetsWithConditions.include(id)) {
            if (document.createEvent) {
                var evt = document.createEvent('HTMLEvents');
                evt.initEvent('change', true, true);
                $('input_' + id).dispatchEvent(evt);
            } else if ($('input_' + id).fireEvent) {
                return $('input_' + id).fireEvent('onchange');
            }
        }
    },

    getFieldIdFromFieldRef: function(ref) {
        try {
            if (typeof ref === "string" && ref.indexOf("{") > -1 && ref.indexOf("}") > -1) {
                var stripped = ref.strip().replace(/[\{\}]/g, "");
                var inputs = $$('input[name*="_' + stripped + '["\],select[name*="_' + stripped + '\["]')
                if(!inputs || inputs.length == 0) {
                    inputs = $$('input[name*="_' + stripped + '"],select[name*="_' + stripped + '"]');
                }
                if(inputs.length > 0) {
                    var field = inputs.first().up(".form-line");
                    if(field) {
                        return field.id.replace(/.*id_/,"");
                    }
                }
            }
        } catch(e) {
            console.log(e);
        }
        return false;
    },

    /**
     * Sets all events and actions for form conditions
     */
    setConditionEvents: function () {
        try {
            $A(JotForm.conditions).each(function (condition) {

                if (condition.disabled == true) return; //go to next condition

                if (condition.type == 'field' || condition.type == 'calculation' || condition.type == 'require' || condition.type == 'mask'
                    || ($A(condition.action).length > 0 && condition.action.first().skipHide === 'hidePage')) {

                    var fields = [];
                    var keys = {};
                    $A(condition.terms).each(function (term) {
                      term.field = String(term.field);
                      var tempField = '';
                      if (term.field.indexOf('|') > -1) {
                        var fieldSplit = term.field.split( '|' );
                        if ($('id_' + fieldSplit[0]) && $('id_' + fieldSplit[0]).readAttribute('data-type') == "control_inline") {
                            tempField = term.field;
                        } else {
                            tempField = fieldSplit[0] + '_field_' + fieldSplit[1];
                        }
                      } else {
                        tempField = term.field;
                      }
                        var key = term.operator + '|' + term.field;
                        if (!keys[key]) {
                          keys[key] = true;
                          fields.push(tempField);
                        }
                        var otherFieldRef = JotForm.getFieldIdFromFieldRef(term.value)
                        if(otherFieldRef) {
                            fields.push(otherFieldRef);
                        }
                    });

                    $A(fields).each(function (id) {
                        var inputTypeTemp = JotForm.getInputType(id);
                        switch (inputTypeTemp) {
                            case "widget":
                            case "signature":
                                JotForm.setFieldConditions('input_' + id, 'change', condition);
                                JotForm.widgetsWithConditions.push(id);
                                break;
                            case "combined":
                            case "email":
                                if (id.indexOf('_field_') > -1) {
                                  JotForm.setFieldConditions('input_' + id, 'autofill', condition);
                                } else {
                                  JotForm.setFieldConditions('id_' + id, 'autofill', condition);
                                }
                                break;
                            case "address":
                                JotForm.setFieldConditions('id_' + id, 'autofill', condition);
                                JotForm.setFieldConditions('input_' + id + '_country', 'change', condition);
                                JotForm.setFieldConditions('input_' + id + '_state', 'change', condition);
                                break;
                            case "datetime":
                                JotForm.setFieldConditions('id_' + id, 'date:changed', condition);
                                break;
                            case "birthdate":
                                JotForm.setFieldConditions('input_' + id + '_day', 'change', condition);
                                JotForm.setFieldConditions('input_' + id + '_month', 'change', condition);
                                JotForm.setFieldConditions('input_' + id + '_year', 'change', condition);
                                break;
                            case "time":
                                JotForm.setFieldConditions('input_' + id + '_hourSelect', 'change', condition);
                                JotForm.setFieldConditions('input_' + id + '_minuteSelect', 'change', condition);
                                JotForm.setFieldConditions('input_' + id + '_ampm', 'change', condition);
                            case "select":
                            case "file":
                                if ($('input_' + id)) {
                                    JotForm.setFieldConditions('input_' + id, 'change', condition);
                                } else {
                                    $('id_' + id).select('select').each(function (el) {
                                        JotForm.setFieldConditions(el.id, 'change', condition);
                                    });
                                }
                                break;
                            case "checkbox":
                            case "radio":
                                JotForm.setFieldConditions('id_' + id, 'change', condition);
                                break;
                            case "number":
                                JotForm.setFieldConditions('input_' + id, 'number', condition);
                                break;
                            case "autocomplete": // Neil: Set custom event for autocomplete fields (classname: "form-autocomplete")
                                JotForm.setFieldConditions('input_' + id, 'autocomplete', condition);
                                break;
                            case "grading":
                                JotForm.setFieldConditions('id_' + id, 'keyup', condition);
                                break;
                            case "text":
                            case "textarea":
                                JotForm.setFieldConditions('input_' + id, 'autofill', condition);
                                break;
                            case "hidden":
                                if ($('input_' + id + "_donation")) {
                                    JotForm.setFieldConditions('input_' + id + "_donation", 'keyup', condition);
                                } else {
                                    JotForm.setFieldConditions('input_' + id, 'keyup', condition);
                                }
                                break;
                            case "mixed":
                                if (id.indexOf('_field_') > -1) {
                                    var idSplit = id.split('_field_');
                                    var tempQid = idSplit[0];
                                    var tempQuestion;
                                    // If we can
                                    this.CardLayout.layoutParams.allQuestions.forEach(function (question) {
                                        if (question.id == tempQid) {
                                          tempQuestion = question;
                                        }
                                    });
                                    if (tempQuestion && tempQuestion.fields) {
                                        tempQuestion.fields.forEach( function (field) {
                                        var tempSelector = 'input_' + tempQid + '_field_' + field.fieldID;
                                          JotForm.setFieldConditions(tempSelector, 'change', condition);
                                          JotForm.widgetsWithConditions.push(tempSelector);
                                        });
                                    }
                                }
                              break;
                            case "inline":
                                var fieldSplit = id.split('|');
                                var qid = fieldSplit[0];
                                var tempSelector = 'id_' + qid;
                                JotForm.setFieldConditions(tempSelector, 'change', condition);
                                break;
                            default: // text, textarea, dropdown
                                JotForm.setFieldConditions('input_' + id, 'keyup', condition);
                        }
                    });

                } else {
                    $A(condition.terms).each(function (term) {
                        var id = term.field.toString();

                        // if this is a product quantity option (e.g. 4_quantity_1009_0)
                        if (id.indexOf("_") !== -1) {
                            id = id.split("_")[0];
                        }

                        // if element is a multiline
                        if (id.indexOf("|") !== -1) {
                          id = id.split("|")[0];
                        }

                        if(!$('id_' + id)) {
                            return;
                        }

                        var nextButton;
                        if(window.FORM_MODE === 'cardform') {
                          nextButton = $('id_' + id).select('.forNext')[0];
                        } else {
                          nextButton = JotForm.getSection($('id_' + id)).select('.form-pagebreak-next')[0];
                        }

                        if (!nextButton) {
                            return;
                        }

                        nextButton.observe('mousedown', function () {
                            // JotForm.warn('Checking ' + $('label_' + id).innerHTML.strip());
                            JotForm.checkCondition(condition, nextButton.id, 'mousedown');
                        });
                    });
                }
            });

            $H(JotForm.fieldConditions).each(function (pair) {
                var field = pair.key;
                var event = pair.value.event;
                var conds = pair.value.conditions;

                // JotForm.info("Has Condition:", field, $(field));
                // If field is not found then continue
                if (!$(field)) {
                    return;
                }
                if (event == "autocomplete") { // if event type is trigger by autocomplete, listen to blur and keyup events
                    $(field).observe('blur', function () {
                        $A(conds).each(function (cond) {
                            JotForm.checkCondition(cond, field, 'blur');
                        });
                    }).run('blur');
                    $(field).observe('keyup', function () {
                        $A(conds).each(function (cond) {
                            JotForm.checkCondition(cond, field, 'keyup');
                        });
                    }).run('keyup');
                } else if (event == "number") {
                    $(field).observe('change', function () {
                        $A(conds).each(function (cond) {
                            JotForm.checkCondition(cond, field, 'change');
                        });
                    }).run('change');
                    $(field).observe('keyup', function () {
                        $A(conds).each(function (cond) {
                            JotForm.checkCondition(cond, field, 'keyup');
                        });
                    }).run('keyup');
                } else if (event == "autofill") {
                    $(field).observe('blur', function () {
                        $A(conds).each(function (cond) {
                            JotForm.checkCondition(cond, field, 'blur');
                        });
                    }).run('blur');
                    $(field).observe('keyup', function () {
                        $A(conds).each(function (cond) {
                            JotForm.checkCondition(cond, field, 'keyup');
                        });
                    }).run('keyup');

                    if (!(!Prototype.Browser.IE9 && !Prototype.Browser.IE10 && Prototype.Browser.IE)) {
                        $(field).observe('change', function () {
                            $A(conds).each(function (cond) {
                                JotForm.checkCondition(cond, field, 'change');
                            });
                        }).run('change');
                    }
                } else {
                    $(field).observe(event, function () {
                        $A(conds).each(function (cond) {
                            JotForm.checkCondition(cond, field, event);
                        });
                    });
                    if (!$(field).id.match(/input_[0-9]+_quantity_[0-9]+_[0-9]+/)) { // b#652068 (do not auto-run condition events on quantity fields)
                        $(field).run(event);
                    } else {
                        JotForm.runConditionForId(field.replace('input_', ''));
                    }
                }
            });
        } catch (e) {
            JotForm.error(e);
        }
    },

    /**
     * Sets field values to be duplicated before encryption
     * These fields are needed by some payment gateways, integrations, and email-type conditions
     * for example, braintree gets the first email field on the form
     * but it should be unencrypted, so we duplicate the original value
     * before encryption (at JotForm.encryptAll)
     */

    setFieldsToPreserve: function (preset) {

        // gateways that need these fields
        var gateways = [
            "braintree",
            "dwolla",
            "stripe",
            "paypal",
            "paypalpro",
            "paypalexpress",
            "authnet"
        ];

        var getPaymentFields = $$('input[name="simple_fpc"]').length > 0 && gateways.indexOf($$('input[name="simple_fpc"]')[0].getAttribute('data-payment_type')) > -1;

        var paymentExtras = [{
            type: "phone",
            pattern: /Phone|Contact/i
        }, {
            type: "email",
            pattern: /email|mail|e-mail/i
        }, {
            type: "company",
            pattern: /company|organization/i
        }];

        var eligibleFields = $$('.form-line[data-type*="email"],' +
            '.form-line[data-type*="textbox"],' +
            '.form-line[data-type*="phone"],' +
            '.form-line[data-type*="dropdown"],' +
            '.form-line[data-type*="radio"]');
        // arrange all fields by id
        sortedFields = eligibleFields.sort(function (a, b) {
            return Number(a.id.replace("id_", "")) - Number(b.id.replace("id_", ""));
        });

        var paymentFieldsToPreserve = {}; // holder for payment fields (max 3; see paymentExtras)
        // collect fields whose values need to be duplicated prior to encryption
        sortedFields.each(function (field) {
            var fieldId = field.id.replace('id_', '');
            var fieldName = field.down('input, select').name.replace(/q\d+_/, "");
            var fieldType = field.getAttribute('data-type').replace('control_', '');
            // find and match payment extras (total of 3; email, phone, company)
            if (getPaymentFields && Object.keys(paymentFieldsToPreserve).length < 3) {
                paymentExtras.each(function (extra) {
                    /*
                     valid form field type
                     email =>  email and textbox
                     phone =>  phone field and textbox
                     company => textbox only
                     */
                    if (fieldType == 'textbox' || fieldType == extra.type) {
                        var label = field.down('label').innerHTML.strip();
                        if (extra.pattern.exec(label) && !paymentFieldsToPreserve[extra.type]) {
                            paymentFieldsToPreserve[extra.type] = fieldId;
                            if (JotForm.fieldsToPreserve.indexOf(fieldId) === -1) {
                                JotForm.fieldsToPreserve.push(fieldId);
                            }
                        }
                    }
                });
            }
            // preset is an array of question ids and/or question names set at build_source.js
            // if it matches eligible fields on the form, add it to the list
            if (preset && JotForm.fieldsToPreserve.indexOf(fieldId)
                && (preset.indexOf(fieldName) > -1 || preset.indexOf(fieldId) > -1))
            {
                JotForm.fieldsToPreserve.push(fieldId);
            }
        });
    },

    /**
     * Changes payment strings upon form load
     * @param {type} text
     * @returns {undefined}
     */

    changePaymentStrings: function (text) {
        if ($('coupon-header') && text.couponEnter) {
            $('coupon-header').innerHTML = text.couponEnter;
        }
        if ($('shipping-text') && text.shippingShipping) {
            $('shipping-text').innerHTML = text.shippingShipping;
        }
        if ($('tax-text') && text.taxTax) {
            $('tax-text').innerHTML = text.taxTax;
        }
        if ($('subtotal-text') && text.totalSubtotal) {
            $('subtotal-text').innerHTML = text.totalSubtotal;
        }
        if ($('total-text') && text.totalTotal) {
            $('total-text').innerHTML = text.totalTotal ;
        }
    },

    handleSubscriptionPrice: function () {
        // safari fix (input focus bug)
        if (navigator.userAgent.toLowerCase().indexOf('safari/') > -1) {
            $$('.form-product-custom_price').each(function (inp) {
                // form-product-custom_price
                inp.onclick = function (e) {
                    e.preventDefault();
                };
            })
        }
        var inputs = $$('input[data-price-source]');
        if (inputs.length < 1) {
            return;
        }
        var priceSources = [];
        var events = {};
        inputs.each(function (inp) {
            var sourceId = inp.getAttribute('data-price-source');
            var source = $('input_' + sourceId);

            if (!source) {
                return;
            }

            if (!events[sourceId]) {
                events[sourceId] = [];
            }

            var getVal = function () {
                var val = source.value;
                if (typeof val !== 'number') {
                    val = val.replace(/[^0-9\.]/gi, "");
                }
                return !isNaN(val) && val > 0 ? val : 0;
            }
            // collect source fields
            priceSources.push(source);

            // collect events
            events[sourceId].push(function() {
                inp.value = getVal();
            });
        });

        // attach events to source fields
        priceSources.each(function (source) {
            var id = source.id.replace('input_', '');
            source.onkeyup = function () {
                events[id].each(function (evt) {
                    evt();
                });
                JotForm.countTotal(); // re-count total
            };

        });
    },

    /*
     * Handles payment donations
     */

    handleDonationAmount: function () {
        // donation amount input
        var donationField = JotForm.donationField = $$('input[id*="_donation"]')[0];
        // default
        JotForm.paymentTotal = donationField.value || 0;
        // observe changes
        var prevInput = '';
        // predefined options in cardform
        if (window.FORM_MODE === "cardform") {
            var donationPredefinedRadios = $$('input[class*="js-donation-suggestion"]');
            donationPredefinedRadios.each(function(radio) {
                radio.observe('click', function (e) {
                    JotForm.paymentTotal = e.target.value;
                })
            })
        }
        // // prevent price autofilling in donations after back navigation
        // if(performance?.getEntriesByType && performance.getEntriesByType("navigation")[0]?.type === 'back_forward'){
        //     donationField.setAttribute('autocomplete', 'off');
        //     donationPredefinedRadios && donationPredefinedRadios.each( function(e){
        //         e.setAttribute('autocomplete', 'off')
        //     })
        // }
        donationField.observe('input', function () {
            var donationRegex = new RegExp(/^([0-9]*)(\.[0-9]{0,2})?$/);
            if (this.value.match(donationRegex)) {
                JotForm.paymentTotal = prevInput = this.value;
            } else {
                JotForm.paymentTotal = this.value = prevInput;
            }
        });
        // if donation gets its amount from a calculation widget
        if ($$('input[id*="_donation"]')[0].getAttribute('data-custom-amount-field') > 0) {
            JotForm.donationSourceField = $('input_' + donationField.getAttribute('data-custom-amount-field'));
            // if calculation widget does not exist
            if (!JotForm.donationSourceField) {
                $$('input[id*="_donation"]')[0].removeAttribute('readonly');
                return;
            }
            // get value from calculation widget
            setTimeout(function () {
                JotForm.updateDonationAmount();
                donationField.triggerEvent('keyup');
            }, 1000);
            // observe calc widget value changes
            JotForm.donationSourceField.observe('keyup', JotForm.updateDonationAmount);
            JotForm.donationSourceField.observe('change', JotForm.updateDonationAmount);
        // if donation field requires a minimum amount
        } else if (donationField.hasAttribute('data-min-amount')) {
            var currency = donationField.nextSibling.textContent.strip();
            var minAmount = parseFloat(donationField.readAttribute('data-min-amount'));
            donationField.validateMinimum = function () { // called at setFieldValidation
                var val = this.getValue();
                if (isNaN(val) || val < minAmount) {
                    var errorTxt = JotForm.texts.ccDonationMinLimitError.replace('{minAmount}', minAmount).replace('{currency}', currency);
                    return JotForm.errored(donationField, errorTxt);
                } else {
                    return JotForm.corrected(donationField);
                }
            };
        }
    },

    /**
     * Updates donation with a specified amount or amount taken from source field (calculation widget)
     * @param amount
     */
    updateDonationAmount: function (amount) {
        if (!JotForm.donationSourceField // source field is missing
            || JotForm.donationField.up('.form-line.form-field-hidden') // skip if hidden by condition; it will be updated when shown again (JotForm.showField)
            || JotForm.donationField.up('ul.form-field-hidden'))
        { return; }
        // amount is specified
        if (['undefined', 'object'].indexOf(typeof amount) === -1) {
            JotForm.donationField.value = JotForm.paymentTotal = amount;
            return;
        }
        var getVal = function () {
            var val = JotForm.donationSourceField.value;

            var sourceField = JotForm.calculations.find(function(c){
                return c.resultField === JotForm.donationSourceField.id.split("_")[1];
            });

            if (sourceField && sourceField.useCommasForDecimals === "1"){
              val = val.replace(",",".");
            }

            if (typeof val !== 'number') {
                val = val.replace(/[^0-9\.]/gi, "");
            }
            return !isNaN(val) && val > 0 ? val : 0;
        }
        JotForm.donationField.value = JotForm.paymentTotal = getVal();

        if(window.FORM_MODE && window.FORM_MODE == 'cardform') {
            JotForm.donationField.parentNode.addClassName('isFilled');
        }
    },

    /**
     * New Product UI
     * Will be removed after requirement completed
     */
    isComparePaymentFormV1: function() {
        var queryParameters = window.location.search.substring(1);
        return queryParameters === "comparePaymentForm=v1" ? true : false;
    },

    /**
     * Checks whether form should process a payment
     * @returns {Boolean}
     */

    isPaymentSelected: function () {
        var selected = false;
        var inputSimpleFpc = document.querySelector('input[name="simple_fpc"]');
        var paymentFieldId = inputSimpleFpc && inputSimpleFpc.value;
        var paymentField = $('id_' + paymentFieldId);

        if (!paymentField) {
            // should return true if it's a hidden single product
            // see showSingle property for payment field (v4-fields)
            return !!inputSimpleFpc;
        }

        if (paymentField.hasClassName('form-field-hidden')
            || paymentField.up('ul.form-section').hasClassName('form-field-hidden')
            // In case section that contains payment field is hidden/shown conditionally.
            // This case should have been handled in the `if` below but JotForm.getSection skips
            // sections that have id starting with "section_".
            || (paymentField.up('ul.form-section-closed') &&
                paymentField.up('ul.form-section-closed').hasClassName('form-field-hidden')))
        {
            return false;
        }

        if (!inputSimpleFpc) {
            return false;
        }
        // if with payment field but hidden by condition
        // or inside conditionally-hidden (not collapsed) form collapse section
        if (paymentField && (paymentField.getStyle('display') === "none"
            || !JotForm.isVisible(paymentField) && JotForm.getSection(paymentField).id)
        ) {
            return false;
        }

        // Jotform Store Builder selected product control
        if (window.paymentType === 'product' && (window.JFAppsManager && window.JFAppsManager.checkoutKey && window.JFAppsManager.cartProductItemCount > 0)) {
            return true;
        }

        // if this is a multi-item product or subscription
        if (window.productID) {
            // check if at least one product is selected
            $H(window.productID).each(function (pair) {
                var elem = $(pair.value);
                if (elem && elem.checked) {
                    // get quantity field/s
                    var quantityField = elem.up().select('select[id*="_quantity_"],input[id*="_quantity_"]');
                    // if no quantity option or quantity is selected
                    selected = quantityField.length === 0 || (quantityField.length === 1 && quantityField[0].getValue() > 0);
                    // if payment has subproducts
                    if (quantityField.length > 1) {
                        selected = quantityField.any(function (qty) {
                            return qty.getValue() > 0;
                        });
                    }
                    if (selected) { throw $break; }
                }
            });
            // if this is a donation
        } else if ($('input_' + paymentFieldId + '_donation')) {
            var elem = $('input_' + paymentFieldId + '_donation');
            if (/^\d+(?:\.\d+)?$/.test(elem.getValue())) {
                selected = elem.getValue() > 0;
            }
            // if this is a hidden single item
        } else {

            var productField = $$('input[name*="q' + paymentFieldId + '"][type="hidden"]');

            if (productField.length < 1) {
                return false;
            }

            if (productField[0].readAttribute('selected') === 'false') {
                productField[0].remove();
                return false;
            }

            return true;
        }
        return selected;
    },

    /**
     * Toggles between paypal button and regular submit button
     * @param {type} show
     * @returns {unresolved}
     */

    togglePaypalButtons: function (show) {
        var paymentFieldId = $$('input[name="simple_fpc"]')[0].value;
        // if this is paypal pro and credit card payment is selected
        if ($('input_' + paymentFieldId + '_paymentType_express')
            && !$('input_' + paymentFieldId + '_paymentType_express').checked) {
            show = false;
        }
        // if checkout button is not to be used
        if ($$('.paypal-button').length < 1 || !$('use_paypal_button')) {
            return;
        }
        // replace all submit buttons with express checkout buttons
        $$('.form-submit-button').each(function (btn) {
            if (show) {
                if (btn.up().down('.paypal-button')) {
                    btn.up().down('.paypal-button').show();
                    btn.hide();
                }
            } else {
                if (btn.up().down('.paypal-button')) {
                    btn.up().down('.paypal-button').hide();
                }
                btn.show();
            }
        });
    },

    /*
     * Handles toggling between PayPal checkout buttons
     * and ordinary submit buttons
     * @returns {undefined}
     */

    handlePaypalButtons: function () {
        var products = window.productID;
        var requiredPayment = false;
        var paymentFieldId = $$('input[name="simple_fpc"]')[0].value;
        // check if payment is required
        if (products) {
            $H(products).each(function (p) {
                // if required
                if ($(p.value).getAttribute('class').indexOf('[required]') > -1) {
                    requiredPayment = true;
                    throw $break;
                }
            });
        } else if ($('input_' + paymentFieldId + '_donation')) {
            requiredPayment = $('input_' + paymentFieldId + '_donation').getAttribute('class').indexOf('required') > -1;
        }
        // toggle upon form load
        JotForm.togglePaypalButtons(requiredPayment || JotForm.isPaymentSelected());

        // set button trigger if payment is not required
        if (!requiredPayment) {
            $H(products).each(function (p) {
                $(p.value).observe('click', function () {
                    JotForm.togglePaypalButtons(JotForm.isPaymentSelected());
                });
            });
        }
    },

    paymentDropdownHandler: function(uid, onChange) {
        var dropdown = null;

        if (uid) {
            dropdown = $(uid);
        } else if ($$('.payment-dropdown').length > 0) {
            dropdown = $$('.payment-dropdown')[0];
        }

        if (!dropdown){ return; };

        var selectArea = $(dropdown).select('.select-area')[0];
        var selectedValueArea = $(selectArea).select('.selected-value')[0];
        var options = $(dropdown).select('.option');

        $A(options).each(function(option){
            option.observe('click', function(event){
                var option = $(event.target);
                var optionVal = option.readAttribute('data-value');
                var selectedOption = {};

                // Step-3: Find selected categories
                $A(options).each(function(opt){
                    if ($(opt).readAttribute('data-value') === optionVal){
                        selectedOption = {
                            label: opt.innerText.trim(),
                            value: optionVal
                        };
                    }
                });

                // Step - 5 : Update the selected-value
                if (!selectedOption.value || selectedOption.value === 'clear') {
                    $(dropdown).removeClassName('option-selected');
                } else {
                    $(dropdown).addClassName('option-selected');
                }

                if (selectedOption.value !== 'clear') {
                    selectedValueArea.innerText = selectedOption.label;
                } else {
                    selectedValueArea.innerText = '';
                }

                $(dropdown).removeClassName('open');
                selectArea.setAttribute('aria-expanded', 'false');

                onChange(selectedOption);
            });
        });

        selectArea.observe('click', function(event){
            if (dropdown.hasClassName('open')){
                dropdown.removeClassName('open');
                selectArea.setAttribute('aria-expanded', 'false');
            } else {
                dropdown.addClassName('open');
                selectArea.setAttribute('aria-expanded', 'true');
            }
        });

        window.onclick = function(event){
            if ($(event.target) && !$(event.target).up('#payment-sorting-products-dropdown')) {
                dropdown.removeClassName('open');
            }
        }
    },

    /**
     * Handles multi-select dropdown controls
     * @returns{undefined}
    */
    multiSelectDropdownHandler: function(onChange){
        var dropdown = $$('.multi-select-dropdown').length > 0 ? $$('.multi-select-dropdown')[0] : null;
        if (!dropdown){ return; };

        var selectArea = $(dropdown).select('.select-area')[0];
        var selectedValueArea = $(selectArea).select('.selected-values')[0];
        var options = $(dropdown).select('.option');
        var dropdownHint = selectArea.down('.dropdown-hint');

        $A(options).each(function(option){
            option.observe('click', function(event){
                var clickedItem = $(event.target);
                var option = $(event.target).up('.option') || $(event.target);
                var input = option.select('input')[0];
                var clickedItemValue = input.value;
                var selectedOptions = [];

                // Step-1: Set input value
                if (clickedItem.nodeName !== 'INPUT'){ input.checked = !input.checked; } // If clickedItem dom type is not input, check it.

                // Step-2: Clear and set initial class value
                if (input.checked) { // If true; it means we will enable to selection.
                    // If all selected; clear other categories
                    if (clickedItemValue === 'All'){
                        $A(options).each(function(opt){
                            var inp = opt.select('input')[0];
                            if (inp.value !== 'All') {
                                inp.checked = false;
                                opt.removeClassName('selected');
                            }
                        });
                    } else { // If another categories selected, clear only "all" option.
                        options[0].removeClassName('selected').select('input')[0].checked = false;
                    }

                    option.addClassName('selected');
                } else {
                    option.removeClassName('selected');
                }

                // Step-3: Find selected categories
                $A(options).each(function(opt){
                    if (opt.hasClassName('selected')){
                        selectedOptions.push({
                            label: opt.down('span').innerText,
                            value: opt.down('input').value
                        });
                    }
                });

                // Step-4: If select all enabled
                if (dropdown.hasClassName('hasSelectAll') && selectedOptions.length === 0){
                    options[0].addClassName('selected').select('input')[0].checked = true;
                    selectedOptions.push({
                        label: options[0].down('span').innerText,
                        value: options[0].down('input').value
                    });
                }

                // Step - 5 : Update the selected-value
                if (selectedOptions[0] === 'All') {
                    dropdownHint.show();
                } else {
                    dropdownHint.hide();
                }

                var selectedOptionsValues = [];
                var selectedOptionsLabel = [];
                $A(selectedOptions).each(function(s) {
                    selectedOptionsLabel.push(s.label);
                    selectedOptionsValues.push(s.value);
                });

                selectedValueArea.innerText = selectedOptionsLabel.join(', ');
                onChange(selectedOptions, selectedOptionsLabel, selectedOptionsValues);
            });
        });

        selectArea.observe('click', function(event){
            if (dropdown.hasClassName('open')){
                dropdown.removeClassName('open');
                selectArea.setAttribute('aria-expanded', 'false');
            } else {
                dropdown.addClassName('open');
                selectArea.setAttribute('aria-expanded', 'true');
            }
        });

        window.onclick = function(event){
            if ($(event.target) && (!$(event.target).up('#payment-category-dropdown') && !$(event.target).up('#payment-sorting-products-dropdown'))) {
                dropdown.removeClassName('open');
            }
        }
    },

    /**
     * Handles category dropdown controls for Payment Fields
     * @returns{undefined}
     */

    handleProductCategoryDropdown: function (){
        this.multiSelectDropdownHandler(function(selectedCategories, selectedCategoriesLabels, selectedCategoriesValues){ // onChange
            var dropdown = $('payment-category-dropdown');
            var allCategoryTitles = $$('.form-product-category-item');
            var isCategoryTitleEnabled = dropdown && dropdown.hasClassName('category-title-enabled');
            var products = $$('.form-product-item');

            if (products.length === 0){ return; }

            // Handle Products
            // Handle Products
            $A(products).each(function(p){
                var product = $(p);
                product.removeClassName('not-category-found');

                if (selectedCategories[0].value !== 'All'){
                    if (!isCategoryTitleEnabled){
                        var productCategories = product.getAttribute('categories') ? product.getAttribute('categories').split(',') : [];

                        if (productCategories){
                            var isCategoryFound = false;

                            $A(productCategories).each(function(productCategory){
                                if (selectedCategoriesValues.indexOf(productCategory) > -1){
                                    isCategoryFound = true;
                                }
                            });

                            if (!isCategoryFound){
                                product.addClassName('not-category-found');
                            }
                        }
                    } else {
                        if (selectedCategoriesValues.indexOf(product.getAttribute('active-category')) === -1){
                            product.addClassName('not-category-found');
                        }
                    }
                }
            });

            if (allCategoryTitles.length === 0 && !isCategoryTitleEnabled){ return; }

            // Handle Category Titles
            $A(allCategoryTitles).each(function(categoryTitle){
                categoryTitle.removeClassName('not-category-found');

                if (selectedCategories[0].value !== 'All'){
                    if (selectedCategoriesValues.indexOf(categoryTitle.getAttribute('category')) === -1){
                        categoryTitle.addClassName('not-category-found');
                    } else {
                        categoryTitle.removeClassName('not-category-found');
                    }
                }
            });
        });
    },

    initPaymentProperties: function(initValues) {
        try {
            if (!initValues) { return; }
            if (Object.keys(initValues).length === 0) { return; }
            JotForm.paymentProperties = JSON.parse(initValues);
        } catch (err) {
            console.error(err);
        }
    },

    /*
     * Checks whether form is embedded or not
     * Sends url of the form's parent page
     * @returns {undefined}
     */
    checkEmbed: function () {
        var form = $$('.jotform-form')[0];
        if (window !== window.top) {
            form.insert(new Element('input', {
                type: 'hidden',
                name: 'embedUrl'
            }).putValue(document.referrer));
            if (JotForm.debug) {
                console.log(document.referrer);
            }
        }
    },
    /*
     * Checks whether form is opened within a pwa or not
     * Sends pwa id 
     * @returns {undefined}
     */
    checkPwa: function() {
        if (window.location.href.indexOf('jotform_pwa=1') > -1) {
            if (window.location.href.indexOf('pwa_id=') === -1) {
                return new Error('AppId couldn\'t be found!');
            }

            var form = $$('.jotform-form')[0];
            var hiddenInputs = [
                { name: 'jotform_pwa', val: 1 },
                { name: 'pwa_id', val: document.get.pwa_id },
                { name: 'pwa_isPWA' },
                { name: 'pwa_device' }
            ];
            hiddenInputs.each(function (inp) {
                if (inp.val || document.get[inp.name]) {
                    form.insert(new Element('input', {
                        type: 'hidden',
                        name: inp.name
                    }).putValue(inp.val || document.get[inp.name]));
                }
            });
        }
    },
    /**
     * Handles Paypal Express actions
     * @returns {undefined}
     */

    handlePaypalExpress: function () {
        if (typeof _paypalExpress !== "function" || $('express_category').getAttribute('data-digital_goods') === "No") {
            return;
        }
        var paypalExpress = new _paypalExpress();
        paypalExpress.init();
    },

    /**
     * Handles echeck actions
     * @returns {undefined}
     */

    handleEcheck: function () {
        if (typeof _echeck !== "function") {
            return;
        }
        var echeck = new _echeck();
        echeck.init();
    },

    /**
     * Handles Braintree payments
     */

    handleBraintree: function () {
        // skip on edit mode
        if (window.location.pathname.match(/^\/edit/) || (["edit", "inlineEdit", "submissionToPDF"].indexOf(document.get.mode) > -1 && document.get.sid)) {
            return;
        }
        if (typeof __braintree !== "function") {
            alert("Braintree payment script didn't work properly. Form will be reloaded");
            location.reload();
            return;
        }
        JotForm.braintree = __braintree();
        JotForm.braintree.init();
    },

    handlePagseguro: function () {
      // skip on edit mode
      if (window.location.pathname.match(/^\/edit/) || (["edit", "inlineEdit", "submissionToPDF"].indexOf(document.get.mode) > -1 && document.get.sid)) {
        return;
      }
      if (typeof __pagseguro !== "function") {
        alert("PagSeguro payment script didn't work properly. Form will be reloaded");
        location.reload();
        return;
      }
      JotForm.pagseguro = __pagseguro();
      JotForm.pagseguro.init();
    },

    handleSquare: function () {
        // skip on edit mode
        if (/*JotForm.paidSubmission && */(window.location.href.match(/mode=inlineEdit/) || window.location.pathname.match(/^\/\/edit/) || window.location.pathname.match(/^\/edit/) || window.location.href.match(/mode=submissionToPDF/)) && document.get.sid) { // ["edit", "inlineEdit", "submissionToPDF"].indexOf(document.get.mode) > -1 does not work, JotForm.paidSubmission is unreachable from here (set in form.edit.mode.js)
            return;
        }

        // force https on standalone forms
        if (window === window.top) {
            if (window.location.protocol !== 'https:') {
                window.location.href = window.location.href.replace('http', 'https');
                return;
            }
        }

        if (typeof __square !== "function") {
            alert("Square payment script didn't work properly. Form will be reloaded");
            location.reload();
            return;
        }
        JotForm.squarePayment = __square();
        JotForm.squarePayment.loadSquareScript(function() {
          JotForm.squarePayment.init();
        });
    },

    handleStripeACH: function () {
      if (JotForm.isEditMode()) return;

      if (typeof __stripeACH === "undefined") {
        alert("Stripe ACH payments script didn't work properly. Form will be reloaded. ");
        location.reload();
        return;
      }

      JotForm.stripeACH =  __stripeACH;
      JotForm.stripeACH.init();
    },
    
    handleMollie: function () {
      if (JotForm.isEditMode()) return;
      
      if (typeof __mollie === "undefined") {
        alert("Mollie script didn't work properly. Form will be reloaded. ");
        location.reload();
        return;
      }
      
      JotForm.mollie =  __mollie;
      JotForm.mollie.init();
    },
  
    handleBluepay: function () {
      if (JotForm.isEditMode()) return;
      
      if (typeof __bluepay === "undefined") {
        alert("Bluepay script didn't work properly. Form will be reloaded. ");
        location.reload();
        return;
      }
      
      JotForm.bluepay =  __bluepay;
      JotForm.bluepay.init();
    },
  
    handlePaypalSPB: function () {
      JotForm.paypalSPB = __paypalSPB;
      try {
        JotForm.paypalSPB.init();
        JotForm.paypalSPB.render();
      } catch(e) {
        console.error(e);
        if (typeof e === 'string') {
          alert(e);
          return;
        }
        alert("There was a problem with PayPal Smart Payment Buttons integration.");
      }
    },

    /**
     * Handles the payment subproducts behavior
     */

    handlePaymentSubProducts: function () {

        var heights = [];                   // container for the heights of the products when opened and closed
        var optionValues = [];              // container for the values of the properties when opened and closed
        var sections = $$('.form-section'); // get the sections if there are page breaks
        var productPage = false;            // page where the payment field is

        $$('.form-product-has-subproducts').each(function (sp) {

            var wasHidden = (sp.up(".form-line") && sp.up(".form-line").hasClassName("form-field-hidden")) ? sp.up(".form-line").show() : false;

            // if this form has page breaks,
            if (sections.length > 1) {
                // get the page where the payment field is
                productPage = productPage ? productPage : sections.filter(function (p) {
                    return sp.descendantOf(p) && sp.up('.form-section') === p;
                })[0];
                // if this page is hidden
                if (!productPage.isVisible()) {
                    // show page temporarily
                    productPage.setStyle({'display': 'block'});
                    // get the height of the product
                    heights[sp.id] = [sp.parentNode.getHeight(), $$('label[for="' + sp.id + '"]')[0].getHeight()];
                    // hide the page
                    productPage.setStyle({'display': 'none'});
                } else {
                    heights[sp.id] = [sp.parentNode.getHeight(), $$('label[for="' + sp.id + '"]')[0].getHeight()];
                }
            } else {
                heights[sp.id] = [sp.parentNode.getHeight(), $$('label[for="' + sp.id + '"]')[0].getHeight()];
            }

            sp.observe('click', function () {
                showSubProducts(this);
            });

            if(wasHidden) {
                sp.up(".form-line").hide();
            }
        });

        function showSubProducts(el) {

            var productSpan = el.parentNode;

            if (!el.checked) {
                productSpan.shift({
                    height: heights[el.id][1],
                    duration: 0.3,
                    onEnd: JotForm.handleIFrameHeight
                });

              // if product has expanded options/subproduct and product has a description
              if (el.value && el.value.indexOf('_expanded') > -1 && productSpan.querySelector('.form-product-description') && productSpan.querySelector('.form-product-description').childNodes[0] && productSpan.querySelector('.form-product-description').childNodes[0].nodeValue.trim() !== "") {
                  productSpan.shift({
                    height: heights[el.id][1]+20
                  });
                }
                // clear the values array
                optionValues[el.id] = [];


                JotForm.clearProductValues(el, optionValues);
            } else {
                productSpan.shift({
                    height: heights[el.id][0] - 10,
                    duration: 0.3,
                    onEnd: JotForm.handleIFrameHeight
                });
                // populate values
                JotForm.populateProductValues(el, optionValues);
            }
            // resume calculation
            setTimeout(function () {
                JotForm.totalCounter(JotForm.prices)
            }, 300);
        };
    },

    clearProductValues: function (el, optionValues) {
        $$('#' + el.id + '_subproducts select,' + '#' + el.id + '_subproducts input[type="text"]').each(function (field, i) {
            // capture the values
            var fieldValue = field.tagName === "select" ? field.getSelected().value : field.value;
            if (fieldValue) {
                optionValues[el.id].push([field.id, fieldValue]);
            }
            // pause calculation functions to avoid potential browser crash
            field.stopObserving();
            // clear values
            if (field.tagName === "SELECT") {
                field.selectedIndex = 0;
            } else {
                field.value = 0;
            }
        });
    },

    clearProductValuesV1: function (el, optionValues) {
        $$('#' + el.id + '_subproducts select,' + '#' + el.id + '_subproducts input[type="text"]').each(function (field, i) {
            // capture the values
            var fieldValue = field.tagName === "select" ? field.getSelected().value : field.value;
            if (fieldValue) {
                optionValues[el.id].push([field.id, fieldValue]);
            }
            // pause calculation functions to avoid potential browser crash
            field.stopObserving('blur');
            field.stopObserving('focus');

            // clear values
            if (field.tagName === "SELECT") {
                field.selectedIndex = 0;
            } else {
                field.value = 0;
            }
        });
    },

    populateProductValues: function (el, optionValues) {
        if (optionValues[el.id] && optionValues[el.id].length > 0) {
            optionValues[el.id].each(function (vv) {
                // pause calculation functions to avoid potential browser crash
                $(vv[0]).stopObserving();
                $$("#" + vv[0] + ".form-product-custom_quantity").each(function(el, i){el.observe('blur', function(){isNaN(this.value) || this.value < 1 ? this.value = '0' : this.value = parseInt(this.value)})}); // Add event listeners again when re-opening the sub products
                $$("#" + vv[0] + ".form-product-custom_quantity").each(function(el, i){el.observe('focus', function(){this.value == 0 ? this.value = '' : this.value})});;
                if ($(vv[0]).tagName === "SELECT") {
                    $(vv[0]).selectOption(vv[1]);
                } else {
                    $(vv[0]).value = vv[1];
                }
            });
        }
    },

    populateProductValuesV1: function(el, optionValues) {
        if (optionValues[el.id] && optionValues[el.id].length > 0) {
            optionValues[el.id].each(function (vv) {
                // pause calculation functions to avoid potential browser crash
                $(vv[0]).stopObserving('blur');
                $(vv[0]).stopObserving('focus');

                $$("#" + vv[0] + ".form-product-custom_quantity").each(function(el, i){el.observe('blur', function(){isNaN(this.value) || this.value < 1 ? this.value = '0' : this.value = parseInt(this.value)})}); // Add event listeners again when re-opening the sub products
                $$("#" + vv[0] + ".form-product-custom_quantity").each(function(el, i){el.observe('focus', function(){this.value == 0 ? this.value = '' : this.value})});;

                if ($(vv[0]).tagName === "SELECT") {
                    if (vv[1] !== "0") {
                        $(vv[0]).selectOption(vv[1]);
                    }
                } else {
                    $(vv[0]).value = vv[1];
                }
            });
        }
    },

    handlePaymentSubProductsV1: function () {
      var selectedValues = [];

      $$('.form-product-has-subproducts').each(function (sp) {
          sp.observe('click', function () {
              if (sp.checked) {
                  sp.up(".form-product-item").classList.remove('sub_product');
                  sp.up(".form-product-item").classList.add('show_sub_product');
                  JotForm.populateProductValuesV1(sp, selectedValues);
              } else {
                  sp.up(".form-product-item").classList.remove('show_sub_product');
                  sp.up(".form-product-item").classList.add('sub_product');
                  selectedValues[sp.id] = [];
                  JotForm.clearProductValuesV1(sp, selectedValues);
                  if (typeof PaymentStock !== 'undefined') {
                    PaymentStock.handleStockManagement();
                  }
              }
              JotForm.countTotal();
          });
      });
    },

    /**
     * handles toggling of lightbox for product images
     */
    handleProductLightbox: function () {
        $$('.form-product-image-with-options').forEach(function (image) {
            image.observe('click', function () {
                var pid = image.up('.form-product-item').getAttribute('pid');
                if (isIframeEmbedFormPure()) {
                    onProductImageClicked(pid, true);
                } else {
                    onProductImageClicked(pid, false);
                }
            });
        });
    },

    /*
     * sets currency formatting for payment fields
     */

    setCurrencyFormat: function (curr, useDecimal, decimalMark) {
        // currencies without decimal values
        var noDecimal = ['BIF', 'CLP', 'DJF', 'GNF', 'JPY', 'KMF', 'KRW', 'MGA', 'PYG', 'RWF', 'VUV', 'XAF', 'XOF', 'XPF'];
        var decimalPlaces = noDecimal.indexOf(curr) > -1 || !useDecimal ? 0 : 2;
        this.currencyFormat = {
            curr: curr,
            dSeparator: decimalMark == "comma" ? "," : ".",
            tSeparator: decimalMark == "comma" ? "." : ",",
            decimal: decimalPlaces,
            decimalMark: decimalMark
        };
    },

    /**
     * Calculates the payment total with quantites
     * @param {Object} prices
     */
    countTotal: function (prices) {
        var prices = prices || JotForm.prices;
        var discounted = false;
        var roundAmount = function (num, decimalPlaces) {
            return parseFloat(JotForm.morePreciseToFixed(num, decimalPlaces));
        }
        // If a coupon is entered and verified
        if (Object.keys(JotForm.discounts).length > 0) {
            discounted = true;
            // if this is a discount for order total
            if (JotForm.discounts.total || JotForm.discounts.shipping) {
                var type = JotForm.discounts.type,
                    rate = JotForm.discounts.rate,
                    minimum = JotForm.discounts.minimum,
                    code = JotForm.discounts.code;

            } else {
                // If for product items
                for (var pid in prices) {
                    for (var kkey in JotForm.discounts) {
                        if (pid.indexOf(kkey) !== -1) {
                            prices[pid].discount = JotForm.discounts[kkey];
                        }
                    }
                }
            }
        } else {
            $H(prices).each(function (p) {
                delete prices[p.key].discount;
            });
        }

        var total = 0;          // total for the whole payment field
        var totalWithoutDiscount = 0;
        var subTotal = 0;       // subTotal for all items selected, excluding shipping or taxes
        var subTotalWithoutDiscount = 0;
        var itemSubTotal = [];  // subTotal for a group of subproducts
        var shippingTotal = 0;  // total shipping cost
        var taxTotal = 0;       // total tax cost
        var taxTotalWithoutDiscount = 0;       // total tax cost
        var otherTotal = 0;     // shipping and tax total
        var otherTotalWithoutDiscount = 0;     // shipping and tax total
        var taxRate = 0;        // uniform tax rate (percentage) for the non-exempted products
        var currency = JotForm.currencyFormat.curr; // number of decimal places to use
        var decimal = JotForm.currencyFormat.decimal; // number of decimal places to use
        var dSeparator = JotForm.currencyFormat.dSeparator;
        var tSeparator = JotForm.currencyFormat.tSeparator;
        var decimalMark = JotForm.currencyFormat.decimalMark;
        var flatShipping = 0;
        var products = 0;
        var formProductItem = null;

        var pricingInformations = [];     // This variable holds each item informations
        var noCostItems = [];
        $H(prices).each(function (pair) {
            var parsedPair = pair.key.split("_");
            var label = parsedPair[0] + '_' + parsedPair[1] + '_' + parsedPair[2];
            formProductItem = $(label) ? $(label).up('.form-product-item') : null;
            formProductInput = formProductItem && formProductItem.down('.form-product-input');

            if ((!JotForm.couponApplied && formProductInput && !formProductInput.checked) && pair.value.specialPriceField === undefined) { return; }

            var itemName = formProductItem && formProductItem.down('.form-product-name') && formProductItem.down('.form-product-name').textContent.trim();

            if (!itemName) {
                itemName =  $$('#' + label + '+ .product__header')[0] && $$('#' + label + '+ .product__header .product__title')[0].textContent.trim();
            }

            if (pair.value.price == "custom") {
                if ($(pair.key) && $(pair.key).checked) {
                    subTotal = parseFloat($(pair.key + '_custom_price').getValue());
                    subTotalWithoutDiscount = subTotal;
                }
                // return;
            }

            if ($(pair.value.quantityField)) {
              if (pair.value.quantityField && !(parseInt($(pair.value.quantityField).getValue()) > 0)) {
                // skip calculation if quantity is zero and is not a subproduct
                if (!$(pair.value.quantityField).hasClassName('form-subproduct-quantity')) { return; }
              }

              try {
                var parentSelector = pair.key.split("_").slice(0, -1).join("_");
                if ($(parentSelector) && $(parentSelector).type === "radio" && !$(parentSelector).checked) {
                  if ($(pair.value.quantityField).value > 0) {
                    $(pair.value.quantityField).value = 0;
                    if ($(parentSelector + '_item_subtotal')) {
                      $(parentSelector + '_item_subtotal').update("0.00");
                    }
                  }
                  if (window.FORM_MODE === "cardform") {
                    $$("ul.products")[0] &&
                    $$("ul.products")[0].querySelector('li[data-input="' + parentSelector +'"]') &&
                    $$("ul.products")[0].querySelector('li[data-input="' + parentSelector +'"]').classList.remove("product--selected");
                    $(pair.value.quantityField).up().querySelector(".jfDropdown-chip.isSingle").innerText = 0;
                  }
                  return;
                }
              } catch (e){ console.warn(e); }
            }

            var isSetupFee = pair.value.recurring ? true : false; // is there a setup fee for this subscription?
            var isStripe = typeof Stripe === "function";    // is this a stripe payment field
            total = parseFloat(total);                  // total for the whole payment field
            var productShipping = 0;                    // shipping cost for current product
            var price = parseFloat(pair.value.price) || 0;   // price for the individual product
            var priceWithoutDiscount = price;           // price without discount for subtotal
            var taxAmount = 0;                          // tax amount for the individual product
            var taxAmountWithoutDiscount = 0;           // tax amount for the individual product
            var subproduct = false;                     // is this a subproduct?
            var parentProductKey;                       // subproduct's parent key (see http://www.jotform.com/help/264-Create-Sub-Products-Based-on-a-Product-Option)
            var recur = pair.value.recurring;           // subscription's recurring payment amount
            var isSpecialPricing = false;               // Check that is there a special pricing
            var quantity = 1;                           // Product quantity
            var specialName = [];                       // Special pricing informations. F.e T-Shirt: XS
            var unitProductAmountForSpecialPrice = 0;   // Special unit price
            var priceIndex;

            // get the parent product id if this is a subproduct
            if (pair.key.split('_').length === 4) {
                subproduct = true;
                // get the parent product key/id
                parentProductKey = pair.key.split('_');
                parentProductKey.pop();
                parentProductKey = parentProductKey.join("_");
                // initalize item subTotal for this subproduct group
                itemSubTotal[parentProductKey] = itemSubTotal[parentProductKey] || 0;
            } else {
                parentProductKey = pair.key;
            }

            // if product has special pricing, use selected option's corresponding price
            if ($(pair.value.specialPriceField)) {
                var specialPriceField = $(pair.value.specialPriceField);
                // if this special priced product option is expanded
                // Note: expanded options are inserted on the form as hidden input fields
                if (pair.value.child && pair.value.specialPriceField.split("_").length === 4) {
                    var idx = pair.value.specialPriceField.split("_")[3];
                    var specialPriceVal = pair.value.specialPriceList[idx] === '' ? '0' : pair.value.specialPriceList[idx];
                    price = parseFloat(specialPriceVal);
                } else {
                    if (isNaN($(specialPriceField).options[0].value)
                        || $(specialPriceField).options[0].value > 0
                        || $(specialPriceField.options[0].innerHTML.strip() != "")) {
                        priceIndex = specialPriceField.getSelected().index;
                    } else {
                        priceIndex = specialPriceField.getSelected().index - 1
                    }

                    var item = null;
                    if ($(pair.value.quantityField) && $(pair.value.quantityField).up("tr")) {
                        item = $(pair.value.quantityField).up("tr").querySelector("th").textContent.trim();
                    } else {
                        var specialPriceLabel = document.querySelector('label[for=' + pair.value.specialPriceField + ']');
                        item = specialPriceLabel && specialPriceLabel.textContent.trim();
                    }

                    if (item) {
                        specialName.push({
                            name: item,
                            value: $(specialPriceField).getSelected().value
                        });
                    }

                    if (priceIndex > -1) {
                        price = parseFloat(pair.value.specialPriceList[priceIndex]);
                        if ($(pair.key + '_price')) {
                            $(pair.key + '_price').siblings('.freeCurr').each(function (el) {
                                el.style.display = 'inline';
                            });
                        }
                    } else {
                        // for subproducts with special quantity, the default quantity is 0
                        // since we cannot show a zero price, we use the price for the 1st option
                        var defaultSpecial = pair.value.specialPriceList[priceIndex + 1];
                        price = 0;
                    }
                }
                isSpecialPricing = true;
                unitProductAmountForSpecialPrice = pair.value.specialPriceList[priceIndex];
            }

            priceWithoutDiscount = price;

            // If there is a coupon, apply the discount rate to the price
            if (pair.value.discount) {
                var discount = pair.value.discount.split('-');
                priceWithoutDiscount = price;
                /*
                 * sample discount values:
                 * 50-percent ( 50% off for this product )
                 * 50-fixed ( $50 off for this product )
                 * 50-percent-first ( 50% off on first payment for this subscription item)
                 * 50-percent-all (50 % off on all payments for this subscription item)
                 * 50-fixed-all ( $50 off on all payments)
                 */

                // if this is a discount for product
                if (!discount[2]) {
                    price = price - ( ( discount[1] === 'fixed' ) ? discount[0] : roundAmount(price * ( discount[0] / 100 ) ));
                    price = price < 0 ? 0 : price;
                } else {
                    if (discount[2] === "all" || discount[2] === "product") {
                        // calculate discount to recurring charge
                        if (isSetupFee) {
                            recur = recur - ( ( discount[1] === 'fixed' ) ? discount[0] : roundAmount(recur * ( discount[0] / 100 ) ));
                            recur = recur < 0 ? 0 : roundAmount(recur);
                        }
                        // calculate recurring price
                        price = price - ( ( discount[1] === 'fixed' ) ? discount[0] : roundAmount(price * ( discount[0] / 100 ) ));
                        price = price < 0 ? 0 : price;
                    } else if (discount[2] === "first") {
                        if (isSetupFee) {
                            price = price - ( ( discount[1] === 'fixed' ) ? discount[0] : roundAmount(price * ( discount[0] / 100 ) ));
                            price = price < 0 ? 0 : price;
                        }
                    } else if (discount[2] === "stripe_native") {
                        // if native stripe coupon is used and there is a setup fee
                        if (isSetupFee) {
                            var setupFee = roundAmount(price - recur);
                            price = recur - ( ( discount[1] === 'fixed' ) ? discount[0] : roundAmount(recur * ( discount[0] / 100 ) ));
                            if (!discount[3]) { // if this isn't just a one-time discount, i.e., 10-percent-stripe_native-once
                                recur = roundAmount(price);  // b#593901
                            }
                            price = roundAmount(price + Number(setupFee));
                        } else {
                            // calculate recurring price
                            price = price - ( ( discount[1] === 'fixed' ) ? discount[0] : roundAmount(price * ( discount[0] / 100 ) ));
                            price = price < 0 ? 0 : price;
                        }
                    }
                }
                price = roundAmount(price);
            }

            // If there is no recurring payment (i.e., not a subscription), update the price
            if (!pair.value.recurring) {
                var priceText = $(pair.key + '_price') ? $(pair.key + '_price') : $(pair.key.replace(pair.key.substring(pair.key.lastIndexOf("_")), "") + '_price') || null;
                if (priceText) {
                    var oldPriceText = priceText.innerHTML;
                    if (price == "0" && pair.value.specialPriceList && defaultSpecial) {
                        $(priceText).update(parseFloat(defaultSpecial || 0).formatMoney(decimal, dSeparator, tSeparator));
                    } else if (pair.value.price == "0" && !pair.value.specialPriceList) {
                        $(priceText).update(oldPriceText);
                    } else {
                        $(priceText).parentNode.show();
                        $(priceText).update(parseFloat(price).formatMoney(decimal, dSeparator, tSeparator));
                    }
                }
            } else {
                var setupfeeText = $(pair.key + '_setupfee');
                priceText = $(pair.key + '_price');
                if (priceText) {
                    // if a setup fee is not present, pair.value.price (price) is the subscription's price
                    // otherwise, pair.value.price is the subscription's first payment amount and the subscription's price becomes pair.value.recurring (recur)
                    var priceAmount = isSetupFee ? recur : price;
                    $(priceText).update(parseFloat(priceAmount).formatMoney(decimal, dSeparator, tSeparator));
                }
                if (setupfeeText) {
                    $(setupfeeText).update(parseFloat(price).formatMoney(decimal, dSeparator, tSeparator));
                }
            }

            // If there is a tax, get the total tax rate including location surcharges
            if (pair.value.tax) {
                var tax = pair.value.tax;
                taxRate = parseFloat(tax.rate) || 0;
                var locationField = $$('select[id*="input_' + tax.surcharge.field + '"], input#input_' + tax.surcharge.field)[0] || false;
                if (locationField && !!locationField.value) {
                    $H(tax.surcharge.rates).each(function (rate) {
                        if (typeof rate.value === 'object') {
                            var location = rate.value[1],
                                surcharge = rate.value[0];
                            if (location && surcharge && location.toLowerCase() === locationField.value.toLowerCase()) {
                                taxRate += Number(surcharge);
                                throw $break;
                            }
                        }
                    });
                }
            }
            // include addon prices for braintree subscriptions
            if (pair.value.addons) {
                price += pair.value.addons;
            }

            if ($(pair.key) && $(pair.key).checked) {

                products++;

                if ($(pair.value.quantityField) || $(pair.value.specialPriceField)) {
                    //if there is a quantity option and special pricing isn't based on it
                    if ($(pair.value.quantityField) && (pair.value.specialPriceField !== pair.value.quantityField)) {
                        // use different calculation method for custom quantity (textbox) option
                        if ($(pair.value.quantityField).readAttribute('type') == "text") {
                            price = $(pair.value.quantityField).value ? roundAmount(price * Math.abs(parseInt($(pair.value.quantityField).value, 10))) : 0;
                            priceWithoutDiscount = $(pair.value.quantityField).value ? roundAmount(priceWithoutDiscount * Math.abs(parseInt($(pair.value.quantityField).value, 10))) : 0;
                            quantity = Math.abs(parseInt($(pair.value.quantityField).value, 10));
                        }
                        else {
                            price = roundAmount(price * parseInt(($(pair.value.quantityField).getSelected().text || 0 ), 10));
                            priceWithoutDiscount = roundAmount(priceWithoutDiscount * parseInt(($(pair.value.quantityField).getSelected().text || 0 ), 10));
                            quantity = parseFloat($(pair.value.quantityField).getSelected().text);
                        }

                        specialName.push({
                            name: "Quantity",
                            value: quantity,
                        });

                        if (document.querySelector('#' + parentProductKey + '_subproducts')) {
                            specialName.push({
                                name: document.querySelector('#' + parentProductKey + '_subproducts th:first-child').textContent.trim(),
                                value: $(pair.value.quantityField).up("tr").querySelector("th").textContent.trim()
                            });
                        }
                    }

                    // if this is a subproduct, add the price to the subTotal
                    if (subproduct) {
                        itemSubTotal[parentProductKey] = roundAmount(itemSubTotal[parentProductKey] + price);
                    }

                    // update item subTotal if available
                    if ($(parentProductKey + '_item_subtotal') && !isNaN(price)) {
                        if (!subproduct) {
                            $(parentProductKey + '_item_subtotal').update(parseFloat(price).formatMoney(decimal, dSeparator, tSeparator));
                        } else {
                            $(parentProductKey + '_item_subtotal').update(parseFloat(itemSubTotal[parentProductKey]).formatMoney(decimal, dSeparator, tSeparator));
                        }
                    }

                    if ($(pair.value.quantityField)) {
                        if ($(pair.value.quantityField).nodeName === "INPUT") {
                            quantity = Math.abs(parseInt($(pair.value.quantityField).value, 10));
                        } else if ($(pair.value.quantityField).nodeName === "SELECT") {
                            quantity = parseFloat($(pair.value.quantityField).getSelected().text);
                        }
                    }
                }

                // if this product is taxed, calculate the tax amount
                if (pair.value.tax) {
                    if (pair.value.price === 'custom' && window.paymentType === 'subscription') {
                        taxAmount = subTotal * (taxRate / 100);
                        taxAmountWithoutDiscount = subTotalWithoutDiscount * (taxRate / 100);
                    } else {
                        taxAmount = price * (taxRate / 100);
                        taxAmountWithoutDiscount = priceWithoutDiscount * (taxRate / 100);
                    }
                    taxAmount = roundAmount(taxAmount);
                    taxAmountWithoutDiscount = roundAmount(taxAmountWithoutDiscount);
                }
                // add shipping if it is available

                if (pair.value.shipping) {
                    var shipping = pair.value.shipping;
                    if (shipping.firstItem) {
                        var qty = $(pair.value.quantityField) ? ($(pair.value.quantityField).readAttribute('type') === "text" ? parseInt($(pair.value.quantityField).value) : parseInt($(pair.value.quantityField).getSelected().text || 0)) : 1;
                        if (qty === 1) {
                            productShipping = parseFloat(shipping.firstItem);
                        }
                        if (qty > 1) {
                            productShipping = !parseFloat(shipping.addItem) ? parseFloat(shipping.firstItem) : parseFloat(shipping.firstItem) + parseFloat(shipping.addItem) * (qty - 1);
                        }
                        productShipping = roundAmount(productShipping);
                    } else if (flatShipping == 0 && shipping.flatRate) {
                        // get flat shipping rate once
                        shippingTotal = flatShipping = parseFloat(shipping.flatRate);
                    }
                }
                taxTotal = roundAmount(taxTotal + taxAmount); // accummulate tax amounts for each product
                taxTotalWithoutDiscount = roundAmount(taxTotalWithoutDiscount + taxAmountWithoutDiscount);
                if (!flatShipping) {
                    shippingTotal = roundAmount(shippingTotal + productShipping);  // accumulate shipping total
                }
                subTotal = roundAmount(subTotal + price); // accumulate total for all items, without shipping/discount/tax
                subTotalWithoutDiscount = roundAmount(subTotalWithoutDiscount + priceWithoutDiscount);

                otherTotal = roundAmount(otherTotal + (productShipping + taxAmount));   // shipping and tax total
                otherTotalWithoutDiscount = roundAmount(otherTotalWithoutDiscount + (productShipping + taxAmountWithoutDiscount));
            } else {
                if ($(pair.key + '_item_subtotal')) {
                    $(pair.key + '_item_subtotal').update("0.00");
                }
            }
          if($(pair.key) || JotForm.couponApplied){
              if($('coupon-button') && $(pair.key).checked === true && window.paymentType === 'subscription' && Array.from(document.querySelectorAll('.jfCard')).filter(function(el) {return el.dataset.type === 'control_stripe'}).length > 0){
                selected_product_id = $(pair.key).value;
                JotForm.checkCouponAppliedProducts();
              };
              if ($(pair.key).checked) {
                var amount = isSpecialPricing ? priceWithoutDiscount : parseFloat(pair.value.price);
                var description = "";

                if (isSpecialPricing) {
                  specialName.forEach(function(text){
                    description += text.name + ':' + text.value + ' ';
                  });
                }

                var paypalGatewayTypes = ["paypalSPB", "paypalcomplete"];
                var isPaypal = paypalGatewayTypes.indexOf(JotForm.payment) > -1;
                if(price > 0) {
                    pricingInformations.push({
                        productID: pair.key ? pair.key.split('_').pop() : '',
                        finalProductID: pair.key ? pair.key.replace(/input_\d+_/, '') : '', // strip question data example: input_3_1001_1 -> 1001_1
                        name: itemName,
                        unit_amount: Number(amount),
                        total_amount: roundAmount(price),
                        quantity: isSpecialPricing ? 1 : quantity,
                        description: description.substr(0, 124),
                        isSetupfee: isSetupFee,
                        isSpecialPricing: isSpecialPricing,
                        unitProductAmountForSpecialPrice: Number(unitProductAmountForSpecialPrice)
                    });
                }
                // If product price is being discounted to zero by a coupon and the gateway is being the one of the specified above in the array
                // then add these products to noCostItems array to count them later in related gateway.
                else if(isPaypal && !isNaN(quantity) && quantity > 0) {
                    noCostItems.push({
                        name: itemName,
                        unit_amount: Number(amount),
                        quantity: isSpecialPricing ? 1 : quantity,
                        description: description.substr(0, 124),
                        isSetupfee: isSetupFee
                    });
                }
              }
          }

        });

        if ($('coupon-button')) {
            var couponInput = $($('coupon-button').getAttribute('data-qid') + '_coupon');
        }
        // if there is a (sub)total discount
        if (JotForm.discounts.total) {
            if (subTotal >= minimum) {
                var reduce = type === "fixed" ? rate : roundAmount(((rate / 100) * parseFloat(subTotal)));
                subTotal = subTotal > reduce ? roundAmount(subTotal - reduce) : 0;
                couponInput.value = code;
            } else {
                reduce = 0;
                // clear (hidden) coupon input if total is less than required minimum
                couponInput.value = '';
            }
            // insert discount indicator
            var paymentTotal = document.querySelector('.form-payment-total');
            if (paymentTotal) {
                paymentTotal.parentNode.insertBefore(JotForm.discounts.container, paymentTotal);
                $('discount_total').update(parseFloat(reduce).formatMoney(decimal, dSeparator, tSeparator));
            }
        }

        if (JotForm.payment === "paypalSPB" || JotForm.payment === "Stripe") { // This condition added for not broken another gateways. It's only for preventation. Next, we can delete it if we need for another gateways.
            otherTotal = parsePriceWithoutComma(otherTotal);
            otherTotalWithoutDiscount = parsePriceWithoutComma(otherTotalWithoutDiscount);
        }

        total = roundAmount(subTotal + otherTotal); // combine all totals
        totalWithoutDiscount = roundAmount(subTotalWithoutDiscount + otherTotalWithoutDiscount);
        // add flat rate shipping to total if available
        total = flatShipping > 0 ? total + flatShipping : total;
        totalWithoutDiscount = flatShipping > 0 ? roundAmount(totalWithoutDiscount + flatShipping) : totalWithoutDiscount;
        if (total === 0 || isNaN(total)) {
            total = "0.00";
            totalWithoutDiscount = "0.00";
        }

        // Gets the amount by checking the number of products added to the cart for Jotform Store Builder
        if (
            (total === 0 || total === "0.00" || isNaN(total)) && (window.JFAppsManager && window.JFAppsManager.checkoutKey && window.JFAppsManager.cartTotal > 0)
        ) {
            total = window.JFAppsManager.cartTotal;
            totalWithoutDiscount = total;
        }

        // if there is a shipping discount
        if (JotForm.discounts.shipping && shippingTotal > 0 && subTotal >= minimum) {
            var reduce = type === "fixed" ? rate : roundAmount((rate / 100) * parseFloat(shippingTotal));
            var oldShippingTotal = shippingTotal;
            shippingTotal = shippingTotal > reduce ? roundAmount(shippingTotal - reduce) : 0;
            total = roundAmount(total - (oldShippingTotal - shippingTotal));
            totalWithoutDiscount = roundAmount(totalWithoutDiscount - (oldShippingTotal - shippingTotal));
        }

        var itemTotal = parsePriceWithoutComma(subTotalWithoutDiscount);
        var shipping = parsePriceWithoutComma(shippingTotal);
        totalWithoutDiscount = parsePriceWithoutComma(totalWithoutDiscount) || 0;
        total = parsePriceWithoutComma(total) || 0;
        taxTotalWithoutDiscount = parsePriceWithoutComma(taxTotalWithoutDiscount);
        taxTotal = parsePriceWithoutComma(taxTotal);

        // assign total to global var;
        this.paymentTotal = Number(total);
        var stripeFormID = $$('input[name="formID"]')[0].value;
        if (JotForm.stripe && typeof JotForm.stripe !== undefined &&
            (
                window.location.search === '?stripeLinks=1' ||
                (typeof JotForm.stripeLink !== 'undefined' && JotForm.stripeLink === 'Yes') ||
                (typeof JotForm.tempStripeCEForms !== 'undefined' && !JotForm.tempStripeCEForms.includes(stripeFormID))
            )
        ) {
            JotForm.stripe.updateElementAmount();
        }
        // for PaypalPro only
        if ($('creditCardTable')) {
            // if total is zero and a valid coupon has been entered
            if (products > 0 && this.paymentTotal === 0 && discounted) {
                JotForm.setCreditCardVisibility(false);
            } else if ($$('input[id*="paymentType_credit"]').length > 0 && $$('input[id*="paymentType_credit"]')[0].checked) {
                JotForm.setCreditCardVisibility(true);
            }
        }
        // update payment subtotal
        if ($("payment_subtotal")) {
            $("payment_subtotal").update(parseFloat(subTotal).formatMoney(decimal, dSeparator, tSeparator));
        }
        // update tax figures
        if ($("payment_tax")) {
            $("payment_tax").update(parseFloat(taxTotal).formatMoney(decimal, dSeparator, tSeparator));
        }
        // update shipping cost total
        if ($("payment_shipping")) {
            $("payment_shipping").update(parseFloat(shippingTotal).formatMoney(decimal, dSeparator, tSeparator));
        }
        // update overall total
        if ($("payment_total")) {
            $("payment_total").update(parseFloat(total).formatMoney(decimal, dSeparator, tSeparator));

            if ($("payment_total").up(".form-line") && $("payment_total").up(".form-line").triggerEvent) {
                $("payment_total").up(".form-line").triggerEvent("keyup");  //b#520074 trigger calculation
            }
        }
        if ($("payment_footer_total")) {
            $("payment_footer_total").update(parseFloat(total).formatMoney(decimal, dSeparator, tSeparator));
        }

        var count = 0;
        for(var propt in JotForm.discounts){
            count++;
        }

        var isDiscount = count > 0;
        var discount = parsePriceWithoutComma(Math.abs(roundAmount(itemTotal + shipping + taxTotal) - total));
        discount = isDiscount ? discount : 0;

        JotForm.pricingInformations = {
            items: pricingInformations,
            noCostItems: noCostItems,
            general: {
                net_amount: total,
                total_amount: totalWithoutDiscount,
                item_total: itemTotal,
                tax_total: taxTotal,
                shipping: shipping,
                discount: discount,
                currency: currency
            }
        };


        // Update paypal messaging
        if (JotForm.paypalCompleteJS && window.paypal && window.paypal.Messages) {
            JotForm.paypalCompleteJS.payLaterFuncs.changeMessageAmount();
        } else if (JotForm.paypalSPB && window.paypal && window.paypal.Messages) {
            JotForm.paypalSPB.renderMessages();
        }

        function parsePriceWithoutComma(price) {
            if(decimalMark === "comma"){
                return price;
            }
            return parseFloat(parseFloat(price).formatMoney(decimal, dSeparator, ""));
        } 
    },
    prices: {},

    /**
    * More accurate version of toFixed() method.
    * In some cases toFixed is not working correctly.
    * e.x : 1.505.toFixed(2) ==> 1.50 should be 1.51
    * @param num
    * @param decimalPlaces
    * @returns {string}
    */
    morePreciseToFixed: function(num, decimalPlaces) { 
        decimalPlaces = typeof decimalPlaces == 'undefined' ? 2 : decimalPlaces;   
        var num_sign = num >= 0 ? 1 : -1;
        return (Math.round((num * Math.pow(10, decimalPlaces)) + (num_sign * 0.0001)) / Math.pow(10, decimalPlaces)).toFixed(decimalPlaces);
    },

    setCreditCardVisibility: function(show) {
        if (show) {
            $('creditCardTable').show();
        } else {
            $('creditCardTable').hide();
        }
    },
    /**
     * Sets the events for dynamic total calculation
     * @param {Object} prices
     */
    totalCounter: function (prices) {

        if (!Number.prototype.formatMoney) {
            // format money function
            Number.prototype.formatMoney = function (c, d, t) {
                /* Fix: 784398 (Erhan)
                 JavaScript's decimal point representation is not a thing what we think it is.
                 So, we do not directly apply toFixed method on them.
                 e.g. Try 1.925.toFixed(2) and 39.925.toFixed(2) on your browser.
                 So, we need to add a tailing 1 if last decimal point is 5, and it is gonna be truncated.
                 */
                var temp = (typeof this.toString().split('.')[1] !== 'undefined' && this.toString().split('.')[1].length > c && this.toString().charAt(this.toString().length - 1) === '5') ? this.toString() + '1' : this.toString();
                var n = parseFloat(temp),
                    c = isNaN(c = Math.abs(c)) ? 2 : c,
                    d = d === undefined ? "." : d,
                    t = t === undefined ? "," : t,
                    s = n < 0 ? "-" : "",
                    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
                    j = (j = i.length) > 3 ? j % 3 : 0;
                return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
            };
        }

        // Assign form's initial prices to JotForm.prices object
        // so we can use it later
        JotForm.prices = prices;
        // count total price upon loading the form (Bug:168425)
        window.addEventListener('load', function(event) {
            JotForm.countTotal(prices);
        });
        if (window.self !== window.top) { // For embedded forms the above listener not working.
            document.observe('dom:loaded', JotForm.countTotal(prices));
        }
        $H(prices).each(function (pair) {
            if ($(pair.key)) {
              $(pair.key).stopObserving('click'); // prevent stacking of listeners
              $(pair.key).observe('click', function () {
                JotForm.countTotal(prices);
              });
            }
            // if this is a subscription with custom pricing
            if (pair.value.price == "custom") {
                $(pair.key + '_custom_price').stopObserving('keyup'); // prevent stacking of listeners
                $(pair.key + '_custom_price').observe('keyup', function () {
                    JotForm.countTotal(prices);
                });
            }

            // if tax is present
            if (pair.value.tax) {
                var surcharge = pair.value.tax.surcharge;
                // observe change event for surcharge location field
                // for dropdowns
                var selectSurcharge = document.querySelector('select[id*="input_' + surcharge.field + '"]');
                if (selectSurcharge) {
                    selectSurcharge.stopObserving('change'); // prevent stacking of listeners
                    selectSurcharge.observe('change', function () {
                        setTimeout(JotForm.countTotal(), 500);
                    });
                }
                // for text fields (address:state)
                var inputSurcharge = document.querySelector('input[id="input_' + surcharge.field + '"]');
                if (inputSurcharge) {
                    inputSurcharge.stopObserving('keyup'); // prevent stacking of listeners
                    inputSurcharge.observe('keyup', function () {
                        setTimeout(JotForm.countTotal(), 500);
                    });
                }
            }


            var triggerAssociatedElement = function (el) {
                var prodID = $(el).id.match(/input_([0-9]*)_quantity_/) || $(el).id.match(/input_([0-9]*)_custom_/);
                setTimeout(function () {

                    if (prodID && $('id_' + prodID[1])) {
                        $('id_' + prodID[1]).triggerEvent('click');
                    }

                    var productItem = el.up(".form-product-item");
                    if (productItem && productItem.down("input") && productItem.down("input").validateInput) {
                        productItem.down("input").validateInput();
                    }

                }, 100);
            };

            if ($(pair.value.quantityField)) {
                function countQuantityTotal() {
                    if (JotForm.isVisible($(pair.value.quantityField))) {
                        // Neil: temporary fix for 287973
                        // because we run the change event for quantity upon loading (to evaluate the conditions),
                        // the associated product checkbox should not change if quantity did not change value
                        if ($(pair.value.quantityField).tagName !== 'SELECT'
                            || $(pair.value.quantityField).getSelected().index > 0
                            || $(pair.value.quantityField).getValue() === "0") // also trigger uncheck when value is "0"
                        {
                            var productItem = $(pair.key) ? $(pair.key).up('.form-product-item') : false;
                            var productWithSubProducts = productItem ? productItem.down('.form-product-has-subproducts') : false;
                            var subProducts = productItem.select('.form-subproduct-quantity');

                            // Update Sub Total
                            if ($(pair.value.quantityField).getValue() === "0") {
                                var subTotalSpan = $(pair.key + '_item_subtotal');
                                if (subTotalSpan) subTotalSpan.update("0.00");
                            }

                            if (productWithSubProducts) {
                                productWithSubProducts.checked = false;

                                var isAllSubProductsZero = true;
                                $A(subProducts).each(function(pr){
                                    if (!($(pr).getValue() <= 0)){
                                        productWithSubProducts.checked = true;
                                        isAllSubProductsZero = false;
                                    }
                                });
                                if (isAllSubProductsZero) {
                                    try {
                                        var subProductKeyPieces = pair.key.split('_');
                                        // Removing the last id, according to JotForm Logic it adds additional id for Sub Total
                                        subProductKeyPieces.splice(-1, 1);
                                        subProductKeyPieces = subProductKeyPieces.join('_');
                                        var subTotalSpanForSubProduct = $(subProductKeyPieces + '_item_subtotal');
                                        if (subTotalSpanForSubProduct) subTotalSpanForSubProduct.update("0.00");
                                    } catch (e) {
                                        console.log(e);
                                    }
                                }
                            } else {
                                if($(pair.key)){
                                    $(pair.key).checked = !($(pair.value.quantityField).getValue() <= 0) ? true : false;
                                }
                            }
                        }
                        JotForm.countTotal(prices);
                    }
                }

                // BUGFIX#3821988
                // Here, events are set, and conditions are run afterwards
                // conditions also run those events in some functions (see setConditionEvents and runAllConditions functions)
                // that is why user suddenly sees an error
                // This is not a good solution, yet I believe we need to crush them until we find a better one

                // This function helps to check quantities for avoiding blank payments
                var quantityCorrectionForTextInput = function (qty) {
                    var qtyField = $(pair.value.quantityField);
                    qty.forEach(function(e) {
                        if (e[1].match(qtyField.id)) { // matching product id and and exact product's id to change correct product's quantity value
                            qtyField.value = qtyField.getValue() <= "0" || !(Number(qtyField.getValue())) ? (e[0] === "0" ? "1" : e[0]) : qtyField.value;
                        }
                    })
                }

                function setQuantityFieldEventsForTotalCalculation () {
                    var qtyValueList = []; // to push quantity value and product's id
                    Array.from(document.getElementsByClassName("form-product-custom_quantity")).forEach(
                        function(el) {
                            qtyValueList.push([el.value, el.id]);
                        }
                    );
                    $(pair.value.quantityField).observe('change', function () {
                        setTimeout(countQuantityTotal, 50);
                        quantityCorrectionForTextInput(qtyValueList);
                        triggerAssociatedElement(this);
                    });
                    // calculate total for custom quantity (text box)
                    $(pair.value.quantityField).observe('keyup', function () {
                        setTimeout(countQuantityTotal, 50);
                        triggerAssociatedElement(this);
                    });
                }

                var inputSimpleFpc = document.querySelector('input[name="simple_fpc"]');
                var paymentFieldId = inputSimpleFpc && inputSimpleFpc.value;
                var paymentField = $('id_' + paymentFieldId);

                if (!JotForm.isPaymentSelected() && paymentField && paymentField.hasClassName('jf-required')) {
                    setTimeout(function() {
                        setQuantityFieldEventsForTotalCalculation();
                    }, 1800);
                } else {
                    setQuantityFieldEventsForTotalCalculation();
                }
            }
            if ($(pair.value.specialPriceField)) {
                function countSpecialTotal() {
                    if (JotForm.isVisible($(pair.value.specialPriceField))) {
                        // because we run the change event for quantity upon loading (to evaluate the conditions),
                        // the associated product checkbox should not change if quantity did not change value
                        if ($(pair.value.specialPriceField).tagName !== 'SELECT' || $(pair.value.specialPriceField).getSelected().index > 0) {
                          if($(pair.key)){
                            $(pair.key).checked = true;
                          }
                        }
                        JotForm.countTotal(prices);
                    }
                }

                $(pair.value.specialPriceField).observe('change', function () {
                    setTimeout(countSpecialTotal, 50);
                    triggerAssociatedElement(this);
                });
                $(pair.value.specialPriceField).observe('keyup', function () {
                    setTimeout(countSpecialTotal, 50);
                });
            }
        });
    },

    getPaymentTotalAmount: function() {
        var totalAmount = JotForm.pricingInformations ?
            parseFloat(JotForm.pricingInformations.general.net_amount) :
            parseFloat(JotForm.paymentTotal);
        return totalAmount || 0;
    },

    /*
     * Handle the calculation for cloned category products.
     * @param {Array} products
     * @return {undefined}
     */
    paymentCategoryHandler: function(showCategory, showCategoryTitle, products, pairedProducts){
        function categoryCollapsible() {
            $A($$('.form-product-category-item')).each(function(categoryItem){
                if (categoryItem) {
                    $(categoryItem).observe('click', function(event) {
                        var categoryProducts = $$('.form-product-item[active-category="' + $(this).readAttribute('category') + '"]');
                        var selectedProducts = 0;

                        $A(categoryProducts).each(function(categoryProduct){
                            var formInput = categoryProduct.down('.form-product-input');
                            if (formInput && formInput.checked) {
                                selectedProducts += 1;
                            }

                            if ($(categoryProduct).hasClassName('not-category-found')) {
                                $(categoryProduct).removeClassName('not-category-found');
                            } else {
                                $(categoryProduct).addClassName('not-category-found');
                            }
                        });

                        // Add or remove class to category title to take some actions
                        if ($(this).hasClassName('title_collapsed')) {
                            $(this).removeClassName('title_collapsed');
                        } else {
                            $(this).addClassName('title_collapsed');
                            if ($(this).down('.selected-items-icon')) {
                                $(this).down('.selected-items-icon').innerText = 'x' + selectedProducts;

                                if (selectedProducts > 0){
                                    $(this).addClassName('has_selected_product');
                                } else {
                                    $(this).removeClassName('has_selected_product');
                                }
                            }
                        }
                    });
                }
            });
        }

        // categoryInitialize();
        categoryCollapsible();

        // Clear the cloned products.
        if (products && Object.keys(products).length > 0 && showCategoryTitle) {
            JotForm.categoryMainProducts = products;
            JotForm.categoryConnectedProducts = pairedProducts;

            var mainProducts = [];
            var connectedProducts = [];

            $H(products).each(function(pair) {
                var mainProductPid = pair.value;
                var connectedProductPid = pair.key;

                connectedProducts.push(connectedProductPid);
                if (mainProducts.indexOf(mainProductPid) === -1) { mainProducts.push(mainProductPid); }

                // First clear connected product.
                var connectedProductItem = $$('.form-product-item[pid="' + connectedProductPid + '"]')[0];
                if ($(connectedProductItem)) {
                    var connectedProductInputs = $(connectedProductItem).select('input', 'select');

                    $A(connectedProductInputs).each(function(input) {
                        var newElement = $(input).cloneNode(true);
                        $(newElement).writeAttribute('name', '');
                        $(input).parentNode.replaceChild(newElement, input);
                    });
                }
            });

            function mainProductObserver(product_item, product_item_input, input, mainProductPid, isSubproduct) {
                var productConnectedProducts = pairedProducts[mainProductPid];
                $A(productConnectedProducts).each(function(connectedProductPid) {
                    var modifiedId = $(input).id.replace(mainProductPid, connectedProductPid);
                    if (!$(modifiedId)) { return false; }

                    if ( input.nodeName === 'INPUT' && ['checkbox', 'radio'].indexOf($(input).readAttribute('type')) > -1) {
                        $(modifiedId).checked = $(input).checked;
                    } else  {
                        $(modifiedId).setValue($(input).getValue());
                    }

                    if (isSubproduct && (JotForm.newDefaultTheme || JotForm.newPaymentUI)) {
                        $(modifiedId).up('.form-product-item').className = $(product_item).className;
                    } else if (isSubproduct) {
                        $(modifiedId).triggerEvent('click');
                    }

                    // Note:: If the changed elements is a quantity field, there are some controls after 50ms later. So check it again.
                    if ($(input).id.indexOf('_quantity_') > -1 && (JotForm.newDefaultTheme || JotForm.newPaymentUI)) { // Quantity field.
                        setTimeout(function() {
                            var connected_product_item_input = $$('.form-product-item[pid="' + connectedProductPid + '"] .form-product-input')[0];

                            if (product_item_input.checked !== connected_product_item_input.checked) {
                                $(connected_product_item_input).click();
                            }
                        }, 100);
                    }
                });
            }

            function connectedProductObserver(connected_product_item, connected_product_item_input, input, pairedMainProductPid, connectedProductPid, isSubproduct) {
                var productConnectedProducts = pairedProducts[connectedProductPid];

                $A(productConnectedProducts).each(function(changedConnectedProductPid) {
                    var modifiedId = $(input).id.replace(connectedProductPid, changedConnectedProductPid);
                    var isMainProduct = pairedMainProductPid === changedConnectedProductPid;

                    if (!$(modifiedId)) { return false; }

                    if (input.nodeName === 'INPUT' && ['checkbox', 'radio'].indexOf($(input).readAttribute('type')) > -1) {
                        $(modifiedId).checked = $(input).checked;
                    } else {
                        $(modifiedId).setValue($(input).getValue());
                    }

                    if (isSubproduct && (JotForm.newDefaultTheme || JotForm.newPaymentUI)) {
                        $(modifiedId).up('.form-product-item').className = $(connected_product_item).className;
                    }

                    if (isMainProduct && $(modifiedId).hasClassName('form-product-input')) { $(modifiedId).triggerEvent('click'); }
                    setTimeout(function() {
                        if (isMainProduct && !$(modifiedId).hasClassName('form-product-input')) { $(modifiedId).triggerEvent('change'); }
                    }, 100);
                });
            }

            $A(mainProducts).each(function(mainProductPid) {
                var product_item = $$('.form-product-item[pid="' + mainProductPid + '"]')[0];
                var product_item_input = $$('.form-product-item[pid="' + mainProductPid + '"] .form-product-input')[0];
                if ($(product_item)) {
                    var isSubproduct = !!$(product_item).down('.form-product-has-subproducts');

                    var inputs = $(product_item).select('input,select');
                    $A(inputs).each(function(input) {
                        if (JotForm.newDefaultTheme || JotForm.newPaymentUI) {
                            $(input).observe('change', function(evt) {
                                mainProductObserver(product_item, product_item_input, input, mainProductPid, isSubproduct);
                            });
                        } else {
                            $(input).addEventListener('change', function() {
                                mainProductObserver(product_item, product_item_input, input, mainProductPid, isSubproduct);
                            });
                        }
                    });
                }
            });

            $A(connectedProducts).each(function(connectedProductPid) {
                var connected_product_item = $$('.form-product-item[pid="' + connectedProductPid + '"]')[0];
                var connected_product_item_input = $$('.form-product-item[pid="' + connectedProductPid + '"] .form-product-input')[0];
                if ($(connected_product_item)) {
                    var isSubproduct = !!$(connected_product_item).down('.form-product-has-subproducts');
                    var pairedMainProductPid = products[connectedProductPid];
    
                    var inputs = $(connected_product_item).select('input,select');
    
                    $A(inputs).each(function(input) {
                        if (JotForm.newDefaultTheme || JotForm.newPaymentUI) {
                            $(input).observe('change', function(evt) {
                                connectedProductObserver(connected_product_item, connected_product_item_input, input, pairedMainProductPid, connectedProductPid, isSubproduct);
                            });
                        } else {
                            $(input).addEventListener('change', function() {
                                connectedProductObserver(connected_product_item, connected_product_item_input, input, pairedMainProductPid, connectedProductPid, isSubproduct);
                            });
                        }
                    });
                }
            });
        }

        JotForm.showCategoryTitle = showCategoryTitle;
    },

    /**
     * Holds discount rates from verified coupon codes
     */
    discounts: {},

    /**
     * Handles payment coupon code verification
     */

    handleCoupon: function () {
        var $this = this;
        JotForm.countTotal(JotForm.prices);
        if ($('coupon-button')) {
            var cb = $('coupon-button'),
                cl = $('coupon-loader'),
                cm = $('coupon-message'),
                ci = $('coupon-input');

            cb.innerHTML = this.paymentTexts.couponApply;
            var formID = $$('input[name="formID"]')[0].value;
            // prevent enter from submitting the form on coupon input
            ci.observe('keypress', function (e) {
                if (e.keyCode === 13) {
                    e.preventDefault();
                    cb.click();
                    ci.blur();
                }
            });

            // reset coupon inputs
            ci.enable();
            $$('input[name="coupon"]')[0].value = "";

            // verify the coupon on click
            cb.observe('click', function () {
                if (ci.value) {
                    cb.hide();
                    cl.show();
                    ci.value = ci.value.replace(/\s/g, "");
                    cb.disable();

                    //Native stripe subscriptions only available for subscriptions
                    var isStripe = ((ci.hasAttribute('stripe') || ci.hasAttribute('data-stripe')) && window.paymentType === 'subscription');
                    var isStripeCheckout = ((ci.hasAttribute('stripe') || ci.hasAttribute('data-stripe')) && ['subscription', 'product'].indexOf(window.paymentType) > -1) && $(ci).up('.form-line').getAttribute('data-type') === 'control_stripeCheckout';
                    JotForm._xdr(JotForm.getAPIEndpoint() + '/payment/checkcoupon', 'POST', JotForm.serialize({
                        coupon: ci.value,
                        formID: formID,
                        stripe: isStripe,
                        stripecheckout: isStripeCheckout,
                        editMode : JotForm.isEditMode(),
                        paymentID : $$('input[name="simple_fpc"]')[0].value
                    }), function (response) {
                        try{
                            JSON.parse(response.content);
                            cl.hide();
                            cb.show();
                            cm.innerHTML = $this.paymentTexts.couponValid;
                            cm.removeClassName('invalid')
                            cm.addClassName('valid');
                            JotForm.applyCoupon(response.content);
                        }catch(e){
                            if (response.content === "expired") {
                                cm.innerHTML = $this.paymentTexts.couponExpired;
                            } else if (response.content === "ratelimiter") {
                                cm.innerHTML = $this.paymentTexts.couponRatelimiter;
                            } else {
                                cm.innerHTML = $this.paymentTexts.couponInvalid;
                            }
                            cm.removeClassName('valid');
                            cm.addClassName('invalid');
                            ci.select();
                            cl.hide();
                            cb.show();
                            cb.enable();
                        }
                    },  function(){
                        cm.innerHTML = $this.paymentTexts.couponInvalid;
                        cm.removeClassName('valid');
                        cm.addClassName('invalid');
                        ci.select();
                        cl.hide();
                        cb.show();
                        cb.enable();
                    });
                } else {
                    $('coupon-message').innerHTML = $this.paymentTexts.couponBlank;
                }
            }.bind(this));
        }
    },

  /**
   *  Checks if coupon code associated with selected product
   */

    checkCouponAppliedProducts: function (){
      var cb =  $('coupon-button'),
          cm =  $('coupon-message');

      if (window.discounted_products) {
        var discounted_products = Array.from(window.discounted_products);
        cleared_discounted_products = [];
        discounted_products.forEach(function(element,index){

          if(typeof(element) === "string" || typeof(element) === "number" ) {
            cleared_discounted_products[index] = element.toString();

            if(cleared_discounted_products.includes(selected_product_id) === true || cleared_discounted_products[0] === "all" ) {
              cb.innerHTML = 'Change';
              cm.innerHTML = "Coupon is valid.";

            } else {
              cb.enable();
              var coupon_code_entered = document.querySelectorAll('div#coupon-container > div#coupon-table > div.jfField.isFilled').length;
              if(coupon_code_entered && coupon_code_entered !== 0){
                cm.innerHTML = "<span style='color:red; '>Coupon code is not valid for this product.</span>";
              };

            }

            // When 'Change' button is clicked
            $('coupon-button').addEventListener('click', function () {
              cm.innerHTML = "";
            });
          }
        });

      }

    },


  /**
   *  Applies coupon to prices on the front-end
   *  @param {Object} discount
   */

    applyCoupon: function (discount) {
        var $this = this;
        discount = JSON.parse(discount);

        window.discounted_products = [];
        if(discount.products && discount.products[0]) {
          discount.products.forEach(function(element,index){
            window.discounted_products[index] = element;
          });
        }

        JotForm.discounts = {};

        var cb = $('coupon-button'),
            cl = $('coupon-loader'),
            cm = $('coupon-message'),
            ci = $('coupon-input'),
            cf = $(cb.getAttribute('data-qid') + '_coupon'); // Hidden input for passing coupon to server (submit)
        cb.stopObserving('click');
        if (cf) {
            cf.value = discount.code;
        }
        cb.enable();
        ci.disable();
        cb.innerHTML = this.paymentTexts.couponChange || 'Change';
        // When 'Change' button is clicked
        cb.observe('click', function () {
            if (JotForm.isEditMode()) { return; }
            // Clear hidden coupon input value
            cf.value = '';
            // Remove all original prices
            $H(oldPrices).each(function (pair) {
                pair[1].remove();
            });
            // Remove "Discount" indicator container if present
            if (JotForm.discounts.container) {
                JotForm.discounts.container.remove();
            }
            //
            $$('span[id*="_price"]').each(function (field, id) {
                $(field).removeClassName('underlined');
            });
            $$('span[id*="_setupfee"]').each(function (field, id) {
                $(field).removeClassName('underlined');
            });
            // clear discounts object
            JotForm.discounts = {};
            cb.stopObserving('click');
            cm.innerHTML = "";
            cm.removeClassName('valid');
            cb.innerHTML = $this.paymentTexts.couponApply;
            ci.enable();
            ci.select();
            JotForm.handleCoupon();
        });
        var pair = [], oldPrices = {};
        var displayOldPrice = function (container, id) {
            oldPrices[id] = new Element('span');
            var span = new Element('span', {style: 'text-decoration:line-through; display:inline-block;'}).addClassName('old_price');;
            span.insert(container.innerHTML.replace("price", "price_old"));
            var spanHidden = new Element('span', {style: 'width:0; height:0; opacity: 0; position:absolute;'})
            spanHidden.innerHTML = "Discount Price"
            // oldPrices[id].insert({top: '&nbsp'});
            oldPrices[id].insert(span);
            oldPrices[id].insert(spanHidden);
            // oldPrices[id].insert({bottom: '&nbsp'});
            container.insert({top: oldPrices[id]});
        }
        // if this discount applies to product/subscription items
        // and discount applies to ALL items
        if (discount.products && discount.products.length > 0) {
            if (discount.products.include('all')) {
                discount.products = [];
                for (var key in productID) {
                    discount.products.push(productID[key].slice(-4));
                }
            }
        }
        // if the discount's payment type is product
        if (!discount.paymentType || (discount.paymentType && discount.paymentType === "product")) {
            // if this is a discount for individual items
            if (discount.apply === "product") {

                $A(discount.products).each(function (pid) {
                    JotForm.discounts[pid] = discount.rate + '-' + discount.type;
                    $$('span[id*="_price"]').each(function (field, id) {
                        if (field.id.indexOf(pid) > -1) {
                            $(field).addClassName('underlined');
                        }
                    });
                    
                    if (JotForm.newDefaultTheme || JotForm.newPaymentUI) {
                      if ($$('div[for*="' + pid + '"] span.form-product-details b')[0]) {
                        displayOldPrice($$('div[for*="' + pid + '"] span.form-product-details b')[0], pid);
                        JotForm.couponApplied = true;
                      }
                    } else {
                      if ($$('label[for*="' + pid + '"] span.form-product-details b')[0]) {
                        displayOldPrice($$('label[for*="' + pid + '"] span.form-product-details b')[0], pid);
                        JotForm.couponApplied = true;
                      }
                    }
  
                    // for subproducts
                    if ($$('[id*=' + pid + '_subproducts]').length > 0 && $$('[id*=' + pid + '_subproducts]')[0].down('.form-product-child-price')) {
                        $$('#' + $$('[id*=' + pid + '_subproducts]')[0].id + ' .form-product-child-price').each(function (field, id) {
                            displayOldPrice(field, pid + '_' + id);
                        });
                    }

                    JotForm.countTotal(JotForm.prices);
                });
            } else if (discount.apply === "total") {
                // if this is a discount for the order total
                // add discount properties to JotForm.discounts
                // to be evaluated by countTotal
                JotForm.discounts = {
                    total: true,
                    code: discount.code,
                    minimum: discount.minimum,
                    type: discount.type,
                    rate: discount.rate
                };
                // if discount is for order total (excluding tax, shipping, etc)
                var totalContainer = document.querySelector('.form-payment-total');
                if (totalContainer) {
                    var discountHTML = totalContainer.innerHTML.replace(/Total|Total:/, 'Discount:').replace('payment_total', 'discount_total').replace('<span>', '<span> - ');
                    discountHTML = discountHTML.replace('id="total-text"', '');
                    JotForm.discounts.container = new Element('span', { 'class': 'form-payment-discount' }).insert(discountHTML);
                }
            } else {
                JotForm.discounts = {
                    shipping: true,
                    code: discount.code,
                    minimum: discount.minimum,
                    type: discount.type,
                    rate: discount.rate
                };
            }
        } else {

            // Neil: subscription coupons can either be applied to
            // a) first payment only (if first payment is specified)
            // b) all payments -- recurring and first payment

            // if the discount's payment type is subscription
            $A(discount.products).each(function (pid) {
                JotForm.discounts[pid] = discount.rate + '-' + discount.type;
                // specify to which does this discount apply
                if (discount.apply) {
                    JotForm.discounts[pid] += "-" + discount.apply;
                }
                // b#593901 for stripe-native coupons that are good only for one cycle
                if (discount.duration && discount.duration === 1) {
                    JotForm.discounts[pid] += "-once";
                }
                $$('span[id*="_price"]').each(function (field, id) {
                    // if price container is found and there is a setup fee and this discount applies
                    // to ALL payment for the current subscription item
                    // set style underlined, to note that the price was changed because of the discount
                    if (field.id.indexOf(pid) > -1 && $$('span[id*="' + pid + '_setupfee"]').length > 0 && discount.apply === "all") {
                        $(field).addClassName('underlined');
                        throw $break;
                    }
                });

                $$('span[id*="_setupfee"]').each(function (field, id) {
                    if (field.id.indexOf(pid) > -1) {
                        $(field).addClassName('underlined');
                        throw $break;
                    }
                });
            });
        }

        // call countTotal to update the prices
        JotForm.countTotal(JotForm.prices);
    },

    /**
     * Properly sets the public key for Stripe if any
     */
    setStripeSettings: function (pubkey, add_qid, shipping_qid, email_qid, phone_qid, custom_field_qid) {
        // skip on edit mode (b#439725)
        if (JotForm.isEditMode() || document.get.sid) {
          return;
        }

        var scaTemplate = $$('#stripe-templates .stripe-sca-template')[0];
        var oldTemplate = $$('#stripe-templates .stripe-old-template')[0];

        //check if the Stripe v1 library is loaded
        if (pubkey) {
            var form = (JotForm.forms[0] == undefined || typeof JotForm.forms[0] == "undefined" ) ? $($$('.jotform-form')[0].id) : JotForm.forms[0];
            var clean_pubkey = pubkey.replace(/\s+/g, '');
            if (clean_pubkey == '') {
                console.log('Stripe publishable key is empty. You need to connect your form using Stripe connect.');
                return;
            }

            var scriptVersion = "v3";
            this.loadScript('https://js.stripe.com/' + scriptVersion + '/', function() {
                if (typeof _StripeSCAValidation || typeof _StripeValidation) {
                    var stripeV = new _StripeSCAValidation();
                    JotForm.stripe = stripeV;

                    if (oldTemplate) { oldTemplate.remove(); }

                    stripeV.setFields(add_qid, shipping_qid, email_qid, phone_qid, custom_field_qid);
                    stripeV.init(pubkey);
                    console.log('Stripe V3 loaded');
                } else {
                    if (scaTemplate) { scaTemplate.remove(); }
        
                    if (oldTemplate) {
                        $$('.stripe-old-template input').forEach(function(input) {
                            input.setAttribute('disabled', true);
                        })
                    }
                }

                setTimeout(JotForm.handleIFrameHeight, 300);
            });
        }
        // That's mean the user doesn't connected.
        // else {
        //     if (scaTemplate) { scaTemplate.remove(); }

        //     if (oldTemplate) {
        //         $$('.stripe-old-template input').forEach(function(input) {
        //             input.setAttribute('disabled', true);
        //         })
        //     }
        // }
    },

    /**
     * Initialize filepickerIO uploader
     * @param options - the filepickerIO options
     */
    setFilePickerIOUpload: function (options) {
        //check if filepickerIO script is available
        if (
            options && typeof filepicker === "object" &&
            typeof _JF_filepickerIO === "function"
        ) {
            //start the filepickerIO Uploader
            var fp = new _JF_filepickerIO(options);
            fp.init();
        } else {
            console.error("filepicker OR _JF_filepickerIO object library are missing");
        }
    },

    /**
     * Initiates the capctha element
     * @param {Object} id
     */
    initCaptcha: function (id) {
        /**
         * When captcha image requested on foreign pages
         * It gives error on initial load, probably because
         * SCRIPT embed. However when we delay the execution
         * Image request this problems resolves.
         */
        setTimeout(function () {
            // https://submit.jotformpro.com certificate has compatibility issues with IE8 #418400
            var UA = navigator.userAgent.toLowerCase(),
                IE = (UA.indexOf('msie') != -1) ? parseInt(UA.split('msie')[1], 10) : false;
            if (IE && IE < 9) {
                // IE 8 and below
                if (UA.indexOf('windows nt 5.1') != -1 || UA.indexOf('windows xp') != -1 || UA.indexOf('windows nt 5.2') != -1) {
                    // windows XP
                    JotForm.server = "https://www.jotform.com/server.php";
                }
            }

            var a = new Ajax.Jsonp(JotForm.url + "captcha", {
                evalJSON: 'force',
                onComplete: function (t) {
                    t = t.responseJSON || t;
                    if (t.success) {
                        $(id + '_captcha').src = t.img;
                        $(id + '_captcha_id').value = t.num;
                    }
                }
            });
        }, 150);
    },
    /**
     * Relads a new image for captcha
     * @param {Object} id
     */
    reloadCaptcha: function (id) {
        $(id + '_captcha').src = JotForm.url + 'images/blank.gif';
        JotForm.initCaptcha(id);
    },
    /**
     * Zero padding for a given number
     * @param {Object} n
     * @param {Object} totalDigits
     */
    addZeros: function (n, totalDigits) {
        n = n.toString();
        var pd = '';
        if (totalDigits > n.length) {
            for (i = 0; i < (totalDigits - n.length); i++) {
                pd += '0';
            }
        }
        return pd + n.toString();
    },
    /**
     * @param {Object} d
     */
    formatDate: function (d) {
        var date = d.date;
        var month = JotForm.addZeros(date.getMonth() + 1, 2);
        var day = JotForm.addZeros(date.getDate(), 2);
        var year = date.getYear() < 1000 ? date.getYear() + 1900 : date.getYear();
        var id = d.dateField.id.replace(/\w+\_/gim, '');
        $('month_' + id).value = month;
        $('day_' + id).value = day;
        $('year_' + id).value = year;
        if ($('lite_mode_' + id)) {
            var lite_mode = $('lite_mode_' + id);
            var seperator = lite_mode.readAttribute('seperator') || lite_mode.readAttribute('data-seperator');
            var format = lite_mode.readAttribute('format') || lite_mode.readAttribute('data-format');

            var newValue = month + seperator + day + seperator + year;
            if (format == 'ddmmyyyy') {
                newValue = day + seperator + month + seperator + year;
            } else if (format == 'yyyymmdd') {
                newValue = year + seperator + month + seperator + day;
            }
            lite_mode.value = newValue;
        }

        if ($('input_' + id)) {
          var input = $('input_' + id);
          var newValue = year + '-' + month + '-' + day;
          input.value = newValue;
      }

        $('id_' + id).fire('date:changed');
    },
    /**
     * Highlights the lines when an input is focused
     */
    highLightLines: function () {

        // Highlight selected line
        $$('.form-line').each(function (l, i) {
            l.select('input, select, textarea, div, table div, button, div div span[tabIndex]:not([tabIndex="-1"]), a, iframe').each(function (i) {
                i.observe('focus', function () {
                    if (l.parentElement && (l.parentElement.hasClassName('form-section') || l.parentElement.hasClassName('form-section-closed'))) {
                        if (JotForm.isCollapsed(l) && !l.parentElement.hasClassName('form-section-opening')) {
                            JotForm.getCollapseBar(l).run('click');
                        }
                    } else {
                        if (JotForm.isCollapsed(l)) {
                            JotForm.getCollapseBar(l).run('click');
                        }
                    }
                    if (!JotForm.highlightInputs) {
                        return;
                    }
                    l.addClassName('form-line-active');
                    // for descriptions
                    if (l.__classAdded) {
                        l.__classAdded = false;
                    }
                }).observe('blur', function () {
                    if (!JotForm.highlightInputs) {
                        return;
                    }
                    l.removeClassName('form-line-active');
                });
            });
        });
    },
    // Handle messages from widget (iframe)
    handleWidgetMessage: function() {
        window.addEventListener("message", function (message) {
            try {
                var shittyParseMessageData = function(msg) {
                    // Urgent late night fix for: https://www.jotform.com/answers/491718
                    if (typeof msg === 'string') {
                        var parsed = JSON.parse(msg);
                        return typeof parsed.data === 'string' ? JSON.parse(parsed.data) : parsed.data;
                    } else if (typeof msg === 'object' && typeof msg.data === 'string' && msg.data[0] == '{') {
                        return JSON.parse(msg.data);
                    } else if (typeof msg === 'object' && typeof msg.data === 'object') {
                        return msg.data;
                    }
                    return msg;
                };
                var parsedMessageData = shittyParseMessageData(message);
                if (parsedMessageData && parsedMessageData.type) {
                    switch(parsedMessageData.type) {
                    case 'collapse':
                        JotForm.widgetSectionCollapse(parsedMessageData.qid);
                        break;
                    case 'fields:fill':
                        JotForm.runAllCalculations();
                        break;
                  default:
                        break;
                    }
                }
            } catch (e) {
                console.error('ErrorOnHandleWigetMessage', e);
            }
        }, false);
    },
    // Bug fix :: 3409477 (Terms & Conditions + Section Collapse Bug) & 3765441 (Section Collapse disappears when tabbed over)
    widgetSectionCollapse: function(qid) {
        if (qid) {
            var el = document.getElementById('cid_' + qid);
            if (JotForm.isCollapsed(el)) {
                JotForm.getCollapseBar(el).run('click');
            }
        }
    },
    /**
     * Gets the container FORM of the element
     * @param {Object} element
     */
    getForm: function (element) {
        element = $(element);
        if (!element.parentNode) {
            return false;
        }
        if (element && element.tagName == "BODY") {
            return false;
        }
        if (element.tagName == "FORM") {
            return $(element);
        }
        return JotForm.getForm(element.parentNode);
    },
    /**
     * Gets the container of the input
     * @param {Object} element
     */
    getContainer: function (element) {
        element = $(element);
        if (!element || !element.parentNode) {
            return false;
        }
        if (element && element.tagName == "BODY") {
            return false;
        }
        if (element.hasClassName("form-line")) {
            return $(element);
        }
        return JotForm.getContainer(element.parentNode);
    },

    /**
     * Get the containing section the element
     * @param {Object} element
     */
    getSection: function (element) {
        element = $(element);
        if (!element.parentNode) {
            return false;
        }
        if (element && element.tagName == "BODY") {
            return false;
        }
        if ((element.hasClassName("form-section-closed") || element.hasClassName("form-section")) && !element.id.match(/^section_/)) {
            return element;
        }
        return JotForm.getSection(element.parentNode);
    },
    /**
     * Get the fields collapse bar
     * @param {Object} element
     */
    getCollapseBar: function (element) {
        element = $(element);
        if (!element.parentNode) {
            return false;
        }
        if (element && element.tagName == "BODY") {
            return false;
        }
        if (element.hasClassName("form-section-closed") || element.hasClassName("form-section")) {
            return element.select('.form-collapse-table')[0];
        }
        return JotForm.getCollapseBar(element.parentNode);
    },
    /**
     * Check if the input is collapsed
     * @param {Object} element
     */
    isCollapsed: function (element) {
        element = $(element);
        if (!element.parentNode) {
            return false;
        }
        if (element && element.tagName == "BODY") {
            return false;
        }
        if (element.className == "form-section-closed") {
            return true;
        }
        return JotForm.isCollapsed(element.parentNode);
    },
    /**
     * Check if the input is visible
     * @param {Object} element
     */
    isVisible: function (element) {
        element = $(element);
        if (!element.parentNode) {
            return false;
        }

        if (element.hasClassName('always-hidden')) {
            return false;
        }

        if (element && element.tagName == "BODY") {
            return true;
        }

        //exception for rich text editor because element is never visible
        if (element.hasClassName("form-textarea") && element.up('div').down('.nicEdit-main')
            && (element.up('.form-line') && JotForm.isVisible(element.up('.form-line')))) {

            return true;
        }

        if (element.style.display == "none" || element.style.visibility == "hidden" || element.hasClassName('js-non-displayed-page')) {
            return false;
        }

        return JotForm.isVisible(element.parentNode);
    },

    /**
     * check whether a current section has any widgets visible
     * @param  {object} section [the current section to check with]
     * @return {boolean}        [boolean value]
     */
    sectionHasVisibleiFrameWidgets: function (section) {
        var elements = section.select('.custom-field-frame');
        var hasVisible = false;
        elements.each(function (el) {
            if (JotForm.isVisible(el)) {
                hasVisible = true;
                throw $break;
            }
        });
        return hasVisible;
    },

    /**
     * Emre: to eneable/disable all submit buttons in multi-forms
     */
    enableDisableButtonsInMultiForms: function () {
        var allButtons = $$('.form-submit-button');
        allButtons.each(function (b) {
            if (b.up('ul.form-section')) {
                if (b.up('ul.form-section').style.display == "none" || b.up('ul.form-section').hasClassName('js-non-displayed-page')) {
                    b.disable();
                } else {
                    if (b.className.indexOf("disabled") == -1 && !b.hasClassName("conditionallyDisabled")) {
                        b.enable();
                    }
                }
            }
        });
    },

    /**
     * Enables back the buttons
     */
    enableButtons: function () {
        setTimeout(function () {
            $$('.form-submit-button').each(function (b) {
                if(!b.hasClassName("conditionallyDisabled")) {
                    b.enable();
                }
                if (b.innerHTML.indexOf('<img') === -1 && (b.type === 'submit' || b.classList.contains('jsMobileSubmit'))) {
                    b.innerHTML = b.oldText2 || b.oldText || 'Submit';
                }
            });
        }, 60);
    },

    disableButtons: function () {
        setTimeout(function () {
            $$('.form-submit-button:not(.js-new-sacl-button)').each(function (b) {
                if (b.innerHTML.indexOf('<img') === -1 && (b.type === 'submit' || b.classList.contains('jsMobileSubmit'))) {
                    if (!b.oldText2) {
                        b.oldText2 = b.innerHTML;
                    }
                    b.oldText = b.innerHTML;
                    b.innerHTML = JotForm.texts.pleaseWait;
                }
                b.addClassName('lastDisabled');
                b.disable();
            });
        }, 60);
    },

    /**
     * Sets the actions for buttons
     * - Disables the submit when clicked to prevent double submit.
     * - Adds confirmation for form reset
     * - Handles the print button
     */
    setButtonActions: function () {
        // window.checkForHiddenSection = false;

        $$('.form-submit-button:not(.forReviewButton):not(.js-new-sacl-button)').each(function (b) {
            b.oldText = b.innerHTML;
            b.enable(); // enable previously disabled button

            //Emre: to provide sending form with with clicking "enter" button in Multi-page forms
            //JotForm.enableDisableButtonsInMultiForms();
            if (getQuerystring('qp') === "") {
                b.observe('click', function (e) {
                    // if (
                    //     $(e.target)
                    //     && $(e.target).up
                    //     && $(e.target).up('ul.form-section')
                    //     && $(e.target).up('ul.form-section').querySelector
                    //     && $(e.target).up('ul.form-section').querySelector('.form-pagebreak-next')
                    // ) {
                    //     window.checkForHiddenSection = true;
                    //     var allFieldsAreValid = true;
                
                    //     var allSections = document.querySelectorAll('ul.form-section');
                
                    //     for (var i = 0; i < allSections.length; i++) {
                    //         var result = JotForm.validateAll(document.forms[0], allSections[i]);
                
                    //         if (!result) {
                    //             allFieldsAreValid = false;
                    //             break;
                    //         }
                
                    //         allFieldsAreValid = true;
                    //     }
                
                    //     if (!allFieldsAreValid) {
                    //         if (!e.target.parentNode.parentNode.querySelector('.form-button-error')) {
                    //             var errorBox = new Element('div', {className: 'form-button-error'});
                    //             errorBox.insert(JotForm.texts.generalPageError);
                    //             $(e.target.parentNode.parentNode).insert(errorBox);
                    //         }

                    //         return false;
                    //     }
                
                    //     window.checkForHiddenSection = false;
                    // }

                    setTimeout(function () {
                        //Emre: to display all submit buttons
                        if (!$$('.form-error-message')[0] && !$$('.form-textarea-limit-indicator-error')[0]) { //Emre: when limit text are is used, submit button doesn't work (51335)
                            var allButtons = $$('.form-submit-button:not(.js-new-sacl-button)');
                            allButtons.each(function (bu) {
                                if (true) { // not for braintree
                                    if (bu.innerHTML.indexOf('<img') === -1 && bu.type === 'submit') {
                                        bu.innerHTML = JotForm.texts.pleaseWait;
                                    }
                                    //Emre: submit button problem (51335)
                                    bu.addClassName('lastDisabled');
                                    bu.disable();
                                }
                            });
                        }
                    }, 50);
                });
            }
        });

        $$('.form-submit-reset').each(function (b) {
            b.onclick = function () {
                if (!confirm(JotForm.texts.confirmClearForm)) {
                    return false;
                } else {
                    // reset subtotals, too
                    if (JotForm.payment && $$('span[id*="_item_subtotal"]').length > 0) {
                        var zeroValue = '0';
                        if (!!JotForm.currencyFormat.decimal) {
                            zeroValue = '0' + JotForm.currencyFormat.dSeparator + '00';
                        }
                        $$('span[id*="_item_subtotal"]').each(function (el) {
                            el.update(zeroValue);
                        });
                    }
                    if (/chrom(e|ium)/.test(navigator.userAgent.toLowerCase()) && $('coupon-button')) {
                        // #935284 chrome browsers does not clear total price if it has payment coupon
                        setTimeout(function () {
                            if ($('payment_total')) {
                                JotForm.totalCounter(JotForm.prices);
                            }
                        }, 40);
                        // #529035 chrome browsers scroll down when pressing clear and if form has coupon field
                        return true;
                    }
                }

                //clear all errors after clear form called start feature request 154829
                $$(".form-line-error").each(function (tmp) {
                    tmp.removeClassName("form-line-error");

                });

                $$(".form-error-message", ".form-button-error").each(function (tmp) {
                    tmp.remove();
                });
                //clear all errors after form called end
                //feature request 154940  must reset any form char limits for textareas start

                $$(".form-textarea-limit-indicator > span").each(function (tmp) {
                    var raw = tmp.innerHTML;
                    tmp.innerHTML = raw.replace(raw.substring(0, raw.indexOf("/")), "0");

                });

                //feature request implementation end

                //bugfix 187865  also reset grading tools total field
                $$("span[id^=grade_point_]").each(function (tmp) {
                    tmp.innerHTML = 0;
                });
                $$(".form-grading-error").each(function (tmp) {
                    tmp.innerHTML = ""; //also remove any previous grading errors
                });
                //bugfix end
                //note: TODO: instead of distinctively handling corner cases, it is best to fire a form change event that will trigger correct behaviour -kemal


                //b#423200 ensure that radios/chks are reset to defaults when autofill is enabled
                var autofill = $$('form')[0].readAttribute('data-autofill');
                if (autofill) {
                    setTimeout(function () {
                        for (var inputId in JotForm.defaultValues) {
                            var input = $(inputId);
                            if (input && (input.type == "radio" || input.type == "checkbox")) {
                                input.checked = true;
                            }
                        }

                        //save all the current (empty) data
                        var formID = $$('form').first().readAttribute('id') + $$('form').first().readAttribute('name');
                        var autoFillInstance = AutoFill.getInstance(formID);
                        if (autoFillInstance) {
                          if(window.location.href.indexOf('jotform.pro') === -1){
                            autoFillInstance.saveAllData(); // Work only in PROD
                          }
                        }

                    }, 40);
                }

                setTimeout(function () {
                    $$('.custom-hint-group').each(function (element) { //redisplay textarea hints
                        element.hasContent = ( element.value && element.value.replace(/\n/gim, "<br>") != element.readAttribute('data-customhint')) ? true : false;
                        element.showCustomPlaceHolder();
                    });
                }, 30);


                //clear rich text
                setTimeout(function () {
                    $$('.nicEdit-main').each(function (richArea) {
                        var txtarea = richArea.up('.form-line').down('textarea');
                        if (txtarea) {
                            if (txtarea.hasClassName('custom-hint-group') && !txtarea.hasContent) {
                                richArea.setStyle({'color': '#babbc0'});
                            } else {
                                richArea.setStyle({'color': ''});
                            }
                            richArea.innerHTML = txtarea.value;
                        }
                    });
                }, 40);

                //reset payment
                setTimeout(function () {
                    if ($('coupon-button') && $('coupon-button').triggerEvent) {
                        $('coupon-button').triggerEvent("click");
                    }
                    if ($('payment_total')) {
                        JotForm.totalCounter(JotForm.prices);
                    }
                }, 40);

                // reset widget inputs
                setTimeout(function () {
                    $$('input.form-widget').each(function (node) {
                        node.value = '';
                        node.fire('widget:clear', {
                            qid: parseInt(node.id.split('_')[1])
                        });
                    });
                }, 40);

                setTimeout(function () {
                    $$('.currentDate').each(function (el) {
                        var id = el.id.replace(/day_/, "");
                        JotForm.formatDate({date: (new Date()), dateField: $('id_' + id)});
                    });
                    $$('.currentTime').each(function (el) {
                        if (el.up(".form-line")) {
                            var id = el.up(".form-line").id.replace("id_", "");
                            if ($("hour_" + id)) {
                                JotForm.displayLocalTime("hour_" + id, "min_" + id, "ampm_" + id);
                            } else {
                                JotForm.displayLocalTime("input_" + id + "_hourSelect", "input_" + id + "_minuteSelect", "input_" + id + "_ampm", "input_" + id + "_timeInput", false)
                            }
                        }
                    });
                }, 40);

                setTimeout(function () {
                    JotForm.runAllConditions();
                }, 50);
            };
        });

        $$('.form-submit-print').each(function (print_button) {

            print_button.observe("click", function () {
                $(print_button.parentNode).hide();
                //nicedit compatibility start:
                var hidden_nicedits_arr = []; //nicedit.js rich text editors require special actions this will hold them to allow us to restore them to later stage
                var nicedit_textarea_to_hide = []; //after print completed textareas will be shown, we do not want nicedit textareas to be shown
                //nicedit compatibility end

                //omer - detecting media print style rules
                /*
                 fileCount = document.styleSheets.length;
                 injectedCss = document.styleSheets[fileCount-1];
                 printStyle = '';

                 for(i=0; i<injectedCss.cssRules.length; i++) {
                 if(injectedCss.cssRules[i].media) {
                 if (injectedCss.cssRules[i].media[0]=="print") {
                 printStyle += injectedCss.cssRules[i].cssText;
                 }
                 }
                 }
                 */
                //omer

                $$('.form-textarea, .form-textbox').each(function (el) {

                    if (!el.type) { // type of slider is undefined
                        el.value = el.value || '0'; // to protect problem when slider has no value
                    }
                    //Emre: to prevent css problem on "Date Time" so <span> must be added(66610)
                    var dateSeparate;
                    if (dateSeparate = el.next('.date-separate')) {
                        dateSeparate.hide();
                    }
                    //Emre: we must specify "width" and "height" to prevent getting new line
                    var elWidth = "";
                    if (el.value.length < el.size) {
                        elWidth = "width:" + el.size * 9 + "px;";
                    }

                    //kemal: 'display:inline-block' added to prevent bug:219794 phone field prints miss aligned. display:inline-block only added el is of Phone Field
                    if (el.id.indexOf("_area") != -1 || el.id.indexOf("_phone") != -1 || (el.id.indexOf("_country") != -1 && el.readAttribute('type') == 'tel')) {
                        elWidth += " display:inline-block;"
                    }

                    //nicedit compatibility start: kemal: richtext editor compatibility: 1st check if el is form-textarea and also is a rich text editor
                    if (el.hasClassName("form-textarea") && "nicEditors" in window) { //"nicEditors" in window added for somehow if this check fails, do not give errors
                        $$("#cid_" + el.id.split("_")[1] + " > div:nth-child(1)").each(function (tmpel) {
                            if (tmpel.readAttribute("unselectable") == "on") {
                                // hide toolbar
                                $$("#cid_" + el.id.split("_")[1] + " > div")[0].hide();
                                // add border to text div
                                $$("#cid_" + el.id.split("_")[1] + " > div")[1].setStyle({
                                    borderTopStyle: 'solid',
                                    borderWidth: '1px',
                                    borderTopColor: 'rgb(204, 204, 204)'
                                });
                                hidden_nicedits_arr.push($$("#cid_" + el.id.split("_")[1] + " > div")[0]); // push editor toolbars to hidden divs to be later shown
                                nicedit_textarea_to_hide.push(el);// push textarea of nicedit, to be later hidden, because after print process completes we show all textareas by default
                            }
                        });
                    }
                    //nicedit compatibility end
                    /*el.insert({
                     before: new Element('div', {
                     className: 'print_fields'
                     }).update(el.value.replace(/\n/g, '<br>')).setStyle('padding:1px 4px; min-height:18px;' + elWidth)
                     }).hide();*/
                });
                window.print();

                /*$$('.form-textarea, .form-textbox, .date-separate').invoke('show');
                 $$('.print_fields').invoke('remove');*/

                //nicedit compatibility start: also show hidden richtextEditor divs and hide richtextEditor textareas start
                for(var i=0; i<hidden_nicedits_arr.length;i++){hidden_nicedits_arr[i].show();}
                for(var i=0; i<nicedit_textarea_to_hide.length;i++){nicedit_textarea_to_hide[i].hide();}
                //nicedit compatibility end

                $(print_button.parentNode).show();
            });

        });
    },

    hasMinTotalOrderAmount: function () {
      var minTotalOrderAmountHiddenField = document.getElementsByName('minTotalOrderAmount');
      var hasMinTotalOrderAmount = typeof minTotalOrderAmountHiddenField !== 'undefined' && minTotalOrderAmountHiddenField.length > 0;
      var minTotalOrderAmount = hasMinTotalOrderAmount === true ? minTotalOrderAmountHiddenField[0].value : '0';
      
      JotForm.minTotalOrderAmount = minTotalOrderAmount;
      
      return hasMinTotalOrderAmount;
      
    },
  
    handleMinTotalOrderAmount: function () {
       if (JotForm.isPaymentSelected() === true && JotForm.hasMinTotalOrderAmount() === true && JotForm.minTotalOrderAmount > 0 && JotForm.getPaymentTotalAmount() < JotForm.minTotalOrderAmount) {
          var errorTxt = JotForm.texts.ccDonationMinLimitError.replace('{minAmount}', JotForm.minTotalOrderAmount).replace('{currency}', JotForm.currencyFormat.curr);
          JotForm.errored(document.querySelectorAll('[data-payment]')[0], errorTxt);
          return true;
      }
      return false;
    },
    /**
     * These will correct any errors in a tool with a validations
     * especially in hidden mode. Thus it will ignore the said validation
     */
    hasHiddenValidationConflicts: function (input) {
        var hiddenOBJ = input.up('li.form-line');
        return hiddenOBJ && (hiddenOBJ.hasClassName('form-field-hidden') || hiddenOBJ.up('ul.form-section').hasClassName('form-field-hidden'));
    },

    /**
     * Handles the functionality of control_grading tool
     */
    initGradingInputs: function () {

        var _this = this;//JotForm object

        $$('.form-grading-input').each(function (item) {

            //register a blur event to validate the
            item.observe('blur', function () {
                item.validateGradingInputs();
            });
            item.observe('keyup', function () {
                item.validateGradingInputs();
            });

            //create a function that will check the validity of inputs
            //attach it to the items/grading inputs
            item.validateGradingInputs = function () {
                var item = this,
                    id = item.id.replace(/input_(\d+)_\d+/, "$1"),
                    total = 0,
                    _parentNode = $(item.parentNode.parentNode),
                    numeric = /^(\d+[\.]?)+$/,
                    isNotNumeric = false;

                // on cardforms - should get the question field parent
                if (window.FORM_MODE === 'cardform') {
                  _parentNode = _parentNode.parentNode;
                }

                //correct any errors first that is attach in the item obj
                item.errored = false;

                _parentNode.select(".form-grading-input").each(function (sibling) {
                    if (sibling.value && !numeric.test(sibling.value)) {
                        isNotNumeric = true;
                        throw $break;
                    }
                    total += parseFloat(sibling.value) || 0;
                });

                //check if hidden, if so return its valid
                if (_this.hasHiddenValidationConflicts(item)) return JotForm.corrected(item);

                //if not numeric then return an error
                if (isNotNumeric) {
                    return JotForm.errored(item, JotForm.texts.numeric);
                }

                if ($("grade_total_" + id)) {
                    //set the grade error notifier to empty
                    $("grade_error_" + id).innerHTML = "";
                    //set the allowed total to the grade_point notifier
                    var allowed_total = parseFloat($("grade_total_" + id).innerHTML);
                    $("grade_point_" + id).innerHTML = total;

                    if (total > allowed_total) {
                        //do the error display
                        $("grade_error_" + id).innerHTML = ' ' + JotForm.texts.lessThan + ' <b>' + allowed_total + '</b>.';
                        return JotForm.errored(item, JotForm.texts.gradingScoreError + " " + allowed_total);
                    }
                    else {
                        //remove error display
                        return JotForm.corrected(item);
                    }
                } else {
                    return JotForm.corrected(item);
                }
            }
        });
    },
    /**
     * Handles the functionality of control_spinner tool
     */
    initSpinnerInputs: function () {
        var _this = this;//JotForm object

        $$('.form-spinner-input').each(function (item) {

            //register a blur/change event to validate the data
            item.observe('blur', function () {
                item.validateSpinnerInputs();
            }).observe('change', function () {
                item.validateSpinnerInputs();
            });

            //register an event when the carret is clicked
            var c_parent = item.up('.form-spinner'),
                c_up = c_parent.select('.form-spinner-up')[0],
                c_down = c_parent.select('.form-spinner-down')[0];

            c_up.observe('click', function (e) {
                item.validateSpinnerInputs();
            });
            c_down.observe('click', function (e) {
                item.validateSpinnerInputs();
            });

            //create a function that will check the validity of inputs
            //attach it to the items/spinner inputs
            item.validateSpinnerInputs = function () {
                var item = this,
                    id = item.id.replace(/input_(\d+)_\d+/, "$1"),
                    numeric = /^(-?\d+[\.]?)+$/,
                    numericDotStart = /^([\.]\d+)+$/,  //accept numbers starting with dot
                    userInput = item.value || 0;

                //correct any errors first that is attach in the item obj
                item.errored = false;

                //check if hidden, if so return its valid
                if(!JotForm.isVisible(item)) return JotForm.corrected(item);

                if (userInput && !numeric.test(userInput) && !numericDotStart.test(userInput)) {
                    return JotForm.errored(item, JotForm.texts.numeric);
                }
                if(item.hasClassName("disallowDecimals") && userInput % 1 != 0) {
                    return JotForm.errored(item, JotForm.texts.disallowDecimals);
                }

                //read the min and max val total, and check for inputs
                var min_val = parseInt(item.readAttribute('data-spinnermin')),
                    max_val = parseInt(item.readAttribute('data-spinnermax'));

                if ((min_val || min_val == 0) && userInput < min_val) {
                    return JotForm.errored(item, JotForm.getValidMessage(JotForm.texts.inputCarretErrorA, min_val));
                }
                else if ((max_val || max_val == 0) && userInput > max_val) {
                    return JotForm.errored(item, JotForm.getValidMessage(JotForm.texts.inputCarretErrorB, max_val));
                }
                else {
                    //remove error display
                    return JotForm.corrected(item);
                }
            }
        });
    },

    /**
     * 
     */
    initTestEnvForNewDefaultTheme: function () {
        if (
            window
            && window.location
            && window.location.search
        ) {
            var params = window.location.search;

            if (params.indexOf('ndtTestEnv=1') > -1) {
                var formSection = document.querySelector('.form-all') || null;
                if (formSection) formSection.classList.add('ndt-test-env');
            }
        }
    },
    /**
     * init time input events for timev2 (time & datetime fields)
     */
    initTimev2Inputs: function () {
        var inputs = document.querySelectorAll('input[id*="timeInput"][data-version="v2"]');
        var userClickDetected = false;
        var userTouchDetected = false;

        if (navigator.userAgent.match(/Android/i)) {
            window.addEventListener('click', function() {
                userClickDetected = true;
                setTimeout(function() {userClickDetected = false;}, 500);
            });
            // Keeps track of user touch for 0.5 seconds
            window.addEventListener('touchstart', function() {
                userTouchDetected = true;
                setTimeout(function() {userTouchDetected = false;}, 500);
            });
        }

        var dateTimeOnComplete = function(e) {
            var values = e.target.value.split(':');
            var hh = e.target.parentElement.querySelector('input[id*="hourSelect"]');
            var mm = e.target.parentElement.querySelector('input[id*="minuteSelect"]');
            hh.value = values[0];
            mm.value = values[1];
            hh.triggerEvent('change');
            mm.triggerEvent('change');
            JotForm.runConditionForId(e.target.up('li.form-line').id.replace('id_', ''));
        }

        for (var i = 0; i < inputs.length; i++) {
            try {
                var imask = new Inputmask({
                    alias: 'datetime',
                    inputFormat: inputs[i].dataset.mask ? inputs[i].dataset.mask : 'hh:MM',
                    inputEventOnly: true,
                    jitMasking: true,
                    oncomplete: dateTimeOnComplete,
                    onincomplete: function (e) {
                        var values = e.target.value.split(':');
                        var hh = e.target.parentElement.querySelector('input[id*="hourSelect"]');
                        hh.value = values[0];
                        var mm = e.target.parentElement.querySelector('input[id*="minuteSelect"]');
                        if (!!values[1]) {
                            mm.value = values[1].length === 2 ? values[1] : values[1] + '0';
                        } else {
                            mm.value = '';
                        }
                        hh.triggerEvent('change');
                        mm.triggerEvent('change');
                    },
                    oncleared: function (e) {
                        var hh = e.target.parentElement.querySelector('input[id*="hourSelect"]');
                        var mm = e.target.parentElement.querySelector('input[id*="minuteSelect"]');
                        hh.value = '';
                        mm.value = '';
                        hh.triggerEvent('change');
                        mm.triggerEvent('change');
                    }
                });
                imask.mask(inputs[i]);
                // fix for placeholder on mouse enter
                inputs[i].addEventListener('mouseenter', function (e) {
                    e.target.placeholder = 'HH : MM';
                });

                inputs[i].addEventListener('change', function(e) {
                    if(e.target.value && /^[0-9]{2}:[0-9]{2}$/.test(e.target.value)) {
                        dateTimeOnComplete(e);
                    }
                });

                var changeEvent = new Event('change');
                inputs[i].dispatchEvent(changeEvent);

                if (navigator.userAgent.match(/Android/i)) {
                    var timeWrapper = inputs[i].parentNode;
                    if (timeWrapper && timeWrapper.className.indexOf('hasAMPM') > 0) {
                        inputs[i].addEventListener('blur', function(e) {
                            if (!userClickDetected && !userTouchDetected) {
                                var timeDropdownSelector = e.target.id.replace('timeInput', 'ampm');
                                var timeDropdown = document.getElementById(timeDropdownSelector);
                                timeDropdown.focus();
                            }
                        });
                    }
                }

            } catch (e) {
                return;
            }
        }
    },
    renderTermsAndConditions: function(settings) {
      if (settings.data.data === 'termsAndConditions') { 

        var main = document.querySelector('.form-all');
        var container = document.createElement('div');
        
        container.id ='terms_conditions_modal';
        container.style.display ='block';

        var content = document.createElement('div');
        content.className ='terms-conditions-content';

        var sectionPart = document.createElement('section');
        sectionPart.className = "terms-header";
        content.appendChild(sectionPart);

        var headerText = document.createElement('h1');
        headerText.textContent = 'Terms and Conditions';

        var otherText = document.createElement('h3');
        otherText.textContent = 'Please read carefully our latest terms and conditions.';

        var buttonCancel = document.createElement('button');
        buttonCancel.type = 'button';
        buttonCancel.id = 'terms_conditions_modal_cancel';
        buttonCancel.textContent = 'X';
        buttonCancel.addEventListener('click', closeModel);

        sectionPart.appendChild(headerText);
        sectionPart.appendChild(otherText);
        sectionPart.appendChild(buttonCancel);

        var iframe = document.createElement('iframe');
        iframe.src = linkValidation(settings.data.settings.termsLink);
        iframe.allow = 'fullscreen';
        iframe.className = 'iframeModel';

        content.appendChild(iframe);

        var agreeButton = document.createElement('button');
        agreeButton.type= 'button';
        agreeButton.id ='terms_conditions_modal_accept';
        agreeButton.textContent = 'I Agree';
        agreeButton.addEventListener('click', sendData);

        content.appendChild(agreeButton);
        container.appendChild(content);
        main.appendChild(container);
        }

        function sendData() {
          var id = '#customFieldFrame_' + settings.data.settings.qid;
          var widgetIframe = document.querySelector(id).contentWindow;
          widgetIframe.postMessage({data: 'termsAndConditions', settings: { qid: settings.data.settings.qid , status: 'accepted'}}, '*');
          closeModel();
        }

        function closeModel() {
          container.style.display ='none';
        }

        function linkValidation(link) {
          if (link && link.length > 0) {
            var validation = link.search("http:\/\/");
            link = (validation >= 0 || link.toLowerCase().indexOf('https') >= 0) ? link : 'https:\/\/' + link;
          } else {
            link = "https://www.jotform.com";
          }
          return link;
        }
    },
    
    getMessageFormTermsAndCondition: function(){
        if (window.location.href.indexOf('ndt=1') === -1) return;
        window.addEventListener('message', this.renderTermsAndConditions, true);
    },
    
    initDateV2Inputs: function() {
        var liteModeInputs = document.querySelectorAll('input[id*="lite_mode_"]');

        for(var i = 0; i < liteModeInputs.length; i++) {
            var dateFormat = liteModeInputs[i].dataset.format.toLowerCase();
            var dateSeperator = liteModeInputs[i].dataset.seperator || "-";
            dateFormat = dateFormat.match(/(.)\1+/g).join(liteModeInputs[i].dataset.seperator);
            try {
                var imask = new Inputmask({
                    alias: 'datetime',
                    inputFormat: dateFormat,
                    inputEventOnly: true,
                    placeholder: liteModeInputs[i].placeholder,
                    onKeyDown: function(event, buffer, caretPos, opts) {
                        if (event.keyCode === 8 && caretPos.begin === 0 && caretPos.end !== 1) {
                            this.value = this.placeholder;
                        }
                    },
                    oncomplete: function (e) {
                        var splittedDateFormat = dateFormat.split(dateSeperator);
                        var monthIndex = splittedDateFormat.indexOf("mm");
                        var yearIndex = splittedDateFormat.indexOf("yyyy");
                        var dayIndex = splittedDateFormat.indexOf("dd");

                        var qid = e.target.getAttribute("id").split("_")[2];
                        var splittedDate = e.target.value.split(dateSeperator);
                        $("day_" + qid).value = splittedDate[dayIndex];
                        $("year_" + qid).value = splittedDate[yearIndex];
                        $("month_" + qid).value = splittedDate[monthIndex];
                    },
                    // jitMasking: true,
                });
                imask.mask(liteModeInputs[i]);
            } catch (e) {
                return;
            }
        }

        var monthInputs = document.querySelectorAll('input[id*="month_"]');
        for(var i = 0; i < monthInputs.length; i++) {
            try {
                var imask = new Inputmask({
                    alias: 'datetime',
                    inputFormat: 'mm',
                    jitMasking: true,
                });
                imask.mask(monthInputs[i]);
            } catch (e) {
                return;
            }
        }

        var dayInputs = document.querySelectorAll('input[id*="day_"]');
        for(var i = 0; i < dayInputs.length; i++) {
            try {
                var imask = new Inputmask({
                    alias: 'datetime',
                    inputFormat: 'dd',
                    jitMasking: true,
                });
                imask.mask(dayInputs[i]);
            } catch (e) {
                return;
            }
        }
    },

    /**
     * init other inputs for default theme v2 (checkbox & radio fields)
     */
    dropDownColorChange: function() {
        var dropDownFields = document.querySelectorAll('select.form-dropdown');
        if(dropDownFields) {
            for(var i=0; i<dropDownFields.length; i++) {
                if(dropDownFields[i] && dropDownFields[i].value) {
                    dropDownFields[i].addClassName('is-active');
                }
                dropDownFields[i].addEventListener('change', function(e) {
                    if(e.target.value) {
                        e.target.addClassName('is-active');       
                    } else {
                        e.target.removeClassName('is-active');
                    }
                });
            }
        }
    },

    initOtherV2Options: function () {
        var handleInputView = function (params) {
            var e = params.e || null;
            var container = params.container || null;
            var input = params.input || null;

            if (!e || !container || !input) {
                return false;
            }

            var checkPoint = null;
            if (typeof e.target.getAttribute('checked-before') === 'object') {
                checkPoint = e.target.checked;
            } else {
                checkPoint = e.target.getAttribute('checked-before') === '1';
            }

            if (checkPoint) {
                container.removeClassName('is-none');
                input.focus({ preventScroll: true });
            } else {
                container.addClassName('is-none');
                input.value = '';
            }
            
            var otherInputOption = container.parentNode.querySelector('input.form-radio-other') || container.parentNode.querySelector('input.form-checkbox-other');
            input.addEventListener("keydown", function(e) {
              var charCode = e.which || e.keyCode || e.charCode;

              if ((charCode === 38) || (charCode === 40)) {
                container.addClassName('is-none');
                input.value = '';
                otherInputOption.focus();
              }
            });
            
            input.addEventListener("keyup", function() {
              otherInputOption.value = input.value;
            });
        }

        // reset other inputs for v2 events
        var otherInputs = document.querySelectorAll('.form-checkbox-other-input, .form-radio-other-input');
        // reset all other text input container inline styles - start
        // to not use inline style feature
        for (var i = 0; i < otherInputs.length; i++) {
            otherInputs[i].parentNode.setAttribute('style', '');
            if (otherInputs[i].value !== '') {
               otherInputs[i].parentNode.setAttribute('class', 'other-input-container');
            }
            else {
               otherInputs[i].parentNode.setAttribute('class', 'other-input-container is-none');
            }
        }

        //  Do not touch other option if form's a cardform
        if (window.FORM_MODE !== 'cardform') {
            for (var i = 0; i < otherInputs.length; i++) {
                var oldEl = otherInputs[i];
                var newEl = oldEl.cloneNode(true);
                oldEl.parentNode.replaceChild(newEl, oldEl);
                newEl.placeholder = newEl.dataset.placeholder;
            }
        }

        // handle checkboxes' other change
        var checkboxOtherOptions = document.querySelectorAll('li.form-line[data-type="control_checkbox"] input[type="checkbox"]');
        for (var i = 0; i < checkboxOtherOptions.length; i++) {
            checkboxOtherOptions[i].addEventListener('change', function (e) {
                var otherContainerID = e.target.id + '_input';
                var otherContainer = document.getElementById(otherContainerID);
                var otherInputID = e.target.id.replace('other', 'input');
                var otherInput = document.getElementById(otherInputID);

                if (e.target.className.indexOf('form-checkbox-other') < 0) {
                    return; // if selected one is not 'other' option then exit
                }

                handleInputView({
                    e: e,
                    container: otherContainer,
                    input: otherInput
                });
            });
        }
        // handle radios' other change
        var radioOtherOptions = document.querySelectorAll('li.form-line[data-type="control_radio"] input[type="radio"]');
        for (var i = 0; i < radioOtherOptions.length; i++) {
            radioOtherOptions[i].addEventListener('click', function (e) {
                var otherContainerID = e.target.up('li.form-line').id.replace('id', 'other') + '_input';
                var otherContainer = document.getElementById(otherContainerID);
                var otherInputID = e.target.up('li.form-line').id.replace('id', 'input');
                var otherInput = document.getElementById(otherInputID);

                if (e.target.className.indexOf('form-radio-other') < 0) {
                    if (otherContainer && otherInput) {
                        otherContainer.addClassName('is-none');
                        otherInput.value = '';
                    }
                    return;
                }

                handleInputView({
                    e: e,
                    container: otherContainer,
                    input: otherInput
                });
            });
        }
    },

    /**
     * init matrix table fields for default theme v2
     */
    initRadioInputV2: function (labelElArr) {
        var checkBeforeFunc = function (label) {
            var inputId = label.getAttribute('for');
            var input = document.querySelector('input[id="' + inputId + '"]');

            if (
                !input.getAttribute('checked-before')
                || input.getAttribute('checked-before') === '0'
            ) {
                input.setAttribute('checked-before', 1);
                input.checked = true;
            } else {
                input.setAttribute('checked-before', 0);
                setTimeout(function () {
                    input.checked = false;
                }, 0);
            }
        };

        var clearCheck = function(selectedInput) {
            if (selectedInput.nodeName !== 'LABEL' && !selectedInput.getAttribute('for')) {
                return false;
            }

            var selectedInputId = selectedInput.getAttribute('for');
            var parentNode = $(selectedInput).up('.form-line');
            var allInputs = parentNode.querySelectorAll('input[checked-before]');

            for (var i = 0; i < allInputs.length; i++) {
                if (selectedInputId === allInputs[i].id) {
                    continue;
                }

                if (allInputs[i].getAttribute('checked-before')) {
                    allInputs[i].setAttribute('checked-before', 0);
                }
            }
        };

        for (var i = 0; i < labelElArr.length; i++) {
            labelElArr[i].addEventListener('click', function (e) {
                if (e.target) {
                  clearCheck(e.target);
                }

                checkBeforeFunc(e.target);
            });
        }
    },

    /**
     * init header section for new default theme
     */
    initHeaderSection: function (pageArr) {
        // check page's quantity
        if (pageArr.length < 2) { return false; }

        var selectedHeaderWrapper = null;
        var selectedHeaderIndex = 0;
        var headerWrapperArr = document.querySelectorAll('*[data-type="control_head"]');

        for (var i = 0; i < headerWrapperArr.length; i++) {
            if (headerWrapperArr[i].getAttribute('class') && headerWrapperArr[i].getAttribute('class').indexOf('always-hidden') > -1) {
                break;
            }

            selectedHeaderIndex = i;

            // select first header
            if (!selectedHeaderIndex > i) {
                selectedHeaderWrapper = headerWrapperArr[i];
            }
        }

        for (var pI = 0; pI < pageArr.length; pI++) {
            if (pI > 0) {
                var clonedHeader = document.createElement('li');
                clonedHeader.setAttribute('class', 'cloned-header');
                clonedHeader.innerHTML = selectedHeaderWrapper.querySelector('.form-header-group').parentNode.innerHTML;
    
                pageArr[pI].insertBefore(clonedHeader, pageArr[pI].firstChild);
            }

        }
    },

    /**
     * Handles the validation for minimum character length of control_textbox field
     */
    initTextboxValidation: function () {
        $$('.form-textbox[data-minlength]').each(function (item) {
            item.validateTextboxMinsize = function () {
                var item = this;

                //correct any errors first that is attach in the item obj
                item.errored = false;

                //check if hidden, if so return its valid
                if (!JotForm.isVisible(item)) return JotForm.corrected(item);

                var min_val = parseInt(item.readAttribute('data-minlength'));
                if (item.value.length < min_val) {
                    return JotForm.errored(item, JotForm.getValidMessage(JotForm.texts.minCharactersError, min_val));
                }
                else {
                    var error = false
                    if (item.up('.form-matrix-table')) {
                        item.up('.form-matrix-table').select('input').each(function (el) {
                            if ((el !== item) && el.hasClassName('form-validation-error')) {
                                error = true;
                            }
                        });

                    }
                    //remove error display
                    if (!error) {
                        return JotForm.corrected(item);
                    }
                }
            }
        })
    },

    /**
     * Handles the functionality of control_number tool
     */
    initNumberInputs: function () {
        var _this = this;//JotForm object

        $$('.form-number-input').each(function (item) {

            //register a blur/change event to validate the data
            item.observe('blur', function () {
                item.validateNumberInputs();
            }).observe('change', function () {
                item.validateNumberInputs();
            }).observe('keyup', function () {
                item.validateNumberInputs();
            }).observe('keypress', function (event) {

                if(event.metaKey || event.ctrlKey) {
                    return;
                }
                // Backspace, tab, enter, end, home, left, right
                // We don't support the del key in Opera because del == . == 46.
                var controlKeys = [8, 9, 13, 35, 36, 37, 39];
                // IE doesn't support indexOf
                var isControlKey = controlKeys.join(",").match(new RegExp(event.which));
                // Some browsers just don't raise events for control keys. Easy.
                // e.g. Safari backspace.
                if (!event.which || // Control keys in most browsers. e.g. Firefox tab is 0
                    (48 <= event.which && event.which <= 57) || // Always 1 through 9
                    (46 == event.which) || (45 == event.which) || (43 == event.which) || // ., -, +
                    isControlKey) { // Opera assigns values for control keys.

                    if(event.which != 8 && event.which != 0 && event.which != 13 &&
                        (parseInt(this.value.length) >= parseInt(item.readAttribute('maxlength')) ||
                        (event.which < 45 || event.which > 57))) {
                        event.preventDefault();
                    } else {
                        return;
                    }
                } else {
                    event.preventDefault();
                }
            });

            //create a function that will check the validity of inputs
            //attach it to the items/number inputs
            item.validateNumberInputs = function () {
                var item = this,
                    id = item.id.replace(/input_(\d+)_\d+/, "$1"),
                    numeric = /^-?(\d+[\.]?)+$|([\.]\d+)+$/;

                //correct any errors first that is attach in the item obj
                item.errored = false;

                //check if hidden, if so return its valid
                if (!JotForm.isVisible(item)) return JotForm.corrected(item);

                if (item.value !== '' && !numeric.test(item.value) && item.hinted !== true) {
                    return JotForm.errored(item, JotForm.texts.numeric);
                }

                //read the min and max val total, and check for inputs
                var min_val = parseInt(item.readAttribute('data-numbermin')),
                    max_val = parseInt(item.readAttribute('data-numbermax')),
                    max_len = parseInt(item.readAttribute('maxlength'));

                if (max_len && item.value && item.value.length > max_len) {
                    return JotForm.errored(item, JotForm.texts.maxDigitsError + " " + max_len);
                }
                else if (( min_val || min_val == 0 ) && parseFloat(item.value) < min_val) {
                    // item.value = min_val;
                    return JotForm.errored(item, JotForm.getValidMessage(JotForm.texts.inputCarretErrorA, min_val));
                }
                else if (( max_val || max_val == 0 ) && parseFloat(item.value) > max_val) {
                    // item.value = max_val;
                    return JotForm.errored(item, JotForm.getValidMessage(JotForm.texts.inputCarretErrorB, max_val));
                }
                else {

                    var error = false
                    if (item.up('.form-matrix-table')) {
                        item.up('.form-matrix-table').select('input').each(function (el) {
                            if ((el !== item) && el.hasClassName('form-validation-error')) {
                                error = true;
                            }
                        });

                    }
                    //remove error display
                    if (!error) {
                        return JotForm.corrected(item);
                    }
                }
            }
        });
    },
    /**
     * Handles the pages of the form
     */
    backStack: [],
    currentSection: false,
    visitedPages: {},
    autoNext: function(id) {

        if(!$("cid_"+id)) return;

        var prev = $("cid_"+id).previous();
        if(!prev) return;

        var type = prev.readAttribute('data-type');
        if(type !== 'control_radio' && type !== 'control_dropdown') return;

        var isEmpty = function (target) {
            if (!target){
                return true;
            }
            if (target.tagName.toLowerCase() === "input"){
                return target.checked === false;
            }
            var targetOptions = target.querySelectorAll('input:checked[type=radio], option:checked:not([value=""])');
            return targetOptions.length === 0;
        }

        prev.observe("change", function(e) {
            if (!JotForm.isVisible(prev) || isEmpty(e.target)) { return; }
            if (e.target.hasClassName('form-radio-other')) { return; }
            var nextButton = $("cid_"+id).down('.form-pagebreak-next')
            if(nextButton && nextButton.triggerEvent) {
                nextButton.focus();
                nextButton.setStyle({'fontWeight':'bold'});
                setTimeout(function() {
                    if (JotForm.currentSection === JotForm.getSection(prev)) {
                        nextButton.setStyle({'fontWeight':'inherit'})
                        nextButton.triggerEvent('mousedown');
                        nextButton.triggerEvent('click');
                    }
                }, 800);
            }
        });
    },
    handlePages: function () {
        var $this = this;
        var pages = [];
        var last;

        // 345261: by default, back button containers gets its width from the label to maintain alignment
        // if they are wider than half the form, resize them
        if ($$('.form-label-left').length > 0) {
            var labelWidth = parseInt($$('.form-label-left')[0].getStyle('width')),
                formWidth = parseInt($$('.form-all')[0].getStyle('width')),
                backButtonWidth = labelWidth > formWidth / 2 ? formWidth / 2 : labelWidth;
            $$('.form-pagebreak-back-container').each(function (back) {
                // resize only if no custom css has been used
                if (back.style.width === '') {
                    back.style.width = (backButtonWidth - 14) + 'px';
                }
            });
        }

        $$('.form-pagebreak').each(function (page, i) {
            var section = $(page.parentNode.parentNode);
            if (i >= 1) {
                // Hide other pages
                section.hide();
            } else {
                JotForm.currentSection = section;
                JotForm.visitedPages[i + 1] = true;
            }
            pages.push(section); // Collect pages

            section.pagesIndex = i + 1;

            function stopEnterKey(evt) {
                var evt = (evt) ? evt : ((event) ? event : null);
                var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
                if (evt.keyCode == 13 && ["text", "radio", "checkbox", "select-one", "select-multiple"].include(node.type)) {
                    return false;
                }
                if ((evt.keyCode == 13 || evt.which == 32)  && evt.target.hasClassName('form-pagebreak-next') && evt.target.triggerEvent) {
                    evt.target.triggerEvent('mousedown');
                }
            }

            document.onkeypress = stopEnterKey;

            var checkLanguageDropdownPage = function() {
                if(typeof FormTranslation !== 'undefined' && FormTranslation.properties && FormTranslation.properties.firstPageOnly === '1') {
                    var dd = $$(".language-dd").length > 0 ? $$(".language-dd").first() : false;
                    if(!dd) return;
                    JotForm.currentSection === pages.first() ? dd.show() : dd.hide();
                }
            }

            var form = JotForm.getForm(section)

            section.select('.form-pagebreak-next').invoke('observe', 'click', function () { // When next button is clicked
                if (JotForm.saving || JotForm.loadingPendingSubmission) {
                    return;
                }
                if ((JotForm.validateAll(form, section)) || getQuerystring('qp') !== "") {

                    if (!$this.noJump && window.parent && window.parent != window) {
                        window.parent.postMessage('scrollIntoView::'+form.id, '*');
                    }

                    if(!JotForm.nextPage) {
                        var sections = $$('.form-all > .page-section');
                        for(var i=sections.indexOf(section); i<sections.length; i++) {
                            if(JotForm.hidePages[parseInt(i, 10)+2] === true) {
                                continue;
                            }
                            JotForm.nextPage = sections[parseInt(i, 10)+1];
                            break;
                        }
                    }

                    if (JotForm.nextPage) {
                        JotForm.backStack.push(JotForm.hideFormSection(section)); // Hide current
                        JotForm.currentSection = JotForm.showFormSection(JotForm.nextPage);
                        JotForm.updateErrorNavigation(true);

                        //Emre: to prevent page to jump to the top (55389)
                        if (!$this.noJump) {
                            JotForm.currentSection.scrollIntoView(true);
                        }

                        JotForm.enableDisableButtonsInMultiForms();
                    } else if (section.next()) { // If there is a next page

                        JotForm.backStack.push(JotForm.hideFormSection(section)); // Hide current
                        // This code will be replaced with condition selector
                        JotForm.currentSection = JotForm.showFormSection(section.next());

                        //Emre
                        if (!$this.noJump && window.parent == window) {
                            JotForm.currentSection.scrollIntoView(true);
                        }

                        JotForm.enableDisableButtonsInMultiForms();
                    }

                    JotForm.nextPage = false;
                    if (JotForm.saveForm) {
                        if (window.JFFormUserHelper && window.JFFormUserHelper.SCLManager) {
                            window.JFFormUserHelper.SCLManager.hiddenSubmit();
                        } else {
                            JotForm.hiddenSubmit(JotForm.getForm(section));
                        }
                    }

                    JotForm.iframeHeightCaller();
                    JotForm.runAllCalculations(true);

                    checkLanguageDropdownPage();

                    if (JotForm.currentSection) {
                        JotForm.currentSection.select(".form-html").each(function (textEl) {
                            if (textEl.innerHTML.match(/google.*maps/gi)) { //google maps hack to get the iframe to redisplay in the right place
                                textEl.innerHTML = textEl.innerHTML;
                            }
                        });
                    }

                } else {
                    try {
                        JotForm.updateErrorNavigation(true);
                        $$('.form-button-error').invoke('remove');
                        $$('.form-pagebreak-next').each(function (nextButton) {
                            if (JotForm.isSourceTeam) {
                                return;
                            }

                            var errorBox = new Element('div', {className: 'form-button-error'});
                            errorBox.insert(JotForm.texts.generalPageError);
                            $(nextButton.parentNode.parentNode).insert(errorBox);
                        });
                    } catch (e) {
                        // couldnt find 'next button'
                    }
                }

                JotForm.setPagePositionForError();
            });

            section.select('.form-pagebreak-back').invoke('observe', 'click', function () { // When back button is clicked

                if (!$this.noJump && window.parent && window.parent != window) {
                    window.parent.postMessage('scrollIntoView::'+form.id, '*');
                }

                if (JotForm.saving || JotForm.loadingPendingSubmission) {
                    return;
                }
                JotForm.hideFormSection(section);

                var sections = $$('.form-all > .page-section');
                var prevPage = JotForm.backStack.pop();
                while(JotForm.backStack.length > 0) {
                    var pageNumber = sections.indexOf(prevPage) + 1;
                    if(JotForm.hidePages[pageNumber] === true) {
                        prevPage = JotForm.backStack.pop();
                        continue;
                    }
                    break;
                }

                JotForm.currentSection = JotForm.showFormSection(prevPage);
                //Emre
                if (!$this.noJump && window.parent == window) {
                    JotForm.currentSection.scrollIntoView(true);
                }

                JotForm.nextPage = false;

                JotForm.enableDisableButtonsInMultiForms();

                if (JotForm.saveForm) {
                    if (window.JFFormUserHelper && window.JFFormUserHelper.SCLManager) {
                        window.JFFormUserHelper.SCLManager.hiddenSubmit();
                    } else {
                        JotForm.hiddenSubmit(JotForm.getForm(section));
                    }
                }
                //clear if there is an error bar near back-next buttons
                $$('.form-button-error').invoke('remove');

                JotForm.iframeHeightCaller();

                checkLanguageDropdownPage();

                setTimeout(function () {
                    JotForm.runAllCalculations(true); //so newly hidden fields may be excluded
                }, 10);

                // close the prev page error navigation panel
                JotForm.updateErrorNavigation(false);
            });
        });

        // Handle trailing page
        if (pages.length > 0) {
            var allSections = $$('.form-section:not([id^=section_])');
            if (allSections.length > 0) {
                last = allSections[allSections.length - 1];
            }
        
            // if there is a last page
            if (last) {
                last.pagesIndex = allSections.length;
                pages.push(last); // add it with the other pages
                last.hide(); // hide it until we open it
        
                var mergeWithSubmit = false;
                var targetSubmit = null;
                if (JotForm.newDefaultTheme || JotForm.extendsNewTheme) {
                    var submitButtons = last.querySelectorAll('li[data-type="control_button"] .form-buttons-wrapper');
                    if (submitButtons.length > 0) {
                        mergeWithSubmit = true;
                        targetSubmit = submitButtons[(submitButtons.length - 1)];
                        targetSubmit.classList.add("form-pagebreak");
                    }
                }
        
                var backCont = new Element('div', { className: 'form-pagebreak-back-container' });
                var backButtonContainers = $$('.form-pagebreak-back-container');
                var back = backButtonContainers[0].select('button')[0];
                var penultimateBack = backButtonContainers[backButtonContainers.length - 1].select('button')[0];
                var isHiddenButton =  penultimateBack.className.indexOf('button-hidden') !== -1 ;
        
                back.textContent = penultimateBack ? penultimateBack.textContent : back.textContent
        
                // This code removes the classes starting with "form-submit-button-" from the last button element. This is done to ensure that the button styles are inherited from the submit button.
                back.className = back.className.replace(/\bform-submit-button-\S+/g, "");
                
                var classList = [];
                var submitButtonElement = document.querySelector('li[data-type="control_button"] .submit-button');
                if (submitButtonElement) {
                  classList = Array.from(submitButtonElement.classList);
                }
                
                if(isHiddenButton) {
                  classList.push('button-hidden');
                }
        
                classList.filter(function(cls) {
                  if(cls.startsWith('form-submit-button-') || cls == 'button-hidden'){
                    back.setAttribute("class", cls + " form-pagebreak-back jf-form-buttons")
                  }
                });
                
                if(!isHiddenButton){
                  back.classList.remove('button-hidden');
                }

                backCont.insert(back);
        
                if (mergeWithSubmit) {
                    targetSubmit.insert({ top: backCont });
                    // reorder buttons
                    var buttonOrder = ['.form-pagebreak-back-container', '.form-submit-preview', '.form-submit-print', '.form-submit-reset', '.paypal-submit-button-wrapper', '.form-sacl-button', '.form-submit-button[type="submit"]', '.useJotformSign-button', '.form-pagebreak-next-container'];
                    var children = targetSubmit.childElements();
        
                    buttonOrder.forEach(function(btn) {
                        children.forEach(function(child) {
                            if (new Selector(btn).match(child)) {
                                targetSubmit.insert({ bottom: child });
                            }
                        });
                    });
                } else {
                    var li = new Element('li', { className: 'form-input-wide' });
                    var cont = new Element('div', { className: 'form-pagebreak' });
                    cont.insert(backCont);
                    li.insert(cont);
                    last.insert(li);
                }
        
                back.observe('click', function () {
                    if (JotForm.saving) {
                        return;
                    }
                    last.hide();
                    JotForm.nextPage = false;
                });
            }
        }
    },
    /**
     * Go straight to page on form load
     */
    jumpToPage: function () {
        var page = document.get.jumpToPage;
        var sections = $$('.form-section:not([id^=section_])');

        if (!(page && page > 1) || page > sections.length) return; //no page to jump to

        if(JotForm.doubleValidationFlag()) {
            JotForm.currentSection = sections[page - 1];
            JotForm.visitedPages = {};
        }

        JotForm.hideFormSection(sections[0]);
        JotForm.showFormSection(sections[page - 1]);

        if (page > 1) JotForm.backStack = sections.splice(0, page - 1); //so the back button will go to the previous pages and not the first

        JotForm.runAllCalculations(true); //so newly hidden fields may be excluded
    },
    doubleValidationFlag: function () {
        if (getQuerystring('doubleValidation') === '0') return false;

        return true;
    },
    /**
     * Go straight to the page that given via argument
     */
    jumpToGivenPage: function (page) {
        var sections = $$('.form-section:not([id^=section_])');
        var currentSection = sections[page - 1];

        if (page === undefined || page > sections.length) return; //no page to jump to

        for (var i = 0; i < sections.length; i++) {
            JotForm.hideFormSection(sections[i]);
        }

        JotForm.showFormSection(currentSection, true);
        JotForm.currentSection = currentSection;

        if (page > 1) JotForm.backStack = sections.splice(0, page - 1); //so the back button will go to the previous pages and not the first
        
        JotForm.runAllCalculations(true); //so newly hidden fields may be excluded

        // handle widgets that belong to current section
        currentSection.select('.form-line[data-type=control_widget]').each(function (e) {
            var field = e.id.split('_').last();
            JotForm.showWidget(field, true);
        });
    },
    isInputAlwaysHidden: function (input) {
        if (window.FORM_MODE === 'cardform') {
            return !JotForm.isVisible(input);
        }

        var jfField = input.up('.jfField');
        if (jfField && jfField.hasClassName('isHidden')) {
            return true;
        }

        // check for hidden address lines
        var addressLineWrapper = input.up('.form-address-line-wrapper');
        if (addressLineWrapper) {
            if (addressLineWrapper.style.display == "none" || addressLineWrapper.style.visibility == "hidden" ) {
                return true;
            }
            if (!!input.up('.form-address-hiddenLine')) {
                return true;
            }
        }

        // if the input is inside of a hidden collapse section, it's always hidden
        var collapseSection = input.up('.form-section[id^="section_"], .form-section-closed[id^="section_"]');
        if (collapseSection) {
            var hiddenWithStyles = collapseSection.style.display == "none" || collapseSection.style.visibility == "hidden";
            var hiddenWithClasses = collapseSection.hasClassName('always-hidden') || collapseSection.hasClassName('form-field-hidden');
            
            if (hiddenWithStyles || hiddenWithClasses) {
                return true;
            }
        }

        // payment dummy inputs are always hidden
        var paymentDummyInputIds = ['stripesca_dummy', 'stripePe_dummy', 'mollie_dummy', 'square_dummy', 'braintree_dummy', 'paypal_complete_dummy'];
        if (paymentDummyInputIds.indexOf(input.id) > -1) {
            return true;
        }

        var cont = JotForm.getContainer(input);
        return cont.hasClassName('always-hidden') || cont.hasClassName('form-field-hidden') || (cont.style && cont.style.display == "none") || (cont.style && cont.style.visibility == "hidden");
    },
    /**
     * Check if the section is viewed by the form filler.
     */
    isSectionTouched: function (section) {
        if (!section) return false;

        var isPageBreak = !!document.querySelector('.form-pagebreak');
        if (!isPageBreak) return true; // must be return true for non multi-page forms

        if (section.pagesIndex > JotForm.currentSection.pagesIndex) return false;
        if (JotForm.visitedPages[section.pagesIndex] && !JotForm.hidePages[section.pagesIndex]) return true;
    },
    /**
     * Hide the form section
     */
    hideFormSection: function (section) {
        section.addClassName('js-non-displayed-page');
        section.style.display = 'none';
        section.style.position = 'absolute';
        section.style.top = '-9999px';
        section.style.left = '-9999px';
        return section;
    },
    /**
     * Show the section by removing the edited styles in hideFormSection function
     */
    showFormSection: function (section, withoutFocus) {
        section.removeClassName('js-non-displayed-page');
        section.style.display = '';
        section.style.position = '';
        section.style.top = '';
        section.style.left = '';
        // focus on first element on new page
        var firstLabel = section.querySelector('label');
        if (firstLabel && !firstLabel.up('.form-section-closed') && !withoutFocus) {
            var inputElementID = firstLabel.getAttribute('for');
            if (inputElementID){
                var inputElement = document.getElementById(inputElementID);
                if (inputElement) {
                    setTimeout(function() { inputElement.focus(); });
                }
            }
        }

        JotForm.visitedPages[section.pagesIndex] = true;

        // next pages should be unvisited
        var visitedPages = Object.keys(JotForm.visitedPages);
        for (var i = 0; i < visitedPages.length; i++) {
            if (visitedPages[i] > section.pagesIndex) {
                delete JotForm.visitedPages[visitedPages[i]];
            }
        }

        if (window !== window.top) { // prevent changing scroll position when not in frame
            setTimeout(function() { scrollTo(0, 0); }, 50);
        }
        return section;
    },
    /**
     * Handles the functionality of Form Collapse tool
     */
    handleFormCollapse: function () {
        var $this = this;
        var openBar = false;
        var openCount = 0;
        var height = JotForm.newDefaultTheme || JotForm.extendsNewTheme ? 84 : 60;
        $$('.form-collapse-table').each(function (bar) {
            var section = $(bar.parentNode.parentNode);
            //section.setUnselectable();  //ntw - bug#209358  - If anyone knows why this line exists please tell me - prevents selection in firefox under collapses and I cannot see that it performs any other function
            if (section.className == "form-section-closed") {
                section.closed = true;
            } else {
                if (section.select('.form-collapse-hidden').length < 0) {
                    openBar = section;
                    openCount++;
                }
            }
            bar.observe('click', function () {
                if (section.closed) {
                    section.setStyle('overflow:visible; height:auto');
                    var h = section.getHeight();

                    if (openBar && openBar != section && openCount <= 1) {
                        openBar.className = "form-section-closed";
                        openBar.shift({
                            height: height,
                            //Do not change this duration value. Beacause of some native browsers problems(safari, mobile phones)
                            //section shift duration value should be bigger than openBar shift duration value.
                            duration: 0.25
                        });
                        openBar.select('.form-collapse-right-show').each(function (e) {
                            e.addClassName('form-collapse-right-hide').removeClassName('form-collapse-right-show');
                        });
                        openBar.setStyle("overflow:hidden;");
                        openBar.closed = true;
                    }
                    openBar = section;
                    section.setStyle('overflow:hidden; height:' + height + 'px');
                    // Wait for focus
                    setTimeout(function () {
                        section.scrollTop = 0;
                        section.className = "form-section";
                    }, 1);

                    section.shift({
                        height: h,
                        duration: 0.5,
                        onStart: function () {
                            // ready every widget if any
                            section.select('.form-line[data-type=control_widget]').each(function (e) {
                                var field = e.id.split('_').last();
                                JotForm.showWidget(field, true);
                            });
                            section.addClassName('form-section-opening')
                        },
                        onEnd: function (e) {
                            e.scrollTop = 0;
                            e.setStyle("height:auto; overflow:visible;");
                            if (!$this.noJump) {
                                window.scrollTo({top: e.offsetTop, behavior:'smooth'});
                            }
                        },
                        onStep: function (e) {
                            // update frame height if embed
                            if (window.parent && window.parent != window) {
                                window.parent.postMessage('setHeight:' + $$('body')[0].getHeight(), '*');
                            }
                        }
                    });
                    section.select('.form-collapse-right-hide').each(function (e) {
                        e.addClassName('form-collapse-right-show').removeClassName('form-collapse-right-hide');
                    });
                    section.closed = false;

                    if (bar.errored) {
                        bar.select(".form-collapse-mid")[0].setStyle({
                            color: ''
                        }).select('img')[0].remove();
                        bar.errored = false;
                    }

                } else {
                    section.scrollTop = 0;
                    section.shift({
                        height: height,
                        duration: 0.5,
                        onEnd: function (e) {
                            e.className = "form-section-closed";
                        },
                        onStep: function (e) {
                            // update frame height if embed
                            if (window.parent && window.parent != window) {
                                window.parent.postMessage('setHeight:' + $$('body')[0].getHeight(), '*');
                            }
                        }
                    });
                    section.setStyle("overflow:hidden;");
                    
                    if (!openBar) {
                        openBar = section;
                    }

                    //Emre: Added if because of preventing collapse open/close bug
                    if (openBar) {
                        openBar.select('.form-collapse-right-show').each(function (e) {
                            e.addClassName('form-collapse-right-hide').removeClassName('form-collapse-right-show');
                        });
                    }

                    section.closed = true;
                }

                /* Calculate form height after collapse clicks.
                * Collapse opening/closing takes 0.5 sec. (see lines 7713, 7674)
                * So setTimout to 510 ms. to better height calculation.
                */
                setTimeout(function() {
                    $this.handleIFrameHeight();
                }, 510);
            });
        });
    },

    /**
     * Set page position for Required First or Dedicated Error
     */
    setPagePositionForError: function () {
        var firstError = $$('.form-error-message').first();
        if(firstError) {
            if (JotForm.isCollapsed(firstError)) {
                JotForm.getCollapseBar(firstError).run('click');
            }
            var erroredLine = firstError.up('.form-line')
            if (!JotForm.noJump && erroredLine) {
                erroredLine.scrollIntoView();
                var firstInput = erroredLine.down('input,select,textarea');
                if (firstInput && firstInput.isVisible()) {
                    firstInput.focus();
                } else {
                    // focus on the label's target
                    var erroredLineLabel = erroredLine.down('.form-label')
                    if(erroredLineLabel) {
                        var target = document.getElementById(erroredLineLabel.getAttribute('for'));
                        if (target) {
                            target.focus();
                        }
                    }
                }
            }
        }
    },

    /**
     * This function to prevent any input from receiving a value other than a number
     * @param ev
     * @returns {boolean|*|boolean}
     */
    justNumber: function (ev) {
        var paste = "";
        if (typeof ev.clipboardData !== 'undefined') {
            paste = (ev.clipboardData || window.clipboardData).getData("text");
        }
        var reg = /^\d+$/;
        if (typeof ev.key !== 'undefined' && (!reg.test(ev.key)) || (paste !== "" && !reg.test(paste))) {
            ev.preventDefault();
        }
    },

    /**
     * PCI Gateways card input validation
     */
    PCIGatewaysCardInputValidate: function () {
        [document.querySelector('.cc_ccv'), document.querySelector('.cc_number')].forEach(function (el) {
            el.addEventListener('paste', function (ev) {
                JotForm.justNumber(ev)
            });
            el.addEventListener('keypress', function (ev) {
                JotForm.justNumber(ev)
            });
        });
        var thisForm = $$('.jotform-form')[0];
        var paymentFieldId = $$('input[name="simple_fpc"]')[0].value;
        Event.observe(thisForm, 'submit', function (event) {
            // clear errors first
            JotForm.corrected($$('.cc_firstName')[0]);
            // skip edit mode
            if (JotForm.isEditMode()) {
                return true;
            }
            if (JotForm.isPaymentSelected() && JotForm.paymentTotal > 0) {
                var errors;
                $$('#id_' + paymentFieldId + ' input[class*="cc"]', '#id_' + paymentFieldId + ' select[class*="cc"]').each(function (cc) {
                    if (!cc.getValue()) {
                        errors = JotForm.texts.ccMissingDetails;
                        throw $break;
                    }
                });
                // if there are errors
                if (errors) {
                    Event.stop(event);
                    setTimeout(function () {
                        JotForm.errored($$('.cc_firstName')[0], errors);
                        // on multi-page forms, attach error to submit button if it is in a page separate from the Authnet fields
                        var cc_number = $$('.cc_number')[0];
                        if (!cc_number.isVisible()
                            && !cc_number.up('li').hasClassName('form-field-hidden') // not hidden by condition
                            && !cc_number.up('ul').hasClassName('form-field-hidden') // not inside a form collapse hidden by a condition
                            && $$('ul.form-section.page-section').length > 1)  // this is a multipage form
                        {
                            var visibleButtons = [];
                            $$('.form-submit-button').each(function (btn) {
                                if (btn.isVisible()) {
                                    visibleButtons.push(btn);
                                }
                            });
                            if (visibleButtons.length < 1) {
                                return;
                            } // no visible submit buttons
                            var lastButton = visibleButtons[visibleButtons.length - 1];
                            // clear prior errors
                            $$('.form-card-error').invoke('remove');
                            var errorBox = new Element('div', {className: 'form-button-error form-card-error'});
                            errorBox.insert('<p>' + errors + '</p>');
                            $(lastButton.parentNode.parentNode).insert(errorBox);
                        }
                        JotForm.enableButtons();
                    }, 500);
                } else {
                    JotForm.corrected($$('.cc_firstName')[0]);
                }
            }
        });
    },

    /**
     * Handles Authorize.Net payment validation
     */

    handleAuthNet: function () {
        this.PCIGatewaysCardInputValidate();
    },

    handleBluesnap: function() {
        this.PCIGatewaysCardInputValidate();
        if (JotForm.isEditMode() || document.get.sid) { return; }
        else if (!JotForm.paymentProperties) { return; }
        else if (JotForm.paymentProperties.sca !== 'Yes') { return; }

        try {
            var bluesnapJS = new _bluesnapJS();
            bluesnapJS.initialization();
        } catch (err) {
            console.error("ERR::", err);
            JotForm.errored($$('li[data-type="control_bluesnap"]')[0], err);
        }
    },

    isCardinalValidationInitialized:  false,
    handleSignatureEvents: function() {
        function handleCanavasMousedDown(wrapperElem) {
            wrapperElem.removeClassName('signature-placeholder');
            this.removeEventListener('mousedown', handleCanavasMousedDown);
            this.removeEventListener('pointerdown', handleCanavasMousedDown);
        }

        var signatureElems = document.querySelectorAll('.jotform-form .signature-pad-wrapper');
        if (!signatureElems || signatureElems.length === 0) {
            return;
        }

        Array.from(signatureElems).forEach(function(signatureElem) {
            var canvasElem = signatureElem.querySelector('canvas');
            var wrapperElem = signatureElem.querySelector('.signature-line.signature-wrapper');
            var clearButton = signatureElem.querySelector('.clear-pad-btn.clear-pad');

            canvasElem.addEventListener('mousedown', handleCanavasMousedDown.bind(this, wrapperElem));
            canvasElem.addEventListener('touchstart', handleCanavasMousedDown.bind(this, wrapperElem));
            canvasElem.addEventListener('pointerdown', handleCanavasMousedDown.bind(this, wrapperElem));
            clearButton.addEventListener('click', function() {
                wrapperElem.addClassName('signature-placeholder');
                canvasElem.addEventListener('mousedown', handleCanavasMousedDown.bind(this, wrapperElem));
            });
        });
    },
  /*
    POC usage of new Signature Modal.
  */
  handleSignSignatureInputs: function() {
    // TODO: remove this line after the release of the new Signature Modal.
    if (window.JotForm.isSignForm !== "Yes") return;

    var signatures = document.querySelectorAll('li[data-type="control_signature"]')
    if (signatures && signatures.length > 0) {
      Array.from(signatures).forEach(function(inputContainer) {
        var signatureInput = inputContainer.querySelector('input[type="hidden"]');
        var signatureTrigger = inputContainer;
          if (signatureInput && signatureTrigger && window.JFFormSignature) {
            var labelTitle = inputContainer.querySelector('label').innerText;
            var onUse = function(output) {
              var pad = inputContainer.querySelector('.pad');

              /*
               jSignature logic is necessary because validation logic currently is based on it.
               Remove this when we start using only the new Signature Modal. If they sould live
               together we should pass base64 image from the new Signature Modal converting it to data30 format.
               Or maybe Signature Modal could pass data30 formatted image, too. https://bit.ly/35mXg7X
              */
              if (jQuery(pad).jSignature) {
                var data30 = "data:image/jsignature;base30,tR_6I";
                jQuery(pad).jSignature("setData", data30);
                if (output.value === "") {
                  jQuery(pad).jSignature("reset");
                }
              }

              signatureInput.value = output.value;
              signatureInput.setAttribute('data-mode', output.mode);
              signatureInput.setAttribute('data-font', output.font);
              signatureInput.setAttribute('data-color', output.color);
              signatureInput.setAttribute('data-text', output.text);

              if (signatureInput.validateInput) {
                signatureInput.validateInput();
              }
              signatureInput.triggerEvent('change');

              if (pad) {
                pad.style.display = 'flex';
                pad.style.alignItems = 'center';
                var canvas = pad.querySelector('canvas');
                if (canvas) {
                  canvas.style.display = 'none';
                }
                var image = pad.querySelector('img');
                if (!image) {
                  image = new Image();
                  pad.appendChild(image);
                }
                image.src = output.value;
              }
          };
          var getInitialValue = function() {
            var signatureImage = inputContainer.querySelector('#signature-pad-image');
            var sigValue = signatureInput.value.indexOf("data:image") === -1 && signatureImage ? signatureImage.src : signatureInput.value;
            return {
              value: sigValue,
              mode: signatureInput.dataset.mode,
              font: signatureInput.dataset.font,
              color: signatureInput.dataset.color,
              text: signatureInput.dataset.text
            };
          }
          var isDisabled = function() {
            return signatureInput.hasClassName('conditionallyDisabled');
          }
          window.JFFormSignature({
            trigger: signatureTrigger,
            onUse: onUse,
            getInitialValue: getInitialValue,
            isDisabled: isDisabled,
            labelTitle: labelTitle,
            renderMode: 'embed',
            initialMode: 'type'
          });
        }
      });
    }
          // sign-signatures end
  },
    handleFITBInputs: function () {
        function getInputWidth(fitbInput) {
          var width = 0;
          var textElement = document.createElement('span');
          var fitbFontSize = getComputedStyle(fitbInput, null).getPropertyValue('font-size') || '15' + 'px';
          var fitbFontFamily = getComputedStyle(fitbInput, null).getPropertyValue('font-family') || 'sans-serif';

          textElement.innerText = fitbInput.value || fitbInput.parentNode.querySelector('label').innerText;
          textElement.style.cssText = 'position: absolute; font-size:' + (fitbFontSize) + '; font-family:' + (fitbFontFamily) + '; display: inline-block;'
          fitbInput.parentNode.appendChild(textElement);
          width = textElement.offsetWidth;
          fitbInput.parentNode.removeChild(textElement);

          return width;
        }

        function getContWidth(fitbInput) {
          return fitbInput.parentNode.parentNode.offsetWidth;
        }

        // auto width calculation
        var visibleFitbInputs = Array.from(document.querySelectorAll('.FITB input:not([type="checkbox"]):not([type="radio"])'))
            .filter(function(field) { return JotForm.isVisible(field); });
        if (visibleFitbInputs && visibleFitbInputs.length > 0) {
            Array.from(visibleFitbInputs).forEach(function(fitbInput) {
                var contWidth = getContWidth(fitbInput);
                var initWidth = getInputWidth(fitbInput) + 8;

                fitbInput.style.width = initWidth + 'px';

                if(contWidth) {
                  fitbInput.style.maxWidth = contWidth + 'px';
                }

                fitbInput.addEventListener('input', function() {
                  if(fitbInput.offsetWidth < getContWidth(fitbInput)) {
                    fitbInput.style.width = Math.max(getInputWidth(fitbInput) + 4, initWidth) + 'px';
                  } 

                  if(!fitbInput.style.maxWidth) {
                   fitbInput.style.maxWidth = getContWidth(fitbInput) + 'px'; 
                  }
                });
            });
        }
        // date inputs auto format
        if(!(JotForm.newDefaultTheme || JotForm.extendsNewTheme)) {
            $$('.FITB input[class*="validateLiteDate"]').forEach(function (el) {
                el.observe('keydown', function (e) {
                    var input = e.target.value;
                    if(e.key === 'Backspace' && input[input.length-1] === e.target.dataset.seperator) {
                        input = input.substr(0, input.length-1);
                    }
                    e.target.value = input.substr(0, 10);
                });
                el.observe('input', function (e) {
                    var input = e.target.value;
                    var values = input.split(e.target.dataset.seperator).map(function(v) {
                        return v.replace(/\D/g, '')
                    });
                    var output = [];
                    if (e.target.dataset.format !== 'yyyymmdd'){
                        output = values.map(function(v, i) {
                            return v.length == 2 && i < 2 ? v + e.target.dataset.seperator : v;
                        });
                    } else {
                        output = values.map(function(v,i) {
                            return (v.length == 4 && i == 0) || (v.length == 2 && i == 1) ? v + e.target.dataset.seperator : v;
                        });
                    }
                    e.target.value = output.join('').substr(0, 10);
                });
            });
        }
        // signatures
        var fitbSignatures = document.querySelectorAll('.FITB span[data-type="signaturebox"]');
        if (fitbSignatures && fitbSignatures.length > 0) {
            Array.from(fitbSignatures).forEach(function(inputContainer) {
                var signatureImage = inputContainer.querySelector('.FITB-sign-image');
                var signatureInput = inputContainer.querySelector('input[type="hidden"]');
                var signatureTrigger = inputContainer.querySelector('.FITB-sign-button');
                if (signatureImage && signatureInput && signatureTrigger && window.JFFormSignature) {
                    var onUse = function(output) {
                        signatureInput.value = output.value;
                        signatureImage.setAttribute('src', output.value);
                        signatureInput.setAttribute('data-mode', output.mode);
                        signatureInput.setAttribute('data-font', output.font);
                        signatureInput.setAttribute('data-color', output.color);
                        signatureInput.setAttribute('data-text', output.text);
                        if (signatureInput.validateInput) {
                            signatureInput.validateInput();
                        }
                        signatureInput.triggerEvent('change');
                    };
                    var getInitialValue = function() {
                        return {
                          value: signatureInput.value,
                          mode: signatureInput.dataset.mode,
                          font: signatureInput.dataset.font,
                          color: signatureInput.dataset.color,
                          text: signatureInput.dataset.text
                        };
                    }
                    signatureTrigger.addEventListener('keypress', function(e) {
                        if (e.keyCode === 32 || e.keyCode === 13) {
                            e.preventDefault();
                            e.target.click();
                        }
                    });
                    var isDisabled = function() {
                        return signatureInput.hasClassName('conditionallyDisabled');
                    }
                    window.JFFormSignature({ trigger: signatureTrigger, onUse: onUse, getInitialValue: getInitialValue, isDisabled: isDisabled });
                }
            });
        }
        // time inputs
        var timeInputs = document.querySelectorAll('.FITB span[data-type="timebox"] input[id*="timeInput"]');
        for (var i = 0; i < timeInputs.length; i++) {
            try {
                var imask = new Inputmask({
                    alias: 'datetime',
                    inputFormat: timeInputs[i].dataset.mask ? timeInputs[i].dataset.mask : 'hh:MM',
                    jitMasking: true,
                    oncomplete: function (e) {
                        var values = e.target.value.split(':');
                        var hh = e.target.parentElement.querySelector('input[id*="hourSelect"]');
                        var mm = e.target.parentElement.querySelector('input[id*="minuteSelect"]');
                        hh.value = values[0];
                        mm.value = values[1];
                    },
                    onincomplete: function (e) {
                        var values = e.target.value.split(':');
                        var hh = e.target.parentElement.querySelector('input[id*="hourSelect"]');
                        hh.value = values[0];
                        if (!!values[1]) {
                            var mm = e.target.parentElement.querySelector('input[id*="minuteSelect"]');
                            mm.value = values[1].length === 2 ? values[1] : values[1] + '0';
                        }
                    },
                    oncleared: function (e) {
                        var hh = e.target.parentElement.querySelector('input[id*="hourSelect"]');
                        var mm = e.target.parentElement.querySelector('input[id*="minuteSelect"]');
                        hh.value = '';
                        mm.value = '';
                    }
                });
                imask.mask(timeInputs[i]);
                // fix for placeholder on mouse enter
                timeInputs[i].addEventListener('mouseenter', function (e) {
                    e.target.placeholder = 'hh:MM';
                });
            } catch (e) {
                return;
            }
        }
    },
    /**
     *  Handles Paypal Pro payment methods
     *  and field validations
     */
    handlePaypalPro: function () {
        if ($('creditCardTable')) {
            var thisForm = $$('.jotform-form')[0];
            var paymentFieldId = $$('input[name="simple_fpc"]')[0].value;
            Event.observe(thisForm, 'submit', function (event) {

                if (JotForm.isEditMode()) {
                    return true;
                }

                if (JotForm.isPaymentSelected() && JotForm.paymentTotal > 0) {
                    // default error
                    var errors = "";
                    JotForm.corrected($$('.paymentTypeRadios')[0]);
                    // if no payment method is selected
                    if (!$$('.paymentTypeRadios')[0].checked && !$$('.paymentTypeRadios')[1].checked) {
                        errors = "You must select a payment method";
                    }
                    // if payment method is credit card
                    if ($('input_' + paymentFieldId + '_paymentType_credit').checked) {
                        $$('#input_' + paymentFieldId + '_cc_number').each(function (cc) {
                            if (!cc.getValue()) {
                                errors = "All fields are required";
                                throw $break;
                            }
                        });
                    }
                    // if there are errors
                    if (errors) {
                        JotForm.errored($$('.paymentTypeRadios')[0], errors);
                        Event.stop(event);
                    } else {
                        JotForm.corrected($$('.paymentTypeRadios')[0]);
                    }

                    // if method is credit card there should be additonal flow for 3D security
                    var isSubscription = document.getElementById('payment-wrapper-songbird').getAttribute('data-paymenttype') === 'subscription';
                    var is3DSecurityEnabled = document.getElementById('payment-wrapper-songbird').getAttribute('data-sca') === 'Yes';

                    if (typeof Cardinal !== "undefined" && is3DSecurityEnabled && $('input_' + paymentFieldId + '_paymentType_credit').checked && !isSubscription) {
                        Event.stop(event);
                        JotForm.disableButtons();

                        var cardinalAPIkey = document.getElementById('payment-wrapper-songbird').getAttribute('data-cardinalapikey');
                        var cardinalAPIidentifier = document.getElementById('payment-wrapper-songbird').getAttribute('data-cardinalapiindentifier');
                        var cardinalOrgUnitID = document.getElementById('payment-wrapper-songbird').getAttribute('data-cardinalorgunitid');

                        var songBird = new songBirdInit();
                        songBird.init({
                            cardinalAPIkey: cardinalAPIkey,
                            cardinalAPIidentifier: cardinalAPIidentifier,
                            cardinalOrgUnitID: cardinalOrgUnitID
                        });

                        if (!JotForm.isCardinalValidationInitialized) {

                            JotForm.isCardinalValidationInitialized = true;

                            Cardinal.on("payments.validated", function (data, jwt) {
                                var form = (JotForm.forms[0] == undefined || typeof JotForm.forms[0] == "undefined" ) ? $($$('.jotform-form')[0].id) : JotForm.forms[0];
    
                                JotForm.corrected($('creditCardTable'));
    
                                switch(data.ActionCode){
                                  case "SUCCESS":
                                  case "NOACTION":
    
                                    var PAResStatus = data.Payment.ExtendedData.PAResStatus; //Optional
                                    var Enrolled = data.Payment.ExtendedData.Enrolled; //Optional
                                    var CAVV = data.Payment.ExtendedData.CAVV !== undefined ? data.Payment.ExtendedData.CAVV : "";
                                    var ECIFlag = data.Payment.ExtendedData.ECIFlag !== undefined ? data.Payment.ExtendedData.ECIFlag : "";
                                    var XID = data.Payment.ExtendedData.XID !== undefined ? data.Payment.ExtendedData.XID : "";
                                    var DSTRANSACTIONID = data.Payment.ExtendedData.DSTransactionId !== undefined ? data.Payment.ExtendedData.DSTransactionId : "";
                                    var THREEDSVERSION = data.Payment.ExtendedData.ThreeDSVersion !== undefined ?  data.Payment.ExtendedData.ThreeDSVersion : "";

                                    form.insert(new Element('input', {
                                        name: "PAResStatus",
                                        type: 'hidden',
                                    }).putValue(PAResStatus));


                                    form.insert(new Element('input', {
                                        name: "Enrolled",
                                        type: 'hidden',
                                    }).putValue(Enrolled));


                                    form.insert(new Element('input', {
                                        name: "CAVV",
                                        type: 'hidden',
                                    }).putValue(CAVV));


                                    form.insert(new Element('input', {
                                        name: "ECIFlag",
                                        type: 'hidden',
                                    }).putValue(ECIFlag));


                                    form.insert(new Element('input', {
                                        name: "XID",
                                        type: 'hidden',
                                    }).putValue(XID));

                                    form.insert(new Element('input', {
                                        name: "DSTRANSACTIONID",
                                        type: 'hidden',
                                    }).putValue(DSTRANSACTIONID));

                                    form.insert(new Element('input', {
                                        name: "THREEDSVERSION",
                                        type: 'hidden',
                                    }).putValue(THREEDSVERSION));

                                    form.submit();
                                  break;

                                  case "FAILURE":
                                        JotForm.errored($('creditCardTable'), "Failed Authentication");
                                        JotForm.enableButtons();
                                  break;

                                  case "ERROR":
                                    JotForm.errored($$('.paymentTypeRadios')[0], "Failed to connect payment service please try later");
                                    JotForm.enableButtons();
                                  break;
                              }
                              });
                        }

                    }

                }
            });
            $$('.paymentTypeRadios').each(function (radio) {
                radio.observe('click', function () {
                    if (radio.checked && radio.value === "express") {
                        JotForm.setCreditCardVisibility(false);
                    }
                    // If credit is selected and payment total is greater than zero or if there is no discount coupon
                    if (radio.checked && radio.value === "credit" && ( JotForm.paymentTotal > 0 || Object.keys(JotForm.discounts).length === 0 )) {
                        JotForm.setCreditCardVisibility(true);
                    }
                    JotForm.corrected($$('.paymentTypeRadios')[0]);
                    // toggle checkout buttons
                    JotForm.togglePaypalButtons(radio.checked && radio.value === "express");
                });
            });
        }
    },

    handlePaypalComplete: function() {
        if (JotForm.isEditMode() || document.get.sid) {
            return;
        }

        try {
            var paypalComplete = new _paypalCompleteJS();
            JotForm.paypalCompleteJS = paypalComplete
            paypalComplete.initialization();
        } catch (err) {
            console.log("ERR::", err);
            // TODO: Send text review.
            JotForm.errored($$('li[data-type="control_paypalcomplete"]')[0], err);

            if ($$('li[data-type="control_paypalcomplete"]')[0]) {
                $$('li[data-type="control_paypalcomplete"] .form-textbox').each(function(q) {
                    q.disabled = true;
                });
            }
        }
    },

    handleCybersource: function () {
      // skip on edit mode
      this.PCIGatewaysCardInputValidate()
      if (window.location.pathname.match(/^\/edit/) || (["edit", "inlineEdit", "submissionToPDF"].indexOf(document.get.mode) > -1 && document.get.sid)) {
        return;
      }
      if (typeof __cybersource !== "function") {
        alert("PagSeguro payment script didn't work properly. Form will be reloaded");
        location.reload();
        return;
      }
      JotForm.cybersource = __cybersource();
      JotForm.cybersource.init();
    },

    /**
     * Creates description boxes next to input boxes
     * @param {Object} input
     * @param {Object} message
     */
    description: function (input, message) {
        // v2 has bugs, v3 has stupid solutions
        if (message == "20") {
            return;
        } // Don't remove this or some birthday pickers will start to show 20 as description

        var lineDescription = false;
        if (!$(input)) {
            var id = input.replace(/[^\d]/gim, '');
            if ($("id_" + id)) {
                input = $("id_" + id);
                lineDescription = true;
            } else if ($('section_' + id)) {
                input = $('section_' + id);
                lineDescription = true;
            } else {
                return;
                /* no element found to display a description */
            }
        }

        if ($(input).setSliderValue) {
            input = $($(input).parentNode);
        }

        var cont = JotForm.getContainer(input);
        if (!cont) {
            return;
        }
        var right = false;

        var bubble = new Element('div', {className: 'form-description'});
        var arrow = new Element('div', {className: 'form-description-arrow'});
        var arrowsmall = new Element('div', {className: 'form-description-arrow-small'});
        var content = new Element('div', {className: 'form-description-content'});
        var indicator;

        if ("desc" in document.get && document.get.desc == 'v2') {
            right = true;
            cont.insert(indicator = new Element('div', {className: 'form-description-indicator'}));
            bubble.addClassName('right');
        }

        content.insert(message);
        bubble.insert(arrow).insert(arrowsmall).insert(content).hide();

        cont.insert(bubble);

        if ((cont.getWidth() / 2) < bubble.getWidth()) {
            bubble.setStyle('right: -' + ( cont.getWidth() - ( right ? 100 : 20 ) ) + 'px');
        }

        if (right) {
            var h = indicator.measure('height');
            arrow.setStyle('top:' + ((h / 2) - 20) + 'px');
            arrowsmall.setStyle('top:' + ((h / 2) - 17) + 'px');

            $(cont).mouseEnter(function () {
                cont.setStyle('z-index:10000');
                if (!cont.hasClassName('form-line-active')) {
                    cont.addClassName('form-line-active');
                    cont.__classAdded = true;
                }
                bubble.show();
            }, function () {
                if (cont.__classAdded) {
                    cont.removeClassName('form-line-active');
                    cont.__classAdded = false;
                }
                cont.setStyle('z-index:0');
                bubble.hide();
            });
            $(input).observe('keydown', function () {
                cont.setStyle('z-index:0');
                bubble.hide();
            });
        } else {
            if (lineDescription) {
                // https://www.jotform.com/ticket-categorize/1231176
                // https://stackoverflow.com/questions/3038898/ipad-iphone-hover-problem-causes-the-user-to-double-click-a-link
                $(input).addEventListener('touchstart', function() {
                   cont.setStyle('z-index:10000');
                   bubble.show();
                })
                $(input).mouseEnter(function () {
                    cont.setStyle('z-index:10000');
                    bubble.show();
                })
                $(input).addEventListener('mouseleave', function() {
                    cont.setStyle('z-index:0');
                    bubble.hide();
                })

            } else {
                $(cont).mouseEnter(function () {
                    cont.setStyle('z-index:10000');
                    bubble.show();
                }, function () {
                    cont.setStyle('z-index:0');
                    bubble.hide();
                });
                $(input).observe('keyup', function () {
                    cont.setStyle('z-index:0');
                    bubble.hide();
                });
                $(input).observe('focus', function () {
                    cont.setStyle('z-index:10000');
                    bubble.show();
                });
                $(input).observe('blur', function () {
                    cont.setStyle('z-index:0');
                    bubble.hide();
                });
            }
        }
    },

    /**
     * do all validations at once and stop on the first error
     * @param {Object} form
     * @param {string} scopeSelector, used for selector scopes on following selectors :
     *   form-textarea-limit-indicator-error and form-datetime-validation-error
     */
    validateAll: function (form, scopeSelector) {
        function handleValidateAll(form, scopeSelector) {
            var _log = function () {
                if (window.location.href.indexOf('stripeDebug') !== -1) {
                    console.log.apply(console, arguments);
                }
            }
            if (getQuerystring('qp') !== "") {
                return true;
            }
            var ret = true;
            JotForm.validatedRequiredFieldIDs = typeof JotForm.validatedRequiredFieldIDs !== 'object' ? {} : JotForm.validatedRequiredFieldIDs;
            if (scopeSelector == undefined) {
                scopeSelector = $$('body')[0];
            }
            JotForm.handleTextareaLimits(false);
            scopeSelector.select('.form-textarea-limit-indicator-error').each(function(limitErr) {
                if(JotForm.isVisible(limitErr)) {
                    _log('set to false because .form-textarea-limit-indicator-error');
                    ret = false;
                }
            });

            if (scopeSelector.select('.form-datetime-validation-error').first()) {
                _log('set to false because .form-datetime-validation-error');
                ret = false;
            }
            scopeSelector.select('[data-type="control_radio"]').each(function(input) {
                var hiddenOtherRadio = input.down('.form-radio-other');
                var otherRadioContainer = input.down('.other-input-container');
                if (hiddenOtherRadio && otherRadioContainer) {
                    var radioName = hiddenOtherRadio.getAttribute('name');
                    var otherRadio = otherRadioContainer.down('.form-radio-other-input');
                    if (otherRadioContainer.hasClassName('is-none')) {
                        otherRadio.removeAttribute('name');
                    } else if (!otherRadio.getAttribute('name') && !otherRadioContainer.hasClassName('is-none')) {
                        otherRadio.setAttribute('name', radioName + '[other]');
                    }
                }
            })
            //validation fo spinners,number when the form is submitted
            var spinnerNumberInputs = scopeSelector.select('.form-spinner-input, .form-number-input, .form-grading-input');
            if (spinnerNumberInputs.length > 0) {
                spinnerNumberInputs.each(function(input) {
                    var qid = input.id.split('_')[1];
                    var type = input.readAttribute('data-type');
                    switch (type) {
                        case 'input-number':
                            //call the validator function to validate the data
                            ret = (!input.validateNumberInputs()) ? false : ret;
                        break;
                        case 'input-spinner':
                            ret = (!input.validateSpinnerInputs()) ? false : ret;
                        break;
                        case 'input-grading': //deprecated
                            ret = (!input.validateGradingInputs()) ? false : ret;
                        break;
                    }
                });
            }

            //validation for textbox with minlength attribute
            var textboxInputs = scopeSelector.select('.form-textbox[data-minlength]');
            if (textboxInputs.length > 0) {
                textboxInputs.each(function(input) {
                    ret = (!input.validateTextboxMinsize()) ? false : ret;
                })
            }

            if (window.signatureForm) {
                _log('signature form');
                var pads = jQuery(".pad");

                for (var i = 0; i < pads.length; i++) {
                    var pad = pads[i];
                    if (jQuery(pad).attr("data-required") === "true") {
                        var formLine = jQuery('#id_' + jQuery(pad).attr('data-id'));
                        // if it is a hidden or filled signature field then run corrected()
                        if (JotForm.doubleValidationFlag()) {
                            var isSectionTouched = JotForm.isSectionTouched(JotForm.getSection(pad));
                            var alwaysHidden = JotForm.isInputAlwaysHidden(pad);

                            if (!alwaysHidden && isSectionTouched && jQuery(pad).jSignature('getData', 'base30')[1].length == 0 && !jQuery(pad).hasClass('edit-signature')) {
                                ret = false;
                                JotForm.errored(pad, JotForm.texts.required);
                            } else {
                                JotForm.corrected(pad);
                            }
                        } else {
                            if (formLine.is(':visible') && JotForm.getSection(pad).hasClassName('js-non-displayed-page') === false && jQuery(pad).jSignature('getData', 'base30')[1].length == 0 && !jQuery(pad).hasClass('edit-signature')) {
                                ret = false;
                                JotForm.errored(pad, JotForm.texts.required);
                            } else {
                                JotForm.corrected(pad);
                            }
                        }
                    }
                }
            }

            if (window.JCFServerCommon !== undefined) {
                _log('widgets detected');
                var widgetInputs = $$('.widget-required, .widget-errored');
                widgetInputs.each(function (el) {
                    if(JotForm.doubleValidationFlag()) {
                        var section = el.up('.form-section');
                        var alwaysHidden = JotForm.isInputAlwaysHidden(el);
                        if (JotForm.isSectionTouched(section) && !alwaysHidden) {
                            if (el.getValue().length === 0) {
                                JotForm.errored(el, JotForm.texts.required);
                                ret = false;
                            }
                        }
                    } else {
                        if (JotForm.isVisible(el)) {
                            // check if its a replaced widget
                            var isReplacedWidget = el.hasClassName('widget-replaced');
                            if (isReplacedWidget && el.errored) { JotForm.corrected(el); }
                            var section = el.up('.form-section');
                            // validate visible widgets
                            if (section.visible() && section.style.top !== '-9999px') {
                                if (el.getValue().length === 0) {
                                    ret = (isReplacedWidget) ? JotForm.errored(el, JotForm.texts.required) : false;
                                }
                            }
                        }
                    }
                    try {
                        if (el.hasClassName('widget-required') && !el.hasClassName('form-validation-error')) {
                            var corWidgetId = el.readAttribute('id');
                            var isWidgetHidden = JotForm.isInputAlwaysHidden(el);
                            if (isWidgetHidden && JotForm.validatedRequiredFieldIDs[corWidgetId]) {
                                delete JotForm.validatedRequiredFieldIDs[corWidgetId];
                            }
                            // don't check hidden fields or any other fields that are on the other pages.
                            if (JotForm.isVisible(el)) {
                                var stringifiedWidgetValue = '' + el.value;
                                JotForm.validatedRequiredFieldIDs[corWidgetId] = stringifiedWidgetValue.slice(0, 2);
                            }          
                        }
                    } catch (err) {}
                });
            }

            var c = "";
            if (form && form.id) {
                c = "#" + form.id + " ";
            }

            Array.prototype.forEach.call($(scopeSelector).querySelectorAll('*[class*="validate"]'), function(input) {


                if (JotForm.payment && input.up('.form-line')) { //b#486482 only run on first payment input as that will iterate over all of the others
                    var dataType = input.up('.form-line').getAttribute('data-type');
                    if (dataType == "control_" + JotForm.payment) {
                        var container = JotForm.getContainer(input);
                        var isFirstProduct = container.select('input[class*="validate"],select[class*="validate"]').first() == input;
                        if (input.name && !input.name.match('cc_') && !isFirstProduct) {
                            return;
                        }
                        if (input.id === 'ccFirstName' && $(input).up('.form-line[data-type="control_mollie"]')) {
                            return;
                        }
                    }
                }

                _log('looping inputs with validation :');
                _log(input);
                if (input.validateInput === undefined) {
                    _log('no required continuing');
                    return;
                    /* continue; */
                }

                if (!(!!input.validateInput && input.validateInput())) {
                    ret = JotForm.hasHiddenValidationConflicts(input);
                    try {
                        var corErroredInputId = input.up('.form-line') && input.up('.form-line').readAttribute('id');
                        delete JotForm.validatedRequiredFieldIDs[corErroredInputId];
                    } catch (err) {}
                    // skip fields that are not in the same page/section (b#1099614)
                    if (scopeSelector.tagName !== 'BODY' && input.id && scopeSelector.select('#' + input.id).length === 0) {
                        ret = true;
                    }
                    _log('ret setted ' + ret);
                } else if (JotForm.validatedRequiredFieldIDs != null && typeof JotForm.validatedRequiredFieldIDs === 'object') {
                    try {
                        var allInputValidations = JotForm.getInputValidations(input);
                        var corInputId = input.up('.form-line') && input.up('.form-line').readAttribute('id');
                        if (corInputId && allInputValidations.include('required') || (input.hasClassName('validate') && input.hasClassName('valid'))) {
                            var isInputHidden = JotForm.isInputAlwaysHidden(input);
                            if (isInputHidden && JotForm.validatedRequiredFieldIDs[corInputId]) {
                                delete JotForm.validatedRequiredFieldIDs[corInputId];
                            }
                            // don't check hidden fields or any other fields that are on the other pages.
                            if (JotForm.isVisible(input)) {
                                var stringifiedValue = '' + input.value;
                                JotForm.validatedRequiredFieldIDs[corInputId] = stringifiedValue.slice(0, 2);
                            }
                        }
                    } catch (err) {}
                }
            });

            if (
                window.paymentType === 'product' &&
                typeof PaymentStock !== 'undefined' &&
                !PaymentStock.validations.checkStock() &&
                !JotForm.isEditMode()
            ) {
                ret = false;
            }

            if (JotForm.isHermesTeam && JotForm.handleHermesFormErrors && !ret) {
                JotForm.handleHermesFormErrors();
                return;
            }

            _log('final ret value ' + ret);
            return ret;
        }

        // execute the validateAll function sequentially on each page for multi-page forms. If there is no pagebreak, it returns with the regular usage of validateAll func.
        var doubleValidationFlag = typeof JotForm.doubleValidationFlag !== 'undefined' ? JotForm.doubleValidationFlag() : false;
        if(doubleValidationFlag) {
            // if the section passed as scopeSelector, do the validation just for this section
            if (scopeSelector) {
                return handleValidateAll(form, scopeSelector);
            }
            
            var unvalidSections = 0;
            var allSections = document.querySelectorAll('ul.form-section:not([id^="section_"])');
            
            for (var i = 0; i < allSections.length; i++) {
                if(JotForm.isSectionTouched(allSections[i])) {
                    var result = handleValidateAll(form, allSections[i]);
                    if (!result) {
                        unvalidSections++;
                    }
                }
            }

            if (unvalidSections > 0) {
                return false;
            }

            return true;
        }

        return handleValidateAll(form, scopeSelector);
    },
    /**
     * When an input is errored
     * @param {Object} input
     * @param {Object} message
     */
    errored: function (input, message) {

        JotForm.nextPage = false;
        input = $(input);

        if (input.errored) {
            return false;
        }

        if (input.runHint) {
            input.runHint();
        }
        /*else{
         //input.select();
         }*/

        // if (this.url.search("https") == -1) {
        //     var preLink = "http://cdn.jotfor.ms/";
        // } else {
        //     var preLink = "https://cdn.jotfor.ms/";
        //     // var preLink = "https://www.jotform.com/";
        // }
        var preLink = "https://cdn.jotfor.ms/";

        if (typeof JotForm.minTotalOrderAmount !== 'undefined' && JotForm.minTotalOrderAmount > JotForm.paymentTotal) {
          input.addClassName('form-minTotalOrderAmount-error');
        }
        
        if (JotForm.isCollapsed(input)) {

            var collapse = JotForm.getCollapseBar(input);
            if (!collapse.errored) {
              if(JotForm.newDefaultTheme){
                collapse.select(".form-collapse-mid")[0].insert({
                  top: '<img width="30px" height= "30px" src="' + preLink + 'images/exclamation-octagon.png"> ' // image may change for new theme
              }).setStyle({color: 'red'});
              }
              else{
                collapse.select(".form-collapse-mid")[0].insert({
                  top: '<img src="' + preLink + 'images/exclamation-octagon.png"> '
              }).setStyle({color: 'red'});
              }
              collapse.errored = true;
          }
      }
        var container = JotForm.getContainer(input);
        if (!container) return false;

        input.errored = true;
        input.addClassName('form-validation-error');
        container.addClassName('form-line-error');
        var insertEl = container;

        //if(JotForm.debug){
        insertEl = container.select('.form-input')[0];
        if (!insertEl) {
            insertEl = container.select('.form-input-wide')[0];
        }
        if (!insertEl) {
            insertEl = container;
        }
        //}
        insertEl.select('.form-error-message').invoke('remove');

        error_message_span = new Element('span', {className: 'error-navigation-message'});
        error_message_span.innerText= message;

        insertEl.insert(new Element('div', {
            className: 'form-error-message',
            role: 'alert'
        }).insert('<img src="' + preLink + 'images/exclamation-octagon.png"> ').insert(error_message_span).insert(
            new Element('div', {className: 'form-error-arrow'}).insert(new Element('div', {className: 'form-error-arrow-inner'}))));

        JotForm.iframeHeightCaller();
        JotForm.updateErrorNavigation();

        return false;
    },

    /**
     * When an input is corrected
     * @param {Object} input
     */
    corrected: function (input) {
        input = $(input);
        if (input) {
            input.errored = false;
        }

        var container = JotForm.getContainer(input);
        if (!container) {
            return true;
        }
        var inputs = container.select('*[class*="validate"]');
        inputs.each(function(subInput) {
            subInput.errored = false;
        });

        if(JotForm.minTotalOrderAmount > JotForm.paymentTotal && container.classList.contains("form-minTotalOrderAmount-error")) {
          return;
        }

        if (
            JotForm.paymentFields.indexOf($(container).readAttribute('data-type')) > -1 &&
            typeof PaymentStock !== 'undefined' &&
            !PaymentStock.validations.checkStock()
        ) {
            return;
        }
        if (container.select('.form-error-message').length !== 0
            && container.select('.form-error-message')[0].id !== 'mollie_dummy') {
            container.select('.form-error-message').invoke('remove');
        }
        container.select(".form-validation-error").invoke('removeClassName', 'form-validation-error');
        container.removeClassName('form-line-error');

        if (JotForm.isCollapsed(input)) {
            var collapse = JotForm.getCollapseBar(input);
            if (collapse.errored && (collapse.up('.form-section-closed') && collapse.up('.form-section-closed').select('.form-validation-error').length == 0)) {
                collapse.select(".form-collapse-mid")[0].setStyle({
                    color: ''
                }).select('img')[0].remove();
                collapse.errored = false;
            }
        }

        setTimeout(function () {
            if ($$('.form-validation-error').length == 0) {
                JotForm.hideButtonMessage();
            }
        }, 100);

        JotForm.iframeHeightCaller();
        JotForm.updateErrorNavigation();

        return true;
    },

    hideButtonMessage: function () {
      if (window.FORM_MODE == 'cardform') {
        $$('.form-submit-button').each(function (button) {
          var buttonParentNode = button.parentNode.parentNode;

          var errorBox = buttonParentNode.select('.form-button-error')[0];
          if (errorBox && buttonParentNode.hasClassName('jfCard')) {
            var buttonParentNodeRect = buttonParentNode.getBoundingClientRect();
            var errorBoxRect = errorBox.getBoundingClientRect();

            var qContainer = buttonParentNode.select('.jfCard-question')[0];
            if (qContainer) {
              var qContainerRect = qContainer.getBoundingClientRect(qContainer);

              buttonParentNode.style.maxHeight = buttonParentNodeRect.height + errorBoxRect.height;
              qContainer.style.maxHeight = qContainerRect.height + errorBoxRect.height;

              buttonParentNode.parentNode.style.paddingBottom = 'unset';
            }
          }
        });
      }

      $$('.form-button-error').invoke('remove');
    },

    showButtonMessage: function (txt) {
        this.hideButtonMessage();

        $$('.form-submit-button').each(function (button) {
            if (JotForm.isSourceTeam) {
                return;
            }
            if (button && button.getAttribute('class').indexOf('form-sacl-button') > -1) {
                return;
            }
            var errorBox = new Element('div', {
                className: 'form-button-error',
                role: 'alert'
            });

            errorBox.insert('<p>' + (typeof txt !== "undefined" ? txt : JotForm.texts.generalError) + '</p>');

            var buttonParentNode = button.parentNode.parentNode;
            $(buttonParentNode).insert(errorBox);

            if (buttonParentNode.hasClassName('jfCard')) {
              var buttonParentNodeRect = buttonParentNode.getBoundingClientRect();

              var progressWrapper = document.querySelector('#cardProgress');
              var progressRect = progressWrapper.getBoundingClientRect();

              var errorBoxRect = errorBox.getBoundingClientRect();

              if (errorBoxRect.bottom > progressRect.top && getComputedStyle(progressWrapper).display !== 'none') {
                var qContainer = buttonParentNode.select('.jfCard-question')[0];
                if (qContainer) {
                  var qContainerRect = qContainer.getBoundingClientRect(qContainer);

                  buttonParentNode.style.maxHeight = buttonParentNodeRect.height - errorBoxRect.height;
                  qContainer.style.maxHeight = qContainerRect.height - errorBoxRect.height;

                  buttonParentNode.parentNode.style.paddingBottom = errorBoxRect.height;
                }
              }
            }
        });
    },

    _errTimeout: null,
    updateErrorNavigation: function(render) {
        if (typeof window.ErrorNavigation === 'undefined' || !JotForm.newDefaultTheme) {
            return;
        }

        // BUGFIX#2815923 :: Even if the old "render" parameter was "true", the navigation could not be displayed because the last "render" parameter was "undefined".
        var nav = document.querySelector('.error-navigation-container');
        JotForm.renderErrorNavigation = (typeof render === 'undefined' && !nav) ? true : render;

        if (JotForm._errTimeout) {
            clearTimeout(JotForm._errTimeout);
        }

        JotForm._errTimeout = setTimeout(function() {
            window.ErrorNavigation.update(JotForm.currentSection, JotForm.renderErrorNavigation);
            clearTimeout(JotForm._errTimeout);
        }, 50);
    },

    disableGoButton: function () {
        if (navigator.appVersion.indexOf("iPhone") != -1 || navigator.appVersion.indexOf("iPad") != -1 || navigator.appVersion.indexOf("Android") != -1) {
            $$('input').each(function (input) {
                input.observe('keypress', function (e) {
                    var code = (e.keyCode ? e.keyCode : e.which);
                    if (code === 13) {
                        e.preventDefault();
                    }
                });
            });
        }
    },

    disableSubmitForCard: function (action, isConditionMatch) {
        if (window.FORM_MODE !== 'cardform' || !window.CardForm || !window.CardForm.cards) return;
        JotForm.disableSubmitButton = isConditionMatch;
        JotForm.disableSubmitButtonMessage = (action && action.disableSubmitErrorMessage) ? action.disableSubmitErrorMessage : 'You are not eligible to submit this form.';
        if (!isConditionMatch) {
            JotForm.toggleDisableSubmitMessage();
        }
    },

    toggleDisableSubmitMessage: function () {
        var submitButtonCardIndex = window.CardForm.getLastVisibleIndex();
        if (typeof(submitButtonCardIndex) === "number" && document.getElementsByClassName('jfCard')) {
            var jfCardElement = document.getElementsByClassName('jfCard')[submitButtonCardIndex];
            var disableSubmitErrorMessageElement = jfCardElement && jfCardElement.querySelector('.jfCard-disableSubmitError');
            if(!jfCardElement || !disableSubmitErrorMessageElement) return;

            disableSubmitErrorMessageElement.innerHTML = '<p>' + JotForm.disableSubmitButtonMessage + '</p>';
            disableSubmitErrorMessageElement.style.display = JotForm.disableSubmitButton ? 'block' : 'none';
            if (JotForm.disableSubmitButton) {
                jfCardElement.addClassName('jfCard-submitErrored');
            } else {
                jfCardElement.classList.remove('jfCard-submitErrored');
            }
        }
    },
    removeNonselectedProducts: function(form) {
      // BUGFIX#3928437
      // Remove nonselected products (new payment UI) to bypass max_input_vars (3000 limit)

      var nonSelectedProducts = form.querySelectorAll('.form-product-item.new_ui:not(.p_selected)');
      if (!(nonSelectedProducts.length > 0)) { return; }

      nonSelectedProducts.forEach(function(node) {
        node.parentNode.removeChild(node)
      });
    },
    /**
     * Sets all validations to forms
     */
    validator: function () {
        JotForm.validatorExecuted = true;
        if (this.debugOptions && this.debugOptions.stopValidations) {
            this.info('Validations stopped by debug parameter');
            return true;
        }
        var $this = this;

        $A(JotForm.forms).each(function (form) { // for each JotForm form on the page
            if (form.validationSet) {
                return;
                /* continue; */
            }

            form.validationSet = true;
            // Set on submit validation
            form.observe('submit', function (e) {
                try {
                    if (JotForm.handleMinTotalOrderAmount() === true && window.paymentType === 'product') {
                      e.stop();
                    }

                    if (
                        window.FORM_MODE != 'cardform' &&
                        typeof PaymentStock !== 'undefined' &&
                        !PaymentStock.validations.validateStock()
                    ) {
                        e.stop();
                    }

                    if ($('payment_total_checksum')) {
                        $('payment_total_checksum').value = JotForm.paymentTotal;
                    }
                    if ($$('.form-submit-button') && $$('.form-submit-button').length > 0) {
                        //only submit form if a submit button is visible
                        var aSubmitIsVisible = false;
                        $$('.form-submit-button').each(function (el) {
                            if (JotForm.isVisible(el.parentNode)) {
                                aSubmitIsVisible = true;
                                return;
                            }
                        });
                        if (!aSubmitIsVisible) {
                            JotForm.enableButtons();
                            e.stop();
                        }
                        // invisible recaptcha for classic forms
                        var invisibleCaptchaWrapper = $$('[data-invisible-captcha="true"]');
                        var hasInvisibleCaptcha = !!invisibleCaptchaWrapper.length;
                        if (hasInvisibleCaptcha) {
                            var recaptchasHiddenInput = invisibleCaptchaWrapper[0].select('[name="recaptcha_invisible"]')[0];
                            var isCaptchaValidated = recaptchasHiddenInput && recaptchasHiddenInput.getValue();
                            if (!isCaptchaValidated) {
                                window.grecaptcha.execute();
                                JotForm.enableButtons();
                                e.stop();
                                return;
                            }
                        }
                    }

                    if (JotForm.disableSubmitButton) {
                        JotForm.toggleDisableSubmitMessage();
                        JotForm.enableButtons();
                        e.stop();
                        return;
                    }

                    if (!JotForm.validateAll(form)) {
                        JotForm.enableButtons();
                        JotForm.showButtonMessage();
                        JotForm.updateErrorNavigation(true);

                        if (JotForm.submitError) {
                            if (JotForm.submitError == "jumpToSubmit") {
                                var visSubmit = [];
                                $$('.form-submit-button').each(function (but) {
                                    if (JotForm.isVisible(but)) {
                                        visSubmit.push(but);
                                    }
                                });
                                if (visSubmit.length > 0) {
                                    if (visSubmit[visSubmit.length - 1].up('.form-line')) {
                                        visSubmit[visSubmit.length - 1].up('.form-line').scrollIntoView(false);
                                    } else {
                                        visSubmit[visSubmit.length - 1].scrollIntoView(false);
                                    }
                                }
                            } else if (JotForm.submitError == "jumpToFirstError") {
                                setTimeout(function () {
                                    JotForm.setPagePositionForError();
                                }, 100);
                            }
                        }

                        $$('.custom-hint-group').each(function (elem) { //redisplay textarea hints
                            elem.showCustomPlaceHolder();
                        });

                        e.stop();
                        return;
                    }

                    if (JotForm.validatedRequiredFieldIDs != null && typeof JotForm.validatedRequiredFieldIDs === 'object') {
                        form.insert(new Element('input', {type: 'hidden', name: 'validatedNewRequiredFieldIDs'}).putValue(JSON.stringify((Object.keys(JotForm.validatedRequiredFieldIDs).length > 0 && JotForm.validatedRequiredFieldIDs) || 'No validated required fields')));
                    }
                    //if 'other' not checked disable corresponding textbox
                    $$('.form-radio-other,.form-checkbox-other').each(function (el) {
                        if (!el.checked && JotForm.getOptionOtherInput(el)) {
                            JotForm.getOptionOtherInput(el).disable();
                        }
                    });

                    JotForm.runAllCalculations(true);

                    if ($$('input, select, textarea').length > 900) { //collapse matrices for long forms
                        $$('.form-matrix-table').each(function (matrixTable) {
                            var matrixObject = {};
                            var inputs = matrixTable.select("input, select");
                            var isDynamic = matrixTable.dataset.dynamic;
                            inputs.each(function (input) {
                                var ids = input.id.split("_");
                                var x = ids[2];
                                var y = ids[3];
                                if (input.type == "radio" && !isDynamic) {
                                    if (input.checked) {
                                        matrixObject[x] = input.value;
                                    } else if (!(x in matrixObject)) {
                                        matrixObject[x] = false;
                                    }
                                } else {
                                    if (!(x in matrixObject)) {
                                        matrixObject[x] = {};
                                    }
                                    if (input.type == "checkbox" || input.type == "radio") {
                                        matrixObject[x][y] = input.checked ? input.value : false;
                                    } else {
                                        matrixObject[x][y] = input.value;
                                    }
                                }
                                input.writeAttribute("disabled", "true");
                            });

                            try {
                                var name = matrixTable.down('input, select').readAttribute("name").split("[")[0];
                                var matrixArea = new Element("textarea").setStyle({display: 'none'});
                                matrixTable.insert({after: matrixArea});
                                matrixArea.value = JSON.stringify(matrixObject);
                                matrixArea.writeAttribute("name", name);
                            } catch (e) {
                                console.log(e);
                            }
                        });
                    }

                    if (JotForm.autoFillDeployed && !JotForm.payment) {
                        if (typeof window.localStorage !== 'undefined') {
                            var formID = $$('form').first().readAttribute('id') + $$('form').first().readAttribute('name');
                            AutoFill.getInstance(formID).stopSavingData();
                            window.localStorage.clear();
                        }
                    } else if (JotForm.isNewSaveAndContinueLaterActive && typeof window.localStorage !== 'undefined') {
                        window.localStorage.removeItem('JFU_SCL_details_' + $$('form').first().readAttribute('id'));
                    }

                } catch (err) {
                    JotForm.error(err);
                    e.stop();
                    var logTitle = e.stopped ? 'FORM_VALIDATION_ERROR' : 'FORM_VALIDATION_EVENT_NOT_STOPPED';
                    $this.errorCatcherLog(err, logTitle);
                    return;
                }

                //enable any disabled(readonly) time dropdowns so they are submitted with the form
                $$('.time-dropdown').each(function (el) {
                    el.enable();
                });
                $$('.form-checkbox, .form-radio').each(function (el) {
                    // Some gateways has own validation. Will enable in there. 
                    // Look at for Ex. stripeSCA.js:resubmitForm function
                    var stoppedGateways = ['control_paypalcomplete', 'control_stripe', 'control_paypalSPB'];
                    var gateway = el.up('.form-line') ? el.up('.form-line').getAttribute('data-type') : null;
                    // For temporarily. This improvement only for Stripe new version. Will be remove after lunch.
                    var isNewStripe = JotForm.stripe && typeof JotForm.stripe.validateStripe !== 'undefined';

                    if (gateway && stoppedGateways.indexOf(gateway) > -1) {
                        if (gateway === 'control_stripe' && isNewStripe) {
                            return false;
                        } else if (gateway !== 'control_stripe') {
                            return false;
                        }
                    }

                    // prevent required products from being unrequired after a validation failure
                    if (el.up('.form-product-item') && el.disabled && el.checked) {
                        el.observe('click', function(e) {
                            e.preventDefault();
                            setTimeout(JotForm.countTotal, 20);
                        });
                    }

                    el.enable();
                });
                $$('.conditionallyDisabled').each(function (el) {
                    el.enable();
                });

                // We will clear the contents of hidden fields, users don't want see the hidden fields on subscriptions
                if (JotForm.clearFieldOnHide !== "dontClear") {
                    $$('.form-field-hidden input', '.form-field-hidden select', '.form-field-hidden textarea').each(function (input) {
                        if (input.name == "simple_fpc") { // do not clear this field's value
                            return;
                        }

                        if (input.tagName == 'INPUT' && ['checkbox', 'radio'].include(input.type)) {
                            input.checked = false;
                        } else {
                            input.clear();
                        }
                    });
                }
                var numberOfInputs = form.querySelectorAll('.form-all input, select').length;
                if (numberOfInputs > 3000){ // to bypass max_input_vars - 3000 limit
                  JotForm.removeNonselectedProducts(form);
                }

                if (JotForm.compact && JotForm.imageSaved == false) {
                    e.stop();
                    window.parent.saveAsImage();
                    // JotForm.enableButtons();
                    $(document).observe('image:loaded', function () {
                        var block;
                        $(document.body).insert(block = new Element('div').setStyle('position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.85);'));
                        block.insert('<table height="100%" width="100%"><tr><td align="center" valign="middle" style="font-family:Verdana;color:#fff;font-size:16px;">Please Wait...</td></tr></table>');
                        setTimeout(function () {
                            form.submit();
                        }, 1000);
                    });
                    return;
                }

                if (window.FORM_MODE == 'cardform' && Array.prototype.forEach && CardForm && CardForm.cards) { // ie8 & isCardform Checks
                    if (window.toMarkdown) {
                        Array.prototype.forEach.call(CardForm.cards, function (card, index) {
                            if (card.markdownEditor && card.markdownEditor.setMarkdownFromHtml) {
                                // if the textarea has Markdown editor,
                                card.markdownEditor.setMarkdownFromHtml();
                            }
                        });
                    }
                }
                var previouslyEncryptedWithV2 = JotForm.isEditMode() && !!JotForm.submissionDecryptionKey;
                if (JotForm.isEncrypted || previouslyEncryptedWithV2) {
                    var redirectConditions = {};
                    $A(JotForm.conditions).each(function (condition) {
                        if(!condition.disabled && condition.type === 'url') {
                            redirectConditions[condition.id] = JotForm.checkCondition(condition);
                        }
                    });
                    JotForm.encryptAll(e, function(submitForm) {
                        if (submitForm) {
                            // Check if there are conditions for redirection
                            if (Object.keys(redirectConditions).length > 0) {
                                appendHiddenInput('redirectConditions', JSON.stringify(redirectConditions));
                            }
                            if(!window.offlineForm) {
                                form.submit();
                            }
                        }
                    });
                }
                history.pushState({submitted: true}, null, null);
            });

            // for each validation element
            $$('#' + form.id + ' *[class*="validate"]').each(function (input) {
                JotForm.setFieldValidation(input);
            });

            $$('#' + form.id + ' *[class*="form-address-table"] input').each(function (input) {
                var dataComponentName=  input.getAttribute('data-component');
               
                if(dataComponentName ==='address_line_1' || dataComponentName ==='address_line_2') {
                    input.setAttribute("maxLength", 100);
                } else if(dataComponentName === 'zip') {
                    input.setAttribute("maxLength", 20);
                } else {
                    input.setAttribute("maxLength", 60)
                }
            }); 
            
            $$('.form-upload').each(function (upload) {

                try {

                    var required = !!upload.validateInput;
                    var exVal = upload.validateInput || Prototype.K;

                    upload.validateInput = function () {

                        //clean any errors first if any
                        upload.errored = false;

                        if (exVal() !== false) { // Make sure other validation completed

                            if (!upload.files) {
                                return true;
                            } // If files are not provied then don't do checks

                            var acceptString = upload.readAttribute('accept') || upload.readAttribute('data-file-accept') || upload.readAttribute('file-accept') || "";
                            var maxsizeString = upload.readAttribute('maxsize') || upload.readAttribute('data-file-maxsize') || upload.readAttribute('file-maxsize') || "";
                            var minsizeString = upload.readAttribute('minsize') || upload.readAttribute('data-file-minsize') || upload.readAttribute('file-minsize') || "";

                            var accept = acceptString.strip().toLowerCase().split(/\s*\,\s*/gim);

                            for(var key in accept) {
                                // accept may contain string methods which may cause error while calling slice method
                                if (typeof accept[key] === 'string') {
                                    // omitting . (dot) from the start of extension string
                                    accept[key] = accept[key].slice(0, 1) === '.' ? accept[key].slice(1) : accept[key];
                                }
                            }

                            var maxsize = parseInt(maxsizeString, 10) * 1024;
                            var minsize = parseInt(minsizeString, 10) * 1024;

                            var file = upload.files[0];
                            if (!file) {
                                return true;
                            } // No file was selected

                            //Emre: to prevent extension of file problem in firefox7 (47183)
                            if (!file.fileName) {
                                file.fileName = file.name;
                            }

                            var ext = "";
                            if (JotForm.getFileExtension(file.fileName)) {
                                ext = JotForm.getFileExtension(file.fileName);
                            }
                            // allow file uploads with no file extension #567813
                            /*if (!ext){
                             return JotForm.errored(upload, JotForm.texts.noUploadExtensions);
                             }*/

                            if (acceptString != "*" && !accept.include(ext) && !accept.include(ext.toLowerCase())) {
                                return JotForm.errored(upload, JotForm.texts.uploadExtensions + '<br/>' + acceptString);
                            }

                            //check if validation if real image is set to yes
                            //if so check again if the meta data is correct and only if the extension is correct
                            var validateImage = upload.readAttribute('data-imagevalidate') || false;
                            var validatedImageExt = "jpeg, jpg, png, gif, bmp";
                            if ((accept.include(ext) || accept.include(ext.toLowerCase()) ) && //for the accepted extensions
                                validateImage && ( validateImage === 'yes' || validateImage === 'true' ) &&
                                (validatedImageExt.include(ext) || validatedImageExt.include(ext.toLowerCase()) ) && //for the accepted valid images
                                typeof window.FileReader != 'undefined' //only for modern browsers that supports it
                            ) {
                                //initiate the FileReader
                                var binary_reader = new FileReader();
                                binary_reader.onloadend = function (e) {
                                    function ab2str(buf) {
                                        var binaryString = '',
                                            bytes = new Uint8Array(buf),
                                            length = bytes.length;
                                        for (var i = 0; i < length; i++) {
                                            binaryString += String.fromCharCode(bytes[i]);
                                        }
                                        return binaryString;
                                    }

                                    var args = {
                                        filename: file.name,
                                        size: file.size,
                                        //convert string to binary
                                        binary: ab2str(e.target.result)
                                    };
                                    ImageInfo.loadInfo(args, function () {
                                        var info = ImageInfo.getAllFields(file.name);
                                        if (info.format === 'UNKNOWN') {
                                            return JotForm.errored(upload, "You have uploaded an invalid image file type.");
                                        }
                                    });
                                }
                                //read file as buffer array (binaryString is deprecated)
                                binary_reader.readAsArrayBuffer(file);
                            }

                            //Emre: to prevent file.fileSize being undefined in Firefox 7 (48526)
                            //Emre: to prevent file upload not to work in Firefox 3.
                            if (!file.fileSize) {
                                file.fileSize = file.size;
                            }

                            if (file.fileSize > maxsize && maxsize !== 0) {
                                return JotForm.errored(upload, JotForm.texts.uploadFilesize + ' ' + maxsizeString + 'Kb');
                            }
                            if (file.fileSize < minsize) {
                                return JotForm.errored(upload, JotForm.texts.uploadFilesizemin + ' ' + minsizeString + 'Kb');
                            }

                            return JotForm.corrected(upload);
                        }
                    };

                    if (!required) {
                        upload.addClassName('validate[upload]');
                        upload.observe('blur', upload.validateInput);
                    }
                } catch (e) {

                    JotForm.error(e);

                }

            });
        });
    },

    dateFromField: function(field) {
        var offset = "";
        if(field.indexOf("-") > -1 || field.indexOf("+") > -1) {
            offset = field.split(/[\+\-]/)[1];
            offset = field.indexOf("-") > -1 ? "-"+offset : ""+offset;
            field = field.split(/[\+\-]/)[0];
        }
        field = field.replace(/[{}]/g, '');
        if(!$('year_'+field) || !$('year_'+field).value) return false;
        var year = $('year_'+field).value;;
        var month = $('month_'+field).value;
        var day = $('day_'+field).value;
        var date = new Date(year, month-1, day);
        if(offset.length) {
            date.setDate(date.getDate() + parseInt(offset, 10));
        }
        return date;
    },
    /*
     * Get validation names from input className
     */
    getInputValidations: function(input) {
        if (input) {
            return input.className.replace(/.*validate\[(.*)\].*/, '$1').split(/\s*,\s*/);
        }
        return [];
    },
    /*
     * remove the input validations using by regex pattern
     */
    removeValidations: function(input, pattern) {
        var validationPattern = new RegExp('(validate\\[(.*)?' + pattern + '(.*)?\\])');
        if (validationPattern.test(input.className)) {
            var matches = validationPattern.exec(input.className);
            var validationClass = matches[0]
                .replace(new RegExp(pattern + '(\\,\\s*)?', 'g'), '')
                .replace(/\,\s(?!\w+)/g, '');
            input.className = input.className.replace(validationPattern, validationClass).replace(' validate[]', '');
            return input;
        }

        return input;
    },
    /*
    * Replace the notation with value and returns the valid message
    */
    getValidMessage: function(message, value) {
        var validMessage = message.replace(/\s*$/, "");
        var notation = /{value}/ig;
        if (notation.test(message)) {
            return validMessage.replace(notation, value) + ".";
        }
        return validMessage + " " + value + ".";
    },
    /*
     * set validation function on field
     */
    setFieldValidation: function (input) {
        var $this = this;
        var reg = JotForm.validationRegexes;
        var validationWhiteList = [];

        // first-last name validations are handled in square.js
        if (JotForm.payment === 'square' &&
            (input.classList.contains('cc_firstName') || input.classList.contains('cc_lastName')) &&
            window.FORM_MODE !== 'cardform'
            ) {
            return;
        }

        input.validateInput = function (deep, dontShowMessage) { // dontShowMessage param will be passed and handled by cardForm
            if (document.get.ignoreValidation && document.get.ignoreValidation === "true") {
                return true;
            }
            
            if (JotForm.doubleValidationFlag()) {
                var alwaysHidden = JotForm.isInputAlwaysHidden(input);
                if (alwaysHidden && !input.hasClassName('h-captcha-response')) {
                    return true; // if it's hidden then user cannot fill this field then don't validate
                }
                if (alwaysHidden && !input.hasClassName('g-recaptcha-response')) {
                    return true; // if it's hidden then user cannot fill this field then don't validate
                }
            } else {
                // !window.checkForHiddenSection :: must be implement
                if (!JotForm.isVisible(input) && !input.hasClassName('h-captcha-response')) {
                    return true; // if it's hidden then user cannot fill this field then don't validate
                }
                // !window.checkForHiddenSection :: must be implement
                if (!JotForm.isVisible(input) && !input.hasClassName('g-recaptcha-response')) {
                    return true; // if it's hidden then user cannot fill this field then don't validate
                }
            }

            var container = JotForm.getContainer(input);

            if (container.getAttribute('data-type') === "control_appointment") {
                var inputID = input.getAttribute('id');
                if (!inputID || inputID.indexOf('_date') === -1) {
                    return true;
                }

                if ((input.hasClassName('validate') && !input.hasClassName('valid'))) {
                    JotForm.errored(input, JotForm.texts.required);
                    return false;
                }

                JotForm.corrected(input);
                return true;
            }


            if (JotForm.getContainer(input).getAttribute('data-type') === "control_inline" && !deep) {
                var validatedFitbInputs = JotForm.getContainer(input).querySelectorAll('input[class*="validate"],select[class*="validate"]');
                if (Array.from(validatedFitbInputs).map(function (input) { return input.validateInput(true); }).every(function(e) { return e; })) {
                    return JotForm.corrected(input);
                }
                return false;
            }

            if(JotForm.getContainer(input).getAttribute('data-type') === "control_datetime"
                && !JotForm.getContainer(input).down('input[id*="month_"]').dateTimeCheck(false)) {
                return false; //date is not valid
            }

            if(JotForm.getContainer(input).getAttribute('data-type') === "control_time"
                && JotForm.getContainer(input).down('select[id*="hourSelect"]')
                && !JotForm.getContainer(input).down('select[id*="hourSelect"]').timeCheck()) {
                return false; //time is not valid
            }


            if (!$(input.parentNode).hasClassName('form-matrix-values')
                && !input.hasClassName('form-subproduct-option')
                && !input.hasClassName('time-dropdown')
                && !(input.id.match(/_quantity_/) || input.id.match(/_custom_/)) // do not clean product options (bugfix#461798)
                && !(JotForm.getContainer(input).getAttribute('data-type') === "control_inline"))
            {
                JotForm.corrected(input); // First clean the element
            }

            var vals = JotForm.getInputValidations(input);

            if (input.hinted === true) {
                input.clearHint();
                setTimeout(function () {
                    input.hintClear();
                }, 150);
            } // Clear hint value if exists
            // This means we are overriding this function.
            if (typeof input.overridenValidateInput === 'function') {
                return input.overridenValidateInput(input, deep, dontShowMessage);
            }
            //change where it deploys
            //to first check the data  of this inputs before going to the next with a validate[*] class
            if (input.readAttribute('data-type') === 'input-spinner' && input.value) {
                return input.validateSpinnerInputs();
            }
            else if (input.readAttribute('data-type') === 'input-grading' && input.value) {
                return input.validateGradingInputs();
            }
            else if (input.readAttribute('data-type') === 'input-number' && input.value) {
                return input.validateNumberInputs();
            }
            // check minimum donation amount
            else if (input.readAttribute('data-min-amount')) {
                return input.validateMinimum();
            }

            // Handles markdown editor validation
            if (input.limitValidation && input.classList.contains('mdInput')) {
                var errorText = input.limitValidation();

                if(errorText !== false) {
                    return JotForm.errored(input, errorText);
                }
            }

            if (input.up('.form-line') && input.up('.form-line').down('.form-textarea-limit-indicator-error')) {
                // JotForm.handleTextareaLimits handles this better
                input.triggerEvent('change');
                return;
            }

            if (vals.include('minCharLimit')) {
                var valid = input.validateTextboxMinsize();
                if (!valid) return valid;
            }

            if (vals.include('disallowFree')) {
                for (var i = 0; i < JotForm.freeEmailAddresses.length; i++) {
                    if (input.value.toLowerCase().indexOf("@" + JotForm.freeEmailAddresses[i]) > -1) {
                        return JotForm.errored(input, JotForm.texts.freeEmailError, dontShowMessage);
                    }
                }
            }

            if (vals.include('minSelection') || vals.include('minselection')) {
                var minSelection = parseInt(input.readAttribute('data-minselection'));
                var numberChecked = 0;
                input.up('.form-line').select('input[type=checkbox]').each(function (check) {
                    if (check.checked) numberChecked++;
                });
                if (numberChecked > 0 && numberChecked < minSelection) {
                    return JotForm.errored(input, JotForm.getValidMessage(JotForm.texts.minSelectionsError, minSelection), dontShowMessage);
                }
            }

            if (vals.include('maxselection')) {
                var maxSelection = parseInt(input.readAttribute('data-maxselection'));
                var numberChecked = 0;
                input.up('.form-line').select('input[type=checkbox]').each(function (check) {
                    if (check.checked) numberChecked++;
                });
                if (numberChecked > maxSelection) {
                    return JotForm.errored(input, JotForm.getValidMessage(JotForm.texts.maxSelectionsError, maxSelection), dontShowMessage);
                }
            }

            if (vals.include('disallowPast') && validationWhiteList.indexOf('disallowPast') === -1) {
                var id = input.id.split('_').last();
                var inputtedDate = JotForm.getDateValue(id).split('T')[0];
                var dat = new Date();
                var month = (dat.getMonth() + 1 < 10) ? '0' + (dat.getMonth() + 1) : dat.getMonth() + 1;
                var day = (dat.getDate() < 10) ? '0' + dat.getDate() : dat.getDate();
                var currentDate = dat.getFullYear() + "-" + month + "-" + day;

                if (JotForm.checkValueByOperator('before', JotForm.strToDate(currentDate), JotForm.strToDate(inputtedDate))) {
                    return JotForm.errored(input, JotForm.texts.pastDatesDisallowed, dontShowMessage);
                }
            }

            if (JotForm.getContainer(input).getAttribute('data-type') === "control_datetime"
              && input.readAttribute('data-age') && input.value) {

              var minAge = input.readAttribute('data-age');
              var today = new Date();
              var birthDate = new Date(input.value);
              var formLine = input.up('.form-line');
              var liteModeInput = formLine ? formLine.down('input[id*="lite_mode_"]') : null;
              if (liteModeInput) {
                var dateParts = liteModeInput.value.split(liteModeInput.readAttribute('data-seperator'));
                if (liteModeInput.readAttribute('data-format') === 'ddmmyyyy') {
                    birthDate = new Date(dateParts[2], parseInt(dateParts[1], 10) - 1, dateParts[0]);
                } else if (liteModeInput.readAttribute('data-format') === 'mmddyyyy') {
                    birthDate = new Date(dateParts[2], parseInt(dateParts[0], 10) - 1, dateParts[1]);
                } else if (liteModeInput.readAttribute('data-format') === 'yyyymmdd') {
                    birthDate = new Date(dateParts[0], parseInt(dateParts[1], 10) - 1, dateParts[2]);
                }
              } else {
                var parentContainer = input.up('.notLiteMode');
                if (!parentContainer) {
                    return false;
                }
                var yearElement = parentContainer.down('input[id*="year_"]');
                var year = yearElement ? yearElement.value : '';
                var monthElement = parentContainer.down('input[id*="month_"]');
                var month = monthElement ? monthElement.value : '';
                var dayElement = parentContainer.down('input[id*="day_"]');
                var day = dayElement ? dayElement.value : '';

                if (year && month && day) {
                    birthDate = new Date(year, parseInt(month, 10) - 1, day);
                } 
              }
              var age = today.getFullYear() - birthDate.getFullYear();
              var m = today.getMonth() - birthDate.getMonth();
              if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                  age--;
              }
              if (age < minAge) {
                var errorTxt = JotForm.texts.ageVerificationError.replace('{minAge}', minAge)
                JotForm.errored(input, errorTxt);
                return false; // date is not valid
              }
            }

            if (vals.include('limitDate') && validationWhiteList.indexOf('limitDate') === -1) {

                try {
                    var id = input.id.split('_').last();
                    var lim = JotForm.dateLimits[id];

                    if (typeof lim !== 'undefined' && lim !== false && !($("year_" + id).value == "" || $("month_" + id).value == "" || $("day_" + id).value == "")) {

                        //custom
                        if ("custom" in lim && lim.custom !== false && Array.isArray(lim.custom)) {
                            for (var j = 0; j < lim.custom.length; j++) {
                                if(!lim.custom[j]) continue;

                                var year = $("year_" + id).value;
                                var month = JotForm.addZeros($("month_" + id).value, 2);
                                var day = JotForm.addZeros($("day_" + id).value, 2);

                                if(lim.custom[j].indexOf("{") > -1) {
                                    var custom = JotForm.dateFromField(lim.custom[j]);
                                    custom = JotForm.addZeros(custom.getFullYear(),2)+"-"+JotForm.addZeros(custom.getMonth()+1,2)+"-"+JotForm.addZeros(custom.getDate(), 2);
                                    if (custom === year + "-" + month + "-" + day) return JotForm.errored(input, JotForm.texts.dateLimited, dontShowMessage);
                                    return;
                                }

                                if ((lim.custom[j] === year + "-" + month + "-" + day) || //full date
                                    (typeof lim.custom[j] == "string" && lim.custom[j].length === 5 && lim.custom[j] === (month + "-" + day)) || //day and month
                                    (typeof lim.custom[j] == "string" && lim.custom[j].length === 2 && lim.custom[j] == day)) { //day
                                    return JotForm.errored(input, JotForm.texts.dateLimited, dontShowMessage);
                                }
                            }
                        }

                        var date = new Date($("year_" + id).value, ($("month_" + id).value - 1), $("day_" + id).value);

                        //ranges
                        if ("ranges" in lim && lim.ranges !== false && Array.isArray(lim.ranges)) {
                            for (var j = 0; j < lim.ranges.length; j++) {
                                if(!lim.ranges[j] || lim.ranges[j].indexOf(">") === -1) continue;
                                var range = lim.ranges[j].split(">");
                                var startDate;
                                if(range[0].indexOf("{") > -1) {
                                    startDate = JotForm.dateFromField(range[0]);
                                } else {
                                    JotForm.browserIs.safari() && !JotForm.browserIs.chrome() ? startDate = new Date(range[0]+'T00:00') : startDate = new Date(range[0].split('-'));   
                                }
                                var endDate;
                                if(range[1].indexOf("{") > -1) {
                                    endDate = JotForm.dateFromField(range[1]);
                                } else {
                                    JotForm.browserIs.safari() && !JotForm.browserIs.chrome() ? endDate = new Date(range[1]+'T00:00') : endDate = new Date(range[1].split('-'));   
                                }
                                if(endDate) {
                                    if (date.getTime() >= startDate.getTime() && date.getTime() <= endDate.getTime()) {
                                        return JotForm.errored(input, JotForm.texts.dateLimited, dontShowMessage);
                                    }
                                }
                            }
                        }

                        //days
                        var dayOfWeek = JotForm.getDayOfWeek(date);
                        if ("days" in lim, dayOfWeek in lim.days && lim.days[dayOfWeek] == false) {
                            return JotForm.errored(input, JotForm.texts.dateLimited, dontShowMessage);
                        }

                        //future
                        if ("future" in lim && lim.future === false) {
                            var now = new Date();
                            if (date > now) {
                                return JotForm.errored(input, JotForm.texts.dateLimited, dontShowMessage);
                            }
                        }

                        //past
                        if ("past" in lim && lim.past === false) {
                            var now = new Date();
                            var yesterday = new Date();
                            yesterday.setDate(now.getDate() - 1);
                            if (date < yesterday) {
                                return JotForm.errored(input, JotForm.texts.dateLimited, dontShowMessage);
                            }
                        }

                        //start
                        if ("start" in lim && lim.start != false && lim.start != "") {
                            var start = lim.start.split("-");
                            if (start.length == 3) {
                                var startDate = new Date(start[0], start[1] - 1, start[2]);
                                if (date < startDate) {
                                    return JotForm.errored(input, JotForm.texts.dateLimited, dontShowMessage);
                                }
                            } else if(lim.start.indexOf('{') > -1) {
                                var startDate = JotForm.dateFromField(lim.start);
                                if (date < startDate) {
                                    return JotForm.errored(input, JotForm.texts.dateLimited, dontShowMessage);
                                }
                            }
                        }

                        //end
                        if ("end" in lim && lim.end != false && lim.end != "") {
                            var end = lim.end.split("-");
                            if (end.length == 3) {
                                var endDate = new Date(end[0], end[1] - 1, end[2]);
                                if (date > endDate) {
                                    return JotForm.errored(input, JotForm.texts.dateLimited, dontShowMessage);
                                }
                            } else if(lim.end.indexOf('{') > -1) {
                                var endDate = JotForm.dateFromField(lim.end);
                                if (date > endDate) {
                                    return JotForm.errored(input, JotForm.texts.dateLimited, dontShowMessage);
                                }
                            }
                        }

                    }
                } catch (e) {
                    console.log(e);
                }
            }

            if(vals.include('validateLiteDate')) {
                if(input.hasClassName("invalidDate")) {
                    var format = input.readAttribute("placeholder")
                    return JotForm.errored(input, JotForm.texts.dateInvalid.replace("{format}", format), dontShowMessage);
                }
            }

            //Emre confirmation email (36639)
            if (vals.include("Email_Confirm")) {
                //console.log("if (vals.include(\"Email_Confirm\")) {");
                var idEmail = input.id.replace(/.*_(\d+)(?:_confirm)?/gim, '$1'); //confirm email id is like "input_4_confirm"
                if (($('input_' + idEmail).value != $('input_' + idEmail + '_confirm').value)) {
                    return JotForm.errored(input, JotForm.texts.confirmEmail, dontShowMessage);
                } else if (($('input_' + idEmail + '_confirm').value) && (!reg.email.test($('input_' + idEmail + '_confirm').value))) {
                    return JotForm.errored(input, JotForm.texts.email, dontShowMessage);
                }
            }

            if (vals.include("required")) {
                if(JotForm.minTotalOrderAmount !== '0' && JotForm.minTotalOrderAmount < JotForm.paymentTotal) {
                    input.addClassName('form-minTotalOrderAmount-error');
                } else {
                  input.removeClassName('form-minTotalOrderAmount-error');
                }
                if(JotForm.getContainer(input).getAttribute('data-type') == 'control_signature'){
                    var pad = input
                    if (jQuery(pad).attr("data-required") === "true") {
                        var formLine = jQuery('#id_' + jQuery(pad).attr('data-id'));

                        var _isVisible = formLine.is(':visible');
                        if (JotForm.doubleValidationFlag()) {
                            _isVisible = !(JotForm.isInputAlwaysHidden(pad));
                        }

                        if (_isVisible) {
                            if (jQuery(pad).jSignature('getData', 'base30')[1].length == 0 && !jQuery(pad).hasClass('edit-signature')) {
                                return JotForm.errored(input, JotForm.texts.required, dontShowMessage);
                            } else {
                                return JotForm.corrected(input);
                            }
                        }
                    }
                }
                if (input.tagName == 'INPUT' && input.readAttribute('type') == "file") { // Upload
                    var formInput = input.up('.form-input') || input.up('.form-input-wide');
                    var isMultiple = input.readAttribute('multiple') === 'multiple' || input.hasAttribute('multiple');
                    if (!isMultiple) {
                        if (input.value.empty() && !(input.uploadMarked || (formInput && formInput.uploadMarked))) {
                            return JotForm.errored(input, JotForm.texts.required, dontShowMessage);
                        } else {
                            return JotForm.corrected(input);
                        }
                    } else{
                        // In offline forms there is no upload to server mechanism available.
                        // So there is no cb function to populate fileList or add classes after success etc..
                        // When validating in offline forms we check input.value only.
                        // And no need to validate parent element.
                        if (JotForm.isFillingOffline()) {
                          if (input.value.empty()) {
                            return JotForm.errored(input, JotForm.texts.required, dontShowMessage);
                          } else {
                            return JotForm.corrected(input);
                          }
                        }
                        return input.up('div[class*=validate[multipleUpload]]').validateInput();
                    }
                } else if (input.tagName == "INPUT" && !$(input.parentNode).hasClassName('form-matrix-values') && (input.readAttribute('type') == "radio" || input.readAttribute('type') == "checkbox") && JotForm.getContainer(input).getAttribute('data-type') !== 'control_inline') {
                        var otherInput = input.up(".form-" + input.type + "-item") ? input.up(".form-" + input.type + "-item").down(".form-" + input.type + "-other-input") : null;
                        if (otherInput) { //b#641595 if other is checked box should be filled
                            if (input.checked && otherInput.value == "") {
                                return JotForm.errored(input, JotForm.texts.required);
                            }
                        }
                        var baseInputName = input.name.substr(0, input.name.indexOf('['));
                        var otherInputName = baseInputName + '[other]';
                        var checkboxArray = [];
                        // If 'Other' input exists;
                        if (document.getElementsByName(otherInputName)[0]) {
                            // Assign all checkboxes including 'Other' to array
                            checkboxArray = $A(document.getElementsByName(baseInputName + '[]'));
                            checkboxArray[checkboxArray.length] = document.getElementsByName(otherInputName)[0];
                            // Validate each checkbox
                            if (!checkboxArray.map(function (e) {
                                    return e.checked;
                                }).any()) {
                                return JotForm.errored(input, JotForm.texts.required, dontShowMessage);
                            }
                        } else {
                            var cont = JotForm.getContainer(input);
                            if (JotForm.payment && cont.getAttribute('data-type').match(JotForm.payment)) {
                                if (!$A(document.getElementsByName(input.name)).map(function (e) {
                                        var _isVisible = JotForm.isVisible(e);
                                        if (JotForm.doubleValidationFlag()) {
                                            _isVisible = !(JotForm.isInputAlwaysHidden(e));
                                        }
                                        if (_isVisible) {
                                            // if this is an sub product checkbox (expanded)
                                            if ((e.readAttribute('type') === "checkbox" || e.readAttribute('type') === "radio") && e.value.indexOf('_expanded') > -1) {
                                                // if not selected
                                                if (!e.checked) {
                                                    return false;
                                                } else {
                                                    // check if any of the quantities are filled
                                                    return $A($$('#' + e.id + '_subproducts .form-subproduct-quantity')).map(function (cb) {
                                                        return cb.getSelected().value > 0 || cb.value > 0;
                                                    }).any();
                                                }
                                            } else if ($(e.id + '_custom_price')) {
                                                // subscriptions with custom price should have a value greater than zero
                                                return e.checked && $(e.id + '_custom_price').getValue() > 0;
                                            } else {
                                                var qty = e.up('.form-product-item') ? e.up('.form-product-item').down('select[id*="quantity"], input[id*="quantity"]'): false;
                                                if (qty) {
                                                    return e.checked && qty.getValue() > 0;
                                                }
                                                return e.checked;
                                            }
                                        } else {
                                          // CardForm Paginated Products
                                          if (
                                            JotForm.productPages &&
                                            JotForm.productPages.totalPage > 1 &&
                                            cont.select('.product--selected').length > 0
                                          ) {
                                            JotForm.corrected(e);
                                            return true;
                                          }
                                        }
                                    }).any() || ( window.FORM_MODE === 'cardform' && cont.select('.product--selected').length === 0 ))
                                {
                                    // for paypalpro payment type radio
                                    if (input.hasClassName('paymentTypeRadios')) {
                                        return JotForm.errored(input, "Please select payment method.", dontShowMessage);
                                    }

                                    return JotForm.errored(input, JotForm.texts.required, dontShowMessage);
                                } else {
                                  $A(cont.querySelectorAll('select[id*="quantity"], input[id*="quantity"]')).forEach(function(q) {
                                    if (q.getValue() > 0) JotForm.corrected(q);
                                  })
                                }
                            } else {
                                if(cont.select("input:checked").length === 0) {
                                    return JotForm.errored(input, JotForm.texts.required, dontShowMessage);
                                }

                            }
                    }
                } else if ((input.tagName == "INPUT" || input.tagName == "SELECT") && ($(input).up().hasClassName('form-matrix-values') || $(input).up(1).hasClassName('form-matrix-values'))) {
                    function isInputTypeRadioOrCheckbox(inp) {
                        return ['radio', 'checkbox'].indexOf(inp.type) !== -1;
                    }

                    function isFilled(el) {
                        return isInputTypeRadioOrCheckbox(el) ? el.checked : (!!el.value && !el.value.strip(" ").empty());
                    }

                    var matrixElement = input.up('table') ? input.up('table') : input.up('.jfMatrix');                    
                    var allCells = Array.from(matrixElement.querySelectorAll('input,select'));

                    function getElementsInRow(row) {
                        return Array.from(row.querySelectorAll('input,select'));
                    }

                    function anyRowElementsFilled(rowElements) {
                        return rowElements.map(isFilled).any();
                    }

                    function allRowElementsFilled(rowElements) {
                        var singleChoiceFilled = rowElements.every(function(e) { return e.type !== 'radio' }) || rowElements
                            .filter(function isRadio(e) { return e.type === 'radio'; })
                            .map(isFilled)
                            .any(function(e) { return e; });

                        var othersFilled = rowElements
                            .filter(function notRadio(e) { return e.type !== 'radio'; })
                            .map(isFilled)
                            .every(function(e) { return e; });

                        return singleChoiceFilled && othersFilled;
                    }

                    var rows = window.FORM_MODE === 'cardform' ? matrixElement.querySelectorAll('.jfMatrixTable-row,.jfMatrixScale,.jfMatrixInputList-item,.jfMatrixChoice-table') : matrixElement.rows;
                    var hasOneAnswerEveryRows = Array.from(rows)
                        .map(getElementsInRow)
                        .filter(function notEmpty(el) { return el.length; })
                        .map(anyRowElementsFilled)
                        .every(function (el) { return el; });

                    var hasAnswerEveryCell = Array.from(rows)
                        .map(getElementsInRow)
                        .filter(function notEmpty(el) { return el.length; })
                        .map(allRowElementsFilled)
                        .every(function (el) { return el; });

                    if (vals.include("requireEveryRow") && !hasOneAnswerEveryRows) {
                        return JotForm.errored(input, JotForm.texts.requireEveryRow, dontShowMessage);
                    } else if (vals.include("requireOneAnswer") && !allCells.map(isFilled).any()) {
                        return JotForm.errored(input, JotForm.texts.requireOne, dontShowMessage);
                    } else if (vals.include('requireEveryCell') && !hasAnswerEveryCell) {

                        return JotForm.errored(input, JotForm.texts.requireEveryCell, dontShowMessage);
                    } else {
                        return JotForm.corrected(input);
                    }
                } else if ((input.tagName === "INPUT" || input.tagName === "SELECT") && input.hasClassName('form-subproduct-option')) {
                    // if this is a subproduct quantity option
                    if (input.hasClassName('form-subproduct-quantity')) {
                        var qID = input.id.replace(/_[0-9]*_[0-9]*$/, '');
                        // if the corresponding checkbox is  checked
                        if ($(qID.replace(/_quantity/, '')).checked) {
                            // if any of the quantities are greater than 0
                            if ($A($$('[id*="' + qID + '"]')).map(function (vl) {
                                    return (vl.getSelected().value > 0 || vl.value > 0);
                                }).any()) {
                                return JotForm.corrected(input); // corrected
                            } else {
                                return JotForm.errored(input, JotForm.texts.required, dontShowMessage); // errored
                            }
                        }
                    }
                } else if (input.name && input.name.include("[") || $this.getContainer(input).getAttribute('data-type') === 'control_inline') {
                    try {
                        // Disabled matrix check fixes #1311177,
                        var isDisabledMatrix = $(input).getAttribute('data-component') === 'matrix' && ($(input).up().hasClassName('form-matrix-values-disabled') || $(input).up(1).hasClassName('form-matrix-values-disabled'))
                        if (isDisabledMatrix) {
                            return true;
                        }

                        var cont = $this.getContainer(input);
                        // Preventing address component error checks before revealing them
                        if(input.hasClassName('form-address-search') && cont.select('.jfQuestion-clean').length > 0) {
                            inputs = [input];
                        } else {
                            inputs = Array.from(
                                cont.querySelectorAll(
                                    'input,select[name*="' + input.name.replace(/\[.*$/, "") + '"]'
                                )
                            );
                        }

                        // Ozan, bugfix: 133419, both input and select fields should be selected
                        var checkValues = inputs.map(function (e) {
                            // if this is a donation box
                            if (e.id.match(/_donation/)) {
                                return e.getValue() == 0 ;
                            }
                            // if credit card fields
                            // skip checking paymenttotal for card form since it will be in a different card
                            if (window.FORM_MODE !== 'cardform') {
                                if (e.name && e.name.match(/cc_/)) {
                                    return JotForm.paymentTotal == 0;
                                }
                            }

                            // If this is a product quantity option
                            if (e.id.match(/input_[0-9]+_quantity_[0-9]+_[0-9]+/)) {

                                var cb = $(((e.id.replace('_quantity', '')).match(/input_[0-9]+_[0-9]+/))[0]);
                                var allProducts = $$('[id*="' + e.id.match(/input_[0-9]*/)[0] + '"][type="' + cb.getAttribute('type') + '"]');
                                // if this is a subproduct quantity
                                if (e.id.split("_").length === 6) {
                                    var subProductQty = $$('[id*="' + e.id.replace(/_[0-9]*_[0-9]*$/, "") + '"]');
                                }

                                if ((cb.checked && !subProductQty && (isNaN(e.value) || e.value == 0 || e.value.empty())) // if a product is selected and qty is not valid
                                    || (!allProducts.map(function (c) {
                                        return c.checked
                                    }).any()) // if there are no products selected
                                    || (cb.checked && subProductQty && !subProductQty.map(function (q) {
                                        return q.value > 0
                                    }).any()) // if this is a subproduct and none of the subproduct quantity are filled
                                ) {
                                    e.addClassName('form-validation-error');
                                    return true;
                                }
                            }
                            var innerVals = e.className.replace(/.*validate\[(.*)\].*/, '$1').split(/\s*,\s*/);

                            var _isVisible = JotForm.isVisible(e);
                            if (JotForm.doubleValidationFlag()) {
                                _isVisible = !(JotForm.isInputAlwaysHidden(e));
                            }

                            if (innerVals.include('required') && _isVisible) {
                                if (JotForm.getContainer(e).getAttribute('data-type') === 'control_inline' && ['radio','checkbox'].indexOf(e.readAttribute('type')) > -1) {
                                    var baseName = e.name;
                                    var inputType = e.readAttribute('type');
                                    if (inputType === 'checkbox') {
                                        var fieldId = e.name.replace(/(^.*\[|\].*$)/g, '').split('-')[0];
                                        var TIMESTAMP_OF_2019 = 1546300000000;
                                        var isNewIDType = isNaN(fieldId) || Number(fieldId) < TIMESTAMP_OF_2019; // old: 1546312345678-firstname / new: firstname-12
                                        baseName = isNewIDType ? e.name.substr(e.name.indexOf('-')) : e.name.substr(0, e.name.indexOf('-'));
                                    }
                                    var groupedCheckboxes = JotForm.getContainer(e).querySelectorAll('*[name*="' + baseName + '"]');
                                    var hasChecked = false;
                                    groupedCheckboxes.forEach(function (chk) {
                                        hasChecked = chk.checked || hasChecked;
                                    });
                                    return !hasChecked;
                                }
                                if (e.value.empty() || e.value.strip() == 'Please Select' || (JotForm.getContainer(input).getAttribute('data-type') === "control_address" && e.value.strip(" ").empty())) {
                                    if(window.FORM_MODE != "cardform" && e.hasClassName("form-dropdown") && e.hasAttribute("multiple")){
                                      var count = 0,emptyOption=0;
                                      for(var i=1;i<e.length;i++){
                                        if(e[i].selected){
                                          count++;
                                        }
                                        if(e[i].selected && e[i].value.empty()){
                                          emptyOption++;
                                        }
                                      }
                                      if(count == 0){  // If not selected.
                                        return true;
                                      }else if(count >= 1){  // If selected
                                        if(count > emptyOption){  // Check if any are empty
                                          return false;
                                        }else {
                                          return true;
                                        }
                                      }
                                    }
                                    if(!dontShowMessage){ // card layout -> silent validation
                                        e.addClassName('form-validation-error');
                                    }
                                    return true;
                                } else {
                                    if(JotForm.getContainer(e).hasClassName("form-datetime-validation-error")) {
                                        return JotForm.errored(input, 'Enter a valid date', dontShowMessage);
                                    }
                                }
                            }

                            if (!e.hasClassName('js-forMixed')) {
                                e.removeClassName('form-validation-error');
                            }
                            return false;
                        });
                        // skip payment field validation on edit mode (b#446215)
                        if (JotForm.payment && cont.getAttribute('data-type').match(JotForm.payment) && JotForm.isEditMode()) {
                            return JotForm.corrected(input);
                        }

                        if (checkValues.any()) {
                            // override required validation if payment item is selected and total is zero
                            if (JotForm.payment && cont.getAttribute('data-type').match(JotForm.payment)){
                                if (JotForm.isPaymentSelected() && JotForm.paymentTotal == 0) {
                                    return JotForm.corrected(input);
                                }
                            }
                            if(input.hasClassName('form-address-search') && cont.select('.jfQuestion-clean').length < 1) {
                              return JotForm.corrected(input);
                            }

                            var isErrorExists = false;
                            var errorMessage = JotForm.texts.required;

                            checkValues.map(function(isErrored, index) {
                                if(isErrored) {
                                    var input = inputs[index];
                                    if (input.hasClassName('js-forMixed')){
                                      errorMessage = JotForm.texts.incompleteFields;
                                      if (input.hasClassName('forEmail') && typeof input.validateEmailField === 'function') {
                                        errorMessage = JotForm.texts.email;
                                        input.validateEmailField();
                                      }
                                    }
                                    isErrorExists = true;
                                    return JotForm.errored(inputs[index], errorMessage, dontShowMessage);
                                }
                            });

                            return !isErrorExists;
                        }
                        // if field is "fill in blank field", wait for all fields to be checked before JotForm.corrected
                        if(!cont.querySelector('.FITB') && !checkValues.any()) {
                            JotForm.corrected(input);
                        }
                    } catch (e) {
                        // This can throw errors on internet explorer
                        JotForm.error(e);
                        return JotForm.corrected(input);
                    }
                }
                if (input.__skipField) {
                    return JotForm.corrected(input);
                }
                if (input.tagName.toLowerCase() === 'textarea' && input.hasClassName('form-custom-hint') && !input.up('div').down('.nicEdit-main') && input.value.empty()) {
                    return JotForm.errored(input, JotForm.texts.required, dontShowMessage);
                }
                if (input.hasClassName("form-textarea") && input.up('div').down('.nicEdit-main')) { //rich text area
                    var val = input.up('div').down('.nicEdit-main').innerHTML.stripTags().replace(/\s/g, '').replace(/&nbsp;/g, '');
                    if (val.empty() || (input.readAttribute("data-customhint") && input.readAttribute("data-customhint") == input.up('div').down('.nicEdit-main').innerHTML)) {
                        return JotForm.errored(input, JotForm.texts.required, dontShowMessage);
                    }
                } else if(JotForm.getContainer(input).getAttribute('data-type') === "control_datetime") {
                    if(!input.value || input.value.strip(" ").empty()) {
                        return JotForm.errored(input, JotForm.texts.required, dontShowMessage);
                    }
                    if(input.id && input.id.indexOf("lite_mode_") > -1) { //litemode
                        var seperator = input.readAttribute('seperator') || input.readAttribute('data-seperator');
                        var format = (input.readAttribute('format') || input.readAttribute('data-format')).toLowerCase();
                        if(input.value.length !== ((seperator.length*2) + format.length)){
                            return JotForm.errored(input, JotForm.texts.dateInvalid.replace("{format}", format), dontShowMessage);
                        }
                    }
                    if(JotForm.getContainer(input).hasClassName("form-datetime-validation-error")) {
                        return JotForm.errored(input, 'Enter a valid date', dontShowMessage);
                    }
                } else if ((!input.value || input.value.strip(" ").empty() || input.value.replace('<br>', '').empty() || input.value == 'Please Select')
                            && !(input.readAttribute('type') == "radio" || input.readAttribute('type') == "checkbox")
                            && !$(input.parentNode).hasClassName('form-matrix-values')
                            && JotForm.getContainer(input).getAttribute('data-type') !== "control_address") {
                    if(window.FORM_MODE != "cardform" && input.hasClassName("form-dropdown") && input.hasAttribute("multiple")){
                      var count = 0,emptyOption = 0;
                        for(var i=1;i<input.length;i++){
                          if(input[i].selected){
                            count++;
                          }
                          if(input[i].selected && input[i].value.empty()){
                            emptyOption++;
                          }
                        }
                        if(count == 0){  // If not selected
                          return JotForm.errored(input, JotForm.texts.required, dontShowMessage);
                        } else if(count >= 1){
                          if(count > emptyOption){  // Check if any are empty
                            return JotForm.corrected(input);
                          }else {
                           return JotForm.errored(input, JotForm.texts.required, dontShowMessage);
                          }
                      }
                    }

                    if (input.hasClassName('form-dropdown') && $$('.jfDropdown-search:focus').length > 0) {
                        return JotForm.corrected(input);
                    }

                    if (input.getAttribute('name') === 'cc_paypalSPB_orderID' || input.getAttribute('name') === 'cc_paypalSPB_payerID') {
                        return JotForm.corrected(input);
                    }

                    if (JotForm.newDefaultTheme && input.hasClassName('form-star-rating-star')) {
                        input.up().descendants().each(function (e) {
                            e.setStyle({
                                backgroundPosition: '-128px 0px'
                            });
                        });
                    }
                    return JotForm.errored(input, JotForm.texts.required, dontShowMessage);
                }

                vals = vals.without("required");

            } else if (!input.value) {
                // if field is not required and there is no value
                // then skip other validations
                return true;
            }

            if (!vals[0]) {
                return true;
            }

            switch (vals[0]) {
                case "Email":
                    input.value = input.value.replace(/^\s+|\s+$/g, '');
                    // before email validation convert IDN names into ASCII
                    var value = (typeof punycode !== "undefined") ? punycode.toASCII(input.value) : input.value;
                    if (!reg.email.test(value)) {
                        return JotForm.errored(input, JotForm.texts.email, dontShowMessage);
                    }
                    break;
                case "Alphabetic":
                    if (!reg.alphabetic.test(input.value)) {
                        return JotForm.errored(input, JotForm.texts.alphabetic, dontShowMessage);
                    }
                    break;
                case "Numeric":
                    if (!reg.numeric.test(input.value) && !reg.numericDotStart.test(input.value)) {
                        return JotForm.errored(input, JotForm.texts.numeric, dontShowMessage);
                    }
                    break;
                case "Alphanumeric":
                case "AlphaNumeric":
                    if (!reg.alphanumeric.test(input.value)) {
                        return JotForm.errored(input, JotForm.texts.alphanumeric, dontShowMessage);
                    }
                    break;
                case "Cyrillic":
                    if (!reg.cyrillic.test(input.value)) {
                        return JotForm.errored(input, JotForm.texts.cyrillic, dontShowMessage);

                    }
                    break;
                case "Url":
                case "URL": // We are using URL instead of Url on some components validation, I don't want to change directly Url to URL because it can be break somewhere.
                    try {
                        var checkUrlValue = input.value;
                        if (input.value.startsWith('www.')) {
                            checkUrlValue = 'https://' + input.value;
                        }
                        var url = new URL(checkUrlValue); 
                    } catch (error) {
                        return JotForm.errored(input, JotForm.texts.url, dontShowMessage);
                    }
                    break;
                case "Currency":
                    if(input.up(".form-matrix-table")) {
                        if(input.up(".form-matrix-table").select("input").collect(function(inp) { return !reg.currency.test(inp.value) }).any()) {
                            return JotForm.errored(input, JotForm.texts.currency, dontShowMessage);
                        }
                        else {
                            return JotForm.corrected(input);
                        }
                    } else {
                        if (!reg.currency.test(input.value)) {
                            return JotForm.errored(input, JotForm.texts.currency, dontShowMessage);
                        }
                    }
                    break;
                case "Fill Mask":
                    if (input.readAttribute("data-masked") == "true" && !jQuery(input).inputmask("isComplete")) {
                        if (!!input.value && input.value !== input.readAttribute('maskvalue').replace(/\#|\@/g, '_')) {
                            return JotForm.errored(input, JotForm.texts.fillMask, dontShowMessage);
                        }
                    }
                    break;

                default:
                // throw ("This validation is not valid (" + vals[0] + ")");
            }
            if (JotForm.getContainer(input).getAttribute('data-type') === "control_inline" && !deep) {
                return JotForm.corrected(input);
            }
            return true;
        };
        var validatorEvent = function (e) {
            setTimeout(function() { // to let focus event to work
              try {
                var inputContainer = $this.getContainer(input);
                var requiredFields = inputContainer.select('[class*=validate]');
                var lastRequiredField = requiredFields[requiredFields.length - 1];
                
                var isLastRequiredField = ($this.lastFocus ? ($this.getContainer($this.lastFocus) == $this.getContainer(input) && lastRequiredField == input) : false);
                var isPrefix = input && input.getAttribute('data-component') === 'prefix';

                if ($this.lastFocus
                    && (($this.lastFocus == input || $this.getContainer($this.lastFocus) != $this.getContainer(input)) || isLastRequiredField)
                    && (!isPrefix)
                    && (!(window.FORM_MODE === 'cardform' && inputContainer.dataset.type === 'control_fullname'))
                    && (!(window.FORM_MODE === 'cardform' && (inputContainer.dataset.type === 'control_checkbox' || inputContainer.dataset.type === 'control_radio' )))
                ){
                    input.validateInput();
                    var isInputErrored = input.hasClassName('form-validation-error');
                    var isEmailConfirmInput = input.id && input.id.indexOf("confirm") > -1;
                    var emailConfirmationInput = inputContainer.select('#' + input.id + '_confirm');
                    if (input.type == "email" && !isInputErrored && !isEmailConfirmInput && emailConfirmationInput.length > 0) {
                        emailConfirmationInput[0].validateInput();
                    }
                } else if (input.type == "hidden" || input.type == 'file') {
                    input.validateInput(); // always run on hidden/upload elements
                }
                // else if (inputContainer.dataset.type === 'control_address') {
                //     input.validateInput();  // always validate address fields on blur
                // } 
                else if (input.hasClassName("form-textarea") && input.up('div').down('.nicEdit-main')) {
                    input.validateInput();  // validate rich text area
                } else if (input.hasClassName("pad")) {
                    input.validateInput(); // signature
                }
              } catch (e) {
                console.log(e);
              }
            }, 10);
        };

        if (input.type === 'email') {
            var emailCharLimit = Number(input.getAttribute('maxlength'));
            if (emailCharLimit) {
                input.observe('keydown', function(e) {
                    var numOfCharacter = e.target.value.length;
                    if (numOfCharacter === emailCharLimit && e.key != 'Backspace') {
                        JotForm.errored(input, JotForm.getValidMessage(JotForm.texts.characterLimitError, emailCharLimit));
                    } else if (input.hasClassName('form-validation-error')) {
                        JotForm.corrected(input);
                    }
                })

                input.observe('paste', function(e) {
                    var pastedText = (e.clipboardData || window.clipboardData).getData('text');
                    if(pastedText.length + e.target.value.length >= emailCharLimit) {
                        JotForm.errored(input, JotForm.getValidMessage(JotForm.texts.characterLimitError, emailCharLimit));
                    } else if (input.hasClassName('form-validation-error')) {
                        JotForm.corrected(input);
                    }
                })
            }
        }

        if (input.type == 'hidden' || input.type == 'file') {
            input.observe('change', validatorEvent);
        } else if(!input.classList.contains('form-' + input.type + '-other')) {
                input.observe('blur', validatorEvent);
        }

        if (input.type == 'checkbox' || input.type == 'radio') {
            if(input.parentNode.hasClassName('jfCheckbox') || input.parentNode.hasClassName('jfRadio')){
                input.observe('change', function () {
                    input.validateInput();
                });
            }

            var vals = JotForm.getInputValidations(input);

            if (!vals.include('requireEveryRow') && !vals.include('requireEveryCell') && !input.classList.contains('form-'+input.type+'-other')){
                input.observe('change', function () {
                    input.validateInput();
                });
            }

            if (!input.classList.contains('form-'+input.type+'-other')) {
                input.observe('keyup', function (e) {
                    if (e.key !== 'Tab' && e.key !== 'Shift') {
                        input.validateInput();
                    }
                })
            }

            if (JotForm.getOptionOtherInput(input)) {
                var otherInput = JotForm.getOptionOtherInput(input);
                otherInput.observe('blur', function(e) {
                    input.validateInput();
                });
                otherInput.observe('keyup', function(e) {
                    if (e.key !== 'Tab' && e.key !== 'ArrowDown') {
                        input.validateInput();
                    }
                });
                input.observe('change',function(e){
                    if(!e.target.checked){
                        input.validateInput()
                    }
                })
            }
        }

        if (input.hasClassName("pad")) {
            // observe signature changes (https://github.com/willowsystems/jSignature#user-content-events)
            jQuery(input).bind('change', validatorEvent);
        }

        if (input.hasClassName("form-textarea") && input.up('div').down('.nicEdit-main')) { //rich text area
            input.up('div').down('.nicEdit-main').observe('blur', validatorEvent);
        }

        if (input.up('.form-spinner')) {
            var spinnerEvent = function () {
                input.validateInput();
            };
            input.up('.form-spinner').down('.form-spinner-up').observe('click', spinnerEvent);
            input.up('.form-spinner').down('.form-spinner-down').observe('click', spinnerEvent);
        }

        // skip disallowPast and limitDate validations on edit mode if the datetime input not changed
        if (JotForm.isEditMode() && JotForm.getContainer(input).getAttribute('data-type') === "control_datetime") {
            validationWhiteList.push('disallowPast', 'limitDate');
            input.observe('change', function () {
                validationWhiteList = validationWhiteList.filter(function (item) { return ['disallowPast', 'limitDate'].indexOf(item) === -1; });
                input.validateInput();
            });
        }
    },

    isFillingOffline: function () {
      var offlineFormQS = getQuerystring('offline_forms');
      return !!(offlineFormQS === 'true' || JotForm.switchedToOffline);
    },

    /**
     * Initiate facebook login operations
     * Check if user is already loggedin
     * watch login events to automatically populate fields
     * disable submits until login is completed
     */
    FBInit: function () {
        // Disable the Submit's here, form will not submit until integration is completed
        JotForm.FBNoSubmit = true;
        // Check if user is logged-in or not
        FB.getLoginStatus(function (response) {
            //Emre: facebook changed "response" properties (57298)
            if (response.authResponse) { // user is already logged in
                JotForm.FBCollectInformation(response.authResponse.userID);
            } else {    // user is not logged in. "JotForm.FBCollectInformation" is binded to facebook login event.
                FB.Event.subscribe('auth.login', function (response) {
                    JotForm.FBCollectInformation(response.authResponse.userID);
                });
            }
        });
    },
    /**
     * Request the logged-in users information from Facebook and populate hidden fields
     * Enable submit buttons and remove description
     */
    FBCollectInformation: function (id) {
        JotForm.FBNoSubmit = false; // Enable submit buttons

        // Seek through all hidden FB inputs on the form to collect Requested
        // User information fields. Merge all field data with fields ID so we can put the
        // Associated data into correct input.
        // f is for form field id in DOM, d is for facebook db column name.
        var fls = $$('.form-helper').collect(function (el) {
            var f = "";
            var d = el.readAttribute('data-info').replace("user_", ""); // Remove user_ prefix because it's not in the
            // Some permission names are different than FB users table
            // So we have to fix them
            switch (d) {
                case "can_be_anyvalue": // for demoing
                    f = "place correct one here";
                    break;
                case "sex":
                    f = "gender";
                    break;
                case "about_me":
                    f = "bio";
                    break;
                default:
                    f = d;
            }
            return [f, el.id];
        });
        // Convert fls array to key value pair for easier and faster matching
        var fields = {};
        var getPhoto = false;
        $A(fls).each(function (p) {
            if (p[0] == "pic_with_logo") {
                getPhoto = {
                    fieldID: p[1]
                };
            }
            if (p[0] !== "username") { // username is already deprecated
                fields[p[0]] = p[1];
            }
        });

        var params = $H(fields).keys().without("pic_with_logo"); // remove photo from params, we'll do a separate call for it

        var callback = function (input, user_id) {
            JotForm.bringOldFBSubmissionBack(id);
            var hidden = new Element('input', {type: 'hidden', name: 'fb_user_id'}).setValue(id);
            var form = JotForm.getForm(input);
            form.insert({top: hidden});
        };

        try {
            FB.api('/' + id, {fields: params}, function (res) {
                var input;
                $H(res).each(function (pair) {
                    if ($(fields[pair.key])) {
                        input = $(fields[pair.key]);
                        switch (pair.key) {
                            case "location":
                                input.value = pair.value.name;
                                break;
                            case "website":
                                input.value = pair.value.split(/\s+/).join(", ");
                                break;
                            default:
                                input.value = pair.value;
                        }
                    }
                });
                // get profile photo if requested
                if (getPhoto) {
                    FB.api('/' + id + '/picture', function (res) {
                        if (res.data.url && $(getPhoto.fieldID)) {
                            $(getPhoto.fieldID).value = res.data.url;
                        }
                        callback(input, id);
                    });
                } else {
                    callback(input, id);
                }
            });
        } catch (e) {
            console.error(e);
        }
        // Hide label description and display Submit buttons
        // Because user has completed the FB login operation and we have collected the info
        $$('.fb-login-buttons').invoke('show');
        $$('.fb-login-label').invoke('hide');
    },

    bringOldFBSubmissionBack: function (id) {

        var formIDField = $$('input[name="formID"]')[0];
        
        if(formIDField && formIDField.value){
            var a = new Ajax.Jsonp(JotForm.url + 'server/bring-old-fbsubmission-back', {
                parameters: {
                    formID: formIDField.value,
                    fbid: id
                },
                evalJSON: 'force',
                onComplete: function (t) {
                    var res = t.responseJSON;
                    if (res.success) {
                        JotForm.editMode(res, true, ['control_helper', 'control_fileupload']); // Don't reset fields
                    }
                }
            });
        }    
    },

    setCustomHint: function (elem, value) {
        var element = $(elem) || null,
            new_value = value.replace(/<br>/gim, "\n") || "";//replace any br to \n

        //add a class to the control to denote that is using a custom hint
        //as well as write the custom hint into the data-hint attrib
        element.addClassName('custom-hint-group').writeAttribute('data-customhint', value).writeAttribute('customhinted', "true");

        //set that the control has no content
        //check if it has a content, especially default data
        element.hasContent = ( element.value && element.value.replace(/\n/gim, "<br>") != value ) ? true : false;

        //function to show the custom placeholder
        element.showCustomPlaceHolder = function () {
            if (!this.hasContent) {
                this.placeholder = new_value;
                //exclude spellcheck onto the control
                this.writeAttribute("spellcheck", "false").addClassName('form-custom-hint');
            }
        };

        //function to hide the custom placeholder
        element.hideCustomPlaceHolder = function () {
            if (!this.hasContent) {
                this.placeholder = "";
                //exclude spellcheck onto the control
                this.removeClassName('form-custom-hint').removeAttribute('spellcheck');
            }
        };

        //add events to the control
        element.observe('focus', function (e) {
            if (!this.hasContent) {
                //exclude spellcheck onto the control
                this.removeClassName('form-custom-hint').removeAttribute('spellcheck');
            }
        }).observe('blur', function (e) {
            this.showCustomPlaceHolder();
        }).observe('keyup', function (e) {
            //this will determine if the control has a value
            this.hasContent = ( this.value.length > 0 && this.value !== new_value) ? true : false;
            if (this.hasContent && this.hasClassName('form-custom-hint')) {
                this.removeClassName('form-custom-hint').removeAttribute('spellcheck');
            }
        }).observe('paste', function (e) {
            $this = this;
            setTimeout(function () {
                $this.hasContent = ( $this.value.length > 0 && $this.value !== new_value) ? true : false;
            }, 2);
        });

        // special case for rich text
        if (element && element.type === "textarea" && element.hasAttribute('data-richtext')) {
            setTimeout(function () {
                var editor = $$('#id_' + element.id.replace('input_', '') + ' .nicEdit-main')[0] || null;
                var editorInstance = nicEditors.findEditor(element.id);
                if (editor) {
                    // set place holder color
                    if (!editorInstance.getContent()) {
                        editor.setStyle({'color': '#babbc0'});
                        if (JotForm.newDefaultTheme) {
                            editorInstance.setContent(new_value);
                        }
                    }
                    editor.observe('blur', function () {
                        if (!editorInstance.getContent() || editorInstance.getContent() === "<br>") {
                            editor.setStyle({'color': '#babbc0'});
                            editorInstance.setContent(new_value);
                            element.writeAttribute("spellcheck", "false").addClassName('form-custom-hint');
                        }
                    });
                    editor.observe('focus', function () {
                        editor.setStyle({'color': ''});
                        element.removeClassName('form-custom-hint').removeAttribute('spellcheck');
                        if (editorInstance.getContent() === new_value) {
                            editorInstance.setContent('');
                        }
                        ;
                    });
                }
            }, 1000);
        }

        //catch the submission of a form, and remove all custom placeholder
        //since we are using the said trick, this needs to be done
        element.up('form.jotform-form').observe('submit', function () {
            this.select('.custom-hint-group').each(function (elem) {
                elem.hideCustomPlaceHolder();
            });
        });

        //initiate the custom placeholders
        element.showCustomPlaceHolder();

    },

    /*
     ** Return true if field has any kind of content - user inputted or otherwise and does not have error
     */
    fieldHasContent: function (id) {

        if ($('id_' + id).hasClassName('form-line-error')) return false;
        if ($('id_' + id).select('.form-custom-hint').length > 0) return false;

        var type = JotForm.getInputType(id);
        switch (type) {
            case "address":
            case "combined":
                return $$('#id_' + id + ' input').collect(function (e) {
                    return e.value;
                }).any();
            case "number":
                return $$('#id_' + id + ' input').collect(function (e) {
                    return e.value.length > 0;
                }).any();
            case "birthdate":
                return JotForm.getBirthDate(id);
            case "datetime":
                var date = JotForm.getDateValue(id);
                return !(date == "T00:00" || date == '');
            case "appointment":
                return $('input_' + id + '_date') && $('input_' + id + '_date').value;
            case "time":
                return JotForm.get24HourTime(id);
            case "checkbox":
            case "radio":
                return $$('#id_' + id + ' input').collect(function (e) {
                    return e.checked;
                }).any();
            case "select":
                return $$('#id_' + id + ' select').collect(function (e) {
                    return e.value;
                }).any();
            case "grading":
                return $$('input[id^=input_' + id + '_]').collect(function (e) {
                    return e.value;
                }).any();
            case "signature":
                return jQuery("#id_" + id).find(".pad").jSignature('getData', 'base30')[1].length > 0;
            case "slider":
                return $('input_' + id).value > 0;
            case "file":
                if ($$('#id_' + id + ' input')[0].readAttribute('multiple') === 'multiple' || $$('#id_' + id + ' input')[0].readAttribute('multiple') === '') {
                    var fileList = $('id_' + id).select('.qq-upload-list li');

                    if (fileList.length > 0) {
                        var status = true;
                        fileList.each(function(elem) {
                            if (elem.getAttribute('class') && elem.getAttribute('class').indexOf('fail') > 0) {
                                status = false;
                            }
                        });
                        return status;
                    }
                    return true;
                } else {
                    return $('input_' + id).value;
                }
                break;
            default:
                if ($('input_' + id) && $('input_' + id).value) {
                    return $('input_' + id).value;
                } else {
                    return false;
                }

        }
    },

    /*
     ** Show progress bar on screen and set up listeners
     */
    setupProgressBar: function () {
        JotForm.progressBar = new ProgressBar("progressBar", {'height': '20px', 'width': '95%'});
        var countFields = ['select', 'radio', 'checkbox', 'file', 'combined', 'email', 'address', 'combined', 'datetime', 'time',
            'birthdate', 'number', 'radio', 'number', 'radio', 'autocomplete', 'radio', 'text', 'textarea', 'signature', 'div', 'slider'];
        var totalFields = 0;
        var completedFields = 0;

        var updateProgress = function () {
            completedFields = 0;
            $$('.form-line').each(function (el) {
                var id = el.id.split("_")[1];
                var type = JotForm.getInputType(id);
                if ($A(countFields).include(type)) {
                    if (JotForm.fieldHasContent(id)) {
                        completedFields++;
                    }
                }
            });

            var percentage = parseInt(100 / totalFields * completedFields);
            if (isNaN(percentage)) percentage = 0;
            JotForm.progressBar.setPercent(percentage);
            $('progressPercentage').update(percentage + '% ');
            $('progressCompleted').update(completedFields);
            if (percentage == 100) {
                $('progressSubmissionReminder').show();
            } else {
                $('progressSubmissionReminder').hide();
            }
        };

        var setListener = function (el, ev) {
            $(el).observe(ev, function () {
                updateProgress();
            });
        };

        $$('.form-line').each(function (el) {
            var id = el.id.split("_")[1];
            var type = JotForm.getInputType(id);
            if (!countFields.include(type)) {
                return;
            }

            totalFields++;
            switch (type) {
                case 'radio':
                case 'checkbox':
                    setListener($('id_' + id), 'click');
                    break;

                case 'select':
                case 'file':
                    setListener($('id_' + id), 'change');
                    break;

                case 'datetime':
                    setListener($('id_' + id), 'date:changed');
                    $$("#id_" + id + ' select').each(function (el) {
                        setListener($(el), 'change');
                    });
                    break;

                case 'time':
                case 'birthdate':
                    $$("#id_" + id + ' select').each(function (el) {
                        setListener($(el), 'change');
                    });
                    break;

                case 'address':
                    setListener($('id_' + id), 'keyup');
                    break;

                case 'number':
                    setListener($('id_' + id), 'keyup');
                    setListener($('id_' + id), 'click');
                    break;

                case 'signature':
                    setListener($('id_' + id), 'click');
                    break;

                default:
                    setListener($('id_' + id), 'keyup');
                    break;
            }
        });
        $('progressTotal').update(totalFields);

        updateProgress();
    },

    setupRichArea: function(qid) {
        if(!(!Prototype.Browser.IE9 && !Prototype.Browser.IE10 && Prototype.Browser.IE)) {
            var field = 'id_' + qid;
            // check the visibility of the rich textarea (not its parent nodes) to return the initial state later
            var isFieldHidden = $(field).hasClassName('always-hidden') || $(field).style.display === 'none' || $(field).style.display === 'hidden';
            // hidden rich textarea is made visible for setup
            if (!JotForm.isVisible(field)) {
                $(field).up('.form-section') && $(field).up('.form-section').show();
                JotForm.showField(qid);
            }
            new nicEditor({iconsPath : location.protocol + '//www.jotform.com/images/nicEditorIcons.gif?v2'}).panelInstance('input_' + qid);
            JotForm.updateAreaFromRich(field);
            // hide again the initially hidden rich textarea after setup
            if (isFieldHidden) {
                this.hideField(qid);
            }
        }
    },

    updateAreaFromRich: function (field) {
        try {
            var rich = $(field).down('.nicEdit-main');
            var txtarea = $(field).down('textarea');
            if (rich && txtarea) {
                rich.observe('keyup', function () {
                    txtarea.value = rich.innerHTML;
                    if (txtarea.triggerEvent) txtarea.triggerEvent('keyup');
                });
            }
        } catch (e) {
            console.error(e);
        }
    },


    /**
     * Responsible on handling AutoFill feature,
     * this will also help to ensure that it will not conflict
     * on customHint trick if any
     */
    autoFillInitialize: function (params) {
        //if edit mode do not init
        if (this.isEditMode()) {
            return;
        }

        //initialize autoFill plugin for jquery
        var formID = $$('input[name="formID"]')[0].value;
        params.name = 'form_' + formID;
        var _form = 'form#' + formID;
        var form = $$(_form)[0];
        var excludeFields = ["formID", "simple_spc", "temp_upload_folder"];

        //write an attribute to the form denoting that it uses a autoFill
        form.writeAttribute('data-autofill', 'true');

        /**
         * Will handle conflicts of the autoFill
         * especially custom hints, grading total computation
         */
        var _conflicts = {
            _handleCustomHint: function (data) {
                //get the data that was generated in the autoFill plugin
                var pfields = data.protectedfields;
                var pfieldsdata = data.protectedfieldsdata;
                var inc = 0;

                //loop through the stored data
                $H(pfieldsdata).each(function (_fielddata) {

                    var _field = pfields[inc];
                    var field = $(_field);
                    var fieldata = _fielddata[1];

                    //get the value on where the data is restored
                    var value = ( fieldata.newinputvalue ) ? fieldata.newinputvalue.replace(/\n/gim, "<br>") : false;

                    if (field.hasAttribute('data-customhint') || field.hasAttribute('customhinted')) {
                        //get the value of the element
                        var hint = field.readAttribute('data-customhint');

                        // alert('customhinted:' + hint " | " + value);
                        if (hint && value && hint != value) {
                            field.removeClassName('form-custom-hint');
                            field.hasContent = true;
                        }
                    }
                    else if (field.hasAttribute('hinted') || field.hinted) //this is for IE relateds
                    {
                        //get the old input value and compare it to the newvalue of the input
                        //if not match turn the color of the hint to black
                        //seems to be a bug when using the .hint() function in IE
                        var hint = ( fieldata.oldinputvalue ) ? fieldata.oldinputvalue.replace(/\n/gim, "<br>") : false;

                        // alert('hinted:' + hint " | " + value);
                        if (hint && value && hint != value) {
                            field.setStyle({color: "#000"});
                        }
                    }

                    inc++;
                });
            },
            /**
             * Will handle the total of grading inputs if set
             */
            _handleGradingTotal: function (data) {
                if ($$('.form-grading-input').length > 0 && $("grade_total_" + id)) {
                    var total = 0, id = null;
                    $$('.form-grading-input').each(function (input) {
                        id = input.id.replace(/input_(\d+)_\d+/, "$1"),
                            total += parseFloat(input.value) || 0;
                    });

                    $("grade_point_" + id).innerHTML = total;
                }
            },
            /*
             * Move text from textfield to rich text div
             */
            _handleRichText: function (data) {
                $$('.nicEdit-main').each(function (richArea) {
                    var txtarea = richArea.up('.form-line').down('textarea');
                    if (txtarea) {
                        richArea.innerHTML = txtarea.value;
                    }
                });
            },
            _handleStarRating: function (data) {
                $$(".form-star-rating").each(function (rating) {
                  if(rating.setRating === 'function') rating.setRating(rating.down("input").value);
                });
            },
            _handlePaymentTotal: function() {
                if ($('payment_total')) {
                    JotForm.totalCounter(JotForm.prices);
                }
            }
        };

        // exclude subproducts to prevent too much lag (#927734)
        if (JotForm.payment && $$('.form-product-item > input.form-product-has-subproducts').length > 0) {
            $$('.form-line[data-type="control_authnet"] select, .form-line[data-type="control_authnet"] input').each(function(input) {
                if (input.id) {
                    excludeFields.push(input.id);
                }
            });
        }

        var timeout = Number(params.timeout) > 0 ? params.timeout : 4;
        var fieldAmount = $$('input, select, textarea').length;
        // increase timeout when there are a lot of fields
        if (fieldAmount > 200) {
            timeout = Math.floor(fieldAmount / 10);
        }

        //initiate jquery autoFill
      var autoFillParams = {
        timeout: timeout,
        sessionID: JotForm.sessionID,
        excludeFields: excludeFields,
        ttl: params.ttl,
        allowBindOnChange: (params.bindChange && params.bindChange == 'on') ? true : false,
        onBeforeSave: function () {
        },
        onSave: function () {
        },
        onRelease: function () {
        },
        onBeforeRestore: function () {
        },
        onRestore: function (data) {
          //check for custom hints
          var restoredDatas = this.restoredData[0];
          // console.log( restoredDatas );
          if (restoredDatas) {
            //resolve conflicts in customHint if any
            _conflicts._handleCustomHint(restoredDatas);

            //resolve grading total computation if any
            _conflicts._handleGradingTotal(restoredDatas);

            _conflicts._handleRichText(restoredDatas);

            _conflicts._handleStarRating(restoredDatas);

            _conflicts._handlePaymentTotal(restoredDatas);
          }
        }
      };
        if(window.autoFill ) {
          autoFill([form],autoFillParams);
        }
        else {
          jQuery(_form).autoFill(autoFillParams);
        }

        this.runAllConditions();

        this.autoFillDeployed = true;

    },

    runAllConditions: function () {
        $H(JotForm.fieldConditions).each(function (pair) {
            var field = pair.key;
            var event = pair.value.event;
            if (!$(field)) {
                return;
            }
            if (["autofill", "number", "autocomplete"].include(event)) event = "keyup";
            $(field).run(event);
        });
        if (JotForm.isEditMode()) {
            JotForm.ignoreInsertionCondition = null;
        }
    },

  hasQuestion: function (questions, questionType) {
    var questions_by_name = [];

    function transpose(a) {
      return a[0].map(function (val, c) {
        return a.map(function (r) {
          return r[c];
        });
      });
    }

    var field = false;

    if (questions.length > 0) {
      questions.some(function(question) {
        if (question) {
          if (question.type === questionType) {
            return field = question;
          }
        }
      });
    }

    return field;
  },

  handleSSOPrefill: function () {
    if (this.isEditMode() || getQuerystring('jf_createPrefill') == '1') {
      return;
    }

    if (JotForm.SSOPrefillData) {
      JotForm.SSOPrefillData.each(function(question) {
        if (question && question.value) {
          var qid = question.qid;
          var value = question.value;

          switch (question.type) {
            case "control_fullname":
              var names = question.value;
              Object.keys(names).forEach(function(input) {
                if ($(input + "_" + qid)) {
                  $(input + "_" + qid).value = names[input];
                }
              });
            break;
            case "control_phone":
              var full = $("input_" + qid + "_full");
              if (full) {
                full.value = value;
              } else {
                var fields = $A($$('input[id^=input_' + qid + '_]'));
                var fieldL = fields.length - 1;
                var parts = value.replace(/\D+/g, ' ').trim().split(' ');

                if (parts.length === 1) {
                  // split raw phone numbers as AAA-XXX-XXXX or CCC-AAA-XXX-XXXX format for now
                  var pattern = /(\d{3})(\d{3})(\d{4})/;
                  var replacement = '$1 $2 $3';
                  var phone = parts[0];
                  if (phone.length > 10) {
                    pattern = new RegExp('(\\d{' + (phone.length - 10) + '})(\\d{3})(\\d{3})(\\d{4})');
                    replacement = '$1 $2 $3 $4';
                  }
                  parts = phone.replace(pattern, replacement).split(' ');
                }

                var remaining = parts.slice(fieldL).join(' ');
                var phoneNumberParts = parts.slice(0, fieldL);
                phoneNumberParts.push(remaining);

                phoneNumberParts = phoneNumberParts.filter(function(item) { return item !== ''; });

                if (phoneNumberParts.length < fields.length) {
                  phoneNumberParts.reverse().forEach(function(fvalue, i) {
                    fields[fieldL - i].value = fvalue;
                  });
                } else {
                  fields.forEach(function(field, i) {
                    field.value = phoneNumberParts[i];
                  });
                }
              }
            break;
            default:
              if ($('input_' + qid)) {
                $('input_' + qid).value = value;
              }
            break;
          }
          // simulate the keyup event to fill the fields inside of curly brackets
          var questionElement = document.getElementById('id_' + question.qid);
          if (questionElement) {
              document.getElementById('id_' + question.qid).dispatchEvent(new Event('keyup'));
          }
        }
      });
        if (window.FORM_MODE === 'cardform') {
            var cards = window.CardForm.cards;
            window.CardForm.checkCardsIfFilled(cards);
        }
    }
  },

  paymentExtrasOnTheFly: function (questions) {
    var $this = this;
    var questions_by_name = [];

    function transpose(a) {
      return a[0].map(function (val, c) {
        return a.map(function (r) {
          return r[c];
        });
      });
    }

    if (questions.length > 0) {
      questions.each(function(question) {
        if (question) {
          switch (question.type) {
            case 'control_chargify':
              var email = $this.hasQuestion(questions, 'control_email');
              if (email !== false) {

                // Email field has been found when form has chargify, lets fill chargify's email field with the email value on current inputs blur event
                var emails = $$('input[type="email"]');

                emails[0].observe('blur', function (e) {
                  if ( e.target.value ) {
                    $$('.cc_email')[0].value = e.target.value;
                  };
                });
              }
              break;
          case 'control_stripe':
              var stripeFormID = $$('input[name="formID"]')[0].value;
              if (typeof JotForm.tempStripeCEForms !== 'undefined' && JotForm.tempStripeCEForms.includes(stripeFormID)) {
                  break;
              }
              var email = $this.hasQuestion(questions, 'control_email');
              if (email !== false) {
                  var emails = $$('input[type="email"]');
                  if (emails.length <= 0) { break; }
                  emails[0].observe('blur', function (e) {
                      if (e.target.value) {
                          if (JotForm.stripe && typeof JotForm.stripe !== undefined) {
                              JotForm.stripe.updateElementEmail(e.target.value);
                          }
                      };
                  });
              }
              break;
            case 'control_mollie':
                var isEmailFieldExist = $this.hasQuestion(questions, 'control_email');
                var isAddressFieldExist = $this.hasQuestion(questions, 'control_address');
                var mollieField = $$('.form-line[data-type="control_mollie"]')[0];

                // **** For email fields ****
                if (isEmailFieldExist !== false) {
                    var emailFields = $$('input[type="email"]');
                    var latestEmailValues = {}; // We will keep the latest values of fields.

                    emailFields[0].observe('blur', function (e) {
                        if (!mollieField) { mollieField = $$('.form-line[data-type="control_mollie"]')[0]; }
                        if (!mollieField) { return; }

                        if (typeof e.target.value === 'string') {
                            var mollieEmailFields = mollieField.select('.cc_email');

                            if (mollieEmailFields.length > 0) {
                                mollieEmailFields.each(function(item) {
                                    if (latestEmailValues[e.target.id] === item.value || item.value.length === 0) {
                                        item.value = e.target.value;
                                    }
                                });
                            }

                            latestEmailValues[e.target.id] = e.target.value;
                        };
                    });
                }

                // **** For address fields ****
                if (isAddressFieldExist !== false) {
                    var addressFields = $$('.form-line[data-type="control_address"]');
                    var inputs = $(addressFields[0]).select('input, select');
                    var latestAddressValues = {}; // We will keep the latest values of fields.

                    inputs.each(function(inp) {
                        var eventName = inp.nodeName === 'INPUT' ? 'blur' : 'change';

                        inp.observe(eventName, function(e) {
                            if (typeof e.target.value !== 'string') { return; }
                            var component = e.target.getAttribute('data-component');

                            var mollieComponent = '';
                            if (component === 'address_line_1') {
                                mollieComponent = 'addr_line1';
                            } else if (component === 'address_line_2') {
                                mollieComponent = 'addr_line2';
                            } else if (component === 'zip') {
                                mollieComponent = 'postal';
                            } else {
                                mollieComponent = component;
                            }

                            if (mollieComponent) {
                                if (!mollieField) { mollieField = $$('.form-line[data-type="control_mollie"]')[0]; }
                                if (!mollieField) { return; }
                                var addrFields = mollieField.select('[data-component="' + mollieComponent +'"]');
                                if (addrFields.length > 0) {
                                    addrFields.each(function(item) {
                                        if (latestAddressValues[e.target.id] === item.value || item.value.length === 0) {
                                            item.value = e.target.value;
                                        }
                                    });
                                }
                            }

                            latestAddressValues[e.target.id] = e.target.value;
                        });
                    });
                }
              break;
            default:
          }

        }
      });
    }
  },

  /**
     * Set masking for an specific question question
     * supports input type='text' only
     */
    setQuestionMasking: function (toSelector, type, maskValue, unmask) {
        if (!maskValue && (maskValue === null || typeof maskValue === 'undefined') && (!unmask || typeof unmask === 'undefined')) return;
        maskValue = maskValue.replace(/&#39;/g, "'");
        var unmask = ( unmask ) ? unmask : false;

        // prevent stacking of backslashes when method is called multiple times e.g., on hide/show conditions (b#1669380)
        maskValue = maskValue.replace(/\\/g, '');
        var placeholder = maskValue.replace(/#/g, '_').replace(/\[|\]/g, '');
        // escape default definitions '9' (numeric) and 'a' (alphabetical)
        maskValue = maskValue.replace(/9/g, '\\9').replace(/a/g, '\\a').replace(/A/g, '\\A');

        //extend the definitions to accept other characters
        var definitions = {
            "#": {
                validator: "[0-9]"
            }
        }

        //include more mask options for specific questions
        if (type === "textMasking") {
            Object.extend(definitions, {
                "@": {
                    validator: "[A-Za-z\u0410-\u044F\u0401\u0451\u4E00-\u9FFF]",
                },
                "*": {
                    validator: "[0-9A-Za-z\u0410-\u044F\u0401\u0451\u4E00-\u9FFF]"
                }
            });
            placeholder = placeholder.replace(/\*|@/g, '_');
        }

        try {
            if (window.buildermode && buildermode === 'card') {
                return;
            }

            if (toSelector.hasOwnProperty('indexOf') && toSelector.indexOf('|') > -1) {
                toSelector = toSelector.split('|')[0] + ' [id*=' + toSelector.split('|')[1] + ']';
                if (toSelector.indexOf('#input_') > -1) {
                    toSelector = toSelector.replace('input_', 'id_');
                }
            }

            var jqObject = jQuery(toSelector);

            //initiate masking for phones.
            if (unmask && jqObject) {
                jqObject.inputmask('remove')
                    .off('blur')
                    .attr('placeholder', '');
            }
            else if (jqObject) {
              setTimeout(function(){
                jqObject.inputmask('remove');
                jqObject.inputmask(maskValue, {
                  placeholder: "_",
                  autoclear: false,
                  definitions: definitions,
                  inputEventOnly: true
                })
                  // trigger change event on input
                  .on('input', function(e) { e.target.triggerEvent('change'); })
                  .attr('maskValue', maskValue)

                if (jqObject.val()) {
                    var caretPos = jqObject.val().indexOf('_');
                    if (jqObject && jqObject.caret) {
                        jqObject.caret(caretPos);
                    }
                }
              },0)       
            }
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Helper that will handle input masking
     * this depends on the users masking format
     */
    setInputTextMasking: function (elem, maskValue, unmask) {
        setTimeout(function () { //wait for prepopulations to be run before setting the mask
            JotForm.setQuestionMasking("#" + elem, 'textMasking', maskValue, unmask);
        }, 10);
    },

    /**
     * Will handle the Phone Validation
     * this depends on the users masking format
     */
    setPhoneMaskingValidator: function (elem, maskValue, unmask) {
        setTimeout(function () { //wait for prepopulations to be run before setting the mask
            JotForm.setQuestionMasking("#" + elem, 'phoneMasking', maskValue, unmask);
        }, 10);
    },

    /**
     * will load external script file
     * currently it is used to import editMode function
     */
    loadScript: function () {

        var toLoad = arguments.length;
        var callback;
        var hasCallback = arguments[toLoad - 1] instanceof Function;
        var script;

        function onloaded() {
            toLoad--;
            if (!toLoad) {
                callback();
            }
        }

        if (hasCallback) {
            toLoad--;
            callback = arguments[arguments.length - 1];
        } else {
            callback = function () {
            }; // noop
        }
        for (var i = 0; i < toLoad; i++) {
            script = document.createElement('script');
            script.src = arguments[i];
            //script.onload = script.onerror = onloaded; //hidden field (uploadedBefore) loading twice #417671

            if (typeof(script.addEventListener) != 'undefined') {
                script.addEventListener('load', callback, false);
            } else {
                //for IE8
                var handleScriptStateChangeIE8 = function () {
                    if (script.readyState == 'loaded') {
                        callback();
                    }
                }
                script.attachEvent('onreadystatechange', handleScriptStateChangeIE8);
            }

            (
                document.head ||
                document.getElementsByTagName('head')[0]
            ).appendChild(script);
        }
    },
    /**
     * will load external stylesheet file
     */
    loadStyleSheet: function (url, onLoad) {
        var link = document.createElement('link');
        link.setAttribute('id', 'form-css');
        link.setAttribute('type', 'text/css');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', url);
        (document.head || document.getElementsByTagName('head')[0]).appendChild(link);

        if (link.readyState) { //IE
            link.onreadystatechange = function() {
                if (link.readyState == "loaded" || link.readyState == "complete") {
                    link.onreadystatechange = null;
                    onLoad && onLoad();
                }
            };
        } else {
            //if safari and not chrome, fire onload instantly - chrome has a safari string on userAgent
            //this is a bug fix on safari browsers, having a problem on onload of an element
            if (navigator.userAgent.match(/safari/i) && !navigator.userAgent.match(/chrome/i)) {
                onLoad && onLoad();
            } else {
                link.onload = function() {
                    onLoad && onLoad();
                };
            }
        }
    },
    /**
     * Checks if a certain stylesheet
     * already loaded
     */
    isStyleSheetLoaded: function(stlesheetName) {
        var found = false;
        var styleSheets = document.styleSheets;
        for (var s in styleSheets) {
            var styleSheet = styleSheets[s];
            if (styleSheet.href && !!~styleSheet.href.indexOf(stlesheetName)) {
                found = true;
                break;
            }
        }
        return found;
    },

    track: function (w, d) {
        var self = this;

        if($$('#event_tracking_image').length > 0) {
            return;
        }
        // var JotFormTrackerObject = window['JotFormTrackerObject'];
        // var _buildSourceOptions = JotFormTrackerObject['options'];
        var _form = $$('.jotform-form')[0];
        var _formID = _form.getAttribute('id');
        var _referer;
        var _location;

        try {
            _referer = encodeURIComponent(document.referrer);
        } catch (e) {
            _referer = 'undefined'
        }

        try {
            _location = encodeURIComponent(window.top.location.href);
        } catch (e) {
            _location = 'undefined'
        }

        var _screenHeight = window.screen.height;
        var _screenWidth = window.screen.width;

        if (!_formID) {
            return false;
        }
        if (_form) {
            if (location && location.href && location.href.indexOf('&nofs') == -1 && location.href.indexOf('&sid') == -1) {
                var uuid = generateUUID();
                insertAfter(createImageEl(uuid), _form);
                createEventID(uuid);
            }
        }
        function insertAfter(newNode, referenceNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        }

        function createImageEl(uuid) {
            var base = 'https://events.jotform.com/';
            if (typeof JotForm.enterprise !== "undefined" && JotForm.enterprise) {
                base = 'https://' + JotForm.enterprise + '/events/';
            }
            if (self.jsForm) {
                base = base + 'jsform/';
            } else {
                base = base + 'form/';
            }
            var src = base + _formID + '/';
            var resolutionStr;
            if (_screenHeight && _screenWidth) {
                resolutionStr = _screenWidth + 'x' + _screenHeight;
            }
            src = src + '?ref=' + encodeURIComponent(_referer);
            if (resolutionStr) {
                src = src + '&res=' + encodeURIComponent(resolutionStr);
            }
            if (uuid) {
                src = src + '&eventID=' + encodeURIComponent(uuid);
            }

            src = src + '&loc=' + encodeURIComponent(_location);

            var viewBrandingFooter = JotForm && JotForm.showJotFormPowered && JotForm.showJotFormPowered === 'new_footer';
            if (viewBrandingFooter) {
                src += '&seenBrandingFooter=1';
            }

            var img = new Image();
            img.id = "event_tracking_image";
            img.ariaHidden = "true";
            img.src = src;
            img.alt = "jftr";
            img.style.display = 'none';
            img.width = 1;
            img.height = 1;
            return img;
        }

        function createEventID(uuid) {
            var inputEl = document.createElement('input');
            inputEl.setAttribute('type', 'hidden');
            inputEl.setAttribute('name', 'event_id');
            inputEl.value = uuid;
            _form.appendChild(inputEl);
        }

        function generateUUID() {
            return 1 * new Date() + '_' + _formID + '_' + randomString(7);
        }

        function randomString(len) {
            charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var randomString = '';
            for (var i = 0; i < len; i++) {
                var randomPoz = Math.floor(Math.random() * charSet.length);
                randomString += charSet.substring(randomPoz, randomPoz + 1);
            }
            return randomString;
        }
    },
    /**
     * Let us do some actions or process when a form
     * embedded via a 3rd party applications
     */
    additionalActionsFormEmbedded: function() {
        var self = this;
        var integration = getQuerystring('embeddedvia');
        if (integration) {
            // Disable weebly fix on cardforms
            if (integration === 'weebly' && !(window.FORM_MODE && window.FORM_MODE == 'cardform')) {
                // make all forms responsive for weebly integration
                if (!self.isStyleSheetLoaded('mobile.responsive.min.css')) {
                    var styleSheetUrl = 'https://widgets.jotform.io/mobileResponsive/mobile.responsive.min.css';
                    self.loadStyleSheet(styleSheetUrl, function() {
                        self.handleIFrameHeight();
                    });
                }
            }
        }
    },
    changeSubmitURL: function(submitURL) {
      if (submitURL.length > 0) {
        for (var i = this.forms.length - 1; i >= 0; i--) {
          var form = this.forms[i];
          form.action = form.action.replace(/\/\/submit\..*?\//, '//' + submitURL + '/');
        };
      }
    },
    handleChinaCensorship: function() {
      this.getClientCountry(function(location) {
        var country = location.country;
        if ((country.length > 0 && country.toLowerCase() === 'cn')) {
          this.changeSubmitURL('china.jotfor.ms');
        }
      }.bind(this));
    },
    handlePreview: function(filled) {
        $$('body')[0].setStyle({overflowX: 'hidden'});
        $A(JotForm.forms).each(function (form) {
            var previewInput = document.createElement('input');
            previewInput.setAttribute('type', 'hidden');
            previewInput.setAttribute('name', 'preview');
            previewInput.value = 'true';
            form.appendChild(previewInput);

            if (filled === true) {
                var script = document.createElement('script');
                script.setAttribute('type', 'text/javascript');
                script.setAttribute('src', '//cdn.jotfor.ms/js/form-tester.js?rev=' + new Date().getTime());
                form.appendChild(script);
            }
        });
    },
    getClientCountry: function(callback) {
      new Ajax.Request('//china.jotfor.ms/opt/geo.ip.php', {
        evalJSON: 'force',
        onComplete: function(res) {
          if (res.status === 200) {
            callback(res.responseJSON);
          } else {
            callback({ country: '' });
          }
        }
      });
    },

    updateMatrixInputs: function(id, target) {
        var matrix = document.getElementById("matrix_" + id);
        var dataType = matrix.getAttribute('data-type');
        var desktopWrapper = $(matrix).select('.forDesktop')[0];
        var mobileWrapper = $(matrix).select('.forMobile')[0];

        if (target === 'mobile') {
            var hiddenMatrix = mobileWrapper;
            var visibleMatrix = desktopWrapper;
        } else  {
            var hiddenMatrix = desktopWrapper;
            var visibleMatrix = mobileWrapper
        }

        var hiddenWrappers = $(hiddenMatrix).select('.form-matrix-values');
        hiddenWrappers.each(function(i) {
            $(i).removeClassName('form-matrix-values');
            $(i).addClassName('form-matrix-values-disabled');
        });

        var hiddenInputs = $(hiddenMatrix).select('input, select, label');
        hiddenInputs.each(function(i) {
          var idAttr = i.id;
          if (idAttr.indexOf('disabled') < 0) {
            i.id += '_disabled';
            i.setAttribute('data-name', i.getAttribute('name'));
            i.removeAttribute('name');
          }
        });

        var mobileInputs = $(mobileWrapper).select('input, select, label');
        mobileInputs.each(function(i) {
          var idAttr = i.id;
          if (idAttr && idAttr.indexOf('cancelled') !== -1) {
            i.id = i.id.replace('_cancelled', '');
          }

          var forAttr = i.getAttribute('for');
          if (forAttr && forAttr.indexOf('cancelled') !== -1) {
            i.setAttribute('for', forAttr.replace('_cancelled', ''));
          }
        });

        var visibleWrapper = $(visibleMatrix).select('.form-matrix-values-disabled');
        visibleWrapper.each(function(i) {
            $(i).removeClassName('form-matrix-values-disabled');
            $(i).addClassName('form-matrix-values');
        });

        var visibleInputs = $(visibleMatrix).select('input');
        visibleInputs.each(function(i) {
            i.id = i.id.replace('_disabled', '');
            if (i.getAttribute('data-name')) {
                i.setAttribute('name', i.getAttribute('data-name'));
                i.removeAttribute('data-name');
            }
        });


        $(hiddenMatrix).addClassName('hidden-matrix');
        $(visibleMatrix).removeClassName('hidden-matrix');
    },

    setMatrixLayout: function(id, passive, mobileActiveQuestionOrder) {

        //check if the element is visible
        //if it is in Form Builder, setMatrixLayout function will continue.
        //if it is in Publish, setMatrixLayout function won't continue for hidden questions. 
        //When the question will be visible, setMatrixLayout function will continue.

        if(!passive && !JotForm.isVisible('id_' + id)){  
            return;
        }
               
        var matrix = document.getElementById("matrix_" + id);
        if (!$(matrix)) return;
        var desktopVersion = $(matrix).select('.forDesktop')[0];
        var mobileVersion = $(matrix).select('.forMobile')[0];
        var dataType = matrix.getAttribute('data-type');

        if (!passive) {
            if ((desktopVersion && desktopVersion.getStyle('display') !== 'none') && mobileVersion) {
                this.updateMatrixInputs(id, 'mobile');
                // mobileVersion.remove();
            } else if((mobileVersion && mobileVersion.getStyle('display') !== 'none') && desktopVersion) {
                this.updateMatrixInputs(id, 'desktop');
                // desktopVersion.remove();
            }
        }
        // Calculates new input types height
        if(['Slider', 'Emoji Slider', 'Yes No'].indexOf(dataType) > -1) {
            if (desktopVersion) {
                var matrixLabelListItems = desktopVersion.getElementsByClassName('jfMatrixLabelList-item');
                var matrixInputListItems = desktopVersion.getElementsByClassName('jfMatrixInputList-item');
                if (Array.prototype.forEach) { // i.e 8 users :(
                    Array.prototype.forEach.call(matrixLabelListItems, function (matrixLabel, index) {
                        // lets give the height of label to input  line
                        var matrixInput = matrixInputListItems[index];
                        if (matrixInput && matrixLabel) {
                            if (dataType === 'Yes No') {
                                matrixLabel.style.width = 'calc(100% - ' + matrixInput.offsetWidth + 'px)';
                                matrixInput.style.width = '';
                            }
                            matrixInput.style.height = matrixLabel.offsetHeight + 'px';
                        }
                    });
                }
            }
        }

        var hasMobile = $(matrix).select('.forMobile').length > 0;
        var isSlider = ['Slider', 'Emoji Slider'].indexOf(dataType) > -1;
        if (isSlider && hasMobile) {
            var mobileSlider = $(matrix).select('.slider')[0];
            var mobileNext = $(matrix).select('.jfMobileMatrix-nextRow')[0];
            var mobilePrev = $(matrix).select('.jfMobileMatrix-prevRow')[0];
            var rowList = $(matrix).select('.jfMobileMatrix-row');
            var bulletList = $(matrix).select('.jfMobileMatrix-columnDot');
            var rowLength = rowList.length;
            var currentRow = $(matrix).select('.jfMobileMatrix-row.isSelected')[0];
            var currIndex = parseInt(currentRow.readAttribute('data-order'), 10);
            var newIndex = false;
            var newEl = false;

            if (bulletList[currIndex]) {
              bulletList[currIndex].addClassName('isActive');
            }

            var mobileItems = mobileSlider.querySelectorAll('.jfMatrixInputList-item');

            $(matrix).select('.jfMobileMatrix-prevRow')[0].observe('click', function() {
                handleMobilePrevClick();
            });
            $(matrix).select('.jfMobileMatrix-nextRow')[0].observe('click', function() {
                handleMobileNextClick();
            });

            var setActiveSlider = function() {
                mobileItems[newIndex].removeClassName('isHidden');
                mobileItems[currIndex].addClassName('isHidden');

                bulletList[currIndex].removeClassName('isActive');
                bulletList[newIndex].addClassName('isActive');

                currentRow = newEl;
                currIndex = newIndex;
            };

            var handleMobileNextClick = function () {
                newIndex = currIndex + 1;
                if (newIndex !== rowLength) {
                    newEl = rowList[newIndex];
                    newEl.addClassName('isSelected');
                    currentRow.removeClassName('isSelected');
                    if (newIndex > 0) {
                      mobilePrev.disabled = false;
                    }
                    if (newIndex + 1 === rowLength) { mobileNext.disabled = true; }

                    setActiveSlider();
                }
            };

            var handleMobilePrevClick = function () {
              if (currIndex !== 0) {
                newIndex = currIndex - 1;
                newEl = rowList[newIndex];
                newEl.addClassName('isSelected');
                currentRow.removeClassName('isSelected');
                if (newIndex === 0) { mobilePrev.disabled = true; }
                if (newIndex >= rowLength) { mobileNext.disabled = true; }
                if (newIndex < rowLength - 1) {
                  mobileNext.disabled = false;
                }

                setActiveSlider();
              }
            };
        }

        if(!isSlider) {
            if ($(matrix).select('.forDesktop').length > 0) {
                var headerItems = matrix.getElementsByClassName('jfMatrixHeader-item');
                var tableCells = matrix.getElementsByClassName('jfMatrixTable-cell');

                for (var i = 1; i < headerItems.length; i++) {
                    var cell = tableCells[i].down();
                    if(headerItems[i].getElementsByTagName('div')[0].getLayout().get('width') < 5) {
                      var cellWidth = 80;
                    } else {
                      var cellWidth = headerItems[i].getElementsByTagName('div')[0].getLayout().get('padding-box-width');
                    }
                    cell.style.minWidth = cellWidth + 'px';
                }
                if (headerItems && headerItems.length) {
                    headerItems[0].getElementsByTagName('div')[0].style.width = tableCells[0].getElementsByTagName('div')[0].getLayout().get('padding-box-width') + 'px';

                    var matrixTable = matrix.getElementsByClassName('jfMatrixTable')[0];
                    var matrixHeader = matrix.getElementsByClassName('jfMatrixHeader')[0];

                    matrixTable.addEventListener('scroll', function () {
                      matrixHeader.scrollLeft = matrixTable.scrollLeft;
                    });
                }

                // if (matrix.querySelector('.jfMatrixTable-row').getLayout().get('padding-box-width') > matrixTable.getLayout().get('padding-box-width')) {
                //   matrixHeader.style('margin-right', this.getScrollbarWidth());
                // }
            }
            if (hasMobile) {
                // add necessary classes for active question
                var setActiveQuestion = function (activeQuestionOrder) {
                    var questions = $(matrix).select('.jfMatrix-question');
                    var bullets = $(matrix).select('.jfMobileMatrix-columnDot');
                    var isNextEnabled = isBackEnabled = true;
                    questions.each(function(q) {
                        q.removeClassName('isActive');
                        q.setAttribute('aria-hidden', true);
                        if (q.readAttribute('data-order') == activeQuestionOrder) {
                            $(q).removeAttribute('aria-hidden');
                            $(q).addClassName('isActive');
                        }
                    });
                    if (bullets) {
                        bullets.each(function(q) {
                            q.removeClassName('isActive');
                            q.setAttribute('aria-hidden', true);
                            if (q.readAttribute('data-order') == activeQuestionOrder) {
                                $(q).addClassName('isActive');
                                $(q).removeAttribute('aria-hidden');
                            }
                        });
                    }
                    var choices = $(matrix).select('.jfMatrix-choiceWrapper');
                    choices.each(function(c) {
                        c.removeClassName('isActive');
                        c.setAttribute('aria-hidden', true);
                        if (c.readAttribute('data-order') == activeQuestionOrder) {
                            $(c).addClassName('isActive');
                            $(c).removeAttribute('aria-hidden');
                        }
                    });
                    // Set button's activity
                    if (parseInt(activeQuestionOrder, 10) === questions.length - 1) {
                        isNextEnabled = false;
                    } else if (parseInt(activeQuestionOrder, 10) === 0) {
                        isBackEnabled = false;
                    }
                    if ($(matrix).select('.forMatrixPrev').length > 0) {
                        $(matrix).select('.forMatrixPrev')[0].disabled = !isBackEnabled;
                        $(matrix).select('.forMatrixPrev')[0].setAttribute('aria-hidden', !isBackEnabled);
                    }
                    if ($(matrix).select('.forMatrixNext').length > 0) {
                        $(matrix).select('.forMatrixNext')[0].disabled = !isNextEnabled;
                        $(matrix).select('.forMatrixNext')[0].setAttribute('aria-hidden', !isNextEnabled);
                    }
                    // set question number
                    $(matrix).select('.jfMatrixProgress-text span')[0].innerHTML = activeQuestionOrder + 1;
                }
                if (mobileActiveQuestionOrder) {
                    setActiveQuestion(mobileActiveQuestionOrder);
                }
                // next & prev buttons click handlers
                var handleNextButtonClick = function() {
                    $(this).stopObserving('click');
                    var questions = $(matrix).select('.jfMatrix-question');
                    var activeQuestionOrder = parseInt($(matrix).select('.jfMatrix-question.isActive')[0].readAttribute('data-order'));

                    activeQuestionOrder = parseInt(activeQuestionOrder, 10) + 1;
                    setActiveQuestion(activeQuestionOrder);
                    $(this).observe('click', handleNextButtonClick);
                };

                var handlePrevButtonClick = function() {
                    $(this).stopObserving('click');
                    var questions = $(matrix).select('.jfMatrix-question');

                    var activeQuestionOrder = parseInt($(matrix).select('.jfMatrix-question.isActive')[0].readAttribute('data-order'));
                    activeQuestionOrder = parseInt(activeQuestionOrder, 10) - 1;
                    setActiveQuestion(activeQuestionOrder);
                    $(this).observe('click', handlePrevButtonClick);
                };

                $(matrix).select('.forMatrixNext').length > 0 && $(matrix).select('.forMatrixNext')[0].observe("click", handleNextButtonClick);
                $(matrix).select('.forMatrixPrev').length > 0 && $(matrix).select('.forMatrixPrev')[0].observe("click", handlePrevButtonClick);


                var findAncestor = function(el, cls) {
                  while ((el = el.parentElement) && !el.classList.contains(cls));
                  return el;
                }

                // show next question automatically
                if (!passive && !mobileVersion.hasClassName('hidden-matrix')) {
                    $(matrix).select('input').each(function(input) {
                        if(input.type == 'radio' && dataType !== 'Yes No') {
                            var showNextQuestion = function() {
                                $(this).stopObserving('click');

                                if (mobileVersion.hasClassName('hidden-matrix')) {return;}

                                var activeTable = findAncestor(this, 'jfMatrixChoice-table');
                                if ($(activeTable) && $(activeTable).select('.jfMatrixChoice-row.isSelected') && $(activeTable).select('.jfMatrixChoice-row.isSelected').length > 0) {
                                    var selectedRow = $(activeTable).select('.jfMatrixChoice-row.isSelected')[0];
                                    selectedRow.removeClassName('isSelected');
                                }

                                var activeRow = findAncestor(this, 'jfMatrixChoice-row');
                                if (activeRow) {
                                    activeRow.addClassName('isSelected');
                                }
                                setTimeout(function() {
                                    var nextButton = $(matrix).select('.jfMatrixProgress-button.forMatrixNext')[0];
                                    if ($(nextButton) && $(nextButton).readAttribute('disabled') == null) {
                                        $(nextButton).triggerEvent('click');
                                    }
                                }, 500);

                                $(this).observe('click', showNextQuestion);

                            };

                            input.observe('click', showNextQuestion);
                        }
                    });
                }
            }
        }
    },

    // setMatrixMobileSlider: function(matrixContainer) {

    // },

    setRatingLayout: function(id) {
        if(document.getElementById('stage')) { return null; }

        if(typeof CardForm === "object" && CardForm.layoutParams && CardForm.layoutParams.hasTouch === false) {
            if (!JotForm.accessible) {
                JotForm.setRatingClickTransfer(id);
            }
        }
        var rating = document.getElementById('rating_' + id);
        if(!$(rating)) return;
        var ratingHiddenInput = $(rating).select('.jfRating-shortcut-input')[0];
        var ratingItems = $(rating).select('.jfRating-items')[0];
        var ratingInputs = $(rating).select('.jfRating-input');
        var ratingBefore = null;

        if(!JotForm['ratingFnQueues']){
            JotForm['ratingFnQueues'] = [];
        }

        JotForm['ratingFnQueues']['fnQueue_' + id] = [];

        ratingItems.addEventListener('click', function(evt) {
            if(typeof CardForm === "object" && CardForm.layoutParams && CardForm.layoutParams.hasTouch === false) {
                if (!JotForm.accessible) {
                    ratingHiddenInput && ratingHiddenInput.focus();
                }
            }
        });

        ratingHiddenInput.addEventListener('keyup', function(evt) {
            var value = this.value;
            if(value) {
                if($(rating).select('.jfRating-input:checked').length) {
                    var ratingBefore = $(rating).select('.jfRating-input:checked')[0].value;
                }

                if(value === "-") {
                    value = parseInt(ratingBefore) - 1;
                }

                if(value === "+") {
                    value = parseInt(ratingBefore) + 1;
                }

                value = value.toString();
                var ratingTargetInput = $(rating).select('.jfRating-input[value='+ value +']')[0];
                if(ratingTargetInput) {
                    ratingTargetInput.checked = 'checked';
                    JotForm.setRatingItemsChecked(id, value, ratingBefore);
                }
            }

            this.value = '';
        });

        ratingInputs.each(function(ratingInput) {
            ratingInput.addEventListener('mouseenter', function() {
                $(this).up('.jfRating-item').addClassName('indicate');

                var ratingItemEach = $(rating).select('.jfRating-items .jfRating-item.jfRating-selection');
                ratingItemEach.each(function(ratingItem) {
                    if($(ratingItem).hasClassName('indicate')) {
                        throw $break;
                    } else {
                        $(ratingItem).addClassName('indicate');
                    }
                });
            });

            ratingInput.addEventListener('mouseleave', function() {
                ratingInputs.each(function(ratingInput) {
                    ratingInput.up('.jfRating-item').removeClassName('indicate');
                });
            });

            ratingInput.addEventListener('change', function() {
                JotForm.setRatingItemsChecked(id, this.value);
            });

            ratingInput.addEventListener('click', function() {
                var isDeselectEvent = rating.getAttribute('data-old-value') === ratingInput.getAttribute('value');
                var ratingSelection = $(rating).select('.jfRating-selection');
                if (isDeselectEvent && ratingSelection.length === ratingInputs.length) {
                    for (var i = 0 ; i < ratingSelection.length ; i++) {
                        ratingInputs[i].checked = false;
                        ratingSelection[i].classList.remove('checked');
                    }
                    rating.select('.form-textbox')[0].value = "";
                    $('input_' + id).value = "";
                    rating.removeAttribute('data-old-value');
                    JotForm.runConditionForId(id.toString());
                }
            });

        })
    },

    setRatingItemsChecked: function(id, value, ratingBefore) {
        if (!JotForm['ratingFnQueues']){
            JotForm['ratingFnQueues'] = [];
        }

        if(!JotForm['ratingFnQueues']['fnQueue_' + id]) {
            JotForm['ratingFnQueues']['fnQueue_' + id] = [];
        }

        var rating = document.getElementById('rating_' + id);
        var ratingSelection = $(rating).select('.jfRating-selection');
        var selectedValue = !isNaN(value) && parseInt(value);
        var ratingBefore = !isNaN(ratingBefore) && parseInt(ratingBefore) || null;
        var ratingInputs = $(rating).select('.jfRating-input');

        var stack = JotForm['ratingFnQueues']['fnQueue_' + id];
        var timer = null;
        var queueProcessInterval = 33;

        if(!ratingBefore && rating.dataset.oldValue) {
            ratingBefore = rating.dataset.oldValue;
        }
        rating.dataset.oldValue = value;

        var queueProcessor = {
            enqueue: function(fnCall) {
                stack.push(fnCall);
                if (timer === null) {
                    timer = setInterval(function() { queueProcessor.processQueue(); }, queueProcessInterval);
                }
            },
            processQueue: function() {
                typeof stack[0] === 'function' && stack[0]();
                stack.shift();
                if (stack.length === 0) {
                    clearInterval(timer);
                    timer = null;
                }
            }
        }

        ratingInputs.each(function(ratingInput) {
            ratingInput.up('.jfRating-item').removeClassName('indicate');
        });

        if(ratingBefore < selectedValue || ratingBefore === null) {
            ratingSelection.each(function(ratingItem, key) {
                if(ratingItem.dataset) {
                    var itemValue = ratingItem.dataset.value;
                    if(itemValue) {
                        queueProcessor.enqueue(function() {
                            ratingItem.classList.add('checked');
                        });

                        if(itemValue === this.value) {
                            throw $break;
                        }
                    }
                }
            }, { value: value });
        }

        if(ratingBefore && ratingBefore > selectedValue) {
            ratingSelection.reverse();
            ratingSelection.each(function(ratingItem, key) {
                if(ratingItem.dataset) {
                    var itemValue = ratingItem.dataset.value;
                    if(itemValue) {
                        if(itemValue === this.value) {
                            throw $break;
                        }

                        queueProcessor.enqueue(function() {
                            ratingItem.classList.remove('checked');
                        });
                    }
                }
            }, { value: value });
        }

        $('input_' + id).value = value;

        var hiddenInput = rating.select('.form-textbox')[0];
        hiddenInput.value = parseInt(value, 10);

        JotForm.runConditionForId(id.toString());
    },

    setRatingClickTransfer: function(id) {
        document.body.addEventListener('click',function() {
            var eventTarget = document.querySelector('.jfCard-wrapper.isVisible #rating_' + id + ' input');
            // eventTarget && eventTarget.focus();
        });
    },

    getScrollbarWidth: function(matrix) {
        var outer = document.createElement("div");
        outer.style.visibility = "hidden";
        outer.style.width = "100px";
        outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

        matrix.appendChild(outer);

        var widthNoScroll = outer.offsetWidth;
        // force scrollbars
        outer.style.overflow = "scroll";

        // add innerdiv
        var inner = document.createElement("div");
        inner.style.width = "100%";
        outer.appendChild(inner);
        var widthWithScroll = inner.offsetWidth;

        // remove divs
        outer.parentNode.removeChild(outer);
        return widthNoScroll - widthWithScroll;
    },

    getOptionOtherInput: function(option) {
        if (option) {
            var parentWrapper = option.up('.form-' + option.type + '-item');
            if (parentWrapper) {
                var otherSelector = '.form-' + option.type + '-other-input';
                return parentWrapper.down(otherSelector);
            }
        }

        return null;
    },

    setFullNameAutoFocus: function (id) {
        var prefixDropdown = $$('#prefix_' + id)[0];

        prefixDropdown.observe('change', function() {
            setTimeout(function() {
                var firstNameInput= $$('#first_' + id)[0];
                firstNameInput.focus();
            }, 500);
        });
    },

    initShoppingBag: function() {
        /*
            - This function only works for cardForms.
            - It is implemented on patch.js
        */
    },

    initProductPages: function() {
        /*
            - This function only works for cardForms.
            - It is implemented on patch.js
        */
    },

    initDonation: function() {
        /*
            - This function only works for cardForms.
            - It is implemented on patch.js
        */
    },

    // toQueryParams with custom regex
    customToQueryParams: function (text, separator) {
        var match = text.strip().match(/[^#&?]*?=[^#&?]*/g);
        if (!match || !match[1]) return { };

        return match[1].split(separator || '&').inject({ }, function(hash, pair) {
          if ((pair = pair.split('='))[0]) {
            var key = decodeURIComponent(pair.shift()),
                value = pair.length > 1 ? pair.join('=') : pair[0];

            if (value != undefined) try { value = decodeURIComponent(value) } catch(e) { value = unescape(value) } // temporary fix (80746)

            if (key in hash) {
              if (!Object.isArray(hash[key])) hash[key] = [hash[key]];
              hash[key].push(value);
            }
            else hash[key] = value;
          }
          return hash;
        });
    },

    // replaces already loaded form css, eg. /stylebuilder/{formID}.css, with embed css, eg. /stylebuilder/{formID}/{referrer}.css?
    loadEmbedStyle: function(formID, styles) {
        try {
            styles = JSON.parse(styles);
        } catch(e) {
            styles = {};
        }

        var isEmbed = window.parent !== window;
        if (!isEmbed) { return; }
        if (window.location.href.indexOf('disableSmartEmbed') > -1) {
            return;
        }
        var formCSS = document.getElementById('form-css');
        if (!formCSS) { return; }
        var parser = document.createElement('a');
        parser.href = formCSS.href;
        // var params = this.customToQueryParams(parser.search);
        var params = parser.search.toQueryParams();
        var embedUrl = params.embedUrl || document.URL;

        // The reason I am generating md5 before sanitazing is because of the previously generated hashes
        var referrerHash = getMD5(embedUrl);

        /**
         * Remove defined parameters from embedUrl because they will not be
         * processed as an actual parameter and will be passed as a part of embed url
         */
        ['resetSmartStyle', 'clearSmartStyle', 'clearInlineStyle'].each(function(key) {

            // Search given string as parameter
            var regexPattern = new RegExp('&?' + key + '(?:=[0-9]*)?');
            var matches = regexPattern.exec(embedUrl);

            if(matches && matches[0]) {
                // Remove the match and add it to actual paramater list
                embedUrl = embedUrl.replace(matches[0], '');

                // Add the parameter as actual one
                var keyValue = matches[0].replace('&', '').split('=');
                params[keyValue[0]] = keyValue[1] !== undefined ? keyValue[1] : '1';
            }
        });

        // Delete embed url from params if exists to append into parameters
        if(params.embedUrl) {
            delete(params.embedUrl);
        }

        // Create the url parameters
        params = Object.toQueryString(params);
        params += (params !== '' ? '&' : '') + 'embedUrl=' + embedUrl;

        pathname = parser.pathname.split('.css')[0] + '/' + referrerHash + '.css';
        pathname = pathname.charAt(0) === '/' ? pathname.slice(1) : pathname;
        var nextHref = parser.protocol + '//' + parser.hostname + '/' + pathname + '?' + params;
        this.loadStyleSheet(nextHref, function() {
            var inlineStyle = ((styles[referrerHash] || {})['inlineStyle'] || {});
            if (typeof inlineStyle['embedHeight'] !== 'undefined') {
                window.parent.postMessage('setHeight:' + inlineStyle['embedHeight'] + ':' + formID, '*');
            }
            formCSS.remove();
        });
    },

    initOwnerView: function(formID) {
        if (!this.jsForm) { return; }
        var url = this.url;
        if (!this.url.include('.jotform.pro')) {
            url = 'https://www.jotform.com'
        }
        var src = url + '/ownerView.php?id=' + formID;
        window.parent.postMessage(['loadScript', src, formID].join(':'), '*');
    },

    _xdr: function(url, method, data, callback, errback, disableCache) {
        var req;
        if(XMLHttpRequest) {
            JotForm.createXHRRequest(url, method, data, callback, errback, undefined, disableCache);
        } else if(XDomainRequest) {
            req = new XDomainRequest();
            req.open(method, url);
            req.onerror = errback;
            req.onload = function() {
                callback(req.responseText);
            };
            req.send(data);
        } else {
            errback(new Error('CORS not supported'));
        }
    },

    createXHRRequest: function (url, method, data, callback, errback, forceWithCredentials, disableCache) {
        var req = new XMLHttpRequest();
        if (forceWithCredentials) {
            req.withCredentials = true;
        }
        if ('withCredentials' in req) {
            req.open(method, url, true);
            req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            if (disableCache) {
                req.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0");
            }
            req.onerror = errback;
            req.onreadystatechange = function () {
                if (req.readyState === 4) {
                    if (req.status >= 200 && req.status < 400) {
                        try {
                            var resp = JSON.parse(req.responseText);
                            var responseErrorCodes = [400, 404, 401, 503, 301];
                            if (responseErrorCodes.indexOf(resp.responseCode) > -1) {
                                if (resp.responseCode === 301) {
                                    url = url.replace('api.', 'eu-api.');
                                    JotForm.createXHRRequest(url, method, data, callback, errback, forceWithCredentials);
                                    return;
                                }
                                errback(resp.message, resp.responseCode);
                                return;
                            }
                            callback(resp);
                        } catch (err) {
                            errback(new Error('Error: ' + err));
                        }
                    } else {
                        errback(new Error('Response returned with non-OK status'));
                    }
                }
            };
            req.send(data);
        }
    },

    //---Serialize objects for POST and PUT
    serialize: function(data) {
        var str = [];
        for(var p in data)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
            return str.join("&");
    },

    preparePOST: function(obj,label) {
        postData = new Object();
        for (var key in obj) {
            value = obj[key];
            if(label) {
                if(key.indexOf('_') !== -1) {
                    keys = key.split('_');
                    key = keys[0] + "][" + keys[1];
                }
                key = "[" + key + "]";
            }
            postData[ label + key] = value;
        }
        return postData;
    },

    getPrefillToken: function() {
        if (typeof document.get.prefillToken !== 'undefined') return document.get.prefillToken;

        var path = window.location.pathname.split('/').splice(2);
        if (path[0] === 'prefill') return path[1].split('?')[0];

        return false;
    },

    initPrefills: function() {
        var prefillToken = JotForm.getPrefillToken();
        var isManualPrefill = getQuerystring('jf_createPrefill') == '1';

        if (!prefillToken) return;
        var _form = document.querySelector('form');
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var isCardForm = window.FORM_MODE === 'cardform';
        var url = JotForm.server + '?action=getPrefillData&formID=' + _form.id + '&key=' + prefillToken;
        var data = {};
        JotForm.createXHRRequest(url, 'get', null, function(res) {
            $H(res.data).each(function(pair) {
                var isArrayValue = Array.isArray(pair.value);
                // Invalid value type
                var isValueTypeValid = typeof pair.value === 'string' || isArrayValue;
                if (!isValueTypeValid) return;
                // Empty value
                var isEmptyValue = isArrayValue ? pair.value.length === 0 : pair.value.trim() === '';
                if (isEmptyValue) return;

                var useQuestionID = getQuerystring('useQuestionID') == '1' || (res.settings && res.settings.useQuestionID);
                var field = $(pair.key);
                var line;
                if (useQuestionID) {
                    var keys = pair.key.split('-');
                    line = document.querySelector('#id_' + keys[0]);
                    field = line !== null ? line.querySelector(keys[1] ? '[id*="' + keys[1] + '"]' : 'input, select, textarea') : null;
                }

                if (field === null) {

                    // check whether zero index value is exist
                    var idStringSections = pair.key.split("_");
                    var zeroIndexValue = parseInt(idStringSections.pop()) - 1;
                    idStringSections.push(zeroIndexValue)
                    var possibleZeroIndexElement  = idStringSections.join("_");
                    field = $(possibleZeroIndexElement);

                    if(field === null){   
                        var qid = '';
                        if (pair.key.indexOf('hour_') > -1) {
                            qid = pair.key.replace('hour_', '');
                            field = $('input_' + qid + '_hourSelect');
                        } else if (pair.key.indexOf('min_') > -1) {
                            qid = pair.key.replace('min_', '');
                            field = $('input_' + qid + '_minuteSelect');
                        } else if (pair.key.indexOf('_ampm') > -1) {
                            qid = pair.key.substring(pair.key.indexOf("input_") + 6, pair.key.lastIndexOf("_ampm"));
                            field = $('ampm_' + qid);
                        }
                    }
                }
                if (field === null) return;

                if (!line) line = field.up('li.form-line');
                var _name = field.name;
                _name = _name.slice(_name.indexOf('_') + 1);
                if (typeof document.get[_name] !== 'undefined') return;

                if (field.type === 'checkbox') {
                    _name = _name.replace('[]', '');
                }

                var isLiteMode = keys && keys[1] === 'lite_mode';
                var questionType = line.getAttribute('data-type');
                var inputValue = pair.value;

                if (pair.key.includes('month') && monthNames.indexOf(pair.value) > -1) {
                    inputValue = monthNames.indexOf(pair.value) + 1;
                }

                if (['control_radio', 'control_checkbox'].indexOf(questionType) === -1 && isArrayValue) {
                    inputValue = inputValue.join(',');
                }
                if (questionType === 'control_radio' && !isArrayValue) inputValue = [inputValue];

                if (['control_time', 'control_datetime'].indexOf(questionType) > -1 && (!isCardForm || isLiteMode)) {
                    field.value = inputValue;
                    if (useQuestionID) {
                        field.triggerEvent('blur');
                        field.triggerEvent('complete');
                    }
                }

                if (['control_datetime', 'control_time'].indexOf(questionType) > -1) {
                    if (pair.key.indexOf('hour') > -1 && inputValue.charAt(0) === '0') {
                        inputValue = inputValue.substring(1)
                        field.value = inputValue;
                    }
                    var timeInput = line.down('input[id*="_timeInput"]');
                    if (timeInput) {
                        var hour = line.down('input[id*="_hourSelect"]').value;
                        var min = line.down('input[id*="_minuteSelect"]').value;
    
                        if (hour && min) {
                            var calculatedHour = hour.toString().length === 1 ? '0' + hour : hour;
                            timeInput.value = calculatedHour + ':' + min;
                            timeInput.triggerEvent('change');
                        }
                    }
                }

                if (questionType === 'control_inline' && field.up('.FITB-inptCont[data-type="datebox"]')) {
                    var datebox = field.up('.FITB-inptCont[data-type="datebox"]');
                    var dateboxID = datebox.id;
                    if (pair.key.indexOf('lite_mode_') > -1 && dateboxID) {
                        var day = res.data[dateboxID.replace('id_', 'day_')];
                        var month = res.data[dateboxID.replace('id_', 'month_')];
                        var year = res.data[dateboxID.replace('id_', 'year_')];
                        if (day && month && year) {
                            JotForm.formatDate({
                                date: new Date(year, month - 1, day),
                                dateField: datebox
                            });
                        }
                    }
                } else if (['control_radio', 'control_checkbox'].indexOf(questionType) > -1 && Array.isArray(inputValue)) {
                    JotForm.onTranslationsFetch(function() {
                        var foundValues = [];
                        line.querySelectorAll('input.form-checkbox:not(.form-checkbox-other), input.form-radio:not(.form-radio-other)').forEach(function(input) {
                            var translatedValues = [];
                            if (typeof FormTranslation !== 'undefined' && Object.values(FormTranslation.dictionary).length > 1) {
                                Object.values(FormTranslation.dictionary).forEach(function(dictionary) {
                                    if (dictionary[input.value]) translatedValues.push(dictionary[input.value]);
                                });
                            }

                            if (translatedValues.length === 0) {
                                translatedValues.push(input.value);
                            }

                            var foundValue = inputValue.find(function(val) { return translatedValues.indexOf(val) > -1; });
                            if (foundValue !== undefined) {
                                foundValues.push(foundValue);
                                if (input.checked) return;

                                var isDisabled = input.disabled ? !!(input.enable()) : false;
                                input.click();
                                if (isDisabled) input.disable();
                            }
                        });

                        var otherOption = line.querySelector('.form-checkbox-other, .form-radio-other');
                        var otherOptionInput = line.querySelector('.form-checkbox-other-input, .form-radio-other-input');
                        if (otherOption && otherOptionInput) {
                            var unusedValues = inputValue.reduce(function(acc, val) {
                                if (foundValues.indexOf(val) === -1) {
                                    acc.push(val);
                                }
                                return acc;
                            }, []);
                            
                            if (unusedValues.length === 0) return;

                            var isOtherOptionDisabled = otherOption.disabled ? !!(otherOption.enable()) : false;
                            otherOption.click();
                            if (isOtherOptionDisabled) otherOption.disable();

                            otherOptionInput.value = unusedValues.join(',');
                        }
                    });
                } else {
                    data[_name] = inputValue;
                }

                if (res.settings && res.settings.fieldBehaviour === 'readonly' && !isManualPrefill) {
                    if (['radio', 'checkbox'].indexOf(field.type) > -1) {
                        var qid = line.getAttribute('id').split('_')[1];
                        JotForm.enableDisableField(qid, false);
                    } else {
                        // Special case for Long text - Rich Text
                        if (field.getAttribute('data-richtext') === 'Yes') {
                            var nicContentEditable = field.previousElementSibling.firstChild;
                            if ( nicContentEditable ) {
                                nicContentEditable.setAttribute('contenteditable', 'false');
                                setTimeout(function waitForTransition() {
                                    nicContentEditable.innerHTML = pair.value;
                                }, 1000)
                            }  
                        }
                        field.disable();
                        field.setAttribute('autocomplete', _name);
                        if (!field.hasClassName('conditionallyDisabled')) {
                            field.addClassName('conditionallyDisabled');
                        }
                    }
                }
            });
            JotForm.prePopulations(data, true);
            JotForm.onTranslationsFetch(dispatchCompletedEvent);
        }, function(err) {
            console.log(err);
            dispatchCompletedEvent();
        });
        function dispatchCompletedEvent() {
            if (document.createEvent) {
                var event = document.createEvent('CustomEvent');
                event.initEvent('PrefillCompleted', false, false);
                document.dispatchEvent(event);
            }
        }

        // Create hidden input for prefill token to send server
        var prefillTokenInputEl = document.createElement('input');
        prefillTokenInputEl.setAttribute('type', 'hidden');
        prefillTokenInputEl.setAttribute('name', 'prefill_token');
        prefillTokenInputEl.value = prefillToken;
        _form.appendChild(prefillTokenInputEl);
    },

    createManualPrefill: function() {
        var isManualPrefill = getQuerystring('jf_createPrefill') == '1';
        if (!isManualPrefill) return;

        var errorNavigation = setInterval(function disableScroll() {
            if (window.ErrorNavigation) {
                clearInterval(errorNavigation);
                window.ErrorNavigation.disableScrollToBottom();
            }
        }, 300);

        var manualPrefillStyles = '<style id="manualPrefillStyles">.formUserAccountBoxContainer, .draftSelectionModalOverlay, .jfFormUser-header { display: none !important; }</style>';
        $$('head')[0].insert(manualPrefillStyles);

        // Conditions should not work while creating manual prefill
        JotForm.conditions = [];
        JotForm.fieldConditions = {};

        //show hidden fields
        $$('.always-hidden, .form-field-hidden').each(function(el) {
            var id = el.getAttribute('id').split('_')[1];
            JotForm.showField(id);
        });

        // Disable not supported fields
        var allowedQuestions = [
            'control_fullname', 'control_email', 'control_address', 'control_phone',
            'control_email', 'control_datetime', 'control_inline', 'control_textbox',
            'control_textarea', 'control_dropdown', 'control_radio', 'control_checkbox',
            'control_number', 'control_time', 'control_spinner', 'control_scale',
            'control_button', 'control_pagebreak'
        ];

        $$('.form-line').each(function(line) {
            var type = line.getAttribute('data-type');
            var id = line.getAttribute('id').split('_')[1];

            JotForm.requireField(id, false);

            if (allowedQuestions.indexOf(type) > -1) {
                // Ability to edit normally read only fields
                line.select("input, textarea, select").each(function(elem) {
                    if(elem.hasAttribute('readonly')) {
                        elem.removeAttribute('readonly');
                    }
                    if(elem.hasAttribute('disabled')) {
                        elem.removeAttribute('disabled');
                    }
                });
                return;
            };

            var notSupportedText = "Prefill isn't available for this field.";
            if (window.FORM_MODE === 'cardform') {
                var questionContent = line.querySelector('.jfCard-question') || line;
                questionContent.setStyle({ 'pointer-events': 'none', 'opacity': '0.3' });

                var notificationContainer = line.querySelector('.jfCard-actionsNotification');
                var messageContainer = notificationContainer.querySelector('.form-error-message');

                if (messageContainer) {
                    messageContainer.innerHTML = notSupportedText;
                    messageContainer.setStyle({ 'display': 'block' });
                } else {
                    messageContainer = document.createElement('div');
                    messageContainer.className = 'form-error-message';
                    messageContainer.setStyle({ 'display': 'block' });
                    messageContainer.innerHTML = notSupportedText;
                    notificationContainer.appendChild(messageContainer);
                }
            } else {
                var inputContainer = line.querySelector('div[class^="form-input"]');
                var labelContainer = line.querySelector('.form-label');
                if (inputContainer) {
                    inputContainer.setStyle({ 'pointer-events': 'none', 'opacity': '0.3' });
                }
                if (labelContainer) {
                    labelContainer.setStyle({ 'pointer-events': 'none', 'opacity': '0.3' });
                }

                var descriptionContent = line.querySelector('.form-description-content');
                if (descriptionContent) {
                    descriptionContent.innerHTML = notSupportedText;
                } else {
                    JotForm.description(id, notSupportedText);
                }
                // Temporary position fix
                if (JotForm.newDefaultTheme || JotForm.extendsNewTheme) {
                    line.querySelector('.form-description').setStyle({ bottom: 'auto', top: '0', maxWidth: '220px' });
                }
            }
        });

        $$('.form-submit-button').each(function(btn) {
            btn.setStyle({ 'pointer-events': 'none', 'opacity': '0.3' });
        });

        window.addEventListener('message', function(event) {
            if (event.data.source !== 'jfManual_prefill') return;

            if (event.data.action === 'getFieldsData' || event.data.action === 'getFieldsDataForSharing') {
                var fieldMapping = {};
                var isFirstFullnameMatched = false;
                var tempKey = '';
                var tempValue = [];
                var fields = document.querySelectorAll('.form-line');
                var fullname = '';
                var email = '';
                var hasErrors = false;

                fields.forEach(function(field) {
                    var fieldType = field.getAttribute('data-type');
                    if (allowedQuestions.indexOf(fieldType) === -1) return;
                    if (!hasErrors) {
                        hasErrors = field.hasClassName('form-line-error');
                    }
                    var inputs = field.querySelectorAll('input, select, textarea');
                    inputs.forEach(function(input) {
                        var inputValue = input.value.trim();
                        if (inputValue == '' || (['control_scale', 'control_radio', 'control_checkbox'].indexOf(fieldType) > -1 && !input.checked)) return;

                        if (fieldType === 'control_checkbox') {
                            tempKey = tempKey || input.id;
                            tempValue.push(inputValue);
                            return;
                        }

                        if (input.id.includes('ampm')) {
                            var isRangeInput = input.id.includes('Range');
                            var timeInputs = field.querySelectorAll('input[id*="_timeInput"], select[id*="hour"], select[id*="min"]').filter(function (timeInput) {
                                return (timeInput.id.includes('Range') && isRangeInput) || (!timeInput.id.includes('Range') && !isRangeInput);
                            });
                            if (!timeInputs.every(function(input) { return input.value; })) {
                                return;
                            }
                        }

                        fieldMapping[input.id] = input.value;
                        if (fieldType === 'control_fullname' && !isFirstFullnameMatched) fullname = !fullname ? inputValue : fullname + ' ' + inputValue;
                        if (fieldType === 'control_email' && !email) email = inputValue;
                    });

                    if (!isFirstFullnameMatched && fieldType === 'control_fullname') isFirstFullnameMatched = true;
                    if (tempKey && tempValue) fieldMapping[tempKey] = tempValue;
                    tempKey = '';
                    tempValue = [];
                });

                var finalSource = event.data.action === 'getFieldsDataForSharing' ? 'jfManual_prefill_forShare' : 'jfManual_prefill';
                event.source.postMessage({ source: finalSource, formData: { hasErrors: hasErrors }, prefillData: { fieldMapping: fieldMapping, fullname: fullname, email: email }}, event.origin);
            }
        }, false)
    },

    adjustWorkflowFeatures: function(params) {
        try {
            if (params || typeof document.get === 'object') {
                if(!params){  params = {}; }
                var wfTaskType = false;
                var wfTaskID = params.taskID || document.get.taskID;
                var targetForm = JotForm && JotForm.forms && JotForm.forms[0] ? JotForm.forms[0] : false;
                if (!wfTaskID || !targetForm) {
                    return;
                }

                var isRequestMoreInfo = (params.requestMoreInfo || document.get.requestMoreInfo) == '1';
                var isWorkflowAssignFormFilling =  (params.workflowAssignFormTask || document.get.workflowAssignFormTask) == '1';
                switch (true) {
                    case isWorkflowAssignFormFilling:
                        wfTaskType = 'assign-form';
                        break;
                    case isRequestMoreInfo:
                        wfTaskType = 'request-more-info';
                        break;
                }

                if (!wfTaskType) {
                    return;
                }

                targetForm.insert(new Element('input', { type: 'hidden', name: 'wfTaskID' }).putValue(wfTaskID));
                targetForm.insert(new Element('input', { type: 'hidden', name: 'wfTaskType' }).putValue(wfTaskType));
            }
        } catch(e) {
            console.log('Error adjusting wf variables', e);
        }
    }, 

    onTranslationsFetch: function(callback) {
        if (typeof FormTranslation !== 'undefined' && FormTranslation.version !== 1 && !FormTranslation.to) {
            setTimeout(function() {
                JotForm.onTranslationsFetch(callback)
            }, 100);
        } else {
            callback();
        }
    }
};

function getMD5(s){function L(k,d){return(k<<d)|(k>>>(32-d))}function K(G,k){var I,d,F,H,x;F=(G&2147483648);H=(k&2147483648);I=(G&1073741824);d=(k&1073741824);x=(G&1073741823)+(k&1073741823);if(I&d){return(x^2147483648^F^H)}if(I|d){if(x&1073741824){return(x^3221225472^F^H)}else{return(x^1073741824^F^H)}}else{return(x^F^H)}}function r(d,F,k){return(d&F)|((~d)&k)}function q(d,F,k){return(d&k)|(F&(~k))}function p(d,F,k){return(d^F^k)}function n(d,F,k){return(F^(d|(~k)))}function u(G,F,aa,Z,k,H,I){G=K(G,K(K(r(F,aa,Z),k),I));return K(L(G,H),F)}function f(G,F,aa,Z,k,H,I){G=K(G,K(K(q(F,aa,Z),k),I));return K(L(G,H),F)}function D(G,F,aa,Z,k,H,I){G=K(G,K(K(p(F,aa,Z),k),I));return K(L(G,H),F)}function t(G,F,aa,Z,k,H,I){G=K(G,K(K(n(F,aa,Z),k),I));return K(L(G,H),F)}function e(G){var Z;var F=G.length;var x=F+8;var k=(x-(x%64))/64;var I=(k+1)*16;var aa=Array(I-1);var d=0;var H=0;while(H<F){Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=(aa[Z]| (G.charCodeAt(H)<<d));H++}Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=aa[Z]|(128<<d);aa[I-2]=F<<3;aa[I-1]=F>>>29;return aa}function B(x){var k="",F="",G,d;for(d=0;d<=3;d++){G=(x>>>(d*8))&255;F="0"+G.toString(16);k=k+F.substr(F.length-2,2)}return k}function J(k){k=k.replace(/rn/g,"n");var d="";for(var F=0;F<k.length;F++){var x=k.charCodeAt(F);if(x<128){d+=String.fromCharCode(x)}else{if((x>127)&&(x<2048)){d+=String.fromCharCode((x>>6)|192);d+=String.fromCharCode((x&63)|128)}else{d+=String.fromCharCode((x>>12)|224);d+=String.fromCharCode(((x>>6)&63)|128);d+=String.fromCharCode((x&63)|128)}}}return d}var C=Array();var P,h,E,v,g,Y,X,W,V;var S=7,Q=12,N=17,M=22;var A=5,z=9,y=14,w=20;var o=4,m=11,l=16,j=23;var U=6,T=10,R=15,O=21;s=J(s);C=e(s);Y=1732584193;X=4023233417;W=2562383102;V=271733878;for(P=0;P<C.length;P+=16){h=Y;E=X;v=W;g=V;Y=u(Y,X,W,V,C[P+0],S,3614090360);V=u(V,Y,X,W,C[P+1],Q,3905402710);W=u(W,V,Y,X,C[P+2],N,606105819);X=u(X,W,V,Y,C[P+3],M,3250441966);Y=u(Y,X,W,V,C[P+4],S,4118548399);V=u(V,Y,X,W,C[P+5],Q,1200080426);W=u(W,V,Y,X,C[P+6],N,2821735955);X=u(X,W,V,Y,C[P+7],M,4249261313);Y=u(Y,X,W,V,C[P+8],S,1770035416);V=u(V,Y,X,W,C[P+9],Q,2336552879);W=u(W,V,Y,X,C[P+10],N,4294925233);X=u(X,W,V,Y,C[P+11],M,2304563134);Y=u(Y,X,W,V,C[P+12],S,1804603682);V=u(V,Y,X,W,C[P+13],Q,4254626195);W=u(W,V,Y,X,C[P+14],N,2792965006);X=u(X,W,V,Y,C[P+15],M,1236535329);Y=f(Y,X,W,V,C[P+1],A,4129170786);V=f(V,Y,X,W,C[P+6],z,3225465664);W=f(W,V,Y,X,C[P+11],y,643717713);X=f(X,W,V,Y,C[P+0],w,3921069994);Y=f(Y,X,W,V,C[P+5],A,3593408605);V=f(V,Y,X,W,C[P+10],z,38016083);W=f(W,V,Y,X,C[P+15],y,3634488961);X=f(X,W,V,Y,C[P+4],w,3889429448);Y=f(Y,X,W,V,C[P+9],A,568446438);V=f(V,Y,X,W,C[P+14],z,3275163606);W=f(W,V,Y,X,C[P+3],y,4107603335);X=f(X,W,V,Y,C[P+8],w,1163531501);Y=f(Y,X,W,V,C[P+13],A,2850285829);V=f(V,Y,X,W,C[P+2],z,4243563512);W=f(W,V,Y,X,C[P+7],y,1735328473);X=f(X,W,V,Y,C[P+12],w,2368359562);Y=D(Y,X,W,V,C[P+5],o,4294588738);V=D(V,Y,X,W,C[P+8],m,2272392833);W=D(W,V,Y,X,C[P+11],l,1839030562);X=D(X,W,V,Y,C[P+14],j,4259657740);Y=D(Y,X,W,V,C[P+1],o,2763975236);V=D(V,Y,X,W,C[P+4],m,1272893353);W=D(W,V,Y,X,C[P+7],l,4139469664);X=D(X,W,V,Y,C[P+10],j,3200236656);Y=D(Y,X,W,V,C[P+13],o,681279174);V=D(V,Y,X,W,C[P+0],m,3936430074);W=D(W,V,Y,X,C[P+3],l,3572445317);X=D(X,W,V,Y,C[P+6],j,76029189);Y=D(Y,X,W,V,C[P+9],o,3654602809);V=D(V,Y,X,W,C[P+12],m,3873151461);W=D(W,V,Y,X,C[P+15],l,530742520);X=D(X,W,V,Y,C[P+2],j,3299628645);Y=t(Y,X,W,V,C[P+0],U,4096336452);V=t(V,Y,X,W,C[P+7],T,1126891415);W=t(W,V,Y,X,C[P+14],R,2878612391);X=t(X,W,V,Y,C[P+5],O,4237533241);Y=t(Y,X,W,V,C[P+12],U,1700485571);V=t(V,Y,X,W,C[P+3],T,2399980690);W=t(W,V,Y,X,C[P+10],R,4293915773);X=t(X,W,V,Y,C[P+1],O,2240044497);Y=t(Y,X,W,V,C[P+8],U,1873313359);V=t(V,Y,X,W,C[P+15],T,4264355552);W=t(W,V,Y,X,C[P+6],R,2734768916);X=t(X,W,V,Y,C[P+13],O,1309151649);Y=t(Y,X,W,V,C[P+4],U,4149444226);V=t(V,Y,X,W,C[P+11],T,3174756917);W=t(W,V,Y,X,C[P+2],R,718787259);X=t(X,W,V,Y,C[P+9],O,3951481745);Y=K(Y,h);X=K(X,E);W=K(W,v);V=K(V,g)}var i=B(Y)+B(X)+B(W)+B(V);return i.toLowerCase()};

function getQuerystring(key, default_) {
    if (default_ == null) default_ = "";
    key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
    var qs = regex.exec(window.location.href);
    if (qs == null)
        return default_;
    else
        return qs[1];
}

function onProductImageClicked(pid, isEmbeddedwithIframe) {
    if (typeof isEmbeddedwithIframe === 'undefined') {
        isEmbeddedwithIframe = false;
    }

    var isNewUi = false;
    if ($$('.image-overlay-image')[0]) {
        isNewUi = true;
    }

    var formProductDOM = $$('.form-overlay-item');
    var imagesDOM;
    var imageUrls = [];

    //  Clear products at first.
    formProductDOM = formProductDOM.filter(function(product) {
        if (product.getAttribute('hasimages') === 'true' || product.getAttribute('hasicon') === 'true') {
            return true;
        }

        if (product.querySelector('img') && !product.querySelector('img').src.indexOf('noImage-placeholder.svg') > -1) {
            return true;
        }

        return false;
    });

    var index;
    for (var i = 0; i < formProductDOM.length; i++) {
        if (formProductDOM[i].getAttribute('pid') && formProductDOM[i].getAttribute('pid') === pid) {
            index = i;
            break;
        }
    }

    if (isNewUi) {
        if (formProductDOM[index]) {
            if (formProductDOM[index].getAttribute('hasimages') === 'true') {
                imagesDOM = formProductDOM[index].getElementsByTagName('img');
            } else if (formProductDOM[index].getAttribute('hasimages') === 'false' && formProductDOM[index].getAttribute('hasicon') === 'true') {
                imagesDOM = [ formProductDOM[index].getAttribute('iconValue') ];
            }
        }
        for (var i = 0; i < imagesDOM.length; i++) {
            imageUrls.push(imagesDOM[i].src || imagesDOM[i]);
        }
    } else {
        if (document.querySelector('.form-overlay-item img')) {
            imageUrls.push(document.querySelectorAll('.form-overlay-item img')[index].src);
        } else if (document.querySelectorAll('.form-product-item img')){
            imageUrls.push(document.querySelectorAll('.form-product-item img')[index].src);
        }
    }

    // Find the position of an element
    if (isEmbeddedwithIframe === true && typeof index !== 'undefined') {
        try {
            var productItems = document.querySelectorAll('.form-product-item');
            var productItem = productItems[index];
            var productItemHeightRelativeToViewPort = productItem.getBoundingClientRect().y;

            // We need to set the location of a modal
            setTimeout(function() {
                var modal = document.querySelector('#productImageOverlay .overlay-content');
                var modalHeight = modal.getHeight();

                var modalTopDistance = productItemHeightRelativeToViewPort - modalHeight/2;
                var modalBottomDistance = productItemHeightRelativeToViewPort + modalHeight/2;

                if (modalTopDistance < 0) {
                    modalTopDistance = productItemHeightRelativeToViewPort;
                } else if (modalBottomDistance > window.innerHeight) {
                    modalTopDistance = productItemHeightRelativeToViewPort - modalHeight + 92;
                }

                modal.style.top = (modalTopDistance).toString() + 'px';
            }, 0);
        } catch (e) {
            console.log('Ground');
        }
    }

    // If the cache is remove but the image hasn't added yet.
    if (isNewUi && imageUrls.length === 0) { 
        imageUrls.push(document.querySelectorAll('.form-overlay-item img')[index].src);
    }

    if (!imageUrls || !imageUrls.length) return;

    var divOverlay = document.createElement('div');
    var divOverlayContent = document.createElement('div');
    var divImgWrapper = document.createElement('div');
    var divSliderNavigation = document.createElement('div');
    var divThumbnail = document.createElement('ul');
    divOverlay.id = 'productImageOverlay';
    divOverlay.className = isNewUi ? 'overlay new_ui' : 'overlay old_ui';
    divOverlay.tabIndex = -1;
    divOverlayContent.className = 'overlay-content';
    divImgWrapper.className = 'img-wrapper';
    divSliderNavigation.className = 'slider-navigation';
    divOverlay.appendChild(divOverlayContent);
    divOverlayContent.appendChild(divImgWrapper);
    divOverlayContent.appendChild(divSliderNavigation);
    
    if (isNewUi) {
        divSliderNavigation.appendChild(divThumbnail);
    }

    var prevButton = document.createElement('small');
    var nextButton = document.createElement('small');
    var closeButton = document.createElement('small');
    closeButton.innerText = 'X';

    prevButton.className = 'lb-prev-button';
    nextButton.className = 'lb-next-button';
    closeButton.className = 'lb-close-button';

    divImgWrapper.appendChild(prevButton);
    divImgWrapper.appendChild(nextButton);
    divOverlayContent.appendChild(closeButton);

    var images = imageUrls.map(function(url) {
        var span = document.createElement('span');
        span.setAttribute('style', 'background-image: url("' + encodeURI(url) + '"); display: none');
        span.setAttribute('url', encodeURI(url));
        return span;
    });

    images[0].style.display = 'block';
    var visibleIndex = 0;
    var imgLength = images.length;

    var displayGivenIndex = function(displayIndex) {
        images[visibleIndex].style.display = 'none'; // hide
        visibleIndex = displayIndex;
        // arrangeImageSize();
    };

    var sliderListItemClickHandler = function(index, event) {
        images[visibleIndex].style.display = 'none';
        divThumbnail.childElements()[visibleIndex].classList.remove('selected');
        visibleIndex = index;
        images[visibleIndex].style.display = 'block';
        divThumbnail.childElements()[index].classList.add('selected');
    }
    
    images.each(function(p, index) {
        divImgWrapper.appendChild(p);

        if (images.length > 1) {
            if (!divOverlayContent.hasClassName('has_thumbnail')) {
                divOverlayContent.addClassName('has_thumbnail');
            }

            var listItem = document.createElement('li');
            listItem.onclick = sliderListItemClickHandler.bind(this, index);
            listItem.setAttribute('style', 'background-image: url("' + p.getAttribute('url') + '")');
            if (index === 0) {
                listItem.className = "selected";
            }
    
            divThumbnail.appendChild(listItem);
        }
    });
    
    var displayPrevious = function() {
        images[visibleIndex].style.display = 'none';
        visibleIndex -= 1;
        if (visibleIndex == -1) visibleIndex = imgLength - 1;
        images[visibleIndex].style.display = 'block';

        divThumbnail.childElements().each(function (element, index) {
            if (visibleIndex === index) {
                element.className = "selected";
            } else {
                element.className = "";
            }
        });

        // arrangeImageSize();
    }

    prevButton.onclick = displayPrevious;

    var displayNext = function() {
        images[visibleIndex].style.display = 'none';
        visibleIndex += 1;
        if (visibleIndex == imgLength) visibleIndex = 0;
        images[visibleIndex].style.display = 'block';

        divThumbnail.childElements().each(function (element, index) {
            if (visibleIndex === index) {
                element.className = "selected";
                element.scrollIntoView();
            } else {
                element.className = "";
            }
        });
        // arrangeImageSize();
    }

    nextButton.onclick = displayNext;

    divOverlayContent.onclick = function(e) {
        e.stopPropagation();
    }

    var close = function() {
        window.onresize = null;
        divOverlay.remove();
    }

    closeButton.onclick = close;
    divOverlay.onclick = close;

    var arrangeImageSize = function() {
        // var width = window.innerWidth;
        // var height = window.innerHeight;

        // var maxSize = (Math.min(width, height) * 0.75) + 'px';
        // var size = width < height ? { maxWidth: maxSize, height: 'auto', width: 'auto', maxHeight: 'none' } : { width: 'auto', maxHeight: maxSize, height: 'auto', maxWidth: 'none' };

        // divOverlayContent.style.maxWidth = size.maxWidth;
        // divOverlayContent.style.maxHeight = size.maxHeight;
        // divOverlayContent.style.width = size.width;
        // divOverlayContent.style.height = size.height;

        // images[visibleIndex].style.maxHeight = size.maxHeight;
        // images[visibleIndex].style.maxWidth = size.maxWidth;
        // images[visibleIndex].style.width = size.width;
        // images[visibleIndex].style.height = size.height;
    }

    var resizeCallback = function(e) {
        // arrangeImageSize();
    }

    window.onresize = resizeCallback;

    divOverlay.onkeydown = function(e) {
        e.stopPropagation();
        e.preventDefault();

        if (e.keyCode == 37 || e.keyCode == 38) {
            displayPrevious();
        } else if (e.keyCode == 39 || e.keyCode == 40) {
            displayNext();
        } else if (e.keyCode == 27) {
            divOverlay.remove();
        }
    }
    document.body.appendChild(divOverlay);
    divOverlay.focus();
    // arrangeImageSize();
}
/*
**
* this wrapper created to develop and use common utilities for new Default Theme fields
*/
function createNewComponent(opts, func) {
    var newComponent = new newDefaultThemeHandler(opts);
    newDefaultThemeHandler.prototype.run = func;

    return newComponent;
}

function isIframeEmbedForm() {
    try {
        return ((window.self !== window.top) && (window.location.href.indexOf("isIframeEmbed") > -1));
    } catch (e) {
        return false;
    }
}

function isIframeEmbedFormPure() {
    try {
        return (window.self !== window.top);
    } catch (e) {
        return false;
    }
}

if(isIframeEmbedForm()) {
    document.querySelector('html').addClassName('isIframeEmbed');
    window.addEventListener('resize', function() {
        if (typeof JotForm.iframeHeightCaller === 'function') {
            JotForm.iframeHeightCaller();
        }
    });
}

if (isIframeEmbedFormPure()) {
    document.querySelector('html').addClassName('isEmbeded');
}

function newDefaultThemeHandler(opts) {
    this.type = opts.type || '';
    this.selector = opts.selector || '';
    this.targetElArr = null;

    // check dom elements based on paramater (dataType)
    this.initElement = function () {
        if (!this.selector) {
            return false;
        }

        if (this.type === 'field') {
            this.targetElArr = document.querySelectorAll('.form-line *' + this.selector);
        } else {
            this.targetElArr = document.querySelectorAll(this.selector);
        }

        if (this.targetElArr.length < 1) {
            return false;
        }

        return true;
    }

    this.render = function () {
        if (this.initElement()) {
            this.run(this.targetElArr);
        }
    }
}

function setEncryptedValue(a) {
    var field = a.field;
    var encryptedValue = a.encryptedValue;

    var sendAsHiddenField = [
        "control_number",
        "control_spinner",
        "control_email",
        "control_dropdown",
        "control_datetime",
        "control_matrix",
        "control_birthdate",
        "control_time",
        "control_scale",
        "control_rating",
    ];

    var fieldLine = field.closest('li.form-line');
    if (!fieldLine) {
        return;
    }

    var questionType = fieldLine.readAttribute('data-type');

    var isAlreadyEncrypted = field.hasAttribute('data-encrypted-answer') && field.getAttribute('data-encrypted-answer') == "true";
    if (isAlreadyEncrypted) {
        return;
    } else {
        field.dataset.encryptedAnswer = 'true'
    }

    //handle duplication of textareas, by forcefully encrypting the hidden previous sibling
    if (questionType == "control_textarea") {
        document.querySelectorAll('[name="'+field.name+'"]').forEach(function (f) {
            f.value = encryptedValue;
        });
        return;
    }

    var isMixedEmailType = questionType === 'control_mixed' && field.type === 'email';
    // Send these fields in a hidden field
    if (sendAsHiddenField.indexOf(questionType) !== -1 || field.tagName == "SELECT" || isMixedEmailType) {
        if (questionType == "control_scale" && !field.checked) { // send only checked scale radio (#912269)
            return;
        }
        appendHiddenInput(field.name, encryptedValue);
        if (questionType === 'control_matrix') {
            // remove name to avoid duplication
            field.name = "";
        }
        return;
    }
    // unmask
    if (field.getAttribute('data-masked')) {
        var maskValue = field.getAttribute('maskvalue');
        JotForm.setQuestionMasking(field, '', maskValue, true);
    }

    // Fill in the Blank Date unmask
    var dataFormatArr = ["month", "day", "year"];
    var exists = dataFormatArr.some(function(fieldTxt){
        if(field && field.id) {
            return (field.id.indexOf(fieldTxt) >= 0);
        }
    });

    if (field.getAttribute('data-format') || exists === true) {
        if (field.inputmask && field.inputmask.remove) {
            field.inputmask.remove();
        }
        field.setAttribute('placeholder', '');
    }

    // Change type of numbeer fields to replace filled value with encrypted answer
    if (field.type === 'number') {
        field.type = 'text';
    }

    if (questionType === 'control_textbox') {
        field = JotForm.removeValidations(field, "(Alphabetic|AlphaNumeric|Currency|Cyrillic|Email|Numeric|Url)");
    }

    field.value = encryptedValue;
}

function getFieldsToEncrypt() {
    var ignoredFields = [
        'control_captcha',
        'control_paypal',
        'control_stripe',
        'control_stripeCheckout',
        'control_stripeACH',
        'control_stripeACHManual',
        'control_2co',
        'control_paypalexpress',
        'control_authnet',
        'control_paypalpro',
        'control_braintree',
        'control_dwolla',
        'control_payment',
        'control_paymentwall',
        'control_square',
        'control_boxpayment',
        'control_eway',
        'control_bluepay',
        'control_worldpay',
        'control_firstdata',
        'control_paypalInvoicing',
        'control_payjunction',
        'control_worldpayus',
        'control_chargify',
        'control_cardconnect',
        'control_echeck',
        'control_bluesnap',
        'control_payu',
        'control_pagseguro',
        'control_moneris',
        'control_sofort',
        'control_skrill',
        'control_sensepass',
        'control_paysafe',
        'control_iyzico',
        'control_gocardless',
        'control_mollie',
        'control_paypalSPB',
        'control_cybersource',
        'control_paypalcomplete',
        'control_payfast'
    ];

    var fields = [];

    document.querySelectorAll('.form-textbox, .form-textarea, .form-radio, .form-checkbox, .form-dropdown, .form-number-input').forEach(function (field) {
        var fieldLine = field.closest('li.form-line');
        if (!fieldLine) {
            return;
        }

        var questionType = fieldLine.readAttribute('data-type');

        if (ignoredFields.indexOf(questionType) !== -1) {
            return;
        }

        var isMultipleSelectionInput = ['checkbox', 'radio'].include(field.type);

        if (isMultipleSelectionInput && !field.checked) {
            return;
        }

        if (questionType === 'control_matrix' && isMultipleSelectionInput) {
            return;
        }

        if (!field.value || (field.value.length > 300 && field.value.indexOf('==') == field.value.length - 2)) {
            return;
        }

        if (questionType === "control_textarea" && field.disabled) {
            return;
        }

        fields.push(field);
    });

    return fields;
}

function setUnencryptedValueToForm(field) {
    // duplicate this field, its value is needed in original unencrypted format
    var isUniqueField = JotForm.uniqueField && JotForm.uniqueField == field.id.replace(/\w+_(\d+)(.+)?/, '$1');
    var fieldId = field.id.replace(/[^_]+_(\d+)(.+)?/, '$1');
    if (JotForm.fieldsToPreserve.indexOf(fieldId) > -1 || isUniqueField) {
        var name = field.name.replace(/(\w+)(\[\w+\])?/, "$1_unencrypted$2");
        appendHiddenInput(name, field.value);
    }
}

function appendHiddenInput(name, value) {
    var form = document.querySelector('.jotform-form');
    if (form) {
        var input = document.createElement('input');
        if (!input) {
            return;
        }
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', name);
        input.value = value;
        form.appendChild(input);
    }
}

function shouldSubmitFormAfterEncrypt() {
    // payment fields that will submit the form on their own
    var selfSubmitFields = [
        "control_stripe",
        "control_braintree",
        "control_square",
        "control_eway",
        "control_bluepay",
        "control_mollie",
        "control_stripeACHManual",
        "control_pagseguro",
        "control_moneris"
    ];

    var hasSelfSubmitField = false;

    document.querySelectorAll('.form-textbox, .form-textarea, .form-radio, .form-checkbox, .form-dropdown, .form-number-input').forEach(function (field) {
        var fieldLine = field.closest('li.form-line');
        if (!fieldLine) {
            return;
        }
        var questionType = fieldLine.readAttribute('data-type');
        if (!hasSelfSubmitField) {
            hasSelfSubmitField = selfSubmitFields.indexOf(questionType) > -1;
        }
    });

    var submitFormAfterEncrypt = true;

    if (hasSelfSubmitField && JotForm.paymentTotal > 0 && JotForm.isPaymentSelected()) {
        submitFormAfterEncrypt = false;
    }

    return submitFormAfterEncrypt;
}

// We have to put this event because it's the only way to catch FB load
window.fbAsyncInit = JotForm.FBInit.bind(JotForm);
