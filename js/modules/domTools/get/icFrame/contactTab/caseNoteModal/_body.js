/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/get/icFrame/contactTab/caseNoteModal/_body',function(){
	
	var _activeModal = _engine.domTools.get.icFrame.contactTab.caseNoteModal._activeModal();

	if( _activeModal !== false ){

		return $( _activeModal ).contents().find('iframe.cke_wysiwyg_frame').contents().find('body');

	} else {

		return false;

	}
	
});