/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('advanced/getView',function( file, callback ){
	
	var href = _engine.advanced.baseUrl() + 'views/' + file;
	
	if( typeof _engine.storage.nocache.data.templates === 'undefined' ) _engine.storage.nocache.data.templates = {};
	
		/* If undefined, get and cache template */
	if( typeof _engine.storage.nocache.data.templates[file] === 'undefined' ){
		_engine.debug.info('[getView] Template not cached. Retreiving and caching template. { '+ file +' }');
		$.ajax({
			url: href,
			success: function( data ){
				_engine.storage.nocache.data.templates[file] = data;
				if( typeof callback === 'function' ) callback( data );
			},
			error: function( data ){
				_engine.advanced.getView('error/error.html',callback);
			}
		});
	}
	else {
		_engine.debug.info('[getView] Template found. Returning stored template. { '+ file +' }');
		callback( _engine.storage.nocache.data.templates[file] );
	}

});