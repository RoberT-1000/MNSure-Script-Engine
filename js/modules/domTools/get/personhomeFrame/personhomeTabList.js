/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/get/personhomeFrame/personhomeTabList',function(){

	let returnVal = false,
		err = false;
	
	if( _engine.domTools.test.hcrTabType() === 'Person Page' )
		returnVal = $( _engine.domTools.get.hcrTabFrame() ).find('div.dijitTabNoLayout[role="tablist"] > div.dijitTab.visible');
	else err = 'Attemping to gather tab list, curam tab params unavailable';
	
	if( err ) _engine.debug.warn( `[icTabList] ${ err }` );
	
	return returnVal;

});