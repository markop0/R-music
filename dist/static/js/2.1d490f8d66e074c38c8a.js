webpackJsonp([2],{"3fs2":function(t,r,n){var e=n("RY/4"),i=n("dSzd")("iterator"),a=n("/bQp");t.exports=n("FeBl").getIteratorMethod=function(t){if(void 0!=t)return t[i]||t["@@iterator"]||a[e(t)]}},BO1k:function(t,r,n){t.exports={default:n("fxRn"),__esModule:!0}},F2ZH:function(t,r){},"L+ij":function(t,r,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var e=n("BO1k"),i=n.n(e),a={mounted:function(){this.getData()},data:function(){return{PHBarr:[3,0,1,2,6],arr0:[]}},methods:{getData:function(){var t=this,r=!0,n=!1,e=void 0;try{for(var a,o=i()(t.PHBarr);!(r=(a=o.next()).done);r=!0){var u=a.value;this.$axios.get("/top/list?idx="+u).then(function(r){var n=r.data.playlist;t.arr0.push(n)})}}catch(t){n=!0,e=t}finally{try{!r&&o.return&&o.return()}finally{if(n)throw e}}},goSongList:function(t){this.$router.push({path:"/home2/paihang",query:{PHindex:t}})}}},o={render:function(){var t=this,r=t.$createElement,n=t._self._c||r;return n("div",{},[n("div",{staticClass:"m-body"},[n("div",t._l(t.arr0,function(r,e){return n("div",{key:e,staticClass:"cellLeaderboard",on:{click:function(r){return t.goSongList(e)}}},[n("img",{attrs:{src:r.coverImgUrl,alt:""}}),t._v(" "),n("div",{staticClass:"leaderboardInfo"},t._l(r.tracks.slice(0,3),function(r,e){return n("div",{key:e},[t._v(t._s(e+1)+"."+t._s(r.name))])}),0)])}),0),t._v(" "),n("router-view",{attrs:{id:"paihang"}})],1)])},staticRenderFns:[]};var u=n("VU/8")(a,o,!1,function(t){n("F2ZH")},"data-v-e49ac520",null);r.default=u.exports},"RY/4":function(t,r,n){var e=n("R9M2"),i=n("dSzd")("toStringTag"),a="Arguments"==e(function(){return arguments}());t.exports=function(t){var r,n,o;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=function(t,r){try{return t[r]}catch(t){}}(r=Object(t),i))?n:a?e(r):"Object"==(o=e(r))&&"function"==typeof r.callee?"Arguments":o}},fxRn:function(t,r,n){n("+tPU"),n("zQR9"),t.exports=n("g8Ux")},g8Ux:function(t,r,n){var e=n("77Pl"),i=n("3fs2");t.exports=n("FeBl").getIterator=function(t){var r=i(t);if("function"!=typeof r)throw TypeError(t+" is not iterable!");return e(r.call(t))}}});
//# sourceMappingURL=2.1d490f8d66e074c38c8a.js.map