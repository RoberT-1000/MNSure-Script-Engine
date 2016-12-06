/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('debug/info',function( msg ){
	
	if( _engine.storage.debugStatus.get() ){
		console.info("_engine.debug: " + msg); 
	}
	
});