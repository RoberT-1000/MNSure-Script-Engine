/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('caseWork/note/write',function( _note ){

	_engine.caseWork.global.onCaseScreen(function(){
		
		// Define extra vars
		let _noteLocation = null, _validNotes = [];
		
		// Iterate over element array
		$.each( $('#script-launcher > ul > li:contains("Case Notes") ul li') ,function(k,v){ 
			_validNotes.push( $( v ).text().replace(/[.]/g,"").toLowerCase() ); 
		});
		
		// Check if the requested case note type is in the list of valid case notes
		if( $.inArray( _note.toLowerCase(), _validNotes) > -1 ){
			// Set the location to the dir that stores the html
			_noteLocation = "case notes/" + _note.toLowerCase() + ".html";
		}

		// If the request was invalid then error out the request as invalid
		if( _noteLocation !== null ){
			
			// Grabs the HTML and returns it as template variable
			_engine.advanced.getView( _noteLocation, function( template ){
				// Builds and renders an HTML modal
				_engine.ui.modal.build({
					title: _note,
					html: template,
					buttons: [
						'submit',
						'close'
					]
				},function(){
					// Stores the role of the modal in nocache until its destroyed
					_engine.storage.nocache.data.modal.role = 'case note';
				});
			});
		// Logs an error is the note cannot be found or displayed
		} else {
			_engine.debug.error("- * Fail Reason: [_engine.caseWork.note.write( note )]: A valid note type must be specified to run this command.")
		}
	}, true);
	
});