/*
 * ***** BEGIN LICENSE BLOCK *****
 * Zimbra Collaboration Suite Web Client
 * Copyright (C) 2007, 2008, 2009, 2010, 2011, 2013, 2014, 2015, 2016 Synacor, Inc.
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
 * All portions of the code are Copyright (C) 2007, 2008, 2009, 2010, 2011, 2013, 2014, 2015, 2016 Synacor, Inc. All Rights Reserved.
 * ***** END LICENSE BLOCK *****
 */

/**
 * Creates a radio button.
 * @constructor
 * @class
 * This class implements a radio button.
 * 
 * @param {hash}	params	a hash of parameters
 * @param  {DwtComposite}     params.parent	the parent widget
 * @param  {constant}     params.style 	the text style. May be one of: {@link DwtCheckbox.TEXT_LEFT} or
 * 									{@link DwtCheckbox.TEXT_RIGHT} arithimatically or'd (|) with one of:
 * 									{@link DwtCheckbox.ALIGN_LEFT}, {@link DwtCheckbox.ALIGN_CENTER}, or
 * 									{@link DwtCheckbox.ALIGN_LEFT}.
 * 									The first determines were in the checkbox the text will appear
 * 									(if set), the second determine how the content of the text will be
 * 									aligned. The default value for this parameter is: 
 * 									{@link DwtCheckbox.TEXT_LEFT} | {@link DwtCheckbox.ALIGN_CENTER}
 * @param  {string}     params.name		the input control name (required for IE)
 * @param  {string}     params.value     the input control value.
 * @param  {boolean}     params.checked	the input control checked status (required for IE)
 * @param  {string}     params.className	the CSS class
 * @param  {constant}     params.posStyle	the positioning style (see {@link DwtControl})
 * @param  {string}     params.id		an explicit ID to use for the control's HTML element
 * @param  {number}     params.index 	the index at which to add this control among parent's children
 * 
 * @extends	DwtCheckbox
 */
DwtRadioButton = function(params) {
	if (arguments.length == 0) { return; }
	params = Dwt.getParams(arguments, DwtRadioButton.PARAMS);
	params.className = params.className || "DwtRadioButton";
	DwtCheckbox.call(this, params);
}

DwtRadioButton.PARAMS = DwtCheckbox.PARAMS;

DwtRadioButton.prototype = new DwtCheckbox;
DwtRadioButton.prototype.constructor = DwtRadioButton;

DwtRadioButton.prototype.isDwtRadioButton = true;
DwtRadioButton.prototype.isInputControl = true;
DwtRadioButton.prototype.toString = function() { return "DwtRadioButton"; };

//
// Data
//

DwtRadioButton.prototype.INPUT_TYPE = 'radio';
