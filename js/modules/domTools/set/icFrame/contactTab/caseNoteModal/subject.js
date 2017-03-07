/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/set/icFrame/contactTab/caseNoteModal/subject',function( input ){

	let subject = _engine.domTools.get.icFrame.contactTab.caseNoteModal._subject(),
			err = false;
	
	if( subject ) subject.val( input );
	else err = "Could not add subject to modal"
	
	if( err ) _engine.debug.warn( `[ caseNoteModal.body.subject() ] ${ err }` );
	
});