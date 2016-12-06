/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('tools/closeTabHCR',function( _tab ){
	
	typeof _tab == 'undefined' ? _tab = _engine.domTools.get.hcrTabActive() : _tab = _tab[0];

	$( _tab ).find('span.dijitTabCloseButton').click();
	
});