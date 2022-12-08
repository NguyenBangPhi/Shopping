package com.shop.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.shop.entity.Product;
import com.shop.service.Product_BrandsService;
import com.shop.service.ProductsService;

@Controller
public class ProductController {
	
	@Autowired
	Product_BrandsService proBrandService;
	
	@Autowired
	ProductsService proService;
	
	@RequestMapping("/product")
	public String product(Model model,@RequestParam("cid") Optional<Integer> cid) {
		if(cid.isPresent() ) {
			List<Product> list = proService.findByProbrandId(cid.get());
			model.addAttribute("listSP", list);
		}else {
			model.addAttribute("listSP", proService.findAll());
		}
		//model.addAttribute("listDM", proBrandService.findAll());
		
		return "product/index";
	}
	
	@RequestMapping("/product/{id}")
	public String productDetails(Model model, @PathVariable("id") Integer id) {
		Product item = proService.findById(id);
		model.addAttribute("item", item);
		//model.addAttribute("listDM", proBrandService.findAll());
		return "product/productDetails";
	}
	
	@RequestMapping("/productsBrand/{id}")
	public String productBrand(Model model, @PathVariable("id") Integer id) {
		//model.addAttribute("listDM", proBrandService.findAll());
		return "product/productBrand";
	}
	
//	@RequestMapping("/product/brand/{id}")
//	public String productBrand(Model model, @PathVariable("id") Integer id) {
//		Product item = proService.findById(id);
//		model.addAttribute("item", item);
//		model.addAttribute("listDM", proBrandService.findAll());
//		return "product/index";
//	}
	
	@RequestMapping("/test")
	public String productTest() {
		return "test/index";
	}
}
