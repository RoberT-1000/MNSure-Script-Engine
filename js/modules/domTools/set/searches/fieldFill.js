/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/set/searches/fieldFill',function( _field, _value ){
	
	var _f = _engine.domTools.get.searches.inputQuery( _field );

	if( _f !== false ){

		$( _f ).val( _value );

	}
	
});