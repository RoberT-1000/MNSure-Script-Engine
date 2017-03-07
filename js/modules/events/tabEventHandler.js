/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('events/tabEventHandler',function( tab ){
	
	if( typeof $( tab ).attr('widgetid') !== "undefined" ){
		
		let tabScope = $( tab ).attr('widgetid').split('-')[0];

		switch( tabScope ){
			case "HCRCASEAPPWorkspaceSection":
				
				let tabParams = dijit.registry.byNode( tab );
				let tabPage = tabParams.params.page;
				let tabType = tabPage.params.tabDescriptor.tabID;
				
				switch( tabType ){
					case 'PersonHome':
						
						_engine.caseWork.caseData.maintainNocache( tabPage );
						_engine.ui.dom.interfaceAlteration( tabPage );
						
						break;
					case 'HCRIntegratedCase':
						
						_engine.caseWork.caseData.maintainNocache( tabPage );
						_engine.ui.dom.interfaceAlteration( tabPage );
						
						break;
					default:
						_engine.debug.info(`[tabEventHandler] Undefined tabID: ${ tabType }` );
						
				}

				break;
			case 'app':
					
				switch($(tab)[0].innerText.trim() ){
					case 'HCR Cases and Outcomes':
						
						if(typeof curam.tab.getSelectedTab() !== 'undefined' ){
							
							_engine.caseWork.caseData.maintainNocache(  );
							_engine.ui.dom.interfaceAlteration(  );
							
						}
							
						break;
					default:
						break;
				}

				break;
			case 'HCRIntegratedCase':

				_engine.caseWork.caseData.maintainNocache(  );

				break;
			default:
				break;
		}
		
	}
	
});