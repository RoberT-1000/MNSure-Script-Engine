/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('storage/modalParams/set',function( _params ){

	var encodedParams = encodeURIComponent( _params );

	window.localStorage.setItem( "mnsEngine_modalParams", encodedParams );

});