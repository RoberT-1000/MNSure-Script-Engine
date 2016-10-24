/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */

// 
//     __  ____   _______    _____           _       __     ______            _          
//    /  |/  / | / / ___/   / ___/__________(_)___  / /_   / ____/___  ____ _(_)___  ___ 
//   / /|_/ /  |/ /\__ \    \__ \/ ___/ ___/ / __ \/ __/  / __/ / __ \/ __ `/ / __ \/ _ \
//  / /  / / /|  /___/ /   ___/ / /__/ /  / / /_/ / /_   / /___/ / / / /_/ / / / / /  __/
// /_/  /_/_/ |_//____/   /____/\___/_/  /_/ .___/\__/  /_____/_/ /_/\__, /_/_/ /_/\___/ 
//                                        /_/                       /____/              
// 

var _engine = {
	
	//**************//
	//*   Events   *//
	//**************//
	
	events: {
		
		/* Cannot move _startUp into a module
		/********************************************************************/
		
		_startUp: function() {
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

				var version = _engine.storage.config.get('commit.current');

				version === 'master' ?
					_engine.storage.debugStatus.set( false ):
					_engine.storage.debugStatus.set( true );

				_engine.storage.prefillCache.clear();
				
				if( version !== 'master' && version !== 'beta' ){
					
					$.ajax({
						url: 'https://api.github.com/rate_limit?access_token=e4ad5080ca84edff38ff06bea3352f30beafaeb1',
						dataType: 'json',
						async: false,
						success: function( data ){
							version += " | " + data.resources.core.remaining;
						}
					});
					
				}
				
				_engine.ui.topNotification(`Script Library: ${version}`);

				//Build out menu
				_engine.ui.scriptMenu.refresh();
				
				$(document).on('click','.dijitTab',function(){
					_engine.events.tabWatcher( this );
				});
				
				$('.scripts-link, .center-box').removeAttr('style');
				
			});
			
		},

	},
	
	//*************//
	//*  Storage  *//
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
			
			addModule: function( modulePath ){
				let commit = _engine.storage.config.get('commit.current');
				
				if( commit === 'master' || commit === 'beta' ){
					
				}
				
			}
		}
		
	},
	
	//**************//
	//*   Module   *//
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
					
					let remaining = _engine.storage.config.get('advanced.modules.unloaded');
					
				}
			});

		},
		
		/* Performs loading of all modules declared in the config */
		
		loadRequired( callback, dirArray, moduleArray ){

			let api = 'https://api.github.com/repos/lpshanley/MNSure-Script-Engine/contents/';

			let refParam = "?access_token=e4ad5080ca84edff38ff06bea3352f30beafaeb1&ref=" + _engine.storage.config.get('commit.current');

			let pathArray = [];
			
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
				
			if( pathArray.length > 0 ) _engine.module.loadRequired( callback, pathArray, moduleArray  );
			else if ( pathArray.length === 0 ){
				
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
			clearInterval(_engine.temp.jQloaded);
			delete _engine.temp;
		} else {
			_engine.temp.count++;
		}
	} else {
		clearInterval(_engine.temp.jQloaded);
	}
},25);

_engine.temp.jQloaded;