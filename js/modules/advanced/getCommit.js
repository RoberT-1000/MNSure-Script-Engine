/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('advanced/getCommit',function( commit ){
	
	if(typeof commit === 'undefined') commit = _engine.storage.config.get('commit.current');
	
	return _engine.storage.config.get('commit.'+commit);

});