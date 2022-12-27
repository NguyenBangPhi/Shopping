package com.shop.controller.rest;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.entity.Mail;
import com.shop.service.MailerService;

@CrossOrigin("*")
@RestController
@RequestMapping("rest/mail")
public class RestController_Mail {
	@Autowired
	MailerService mailer;
	
	@PostMapping("")
	public List<Object> sendMail(@RequestBody Mail obj) {
		mailer.queue(obj.getMail(), "POLY SHOP hỗ trợ", "Khách hàng: "+ obj.getName() + "\n - Mã đơn hàng gửi bạn là: " + obj.getId_order() + "\n - Vui lòng giữ lại mã này để tra cứu !");
		List<Object> a = new ArrayList<Object>();
		a.add("Thành công !");
		return a;
	}
}
