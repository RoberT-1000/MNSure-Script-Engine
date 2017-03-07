/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('events/domMonitor',function(){
	
	if( typeof _engine.advanced._vars.lastTab === 'undefined' ) _engine.advanced._vars.lastTab = null;
	
	// Trips event monitor on navigation
	$( document ).on('click', '.dijitTabListWrapper .visible.dijitTab',function(){ 
	
		if( _engine.advanced._vars.lastTab !== this ){
			
			_engine.advanced._vars.lastTab = this;
			
			_engine.events.tabEventHandler( this );
			
		}

	});
	
	// Trips event monitor when new tab is created as system auto navigates to the new tab
	$( '.dijitTabListWrapper' ).on('DOMSubtreeModified', '.visible.dijitTab',function(){
		
		if( _engine.advanced._vars.lastTab !== this ){
			
			_engine.advanced._vars.lastTab = this;
			
			_engine.events.tabEventHandler( this );
			
		}
		
	});
	
});