/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/integratedCase/interfaceAlteration',function(){
	
	_engine.domTools.test.hcrTabActiveIsIC(function(result){ 
		
		if( result ){
			
				/* Fires on page load AFTER the content is ready */
			curam.tab.getSelectedTab().onLoadDeferred.then(function(){
				
				_engine.ui.integratedCase.reorderTab('eligibility','elections');
				
			});
			
		}
		
	});
	
});