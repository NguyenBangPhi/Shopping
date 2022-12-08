var myApp = angular.module("shopping-cart-app", [
  "angularUtils.directives.dirPagination",
]);
var host = "http://localhost:8080/rest";
myApp.config(function (paginationTemplateProvider) {
  paginationTemplateProvider.setPath("/customTemplate.html");
});

myApp.controller("shopping-cart-ctrl", function ($scope, $http) {
  

  $scope.cart = {
    items: [],
    moneyBill: 0,

    //Thêm sản phẩm vào giỏ hàng
    add(id) {
      var item = this.items.find((item) => item.product_id == id);
      if (item) {
        item.qty++;
        this.saveToLocalStorage();
      } else {
        $http
          .get(`/rest/product/${id}`)
          .then((resp) => {
            resp.data.qty = 1;
            this.items.push(resp.data);
            this.saveToLocalStorage();
          })
          .catch((error) => {
            console.log("Error", error);
          });
      }
    },

    //Xoá sản phẩm khỏi giỏ hàng
    remove(id) {
      var index = this.items.findIndex((item) => item.product_id == id);
      this.items.splice(index, 1);
      this.saveToLocalStorage();
    },

    //Xoá sạch các mặt hàng trong giỏ
    clear() {
      this.items = [];
      this.saveToLocalStorage();
    },

    //Tính thành tiền của một sản phẩm
    amt_of(item) {},

    //Tính tổng số lượng các mặt hàng trong giỏ
    get count() {
      return this.items
        .map((item) => item.qty)
        .reduce((total, qty) => (total += qty), 0);
    },

    //Tổng thành tiền các mặt hàng trong giỏ
    get amount() {
      return this.items
        .map((item) => item.qty * item.product_price)
        .reduce((total, qty) => (total += qty), 0);
    },
    //Lưu giỏ hàng vào local storage
    saveToLocalStorage() {
      //dùng angular để copy xong đổi các mặt hàng sang json
      var json = JSON.stringify(angular.copy(this.items));
      localStorage.setItem("cart", json);
    },

    //Đọc giỏ hàng từ local storage
    loadFromLocalStorage() {
      var json = localStorage.getItem("cart");
      this.items = json ? JSON.parse(json) : [];
    },
  };
  //$scope.cart.clear();
  $scope.cart.loadFromLocalStorage();

  var tempProductID = '';
  var tempVoucherName = '';

	$scope.order = {
		order_address: "",
		order_createdate: new Date(),
		order_status: 'Chờ xác nhận',
		order_isdelete: false,
		order_fullname: '',

    order_email: '',
    order_sdt: '',

    order_voucher: '',

		user: {user_username: $("#username").text()},
		get order_details() {
			return $scope.cart.items.map(item => {
					return {
						product_: {product_id: item.product_id},
            voucher_: tempProductID == item.product_id? { voucher_name: tempVoucherName} : null,
						ordetail_price: item.product_price,
						ordetail_quantity: item.qty,
						ordetail_createdate: new Date(),
						ordetail_status: 'Đang xác nhận',
						ordetail_isdelete:false
					}
				}
			);
		},
		purchase() {
			var order = angular.copy(this);
      var usertemp = {};
			// Thực hiện đặt hàng

      		console.log(order)
        if(order.user.user_username != '') {
          var ordertemp = {order_address: order.order_address, 
            order_createdate: order.order_createdate, order_isdelete: false, 
            order_status: "Chờ xác nhận",order_fullname: $("#hoten").text(), order_email: $("#emaill").text(), 
            user: {user_username: order.user.user_username}, order_details: order.order_details};
            $http.post("/rest/order",ordertemp).then(resp => {
              alert("Đặt hàng thành công !");
              $scope.cart.clear();
              location.href= "/order/detail/" + resp.data.order_id;
            }).catch(error => {
              alert("Đặt hàng lỗi !");
              console.log(error);
            })
        }else {
          var textRandom = "CUS" + makeid(4);
          usertemp = {user_username: textRandom, user_fullname: order.order_fullname, 
            user_password: "123456", user_img: "temp.png", user_mail: order.order_email,
             user_phone: order.order_sdt, role: {role_id: "003"}, user_isdelete: false};
            console.log(usertemp);
            
            $http.post("/rest/user", usertemp).then(resp => {
                console.log("Success", resp);
                usertemp.user_username = resp.data.user_username;
                var ordertemp2 = {order_address: order.order_address, 
                  order_createdate: order.order_createdate, order_isdelete: false, 
                  order_status: "Chờ xác nhận",order_fullname: order.order_fullname, order_email: order.order_email, 
                  user: {user_username: resp.data.user_username}, order_details: order.order_details};
                $http.post("/rest/order",ordertemp2).then(resp => {
                  alert("Đặt hàng thành công !");
                  $scope.cart.clear();
                  location.href= "/order/detail/" + resp.data.order_id;
                }).catch(error => {
                  alert("Đặt hàng lỗi !");
                  console.log(error);
                })

            }).catch(error => {
                console.log("Error", error)
            });
        }

			// $http.post("/rest/order",order).then(resp => {
			// 	alert("Đặt hàng thành công !");
			// 	$scope.cart.clear();
			// 	location.href= "/order/detail/" + resp.data.order_id;
			// }).catch(error => {
			// 	alert("Đặt hàng lỗi !");
			// 	console.log(error);
			// })
		},
    checkVou() {
      var urlVou = '/rest/voucher/' + $scope.order.order_voucher;
      $http.get(urlVou).then(resp => {
          console.log(resp.data);
          if(resp.data.length == 2) {
            for (let i = 0; i < $scope.cart.items.length; i++) {

              for (let j = 0; j < resp.data[0].length; j++) {
                if ($scope.cart.items[i].product_id == resp.data[0][j]) {
                  tempProductID = $scope.cart.items[i].product_id;
                  tempVoucherName =$scope.order.order_voucher;
                  alert("Đã tìm thấy voucher và áp dụng giảm giá !")
                  $scope.cart.items[i].product_price = $scope.cart.items[i].product_price -  ($scope.cart.items[i].product_price * (resp.data[1] * 1) / 100);
                  console.log($scope.cart.items[i].product_price);
                  document.getElementById("button-addon2").setAttribute("disabled","disabled");
                  console.log($scope.order.order_details);
                  // for (let x = 0; x < $scope.order.order_details().length; x++) {
                  //   $scope.order.order_details[x].voucher_
                    
                  // }
                  return;
                }
              }
            }
            alert("Voucher đã hết hạn hoặc không có sản phẩm nào trong giỏ hàng của bạn có thể áp dụng !")
          }
          alert("Voucher đã hết hạn hoặc không có sản phẩm nào trong giỏ hàng của bạn có thể áp dụng !")
        }).catch(error => {
            console.log("Error", error)
        });
    }
		
	}

});

