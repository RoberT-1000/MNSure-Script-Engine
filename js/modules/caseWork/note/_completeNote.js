/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('caseWork/note/_completeNote',function( modalId, params ){
	
	_engine.caseWork.note.openCuramNote(function(){
		
		if( typeof params === 'undefined' ) params = _engine.storage.nocache.data.modal[modalId].data.params;
		
		$.each( params, function( k, v ){
			
			let msg = '';
			
			if( v.descriptor.toLowerCase() === "subject" ){
				
				msg = "- * SUBJECT: [ " + v.value + " ]";
				
				_engine.domTools.set.icFrame.contactTab.caseNoteModal.subject( v.value );

			} else {
				
				let line = '';
				
				if( v.value ){
					if( v.descriptor ) 
						line += v.descriptor + ": " + v.value;
					else line += v.value;
				}
				else if ( v.descriptor && v.required ) line += v.descriptor;

				if(line) msg = "- * BODY: [ " + line + " ]";

				_engine.domTools.set.icFrame.contactTab.caseNoteModal.body.addLine( line );

			}
			
			if(msg) _engine.debug.info( msg );
		
		});

	});

});