package com.shop.controller;

import java.text.DecimalFormat;
import java.util.Random;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.shop.entity.Users;
import com.shop.service.MailerService;
import com.shop.service.Product_BrandsService;
import com.shop.service.ProductsService;
import com.shop.service.UsersService;

@Controller
public class IndexController {
	
	@Autowired
	HttpServletRequest req;
	
	@Autowired
	HttpServletResponse res;
	
	@Autowired
	Product_BrandsService proBrandService;
	
	@Autowired
	ProductsService proService;
	
	@Autowired
	UsersService uSer;
	
	@Autowired
	MailerService mailer;
	
	String otp = "";
	Users entityTemp= null;
	
	@RequestMapping("/index")
	public String index(Model model) {
		//model.addAttribute("listDM", proBrandService.findAll());
		model.addAttribute("listSP", proService.findTop6PageIndex());
		return "layout/indexView";
	}
	
	@RequestMapping("/contact")
	public String contact(Model model) {
		//model.addAttribute("listDM", proBrandService.findAll());
		return "contact/contact";
	}
	
	@RequestMapping("/login")
	public String login(Model model) {
		//model.addAttribute("listDM", proBrandService.findAll());
		return "user/login";
	}
	
	@RequestMapping("/regis")
	public String regis(Model model) {
		return "user/regis";
	}
	
	@RequestMapping("/voucher")
	public String voucher(Model model) {
		return "voucher/voucher";
	}
	
	@RequestMapping("/user")
	public String userTemp(Model model) {
		if(req.getRemoteUser() != null) {
			Cookie cookie = new Cookie("user",req.getRemoteUser());
			cookie.setMaxAge(60 * 60 * 24); 
			res.addCookie(cookie);
		}
		return "user/user";
	}
	
	@RequestMapping("/xuhuong/{idbrand}")
	public String xuhuong(Model model, @PathVariable("idbrand") Integer id) {
		model.addAttribute("listBrand", proBrandService.findAll2());
		model.addAttribute("listTH", proService.findThinhHanh(id));
		return "layout/xuhuong";
	}
	
	@RequestMapping("/giovang")
	public String giovang(Model model) {
		model.addAttribute("listGV", proService.findGioVang());
		return "order/giovang";
	}
	
	@RequestMapping("/quenmatkhau")
	public String qmk(Model model ) {
		
		return "user/qmk";
	}
	
	@RequestMapping("/otpcheck")
	public String otp(Model model, @RequestParam("username") String username, @RequestParam("email") String email) {
		otp= new DecimalFormat("000000").format(new Random().nextInt(999999));
		Users en = uSer.findById(username);
		if(en == null) {
			model.addAttribute("mess", "Tài khoản không tồn tại !");
			otp = "";
			return "user/qmk";
		}else {
			if(email.equals(en.getUser_mail())) {
				entityTemp = en;
				mailer.queue(email, "POLY SHOP hỗ trợ", "Khách hàng: "+ en.getUser_fullname() + "\n - OTP của bạn là: " + otp);
				model.addAttribute("mess", "OTP đã gửi vào email của bạn !");
			}else {
				model.addAttribute("mess", "Email không khớp email đã đăng kí !");
				return "user/qmk";
			}
			
		}
		return "user/otpcheck";
	}
	
	@RequestMapping("/check") 
	public String check(Model model,@RequestParam("otp") String otpp) {
		if(otp.equals(otpp)) {
			return "user/dmk";
		}else {
			model.addAttribute("mess", "Sai OTP !");
			return "user/otpcheck";
		}
		
	}
	
	@RequestMapping("/doipass")
	public String doipass(Model model,@RequestParam("pass1") String pass1, @RequestParam("pass2") String pass2) {
		if(pass1.equals(pass2)) {
			entityTemp.setUser_password(pass1);
			uSer.create(entityTemp);
			model.addAttribute("mess", "Đã cập nhật lại mật khẩu !");
		}else {
			model.addAttribute("mess", "Mật khẩu nhập không trùng");
		}
		return "user/dmk";
	}
}
