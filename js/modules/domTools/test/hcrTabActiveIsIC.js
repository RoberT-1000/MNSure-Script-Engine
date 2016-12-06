/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/test/hcrTabActiveIsIC',function( callback ){
	
	var result = false;

	var mainTabType = _engine.domTools.test.mainTabType();

	if( mainTabType === 'HCR Cases and Outcomes' ){

		var hcrTabType = _engine.domTools.test.hcrTabType();

		if( hcrTabType === 'Integrated Case' ){

			result = true;

		} else {

			_engine.debug.warn(`You are not on an integrated case. Current tab type is: ${ hcrTabType }.`);

		}

	} else {

		_engine.debug.warn(`Current HCR Tab can only be determined if on the HCR Cases and Outcomes screen. Current main tab is: ${ mainTabType }`);

	}

	if( typeof callback === 'function' ) callback( result );
	else return result;
	
});