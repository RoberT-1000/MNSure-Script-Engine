/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('caseWork/note/_completeNote',function(){
	
	_engine.caseWork.note.openCuramNote(function(){

		_count2 = 0;

		var _gatherParams = setInterval(function(){

			//Setup loop to gather modal params

			if( _count2 <= _engine.advanced._vars.iterations ){

				_engine.debug.info("- * Attempting to gather params [ attempt: "+ _count2 +" ]");

				if( _engine.storage.modalParams.get() !== false ){

					//Perform actions on the stored params

					_engine.debug.info("- * Params Gathered");

					$.each( _engine.storage.modalParams.get(),function(k,v){
						if( v.descriptor.toLowerCase() == "subject" ){

							_engine.debug.info("- * SUBJECT: [ " + v.value + " ]");

							_engine.domTools.set.icFrame.contactTab.caseNoteModal.subject( v.value );

						} else {

							var line = "";

							if( v.descriptor !== "" && v.value === "" ){
								line += v.descriptor;
							} else if( v.descriptor === "" && v.value !== "" ){
								line += v.value;
							} else if( v.descriptor !== "" && v.value !== "" ){
								line += v.descriptor + ": " + v.value;
							}

							_engine.debug.info("- * BODY: [ " + line + " ]");

							_engine.domTools.set.icFrame.contactTab.caseNoteModal.body.addLine( line );

						}

					});

					_engine.debug.info("- * Clearing params");

					_engine.storage.modalParams.clear();

					clearInterval( _gatherParams );

				}

				++_count2;

			} else {

				_engine.debug.info("- * Fail Reason: Error [_engine.caseWork.note._completeNote()]: Failed to gather params.");							
				clearInterval( _gatherParams );

			}

		}, _engine.advanced._vars.timeout);

		_gatherParams;

	});
	/*
	_engine.navigation.icTabs.icTabNavi("contact",function( contactFrame ){

		$( contactFrame ).find('a[title="New"]')[0].click();

		_engine.debug.info("- * Clicked new case note");

		//OPEN MODAL COUNTER
		_count1 = 0;

		var _openModal = setInterval(function(){

			//Setup loop to test for the modal being open

			_engine.debug.info("- * Attempting to target modal window [ attempt: "+ _count1 +" ]");

			if(_count1 <= _engine.advanced._vars.iterations){

				// _openModal interval has not timed out

				if(_engine.domTools.get.icFrame.contactTab.caseNoteModal._activeModal() !== false){

					_engine.debug.info("- * Targeted modal");

					//Gather Params now that window is open

					//Start param gather counter
					_count2 = 0;

					var _gatherParams = setInterval(function(){

						//Setup loop to gather modal params

						if( _count2 <= _engine.advanced._vars.iterations ){

							_engine.debug.info("- * Attempting to gather params [ attempt: "+ _count2 +" ]");

							if( _engine.storage.modalParams.get() !== false ){

								//Perform actions on the stored params

								_engine.debug.info("- * Params Gathered");

								$.each( _engine.storage.modalParams.get(),function(k,v){
									if( v.descriptor.toLowerCase() == "subject" ){

										_engine.debug.info("- * SUBJECT: [ " + v.value + " ]");

										_engine.domTools.set.icFrame.contactTab.caseNoteModal.subject( v.value );

									} else {

										var line = "";

										if( v.descriptor !== "" && v.value === "" ){
											line += v.descriptor;
										} else if( v.descriptor === "" && v.value !== "" ){
											line += v.value;
										} else if( v.descriptor !== "" && v.value !== "" ){
											line += v.descriptor + ": " + v.value;
										}

										_engine.debug.info("- * BODY: [ " + line + " ]");

										_engine.domTools.set.icFrame.contactTab.caseNoteModal.body.addLine( line );

									}

								});

								_engine.debug.info("- * Clearing params");

								_engine.storage.modalParams.clear();

								clearInterval( _gatherParams );

							}

							++_count2;

						} else {

							_engine.debug.info("- * Fail Reason: Error [_engine.caseWork.note._completeNote()]: Failed to gather params.");							
							clearInterval( _gatherParams );

						}

					}, _engine.advanced._vars.timeout);

					_gatherParams;

					//Clear wrapping interval to escape it
					clearInterval( _openModal );

				}

				//Modal window is not yet open advance counter

				++_count1;

			} else {

				//_openModal Interval has timed out clear interval

				_engine.debug.error("- * Fail Reason: [_engine.caseWork.note._completeNote()]: Failed to open or target case note modal. Request timed out.");							
				clearInterval( _openModal );

			}

		}, _engine.advanced._vars.timeout);

		_openModal;

	});
	*/
});