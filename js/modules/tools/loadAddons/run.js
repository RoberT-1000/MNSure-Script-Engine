/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('tools/loadAddons/run',function( addons ){
	
	$.each( addons, function(type, libraries){
		
		$.each( libraries,function( library, url ){
			
			var lib;
			
			switch( type ){
				case "css":
					
					$.each($('head link[href]'),function(key,linkObj){
						if( $(this).attr('href').indexOf( library ) !== -1 ) $( this ).remove();
					});
					lib = $('<link>',{ href : url, 'rel' : 'stylesheet', 'type' : 'text/css'});
					$('link[data-scriptengine]').before( lib );
					
					break;
					
				case "js":
				
					$.each($('head script[src]'),function(key,linkObj){
						if( $(this).attr('src').indexOf( library ) !== -1 ) $( this ).remove();
					});
					lib = $('<script>',{ src : url });
					$('script[data-scriptengine]').before( lib );
					
					break;
				default:
					break;
			}
			
		});
	});
	
});