package com.shop.service;

import java.util.List;

import com.shop.entity.Role;

public interface RolesService {
	List<Role> findAll();
	
	List<Role> findAll2();

	Role findById(String id);

	void delete(String id);

	Role create(Role role);

	Role update(Role role);

	List<Role> findByName(String name);
	Role findByrolename(String name);
}
