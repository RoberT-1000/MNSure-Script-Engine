/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/dom/interfaceAlteration',function( pageObj ){

	let tabParams;
	
	typeof pageObj === 'undefined' ?
		tabParams = curam.tab.getSelectedTab():
		tabParams = pageObj;
	
	let subnavTabs;
	
	let count = 0;
	let timeoutForLoad = setInterval(function(){
		if( count < _engine.advanced._vars.iterations ){
			
			subnavTabs = $( '#'+tabParams.id + ' .nav-panel .nav-area-wrapper .navigation-bar-tabs .dijitTabListWrapper' );
			
			if( $(subnavTabs).length > 0 ){
				
				switch( tabParams.params.tabDescriptor.tabID ){
					case 'PersonHome':
						// Commented out on purpose - Errors exist in source preventing proper alterations
						//_engine.ui.dom.reorderTab('eligibility','time limits');
						break;
					case 'HCRIntegratedCase':
						_engine.ui.dom.reorderTab('eligibility','elections');
						break;
					default:
						break;
				}
				
				clearTimeout( timeoutForLoad );
				
			}
			
			count++;
			
		}
		else{
			clearTimeout( timeoutForLoad );
		}
	}, _engine.advanced._vars.timeout);
	
	timeoutForLoad;
	
});