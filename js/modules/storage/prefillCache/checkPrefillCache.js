/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('storage/prefillCache/checkPrefillCache',function(  type, callback  ){

	let cacheObject = _engine.storage.prefillCache.get();

	let cacheProps = Object.getOwnPropertyNames( cacheObject );

	if( cacheProps.indexOf( type ) !== -1 ){
		
		if( typeof callback === 'function' ){ callback( cacheObject[ type ] ); }
		else return true;

	} else {

		if( typeof callback === 'function' ){ callback( undefined ); }
		else return false;

	}

});