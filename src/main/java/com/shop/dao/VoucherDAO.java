package com.shop.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.shop.entity.Voucher;

public interface VoucherDAO extends JpaRepository<Voucher, String>{
	@Query(value= "SELECT * FROM Voucher WHERE ( (voucher_name like %?1%) or (voucher_desc like %?1%))",nativeQuery = true)
    List<Voucher> findBySearch(String Search);
	
//	@Query(value= "SELECT * FROM Voucher WHERE voucher_isdelete = 'false'", nativeQuery = true)
//	List<Voucher> findAll2();
	
	@Query(value= "SELECT v.Voucher_name,v.Voucher_desc,v.Voucher_isDelete,d.Voucher_createDate, d.Product_id FROM Voucher v " + 
			"JOIN Voucher_Data d on d.Voucher_name = v.Voucher_name " + 
			"WHERE d.voucher_isdelete = 'false' and d.Voucher_createDate >= CONVERT(date,GETDATE())", nativeQuery = true)
	List<Object[]> findAll2();
}
