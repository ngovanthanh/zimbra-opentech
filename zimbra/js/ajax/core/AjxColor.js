/*
 * ***** BEGIN LICENSE BLOCK *****
 * Zimbra Collaboration Suite Web Client
 * Copyright (C) 2009, 2010, 2012, 2013, 2014, 2016 Synacor, Inc.
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
 * All portions of the code are Copyright (C) 2009, 2010, 2012, 2013, 2014, 2016 Synacor, Inc. All Rights Reserved.
 * ***** END LICENSE BLOCK *****
 */

/**
 * Creates a color object.
 * @class
 * This class represents a color and is useful for color operations inspired by the code in SkinResources.java.
 * 
 */
AjxColor = function(r, g, b) {
	if (arguments.length == 0) return;
	this.r = r;
	this.g = g;
	this.b = b;
};

/**
 * Returns a string representation of the object.
 * 
 * @return		{string}		a string representation of the object
 */
AjxColor.prototype.toString = function() {
	return AjxColor.color(this.r, this.g, this.b);
};

//
// Static functions
//

/**
 * Returns the RGB components (as an array) of the given color.
 *
 * @param {string}	color 	the color string defined as "#rrggbb"
 * @return	{array}		the color
 */
AjxColor.components = function(color) {
	var m = AjxColor.__RE.exec(color);
	return m ? [parseInt(m[1],16),parseInt(m[2],16),parseInt(m[3],16)] : null;
};

/**
 * Returns a color string of the form "#rrggbb" from the given color
 * components.
 *
 * @param {number}	r the Red component value between 0 and 255, inclusive
 * @param {number}	g the Green component value between 0 and 255, inclusive
 * @param {number}	b the Blue component value between 0 and 255, inclusive
 * @return	{string}	the color string
 */
AjxColor.color = function(r, g, b) {
	return [
		"#",
		AjxColor.__pad(Number(Math.round(r)).toString(16), 2),
		AjxColor.__pad(Number(Math.round(g)).toString(16), 2),
		AjxColor.__pad(Number(Math.round(b)).toString(16), 2)
	].join("");
};

/**
 * Returns a color string that is the inverse of the given color.
 *
 * @param color [string] Color value defined as "#rrggbb".
 */
//AjxColor.invert = function(color) {
//	var n = ~parseInt(color.substr(1),16) & 0x0FFFFFF;
//	return AjxColor.color((n >> 16) & 0x0FF, (n >> 8) & 0x0FF, n & 0x0FF);
//};

/**
 * Lightens the specified color by the given amount.
 *
 * @param {string}	color 	the color value defined as "#rrggbb"
 * @param {number}	delta the amount to change
 * @return	{string}	the color string
 */
AjxColor.lighten = function(color, delta) {
	var comps = AjxColor.components(color);
	return comps ? AjxColor.color(
		AjxColor.__lighten(comps[0],delta),
		AjxColor.__lighten(comps[1],delta),
		AjxColor.__lighten(comps[2],delta)
	) : "";
};

/**
 * Darkens the specified color by the given amount.
 *
 * @param {string}	color 	the color value defined as "#rrggbb"
 * @param {number}	delta the amount to change
 * @return	{string}	the color string
 */
AjxColor.darken = function(color, delta) {
	var comps = AjxColor.components(color);
	return comps ? AjxColor.color(
		AjxColor.__darken(comps[0],delta),
		AjxColor.__darken(comps[1],delta),
		AjxColor.__darken(comps[2],delta)
	) : "";
};

/**
 * Deepens the specified color. This operation is different than darken
 * because it retains the brightness of the color even when it gets
 * darker. Just making a color darker tends to result in a color that
 * is "muddy".
 * <p>
 * The color is deepened by first determining the largest individual
 * component value and then multiplying each component value by the ratio
 * of its value to the largest value. Then, optionally, each value is
 * multiplied by the adjustment value in order to deepen a little more
 * or a little less. Typical adjustment values are around 1 such as .9
 * or 1.1.
 *
 * @param {string}	color 	the color value defined as "#rrggbb"
 * @param {number}		[adjustment]	the multiplier adjustment
 * @return	{string}	the color string
 */
AjxColor.deepen = function(color, adjustment) {
	var comps = AjxColor.components(color);
	var index = 0;
	for (var i = 1; i < comps.length; i++) {
		if (comps[i] > comps[index]) {
			index = i;
		}
	}
	for (var i = 0; i < comps.length; i++) {
		var multiplier = comps[index] ? (comps[i] / comps[index]) : 1;
		comps[i] = Math.floor(comps[i] * multiplier * (adjustment || 1));
	}
	return AjxColor.color(comps[0],comps[1],comps[2]);
};

//
// Private
//

AjxColor.__RE = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/i;

AjxColor.__pad = function(value, width, prefix) {
	if (!prefix) prefix = "0";
	var s = String(value);
	for (var i = s.length; i < width; i++) {
		s = prefix + s;
	}
	return s;
};

AjxColor.__lighten = function(value, delta) {
	return Math.max(0, Math.min(255, value + (255-value)*delta));
};
AjxColor.__darken = function(value, delta) {
	return Math.max(0, Math.min(255, value + (1-value)*delta));
};
