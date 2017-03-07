/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/modal/_watch',function( modalTarget ){
	
	let modal = $('[data-id='+modalTarget+']');

	if( $(modal).find('span.mns-input-group:has("input") input[type="text"]').length > 0 ){
		$(modal).find('span.mns-input-group:has("input") input[type="text"]')[0].focus();
	}
	
	$(modal).find('.action-set').on('click', 'a',function( e ){
		_engine.ui.modal._button( $(this), modalTarget );
	});
	
	$('[data-id='+modalTarget+'] .mns-modal-template').keypress(function(e){ 

		switch( e.keyCode ){
			// Pressed the Enter Key
			case 13:
				//Is the form able to be submitted?
				if( $('[data-id='+modalTarget+'] .mns-modal-template').hasClass('submit-form') ){
					//Are you in a textarea trying to submit?
					if( !$( document.activeElement ).is('textarea') ){
						
						$('[data-id='+modalTarget+'] .action-set a[data-role="submit"]').click();
						
					}
				}
				break;
			default:
				break;
		}

	});
	
	//Process onLoad Prefill
	_engine.ui.modal._processPrefill( modalTarget );
	_engine.ui.modal._setupAutoComplete( modalTarget );

	if( _engine.ui.modal._clustersActive( modalTarget ) ){

		var _subject = $( '[data-id='+modalTarget+'] .modal-content-container span.mns-input-group span:contains("SUBJECT")' );

		if( _subject.length == 1 ){
			
			var _select = $( _subject ).parent().find('select');
				
			$( _select ).on('change',function(){
				
				let _selectVal = $( _subject ).parent().find('select').val();
				
				_engine.ui.modal._changeActiveCluster( modalTarget, _selectVal );
				
				//Process dynamic Prefill on subject change
				_engine.ui.modal._processPrefill( modalTarget );
				_engine.ui.modal._setupAutoComplete( modalTarget );
				
			});

		}

	}

});