/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('caseWork/merlin/destroy',function( id ){
	
	$('[data-id="'+id+'"]').remove();
	
	delete _engine.storage.nocache.data.modal[id];
	
	if( Object.getOwnPropertyNames( _engine.storage.nocache.data.modal ).length === 0 ) _engine.ui.dom.dimLights( false );

});