/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('caseWork/merlin/destroy',function( id ){
	
	$('[data-merlin-id="merlinModal-'+id+'"]').remove();
	$('[data-merlin-id="'+id+'"]').remove();
	
	_engine.storage.nocache.data.merlin = {};

});