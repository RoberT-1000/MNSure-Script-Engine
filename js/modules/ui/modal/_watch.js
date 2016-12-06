/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/modal/_watch',function(){
	
	if( $('.mns-modal-template span.mns-input-group:has("input") input[type="text"]').length > 0 ){
		$('.mns-modal-template span.mns-input-group:has("input") input[type="text"]')[0].focus();
	}

	$('.mns-modal-template').keypress(function(e){ 

		switch( e.keyCode ){
			// Pressed the Enter Key
			case 13:
				//Is the form able to be submitted?
				if( $('.mns-modal-template').hasClass('submit-form') ){
					//Are you in a textarea trying to submit?
					if( !$( document.activeElement ).is('textarea') ){
						
						$('#mns-modal-actions a[data-role="submit"]').click();
						
					}
				}
				break;
			default:
				break;
		}

	});

	//Process onLoad Prefill
	_engine.ui.modal._processPrefill();
	_engine.ui.modal._setupAutoComplete();
	
	if( _engine.ui.modal._clustersActive() ){

		var _subject = $( '.modal-content-container span.mns-input-group span:contains("SUBJECT")' );

		if( _subject.length == 1 ){
			
			var _select = $( _subject ).parent().find('select');
				
			$( _select ).on('change',function(){
				
				_selectVal = $( _subject ).parent().find('select').val();
				
				_engine.ui.modal._changeActiveCluster( _selectVal );
				
				//Process dynamic Prefill on subject change
				_engine.ui.modal._processPrefill();
				_engine.ui.modal._setupAutoComplete();
				
			});

		}

	}

});