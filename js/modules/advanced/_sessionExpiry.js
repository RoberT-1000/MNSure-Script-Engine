/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('advanced/_sessionExpiry',function( log ){

	let cookie = curam.util.getCookie('sessionExpiry'),
			validCookie = curam.util.SessionTimeout._sessionExpiryCookieIsAsExpected( cookie ),
			sessionExpiry = Math.abs( validCookie[0] ),
			serverTime = Math.abs( validCookie[1] ),
			sessExp = new Date( sessionExpiry ),
			servExp = new Date( serverTime );
	
	if( typeof log === 'undefined' ) log = false;
	
	if( log ) _engine.debug.info(`[advanced/_sessionExpiry] Timeout data: Session expiry ${ sessExp.toLocaleTimeString() } | Server last action ${ servExp.toLocaleTimeString() }`);

	return sessExp.toLocaleTimeString();
	
});