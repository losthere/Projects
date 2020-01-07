package com.optum.gcm.common.dao;

import static org.junit.Assert.*;

import org.junit.Test;

import com.optum.gcm.model.Pagination;

public class PaginationQueryBuilderTest {

	

	@Test
	public void test() {
		Pagination pagetest= new Pagination();
		
		PaginationQueryBuilder tester= new PaginationQueryBuilder();
		String Org= tester.getPaginatedQuery("over",pagetest);
		String exp="over"; 
		assertEquals(exp,Org);
	}
	@Test
	public void test1() {
		Pagination pagetest= new Pagination();
		pagetest.setPageNo(30);
		pagetest.setPageSize(25);
		pagetest.setSortColumn("col");
		pagetest.setSortOrder("col1");
		PaginationQueryBuilder tester= new PaginationQueryBuilder();
		String Org= tester.getPaginatedQuery("over",pagetest);
		String exp="SELECT pg_t2.*  FROM (SELECT pg_t1.*, ROWNUM ROW_NUM  FROM (over ORDER BY col col1) pg_t1 WHERE ROWNUM <= 750) pg_t2 WHERE ROW_NUM BETWEEN 726 AND 750";
		assertEquals(exp,Org);
	}
	
	@Test
	public void test2() {
		Pagination pagetest= new Pagination();
		pagetest.setPageNo(30);
		pagetest.setPageSize(25);
		pagetest.setSortColumn("col");
		pagetest.setSortOrder("col1");
		PaginationQueryBuilder tester= new PaginationQueryBuilder();
		String Org= tester.getPaginatedQuery("over",pagetest);
		String exp="SELECT pg_t2.*  FROM (SELECT pg_t1.*, ROWNUM ROW_NUM  FROM (over ORDER BY col col1) pg_t1 WHERE ROWNUM <= 750) pg_t2 WHERE ROW_NUM BETWEEN 726 AND 750";
		assertEquals(exp,Org);
	
	}
	@Test
	public void test3() {
		Pagination pagetest= new Pagination();
		pagetest.setPageNo(0);
		pagetest.setPageSize(25);	
		PaginationQueryBuilder tester= new PaginationQueryBuilder();
		String Org= tester.getPaginatedQuery("over",pagetest);
		String exp="over";
		assertEquals(exp,Org);
	}
	@Test
	public void test4() {
		Pagination pagetest= new Pagination();
		pagetest.setPageNo(25);
		pagetest.setPageSize(0);	
		PaginationQueryBuilder tester= new PaginationQueryBuilder();
		String Org= tester.getPaginatedQuery("over",pagetest);
		String exp="over";
		assertEquals(exp,Org);
	}
	
	@Test
	public void test5() {
		Pagination pagetest= new Pagination();
		pagetest.setPageNo(25);
		pagetest.setPageSize(0);	
		PaginationQueryBuilder tester= new PaginationQueryBuilder();
		String Org= tester.getPaginatedQuery("over",null);
		String exp ="";
		assertEquals(exp,Org);
	}
}

