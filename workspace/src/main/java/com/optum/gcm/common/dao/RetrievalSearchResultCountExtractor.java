package com.optum.gcm.common.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;

import com.optum.gcm.model.RetrievalHpVendorStatusCount;

public class RetrievalSearchResultCountExtractor implements ResultSetExtractor<List<RetrievalHpVendorStatusCount>> {
	@Override
	public List<RetrievalHpVendorStatusCount> extractData(ResultSet rs) throws SQLException, DataAccessException {
		Map<String, RetrievalHpVendorStatusCount> hpVendorStatusCount = new HashMap<>();
		while (rs.next()) {
			String key = rs.getString("GCM_HP_KEY") + "|" + rs.getInt("GCM_VENDOR_KEY");
			RetrievalHpVendorStatusCount retrievalHpVendorStatusCount;
			if (!hpVendorStatusCount.containsKey(key)) {
				retrievalHpVendorStatusCount = new RetrievalHpVendorStatusCount();
				retrievalHpVendorStatusCount.setProjYear(rs.getInt("GCM_PROJECT_YEAR"));
				retrievalHpVendorStatusCount.setProgramKey(rs.getLong("GCM_PROGRAM_KEY"));
				retrievalHpVendorStatusCount.setProjKey(rs.getLong("GCM_PROJ_KEY"));
				retrievalHpVendorStatusCount.setHpKey(rs.getLong("GCM_HP_KEY"));
				retrievalHpVendorStatusCount.setHpCd(rs.getString("HP_CD"));
				retrievalHpVendorStatusCount.setClient(rs.getString("GCM_CLIENT_DESC"));
				retrievalHpVendorStatusCount.setVendorKey(rs.getLong("GCM_VENDOR_KEY"));
				retrievalHpVendorStatusCount.setVendor(rs.getString("VENDOR_NAME"));
				hpVendorStatusCount.put(key, retrievalHpVendorStatusCount);
			}
		}
		return new ArrayList<>(hpVendorStatusCount.values());
	}

}
