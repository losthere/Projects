package com.optum.gcm.model;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import com.optum.gcm.common.annotation.Column;

/**
 * @author sbarla11
 */

public class OptumQAInventory {

	
	@Column("GCM_CLIENT_CD")
	private String clientDesc;
	
	@Column("HP_CD")
	private String hpCD;

	@Column("GCM_HP_PRODUCT")
	private String hpProduct;

	public String getProvGrpNm() {
		return provGrpNm;
	}

	public void setProvGrpNm(String provGrpNm) {
		this.provGrpNm = provGrpNm;
	}

	public String getPageCount() {
		return pageCount;
	}

	public void setPageCount(String pageCount) {
		this.pageCount = pageCount;
	}

	public Long getChartScoreGrp() {
		return chartScoreGrp;
	}

	public void setChartScoreGrp(Long chartScoreGrp) {
		this.chartScoreGrp = chartScoreGrp;
	}

	@Column("GCM_PROGRAM_NAME")
	private String programName;
	
	@Column("PROV_GRP_NAME")
	private String provGrpNm;
	
	@Column("PAGE_COUNT")
	private String pageCount;

	@Column("CNT")
	private Long recCount;
	
	@Column("GCM_VENDOR_KEY")
	private Long vendorKey;
	
	@Column("CHART_SCORE_GROUP")
	private Long chartScoreGrp;


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

