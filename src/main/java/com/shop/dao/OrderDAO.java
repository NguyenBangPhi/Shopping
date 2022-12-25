package com.shop.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.shop.entity.Order;
import com.shop.entity.Order_Details;

public interface OrderDAO extends JpaRepository<Order, Integer>{
	@Query(value = "SELECT * FROM [Order] WHERE Order_id=?1",nativeQuery = true)
	Order findByOrderId(Integer id);
	
	@Query(value= "SELECT * FROM [order] WHERE ((order_address like %?1%) or (order_id like %?1%)"
			+ "or (order_fullname like %?1%) or (order_email like %?1%) or (order_usernameid like %?1%))",nativeQuery = true)
    List<Order> findByAddress(String address);
	
	@Query(value= "SELECT * FROM [order] WHERE order_createdate = ?1",nativeQuery = true)
	List<Order> findByAddressdate(String address);
	
	@Query(value = "Select count(*) from [Order] where order_createdate = CAST( GETDATE() AS Date)",nativeQuery= true)
	Long getTodayOrder();
	
	@Query(value= "SELECT * FROM [order] WHERE order_isdelete = 'false'", nativeQuery = true)
	List<Order> findAll2();
	
	
//	@Query(value= "SELECT count(*) FROM [order] WHERE order_createdate BETWEEN  CAST( GETDATE()-7 AS Date)  and CAST( GETDATE() AS Date)", nativeQuery = true)
//	Long get7day();
	
	@Query(value= "SELECT count(*) FROM [order] WHERE order_createdate BETWEEN  ?1  and ?2", nativeQuery = true)
	Long get7day(String ngay1, String ngay2);
	
	@Query(value= "SELECT order_usernameid , COUNT(order_usernameid) as 'topuser' from [order] "
			+ "WHERE order_createdate BETWEEN ?1  and ?2 "
			+ "GROUP BY order_usernameid "
			+ "ORDER BY COUNT(order_usernameid) DESC", nativeQuery = true)
	List<Object[]> gettopuser(String ngay1, String ngay2);
	
	@Query(value = "Select t.last7Days as 'date', ISNULL(sum(OrDetail_quantity*OrDetail_quantity),0) as ' totalPayment' "
			+ "From (Select cast(Getdate()as Date) last7Days "
			+ "Union all "
			+ "Select DateAdd(day,-1,cast(getdate()as date)) "
			+ "Union all "
			+ "Select DateAdd(day,-2,cast(getdate()as date)) "
			+ "Union all "
			+ "Select DateAdd(day,-3,cast(getdate()as date)) "
			+ "Union all "
			+ "Select DateAdd(day,-4,cast(getdate()as date)) "
			+ "Union all "
			+ "Select DateAdd(day,-5,cast(getdate()as date)) "
			+ "Union all "
			+ "Select DateAdd(day,-6,cast(getdate()as date)) "
			+ "Union all "
			+ "Select DateAdd(day,-7,cast(getdate()as date)) "
			+ ") t Left Join [Order] t1 on cast(t.last7Days as date) = Cast(t1.Order_createDate as date)  "
			+ "left join Order_Details dt on  t1.Order_id = dt.OrDetail_orderid "
			+ "Group by cast(t.last7Days as Date)", nativeQuery = true)
	List<Object[]> getRevenueLast7Days();
	
	@Query(value = "SELECT * FROM [order] WHERE order_isdelete='false' and Order_usernameid=?1",nativeQuery = true)
	List<Order> getAllWhereUser(String username);
	
	@Query(value = "select ord.Order_id, ord.Order_address, ord.Order_createDate, ord.Order_status, a.Gia from [Order] ord " + 
			"join ( " + 
			"SELECT OrDetail_orderid as 'OrID',SUM(od.OrDetail_quantity * (OrDetail_price - (od.OrDetail_price *  ISNULL(v.Voucher_desc,0) /100 ))) as 'Gia' " + 
			"FROM Order_Details od " + 
			"left join Voucher v on v.Voucher_name = od.OrDetail_voucherName	" + 
			"GROUP BY OrDetail_orderid ) a on a.OrID = ord.Order_id "
			+ "WHERE ord.Order_usernameid=?1 and ord.Order_isDelete='false' ", nativeQuery = true)
	List<Object[]> getAllOrderByUsername(String username);
}
