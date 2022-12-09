package com.shop.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
@Entity
@Table(name = "[Order]")
public class Order {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer order_id;
	String order_address;
	@Temporal(TemporalType.DATE)
	Date order_createdate = new Date();
	Boolean order_isdelete;
	String order_status;
	String order_fullname;
	String order_email;
	String order_phone;
	
	@ManyToOne @JoinColumn(name = "order_usernameid")
	Users user;
	
	@JsonIgnore
	@OneToMany(mappedBy = "order")
	List<Order_Details> order_details;	
}
