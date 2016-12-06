/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('storage/_curamCreatedObject/get',function(){

	return $.parseJSON( window.localStorage.curam_selected_tab );

});