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

import com.fasterxml.jackson.databind.JsonNode;
import com.shop.entity.Order;
import com.shop.service.OrdersService;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/order")
public class RestController_Order {

	@Autowired
	OrdersService dao;
	
	@PostMapping()
	public Order create(@RequestBody JsonNode orderData) {
		return dao.create(orderData);
	}
	
	@PostMapping("create")
	public Order create(@RequestBody Order order) {
		return dao.createe(order);
	}
	
	@GetMapping
	public List<Order>getorder(){
		return dao.findAll2();
	}
	
	@GetMapping("{id}")
	public Order loadid(@PathVariable("id") Integer id) {
		return dao.findById(id);
	}
	
	@GetMapping("search/{address}")
	public List<Order> loadfullname(@PathVariable("address") String address) {
		return dao.findByAddress(address);
	}
	
	@GetMapping("search2/{address}")
	public List<Order> loaddate(@PathVariable("address") String address) {
		return dao.findByAddressdate(address);
	}
	
	@DeleteMapping("{id}")
	public void delete(@PathVariable("id") Integer id) {
		dao.delete(id);
	}
	
	
	@PutMapping("{id}")
	public Order update(@RequestBody Order order,@PathVariable("id")Integer id) {
		return dao.update(order);
	}
	
}
