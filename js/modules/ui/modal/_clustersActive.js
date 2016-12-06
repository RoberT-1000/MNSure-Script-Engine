/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/modal/_clustersActive',function(){

	let _modal = $('div.mns-modal-template');

	if( _modal.length == 1 ){

		var _clustersEnabled = $( _modal ).attr('data-input-clusters');

		_clustersEnabled == "true" ? _clustersEnabled = true : _clustersEnabled = false;

		return _clustersEnabled;

	}

});