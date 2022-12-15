package com.shop.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.shop.entity.Order_Details;

public interface Order_DetailsDAO extends JpaRepository<Order_Details, Integer>{
	@Query(value= "SELECT od.*, p.product_name,  v.Voucher_desc FROM order_details od "
			+ "INNER JOIN product p ON od.OrDetail_productid = p.Product_id "
			+ "INNER JOIN Voucher v ON od.OrDetail_voucherName = v.Voucher_name "
			+ "WHERE ((ordetail_id like %?1%) or (ordetail_quantity like %?1%) "
			+ "or (ordetail_price like %?1%) or (ordetail_status like %?1%) "
			+ "or (p.Product_name like %?1%) or (v.Voucher_desc like %?1%)) ",nativeQuery = true)
    List<Order_Details> findBySearch(String Search);
    
    @Query(value= "SELECT * FROM order_details WHERE OrDetail_createDate = ?1",nativeQuery = true)
    List<Order_Details> findBySearch2(String Search);
    
    
    @Query(value= "SELECT * FROM Order_Details WHERE ordetail_isdelete = 'false'", nativeQuery = true)
	List<Order_Details> findAll2();
	
	@Query(value= "Select SUM(ordetail_quantity) from order_details where Ordetail_createdate BETWEEN  ?1  and ?2", nativeQuery = true)
	Long gettongsp7ngay(String ngay1, String ngay2);
	
	@Query(value= "select  Product_name, sum(OrDetail_quantity) "
			+ "from order_details INNER JOIN Product on Product_id = OrDetail_productid "
			+ "where OrDetail_createDate BETWEEN  ?1  and ?2 "
			+ "group by Product_name "
			+ "ORDER BY sum(OrDetail_quantity) desc ", nativeQuery = true)
	List<Object[]> getsp7ngay(String ngay1, String ngay2);
	
	@Query(value= "select sum(od.Ordetail_quantity * (od.ordetail_price - (od.ordetail_price/100*v.voucher_desc) )) "
			+ "from order_details od inner join voucher v on v.voucher_name = od.ordetail_vouchername "
			+ "where od.ordetail_createdate between ?1 and ?2", nativeQuery = true)
	Long gettong7ngay(String ngay1, String ngay2);

	@Query(value= "SELECT TOP 1 COUNT(od.OrDetail_voucherName),od.OrDetail_voucherName  "
			+ "FROM order_details od INNER JOIN voucher v ON v.voucher_name = od.ordetail_vouchername "
			+ "where od.ordetail_createdate between ?1 and ?2 "
			+ "group by od.ordetail_vouchername "
			+ "ORDER BY COUNT(od.ordetail_vouchername) DESC ", nativeQuery = true)
	List<Object[]> getodvoucher(String ngay1, String ngay2);
	
	
	@Query(value = "SELECT * FROM order_details WHERE OrDetail_orderid=?1 and OrDetail_isDelete='false'", nativeQuery = true)
	List<Order_Details> getOrderByOrderId(Integer orderID);
}
