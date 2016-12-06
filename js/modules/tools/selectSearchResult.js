/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('tools/selectSearchResult',function(){
	
	_engine.domTools.get.searches.advancedQuery(".action-set a:contains('Search')")[0].click();

	var screenType = _engine.domTools.test.hcrTabType();

	let _count = 0;

	let _zeroResultCounter = 0;

	var _loadWindow = setInterval(function(){

		_engine.debug.info("- * Attempting to load results screen [ attempt: "+ _count +" ]");

		if( _count <= _engine.advanced._vars.iterations ){

			var _results = _engine.domTools.get.searches.searchResultsQuery();

			if( _engine.domTools.test.searches.windowLoaded() && _results.length > 0 ){

				if( screenType == "Case Search" || screenType == "Person Search" ){

					if( _results.length == 1 ){

						var singleResult = _results.find('td:nth-child(2) a')[0];

						if( typeof singleResult === 'object' ){
							
							singleResult.click();
							
							_tabToClose = _engine.domTools.get.hcrTabListTypeQuery( screenType );
							
							_engine.tools.closeTabHCR( _tabToClose );
							
							clearInterval( _loadWindow );

						} else {

							_engine.debug.info(`- * [ _engine.tools.selectSearchResult() ] Found zero results. Checking again in ${_engine.advanced._vars.timeout}ms. Attempt: ${_zeroResultCounter}`);

							if( _zeroResultCounter >= _engine.advanced._vars.iterations ){
								clearInterval( _loadWindow );
							}

							_zeroResultCounter++;

						}

					} else {

						_engine.debug.info("- * [ _engine.tools.selectSearchResult() ] Your search returned more than one result. Please manually select.");

						clearInterval( _loadWindow );

					}

				} else {

					_engine.debug.error("- * [ _engine.tools.selectSearchResult() ] You must be on a search page to use this tool.");

					return false;

				}

			}

			++_count;

		} else {

			clearInterval( _loadWindow );

		}
	}, _engine.advanced._vars.timeout);

	_loadWindow;
	
});