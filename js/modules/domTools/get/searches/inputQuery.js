/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/get/searches/inputQuery',function( _title ){
	
	return _engine.domTools.get.searches.advancedQuery( 'input[title="' + _title + '"]' );
	
});