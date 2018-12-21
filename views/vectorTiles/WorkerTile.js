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

define(["require","exports","../../core/executeAsync","../../core/ObjectPool","../../core/promiseUtils","../2d/tiling/enums","./BackgroundBucket","./CircleBucket","./FillBucket","./GeometryUtils","./IndexMemoryBuffer","./LineBucket","./Placement","./SymbolBucket","./TileParser","./VertexMemoryBuffer"],function(e,t,r,f,n,s,i,u,o,l,B,a,h,x,I,c){return function(){function e(){this.rotation=0,this.status=s.TileStatus.INITIALIZED,this._symbolBuckets=[],this.placementEngine=new h.PlacementEngine,this.fillVertexBuffer=new c.FillVertexBuffer(!1),this.fillDDVertexBuffer=new c.FillVertexBuffer(!0),this.fillIndexBuffer=new B.TriangleIndexBuffer,this.outlineVertexBuffer=new c.OutlineVertexBuffer(!1),this.outlineDDVertexBuffer=new c.OutlineVertexBuffer(!0),this.outlineIndexBuffer=new B.TriangleIndexBuffer,this.lineVertexBuffer=new c.LineVertexBuffer(!1),this.lineDDVertexBuffer=new c.LineVertexBuffer(!0),this.lineIndexBuffer=new B.TriangleIndexBuffer,this.iconVertexBuffer=new c.SymbolVertexBuffer(!1),this.iconDDVertexBuffer=new c.SymbolVertexBuffer(!0),this.iconIndexBuffer=new B.TriangleIndexBuffer,this.textVertexBuffer=new c.SymbolVertexBuffer(!1),this.textDDVertexBuffer=new c.SymbolVertexBuffer(!0),this.textIndexBuffer=new B.TriangleIndexBuffer,this.circleVertexBuffer=new c.CircleVertexBuffer,this.circleIndexBuffer=new B.TriangleIndexBuffer}return e.prototype.initialize=function(e,t,r,f){void 0===f&&(f=0),this.tileKey=e,this.refKey=t,this._workerTileHandler=r,this.rotation=f,this.placementEngine.setAngle(l.C_DEG_TO_RAD*f)},e.prototype.release=function(){this.tileKey=this.refKey="",this.status=s.TileStatus.INITIALIZED,this.rotation=0,this.resetData(),this._workerTileHandler=null},e.prototype.resetData=function(){this.fillVertexBuffer.reset(),this.fillDDVertexBuffer.reset(),this.fillIndexBuffer.reset(),this.outlineVertexBuffer.reset(),this.outlineDDVertexBuffer.reset(),this.outlineIndexBuffer.reset(),this.lineVertexBuffer.reset(),this.lineDDVertexBuffer.reset(),this.lineIndexBuffer.reset(),this.iconVertexBuffer.reset(),this.iconDDVertexBuffer.reset(),this.iconIndexBuffer.reset(),this.textVertexBuffer.reset(),this.textDDVertexBuffer.reset(),this.textIndexBuffer.reset(),this.circleVertexBuffer.reset(),this.circleIndexBuffer.reset(),this.placementEngine.reset(),this._symbolBuckets.length=0},e.prototype.reparse=function(e){return this.resetData(),this.setDataAndParse(this._protobuffArray,e)},e.prototype.setDataAndParse=function(e,t){var r=this,f=t&&t.signal;if(this._protobuffArray=e,f){var n=function(){f.removeEventListener("abort",n),r.status=s.TileStatus.INVALID};f.addEventListener("abort",n)}return this._parse(e,t).then(function(e){r.status=s.TileStatus.READY;for(var t=[1,r.fillVertexBuffer.sizeInBytes,2,r.fillDDVertexBuffer.sizeInBytes,3,r.fillIndexBuffer.sizeInBytes,4,r.outlineVertexBuffer.sizeInBytes,5,r.outlineDDVertexBuffer.sizeInBytes,6,r.outlineIndexBuffer.sizeInBytes,7,r.lineVertexBuffer.sizeInBytes,8,r.lineDDVertexBuffer.sizeInBytes,9,r.lineIndexBuffer.sizeInBytes,10,r.iconVertexBuffer.sizeInBytes,11,r.iconDDVertexBuffer.sizeInBytes,12,r.iconIndexBuffer.sizeInBytes,13,r.textVertexBuffer.sizeInBytes,14,r.textDDVertexBuffer.sizeInBytes,15,r.textIndexBuffer.sizeInBytes,16,r.circleVertexBuffer.sizeInBytes,17,r.circleIndexBuffer.sizeInBytes],f=new Uint32Array(t),n=[],l=e.length,B=0;B<l;B++){var h=e[B];if(h instanceof o)n.push(h.layerIndex),n.push(1),n.push(h.fillIndexStart),n.push(h.fillIndexCount),n.push(h.outlineIndexStart),n.push(h.outlineIndexCount);else if(h instanceof a)n.push(h.layerIndex),n.push(2),n.push(h.lineIndexStart),n.push(h.lineIndexCount);else if(h instanceof x){n.push(h.layerIndex),n.push(3),n.push(h.sdfMarker?1:0);var I=h.markerPageMap;n.push(I.size),I.forEach(function(e,t){n.push(t),n.push(e[0]),n.push(e[1])});var c=h.glyphsPageMap;n.push(c.size),c.forEach(function(e,t){n.push(t),n.push(e[0]),n.push(e[1])})}else h instanceof u?(n.push(h.layerIndex),n.push(4),n.push(h.circleIndexStart),n.push(h.circleIndexCount)):h instanceof i&&(n.push(h.layerIndex),n.push(0))}var p=new Uint32Array(n),y=r.fillVertexBuffer.toBuffer(),D=r.fillDDVertexBuffer.toBuffer(),d=r.fillIndexBuffer.toBuffer(),V=r.outlineVertexBuffer.toBuffer(),z=r.outlineDDVertexBuffer.toBuffer(),b=r.outlineIndexBuffer.toBuffer(),v=r.lineVertexBuffer.toBuffer(),g=r.lineDDVertexBuffer.toBuffer(),T=r.lineIndexBuffer.toBuffer(),w=r.iconVertexBuffer.toBuffer(),m=r.iconDDVertexBuffer.toBuffer(),k=r.iconIndexBuffer.toBuffer(),A=r.textVertexBuffer.toBuffer(),S=r.textDDVertexBuffer.toBuffer(),E=r.textIndexBuffer.toBuffer(),L=r.circleVertexBuffer.toBuffer(),_=r.circleIndexBuffer.toBuffer();return{result:{bufferDataInfo:f.buffer,bucketDataInfo:p.buffer,bufferData:[y,D,d,V,z,b,v,g,T,w,m,k,A,S,E,L,_]},transferList:[y,D,d,V,z,b,v,g,T,w,m,k,A,S,E,L,_,f.buffer,p.buffer]}})},e.prototype.addBucket=function(e){this._symbolBuckets.push(e)},e.prototype.updateSymbols=function(e){var t=this,f=this._symbolBuckets;if(!f||0===f.length)return n.resolve();this.rotation=e;var i=this.placementEngine;i.reset(),i.setAngle(e/256*360*l.C_DEG_TO_RAD);var u=this.iconVertexBuffer;u.reset();var o=this.iconDDVertexBuffer;o.reset();var B=this.iconIndexBuffer;B.reset();var a=this.textVertexBuffer;a.reset();var h=this.textDDVertexBuffer;h.reset();var x=this.textIndexBuffer;x.reset();var I=[],c=f.length,p=0;return r(function(){if(t.status===s.TileStatus.INVALID||t.status===s.TileStatus.INITIALIZED)return!0;if(p<c){var e=f[p++],r=e.layer,n=e.copy(r.hasDataDrivenIcon?o:u,B,r.hasDataDrivenText?h:a,x,i);n&&(I.push(n),n.updateSymbols())}return p>=c}).then(function(){if(t.status===s.TileStatus.INVALID||t.status===s.TileStatus.INITIALIZED||0===u.sizeInBytes&&0===o.sizeInBytes&&0===B.sizeInBytes&&0===a.sizeInBytes&&0===h.sizeInBytes&&0===x.sizeInBytes)return{result:null,transferList:null};var e=[10,u.sizeInBytes,11,o.sizeInBytes,12,B.sizeInBytes,13,a.sizeInBytes,14,h.sizeInBytes,15,x.sizeInBytes],r=new Uint32Array(e),f=[];c=I.length;for(var n=0;n<c;n++){var i=I[n];f.push(i.layerIndex),f.push(3),f.push(i.sdfMarker?1:0);var l=i.markerPageMap;f.push(l.size),l.forEach(function(e,t){f.push(t),f.push(e[0]),f.push(e[1])});var p=i.glyphsPageMap;f.push(p.size),p.forEach(function(e,t){f.push(t),f.push(e[0]),f.push(e[1])})}var y=new Uint32Array(f),D=u.toBuffer(),d=o.toBuffer(),V=B.toBuffer(),z=a.toBuffer(),b=h.toBuffer(),v=x.toBuffer();return{result:{bufferDataInfo:r.buffer,bucketDataInfo:y.buffer,bufferData:[D,d,V,z,b,v]},transferList:[D,d,V,z,b,v,r.buffer,y.buffer]}}).catch(function(){return null})},e.prototype.setObsolete=function(){this.status=s.TileStatus.INVALID},e.prototype.getLayers=function(){return this._workerTileHandler.getLayers()},e.prototype.getWorkerTileHandler=function(){return this._workerTileHandler},e.prototype._parse=function(e,t){if(!e||0===e.byteLength)return n.resolve([]);this.status=s.TileStatus.MODIFIED;var r=t.client;return new I(e,this,r).parse()},e.pool=new f(e),e}()});