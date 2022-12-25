package com.shop.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.shop.entity.Product;

public interface ProductDAO extends JpaRepository<Product, Integer>{
	@Query(value = "SELECT TOP 6 * FROM Product",nativeQuery = true)
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
	
	
}
