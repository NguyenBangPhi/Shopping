app.controller("user_ctrl", function($scope, $http){
    $scope.form = {}
    $scope.items = []
    $scope.order = []
    $scope.role = []
    $scope.start = 0;
    $scope.pt = 6;
    $scope.trang = 1;
    $scope.sizetrang = 0;
    
    $scope.load_all = function(){
        var url = `${host}/user`;
        $http.get(url).then(resp => {
            $scope.items = resp.data;
            let a = $scope.items.length / $scope.pt;
            for (let i = 0; i <a; i++) {
			  $scope.sizetrang = i+1;
			  document.getElementById("trang1").classList.add('bg-primary');
			   document.getElementById("trang2").classList.remove('bg-primary');
			   document.getElementById("trang3").classList.remove('bg-primary');
			}
            console.log("user", resp)
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
    
    $scope.validate = function(){
		 let x = document.forms["myForm"]["user"].value.length;
		 let a = document.forms["myForm"]["fullname"].value.length;
		 let b = document.forms["myForm"]["pass"].value.length;
		 let c = document.forms["myForm"]["email"].value.length;
		 let d = document.forms["myForm"]["sdt"].value.length;
		if (x > 0 && a > 0 && b > 5 && c > 0 && d > 0) {
		 	return true;
        }else{
			return false;
		}
	}
    
    
     $scope.load_all2 = function(){
        var url = `${host}/role/list`;
        $http.get(url).then(resp => {
            $scope.role = resp.data;
        }).catch(error => {
            console.log("Error", error)
        });
    }
    
     $scope.load_all3 = function(){
        var url = `${host}/order`;
        $http.get(url).then(resp => {
            $scope.order = resp.data;
        }).catch(error => {
            console.log("Error", error)
        });
    }
    
    $scope.search = function(){
		if($scope.filterBy==null){
			$scope.load_all();
		}else{
	        var url = `${host}/user/search/`+ $scope.filterBy;
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
	
     $scope.edit = function(user_username){
        var url = `${host}/user/${user_username}`;
        $http.get(url).then(resp => {
           $scope.form = resp.data;
           $scope.form.role.role_id = Number($scope.form.role.role_id);
           console.log("Success", resp)
           $scope.setedit();
        }).catch(error => {
           console.log("Error", error)
        });
    }
	$scope.show = function(){
		let pass = document.getElementById("passwordUser");
		pass.type = pass.type == 'password' ? 'text' : 'password'
	}
	$scope.eyea = 0;
	$scope.eye = function(a){
		let eye = document.getElementById("eye");
		if(a%2 ==0){
			eye.classList.add('fa-eye-slash')
		  	eye.classList.remove('fa-eye');
		}else{
			eye.classList.add('fa-eye')
		  	eye.classList.remove('fa-eye-slash');
		}
		$scope.eyea = a;
	}
    
    $scope.reset = function(){
		$scope.form = {user_isdelete: false, role: {role_id: 103}};
		//let a = document.getElementById("roleid").value;
		//console.log("a", a);
		document.getElementById("exampleFormControlFile1").value = "";
        $scope.load_all();
        $scope.loadtrang();
        $scope.end(1);
        
    }
    
    
    $scope.create = function(){
            //create
            var item = angular.copy($scope.form);
	        console.log(item)
		if($scope.validate()==true){
	        var url = `${host}/user`;
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
	        var url = `${host}/user/${$scope.form.user_username}`;
		        $http.put(url, item).then(resp => {
		            var index = $scope.items.findIndex(item => item.user_username == $scope.form.user_username);
		            $scope.items[index] = resp.data;
		            console.log("Success", resp)
		            $scope.reset();
		        }).catch(error => {
		            console.log("Error", error)
		        });  
        }   
    }
    
    $scope.delete = function(user_username){
    	$scope.itemdelete =[];
        var url = `${host}/user/${user_username}`;
        $http.get(url).then(resp => {
        	resp.data.user_isdelete = 'true';
            $scope.itemdelete = resp.data;
            //delete
            var url2 = `${host}/user`;
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
    
   //  $scope.delete = function(user_username){
	// 	var check = 0;
	// 	var item =[];
	// 	for (var i = 0; i < $scope.order.length-1; i++) {
			
	// 		if($scope.order[i].user.user_username==user_username){
	// 			$scope.load_all();
	// 			for (var j = 0; j < $scope.items.length-1; j++) {
	// 			  if($scope.items[j].user_username==user_username){
	// 				  item = $scope.items[j];
	// 				  if(item.user_isdelete == true){
	// 					  check = 2;
	// 				  }else{
	// 				  	  item.user_isdelete = true;
	// 					  if(confirm("User đã có dử liệu. Bạn có muốn chuyển trạng thái isDelete = true không!")){
	// 						 check = 1;
	// 					  }else{
	// 						 check = 3;
	// 					}
	// 				  }
	// 			  	}
				  	
	// 			}
				
	//         }
			
	// 	}
	// 	if(check==0){
	//         var url = `${host}/user/${user_username}`;
	//         $http.delete(url).then(resp => {
	// 			if(confirm("Bạn chắc chắn muốn xoá không?")){
	// 				var index = $scope.items.findIndex(item => item.user_username == user_username);
	// 	            $scope.items.splice(index, 1);
	// 	            location.reload()
	// 	            console.log("Success", resp)
	// 			}
	            
	//         }).catch(error => {
	//             console.log("Error", error)
	//         });
				
	// 	}else if(check==1){
			
	// 		var url = `${host}/user/${user_username}`;
	// 	        $http.put(url, item).then(resp => {
	// 	            $scope.items.push(item);
	// 	            $scope.reset();
	// 	            console.log("Success", resp)
	// 	        }).catch(error => {
	// 	            console.log("Error", error)
	// 	        });  
	// 	}else if(check==2){
	// 		alert("User đã có dử liệu. Và đã ở trạng thái isDelete true")
	// 	}
		
	// 	console.log(check)
   //  }
    
     //Upload Hình
    $scope.imageChanged = function(files){
		var data = new FormData();
		data.append('file',files[0]);
		$http.post('/rest/upload/avatar',data,{
			transformRequest:angular.identity,
			headers:{'Content-Type':undefined}
		}).then(resp=>{
			$scope.form.user_img = resp.data.name;
		}).catch(err=>{
			alert('Lỗi upload Ảnh');
			console.log("Error ",err)
		})
    }
  
    // Thực hiện tải toàn bộ students
    $scope.load_all();
    $scope.load_all2();
    $scope.load_all3();
    $scope.reset();
});