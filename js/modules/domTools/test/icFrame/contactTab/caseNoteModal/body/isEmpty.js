/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/test/icFrame/contactTab/caseNoteModal/body/isEmpty',function(){
	
	let _modalBody = _engine.domTools.get.icFrame.contactTab.caseNoteModal._body(),
			returnVal = false;

	if( _modalBody && $( _modalBody ).text() === "" ) returnVal = true;
	
	return returnVal;
	
});