/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/get/hcrTabFrame',function( _tab ){
	
	let returnVal = false;
	
	// On HCR Tab
	if( _engine.domTools.test.mainTabType('HCR Cases and Outcomes') )
		// If a tab is open
		if( _engine.domTools.get.hcrTabList().length > 0 ) returnVal = curam.tab.getSelectedTab().domNode;
	
	return returnVal;
	
});