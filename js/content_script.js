/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */

/* Dependency Loading
-------------------------------------------------*/

	// Setting up app config
var config = {
	commit: {
		current: '',
		master: '',
		beta: ''
	},
	extension: {
		url: chrome.extension.getURL(''),
		id: chrome.runtime.id
	},
	advanced: {
		baseUrl: ''
	}
}

var commitVersion = window.location.href.split("?");
if( commitVersion.length > 1 ) config.commit.current = commitVersion[1].trim();

	// Setting up app fallback cache
if( typeof window.localStorage.mnsEngine_fallbackCache === 'undefined' ){
	window.localStorage.mnsEngine_fallbackCache = encodeURIComponent(
		JSON.stringify({
			master: {	sha: '', current: false, modules: [] },
			beta: { sha: '', current: false, modules: [] }
		})
	);
}

var fallbackCache = JSON.parse( decodeURIComponent( window.localStorage.mnsEngine_fallbackCache ) );

	//Program to launch app

var launchApp = function(){
	
	/* Update Cache */
	window.localStorage.mnsEngine_fallbackCache = encodeURIComponent( JSON.stringify( fallbackCache )	);
	
	/* Setup Preload Variables */
	config.advanced.baseUrl = "https://cdn.rawgit.com/lpshanley/MNSure-Script-Engine/" + config.commit[config.commit.current] + "/";

	/* Store Commit info into local storage */
	window.localStorage.setItem( "mnsEngine_Config", encodeURIComponent(JSON.stringify(config)));

	/* Add Scripts and Build menu item to attach to MNS */
	var _styles = $('<link>', {href: 'https://cdn.rawgit.com/lpshanley/MNSure-Script-Engine/'+ config.commit[config.commit.current] +'/css/appStyles.css', rel: 'stylesheet', type: 'text/css', 'data-ScriptEngine': '' });
	$( 'head' ).append( _styles );

	var _jquery = $('<script>',{ 'src': 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js' });
	$( 'head' ).append( _jquery );

	var _app = $('<script>',{ 'src': 'https://cdn.rawgit.com/lpshanley/MNSure-Script-Engine/'+ config.commit[config.commit.current] +'/js/app.js', 'data-ScriptEngine': '' });
	$( 'head' ).append( _app );

		/* Script Engine
		-------------------------------------------------*/

		/* Build Link
		====================*/
		
		//Create Link Item
	var scriptButtonLink = $('<a>', {'class': '', text: 'Scripts'});

		//Create Menu Item
	var scriptButtonListItem = $('<li>',{'class': 'right-border scripts-link', 'style':'display:none;', html: scriptButtonLink, id: 'script-launcher'});

		//Inject Menu Item
	$('#app-banner .right-box .right-cell ul').prepend( scriptButtonListItem );

		//Add custom div to header bar.
	var _customDiv = $('<div>', {'class': 'center-box', 'style':'display:none;'});

	$( _customDiv ).insertAfter( '#app-banner > div.left-box' );
	
}

$.ajax({
	url: "https://api.github.com/repos/lpshanley/MNSure-Script-Engine/branches?access_token=e4ad5080ca84edff38ff06bea3352f30beafaeb1",
	type: 'get',
	dataType: 'json',
	async: false,
	success: function( data ){
		
		$.each(data,function(k,v){
			if(v.name !== 'current'){
				if(typeof config.commit[v.name] !== 'undefined') config.commit[v.name] = '';
				config.commit[v.name] = v.commit.sha.substring(0,7);
				
				if( ( v.name === 'master' || v.name === 'beta' ) && fallbackCache[v.name].sha !== v.commit.sha.substring(0,7) ){
					fallbackCache[v.name].sha = v.commit.sha.substring(0,7);
					fallbackCache[v.name].current = false;
					fallbackCache[v.name].modules = [];
				}
				
			}
		});
		if(typeof config.commit[config.commit.current] === 'undefined') config.commit.current = "master";
		launchApp();
	},
	error: function(){
			//If github is unavailable check that version is master or beta, if not, set to master
		if(typeof config.commit[config.commit.current] === 'undefined') config.commit.current = "master";
		if( ['master','beta'].indexOf( config.commit.current ) === -1 ){
			config.commit.current = 'master';
		}
			//If the cache has a version setup to load from, configure config with values from cache
		if( fallbackCache[config.commit.current].sha !== '' ){
			config.commit[config.commit.current] = fallbackCache[config.commit.current].sha;
			launchApp();
		} else {
			window.localStorage.setItem( "mnsEngine_Config", encodeURIComponent(JSON.stringify(config)));
			console.error('Unable to load script engine at this time. Please try again later.');
		}
	},
});