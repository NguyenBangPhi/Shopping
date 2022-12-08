package com.shop.service.impl;

import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.dao.RoleDAO;
import com.shop.entity.Role;
import com.shop.service.RolesService;

@Service
public class RolesServiceImpl implements RolesService{
	@Autowired
	private RoleDAO dao;
	
	@Override
	public List<Role> findAll() {
		return dao.findAll();
	}
	
	@Override
	public Role findById(String id) {
		return dao.findById(id).get();
	}

	@Override
	public void delete(String id) {
		dao.deleteById(id);
		
	}

	@Override
	public Role create(Role role) {
		if(role.getRole_id()== null) {
		Random generator = new Random();
		int value = generator.nextInt(999) + 001;
		role.setRole_id(String.valueOf(value));
		}
		return dao.save(role);
	}

	@Override
	public Role update(Role role) {
		return dao.save(role);
	}

	@Override
	public List<Role> findByName(String name) {
		// TODO Auto-generated method stub
		return dao.findByName(name);
	}

	@Override
	public List<Role> findAll2() {
		// TODO Auto-generated method stub
		return dao.findAll2();
	}

	@Override
	public Role findByrolename(String name) {
		// TODO Auto-generated method stub
		return dao.findByrolename(name);
	}
	
}
