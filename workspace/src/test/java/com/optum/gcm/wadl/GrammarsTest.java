package com.optum.gcm.wadl;

import java.lang.reflect.Field;
import java.util.List;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class GrammarsTest {

	protected Grammars grammars = new Grammars();

	protected List<Doc> doc;
	protected List<Include> include;
	protected List<Object> any;

	@Test
	public void testGetDoc() throws Exception {

		doc = grammars.getDoc();
		Assert.assertEquals(grammars.getDoc(), grammars.doc);
		doc = null;
		Assert.assertTrue(grammars.getDoc() instanceof List);
		grammars.getDoc();
	}

	@Test
	public void testGetInclude() throws Exception {
		include = grammars.getInclude();
		Assert.assertEquals(grammars.getInclude(), grammars.include);
		include = null;
		Assert.assertTrue(grammars.getInclude() instanceof List);
		grammars.getInclude();
	}

	@Test
	public void testGetAny() throws Exception {
		any = grammars.getAny();
		Assert.assertEquals(grammars.getAny(), grammars.any);
		any = null;
		Assert.assertTrue(grammars.getAny() instanceof List);
		grammars.getAny();
	}

}
