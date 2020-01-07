package com.optum.gcm.model;

import java.sql.Timestamp;
import java.util.Date;

import com.optum.gcm.common.annotation.Column;

public class ImageAttributes {

	@Column("IMG_FILE_KEY")
	private Long imageFileKey;
	
	@Column("GCM_PROJ_CONTENT_BARCODE")
	private String barcode;
	
	@Column("MBR_FIRST_NAME")
	private String mbrFirstName;
	
	@Column("MBR_LAST_NAME")
	private String mbrLastName;
	
	@Column("GLB_MBR_ID")
	private String glbMbrId;
	
	@Column("MBR_DOB")
	private Date mbrDob;
	
	@Column("PROV_GRP_ID")
	private String provGrpId;
	
	@Column("SOURCE_SYSTEM_PROV_ID")
	private String sourceSysProvId;
	
	@Column("PROV_LAST_NAME")
	private String provLastName;
	
	@Column("PROV_FIRST_NAME")
	private String provFirstName;
	
	@Column("HP_CD")
	private String hpCd;
	
	@Column("GCM_HP_PRODUCT")
	private String hpProduct;
	
	@Column("GCM_PROGRAM_NAME")
	private String progName;
	
	@Column("VENDOR_CODE")
	private String vendorCode;
	
	@Column("GCM_BUSINESS_SEGMENT")
	private String busSegment;
	
	@Column("GCM_CLIENT_CD")
	private String clientCd;
	
	@Column("FILE_NAME")
	private String fileName;
	
	@Column("GCM_GROUP_KEY")
	private Long groupKey;
	
	@Column("GCM_PROJECT_YEAR")
	private Integer projectYear;
	
	  @Column("MBR_EXT_ID")
	  private String mbrHic;
	  
	  @Column("GCM_PROVIDER_KEY")
	  private String providerKey;

	public String getBarcode() {
		return barcode;
	}

	public void setBarcode(String barcode) {
		this.barcode = barcode;
	}

	public String getMbrFirstName() {
		return mbrFirstName;
	}

	public void setMbrFirstName(String mbrFirstName) {
		this.mbrFirstName = mbrFirstName;
	}

	public String getMbrLastName() {
		return mbrLastName;
	}

	public void setMbrLastName(String mbrLastName) {
		this.mbrLastName = mbrLastName;
	}

	public Date getMbrDob() {
		return mbrDob != null ? (Date)mbrDob.clone() : null;
	}

	public void setMbrDob(Date mbrDob) {
		this.mbrDob = (mbrDob != null) ? (Date) mbrDob.clone() : null;
	}

	public String getGlbMbrId() {
		return glbMbrId;
	}

	public void setGlbMbrId(String glbMbrId) {
		this.glbMbrId = glbMbrId;
	}

	public String getProvGrpId() {
		return provGrpId;
	}

	public void setProvGrpId(String provGrpId) {
		this.provGrpId = provGrpId;
	}

	public String getSourceSysProvId() {
		return sourceSysProvId;
	}

	public void setSourceSysProvId(String sourceSysProvId) {
		this.sourceSysProvId = sourceSysProvId;
	}

	public String getProvLastName() {
		return provLastName;
	}

	public void setProvLastName(String provLastName) {
		this.provLastName = provLastName;
	}

	public String getProvFirstName() {
		return provFirstName;
	}

	public void setProvFirstName(String provFirstName) {
		this.provFirstName = provFirstName;
	}

	public String getHpCd() {
		return hpCd;
	}

	public void setHpCd(String hpCd) {
		this.hpCd = hpCd;
	}

	public String getHpProduct() {
		return hpProduct;
	}

	public void setHpProduct(String hpProduct) {
		this.hpProduct = hpProduct;
	}

	public String getProgName() {
		return progName;
	}

	public void setProgName(String progName) {
		this.progName = progName;
	}

	public String getVendorCode() {
		return vendorCode;
	}

	public void setVendorCode(String vendorCode) {
		this.vendorCode = vendorCode;
	}

	public String getBusSegment() {
		return busSegment;
	}

	public void setBusSegment(String busSegment) {
		this.busSegment = busSegment;
	}

	public String getClientCd() {
		return clientCd;
	}

	public void setClientCd(String clientCd) {
		this.clientCd = clientCd;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public Long getImageFileKey() {
		return imageFileKey;
	}

	public void setImageFileKey(Long imageFileKey) {
		this.imageFileKey = imageFileKey;
	}

	public Long getGroupKey() {
		return groupKey;
	}

	public void setGroupKey(Long groupKey) {
		this.groupKey = groupKey;
	}

	public Integer getProjectYear() {
		return projectYear;
	}

	public void setProjectYear(Integer projectYear) {
		this.projectYear = projectYear;
	}

	public String getMbrHic() {
		return mbrHic;
	}

	public void setMbrHic(String mbrHic) {
		this.mbrHic = mbrHic;
	}

	public String getProviderKey() {
		return providerKey;
	}

	public void setProviderKey(String providerKey) {
		this.providerKey = providerKey;
	}

}