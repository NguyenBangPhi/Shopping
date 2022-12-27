app.controller("order_ctrl", function($scope, $http){
    $scope.form = {}
    $scope.items = []
    $scope.user2 = []
    $scope.start = 0;
    $scope.pt = 5;
	$scope.statuss = ['Đang xác nhận','Đang giao','Đã giao'];
    $scope.trang = 1;
    $scope.sizetrang = 0;
	
    $scope.load_all = function(){
        var url = `${host}/order`;
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
    
    $scope.loadfullname = function(){
		var id = $scope.form.user.user_username;
		$scope.itemdelete =[];
        var url = `${host}/user/${id}`;
        $http.get(url).then(resp => {
            $scope.itemdelete = resp.data;
			$scope.form.order_fullname = $scope.itemdelete.user_fullname;
			$scope.form.order_email = $scope.itemdelete.user_mail;
			$scope.form.order_phone = $scope.itemdelete.user_phone;
        }).catch(error => {
            console.log("Error1", error)
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
			}else if($scope.items.length <= $scope.pt){
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
        var url = `${host}/user`;
        $http.get(url).then(resp => {
            $scope.user2 = resp.data;
            console.log("Success", resp)
        }).catch(error => {
            console.log("Error", error)
        });
    }
		
    $scope.search = function(){
		if($scope.filterBy==null){
			$scope.load_all();
		}else{
	        var url = `${host}/order/search/`+ $scope.filterBy;
	        $http.get(url).then(resp => {
	            $scope.items = resp.data;
	            $scope.user2 = $scope.items;
	            if($scope.items.length==0){
					url = `${host}/order/search2/`+ $scope.filterBy;
					$http.get(url).then(resp => {
			            $scope.items = resp.data;
			        }).catch(error => {
			            console.log("Error", error)
			        });
				}
	            let a = $scope.items.length / $scope.pt;
	            for (let i = 0; i <a; i++) {
				  $scope.trang[i] = i+1;
				}
	            console.log("Success", resp)
	        }).catch(error => {
	            console.log("Error", error)
	        });
		}
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
	
     $scope.edit = function(order_id){
        var url = `${host}/order/${order_id}`;
        $http.get(url).then(resp => {
            $scope.form = resp.data;
            console.log("Success", $scope.form);
            //document.getElementById("exampleFormControlSelect2").value = $scope.form.user.user_id;
           	$scope.setedit();
        }).catch(error => {
            console.log("Error", error)
        });
    }
    
    $scope.validate = function(){
		 let a = document.forms["myForm"]["Address"].value.length;
		 let b = document.forms["myForm"]["createdate"].value.length;
		 let c = document.forms["myForm"]["fullname"].value.length;
		 let d = document.forms["myForm"]["email"].value.length;
		if (a > 0 && b > 0 && c >0 && d > 3) {
		 	return true;
        }else{
			return false;
		}
	}
	
    $scope.reset = function(){
		var today = new Date();
		var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        $scope.form = {order_isdelete: false,'user_username': 'vanhoai', order_status: 'Đang xác nhận', order_createdate: date};
        $scope.load_all();
        $scope.loadtrang();
        $scope.end(1);
		
    }
    
    $scope.create = function(){
	 	let x = document.getElementById("exampleFormControlSelect2").value.length;
	 	if(x == 23){
	 		alert("Vui lòng chọn khách hàng")
		}
		if($scope.validate()==true){
	        var item = angular.copy($scope.form);
	        item.order_createdate = document.querySelector('input[type="date"]').value;
	        var url = `${host}/order/create`;
	        var url2 = `${host}/order_details`;
	        //lay ma id neu update
	        var oid = 0;
	        var status;
	        for(var i = 0; i<$scope.items.length; i++){
				if(item.order_id == $scope.items[i].order_id){
					oid = item.order_id;
					status = item.order_status;
					console.log(oid)
					console.log(status)
				}
			}
			//load list ordetail/id
			if(oid != 0){
				$scope.listnew = {}
				 $http.get(url2+ '/order/'+oid).then(resp => {
	            	$scope.listnew = resp.data;
	            	for(var i = 0; i<$scope.listnew.length; i++){
						$scope.listnew[i].ordetail_status = status;
						$http.post(url2, $scope.listnew[i]).then(resp => {
				            console.log("order detail", resp)
				        }).catch(error => {
				            console.log("Error", error)
				        });
					}
	        	}).catch(error => {
		            console.log("Error", error)
		        });
			}
			
			
	        $http.post(url, item).then(resp => {
	            $scope.items.push(item);
	            $scope.reset();
	            console.log("Success", resp)
	        }).catch(error => {
	            console.log("Error", error)
	        });
        }
        
        
    }
    
    $scope.update = function(){
		if($scope.validate()==true){
	        var item = angular.copy($scope.form);
	        var url = `${host}/order/${$scope.form.order_id}`;
		        $http.put(url, item).then(resp => {
		            var index = $scope.items.findIndex(item => item.order_id == $scope.form.order_id);
		            $scope.items[index] = resp.data;
		            console.log("Success", resp)
		            $scope.reset();
		        }).catch(error => {
		            console.log("Error", error)
		        });     
        }
    }
    
    $scope.delete = function(id){
    	$scope.itemdelete =[];
        var url = `${host}/order/${id}`;
        $http.get(url).then(resp => {
        	resp.data.order_isdelete = 'true';
            $scope.itemdelete = resp.data;
            //delete
            var url2 = `${host}/order/create`;
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
    $scope.sx;
	$scope.loadsx = function(x,y){
		if(x == 1){
			if(y % 2 ==0){
				$scope.sx = "order_id";
			}else{
				$scope.sx = "-order_id";
			}
		}else if(x == 2){
			if(y % 2 ==0){
				$scope.sx = "user.user_username";
			}else{
				$scope.sx = "-user.user_username";
			}
		}else if(x == 3){
			if(y % 2 ==0){
				$scope.sx = "order_fullname";
			}else{
				$scope.sx = "-order_fullname";
			}
		}else if(x == 4){
			if(y % 2 ==0){
				$scope.sx = "order_email";
			}else{
				$scope.sx = "-order_email";
			}
		}else if(x == 5){
			if(y % 2 ==0){
				$scope.sx = "order_phone";
			}else{
				$scope.sx = "-order_phone";
			}
		}else if(x == 6){
			if(y % 2 ==0){
				$scope.sx = "order_address";
			}else{
				$scope.sx = "-order_address";
			}
		}else if(x == 7){
			if(y % 2 ==0){
				$scope.sx = "order_status";
			}else{
				$scope.sx = "-order_status";
			}
		}else{
			if(y % 2 ==0){
				$scope.sx = "order_createdate";
			}else{
				$scope.sx = "-order_createdate";
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
  
	
    // Thực hiện tải toàn bộ students
    $scope.load_all();
    $scope.load_all2();
    $scope.reset();
    $scope.loadsx(1,1);
});