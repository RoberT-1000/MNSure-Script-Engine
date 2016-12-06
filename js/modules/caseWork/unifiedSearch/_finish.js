/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('caseWork/unifiedSearch/_finish',function(){

	//Start param gather counter
	_c1 = 0;

	var _gatherParams = setInterval(function(){

		//Setup loop to gather modal params

		if( _c1 <= _engine.advanced._vars.iterations ){

			_engine.debug.info("- * Attempting to gather params [ attempt: "+ _c1 +" ]");

			if( _engine.storage.modalParams.get() !== false ){

				//Perform actions on the stored params

				_engine.debug.info("- * Params Gathered");

				$.each( _engine.storage.modalParams.get(),function(k,v){

						//Remove Special Characters and Trim
					var _input = v.value.replace(/[^\w\s]/gi, '').replace(/ +(?= )/g,'').trim();

					if( $.isNumeric( _input ) ){

						if( _input.length == 8 ){

							// Case Number

							let _tabToClose = _engine.domTools.get.hcrTabListTypeQuery("Case Search");
							_engine.tools.closeTabHCR( _tabToClose );

							_engine.search._case();

							_c2 = 0;

							let _openSearch = setInterval(function(){
								_engine.debug.info("- * Attempting to target search screen [ attempt: "+ _c2 +" ]");
								if(_c2 <= _engine.advanced._vars.iterations){
									if( _engine.domTools.test.searches.windowLoaded() ){

										_engine.domTools.set.searches.fieldFill("Reference",_input);

										_engine.tools.selectSearchResult();

										clearInterval( _openSearch );
									}
									++_c2;
								} else {
									clearInterval( _openSearch );
								}
							}, _engine.advanced._vars.timeout);
							_openSearch;

						} else if ( _input.length == 9 || _input.length == 10 ){
							// SSN or MNS ID

							let _tabToClose = _engine.domTools.get.hcrTabListTypeQuery("Person Search");
							_engine.tools.closeTabHCR( _tabToClose );

							_engine.search._person();

							_c2 = 0;

							let _openSearch = setInterval(function(){
								_engine.debug.info("- * Attempting to target search screen [ attempt: "+ _c2 +" ]");
								if(_c2 <= _engine.advanced._vars.iterations){
									if( _engine.domTools.test.searches.windowLoaded() ){

										_engine.domTools.set.searches.fieldFill("Reference",_input);

										_engine.tools.selectSearchResult();

										clearInterval( _openSearch );
									}
									++_c2;
								} else {
									clearInterval( _openSearch );
								}
							}, _engine.advanced._vars.timeout);
							_openSearch;

						} else {
							// Unknown

						}

					} else {
						// Name

						_engine.search._person();

						var _name = _input.split(" ");

						if( _name.length > 1 ){

							_c2 = 0;

							var _openSearch = setInterval(function(){
								_engine.debug.info("- * Attempting to target search screen [ attempt: "+ _c2 +" ]");
								if(_c2 <= _engine.advanced._vars.iterations){
									if( _engine.domTools.test.searches.windowLoaded() ){

										_engine.domTools.set.searches.fieldFill("First Name",_name[0]);

										_engine.domTools.set.searches.fieldFill("Last Name",_name[1]);

										_engine.tools.selectSearchResult();

										clearInterval( _openSearch );
									}
									++_c2;
								} else {
									clearInterval( _openSearch );
								}
							}, _engine.advanced._vars.timeout);
							_openSearch;

						} else {

							_c2 = 0;

							let _openSearch = setInterval(function(){
								_engine.debug.info("- * Attempting to target search screen [ attempt: "+ _c2 +" ]");
								if(_c2 <= _engine.advanced._vars.iterations){
									if( _engine.domTools.test.searches.windowLoaded() ){

										_engine.domTools.set.searches.fieldFill("First Name",_name[0]);

										clearInterval( _openSearch );
									}
									++_c2;
								} else {
									clearInterval( _openSearch );
								}
							}, _engine.advanced._vars.timeout);
							_openSearch;

						}

					}

				});

				_engine.debug.info("- * Clearing params");

				_engine.storage.modalParams.clear();

				clearInterval( _gatherParams );

			}

			++_c1;

		} else {

			_engine.debug.info("- * Fail Reason: Error [_engine.caseWork.note._completeNote()]: Failed to gather params.");							
			clearInterval( _gatherParams );

		}

	}, _engine.advanced._vars.timeout);

	_gatherParams;

});