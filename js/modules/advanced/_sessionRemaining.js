/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('advanced/_sessionRemaining',function(){

	let expiry = curam.util.getCookie('sessionExpiry').split('-');

	$.each(expiry,function(k,v){
		expiry[k] = parseInt(v);
	});
	
	let now = new Date().getTime();
	
	let remaining = expiry[0] - now;
	
	return remaining;
	
});