package com.shop.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.dao.Product_BrandDAO;
import com.shop.entity.ProductBrand;
import com.shop.service.Product_BrandsService;

@Service
public class Product_BrandsServiceImpl implements Product_BrandsService{
	
	@Autowired
	Product_BrandDAO dao;
	
	@Override
	public List<ProductBrand> findAll() {
		return dao.findAll();
	}
	
	@Override
	public ProductBrand findById(Integer id) {
		return dao.findById(id).get();
	}

	@Override
	public void delete(Integer id) {
		dao.deleteById(id);
		
	}

	@Override
	public ProductBrand create(ProductBrand brand) {
		return dao.save(brand);
	}

	@Override
	public ProductBrand update(ProductBrand brand) {
		return dao.save(brand);
	}

	@Override
	public List<ProductBrand> findByName(String name) {
		// TODO Auto-generated method stub
		return dao.findByName(name);
	}

	@Override
	public List<ProductBrand> findAll2() {
		// TODO Auto-generated method stub
		return dao.findAll2();
	}
	
}
