// COPYRIGHT © 2016 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.19/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/_base/lang","dojo/has","dstore/Memory","dstore/Trackable","dstore/Tree","../../kernel"],function(e,t,r,o,n,a,i){var c=e([o,n]),d={createHierarchicalStore:function(e){var t=this.createSyncStore(e,a);return t.getRootCollection=function(){return this.root.filter({parent:void 0})},t.getRootCollection()},createSyncStore:function(r,o){r=r||{},r.data&&(r=t.mixin({},r,{data:t.clone(r.data)}));var n=o?e([c,o]):c;return new n(r)}};return r("extend-esri")&&t.setObject("dijit.analysis.storeUtils",d,i),d});