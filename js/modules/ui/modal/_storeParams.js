/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/modal/_storeParams',function( modalId, callback ){
	
	let modalTemplate = '[data-id="' + modalId + '"] .mns-modal-template',
			fields = $( modalTemplate + ' > .mns-input-group'),
			dataSet = {};

	if( _engine.ui.modal._clustersActive( modalId ) )
		$.each( $( modalTemplate + ' > .input-cluster-active > .mns-input-group') ,function(k,v){ fields.push(v); });
	
	$.each( fields, function(k,v){
		
		dataSet[k] = {
			descriptor: '',
			label: '',
			value: '',
			required: false
		};
		
		if( $( v ).find( '.mns-input-label' ).length )
			dataSet[k].label = $( v ).find( '.mns-input-label' ).text().trim();
		
		if( $( v ).find( '.mns-input-descriptor' ).length )
			dataSet[k].descriptor = $( v ).find( '.mns-input-descriptor' ).text().trim();
		
		if( $( v ).find( 'input, select' ).length ){
			
			dataSet[k].required = $(v).hasClass('required') || dataSet[k].descriptor === "SUBJECT";
			
			let field = $( v ).find( 'input, select' ),
					val = $( field ).val().trim();
				
			val = val.replace(/"/g,'&quot;');
			val = val.replace('"','\"');
			
			if( field[0].type === 'date' ){
				let date = val.split('-');
				val = date[1].replace(/^0/g,'') + '/' + date[2].replace(/^0/g,'') + '/' +  date[0];
			}
			
			dataSet[k].value = val;
		
		}
		
	});
	
	_engine.storage.nocache.data.modal[modalId].data.params = dataSet;
	
	if( typeof callback === 'function' ) callback( dataSet );
	
});