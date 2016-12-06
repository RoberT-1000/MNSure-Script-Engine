/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('advanced/setupTimeoutAlert',function(){

	var tripTimer = 180000;

	_engine.debug.info('Session timeout notification set.');

	setTimeout(function(){
		_engine.ui.modal.build({
			buttons:[
				{label:'Refresh',onclick:"window.location.reload();"},
				'close'
			],
			title:'Session about to expire...',
			text: 'You are about to be timed out!  Would you like to attempt to refresh your session?'
		},function(){
			_engine.storage.nocache.data.modal.role = 'timeout alert';
		});
	}, _engine.advanced._sessionRemaining() - tripTimer);
	
});