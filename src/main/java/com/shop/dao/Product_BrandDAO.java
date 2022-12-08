package com.shop.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.shop.entity.ProductBrand;

public interface Product_BrandDAO extends JpaRepository<ProductBrand, Integer>{
	@Query(value= "SELECT * FROM Product_Brand WHERE ((ProBrand_name like %?1%) or (probrand_id like %?1%))",nativeQuery = true)
    List<ProductBrand> findByName(String name);
	
	@Query(value= "SELECT * FROM Product_brand WHERE probrand_isdelete = 'false'", nativeQuery = true)
	List<ProductBrand> findAll2();
}
