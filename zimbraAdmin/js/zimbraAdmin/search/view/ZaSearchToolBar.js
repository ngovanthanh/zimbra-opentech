/*
 * ***** BEGIN LICENSE BLOCK *****
 * Zimbra Collaboration Suite Web Client
 * Copyright (C) 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2013, 2014, 2016 Synacor, Inc.
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
 * All portions of the code are Copyright (C) 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2013, 2014, 2016 Synacor, Inc. All Rights Reserved.
 * ***** END LICENSE BLOCK *****
 */

ZaSearchToolBar = function(parent, posStyle, id) {

	ZaToolBar.call(this, parent, null,null, posStyle, "SearchToolBar",id);
	this._app = ZaApp.getInstance();
	this._searchField = new ZaSearchField(this, "SearchTBSearchField", 48, null, id);
//	var h1 = this._searchField.getSize().y;
		
	//this.setSize(Dwt.DEFAULT, Math.max(this._searchField.getSize().y, this.computeHeight()));
}

ZaSearchToolBar.prototype = new ZaToolBar;
ZaSearchToolBar.prototype.constructor = ZaSearchToolBar;

ZaSearchToolBar.prototype.toString = 
function() {
	return "ZaSearchToolBar";
}

ZaSearchToolBar.prototype.addSelectionListener =
function(buttonId, listener) {
	// Don't allow listeners on the search by button since we only want listeners registered
	// on its menu items
	if (buttonId != ZaSearchToolBar.SEARCHFOR_BUTTON)
		ZaToolBar.prototype.addSelectionListener.call(this, buttonId, listener);
}


ZaSearchToolBar.prototype.getSearchField =
function() {
	return this._searchField;
}
