/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/modal/_processPrefill',function(){
	
	var _fields = $('.mns-modal-template > .mns-input-group');

		//Push additional clusters if clustering is active
	if( _engine.ui.modal._clustersActive() ){

		var _clusterFields = $('.mns-modal-template > .mns-input-cluster.input-cluster-active > .mns-input-group');

		$.each(_clusterFields,function(k,v){

			_fields.push(v);

		});

	}

	$.each( _fields, function(k,v){

		if( $( v ).find('input').length !== 0 ){

			var input = $( v ).find('input')[0];

			if( typeof $( input ).attr('data-prefill') !== 'undefined' ){

				//Process prefill on field(s)

				var _prefill = $( input ).attr('data-prefill').toLowerCase();

				var _prefillType = _prefill.split("|")[0];
				var _prefillValue = _prefill.split("|")[1];

				switch( _prefillType ){
					case "date":
						switch( _prefillValue ){
							case "today":

								var d = new Date();

								var prefillDate = d.toISOString().split('T')[0];

								$( v ).find('input').val( prefillDate );

								break;
							default:
								break;
						}
						break;
					case "evidence":
						if( _prefillValue !== "" ){

							_engine.ui.modal._prefillFromDataQuery(_prefillValue,function( prefillString ){
								$( v ).find('input').val( prefillString );
							});

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