package com.optum.gcm.common.annotation;

import static org.apache.commons.lang3.StringUtils.isNotBlank;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.optum.gcm.common.util.AnnotationParserConstants;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface FilterMapping {
	public enum Operations {
		LIKE {
			public void buildQueryPart(StringBuilder where, FilterMapping column,
					String bindVar) {
				where.append(column.columnName());
				where.append(AnnotationParserConstants.SPACE);
				where.append(AnnotationParserConstants.LIKE);
				if(column.isUpperCaseValue()){
					where.append(AnnotationParserConstants.UPPER);
					where.append(AnnotationParserConstants.LEFT_PARENTHESIS);
					where.append(AnnotationParserConstants.TRIM);
					where.append(AnnotationParserConstants.LEFT_PARENTHESIS);
					where.append(AnnotationParserConstants.COLON);
					where.append(bindVar);
					where.append(AnnotationParserConstants.RIGHT_PARENTHESIS);
					where.append(AnnotationParserConstants.RIGHT_PARENTHESIS);
				}else{
					where.append(AnnotationParserConstants.TRIM);
					where.append(AnnotationParserConstants.LEFT_PARENTHESIS);
					where.append(AnnotationParserConstants.COLON);
					where.append(bindVar);
					where.append(AnnotationParserConstants.RIGHT_PARENTHESIS);
				}
				where.append(AnnotationParserConstants.PIPE).append(AnnotationParserConstants.PIPE).append(AnnotationParserConstants.SPACE);
				where.append(AnnotationParserConstants.SINGLE_QUOTE).append(AnnotationParserConstants.PERCENT).append(AnnotationParserConstants.SINGLE_QUOTE);
			}
		},
		EQUAL {
			public void buildQueryPart(StringBuilder where, FilterMapping column,
					String bindVar) {
				where.append(column.columnName());
				where.append(AnnotationParserConstants.EQUAL);
				if(column.isDerivedQuery()){
					where.append(AnnotationParserConstants.LEFT_PARENTHESIS);
					where.append(AnnotationParserConstants.DERIVED_QUERY);
					where.append(AnnotationParserConstants.RIGHT_PARENTHESIS);
				}else{
					if(isNotBlank(column.query())){
						where.append(AnnotationParserConstants.LEFT_PARENTHESIS);
						where.append(column.query());
						where.append(AnnotationParserConstants.RIGHT_PARENTHESIS);
					}else{
						if(isNotBlank(column.dateFormat())){
							where.append(AnnotationParserConstants.TO_DATE);
							where.append(AnnotationParserConstants.LEFT_PARENTHESIS);
							where.append(AnnotationParserConstants.COLON);
							where.append(bindVar);
							where.append(AnnotationParserConstants.COMMA);
							where.append(AnnotationParserConstants.SINGLE_QUOTE);
							where.append(column.dateFormat());
							where.append(AnnotationParserConstants.SINGLE_QUOTE);
							where.append(AnnotationParserConstants.RIGHT_PARENTHESIS);
						}else{
							if(isNotBlank(column.query())){
								where.append(column.query());
							}else{
								where.append(AnnotationParserConstants.COLON);
								where.append(bindVar);
							}
						}
					}
				}
			}
		},
		EXISTS {
			public void buildQueryPart(StringBuilder where, FilterMapping column,
					String bindVar) {
				where.append(Operations.EXISTS.name());
				where.append(AnnotationParserConstants.LEFT_PARENTHESIS);
				if(column.isDerivedQuery()){
					where.append(AnnotationParserConstants.DERIVED_QUERY);
				}else{
					where.append(column.query());
				}
				where.append(AnnotationParserConstants.RIGHT_PARENTHESIS);
			}
		},
		IN {
			public void buildQueryPart(StringBuilder where, FilterMapping column,
					String bindVar) {
				where.append(column.columnName());
				where.append(AnnotationParserConstants.SPACE);
				where.append(Operations.IN.name());
				where.append(AnnotationParserConstants.LEFT_PARENTHESIS);
				if(column.isDerivedQuery()){
					where.append(AnnotationParserConstants.DERIVED_QUERY);
				}else{
					if(isNotBlank(column.query())){
						where.append(column.query());
					}else{
						if(column.defalutValues().length > 0){
							where.append(AnnotationParserConstants.HASH);
							where.append(bindVar);
							where.append(AnnotationParserConstants.HASH);
						}else{
							where.append(AnnotationParserConstants.COLON);
							where.append(bindVar);
						}
					}
				}
				where.append(AnnotationParserConstants.RIGHT_PARENTHESIS);
			}
		},
		NOTIN {
			public void buildQueryPart(StringBuilder where, FilterMapping column,
					String bindVar) {
				where.append(column.columnName());
				where.append(AnnotationParserConstants.NOT_IN);
				where.append(AnnotationParserConstants.LEFT_PARENTHESIS);
				if(column.isDerivedQuery()){
					where.append(AnnotationParserConstants.DERIVED_QUERY);
				}else{
					if(isNotBlank(column.query())){
						where.append(column.query());
					}else{
						if(column.defalutValues().length > 0){
							where.append(AnnotationParserConstants.HASH);
							where.append(bindVar);
							where.append(AnnotationParserConstants.HASH);
						}else{
							where.append(AnnotationParserConstants.COLON);
							where.append(bindVar);
						}
					}
				}
				where.append(AnnotationParserConstants.RIGHT_PARENTHESIS);
			}
		};
		public abstract void buildQueryPart(StringBuilder where, FilterMapping column,
				String bindVar);
	}

	String columnName();

	Operations operation() default Operations.EQUAL;

	String query() default AnnotationParserConstants.EMPTY;

	boolean isUpperCaseValue() default true;

	String[] defalutValues() default {};

	Operations defaultOperation() default Operations.IN;

	String queryColumn() default AnnotationParserConstants.EMPTY;

	boolean isDerivedQuery() default false;
	
	String dateFormat() default AnnotationParserConstants.EMPTY;
}
