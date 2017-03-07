/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/get/hcrTabActive',function(){
	
	let returnVal = false,
			tab;
	
	if( _engine.domTools.test.mainTabType() === 'HCR Cases and Outcomes')
		tab = $('#HCRCASEAPPWorkspaceSection-stc > div.dijitLayoutContainer > [data-dojo-attach-point="tablistWrapper"] > [role="tablist"] > [role="presentation"].dijitChecked')[0];
	
	if( tab ) returnVal = tab;
	
	return returnVal;
	
});