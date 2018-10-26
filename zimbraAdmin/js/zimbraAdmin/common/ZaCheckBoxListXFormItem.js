/*
 * ***** BEGIN LICENSE BLOCK *****
 * Zimbra Collaboration Suite Web Client
 * Copyright (C) 2010, 2014, 2016 Synacor, Inc.
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
 * All portions of the code are Copyright (C) 2010, 2014, 2016 Synacor, Inc. All Rights Reserved.
 * ***** END LICENSE BLOCK *****
 */

/**
*	_ZA_CHECKBOX_LIST_ form item type
**/
ZaCheckBox_List_XFormItem = function () {}
XFormItemFactory.createItemType("_ZA_CHECKBOX_LIST_", "za_checkbox_list", ZaCheckBox_List_XFormItem, Composite_XFormItem);
ZaCheckBox_List_XFormItem.prototype.numCols=2;
ZaCheckBox_List_XFormItem.prototype.colSizes=["275px","275px"];
ZaCheckBox_List_XFormItem.prototype.nowrap = false;
ZaCheckBox_List_XFormItem.prototype.labelWrap = true;
ZaCheckBox_List_XFormItem.prototype.items = [];
ZaCheckBox_List_XFormItem.prototype.labelWidth = "275px";
ZaCheckBox_List_XFormItem.prototype.choicesWidth = "275px";

ZaCheckBox_List_XFormItem.prototype.initializeItems = function() {
	var selectRef = this.getInheritedProperty("selectRef");
	var choices = this.getInheritedProperty("choices");	
	var selectLabel = this.getInheritedProperty("selectLabel");
    var choicesWidth = AjxEnv.isIE? "275px": (this.getInheritedProperty ("choicesWidth") || "275px") ;
    
    var selectChck = {
		type:_OSELECT_CHECK_,
		choices:choices,
		colSpan:3,
		ref:selectRef,
		label:selectLabel,
		labelLocation:_TOP_,
		width:choicesWidth,
		bmolsnr:true,
		cssStyle:"margin-bottom:5px;margin-top:5px;border:2px inset gray;"				
	};
	
	var selectChckGrp = {
		type:_GROUP_,
		numCols:3,
		colSizes:["130px","15px","130px"],
		items:[
			selectChck,
			{type:_DWT_BUTTON_,label:ZaMsg.SelectAll,width:"120px",
				onActivate:function (ev) {
					var lstElement = this.getParentItem().items[0];
					if(lstElement) {
						lstElement.selectAll(ev);
					}
				}
			},
			{type:_CELLSPACER_,width:"15px"},
			{type:_DWT_BUTTON_,label:ZaMsg.DeselectAll,width:"120px",
				onActivate:function (ev) {
					var lstElement = this.getParentItem().items[0];
					if(lstElement) {
						lstElement.deselectAll(ev);
					}
				}
			}
		]
		
	}
		
	this.items = [{type:_CELLSPACER_,width:this.labelWidth},selectChckGrp];
	
	
	Composite_XFormItem.prototype.initializeItems.call(this);
}
