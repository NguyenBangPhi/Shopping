package com.shop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.shop.service.MailerService;

@Controller
public class MailController {
	@Autowired
	MailerService mailer;
	
	//@ResponseBody
	@RequestMapping("/mailer/demo")
	public String demo(Model model,@RequestParam("name") String name, @RequestParam("email") String email, @RequestParam("message") String message) {
		mailer.queue(email, "POLY SHOP hỗ trợ", "Khách hàng: "+ name + "\n - Lời nhắn: " + message);
		model.addAttribute("mes", "Chúng tôi sẽ liên hệ với bạn sớm nhất có thể !");
		//return "Mail của bạn sẽ được gửi đi trong giây lát";
		return "contact/contact";
	}
}
