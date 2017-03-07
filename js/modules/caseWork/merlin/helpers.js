_engine.module.define('caseWork/merlin/helpers',{

	tasks : {
		total: function( id ){
			let modal = _engine.storage.nocache.data.modal[id];
			return modal.tasklist.length;
		},
		remaining: function( id ){
			let modal = _engine.storage.nocache.data.modal[id],
					incomplete = $.grep(modal.tasklist,function( task ){ 
						return( task.complete === false ); 
					});
			
			return incomplete.length;
			
		}
	}
	
});