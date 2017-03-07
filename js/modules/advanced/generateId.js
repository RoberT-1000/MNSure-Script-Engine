/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('advanced/generateId',function(){

	return Math.ceil( Math.random() * 100000000 );

});