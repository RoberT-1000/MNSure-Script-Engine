/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('storage/_curamCreatedObject/get',function(){
	
	let rtn = false;
	
	if( typeof curam.tab.getSelectedTab() === 'object' ) rtn = curam.tab.getSelectedTab().params.tabDescriptor;
	
	_engine.debug.warn('[storage/_curamCreatedObject/get] function useage is deprecated. Replaced by internal function. Please update function.');
	
	return rtn;

});