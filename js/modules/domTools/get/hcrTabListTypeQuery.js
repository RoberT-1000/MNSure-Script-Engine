/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/get/hcrTabListTypeQuery',function( _queryType ){
	
	_engine.debug.info("Starting tab list query");

	var _openTabs = _engine.domTools.get.hcrTabList();

	var _returnArray = [];

	$.each( _openTabs, function( k, v ){

		var _tabType = _engine.domTools.test.hcrTabType( $( v ) );

		if(_tabType === false){
			_tabType = "Person Page";
		}

		if( _tabType.split("|").length == 2 && _queryType.toLowerCase() == "pdc" ){

			_tabType = _tabType.split("|")[0].trim;

		}

		_engine.debug.info("Comparing query type [ '"+ _queryType.toLowerCase() +"' ] to tab type [ '"+ _tabType.toLowerCase() +"' ]");

		if( _tabType.toLowerCase() == _queryType.toLowerCase() ){

			_engine.debug.info("Type matched. Added to array.");

			_returnArray.push( v );

		}

	});

	_engine.debug.info("Completed tab list query.");

	return _returnArray;
	
});