package com.optum.gcm.wadl;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.mvc.condition.PatternsRequestCondition;
import org.springframework.web.servlet.mvc.condition.ProducesRequestCondition;
import org.springframework.web.servlet.mvc.condition.RequestMethodsRequestCondition;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

@RunWith(PowerMockRunner.class)
@PrepareForTest({RequestMappingInfo.class, PatternsRequestCondition.class, 
	RequestMethodsRequestCondition.class, ProducesRequestCondition.class})
public class WADLControllerV2Test {

	@InjectMocks
	private WADLControllerV2 wADLControllerV2;
	
	@Mock
	private RequestMappingHandlerMapping handlerMapping;
	
	@Mock
	private WebApplicationContext webApplicationContext;
	
	
	/*@Mock
	private RequestMappingHandlerMapping handlerMapping;
	
	@Mock
	private RequestMappingInfo requestMappingInfo;
	
	@Mock
	private HandlerMethod handlerMethod;*/

	/*@Mock
	HttpServletRequest request;*/

	/*@Test
	public void testGenerateWadl() {
		//HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
		Map<RequestMappingInfo, HandlerMethod> handlerMethods = new HashMap<RequestMappingInfo, HandlerMethod>();
		RequestMappingInfo requestMappingInfo = Mockito.mock(RequestMappingInfo.class);
		HandlerMethod handlerMethod = Mockito.mock(HandlerMethod.class);
		handlerMethods.put(requestMappingInfo, handlerMethod);
	//	Map.Entry<RequestMappingInfo, HandlerMethod> entrySet = new Map.Entry<RequestMappingInfo, HandlerMethod>() {
		//PowerMockito.when(handlerMapping.getHandlerMethods()).thenReturn(handlerMethods);
		PowerMockito.when(wADLControllerV2.generateWadl(request)).thenReturn(null);
		wADLControllerV2.generateWadl(request);
	}*/
	
	@Test
	public void testGenerateWadl() {
		Object obj = new Object();
		HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
		HandlerMethod handlerMethod = Mockito.mock(HandlerMethod.class);
		RequestMappingInfo requestMappingInfo = Mockito.mock(RequestMappingInfo.class);
		Map<RequestMappingInfo, HandlerMethod> handlerMethods = new HashMap<RequestMappingInfo, HandlerMethod>();
		handlerMethods.put(requestMappingInfo, handlerMethod);
		PowerMockito.when(handlerMapping.getHandlerMethods()).thenReturn(handlerMethods);
		PowerMockito.when(handlerMethod.getBean()).thenReturn(obj);
		PowerMockito.when(webApplicationContext.getBean(Mockito.anyString())).thenReturn(obj);
		wADLControllerV2.generateWadl(request);
	}
	
	@Test
	public void testGenerateWad() throws NoSuchMethodException, SecurityException {
		Object bean = new RestControllerTest();
		Set<RequestMethod> httpMethods = new HashSet<>();
		Set<String> patterns = new HashSet<>();
		patterns.add("test");
		HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
		HandlerMethod handlerMethod = Mockito.mock(HandlerMethod.class);
		RequestMappingInfo requestMappingInfo = Mockito.mock(RequestMappingInfo.class);
		Map<RequestMappingInfo, HandlerMethod> handlerMethods = new HashMap<RequestMappingInfo, HandlerMethod>();
		handlerMethods.put(requestMappingInfo, handlerMethod);
		PowerMockito.when(handlerMapping.getHandlerMethods()).thenReturn(handlerMethods);
		PowerMockito.when(handlerMethod.getBean()).thenReturn(bean);
		PowerMockito.when(webApplicationContext.getBean(Mockito.anyString())).thenReturn(bean);
		PatternsRequestCondition patternsRequestCondition = Mockito.mock(PatternsRequestCondition.class);
		RequestMethodsRequestCondition requestMethodsRequestCondition = Mockito.mock(RequestMethodsRequestCondition.class);
		PowerMockito.when(requestMappingInfo.getPatternsCondition()).thenReturn(patternsRequestCondition);
		PowerMockito.when(patternsRequestCondition.getPatterns()).thenReturn(patterns);
		PowerMockito.when(requestMappingInfo.getMethodsCondition()).thenReturn(requestMethodsRequestCondition);
		PowerMockito.when(requestMethodsRequestCondition.getMethods()).thenReturn(httpMethods);
		ProducesRequestCondition producesRequestCondition = Mockito.mock(ProducesRequestCondition.class);
		PowerMockito.when(requestMappingInfo.getProducesCondition()).thenReturn(producesRequestCondition);
		Method method = this.getClass().getMethod("testGenerateWad");
		PowerMockito.when(handlerMethod.getMethod()).thenReturn(method);
		wADLControllerV2.generateWadl(request);
	}
	
