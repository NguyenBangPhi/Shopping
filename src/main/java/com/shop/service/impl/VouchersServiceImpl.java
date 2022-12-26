package com.shop.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.dao.VoucherDAO;
import com.shop.entity.Voucher;
import com.shop.service.VouchersService;

@Service
public class VouchersServiceImpl implements VouchersService{
	
	@Autowired
	VoucherDAO dao;
	
	@Override
	public List<Voucher> findAll() {
		return dao.findAll();
	}

	@Override
	public Voucher findById(String id) {
		// TODO Auto-generated method stub
		Voucher vou = null;
		try {
			vou = dao.findById(id).get();
		} catch (Exception e) {
			return null;
		}
		
		return vou;
	}

	@Override
	public void delete(String vdata_id) {
		dao.deleteById(vdata_id);
		
	}

	@Override
	public Voucher create(Voucher voucher) {
		return dao.save(voucher);
	}

	@Override
	public Voucher update(Voucher voucher) {
		return dao.save(voucher);
	}

	@Override
	public List<Voucher> findBySearch(String search) {
		// TODO Auto-generated method stub
		return dao.findBySearch(search);
	}

	@Override
	public List<Object[]> findAll2() {
		// TODO Auto-generated method stub
		return dao.findAll2();
	}

	@Override
	public List<Voucher> findAll3() {
		// TODO Auto-generated method stub
		return dao.findAll3();
	}
	
}
