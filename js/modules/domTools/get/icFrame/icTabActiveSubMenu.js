/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/get/icFrame/icTabActiveSubMenu',function(){
	
	if(_engine.domTools.test.hcrTabActiveIsIC()){
		var _tp = _engine.domTools.get.hcrTabFrame();
		return $( _tp ).find('div.dijitStackContainer-child.dijitVisible');
	}
	
});