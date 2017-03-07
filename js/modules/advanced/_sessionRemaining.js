/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('advanced/_sessionRemaining',function(){

	let cookie = curam.util.getCookie('sessionExpiry'),
			validCookie = curam.util.SessionTimeout._sessionExpiryCookieIsAsExpected( cookie ),
			sessionExpiry = Math.abs( validCookie[0] ),
			serverTime = Math.abs( validCookie[1] ),
			now = new Date().getTime();
	
	let remaining = sessionExpiry - now;
	
	return remaining;
	
});