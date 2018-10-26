/*
 * ***** BEGIN LICENSE BLOCK *****
 * Zimbra Collaboration Suite Web Client
 * Copyright (C) 2007, 2008, 2009, 2010, 2013, 2014, 2016 Synacor, Inc.
 *
 * The contents of this file are subject to the Common Public Attribution License Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at: https://www.zimbra.com/license
 * The License is based on the Mozilla Public License Version 1.1 but Sections 14 and 15
 * have been added to cover use of software over a computer network and provide for limited attribution
 * for the Original Developer. In addition, Exhibit A has been modified to be consistent with Exhibit B.
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied.
 * See the License for the specific language governing rights and limitations under the License.
 * The Original Code is Zimbra Open Source Web Client.
 * The Initial Developer of the Original Code is Zimbra, Inc.  All rights to the Original Code were
 * transferred by Zimbra, Inc. to Synacor, Inc. on September 14, 2015.
 *
 * All portions of the code are Copyright (C) 2007, 2008, 2009, 2010, 2013, 2014, 2016 Synacor, Inc. All Rights Reserved.
 * ***** END LICENSE BLOCK *****
 */

/**
* @class ZaProxyPortWarningXDialog
* @contructor ZaProxyPortWarningXDialog
* @author Greg Solovyev
* @param parent
* param app
**/
ZaProxyPortWarningXDialog = function(parent, w, h, title, instance) {
	if (arguments.length == 0) return;
	this._standardButtons = [DwtDialog.OK_BUTTON, DwtDialog.CANCEL_BUTTON];	
	ZaXDialog.call(this, parent,null, title, w, h);
	this._containedObject = instance ? instance :  {selectedChoice:0, choice1Label:"",choice2Label:"",choice3Label:"",warningMsg:""};
	var objModel = {
		items:[
			{id:"selectedChoice", type:_NUMBER_,defaultValue:0},
			{id:"choice1Label", type:_STRING_,defaultValue:ZaMsg.Server_WrongPortWarning_OP1},
			{id:"choice2Label", type:_STRING_,defaultValue:ZaMsg.Server_WrongPortWarning_OP2},
			{id:"choice3Label", type:_STRING_,defaultValue:ZaMsg.Server_WrongPortWarning_OP3},	
			{id:"warningMsg", type:_STRING_,defaultValue:ZaMsg.Server_WrongPortWarning}
		]
	}
	this.initForm(objModel,this.getMyXForm(),this._containedObject);
}

ZaProxyPortWarningXDialog.prototype = new ZaXDialog;
ZaProxyPortWarningXDialog.prototype.constructor = ZaProxyPortWarningXDialog;

ZaProxyPortWarningXDialog.prototype.getMyXForm = 
function() {	
	var xFormObject = {
		numCols:1,
		items:[
			{type:_ZAWIZGROUP_,numCols:2,colSizes:["100px","400px"],
				items:[
					{ type: _DWT_ALERT_,
					  containerCssStyle: "padding-bottom:0px",
					  style: DwtAlert.WARNING,
					  iconVisible: true, 
					  ref:"warningMsg",
					  forceUpdate: true
					},
					{type:_RADIO_LABEL_,forceUpdate: true, ref:"selectedChoice",labelRef:"choice1Label",label:"N/A",groupname:"proxyChoice", value:0},
					{type:_RADIO_LABEL_,forceUpdate: true, ref:"selectedChoice",labelRef:"choice2Label",label:"N/A",groupname:"proxyChoice", value:1},
					{type:_RADIO_LABEL_,forceUpdate: true, ref:"selectedChoice",labelRef:"choice3Label",label:"N/A",groupname:"proxyChoice", value:2}
				]
			}
		]
	};
	return xFormObject;
}
