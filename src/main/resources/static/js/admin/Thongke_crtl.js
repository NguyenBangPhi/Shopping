app.controller("thongke-ctrl", function($scope, $http){
   $scope.ngay1 ="2022-12-01";
   $scope.ngay2 = new Date();
   $scope.items = []
   $scope.pro = []
   $scope.or = []
   $scope.x = 1;
   $scope.start = 0;
   $scope.pt = 5;
   $scope.trang = 1;
   $scope.sizetrang = 0;
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
            
			$scope.secondRowCateName = [];
			$scope.secondRowNumberOfProduct= [];
            //bieudo
            //brand
            for (var i=0; i<$scope.items.productSoldByCate.length; i++) {
		       $scope.secondRowCateName.push($scope.items.productSoldByCate[i][0]);
		       $scope.secondRowNumberOfProduct.push($scope.items.productSoldByCate[i][1]);
		    }
		    //user
		    $scope.secondRowUsername = [];
		    $scope.secondRowNumberUser= [];
		    for (var i=0; i<$scope.items.ordertopuser.length; i++) {
		       $scope.secondRowUsername.push($scope.items.ordertopuser[i][0]);
		       $scope.secondRowNumberUser.push($scope.items.ordertopuser[i][1]);
		    }
		    //pro
		    $scope.secondRowProname = [];
		    $scope.secondRowNumberPro= [];
		    for (var i=0; i<$scope.items.ordetailslsp7day.length; i++) {
		       $scope.secondRowProname.push($scope.items.ordetailslsp7day[i][0]);
		       $scope.secondRowNumberPro.push($scope.items.ordetailslsp7day[i][1]);
		    }
        	//xoa add lai bieu do
			let toRemove = document.querySelector("#myChart");
			toRemove.remove();
			let toAdd = document.createElement("canvas");
			toAdd.id="myChart";
			let Addcava = document.getElementById("addcanva");
			Addcava.appendChild(toAdd);
			
			var canv =  document.createElement("canvas");
			canv.setAttribute("id","myChart");
			var ctx = document.getElementById('myChart');
			var myChart = new Chart(ctx, {
		      type: 'bar',
		      data: {
		        labels: $scope.secondRowUsername,
		        datasets: [{
		          label: '# Đơn hàng',
		          data: $scope.secondRowNumberUser,
		          borderWidth: 1
		        }]
		      },
		      options: {
		        scales: {
		          y: {
		            beginAtZero: true
		          }
		        }
		      }
		    });
		    //xoa add lai bieu do
			let toRemove2 = document.querySelector("#myChart2");
			toRemove2.remove();
			let toAdd2 = document.createElement("canvas");
			toAdd2.id="myChart2";
			let Addcava2 = document.getElementById("addcanva2");
			Addcava2.appendChild(toAdd2);
		    // brand
			var ctx2 = document.getElementById('myChart2');
			var myChart2 = new Chart(ctx2, {
			  type: 'doughnut',
			  data: {
				  labels: $scope.secondRowCateName,
				  datasets: [{
				    label: '# SL',
				    data: $scope.secondRowNumberOfProduct,
				    backgroundColor: [
				      'rgb(255, 99, 132)',
				      'rgb(54, 162, 235)',
				      'rgb(255, 205, 86)',
				      'rgb(255, 51, 204)',
				      'rgb(51, 204, 51)',
				      'rgb(255, 255, 0)',
				      'rgb(204, 0, 204)',
				      'rgb(0, 255, 153)'
				    ],
				    hoverOffset: 4
				  }]
			  }
			});
			//product
			let toRemove3 = document.querySelector("#myChart3");
			toRemove3.remove();
			let toAdd3 = document.createElement("canvas");
			toAdd3.id="myChart3";
			let Addcava3 = document.getElementById("addcanva3");
			Addcava3.appendChild(toAdd3);
			var ctx3 = document.getElementById('myChart3');
			var myChart3 = new Chart(ctx3, {
		      type: 'bar',
		      data: {
		        labels: $scope.secondRowProname,
		        datasets: [{
		          label: '# SP',
		          data: $scope.secondRowNumberPro,
			      backgroundColor: [
				      'rgba(255, 99, 132, 0.2)',
				      'rgba(255, 159, 64, 0.2)',
				      'rgba(255, 205, 86, 0.2)',
				      'rgba(75, 192, 192, 0.2)',
				      'rgba(54, 162, 235, 0.2)',
				      'rgba(153, 102, 255, 0.2)',
				      'rgb(186, 223, 150, 0.4)',
				      'rgb(204, 255, 153, 0.6)',
				      'rgb(196, 196, 196, 0.4)',
				      'rgb(201, 243, 201)',
				      'rgb(163, 215, 215, 0.2)',
				      'rgb(0, 255, 204, 0.2)'
				    ],
		          borderWidth: 1
		        }]
		      },
		      options: {
		        scales: {
		          y: {
		            beginAtZero: true
		          }
		        }
		      }
		    });
        }).catch(error => {
            console.log("Error", error)
        });
	}
	
	$scope.load_all2 = function(){
        var url = `${host}/product/list`;
        $http.get(url).then(resp => {
            $scope.pro = resp.data;
            console.log("pro", resp )
        }).catch(error => {
            console.log("Error", error)
        });
    }
    
    $scope.load_all3 = function(){
        var url = `${host}/order`;
        $http.get(url).then(resp => {
            $scope.or = resp.data;
            console.log("or", resp )
        }).catch(error => {
            console.log("Error", error)
        });
    }
    
   	$scope.tkpro = []
   	$scope.tkctpro = []
    $scope.locpro = function(){
		if($scope.proid == null){
			$scope.proid = 1;
		}
        var url = `${host}/order_details/tk/pro/`+$scope.proid;
        var url2 = `${host}/order_details/tk/ctpro/`+$scope.proid;
        $http.get(url).then(resp => {
            $scope.tkpro = resp.data;
//            if($scope.tkpro.length==0){
//				$scope.tkpro = [[$scope.proid,0,0,0,0,0]]
//			}
            console.log("tkpro", $scope.tkpro)
        }).catch(error => {
            console.log("Error", error)
        });
        //ctpro
        $http.get(url2).then(resp => {
            $scope.tkctpro = resp.data;
            //pt
            let a = $scope.tkctpro.length / $scope.pt;
            for (let i = 0; i <a; i++) {
			  $scope.sizetrang = i+1;
			  console.log("size", $scope.sizetrang)
			  console.log("a", a)
			  console.log("length", $scope.tkctpro)
			  document.getElementById("trang1").classList.add('bg-primary');
			   document.getElementById("trang2").classList.remove('bg-primary');
			   document.getElementById("trang3").classList.remove('bg-primary');
			}
            console.log("tkctpro", $scope.tkctpro)
        }).catch(error => {
            console.log("Error", error)
        });
    }
    
   	$scope.tkor = []
   	$scope.tkctor = []
   	$scope.xn;
   	$scope.dg;
   	$scope.g;
   	$scope.tongor;
    $scope.locor = function(){
		if($scope.orid == null){
			$scope.orid = 100;
		}
        var url = `${host}/order_details/tk/order/`+$scope.orid;
        var url2 = `${host}/order_details/tk/ctorder/`+$scope.orid;
        //or
         $http.get(url).then(resp => {
            $scope.tkor = resp.data;
            console.log("tkor", $scope.tkor)
        }).catch(error => {
            console.log("Error", error)
        });
        //ctpro
        $http.get(url2).then(resp => {
            $scope.tkctor = resp.data;
            //or status
            //reset ve 0
		   	$scope.xn = 0;
		   	$scope.dg = 0;
		   	$scope.g = 0;
		   	$scope.tongor = 0;
            for (var i=0; i<$scope.tkctor.length; i++) {
   				$scope.tongor += $scope.tkctor[i][7];
				if($scope.tkctor[i][5]=="Đã giao"){
					$scope.g += 1;
				}
				if($scope.tkctor[i][5]=="Đang xác nhận"){
					$scope.xn += 1;
				}
				if($scope.tkctor[i][5]=="Đang giao"){
					$scope.dg += 1;
				}
		    }
            console.log("tkctor", $scope.tkctor)
        }).catch(error => {
            console.log("Error", error)
        });
        
        
    }
    
    //pt -----------------------------------------
    $scope.showtrang1 = function(){
		if($scope.sizetrang>1){
			return true;
		}
		return false;
	}
	$scope.showtrang2 = function(){
		if($scope.sizetrang>2){
			return true;
		}
		return false;
	}
	
	$scope.test = function(t){
		if(t==1){
			if($scope.trang == $scope.sizetrang-2 && $scope.trang*$scope.pt == $scope.start){
            	$scope.bachgroup();
			}else if($scope.trang == 1){
				console.log("Start")
				document.getElementById("trang1").classList.add('bg-primary');
				document.getElementById("trang2").classList.remove('bg-primary');
				document.getElementById("trang3").classList.remove('bg-primary');
			}else {
				$scope.trang -= 1;
            	$scope.bachgroup();
			}
		}else{
			if($scope.trang == 1 && $scope.start == $scope.pt){
        		$scope.bachgroup();
			}else if($scope.tkctpro.length <= $scope.pt){
        		$scope.bachgroup();
				$scope.end(1);
			}else if($scope.trang+2 == $scope.sizetrang){
				document.getElementById("trang3").classList.add('bg-primary');
				document.getElementById("trang2").classList.remove('bg-primary');
				document.getElementById("trang1").classList.remove('bg-primary');
				console.log("End")
			}else{
				$scope.trang += 1;
            	$scope.bachgroup();
			}
		}
	}
    
    $scope.end = function (t) {
        if (t==1) {
           $scope.start = 0;
           $scope.trang = 1;
		   document.getElementById("trang1").classList.add('bg-primary');
		   document.getElementById("trang2").classList.remove('bg-primary');
		   document.getElementById("trang3").classList.remove('bg-primary');
        } else {
		   var a = $scope.tkctpro.length % $scope.pt;
		   if(a == 0){
			   a = $scope.pt;
		   }
           $scope.start = $scope.tkctpro.length -a;
           if($scope.sizetrang>2){
           		$scope.trang = $scope.sizetrang-2;
			    document.getElementById("trang3").classList.add('bg-primary');
			    document.getElementById("trang2").classList.remove('bg-primary');
		   }else{
			   	$scope.trang = 1;
		   		document.getElementById("trang2").classList.add('bg-primary');
		   		document.getElementById("trang3").classList.remove('bg-primary');
		   }
		   document.getElementById("trang1").classList.remove('bg-primary');
        }
     }
     
     $scope.bachgroup = function(){
		document.getElementById("trang2").classList.add('bg-primary');
		document.getElementById("trang1").classList.remove('bg-primary');
		document.getElementById("trang3").classList.remove('bg-primary');
	 }
     
     $scope.tiep = function () {
        if (($scope.start+$scope.pt) > $scope.tkctpro.length-1) {
           //$scope.start = 0;
        } else {
           $scope.start += $scope.pt;
        }
        console.log($scope.start)
     }
     $scope.truoc = function () {
		var a = $scope.tkctpro.length % $scope.pt;
        if ($scope.start == 0) {
			
        } else {
           	$scope.start -= $scope.pt;
        }
     }
     $scope.loadtrang = function(tr){
		 if(tr==null){
			 tr=1;
		 }
		 $scope.start = $scope.pt * (tr -1);
		 console.log($scope.start)
	 }
    
	
	
   
    
	
   $scope.load_all();
   $scope.load_all2();
   $scope.load_all3();
   $scope.locpro();
   $scope.locor();
   $scope.loadtrang();
   $scope.end(1);
});