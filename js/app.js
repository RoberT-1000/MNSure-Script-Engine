/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */

// 
//     __  ____   _______    _____           _       __     ______            _          
//    /  |/  / | / / ___/   / ___/__________(_)___  / /_   / ____/___  ____ _(_)___  ___ 
//   / /|_/ /  |/ /\__ \    \__ \/ ___/ ___/ / __ \/ __/  / __/ / __ \/ __ `/ / __ \/ _ \
//  / /  / / /|  /___/ /   ___/ / /__/ /  / / /_/ / /_   / /___/ / / / /_/ / / / / /  __/
// /_/  /_/_/ |_//____/   /____/\___/_/  /_/ .___/\__/  /_____/_/ /_/\__, /_/_/ /_/\___/ 
//                                        /_/                       /____/              
// 

var _engine = {
	
	//**************//
	//*   Events   *//
	//**************//
	
	events: {
		
		/* Cannot move _startUp into a module
		/********************************************************************/
		
		_startUp: function() {
			
			let online = true,
					version = _engine.storage.config.get('commit.current');
			
			if( !online ) online = ( ['master'].indexOf( version ) < 0 );
			
			if( online ) {
			
				/* Runs the callback after all modules have been requested */
				_engine.module.loadRequired(function(){
					_engine.debug.info('All modules have loaded.');

					_engine.tools.loadAddons.run( _engine.tools.loadAddons.config );

					/* Loaded
					/* Scripts Main Button
					========================*/

					//********** Right Click **********//
					// Performs Quick Load of Searches

					$('#script-launcher a').contextmenu(function(e){

							// Prevent context menu pop-up
						e.preventDefault();
							// Open Case Search
						_engine.search._case();

							// Open Person Search
						_engine.search._person();

					});

					version === 'master' ?
						_engine.storage.debugStatus.set( false ):
						_engine.storage.debugStatus.set( true );

					_engine.storage.prefillCache.clear();

					_engine.ui.topNotification.add(`Script Library: ${version}`);

					//Dynamic Ticket Notifs (10s)
					setInterval(function(){

						_engine.ui.topNotification.remove("Session Expiry");
						_engine.ui.topNotification.add( `Session Expiry - ${ _engine.advanced._sessionExpiry() }` );

					},10000);

					if( version !== 'master' && version !== 'beta' ){

						$.ajax({
							url: 'https://api.github.com/rate_limit?access_token=e4ad5080ca84edff38ff06bea3352f30beafaeb1',
							dataType: 'json',
							async: false,
							success: function( data ){
								_engine.ui.topNotification.add(`Calls Remaining: ${data.resources.core.remaining}`);
							}
						});

					}

					_engine.ui.dom.prepUI(function(){

						_engine.ui.topNotification.run();

							//Build out menu
						_engine.ui.scriptMenu.refresh();

						_engine.events.domMonitor();

						$('.scripts-link, .center-box').removeAttr('style');

						_engine.advanced.setupTimeoutAlert();
					
					});
					
				});
			
			}
			else {
				$('.center-box').html("<span>Script Library: Unavailable</span>");
				$('.center-box').removeAttr('style');
				if( _engine.temp.jQloaded ) clearInterval(_engine.temp.jQloaded);
				_engine = undefined;
			}
			
		},

	},
	
	//*************//
	//*  Storage  *//
	//*************//
	
	storage: {
		
		/* Config Storage Model and _data cannot be relocated */
		
		_data: {
			encode: function( input ){
				return encodeURIComponent( JSON.stringify( input ) );
			},
			decode: function( input ){
				return $.parseJSON( decodeURIComponent( input ) );
			}
		},
		
		config: {
			get: function( reqString ){
				
				let config = _engine.storage._data.decode( window.localStorage.mnsEngine_Config );
				
				if(typeof reqString === "string"){ 
					
					let reqArray = reqString.split('.');
					
					$.each( reqArray, function(k,v){
						
						typeof config[v] === "undefined" ?
							config = false :
							config = config[v];
						
					});
				}
				
				return config;
				
			},
			set: function( obj ){
				
				let config = _engine.storage.config.get();

				$.extend(true,config,obj);

				window.localStorage.mnsEngine_Config = _engine.storage._data.encode( config );
				
			}
		},
		
		fallbackCache: {
			
			get: function(){
				
				return _engine.storage._data.decode( window.localStorage.mnsEngine_fallbackCache );
				
			},
			
			addModule: function( module ){
				
				if( typeof module !== 'undefined' ){

					let currentCommit = _engine.storage.config.get('commit.current');

					let fallbackCache = _engine.storage.fallbackCache.get();

					fallbackCache[currentCommit].modules.push( module );

					window.localStorage.mnsEngine_fallbackCache = _engine.storage._data.encode( fallbackCache );

				}
				
			},
			
			fallbackStatus: function( status ){
				
				let currentCommit = _engine.storage.config.get('commit.current');
				
				let fallbackCache = _engine.storage.fallbackCache.get();
				
				let response;
				
				if( _engine.storage.fallbackCache.cacheable() ){
				
					if(typeof status === 'boolean') {

						fallbackCache[currentCommit].current = status;

						window.localStorage.mnsEngine_fallbackCache = _engine.storage._data.encode( fallbackCache );

					}
					
					response = fallbackCache[currentCommit].current;
					
				} else {
					
					response = false;
					
				}
				
				return response;
				
			},
			
			cacheable: function(){

				let currentCommit = _engine.storage.config.get('commit.current');
				
				return ( ['master','beta'].indexOf( currentCommit ) > -1 );
				
			}
			
		}
		
	},
	
	//**************//
	//*   Module   *//
	//**************//
	
	module: {
		
		/* Allows definition of functions in modular files */
		
		define: function( dir, module ){

			dir = dir.split('/');
			let last = (dir.length - 1);

			let obj = _engine;

			$.each(dir,function(key,value){

				if(typeof obj[value] === 'undefined') obj[value] = {};

				key === last?
					obj[value] = module:
					obj = obj[value];

			});

		},
		
		/* Loads a specified script file */
		
		require: function( module ){
			
			let baseUrl = _engine.storage.config.get('advanced.baseUrl');
			
			let req = baseUrl + module;
			
			$.ajax({
				dataType: 'script',
				url: req,
				success: function(){
					
					_engine.module._markLoaded();
					
					if( _engine.storage.fallbackCache.cacheable() ){
						if(_engine.storage.fallbackCache.get()[_engine.storage.config.get('commit.current')].modules.indexOf( module ) === -1 ){
							_engine.storage.fallbackCache.addModule( module );
						}
					}
					
					let remaining = _engine.storage.config.get('advanced.modules.unloaded');
					
				}
			});
		},
		
		/* Performs loading of all modules declared in the config */
		
		loadRequired( callback, dirArray, moduleArray ){
			
			let pathArray = [];
			
			if(_engine.storage.fallbackCache.fallbackStatus()){
				
				console.info('Fallback Cache is current. Using cache to load file list.');
				
				moduleArray = _engine.storage.fallbackCache.get()[_engine.storage.config.get('commit.current')].modules;
				
			} else {
				
				if(typeof moduleArray === 'undefined'){
					if( _engine.storage.fallbackCache.cacheable() ){
						console.info('Fallback Cache is out of date. Updating fallback cache.');
					}
					else {
						console.info('Script verion is not cacheable. Requesting module list from github.');
					}
				}
				
				let api = 'https://api.github.com/repos/lpshanley/MNSure-Script-Engine/contents/';
			
				let refParam = "?access_token=e4ad5080ca84edff38ff06bea3352f30beafaeb1&ref=" + _engine.storage.config.get('commit.current');

				if(typeof dirArray === 'undefined') dirArray = ['js/modules/'];
				if(typeof moduleArray === 'undefined') moduleArray = [];

				$.each( dirArray, function(key, value){

					let req = api + value;

					if(req.charAt( req.length-1 ) === '/') req = req.substring(0,req.length-1); 

					req += refParam;

					$.ajax({
						async: false,
						dataType: 'json',
						url: req,
						success: function(data){
							$.each(data,function(key,value){

								if( value.type === 'file' ) moduleArray.push( value.path );
								if( value.type === 'dir' ) pathArray.push( value.path );

							});
						}
					});

				});

				if( pathArray.length > 0 ) _engine.module.loadRequired( callback, pathArray, moduleArray );
				
			}
			
			if( pathArray.length === 0 ){
				
				_engine.module._defineUnloaded( moduleArray.length );
				
				$.each(moduleArray, function(key, module){
					
					_engine.module.require( module );
					
				});
				
				if( typeof callback === 'function'){
					var counter = 0;
					var loadModules = setInterval(function(){
						if( counter < 400 ){
							var unloaded = _engine.storage.config.get('advanced.modules.unloaded');
							if (unloaded === 0){
								callback();
								clearInterval(loadModules);
							}
							counter++;
						} else {
							clearInterval( loadModules );
						}
					},25);
					
					loadModules;
					
				}
			}
		},
		
		/* Set Counter to test that all scripts have loaded */
		
		_defineUnloaded: function( remainder ){
			_engine.storage.config.set({
				advanced: {
					modules: {
						unloaded: remainder
					}
				}
			});
		},
		
		/* Reduce counter as scripts load */
		
		_markLoaded: function(){
			let unloaded = _engine.storage.config.get('advanced.modules.unloaded') - 1;
			
			if( unloaded === 0 ){
				_engine.storage.fallbackCache.fallbackStatus( true );
			}
			
			_engine.module._defineUnloaded( unloaded );
			
		}
		
	}
	
} 

/* [Program Start] Runs the startup function 
/********************************************************************/
_engine.temp = {count:0};

_engine.temp.jQloaded = setInterval(function(){

	if( _engine.temp.count < 400 ){
		if( typeof $ === 'function' ){
			_engine.events._startUp();
			if( _engine ){
				if( _engine.temp ){
					if( _engine.temp.jQloaded ) clearInterval(_engine.temp.jQloaded);
					delete _engine.temp;
				}
			}
		} else {
			_engine.temp.count++;
		}
	} else {
		clearInterval(_engine.temp.jQloaded);
	}
},25);

_engine.temp.jQloaded;