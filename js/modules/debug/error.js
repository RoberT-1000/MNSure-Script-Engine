/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('debug/error',function( msg ){
	
	if( _engine.storage.debugStatus.get() ){
		console.error("_engine.debug: " + msg);
	}
	
});