/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/get/mainTabActive',function(){
	
	let returnVal = false;
	
	$.each(_engine.domTools.get.mainTabList(), function(k,v){ if($(v).hasClass('dijitChecked')) returnVal = $(v)[0]; });
	
	return returnVal;
	
});