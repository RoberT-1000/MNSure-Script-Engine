/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/set/icFrame/contactTab/caseNoteModal/body/addLine',function( input ){
	
	if( typeof input !== 'string' ) input = "";
	
	let body = _engine.domTools.get.icFrame.contactTab.caseNoteModal._body(),
			line = $('<div>',{'html': input }),
			err = false;
	
	// If no body available log error
	!body ?
		err = "Could not add line to body" :
		// If body is available test if empty to add text or append text
		_engine.domTools.test.icFrame.contactTab.caseNoteModal.body.isEmpty() ?
			$( body ).html( line ):
			$( body ).append( line );
	
	if( err ) _engine.debug.warn( `[ caseNoteModal.body.addLine() ] ${ err }` );
	
});