	@Test
	public void testGenerateWad3() throws NoSuchMethodException, SecurityException {
		Object bean = new RestControllerTest();
		Set<RequestMethod> httpMethods = new HashSet<>();
		Set<String> patterns = new HashSet<>();
		Set<MediaType> mediaTypes = new HashSet<>();
		mediaTypes.add(new MediaType("Test"));
		patterns.add("test");
		HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
		HandlerMethod handlerMethod = Mockito.mock(HandlerMethod.class);
		RequestMappingInfo requestMappingInfo = Mockito.mock(RequestMappingInfo.class);
		Map<RequestMappingInfo, HandlerMethod> handlerMethods = new HashMap<RequestMappingInfo, HandlerMethod>();
		handlerMethods.put(requestMappingInfo, handlerMethod);
		PowerMockito.when(handlerMapping.getHandlerMethods()).thenReturn(handlerMethods);
		PowerMockito.when(handlerMethod.getBean()).thenReturn(bean);
		PowerMockito.when(webApplicationContext.getBean(Mockito.anyString())).thenReturn(bean);
		PatternsRequestCondition patternsRequestCondition = Mockito.mock(PatternsRequestCondition.class);
		RequestMethodsRequestCondition requestMethodsRequestCondition = Mockito.mock(RequestMethodsRequestCondition.class);
		PowerMockito.when(requestMappingInfo.getPatternsCondition()).thenReturn(patternsRequestCondition);
		PowerMockito.when(patternsRequestCondition.getPatterns()).thenReturn(patterns);
		PowerMockito.when(requestMappingInfo.getMethodsCondition()).thenReturn(requestMethodsRequestCondition);
		PowerMockito.when(requestMethodsRequestCondition.getMethods()).thenReturn(httpMethods);
		ProducesRequestCondition producesRequestCondition = Mockito.mock(ProducesRequestCondition.class);
		PowerMockito.when(requestMappingInfo.getProducesCondition()).thenReturn(producesRequestCondition);
		Method method = bean.getClass().getMethod("testGet");
		PowerMockito.when(handlerMethod.getMethod()).thenReturn(method);
		PowerMockito.when(producesRequestCondition.getProducibleMediaTypes()).thenReturn(mediaTypes);
		wADLControllerV2.generateWadl(request);
	}
	
	@Test
	public void testGenerateWad2() throws NoSuchMethodException, SecurityException {
		Object bean = new RestControllerTest();
		Set<RequestMethod> httpMethods = new HashSet<>();
		Set<String> patterns = new HashSet<>();
		Set<MediaType> mediaTypes = new HashSet<>();
		mediaTypes.add(new MediaType("Test"));
		patterns.add("test");
		HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
		HandlerMethod handlerMethod = Mockito.mock(HandlerMethod.class);
		RequestMappingInfo requestMappingInfo = Mockito.mock(RequestMappingInfo.class);
		Map<RequestMappingInfo, HandlerMethod> handlerMethods = new HashMap<RequestMappingInfo, HandlerMethod>();
		handlerMethods.put(requestMappingInfo, handlerMethod);
		PowerMockito.when(handlerMapping.getHandlerMethods()).thenReturn(handlerMethods);
		PowerMockito.when(handlerMethod.getBean()).thenReturn(bean);
		PowerMockito.when(webApplicationContext.getBean(Mockito.anyString())).thenReturn(bean);
		PatternsRequestCondition patternsRequestCondition = Mockito.mock(PatternsRequestCondition.class);
		RequestMethodsRequestCondition requestMethodsRequestCondition = Mockito.mock(RequestMethodsRequestCondition.class);
		PowerMockito.when(requestMappingInfo.getPatternsCondition()).thenReturn(patternsRequestCondition);
		PowerMockito.when(patternsRequestCondition.getPatterns()).thenReturn(patterns);
		PowerMockito.when(requestMappingInfo.getMethodsCondition()).thenReturn(requestMethodsRequestCondition);
		PowerMockito.when(requestMethodsRequestCondition.getMethods()).thenReturn(httpMethods);
		ProducesRequestCondition producesRequestCondition = Mockito.mock(ProducesRequestCondition.class);
		PowerMockito.when(requestMappingInfo.getProducesCondition()).thenReturn(producesRequestCondition);
		Method method = bean.getClass().getMethod("badRequest");
		PowerMockito.when(handlerMethod.getMethod()).thenReturn(method);
		PowerMockito.when(producesRequestCondition.getProducibleMediaTypes()).thenReturn(mediaTypes);
		wADLControllerV2.generateWadl(request);
	}

}
