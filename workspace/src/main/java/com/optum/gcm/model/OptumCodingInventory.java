package com.optum.gcm.model;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import com.optum.gcm.common.annotation.Column;

/**
 * @author sbarla11
 */

public class OptumCodingInventory {

	
	@Column("GCM_CLIENT_CD")
	private String clientDesc;
	
	@Column("HP_CD")
	private String hpCD;

	@Column("GCM_HP_PRODUCT")
	private String hpProduct;

	@Column("GCM_PROGRAM_NAME")
	private String programName;
	
	@Column("GCM_CONT_BUS_FUNC_INSTRUCTION")
	private String codingInstruction;

	@Column("CNT")
	private Long recCount;
	
	@Column("GCM_VENDOR_KEY")
	private Long vendorKey;
	


	public String getHpCD() {
		return hpCD;
	}

	public void setHpCD(String hpCD) {
		this.hpCD = hpCD;
	}

	public String getHpProduct() {
		return hpProduct;
	}

	public void setHpProduct(String hpProduct) {
		this.hpProduct = hpProduct;
	}

	public String getCodingInstruction() {
		return codingInstruction;
	}

	public void setCodingInstruction(String codingInstruction) {
		this.codingInstruction = codingInstruction;
	}

	public String getProgramName() {
		return programName;
	}

	public void setProgramName(String programName) {
		this.programName = programName;
	}

	public String getClientDesc() {
		return clientDesc;
	}

	public void setClientDesc(String clientDesc) {
		this.clientDesc = clientDesc;
	}

	public Long getRecCount() {
		return recCount;
	}

	public void setRecCount(Long recCount) {
		this.recCount = recCount;
	}

	public Long getVendorKey() {
		return vendorKey;
	}

	public void setVendorKey(Long vendorKey) {
		this.vendorKey = vendorKey;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
	}

}
