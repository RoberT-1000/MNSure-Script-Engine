/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/topNotification',{
	
	add: function( msg ){
		
		if( typeof _engine.advanced._vars.topNotificationTicker === 'undefined' ) _engine.advanced._vars.topNotificationTicker = [];
			
		if( msg.trim() !== '' && typeof msg === 'string' && _engine.advanced._vars.topNotificationTicker.indexOf( msg ) === -1 ){
			_engine.advanced._vars.topNotificationTicker.push( msg );
		}
		
	},
	
	remove: function( msg ){
		
		if( typeof _engine.advanced._vars.topNotificationTicker === 'undefined' )
			_engine.advanced._vars.topNotificationTicker = [];
		
		let msgArray = [];
		
		$.each( _engine.advanced._vars.topNotificationTicker, function( k, v ){
			if( v.indexOf( msg ) === -1 ) msgArray.push( v );
		});
		
		_engine.advanced._vars.topNotificationTicker = msgArray;
		
	},
	
	run: function(){
		
		if( typeof _engine.advanced._vars.topTickerStatus === 'undefined' ) _engine.advanced._vars.topTickerStatus = false;
		
		if( !_engine.advanced._vars.topTickerStatus ){
		
			if( _engine.advanced._vars.topNotificationTicker.length > 0 ){

				if( $('.center-box span').length === 0 ){

					var _span = $('<span>',{'html': _engine.advanced._vars.topNotificationTicker[0] , 'style':'display:none;' });
					$('div.center-box').html( _span );

					$('.center-box span').fadeIn();

				}


			}

			setInterval(function(){

				let messages = _engine.advanced._vars.topNotificationTicker;

				let onMessage = 0, nextMessage = 0, notif;

				if( $('.center-box span').length > 0 && _engine.advanced._vars.topNotificationTicker.indexOf( $('.center-box span').text() ) > -1 ){

					onMessage = _engine.advanced._vars.topNotificationTicker.indexOf( $('.center-box span').text() );

					if( ( _engine.advanced._vars.topNotificationTicker.length - 1 ) === onMessage ) nextMessage = 0;
					else nextMessage = onMessage + 1;

				}

				notif = messages[nextMessage];
				
				if( _engine.advanced._vars.topNotificationTicker.length > 1 ){
					
					$('.center-box span').fadeOut(function(){ 

						$('.center-box span').text( notif );

						$('.center-box span').fadeIn();

					});
					
				} else {
				
					$('.center-box span').text( notif );
				
				}

			},7500);
		
			_engine.advanced._vars.topTickerStatus = true;
			
		}
			
	}
	
});