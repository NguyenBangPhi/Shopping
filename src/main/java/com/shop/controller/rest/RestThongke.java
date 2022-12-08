package com.shop.controller.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

import com.shop.entity.Users;
import com.shop.service.Order_DetailsService;
import com.shop.service.OrdersService;
import com.shop.service.ProductsService;
import com.shop.service.UsersService;

@CrossOrigin("*")
@RestController
@RequestMapping("rest/thongke")
public class RestThongke {
	@Autowired
	UsersService userdao;
	
	@Autowired
	OrdersService orderdao;
	
	@Autowired
	Order_DetailsService ordetaildao;
	
	@Autowired
	ProductsService prodao;
	
	@GetMapping("{ngay1}/{ngay2}")
	public Map<String,Object> showSummary(@PathVariable("ngay1") String ngay1, @PathVariable("ngay2") String ngay2){
		Map<String,Object> map = new HashMap<>();
		map.put("order7day", orderdao.get7day(ngay1,ngay2));
		map.put("ordetailtong7day", ordetaildao.gettongsp7ngay(ngay1,ngay2));
		map.put("ordetailslsp7day", ordetaildao.getsp7ngay(ngay1,ngay2));
		map.put("ordetailtong", ordetaildao.gettong7ngay(ngay1,ngay2));
		map.put("ordertopuser", orderdao.gettopuser(ngay1,ngay2));
		map.put("ordetailvoucher", ordetaildao.getodvoucher(ngay1,ngay2));
		return map;
	}
	
	@GetMapping("secondRow")
	public Map<String,List<Object[]>> showSecond(){
		Map<String,List<Object[]>> map = new HashMap<>();
		map.put("revenueLast7Days", orderdao.getRevenueLast7Days());
		map.put("productSoldByCate", prodao.numberOfProductSoldByType());
		return map;
	}
}
