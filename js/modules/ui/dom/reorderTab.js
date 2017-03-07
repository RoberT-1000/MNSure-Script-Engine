/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/dom/reorderTab',function( target, insertAfter, callback ){
	
	let tabParams = curam.tab.getSelectedTab();
	
	switch( tabParams.tabDescriptor.tabID ){
		case 'HCRIntegratedCase':
			
			if( typeof target === 'string' && typeof insertAfter === 'string' && target !== insertAfter ){
				
				target = target.toLowerCase();
				insertAfter = insertAfter.toLowerCase();
				
				$.each(_engine.domTools.get.icFrame.icTabList(),function(key,tab){
					
					let tabTitle = $(tab)[0].innerText.toLowerCase().trim();
					
					if( tabTitle === target ) target = tab;
					if( tabTitle === insertAfter ) insertAfter = tab;
					
				});
					
				if( typeof target === 'object' && typeof insertAfter === 'object' ){
					
					$( target ).insertAfter( $( insertAfter ) );
					
					if( typeof callback === 'function' ) callback();
					
				}
				
			}
			break;
		case 'PersonHome':
			if( typeof target === 'string' && typeof insertAfter === 'string' && target !== insertAfter ){
				
				target = target.toLowerCase();
				insertAfter = insertAfter.toLowerCase();
				
				$.each(_engine.domTools.get.personhomeFrame.personhomeTabList(),function(key,tab){
					
					let tabTitle = $(tab)[0].innerText.toLowerCase().trim();
					
					if( tabTitle === target ) target = tab;
					if( tabTitle === insertAfter ) insertAfter = tab;
					
				});
					
				if( typeof target === 'object' && typeof insertAfter === 'object' ){
					
					$( target ).insertAfter( $( insertAfter ) );
					
					if( typeof callback === 'function' ) callback();
					
				}
				
			}
			break;
		default:
			break;
	}

});