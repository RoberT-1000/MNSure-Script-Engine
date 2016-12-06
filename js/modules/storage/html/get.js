/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('storage/html/get',function(){

	if(typeof window.localStorage.mnsEngine_html != 'undefined'){
		return $.parseHTML( window.localStorage.mnsEngine_html );
	} else {
		return false;
	}

});