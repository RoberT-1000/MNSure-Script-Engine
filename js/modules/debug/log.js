/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('debug/log',function( msg ){
	
	if( _engine.storage.debugStatus.get() ){
		console.log("_engine.debug: " + msg);
	}
	
});