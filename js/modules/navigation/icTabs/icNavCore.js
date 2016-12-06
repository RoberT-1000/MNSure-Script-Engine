/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('navigation/icTabs/icNavCore',function( _t ){

	var _tl = _engine.domTools.get.icFrame.icTabList();
	$.each( _tl, function( k, v ){
		_tabID = $( v ).attr('widgetid').split('-');
		if( $.inArray( _t, _tabID ) > -1 ){
			if(!$( _engine.domTools.get.icFrame.icTabList()[k] ).hasClass('dijitTabChecked')){
				_engine.domTools.get.icFrame.icTabList()[k].click();
			}
			return false;
		}
	});

});