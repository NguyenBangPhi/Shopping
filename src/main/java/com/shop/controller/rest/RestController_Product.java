package com.shop.controller.rest;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shop.entity.Product;
import com.shop.service.ProductsService;

@CrossOrigin("*")
@RestController
@RequestMapping("rest/product")
public class RestController_Product {
	
	@Autowired
	private ProductsService dao;
	
	@GetMapping("{id}")
	public Product getOne(@PathVariable("id") Integer id) {
		return dao.findById(id);
	}
	
	@GetMapping()
	public List<Product> getAll(@RequestParam("cid") Optional<Integer> cid) {
		if(cid.isPresent()) {
			List<Product> list = dao.findByProbrandId(cid.get());
			return list;
		} else {
			List<Product> list = dao.findAll();
			return list;
		}
	}
	
	@GetMapping("/list")
	public List<Product>getorder(){
		return dao.findAll2();
	}
	
	@GetMapping("search/{Search}")
	public List<Product> loadfullname(@PathVariable("Search") String Search) {
		return dao.findBySearch(Search);
	}

	@DeleteMapping("{product_id}")
	public void delete(@PathVariable("product_id") Integer product_id) {
		dao.delete(product_id);
	}
	
	@PostMapping
	public Product create(@RequestBody Product product) {
		return dao.create(product);
	}
	
	@PutMapping("{product_id}")
	public Product update(@RequestBody Product product,@PathVariable("product_id")Integer product_id) {
		return dao.update(product);
	}
	
	@GetMapping("/listGV")
	public List<Product> getGV(){
		
		return dao.findGioVang();
	}
	
}
