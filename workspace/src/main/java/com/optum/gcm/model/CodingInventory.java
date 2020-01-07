
package com.optum.gcm.model;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import com.optum.gcm.common.annotation.Column;

/**
 * @author sgangul1
 */

public class CodingInventory {

	@Column("GCM_PROGRAM_KEY")
	private Long programKey;

	@Column("GCM_CLIENT_KEY")
	private Long clientKey;

	@Column("GCM_HP_KEY")
	private Long hpKey;

	@Column("GCM_HP_PRODUCT")
	private String hpProduct;

	@Column("GCM_PROGRAM_NAME")
	private String programName;

	@Column("GCM_CLIENT_DESC")
	private String clientDesc;

	@Column("HP_DESC")
	private String hpDesc;

	@Column("GCM_HP_PRODUCT_DESC")
	private String hpProductDesc;
	
	@Column("GCM_CONT_BUS_FUNC_INSTRUCTION")
	private String codingInstruction;

	@Column("CNT")
	private Long recCount;
	
	@Column("PROV_GRP_NAME")
	private String provGrpNm;
	
	@Column("PAGE_COUNT")
	private Long pageCount;	
	
	@Column("CNT_TOTAL")
	private Long cntTotal;
	
	public String getProvGrpNm() {
		return provGrpNm;
	}

	public void setProvGrpNm(String provGrpNm) {
		this.provGrpNm = provGrpNm;
	}

	public Long getPageCount() {
		return pageCount;
	}

	public void setPageCount(Long pageCount) {
		this.pageCount = pageCount;
	}

	public Long getCntTotal() {
		return cntTotal;
	}

	public void setCntTotal(Long cntTotal) {
		this.cntTotal = cntTotal;
	}

	public Long getProgramKey() {
		return programKey;
	}

	public void setProgramKey(Long programKey) {
		this.programKey = programKey;
	}

	public Long getClientKey() {
		return clientKey;
	}

	public void setClientKey(Long clientKey) {
		this.clientKey = clientKey;
	}

	public Long getHpKey() {
		return hpKey;
	}

	public void setHpKey(Long hpKey) {
		this.hpKey = hpKey;
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

	public String getHpDesc() {
		return hpDesc;
	}

	public void setHpDesc(String hpDesc) {
		this.hpDesc = hpDesc;
	}

	public String getHpProductDesc() {
		return hpProductDesc;
	}

	public void setHpProductDesc(String hpProductDesc) {
		this.hpProductDesc = hpProductDesc;
	}

	public Long getRecCount() {
		return recCount;
	}

	public void setRecCount(Long recCount) {
		this.recCount = recCount;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
	}

}
