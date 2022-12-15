package com.shop.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.dao.Order_DetailsDAO;
import com.shop.entity.Order_Details;
import com.shop.service.Order_DetailsService;

@Service
public class Order_DetailsServiceImpl implements Order_DetailsService{
	@Autowired
	private Order_DetailsDAO dao;

	@Override
	public List<Order_Details> findAll() {
		return dao.findAll();
	}
	
	@Override
	public Order_Details findById(Integer ordetail_id) {
		return dao.findById(ordetail_id).get();
	}

	@Override
	public void delete(Integer ordetail_id) {
		
		dao.deleteById(ordetail_id);
	}

	@Override
	public Order_Details create(Order_Details order_details) {

		return dao.save(order_details);
	}

	@Override
	public Order_Details update(Order_Details order_details) {

		return dao.save(order_details);
	}

	@Override
	public List<Order_Details> findBySearch(String Search) {
		// TODO Auto-generated method stub
		return dao.findBySearch(Search);
	}

	@Override
	public List<Order_Details> findAll2() {
		// TODO Auto-generated method stub
		return dao.findAll2();
	}

	@Override
	public Object gettongsp7ngay(String ngay1, String ngay2) {
		// TODO Auto-generated method stub
		return dao.gettongsp7ngay(ngay1, ngay2);
	}

	@Override
	public Object getsp7ngay(String ngay1, String ngay2) {
		// TODO Auto-generated method stub
		return dao.getsp7ngay(ngay1, ngay2);
	}

	@Override
	public List<Order_Details> findBySearch2(String search) {
		// TODO Auto-generated method stub
		return dao.findBySearch2(search);
	}

	@Override
	public List<Object[]> getodvoucher(String ngay1, String ngay2) {
		// TODO Auto-generated method stub
		return dao.getodvoucher(ngay1, ngay2);
	}

	@Override
	public Object gettong7ngay(String ngay1, String ngay2) {
		// TODO Auto-generated method stub
		return dao.gettong7ngay(ngay1, ngay2);
	}

	@Override
	public List<Order_Details> getOrderByOrderId(Integer orderID) {
		// TODO Auto-generated method stub
		return dao.getOrderByOrderId(orderID);
	}

}
