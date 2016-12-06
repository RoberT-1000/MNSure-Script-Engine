/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('storage/prefillCache/add',function( object ){

	if( typeof object === 'string' ) object = $.parseJSON( object );

	if( typeof object !== 'undefined' ){
		
		if( typeof _engine.storage.nocache.data.caseData.prefill === 'undefined' ) _engine.storage.nocache.data.caseData.prefill = {};

		var cacheProps = Object.getOwnPropertyNames( _engine.storage.nocache.data.caseData.prefill );

		var objectProps = Object.getOwnPropertyNames( object );

		$.each(objectProps, function(k,v){

			if( cacheProps.indexOf( v ) !== -1 ) _engine.storage.prefillCache.remove( v );

			_engine.storage.nocache.data.caseData.prefill[v] = object[v];

		});

	} else {

		return false;

	}

});