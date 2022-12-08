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

import com.shop.entity.Role;
import com.shop.service.RolesService;

@CrossOrigin("*")
@RestController
@RequestMapping("rest/role")
public class RestController_Role {
	@Autowired
	private RolesService dao;
	
	@GetMapping
	public List<Role> getAll(){
		return  dao.findAll();
	}
	
	@GetMapping("/list")
	public List<Role> getAlll(){
		return  dao.findAll2();
	}
	
	@GetMapping("{id}")
	public Role loadid(@PathVariable("id") String id) {
		return dao.findById(id);
	}
	
	@GetMapping("name/{name}")
	public Role loadrolename(@PathVariable("name") String name) {
		return dao.findByrolename(name);
	}
	
	@GetMapping("search/{Name}")
	public List<Role> loadfullname(@PathVariable("Name") String Name) {
		return dao.findByName(Name);
	}
	
	@DeleteMapping("{id}")
	public void delete(@PathVariable("id") String id) {
		dao.delete(id);
	}
	
	@PostMapping
	public Role create(@RequestBody Role role) {
		return dao.create(role);
	}
	
	@PutMapping("{id}")
	public Role update(@RequestBody Role role,@PathVariable("id")String id) {
		return dao.update(role);
	}
}
