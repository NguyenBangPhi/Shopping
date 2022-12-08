package com.shop.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;

@Data
@Entity
@Table(name = "Order_Details")
public class Order_Details {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer ordetail_id;
	Integer ordetail_quantity;
	Double ordetail_price;
	@Temporal(TemporalType.DATE)
	Date ordetail_createdate;
	String ordetail_status;
	Boolean ordetail_isdelete;
	
	@ManyToOne @JoinColumn(name = "ordetail_orderid")
	Order order;
	
	@ManyToOne @JoinColumn(name = "ordetail_productid")
	Product product_;
	
	@ManyToOne @JoinColumn(name = "ordetail_vouchername")
	Voucher voucher_;
}
