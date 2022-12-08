package com.shop.service;

import java.util.List;

import com.shop.entity.Voucher;

public interface VouchersService {
	Voucher findById(String id);
	
	List<Voucher> findAll();

	void delete(String vdata_id);

	Voucher create(Voucher voucher);

	Voucher update(Voucher voucher);

	List<Voucher> findBySearch(String search);

	List<Voucher> findAll2();
}
