/*
 * ***** BEGIN LICENSE BLOCK *****
 * Zimbra Collaboration Suite Web Client
 * Copyright (C) 2007, 2010, 2014, 2016 Synacor, Inc.
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
 * All portions of the code are Copyright (C) 2007, 2010, 2014, 2016 Synacor, Inc. All Rights Reserved.
 * ***** END LICENSE BLOCK *****
 */
/**
 * Used to create an application tab and its operations, such as new a  tab, 
 * close a tab, edit the tab label.
 * 
 * It will also remember the state of the tab: hidden/shown and dirty/clean.
 * @param parent - the tab group containing all the tabs.
 * 
 * @param params :
 *  	closable - whether the close icon and action should be added
 * 		selected - whether the newly created tab should be selected 
 *		id - the tabId used to identify an unique tab.
 * 		toolTip - the tooltip of the tab
*/



ZaToolBarButton = function(params) {
        if (arguments.length == 0) return ;
        params = Dwt.getParams(arguments, ZaToolBarButton.PARAMS);
        params.className = params.className || "ZaToolBarButton";
        DwtButton.call(this, params);
}

ZaToolBarButton.PARAMS = ["parent", "style", "className", "posStyle", "actionTiming", "id", "index"];

ZaToolBarButton.prototype = new DwtButton;
ZaToolBarButton.prototype.constructor = DwtButton;


ZaToolBarButton.prototype._createHtml = function() {
    var templateId = "dwt.Widgets#ZToolbarButton";
    var data = { id: this._htmlElId };
    this._createHtmlFromTemplate(templateId, data);
};
