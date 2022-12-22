package com.shop.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.dao.Voucher_DataDAO;
import com.shop.entity.Product;
import com.shop.entity.Voucher;
import com.shop.entity.Voucher_Data;
import com.shop.service.VouchersService;
import com.shop.service.Vouchers_DatasService;

@Service
public class Vouchers_DatasServiceImpl implements Vouchers_DatasService{
	
	@Autowired
	Voucher_DataDAO dao;

	@Override
	public List<Integer> checkVoucher(String vouchername) {
		// TODO Auto-generated method stub
		return dao.findVouDataWithVoucherName(vouchername);
	}

	@Override
	public List<Voucher_Data> findAll() {
		return dao.findAll();
	}

	@Override
	public Voucher_Data findById(Integer vdata_id) {
		return dao.findById(vdata_id).get();
	}

	@Override
	public void delete(Integer vdata_id) {
		dao.deleteById(vdata_id);
		
	}

	@Override
	public Voucher_Data create(Voucher_Data voucher_data) {
		return dao.save(voucher_data);
	}

	@Override
	public Voucher_Data update(Voucher_Data voucher_data) {
		return dao.save(voucher_data);
	}

	@Override
	public List<Voucher_Data> findBySearch(String search) {
		// TODO Auto-generated method stub
		return dao.findBySearch(search);
	}

	@Override
	public List<Voucher_Data> findAll2() {
		// TODO Auto-generated method stub
		return dao.findAll2();
	}

	@Override
	public List<Voucher_Data> selectName(String name) {
		// TODO Auto-generated method stub
		return dao.selectNameByIdVoucher(name);
	}
	

	
}
