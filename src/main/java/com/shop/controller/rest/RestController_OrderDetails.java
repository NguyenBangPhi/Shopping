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

import com.shop.entity.Order_Details;
import com.shop.service.Order_DetailsService;

@CrossOrigin("*")
@RestController
@RequestMapping("rest/order_details")
public class RestController_OrderDetails {
	@Autowired
	Order_DetailsService dao;
	
	@GetMapping
	public List<Order_Details>getorder(){
		return dao.findAll2();
	}
	
	@GetMapping("search/{Search}")
	public List<Order_Details> loadfullname(@PathVariable("Search") String Search) {
		return dao.findBySearch(Search);
	}
	
	@GetMapping("search2/{Search}")
	public List<Order_Details> loadfullname2(@PathVariable("Search") String Search) {
		return dao.findBySearch2(Search);
	}
	
	@GetMapping("{ordetail_id}")
	public Order_Details loadid(@PathVariable("ordetail_id") Integer ordetail_id) {
		return dao.findById(ordetail_id);
	}
	
	@DeleteMapping("{ordetail_id}")
	public void delete(@PathVariable("ordetail_id") Integer ordetail_id) {
		dao.delete(ordetail_id);
	}
	
	@PostMapping
	public Order_Details create(@RequestBody Order_Details order_details) {
		return dao.create(order_details);
	}
	
	@PutMapping("{ordetail_id}")
	public Order_Details update(@RequestBody Order_Details order_details,@PathVariable("ordetail_id")Integer ordetail_id) {
		return dao.update(order_details);
	}
}
