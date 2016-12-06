/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/set/icFrame/contactTab/caseNoteModal/body/addLine',function( _s ){
	
	_engine.debug.info("- * [ _engine.domTools.set.icFrame.contactTab.caseNoteModal.body.addLine() ] Started | Input: " + _s);

	var _modalBody = _engine.domTools.get.icFrame.contactTab.caseNoteModal._body();

	if(typeof $( _modalBody ) != 'undefined'){
		
		_engine.debug.info("- * [ _engine.domTools.set.icFrame.contactTab.caseNoteModal.body.addLine() ] Located modal body");

		//Wrap input in div tags
		var line = $('<div>',{'html':_s});
		
		//Check if body is empty
		
		if(_engine.domTools.test.icFrame.contactTab.caseNoteModal.body.isEmpty()){
			
			_engine.debug.info("- * [ _engine.domTools.set.icFrame.contactTab.caseNoteModal.body.addLine() ] Body empty. Writing Line.");
			
			//If empty, set first line
			
			$( _modalBody ).html( line );
			
		} else {
			
			_engine.debug.info("- * [ _engine.domTools.set.icFrame.contactTab.caseNoteModal.body.addLine() ] Body not empty. Writing Line.");
			
			//If not empty, add to body
			$( _modalBody ).append( line );

		}
		
	} else {
		_engine.debug.warn("- * Fail Reason: [ _engine.domTools.set.icFrame.contactTab.caseNoteModal.body.addLine() ]: Could not add line. Body returning 'undefined'.")
	}

	_engine.debug.info("- * [ _engine.domTools.set.icFrame.contactTab.caseNoteModal.body.addLine() ] Complete");
	
});