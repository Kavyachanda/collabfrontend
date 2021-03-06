var app = angular.module('blogapp',[]);
app.controller('Blogcontroller', [ '$scope', '$http','$location','$rootScope', function($scope, $http,$location,$rootScope) {
var BASE_URL = 'http://localhost:8081/collabbackend';

$scope.getAllBlogs= function() {
console.log("get all blogs")

$http({
method : 'GET',
url : BASE_URL+'/blog'
}).success(function(data, status, headers, config) {
$scope.blogs=data;
//alert(data); 
}).error(function(data, status, headers, config) {
alert("Error");
});
};

$scope.submit = function() {
console.log("create blog")

$scope.blog = { 
id:$scope.id,
title : $scope.title,
userid:$scope.userid,
doc:$scope.doc,
description : $scope.description,
}

$http({
method : 'POST',
url : BASE_URL + '/createblog',
data : $scope.blog
}).success(function(data, status, headers, config) {
$scope.id='';
$scope.title='';
$scope.userid='';
$scope.doc='';
$scope.description='';
$scope.getAllBlogs();
}).error(function(data,status,headers,config){
alert("error");
});
};


$scope.deleteblog=function(id){

	$http({
method:'DELETE',
url:BASE_URL+'/deleteblog/'+id
}).success(function(data,status,headers,config){
$scope.getAllBlogs();
})
};

$scope.editblog=function(id,title,description){
$scope.id=id;
$scope.title=title;
$scope.description=description;
};

$scope.like=function(id){
	$http({
		method : 'POST',
		url : BASE_URL + '/likeblog/'+id,
	}).success(function(data, status, headers, config) {
		alert("success")
	})
	
}

$scope.getblog=function(id){
	
	console.log("iblog")
	$http({
		method: "GET",
		url:BASE_URL+'/individualblog/'+id,
	}).success(function(data,status,headers,config){
		$location.path('/individualblog');
		$rootScope.individualblogs=data;
		console.log(data)
	}).error(function(data, status, headers, config) {
		alert("Error");
	});
}

}]);