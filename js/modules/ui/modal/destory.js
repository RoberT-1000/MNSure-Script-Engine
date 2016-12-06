/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/modal/destroy',function(){

	_engine.ui.modal._unwatch();

	$('div.modal-overlay').remove();

	$('body').removeClass('modal');

	_engine.storage.prefillCache.clear();
	
	_engine.storage.nocache.data.modal = {};

});