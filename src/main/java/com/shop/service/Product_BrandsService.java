package com.shop.service;

import java.util.List;

import com.shop.entity.ProductBrand;

public interface Product_BrandsService {
	List<ProductBrand> findAll();
	
	ProductBrand findById(Integer id);

	void delete(Integer id);

	ProductBrand create(ProductBrand productBrand);

	ProductBrand update(ProductBrand productBrand);

	List<ProductBrand> findByName(String name);

	List<ProductBrand> findAll2();
}
