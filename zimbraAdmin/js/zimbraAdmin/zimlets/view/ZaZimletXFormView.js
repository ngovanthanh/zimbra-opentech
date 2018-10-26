/*
 * ***** BEGIN LICENSE BLOCK *****
 * Zimbra Collaboration Suite Web Client
 * Copyright (C) 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2016 Synacor, Inc.
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
 * All portions of the code are Copyright (C) 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2016 Synacor, Inc. All Rights Reserved.
 * ***** END LICENSE BLOCK *****
 */

/**
* This class describes a view of a single Zimlet
* @class ZaZimletXFormView
* @contructor
* @param parent {DwtComposite}
* @param app {ZaApp}
* @author Greg Solovyev
**/
ZaZimletXFormView = function(parent) {
	ZaTabView.call(this, {
		parent:parent,
		iKeyName:"ZaZimletXFormView",
		contextId:ZaId.TAB_ZIM_EDIT
	});	
	this.TAB_INDEX = 0;	
	this.initForm(ZaZimlet.myXModel,this.getMyXForm());
}

ZaZimletXFormView.prototype = new ZaTabView();
ZaZimletXFormView.prototype.constructor = ZaZimletXFormView;
ZaTabView.XFormModifiers["ZaZimletXFormView"] = new Array();

/**
* Sets the object contained in the view
* @param entry - {ZaZimlet} object to display
**/
ZaZimletXFormView.prototype.setObject =
function(entry) {
	this._containedObject = new Object();
	this._containedObject.attrs = new Object();

	for (var a in entry.attrs) {
		if(entry.attrs[a] instanceof Array) {
			this._containedObject.attrs[a] = new Array();
			for(var aa in entry.attrs[a]) {
				this._containedObject.attrs[a][aa] = entry.attrs[a][aa];
			}
		} else {
			this._containedObject.attrs[a] = entry.attrs[a];
		}
	}
	this._containedObject.name = entry.name;
	this._containedObject.type = entry.type ;
	if(entry.id)
		this._containedObject.id = entry.id;

    if(!entry[ZaModel.currentTab])
        this._containedObject[ZaModel.currentTab] = "1";
    else
        this._containedObject[ZaModel.currentTab] = entry[ZaModel.currentTab];

    this._localXForm.setInstance(this._containedObject) ;

}

ZaZimletXFormView.myXFormModifier = function(xFormObject) {
    this.tabChoices = [] ;
    var cases = [] ;
    xFormObject.tableCssStyle="width:100%;";
	xFormObject.items = [
			{type:_GROUP_, cssClass:"ZmSelectedHeaderBg", colSpan: "*", id:"xform_header",
				items: [
					{type:_GROUP_,	numCols:4,colSizes:["90px","350px","100px","200px"],
                        items:[
                            {type:_OUTPUT_, ref:"name", label:ZaMsg.NAD_zimletName},
                            {type:_OUTPUT_, ref:ZaZimlet.A_zimbraZimletEnabled, label:ZaMsg.NAD_zimletStatus,choices:ZaModel.BOOLEAN_CHOICES },
                            {type:_OUTPUT_, ref:ZaZimlet.A_zimbraZimletDescription, label:ZaMsg.NAD_Description, colSpan: "*",
				getDisplayValue:function(itemVal){
				   var name = this.getInstanceValue(ZaZimlet.A_name);				
				   var ret = ZaZimletListView.__processMessage(name, itemVal);
				   return ret;	
				}
			    },
							{type:_OUTPUT_, ref:ZaItem.A_zimbraCreateTimestamp, 
								label:ZaMsg.LBL_zimbraCreateTimestamp, labelLocation:_LEFT_,
								getDisplayValue:function() {
										var val = ZaItem.formatServerTime(this.getInstanceValue());
									if(!val)
										return ZaMsg.Server_Time_NA;
									else
										return val;
								},
								visibilityChecks:[ZaItem.hasReadPermission]	
							}                            
                        ]
                    }
				],
				cssStyle:"padding-top:5px; padding-bottom:5px"
			},
			{type:_TAB_BAR_,  ref:ZaModel.currentTab,choices:this.tabChoices,cssClass:"ZaTabBar", cssStyle:"display:none;", id:"xform_tabbar"},
			{type:_SWITCH_, align:_LEFT_, valign:_TOP_, items:cases}
	];

};
ZaTabView.XFormModifiers["ZaZimletXFormView"].push(ZaZimletXFormView.myXFormModifier);

ZaZimletXFormView.prototype.getTabChoices = function() {
    return this.tabChoices;
}
