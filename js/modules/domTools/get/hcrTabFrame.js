/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/get/hcrTabFrame',function( _tab ){

	typeof _tab == 'undefined' ? 
		_tab = _engine.domTools.get.hcrTabActive() : 
		typeof _tab[0] != 'undefined' ?
			_tab = _tab[0]:
			_tab = _tab;

	var _id = $( _tab ).attr( 'widgetid' ).split('-')[1].split('_');
	var _f = _id[2] + "_" + _id[3] + "_" + _id[4] + "_" + _id[5];

	return $('[widgetid="'+_f+'"]')[0];
	
});