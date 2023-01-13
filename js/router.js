define(function(require) {

	// Dependencies
	var $ = require('jquery'),
		Backbone = require('backbone');
		
	// Create router.  We're assuming you aren't doing anything nuts, thus a single router
	// for the whole site is suffient
	var AppRouter = Backbone.Router.extend({
		
		// Define routes
		routes: {
			"": "home",
			"projects": "projects",
			"project/:slug": "project",
		  },
		  
		// Handle those routes.  These callbacks get called when navigate is called with
		// trigger = true
		project: function(slug) { },
		projects: function() {},
		home: function() {} // The home page
	});
	
	// Listen for history changes
	Backbone.history.start({
		pushState: true,
		silent: true // This assumes that the server is handling the initial route and rendering your deep link
	});
	
	// Return the router for triggering links
	return new AppRouter;

});