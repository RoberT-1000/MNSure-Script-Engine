/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/modal/_button',function( button, modalId ){
	
	let modal = $('[data-id='+modalId+']');
	let action = $( button )[0].dataset.role;
	
	let modalParams = _engine.storage.nocache.data.modal[modalId];
	
	switch( action ){
		case "submit":
			switch( modalParams.role ){
				case 'query':
					if( _engine.ui.modal._validateModal( modalId ) ){
						_engine.ui.modal._storeParams( modalId, function( params ){
							_engine.caseWork.unifiedSearch._finish( modalId, params );
							_engine.ui.modal.destroy( modalId );
						});
					} else {
						_engine.debug.info("- * [ _engine.ui.modal._button( queries ) ]: Invalid modal submission. Correct highlighted fields.");
					}
					break;
				case 'case note':
					if( _engine.ui.modal._validateModal( modalId ) ){
						_engine.ui.modal._storeParams( modalId, function( params ){
							_engine.caseWork.note._completeNote( modalId, params );
							_engine.ui.modal.destroy( modalId );
						});
					} else {
						_engine.debug.info("- * [ _engine.ui.modal._button( case notes ) ]: Invalid modal submission. Correct highlighted fields.");
					}
					break;
				case 'timeout alert':
					_engine.events._persistSession();
					_engine.ui.modal.destroy( modalId );
					break;
				default:
					_engine.debug.warn('Modal role is not a recognized type');
					break;
			}
			break;
		case "close":
			_engine.ui.modal.destroy( modalId );
			break;
		case "":
			break;
		default:
			_engine.debug.error("- * Fail Reason: Modal Error [ _engine.ui.modal._button( _type ) ]: Type error or type not found.");
			break;

	}
	
});