myApp.controller("user_ctrl2", function($scope, $http){
    $scope.form = {};
	$scope.form.role = {role_id: '103'};
	$scope.form.user_isdelete = false;
    
	$scope.reset = function(){
		$scope.form = {};
        $scope.form.role = {role_id: '103'};
		$scope.form.user_isdelete = false;
    }
    
	$scope.validate = function(){
		let a = document.getElementById("example").value.length;
		let b = document.getElementById("example1").value.length;
		let c = document.getElementById("example2").value.length;
		let d = document.getElementById("exampleInputEmail1").value.length;
		let e = document.getElementById("example4").value.length;
		if (a > 0 && b > 5 && c > 0 && d > 0 && e > 0) {
		 	return true;
        }else{
			return false;
		}
	}
	
    $scope.create = function(){
			
           if($scope.validate()==true){
	            var item = angular.copy($scope.form);
		        console.log(item)
		        var url = `${host}/user`;
				console.log(item)
		        $http.post(url, item).then(resp => {
		            alert("Đăng kí thành công, hãy thử dùng tài khoản vừa tạo đăng nhập !")
					$scope.reset();
		            console.log("Success", resp)
		        }).catch(error => {
		            console.log("Error", error)
	        	});
			}else{
				console.log("validate sai!")
			}
    }
    
    
    
     //Upload Hình
    $scope.imageChanged = function(files){
		var data = new FormData();
		data.append('file',files[0]);
		$http.post('/rest/upload/avatar',data,{
			transformRequest:angular.identity,
			headers:{'Content-Type':undefined}
		}).then(resp=>{
			alert("Thêm ảnh thành công !")
			$scope.form.user_img = resp.data.name;
		}).catch(err=>{
			alert('Lỗi upload Ảnh');
			console.log("Error ",err)
		})
    }
  
});