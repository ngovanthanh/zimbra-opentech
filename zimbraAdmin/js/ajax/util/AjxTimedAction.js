/*
 * ***** BEGIN LICENSE BLOCK *****
 * Zimbra Collaboration Suite Web Client
 * Copyright (C) 2005, 2006, 2007, 2008, 2009, 2010, 2013, 2014, 2016 Synacor, Inc.
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
 * All portions of the code are Copyright (C) 2005, 2006, 2007, 2008, 2009, 2010, 2013, 2014, 2016 Synacor, Inc. All Rights Reserved.
 * ***** END LICENSE BLOCK *****
 */

/**
 * 
 * @private
 */
AjxTimedAction = function(obj, func, args) {
	AjxCallback.call(this, obj, func, args);
	this._tid = -1;
	this._id = -1;
    this._runResult = null;
}
AjxTimedAction.prototype = new AjxCallback();
AjxTimedAction.prototype.constructor = AjxTimedAction;

// Setting a timeout of 25 days or more appears to revert it
// to 0 in FF3 and Safari3. There's really no reason to set
// it to anything above a few days, so set a max of 20 days.
AjxTimedAction.MAX_TIMEOUT = 20 * 24 * 60 * 60 * 1000;

AjxTimedAction.prototype.toString = 
function() {
	return "AjxTimedAction";
};

AjxTimedAction.prototype.getRunResult =
function() {
    return this._runResult;
};

AjxTimedAction._pendingActions = {};
AjxTimedAction._nextActionId = 1;

AjxTimedAction.scheduleAction =
function(action, timeout){
	if (!action) { return; }
	// if tid already exists, cancel previous timeout before setting a new one
	if (action._tid && action._tid != -1) {
		AjxTimedAction.cancelAction(action._id);
	}

	timeout = timeout || 0; // make sure timeout is numeric
	if (timeout > AjxTimedAction.MAX_TIMEOUT) {
		if (window.DBG) {
			DBG.println(AjxDebug.DBG1, "timeout value above maximum: " + timeout);
		}
		timeout = AjxTimedAction.MAX_TIMEOUT;
	}
	var id = action._id = AjxTimedAction._nextActionId++;
	AjxTimedAction._pendingActions[id] = action;
	var actionStr = "AjxTimedAction._exec(" + id + ")";
	action._tid = window.setTimeout(actionStr, timeout);
	return action._id;
};

AjxTimedAction.cancelAction =
function(actionId) {
	var action = AjxTimedAction._pendingActions[actionId];
	if (action) {
		window.clearTimeout(action._tid);
		delete AjxTimedAction._pendingActions[actionId];
		delete action._tid;
	}
};

AjxTimedAction._exec =
function(actionId) {

	try {

	var action = AjxTimedAction._pendingActions[actionId];
	if (action) {
		delete AjxTimedAction._pendingActions[actionId];
		delete action._tid;
	    action._runResult = action.run();
	}

	} catch (ex) {
		AjxException.reportScriptError(ex);
	}
};

