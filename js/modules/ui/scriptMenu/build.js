/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/scriptMenu/build',function(){

	var menu = null;

	var _url = _engine.storage.config.get('advanced.baseUrl');

	var filePath = "json/";

	var version = _engine.storage.config.get('commit.current');

	version === 'master' || version === 'beta' ?
		filePath += "script menu.json":
		filePath += "dev script menu.json";
	
	filePath += "?access_token=e4ad5080ca84edff38ff06bea3352f30beafaeb1";
	
	$.ajax({
		dataType: "json",
		url: _url + filePath,
		async: false,
		success: function( data ){

			menu = data;

		}
	});

	if( menu != null ){

		/* Build menu */
		var nav = $('<ul>',{id: 'script-launcher-nav'});

		/* Attach built menu */
		$('#script-launcher').append( nav );

		$.each(menu, function(k,v){

			var navItem = $('<li>');
			var navLink = $('<a>',{text: k, 'data-click': v._events });

			/* Attach anchor to list item */
			$( navItem ).append( navLink );
			/* Attach list item to list */
			$( '#script-launcher-nav' ).append( navItem )

			if(typeof v._submenu === "object"){

				/* Build Subnav Menu */
				var subnav = $('<ul>',{class: 'script-launcher-subnav'});

				/* Attach built menu */
				$( navItem ).append( subnav );

				$.each(v._submenu, function(k2,v2){ 

					var navItemSub = $('<li>');
					var navLinkSub = $('<a>',{text: k2, 'data-click': v2._events });

					/* Attach anchor to list item */
					$( navItemSub ).append( navLinkSub );
					/* Attach list item to list */
					$( subnav ).append(navItemSub)

				});
			}

		});

	}

});