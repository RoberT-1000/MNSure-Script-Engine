/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('navigation/hcrTabs/hcrTabNavi',function( tabTitle, callback ){

	_engine.debug.info('=================== Starting HCR Tab Navigation. ===================');

	_engine.debug.info('- * Gathering return tab information.');
	var returnTab = _engine.domTools.get.hcrTabActive();

	_engine.debug.info('- * Gathering list of open tabs.');
	var openTabs = _engine.domTools.get.hcrTabList();

	_engine.debug.info('- * Iterating over list of tabs.');
	$.each(openTabs, function(k,v){

		if( v.innerText.trim() == tabTitle ){

			_engine.debug.info('- * Navigating match found - selecting match.');

			$(v).click();

			_engine.debug.info('- * Gathering frame of new window.');
			var tabFrame = _engine.domTools.get.hcrTabFrame();

			if(typeof callback == 'function'){
				_engine.debug.info('=================== Comleted HCR Tab Navigation. ===================');
				callback( _engine.domTools.get.hcrTabFrame(), returnTab );
			}

		}

	});

});