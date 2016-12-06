/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('storage/prefillCache/remove',function( type ){

	if( typeof type === 'string' ){

		delete _engine.storage.nocache.data.caseData.prefill[ type ];

		return true;

	} else {

		return false;

	}

});