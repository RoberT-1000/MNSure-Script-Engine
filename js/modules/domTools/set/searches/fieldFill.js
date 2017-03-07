/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/set/searches/fieldFill',function( target, value ){
	
	let field = _engine.domTools.get.searches.inputQuery( target );

	if( field ) $( field ).val( value );
	
});