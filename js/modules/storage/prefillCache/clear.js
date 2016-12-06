/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('storage/prefillCache/clear',function(){
	
	let obj = _engine.storage.nocache.data;
	
	if(typeof obj !== 'undefined' ){
		
		obj = obj.caseData;
		
		if(typeof obj !== 'undefined' )
			
			obj = obj.prefill;
			
			if( typeof obj !== 'undefined' ){
				
				delete _engine.storage.nocache.data.caseData.prefill;
				
			}
	}

});