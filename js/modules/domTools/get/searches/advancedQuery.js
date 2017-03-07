/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/get/searches/advancedQuery',function( _query ){
	
	let returnVal = false,
			err = "";
	
	if( ['Case Search','Person Search'].indexOf( _engine.domTools.test.hcrTabType() ) > - 1 ){
		
		let _queryResult = $( _engine.domTools.get.hcrTabFrame() ).find('iframe').contents().find( _query );
		
		if( _queryResult.length > 0 ) returnVal = _queryResult;
		else err = `Could not find requested field: ${ _query }`;
		
	}
	else err = "You must be on a search page to use this dom query";
	
	if(err) _engine.debug.warn(`[ searches.advancedQuery() ] ${ err }`);
	
	return returnVal;
	
});