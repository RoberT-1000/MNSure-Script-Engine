/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/test/icFrame/onTab',function( _t ){
	
	let returnVal = false,
			err = false;
	
	if( _t ){
		if( _engine.domTools.test.hcrTabActiveIsIC() ){
			let tabTitle = dijit.registry.byNode( _engine.domTools.get.icFrame.icTabActive()[0] ).label.trim().toLowerCase();
			if( _t.toLowerCase() == tabTitle ) returnVal = true;
		}
	}
	else err = "No tab title was specified could not complete test.";
	
	if( err ) _engine.debug.warn( `[onTab] ${ err }` );
	
	return returnVal;

});