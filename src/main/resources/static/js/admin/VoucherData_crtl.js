app.controller("voucherdata_ctrl", function($scope, $http){
    $scope.form = {}
    $scope.items = []
    $scope.products = []
    $scope.vouchers = []
    $scope.start = 0;
    $scope.pt = 7;
    $scope.trang = []
    
    $scope.load_all = function(){
        var url = `${host}/voucher_data`;
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
    
    $scope.load_all2 = function(){
        var url = `${host}/product/list`;
        $http.get(url).then(resp => {
            $scope.products = resp.data;
        }).catch(error => {
            console.log("Error", error)
        });
    }
    
    $scope.load_all3 = function(){
        var url = `${host}/voucher`;
        $http.get(url).then(resp => {
            $scope.vouchers = resp.data;
        }).catch(error => {
            console.log("Error", error)
        });
        
    }
    
    $scope.search = function(){
		if($scope.filterBy==null){
			$scope.load_all();
		}else{
	        var url = `${host}/voucher_data/search/`+ $scope.filterBy;
	        $http.get(url).then(resp => {
	            $scope.items = resp.data;
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
	 
	 
     $scope.edit = function(vdata_id){
        var url = `${host}/voucher_data/${vdata_id}`;
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
		var a = new Date();
        $scope.form = {voucher_isdelete: false, 'voucher_createdate': a};
        $scope.load_all();
    }
    
    $scope.create = function(){
        var item = angular.copy($scope.form);
        var url = `${host}/voucher_data`;
        $http.post(url, item).then(resp => {
            $scope.items.push(item);
            $scope.reset();
            console.log("Success", resp)
            $scope.load_all();
        }).catch(error => {
            console.log("Error", error)
        });
    }
    
    $scope.update = function(){
        var item = angular.copy($scope.form);
        var url = `${host}/voucher_data/${$scope.form.vdata_id}`;
	        $http.put(url, item).then(resp => {
	            var index = $scope.items.findIndex(item => item.vdata_id == $scope.form.vdata_id);
	            $scope.items[index] = resp.data;
	            $scope.reset();
	            console.log("Success", resp)
	        }).catch(error => {
	            console.log("Error", error)
	        });     
    }
    
    $scope.delete = function(id){
    	$scope.itemdelete =[];
        var url = `${host}/voucher_data/${id}`;
        $http.get(url).then(resp => {
        	resp.data.voucher_isdelete = 'true';
            $scope.itemdelete = resp.data;
            //delete
            var url2 = `${host}/voucher_data`;
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
    
    $scope.load_all();
    $scope.load_all2();
    $scope.load_all3();
    $scope.reset();
});