myApp.controller("MyController", function ($scope, $http) {
  $scope.currentPage = 1;
  $scope.pageSize = 12;

  $scope.items = [];
	$scope.meals = [];

  $scope.loadBrand = function (idBrand) {
    var url = `${host}/product?cid=${idBrand}`;
    $http
      .get(url)
      .then((resp) => {
        //$scope.items = resp.data;
        $scope.meals = [];
        $scope.meals = resp.data;
        console.log("Success Brand ", resp);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };
  var dishes = [
    "noodles",
    "sausage",
    "beans on toast",
    "cheeseburger",
    "battered mars bar",
    "crisp butty",
    "yorkshire pudding",
    "wiener schnitzel",
    "sauerkraut mit ei",
    "salad",
    "onion soup",
    "bak choi",
    "avacado maki",
  ];
  var sides = [
    "with chips",
    "a la king",
    "drizzled with cheese sauce",
    "with a side salad",
    "on toast",
    "with ketchup",
    "on a bed of cabbage",
    "wrapped in streaky bacon",
    "on a stick with cheese",
    "in pitta bread",
  ];
  //   for (var i = 1; i <= 100; i++) {
  //     var dish = dishes[Math.floor(Math.random() * dishes.length)];
  //     var side = sides[Math.floor(Math.random() * sides.length)];
  //     $scope.meals.push('meal ' + i + ': ' + dish + ' ' + side);
  //   }

  $scope.load_all = function () {
	var xhref = location.href;
	var xid = xhref[xhref.length - 1];
	xid = xid*1;
	var url;
	if(Number.isInteger(xid)) {
		url = `${host}/product?cid=${xid}`;
	}else {
		url = `${host}/product`;
	}
    $http
      .get(url)
      .then((resp) => {
        //$scope.items = resp.data;
        $scope.meals = resp.data;
        console.log("Success", resp.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };
	
  $scope.load_all();
  $scope.pageChangeHandler = function (num) {
    console.log("meals page changed to " + num);
  };
});

myApp.controller("OtherController", function ($scope) {
  $scope.pageChangeHandler = function (num) {
    console.log("going to page " + num);
  };
});
function makeid(l)
  {
  var text = "";
  var char_list = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for(var i=0; i < l; i++ )
  {  
  text += char_list.charAt(Math.floor(Math.random() * char_list.length));
  }
  return text;
}