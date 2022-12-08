package com.shop.service;

import java.util.List;

import com.shop.entity.Users;

public interface UsersService {
	
	Users findById(String id);
	
	List<Users> findAll();
	List<Users> findAll2();
	

	void delete(String id);

	Users create(Users user);

	Users update(Users user);

	List<Users> findByFullname(String fullname);

	List<Users> findBUserphone(String phone);
}
