/*
 * ***** BEGIN LICENSE BLOCK *****
 * Zimbra Collaboration Suite Web Client
 * Copyright (C) 2011, 2013, 2014, 2015, 2016 Synacor, Inc.
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
 * All portions of the code are Copyright (C) 2011, 2013, 2014, 2015, 2016 Synacor, Inc. All Rights Reserved.
 * ***** END LICENSE BLOCK *****
 */
/**
 * Created by IntelliJ IDEA.
 * User: mingzhang
 * Date: 10/11/11
 * Time: 3:42 AM
 * To change this template use File | Settings | File Templates.
 */

ZaSearchOptionDialog = function(parent, optionId, w, h, contextId) {
	if (arguments.length == 0) return;
	var clsName = "ZaSearchOptionDialog";
	if(!this._standardButtons)
		this._standardButtons = [DwtDialog.OK_BUTTON, DwtDialog.CANCEL_BUTTON];
	if(!this._extraButtons) {
		this._extraButtons = [];
	}

	this._contextId = contextId? contextId:ZaId.DLG_UNDEF;
    this._optionId = optionId;
	DwtDialog.call(this, {
		parent:parent,
		className:clsName,
		standardButtons:this._standardButtons,
		extraButtons:this._extraButtons,
        mode: DwtBaseDialog.MODELESS,
		id:ZaId.getDialogId(this._contextId)
	});

    this._controller = ZaApp.getInstance().getSearchBuilderController () ;
	this._app = ZaApp.getInstance();
	this._localXForm = null;
	this._localXModel = null;
	this._drawn = false;
	this._containedObject = null;

	this._pageDiv = document.createElement("div");
	this._pageDiv.className = "ZaXWizardDialogPageDiv";

	Dwt.setSize(this._pageDiv, w, h);
	this._pageDiv.style.overflow = "auto";
	this._pageDiv.style["overflow-y"] = "auto";
	this._pageDiv.style["overflow-x"] = "auto";

	this._createContentHtml();
    this.initForm(ZaSearchOption.getNewObjectTypeXModel(optionId), ZaSearchOption.getNewObjectTypeXForm (optionId), ZaSearchOption.getDefaultInstance(optionId));

	this._localXForm.addListener(DwtEvent.XFORMS_VALUE_CHANGED, new AjxListener(this, this._handleXFormChange));
	this._localXForm.addListener(DwtEvent.XFORMS_VALUE_ERROR, new AjxListener(this, this._handleXFormError));
}

ZaSearchOptionDialog.prototype = new ZaXDialog;
ZaSearchOptionDialog.prototype.constructor = ZaSearchOptionDialog;
ZaSearchOptionDialog.TEMPLATE = "admin.Widgets#ZaSeachOptionDialog";

ZaSearchOptionDialog.prototype._createHtmlFromTemplate =
function(templateId, data) {
	DwtDialog.prototype._createHtmlFromTemplate.call(this, ZaSearchOptionDialog.TEMPLATE, data);
};

ZaSearchOptionDialog.prototype.getMyXForm =
function(entry) {
}

ZaSearchOptionDialog.prototype._handleXFormChange = function (ev) {
	this._button[DwtDialog.OK_BUTTON].setEnabled(true);
};

ZaSearchOptionDialog.prototype._handleXFormError = function (ev) {
	this._button[DwtDialog.OK_BUTTON].setEnabled(false);
};