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
            console.log("Success", resp)
        }).catch(error => {
            console.log("Error", error)
        });
	}
	
	
	// $scope.initialize = function() {
	// 	$http.get("/rest/thongke/secondRow").then(resp=>{
	// 		//revenue last 7days
	// 		resp.data.revenueLast7Days.forEach(e=>{
	// 			$scope.secondRowRevenueByDate.push($filter('date')(e[0],'dd-MM-yyyy'));
	// 			$scope.secondRowRevenueByRevenue.push(e[1]);
	// 		})
	// 		//product sold by categories
	// 		resp.data.productSoldByCate.forEach(e=>{
	// 			$scope.secondRowCateName.push(e[0]);
	// 			$scope.secondRowNumberOfProduct.push(e[1]);
	// 		})
	// 		//line chart for Revenue last 7 days
	// 		var dateListRevenue = $scope.secondRowRevenueByDate
	// 		var revenueListByDays = $scope.secondRowRevenueByRevenue
	// 		var lineRevenueChart = document.getElementById('myLineChartRevenue').getContext('2d');
	// 		var myChart = new Chart(lineRevenueChart, {
	// 	        type: 'line',
	// 	        data: {
	// 	            labels: dateListRevenue,
	// 	            datasets: [{
	// 	                // label: 'User By Roles',
	// 	                data: revenueListByDays,
	// 	                backgroundColor: [
	// 	                'rgb(54, 162, 235,0.7)',//blue
	// 	                'rgb(201, 203, 207,0.7)',//gray
	// 	                'rgb(255, 205, 86,0.7)',//yellow
	// 	                'rgb(75, 192, 192)',//green
	// 	                'rgb(255, 99, 132)',//red
	// 	                ],
	// 	                borderColor: ['rgb(54, 162, 235,1)'],//green
	// 	                fill: true,
	// 	                lineTension:0,
	// 	                borderWidth: 3
	// 	            }]
	// 	        },
	// 	        options: {
	// 	            indexAxis: 'x',
	// 	            scales: {
		
	// 	            },
	// 	            responsive: true,
	// 	            plugins: {
	// 	                title: {
	// 	                    display: false,
	// 	                    // text: 'Number of Registered Users By Roles',
	// 	                    padding: {
	// 	                        bottom: 30,
	// 	                    },
	// 	                    font:{
	// 	                        size:20
	// 	                    }
	// 	                },
	// 	                legend: {
	// 	                display:false
	// 	                },
					
	// 		        },
	// 	        }
	// 	    });
	// 	    //bar chart for category by number of product sold
	// 	    var productTypeList = $scope.secondRowCateName;
	// 	    var numberSoldByType = $scope.secondRowNumberOfProduct;
	// 	    var barChartSoldByType = document.getElementById('myBarChartSoldByType').getContext('2d');
	// 	    var gradient = barChartSoldByType.createLinearGradient(0, 0, 600, 0);
	// 	    	gradient.addColorStop(0, 'rgba(123,149,198,1)');
	// 	        gradient.addColorStop(1, 'rgba(255,0,212,0.7)');   
	// 	    var myChart = new Chart(barChartSoldByType, {
	// 	        type: 'bar',
	// 	        data: {
	// 	            labels: productTypeList,
	// 	            datasets: [{
	// 	                // label: '# of Votes',
	// 	                data: numberSoldByType,
	// 	                // backgroundColor: colorArrays1,
	// 	                // borderColor: colorArrays1,
		
	// 	                backgroundColor  : gradient,
	// 	                strokeColor : "#ff6c23",
	// 	                pointColor : "#fff",
	// 	                pointStrokeColor : "#ff6c23",
	// 	                pointHighlightFill: "#fff",
	// 	                pointHighlightStroke: "#ff6c23",
		
	// 	                borderWidth: 1
	// 	            }]
	// 	        },
	// 	        options: {
	// 	            indexAxis: 'y',
	// 	            scales: {
	// 	                y: {
	// 	                    beginAtZero: true
	// 	                }
	// 	            },
	// 	            responsive: true,
	// 	            plugins: {
	// 	                title: {
	// 	                    display: false,
	// 	                    text: 'Payment status last 7 days',
	// 	                    padding: {
	// 	                        bottom: 10,
	// 	                    },
	// 	                    font:{
	// 	                        size:20
	// 	                    }
	// 	                },
	// 	                legend: {
	// 	                    display:false,
	// 	                },
					
	// 		        },
	// 	        }
	// 	    });
	// 	})
		
	// }
   
   
   $scope.load_all();
   //$scope.initialize();
});