/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('storage/nocache/delete',function( toRemove ){

	delete _engine.storage.nocache.data[toRemove];
	
});