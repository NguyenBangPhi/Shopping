app.controller("thongke-ctrl", function($scope, $http){
   $scope.ngay1 ="2022-12-01";
   $scope.ngay2 = new Date();
   $scope.items = []
   
   //thongke
	$scope.secondRowRevenueByDate = [];
	$scope.secondRowRevenueByRevenue = [];
	$scope.secondRowCateName = [];
	$scope.secondRowNumberOfProduct= [];
	
   $scope.load_all = function(){
	   var today = new Date();
	   var date = today.getFullYear() +'-'+(today.getMonth()+1)+'-'+ today.getDate();
	   var a = document.getElementById("ngay1").value;
	   var b = document.getElementById("ngay2").value;
	   if(a==""){
		   a = '2022-12-01';
	   }
	   if(b==""){
		   b = date;
	   }
		var url = `${host}/thongke/`+a+'/'+b;
		console.log(url)
        $http.get(url).then(resp => {
            $scope.items = resp.data;
            console.log("Success", resp )
        }).catch(error => {
            console.log("Error", error)
        });
	}
	
   $scope.load_all();
   //$scope.initialize();
});