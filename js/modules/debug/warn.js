/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('debug/warn',function( msg ){
	
	if( _engine.storage.debugStatus.get() ){
		console.warn("_engine.debug: " + msg);
	}
	
});