app.controller("order_ctrl", function($scope, $http){
    $scope.form = {}
    $scope.items = []
    $scope.user2 = []
    $scope.start = 0;
    $scope.pt = 7;
    $scope.trang = []
	$scope.statuss = ['Đang xác nhận','Đang giao','Đã giao'];
	
    $scope.load_all = function(){
        var url = `${host}/order`;
        $http.get(url).then(resp => {
            $scope.items = resp.data;
            let a = $scope.items.length / $scope.pt;
            for (let i = 0; i <a; i++) {
			  $scope.trang[i] = i+1;
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
        }).catch(error => {
            console.log("Error1", error)
        });
	}
    
    $scope.end = function (t) {
        if (t==1) {
           $scope.start = 0;
        } else {
		   var a = $scope.items.length % $scope.pt;
           $scope.start = $scope.items.length -a;
        }
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
    
    $scope.tiep = function () {
        if (($scope.start+$scope.pt) > $scope.items.length-1) {
           $scope.start = 0;
        } else {
           $scope.start += $scope.pt;
        }
        console.log($scope.start)
     }
     $scope.truoc = function () {
		var a = $scope.items.length % $scope.pt;
        if ($scope.start == 0) {
        	if(a==0){
           		$scope.start = $scope.items.length - $scope.pt;
			}else{
           		$scope.start = $scope.items.length - a;
			}
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
            console.log("Success", resp);
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
		if (a > 0 && b > 0 && c >0 && d > 0) {
		 	return true;
        }else{
			return false;
		}
	}
	
    $scope.reset = function(){
		var a = new Date();
        $scope.form = {order_isdelete: false,'user_username': 'vanhoai', order_status: 'Đang xác nhận', 'order_createdate': a};
        $scope.load_all();
        $scope.loadtrang();
		
    }
    
    $scope.create = function(){
		if($scope.validate()==true){
	        var item = angular.copy($scope.form);
	        var url = `${host}/order/create`;
	        $http.post(url, item).then(resp => {
	            $scope.items.push(item);
	            $scope.reset();
	            console.log("Success", resp)
	            $scope.load_all();
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
            var url2 = `${host}/order`;
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
  
	
    // Thực hiện tải toàn bộ students
    $scope.load_all();
    $scope.load_all2();
    $scope.reset();
});