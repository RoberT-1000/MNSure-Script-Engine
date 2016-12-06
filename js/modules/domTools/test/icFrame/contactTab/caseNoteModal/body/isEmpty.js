/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/test/icFrame/contactTab/caseNoteModal/body/isEmpty',function(){
	
	var _modalBody = _engine.domTools.get.icFrame.contactTab.caseNoteModal._body();

	if( _modalBody !== false ){
		if( $( _modalBody ).text() === ""){
			return true;
		} else {
			return false;
		}
	} else {
		_engine.debug.warn("- * Fail Reason: [ _engine.domTools.test.icFrame.contactTab.caseNoteModal.body.isEmpty() ]: Case note body object is returning undefined. Not loaded.")
		return undefined;
	}
	
});