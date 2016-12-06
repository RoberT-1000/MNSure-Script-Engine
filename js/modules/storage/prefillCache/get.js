/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('storage/prefillCache/get',function( type ){

	let cacheObject = _engine.storage.nocache.query('caseData.prefill'), response;
	
	if( cacheObject !== false ){
		if( typeof type === 'string' ){
			response = cacheObject[type];
		}
		else {
			response = cacheObject;
		}
	}
	else {
		response = false;
	}
	
	return response;
	
});