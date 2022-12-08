package com.shop.entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
@Entity
@Table(name = "[User]")
public class Users {
	@Id
	String user_username;
	String user_fullname;
	String user_password;
	String user_img;
	String user_mail;
	String user_phone;
	Boolean user_isdelete;
	
	@ManyToOne @JoinColumn(name = "user_roleid")
	Role role;
	
	@JsonIgnore
	@OneToMany(mappedBy = "user")
	List<Order> orders;
}
