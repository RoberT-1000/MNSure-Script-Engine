/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('ui/modal/_changeActiveCluster',function( modalTarget, subjectValue ){

	if( _engine.ui.modal._clustersActive( modalTarget ) ){

		var _activeCluster = $('[data-id='+modalTarget+']  span.mns-input-cluster.input-cluster-active');

		if( _activeCluster.length == 1 ){
			$( _activeCluster ).removeClass('input-cluster-active');
		}

		var _clusters = $('[data-id='+modalTarget+'] span.mns-input-cluster');

		$.each(_clusters,function(k,v){

			var _clusterTitle = $(v).attr('data-cluster-title');

			if( _clusterTitle == subjectValue ){

				$( v ).addClass( 'input-cluster-active' );

			}

		});

	}

});