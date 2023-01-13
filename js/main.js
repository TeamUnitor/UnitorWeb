if ('serviceWorker' in navigator) {
 console.log('Service Worker is supported');
 navigator.serviceWorker.register('sw.js').then(function(reg) {
   console.log(':^)', reg);
   // TODO
 }).catch(function(err) {
   console.log(':^(', err);
 });
}
// This our standard require js bootstrap file.  It assumes you are using the
// require-jquery.js file that require.js provides
// Set the require.js configuration for the application
require.config({
	
	// Base path used to load scripts
	baseUrl: 'js/',
	
	// Prevent caching during dev
	urlArgs: "bust=" + (new Date()).getTime(),
	
	// Exclude these modules on build
	stubModules: ['text'],
	
	// Set common library paths
	paths: {
		jquery: 'empty:', // jquery is already loaded
		underscore: 'libs/underscore',
		backbone: 'libs/backbone'
	}
});

// Define the application entry point
define('main', function (require) {
	
	// Dependencies
	var $ = require('jquery'),
		router = require('router'); // This is the router.js file.  Note, it gets invoked before DOM is loaded

	// Auto go to a project detail page.  Trigger = true will tell it to run the callback
	// function from the router definition.
	router.navigate("project/some-slug", {trigger:true})
	
});

// Start the application
require(['main']);