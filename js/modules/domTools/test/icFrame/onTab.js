/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/test/icFrame/onTab',function( _t ){

	var current_tab = _engine.domTools.get.icFrame.icTabActive().text().replace("Close Tab", "").trim().toLowerCase();
	if( _t.toLowerCase() == current_tab ){
		return true;
	} else {
		return false;
	}

});