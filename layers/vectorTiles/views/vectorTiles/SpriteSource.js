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
// See http://js.arcgis.com/3.18/esri/copyright.txt for details.

define(["require","exports","../../core/tsSupport/extendsHelper","../../core/tsSupport/decorateHelper","dojo/Deferred","dojo/promise/all","../../request","../../identity/IdentityManager","../../core/promiseUtils"],function(t,e,i,a,n,o,r,s,h){var d=function(){function t(t,e){this.baseURL=t,this.devicePixelRatio=e,this._isRetina=!1,this._spritesData={},this.image=null,this.width=null,this.height=null,this.loadStatus="not-loaded"}return t.prototype.getSpritePosition=function(t){return this._spritesData[t]},t.prototype.load=function(){var t=this;return this.loadStatus="loading",this._loadSprites().then(function(){return t.loadStatus="loaded",t}).otherwise(function(e){return t.loadStatus="failed",h.reject(e)})},t.prototype._loadSprites=function(){var t=this;this._isRetina=this.devicePixelRatio>1.15?!0:!1;var e=this.baseURL,i=this._isRetina?"@2x":"",a=r(e+i+".json",{callbackParamName:"callback",responseType:"json"}).then(function(e){t._spritesData=e.data}),h=new n,d=new Image;d.crossOrigin="anonymous",d.onload=function(){d.onload=null,t.width=d.width,t.height=d.height;var e=document.createElement("canvas");e.width=d.width,e.height=d.height;var i=e.getContext("2d");i.drawImage(d,0,0,d.width,d.height);var a=i.getImageData(0,0,d.width,d.height);t.image=new Uint8Array(a.data),h.resolve()};var l=""+e+i+".png",u=s.findCredential(l);return u&&u.token&&(l+="?token="+u.token),d.src=l,o([a,h.promise])},t}();return d});