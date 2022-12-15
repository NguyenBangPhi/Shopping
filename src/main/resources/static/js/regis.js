myApp.controller("user_ctrl", function($scope, $http){
    $scope.form = {};
	$scope.form.role = {role_id: '003'};
	$scope.form.user_isdelete = false;
    
	$scope.reset = function(){
		$scope.form = {};
        $scope.form.role = {role_id: '003'};
		$scope.form.user_isdelete = false;
    }
    
    $scope.create = function(){
			
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