package com.shop.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.shop.entity.Voucher;

public interface VoucherDAO extends JpaRepository<Voucher, String>{
	@Query(value= "SELECT * FROM Voucher WHERE ( (voucher_name like %?1%) or (voucher_desc like %?1%))",nativeQuery = true)
    List<Voucher> findBySearch(String Search);
	
	@Query(value= "SELECT * FROM Voucher WHERE voucher_isdelete = 'false'", nativeQuery = true)
	List<Voucher> findAll2();
}
