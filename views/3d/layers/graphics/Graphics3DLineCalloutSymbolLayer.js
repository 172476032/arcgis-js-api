// COPYRIGHT © 2018 Esri
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
// See http://js.arcgis.com/4.10/esri/copyright.txt for details.

define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../../Color","../../../../core/screenUtils","./ElevationAligners","./Graphics3DObject3DGraphicLayer","./Graphics3DSymbolCommonCode","./Graphics3DSymbolLayer","./graphicUtils","./symbolComplexity","../../webgl-engine/Stage","../../webgl-engine/lib/Geometry","../../webgl-engine/lib/GeometryData","../../webgl-engine/lib/Util","../../webgl-engine/materials/LineCalloutMaterial"],function(e,t,r,n,a,i,o,l,s,c,u,p,d,f,h,m){var v,y,g=h.VertexAttrConstants,O=function(e){function t(t,r){var n=e.call(this,t,null,r,!0)||this;return n._elevationOptions={supportsOffsetAdjustment:!0,supportsOnTheGround:!1},n}return r(t,e),t.prototype.destroy=function(){e.prototype.destroy.call(this),this.isFulfilled()||this.reject(),this._material&&(this._context.stage.remove(p.ModelContentType.MATERIAL,this._material.id),this._material=null)},t.prototype._prepareResources=function(){var e=this._getStageIdHint();this._createMaterialsAndAddToStage(this._context.stage,e),this.resolve()},t.prototype.perInstanceMaterialParameters=function(e){var t=this.materialParameters;return t.screenOffset=e.screenOffset||[0,0],t.centerOffsetUnits=e.centerOffsetUnits||"world",t},Object.defineProperty(t.prototype,"materialParameters",{get:function(){var e=this.symbolContainer,t=e.callout,r=n.toUnitRGBA(t.color);r[3]*=this._getLayerOpacity();var i=a.pt2px(t.size||0),o=null;if(e.verticalOffset){var l=e.verticalOffset,s=l.screenLength,c=l.minWorldLength,u=l.maxWorldLength;o={screenLength:a.pt2px(s),minWorldLength:c||0,maxWorldLength:null!=u?u:1/0}}var p=t.border&&t.border.color?n.toUnitRGBA(t.border.color):null,d=e.symbolLayers.getItemAt(0),f="object"===d.type,h="label-3d"===e.type,m=!f,v=f?0:void 0,y=h;return{color:r,size:i,verticalOffset:o,screenSizePerspective:this._context.screenSizePerspectiveEnabled?this._context.sharedResources.screenSizePerspectiveSettings:null,screenOffset:[0,0],centerOffsetUnits:"world",borderColor:p,occlusionTest:m,shaderPolygonOffset:v,depthHUDAlignStart:y,slicePlaneEnabled:this._context.slicePlaneEnabled}},enumerable:!0,configurable:!0}),t.prototype._createMaterialsAndAddToStage=function(e,t){this._material=new m(this.materialParameters,t+"_lineCallout_common"),e.add(p.ModelContentType.MATERIAL,this._material)},t.prototype._defaultElevationInfoNoZ=function(){return x},t.prototype.createGraphics3DGraphic=function(e){var t=e.renderingInfo,r=e.graphic;null!=t.needsOffsetAdjustment&&(this._elevationOptions.needsOffsetAdjustment=t.needsOffsetAdjustment);var n=this.getGraphicElevationContext(r,t.elevationOffset||0),a=t.symbol,i="on-the-ground"===this._elevationContext.mode&&!a.symbolLayers.some(function(e){return"object"===e.type||"text"===e.type});if("label-3d"!==a.type&&i)return null;var o=c.computeCentroid(r.geometry);if(null==o)return null;var l="graphic"+r.uid;return this._createAs3DShape(r,o,n,t,l,r.uid)},t.prototype.layerOpacityChanged=function(){return this._material.setParameterValues(this.materialParameters),!0},t.prototype.layerElevationInfoChanged=function(e,t,r){var n=this,a=this._elevationContext.mode;return(r===a||"on-the-ground"!==r&&"on-the-ground"!==a)&&(e.forEach(function(e){var r=t(e);r&&n.updateGraphicElevationContext(e.graphic,r)}),!0)},t.prototype.slicePlaneEnabledChanged=function(e,t){return this._material.setParameterValues({slicePlaneEnabled:this._context.slicePlaneEnabled}),!0},t.prototype.getGraphicElevationContext=function(t,r){void 0===r&&(r=0);var n=e.prototype.getGraphicElevationContext.call(this,t);return n.addOffsetRenderUnits(r),n},t.prototype.updateGraphicElevationContext=function(e,t){var r=this.getGraphicElevationContext(e,t.metadata.elevationOffset);t.elevationContext.set(r),t.needsElevationUpdates=l.needsElevationUpdates2D(r.mode)},t.prototype.computeComplexity=function(){return{primitivesPerFeature:2,primitivesPerCoordinate:0,memory:u.emptySymbolComplexity.memory}},t.prototype.createVertexData=function(e){var t,r=e.translation,n=e.centerOffset;if(!r&&!n)return b;var a=r?{size:3,data:[r[0],r[1],r[2]]}:b[g.POSITION],i=n?{size:4,data:[n[0],n[1],n[2],n[3]]}:b[g.AUXPOS1];return t={},t[g.POSITION]=a,t[g.NORMAL]=b[g.NORMAL],t[g.AUXPOS1]=i,t},t.prototype.getOrCreateMaterial=function(e,t){var r=this.perInstanceMaterialParameters(e),n=m.uniqueMaterialIdentifier(r);if(n===this._material.uniqueMaterialIdentifier)return{material:this._material,isUnique:!1};if(e.materialCollection){var a=e.materialCollection.getMaterial(n);return a||(a=new m(r,t+"_lineCallout_shared"),e.materialCollection.addMaterial(n,a)),{material:a,isUnique:!1}}var a=new m(r,t+"_lineCallout_unique");return{material:a,isUnique:!0}},t.prototype._createAs3DShape=function(e,t,r,n,a,s){var c=new f(this.createVertexData(n),C,f.DefaultOffsets,"point"),u=new d(c,a),p=[u],h=this.getOrCreateMaterial(n,a),m=l.createStageObjectForPoint(this._context,t,p,[h.material],null,null,r,a,this._context.layer.uid,s,!0);if(null===m)return null;var v=i.perObjectElevationAligner,y=new o(this,m.object,p,h.isUnique?[h.material]:null,null,v,r);return y.metadata={elevationOffset:n.elevationOffset||0},y.alignedTerrainElevation=m.terrainElevation,y.needsElevationUpdates=l.needsElevationUpdates2D(r.mode),l.extendPointGraphicElevationContext(y,t,this._context.elevationProvider),y},t}(s),b=(v={},v[g.POSITION]={size:3,data:[0,0,0]},v[g.NORMAL]={size:3,data:[0,0,1]},v[g.AUXPOS1]={size:4,data:[0,0,0,1]},v),_=new Uint32Array([0]),C=(y={},y[g.POSITION]=_,y[g.NORMAL]=_,y[g.AUXPOS1]=_,y),x={mode:"relative-to-ground",offset:0};return O});