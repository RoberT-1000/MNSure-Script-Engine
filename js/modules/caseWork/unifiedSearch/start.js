/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('caseWork/unifiedSearch/start',function(){

	_engine.navigation.mainTabs.mainTabNavi('hcr',function(){
		
		_engine.advanced.getView( "queries/unified search.html",function(template){

			_engine.ui.modal.build({
				title:"Unified Search Query",
				html: template,
				buttons: [
					{label:'Search', onclick:"_engine.events.handleClickEvent('ui.modal._button(submit)')", role: 'submit'},
					'close'
				]
			},function(){
				
				_engine.storage.nocache.data.modal.role = 'query';
				
			});
			
		});

	});

});