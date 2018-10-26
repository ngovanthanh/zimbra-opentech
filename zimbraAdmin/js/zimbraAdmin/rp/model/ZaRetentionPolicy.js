/*
 * ***** BEGIN LICENSE BLOCK *****
 * Zimbra Collaboration Suite Web Client
 * Copyright (C) 2012, 2013, 2014, 2016 Synacor, Inc.
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
 * All portions of the code are Copyright (C) 2012, 2013, 2014, 2016 Synacor, Inc. All Rights Reserved.
 * ***** END LICENSE BLOCK *****
 */

/**
 * @author Dongwei Feng
 **/
ZaRetentionPolicy =
function(name, id, lifetime, type) {
    this.id = id;
    this.name = name;

    if (!lifetime) {
        this.lifetime = "1d";
    } else {
        var number = lifetime.substr(0, lifetime.length - 1);
        if (number % ZaRetentionPolicy.YEAR == 0) {
            this.lifetime = (number / ZaRetentionPolicy.YEAR) + "y";
        } else if (number % ZaRetentionPolicy.MONTH == 0) {
            this.lifetime = (number / ZaRetentionPolicy.MONTH) + "m";
        } else if (number % ZaRetentionPolicy.WEEK == 0) {
            this.lifetime = (number / ZaRetentionPolicy.WEEK) + "w";
        } else {
            this.lifetime = lifetime;
        }
    }
    this.type = type ? type: ZaRetentionPolicy.TYPE_KEEP;
}

ZaRetentionPolicy.prototype = new ZaItem;
ZaRetentionPolicy.prototype.constructor = ZaRetentionPolicy;

ZaRetentionPolicy.POLICY_CUSTOM = "custom";

ZaRetentionPolicy.prototype.toString =
function() {
    return this.name;
}

ZaRetentionPolicy.prototype.toDays = function () {
    var number = this.lifetime.substr(0, this.lifetime.length - 1);
    var unit = this.lifetime.substr(this.lifetime.length - 1, 1);
    if (unit == "y") {
        return number * ZaRetentionPolicy.YEAR + "d";
    }
    if (unit == "m") {
        return number * ZaRetentionPolicy.MONTH + "d";
    }
    if (unit == "w") {
        return number * ZaRetentionPolicy.WEEK + "d";
    }
    return this.lifetime;
}

ZaRetentionPolicy.YEAR = 366;
ZaRetentionPolicy.MONTH = 31;
ZaRetentionPolicy.WEEK = 7;

ZaRetentionPolicy.TYPE_KEEP = "keep";
ZaRetentionPolicy.TYPE_PURGE = "purge";

ZaRetentionPolicy.A2_name = "name";
ZaRetentionPolicy.A2_id = "id";
ZaRetentionPolicy.A2_lifetime = "lifetime";
ZaRetentionPolicy.A2_type = "type";

ZaRetentionPolicy.myXModel = {
    items:[
        {id:ZaRetentionPolicy.A2_id, type:_STRING_, ref:ZaRetentionPolicy.A2_id},
        {id:ZaRetentionPolicy.A2_name, type:_STRING_, ref:ZaRetentionPolicy.A2_name, required:true},
        {id:ZaRetentionPolicy.A2_lifetime, type:_MLIFETIME_, ref:ZaRetentionPolicy.A2_lifetime, minInclusive: 1},
        {id:ZaRetentionPolicy.A2_type, type:_STRING_, ref:ZaRetentionPolicy.A2_type}
    ]
}

ZaRetentionPolicy.getRetentionPolicies =
function(by, val) {
    var soapDoc = AjxSoapDoc.create("GetSystemRetentionPolicyRequest", "urn:zimbraAdmin", null);

    if (by && val) {
        var el = soapDoc.set("cos", val);
        el.setAttribute("by", by);
    }

    var params = new Object();
    params.soapDoc = soapDoc;
    try{
        var reqMgrParams = {
            controller : ZaApp.getInstance().getCurrentController(),
            busyMsg : ZaMsg.BUSY_GET_RETENTION_POLICIES
        };

        var result = {};
        result[ZaRetentionPolicy.TYPE_KEEP] = [];
        result[ZaRetentionPolicy.TYPE_PURGE] = [];

        var resp = ZaRequestMgr.invoke(params, reqMgrParams).Body.GetSystemRetentionPolicyResponse;
        if(resp.retentionPolicy && resp.retentionPolicy.length == 1) {
            var policies = resp.retentionPolicy[0];

            var keeps = policies.keep[0].policy;
            var purges = policies.purge[0].policy;
            if (keeps) {
                for (var i = 0; i < keeps.length; i++) {
                    if (keeps[i].id) {
                        var pk = new ZaRetentionPolicy(keeps[i].name, keeps[i].id, keeps[i].lifetime, ZaRetentionPolicy.TYPE_KEEP);
                        result[ZaRetentionPolicy.TYPE_KEEP].push(pk);
                    }
                }
            }

            if (purges) {
                for (var j = 0; j < purges.length; j++) {
                    if (purges[j].id) {
                        var pp = new ZaRetentionPolicy(purges[j].name, purges[j].id, purges[j].lifetime, ZaRetentionPolicy.TYPE_PURGE);
                        result[ZaRetentionPolicy.TYPE_PURGE].push(pp);
                    }
                }
            }

        }
        return result;

    } catch(ex) {
        throw ex;
        return null;
    }
}

