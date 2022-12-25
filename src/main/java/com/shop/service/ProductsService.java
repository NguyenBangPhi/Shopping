package com.shop.service;

import java.util.List;

import com.shop.entity.Product;

public interface ProductsService {
	List<Product> findAll();
	List<Product> findTop6PageIndex();
	Product findById(Integer id);
	List<Product> findByProbrandId(Integer id);

	void delete(Integer product_id);

	Product create(Product product);

	Product update(Product product);
	
	List<Product> findBySearch(String search);
	List<Product> findAll2();
	List<Object[]> numberOfProductSoldByType(String ngay1, String ngay2);
}
