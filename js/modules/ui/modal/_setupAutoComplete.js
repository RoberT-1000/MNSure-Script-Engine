/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/modal/_setupAutoComplete',function(){
	
	let _fields = $('.mns-modal-template > .mns-input-group');
		//Push additional clusters if clustering is active
	if( _engine.ui.modal._clustersActive() ){
		
		let _clusterFields = $('.mns-modal-template > .mns-input-cluster.input-cluster-active > .mns-input-group');
		
		$.each(_clusterFields,function(k,v){ _fields.push(v); });
	
	}

	$.each( _fields, function(k,v){
		
		if( $( v ).find('input').length !== 0 ){
			
			let input = $( v ).find('input')[0];
			
			if( typeof $( input ).attr('data-autoComplete') !== 'undefined' ){
				
				//Process prefill on field(s)
				
				let _autoComplete = $( input ).attr('data-autoComplete').toLowerCase();
				
				let _autoCompleteType = _autoComplete.split("|")[0];
				let _autoCompleteValue = _autoComplete.split("|")[1];
				
				let autoCompleteSource = [];
				
				switch( _autoCompleteType ){
					case "participants":
						switch( _autoCompleteValue ){
							case "name":
								
								$.each(_engine.storage.nocache.query('caseData.participants'),function(k,v){
									autoCompleteSource.push(v.name) 
								});
								
								$( input ).autocomplete({
									minLength: 0,
									delay: 0,
									autoFocus: true,
									source: autoCompleteSource
								});
								
								break;
							default:
								break;
						}
						break;
					default:
						_engine.debug.warn("unrecognised prefill type of: [ '" +_prefill+ " ']");
						break;
				}
			}
		}
	});

});