/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/get/icFrame/contactTab/caseNoteModal/_body',function(){
	
	let _activeModal = _engine.domTools.get.icFrame.contactTab.caseNoteModal._activeModal();
	
	if( _activeModal ) _activeModal = $( _activeModal ).contents().find('iframe.cke_wysiwyg_frame').contents().find('body');
	
	return _activeModal;
	
});