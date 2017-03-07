/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/modal/_clustersActive',function( modalID ){
	
	let modal = '[data-id="' + modalID + '"]',
			returnVal = false;
	
	if( $( modal ).length ===  1 && $( modal + ' div.mns-modal-template' ).attr('data-input-clusters') === 'true')
		returnVal = true;
	
	return returnVal;

});