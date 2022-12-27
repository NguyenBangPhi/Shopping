package com.shop.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.shop.entity.Product;

public interface ProductDAO extends JpaRepository<Product, Integer>{
	@Query(value = "select TOP 6 p.* " + 
			"from Product p " + 
			"left JOIN order_details od on p.Product_id = od.OrDetail_productid " + 
			"group by p.Product_id, p.Product_name, p.Product_price, p.Product_img, " + 
			"p.Product_desc, p.Product_quantity, p.ProBrand_id, p.Product_isDelete " + 
			"ORDER BY sum(od.OrDetail_quantity) desc ",nativeQuery = true)
	List<Product> findTop6();

	@Query(value = "SELECT * FROM Product WHERE ProBrand_id=?1",nativeQuery = true)
	List<Product> findByProbrandId(Integer id);
	
	@Query(value= "SELECT * FROM Product WHERE ((product_id like %?1%) or (product_name like %?1%) "
			+ "or (product_price like %?1%) or (product_img like %?1%) or (product_desc like %?1%) or (product_quantity like %?1%))",nativeQuery = true)
    List<Product> findBySearch(String Search);
	
	@Query(value= "SELECT * FROM Product WHERE product_isdelete = 'false'", nativeQuery = true)
	List<Product> findAll2();
	
	@Query(value="Select c.ProBrand_name, ISNULL(sum(odt.OrDetail_quantity),0) from Product_Brand c  "
			+ "inner join Product p on c.ProBrand_id = p.ProBrand_id "
			+ "inner join Order_Details odt on p.Product_id = odt.OrDetail_productid "
			+ "inner join [Order] o on odt.OrDetail_orderid = o.Order_id "
			+ "Where o.Order_createDate Between ?1 and ?2 "
			+ "group by c.ProBrand_name",nativeQuery = true)
	List<Object[]> numberOfProductSoldByType(String ngay1, String ngay2);
	
	@Query(value="select TOP 6 p.* " + 
			"from Product p " + 
			"left JOIN order_details od on p.Product_id = od.OrDetail_productid  " + 
			"where p.ProBrand_id=?1 " + 
			"group by p.Product_id, p.Product_name, p.Product_price, p.Product_img,  " + 
			"p.Product_desc, p.Product_quantity, p.ProBrand_id, p.Product_isDelete " + 
			"ORDER BY sum(od.OrDetail_quantity) desc ",nativeQuery = true)
	List<Product> findThinhHanh(Integer probrandid);
	
	@Query(value="select TOP 6 * from Product where product_quantity >= 1 " + 
			"ORDER BY NEWID() ",nativeQuery = true)
	List<Product> findGioVang();
}
