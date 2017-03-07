/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('events/_persistSession',function(){
	
	let persist = function( mainTab ){
		
		let tab = _engine.domTools.get.hcrTabActive();

		setTimeout(function(){

			_engine.search._case(function(){ 
				_engine.tools.closeTabHCR( _engine.domTools.get.hcrTabListTypeQuery('Case Search') );
				if( mainTab ) mainTab.click();
			});

			if( tab ) tab.click();

		}, 100);
		
	}
	
	switch( _engine.domTools.test.mainTabType() ){
		case 'HCR Cases and Outcomes':
			persist();
			break;
		default:
			
			let tab = _engine.domTools.get.mainTabActive();
			
			_engine.navigation.mainTabs.mainTabNavi('hcr',function(){ 
				persist( tab );
			})
			
			break;
	}
	
});