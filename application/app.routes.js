angular
// load app namespace
.module('app')
// route configuration
.config(function($stateProvider, $urlRouterProvider) {
	// if any url does not match
	$urlRouterProvider.otherwise('/');

	// set up application states
	$stateProvider
	// default state
	.state('default', {
		url 		: '/',
		template 	: '<h1>Angular Bootstrap Application',
		data 		: { title : 'Homepage' }
	});
})
// run block
.run(runConfigRouter);

// inject dependencies
runConfigRouter.$inject = ['$rootScope', '$state', '$stateParams'];

// run config router function
function runConfigRouter($rootScope, $state, $stateParams) {
	// set state to root scope
	$rootScope.$state 		= $state;
	// set state params to root scope
	$rootScope.$stateParams = $stateParams;
};