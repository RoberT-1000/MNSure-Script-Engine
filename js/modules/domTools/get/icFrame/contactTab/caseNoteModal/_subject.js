/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/get/icFrame/contactTab/caseNoteModal/_subject',function(){
	
	let _activeModal = _engine.domTools.get.icFrame.contactTab.caseNoteModal._activeModal();
	
	if( _activeModal ) _activeModal = $( _activeModal ).contents().find('input[title="Subject Mandatory"]');
	
	return _activeModal;
	
});