package com.shop.controller.rest;

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

import com.shop.entity.Voucher_Data;
import com.shop.service.Vouchers_DatasService;

@CrossOrigin("*")
@RestController
@RequestMapping("rest/voucher_data")
public class RestController_VourcherData {
	@Autowired
	Vouchers_DatasService dao;
	
	@GetMapping
	public List<Voucher_Data>getorder(){
		return dao.findAll2();
	}
	
	@GetMapping("search/{Search}")
	public List<Voucher_Data> loadfullname(@PathVariable("Search") String Search) {
		return dao.findBySearch(Search);
	}
	
	@GetMapping("{vdata_id}")
	public Voucher_Data loadid(@PathVariable("vdata_id") Integer vdata_id) {
		return dao.findById(vdata_id);
	}
	
	@DeleteMapping("{vdata_id}")
	public void delete(@PathVariable("vdata_id") Integer vdata_id) {
		dao.delete(vdata_id);
	}
	
	@PostMapping
	public Voucher_Data create(@RequestBody Voucher_Data voucher_datas) {
		return dao.create(voucher_datas);
	}
	
	@PutMapping("{vdata_id}")
	public Voucher_Data update(@RequestBody Voucher_Data voucher_datas,@PathVariable("vdata_id")Integer vdata_id) {
		return dao.update(voucher_datas);
	}
	
	@GetMapping("/name/{nameid}")
	public List<Voucher_Data> getName(@PathVariable("nameid") String nameid) {
		return dao.selectName(nameid);
	}
}
