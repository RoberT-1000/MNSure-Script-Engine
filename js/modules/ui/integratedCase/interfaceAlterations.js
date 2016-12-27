/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/integratedCase/interfaceAlteration',function(){
	
	let tabParams = curam.tab.getSelectedTab();
	
	let subnavTabs;
	
	let count = 0;
	let timeoutForLoad = setInterval(function(){
		if( count < _engine.advanced._vars.iterations ){
			
			subnavTabs = $( '#'+tabParams.id + ' .nav-panel .nav-area-wrapper .navigation-bar-tabs .dijitTabListWrapper' );
			
			if( $(subnavTabs).length > 0 ){
				
				_engine.ui.integratedCase.reorderTab('eligibility','elections');
				
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