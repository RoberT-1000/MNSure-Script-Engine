/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/get/icFrame/contactTab/caseNoteModal/_activeModal',function( logMsg ){
	
	if( typeof logMsg !== 'boolean' ) logMsg = true;
	
	var _modalFrame = $('iframe[title="Modal Frame - New Note"].curam-active-modal');

	if( typeof _modalFrame[0] != "undefined" ){

		var _bodyFrame = $( _modalFrame ).contents().find('iframe.cke_wysiwyg_frame');

		//Modal is open
		if ( typeof _bodyFrame[0] != 'undefined' ){
			
			var _modalBody = $( _bodyFrame ).contents().find('body');
			
			if( _modalBody.length > 0 ){
				
				//Modal is loaded
					_engine.debug.info("- * [ _engine.domTools.get.icFrame.contactTab.caseNoteModal._activeModal() ]: Modal is open and fully loaded.");
				return _modalFrame;
				
			} else {
				if(logMsg){
				_engine.debug.warn("- * Fail Reason: [ _engine.domTools.get.icFrame.contactTab.caseNoteModal._activeModal() ]: Modal is open but not fully loaded.");
				}
				return false;
			}
			
		} else {
			if(logMsg){
			_engine.debug.warn("- * Fail Reason: [ _engine.domTools.get.icFrame.contactTab.caseNoteModal._activeModal() ]: Modal is open but not fully loaded.");
			}
			return false;
		}
	} else {
		if(logMsg){
		_engine.debug.warn("- * Fail Reason: [ _engine.domTools.get.icFrame.contactTab.caseNoteModal._activeModal() ]: Unable to target an open case note modal.");
		}
		return false;
	}
	
});