/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('caseWork/merlin/setupAction',function( input ){
	
	let config = {
		item: '',
		trigger: 'click',
		action: function(){ console.log('[merlin/setupAction] No Defined Action') },
		callback: ''
	};

	$.each(input,function(k,v){ config[k] = input[k]; });

	if(config.item === '') return false;

	$( config.item ).on(config.trigger,config.action);

	if (typeof config.callback === 'function') config.callback();

});