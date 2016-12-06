/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/modal/_storeParams',function(){

	var _fields = $('.mns-modal-template > .mns-input-group');

		//Push additional clusters if clustering is active
	if( _engine.ui.modal._clustersActive() ){

		_clusterFields = $('.mns-modal-template > .mns-input-cluster.input-cluster-active > .mns-input-group');

		$.each(_clusterFields,function(k,v){

			_fields.push(v);

		});

	}

	var _fieldCount = $('.mns-modal-template > .mns-input-group').length;

	var _allParams = "";

	var _params = "";

	$.each(_fields,function(k,v){

		//Start Object
		_params += "{";

		//Cleaning up descriptor
		var _descriptor = '';
		if($( v ).find( '.mns-input-descriptor' ).length > 0){
			_descriptor = $( v ).find( '.mns-input-descriptor' ).text();
		}

		_params += '"descriptor":"' + _descriptor + '",';

		//Cleaning up label
		var _label = '';
		if($( v ).find( '.mns-input-label' ).length > 0){
			_label = $( v ).find( '.mns-input-label' ).text().replace(": ", "");
		}

		_params += '"label":"' + _label + '",';

		//Cleaning up input text
		var _input = '';

		if($( v ).find( 'input, select' ).length > 0){
			//Preform storage action based on input type
			switch( $( v ).find( 'input, select' ).attr("type") ){
				case "text":
					_input = $( v ).find( 'input' ).val().toString();
					_input = _input.replace(/"/g,'&quot;')
					_input = _input.replace('"','\"');
					break;
				case "select":
					_input = $( v ).find( 'select' ).val().replace(/"/g,'&quot;');
					_input = _input.replace('"','\"');
					break;
				case "date":
					var _date = $( v ).find( 'input' ).val().split("-");
					if( _date.length == 3 ){
						_input = _date[1] + "/" + _date[2] + "/" + _date[0];
					} else {
						_input = "";
					}
					break;
				default:
					_input = "";
					break;
			}
		}
		_params += '"value":"'+ _input +'"';


		_params += "},";

			//If there is a descriptor AND an input and the input is blank -> dont log the descriptor
		if( _descriptor !== "" && $( v ).find( 'input, select' ).length > 0 && _input === "" ){
			_params = "";
		}

		_allParams += _params;

		_params = "";

	});

	_allParams = '[' + _allParams + ']';

	_allParams = _allParams.replace(",]","]");

	//Place objects into an array
	_engine.storage.modalParams.set( _allParams );

	return;

});