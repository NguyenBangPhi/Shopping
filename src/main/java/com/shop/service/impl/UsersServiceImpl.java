package com.shop.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.dao.UserDAO;
import com.shop.entity.Users;
import com.shop.service.UsersService;

@Service
public class UsersServiceImpl implements UsersService{
	
	@Autowired
	UserDAO dao;

	@Override
	public List<Users> findAll() {
		return dao.findAll();
	}
	
	@Override
	public Users findById(String id) {
		// TODO Auto-generated method stub
		return dao.findByUserID(id);
	}

	@Override
	public void delete(String id) {
		// TODO Auto-generated method stub
		dao.deleteById(id);
	}

	@Override
	public Users create(Users user) {
		// TODO Auto-generated method stub
		return dao.save(user);
	}

	@Override
	public Users update(Users user) {
		// TODO Auto-generated method stub
		return dao.save(user);
	}

	@Override
	public List<Users> findByFullname(String fullname) {
		return dao.findByFullname(fullname);
	}

	@Override
	public List<Users> findBUserphone(String phone) {
		// TODO Auto-generated method stub
		return dao.findBUserphone(phone);
	}

	@Override
	public List<Users> findAll2() {
		// TODO Auto-generated method stub
		return dao.findAll2();
	}

	
	
	
	
	
}
