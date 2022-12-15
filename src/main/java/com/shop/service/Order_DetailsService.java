package com.shop.service;

import java.util.List;

import com.shop.entity.Order_Details;

public interface Order_DetailsService {
	List<Order_Details> findAll();
	
	Order_Details findById(Integer ordetail_id);

	void delete(Integer ordetail_id);

	Order_Details create(Order_Details order_details);

	Order_Details update(Order_Details order_details);

	List<Order_Details> findBySearch(String Search);

	List<Order_Details> findAll2();

	Object gettongsp7ngay(String ngay1, String ngay2);

	Object getsp7ngay(String ngay1, String ngay2);

	List<Order_Details> findBySearch2(String search);

	List<Object[]> getodvoucher(String ngay1, String ngay2);

	Object gettong7ngay(String ngay1, String ngay2);
	
	List<Order_Details> getOrderByOrderId(Integer orderID);
}
