/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('caseWork/global/onCaseScreen',function( callback, showModal ){
	
	if( typeof showModal === 'undefined' ) showModal = false;

	_engine.domTools.test.hcrTabActiveIsIC(function( result ){
		
		if( result ) {
			if ( typeof callback === 'function' ) 
				callback();
		}
		else {
			
			console.log( showModal );
			
			if( showModal ){
			
				_engine.advanced.getView( "error/incorrect launch location.html",function(template){
					_engine.ui.modal.build({
						title: "Case Note Error - Incorrect Launch Screen",
						html: template,
						buttons: [
							'close'
						]
					},function( props ){
						
						// Stores the role of the modal in nocache until its destroyed
						_engine.storage.nocache.data.modal[props.id].role = 'error';
						
					});
				});
				
			}
			
		}
		
	});

});