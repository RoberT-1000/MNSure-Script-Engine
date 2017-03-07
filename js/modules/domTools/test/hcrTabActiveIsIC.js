/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/test/hcrTabActiveIsIC',function( callback ){
	
	let returnVal = false;
	
	_engine.domTools.test.mainTabType() !== 'HCR Cases and Outcomes' ?
		returnVal = false :
		_engine.domTools.test.hcrTabType() === 'Integrated Case' ?
			returnVal = true :
			returnVal = false;
	
	if(typeof callback === 'function') callback( returnVal );
	
	return returnVal;

});