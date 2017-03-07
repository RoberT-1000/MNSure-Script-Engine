/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/test/searches/windowLoaded',function(){
	
	let returnVal = false,
			err = false;
	
	// Tests to see if on a search window
	if( ['person search','case search'].indexOf( _engine.domTools.test.hcrTabType().toLowerCase() ) > -1 ) {
		
		// Grabs the from from the search screen
		let _searchFrame = _engine.domTools.get.hcrTabFrame();
		
		if( typeof _searchFrame !== "undefined" ){
		
			let _searchBody = $( _searchFrame ).find('iframe').contents().find('input');
			
			typeof _searchBody[0] === 'undefined' ?
				err = "Search is open but not fully loaded" :
				_engine.domTools.get.searches.advancedQuery(".action-set a:contains('Search')").length > 0 ?
					returnVal = true :
					err = "Search is open but not fully loaded";
		}
		else err = "Unable to target search";
	} 
	else err = "Not on a valid search screen";
	
	if( err ) _engine.debug.warn( `[ windowLoaded() ] ${ err }` );
	
	return returnVal;
	
});