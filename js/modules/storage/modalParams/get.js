/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('storage/modalParams/get',function(){

	if(typeof window.localStorage.mnsEngine_modalParams != 'undefined'){

		var decodedParams = decodeURIComponent( window.localStorage.mnsEngine_modalParams );

		return $.parseJSON( decodedParams );
	} else {
		return false;
	}

});