package com.shop.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.shop.entity.Order;
import com.shop.entity.Order_Details;
import com.shop.entity.Users;
import com.shop.service.Order_DetailsService;
import com.shop.service.OrdersService;
import com.shop.service.UsersService;

@Controller
public class OrderController {
	
	@Autowired
	OrdersService orderService;
	
	@Autowired
	Order_DetailsService orderDetailService;
	
	@Autowired 
	UsersService userService;
	
	@Autowired
	HttpServletRequest req;
	
	@RequestMapping("/order/list")
	public String orderList(Model model) {
		Users u = userService.findById(req.getRemoteUser());
		model.addAttribute("userLogin",u);
		return "order/order";
	}
	
	@RequestMapping("/order/detail/{id}")
	public String orderDetails(Model model, @PathVariable("id") Integer id) {
		model.addAttribute("order",orderService.findById(id));
		//System.out.println(orderService.findById(id).getOrder_address());
		return "order/details";
	}
	
	@RequestMapping("/order/show")
	public String orderShow(Model model) {
		Users u = userService.findById(req.getRemoteUser());
		List<Object[]> listOrder = orderService.getAllOrderByUsername(u.getUser_username());
		model.addAttribute("listOrder", listOrder);
		return "order/showOrder";
	}
	
	@RequestMapping("/order/show/{id}")
	public String orderShow2(Model model, @PathVariable("id") Integer id) {
		List<Order_Details> or = orderDetailService.getOrderByOrderId(id);
		model.addAttribute("listOrderDetail", or);
		return "order/showOrderDetail";
	}
	
	@RequestMapping("/checkOr")
	public String checkOr(Model model) {
		return "order/check";
	}
	
}
