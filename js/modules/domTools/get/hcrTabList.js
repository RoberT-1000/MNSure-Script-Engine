/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/get/hcrTabList',function(){
	
	let returnVal = [],
			err = '';
	
	if( _engine.domTools.test.mainTabType('HCR Cases and Outcomes') )
		returnVal = $('#HCRCASEAPPWorkspaceSection-stc_tablist > .dijitTabListWrapper .dijitTab.visible');
	else err = "Could not gather tab list. Not on HCR Cases and Outcomes";
	
	if( err ) _engine.debug.warn( `[ get.hcrTabList() ] ${ err }` );
	
	return returnVal; 
	
});