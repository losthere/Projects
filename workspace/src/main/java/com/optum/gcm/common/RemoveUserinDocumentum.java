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

public final class RemoveUserinDocumentum {

	private RemoveUserinDocumentum() {
	}

	private static final Logger LOG = LoggerFactory.getLogger(RemoveUserinDocumentum.class);

	private static void createSoapEnvelope(SOAPMessage soapMessage, String userName, String groupName)
			throws SOAPException {
		SOAPPart soapPart = soapMessage.getSOAPPart();

		String myNamespace = "ser";
		String myNamespaceURI = "http://gcm.optum.com/imagerepo/services";

		// SOAP Envelope
		SOAPEnvelope envelope = soapPart.getEnvelope();
		envelope.addNamespaceDeclaration(myNamespace, myNamespaceURI);

		SOAPBody soapBody = envelope.getBody();
		SOAPElement serviceElem = soapBody.addChildElement("removeUserFromCommGroup", myNamespace);
		// SOAPElement gcmImgRepoElem = serviceElem.addChildElement("gcmImageRepoUser");
		SOAPElement userDnElem = serviceElem.addChildElement("userDn");

		userDnElem.addTextNode("uid=" + userName + ",ou=People,dc=uhg,dc=com");

		SOAPElement groupNameElem = serviceElem.addChildElement("groupname");
		groupNameElem.addTextNode(groupName);
		logInfo(LOG, true, "Envelop : {}", envelope.toString());
		logInfo(LOG, true, "Soap body : {}", soapBody.toString());
	}

	public static void callSoapWebService(String soapEndpointUrl, String soapAction, String userId, String password,
			String userIdVal, String passwordVal, String userName, String groupName) {
		try {
			// Create SOAP Connection
			SOAPConnectionFactory soapConnectionFactory = SOAPConnectionFactory.newInstance();
			SOAPConnection soapConnection = soapConnectionFactory.createConnection();

			// Send SOAP Message to SOAP Server
			soapConnection.call(
					createSOAPRequest(soapAction, userId, password, userIdVal, passwordVal, userName, groupName),
					soapEndpointUrl);

			soapConnection.close();
		} catch (UnsupportedOperationException | SOAPException e) {
			LOG.error(
					"Error occurred while sending SOAP Request to Server! Make sure you have the correct endpoint URL and SOAPAction!",
					e);
		}
	}

	private static SOAPMessage createSOAPRequest(String soapAction, String userId, String password, String userIdVal,
			String passwordVal, String userName, String groupName) throws SOAPException {
		MessageFactory messageFactory = MessageFactory.newInstance();
		SOAPMessage soapMessage = messageFactory.createMessage();

		createSoapEnvelope(soapMessage, userName, groupName);

		MimeHeaders headers = soapMessage.getMimeHeaders();
		headers.addHeader("SOAPAction", soapAction);
		headers.addHeader(userId, userIdVal);
		headers.addHeader(password, passwordVal);
		soapMessage.saveChanges();

		return soapMessage;
	}

}
