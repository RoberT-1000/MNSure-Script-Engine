/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/modal/destroy',function( modalId ){

	// Unwatch actions
	_engine.ui.modal._unwatch( modalId );

	// Remove dom element
	$('[data-id="'+modalId+'"].custom-modal').remove();
	
	// Delete object from nocache
	delete _engine.storage.nocache.data.modal[modalId];
	
	// If all modals have been destroyed then this lightens the screen
	if( Object.getOwnPropertyNames( _engine.storage.nocache.data.modal ).length === 0 ){
		_engine.ui.dom.dimLights( false );
	}
	
	//Clear the prefill cache of stored data ( this will become a subgroup of active modal object )
	_engine.storage.prefillCache.clear();

});