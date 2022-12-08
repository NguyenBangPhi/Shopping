package com.shop.entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
@Entity
@Table(name = "Voucher")
public class Voucher {
	@Id
	String voucher_name;
	String voucher_desc;
	Boolean voucher_isdelete;
	
	@JsonIgnore
	@OneToMany(mappedBy = "voucher")
	List<Voucher_Data> voucher_datas;
	
	@JsonIgnore
	@OneToMany(mappedBy = "voucher_")
	List<Order_Details> vouchers;
}
