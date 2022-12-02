package com.shop.service;

import java.util.List;

import com.shop.entity.Product;

public interface ProductsService {
	List<Product> findAll();
	List<Product> findTop6PageIndex();
	Product findById(Integer id);
	List<Product> findByProbrandId(Integer id);
}
