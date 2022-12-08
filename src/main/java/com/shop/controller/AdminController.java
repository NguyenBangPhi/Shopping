package com.shop.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AdminController {
	@RequestMapping("/order")
	public String product() {
		return "order/order";
	}
	
	@RequestMapping("/admin")
	public String admin() {
		return "admin/indexView";
	}
	
	@RequestMapping("/adminThongke")
	public String adminThongke() {
		return "adminCRUD/Thongke";
	}
	
	@RequestMapping("/adminOrder")
	public String adminOrder() {
		return "adminCRUD/order";
	}
	
	@RequestMapping("/adminRole")
	public String adminRole() {
		return "adminCRUD/role";
	}
	
	@RequestMapping("/adminProBrand")
	public String adminProBrand() {
		return "adminCRUD/productBrand";
	}
	
	
	@RequestMapping("/adminVoucherData")
	public String adminVouData() {
		return "adminCRUD/voucherData";
	}
	
	@RequestMapping("/adminProduct")
	public String adminProduct() {
		return "adminCRUD/product";
	}
	@RequestMapping("/adminOrderDetails")
	public String adminOrderDetails() {
		return "adminCRUD/OrderDetails";
	}
	@RequestMapping("/adminVoucher")
	public String adminVoucher() {
		return "adminCRUD/voucher";
	}
	
	@RequestMapping("/adminUser")
	public String adminUser() {
		return "adminCRUD/user";
	}
}
