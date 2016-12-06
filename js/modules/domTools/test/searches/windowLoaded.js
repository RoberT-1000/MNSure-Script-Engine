/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/test/searches/windowLoaded',function(){

	var _screenType = _engine.domTools.test.hcrTabType();

	if( _screenType == "Person Search" || _screenType == "Case Search" ){

		var _searchFrame = _engine.domTools.get.hcrTabFrame();

		if( typeof _searchFrame != "undefined" ){

			var _searchBody = $( _searchFrame ).find('iframe').contents().find('input');


			//Search is open
			if ( typeof _searchBody[0] != 'undefined' ){

				if( _engine.domTools.get.searches.advancedQuery(".action-set a:contains('Search')").length > 0 ){

					//Search is loaded
					_engine.debug.info("- * [ _engine.domTools.test.searches.windowLoaded() ] Search is open and fully loaded.");
					return true;

				} else {

					_engine.debug.warn("- * Fail Reason: [ _engine.domTools.test.searches.windowLoaded() ] Search is open but not fully loaded.");
					return false;

				}

			} else {

				_engine.debug.warn("- * Fail Reason: [ _engine.domTools.test.searches.windowLoaded() ] Search is open but not fully loaded.");
				return false;

			}
		} else {

			_engine.debug.warn("- * Fail Reason: [ _engine.domTools.test.searches.windowLoaded() ] Unable to target search.");
			return false;

		}

	} else {

		_engine.debug.warn("- * Fail Reason: [ _engine.domTools.test.searches.windowLoaded() ] Not on a valid search screen.");
		return false;

	}

});