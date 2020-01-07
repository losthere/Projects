package com.optum.gcm.sevice;

/**
 * @author pmule
*/

import static  com.optum.gcm.dao.constants.CacheableQueries.QUERY_GET_ALL_ACA_HHSMAPPINGS;
import static  com.optum.gcm.dao.constants.CacheableQueries.QUERY_GET_AGE_GENDER_VALIDATIONS;
import static  com.optum.gcm.dao.constants.CacheableQueries.QUERY_GET_ALL_ICDCODES_FOR_MCARE;
import static  com.optum.gcm.dao.constants.CacheableQueries.QUERY_GET_ALL_MCARE_HCCMAPPINGS;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.model.AgeGendorMapping;
import com.optum.gcm.model.HHSModelMapping;

@Service
public class CacheableService {

	private static final Logger LOG = LoggerFactory.getLogger(CacheableService.class);

	@Autowired
	private CommonJpaService commonJpaService;
	
	@Cacheable("getAllICDDXCodes")
	public Map<String, String>  getAllIcdDxCodes() {

		Map<String, Object> params = new HashMap<String, Object>();
		LOG.info(">>>>>>>>>>>>>>>> getICDDXCode called ");
		String queryString = QUERY_GET_ALL_ICDCODES_FOR_MCARE;
		return  commonJpaService.getResultMap(queryString, params,String.class, String.class);
	}

	@Cacheable("getAllHccMappingsforMCARE")
	public Map<String, String>  getAllHccMappingsforMCARE() {
		Map<String, Object> params = new HashMap<String, Object>();
		LOG.info(">>>>>>>>>>>>>>>> getHcc Mappings called ");
		String queryString = QUERY_GET_ALL_MCARE_HCCMAPPINGS;
		return  commonJpaService.getResultMap(queryString, params,String.class, String.class);
	}
	
	@Cacheable("getAllAgeGenderValidations")
	public Map<String, AgeGendorMapping>  getAllAgeGenderValidations() {
		Map<String, Object> params = new HashMap<String, Object>();
		LOG.info(" getHcc Age Gender Validations ");
		String queryString = QUERY_GET_AGE_GENDER_VALIDATIONS;
		return  commonJpaService.getResultMap(queryString, params,String.class, AgeGendorMapping.class);
	}
	
	@Cacheable("getAllHhsMappingsforACA")
	public Map<String, HHSModelMapping>  getAllHccMappingsforACA() {
		Map<String, Object> params = new HashMap<String, Object>();
		LOG.info(" getAllHccMappingsforACA ");
		String queryString = QUERY_GET_ALL_ACA_HHSMAPPINGS;
		return  commonJpaService.getResultMap(queryString, params,String.class, HHSModelMapping.class);
	}
}
