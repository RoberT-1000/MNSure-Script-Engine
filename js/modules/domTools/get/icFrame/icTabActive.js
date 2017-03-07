/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/get/icFrame/icTabActive',function(){
	
	let returnVal = false;
	
	if( _engine.domTools.test.hcrTabActiveIsIC() ) returnVal = $( curam.tab.getSelectedTab().domNode ).find('div.dijitTabNoLayout[role="tablist"] > div.dijitTab.visible.dijitTabChecked.dijitChecked');
	
	return returnVal;
	
});