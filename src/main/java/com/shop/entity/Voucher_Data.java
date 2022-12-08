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
@Table(name = "Voucher_Data")
public class Voucher_Data {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer vdata_id;
	@Temporal(TemporalType.DATE)
	Date voucher_createdate = new Date();
	Boolean voucher_isdelete;
	
	@ManyToOne @JoinColumn(name = "product_id")
	Product product;
	
	@ManyToOne @JoinColumn(name = "voucher_name")
	Voucher voucher;
}
