package com.shop.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.entity.ProductBrand;
import com.shop.entity.Users;
import com.shop.service.Product_BrandsService;

@CrossOrigin("*")
@RestController
@RequestMapping("rest/brand")
public class RestController_ProductBrand {
	@Autowired
	Product_BrandsService dao;
	
	@GetMapping
	public List<ProductBrand>findAll(){
		return dao.findAll2();
	}
	
	@GetMapping("{id}")
	public ProductBrand loadid(@PathVariable("id") Integer id) {
		return dao.findById(id);
	}
	
	@GetMapping("search/{Name}")
	public List<ProductBrand> loadfullname(@PathVariable("Name") String Name) {
		return dao.findByName(Name);
	}
	
	@DeleteMapping("{id}")
	public void delete(@PathVariable("id") Integer id) {
		dao.delete(id);
	}
	
	@PostMapping
	public ProductBrand create(@RequestBody ProductBrand brand) {
		return dao.create(brand);
	}
	
	@PutMapping("{id}")
	public ProductBrand update(@RequestBody ProductBrand brand,@PathVariable("id")Integer id) {
		return dao.update(brand);
	}
}
