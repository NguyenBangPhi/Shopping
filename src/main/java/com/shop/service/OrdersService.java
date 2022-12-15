package com.shop.service;

import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;
import com.shop.entity.Order;

public interface OrdersService {

	Order create(JsonNode orderData);

	Order findById(Integer id);
	
	
	
	List<Order> findAll();
	List<Order> findAll2();
	

	void delete(Integer id);

	Order createe(Order order);

	Order update(Order order);

	List<Order> findByAddress(String address);

	List<Order> findByAddressdate(String address);
	Object get7day(String ngay1, String ngay2);
	List<Object[]> gettopuser(String ngay1, String ngay2);
	List<Object[]> getRevenueLast7Days();
	List<Order> loadAllwhereUser(String user);
	
	List<Object[]> getAllOrderByUsername(String username);
}
