package com.shop.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.shop.entity.Users;

public interface UserDAO extends JpaRepository<Users, String>{
	
	@Query(value = "SELECT * FROM [User] WHERE User_username = ?1",nativeQuery = true)
	Users findByUserID(String id);
	
	@Query(value= "SELECT * FROM [user] WHERE ((user_fullname like %?1%) or ( user_phone like %?1%) "
			+ "or ( user_mail like %?1%) or ( user_username like %?1%)) " ,nativeQuery = true)
    List<Users> findByFullname(String fullname);
	
	@Query(value= "SELECT * FROM [user] WHERE user_phone like %?1%",nativeQuery = true)
	List<Users> findBUserphone(String userphone);
	
	@Query(value= "SELECT * FROM [user] WHERE user_isdelete = 'false'", nativeQuery = true)
	List<Users> findAll2();
}
