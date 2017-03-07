/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('navigation/icTabs/icTabNavi',function( naviText, callback ){
	
	let err = false;
	
	if( _engine.domTools.test.hcrTabType() === 'Integrated Case' ){
		
		let tab = $.grep( _engine.domTools.get.icFrame.icTabList(),function( n ){ 
			return dijit.registry.byNode( n ).label.toLowerCase() === naviText.toLowerCase(); 
		});
		
		tab.length === 0 ?
			tab = false :
			tab = dijit.registry.byNode( tab[0] );
		
		if( tab ){
			if( _engine.domTools.get.icFrame.icTabActive()[0] !== $( tab.domNode )[0] ){
				
				let iFrame = $( $(_engine.domTools.get.hcrTabFrame()).find('iframe')[1] );
				
				let id = $( iFrame ).attr('id');
				
				let loaded = function(){
					
					if( typeof callback === 'function' ) callback( _engine.domTools.get.icFrame.icTabActiveFrame()[0] );
					
					curam.util.onLoad.removeSubscriber( id, loaded );
					
				};
				
				curam.util.onLoad.addSubscriber( id, loaded );
				
				tab.domNode.click();
				
			}
			else err = 'Already on requested tab';
		}
		else err = 'Could not find requested tab';

	}

});