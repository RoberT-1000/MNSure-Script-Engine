/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('tools/stringToQuery',function( queryString ){
	
	if( typeof queryString === 'string' ){
		
		return queryString.replace(/\/|\.|\\|[|]/g,'.').split('.');
		
	}
	
});