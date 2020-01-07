package com.optum.gcm.common;

import static com.optum.gcm.common.util.LoggingUtil.logInfo;

import javax.xml.soap.MessageFactory;
import javax.xml.soap.MimeHeaders;
import javax.xml.soap.SOAPBody;
import javax.xml.soap.SOAPConnection;
import javax.xml.soap.SOAPConnectionFactory;
import javax.xml.soap.SOAPElement;
import javax.xml.soap.SOAPEnvelope;
import javax.xml.soap.SOAPException;
import javax.xml.soap.SOAPMessage;
import javax.xml.soap.SOAPPart;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public final class CreateUserinDocumentum {

	private CreateUserinDocumentum() {
	}

	private static final Logger LOG = LoggerFactory.getLogger(CreateUserinDocumentum.class);

	private static void createSoapEnvelope(SOAPMessage soapMessage, String userName, String groupName, String email, String userToken)
			throws SOAPException {
		SOAPPart soapPart = soapMessage.getSOAPPart();

		String myNamespace = "ser";
		String myNamespaceURI = "http://gcm.optum.com/imagerepo/services";

		// SOAP Envelope
		SOAPEnvelope envelope = soapPart.getEnvelope();
		envelope.addNamespaceDeclaration(myNamespace, myNamespaceURI);

		/*
		 * Constructed SOAP Request Message: <soapenv:Envelope
		 * xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
		 * xmlns:ser="http://gcm.optum.com/imagerepo/services"> <soapenv:Header/>
		 * <soapenv:Body> <ser:createCommSSOUser> <!--Optional:--> <gcmImageRepoUser>
		 * <ser:userDn>?</ser:userDn> <ser:userName>?</ser:userName> <!--Optional:-->
		 * <ser:displayName>?</ser:displayName> <ser:emailId>?</ser:emailId> <!--1 or
		 * more repetitions:--> <ser:groupName>?</ser:groupName> <!--Optional:-->
		 * <ser:description>?</ser:description> <ser:userStatus>?</ser:userStatus>
		 * <ser:clientCapabilities>?</ser:clientCapabilities> </gcmImageRepoUser>
		 * </ser:createCommSSOUser> </soapenv:Body> </soapenv:Envelope>
		 */
		// SOAP Body
		SOAPBody soapBody = envelope.getBody();
		SOAPElement serviceElem = soapBody.addChildElement("createCommSSOUser", myNamespace);
		SOAPElement gcmImgRepoElem = serviceElem.addChildElement("gcmImageRepoUser");
		SOAPElement userDnElem = gcmImgRepoElem.addChildElement("userDn", myNamespace);
		userDnElem.addTextNode("uid=" + userName + ",ou=People,dc=uhg,dc=com");
		SOAPElement userNameElem = gcmImgRepoElem.addChildElement("userName", myNamespace);
		userNameElem.addTextNode(userName);
		SOAPElement displayNameElem = gcmImgRepoElem.addChildElement("displayName", myNamespace);
		displayNameElem.addTextNode(userName);
		SOAPElement emailIdElem = gcmImgRepoElem.addChildElement("emailId", myNamespace);
		emailIdElem.addTextNode(email);
		SOAPElement groupNameElem = gcmImgRepoElem.addChildElement("groupName", myNamespace);
		groupNameElem.addTextNode(groupName);
		SOAPElement descriptionElem = gcmImgRepoElem.addChildElement("description", myNamespace);
		descriptionElem.addTextNode("Creating user in Documentum");
		SOAPElement userTokenElement = gcmImgRepoElem.addChildElement("userToken", myNamespace);
		userTokenElement.addTextNode(userToken);
		SOAPElement userStatusElem = gcmImgRepoElem.addChildElement("userStatus", myNamespace);
		userStatusElem.addTextNode("ACTIVE");
		SOAPElement clientCapabilitiesElem = gcmImgRepoElem.addChildElement("clientCapabilities", myNamespace);
		clientCapabilitiesElem.addTextNode("COORDINATOR");
		logInfo(LOG, true, "Message Evelope: {} ", envelope.toString());
		logInfo(LOG, true, "Message body: {}", soapBody.toString());

	}

	public static void callSoapWebService(String soapEndpointUrl, String soapAction, String userId, String password,
			String userIdVal, String passwordVal, String userName, String groupName, String email, String userToken) {
		try {
			// Create SOAP Connection
			SOAPConnectionFactory soapConnectionFactory = SOAPConnectionFactory.newInstance();
			SOAPConnection soapConnection = soapConnectionFactory.createConnection();

			// Send SOAP Message to SOAP Server
			soapConnection.call(
					createSOAPRequest(soapAction, userId, password, userIdVal, passwordVal, userName, groupName, email, userToken),
					soapEndpointUrl);

			soapConnection.close();
		} catch (UnsupportedOperationException | SOAPException e) {
			LOG.error(
					"Error occurred while sending SOAP Request to Server!Make sure you have the correct endpoint URL and SOAPAction!",
					e);
		}
	}

	private static SOAPMessage createSOAPRequest(String soapAction, String userId, String password, String userIdVal,
			String passwordVal, String userName, String groupName, String email, String userToken) throws SOAPException {
		MessageFactory messageFactory = MessageFactory.newInstance();
		SOAPMessage soapMessage = messageFactory.createMessage();

		createSoapEnvelope(soapMessage, userName, groupName, email, userToken);

		MimeHeaders headers = soapMessage.getMimeHeaders();
		headers.addHeader("SOAPAction", soapAction);
		headers.addHeader(userId, userIdVal);
		headers.addHeader(password, passwordVal);
		soapMessage.saveChanges();

		return soapMessage;
	}

}