ZaRetentionPolicy.prototype.createPolicy =
function(by, val) {
    var soapDoc = AjxSoapDoc.create("CreateSystemRetentionPolicyRequest","urn:zimbraAdmin", null);
    if (by && val) {
        var el = soapDoc.set("cos", val);
        el.setAttribute("by", by);
    }

    if (this[ZaRetentionPolicy.A2_type] !== ZaRetentionPolicy.TYPE_KEEP &&
        this[ZaRetentionPolicy.A2_type] !== ZaRetentionPolicy.TYPE_PURGE){
         return;
    }
    var wrapper = soapDoc.set(this[ZaRetentionPolicy.A2_type], null);
    var policy = soapDoc.set("policy", null, wrapper, "urn:zimbraMail");
    policy.setAttribute("name", this[ZaRetentionPolicy.A2_name]);
    policy.setAttribute("lifetime", this.toDays());

    var params = new Object();
    params.soapDoc = soapDoc;

    try{
        var reqMgrParams = {
            controller : ZaApp.getInstance().getCurrentController(),
            busyMsg : ZaMsg.BUSY_CREATE_RETENTION_POLICIES
        };

        var resp = ZaRequestMgr.invoke(params, reqMgrParams).Body.CreateSystemRetentionPolicyResponse;
        if( resp.policy && resp.policy[0]) {
            this.id = resp.policy[0].id;
        }
        return this;
    } catch(ex) {
        throw ex;
        return null;
    }
}

ZaRetentionPolicy.checkLifeTime = function (lifetime) {
    if (!lifetime || lifetime.length < 1) {
        return false;
    }
    var digit = lifetime.substr(0, lifetime.length - 1);
    if (!digit) {
        return false;
    }

    return AjxUtil.isPositiveInt(digit);
}

ZaRetentionPolicy.checkValues = function (tmpObj, list) {
    if (!tmpObj) {
        return false;
    }

    var name = AjxStringUtil.trim(tmpObj[ZaRetentionPolicy.A2_name]);
    if (AjxUtil.isEmpty(name)) {
        ZaApp.getInstance().getCurrentController().popupErrorDialog(ZaMsg.ERROR_EmptyRPName) ;
        return false;
    }

    if (ZaRetentionPolicy.POLICY_CUSTOM == name.toLowerCase()) {
        ZaApp.getInstance().getCurrentController().popupErrorDialog(AjxMessageFormat.format(ZaMsg.ERROR_RPNameCustomDisallowed, [name])) ;
        return false;
    }

    if (!ZaRetentionPolicy.checkLifeTime(tmpObj[ZaRetentionPolicy.A2_lifetime])) {
        ZaApp.getInstance().getCurrentController().popupErrorDialog(ZaMsg.ERROR_InvalidRPLifetime);
        return false;
    }

    if (list && AjxUtil.isArray(list)) {
        for (var i = 0; i < list.length; i++) {
            if (list[i][ZaRetentionPolicy.A2_name] == tmpObj[ZaRetentionPolicy.A2_name] &&
                list[i] != tmpObj) {
                ZaApp.getInstance().getCurrentController().popupErrorDialog(AjxMessageFormat.format(ZaMsg.ERROR_RPExists, [tmpObj[ZaRetentionPolicy.A2_name]])) ;
                return false;
            }
        }
    }
    return true;
}

ZaRetentionPolicy.prototype.modifyPolicy =
function(by, val) {
    var soapDoc = AjxSoapDoc.create("ModifySystemRetentionPolicyRequest", "urn:zimbraAdmin", null);
    if (by && val) {
        var el = soapDoc.set("cos", val);
        el.setAttribute("by", by);
    }

    var policy = soapDoc.set("policy", null, null, "urn:zimbraMail");
    policy.setAttribute("name", this[ZaRetentionPolicy.A2_name]);
    policy.setAttribute("id", this[ZaRetentionPolicy.A2_id]);
    policy.setAttribute("lifetime", this.toDays());
    policy.setAttribute("type", "system");

    var params = new Object();
    params.soapDoc = soapDoc;
    params.skipAuthCheck = false;

    try{
        var reqMgrParams = {
            controller : ZaApp.getInstance().getCurrentController(),
            busyMsg : ZaMsg.BUSY_MODIFY_RETENTION_POLICIES
        };

        ZaRequestMgr.invoke(params, reqMgrParams).Body.ModifySystemRetentionPolicyResponse;

    } catch(ex) {
        throw ex;
        return null;
    }
}


ZaRetentionPolicy.prototype.deletePolicy =
function(by, val) {
    var soapDoc = AjxSoapDoc.create("DeleteSystemRetentionPolicyRequest", "urn:zimbraAdmin", null);
    if (by && val) {
        var el = soapDoc.set("cos", val);
        el.setAttribute("by", by);
    }

    var policy = soapDoc.set("policy", null, null, "urn:zimbraMail");
    policy.setAttribute("id", this.id);

    var params = new Object();
    params.soapDoc = soapDoc;
    params.skipAuthCheck = false;

    try{
        var reqMgrParams = {
            controller : ZaApp.getInstance().getCurrentController(),
            busyMsg : ZaMsg.BUSY_DELETE_RETENTION_POLICIES
        };

        var resp = ZaRequestMgr.invoke(params, reqMgrParams).Body.DeleteSystemRetentionPolicyResponse;

    } catch(ex) {
        throw ex;
        return null;
    }
}