app.controller("details_ctrl", function($scope, $http){
    $scope.form = {}
	$scope.items = []
	$scope.pro = []
	$scope.or = []
	$scope.voucherr = []
    $scope.start = 0;
    $scope.pt = 6;
    $scope.trang = 1;
    $scope.sizetrang = 0;
	$scope.statuss = ['Đang xác nhận','Đang giao','Đã giao'];
    $scope.tongtien = 0;
    
    $scope.load_all = function(){
        var url = `${host}/order_details`;
        $http.get(url).then(resp => {
            $scope.items = resp.data;
            let a = $scope.items.length / $scope.pt;
            for (let i = 0; i <a; i++) {
			  $scope.sizetrang = i+1;
			  document.getElementById("trang1").classList.add('bg-primary');
			   document.getElementById("trang2").classList.remove('bg-primary');
			   document.getElementById("trang3").classList.remove('bg-primary');
			}
            console.log("Success", resp)
        }).catch(error => {
            console.log("Error", error)
        });
    }
    
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
			}else if($scope.items.length <= $scope.pt){
        		$scope.bachgroup();
				$scope.end(1);
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
		   var a = $scope.items.length % $scope.pt;
		   if(a == 0){
			   a = $scope.pt;
		   }
           $scope.start = $scope.items.length -a;
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
        if (($scope.start+$scope.pt) > $scope.items.length-1) {
           //$scope.start = 0;
        } else {
           $scope.start += $scope.pt;
        }
        console.log($scope.start)
     }
     $scope.truoc = function () {
		var a = $scope.items.length % $scope.pt;
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
    
    $scope.load_all2 = function(){
        var url = `${host}/voucher/list`;
        $http.get(url).then(resp => {
            $scope.voucherr = resp.data;
        }).catch(error => {
            console.log("Error", error)
        });
    }
    
    $scope.load_all3 = function(){
        var url = `${host}/product/list`;
        $http.get(url).then(resp => {
            $scope.pro = resp.data;
        }).catch(error => {
            console.log("Error", error)
        });
    }
    
    $scope.load_all4 = function(){
        var url = `${host}/order`;
        $http.get(url).then(resp => {
            $scope.or = resp.data;
        }).catch(error => {
            console.log("Error", error)
        });
    }
    
    $scope.search = function(){
		if($scope.filterBy==null){
			$scope.load_all();
		}else{
	        var url = `${host}/order_details/search/`+ $scope.filterBy;
	        $http.get(url).then(resp => {
	            $scope.items = resp.data;
	        }).catch(error => {
	            console.log("Error", error)
	        });
		}
    }
    
    $scope.slprice = function(){
		console.log($scope.form.ordetail_quantity)
	}
    
    
    
    $scope.loadtrang = function(tr){
		 if(tr==null){
			 tr=1;
		 }
		 $scope.start = $scope.pt * (tr -1);
	 }
    
    $scope.setedit = function(){
			let ele = document.getElementById('profile-tab');
			let elee = document.getElementById('profile');
		 	// thêm class
		  	ele.classList.add('active');
		  	elee.classList.add('active','show');
		  	ele.ariaSelected = "false";
		  	let element = document.getElementById('home-tab');
		  	let elementt = document.getElementById('home');
		  	/* xoá nhiều class cùng một lúc*/
		  	element.classList.remove('active');
		  	elementt.classList.remove('active','show');
		  	element.ariaSelected = "true";
	}
    
     $scope.edit = function(ordetail_id){
        var url = `${host}/order_details/${ordetail_id}`;
        $http.get(url).then(resp => {
            $scope.form = resp.data;
            console.log("Success", resp);
            $scope.setedit();
        }).catch(error => {
            console.log("Error", error)
        });
    }
    
    $scope.reset = function(){
		var today = new Date();
		let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        $scope.form = {ordetail_isdelete: false, ordetail_status: 'Đang xác nhận', ordetail_createdate: date,order:{order_id: 100}};
        $scope.load_all();
        $scope.loadtrang();
        $scope.end(1);
    }
    
    $scope.loadgia = function(){
		var id = $scope.form.product_.product_id;
		$scope.itemdelete =[];
        var url = `${host}/product/${id}`;
        $http.get(url).then(resp => {
            $scope.itemdelete = resp.data;
			$scope.form.ordetail_price = $scope.itemdelete.product_price;
        }).catch(error => {
            console.log("Error1", error)
        });
	}
    
    $scope.validate = function(){
		 let a = document.forms["myForm"]["quantity"].value.length;
		 let b = document.forms["myForm"]["price"].value.length;
		 let c = document.forms["myForm"]["createdate"].value.length;
		if (a > 0 && b > 0 && c > 0 ) {
		 	return true;
        }else{
			return false;
		}
	}
    
    $scope.update = function(){
        var item = angular.copy($scope.form);
        var url = `${host}/order_details/${$scope.form.ordetail_id}`;
	        $http.put(url, item).then(resp => {
	            var index = $scope.items.findIndex(item => item.ordetail_id == $scope.form.ordetail_id);
	            $scope.items[index] = resp.data;
	            $scope.reset();
	            console.log("Success", resp)
	        }).catch(error => {
	            console.log("Error", error)
	        });     
    }
    
    $scope.create = function(){
       var item = angular.copy($scope.form);
	   let mahd = document.forms["myForm"]["mahd"].value.length;
       console.log(mahd)
       console.log(item)
		if($scope.validate()==true){
	        item.ordetail_createdate = document.querySelector('input[type="date"]').value;
	        var url = `${host}/order_details`;
	        $http.post(url, item).then(resp => {
	            $scope.items.push(item);
	            $scope.reset();
	            console.log("Success", resp)
	        }).catch(error => {
	            console.log("Error", error)
	        });
	    }
		let b = document.forms["myForm"]["price"].value.length;
	    if(b==0){
			alert("Vui lòng chọn sản phẩm")
		}
    }
    

	 $scope.delete = function(id){
	    	$scope.itemdelete =[];
	        var url = `${host}/order_details/${id}`;
	        $http.get(url).then(resp => {
	        	resp.data.ordetail_isdelete = 'true';
	            $scope.itemdelete = resp.data;
	            //delete
	            var url2 = `${host}/order_details`;
				if(confirm("Bạn chắc chắn muốn xoá không?")){
			        $http.post(url2, $scope.itemdelete).then(resp => {
			            $scope.items.push($scope.itemdelete);
			            $scope.reset();
			        }).catch(error => {
			            console.log("Error", error)
			        });
		        }
	        }).catch(error => {
	            console.log("Error1", error)
	        });
	    }
	    
	    
	    
    $scope.sxtk1 = 1;
    $scope.sxtk2 = 1;
    $scope.sxtk3 = 1;
    $scope.sxtk4 = 1;
    $scope.sxtk5 = 1;
    $scope.sxtk6 = 1;
    $scope.sxtk7 = 1;
    $scope.sxtk8 = 1;
    $scope.sxtk9 = 1;
    $scope.sx;
	$scope.loadsx = function(x,y){
		if(x == 1){
			if(y % 2 ==0){
				$scope.sx = "ordetail_id";
			}else{
				$scope.sx = "-ordetail_id";
			}
		}else if(x == 2){
			if(y % 2 ==0){
				$scope.sx = "order.order_id";
			}else{
				$scope.sx = "-order.order_id";
			}
		}else if(x == 3){
			if(y % 2 ==0){
				$scope.sx = "product_.product_id";
			}else{
				$scope.sx = "-product_.product_id";
			}
		}else if(x == 4){
			if(y % 2 ==0){
				$scope.sx = "product_.product_name";
			}else{
				$scope.sx = "-product_.product_name";
			}
		}else if(x == 5){
			if(y % 2 ==0){
				$scope.sx = "ordetail_quantity";
			}else{
				$scope.sx = "-ordetail_quantity";
			}
		}else if(x == 6){
			if(y % 2 ==0){
				$scope.sx = "ordetail_price";
			}else{
				$scope.sx = "-ordetail_price";
			}
		}else if(x == 7){
			if(y % 2 ==0){
				$scope.sx = "voucher_.voucher_desc";
			}else{
				$scope.sx = "-voucher_.voucher_desc";
			}
		}else if(x == 8){
			if(y % 2 ==0){
				$scope.sx = "ordetail_createdate";
			}else{
				$scope.sx = "-ordetail_createdate";
			}
		}else{
			if(y % 2 ==0){
				$scope.sx = "ordetail_status";
			}else{
				$scope.sx = "-ordetail_status";
			}
		}
		
	}
    $scope.sapxep1 = function(a){
			$scope.sxtk1 += 1;
			$scope.loadsx(1,$scope.sxtk1)
	}
	$scope.sapxep2 = function(a){
			$scope.sxtk2 += 1;
			$scope.loadsx(2,$scope.sxtk2)
	}
	$scope.sapxep3 = function(a){
			$scope.sxtk3 += 1;
			$scope.loadsx(3,$scope.sxtk3)
	}
	$scope.sapxep4 = function(a){
			$scope.sxtk4 += 1;
			$scope.loadsx(4,$scope.sxtk4)
	}
	$scope.sapxep5 = function(a){
			$scope.sxtk5 += 1;
			$scope.loadsx(5,$scope.sxtk5)
	}
	$scope.sapxep6 = function(a){
			$scope.sxtk6 += 1;
			$scope.loadsx(6,$scope.sxtk6)
	}
	$scope.sapxep7 = function(a){
			$scope.sxtk7 += 1;
			$scope.loadsx(7,$scope.sxtk7)
	}
	$scope.sapxep8 = function(a){
			$scope.sxtk8 += 1;
			$scope.loadsx(8,$scope.sxtk8)
	}
	$scope.sapxep9 = function(a){
			$scope.sxtk9 += 1;
			$scope.loadsx(9,$scope.sxtk9)
	}

    $scope.load_all();
    $scope.load_all2();
    $scope.load_all3();
    $scope.load_all4();
    $scope.reset();
    $scope.loadsx(1,1);
});