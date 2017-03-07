/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('advanced/waitForDom',function( req, callback ){
	
	let count = 0,
			returnVal = false,
			config = {
				function: undefined,
				query: ''
			}
	
	if( typeof req === 'string' ) config.query = req;
	else $.each(config,function(k,v){ config[k] = req[k]} );
	
	let interval = setInterval(function(){
		
		if( count < _engine.advanced._vars.iterations ){
			
			let result;
			
			if( typeof config.function !== 'function'  ) result = $( config.query )
			else result = config.function( config.query );
			
			if( $(result).length > 0 ){
				
				if(typeof callback === 'function') callback( result );
				
				clearInterval( interval );
				
			}
			
			++count;
			
		}
		else {
			
			_engine.debug.error('[waitForSelector] Could not locate requested dom element before timeout')
			
			clearInterval( interval );
			
		} 
		
	}, _engine.advanced._vars.timeout);
	
	interval;
	
});