/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/modal/_unwatch',function(){

	$('.mns-modal-template').off('keypress');

	$( '.modal-content-container span.mns-input-group span:contains("SUBJECT")' ).parent().find('select').off('change');

});