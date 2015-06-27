angular
// load app namespace
.module('app')
// load configure function
.config(configure);

// set dependencies
configure.$inject = ['$locationProvider'];

// configure function
function configure($locationProvider) {
	// load location provider
	$locationProvider
	// set hash prefix
	.hashPrefix('!')
	// set html5 mode
	.html5Mode({
		enabled 	 : true,
		requireBase  : true,
		rewriteLinks : true 
	});
};