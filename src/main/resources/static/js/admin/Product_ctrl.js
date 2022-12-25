
app.controller("product_ctrl", function($scope, $http){
    $scope.form = {}
    $scope.items = []
    $scope.start = 0;
    $scope.pt = 3;
    $scope.trang = 1;
    $scope.sizetrang = 0;
    
    $scope.load_all = function(){
        var url = `${host}/product/list`;
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
    
    
    
    $scope.search = function(){
		if($scope.filterBy==null){
			$scope.load_all();
		}else{
	        var url = `${host}/product/search/`+ $scope.filterBy;
	        $http.get(url).then(resp => {
	            $scope.items = resp.data;
	        }).catch(error => {
	            console.log("Error", error)
	        });
		}
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
	 
    
     $scope.edit = function(product_id){
        var url = `${host}/product/${product_id}`;
        $http.get(url).then(resp => {
            $scope.form = resp.data;
            console.log("Success", resp)
        }).catch(error => {
            console.log("Error", error)
        });
        let ele = document.getElementById('profile-tab');
		let elee = document.getElementById('profile');
		
		ele.classList.add('active');
		elee.classList.add('active','show');
		ele.ariaSelected = "false";
		let element = document.getElementById('home-tab');
		let elementt = document.getElementById('home');
		
		element.classList.remove('active');
		elementt.classList.remove('active','show');
		element.ariaSelected = "true";
    }
    
    $scope.reset = function(){
        $scope.form = {product_isdelete: false};
        document.getElementById("exampleFormControlFile1").value = "";
        $scope.load_all();
        $scope.end(1);
    }
    
    $scope.validate = function(){
	  let x = document.forms["myForm"]["tensp"].value.length;
	  let a = document.forms["myForm"]["giasp"].value;
	  let b = document.forms["myForm"]["slsp"].value;
		if (x > 0 && a > 0 && b >0) {
		 	return true;
        }else{
			return false;
		}
	}
    
    $scope.create = function(){
		if($scope.validate()==true){
		console.log(item);
	        var item = angular.copy($scope.form);
	        var url = `${host}/product`;
	        console.log(item)
	        $http.post(url, item).then(resp => {
	            $scope.items.push(item);
	            $scope.reset();
	        }).catch(error => {
	            console.log("Error", error)
	        });
    	}
    }
    
    $scope.update = function(){
		if($scope.validate()==true){
	        var item = angular.copy($scope.form);
	        var url = `${host}/product/${$scope.form.product_id}`;
		        $http.put(url, item).then(resp => {
		            var index = $scope.items.findIndex(item => item.product_id == $scope.form.product_id);
		            $scope.items[index] = resp.data;
		            $scope.reset();
		            console.log("Success", resp)
		        }).catch(error => {
		            console.log("Error", error)
		        });     
	    }
    }
    
    $scope.delete = function(id){
    	$scope.itemdelete =[];
        var url = `${host}/product/${id}`;
        $http.get(url).then(resp => {
        	resp.data.product_isdelete = 'true';
            $scope.itemdelete = resp.data;
            //delete
            var url2 = `${host}/product`;
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
    
     //Upload Hình
    $scope.imageChanged = function(files){
		var data = new FormData();
		data.append('file',files[0]);
		$http.post('/rest/upload/product',data,{
			transformRequest:angular.identity,
			headers:{'Content-Type':undefined}
		}).then(resp=>{
			$scope.form.product_img = resp.data.name;
		}).catch(err=>{
			alert('Lỗi upload Ảnh');
			console.log("Error ",err)
		})
    }
 
    $scope.load_all();
    $scope.reset();
});