/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/test/mainTabType',function( callback ){
	
	var activeTab = _engine.domTools.get.mainTabActive();

	var activeTabLabel = $( activeTab )[0].innerText.trim();

	if( typeof callback === 'function' ) callback( activeTabLabel );
	else return activeTabLabel;
	
});