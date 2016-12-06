/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('advanced/_sessionExpiry',function(){

	let expiry = curam.util.getCookie('sessionExpiry').split('-');

	$.each(expiry,function(k,v){
		expiry[k] = parseInt(v);
	});

	var exp = new Date(expiry[0]);

	return exp.toLocaleTimeString();

});