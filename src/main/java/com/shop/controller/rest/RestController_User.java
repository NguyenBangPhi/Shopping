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

import com.shop.entity.Users;
import com.shop.service.UsersService;

@CrossOrigin("*")
@RestController
@RequestMapping("rest/user")
public class RestController_User {
	@Autowired
	UsersService dao;
	
	@GetMapping
	public List<Users>getuser(){
		return dao.findAll2();
	}
	
	
	
	@GetMapping("{id}")
	public Users loadid(@PathVariable("id") String id) {
		return dao.findById(id);
	}
	
	@GetMapping("search/{fullname}")
	public List<Users> loadfullname(@PathVariable("fullname") String fullname) {
		return dao.findByFullname(fullname);
	}

	@GetMapping("search2/{phone}")
	public List<Users> loadphone(@PathVariable("phone") String phone) {
		return dao.findBUserphone(phone);
	}
	
	@DeleteMapping("{id}")
	public void delete(@PathVariable("id") String id) {
		dao.delete(id);
	}
	
	@PostMapping
	public Users create(@RequestBody Users user) {
		return dao.create(user);
	}
	
	@PutMapping("{id}")
	public Users update(@RequestBody Users user,@PathVariable("id")String id) {
		return dao.update(user);
	}
}
