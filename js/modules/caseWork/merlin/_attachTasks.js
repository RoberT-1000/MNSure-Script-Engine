/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('caseWork/merlin/_attachTasks',function( id, input ){
	
	_engine.advanced.getView('merlin/card-template.html',function( template ){ 
		
		_engine.storage.nocache.data.modal[id].tasklist = [];
		
		let card;
		
		$.each(input,function(task,config){
			
			card = $.parseHTML( template );
			
			let defaultConfig = {
				title: 'TITLE',
				complete: false,
				action: null
			};
			
			$.each(config,function(k,v){ defaultConfig[k] = v });
			
			$( card ).attr( 'data-task', _engine.storage.nocache.data.modal[id].tasklist.length );
			$( card ).find('.card-title').text( defaultConfig.title );
			
			_engine.storage.nocache.data.modal[id].tasklist.push( defaultConfig );
			
			$("[data-id='"+id+"'] [data-role='task-list']").append( $( card ) );
			
		});
		
	});
	
});