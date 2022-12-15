package com.shop.service.impl;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shop.dao.OrderDAO;
import com.shop.dao.Order_DetailsDAO;
import com.shop.entity.Order;
import com.shop.entity.Order_Details;
import com.shop.service.OrdersService;

@Service
public class OrdersServiceImpl implements OrdersService{
	
	@Autowired
	OrderDAO dao;
	
	@Autowired
	Order_DetailsDAO ddao;

	@Override
	public Order create(JsonNode orderData) {
		ObjectMapper mapper = new ObjectMapper();
		
		Order order = mapper.convertValue(orderData, Order.class);
		dao.save(order);
		
		TypeReference<List<Order_Details>> type = new TypeReference<List<Order_Details>>() {};
		
		List<Order_Details> details = mapper.convertValue(orderData.get("order_details"), type)
				.stream()
				.peek(d -> d.setOrder(order))
				.collect(Collectors.toList());
		ddao.saveAll(details);
		return order;
	}
	
	@Override
	public List<Order> findAll() {
		return dao.findAll();
	}

	@Override
	public Order findById(Integer id) {
		
		return dao.findByOrderId(id);
	}
	
	@Override
	public void delete(Integer id) {
		// TODO Auto-generated method stub
		dao.deleteById(id);
	}

	@Override
	public Order createe(Order order) {
		// TODO Auto-generated method stub
		if(order.getOrder_createdate()==null) {
			 LocalDate localDate = LocalDate.now();
		        Date oldDate =
		                Date.from(localDate.atStartOfDay().atZone(ZoneId.systemDefault()).toInstant());
		        order.setOrder_createdate(oldDate);

		}
		return dao.save(order);
	}

	@Override
	public Order update(Order order) {
		// TODO Auto-generated method stub
		return dao.save(order);
	}

	@Override
	public List<Order> findByAddress(String address) {
		// TODO Auto-generated method stub
		return dao.findByAddress(address);
	}

	@Override
	public List<Order> findByAddressdate(String address) {
		// TODO Auto-generated method stub
		return dao.findByAddressdate(address);
	}

	@Override
	public List<Order> findAll2() {
		// TODO Auto-generated method stub
		return dao.findAll2();
	}


	@Override
	public Object get7day(String ngay1, String ngay2) {
		// TODO Auto-generated method stub
		return dao.get7day(ngay1, ngay2);
	}

	@Override
	public List<Object[]> gettopuser(String ngay1, String ngay2) {
		// TODO Auto-generated method stub
		return dao.gettopuser(ngay1, ngay2);
	}

	@Override
	public List<Object[]> getRevenueLast7Days() {
		// TODO Auto-generated method stub
		return dao.getRevenueLast7Days();
	}

	@Override
	public List<Order> loadAllwhereUser(String user) {
		// TODO Auto-generated method stub
		return dao.getAllWhereUser(user);
	}

	@Override
	public List<Object[]> getAllOrderByUsername(String username) {
		// TODO Auto-generated method stub
		return dao.getAllOrderByUsername(username);
	}
}
