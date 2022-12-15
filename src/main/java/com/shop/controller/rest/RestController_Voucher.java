package com.shop.controller.rest;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.entity.Product;
import com.shop.entity.Voucher;
import com.shop.service.VouchersService;
import com.shop.service.Vouchers_DatasService;

@CrossOrigin("*")
@RestController
@RequestMapping("rest/voucher")
public class RestController_Voucher {
	
	@Autowired
	VouchersService dao;
	
	@Autowired
	Vouchers_DatasService vouDataSer;
	
	@GetMapping("{vouname}")
	public List<Object> checkVouExits(@PathVariable("vouname") String vouname) {
		List<Object> listReturn = new ArrayList<Object>();
		
		Voucher vou = dao.findById(vouname);
		if(vou == null) {
			listReturn.add("Không tìm thấy Voucher !");
			return listReturn;
		}
		List<Integer> list = vouDataSer.checkVoucher(vouname);
		if(list == null) {
			listReturn.add("Voucher của bạn đã hết hạn hoặc chưa được áp dụng cho bất kì sản phẩm nào !");
			return listReturn;
		}
		String phanTramGiam = vou.getVoucher_desc();
		
		listReturn.add(list);
		listReturn.add(phanTramGiam);		
		return listReturn;
	}
	
	
	@GetMapping
	public List<Voucher>getorder(){
		return dao.findAll2();
	}
	
	@GetMapping("search/{Search}")
	public List<Voucher> loadfullname(@PathVariable("Search") String Search) {
		return dao.findBySearch(Search);
	}
	
	@GetMapping("id/{voucher_id}")
	public Voucher loadid(@PathVariable("voucher_id") String voucher_id) {
		return dao.findById(voucher_id);
	}
	
	@DeleteMapping("{voucher_id}")
	public void delete(@PathVariable("voucher_id") String voucher_id) {
		dao.delete(voucher_id);
	}
	
	@PostMapping
	public Voucher create(@RequestBody Voucher voucher) {
		return dao.create(voucher);
	}
	
	@PutMapping("{voucher_id}")
	public Voucher update(@RequestBody Voucher voucher,@PathVariable("voucher_id")String voucher_id) {
		return dao.update(voucher);
	}
//	@GetMapping("/check/{vouname}")
//	public List<Product> checkVouProduct(@PathVariable("vouname") String vouname) {
//		
//	}
	
}
