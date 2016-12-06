/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/dom/createElement',function( input ){

	let config = {};
			config.type = '';
			config.styles = '';
			config.classes = '';
			config.id = '';
			config.content = '';
	
	$.each(input,function(k,v){
		config[k] = input[k];
	});

	if( config.type === '' ) return false;
	
	let newEle = $('<'+input.type+'>',{
		'data-merlin-id': config.id,
		'data-merlin-attach': config.attachId,
		'style': config.styles,
		'class': config.classes,
		html: config.content
	});

	return newEle;

});