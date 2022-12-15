package com.shop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.shop.entity.Users;
import com.shop.service.Product_BrandsService;
import com.shop.service.ProductsService;
import com.shop.service.UsersService;

@Controller
public class IndexController {
	
	@Autowired
	Product_BrandsService proBrandService;
	
	@Autowired
	ProductsService proService;
	
	@Autowired
	UsersService uSer;
	
	@RequestMapping("/index")
	public String index(Model model) {
		//model.addAttribute("listDM", proBrandService.findAll());
		model.addAttribute("listSP", proService.findTop6PageIndex());
		return "layout/indexView";
	}
	
	@RequestMapping("/contact")
	public String contact(Model model) {
		//model.addAttribute("listDM", proBrandService.findAll());
		return "contact/contact";
	}
	
	@RequestMapping("/login")
	public String login(Model model) {
		//model.addAttribute("listDM", proBrandService.findAll());
		return "user/login";
	}
	
	@RequestMapping("/regis")
	public String regis(Model model) {
		return "user/regis";
	}
	
	@RequestMapping("/voucher")
	public String voucher(Model model) {
		return "voucher/voucher";
	}
}
