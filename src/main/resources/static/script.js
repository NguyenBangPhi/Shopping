//var myApp = angular.module('shopping-cart-app', ['angularUtils.directives.dirPagination']);

//myApp.config(function(paginationTemplateProvider) {
//    paginationTemplateProvider.setPath('/customTemplate.html');
//});

function MyController($scope,$http) {

  $scope.currentPage = 1;
  $scope.pageSize = 12;
  $scope.meals = [];
  $scope.items = [];

  var dishes = [
    'noodles',
    'sausage',
    'beans on toast',
    'cheeseburger',
    'battered mars bar',
    'crisp butty',
    'yorkshire pudding',
    'wiener schnitzel',
    'sauerkraut mit ei',
    'salad',
    'onion soup',
    'bak choi',
    'avacado maki'
  ];
  var sides = [
    'with chips',
    'a la king',
    'drizzled with cheese sauce',
    'with a side salad',
    'on toast',
    'with ketchup',
    'on a bed of cabbage',
    'wrapped in streaky bacon',
    'on a stick with cheese',
    'in pitta bread'
  ];
//   for (var i = 1; i <= 100; i++) {
//     var dish = dishes[Math.floor(Math.random() * dishes.length)];
//     var side = sides[Math.floor(Math.random() * sides.length)];
//     $scope.meals.push('meal ' + i + ': ' + dish + ' ' + side);
//   }

  $scope.load_all = function() {
    var url = `http://localhost:8080/rest/product`;
    $http.get(url).then(resp => {
        //$scope.items = resp.data;
        $scope.meals = resp.data;
        console.log("Success", resp);
    }).catch(error => {
        console.log("Error",error);
    })
    
}
$scope.load_all(); 
  $scope.pageChangeHandler = function(num) {
      console.log('meals page changed to ' + num);
  };
}

function OtherController($scope) {
  $scope.pageChangeHandler = function(num) {
    console.log('going to page ' + num);
  };
}

let container = document.getElementById('container');
let count = 50;
for(var i = 0; i<200; i++){
    let leftSnow = Math.floor(Math.random() * container.clientWidth);
    let topSnow = Math.floor(Math.random() * container.clientHeight);
    let widthSnow = Math.floor(Math.random() * 50);
    let timeSnow = Math.floor((Math.random() * 5) + 5);
    let blurSnow = Math.floor(Math.random() * 10);
    //console.log(leftSnow);
    let div = document.createElement('div');
    div.classList.add('snow');
    div.style.left = leftSnow + 'px';
    div.style.top = topSnow + 'px';
    div.style.width = widthSnow + 'px';
    div.style.height = widthSnow + 'px';
    div.style.animationDuration = timeSnow + 's';
    div.style.filter = "blur(" + blurSnow + "px)";
    container.appendChild(div);
}