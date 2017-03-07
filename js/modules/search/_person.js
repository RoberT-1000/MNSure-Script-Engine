/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('search/_person',function( callback ){
	
	_engine.navigation.mainTabs.mainTabNavi('hcr',function(){
		
		let searchTab = _engine.domTools.get.hcrTabListTypeQuery("Person Search"),
				tabID;
		
		if( searchTab ) _engine.tools.closeTabHCR( searchTab );
		
		curam.ui.SectionShortcutsPanel.handleClickOnAnchorElement("Person_search1","");
		
		_engine.advanced.waitForDom({function:_engine.domTools.get.hcrTabListTypeQuery,query:'Person Search'},function( tab ){

			tabID = $( tab ).attr('widgetid').replace('HCRCASEAPPWorkspaceSection-stc_tablist_','');

			_engine.advanced.waitForDom('#' + tabID + ' iframe',function( frame ){
				
				_engine.advanced.onTabLoaded( $( frame ).attr('id'), function(){
					
					if( typeof callback === 'function' ) callback();
					
				});
				
			});
		
		});
		
	});
	
});