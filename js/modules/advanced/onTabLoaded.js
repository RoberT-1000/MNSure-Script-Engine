_engine.module.define('advanced/onTabLoaded',function( tabId, callback ){
	
	let loaded = function(){
		
		if( typeof callback === 'function' ) callback();
		
		curam.util.onLoad.removeSubscriber( tabId, loaded );
		
	};

	curam.util.onLoad.addSubscriber( tabId, loaded );
	
});