/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/test/mainTabType',function( req ){

	let label = dijit.registry.byNode( _engine.domTools.get.mainTabActive() ).label;
	
	if(typeof req === 'function') req( label );
	
	else if( typeof req === 'string' ) label = ( label === req );
	
	return label;
	
});