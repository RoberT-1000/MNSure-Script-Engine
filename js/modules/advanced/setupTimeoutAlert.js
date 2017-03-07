/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('advanced/setupTimeoutAlert',function(){
	
	let timeoutBuffer = 180000;

	_engine.debug.info('Session timeout notification set.');
	
	setTimeout(function(){
		if( _engine.advanced._sessionRemaining() > timeoutBuffer ) _engine.advanced.setupTimeoutAlert();
		else {
			_engine.ui.modal.build({
				buttons:[
					{label:'Continue Working',role:"submit"},
					'close'
				],
				title:'Session about to expire...',
				text: 'It seems that your session is about to expire. Would you like to attempt to continue your session?'
			},function( props ){
				_engine.storage.nocache.data.modal[props.id].role = 'timeout alert';
			});
		}
	}, _engine.advanced._sessionRemaining() - timeoutBuffer);
	
	
});