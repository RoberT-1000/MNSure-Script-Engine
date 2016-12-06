/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('storage/nocache/query',function( dataQuery ){
	
	let noCache = _engine.storage.nocache.data, response;
	
	if(typeof dataQuery === 'undefined') return noCache;
	
	dataQuery = dataQuery.replace(/\/|\.|\\|[|]/g,'.').split('.');
		
	$.each(dataQuery,function(key, value){
		
		if( value.trim() !== "" ){

			noCache = noCache[value];

			if( typeof noCache === 'undefined' ) return false;
				
		} else {
			
			return noCache;
			
		}
		
	});
	
	typeof noCache === 'undefined'?
		response = false:
		response = noCache;
	
	return response;
	
});