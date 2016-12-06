/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('storage/debugStatus/set',function( _status ){

	window.localStorage.setItem( "mnsEngine_debugStatus", _status );

});