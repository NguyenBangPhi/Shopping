package com.shop.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.shop.entity.Voucher_Data;

public interface Voucher_DataDAO extends JpaRepository<Voucher_Data, Integer>{
	
	@Query(value = "select product_id from Voucher_Data where "
						+ "Voucher_name = ?1 and Voucher_createDate >= CONVERT(date,GETDATE())", nativeQuery = true)
	List<Integer> findVouDataWithVoucherName(String voucherName);
	
	@Query(value= "SELECT * FROM Voucher_Data vd INNER JOIN Product p ON vd.Product_id = p.Product_id "
			+ "INNER JOIN voucher v ON vd.Voucher_name = v.Voucher_name "
			+ "WHERE ((vdata_id like %?1%)  or (p.Product_name like %?1%) "
			+ "or (v.Voucher_name like %?1%) or (v.Voucher_desc like %?1%))",nativeQuery = true)
    List<Voucher_Data> findBySearch(String Search);
    
    @Query(value= "SELECT * FROM Voucher_Data WHERE voucher_isdelete = 'false'", nativeQuery = true)
	List<Voucher_Data> findAll2();
	
//	@Query(value =  "select p.Product_name from Voucher_Data vd " + 
//			"inner join Product p on p.Product_id = vd.Product_id " + 
//			"where vd.Voucher_name=?1 ",nativeQuery = true)
//	List<String> selectNameByIdVoucher(String IdVou);
	
	@Query(value =  "select * from Voucher_Data vd " + 
			"where vd.Voucher_name=?1 ",nativeQuery = true)
	List<Voucher_Data> selectNameByIdVoucher(String IdVou);
	
	
	
}
