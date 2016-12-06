/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/get/searches/advancedQuery',function( _query ){

	var screenType = _engine.domTools.test.hcrTabType();

	if( screenType == "Case Search" || screenType == "Person Search" ){

		var _frame = $( _engine.domTools.get.hcrTabFrame() );

		var _result = $( _frame ).find('iframe').contents().find( _query );

		if( _result.length > 0 ){

			return _result;

		} else {

			_engine.debug.warn("- * [ _engine.domTools.get.searches.advancedQuery( _query ) ] Could not find requested field: " + _query);

			return false;

		}

	} else {

		_engine.debug.warn("- * [ _engine.domTools.get.searches.advancedQuery( _query ) ] You must be on a search page to use this dom query.");

		return false;

	}
	
});