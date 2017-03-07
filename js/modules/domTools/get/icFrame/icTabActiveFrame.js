/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/get/icFrame/icTabActiveFrame',function(){
	
	if( _engine.domTools.test.hcrTabActiveIsIC() ) {
		return $( _engine.domTools.get.hcrTabFrame() ).find('.content-area-container iframe').contents().find('body');
	}
	
});