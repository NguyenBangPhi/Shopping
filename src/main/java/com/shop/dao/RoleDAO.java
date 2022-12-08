package com.shop.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.shop.entity.Role;

public interface RoleDAO extends JpaRepository<Role, String>{
	@Query(value= "SELECT * FROM role WHERE ((Role_name like %?1%) or (role_id like %?1%)) ",nativeQuery = true)
    List<Role> findByName(String name);
	
	@Query(value= "SELECT * FROM role WHERE role_isdelete = 'false'", nativeQuery = true)
	List<Role> findAll2();
	
	@Query(value= "SELECT * FROM role WHERE role_name = ?1", nativeQuery = true)
	Role findByrolename(String name);
}
