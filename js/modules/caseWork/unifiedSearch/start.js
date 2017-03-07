/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('caseWork/unifiedSearch/start',function(){

	_engine.navigation.mainTabs.mainTabNavi('hcr',function(){
		
		_engine.advanced.getView( "queries/unified search.html",function(template){

			_engine.ui.modal.build({
				title:"Unified Search Query",
				html: template,
				buttons: [
					{label:'Search', onclick:"return false;", role: 'submit'},
					'close'
				]
			},function( props ){
				
				_engine.storage.nocache.data.modal[props.id].role = 'query';
				
			});
			
		});

	});

});