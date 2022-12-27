package com.shop.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.shop.entity.Order_Details;

public interface Order_DetailsDAO extends JpaRepository<Order_Details, Integer>{
	@Query(value= "SELECT od.*, p.product_name,  v.Voucher_desc FROM order_details od "
			+ "left JOIN product p ON od.OrDetail_productid = p.Product_id "
			+ "left JOIN Voucher v ON od.OrDetail_voucherName = v.Voucher_name "
			+ "left JOIN [Order] o on o.Order_id = od.OrDetail_orderid "
			+ "WHERE ((od.ordetail_id like %?1%) or (od.ordetail_quantity like %?1%) "
			+ "or (od.ordetail_price like %?1%) or (od.ordetail_status like %?1%) "
			+ "or (p.Product_name like %?1%) or (p.product_id like %?1%) "
			+ "or (v.Voucher_desc like %?1%) or (o.order_id like %?1%)) ",nativeQuery = true)
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

	@Query(value= "SELECT COUNT(od.OrDetail_voucherName),od.OrDetail_voucherName  "
			+ "FROM order_details od INNER JOIN voucher v ON v.voucher_name = od.ordetail_vouchername "
			+ "where od.ordetail_createdate between ?1 and ?2 "
			+ "group by od.ordetail_vouchername "
			+ "ORDER BY COUNT(od.ordetail_vouchername) DESC ", nativeQuery = true)
	List<Object[]> getodvoucher(String ngay1, String ngay2);
	
	
	@Query(value = "SELECT * FROM order_details WHERE OrDetail_orderid=?1 and OrDetail_isDelete='false'", nativeQuery = true)
	List<Order_Details> getOrderByOrderId(Integer orderID);
	
	@Query(value= "select p.Product_id,p.Product_name,  p.Product_price, COUNT(od.OrDetail_orderid) as 'oid', sum(od.OrDetail_quantity) as 'sl', "
			+ "COUNT(od.OrDetail_voucherName) as 'vname', "
			+ "SUM((p.Product_price - (p.Product_price/100*ISNULL(v.Voucher_desc,0)))*od.OrDetail_quantity) "
			+ "from Order_Details od  "
			+ "inner join Product p on p.Product_id = od.OrDetail_productid "
			+ "LEFT join Voucher v on v.Voucher_name = od.OrDetail_voucherName "
			+ "where p.Product_id = ?1 "
			+ "group by p.Product_id,p.Product_name, p.Product_price ", nativeQuery = true)
	List<Object[]> tkproduct(Integer id);
	
	@Query(value= "select od.OrDetail_orderid, sum(od.OrDetail_quantity) as 'sl', "
			+ "ISNULL(v.Voucher_desc,0) as 'vname', od.OrDetail_createDate, "
			+ "SUM((p.Product_price - (p.Product_price/100*ISNULL(v.Voucher_desc,0)))*od.OrDetail_quantity) as 'tong' "
			+ "from Order_Details od "
			+ "inner join Product p on p.Product_id = od.OrDetail_productid "
			+ "LEFT join Voucher v on v.Voucher_name = od.OrDetail_voucherName "
			+ "where p.Product_id = ?1 "
			+ "group by od.OrDetail_createDate, v.Voucher_desc,od.OrDetail_id,od.OrDetail_orderid ", nativeQuery = true)
	List<Object[]> tkctproduct(Integer id);
	
	@Query(value= "select o.Order_id, o.Order_usernameid,COUNT(od.OrDetail_id)  "
			+ "as 'sloder',COUNT(od.OrDetail_voucherName) as 'slv' "
			+ "from Order_Details od LEFT join [Order] o on o.Order_id = od.OrDetail_orderid "
			+ "where o.Order_id = ?1 "
			+ "group by o.Order_id, o.Order_usernameid ", nativeQuery = true)
	List<Object[]> tkorder(Integer id);
	
	@Query(value= "select od.OrDetail_id,p.Product_name, od.OrDetail_quantity, od.OrDetail_price,   "
			+ "ISNULL(v.Voucher_desc,0) as 'v' ,od.OrDetail_status,od.OrDetail_createDate, "
			+ "SUM((p.Product_price - (p.Product_price/100*ISNULL(v.Voucher_desc,0)))*od.OrDetail_quantity) as 'tong' "
			+ "from Order_Details od inner join [Order] o on o.Order_id = od.OrDetail_orderid "
			+ "inner join Product p on p.Product_id = od.OrDetail_productid "
			+ "left join Voucher v on v.Voucher_name = od.OrDetail_voucherName "
			+ "where o.Order_id = ?1 "
			+ "group by od.OrDetail_id,od.OrDetail_status,od.OrDetail_createDate,  "
			+ "p.Product_name,od.OrDetail_price, od.OrDetail_quantity,v.Voucher_desc", nativeQuery = true)
	List<Object[]> tkctorder(Integer id);
	
	@Query(value= "SELECT * FROM Order_Details WHERE OrDetail_orderid = ?1", nativeQuery = true)
	List<Order_Details> oderid(Integer id);
}
