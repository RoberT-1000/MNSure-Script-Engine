_engine.module.define('advanced/modals',{
	
	error: function( msg ){
		
		if( !msg || typeof(msg) !== 'string' ) msg = 'Error message not defined.';
		
		_engine.ui.modal.build({
			buttons:['close'],
			title:'Error...',
			text: msg
		},function( props ){
			_engine.storage.nocache.data.modal[props.id].role = 'error';
		});
	}
	
});