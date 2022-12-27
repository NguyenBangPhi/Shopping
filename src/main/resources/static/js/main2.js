var myApp = angular.module("shopping-cart-app", [
  "angularUtils.directives.dirPagination",
]);
var host = "http://localhost:8080/rest";
myApp.config(function (paginationTemplateProvider) {
  paginationTemplateProvider.setPath("/customTemplate.html");
});

myApp.controller("shopping-cart-ctrl", function ($scope, $http) {
  $scope.checkOr;
	$scope.checkOr2 = function (temp) {
		location.href = `http://localhost:8080/order/detail/${temp}`;
	}
	$scope.userURL = function () {
		location.href= `http://localhost:8080/user`;
	}
	displayHello2 = setInterval(function () {
		let curDate = new Date();
		let hours = curDate.getHours();
		console.log(hours);
		if(hours >= 0) {
			document.getElementById("giovang").style.visibility = 'visible';
			console.log("Thành công! GV");
			
		}else{
			document.getElementById("giovang").style.visibility = 'hidden';
			console.log("Thành công! GV 2");
			localStorage.removeItem("giovang");
		}
	}, 1000);
	setInterval(displayHello2, 1000);
	$scope.muaHangGV = function () {
		
	}
	var checktempp = 0;
	var checkindex = 0;
  $scope.cart = {
    items: [],
    moneyBill: 0,
	items2: [],
	
	callGV() {
		var json1 = localStorage.getItem("giovang");
		if(json1) {
			this.items2 = json1 ? JSON.parse(json1) : [];
			console.log(this.items2);
			return;
		} else {
			this.items2 = json1 ? JSON.parse(json1) : [];
			console.log(this.items2);
		}
      	
		
		$http.get(`${host}/product/listGV`).then(resp => {
			if(this.items2) {
				this.items2 = resp.data;
				var json = JSON.stringify(angular.copy(this.items2));
	      		localStorage.setItem("giovang", json);
				console.log(this.items2);
			}
		}).catch(error => {
			console.log(error);
		})
	},

	changeQTY(id) {
		var item = this.items.find((item) => item.product_id == id);
		let json = localStorage.getItem("check");
		if(json == id) {
			item.qty = 1;
			this.saveToLocalStorage();
			return;
		};
		
		console.log(item)
		if(item.qty < 0) {
			alert("Chọn sai số lượng !");
			item.qty = 1;
			this.saveToLocalStorage();
		}else if(item.qty > item.product_quantity){
			item.qty = item.product_quantity;
			alert("Sản phẩm không còn đủ hàng !");
			this.saveToLocalStorage();
		}
		this.saveToLocalStorage();
	},

    //Thêm sản phẩm vào giỏ hàng
	
    add(id) {
		var json1 = localStorage.getItem("giovang");
		
		if(json1){
			for(var i = 0; i < this.items2.length; i++) {
				if(this.items2[i].product_id === id){
					
					if(checktempp != 0) {
						alert("Chỉ được mua tối đa 1 sản phẩm GIỜ VÀNG !")
						return;
					}
					checktempp = id;
					var json3 = JSON.stringify(angular.copy(checktempp));
      				localStorage.setItem("check", json3);
					for(var j = 0 ; j < this.items.length; j++){
						if(this.items[j].product_id == id) {
							if(this.items[j].qty == 1) {
								alert("Chỉ được mua tối đa 1 sản phẩm GIỜ VÀNG !");
								return;
							}
						}
					}
				}
			}
		}
		
		
      var item = this.items.find((item) => item.product_id == id);
      if (item) {
		if(item.product_quantity == 0 || (item.qty+1) > item.product_quantity) {
			alert("Sản phẩm đã hết hàng !");
		}else {
			item.qty++;
        	this.saveToLocalStorage();
		}
      } else {
		
        $http
          .get(`/rest/product/${id}`)
          .then((resp) => {
			if(resp.data.product_quantity == 0) {
				alert("Sản phẩm đã hết hàng !");
			}else {
				if(id == checktempp){
					resp.data.product_price = resp.data.product_price - 1000000;
				}
				resp.data.qty = 1;
	            this.items.push(resp.data);
	            this.saveToLocalStorage();
			}
          })
          .catch((error) => {
            console.log("Error", error);
          });
      }
    },

	muaHangNhanh(id) {
		$scope.cart.add(id);
		location.href= "/order/list";
	},

    //Xoá sản phẩm khỏi giỏ hàng
    remove(id) {
      var index = this.items.findIndex((item) => item.product_id == id);
		var json3 = JSON.stringify(0);
      				localStorage.setItem("check", json3);
		if(id == checktempp) {
			checktempp = 0;
		}
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
    ghn(orders,cart) {
      
      let urlGHN = "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create";
      let datas = {
        "payment_type_id": 2,
        "note": "Tintest 123",
        "from_name":"Poly Shop",
        "from_phone":"0368114073",
        "from_address": "123 Đường 3/2",
        "from_ward_name":"Phường 5",
        "from_district_name":"Quận 12",
        "from_province_name":"TP Hồ Chí Minh",
        "required_note": "KHONGCHOXEMHANG",
        "return_name": "Poly Shop",
        "return_phone": "0368114073",
        "return_address": "123 Đường 3/2",
        "return_ward_name": "Phường 5",
        "return_district_name": "Quận 11",
        "return_province_name":"TP Hồ Chí Minh",
        "client_order_code": "",
        "to_name": orders.order_fullname,
        "to_phone": orders.order_phone,
        "to_address": orders.order_address,
        "to_ward_name":"Phường 14",
        "to_district_name":"Quận 10",
        "to_province_name":"TP Hồ Chí Minh",
        "cod_amount": 30000,
        "content": "Poly Shop, giao hàng siêu nhanh !",
        "weight": 200,
        "length": 1,
        "width": 19,
        "height": 10,
        "pick_station_id": 1444,
        "deliver_station_id": null,
        "insurance_value": 5000000,
        "service_id": 0,
        "service_type_id":2,
        "coupon":null,
        "pick_shift":null,
        "pickup_time": 1665272576,
        "items": [
             {
                 "name": "Điện thoại",
                 "code":"Poly Shop Phone",
                 "quantity": orders.order_details.length,
                 "price": cart.amount,
                 "length": 12,
                 "width": 12,
                 "height": 12,
                 "category": 
                 {
                     "level1":"Điện Thoại"
                 }
             }
             
         ]
      };
      $http.post(urlGHN,datas ,{
        headers: {'Content-Type': 'application/json'},
        headers: {'ShopId': '120960'},
        headers: {'Token': '5cd3fbdc-76f4-11ed-a83f-5a63c54f968d'}
      }).then(resp => {
        alert("Đơn vị vận chuyện đang đợi Admin xác nhận !");
        console.log(resp.data);
      }).catch(error => {
        alert("Đặt hàng lỗi !");
        console.log(error);
      })
      alert(orders,cart)
    }
  };
  //$scope.cart.clear();
  $scope.cart.loadFromLocalStorage();
	$scope.cart.callGV();

  var tempProductID = '';
  var tempVoucherName = '';

	$scope.order = {
		order_address: "",
		order_createdate: new Date(),
		order_status: 'Chờ xác nhận',
		order_isdelete: false,
		order_fullname: '',

    order_email: '',
    order_phone: '',

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
		async purchase() {
			var order = angular.copy(this);
      var usertemp = {};
      var idtemp;
			// Thực hiện đặt hàng
      let urlGHN = "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create";
      		console.log(order)
        if(order.user.user_username != '') {
          if($scope.validate(1)==true){
          var ordertemp = {order_address: order.order_address, 
            order_createdate: order.order_createdate, order_isdelete: false, 
            order_status: "Đang xác nhận",order_fullname: $("#hoten").text(), order_email: $("#emaill").text(), order_phone: order.order_phone,
            user: {user_username: order.user.user_username}, order_details: order.order_details};
            
              let datas = {
                "payment_type_id": 2,
                "note": "Điện thoại giá rẻ",
                "from_name":"Poly Shop",
                "from_phone":"0368114073",
                "from_address":"123 Đường 3/2",
                "from_ward_name":"Phường 5",
                "from_district_name":"Quận 11",
                "from_province_name":"TP Hồ Chí Minh",
                "required_note": "KHONGCHOXEMHANG",
                "return_name": "Poly Shop",
                "return_phone": "0368114073",
                "return_address": "123 Đường 3/2",
                "return_ward_name": "Phường 5",
                "return_district_name": "Quận 11",
                "return_province_name":"TP Hồ Chí Minh",
                "client_order_code": "",
                "to_name": ordertemp.order_fullname,
                "to_phone": ordertemp.order_phone,
                "to_address": ordertemp.order_address,
                "to_ward_name":"Phường 14",
                "to_district_name":"Quận 10",
                "to_province_name":"TP Hồ Chí Minh",
                "cod_amount": 30000,
                "content": "Điện thoại Poly Shop",
                "weight": 200,
                "length": 1,
                "width": 19,
                "height": 10,
                "pick_station_id": 1444,
                "deliver_station_id": null,
                "insurance_value": 5000000,
                "service_id": 0,
                "service_type_id":2,
                "coupon":null,
                "pick_shift":null,
                "pickup_time": 1665272576,
                "items": [
                     {
                         "name":"Điện thoại",
                         "code":"Poly Pro",
                         "quantity": 1,
                         "price": $scope.cart.amount,
                         "length": 12,
                         "width": 12,
                         "height": 12,
                         "category": 
                         {
                             "level1":"Điện Thoại"
                         }
                     }
                     
                 ]
            };
            var ordertempp = {};
            await $http.post("/rest/order",ordertemp).then(resp => {
              idtemp = resp.data.order_id;
              ordertempp = resp.data;
              console.log(idtemp);
              alert("Đặt hàng thành công !");
              alert("Mã đơn hàng của bạn là: " + idtemp +"\nHãy lưu lại để tra cứu");
              
              //$scope.cart.ghn(ordertemp,$scope.cart);
              //$scope.cart.clear();
              //location.href= "/order/detail/" + resp.data.order_id;
            }).catch(error => {
              alert("Đặt hàng lỗi !");
              console.log(error);
              return;
            })
            await $http.post(urlGHN,datas ,{
              headers: {'Content-Type': 'application/json'},
              headers: {'ShopId': '120960'},
              headers: {'Token': '5cd3fbdc-76f4-11ed-a83f-5a63c54f968d'}
            }).then(resp => {
              alert("Đơn vị vận chuyển đang đợi Admin xác nhận !");
              $scope.cart.clear();
              console.log(resp.data);
            }).catch(error => {
              alert("Đặt hàng lỗi GHN!");
              console.log(error);
            })
            let mailtemp = {"mail":ordertempp.order_email, "name":ordertempp.order_fullname,"id_order":ordertempp.order_id};
            await $http.post("http://localhost:8080/rest/mail",mailtemp).then(resp => {
              alert("Hãy kiểm tra mail để kiểm tra mã đơn hàng !");
              console.log(resp.data);
            }).catch(error => {
              alert("Lỗi Mail !");
              console.log(error);
            })
            //window.location = "http://localhost:8080/order/detail/" + idtemp;
            location.href= "/order/detail/" + idtemp ;
          }else{
            console.log("validate1")
          }
        }else {
          if($scope.validate(2)==true){
          let ordertempp = {};
          var textRandom = "CUS" + makeid(4);
          usertemp = {user_username: textRandom, user_fullname: order.order_fullname, 
            user_password: "123456", user_img: "temp.png", user_mail: order.order_email,
             user_phone: order.order_sdt, role: {role_id: "103"}, user_isdelete: false};
            console.log(usertemp);
            
            await $http.post("/rest/user", usertemp).then(resp => {
                console.log("Success", resp);
                usertemp.user_username = resp.data.user_username;
                var ordertemp2 = {order_address: order.order_address, 
                  order_createdate: order.order_createdate, order_isdelete: false, 
                  order_status: "Đang xác nhận",order_fullname: order.order_fullname, order_email: order.order_email, order_phone: order.order_phone,
                  user: {user_username: resp.data.user_username}, order_details: order.order_details};
                $http.post("/rest/order",ordertemp2).then(resp => {
                  alert("Đặt hàng thành công !");
                  $scope.cart.clear();
                  idtemp = resp.data.order_id;
                  ordertempp = resp.data;
				          alert("Mã đơn hàng của bạn là: " + idtemp +"\nHãy lưu lại để tra cứu");
                  //location.href= "/order/detail/" + resp.data.order_id;
                }).catch(error => {
                  alert("Đặt hàng lỗi !");
                  console.log(error);
                })

            }).catch(error => {
                console.log("Error", error)
            });
            let datas = {
              "payment_type_id": 2,
              "note": "Điện thoại giá rẻ",
              "from_name":"Poly Shop",
              "from_phone":"0368114073",
              "from_address":"123 Đường 3/2",
              "from_ward_name":"Phường 5",
              "from_district_name":"Quận 11",
              "from_province_name":"TP Hồ Chí Minh",
              "required_note": "KHONGCHOXEMHANG",
              "return_name": "Poly Shop",
              "return_phone": "0368114073",
              "return_address": "123 Đường 3/2",
              "return_ward_name": "Phường 5",
              "return_district_name": "Quận 11",
              "return_province_name":"TP Hồ Chí Minh",
              "client_order_code": "",
              "to_name": order.order_fullname,
              "to_phone": order.order_phone,
              "to_address": order.order_address,
              "to_ward_name":"Phường 14",
              "to_district_name":"Quận 10",
              "to_province_name":"TP Hồ Chí Minh",
              "cod_amount": 30000,
              "content": "Điện thoại Poly Shop",
              "weight": 200,
              "length": 1,
              "width": 19,
              "height": 10,
              "pick_station_id": 1444,
              "deliver_station_id": null,
              "insurance_value": 5000000,
              "service_id": 0,
              "service_type_id":2,
              "coupon":null,
              "pick_shift":null,
              "pickup_time": 1665272576,
              "items": [
                   {
                       "name":"Điện thoại",
                       "code":"Poly Pro",
                       "quantity": 1,
                       "price": $scope.cart.amount,
                       "length": 12,
                       "width": 12,
                       "height": 12,
                       "category": 
                       {
                           "level1":"Điện Thoại"
                       }
                   }
                   
               ]
          };
          
          await $http.post(urlGHN,datas ,{
            headers: {'Content-Type': 'application/json'},
            headers: {'ShopId': '120960'},
            headers: {'Token': '5cd3fbdc-76f4-11ed-a83f-5a63c54f968d'}
          }).then(resp => {
            alert("Đơn vị vận chuyển đang đợi Admin xác nhận !");
            $scope.cart.clear();
            console.log(resp.data);
          }).catch(error => {
            alert("Đặt hàng lỗi GHN!");
            console.log(error);
          })
          let mailtemp = {"mail":ordertempp.order_email, "name":ordertempp.order_fullname,"id_order":ordertempp.order_id}
          await $http.post("http://localhost:8080/rest/mail",mailtemp).then(resp => {
              alert("Hãy kiểm tra mail để kiểm tra mã đơn hàng !");
              console.log(resp.data);
            }).catch(error => {
              alert("Lỗi Mail !");
              console.log(error);
            })
          //window.location = "http://localhost:8080/order/detail/" + idtemp;
          location.href= "/order/detail/" + idtemp ;
          }else{
            console.log("validate2");
          }
        }
        //location.href= "/order/detail/" + idtemp ;

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
				  $scope.cart.saveToLocalStorage();
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
    },
    ghn() {
      
      let urlGHN = "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create";
      let datas = {
        "payment_type_id": 2,
        "note": "Tintest 123",
        "from_name":"Tin",
        "from_phone":"0909999999",
        "from_address":"123 Đường 3/2",
        "from_ward_name":"Phường 5",
        "from_district_name":"Quận 11",
        "from_province_name":"TP Hồ Chí Minh",
        "required_note": "KHONGCHOXEMHANG",
        "return_name": "Tin",
        "return_phone": "0909999999",
        "return_address": "123 Đường 3/2",
        "return_ward_name": "Phường 5",
        "return_district_name": "Quận 11",
        "return_province_name":"TP Hồ Chí Minh",
        "client_order_code": "",
        "to_name": "Độ Mixi",
        "to_phone": "0909998877",
        "to_address": "Streaming houseee",
        "to_ward_name":"Phường 14",
        "to_district_name":"Quận 10",
        "to_province_name":"TP Hồ Chí Minh",
        "cod_amount": 200000,
        "content": "Theo New York Times",
        "weight": 200,
        "length": 1,
        "width": 19,
        "height": 10,
        "pick_station_id": 1444,
        "deliver_station_id": null,
        "insurance_value": 5000000,
        "service_id": 0,
        "service_type_id":2,
        "coupon":null,
        "pick_shift":null,
        "pickup_time": 1665272576,
        "items": [
             {
                 "name":"Áo Polo",
                 "code":"Polo123",
                 "quantity": 1,
                 "price": 200000,
                 "length": 12,
                 "width": 12,
                 "height": 12,
                 "category": 
                 {
                     "level1":"Áo"
                 }
             }
             
         ]
    };
      $http.post(urlGHN,datas ,{
        headers: {'Content-Type': 'application/json'},
        headers: {'ShopId': '120960'},
        headers: {'Token': '5cd3fbdc-76f4-11ed-a83f-5a63c54f968d'}
      }).then(resp => {
        alert("Đơn vị vận chuyện đang đợi Admin xác nhận !");
        console.log(resp.data);
      }).catch(error => {
        alert("Đặt hàng lỗi !");
        console.log(error);
      })
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
myApp.controller("voucher", function ($scope,$http) {
	$scope.tempDate;
	$scope.itemm = [];
	displayHello = setInterval(function () {
			console.log("interval")
			for(let i = 0; i < $scope.itemm.length; i++) {
				let datetemp = new Date($scope.itemm[i].voucher_createdate);
				//console.log(datetemp);
				let date2 = new Date();
				let ms = datetemp.getTime() - date2.getTime();
				console.log(ms,i);
				let seconds = (ms / 1000).toFixed(1);
				  let minutes = (ms / (1000 * 60)).toFixed(1);
				  let hours = (ms / (1000 * 60 * 60)).toFixed(1);
				  let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
				  if (seconds < 60) return seconds + " Sec";
				  else if (minutes < 60) return minutes + " Min";
				  else if (hours < 24) return hours + " Hrs";
				document.getElementById("abc"+i).innerHTML = days + " Days";
			}
		}, 1000);
	 $scope.loadAll = async function () {
		await $http.get(`${host}/voucher_data`)
		.then(resp => {
			$scope.itemm = resp.data;
			console.log(resp.data);
			//await setInterval(displayHello, 1000);
			
			
			
		})
		.catch(err => {
			console.log(err)
		})
		
		setInterval(displayHello, 1000);
		/*for(let i = 0; i < $scope.itemm.length; i++) {
				let datetemp = new Date($scope.itemm[i].voucher_createdate);
				//onsole.log(datetemp);
				let date2 = new Date();
				let datee = datetemp.getTime() - date2.getTime();
				console.log(datee,i);
				document.getElementById("abc"+i).innerHTML = datee;
				//msToTime(datee)
			}*/
	}
	
		
	$scope.runDate = function (date) {
		var datetemp = new Date(date);
		console.log(datetemp);
		var date2 = new Date();
		var datee = datetemp.getTime() - date2.getTime();
		console.log(datee);
		$scope.tempDate = 0;
	}
	  $scope.gift = async function (voucher_name,product_id) {
		//voucher.voucher_isdelete = true;
		var tempList = [];
		var item = {};
		await $http.get(`${host}/voucher_data/name/${voucher_name}`)
		.then(resp => {
			tempList = resp.data;
			console.log(resp.data)
			for(let i = 0; i < tempList.length;i++ ){
				if(tempList[i].voucher.voucher_name == voucher_name && tempList[i].product.product_id == product_id) {
					item = tempList[i];
					item.voucher_isdelete = true;
					console.log(item, "ITEM");
				}
			}
		})
		.catch(err => {
			console.log(err)
		})
		
		await $http.post(`${host}/voucher_data`,item)
		.then(resp => {
			$scope.loadAll();
			alert("Mã voucher là: " + item.voucher.voucher_name + ";\nGiảm: "+ item.voucher.voucher_desc + "%" + ";\nSẽ áp dụng cho sản phẩm: " + item.product.product_name);
			//tempList.join(', ')
		})
		.catch(err => {
			console.log(err)
		})
	}
	
	$scope.loadAll();

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
function msToTime(duration) {
  var milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}


function imageZoom(imgID, resultID) {
  var img, lens, result, cx, cy;
  img = document.getElementById(imgID);
  result = document.getElementById(resultID);
  /* Create lens: */
  lens = document.createElement("DIV");
  lens.setAttribute("class", "img-zoom-lens");
  /* Insert lens: */
  img.parentElement.insertBefore(lens, img);
  /* Calculate the ratio between result DIV and lens: */
  cx = result.offsetWidth / lens.offsetWidth;
  cy = result.offsetHeight / lens.offsetHeight; 
  /* Set background properties for the result DIV */
  result.style.backgroundImage = "url('" + img.src + "')";
  result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
  /* Execute a function when someone moves the cursor over the image, or the lens: */
  lens.addEventListener("mousemove", moveLens);
  img.addEventListener("mousemove", moveLens);
  /* And also for touch screens: */
  lens.addEventListener("touchmove", moveLens);
  img.addEventListener("touchmove", moveLens);
  function moveLens(e) {
    var pos, x, y;
    /* Prevent any other actions that may occur when moving over the image */
    e.preventDefault();
    /* Get the cursor's x and y positions: */
    pos = getCursorPos(e);
    /* Calculate the position of the lens: */
    x = pos.x - (lens.offsetWidth / 2);
    y = pos.y - (lens.offsetHeight / 2);
    /* Prevent the lens from being positioned outside the image: */
    if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
    if (x < 0) {x = 0;}
    if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
    if (y < 0) {y = 0;}
    /* Set the position of the lens: */
    lens.style.left = x + "px";
    lens.style.top = y + "px";
    /* Display what the lens "sees": */
    result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
  }
  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    /* Get the x and y positions of the image: */
    a = img.getBoundingClientRect();
    /* Calculate the cursor's x and y coordinates, relative to the image: */
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /* Consider any page scrolling: */
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }
}
