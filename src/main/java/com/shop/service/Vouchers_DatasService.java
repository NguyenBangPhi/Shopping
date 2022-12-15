package com.shop.service;

import java.util.List;

import com.shop.entity.Product;
import com.shop.entity.Voucher_Data;

public interface Vouchers_DatasService {
	List<Integer> checkVoucher(String vouchername);
	
	List<Voucher_Data> findAll();
	
	Voucher_Data findById(Integer vdata_id);

	void delete(Integer vdata_id);

	Voucher_Data create(Voucher_Data voucher_data);

	Voucher_Data update(Voucher_Data voucher_data);

	List<Voucher_Data> findBySearch(String search);

	List<Voucher_Data> findAll2();
	
	List<String> selectName(String name);
}
