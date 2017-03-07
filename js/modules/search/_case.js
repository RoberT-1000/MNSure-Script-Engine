/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('search/_case',function( callback ){
	
	_engine.navigation.mainTabs.mainTabNavi('hcr',function(){
		
		let searchTab = _engine.domTools.get.hcrTabListTypeQuery("Case Search");
		
		if( searchTab ) _engine.tools.closeTabHCR( searchTab );
		
		curam.ui.SectionShortcutsPanel.handleClickOnAnchorElement("Case_search1",""); 
		
		_engine.advanced.waitForDom({function:_engine.domTools.get.hcrTabListTypeQuery,query:'Case Search'},function( tab ){

			tabID = $( tab ).attr('widgetid').replace('HCRCASEAPPWorkspaceSection-stc_tablist_','');
			
			_engine.advanced.waitForDom('#' + tabID + ' iframe',function( frame ){
				
				_engine.advanced.onTabLoaded( $( frame ).attr('id'), function(){
					
					if( typeof callback === 'function' ) callback();
					
				});
				
			});
		
		});
		
	});
	
});