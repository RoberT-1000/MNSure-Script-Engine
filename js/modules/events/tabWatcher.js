/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('events/tabWatcher',function( tab ){

	let tabScope = $( tab ).attr('widgetid').split('-')[0];
	
	switch( tabScope ){
		case "HCRCASEAPPWorkspaceSection":
			
			_engine.caseWork.caseData.maintainNocache();
			_engine.ui.integratedCase.interfaceAlteration();
			
			break;
		case 'app':
			
			switch($(tab)[0].innerText.trim() ){
				case 'HCR Cases and Outcomes':
					
					_engine.caseWork.caseData.maintainNocache();
					
					break;
				default:
					break;
			}
			
			break;
		case 'HCRIntegratedCase':
			
			_engine.caseWork.caseData.maintainNocache();
			
			break;
		default:
			break;
	}
	
});

