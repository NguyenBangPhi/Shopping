let host = "http://localhost:8080/rest";
const app = angular.module("app", []);
app.controller("role_ctrl", function($scope, $http){
    $scope.form = {}
    $scope.items = []
    $scope.start = 0;
    $scope.pt = 7;
    $scope.trang = []
    
    $scope.load_all = function(){
        var url = `${host}/role/list`;
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
    
   $scope.end = function (t) {
        if (t==1) {
           $scope.start = 0;
        } else {
			var a = $scope.items.length % $scope.pt;
           $scope.start = $scope.items.length -a;
        }
     }
    
    $scope.search = function(){
		if($scope.filterBy==null){
			$scope.load_all();
		}else{
	        var url = `${host}/role/search/`+ $scope.filterBy;
	        $http.get(url).then(resp => {
	            $scope.items = resp.data;
	            $scope.user = $scope.items;
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
	
    
     $scope.edit = function(role_id){
        var url = `${host}/role/${role_id}`;
        $http.get(url).then(resp => {
            $scope.form = resp.data;
            console.log("Success", resp)
           $scope.setedit();
        }).catch(error => {
            console.log("Error", error)
        });
    }
    
    $scope.reset = function(){
        $scope.form = {role_isdelete: false};
        $scope.load_all();
        $scope.loadtrang();
    }
    
	$scope.validate = function(){
		 let x = document.forms["myForm"]["rolename"].value.length;
		if (x > 0 ) {
		 	return true;
        }else{
			return false;
		}
	}
    
    $scope.create = function(){
		if($scope.validate()==true){
	        var item = angular.copy($scope.form);
	        var url = `${host}/role/list`;
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
	        var url = `${host}/role/${$scope.form.role_id}`;
		        $http.put(url, item).then(resp => {
		            var index = $scope.items.findIndex(item => item.role_id == $scope.form.role_id);
		            $scope.items[index] = resp.data;
		            console.log("Success", resp)
		            $scope.reset();
		        }).catch(error => {
		            console.log("Error", error)
		        });     
	    }
    }
    
  
    
    $scope.delete = function(role_id){
    	$scope.itemdelete =[];
        var url = `${host}/role/${role_id}`;
        $http.get(url).then(resp => {
        	resp.data.role_isdelete = 'true';
            $scope.itemdelete = resp.data;
            //delete
            var url2 = `${host}/role/list`;
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
    $scope.reset();
});