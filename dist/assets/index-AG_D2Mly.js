(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();const Fc={login:{title:"Login",screen:"login"},auth_callback:{title:"Auth Callback",screen:"login"},auth_error:{title:"Auth Error",screen:"login"},home:{title:"Beranda",screen:"home"},budget:{title:"Budget",screen:"budget"},events:{title:"Agenda",screen:"events"},mealplan:{title:"Meal Plan",screen:"mealplan"},weekend:{title:"Weekend",screen:"weekend"},bills:{title:"Tagihan",screen:"bills"}};function Sn(){const e=(window.location.hash.slice(1)||"home").split("?");let t=e[0];const r=e.length>1?e[1]:"";return t==="/auth/callback"&&(t="auth_callback"),t==="/auth/error"&&(t="auth_error"),{...Fc[t]||Fc.home,queryString:r}}function Sf(n){window.location.hash=n}function kf(n){n(Sn()),window.addEventListener("hashchange",()=>{n(Sn())})}const pu={id:{nav_home:"Beranda",nav_budget:"Budget",nav_events:"Agenda",nav_mealplan:"Makan",nav_weekend:"Weekend",nav_bills:"Tagihan",home_greeting:"Selamat Datang",home_budget_summary:"Ringkasan Budget",home_upcoming_events:"Agenda Mendatang",home_bills_due:"Tagihan Akan Jatuh Tempo",home_no_events:"Tidak ada agenda mendatang",home_no_bills:"Tidak ada tagihan mendatang",budget_title:"Budget Bulanan",budget_spent:"Terpakai",budget_remaining:"Sisa",budget_over:"Melebihi budget",budget_add:"Tambah Transaksi",budget_edit:"Edit Transaksi",budget_amount:"Jumlah",budget_category:"Kategori",budget_date:"Tanggal",budget_note:"Catatan",budget_save:"Simpan",budget_delete:"Hapus",budget_no_transactions:"Belum ada transaksi",budget_set_budget:"Set Budget Bulanan",budget_total:"Total",budget_filter_month:"Filter Bulan",budget_today:"Hari Ini",budget_categories:{makan:"Makan & Minum",transportasi:"Transportasi",belanja:"Belanja Rumah",zaidan:"Zaidan",utilitas:"Utilitas",lainnya:"Lain-Lain",salary_farhan:"Gaji Farhan",salary_inne:"Gaji Inne",freelance:"Freelance",thr:"THR",ortu_gift:"Gift Ortu",other_income:"Pemasukan Lain",loan:"Cicilan",core_needed:"Core Needed",budget_personal:"Budget Pribadi",gift:"Hadiah",deposit:"Deposit",utility:"Utilitas"},budget_type_income:"Pemasukan",budget_type_expense:"Pengeluaran",budget_summary:"Ringkasan",budget_income:"Total Pemasukan",budget_expense:"Total Pengeluaran",budget_cash_left:"Sisa Cash",budget_status_done:"Lunas",budget_status_not_done:"Belum Lunas",budget_transaction_type:"Tipe Transaksi",events_title:"Agenda Keluarga",events_add:"Tambah Agenda",events_edit:"Edit Agenda",events_name:"Nama Agenda",events_date:"Tanggal",events_type:"Tipe",events_save:"Simpan",events_delete:"Hapus",events_no_events:"Belum ada agenda",events_upcoming:"Agenda Mendatang",events_types:{birthday:"Ulang Tahun",anniversary:"Anniversary",school:"Event Sekolah",holiday:"Hari Besar",other:"Lain-Lain"},events_today:"Hari Ini",events_this_week:"Minggu Ini",mealplan_title:"Rencana Makan",mealplan_add:"Tambah Menu",mealplan_copy_week:"Salin Minggu Lalu",mealplan_breakfast:"Sarapan",mealplan_lunch:"Makan Siang",mealplan_dinner:"Makan Malam",mealplan_save:"Simpan",mealplan_no_menu:"Belum ada menu",mealplan_days:{monday:"Senin",tuesday:"Selasa",wednesday:"Rabu",thursday:"Kamis",friday:"Jumat",saturday:"Sabtu",sunday:"Minggu"},weekend_title:"Aktivitas Weekend",weekend_add:"Tambah Aktivitas",weekend_done:"Selesai",weekend_pending:"Belum",weekend_progress:"Progress",weekend_no_activities:"Belum ada aktivitas",weekend_categories:{outdoor:"Outdoor",indoor:"Indoor",education:"Edukasi",family:"Quality Time"},weekend_saturday:"Sabtu",weekend_sunday:"Minggu",bills_title:"Tagihan",bills_add:"Tambah Tagihan",bills_edit:"Edit Tagihan",bills_name:"Nama Tagihan",bills_amount:"Jumlah",bills_due_date:"Tanggal Jatuh Tempo",bills_paid:"Lunas",bills_unpaid:"Belum Lunas",bills_mark_paid:"Tandai Lunas",bills_save:"Simpan",bills_delete:"Hapus",bills_no_bills:"Belum ada tagihan",bills_total_month:"Total Bulan Ini",bills_due_soon:"Akan Jatuh Tempo",bills_overdue:"Lewat Jatuh Tempo",bills_categories:{air:"Air",ipl:"IPL",cicilan:"Cicilan",internet:"Internet",pendidikan:"Pendidikan",lainnya:"Lain-Lain"},bills_frequency:"Frekuensi",bills_weekly:"Mingguan",bills_monthly:"Bulanan",bills_yearly:"Tahunan",bills_one_time:"Sekali",events_holidays_week:"Hari Libur Minggu Ini",tax_title:"Pengingat Pajak",tax_add:"Tambah",tax_name:"Nama",tax_amount:"Jumlah",tax_due_date:"Tanggal Jatuh Tempo",tax_paid:"Lunas",tax_unpaid:"Belum Lunas",tax_save:"Simpan",tax_delete:"Hapus",tax_no_items:"Belum ada pengingat",tax_duration:"Durasi",tax_one_time:"Sekali",tax_1_year:"1 Tahun",tax_5_years:"5 Tahun",common_save:"Simpan",common_cancel:"Batal",common_delete:"Hapus",common_edit:"Edit",common_add:"Tambah",common_close:"Tutup",common_loading:"Memuat...",common_error:"Terjadi kesalahan",common_success:"Berhasil",common_no_data:"Tidak ada data",common_confirm_delete:"Yakin ingin menghapus?",common_yes:"Ya",common_no:"Tidak",settings_language:"Bahasa",settings_theme:"Tema"},en:{nav_home:"Home",nav_budget:"Budget",nav_events:"Events",nav_mealplan:"Meal",nav_weekend:"Weekend",nav_bills:"Bills",home_greeting:"Welcome",home_budget_summary:"Budget Summary",home_upcoming_events:"Upcoming Events",home_bills_due:"Bills Due Soon",home_no_events:"No upcoming events",home_no_bills:"No bills due",budget_title:"Monthly Budget",budget_spent:"Spent",budget_remaining:"Remaining",budget_over:"Over budget",budget_add:"Add Transaction",budget_edit:"Edit Transaction",budget_amount:"Amount",budget_category:"Category",budget_date:"Date",budget_note:"Note",budget_save:"Save",budget_delete:"Delete",budget_no_transactions:"No transactions yet",budget_set_budget:"Set Monthly Budget",budget_total:"Total",budget_filter_month:"Filter Month",budget_today:"Today",budget_categories:{makan:"Food & Drinks",transportasi:"Transportation",belanja:"Groceries",zaidan:"Zaidan",utilitas:"Utilities",lainnya:"Other",salary_farhan:"Farhan Salary",salary_inne:"Inne Salary",freelance:"Freelance",thr:"Holiday Allowance",ortu_gift:"Parent Gift",other_income:"Other Income",loan:"Loan",core_needed:"Core Needed",budget_personal:"Personal Budget",gift:"Gift",deposit:"Deposit",utility:"Utilities"},budget_type_income:"Income",budget_type_expense:"Expense",budget_summary:"Summary",budget_income:"Total Income",budget_expense:"Total Expense",budget_cash_left:"Cash Left",budget_status_done:"Paid",budget_status_not_done:"Unpaid",budget_transaction_type:"Transaction Type",events_title:"Family Events",events_add:"Add Event",events_edit:"Edit Event",events_name:"Event Name",events_date:"Date",events_type:"Type",events_save:"Save",events_delete:"Delete",events_no_events:"No events yet",events_upcoming:"Upcoming Events",events_types:{birthday:"Birthday",anniversary:"Anniversary",school:"School Event",holiday:"Holiday",other:"Other"},events_today:"Today",events_this_week:"This Week",mealplan_title:"Meal Plan",mealplan_add:"Add Menu",mealplan_copy_week:"Copy Last Week",mealplan_breakfast:"Breakfast",mealplan_lunch:"Lunch",mealplan_dinner:"Dinner",mealplan_save:"Save",mealplan_no_menu:"No menu yet",mealplan_days:{monday:"Monday",tuesday:"Tuesday",wednesday:"Wednesday",thursday:"Thursday",friday:"Friday",saturday:"Saturday",sunday:"Sunday"},weekend_title:"Weekend Activities",weekend_add:"Add Activity",weekend_done:"Done",weekend_pending:"Pending",weekend_progress:"Progress",weekend_no_activities:"No activities yet",weekend_categories:{outdoor:"Outdoor",indoor:"Indoor",education:"Education",family:"Family Time"},weekend_saturday:"Saturday",weekend_sunday:"Sunday",bills_title:"Bills",bills_add:"Add Bill",bills_edit:"Edit Bill",bills_name:"Bill Name",bills_amount:"Amount",bills_due_date:"Due Date",bills_paid:"Paid",bills_unpaid:"Unpaid",bills_mark_paid:"Mark as Paid",bills_save:"Save",bills_delete:"Delete",bills_no_bills:"No bills yet",bills_total_month:"Total This Month",bills_due_soon:"Due Soon",bills_overdue:"Overdue",bills_categories:{air:"Water",ipl:"Maintenance",cicilan:"Installment",internet:"Internet",pendidikan:"Education",lainnya:"Other"},bills_frequency:"Frequency",bills_weekly:"Weekly",bills_monthly:"Monthly",bills_yearly:"Yearly",bills_one_time:"One-time",events_holidays_week:"This Week's Holidays",tax_title:"Tax Reminders",tax_add:"Add",tax_name:"Name",tax_amount:"Amount",tax_due_date:"Due Date",tax_paid:"Paid",tax_unpaid:"Unpaid",tax_save:"Save",tax_delete:"Delete",tax_no_items:"No reminders yet",tax_duration:"Duration",tax_one_time:"One-time",tax_1_year:"1 Year",tax_5_years:"5 Years",common_save:"Save",common_cancel:"Cancel",common_delete:"Delete",common_edit:"Edit",common_add:"Add",common_close:"Close",common_loading:"Loading...",common_error:"An error occurred",common_success:"Success",common_no_data:"No data",common_confirm_delete:"Are you sure you want to delete?",common_yes:"Yes",common_no:"No",settings_language:"Language",settings_theme:"Theme"}};let zs=localStorage.getItem("sfd_lang")||"id";function S(n){const e=n.split(".");let t=pu[zs];for(const r of e)t=t==null?void 0:t[r];return t||n}function He(){return zs}function Rf(n){return pu[n]?(zs=n,localStorage.setItem("sfd_lang",n),window.dispatchEvent(new CustomEvent("langchange",{detail:{lang:n}})),!0):!1}function Pf(){return Rf(zs==="id"?"en":"id")}var Uc={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gu=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Cf=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],o=n[t++],c=n[t++],u=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=n[t++],o=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},yu={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],o=s+1<n.length,c=o?n[s+1]:0,u=s+2<n.length,h=u?n[s+2]:0,f=i>>2,_=(i&3)<<4|c>>4;let v=(c&15)<<2|h>>6,I=h&63;u||(I=64,o||(v=64)),r.push(t[f],t[_],t[v],t[I])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(gu(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Cf(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const h=s<n.length?t[n.charAt(s)]:64;++s;const _=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||h==null||_==null)throw new Df;const v=i<<2|c>>4;if(r.push(v),h!==64){const I=c<<4&240|h>>2;if(r.push(I),_!==64){const R=h<<6&192|_;r.push(R)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Df extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const xf=function(n){const e=gu(n);return yu.encodeByteArray(e,!0)},Ss=function(n){return xf(n).replace(/\./g,"")},_u=function(n){try{return yu.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mf(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nf=()=>Mf().__FIREBASE_DEFAULTS__,Of=()=>{if(typeof process>"u"||typeof Uc>"u")return;const n=Uc.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Vf=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&_u(n[1]);return e&&JSON.parse(e)},Gs=()=>{try{return Nf()||Of()||Vf()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},vu=n=>{var e,t;return(t=(e=Gs())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Lf=n=>{const e=vu(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},wu=()=>{var n;return(n=Gs())===null||n===void 0?void 0:n.config},bu=n=>{var e;return(e=Gs())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $f{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ff(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Ss(JSON.stringify(t)),Ss(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ce(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Uf(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ce())}function Bf(){var n;const e=(n=Gs())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function jf(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function qf(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Wf(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Hf(){const n=Ce();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function zf(){return!Bf()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Gf(){try{return typeof indexedDB=="object"}catch{return!1}}function Kf(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qf="FirebaseError";class Tt extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Qf,Object.setPrototypeOf(this,Tt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,xr.prototype.create)}}class xr{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?Yf(i,r):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new Tt(s,c,r)}}function Yf(n,e){return n.replace(Jf,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Jf=/\{\$([^}]+)}/g;function Xf(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function ks(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],o=e[s];if(Bc(i)&&Bc(o)){if(!ks(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Bc(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mr(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Zf(n,e){const t=new em(n,e);return t.subscribe.bind(t)}class em{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");tm(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Wi),s.error===void 0&&(s.error=Wi),s.complete===void 0&&(s.complete=Wi);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function tm(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Wi(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function De(n){return n&&n._delegate?n._delegate:n}class nn{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nm{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new $f;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(sm(e))try{this.getOrInitializeService({instanceIdentifier:Yt})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Yt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Yt){return this.instances.has(e)}getOptions(e=Yt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&o.resolve(s)}return s}onInit(e,t){var r;const s=this.normalizeInstanceIdentifier(t),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:rm(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Yt){return this.component?this.component.multipleInstances?e:Yt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function rm(n){return n===Yt?void 0:n}function sm(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class im{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new nm(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var z;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(z||(z={}));const am={debug:z.DEBUG,verbose:z.VERBOSE,info:z.INFO,warn:z.WARN,error:z.ERROR,silent:z.SILENT},om=z.INFO,cm={[z.DEBUG]:"log",[z.VERBOSE]:"log",[z.INFO]:"info",[z.WARN]:"warn",[z.ERROR]:"error"},lm=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=cm[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ma{constructor(e){this.name=e,this._logLevel=om,this._logHandler=lm,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in z))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?am[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,z.DEBUG,...e),this._logHandler(this,z.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,z.VERBOSE,...e),this._logHandler(this,z.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,z.INFO,...e),this._logHandler(this,z.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,z.WARN,...e),this._logHandler(this,z.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,z.ERROR,...e),this._logHandler(this,z.ERROR,...e)}}const um=(n,e)=>e.some(t=>n instanceof t);let jc,qc;function dm(){return jc||(jc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function hm(){return qc||(qc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Eu=new WeakMap,ia=new WeakMap,Tu=new WeakMap,Hi=new WeakMap,Na=new WeakMap;function fm(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",o)},i=()=>{t(Ot(n.result)),s()},o=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Eu.set(t,n)}).catch(()=>{}),Na.set(e,n),e}function mm(n){if(ia.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",o),n.removeEventListener("abort",o)},i=()=>{t(),s()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",o),n.addEventListener("abort",o)});ia.set(n,e)}let aa={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return ia.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Tu.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Ot(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function pm(n){aa=n(aa)}function gm(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(zi(this),e,...t);return Tu.set(r,e.sort?e.sort():[e]),Ot(r)}:hm().includes(n)?function(...e){return n.apply(zi(this),e),Ot(Eu.get(this))}:function(...e){return Ot(n.apply(zi(this),e))}}function ym(n){return typeof n=="function"?gm(n):(n instanceof IDBTransaction&&mm(n),um(n,dm())?new Proxy(n,aa):n)}function Ot(n){if(n instanceof IDBRequest)return fm(n);if(Hi.has(n))return Hi.get(n);const e=ym(n);return e!==n&&(Hi.set(n,e),Na.set(e,n)),e}const zi=n=>Na.get(n);function _m(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(n,e),c=Ot(o);return r&&o.addEventListener("upgradeneeded",u=>{r(Ot(o.result),u.oldVersion,u.newVersion,Ot(o.transaction),u)}),t&&o.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const vm=["get","getKey","getAll","getAllKeys","count"],wm=["put","add","delete","clear"],Gi=new Map;function Wc(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Gi.get(e))return Gi.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=wm.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||vm.includes(t)))return;const i=async function(o,...c){const u=this.transaction(o,s?"readwrite":"readonly");let h=u.store;return r&&(h=h.index(c.shift())),(await Promise.all([h[t](...c),s&&u.done]))[0]};return Gi.set(e,i),i}pm(n=>({...n,get:(e,t,r)=>Wc(e,t)||n.get(e,t,r),has:(e,t)=>!!Wc(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bm{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Em(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function Em(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const oa="@firebase/app",Hc="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yt=new Ma("@firebase/app"),Tm="@firebase/app-compat",Im="@firebase/analytics-compat",Am="@firebase/analytics",Sm="@firebase/app-check-compat",km="@firebase/app-check",Rm="@firebase/auth",Pm="@firebase/auth-compat",Cm="@firebase/database",Dm="@firebase/data-connect",xm="@firebase/database-compat",Mm="@firebase/functions",Nm="@firebase/functions-compat",Om="@firebase/installations",Vm="@firebase/installations-compat",Lm="@firebase/messaging",$m="@firebase/messaging-compat",Fm="@firebase/performance",Um="@firebase/performance-compat",Bm="@firebase/remote-config",jm="@firebase/remote-config-compat",qm="@firebase/storage",Wm="@firebase/storage-compat",Hm="@firebase/firestore",zm="@firebase/vertexai-preview",Gm="@firebase/firestore-compat",Km="firebase",Qm="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ca="[DEFAULT]",Ym={[oa]:"fire-core",[Tm]:"fire-core-compat",[Am]:"fire-analytics",[Im]:"fire-analytics-compat",[km]:"fire-app-check",[Sm]:"fire-app-check-compat",[Rm]:"fire-auth",[Pm]:"fire-auth-compat",[Cm]:"fire-rtdb",[Dm]:"fire-data-connect",[xm]:"fire-rtdb-compat",[Mm]:"fire-fn",[Nm]:"fire-fn-compat",[Om]:"fire-iid",[Vm]:"fire-iid-compat",[Lm]:"fire-fcm",[$m]:"fire-fcm-compat",[Fm]:"fire-perf",[Um]:"fire-perf-compat",[Bm]:"fire-rc",[jm]:"fire-rc-compat",[qm]:"fire-gcs",[Wm]:"fire-gcs-compat",[Hm]:"fire-fst",[Gm]:"fire-fst-compat",[zm]:"fire-vertex","fire-js":"fire-js",[Km]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rs=new Map,Jm=new Map,la=new Map;function zc(n,e){try{n.container.addComponent(e)}catch(t){yt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function kn(n){const e=n.name;if(la.has(e))return yt.debug(`There were multiple attempts to register component ${e}.`),!1;la.set(e,n);for(const t of Rs.values())zc(t,n);for(const t of Jm.values())zc(t,n);return!0}function Oa(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function ht(n){return n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xm={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Vt=new xr("app","Firebase",Xm);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zm{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new nn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Vt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vn=Qm;function Iu(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:ca,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw Vt.create("bad-app-name",{appName:String(s)});if(t||(t=wu()),!t)throw Vt.create("no-options");const i=Rs.get(s);if(i){if(ks(t,i.options)&&ks(r,i.config))return i;throw Vt.create("duplicate-app",{appName:s})}const o=new im(s);for(const u of la.values())o.addComponent(u);const c=new Zm(t,r,o);return Rs.set(s,c),c}function Au(n=ca){const e=Rs.get(n);if(!e&&n===ca&&wu())return Iu();if(!e)throw Vt.create("no-app",{appName:n});return e}function Lt(n,e,t){var r;let s=(r=Ym[n])!==null&&r!==void 0?r:n;t&&(s+=`-${t}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const c=[`Unable to register library "${s}" with version "${e}":`];i&&c.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&c.push("and"),o&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),yt.warn(c.join(" "));return}kn(new nn(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ep="firebase-heartbeat-database",tp=1,br="firebase-heartbeat-store";let Ki=null;function Su(){return Ki||(Ki=_m(ep,tp,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(br)}catch(t){console.warn(t)}}}}).catch(n=>{throw Vt.create("idb-open",{originalErrorMessage:n.message})})),Ki}async function np(n){try{const t=(await Su()).transaction(br),r=await t.objectStore(br).get(ku(n));return await t.done,r}catch(e){if(e instanceof Tt)yt.warn(e.message);else{const t=Vt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});yt.warn(t.message)}}}async function Gc(n,e){try{const r=(await Su()).transaction(br,"readwrite");await r.objectStore(br).put(e,ku(n)),await r.done}catch(t){if(t instanceof Tt)yt.warn(t.message);else{const r=Vt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});yt.warn(r.message)}}}function ku(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rp=1024,sp=720*60*60*1e3;class ip{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new op(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Kc();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i)?void 0:(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const c=new Date(o.date).valueOf();return Date.now()-c<=sp}),this._storage.overwrite(this._heartbeatsCache))}catch(r){yt.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Kc(),{heartbeatsToSend:r,unsentEntries:s}=ap(this._heartbeatsCache.heartbeats),i=Ss(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return yt.warn(t),""}}}function Kc(){return new Date().toISOString().substring(0,10)}function ap(n,e=rp){const t=[];let r=n.slice();for(const s of n){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),Qc(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Qc(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class op{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Gf()?Kf().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await np(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Gc(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Gc(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Qc(n){return Ss(JSON.stringify({version:2,heartbeats:n})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cp(n){kn(new nn("platform-logger",e=>new bm(e),"PRIVATE")),kn(new nn("heartbeat",e=>new ip(e),"PRIVATE")),Lt(oa,Hc,n),Lt(oa,Hc,"esm2017"),Lt("fire-js","")}cp("");var Yc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var en,Ru;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(T,y){function w(){}w.prototype=y.prototype,T.D=y.prototype,T.prototype=new w,T.prototype.constructor=T,T.C=function(b,g,E){for(var p=Array(arguments.length-2),se=2;se<arguments.length;se++)p[se-2]=arguments[se];return y.prototype[g].apply(b,p)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(T,y,w){w||(w=0);var b=Array(16);if(typeof y=="string")for(var g=0;16>g;++g)b[g]=y.charCodeAt(w++)|y.charCodeAt(w++)<<8|y.charCodeAt(w++)<<16|y.charCodeAt(w++)<<24;else for(g=0;16>g;++g)b[g]=y[w++]|y[w++]<<8|y[w++]<<16|y[w++]<<24;y=T.g[0],w=T.g[1],g=T.g[2];var E=T.g[3],p=y+(E^w&(g^E))+b[0]+3614090360&4294967295;y=w+(p<<7&4294967295|p>>>25),p=E+(g^y&(w^g))+b[1]+3905402710&4294967295,E=y+(p<<12&4294967295|p>>>20),p=g+(w^E&(y^w))+b[2]+606105819&4294967295,g=E+(p<<17&4294967295|p>>>15),p=w+(y^g&(E^y))+b[3]+3250441966&4294967295,w=g+(p<<22&4294967295|p>>>10),p=y+(E^w&(g^E))+b[4]+4118548399&4294967295,y=w+(p<<7&4294967295|p>>>25),p=E+(g^y&(w^g))+b[5]+1200080426&4294967295,E=y+(p<<12&4294967295|p>>>20),p=g+(w^E&(y^w))+b[6]+2821735955&4294967295,g=E+(p<<17&4294967295|p>>>15),p=w+(y^g&(E^y))+b[7]+4249261313&4294967295,w=g+(p<<22&4294967295|p>>>10),p=y+(E^w&(g^E))+b[8]+1770035416&4294967295,y=w+(p<<7&4294967295|p>>>25),p=E+(g^y&(w^g))+b[9]+2336552879&4294967295,E=y+(p<<12&4294967295|p>>>20),p=g+(w^E&(y^w))+b[10]+4294925233&4294967295,g=E+(p<<17&4294967295|p>>>15),p=w+(y^g&(E^y))+b[11]+2304563134&4294967295,w=g+(p<<22&4294967295|p>>>10),p=y+(E^w&(g^E))+b[12]+1804603682&4294967295,y=w+(p<<7&4294967295|p>>>25),p=E+(g^y&(w^g))+b[13]+4254626195&4294967295,E=y+(p<<12&4294967295|p>>>20),p=g+(w^E&(y^w))+b[14]+2792965006&4294967295,g=E+(p<<17&4294967295|p>>>15),p=w+(y^g&(E^y))+b[15]+1236535329&4294967295,w=g+(p<<22&4294967295|p>>>10),p=y+(g^E&(w^g))+b[1]+4129170786&4294967295,y=w+(p<<5&4294967295|p>>>27),p=E+(w^g&(y^w))+b[6]+3225465664&4294967295,E=y+(p<<9&4294967295|p>>>23),p=g+(y^w&(E^y))+b[11]+643717713&4294967295,g=E+(p<<14&4294967295|p>>>18),p=w+(E^y&(g^E))+b[0]+3921069994&4294967295,w=g+(p<<20&4294967295|p>>>12),p=y+(g^E&(w^g))+b[5]+3593408605&4294967295,y=w+(p<<5&4294967295|p>>>27),p=E+(w^g&(y^w))+b[10]+38016083&4294967295,E=y+(p<<9&4294967295|p>>>23),p=g+(y^w&(E^y))+b[15]+3634488961&4294967295,g=E+(p<<14&4294967295|p>>>18),p=w+(E^y&(g^E))+b[4]+3889429448&4294967295,w=g+(p<<20&4294967295|p>>>12),p=y+(g^E&(w^g))+b[9]+568446438&4294967295,y=w+(p<<5&4294967295|p>>>27),p=E+(w^g&(y^w))+b[14]+3275163606&4294967295,E=y+(p<<9&4294967295|p>>>23),p=g+(y^w&(E^y))+b[3]+4107603335&4294967295,g=E+(p<<14&4294967295|p>>>18),p=w+(E^y&(g^E))+b[8]+1163531501&4294967295,w=g+(p<<20&4294967295|p>>>12),p=y+(g^E&(w^g))+b[13]+2850285829&4294967295,y=w+(p<<5&4294967295|p>>>27),p=E+(w^g&(y^w))+b[2]+4243563512&4294967295,E=y+(p<<9&4294967295|p>>>23),p=g+(y^w&(E^y))+b[7]+1735328473&4294967295,g=E+(p<<14&4294967295|p>>>18),p=w+(E^y&(g^E))+b[12]+2368359562&4294967295,w=g+(p<<20&4294967295|p>>>12),p=y+(w^g^E)+b[5]+4294588738&4294967295,y=w+(p<<4&4294967295|p>>>28),p=E+(y^w^g)+b[8]+2272392833&4294967295,E=y+(p<<11&4294967295|p>>>21),p=g+(E^y^w)+b[11]+1839030562&4294967295,g=E+(p<<16&4294967295|p>>>16),p=w+(g^E^y)+b[14]+4259657740&4294967295,w=g+(p<<23&4294967295|p>>>9),p=y+(w^g^E)+b[1]+2763975236&4294967295,y=w+(p<<4&4294967295|p>>>28),p=E+(y^w^g)+b[4]+1272893353&4294967295,E=y+(p<<11&4294967295|p>>>21),p=g+(E^y^w)+b[7]+4139469664&4294967295,g=E+(p<<16&4294967295|p>>>16),p=w+(g^E^y)+b[10]+3200236656&4294967295,w=g+(p<<23&4294967295|p>>>9),p=y+(w^g^E)+b[13]+681279174&4294967295,y=w+(p<<4&4294967295|p>>>28),p=E+(y^w^g)+b[0]+3936430074&4294967295,E=y+(p<<11&4294967295|p>>>21),p=g+(E^y^w)+b[3]+3572445317&4294967295,g=E+(p<<16&4294967295|p>>>16),p=w+(g^E^y)+b[6]+76029189&4294967295,w=g+(p<<23&4294967295|p>>>9),p=y+(w^g^E)+b[9]+3654602809&4294967295,y=w+(p<<4&4294967295|p>>>28),p=E+(y^w^g)+b[12]+3873151461&4294967295,E=y+(p<<11&4294967295|p>>>21),p=g+(E^y^w)+b[15]+530742520&4294967295,g=E+(p<<16&4294967295|p>>>16),p=w+(g^E^y)+b[2]+3299628645&4294967295,w=g+(p<<23&4294967295|p>>>9),p=y+(g^(w|~E))+b[0]+4096336452&4294967295,y=w+(p<<6&4294967295|p>>>26),p=E+(w^(y|~g))+b[7]+1126891415&4294967295,E=y+(p<<10&4294967295|p>>>22),p=g+(y^(E|~w))+b[14]+2878612391&4294967295,g=E+(p<<15&4294967295|p>>>17),p=w+(E^(g|~y))+b[5]+4237533241&4294967295,w=g+(p<<21&4294967295|p>>>11),p=y+(g^(w|~E))+b[12]+1700485571&4294967295,y=w+(p<<6&4294967295|p>>>26),p=E+(w^(y|~g))+b[3]+2399980690&4294967295,E=y+(p<<10&4294967295|p>>>22),p=g+(y^(E|~w))+b[10]+4293915773&4294967295,g=E+(p<<15&4294967295|p>>>17),p=w+(E^(g|~y))+b[1]+2240044497&4294967295,w=g+(p<<21&4294967295|p>>>11),p=y+(g^(w|~E))+b[8]+1873313359&4294967295,y=w+(p<<6&4294967295|p>>>26),p=E+(w^(y|~g))+b[15]+4264355552&4294967295,E=y+(p<<10&4294967295|p>>>22),p=g+(y^(E|~w))+b[6]+2734768916&4294967295,g=E+(p<<15&4294967295|p>>>17),p=w+(E^(g|~y))+b[13]+1309151649&4294967295,w=g+(p<<21&4294967295|p>>>11),p=y+(g^(w|~E))+b[4]+4149444226&4294967295,y=w+(p<<6&4294967295|p>>>26),p=E+(w^(y|~g))+b[11]+3174756917&4294967295,E=y+(p<<10&4294967295|p>>>22),p=g+(y^(E|~w))+b[2]+718787259&4294967295,g=E+(p<<15&4294967295|p>>>17),p=w+(E^(g|~y))+b[9]+3951481745&4294967295,T.g[0]=T.g[0]+y&4294967295,T.g[1]=T.g[1]+(g+(p<<21&4294967295|p>>>11))&4294967295,T.g[2]=T.g[2]+g&4294967295,T.g[3]=T.g[3]+E&4294967295}r.prototype.u=function(T,y){y===void 0&&(y=T.length);for(var w=y-this.blockSize,b=this.B,g=this.h,E=0;E<y;){if(g==0)for(;E<=w;)s(this,T,E),E+=this.blockSize;if(typeof T=="string"){for(;E<y;)if(b[g++]=T.charCodeAt(E++),g==this.blockSize){s(this,b),g=0;break}}else for(;E<y;)if(b[g++]=T[E++],g==this.blockSize){s(this,b),g=0;break}}this.h=g,this.o+=y},r.prototype.v=function(){var T=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);T[0]=128;for(var y=1;y<T.length-8;++y)T[y]=0;var w=8*this.o;for(y=T.length-8;y<T.length;++y)T[y]=w&255,w/=256;for(this.u(T),T=Array(16),y=w=0;4>y;++y)for(var b=0;32>b;b+=8)T[w++]=this.g[y]>>>b&255;return T};function i(T,y){var w=c;return Object.prototype.hasOwnProperty.call(w,T)?w[T]:w[T]=y(T)}function o(T,y){this.h=y;for(var w=[],b=!0,g=T.length-1;0<=g;g--){var E=T[g]|0;b&&E==y||(w[g]=E,b=!1)}this.g=w}var c={};function u(T){return-128<=T&&128>T?i(T,function(y){return new o([y|0],0>y?-1:0)}):new o([T|0],0>T?-1:0)}function h(T){if(isNaN(T)||!isFinite(T))return _;if(0>T)return D(h(-T));for(var y=[],w=1,b=0;T>=w;b++)y[b]=T/w|0,w*=4294967296;return new o(y,0)}function f(T,y){if(T.length==0)throw Error("number format error: empty string");if(y=y||10,2>y||36<y)throw Error("radix out of range: "+y);if(T.charAt(0)=="-")return D(f(T.substring(1),y));if(0<=T.indexOf("-"))throw Error('number format error: interior "-" character');for(var w=h(Math.pow(y,8)),b=_,g=0;g<T.length;g+=8){var E=Math.min(8,T.length-g),p=parseInt(T.substring(g,g+E),y);8>E?(E=h(Math.pow(y,E)),b=b.j(E).add(h(p))):(b=b.j(w),b=b.add(h(p)))}return b}var _=u(0),v=u(1),I=u(16777216);n=o.prototype,n.m=function(){if(C(this))return-D(this).m();for(var T=0,y=1,w=0;w<this.g.length;w++){var b=this.i(w);T+=(0<=b?b:4294967296+b)*y,y*=4294967296}return T},n.toString=function(T){if(T=T||10,2>T||36<T)throw Error("radix out of range: "+T);if(R(this))return"0";if(C(this))return"-"+D(this).toString(T);for(var y=h(Math.pow(T,6)),w=this,b="";;){var g=J(w,y).g;w=q(w,g.j(y));var E=((0<w.g.length?w.g[0]:w.h)>>>0).toString(T);if(w=g,R(w))return E+b;for(;6>E.length;)E="0"+E;b=E+b}},n.i=function(T){return 0>T?0:T<this.g.length?this.g[T]:this.h};function R(T){if(T.h!=0)return!1;for(var y=0;y<T.g.length;y++)if(T.g[y]!=0)return!1;return!0}function C(T){return T.h==-1}n.l=function(T){return T=q(this,T),C(T)?-1:R(T)?0:1};function D(T){for(var y=T.g.length,w=[],b=0;b<y;b++)w[b]=~T.g[b];return new o(w,~T.h).add(v)}n.abs=function(){return C(this)?D(this):this},n.add=function(T){for(var y=Math.max(this.g.length,T.g.length),w=[],b=0,g=0;g<=y;g++){var E=b+(this.i(g)&65535)+(T.i(g)&65535),p=(E>>>16)+(this.i(g)>>>16)+(T.i(g)>>>16);b=p>>>16,E&=65535,p&=65535,w[g]=p<<16|E}return new o(w,w[w.length-1]&-2147483648?-1:0)};function q(T,y){return T.add(D(y))}n.j=function(T){if(R(this)||R(T))return _;if(C(this))return C(T)?D(this).j(D(T)):D(D(this).j(T));if(C(T))return D(this.j(D(T)));if(0>this.l(I)&&0>T.l(I))return h(this.m()*T.m());for(var y=this.g.length+T.g.length,w=[],b=0;b<2*y;b++)w[b]=0;for(b=0;b<this.g.length;b++)for(var g=0;g<T.g.length;g++){var E=this.i(b)>>>16,p=this.i(b)&65535,se=T.i(g)>>>16,me=T.i(g)&65535;w[2*b+2*g]+=p*me,F(w,2*b+2*g),w[2*b+2*g+1]+=E*me,F(w,2*b+2*g+1),w[2*b+2*g+1]+=p*se,F(w,2*b+2*g+1),w[2*b+2*g+2]+=E*se,F(w,2*b+2*g+2)}for(b=0;b<y;b++)w[b]=w[2*b+1]<<16|w[2*b];for(b=y;b<2*y;b++)w[b]=0;return new o(w,0)};function F(T,y){for(;(T[y]&65535)!=T[y];)T[y+1]+=T[y]>>>16,T[y]&=65535,y++}function W(T,y){this.g=T,this.h=y}function J(T,y){if(R(y))throw Error("division by zero");if(R(T))return new W(_,_);if(C(T))return y=J(D(T),y),new W(D(y.g),D(y.h));if(C(y))return y=J(T,D(y)),new W(D(y.g),y.h);if(30<T.g.length){if(C(T)||C(y))throw Error("slowDivide_ only works with positive integers.");for(var w=v,b=y;0>=b.l(T);)w=ge(w),b=ge(b);var g=re(w,1),E=re(b,1);for(b=re(b,2),w=re(w,2);!R(b);){var p=E.add(b);0>=p.l(T)&&(g=g.add(w),E=p),b=re(b,1),w=re(w,1)}return y=q(T,g.j(y)),new W(g,y)}for(g=_;0<=T.l(y);){for(w=Math.max(1,Math.floor(T.m()/y.m())),b=Math.ceil(Math.log(w)/Math.LN2),b=48>=b?1:Math.pow(2,b-48),E=h(w),p=E.j(y);C(p)||0<p.l(T);)w-=b,E=h(w),p=E.j(y);R(E)&&(E=v),g=g.add(E),T=q(T,p)}return new W(g,T)}n.A=function(T){return J(this,T).h},n.and=function(T){for(var y=Math.max(this.g.length,T.g.length),w=[],b=0;b<y;b++)w[b]=this.i(b)&T.i(b);return new o(w,this.h&T.h)},n.or=function(T){for(var y=Math.max(this.g.length,T.g.length),w=[],b=0;b<y;b++)w[b]=this.i(b)|T.i(b);return new o(w,this.h|T.h)},n.xor=function(T){for(var y=Math.max(this.g.length,T.g.length),w=[],b=0;b<y;b++)w[b]=this.i(b)^T.i(b);return new o(w,this.h^T.h)};function ge(T){for(var y=T.g.length+1,w=[],b=0;b<y;b++)w[b]=T.i(b)<<1|T.i(b-1)>>>31;return new o(w,T.h)}function re(T,y){var w=y>>5;y%=32;for(var b=T.g.length-w,g=[],E=0;E<b;E++)g[E]=0<y?T.i(E+w)>>>y|T.i(E+w+1)<<32-y:T.i(E+w);return new o(g,T.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Ru=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=f,en=o}).apply(typeof Yc<"u"?Yc:typeof self<"u"?self:typeof window<"u"?window:{});var us=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Pu,ur,Cu,gs,ua,Du,xu,Mu;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,l,d){return a==Array.prototype||a==Object.prototype||(a[l]=d.value),a};function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof us=="object"&&us];for(var l=0;l<a.length;++l){var d=a[l];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=t(this);function s(a,l){if(l)e:{var d=r;a=a.split(".");for(var m=0;m<a.length-1;m++){var A=a[m];if(!(A in d))break e;d=d[A]}a=a[a.length-1],m=d[a],l=l(m),l!=m&&l!=null&&e(d,a,{configurable:!0,writable:!0,value:l})}}function i(a,l){a instanceof String&&(a+="");var d=0,m=!1,A={next:function(){if(!m&&d<a.length){var k=d++;return{value:l(k,a[k]),done:!1}}return m=!0,{done:!0,value:void 0}}};return A[Symbol.iterator]=function(){return A},A}s("Array.prototype.values",function(a){return a||function(){return i(this,function(l,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},c=this||self;function u(a){var l=typeof a;return l=l!="object"?l:a?Array.isArray(a)?"array":l:"null",l=="array"||l=="object"&&typeof a.length=="number"}function h(a){var l=typeof a;return l=="object"&&a!=null||l=="function"}function f(a,l,d){return a.call.apply(a.bind,arguments)}function _(a,l,d){if(!a)throw Error();if(2<arguments.length){var m=Array.prototype.slice.call(arguments,2);return function(){var A=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(A,m),a.apply(l,A)}}return function(){return a.apply(l,arguments)}}function v(a,l,d){return v=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:_,v.apply(null,arguments)}function I(a,l){var d=Array.prototype.slice.call(arguments,1);return function(){var m=d.slice();return m.push.apply(m,arguments),a.apply(this,m)}}function R(a,l){function d(){}d.prototype=l.prototype,a.aa=l.prototype,a.prototype=new d,a.prototype.constructor=a,a.Qb=function(m,A,k){for(var M=Array(arguments.length-2),te=2;te<arguments.length;te++)M[te-2]=arguments[te];return l.prototype[A].apply(m,M)}}function C(a){const l=a.length;if(0<l){const d=Array(l);for(let m=0;m<l;m++)d[m]=a[m];return d}return[]}function D(a,l){for(let d=1;d<arguments.length;d++){const m=arguments[d];if(u(m)){const A=a.length||0,k=m.length||0;a.length=A+k;for(let M=0;M<k;M++)a[A+M]=m[M]}else a.push(m)}}class q{constructor(l,d){this.i=l,this.j=d,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function F(a){return/^[\s\xa0]*$/.test(a)}function W(){var a=c.navigator;return a&&(a=a.userAgent)?a:""}function J(a){return J[" "](a),a}J[" "]=function(){};var ge=W().indexOf("Gecko")!=-1&&!(W().toLowerCase().indexOf("webkit")!=-1&&W().indexOf("Edge")==-1)&&!(W().indexOf("Trident")!=-1||W().indexOf("MSIE")!=-1)&&W().indexOf("Edge")==-1;function re(a,l,d){for(const m in a)l.call(d,a[m],m,a)}function T(a,l){for(const d in a)l.call(void 0,a[d],d,a)}function y(a){const l={};for(const d in a)l[d]=a[d];return l}const w="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function b(a,l){let d,m;for(let A=1;A<arguments.length;A++){m=arguments[A];for(d in m)a[d]=m[d];for(let k=0;k<w.length;k++)d=w[k],Object.prototype.hasOwnProperty.call(m,d)&&(a[d]=m[d])}}function g(a){var l=1;a=a.split(":");const d=[];for(;0<l&&a.length;)d.push(a.shift()),l--;return a.length&&d.push(a.join(":")),d}function E(a){c.setTimeout(()=>{throw a},0)}function p(){var a=wi;let l=null;return a.g&&(l=a.g,a.g=a.g.next,a.g||(a.h=null),l.next=null),l}class se{constructor(){this.h=this.g=null}add(l,d){const m=me.get();m.set(l,d),this.h?this.h.next=m:this.g=m,this.h=m}}var me=new q(()=>new ot,a=>a.reset());class ot{constructor(){this.next=this.g=this.h=null}set(l,d){this.h=l,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let ct,It=!1,wi=new se,Fo=()=>{const a=c.Promise.resolve(void 0);ct=()=>{a.then(Hh)}};var Hh=()=>{for(var a;a=p();){try{a.h.call(a.g)}catch(d){E(d)}var l=me;l.j(a),100>l.h&&(l.h++,a.next=l.g,l.g=a)}It=!1};function At(){this.s=this.s,this.C=this.C}At.prototype.s=!1,At.prototype.ma=function(){this.s||(this.s=!0,this.N())},At.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Te(a,l){this.type=a,this.g=this.target=l,this.defaultPrevented=!1}Te.prototype.h=function(){this.defaultPrevented=!0};var zh=(function(){if(!c.addEventListener||!Object.defineProperty)return!1;var a=!1,l=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};c.addEventListener("test",d,l),c.removeEventListener("test",d,l)}catch{}return a})();function zn(a,l){if(Te.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var d=this.type=a.type,m=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=l,l=a.relatedTarget){if(ge){e:{try{J(l.nodeName);var A=!0;break e}catch{}A=!1}A||(l=null)}}else d=="mouseover"?l=a.fromElement:d=="mouseout"&&(l=a.toElement);this.relatedTarget=l,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:Gh[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&zn.aa.h.call(this)}}R(zn,Te);var Gh={2:"touch",3:"pen",4:"mouse"};zn.prototype.h=function(){zn.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var Hr="closure_listenable_"+(1e6*Math.random()|0),Kh=0;function Qh(a,l,d,m,A){this.listener=a,this.proxy=null,this.src=l,this.type=d,this.capture=!!m,this.ha=A,this.key=++Kh,this.da=this.fa=!1}function zr(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Gr(a){this.src=a,this.g={},this.h=0}Gr.prototype.add=function(a,l,d,m,A){var k=a.toString();a=this.g[k],a||(a=this.g[k]=[],this.h++);var M=Ei(a,l,m,A);return-1<M?(l=a[M],d||(l.fa=!1)):(l=new Qh(l,this.src,k,!!m,A),l.fa=d,a.push(l)),l};function bi(a,l){var d=l.type;if(d in a.g){var m=a.g[d],A=Array.prototype.indexOf.call(m,l,void 0),k;(k=0<=A)&&Array.prototype.splice.call(m,A,1),k&&(zr(l),a.g[d].length==0&&(delete a.g[d],a.h--))}}function Ei(a,l,d,m){for(var A=0;A<a.length;++A){var k=a[A];if(!k.da&&k.listener==l&&k.capture==!!d&&k.ha==m)return A}return-1}var Ti="closure_lm_"+(1e6*Math.random()|0),Ii={};function Uo(a,l,d,m,A){if(Array.isArray(l)){for(var k=0;k<l.length;k++)Uo(a,l[k],d,m,A);return null}return d=qo(d),a&&a[Hr]?a.K(l,d,h(m)?!!m.capture:!1,A):Yh(a,l,d,!1,m,A)}function Yh(a,l,d,m,A,k){if(!l)throw Error("Invalid event type");var M=h(A)?!!A.capture:!!A,te=Si(a);if(te||(a[Ti]=te=new Gr(a)),d=te.add(l,d,m,M,k),d.proxy)return d;if(m=Jh(),d.proxy=m,m.src=a,m.listener=d,a.addEventListener)zh||(A=M),A===void 0&&(A=!1),a.addEventListener(l.toString(),m,A);else if(a.attachEvent)a.attachEvent(jo(l.toString()),m);else if(a.addListener&&a.removeListener)a.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return d}function Jh(){function a(d){return l.call(a.src,a.listener,d)}const l=Xh;return a}function Bo(a,l,d,m,A){if(Array.isArray(l))for(var k=0;k<l.length;k++)Bo(a,l[k],d,m,A);else m=h(m)?!!m.capture:!!m,d=qo(d),a&&a[Hr]?(a=a.i,l=String(l).toString(),l in a.g&&(k=a.g[l],d=Ei(k,d,m,A),-1<d&&(zr(k[d]),Array.prototype.splice.call(k,d,1),k.length==0&&(delete a.g[l],a.h--)))):a&&(a=Si(a))&&(l=a.g[l.toString()],a=-1,l&&(a=Ei(l,d,m,A)),(d=-1<a?l[a]:null)&&Ai(d))}function Ai(a){if(typeof a!="number"&&a&&!a.da){var l=a.src;if(l&&l[Hr])bi(l.i,a);else{var d=a.type,m=a.proxy;l.removeEventListener?l.removeEventListener(d,m,a.capture):l.detachEvent?l.detachEvent(jo(d),m):l.addListener&&l.removeListener&&l.removeListener(m),(d=Si(l))?(bi(d,a),d.h==0&&(d.src=null,l[Ti]=null)):zr(a)}}}function jo(a){return a in Ii?Ii[a]:Ii[a]="on"+a}function Xh(a,l){if(a.da)a=!0;else{l=new zn(l,this);var d=a.listener,m=a.ha||a.src;a.fa&&Ai(a),a=d.call(m,l)}return a}function Si(a){return a=a[Ti],a instanceof Gr?a:null}var ki="__closure_events_fn_"+(1e9*Math.random()>>>0);function qo(a){return typeof a=="function"?a:(a[ki]||(a[ki]=function(l){return a.handleEvent(l)}),a[ki])}function Ie(){At.call(this),this.i=new Gr(this),this.M=this,this.F=null}R(Ie,At),Ie.prototype[Hr]=!0,Ie.prototype.removeEventListener=function(a,l,d,m){Bo(this,a,l,d,m)};function Oe(a,l){var d,m=a.F;if(m)for(d=[];m;m=m.F)d.push(m);if(a=a.M,m=l.type||l,typeof l=="string")l=new Te(l,a);else if(l instanceof Te)l.target=l.target||a;else{var A=l;l=new Te(m,a),b(l,A)}if(A=!0,d)for(var k=d.length-1;0<=k;k--){var M=l.g=d[k];A=Kr(M,m,!0,l)&&A}if(M=l.g=a,A=Kr(M,m,!0,l)&&A,A=Kr(M,m,!1,l)&&A,d)for(k=0;k<d.length;k++)M=l.g=d[k],A=Kr(M,m,!1,l)&&A}Ie.prototype.N=function(){if(Ie.aa.N.call(this),this.i){var a=this.i,l;for(l in a.g){for(var d=a.g[l],m=0;m<d.length;m++)zr(d[m]);delete a.g[l],a.h--}}this.F=null},Ie.prototype.K=function(a,l,d,m){return this.i.add(String(a),l,!1,d,m)},Ie.prototype.L=function(a,l,d,m){return this.i.add(String(a),l,!0,d,m)};function Kr(a,l,d,m){if(l=a.i.g[String(l)],!l)return!0;l=l.concat();for(var A=!0,k=0;k<l.length;++k){var M=l[k];if(M&&!M.da&&M.capture==d){var te=M.listener,ye=M.ha||M.src;M.fa&&bi(a.i,M),A=te.call(ye,m)!==!1&&A}}return A&&!m.defaultPrevented}function Wo(a,l,d){if(typeof a=="function")d&&(a=v(a,d));else if(a&&typeof a.handleEvent=="function")a=v(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:c.setTimeout(a,l||0)}function Ho(a){a.g=Wo(()=>{a.g=null,a.i&&(a.i=!1,Ho(a))},a.l);const l=a.h;a.h=null,a.m.apply(null,l)}class Zh extends At{constructor(l,d){super(),this.m=l,this.l=d,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Ho(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Gn(a){At.call(this),this.h=a,this.g={}}R(Gn,At);var zo=[];function Go(a){re(a.g,function(l,d){this.g.hasOwnProperty(d)&&Ai(l)},a),a.g={}}Gn.prototype.N=function(){Gn.aa.N.call(this),Go(this)},Gn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Ri=c.JSON.stringify,ef=c.JSON.parse,tf=class{stringify(a){return c.JSON.stringify(a,void 0)}parse(a){return c.JSON.parse(a,void 0)}};function Pi(){}Pi.prototype.h=null;function Ko(a){return a.h||(a.h=a.i())}function Qo(){}var Kn={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Ci(){Te.call(this,"d")}R(Ci,Te);function Di(){Te.call(this,"c")}R(Di,Te);var zt={},Yo=null;function Qr(){return Yo=Yo||new Ie}zt.La="serverreachability";function Jo(a){Te.call(this,zt.La,a)}R(Jo,Te);function Qn(a){const l=Qr();Oe(l,new Jo(l))}zt.STAT_EVENT="statevent";function Xo(a,l){Te.call(this,zt.STAT_EVENT,a),this.stat=l}R(Xo,Te);function Ve(a){const l=Qr();Oe(l,new Xo(l,a))}zt.Ma="timingevent";function Zo(a,l){Te.call(this,zt.Ma,a),this.size=l}R(Zo,Te);function Yn(a,l){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){a()},l)}function Jn(){this.g=!0}Jn.prototype.xa=function(){this.g=!1};function nf(a,l,d,m,A,k){a.info(function(){if(a.g)if(k)for(var M="",te=k.split("&"),ye=0;ye<te.length;ye++){var Q=te[ye].split("=");if(1<Q.length){var Ae=Q[0];Q=Q[1];var Se=Ae.split("_");M=2<=Se.length&&Se[1]=="type"?M+(Ae+"="+Q+"&"):M+(Ae+"=redacted&")}}else M=null;else M=k;return"XMLHTTP REQ ("+m+") [attempt "+A+"]: "+l+`
`+d+`
`+M})}function rf(a,l,d,m,A,k,M){a.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+A+"]: "+l+`
`+d+`
`+k+" "+M})}function hn(a,l,d,m){a.info(function(){return"XMLHTTP TEXT ("+l+"): "+af(a,d)+(m?" "+m:"")})}function sf(a,l){a.info(function(){return"TIMEOUT: "+l})}Jn.prototype.info=function(){};function af(a,l){if(!a.g)return l;if(!l)return null;try{var d=JSON.parse(l);if(d){for(a=0;a<d.length;a++)if(Array.isArray(d[a])){var m=d[a];if(!(2>m.length)){var A=m[1];if(Array.isArray(A)&&!(1>A.length)){var k=A[0];if(k!="noop"&&k!="stop"&&k!="close")for(var M=1;M<A.length;M++)A[M]=""}}}}return Ri(d)}catch{return l}}var Yr={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},ec={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},xi;function Jr(){}R(Jr,Pi),Jr.prototype.g=function(){return new XMLHttpRequest},Jr.prototype.i=function(){return{}},xi=new Jr;function St(a,l,d,m){this.j=a,this.i=l,this.l=d,this.R=m||1,this.U=new Gn(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new tc}function tc(){this.i=null,this.g="",this.h=!1}var nc={},Mi={};function Ni(a,l,d){a.L=1,a.v=ts(lt(l)),a.m=d,a.P=!0,rc(a,null)}function rc(a,l){a.F=Date.now(),Xr(a),a.A=lt(a.v);var d=a.A,m=a.R;Array.isArray(m)||(m=[String(m)]),yc(d.i,"t",m),a.C=0,d=a.j.J,a.h=new tc,a.g=Oc(a.j,d?l:null,!a.m),0<a.O&&(a.M=new Zh(v(a.Y,a,a.g),a.O)),l=a.U,d=a.g,m=a.ca;var A="readystatechange";Array.isArray(A)||(A&&(zo[0]=A.toString()),A=zo);for(var k=0;k<A.length;k++){var M=Uo(d,A[k],m||l.handleEvent,!1,l.h||l);if(!M)break;l.g[M.key]=M}l=a.H?y(a.H):{},a.m?(a.u||(a.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,l)):(a.u="GET",a.g.ea(a.A,a.u,null,l)),Qn(),nf(a.i,a.u,a.A,a.l,a.R,a.m)}St.prototype.ca=function(a){a=a.target;const l=this.M;l&&ut(a)==3?l.j():this.Y(a)},St.prototype.Y=function(a){try{if(a==this.g)e:{const Se=ut(this.g);var l=this.g.Ba();const pn=this.g.Z();if(!(3>Se)&&(Se!=3||this.g&&(this.h.h||this.g.oa()||Ic(this.g)))){this.J||Se!=4||l==7||(l==8||0>=pn?Qn(3):Qn(2)),Oi(this);var d=this.g.Z();this.X=d;t:if(sc(this)){var m=Ic(this.g);a="";var A=m.length,k=ut(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Gt(this),Xn(this);var M="";break t}this.h.i=new c.TextDecoder}for(l=0;l<A;l++)this.h.h=!0,a+=this.h.i.decode(m[l],{stream:!(k&&l==A-1)});m.length=0,this.h.g+=a,this.C=0,M=this.h.g}else M=this.g.oa();if(this.o=d==200,rf(this.i,this.u,this.A,this.l,this.R,Se,d),this.o){if(this.T&&!this.K){t:{if(this.g){var te,ye=this.g;if((te=ye.g?ye.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!F(te)){var Q=te;break t}}Q=null}if(d=Q)hn(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Vi(this,d);else{this.o=!1,this.s=3,Ve(12),Gt(this),Xn(this);break e}}if(this.P){d=!0;let Ge;for(;!this.J&&this.C<M.length;)if(Ge=of(this,M),Ge==Mi){Se==4&&(this.s=4,Ve(14),d=!1),hn(this.i,this.l,null,"[Incomplete Response]");break}else if(Ge==nc){this.s=4,Ve(15),hn(this.i,this.l,M,"[Invalid Chunk]"),d=!1;break}else hn(this.i,this.l,Ge,null),Vi(this,Ge);if(sc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Se!=4||M.length!=0||this.h.h||(this.s=1,Ve(16),d=!1),this.o=this.o&&d,!d)hn(this.i,this.l,M,"[Invalid Chunked Response]"),Gt(this),Xn(this);else if(0<M.length&&!this.W){this.W=!0;var Ae=this.j;Ae.g==this&&Ae.ba&&!Ae.M&&(Ae.j.info("Great, no buffering proxy detected. Bytes received: "+M.length),ji(Ae),Ae.M=!0,Ve(11))}}else hn(this.i,this.l,M,null),Vi(this,M);Se==4&&Gt(this),this.o&&!this.J&&(Se==4?Dc(this.j,this):(this.o=!1,Xr(this)))}else If(this.g),d==400&&0<M.indexOf("Unknown SID")?(this.s=3,Ve(12)):(this.s=0,Ve(13)),Gt(this),Xn(this)}}}catch{}finally{}};function sc(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function of(a,l){var d=a.C,m=l.indexOf(`
`,d);return m==-1?Mi:(d=Number(l.substring(d,m)),isNaN(d)?nc:(m+=1,m+d>l.length?Mi:(l=l.slice(m,m+d),a.C=m+d,l)))}St.prototype.cancel=function(){this.J=!0,Gt(this)};function Xr(a){a.S=Date.now()+a.I,ic(a,a.I)}function ic(a,l){if(a.B!=null)throw Error("WatchDog timer not null");a.B=Yn(v(a.ba,a),l)}function Oi(a){a.B&&(c.clearTimeout(a.B),a.B=null)}St.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(sf(this.i,this.A),this.L!=2&&(Qn(),Ve(17)),Gt(this),this.s=2,Xn(this)):ic(this,this.S-a)};function Xn(a){a.j.G==0||a.J||Dc(a.j,a)}function Gt(a){Oi(a);var l=a.M;l&&typeof l.ma=="function"&&l.ma(),a.M=null,Go(a.U),a.g&&(l=a.g,a.g=null,l.abort(),l.ma())}function Vi(a,l){try{var d=a.j;if(d.G!=0&&(d.g==a||Li(d.h,a))){if(!a.K&&Li(d.h,a)&&d.G==3){try{var m=d.Da.g.parse(l)}catch{m=null}if(Array.isArray(m)&&m.length==3){var A=m;if(A[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<a.F)os(d),is(d);else break e;Bi(d),Ve(18)}}else d.za=A[1],0<d.za-d.T&&37500>A[2]&&d.F&&d.v==0&&!d.C&&(d.C=Yn(v(d.Za,d),6e3));if(1>=cc(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else Qt(d,11)}else if((a.K||d.g==a)&&os(d),!F(l))for(A=d.Da.g.parse(l),l=0;l<A.length;l++){let Q=A[l];if(d.T=Q[0],Q=Q[1],d.G==2)if(Q[0]=="c"){d.K=Q[1],d.ia=Q[2];const Ae=Q[3];Ae!=null&&(d.la=Ae,d.j.info("VER="+d.la));const Se=Q[4];Se!=null&&(d.Aa=Se,d.j.info("SVER="+d.Aa));const pn=Q[5];pn!=null&&typeof pn=="number"&&0<pn&&(m=1.5*pn,d.L=m,d.j.info("backChannelRequestTimeoutMs_="+m)),m=d;const Ge=a.g;if(Ge){const ls=Ge.g?Ge.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ls){var k=m.h;k.g||ls.indexOf("spdy")==-1&&ls.indexOf("quic")==-1&&ls.indexOf("h2")==-1||(k.j=k.l,k.g=new Set,k.h&&($i(k,k.h),k.h=null))}if(m.D){const qi=Ge.g?Ge.g.getResponseHeader("X-HTTP-Session-Id"):null;qi&&(m.ya=qi,ie(m.I,m.D,qi))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-a.F,d.j.info("Handshake RTT: "+d.R+"ms")),m=d;var M=a;if(m.qa=Nc(m,m.J?m.ia:null,m.W),M.K){lc(m.h,M);var te=M,ye=m.L;ye&&(te.I=ye),te.B&&(Oi(te),Xr(te)),m.g=M}else Pc(m);0<d.i.length&&as(d)}else Q[0]!="stop"&&Q[0]!="close"||Qt(d,7);else d.G==3&&(Q[0]=="stop"||Q[0]=="close"?Q[0]=="stop"?Qt(d,7):Ui(d):Q[0]!="noop"&&d.l&&d.l.ta(Q),d.v=0)}}Qn(4)}catch{}}var cf=class{constructor(a,l){this.g=a,this.map=l}};function ac(a){this.l=a||10,c.PerformanceNavigationTiming?(a=c.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function oc(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function cc(a){return a.h?1:a.g?a.g.size:0}function Li(a,l){return a.h?a.h==l:a.g?a.g.has(l):!1}function $i(a,l){a.g?a.g.add(l):a.h=l}function lc(a,l){a.h&&a.h==l?a.h=null:a.g&&a.g.has(l)&&a.g.delete(l)}ac.prototype.cancel=function(){if(this.i=uc(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function uc(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let l=a.i;for(const d of a.g.values())l=l.concat(d.D);return l}return C(a.i)}function lf(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(u(a)){for(var l=[],d=a.length,m=0;m<d;m++)l.push(a[m]);return l}l=[],d=0;for(m in a)l[d++]=a[m];return l}function uf(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(u(a)||typeof a=="string"){var l=[];a=a.length;for(var d=0;d<a;d++)l.push(d);return l}l=[],d=0;for(const m in a)l[d++]=m;return l}}}function dc(a,l){if(a.forEach&&typeof a.forEach=="function")a.forEach(l,void 0);else if(u(a)||typeof a=="string")Array.prototype.forEach.call(a,l,void 0);else for(var d=uf(a),m=lf(a),A=m.length,k=0;k<A;k++)l.call(void 0,m[k],d&&d[k],a)}var hc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function df(a,l){if(a){a=a.split("&");for(var d=0;d<a.length;d++){var m=a[d].indexOf("="),A=null;if(0<=m){var k=a[d].substring(0,m);A=a[d].substring(m+1)}else k=a[d];l(k,A?decodeURIComponent(A.replace(/\+/g," ")):"")}}}function Kt(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof Kt){this.h=a.h,Zr(this,a.j),this.o=a.o,this.g=a.g,es(this,a.s),this.l=a.l;var l=a.i,d=new tr;d.i=l.i,l.g&&(d.g=new Map(l.g),d.h=l.h),fc(this,d),this.m=a.m}else a&&(l=String(a).match(hc))?(this.h=!1,Zr(this,l[1]||"",!0),this.o=Zn(l[2]||""),this.g=Zn(l[3]||"",!0),es(this,l[4]),this.l=Zn(l[5]||"",!0),fc(this,l[6]||"",!0),this.m=Zn(l[7]||"")):(this.h=!1,this.i=new tr(null,this.h))}Kt.prototype.toString=function(){var a=[],l=this.j;l&&a.push(er(l,mc,!0),":");var d=this.g;return(d||l=="file")&&(a.push("//"),(l=this.o)&&a.push(er(l,mc,!0),"@"),a.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&a.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(er(d,d.charAt(0)=="/"?mf:ff,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",er(d,gf)),a.join("")};function lt(a){return new Kt(a)}function Zr(a,l,d){a.j=d?Zn(l,!0):l,a.j&&(a.j=a.j.replace(/:$/,""))}function es(a,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);a.s=l}else a.s=null}function fc(a,l,d){l instanceof tr?(a.i=l,yf(a.i,a.h)):(d||(l=er(l,pf)),a.i=new tr(l,a.h))}function ie(a,l,d){a.i.set(l,d)}function ts(a){return ie(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function Zn(a,l){return a?l?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function er(a,l,d){return typeof a=="string"?(a=encodeURI(a).replace(l,hf),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function hf(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var mc=/[#\/\?@]/g,ff=/[#\?:]/g,mf=/[#\?]/g,pf=/[#\?@]/g,gf=/#/g;function tr(a,l){this.h=this.g=null,this.i=a||null,this.j=!!l}function kt(a){a.g||(a.g=new Map,a.h=0,a.i&&df(a.i,function(l,d){a.add(decodeURIComponent(l.replace(/\+/g," ")),d)}))}n=tr.prototype,n.add=function(a,l){kt(this),this.i=null,a=fn(this,a);var d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(l),this.h+=1,this};function pc(a,l){kt(a),l=fn(a,l),a.g.has(l)&&(a.i=null,a.h-=a.g.get(l).length,a.g.delete(l))}function gc(a,l){return kt(a),l=fn(a,l),a.g.has(l)}n.forEach=function(a,l){kt(this),this.g.forEach(function(d,m){d.forEach(function(A){a.call(l,A,m,this)},this)},this)},n.na=function(){kt(this);const a=Array.from(this.g.values()),l=Array.from(this.g.keys()),d=[];for(let m=0;m<l.length;m++){const A=a[m];for(let k=0;k<A.length;k++)d.push(l[m])}return d},n.V=function(a){kt(this);let l=[];if(typeof a=="string")gc(this,a)&&(l=l.concat(this.g.get(fn(this,a))));else{a=Array.from(this.g.values());for(let d=0;d<a.length;d++)l=l.concat(a[d])}return l},n.set=function(a,l){return kt(this),this.i=null,a=fn(this,a),gc(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[l]),this.h+=1,this},n.get=function(a,l){return a?(a=this.V(a),0<a.length?String(a[0]):l):l};function yc(a,l,d){pc(a,l),0<d.length&&(a.i=null,a.g.set(fn(a,l),C(d)),a.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],l=Array.from(this.g.keys());for(var d=0;d<l.length;d++){var m=l[d];const k=encodeURIComponent(String(m)),M=this.V(m);for(m=0;m<M.length;m++){var A=k;M[m]!==""&&(A+="="+encodeURIComponent(String(M[m]))),a.push(A)}}return this.i=a.join("&")};function fn(a,l){return l=String(l),a.j&&(l=l.toLowerCase()),l}function yf(a,l){l&&!a.j&&(kt(a),a.i=null,a.g.forEach(function(d,m){var A=m.toLowerCase();m!=A&&(pc(this,m),yc(this,A,d))},a)),a.j=l}function _f(a,l){const d=new Jn;if(c.Image){const m=new Image;m.onload=I(Rt,d,"TestLoadImage: loaded",!0,l,m),m.onerror=I(Rt,d,"TestLoadImage: error",!1,l,m),m.onabort=I(Rt,d,"TestLoadImage: abort",!1,l,m),m.ontimeout=I(Rt,d,"TestLoadImage: timeout",!1,l,m),c.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=a}else l(!1)}function vf(a,l){const d=new Jn,m=new AbortController,A=setTimeout(()=>{m.abort(),Rt(d,"TestPingServer: timeout",!1,l)},1e4);fetch(a,{signal:m.signal}).then(k=>{clearTimeout(A),k.ok?Rt(d,"TestPingServer: ok",!0,l):Rt(d,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(A),Rt(d,"TestPingServer: error",!1,l)})}function Rt(a,l,d,m,A){try{A&&(A.onload=null,A.onerror=null,A.onabort=null,A.ontimeout=null),m(d)}catch{}}function wf(){this.g=new tf}function bf(a,l,d){const m=d||"";try{dc(a,function(A,k){let M=A;h(A)&&(M=Ri(A)),l.push(m+k+"="+encodeURIComponent(M))})}catch(A){throw l.push(m+"type="+encodeURIComponent("_badmap")),A}}function ns(a){this.l=a.Ub||null,this.j=a.eb||!1}R(ns,Pi),ns.prototype.g=function(){return new rs(this.l,this.j)},ns.prototype.i=(function(a){return function(){return a}})({});function rs(a,l){Ie.call(this),this.D=a,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}R(rs,Ie),n=rs.prototype,n.open=function(a,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=l,this.readyState=1,rr(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(l.body=a),(this.D||c).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,nr(this)),this.readyState=0},n.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,rr(this)),this.g&&(this.readyState=3,rr(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;_c(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function _c(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}n.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var l=a.value?a.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!a.done}))&&(this.response=this.responseText+=l)}a.done?nr(this):rr(this),this.readyState==3&&_c(this)}},n.Ra=function(a){this.g&&(this.response=this.responseText=a,nr(this))},n.Qa=function(a){this.g&&(this.response=a,nr(this))},n.ga=function(){this.g&&nr(this)};function nr(a){a.readyState=4,a.l=null,a.j=null,a.v=null,rr(a)}n.setRequestHeader=function(a,l){this.u.append(a,l)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],l=this.h.entries();for(var d=l.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=l.next();return a.join(`\r
`)};function rr(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(rs.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function vc(a){let l="";return re(a,function(d,m){l+=m,l+=":",l+=d,l+=`\r
`}),l}function Fi(a,l,d){e:{for(m in d){var m=!1;break e}m=!0}m||(d=vc(d),typeof a=="string"?d!=null&&encodeURIComponent(String(d)):ie(a,l,d))}function ce(a){Ie.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}R(ce,Ie);var Ef=/^https?$/i,Tf=["POST","PUT"];n=ce.prototype,n.Ha=function(a){this.J=a},n.ea=function(a,l,d,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);l=l?l.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():xi.g(),this.v=this.o?Ko(this.o):Ko(xi),this.g.onreadystatechange=v(this.Ea,this);try{this.B=!0,this.g.open(l,String(a),!0),this.B=!1}catch(k){wc(this,k);return}if(a=d||"",d=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var A in m)d.set(A,m[A]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const k of m.keys())d.set(k,m.get(k));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(d.keys()).find(k=>k.toLowerCase()=="content-type"),A=c.FormData&&a instanceof c.FormData,!(0<=Array.prototype.indexOf.call(Tf,l,void 0))||m||A||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[k,M]of d)this.g.setRequestHeader(k,M);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Tc(this),this.u=!0,this.g.send(a),this.u=!1}catch(k){wc(this,k)}};function wc(a,l){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=l,a.m=5,bc(a),ss(a)}function bc(a){a.A||(a.A=!0,Oe(a,"complete"),Oe(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,Oe(this,"complete"),Oe(this,"abort"),ss(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),ss(this,!0)),ce.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Ec(this):this.bb())},n.bb=function(){Ec(this)};function Ec(a){if(a.h&&typeof o<"u"&&(!a.v[1]||ut(a)!=4||a.Z()!=2)){if(a.u&&ut(a)==4)Wo(a.Ea,0,a);else if(Oe(a,"readystatechange"),ut(a)==4){a.h=!1;try{const M=a.Z();e:switch(M){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var d;if(!(d=l)){var m;if(m=M===0){var A=String(a.D).match(hc)[1]||null;!A&&c.self&&c.self.location&&(A=c.self.location.protocol.slice(0,-1)),m=!Ef.test(A?A.toLowerCase():"")}d=m}if(d)Oe(a,"complete"),Oe(a,"success");else{a.m=6;try{var k=2<ut(a)?a.g.statusText:""}catch{k=""}a.l=k+" ["+a.Z()+"]",bc(a)}}finally{ss(a)}}}}function ss(a,l){if(a.g){Tc(a);const d=a.g,m=a.v[0]?()=>{}:null;a.g=null,a.v=null,l||Oe(a,"ready");try{d.onreadystatechange=m}catch{}}}function Tc(a){a.I&&(c.clearTimeout(a.I),a.I=null)}n.isActive=function(){return!!this.g};function ut(a){return a.g?a.g.readyState:0}n.Z=function(){try{return 2<ut(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(a){if(this.g){var l=this.g.responseText;return a&&l.indexOf(a)==0&&(l=l.substring(a.length)),ef(l)}};function Ic(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function If(a){const l={};a=(a.g&&2<=ut(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<a.length;m++){if(F(a[m]))continue;var d=g(a[m]);const A=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const k=l[A]||[];l[A]=k,k.push(d)}T(l,function(m){return m.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function sr(a,l,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||l}function Ac(a){this.Aa=0,this.i=[],this.j=new Jn,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=sr("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=sr("baseRetryDelayMs",5e3,a),this.cb=sr("retryDelaySeedMs",1e4,a),this.Wa=sr("forwardChannelMaxRetries",2,a),this.wa=sr("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new ac(a&&a.concurrentRequestLimit),this.Da=new wf,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Ac.prototype,n.la=8,n.G=1,n.connect=function(a,l,d,m){Ve(0),this.W=a,this.H=l||{},d&&m!==void 0&&(this.H.OSID=d,this.H.OAID=m),this.F=this.X,this.I=Nc(this,null,this.W),as(this)};function Ui(a){if(Sc(a),a.G==3){var l=a.U++,d=lt(a.I);if(ie(d,"SID",a.K),ie(d,"RID",l),ie(d,"TYPE","terminate"),ir(a,d),l=new St(a,a.j,l),l.L=2,l.v=ts(lt(d)),d=!1,c.navigator&&c.navigator.sendBeacon)try{d=c.navigator.sendBeacon(l.v.toString(),"")}catch{}!d&&c.Image&&(new Image().src=l.v,d=!0),d||(l.g=Oc(l.j,null),l.g.ea(l.v)),l.F=Date.now(),Xr(l)}Mc(a)}function is(a){a.g&&(ji(a),a.g.cancel(),a.g=null)}function Sc(a){is(a),a.u&&(c.clearTimeout(a.u),a.u=null),os(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&c.clearTimeout(a.s),a.s=null)}function as(a){if(!oc(a.h)&&!a.s){a.s=!0;var l=a.Ga;ct||Fo(),It||(ct(),It=!0),wi.add(l,a),a.B=0}}function Af(a,l){return cc(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=l.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=Yn(v(a.Ga,a,l),xc(a,a.B)),a.B++,!0)}n.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const A=new St(this,this.j,a);let k=this.o;if(this.S&&(k?(k=y(k),b(k,this.S)):k=this.S),this.m!==null||this.O||(A.H=k,k=null),this.P)e:{for(var l=0,d=0;d<this.i.length;d++){t:{var m=this.i[d];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(l+=m,4096<l){l=d;break e}if(l===4096||d===this.i.length-1){l=d+1;break e}}l=1e3}else l=1e3;l=Rc(this,A,l),d=lt(this.I),ie(d,"RID",a),ie(d,"CVER",22),this.D&&ie(d,"X-HTTP-Session-Id",this.D),ir(this,d),k&&(this.O?l="headers="+encodeURIComponent(String(vc(k)))+"&"+l:this.m&&Fi(d,this.m,k)),$i(this.h,A),this.Ua&&ie(d,"TYPE","init"),this.P?(ie(d,"$req",l),ie(d,"SID","null"),A.T=!0,Ni(A,d,null)):Ni(A,d,l),this.G=2}}else this.G==3&&(a?kc(this,a):this.i.length==0||oc(this.h)||kc(this))};function kc(a,l){var d;l?d=l.l:d=a.U++;const m=lt(a.I);ie(m,"SID",a.K),ie(m,"RID",d),ie(m,"AID",a.T),ir(a,m),a.m&&a.o&&Fi(m,a.m,a.o),d=new St(a,a.j,d,a.B+1),a.m===null&&(d.H=a.o),l&&(a.i=l.D.concat(a.i)),l=Rc(a,d,1e3),d.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),$i(a.h,d),Ni(d,m,l)}function ir(a,l){a.H&&re(a.H,function(d,m){ie(l,m,d)}),a.l&&dc({},function(d,m){ie(l,m,d)})}function Rc(a,l,d){d=Math.min(a.i.length,d);var m=a.l?v(a.l.Na,a.l,a):null;e:{var A=a.i;let k=-1;for(;;){const M=["count="+d];k==-1?0<d?(k=A[0].g,M.push("ofs="+k)):k=0:M.push("ofs="+k);let te=!0;for(let ye=0;ye<d;ye++){let Q=A[ye].g;const Ae=A[ye].map;if(Q-=k,0>Q)k=Math.max(0,A[ye].g-100),te=!1;else try{bf(Ae,M,"req"+Q+"_")}catch{m&&m(Ae)}}if(te){m=M.join("&");break e}}}return a=a.i.splice(0,d),l.D=a,m}function Pc(a){if(!a.g&&!a.u){a.Y=1;var l=a.Fa;ct||Fo(),It||(ct(),It=!0),wi.add(l,a),a.v=0}}function Bi(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=Yn(v(a.Fa,a),xc(a,a.v)),a.v++,!0)}n.Fa=function(){if(this.u=null,Cc(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=Yn(v(this.ab,this),a)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Ve(10),is(this),Cc(this))};function ji(a){a.A!=null&&(c.clearTimeout(a.A),a.A=null)}function Cc(a){a.g=new St(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var l=lt(a.qa);ie(l,"RID","rpc"),ie(l,"SID",a.K),ie(l,"AID",a.T),ie(l,"CI",a.F?"0":"1"),!a.F&&a.ja&&ie(l,"TO",a.ja),ie(l,"TYPE","xmlhttp"),ir(a,l),a.m&&a.o&&Fi(l,a.m,a.o),a.L&&(a.g.I=a.L);var d=a.g;a=a.ia,d.L=1,d.v=ts(lt(l)),d.m=null,d.P=!0,rc(d,a)}n.Za=function(){this.C!=null&&(this.C=null,is(this),Bi(this),Ve(19))};function os(a){a.C!=null&&(c.clearTimeout(a.C),a.C=null)}function Dc(a,l){var d=null;if(a.g==l){os(a),ji(a),a.g=null;var m=2}else if(Li(a.h,l))d=l.D,lc(a.h,l),m=1;else return;if(a.G!=0){if(l.o)if(m==1){d=l.m?l.m.length:0,l=Date.now()-l.F;var A=a.B;m=Qr(),Oe(m,new Zo(m,d)),as(a)}else Pc(a);else if(A=l.s,A==3||A==0&&0<l.X||!(m==1&&Af(a,l)||m==2&&Bi(a)))switch(d&&0<d.length&&(l=a.h,l.i=l.i.concat(d)),A){case 1:Qt(a,5);break;case 4:Qt(a,10);break;case 3:Qt(a,6);break;default:Qt(a,2)}}}function xc(a,l){let d=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(d*=2),d*l}function Qt(a,l){if(a.j.info("Error code "+l),l==2){var d=v(a.fb,a),m=a.Xa;const A=!m;m=new Kt(m||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||Zr(m,"https"),ts(m),A?_f(m.toString(),d):vf(m.toString(),d)}else Ve(2);a.G=0,a.l&&a.l.sa(l),Mc(a),Sc(a)}n.fb=function(a){a?(this.j.info("Successfully pinged google.com"),Ve(2)):(this.j.info("Failed to ping google.com"),Ve(1))};function Mc(a){if(a.G=0,a.ka=[],a.l){const l=uc(a.h);(l.length!=0||a.i.length!=0)&&(D(a.ka,l),D(a.ka,a.i),a.h.i.length=0,C(a.i),a.i.length=0),a.l.ra()}}function Nc(a,l,d){var m=d instanceof Kt?lt(d):new Kt(d);if(m.g!="")l&&(m.g=l+"."+m.g),es(m,m.s);else{var A=c.location;m=A.protocol,l=l?l+"."+A.hostname:A.hostname,A=+A.port;var k=new Kt(null);m&&Zr(k,m),l&&(k.g=l),A&&es(k,A),d&&(k.l=d),m=k}return d=a.D,l=a.ya,d&&l&&ie(m,d,l),ie(m,"VER",a.la),ir(a,m),m}function Oc(a,l,d){if(l&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=a.Ca&&!a.pa?new ce(new ns({eb:d})):new ce(a.pa),l.Ha(a.J),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Vc(){}n=Vc.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function cs(){}cs.prototype.g=function(a,l){return new Be(a,l)};function Be(a,l){Ie.call(this),this.g=new Ac(l),this.l=a,this.h=l&&l.messageUrlParams||null,a=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(a?a["X-WebChannel-Content-Type"]=l.messageContentType:a={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(a?a["X-WebChannel-Client-Profile"]=l.va:a={"X-WebChannel-Client-Profile":l.va}),this.g.S=a,(a=l&&l.Sb)&&!F(a)&&(this.g.m=a),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!F(l)&&(this.g.D=l,a=this.h,a!==null&&l in a&&(a=this.h,l in a&&delete a[l])),this.j=new mn(this)}R(Be,Ie),Be.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Be.prototype.close=function(){Ui(this.g)},Be.prototype.o=function(a){var l=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.u&&(d={},d.__data__=Ri(a),a=d);l.i.push(new cf(l.Ya++,a)),l.G==3&&as(l)},Be.prototype.N=function(){this.g.l=null,delete this.j,Ui(this.g),delete this.g,Be.aa.N.call(this)};function Lc(a){Ci.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var l=a.__sm__;if(l){e:{for(const d in l){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,l=l!==null&&a in l?l[a]:void 0),this.data=l}else this.data=a}R(Lc,Ci);function $c(){Di.call(this),this.status=1}R($c,Di);function mn(a){this.g=a}R(mn,Vc),mn.prototype.ua=function(){Oe(this.g,"a")},mn.prototype.ta=function(a){Oe(this.g,new Lc(a))},mn.prototype.sa=function(a){Oe(this.g,new $c)},mn.prototype.ra=function(){Oe(this.g,"b")},cs.prototype.createWebChannel=cs.prototype.g,Be.prototype.send=Be.prototype.o,Be.prototype.open=Be.prototype.m,Be.prototype.close=Be.prototype.close,Mu=function(){return new cs},xu=function(){return Qr()},Du=zt,ua={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Yr.NO_ERROR=0,Yr.TIMEOUT=8,Yr.HTTP_ERROR=6,gs=Yr,ec.COMPLETE="complete",Cu=ec,Qo.EventType=Kn,Kn.OPEN="a",Kn.CLOSE="b",Kn.ERROR="c",Kn.MESSAGE="d",Ie.prototype.listen=Ie.prototype.K,ur=Qo,ce.prototype.listenOnce=ce.prototype.L,ce.prototype.getLastError=ce.prototype.Ka,ce.prototype.getLastErrorCode=ce.prototype.Ba,ce.prototype.getStatus=ce.prototype.Z,ce.prototype.getResponseJson=ce.prototype.Oa,ce.prototype.getResponseText=ce.prototype.oa,ce.prototype.send=ce.prototype.ea,ce.prototype.setWithCredentials=ce.prototype.Ha,Pu=ce}).apply(typeof us<"u"?us:typeof self<"u"?self:typeof window<"u"?window:{});const Jc="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Re{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Re.UNAUTHENTICATED=new Re(null),Re.GOOGLE_CREDENTIALS=new Re("google-credentials-uid"),Re.FIRST_PARTY=new Re("first-party-uid"),Re.MOCK_USER=new Re("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ln="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rn=new Ma("@firebase/firestore");function ar(){return rn.logLevel}function O(n,...e){if(rn.logLevel<=z.DEBUG){const t=e.map(Va);rn.debug(`Firestore (${Ln}): ${n}`,...t)}}function _t(n,...e){if(rn.logLevel<=z.ERROR){const t=e.map(Va);rn.error(`Firestore (${Ln}): ${n}`,...t)}}function Rn(n,...e){if(rn.logLevel<=z.WARN){const t=e.map(Va);rn.warn(`Firestore (${Ln}): ${n}`,...t)}}function Va(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return(function(t){return JSON.stringify(t)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $(n="Unexpected state"){const e=`FIRESTORE (${Ln}) INTERNAL ASSERTION FAILED: `+n;throw _t(e),new Error(e)}function Z(n,e){n||$()}function B(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class N extends Tt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nu{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class lp{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(Re.UNAUTHENTICATED)))}shutdown(){}}class up{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class dp{constructor(e){this.t=e,this.currentUser=Re.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){Z(this.o===void 0);let r=this.i;const s=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let i=new gt;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new gt,e.enqueueRetryable((()=>s(this.currentUser)))};const o=()=>{const u=i;e.enqueueRetryable((async()=>{await u.promise,await s(this.currentUser)}))},c=u=>{O("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit((u=>c(u))),setTimeout((()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(O("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new gt)}}),0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((r=>this.i!==e?(O("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Z(typeof r.accessToken=="string"),new Nu(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Z(e===null||typeof e=="string"),new Re(e)}}class hp{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=Re.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class fp{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new hp(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable((()=>t(Re.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class mp{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class pp{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){Z(this.o===void 0);const r=i=>{i.error!=null&&O("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.R;return this.R=i.token,O("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable((()=>r(i)))};const s=i=>{O("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):O("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(Z(typeof t.token=="string"),this.R=t.token,new mp(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gp(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ou{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const s=gp(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%e.length))}return r}}function Y(n,e){return n<e?-1:n>e?1:0}function Pn(n,e,t){return n.length===e.length&&n.every(((r,s)=>t(r,e[s])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fe{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new N(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new N(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new N(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new N(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return fe.fromMillis(Date.now())}static fromDate(e){return fe.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new fe(t,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?Y(this.nanoseconds,e.nanoseconds):Y(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U{constructor(e){this.timestamp=e}static fromTimestamp(e){return new U(e)}static min(){return new U(new fe(0,0))}static max(){return new U(new fe(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Er{constructor(e,t,r){t===void 0?t=0:t>e.length&&$(),r===void 0?r=e.length-t:r>e.length-t&&$(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return Er.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Er?e.forEach((r=>{t.push(r)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=e.get(s),o=t.get(s);if(i<o)return-1;if(i>o)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class ae extends Er{construct(e,t,r){return new ae(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new N(P.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter((s=>s.length>0)))}return new ae(t)}static emptyPath(){return new ae([])}}const yp=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ve extends Er{construct(e,t,r){return new ve(e,t,r)}static isValidIdentifier(e){return yp.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ve.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new ve(["__name__"])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new N(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new N(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new N(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else c==="`"?(o=!o,s++):c!=="."||o?(r+=c,s++):(i(),s++)}if(i(),o)throw new N(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ve(t)}static emptyPath(){return new ve([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V{constructor(e){this.path=e}static fromPath(e){return new V(ae.fromString(e))}static fromName(e){return new V(ae.fromString(e).popFirst(5))}static empty(){return new V(ae.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ae.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ae.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new V(new ae(e.slice()))}}function _p(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=U.fromTimestamp(r===1e9?new fe(t+1,0):new fe(t,r));return new Ft(s,V.empty(),e)}function vp(n){return new Ft(n.readTime,n.key,-1)}class Ft{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new Ft(U.min(),V.empty(),-1)}static max(){return new Ft(U.max(),V.empty(),-1)}}function wp(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=V.comparator(n.documentKey,e.documentKey),t!==0?t:Y(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bp="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Ep{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Nr(n){if(n.code!==P.FAILED_PRECONDITION||n.message!==bp)throw n;O("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&$(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new x(((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof x?t:x.resolve(t)}catch(t){return x.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):x.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):x.reject(t)}static resolve(e){return new x(((t,r)=>{t(e)}))}static reject(e){return new x(((t,r)=>{r(e)}))}static waitFor(e){return new x(((t,r)=>{let s=0,i=0,o=!1;e.forEach((c=>{++s,c.next((()=>{++i,o&&i===s&&t()}),(u=>r(u)))})),o=!0,i===s&&t()}))}static or(e){let t=x.resolve(!1);for(const r of e)t=t.next((s=>s?x.resolve(s):r()));return t}static forEach(e,t){const r=[];return e.forEach(((s,i)=>{r.push(t.call(this,s,i))})),this.waitFor(r)}static mapArray(e,t){return new x(((r,s)=>{const i=e.length,o=new Array(i);let c=0;for(let u=0;u<i;u++){const h=u;t(e[h]).next((f=>{o[h]=f,++c,c===i&&r(o)}),(f=>s(f)))}}))}static doWhile(e,t){return new x(((r,s)=>{const i=()=>{e()===!0?t().next((()=>{i()}),s):r()};i()}))}}function Tp(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Or(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class La{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ie(r),this.se=r=>t.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}La.oe=-1;function Ks(n){return n==null}function Ps(n){return n===0&&1/n==-1/0}function Ip(n){return typeof n=="number"&&Number.isInteger(n)&&!Ps(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xc(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function cn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Vu(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oe{constructor(e,t){this.comparator=e,this.root=t||_e.EMPTY}insert(e,t){return new oe(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,_e.BLACK,null,null))}remove(e){return new oe(this.comparator,this.root.remove(e,this.comparator).copy(null,null,_e.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,r)=>(e(t,r),!1)))}toString(){const e=[];return this.inorderTraversal(((t,r)=>(e.push(`${t}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new ds(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new ds(this.root,e,this.comparator,!1)}getReverseIterator(){return new ds(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new ds(this.root,e,this.comparator,!0)}}class ds{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class _e{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??_e.RED,this.left=s??_e.EMPTY,this.right=i??_e.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new _e(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return _e.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return _e.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,_e.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,_e.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw $();const e=this.left.check();if(e!==this.right.check())throw $();return e+(this.isRed()?0:1)}}_e.EMPTY=null,_e.RED=!0,_e.BLACK=!1;_e.EMPTY=new class{constructor(){this.size=0}get key(){throw $()}get value(){throw $()}get color(){throw $()}get left(){throw $()}get right(){throw $()}copy(e,t,r,s,i){return this}insert(e,t,r){return new _e(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class be{constructor(e){this.comparator=e,this.data=new oe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,r)=>(e(t),!1)))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Zc(this.data.getIterator())}getIteratorFrom(e){return new Zc(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((r=>{t=t.add(r)})),t}isEqual(e){if(!(e instanceof be)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new be(this.comparator);return t.data=e,t}}class Zc{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qe{constructor(e){this.fields=e,e.sort(ve.comparator)}static empty(){return new qe([])}unionWith(e){let t=new be(ve.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new qe(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Pn(this.fields,e.fields,((t,r)=>t.isEqual(r)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lu extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ee{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Lu("Invalid base64 string: "+i):i}})(e);return new Ee(t)}static fromUint8Array(e){const t=(function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i})(e);return new Ee(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Y(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Ee.EMPTY_BYTE_STRING=new Ee("");const Ap=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Ut(n){if(Z(!!n),typeof n=="string"){let e=0;const t=Ap.exec(n);if(Z(!!t),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:ue(n.seconds),nanos:ue(n.nanos)}}function ue(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function sn(n){return typeof n=="string"?Ee.fromBase64String(n):Ee.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $a(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function Fa(n){const e=n.mapValue.fields.__previous_value__;return $a(e)?Fa(e):e}function Tr(n){const e=Ut(n.mapValue.fields.__local_write_time__.timestampValue);return new fe(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sp{constructor(e,t,r,s,i,o,c,u,h){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=h}}class Ir{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new Ir("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof Ir&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hs={mapValue:{}};function an(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?$a(n)?4:Rp(n)?9007199254740991:kp(n)?10:11:$()}function st(n,e){if(n===e)return!0;const t=an(n);if(t!==an(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Tr(n).isEqual(Tr(e));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=Ut(s.timestampValue),c=Ut(i.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(s,i){return sn(s.bytesValue).isEqual(sn(i.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(s,i){return ue(s.geoPointValue.latitude)===ue(i.geoPointValue.latitude)&&ue(s.geoPointValue.longitude)===ue(i.geoPointValue.longitude)})(n,e);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return ue(s.integerValue)===ue(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=ue(s.doubleValue),c=ue(i.doubleValue);return o===c?Ps(o)===Ps(c):isNaN(o)&&isNaN(c)}return!1})(n,e);case 9:return Pn(n.arrayValue.values||[],e.arrayValue.values||[],st);case 10:case 11:return(function(s,i){const o=s.mapValue.fields||{},c=i.mapValue.fields||{};if(Xc(o)!==Xc(c))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(c[u]===void 0||!st(o[u],c[u])))return!1;return!0})(n,e);default:return $()}}function Ar(n,e){return(n.values||[]).find((t=>st(t,e)))!==void 0}function Cn(n,e){if(n===e)return 0;const t=an(n),r=an(e);if(t!==r)return Y(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return Y(n.booleanValue,e.booleanValue);case 2:return(function(i,o){const c=ue(i.integerValue||i.doubleValue),u=ue(o.integerValue||o.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1})(n,e);case 3:return el(n.timestampValue,e.timestampValue);case 4:return el(Tr(n),Tr(e));case 5:return Y(n.stringValue,e.stringValue);case 6:return(function(i,o){const c=sn(i),u=sn(o);return c.compareTo(u)})(n.bytesValue,e.bytesValue);case 7:return(function(i,o){const c=i.split("/"),u=o.split("/");for(let h=0;h<c.length&&h<u.length;h++){const f=Y(c[h],u[h]);if(f!==0)return f}return Y(c.length,u.length)})(n.referenceValue,e.referenceValue);case 8:return(function(i,o){const c=Y(ue(i.latitude),ue(o.latitude));return c!==0?c:Y(ue(i.longitude),ue(o.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return tl(n.arrayValue,e.arrayValue);case 10:return(function(i,o){var c,u,h,f;const _=i.fields||{},v=o.fields||{},I=(c=_.value)===null||c===void 0?void 0:c.arrayValue,R=(u=v.value)===null||u===void 0?void 0:u.arrayValue,C=Y(((h=I==null?void 0:I.values)===null||h===void 0?void 0:h.length)||0,((f=R==null?void 0:R.values)===null||f===void 0?void 0:f.length)||0);return C!==0?C:tl(I,R)})(n.mapValue,e.mapValue);case 11:return(function(i,o){if(i===hs.mapValue&&o===hs.mapValue)return 0;if(i===hs.mapValue)return 1;if(o===hs.mapValue)return-1;const c=i.fields||{},u=Object.keys(c),h=o.fields||{},f=Object.keys(h);u.sort(),f.sort();for(let _=0;_<u.length&&_<f.length;++_){const v=Y(u[_],f[_]);if(v!==0)return v;const I=Cn(c[u[_]],h[f[_]]);if(I!==0)return I}return Y(u.length,f.length)})(n.mapValue,e.mapValue);default:throw $()}}function el(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return Y(n,e);const t=Ut(n),r=Ut(e),s=Y(t.seconds,r.seconds);return s!==0?s:Y(t.nanos,r.nanos)}function tl(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=Cn(t[s],r[s]);if(i)return i}return Y(t.length,r.length)}function Dn(n){return da(n)}function da(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const r=Ut(t);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return sn(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return V.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=da(i);return r+"]"})(n.arrayValue):"mapValue"in n?(function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${da(t.fields[o])}`;return s+"}"})(n.mapValue):$()}function nl(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function ha(n){return!!n&&"integerValue"in n}function Ua(n){return!!n&&"arrayValue"in n}function rl(n){return!!n&&"nullValue"in n}function sl(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function ys(n){return!!n&&"mapValue"in n}function kp(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function pr(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return cn(n.mapValue.fields,((t,r)=>e.mapValue.fields[t]=pr(r))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=pr(n.arrayValue.values[t]);return e}return Object.assign({},n)}function Rp(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $e{constructor(e){this.value=e}static empty(){return new $e({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!ys(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=pr(t)}setAll(e){let t=ve.emptyPath(),r={},s=[];e.forEach(((o,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,r,s),r={},s=[],t=c.popLast()}o?r[c.lastSegment()]=pr(o):s.push(c.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());ys(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return st(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];ys(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){cn(t,((s,i)=>e[s]=i));for(const s of r)delete e[s]}clone(){return new $e(pr(this.value))}}function $u(n){const e=[];return cn(n.fields,((t,r)=>{const s=new ve([t]);if(ys(r)){const i=$u(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)})),new qe(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe{constructor(e,t,r,s,i,o,c){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=c}static newInvalidDocument(e){return new Pe(e,0,U.min(),U.min(),U.min(),$e.empty(),0)}static newFoundDocument(e,t,r,s){return new Pe(e,1,t,U.min(),r,s,0)}static newNoDocument(e,t){return new Pe(e,2,t,U.min(),U.min(),$e.empty(),0)}static newUnknownDocument(e,t){return new Pe(e,3,t,U.min(),U.min(),$e.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(U.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=$e.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=$e.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=U.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Pe&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Pe(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cs{constructor(e,t){this.position=e,this.inclusive=t}}function il(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],o=n.position[s];if(i.field.isKeyField()?r=V.comparator(V.fromName(o.referenceValue),t.key):r=Cn(o,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function al(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!st(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sr{constructor(e,t="asc"){this.field=e,this.dir=t}}function Pp(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fu{}class he extends Fu{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new Dp(e,t,r):t==="array-contains"?new Np(e,r):t==="in"?new Op(e,r):t==="not-in"?new Vp(e,r):t==="array-contains-any"?new Lp(e,r):new he(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new xp(e,r):new Mp(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Cn(t,this.value)):t!==null&&an(this.value)===an(t)&&this.matchesComparison(Cn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return $()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Ye extends Fu{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new Ye(e,t)}matches(e){return Uu(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Uu(n){return n.op==="and"}function Bu(n){return Cp(n)&&Uu(n)}function Cp(n){for(const e of n.filters)if(e instanceof Ye)return!1;return!0}function fa(n){if(n instanceof he)return n.field.canonicalString()+n.op.toString()+Dn(n.value);if(Bu(n))return n.filters.map((e=>fa(e))).join(",");{const e=n.filters.map((t=>fa(t))).join(",");return`${n.op}(${e})`}}function ju(n,e){return n instanceof he?(function(r,s){return s instanceof he&&r.op===s.op&&r.field.isEqual(s.field)&&st(r.value,s.value)})(n,e):n instanceof Ye?(function(r,s){return s instanceof Ye&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((i,o,c)=>i&&ju(o,s.filters[c])),!0):!1})(n,e):void $()}function qu(n){return n instanceof he?(function(t){return`${t.field.canonicalString()} ${t.op} ${Dn(t.value)}`})(n):n instanceof Ye?(function(t){return t.op.toString()+" {"+t.getFilters().map(qu).join(" ,")+"}"})(n):"Filter"}class Dp extends he{constructor(e,t,r){super(e,t,r),this.key=V.fromName(r.referenceValue)}matches(e){const t=V.comparator(e.key,this.key);return this.matchesComparison(t)}}class xp extends he{constructor(e,t){super(e,"in",t),this.keys=Wu("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class Mp extends he{constructor(e,t){super(e,"not-in",t),this.keys=Wu("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function Wu(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map((r=>V.fromName(r.referenceValue)))}class Np extends he{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Ua(t)&&Ar(t.arrayValue,this.value)}}class Op extends he{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Ar(this.value.arrayValue,t)}}class Vp extends he{constructor(e,t){super(e,"not-in",t)}matches(e){if(Ar(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!Ar(this.value.arrayValue,t)}}class Lp extends he{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Ua(t)||!t.arrayValue.values)&&t.arrayValue.values.some((r=>Ar(this.value.arrayValue,r)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $p{constructor(e,t=null,r=[],s=[],i=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=c,this.ue=null}}function ol(n,e=null,t=[],r=[],s=null,i=null,o=null){return new $p(n,e,t,r,s,i,o)}function Ba(n){const e=B(n);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((r=>fa(r))).join(","),t+="|ob:",t+=e.orderBy.map((r=>(function(i){return i.field.canonicalString()+i.dir})(r))).join(","),Ks(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((r=>Dn(r))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((r=>Dn(r))).join(",")),e.ue=t}return e.ue}function ja(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Pp(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!ju(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!al(n.startAt,e.startAt)&&al(n.endAt,e.endAt)}function ma(n){return V.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $n{constructor(e,t=null,r=[],s=[],i=null,o="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=c,this.endAt=u,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function Fp(n,e,t,r,s,i,o,c){return new $n(n,e,t,r,s,i,o,c)}function qa(n){return new $n(n)}function cl(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Hu(n){return n.collectionGroup!==null}function gr(n){const e=B(n);if(e.ce===null){e.ce=[];const t=new Set;for(const i of e.explicitOrderBy)e.ce.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new be(ve.comparator);return o.filters.forEach((u=>{u.getFlattenedFilters().forEach((h=>{h.isInequality()&&(c=c.add(h.field))}))})),c})(e).forEach((i=>{t.has(i.canonicalString())||i.isKeyField()||e.ce.push(new Sr(i,r))})),t.has(ve.keyField().canonicalString())||e.ce.push(new Sr(ve.keyField(),r))}return e.ce}function Ze(n){const e=B(n);return e.le||(e.le=Up(e,gr(n))),e.le}function Up(n,e){if(n.limitType==="F")return ol(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new Sr(s.field,i)}));const t=n.endAt?new Cs(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Cs(n.startAt.position,n.startAt.inclusive):null;return ol(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function pa(n,e){const t=n.filters.concat([e]);return new $n(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Ds(n,e,t){return new $n(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Qs(n,e){return ja(Ze(n),Ze(e))&&n.limitType===e.limitType}function zu(n){return`${Ba(Ze(n))}|lt:${n.limitType}`}function _n(n){return`Query(target=${(function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map((s=>qu(s))).join(", ")}]`),Ks(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map((s=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(s))).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map((s=>Dn(s))).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map((s=>Dn(s))).join(",")),`Target(${r})`})(Ze(n))}; limitType=${n.limitType})`}function Ys(n,e){return e.isFoundDocument()&&(function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):V.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)})(n,e)&&(function(r,s){for(const i of gr(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(n,e)&&(function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0})(n,e)&&(function(r,s){return!(r.startAt&&!(function(o,c,u){const h=il(o,c,u);return o.inclusive?h<=0:h<0})(r.startAt,gr(r),s)||r.endAt&&!(function(o,c,u){const h=il(o,c,u);return o.inclusive?h>=0:h>0})(r.endAt,gr(r),s))})(n,e)}function Bp(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Gu(n){return(e,t)=>{let r=!1;for(const s of gr(n)){const i=jp(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function jp(n,e,t){const r=n.field.isKeyField()?V.comparator(e.key,t.key):(function(i,o,c){const u=o.data.field(i),h=c.data.field(i);return u!==null&&h!==null?Cn(u,h):$()})(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return $()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){cn(this.inner,((t,r)=>{for(const[s,i]of r)e(s,i)}))}isEmpty(){return Vu(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qp=new oe(V.comparator);function vt(){return qp}const Ku=new oe(V.comparator);function dr(...n){let e=Ku;for(const t of n)e=e.insert(t.key,t);return e}function Qu(n){let e=Ku;return n.forEach(((t,r)=>e=e.insert(t,r.overlayedDocument))),e}function Xt(){return yr()}function Yu(){return yr()}function yr(){return new Fn((n=>n.toString()),((n,e)=>n.isEqual(e)))}const Wp=new oe(V.comparator),Hp=new be(V.comparator);function H(...n){let e=Hp;for(const t of n)e=e.add(t);return e}const zp=new be(Y);function Gp(){return zp}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wa(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Ps(e)?"-0":e}}function Ju(n){return{integerValue:""+n}}function Kp(n,e){return Ip(e)?Ju(e):Wa(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Js{constructor(){this._=void 0}}function Qp(n,e,t){return n instanceof kr?(function(s,i){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&$a(i)&&(i=Fa(i)),i&&(o.fields.__previous_value__=i),{mapValue:o}})(t,e):n instanceof Rr?Zu(n,e):n instanceof Pr?ed(n,e):(function(s,i){const o=Xu(s,i),c=ll(o)+ll(s.Pe);return ha(o)&&ha(s.Pe)?Ju(c):Wa(s.serializer,c)})(n,e)}function Yp(n,e,t){return n instanceof Rr?Zu(n,e):n instanceof Pr?ed(n,e):t}function Xu(n,e){return n instanceof xs?(function(r){return ha(r)||(function(i){return!!i&&"doubleValue"in i})(r)})(e)?e:{integerValue:0}:null}class kr extends Js{}class Rr extends Js{constructor(e){super(),this.elements=e}}function Zu(n,e){const t=td(e);for(const r of n.elements)t.some((s=>st(s,r)))||t.push(r);return{arrayValue:{values:t}}}class Pr extends Js{constructor(e){super(),this.elements=e}}function ed(n,e){let t=td(e);for(const r of n.elements)t=t.filter((s=>!st(s,r)));return{arrayValue:{values:t}}}class xs extends Js{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function ll(n){return ue(n.integerValue||n.doubleValue)}function td(n){return Ua(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jp{constructor(e,t){this.field=e,this.transform=t}}function Xp(n,e){return n.field.isEqual(e.field)&&(function(r,s){return r instanceof Rr&&s instanceof Rr||r instanceof Pr&&s instanceof Pr?Pn(r.elements,s.elements,st):r instanceof xs&&s instanceof xs?st(r.Pe,s.Pe):r instanceof kr&&s instanceof kr})(n.transform,e.transform)}class Zp{constructor(e,t){this.version=e,this.transformResults=t}}class Ke{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Ke}static exists(e){return new Ke(void 0,e)}static updateTime(e){return new Ke(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function _s(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Xs{}function nd(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Ha(n.key,Ke.none()):new Vr(n.key,n.data,Ke.none());{const t=n.data,r=$e.empty();let s=new be(ve.comparator);for(let i of e.fields)if(!s.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new jt(n.key,r,new qe(s.toArray()),Ke.none())}}function eg(n,e,t){n instanceof Vr?(function(s,i,o){const c=s.value.clone(),u=dl(s.fieldTransforms,i,o.transformResults);c.setAll(u),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()})(n,e,t):n instanceof jt?(function(s,i,o){if(!_s(s.precondition,i))return void i.convertToUnknownDocument(o.version);const c=dl(s.fieldTransforms,i,o.transformResults),u=i.data;u.setAll(rd(s)),u.setAll(c),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()})(n,e,t):(function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()})(0,e,t)}function _r(n,e,t,r){return n instanceof Vr?(function(i,o,c,u){if(!_s(i.precondition,o))return c;const h=i.value.clone(),f=hl(i.fieldTransforms,u,o);return h.setAll(f),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null})(n,e,t,r):n instanceof jt?(function(i,o,c,u){if(!_s(i.precondition,o))return c;const h=hl(i.fieldTransforms,u,o),f=o.data;return f.setAll(rd(i)),f.setAll(h),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((_=>_.field)))})(n,e,t,r):(function(i,o,c){return _s(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c})(n,e,t)}function tg(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=Xu(r.transform,s||null);i!=null&&(t===null&&(t=$e.empty()),t.set(r.field,i))}return t||null}function ul(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Pn(r,s,((i,o)=>Xp(i,o)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Vr extends Xs{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class jt extends Xs{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function rd(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}})),e}function dl(n,e,t){const r=new Map;Z(n.length===t.length);for(let s=0;s<t.length;s++){const i=n[s],o=i.transform,c=e.data.field(i.field);r.set(i.field,Yp(o,c,t[s]))}return r}function hl(n,e,t){const r=new Map;for(const s of n){const i=s.transform,o=t.data.field(s.field);r.set(s.field,Qp(i,o,e))}return r}class Ha extends Xs{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class ng extends Xs{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rg{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&eg(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=_r(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=_r(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Yu();return this.mutations.forEach((s=>{const i=e.get(s.key),o=i.overlayedDocument;let c=this.applyToLocalView(o,i.mutatedFields);c=t.has(s.key)?null:c;const u=nd(o,c);u!==null&&r.set(s.key,u),o.isValidDocument()||o.convertToNoDocument(U.min())})),r}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),H())}isEqual(e){return this.batchId===e.batchId&&Pn(this.mutations,e.mutations,((t,r)=>ul(t,r)))&&Pn(this.baseMutations,e.baseMutations,((t,r)=>ul(t,r)))}}class za{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){Z(e.mutations.length===r.length);let s=(function(){return Wp})();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new za(e,t,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sg{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ig{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var de,G;function ag(n){switch(n){default:return $();case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0}}function sd(n){if(n===void 0)return _t("GRPC error has no .code"),P.UNKNOWN;switch(n){case de.OK:return P.OK;case de.CANCELLED:return P.CANCELLED;case de.UNKNOWN:return P.UNKNOWN;case de.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case de.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case de.INTERNAL:return P.INTERNAL;case de.UNAVAILABLE:return P.UNAVAILABLE;case de.UNAUTHENTICATED:return P.UNAUTHENTICATED;case de.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case de.NOT_FOUND:return P.NOT_FOUND;case de.ALREADY_EXISTS:return P.ALREADY_EXISTS;case de.PERMISSION_DENIED:return P.PERMISSION_DENIED;case de.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case de.ABORTED:return P.ABORTED;case de.OUT_OF_RANGE:return P.OUT_OF_RANGE;case de.UNIMPLEMENTED:return P.UNIMPLEMENTED;case de.DATA_LOSS:return P.DATA_LOSS;default:return $()}}(G=de||(de={}))[G.OK=0]="OK",G[G.CANCELLED=1]="CANCELLED",G[G.UNKNOWN=2]="UNKNOWN",G[G.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",G[G.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",G[G.NOT_FOUND=5]="NOT_FOUND",G[G.ALREADY_EXISTS=6]="ALREADY_EXISTS",G[G.PERMISSION_DENIED=7]="PERMISSION_DENIED",G[G.UNAUTHENTICATED=16]="UNAUTHENTICATED",G[G.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",G[G.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",G[G.ABORTED=10]="ABORTED",G[G.OUT_OF_RANGE=11]="OUT_OF_RANGE",G[G.UNIMPLEMENTED=12]="UNIMPLEMENTED",G[G.INTERNAL=13]="INTERNAL",G[G.UNAVAILABLE=14]="UNAVAILABLE",G[G.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function og(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cg=new en([4294967295,4294967295],0);function fl(n){const e=og().encode(n),t=new Ru;return t.update(e),new Uint8Array(t.digest())}function ml(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new en([t,r],0),new en([s,i],0)]}class Ga{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new hr(`Invalid padding: ${t}`);if(r<0)throw new hr(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new hr(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new hr(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=en.fromNumber(this.Ie)}Ee(e,t,r){let s=e.add(t.multiply(en.fromNumber(r)));return s.compare(cg)===1&&(s=new en([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const t=fl(e),[r,s]=ml(t);for(let i=0;i<this.hashCount;i++){const o=this.Ee(r,s,i);if(!this.de(o))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new Ga(i,s,t);return r.forEach((c=>o.insert(c))),o}insert(e){if(this.Ie===0)return;const t=fl(e),[r,s]=ml(t);for(let i=0;i<this.hashCount;i++){const o=this.Ee(r,s,i);this.Ae(o)}}Ae(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class hr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zs{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,Lr.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new Zs(U.min(),s,new oe(Y),vt(),H())}}class Lr{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Lr(r,t,H(),H(),H())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vs{constructor(e,t,r,s){this.Re=e,this.removedTargetIds=t,this.key=r,this.Ve=s}}class id{constructor(e,t){this.targetId=e,this.me=t}}class ad{constructor(e,t,r=Ee.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class pl{constructor(){this.fe=0,this.ge=yl(),this.pe=Ee.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=H(),t=H(),r=H();return this.ge.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:$()}})),new Lr(this.pe,this.ye,e,t,r)}Ce(){this.we=!1,this.ge=yl()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,Z(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class lg{constructor(e){this.Le=e,this.Be=new Map,this.ke=vt(),this.qe=gl(),this.Qe=new oe(Y)}Ke(e){for(const t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(const t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,(t=>{const r=this.Ge(t);switch(e.state){case 0:this.ze(t)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),r.De(e.resumeToken));break;default:$()}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach(((r,s)=>{this.ze(s)&&t(s)}))}He(e){const t=e.targetId,r=e.me.count,s=this.Je(t);if(s){const i=s.target;if(ma(i))if(r===0){const o=new V(i.path);this.Ue(t,o,Pe.newNoDocument(o,U.min()))}else Z(r===1);else{const o=this.Ye(t);if(o!==r){const c=this.Ze(e),u=c?this.Xe(c,e,o):1;if(u!==0){this.je(t);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,h)}}}}}Ze(e){const t=e.me.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let o,c;try{o=sn(r).toUint8Array()}catch(u){if(u instanceof Lu)return Rn("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new Ga(o,s,i)}catch(u){return Rn(u instanceof hr?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.Ie===0?null:c}Xe(e,t,r){return t.me.count===r-this.nt(e,t.targetId)?0:2}nt(e,t){const r=this.Le.getRemoteKeysForTarget(t);let s=0;return r.forEach((i=>{const o=this.Le.tt(),c=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.Ue(t,i,null),s++)})),s}rt(e){const t=new Map;this.Be.forEach(((i,o)=>{const c=this.Je(o);if(c){if(i.current&&ma(c.target)){const u=new V(c.target.path);this.ke.get(u)!==null||this.it(o,u)||this.Ue(o,u,Pe.newNoDocument(u,e))}i.be&&(t.set(o,i.ve()),i.Ce())}}));let r=H();this.qe.forEach(((i,o)=>{let c=!0;o.forEachWhile((u=>{const h=this.Je(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)})),c&&(r=r.add(i))})),this.ke.forEach(((i,o)=>o.setReadTime(e)));const s=new Zs(e,t,this.Qe,this.ke,r);return this.ke=vt(),this.qe=gl(),this.Qe=new oe(Y),s}$e(e,t){if(!this.ze(e))return;const r=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,r),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,r){if(!this.ze(e))return;const s=this.Ge(e);this.it(e,t)?s.Fe(t,1):s.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),r&&(this.ke=this.ke.insert(t,r))}removeTarget(e){this.Be.delete(e)}Ye(e){const t=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new pl,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new be(Y),this.qe=this.qe.insert(e,t)),t}ze(e){const t=this.Je(e)!==null;return t||O("WatchChangeAggregator","Detected inactive target",e),t}Je(e){const t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new pl),this.Le.getRemoteKeysForTarget(e).forEach((t=>{this.Ue(e,t,null)}))}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}}function gl(){return new oe(V.comparator)}function yl(){return new oe(V.comparator)}const ug={asc:"ASCENDING",desc:"DESCENDING"},dg={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},hg={and:"AND",or:"OR"};class fg{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function ga(n,e){return n.useProto3Json||Ks(e)?e:{value:e}}function Ms(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function od(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function mg(n,e){return Ms(n,e.toTimestamp())}function et(n){return Z(!!n),U.fromTimestamp((function(t){const r=Ut(t);return new fe(r.seconds,r.nanos)})(n))}function Ka(n,e){return ya(n,e).canonicalString()}function ya(n,e){const t=(function(s){return new ae(["projects",s.projectId,"databases",s.database])})(n).child("documents");return e===void 0?t:t.child(e)}function cd(n){const e=ae.fromString(n);return Z(fd(e)),e}function _a(n,e){return Ka(n.databaseId,e.path)}function Qi(n,e){const t=cd(e);if(t.get(1)!==n.databaseId.projectId)throw new N(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new N(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new V(ud(t))}function ld(n,e){return Ka(n.databaseId,e)}function pg(n){const e=cd(n);return e.length===4?ae.emptyPath():ud(e)}function va(n){return new ae(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function ud(n){return Z(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function _l(n,e,t){return{name:_a(n,e),fields:t.value.mapValue.fields}}function gg(n,e){let t;if("targetChange"in e){e.targetChange;const r=(function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:$()})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(h,f){return h.useProto3Json?(Z(f===void 0||typeof f=="string"),Ee.fromBase64String(f||"")):(Z(f===void 0||f instanceof Buffer||f instanceof Uint8Array),Ee.fromUint8Array(f||new Uint8Array))})(n,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&(function(h){const f=h.code===void 0?P.UNKNOWN:sd(h.code);return new N(f,h.message||"")})(o);t=new ad(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Qi(n,r.document.name),i=et(r.document.updateTime),o=r.document.createTime?et(r.document.createTime):U.min(),c=new $e({mapValue:{fields:r.document.fields}}),u=Pe.newFoundDocument(s,i,o,c),h=r.targetIds||[],f=r.removedTargetIds||[];t=new vs(h,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Qi(n,r.document),i=r.readTime?et(r.readTime):U.min(),o=Pe.newNoDocument(s,i),c=r.removedTargetIds||[];t=new vs([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Qi(n,r.document),i=r.removedTargetIds||[];t=new vs([],i,s,null)}else{if(!("filter"in e))return $();{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new ig(s,i),c=r.targetId;t=new id(c,o)}}return t}function yg(n,e){let t;if(e instanceof Vr)t={update:_l(n,e.key,e.value)};else if(e instanceof Ha)t={delete:_a(n,e.key)};else if(e instanceof jt)t={update:_l(n,e.key,e.data),updateMask:Sg(e.fieldMask)};else{if(!(e instanceof ng))return $();t={verify:_a(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((r=>(function(i,o){const c=o.transform;if(c instanceof kr)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Rr)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Pr)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof xs)return{fieldPath:o.field.canonicalString(),increment:c.Pe};throw $()})(0,r)))),e.precondition.isNone||(t.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:mg(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:$()})(n,e.precondition)),t}function _g(n,e){return n&&n.length>0?(Z(e!==void 0),n.map((t=>(function(s,i){let o=s.updateTime?et(s.updateTime):et(i);return o.isEqual(U.min())&&(o=et(i)),new Zp(o,s.transformResults||[])})(t,e)))):[]}function vg(n,e){return{documents:[ld(n,e.path)]}}function wg(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=ld(n,s);const i=(function(h){if(h.length!==0)return hd(Ye.create(h,"and"))})(e.filters);i&&(t.structuredQuery.where=i);const o=(function(h){if(h.length!==0)return h.map((f=>(function(v){return{field:vn(v.field),direction:Tg(v.dir)}})(f)))})(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=ga(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=(function(h){return{before:h.inclusive,values:h.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(h){return{before:!h.inclusive,values:h.position}})(e.endAt)),{_t:t,parent:s}}function bg(n){let e=pg(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){Z(r===1);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=(function(_){const v=dd(_);return v instanceof Ye&&Bu(v)?v.getFilters():[v]})(t.where));let o=[];t.orderBy&&(o=(function(_){return _.map((v=>(function(R){return new Sr(wn(R.field),(function(D){switch(D){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(R.direction))})(v)))})(t.orderBy));let c=null;t.limit&&(c=(function(_){let v;return v=typeof _=="object"?_.value:_,Ks(v)?null:v})(t.limit));let u=null;t.startAt&&(u=(function(_){const v=!!_.before,I=_.values||[];return new Cs(I,v)})(t.startAt));let h=null;return t.endAt&&(h=(function(_){const v=!_.before,I=_.values||[];return new Cs(I,v)})(t.endAt)),Fp(e,s,o,i,c,"F",u,h)}function Eg(n,e){const t=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return $()}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function dd(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=wn(t.unaryFilter.field);return he.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=wn(t.unaryFilter.field);return he.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=wn(t.unaryFilter.field);return he.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=wn(t.unaryFilter.field);return he.create(o,"!=",{nullValue:"NULL_VALUE"});default:return $()}})(n):n.fieldFilter!==void 0?(function(t){return he.create(wn(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return $()}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return Ye.create(t.compositeFilter.filters.map((r=>dd(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return $()}})(t.compositeFilter.op))})(n):$()}function Tg(n){return ug[n]}function Ig(n){return dg[n]}function Ag(n){return hg[n]}function vn(n){return{fieldPath:n.canonicalString()}}function wn(n){return ve.fromServerFormat(n.fieldPath)}function hd(n){return n instanceof he?(function(t){if(t.op==="=="){if(sl(t.value))return{unaryFilter:{field:vn(t.field),op:"IS_NAN"}};if(rl(t.value))return{unaryFilter:{field:vn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(sl(t.value))return{unaryFilter:{field:vn(t.field),op:"IS_NOT_NAN"}};if(rl(t.value))return{unaryFilter:{field:vn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:vn(t.field),op:Ig(t.op),value:t.value}}})(n):n instanceof Ye?(function(t){const r=t.getFilters().map((s=>hd(s)));return r.length===1?r[0]:{compositeFilter:{op:Ag(t.op),filters:r}}})(n):$()}function Sg(n){const e=[];return n.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function fd(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt{constructor(e,t,r,s,i=U.min(),o=U.min(),c=Ee.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new Nt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Nt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Nt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Nt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kg{constructor(e){this.ct=e}}function Rg(n){const e=bg({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Ds(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pg{constructor(){this.un=new Cg}addToCollectionParentIndex(e,t){return this.un.add(t),x.resolve()}getCollectionParents(e,t){return x.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return x.resolve()}deleteFieldIndex(e,t){return x.resolve()}deleteAllFieldIndexes(e){return x.resolve()}createTargetIndexes(e,t){return x.resolve()}getDocumentsMatchingTarget(e,t){return x.resolve(null)}getIndexType(e,t){return x.resolve(0)}getFieldIndexes(e,t){return x.resolve([])}getNextCollectionGroupToUpdate(e){return x.resolve(null)}getMinOffset(e,t){return x.resolve(Ft.min())}getMinOffsetFromCollectionGroup(e,t){return x.resolve(Ft.min())}updateCollectionGroup(e,t,r){return x.resolve()}updateIndexEntries(e,t){return x.resolve()}}class Cg{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new be(ae.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new be(ae.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xn{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new xn(0)}static kn(){return new xn(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dg{constructor(){this.changes=new Fn((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Pe.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?x.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xg{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mg{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(r=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(r!==null&&_r(r.mutation,s,qe.empty(),fe.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.getLocalViewOfDocuments(e,r,H()).next((()=>r))))}getLocalViewOfDocuments(e,t,r=H()){const s=Xt();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,r).next((i=>{let o=dr();return i.forEach(((c,u)=>{o=o.insert(c,u.overlayedDocument)})),o}))))}getOverlayedDocuments(e,t){const r=Xt();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,H())))}populateOverlays(e,t,r){const s=[];return r.forEach((i=>{t.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((o,c)=>{t.set(o,c)}))}))}computeViews(e,t,r,s){let i=vt();const o=yr(),c=(function(){return yr()})();return t.forEach(((u,h)=>{const f=r.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof jt)?i=i.insert(h.key,h):f!==void 0?(o.set(h.key,f.mutation.getFieldMask()),_r(f.mutation,h,f.mutation.getFieldMask(),fe.now())):o.set(h.key,qe.empty())})),this.recalculateAndSaveOverlays(e,i).next((u=>(u.forEach(((h,f)=>o.set(h,f))),t.forEach(((h,f)=>{var _;return c.set(h,new xg(f,(_=o.get(h))!==null&&_!==void 0?_:null))})),c)))}recalculateAndSaveOverlays(e,t){const r=yr();let s=new oe(((o,c)=>o-c)),i=H();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((o=>{for(const c of o)c.keys().forEach((u=>{const h=t.get(u);if(h===null)return;let f=r.get(u)||qe.empty();f=c.applyToLocalView(h,f),r.set(u,f);const _=(s.get(c.batchId)||H()).add(u);s=s.insert(c.batchId,_)}))})).next((()=>{const o=[],c=s.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),h=u.key,f=u.value,_=Yu();f.forEach((v=>{if(!i.has(v)){const I=nd(t.get(v),r.get(v));I!==null&&_.set(v,I),i=i.add(v)}})),o.push(this.documentOverlayCache.saveOverlays(e,h,_))}return x.waitFor(o)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,t,r,s){return(function(o){return V.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0})(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Hu(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next((i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):x.resolve(Xt());let c=-1,u=i;return o.next((h=>x.forEach(h,((f,_)=>(c<_.largestBatchId&&(c=_.largestBatchId),i.get(f)?x.resolve():this.remoteDocumentCache.getEntry(e,f).next((v=>{u=u.insert(f,v)}))))).next((()=>this.populateOverlays(e,h,i))).next((()=>this.computeViews(e,u,h,H()))).next((f=>({batchId:c,changes:Qu(f)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new V(t)).next((r=>{let s=dr();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let o=dr();return this.indexManager.getCollectionParents(e,i).next((c=>x.forEach(c,(u=>{const h=(function(_,v){return new $n(v,null,_.explicitOrderBy.slice(),_.filters.slice(),_.limit,_.limitType,_.startAt,_.endAt)})(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,r,s).next((f=>{f.forEach(((_,v)=>{o=o.insert(_,v)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next((o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s)))).next((o=>{i.forEach(((u,h)=>{const f=h.getKey();o.get(f)===null&&(o=o.insert(f,Pe.newInvalidDocument(f)))}));let c=dr();return o.forEach(((u,h)=>{const f=i.get(u);f!==void 0&&_r(f.mutation,h,qe.empty(),fe.now()),Ys(t,h)&&(c=c.insert(u,h))})),c}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ng{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return x.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:et(s.createTime)}})(t)),x.resolve()}getNamedQuery(e,t){return x.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,(function(s){return{name:s.name,query:Rg(s.bundledQuery),readTime:et(s.readTime)}})(t)),x.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Og{constructor(){this.overlays=new oe(V.comparator),this.Ir=new Map}getOverlay(e,t){return x.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Xt();return x.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}saveOverlays(e,t,r){return r.forEach(((s,i)=>{this.ht(e,t,i)})),x.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Ir.get(r);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.Ir.delete(r)),x.resolve()}getOverlaysForCollection(e,t,r){const s=Xt(),i=t.length+1,o=new V(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const u=c.getNext().value,h=u.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return x.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new oe(((h,f)=>h-f));const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>r){let f=i.get(h.largestBatchId);f===null&&(f=Xt(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const c=Xt(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach(((h,f)=>c.set(h,f))),!(c.size()>=s)););return x.resolve(c)}ht(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.Ir.get(s.largestBatchId).delete(r.key);this.Ir.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new sg(t,r));let i=this.Ir.get(t);i===void 0&&(i=H(),this.Ir.set(t,i)),this.Ir.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vg{constructor(){this.sessionToken=Ee.EMPTY_BYTE_STRING}getSessionToken(e){return x.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,x.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qa{constructor(){this.Tr=new be(pe.Er),this.dr=new be(pe.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const r=new pe(e,t);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,t){e.forEach((r=>this.addReference(r,t)))}removeReference(e,t){this.Vr(new pe(e,t))}mr(e,t){e.forEach((r=>this.removeReference(r,t)))}gr(e){const t=new V(new ae([])),r=new pe(t,e),s=new pe(t,e+1),i=[];return this.dr.forEachInRange([r,s],(o=>{this.Vr(o),i.push(o.key)})),i}pr(){this.Tr.forEach((e=>this.Vr(e)))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new V(new ae([])),r=new pe(t,e),s=new pe(t,e+1);let i=H();return this.dr.forEachInRange([r,s],(o=>{i=i.add(o.key)})),i}containsKey(e){const t=new pe(e,0),r=this.Tr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class pe{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return V.comparator(e.key,t.key)||Y(e.wr,t.wr)}static Ar(e,t){return Y(e.wr,t.wr)||V.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lg{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new be(pe.Er)}checkEmpty(e){return x.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new rg(i,t,r,s);this.mutationQueue.push(o);for(const c of s)this.br=this.br.add(new pe(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return x.resolve(o)}lookupMutationBatch(e,t){return x.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.vr(r),i=s<0?0:s;return x.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return x.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return x.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new pe(t,0),s=new pe(t,Number.POSITIVE_INFINITY),i=[];return this.br.forEachInRange([r,s],(o=>{const c=this.Dr(o.wr);i.push(c)})),x.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new be(Y);return t.forEach((s=>{const i=new pe(s,0),o=new pe(s,Number.POSITIVE_INFINITY);this.br.forEachInRange([i,o],(c=>{r=r.add(c.wr)}))})),x.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;V.isDocumentKey(i)||(i=i.child(""));const o=new pe(new V(i),0);let c=new be(Y);return this.br.forEachWhile((u=>{const h=u.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(c=c.add(u.wr)),!0)}),o),x.resolve(this.Cr(c))}Cr(e){const t=[];return e.forEach((r=>{const s=this.Dr(r);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){Z(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return x.forEach(t.mutations,(s=>{const i=new pe(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.br=r}))}On(e){}containsKey(e,t){const r=new pe(t,0),s=this.br.firstAfterOrEqual(r);return x.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,x.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $g{constructor(e){this.Mr=e,this.docs=(function(){return new oe(V.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,o=this.Mr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return x.resolve(r?r.document.mutableCopy():Pe.newInvalidDocument(t))}getEntries(e,t){let r=vt();return t.forEach((s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Pe.newInvalidDocument(s))})),x.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=vt();const o=t.path,c=new V(o.child("")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:h,value:{document:f}}=u.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||wp(vp(f),r)<=0||(s.has(f.key)||Ys(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return x.resolve(i)}getAllFromCollectionGroup(e,t,r,s){$()}Or(e,t){return x.forEach(this.docs,(r=>t(r)))}newChangeBuffer(e){return new Fg(this)}getSize(e){return x.resolve(this.size)}}class Fg extends Dg{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?t.push(this.cr.addEntry(e,s)):this.cr.removeEntry(r)})),x.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ug{constructor(e){this.persistence=e,this.Nr=new Fn((t=>Ba(t)),ja),this.lastRemoteSnapshotVersion=U.min(),this.highestTargetId=0,this.Lr=0,this.Br=new Qa,this.targetCount=0,this.kr=xn.Bn()}forEachTarget(e,t){return this.Nr.forEach(((r,s)=>t(s))),x.resolve()}getLastRemoteSnapshotVersion(e){return x.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return x.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),x.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Lr&&(this.Lr=t),x.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new xn(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,x.resolve()}updateTargetData(e,t){return this.Kn(t),x.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,x.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.Nr.forEach(((o,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.Nr.delete(o),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)})),x.waitFor(i).next((()=>s))}getTargetCount(e){return x.resolve(this.targetCount)}getTargetData(e,t){const r=this.Nr.get(t)||null;return x.resolve(r)}addMatchingKeys(e,t,r){return this.Br.Rr(t,r),x.resolve()}removeMatchingKeys(e,t,r){this.Br.mr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach((o=>{i.push(s.markPotentiallyOrphaned(e,o))})),x.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),x.resolve()}getMatchingKeysForTargetId(e,t){const r=this.Br.yr(t);return x.resolve(r)}containsKey(e,t){return x.resolve(this.Br.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bg{constructor(e,t){this.qr={},this.overlays={},this.Qr=new La(0),this.Kr=!1,this.Kr=!0,this.$r=new Vg,this.referenceDelegate=e(this),this.Ur=new Ug(this),this.indexManager=new Pg,this.remoteDocumentCache=(function(s){return new $g(s)})((r=>this.referenceDelegate.Wr(r))),this.serializer=new kg(t),this.Gr=new Ng(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Og,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.qr[e.toKey()];return r||(r=new Lg(t,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,r){O("MemoryPersistence","Starting transaction:",e);const s=new jg(this.Qr.next());return this.referenceDelegate.zr(),r(s).next((i=>this.referenceDelegate.jr(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Hr(e,t){return x.or(Object.values(this.qr).map((r=>()=>r.containsKey(e,t))))}}class jg extends Ep{constructor(e){super(),this.currentSequenceNumber=e}}class Ya{constructor(e){this.persistence=e,this.Jr=new Qa,this.Yr=null}static Zr(e){return new Ya(e)}get Xr(){if(this.Yr)return this.Yr;throw $()}addReference(e,t,r){return this.Jr.addReference(r,t),this.Xr.delete(r.toString()),x.resolve()}removeReference(e,t,r){return this.Jr.removeReference(r,t),this.Xr.add(r.toString()),x.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),x.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach((s=>this.Xr.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((i=>this.Xr.add(i.toString())))})).next((()=>r.removeTargetData(e,t)))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return x.forEach(this.Xr,(r=>{const s=V.fromPath(r);return this.ei(e,s).next((i=>{i||t.removeEntry(s,U.min())}))})).next((()=>(this.Yr=null,t.apply(e))))}updateLimboDocument(e,t){return this.ei(e,t).next((r=>{r?this.Xr.delete(t.toString()):this.Xr.add(t.toString())}))}Wr(e){return 0}ei(e,t){return x.or([()=>x.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ja{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.$i=r,this.Ui=s}static Wi(e,t){let r=H(),s=H();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Ja(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qg{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wg{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=(function(){return zf()?8:Tp(Ce())>0?6:4})()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.Yi(e,t).next((o=>{i.result=o})).next((()=>{if(!i.result)return this.Zi(e,t,s,r).next((o=>{i.result=o}))})).next((()=>{if(i.result)return;const o=new qg;return this.Xi(e,t,o).next((c=>{if(i.result=c,this.zi)return this.es(e,t,o,c.size)}))})).next((()=>i.result))}es(e,t,r,s){return r.documentReadCount<this.ji?(ar()<=z.DEBUG&&O("QueryEngine","SDK will not create cache indexes for query:",_n(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),x.resolve()):(ar()<=z.DEBUG&&O("QueryEngine","Query:",_n(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Hi*s?(ar()<=z.DEBUG&&O("QueryEngine","The SDK decides to create cache indexes for query:",_n(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Ze(t))):x.resolve())}Yi(e,t){if(cl(t))return x.resolve(null);let r=Ze(t);return this.indexManager.getIndexType(e,r).next((s=>s===0?null:(t.limit!==null&&s===1&&(t=Ds(t,null,"F"),r=Ze(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next((i=>{const o=H(...i);return this.Ji.getDocuments(e,o).next((c=>this.indexManager.getMinOffset(e,r).next((u=>{const h=this.ts(t,c);return this.ns(t,h,o,u.readTime)?this.Yi(e,Ds(t,null,"F")):this.rs(e,h,t,u)}))))})))))}Zi(e,t,r,s){return cl(t)||s.isEqual(U.min())?x.resolve(null):this.Ji.getDocuments(e,r).next((i=>{const o=this.ts(t,i);return this.ns(t,o,r,s)?x.resolve(null):(ar()<=z.DEBUG&&O("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),_n(t)),this.rs(e,o,t,_p(s,-1)).next((c=>c)))}))}ts(e,t){let r=new be(Gu(e));return t.forEach(((s,i)=>{Ys(e,i)&&(r=r.add(i))})),r}ns(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Xi(e,t,r){return ar()<=z.DEBUG&&O("QueryEngine","Using full collection scan to execute query:",_n(t)),this.Ji.getDocumentsMatchingQuery(e,t,Ft.min(),r)}rs(e,t,r,s){return this.Ji.getDocumentsMatchingQuery(e,r,s).next((i=>(t.forEach((o=>{i=i.insert(o.key,o)})),i)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hg{constructor(e,t,r,s){this.persistence=e,this.ss=t,this.serializer=s,this.os=new oe(Y),this._s=new Fn((i=>Ba(i)),ja),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Mg(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.os)))}}function zg(n,e,t,r){return new Hg(n,e,t,r)}async function md(n,e){const t=B(n);return await t.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next((i=>(s=i,t.ls(e),t.mutationQueue.getAllMutationBatches(r)))).next((i=>{const o=[],c=[];let u=H();for(const h of s){o.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}for(const h of i){c.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(r,u).next((h=>({hs:h,removedBatchIds:o,addedBatchIds:c})))}))}))}function Gg(n,e){const t=B(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=e.batch.keys(),i=t.cs.newChangeBuffer({trackRemovals:!0});return(function(c,u,h,f){const _=h.batch,v=_.keys();let I=x.resolve();return v.forEach((R=>{I=I.next((()=>f.getEntry(u,R))).next((C=>{const D=h.docVersions.get(R);Z(D!==null),C.version.compareTo(D)<0&&(_.applyToRemoteDocument(C,h),C.isValidDocument()&&(C.setReadTime(h.commitVersion),f.addEntry(C)))}))})),I.next((()=>c.mutationQueue.removeMutationBatch(u,_)))})(t,r,e,i).next((()=>i.apply(r))).next((()=>t.mutationQueue.performConsistencyCheck(r))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(c){let u=H();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(u=u.add(c.batch.mutations[h].key));return u})(e)))).next((()=>t.localDocuments.getDocuments(r,s)))}))}function pd(n){const e=B(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.Ur.getLastRemoteSnapshotVersion(t)))}function Kg(n,e){const t=B(n),r=e.snapshotVersion;let s=t.os;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const o=t.cs.newChangeBuffer({trackRemovals:!0});s=t.os;const c=[];e.targetChanges.forEach(((f,_)=>{const v=s.get(_);if(!v)return;c.push(t.Ur.removeMatchingKeys(i,f.removedDocuments,_).next((()=>t.Ur.addMatchingKeys(i,f.addedDocuments,_))));let I=v.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(_)!==null?I=I.withResumeToken(Ee.EMPTY_BYTE_STRING,U.min()).withLastLimboFreeSnapshotVersion(U.min()):f.resumeToken.approximateByteSize()>0&&(I=I.withResumeToken(f.resumeToken,r)),s=s.insert(_,I),(function(C,D,q){return C.resumeToken.approximateByteSize()===0||D.snapshotVersion.toMicroseconds()-C.snapshotVersion.toMicroseconds()>=3e8?!0:q.addedDocuments.size+q.modifiedDocuments.size+q.removedDocuments.size>0})(v,I,f)&&c.push(t.Ur.updateTargetData(i,I))}));let u=vt(),h=H();if(e.documentUpdates.forEach((f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))})),c.push(Qg(i,o,e.documentUpdates).next((f=>{u=f.Ps,h=f.Is}))),!r.isEqual(U.min())){const f=t.Ur.getLastRemoteSnapshotVersion(i).next((_=>t.Ur.setTargetsMetadata(i,i.currentSequenceNumber,r)));c.push(f)}return x.waitFor(c).next((()=>o.apply(i))).next((()=>t.localDocuments.getLocalViewOfDocuments(i,u,h))).next((()=>u))})).then((i=>(t.os=s,i)))}function Qg(n,e,t){let r=H(),s=H();return t.forEach((i=>r=r.add(i))),e.getEntries(n,r).next((i=>{let o=vt();return t.forEach(((c,u)=>{const h=i.get(c);u.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(c)),u.isNoDocument()&&u.version.isEqual(U.min())?(e.removeEntry(c,u.readTime),o=o.insert(c,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(u),o=o.insert(c,u)):O("LocalStore","Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",u.version)})),{Ps:o,Is:s}}))}function Yg(n,e){const t=B(n);return t.persistence.runTransaction("Get next mutation batch","readonly",(r=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e))))}function Jg(n,e){const t=B(n);return t.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return t.Ur.getTargetData(r,e).next((i=>i?(s=i,x.resolve(s)):t.Ur.allocateTargetId(r).next((o=>(s=new Nt(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.Ur.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=t.os.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.os=t.os.insert(r.targetId,r),t._s.set(e,r.targetId)),r}))}async function wa(n,e,t){const r=B(n),s=r.os.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,(o=>r.persistence.referenceDelegate.removeTarget(o,s)))}catch(o){if(!Or(o))throw o;O("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.os=r.os.remove(e),r._s.delete(s.target)}function vl(n,e,t){const r=B(n);let s=U.min(),i=H();return r.persistence.runTransaction("Execute query","readwrite",(o=>(function(u,h,f){const _=B(u),v=_._s.get(f);return v!==void 0?x.resolve(_.os.get(v)):_.Ur.getTargetData(h,f)})(r,o,Ze(e)).next((c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(o,c.targetId).next((u=>{i=u}))})).next((()=>r.ss.getDocumentsMatchingQuery(o,e,t?s:U.min(),t?i:H()))).next((c=>(Xg(r,Bp(e),c),{documents:c,Ts:i})))))}function Xg(n,e,t){let r=n.us.get(e)||U.min();t.forEach(((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)})),n.us.set(e,r)}class wl{constructor(){this.activeTargetIds=Gp()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Zg{constructor(){this.so=new wl,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,r){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new wl,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ey{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bl{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){O("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){O("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let fs=null;function Yi(){return fs===null?fs=(function(){return 268435456+Math.round(2147483648*Math.random())})():fs++,"0x"+fs.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ty={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ny{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ke="WebChannelConnection";class ry extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const r=t.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+t.host,this.vo=`projects/${s}/databases/${i}`,this.Co=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${i}`}get Fo(){return!1}Mo(t,r,s,i,o){const c=Yi(),u=this.xo(t,r.toUriEncodedString());O("RestConnection",`Sending RPC '${t}' ${c}:`,u,s);const h={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(h,i,o),this.No(t,u,h,s).then((f=>(O("RestConnection",`Received RPC '${t}' ${c}: `,f),f)),(f=>{throw Rn("RestConnection",`RPC '${t}' ${c} failed with error: `,f,"url: ",u,"request:",s),f}))}Lo(t,r,s,i,o,c){return this.Mo(t,r,s,i,o)}Oo(t,r,s){t["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Ln})(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach(((i,o)=>t[o]=i)),s&&s.headers.forEach(((i,o)=>t[o]=i))}xo(t,r){const s=ty[t];return`${this.Do}/v1/${r}:${s}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,r,s){const i=Yi();return new Promise(((o,c)=>{const u=new Pu;u.setWithCredentials(!0),u.listenOnce(Cu.COMPLETE,(()=>{try{switch(u.getLastErrorCode()){case gs.NO_ERROR:const f=u.getResponseJson();O(ke,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(f)),o(f);break;case gs.TIMEOUT:O(ke,`RPC '${e}' ${i} timed out`),c(new N(P.DEADLINE_EXCEEDED,"Request time out"));break;case gs.HTTP_ERROR:const _=u.getStatus();if(O(ke,`RPC '${e}' ${i} failed with status:`,_,"response text:",u.getResponseText()),_>0){let v=u.getResponseJson();Array.isArray(v)&&(v=v[0]);const I=v==null?void 0:v.error;if(I&&I.status&&I.message){const R=(function(D){const q=D.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(q)>=0?q:P.UNKNOWN})(I.status);c(new N(R,I.message))}else c(new N(P.UNKNOWN,"Server responded with status "+u.getStatus()))}else c(new N(P.UNAVAILABLE,"Connection failed."));break;default:$()}}finally{O(ke,`RPC '${e}' ${i} completed.`)}}));const h=JSON.stringify(s);O(ke,`RPC '${e}' ${i} sending request:`,s),u.send(t,"POST",h,r,15)}))}Bo(e,t,r){const s=Yi(),i=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=Mu(),c=xu(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(u.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Oo(u.initMessageHeaders,t,r),u.encodeInitMessageHeaders=!0;const f=i.join("");O(ke,`Creating RPC '${e}' stream ${s}: ${f}`,u);const _=o.createWebChannel(f,u);let v=!1,I=!1;const R=new ny({Io:D=>{I?O(ke,`Not sending because RPC '${e}' stream ${s} is closed:`,D):(v||(O(ke,`Opening RPC '${e}' stream ${s} transport.`),_.open(),v=!0),O(ke,`RPC '${e}' stream ${s} sending:`,D),_.send(D))},To:()=>_.close()}),C=(D,q,F)=>{D.listen(q,(W=>{try{F(W)}catch(J){setTimeout((()=>{throw J}),0)}}))};return C(_,ur.EventType.OPEN,(()=>{I||(O(ke,`RPC '${e}' stream ${s} transport opened.`),R.yo())})),C(_,ur.EventType.CLOSE,(()=>{I||(I=!0,O(ke,`RPC '${e}' stream ${s} transport closed`),R.So())})),C(_,ur.EventType.ERROR,(D=>{I||(I=!0,Rn(ke,`RPC '${e}' stream ${s} transport errored:`,D),R.So(new N(P.UNAVAILABLE,"The operation could not be completed")))})),C(_,ur.EventType.MESSAGE,(D=>{var q;if(!I){const F=D.data[0];Z(!!F);const W=F,J=W.error||((q=W[0])===null||q===void 0?void 0:q.error);if(J){O(ke,`RPC '${e}' stream ${s} received error:`,J);const ge=J.status;let re=(function(w){const b=de[w];if(b!==void 0)return sd(b)})(ge),T=J.message;re===void 0&&(re=P.INTERNAL,T="Unknown error status: "+ge+" with message "+J.message),I=!0,R.So(new N(re,T)),_.close()}else O(ke,`RPC '${e}' stream ${s} received:`,F),R.bo(F)}})),C(c,Du.STAT_EVENT,(D=>{D.stat===ua.PROXY?O(ke,`RPC '${e}' stream ${s} detected buffering proxy`):D.stat===ua.NOPROXY&&O(ke,`RPC '${e}' stream ${s} detected no buffering proxy`)})),setTimeout((()=>{R.wo()}),0),R}}function Ji(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ei(n){return new fg(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gd{constructor(e,t,r=1e3,s=1.5,i=6e4){this.ui=e,this.timerId=t,this.ko=r,this.qo=s,this.Qo=i,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),s=Math.max(0,t-r);s>0&&O("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,(()=>(this.Uo=Date.now(),e()))),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yd{constructor(e,t,r,s,i,o,c,u){this.ui=e,this.Ho=r,this.Jo=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new gd(e,t)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,(()=>this.__())))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():t&&t.code===P.RESOURCE_EXHAUSTED?(_t(t.toString()),_t("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.Yo===t&&this.P_(r,s)}),(r=>{e((()=>{const s=new N(P.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(s)}))}))}P_(e,t){const r=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo((()=>{r((()=>this.listener.Eo()))})),this.stream.Ro((()=>{r((()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,(()=>(this.r_()&&(this.state=3),Promise.resolve()))),this.listener.Ro())))})),this.stream.mo((s=>{r((()=>this.I_(s)))})),this.stream.onMessage((s=>{r((()=>++this.e_==1?this.E_(s):this.onNext(s)))}))}i_(){this.state=5,this.t_.Go((async()=>{this.state=0,this.start()}))}I_(e){return O("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget((()=>this.Yo===e?t():(O("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class sy extends yd{constructor(e,t,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}T_(e,t){return this.connection.Bo("Listen",e,t)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const t=gg(this.serializer,e),r=(function(i){if(!("targetChange"in i))return U.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?U.min():o.readTime?et(o.readTime):U.min()})(e);return this.listener.d_(t,r)}A_(e){const t={};t.database=va(this.serializer),t.addTarget=(function(i,o){let c;const u=o.target;if(c=ma(u)?{documents:vg(i,u)}:{query:wg(i,u)._t},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=od(i,o.resumeToken);const h=ga(i,o.expectedCount);h!==null&&(c.expectedCount=h)}else if(o.snapshotVersion.compareTo(U.min())>0){c.readTime=Ms(i,o.snapshotVersion.toTimestamp());const h=ga(i,o.expectedCount);h!==null&&(c.expectedCount=h)}return c})(this.serializer,e);const r=Eg(this.serializer,e);r&&(t.labels=r),this.a_(t)}R_(e){const t={};t.database=va(this.serializer),t.removeTarget=e,this.a_(t)}}class iy extends yd{constructor(e,t,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,t){return this.connection.Bo("Write",e,t)}E_(e){return Z(!!e.streamToken),this.lastStreamToken=e.streamToken,Z(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){Z(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const t=_g(e.writeResults,e.commitTime),r=et(e.commitTime);return this.listener.g_(r,t)}p_(){const e={};e.database=va(this.serializer),this.a_(e)}m_(e){const t={streamToken:this.lastStreamToken,writes:e.map((r=>yg(this.serializer,r)))};this.a_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ay extends class{}{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.y_=!1}w_(){if(this.y_)throw new N(P.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,r,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,o])=>this.connection.Mo(e,ya(t,r),s,i,o))).catch((i=>{throw i.name==="FirebaseError"?(i.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new N(P.UNKNOWN,i.toString())}))}Lo(e,t,r,s,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,c])=>this.connection.Lo(e,ya(t,r),s,o,c,i))).catch((o=>{throw o.name==="FirebaseError"?(o.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new N(P.UNKNOWN,o.toString())}))}terminate(){this.y_=!0,this.connection.terminate()}}class oy{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve()))))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(_t(t),this.D_=!1):O("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cy{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=i,this.k_._o((o=>{r.enqueueAndForget((async()=>{ln(this)&&(O("RemoteStore","Restarting streams for network reachability change."),await(async function(u){const h=B(u);h.L_.add(4),await $r(h),h.q_.set("Unknown"),h.L_.delete(4),await ti(h)})(this))}))})),this.q_=new oy(r,s)}}async function ti(n){if(ln(n))for(const e of n.B_)await e(!0)}async function $r(n){for(const e of n.B_)await e(!1)}function _d(n,e){const t=B(n);t.N_.has(e.targetId)||(t.N_.set(e.targetId,e),to(t)?eo(t):Un(t).r_()&&Za(t,e))}function Xa(n,e){const t=B(n),r=Un(t);t.N_.delete(e),r.r_()&&vd(t,e),t.N_.size===0&&(r.r_()?r.o_():ln(t)&&t.q_.set("Unknown"))}function Za(n,e){if(n.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(U.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Un(n).A_(e)}function vd(n,e){n.Q_.xe(e),Un(n).R_(e)}function eo(n){n.Q_=new lg({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>n.N_.get(e)||null,tt:()=>n.datastore.serializer.databaseId}),Un(n).start(),n.q_.v_()}function to(n){return ln(n)&&!Un(n).n_()&&n.N_.size>0}function ln(n){return B(n).L_.size===0}function wd(n){n.Q_=void 0}async function ly(n){n.q_.set("Online")}async function uy(n){n.N_.forEach(((e,t)=>{Za(n,e)}))}async function dy(n,e){wd(n),to(n)?(n.q_.M_(e),eo(n)):n.q_.set("Unknown")}async function hy(n,e,t){if(n.q_.set("Online"),e instanceof ad&&e.state===2&&e.cause)try{await(async function(s,i){const o=i.cause;for(const c of i.targetIds)s.N_.has(c)&&(await s.remoteSyncer.rejectListen(c,o),s.N_.delete(c),s.Q_.removeTarget(c))})(n,e)}catch(r){O("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Ns(n,r)}else if(e instanceof vs?n.Q_.Ke(e):e instanceof id?n.Q_.He(e):n.Q_.We(e),!t.isEqual(U.min()))try{const r=await pd(n.localStore);t.compareTo(r)>=0&&await(function(i,o){const c=i.Q_.rt(o);return c.targetChanges.forEach(((u,h)=>{if(u.resumeToken.approximateByteSize()>0){const f=i.N_.get(h);f&&i.N_.set(h,f.withResumeToken(u.resumeToken,o))}})),c.targetMismatches.forEach(((u,h)=>{const f=i.N_.get(u);if(!f)return;i.N_.set(u,f.withResumeToken(Ee.EMPTY_BYTE_STRING,f.snapshotVersion)),vd(i,u);const _=new Nt(f.target,u,h,f.sequenceNumber);Za(i,_)})),i.remoteSyncer.applyRemoteEvent(c)})(n,t)}catch(r){O("RemoteStore","Failed to raise snapshot:",r),await Ns(n,r)}}async function Ns(n,e,t){if(!Or(e))throw e;n.L_.add(1),await $r(n),n.q_.set("Offline"),t||(t=()=>pd(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{O("RemoteStore","Retrying IndexedDB access"),await t(),n.L_.delete(1),await ti(n)}))}function bd(n,e){return e().catch((t=>Ns(n,t,e)))}async function ni(n){const e=B(n),t=Bt(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;fy(e);)try{const s=await Yg(e.localStore,r);if(s===null){e.O_.length===0&&t.o_();break}r=s.batchId,my(e,s)}catch(s){await Ns(e,s)}Ed(e)&&Td(e)}function fy(n){return ln(n)&&n.O_.length<10}function my(n,e){n.O_.push(e);const t=Bt(n);t.r_()&&t.V_&&t.m_(e.mutations)}function Ed(n){return ln(n)&&!Bt(n).n_()&&n.O_.length>0}function Td(n){Bt(n).start()}async function py(n){Bt(n).p_()}async function gy(n){const e=Bt(n);for(const t of n.O_)e.m_(t.mutations)}async function yy(n,e,t){const r=n.O_.shift(),s=za.from(r,e,t);await bd(n,(()=>n.remoteSyncer.applySuccessfulWrite(s))),await ni(n)}async function _y(n,e){e&&Bt(n).V_&&await(async function(r,s){if((function(o){return ag(o)&&o!==P.ABORTED})(s.code)){const i=r.O_.shift();Bt(r).s_(),await bd(r,(()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s))),await ni(r)}})(n,e),Ed(n)&&Td(n)}async function El(n,e){const t=B(n);t.asyncQueue.verifyOperationInProgress(),O("RemoteStore","RemoteStore received new credentials");const r=ln(t);t.L_.add(3),await $r(t),r&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await ti(t)}async function vy(n,e){const t=B(n);e?(t.L_.delete(2),await ti(t)):e||(t.L_.add(2),await $r(t),t.q_.set("Unknown"))}function Un(n){return n.K_||(n.K_=(function(t,r,s){const i=B(t);return i.w_(),new sy(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Eo:ly.bind(null,n),Ro:uy.bind(null,n),mo:dy.bind(null,n),d_:hy.bind(null,n)}),n.B_.push((async e=>{e?(n.K_.s_(),to(n)?eo(n):n.q_.set("Unknown")):(await n.K_.stop(),wd(n))}))),n.K_}function Bt(n){return n.U_||(n.U_=(function(t,r,s){const i=B(t);return i.w_(),new iy(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Eo:()=>Promise.resolve(),Ro:py.bind(null,n),mo:_y.bind(null,n),f_:gy.bind(null,n),g_:yy.bind(null,n)}),n.B_.push((async e=>{e?(n.U_.s_(),await ni(n)):(await n.U_.stop(),n.O_.length>0&&(O("RemoteStore",`Stopping write stream with ${n.O_.length} pending writes`),n.O_=[]))}))),n.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class no{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new gt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const o=Date.now()+r,c=new no(e,t,o,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new N(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function ro(n,e){if(_t("AsyncQueue",`${e}: ${n}`),Or(n))return new N(P.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class En{constructor(e){this.comparator=e?(t,r)=>e(t,r)||V.comparator(t.key,r.key):(t,r)=>V.comparator(t.key,r.key),this.keyedMap=dr(),this.sortedSet=new oe(this.comparator)}static emptySet(e){return new En(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,r)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof En)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new En;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tl{constructor(){this.W_=new oe(V.comparator)}track(e){const t=e.doc.key,r=this.W_.get(t);r?e.type!==0&&r.type===3?this.W_=this.W_.insert(t,e):e.type===3&&r.type!==1?this.W_=this.W_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.W_=this.W_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.W_=this.W_.remove(t):e.type===1&&r.type===2?this.W_=this.W_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):$():this.W_=this.W_.insert(t,e)}G_(){const e=[];return this.W_.inorderTraversal(((t,r)=>{e.push(r)})),e}}class Mn{constructor(e,t,r,s,i,o,c,u,h){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(e,t,r,s,i){const o=[];return t.forEach((c=>{o.push({type:0,doc:c})})),new Mn(e,t,En.emptySet(t),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Qs(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wy{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some((e=>e.J_()))}}class by{constructor(){this.queries=Il(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,r){const s=B(t),i=s.queries;s.queries=Il(),i.forEach(((o,c)=>{for(const u of c.j_)u.onError(r)}))})(this,new N(P.ABORTED,"Firestore shutting down"))}}function Il(){return new Fn((n=>zu(n)),Qs)}async function Id(n,e){const t=B(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.H_()&&e.J_()&&(r=2):(i=new wy,r=e.J_()?0:1);try{switch(r){case 0:i.z_=await t.onListen(s,!0);break;case 1:i.z_=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const c=ro(o,`Initialization of query '${_n(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.j_.push(e),e.Z_(t.onlineState),i.z_&&e.X_(i.z_)&&so(t)}async function Ad(n,e){const t=B(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const o=i.j_.indexOf(e);o>=0&&(i.j_.splice(o,1),i.j_.length===0?s=e.J_()?0:1:!i.H_()&&e.J_()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function Ey(n,e){const t=B(n);let r=!1;for(const s of e){const i=s.query,o=t.queries.get(i);if(o){for(const c of o.j_)c.X_(s)&&(r=!0);o.z_=s}}r&&so(t)}function Ty(n,e,t){const r=B(n),s=r.queries.get(e);if(s)for(const i of s.j_)i.onError(t);r.queries.delete(e)}function so(n){n.Y_.forEach((e=>{e.next()}))}var ba,Al;(Al=ba||(ba={})).ea="default",Al.Cache="cache";class Sd{constructor(e,t,r){this.query=e,this.ta=t,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new Mn(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.na?this.ia(e)&&(this.ta.next(e),t=!0):this.sa(e,this.onlineState)&&(this.oa(e),t=!0),this.ra=e,t}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let t=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),t=!0),t}sa(e,t){if(!e.fromCache||!this.J_())return!0;const r=t!=="Offline";return(!this.options._a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const t=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}oa(e){e=Mn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==ba.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kd{constructor(e){this.key=e}}class Rd{constructor(e){this.key=e}}class Iy{constructor(e,t){this.query=e,this.Ta=t,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=H(),this.mutatedKeys=H(),this.Aa=Gu(e),this.Ra=new En(this.Aa)}get Va(){return this.Ta}ma(e,t){const r=t?t.fa:new Tl,s=t?t.Ra:this.Ra;let i=t?t.mutatedKeys:this.mutatedKeys,o=s,c=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal(((f,_)=>{const v=s.get(f),I=Ys(this.query,_)?_:null,R=!!v&&this.mutatedKeys.has(v.key),C=!!I&&(I.hasLocalMutations||this.mutatedKeys.has(I.key)&&I.hasCommittedMutations);let D=!1;v&&I?v.data.isEqual(I.data)?R!==C&&(r.track({type:3,doc:I}),D=!0):this.ga(v,I)||(r.track({type:2,doc:I}),D=!0,(u&&this.Aa(I,u)>0||h&&this.Aa(I,h)<0)&&(c=!0)):!v&&I?(r.track({type:0,doc:I}),D=!0):v&&!I&&(r.track({type:1,doc:v}),D=!0,(u||h)&&(c=!0)),D&&(I?(o=o.add(I),i=C?i.add(f):i.delete(f)):(o=o.delete(f),i=i.delete(f)))})),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),i=i.delete(f.key),r.track({type:1,doc:f})}return{Ra:o,fa:r,ns:c,mutatedKeys:i}}ga(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const o=e.fa.G_();o.sort(((f,_)=>(function(I,R){const C=D=>{switch(D){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return $()}};return C(I)-C(R)})(f.type,_.type)||this.Aa(f.doc,_.doc))),this.pa(r),s=s!=null&&s;const c=t&&!s?this.ya():[],u=this.da.size===0&&this.current&&!s?1:0,h=u!==this.Ea;return this.Ea=u,o.length!==0||h?{snapshot:new Mn(this.query,e.Ra,i,o,e.mutatedKeys,u===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:c}:{wa:c}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new Tl,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach((t=>this.Ta=this.Ta.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Ta=this.Ta.delete(t))),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=H(),this.Ra.forEach((r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))}));const t=[];return e.forEach((r=>{this.da.has(r)||t.push(new Rd(r))})),this.da.forEach((r=>{e.has(r)||t.push(new kd(r))})),t}ba(e){this.Ta=e.Ts,this.da=H();const t=this.ma(e.documents);return this.applyChanges(t,!0)}Da(){return Mn.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class Ay{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class Sy{constructor(e){this.key=e,this.va=!1}}class ky{constructor(e,t,r,s,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Ca={},this.Fa=new Fn((c=>zu(c)),Qs),this.Ma=new Map,this.xa=new Set,this.Oa=new oe(V.comparator),this.Na=new Map,this.La=new Qa,this.Ba={},this.ka=new Map,this.qa=xn.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function Ry(n,e,t=!0){const r=Nd(n);let s;const i=r.Fa.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Da()):s=await Pd(r,e,t,!0),s}async function Py(n,e){const t=Nd(n);await Pd(t,e,!0,!1)}async function Pd(n,e,t,r){const s=await Jg(n.localStore,Ze(e)),i=s.targetId,o=n.sharedClientState.addLocalQueryTarget(i,t);let c;return r&&(c=await Cy(n,e,i,o==="current",s.resumeToken)),n.isPrimaryClient&&t&&_d(n.remoteStore,s),c}async function Cy(n,e,t,r,s){n.Ka=(_,v,I)=>(async function(C,D,q,F){let W=D.view.ma(q);W.ns&&(W=await vl(C.localStore,D.query,!1).then((({documents:T})=>D.view.ma(T,W))));const J=F&&F.targetChanges.get(D.targetId),ge=F&&F.targetMismatches.get(D.targetId)!=null,re=D.view.applyChanges(W,C.isPrimaryClient,J,ge);return kl(C,D.targetId,re.wa),re.snapshot})(n,_,v,I);const i=await vl(n.localStore,e,!0),o=new Iy(e,i.Ts),c=o.ma(i.documents),u=Lr.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),h=o.applyChanges(c,n.isPrimaryClient,u);kl(n,t,h.wa);const f=new Ay(e,t,o);return n.Fa.set(e,f),n.Ma.has(t)?n.Ma.get(t).push(e):n.Ma.set(t,[e]),h.snapshot}async function Dy(n,e,t){const r=B(n),s=r.Fa.get(e),i=r.Ma.get(s.targetId);if(i.length>1)return r.Ma.set(s.targetId,i.filter((o=>!Qs(o,e)))),void r.Fa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await wa(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),t&&Xa(r.remoteStore,s.targetId),Ea(r,s.targetId)})).catch(Nr)):(Ea(r,s.targetId),await wa(r.localStore,s.targetId,!0))}async function xy(n,e){const t=B(n),r=t.Fa.get(e),s=t.Ma.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),Xa(t.remoteStore,r.targetId))}async function My(n,e,t){const r=Uy(n);try{const s=await(function(o,c){const u=B(o),h=fe.now(),f=c.reduce(((I,R)=>I.add(R.key)),H());let _,v;return u.persistence.runTransaction("Locally write mutations","readwrite",(I=>{let R=vt(),C=H();return u.cs.getEntries(I,f).next((D=>{R=D,R.forEach(((q,F)=>{F.isValidDocument()||(C=C.add(q))}))})).next((()=>u.localDocuments.getOverlayedDocuments(I,R))).next((D=>{_=D;const q=[];for(const F of c){const W=tg(F,_.get(F.key).overlayedDocument);W!=null&&q.push(new jt(F.key,W,$u(W.value.mapValue),Ke.exists(!0)))}return u.mutationQueue.addMutationBatch(I,h,q,c)})).next((D=>{v=D;const q=D.applyToLocalDocumentSet(_,C);return u.documentOverlayCache.saveOverlays(I,D.batchId,q)}))})).then((()=>({batchId:v.batchId,changes:Qu(_)})))})(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),(function(o,c,u){let h=o.Ba[o.currentUser.toKey()];h||(h=new oe(Y)),h=h.insert(c,u),o.Ba[o.currentUser.toKey()]=h})(r,s.batchId,t),await Fr(r,s.changes),await ni(r.remoteStore)}catch(s){const i=ro(s,"Failed to persist write");t.reject(i)}}async function Cd(n,e){const t=B(n);try{const r=await Kg(t.localStore,e);e.targetChanges.forEach(((s,i)=>{const o=t.Na.get(i);o&&(Z(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?o.va=!0:s.modifiedDocuments.size>0?Z(o.va):s.removedDocuments.size>0&&(Z(o.va),o.va=!1))})),await Fr(t,r,e)}catch(r){await Nr(r)}}function Sl(n,e,t){const r=B(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Fa.forEach(((i,o)=>{const c=o.view.Z_(e);c.snapshot&&s.push(c.snapshot)})),(function(o,c){const u=B(o);u.onlineState=c;let h=!1;u.queries.forEach(((f,_)=>{for(const v of _.j_)v.Z_(c)&&(h=!0)})),h&&so(u)})(r.eventManager,e),s.length&&r.Ca.d_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Ny(n,e,t){const r=B(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Na.get(e),i=s&&s.key;if(i){let o=new oe(V.comparator);o=o.insert(i,Pe.newNoDocument(i,U.min()));const c=H().add(i),u=new Zs(U.min(),new Map,new oe(Y),o,c);await Cd(r,u),r.Oa=r.Oa.remove(i),r.Na.delete(e),io(r)}else await wa(r.localStore,e,!1).then((()=>Ea(r,e,t))).catch(Nr)}async function Oy(n,e){const t=B(n),r=e.batch.batchId;try{const s=await Gg(t.localStore,e);xd(t,r,null),Dd(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Fr(t,s)}catch(s){await Nr(s)}}async function Vy(n,e,t){const r=B(n);try{const s=await(function(o,c){const u=B(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",(h=>{let f;return u.mutationQueue.lookupMutationBatch(h,c).next((_=>(Z(_!==null),f=_.keys(),u.mutationQueue.removeMutationBatch(h,_)))).next((()=>u.mutationQueue.performConsistencyCheck(h))).next((()=>u.documentOverlayCache.removeOverlaysForBatchId(h,f,c))).next((()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f))).next((()=>u.localDocuments.getDocuments(h,f)))}))})(r.localStore,e);xd(r,e,t),Dd(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Fr(r,s)}catch(s){await Nr(s)}}function Dd(n,e){(n.ka.get(e)||[]).forEach((t=>{t.resolve()})),n.ka.delete(e)}function xd(n,e,t){const r=B(n);let s=r.Ba[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.Ba[r.currentUser.toKey()]=s}}function Ea(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Ma.get(e))n.Fa.delete(r),t&&n.Ca.$a(r,t);n.Ma.delete(e),n.isPrimaryClient&&n.La.gr(e).forEach((r=>{n.La.containsKey(r)||Md(n,r)}))}function Md(n,e){n.xa.delete(e.path.canonicalString());const t=n.Oa.get(e);t!==null&&(Xa(n.remoteStore,t),n.Oa=n.Oa.remove(e),n.Na.delete(t),io(n))}function kl(n,e,t){for(const r of t)r instanceof kd?(n.La.addReference(r.key,e),Ly(n,r)):r instanceof Rd?(O("SyncEngine","Document no longer in limbo: "+r.key),n.La.removeReference(r.key,e),n.La.containsKey(r.key)||Md(n,r.key)):$()}function Ly(n,e){const t=e.key,r=t.path.canonicalString();n.Oa.get(t)||n.xa.has(r)||(O("SyncEngine","New document in limbo: "+t),n.xa.add(r),io(n))}function io(n){for(;n.xa.size>0&&n.Oa.size<n.maxConcurrentLimboResolutions;){const e=n.xa.values().next().value;n.xa.delete(e);const t=new V(ae.fromString(e)),r=n.qa.next();n.Na.set(r,new Sy(t)),n.Oa=n.Oa.insert(t,r),_d(n.remoteStore,new Nt(Ze(qa(t.path)),r,"TargetPurposeLimboResolution",La.oe))}}async function Fr(n,e,t){const r=B(n),s=[],i=[],o=[];r.Fa.isEmpty()||(r.Fa.forEach(((c,u)=>{o.push(r.Ka(u,e,t).then((h=>{var f;if((h||t)&&r.isPrimaryClient){const _=h?!h.fromCache:(f=t==null?void 0:t.targetChanges.get(u.targetId))===null||f===void 0?void 0:f.current;r.sharedClientState.updateQueryState(u.targetId,_?"current":"not-current")}if(h){s.push(h);const _=Ja.Wi(u.targetId,h);i.push(_)}})))})),await Promise.all(o),r.Ca.d_(s),await(async function(u,h){const f=B(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",(_=>x.forEach(h,(v=>x.forEach(v.$i,(I=>f.persistence.referenceDelegate.addReference(_,v.targetId,I))).next((()=>x.forEach(v.Ui,(I=>f.persistence.referenceDelegate.removeReference(_,v.targetId,I)))))))))}catch(_){if(!Or(_))throw _;O("LocalStore","Failed to update sequence numbers: "+_)}for(const _ of h){const v=_.targetId;if(!_.fromCache){const I=f.os.get(v),R=I.snapshotVersion,C=I.withLastLimboFreeSnapshotVersion(R);f.os=f.os.insert(v,C)}}})(r.localStore,i))}async function $y(n,e){const t=B(n);if(!t.currentUser.isEqual(e)){O("SyncEngine","User change. New user:",e.toKey());const r=await md(t.localStore,e);t.currentUser=e,(function(i,o){i.ka.forEach((c=>{c.forEach((u=>{u.reject(new N(P.CANCELLED,o))}))})),i.ka.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Fr(t,r.hs)}}function Fy(n,e){const t=B(n),r=t.Na.get(e);if(r&&r.va)return H().add(r.key);{let s=H();const i=t.Ma.get(e);if(!i)return s;for(const o of i){const c=t.Fa.get(o);s=s.unionWith(c.view.Va)}return s}}function Nd(n){const e=B(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Cd.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Fy.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Ny.bind(null,e),e.Ca.d_=Ey.bind(null,e.eventManager),e.Ca.$a=Ty.bind(null,e.eventManager),e}function Uy(n){const e=B(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Oy.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Vy.bind(null,e),e}class Os{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=ei(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return zg(this.persistence,new Wg,e.initialUser,this.serializer)}Ga(e){return new Bg(Ya.Zr,this.serializer)}Wa(e){return new Zg}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Os.provider={build:()=>new Os};class Ta{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Sl(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=$y.bind(null,this.syncEngine),await vy(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new by})()}createDatastore(e){const t=ei(e.databaseInfo.databaseId),r=(function(i){return new ry(i)})(e.databaseInfo);return(function(i,o,c,u){return new ay(i,o,c,u)})(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return(function(r,s,i,o,c){return new cy(r,s,i,o,c)})(this.localStore,this.datastore,e.asyncQueue,(t=>Sl(this.syncEngine,t,0)),(function(){return bl.D()?new bl:new ey})())}createSyncEngine(e,t){return(function(s,i,o,c,u,h,f){const _=new ky(s,i,o,c,u,h);return f&&(_.Qa=!0),_})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await(async function(s){const i=B(s);O("RemoteStore","RemoteStore shutting down."),i.L_.add(5),await $r(i),i.k_.shutdown(),i.q_.set("Unknown")})(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}Ta.provider={build:()=>new Ta};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Od{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):_t("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class By{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=Re.UNAUTHENTICATED,this.clientId=Ou.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,(async o=>{O("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(r,(o=>(O("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new gt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=ro(t,"Failed to shutdown persistence");e.reject(r)}})),e.promise}}async function Xi(n,e){n.asyncQueue.verifyOperationInProgress(),O("FirestoreClient","Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await md(e.localStore,s),r=s)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function Rl(n,e){n.asyncQueue.verifyOperationInProgress();const t=await jy(n);O("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((r=>El(e.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>El(e.remoteStore,s))),n._onlineComponents=e}async function jy(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){O("FirestoreClient","Using user provided OfflineComponentProvider");try{await Xi(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===P.FAILED_PRECONDITION||s.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;Rn("Error using user provided cache. Falling back to memory cache: "+t),await Xi(n,new Os)}}else O("FirestoreClient","Using default OfflineComponentProvider"),await Xi(n,new Os);return n._offlineComponents}async function Vd(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(O("FirestoreClient","Using user provided OnlineComponentProvider"),await Rl(n,n._uninitializedComponentsProvider._online)):(O("FirestoreClient","Using default OnlineComponentProvider"),await Rl(n,new Ta))),n._onlineComponents}function qy(n){return Vd(n).then((e=>e.syncEngine))}async function Ld(n){const e=await Vd(n),t=e.eventManager;return t.onListen=Ry.bind(null,e.syncEngine),t.onUnlisten=Dy.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=Py.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=xy.bind(null,e.syncEngine),t}function Wy(n,e,t={}){const r=new gt;return n.asyncQueue.enqueueAndForget((async()=>(function(i,o,c,u,h){const f=new Od({next:v=>{f.Za(),o.enqueueAndForget((()=>Ad(i,_)));const I=v.docs.has(c);!I&&v.fromCache?h.reject(new N(P.UNAVAILABLE,"Failed to get document because the client is offline.")):I&&v.fromCache&&u&&u.source==="server"?h.reject(new N(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(v)},error:v=>h.reject(v)}),_=new Sd(qa(c.path),f,{includeMetadataChanges:!0,_a:!0});return Id(i,_)})(await Ld(n),n.asyncQueue,e,t,r))),r.promise}function Hy(n,e,t={}){const r=new gt;return n.asyncQueue.enqueueAndForget((async()=>(function(i,o,c,u,h){const f=new Od({next:v=>{f.Za(),o.enqueueAndForget((()=>Ad(i,_))),v.fromCache&&u.source==="server"?h.reject(new N(P.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(v)},error:v=>h.reject(v)}),_=new Sd(c,f,{includeMetadataChanges:!0,_a:!0});return Id(i,_)})(await Ld(n),n.asyncQueue,e,t,r))),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $d(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pl=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fd(n,e,t){if(!t)throw new N(P.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function zy(n,e,t,r){if(e===!0&&r===!0)throw new N(P.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Cl(n){if(!V.isDocumentKey(n))throw new N(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Dl(n){if(V.isDocumentKey(n))throw new N(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function ri(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":$()}function wt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new N(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=ri(n);throw new N(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xl{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new N(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new N(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}zy("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=$d((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),(function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new N(P.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new N(P.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new N(P.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class si{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new xl({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new N(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new N(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new xl(e),e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new lp;switch(r.type){case"firstParty":return new fp(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new N(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const r=Pl.get(t);r&&(O("ComponentProvider","Removing Datastore"),Pl.delete(t),r.terminate())})(this),Promise.resolve()}}function Gy(n,e,t,r={}){var s;const i=(n=wt(n,si))._getSettings(),o=`${e}:${t}`;if(i.host!=="firestore.googleapis.com"&&i.host!==o&&Rn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},i),{host:o,ssl:!1})),r.mockUserToken){let c,u;if(typeof r.mockUserToken=="string")c=r.mockUserToken,u=Re.MOCK_USER;else{c=Ff(r.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const h=r.mockUserToken.sub||r.mockUserToken.user_id;if(!h)throw new N(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");u=new Re(h)}n._authCredentials=new up(new Nu(c,u))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new qt(this.firestore,e,this._query)}}class Fe{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new $t(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Fe(this.firestore,e,this._key)}}class $t extends qt{constructor(e,t,r){super(e,t,qa(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Fe(this.firestore,null,new V(e))}withConverter(e){return new $t(this.firestore,e,this._path)}}function Ue(n,e,...t){if(n=De(n),Fd("collection","path",e),n instanceof si){const r=ae.fromString(e,...t);return Dl(r),new $t(n,null,r)}{if(!(n instanceof Fe||n instanceof $t))throw new N(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(ae.fromString(e,...t));return Dl(r),new $t(n.firestore,null,r)}}function Me(n,e,...t){if(n=De(n),arguments.length===1&&(e=Ou.newId()),Fd("doc","path",e),n instanceof si){const r=ae.fromString(e,...t);return Cl(r),new Fe(n,null,new V(r))}{if(!(n instanceof Fe||n instanceof $t))throw new N(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(ae.fromString(e,...t));return Cl(r),new Fe(n.firestore,n instanceof $t?n.converter:null,new V(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ml{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new gd(this,"async_queue_retry"),this.Vu=()=>{const r=Ji();r&&O("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const t=Ji();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=Ji();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise((()=>{}));const t=new gt;return this.gu((()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Pu.push(e),this.pu())))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!Or(e))throw e;O("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go((()=>this.pu()))}}gu(e){const t=this.mu.then((()=>(this.du=!0,e().catch((r=>{this.Eu=r,this.du=!1;const s=(function(o){let c=o.message||"";return o.stack&&(c=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),c})(r);throw _t("INTERNAL UNHANDLED ERROR: ",s),r})).then((r=>(this.du=!1,r))))));return this.mu=t,t}enqueueAfterDelay(e,t,r){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const s=no.createAndSchedule(this,e,t,r,(i=>this.yu(i)));return this.Tu.push(s),s}fu(){this.Eu&&$()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then((()=>{this.Tu.sort(((t,r)=>t.targetTimeMs-r.targetTimeMs));for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()}))}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}class Bn extends si{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new Ml,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Ml(e),this._firestoreClient=void 0,await e}}}function Ky(n,e){const t=typeof n=="object"?n:Au(),r=typeof n=="string"?n:"(default)",s=Oa(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=Lf("firestore");i&&Gy(s,...i)}return s}function ao(n){if(n._terminated)throw new N(P.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Qy(n),n._firestoreClient}function Qy(n){var e,t,r;const s=n._freezeSettings(),i=(function(c,u,h,f){return new Sp(c,u,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,$d(f.experimentalLongPollingOptions),f.useFetchStreams)})(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((t=s.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new By(n._authCredentials,n._appCheckCredentials,n._queue,i,n._componentsProvider&&(function(c){const u=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(u),_online:u}})(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nn{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Nn(Ee.fromBase64String(e))}catch(t){throw new N(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Nn(Ee.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ii{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new N(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ve(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ai{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oo{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new N(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new N(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return Y(this._lat,e._lat)||Y(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class co{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0})(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yy=/^__.*__$/;class Jy{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new jt(e,this.data,this.fieldMask,t,this.fieldTransforms):new Vr(e,this.data,t,this.fieldTransforms)}}class Ud{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new jt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Bd(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw $()}}class lo{constructor(e,t,r,s,i,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.vu(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new lo(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.Fu({path:r,xu:!1});return s.Ou(e),s}Nu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.Fu({path:r,xu:!1});return s.vu(),s}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return Vs(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(Bd(this.Cu)&&Yy.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class Xy{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||ei(e)}Qu(e,t,r,s=!1){return new lo({Cu:e,methodName:t,qu:r,path:ve.emptyPath(),xu:!1,ku:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function uo(n){const e=n._freezeSettings(),t=ei(n._databaseId);return new Xy(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Zy(n,e,t,r,s,i={}){const o=n.Qu(i.merge||i.mergeFields?2:0,e,t,s);fo("Data must be an object, but it was:",o,r);const c=jd(r,o);let u,h;if(i.merge)u=new qe(o.fieldMask),h=o.fieldTransforms;else if(i.mergeFields){const f=[];for(const _ of i.mergeFields){const v=Ia(e,_,t);if(!o.contains(v))throw new N(P.INVALID_ARGUMENT,`Field '${v}' is specified in your field mask but missing from your input data.`);Wd(f,v)||f.push(v)}u=new qe(f),h=o.fieldTransforms.filter((_=>u.covers(_.field)))}else u=null,h=o.fieldTransforms;return new Jy(new $e(c),u,h)}class oi extends ai{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof oi}}class ho extends ai{_toFieldTransform(e){return new Jp(e.path,new kr)}isEqual(e){return e instanceof ho}}function e_(n,e,t,r){const s=n.Qu(1,e,t);fo("Data must be an object, but it was:",s,r);const i=[],o=$e.empty();cn(r,((u,h)=>{const f=mo(e,u,t);h=De(h);const _=s.Nu(f);if(h instanceof oi)i.push(f);else{const v=Ur(h,_);v!=null&&(i.push(f),o.set(f,v))}}));const c=new qe(i);return new Ud(o,c,s.fieldTransforms)}function t_(n,e,t,r,s,i){const o=n.Qu(1,e,t),c=[Ia(e,r,t)],u=[s];if(i.length%2!=0)throw new N(P.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let v=0;v<i.length;v+=2)c.push(Ia(e,i[v])),u.push(i[v+1]);const h=[],f=$e.empty();for(let v=c.length-1;v>=0;--v)if(!Wd(h,c[v])){const I=c[v];let R=u[v];R=De(R);const C=o.Nu(I);if(R instanceof oi)h.push(I);else{const D=Ur(R,C);D!=null&&(h.push(I),f.set(I,D))}}const _=new qe(h);return new Ud(f,_,o.fieldTransforms)}function n_(n,e,t,r=!1){return Ur(t,n.Qu(r?4:3,e))}function Ur(n,e){if(qd(n=De(n)))return fo("Unsupported field value:",e,n),jd(n,e);if(n instanceof ai)return(function(r,s){if(!Bd(s.Cu))throw s.Bu(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Bu(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return(function(r,s){const i=[];let o=0;for(const c of r){let u=Ur(c,s.Lu(o));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),o++}return{arrayValue:{values:i}}})(n,e)}return(function(r,s){if((r=De(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Kp(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=fe.fromDate(r);return{timestampValue:Ms(s.serializer,i)}}if(r instanceof fe){const i=new fe(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Ms(s.serializer,i)}}if(r instanceof oo)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Nn)return{bytesValue:od(s.serializer,r._byteString)};if(r instanceof Fe){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.Bu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Ka(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof co)return(function(o,c){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map((u=>{if(typeof u!="number")throw c.Bu("VectorValues must only contain numeric values.");return Wa(c.serializer,u)}))}}}}}})(r,s);throw s.Bu(`Unsupported field value: ${ri(r)}`)})(n,e)}function jd(n,e){const t={};return Vu(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):cn(n,((r,s)=>{const i=Ur(s,e.Mu(r));i!=null&&(t[r]=i)})),{mapValue:{fields:t}}}function qd(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof fe||n instanceof oo||n instanceof Nn||n instanceof Fe||n instanceof ai||n instanceof co)}function fo(n,e,t){if(!qd(t)||!(function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)})(t)){const r=ri(t);throw r==="an object"?e.Bu(n+" a custom object"):e.Bu(n+" "+r)}}function Ia(n,e,t){if((e=De(e))instanceof ii)return e._internalPath;if(typeof e=="string")return mo(n,e);throw Vs("Field path arguments must be of type string or ",n,!1,void 0,t)}const r_=new RegExp("[~\\*/\\[\\]]");function mo(n,e,t){if(e.search(r_)>=0)throw Vs(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new ii(...e.split("."))._internalPath}catch{throw Vs(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Vs(n,e,t,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${r}`),o&&(u+=` in document ${s}`),u+=")"),new N(P.INVALID_ARGUMENT,c+n+u)}function Wd(n,e){return n.some((t=>t.isEqual(e)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hd{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Fe(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new s_(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(ci("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class s_ extends Hd{data(){return super.data()}}function ci(n,e){return typeof e=="string"?mo(n,e):e instanceof ii?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function i_(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new N(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class po{}class go extends po{}function Wt(n,e,...t){let r=[];e instanceof po&&r.push(e),r=r.concat(t),(function(i){const o=i.filter((u=>u instanceof yo)).length,c=i.filter((u=>u instanceof li)).length;if(o>1||o>0&&c>0)throw new N(P.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const s of r)n=s._apply(n);return n}class li extends go{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new li(e,t,r)}_apply(e){const t=this._parse(e);return Gd(e._query,t),new qt(e.firestore,e.converter,pa(e._query,t))}_parse(e){const t=uo(e.firestore);return(function(i,o,c,u,h,f,_){let v;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new N(P.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Ol(_,f);const I=[];for(const R of _)I.push(Nl(u,i,R));v={arrayValue:{values:I}}}else v=Nl(u,i,_)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Ol(_,f),v=n_(c,o,_,f==="in"||f==="not-in");return he.create(h,f,v)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function we(n,e,t){const r=e,s=ci("where",n);return li._create(s,r,t)}class yo extends po{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new yo(e,t)}_parse(e){const t=this._queryConstraints.map((r=>r._parse(e))).filter((r=>r.getFilters().length>0));return t.length===1?t[0]:Ye.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(s,i){let o=s;const c=i.getFlattenedFilters();for(const u of c)Gd(o,u),o=pa(o,u)})(e._query,t),new qt(e.firestore,e.converter,pa(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class _o extends go{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new _o(e,t)}_apply(e){const t=(function(s,i,o){if(s.startAt!==null)throw new N(P.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new N(P.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Sr(i,o)})(e._query,this._field,this._direction);return new qt(e.firestore,e.converter,(function(s,i){const o=s.explicitOrderBy.concat([i]);return new $n(s.path,s.collectionGroup,o,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)})(e._query,t))}}function jn(n,e="asc"){const t=e,r=ci("orderBy",n);return _o._create(r,t)}class vo extends go{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new vo(e,t,r)}_apply(e){return new qt(e.firestore,e.converter,Ds(e._query,this._limit,this._limitType))}}function zd(n){return vo._create("limit",n,"F")}function Nl(n,e,t){if(typeof(t=De(t))=="string"){if(t==="")throw new N(P.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Hu(e)&&t.indexOf("/")!==-1)throw new N(P.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(ae.fromString(t));if(!V.isDocumentKey(r))throw new N(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return nl(n,new V(r))}if(t instanceof Fe)return nl(n,t._key);throw new N(P.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${ri(t)}.`)}function Ol(n,e){if(!Array.isArray(n)||n.length===0)throw new N(P.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Gd(n,e){const t=(function(s,i){for(const o of s)for(const c of o.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null})(n.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new N(P.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new N(P.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class a_{convertValue(e,t="none"){switch(an(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ue(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(sn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw $()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return cn(e,((s,i)=>{r[s]=this.convertValue(i,t)})),r}convertVectorValue(e){var t,r,s;const i=(s=(r=(t=e.fields)===null||t===void 0?void 0:t.value.arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map((o=>ue(o.doubleValue)));return new co(i)}convertGeoPoint(e){return new oo(ue(e.latitude),ue(e.longitude))}convertArray(e,t){return(e.values||[]).map((r=>this.convertValue(r,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const r=Fa(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Tr(e));default:return null}}convertTimestamp(e){const t=Ut(e);return new fe(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=ae.fromString(e);Z(fd(r));const s=new Ir(r.get(1),r.get(3)),i=new V(r.popFirst(5));return s.isEqual(t)||_t(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function o_(n,e,t){let r;return r=n?n.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Kd extends Hd{constructor(e,t,r,s,i,o){super(e,t,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new ws(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(ci("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class ws extends Kd{data(e={}){return super.data(e)}}class c_{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new fr(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((r=>{e.call(t,new ws(this._firestore,this._userDataWriter,r.key,r,new fr(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new N(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map((c=>{const u=new ws(s._firestore,s._userDataWriter,c.doc.key,c.doc,new fr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}}))}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((c=>i||c.type!==3)).map((c=>{const u=new ws(s._firestore,s._userDataWriter,c.doc.key,c.doc,new fr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return c.type!==0&&(h=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),f=o.indexOf(c.doc.key)),{type:l_(c.type),doc:u,oldIndex:h,newIndex:f}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function l_(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return $()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function u_(n){n=wt(n,Fe);const e=wt(n.firestore,Bn);return Wy(ao(e),n._key).then((t=>d_(e,n,t)))}class Qd extends a_{constructor(e){super(),this.firestore=e}convertBytes(e){return new Nn(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Fe(this.firestore,null,t)}}function Ht(n){n=wt(n,qt);const e=wt(n.firestore,Bn),t=ao(e),r=new Qd(e);return i_(n._query),Hy(t,n._query).then((s=>new c_(e,r,n,s)))}function at(n,e,t,...r){n=wt(n,Fe);const s=wt(n.firestore,Bn),i=uo(s);let o;return o=typeof(e=De(e))=="string"||e instanceof ii?t_(i,"updateDoc",n._key,e,t,r):e_(i,"updateDoc",n._key,e),wo(s,[o.toMutation(n._key,Ke.exists(!0))])}function ui(n){return wo(wt(n.firestore,Bn),[new Ha(n._key,Ke.none())])}function qn(n,e){const t=wt(n.firestore,Bn),r=Me(n),s=o_(n.converter,e);return wo(t,[Zy(uo(n.firestore),"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,Ke.exists(!1))]).then((()=>r))}function wo(n,e){return(function(r,s){const i=new gt;return r.asyncQueue.enqueueAndForget((async()=>My(await qy(r),s,i))),i.promise})(ao(n),e)}function d_(n,e,t){const r=t.docs.get(e._key),s=new Qd(n);return new Kd(n,s,e._key,r,new fr(t.hasPendingWrites,t.fromCache),e.converter)}function le(){return new ho("serverTimestamp")}(function(e,t=!0){(function(s){Ln=s})(Vn),kn(new nn("firestore",((r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),c=new Bn(new dp(r.getProvider("auth-internal")),new pp(r.getProvider("app-check-internal")),(function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new N(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ir(h.options.projectId,f)})(o,s),o);return i=Object.assign({useFetchStreams:t},i),c._setSettings(i),c}),"PUBLIC").setMultipleInstances(!0)),Lt(Jc,"4.7.3",e),Lt(Jc,"4.7.3","esm2017")})();var h_="firebase",f_="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Lt(h_,f_,"app");function bo(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(n);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(n,r[s])&&(t[r[s]]=n[r[s]]);return t}function Yd(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const m_=Yd,Jd=new xr("auth","Firebase",Yd());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ls=new Ma("@firebase/auth");function p_(n,...e){Ls.logLevel<=z.WARN&&Ls.warn(`Auth (${Vn}): ${n}`,...e)}function bs(n,...e){Ls.logLevel<=z.ERROR&&Ls.error(`Auth (${Vn}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function it(n,...e){throw To(n,...e)}function Qe(n,...e){return To(n,...e)}function Eo(n,e,t){const r=Object.assign(Object.assign({},m_()),{[e]:t});return new xr("auth","Firebase",r).create(e,{appName:n.name})}function tn(n){return Eo(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function g_(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&it(n,"argument-error"),Eo(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function To(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Jd.create(n,...e)}function L(n,e,...t){if(!n)throw To(e,...t)}function ft(n){const e="INTERNAL ASSERTION FAILED: "+n;throw bs(e),new Error(e)}function bt(n,e){n||ft(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Aa(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function y_(){return Vl()==="http:"||Vl()==="https:"}function Vl(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function __(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(y_()||qf()||"connection"in navigator)?navigator.onLine:!0}function v_(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Br{constructor(e,t){this.shortDelay=e,this.longDelay=t,bt(t>e,"Short delay should be less than long delay!"),this.isMobile=Uf()||Wf()}get(){return __()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Io(n,e){bt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xd{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;ft("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;ft("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;ft("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const w_={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b_=new Br(3e4,6e4);function Ao(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function Wn(n,e,t,r,s={}){return Zd(n,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const c=Mr(Object.assign({key:n.config.apiKey},o)).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const h=Object.assign({method:e,headers:u},i);return jf()||(h.referrerPolicy="no-referrer"),Xd.fetch()(eh(n,n.config.apiHost,t,c),h)})}async function Zd(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},w_),e);try{const s=new T_(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw ms(n,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[u,h]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw ms(n,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw ms(n,"email-already-in-use",o);if(u==="USER_DISABLED")throw ms(n,"user-disabled",o);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw Eo(n,f,h);it(n,f)}}catch(s){if(s instanceof Tt)throw s;it(n,"network-request-failed",{message:String(s)})}}async function E_(n,e,t,r,s={}){const i=await Wn(n,e,t,r,s);return"mfaPendingCredential"in i&&it(n,"multi-factor-auth-required",{_serverResponse:i}),i}function eh(n,e,t,r){const s=`${e}${t}?${r}`;return n.config.emulator?Io(n.config,s):`${n.config.apiScheme}://${s}`}class T_{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Qe(this.auth,"network-request-failed")),b_.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function ms(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=Qe(n,e,r);return s.customData._tokenResponse=t,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function I_(n,e){return Wn(n,"POST","/v1/accounts:delete",e)}async function th(n,e){return Wn(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vr(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function A_(n,e=!1){const t=De(n),r=await t.getIdToken(e),s=So(r);L(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:vr(Zi(s.auth_time)),issuedAtTime:vr(Zi(s.iat)),expirationTime:vr(Zi(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Zi(n){return Number(n)*1e3}function So(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return bs("JWT malformed, contained fewer than 3 sections"),null;try{const s=_u(t);return s?JSON.parse(s):(bs("Failed to decode base64 JWT payload"),null)}catch(s){return bs("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Ll(n){const e=So(n);return L(e,"internal-error"),L(typeof e.exp<"u","internal-error"),L(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cr(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Tt&&S_(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function S_({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k_{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sa{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=vr(this.lastLoginAt),this.creationTime=vr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $s(n){var e;const t=n.auth,r=await n.getIdToken(),s=await Cr(n,th(t,{idToken:r}));L(s==null?void 0:s.users.length,t,"internal-error");const i=s.users[0];n._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?nh(i.providerUserInfo):[],c=P_(n.providerData,o),u=n.isAnonymous,h=!(n.email&&i.passwordHash)&&!(c!=null&&c.length),f=u?h:!1,_={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:c,metadata:new Sa(i.createdAt,i.lastLoginAt),isAnonymous:f};Object.assign(n,_)}async function R_(n){const e=De(n);await $s(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function P_(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function nh(n){return n.map(e=>{var{providerId:t}=e,r=bo(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function C_(n,e){const t=await Zd(n,{},async()=>{const r=Mr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,o=eh(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",Xd.fetch()(o,{method:"POST",headers:c,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function D_(n,e){return Wn(n,"POST","/v2/accounts:revokeToken",Ao(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){L(e.idToken,"internal-error"),L(typeof e.idToken<"u","internal-error"),L(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Ll(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){L(e.length!==0,"internal-error");const t=Ll(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(L(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await C_(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,o=new Tn;return r&&(L(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(L(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(L(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Tn,this.toJSON())}_performRefresh(){return ft("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pt(n,e){L(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class mt{constructor(e){var{uid:t,auth:r,stsTokenManager:s}=e,i=bo(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new k_(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Sa(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await Cr(this,this.stsTokenManager.getToken(this.auth,e));return L(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return A_(this,e)}reload(){return R_(this)}_assign(e){this!==e&&(L(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new mt(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){L(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await $s(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ht(this.auth.app))return Promise.reject(tn(this.auth));const e=await this.getIdToken();return await Cr(this,I_(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,s,i,o,c,u,h,f;const _=(r=t.displayName)!==null&&r!==void 0?r:void 0,v=(s=t.email)!==null&&s!==void 0?s:void 0,I=(i=t.phoneNumber)!==null&&i!==void 0?i:void 0,R=(o=t.photoURL)!==null&&o!==void 0?o:void 0,C=(c=t.tenantId)!==null&&c!==void 0?c:void 0,D=(u=t._redirectEventId)!==null&&u!==void 0?u:void 0,q=(h=t.createdAt)!==null&&h!==void 0?h:void 0,F=(f=t.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:W,emailVerified:J,isAnonymous:ge,providerData:re,stsTokenManager:T}=t;L(W&&T,e,"internal-error");const y=Tn.fromJSON(this.name,T);L(typeof W=="string",e,"internal-error"),Pt(_,e.name),Pt(v,e.name),L(typeof J=="boolean",e,"internal-error"),L(typeof ge=="boolean",e,"internal-error"),Pt(I,e.name),Pt(R,e.name),Pt(C,e.name),Pt(D,e.name),Pt(q,e.name),Pt(F,e.name);const w=new mt({uid:W,auth:e,email:v,emailVerified:J,displayName:_,isAnonymous:ge,photoURL:R,phoneNumber:I,tenantId:C,stsTokenManager:y,createdAt:q,lastLoginAt:F});return re&&Array.isArray(re)&&(w.providerData=re.map(b=>Object.assign({},b))),D&&(w._redirectEventId=D),w}static async _fromIdTokenResponse(e,t,r=!1){const s=new Tn;s.updateFromServerResponse(t);const i=new mt({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await $s(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];L(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?nh(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),c=new Tn;c.updateFromIdToken(r);const u=new mt({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:o}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Sa(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,h),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $l=new Map;function pt(n){bt(n instanceof Function,"Expected a class definition");let e=$l.get(n);return e?(bt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,$l.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rh{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}rh.type="NONE";const Fl=rh;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Es(n,e,t){return`firebase:${n}:${e}:${t}`}class In{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Es(this.userKey,s.apiKey,i),this.fullPersistenceKey=Es("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?mt._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new In(pt(Fl),e,r);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||pt(Fl);const o=Es(r,e.config.apiKey,e.name);let c=null;for(const h of t)try{const f=await h._get(o);if(f){const _=mt._fromJSON(e,f);h!==i&&(c=_),i=h;break}}catch{}const u=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new In(i,e,r):(i=u[0],c&&await i._set(o,c.toJSON()),await Promise.all(t.map(async h=>{if(h!==i)try{await h._remove(o)}catch{}})),new In(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ul(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(oh(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(sh(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(lh(e))return"Blackberry";if(uh(e))return"Webos";if(ih(e))return"Safari";if((e.includes("chrome/")||ah(e))&&!e.includes("edge/"))return"Chrome";if(ch(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function sh(n=Ce()){return/firefox\//i.test(n)}function ih(n=Ce()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function ah(n=Ce()){return/crios\//i.test(n)}function oh(n=Ce()){return/iemobile/i.test(n)}function ch(n=Ce()){return/android/i.test(n)}function lh(n=Ce()){return/blackberry/i.test(n)}function uh(n=Ce()){return/webos/i.test(n)}function ko(n=Ce()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function x_(n=Ce()){var e;return ko(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function M_(){return Hf()&&document.documentMode===10}function dh(n=Ce()){return ko(n)||ch(n)||uh(n)||lh(n)||/windows phone/i.test(n)||oh(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hh(n,e=[]){let t;switch(n){case"Browser":t=Ul(Ce());break;case"Worker":t=`${Ul(Ce())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Vn}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N_{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((o,c)=>{try{const u=e(i);o(u)}catch(u){c(u)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function O_(n,e={}){return Wn(n,"GET","/v2/passwordPolicy",Ao(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V_=6;class L_{constructor(e){var t,r,s,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:V_,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,s,i,o,c;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(t=u.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(s=u.containsLowercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(i=u.containsUppercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(o=u.containsNumericCharacter)!==null&&o!==void 0?o:!0),u.isValid&&(u.isValid=(c=u.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),u}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $_{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Bl(this),this.idTokenSubscription=new Bl(this),this.beforeStateQueue=new N_(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Jd,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=pt(t)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await In.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await th(this,{idToken:e}),r=await mt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(ht(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=s==null?void 0:s._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===c)&&(u!=null&&u.user)&&(s=u.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return L(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await $s(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=v_()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ht(this.app))return Promise.reject(tn(this));const t=e?De(e):null;return t&&L(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&L(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ht(this.app)?Promise.reject(tn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ht(this.app)?Promise.reject(tn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(pt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await O_(this),t=new L_(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new xr("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await D_(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&pt(e)||this._popupRedirectResolver;L(t,this,"argument-error"),this.redirectPersistenceManager=await In.create(this,[pt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(L(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,s);return()=>{o=!0,u()}}else{const u=e.addObserver(t);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return L(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=hh(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&p_(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function di(n){return De(n)}class Bl{constructor(e){this.auth=e,this.observer=null,this.addObserver=Zf(t=>this.observer=t)}get next(){return L(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ro={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function F_(n){Ro=n}function U_(n){return Ro.loadJS(n)}function B_(){return Ro.gapiScript}function j_(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function q_(n,e){const t=Oa(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(ks(i,e??{}))return s;it(s,"already-initialized")}return t.initialize({options:e})}function W_(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(pt);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function H_(n,e,t){const r=di(n);L(r._canInitEmulator,r,"emulator-config-failed"),L(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=fh(e),{host:o,port:c}=z_(e),u=c===null?"":`:${c}`;r.config.emulator={url:`${i}//${o}${u}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),G_()}function fh(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function z_(n){const e=fh(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:jl(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:jl(o)}}}function jl(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function G_(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mh{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return ft("not implemented")}_getIdTokenResponse(e){return ft("not implemented")}_linkToIdToken(e,t){return ft("not implemented")}_getReauthenticationResolver(e){return ft("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function An(n,e){return E_(n,"POST","/v1/accounts:signInWithIdp",Ao(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const K_="http://localhost";class on extends mh{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new on(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):it("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=t,i=bo(t,["providerId","signInMethod"]);if(!r||!s)return null;const o=new on(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return An(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,An(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,An(e,t)}buildRequest(){const e={requestUri:K_,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Mr(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Po{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jr extends Po{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt extends jr{constructor(){super("facebook.com")}static credential(e){return on._fromParams({providerId:Dt.PROVIDER_ID,signInMethod:Dt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Dt.credentialFromTaggedObject(e)}static credentialFromError(e){return Dt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Dt.credential(e.oauthAccessToken)}catch{return null}}}Dt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Dt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dt extends jr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return on._fromParams({providerId:dt.PROVIDER_ID,signInMethod:dt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return dt.credentialFromTaggedObject(e)}static credentialFromError(e){return dt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return dt.credential(t,r)}catch{return null}}}dt.GOOGLE_SIGN_IN_METHOD="google.com";dt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xt extends jr{constructor(){super("github.com")}static credential(e){return on._fromParams({providerId:xt.PROVIDER_ID,signInMethod:xt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return xt.credentialFromTaggedObject(e)}static credentialFromError(e){return xt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return xt.credential(e.oauthAccessToken)}catch{return null}}}xt.GITHUB_SIGN_IN_METHOD="github.com";xt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mt extends jr{constructor(){super("twitter.com")}static credential(e,t){return on._fromParams({providerId:Mt.PROVIDER_ID,signInMethod:Mt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Mt.credentialFromTaggedObject(e)}static credentialFromError(e){return Mt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Mt.credential(t,r)}catch{return null}}}Mt.TWITTER_SIGN_IN_METHOD="twitter.com";Mt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class On{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await mt._fromIdTokenResponse(e,r,s),o=ql(r);return new On({user:i,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=ql(r);return new On({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function ql(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fs extends Tt{constructor(e,t,r,s){var i;super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Fs.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new Fs(e,t,r,s)}}function ph(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Fs._fromErrorAndOperation(n,i,e,r):i})}async function Q_(n,e,t=!1){const r=await Cr(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return On._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Y_(n,e,t=!1){const{auth:r}=n;if(ht(r.app))return Promise.reject(tn(r));const s="reauthenticate";try{const i=await Cr(n,ph(r,s,e,n),t);L(i.idToken,r,"internal-error");const o=So(i.idToken);L(o,r,"internal-error");const{sub:c}=o;return L(n.uid===c,r,"user-mismatch"),On._forOperation(n,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&it(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function J_(n,e,t=!1){if(ht(n.app))return Promise.reject(tn(n));const r="signIn",s=await ph(n,r,e),i=await On._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}function X_(n,e,t,r){return De(n).onIdTokenChanged(e,t,r)}function Z_(n,e,t){return De(n).beforeAuthStateChanged(e,t)}function ev(n){return De(n).signOut()}const Us="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gh{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Us,"1"),this.storage.removeItem(Us),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tv=1e3,nv=10;class yh extends gh{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=dh(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,u)=>{this.notifyListeners(o,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);M_()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,nv):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},tv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}yh.type="LOCAL";const rv=yh;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _h extends gh{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}_h.type="SESSION";const vh=_h;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sv(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hi{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new hi(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(o).map(async h=>h(t.origin,i)),u=await sv(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}hi.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Co(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iv{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,u)=>{const h=Co("",20);s.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(_){const v=_;if(v.data.eventId===h)switch(v.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(v.data.response);break;default:clearTimeout(f),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tt(){return window}function av(n){tt().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wh(){return typeof tt().WorkerGlobalScope<"u"&&typeof tt().importScripts=="function"}async function ov(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function cv(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function lv(){return wh()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bh="firebaseLocalStorageDb",uv=1,Bs="firebaseLocalStorage",Eh="fbase_key";class qr{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function fi(n,e){return n.transaction([Bs],e?"readwrite":"readonly").objectStore(Bs)}function dv(){const n=indexedDB.deleteDatabase(bh);return new qr(n).toPromise()}function ka(){const n=indexedDB.open(bh,uv);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Bs,{keyPath:Eh})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Bs)?e(r):(r.close(),await dv(),e(await ka()))})})}async function Wl(n,e,t){const r=fi(n,!0).put({[Eh]:e,value:t});return new qr(r).toPromise()}async function hv(n,e){const t=fi(n,!1).get(e),r=await new qr(t).toPromise();return r===void 0?null:r.value}function Hl(n,e){const t=fi(n,!0).delete(e);return new qr(t).toPromise()}const fv=800,mv=3;class Th{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ka(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>mv)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return wh()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=hi._getInstance(lv()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await ov(),!this.activeServiceWorker)return;this.sender=new iv(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||cv()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await ka();return await Wl(e,Us,"1"),await Hl(e,Us),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Wl(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>hv(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Hl(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=fi(s,!1).getAll();return new qr(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),fv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Th.type="LOCAL";const pv=Th;new Br(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ih(n,e){return e?pt(e):(L(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Do extends mh{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return An(e,this._buildIdpRequest())}_linkToIdToken(e,t){return An(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return An(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function gv(n){return J_(n.auth,new Do(n),n.bypassAuthState)}function yv(n){const{auth:e,user:t}=n;return L(t,e,"internal-error"),Y_(t,new Do(n),n.bypassAuthState)}async function _v(n){const{auth:e,user:t}=n;return L(t,e,"internal-error"),Q_(t,new Do(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ah{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return gv;case"linkViaPopup":case"linkViaRedirect":return _v;case"reauthViaPopup":case"reauthViaRedirect":return yv;default:it(this.auth,"internal-error")}}resolve(e){bt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){bt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vv=new Br(2e3,1e4);async function wv(n,e,t){if(ht(n.app))return Promise.reject(Qe(n,"operation-not-supported-in-this-environment"));const r=di(n);g_(n,e,Po);const s=Ih(r,t);return new Zt(r,"signInViaPopup",e,s).executeNotNull()}class Zt extends Ah{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Zt.currentPopupAction&&Zt.currentPopupAction.cancel(),Zt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return L(e,this.auth,"internal-error"),e}async onExecution(){bt(this.filter.length===1,"Popup operations only handle one event");const e=Co();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Qe(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Qe(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Zt.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Qe(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,vv.get())};e()}}Zt.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bv="pendingRedirect",Ts=new Map;class Ev extends Ah{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Ts.get(this.auth._key());if(!e){try{const r=await Tv(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Ts.set(this.auth._key(),e)}return this.bypassAuthState||Ts.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Tv(n,e){const t=Sv(e),r=Av(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function Iv(n,e){Ts.set(n._key(),e)}function Av(n){return pt(n._redirectPersistence)}function Sv(n){return Es(bv,n.config.apiKey,n.name)}async function kv(n,e,t=!1){if(ht(n.app))return Promise.reject(tn(n));const r=di(n),s=Ih(r,e),o=await new Ev(r,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rv=600*1e3;class Pv{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Cv(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!Sh(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(Qe(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Rv&&this.cachedEventUids.clear(),this.cachedEventUids.has(zl(e))}saveEventToCache(e){this.cachedEventUids.add(zl(e)),this.lastProcessedEventTime=Date.now()}}function zl(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Sh({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Cv(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Sh(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Dv(n,e={}){return Wn(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xv=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Mv=/^https?/;async function Nv(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Dv(n);for(const t of e)try{if(Ov(t))return}catch{}it(n,"unauthorized-domain")}function Ov(n){const e=Aa(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!Mv.test(t))return!1;if(xv.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vv=new Br(3e4,6e4);function Gl(){const n=tt().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Lv(n){return new Promise((e,t)=>{var r,s,i;function o(){Gl(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Gl(),t(Qe(n,"network-request-failed"))},timeout:Vv.get()})}if(!((s=(r=tt().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=tt().gapi)===null||i===void 0)&&i.load)o();else{const c=j_("iframefcb");return tt()[c]=()=>{gapi.load?o():t(Qe(n,"network-request-failed"))},U_(`${B_()}?onload=${c}`).catch(u=>t(u))}}).catch(e=>{throw Is=null,e})}let Is=null;function $v(n){return Is=Is||Lv(n),Is}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fv=new Br(5e3,15e3),Uv="__/auth/iframe",Bv="emulator/auth/iframe",jv={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},qv=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Wv(n){const e=n.config;L(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Io(e,Bv):`https://${n.config.authDomain}/${Uv}`,r={apiKey:e.apiKey,appName:n.name,v:Vn},s=qv.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${Mr(r).slice(1)}`}async function Hv(n){const e=await $v(n),t=tt().gapi;return L(t,n,"internal-error"),e.open({where:document.body,url:Wv(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:jv,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=Qe(n,"network-request-failed"),c=tt().setTimeout(()=>{i(o)},Fv.get());function u(){tt().clearTimeout(c),s(r)}r.ping(u).then(u,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zv={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Gv=500,Kv=600,Qv="_blank",Yv="http://localhost";class Kl{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Jv(n,e,t,r=Gv,s=Kv){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const u=Object.assign(Object.assign({},zv),{width:r.toString(),height:s.toString(),top:i,left:o}),h=Ce().toLowerCase();t&&(c=ah(h)?Qv:t),sh(h)&&(e=e||Yv,u.scrollbars="yes");const f=Object.entries(u).reduce((v,[I,R])=>`${v}${I}=${R},`,"");if(x_(h)&&c!=="_self")return Xv(e||"",c),new Kl(null);const _=window.open(e||"",c,f);L(_,n,"popup-blocked");try{_.focus()}catch{}return new Kl(_)}function Xv(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zv="__/auth/handler",ew="emulator/auth/handler",tw=encodeURIComponent("fac");async function Ql(n,e,t,r,s,i){L(n.config.authDomain,n,"auth-domain-config-required"),L(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Vn,eventId:s};if(e instanceof Po){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Xf(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,_]of Object.entries({}))o[f]=_}if(e instanceof jr){const f=e.getScopes().filter(_=>_!=="");f.length>0&&(o.scopes=f.join(","))}n.tenantId&&(o.tid=n.tenantId);const c=o;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const u=await n._getAppCheckToken(),h=u?`#${tw}=${encodeURIComponent(u)}`:"";return`${nw(n)}?${Mr(c).slice(1)}${h}`}function nw({config:n}){return n.emulator?Io(n,ew):`https://${n.authDomain}/${Zv}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ea="webStorageSupport";class rw{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=vh,this._completeRedirectFn=kv,this._overrideRedirectResult=Iv}async _openPopup(e,t,r,s){var i;bt((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await Ql(e,t,r,Aa(),s);return Jv(e,o,Co())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await Ql(e,t,r,Aa(),s);return av(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(bt(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await Hv(e),r=new Pv(e);return t.register("authEvent",s=>(L(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(ea,{type:ea},s=>{var i;const o=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[ea];o!==void 0&&t(!!o),it(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Nv(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return dh()||ih()||ko()}}const sw=rw;var Yl="@firebase/auth",Jl="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iw{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){L(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aw(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function ow(n){kn(new nn("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;L(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:hh(n)},h=new $_(r,s,i,u);return W_(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),kn(new nn("auth-internal",e=>{const t=di(e.getProvider("auth").getImmediate());return(r=>new iw(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Lt(Yl,Jl,aw(n)),Lt(Yl,Jl,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cw=300,lw=bu("authIdTokenMaxAge")||cw;let Xl=null;const uw=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>lw)return;const s=t==null?void 0:t.token;Xl!==s&&(Xl=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function dw(n=Au()){const e=Oa(n,"auth");if(e.isInitialized())return e.getImmediate();const t=q_(n,{popupRedirectResolver:sw,persistence:[pv,rv,vh]}),r=bu("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=uw(i.toString());Z_(t,o,()=>o(t.currentUser)),X_(t,c=>o(c))}}const s=vu("auth");return s&&H_(t,`http://${s}`),t}function hw(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}F_({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=Qe("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",hw().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});ow("Browser");const fw={apiKey:"your-api-key",authDomain:"your-project.firebaseapp.com",projectId:"copchan-superfamily-app",storageBucket:"copchan-superfamily-app.appspot.com",messagingSenderId:"your-sender-id",appId:"your-app-id"},kh=Iu(fw),mi=dw(kh),ee=Ky(kh),mw=new dt;async function pw(){try{return(await wv(mi,mw)).user}catch(n){throw console.error("Google sign-in error:",n),n}}async function gw(){try{await ev(mi)}catch(n){throw console.error("Sign-out error:",n),n}}function pi(){return mi.currentUser}function Zl(){return mi.currentUser!==null}function Ne(){const n=pi();if(!n)throw new Error("User not authenticated");return n.uid}function Et(n){return n?n instanceof fe?n.toDate().toISOString().split("T")[0]:typeof n=="string"?n:null:null}function ze(n){const e={};for(const[t,r]of Object.entries(n))r!==void 0&&(e[t]=r);return e}const un="bills";async function Rh(){const n=Ne(),e=Wt(Ue(ee,un),we("userId","==",n),jn("dueDate","asc"));return(await Ht(e)).docs.map(r=>({id:r.id,...r.data(),createdAt:Et(r.data().createdAt),updatedAt:Et(r.data().updatedAt),dueDate:r.data().dueDate}))}async function Ra(n){const e=Ne(),t={...ze(n),userId:e,isPaid:n.isPaid||!1,paidDate:n.paidDate||null,paidBy:n.paidBy||null,createdAt:le(),updatedAt:le()};return{id:(await qn(Ue(ee,un),t)).id,...t}}async function yw(n,e){const t=Me(ee,un,n),r={...ze(e),updatedAt:le()};return await at(t,r),{id:n,...r}}async function _w(n){const e=Me(ee,un,n);return await ui(e),{id:n}}async function vw(n,e=null){const t=Me(ee,un,n),r=pi();await at(t,{isPaid:!0,paidDate:new Date().toISOString().split("T")[0],paidBy:e||(r==null?void 0:r.displayName)||(r==null?void 0:r.email),updatedAt:le()})}async function ww(n){const e=Me(ee,un,n);await at(e,{isPaid:!1,paidDate:null,paidBy:null,updatedAt:le()})}async function bw(n=7){const e=Ne(),t=new Date,r=new Date(t);r.setDate(r.getDate()+n);const s=t.toISOString().split("T")[0],i=r.toISOString().split("T")[0],o=Wt(Ue(ee,un),we("userId","==",e),we("isPaid","==",!1),we("dueDate",">=",s),we("dueDate","<=",i),jn("dueDate","asc"));return(await Ht(o)).docs.map(u=>({id:u.id,...u.data()}))}const Hn="reminders";async function Ew(){const n=Ne(),e=Wt(Ue(ee,Hn),we("userId","==",n),jn("dueDate","asc"));return(await Ht(e)).docs.map(r=>({id:r.id,...r.data(),createdAt:Et(r.data().createdAt),updatedAt:Et(r.data().updatedAt),dueDate:r.data().dueDate}))}async function Tw(n){const e=Ne(),t={...ze(n),userId:e,isPaid:n.isPaid||!1,paidDate:n.paidDate||null,paidBy:n.paidBy||null,createdAt:le(),updatedAt:le()};return{id:(await qn(Ue(ee,Hn),t)).id,...t}}async function Iw(n,e){const t=Me(ee,Hn,n),r={...ze(e),updatedAt:le()};return await at(t,r),{id:n,...r}}async function Aw(n){const e=Me(ee,Hn,n);return await ui(e),{id:n}}async function Sw(n,e=null){const t=Me(ee,Hn,n),r=pi();await at(t,{isPaid:!0,paidDate:new Date().toISOString().split("T")[0],paidBy:e||(r==null?void 0:r.displayName)||(r==null?void 0:r.email),updatedAt:le()})}async function kw(n){const e=Me(ee,Hn,n);await at(e,{isPaid:!1,paidDate:null,paidBy:null,updatedAt:le()})}const Wr="events";async function Rw(){const n=Ne(),e=Wt(Ue(ee,Wr),we("userId","==",n),jn("date","asc"));return(await Ht(e)).docs.map(r=>({id:r.id,...r.data(),createdAt:Et(r.data().createdAt),updatedAt:Et(r.data().updatedAt)}))}async function Pw(n){const e=Ne(),t={...ze(n),userId:e,createdAt:le(),updatedAt:le()};return{id:(await qn(Ue(ee,Wr),t)).id,...t}}async function Cw(n,e){const t=Me(ee,Wr,n),r={...ze(e),updatedAt:le()};return await at(t,r),{id:n,...r}}async function Dw(n){const e=Me(ee,Wr,n);return await ui(e),{id:n}}async function Ph(n=30){const e=Ne(),t=new Date,r=new Date(t);r.setDate(r.getDate()+n);const s=t.toISOString().split("T")[0],i=r.toISOString().split("T")[0],o=Wt(Ue(ee,Wr),we("userId","==",e),we("date",">=",s),we("date","<=",i),jn("date","asc"));return(await Ht(o)).docs.map(u=>({id:u.id,...u.data()}))}const gi="transactions";async function Ch(n,e){const t=Ne(),r=`${n}-${String(e).padStart(2,"0")}-01`,s=e===12?`${n+1}-01-01`:`${n}-${String(e+1).padStart(2,"0")}-01`,i=Wt(Ue(ee,gi),we("userId","==",t),we("date",">=",r),we("date","<",s),jn("date","desc"));return(await Ht(i)).docs.map(c=>({id:c.id,...c.data()}))}async function eu(n){const e=Ne(),t={...ze(n),userId:e,createdAt:le(),updatedAt:le()};return{id:(await qn(Ue(ee,gi),t)).id,...t}}async function xw(n,e){const t=Me(ee,gi,n),r={...ze(e),updatedAt:le()};return await at(t,r),{id:n,...r}}async function Mw(n){const e=Me(ee,gi,n);return await ui(e),{id:n}}const Nw="budgets";async function Dh(n){const e=Ne(),t=Me(ee,Nw,`${e}_${n}`),r=await u_(t);if(!r.exists())return null;const s=r.data();return{id:r.id,...s,updatedAt:Et(s.updatedAt)}}const xo="mealPlans";async function Dr(n){const e=Ne(),t=Wt(Ue(ee,xo),we("userId","==",e),we("weekStart","==",n),zd(1)),r=await Ht(t);if(r.empty)return null;const s=r.docs[0];return{id:s.id,...s.data(),createdAt:Et(s.data().createdAt),updatedAt:Et(s.data().updatedAt)}}async function Ow(n){const e=Ne(),t={...ze(n),userId:e,createdAt:le(),updatedAt:le()};return{id:(await qn(Ue(ee,xo),t)).id,...t}}async function Vw(n,e){const t=Me(ee,xo,n),r={...ze(e),updatedAt:le()};return await at(t,r),{id:n,...r}}async function As(n,e){Ne();const t=await Dr(n);return t?Vw(t.id,{weekStart:n,meals:e}):Ow({weekStart:n,meals:e})}const Mo="weekendActivities";async function Je(n){const e=Ne(),t=Wt(Ue(ee,Mo),we("userId","==",e),we("date","==",n),zd(1)),r=await Ht(t);if(r.empty)return null;const s=r.docs[0];return{id:s.id,...s.data()}}async function Pa(n){const e=Ne(),t={...ze(n),userId:e,createdAt:le(),updatedAt:le()};return{id:(await qn(Ue(ee,Mo),t)).id,...t}}async function wr(n,e){const t=Me(ee,Mo,n),r={...ze(e),updatedAt:le()};return await at(t,r),{id:n,...r}}const xh=6048e5,Lw=864e5,Mh=6e4,Nh=36e5,tu=Symbol.for("constructDateFrom");function Le(n,e){return typeof n=="function"?n(e):n&&typeof n=="object"&&tu in n?n[tu](e):n instanceof Date?new n.constructor(e):new Date(e)}function xe(n,e){return Le(e||n,n)}function nt(n,e,t){const r=xe(n,t==null?void 0:t.in);return isNaN(e)?Le(n,NaN):(e&&r.setDate(r.getDate()+e),r)}function No(n,e,t){const r=xe(n,t==null?void 0:t.in);if(isNaN(e))return Le(n,NaN);if(!e)return r;const s=r.getDate(),i=Le(n,r.getTime());i.setMonth(r.getMonth()+e+1,0);const o=i.getDate();return s>=o?i:(r.setFullYear(i.getFullYear(),i.getMonth(),s),r)}let $w={};function yi(){return $w}function We(n,e){var c,u,h,f;const t=yi(),r=(e==null?void 0:e.weekStartsOn)??((u=(c=e==null?void 0:e.locale)==null?void 0:c.options)==null?void 0:u.weekStartsOn)??t.weekStartsOn??((f=(h=t.locale)==null?void 0:h.options)==null?void 0:f.weekStartsOn)??0,s=xe(n,e==null?void 0:e.in),i=s.getDay(),o=(i<r?7:0)+i-r;return s.setDate(s.getDate()-o),s.setHours(0,0,0,0),s}function js(n,e){return We(n,{...e,weekStartsOn:1})}function Oh(n,e){const t=xe(n,e==null?void 0:e.in),r=t.getFullYear(),s=Le(t,0);s.setFullYear(r+1,0,4),s.setHours(0,0,0,0);const i=js(s),o=Le(t,0);o.setFullYear(r,0,4),o.setHours(0,0,0,0);const c=js(o);return t.getTime()>=i.getTime()?r+1:t.getTime()>=c.getTime()?r:r-1}function nu(n){const e=xe(n),t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));return t.setUTCFullYear(e.getFullYear()),+n-+t}function _i(n,...e){const t=Le.bind(null,e.find(r=>typeof r=="object"));return e.map(t)}function qs(n,e){const t=xe(n,e==null?void 0:e.in);return t.setHours(0,0,0,0),t}function Vh(n,e,t){const[r,s]=_i(t==null?void 0:t.in,n,e),i=qs(r),o=qs(s),c=+i-nu(i),u=+o-nu(o);return Math.round((c-u)/Lw)}function Fw(n,e){const t=Oh(n,e),r=Le(n,0);return r.setFullYear(t,0,4),r.setHours(0,0,0,0),js(r)}function Ca(n,e,t){return nt(n,e*7,t)}function Uw(n){return Le(n,Date.now())}function Bw(n,e,t){const[r,s]=_i(t==null?void 0:t.in,n,e);return+qs(r)==+qs(s)}function jw(n){return n instanceof Date||typeof n=="object"&&Object.prototype.toString.call(n)==="[object Date]"}function qw(n){return!(!jw(n)&&typeof n!="number"||isNaN(+xe(n)))}function Oo(n,e,t){const[r,s]=_i(t==null?void 0:t.in,n,e),i=ru(r,s),o=Math.abs(Vh(r,s));r.setDate(r.getDate()-i*o);const c=+(ru(r,s)===-i),u=i*(o-c);return u===0?0:u}function ru(n,e){const t=n.getFullYear()-e.getFullYear()||n.getMonth()-e.getMonth()||n.getDate()-e.getDate()||n.getHours()-e.getHours()||n.getMinutes()-e.getMinutes()||n.getSeconds()-e.getSeconds()||n.getMilliseconds()-e.getMilliseconds();return t<0?-1:t>0?1:t}function Ww(n,e){const[t,r]=_i(n,e.start,e.end);return{start:t,end:r}}function Hw(n,e){const{start:t,end:r}=Ww(e==null?void 0:e.in,n);let s=+t>+r;const i=s?+t:+r,o=s?r:t;o.setHours(0,0,0,0);let c=1;const u=[];for(;+o<=i;)u.push(Le(t,o)),o.setDate(o.getDate()+c),o.setHours(0,0,0,0);return s?u.reverse():u}function zw(n,e){const t=xe(n,e==null?void 0:e.in);return t.setFullYear(t.getFullYear(),0,1),t.setHours(0,0,0,0),t}const Gw={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}},Kw=(n,e,t)=>{let r;const s=Gw[n];return typeof s=="string"?r=s:e===1?r=s.one:r=s.other.replace("{{count}}",e.toString()),t!=null&&t.addSuffix?t.comparison&&t.comparison>0?"in "+r:r+" ago":r};function ta(n){return(e={})=>{const t=e.width?String(e.width):n.defaultWidth;return n.formats[t]||n.formats[n.defaultWidth]}}const Qw={full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},Yw={full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},Jw={full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},Xw={date:ta({formats:Qw,defaultWidth:"full"}),time:ta({formats:Yw,defaultWidth:"full"}),dateTime:ta({formats:Jw,defaultWidth:"full"})},Zw={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"},eb=(n,e,t,r)=>Zw[n];function or(n){return(e,t)=>{const r=t!=null&&t.context?String(t.context):"standalone";let s;if(r==="formatting"&&n.formattingValues){const o=n.defaultFormattingWidth||n.defaultWidth,c=t!=null&&t.width?String(t.width):o;s=n.formattingValues[c]||n.formattingValues[o]}else{const o=n.defaultWidth,c=t!=null&&t.width?String(t.width):n.defaultWidth;s=n.values[c]||n.values[o]}const i=n.argumentCallback?n.argumentCallback(e):e;return s[i]}}const tb={narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},nb={narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},rb={narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},sb={narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},ib={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},ab={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},ob=(n,e)=>{const t=Number(n),r=t%100;if(r>20||r<10)switch(r%10){case 1:return t+"st";case 2:return t+"nd";case 3:return t+"rd"}return t+"th"},cb={ordinalNumber:ob,era:or({values:tb,defaultWidth:"wide"}),quarter:or({values:nb,defaultWidth:"wide",argumentCallback:n=>n-1}),month:or({values:rb,defaultWidth:"wide"}),day:or({values:sb,defaultWidth:"wide"}),dayPeriod:or({values:ib,defaultWidth:"wide",formattingValues:ab,defaultFormattingWidth:"wide"})};function cr(n){return(e,t={})=>{const r=t.width,s=r&&n.matchPatterns[r]||n.matchPatterns[n.defaultMatchWidth],i=e.match(s);if(!i)return null;const o=i[0],c=r&&n.parsePatterns[r]||n.parsePatterns[n.defaultParseWidth],u=Array.isArray(c)?ub(c,_=>_.test(o)):lb(c,_=>_.test(o));let h;h=n.valueCallback?n.valueCallback(u):u,h=t.valueCallback?t.valueCallback(h):h;const f=e.slice(o.length);return{value:h,rest:f}}}function lb(n,e){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t)&&e(n[t]))return t}function ub(n,e){for(let t=0;t<n.length;t++)if(e(n[t]))return t}function db(n){return(e,t={})=>{const r=e.match(n.matchPattern);if(!r)return null;const s=r[0],i=e.match(n.parsePattern);if(!i)return null;let o=n.valueCallback?n.valueCallback(i[0]):i[0];o=t.valueCallback?t.valueCallback(o):o;const c=e.slice(s.length);return{value:o,rest:c}}}const hb=/^(\d+)(th|st|nd|rd)?/i,fb=/\d+/i,mb={narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},pb={any:[/^b/i,/^(a|c)/i]},gb={narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},yb={any:[/1/i,/2/i,/3/i,/4/i]},_b={narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},vb={narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},wb={narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},bb={narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},Eb={narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},Tb={any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},Ib={ordinalNumber:db({matchPattern:hb,parsePattern:fb,valueCallback:n=>parseInt(n,10)}),era:cr({matchPatterns:mb,defaultMatchWidth:"wide",parsePatterns:pb,defaultParseWidth:"any"}),quarter:cr({matchPatterns:gb,defaultMatchWidth:"wide",parsePatterns:yb,defaultParseWidth:"any",valueCallback:n=>n+1}),month:cr({matchPatterns:_b,defaultMatchWidth:"wide",parsePatterns:vb,defaultParseWidth:"any"}),day:cr({matchPatterns:wb,defaultMatchWidth:"wide",parsePatterns:bb,defaultParseWidth:"any"}),dayPeriod:cr({matchPatterns:Eb,defaultMatchWidth:"any",parsePatterns:Tb,defaultParseWidth:"any"})},Ab={code:"en-US",formatDistance:Kw,formatLong:Xw,formatRelative:eb,localize:cb,match:Ib,options:{weekStartsOn:0,firstWeekContainsDate:1}};function Sb(n,e){const t=xe(n,e==null?void 0:e.in);return Vh(t,zw(t))+1}function kb(n,e){const t=xe(n,e==null?void 0:e.in),r=+js(t)-+Fw(t);return Math.round(r/xh)+1}function Lh(n,e){var f,_,v,I;const t=xe(n,e==null?void 0:e.in),r=t.getFullYear(),s=yi(),i=(e==null?void 0:e.firstWeekContainsDate)??((_=(f=e==null?void 0:e.locale)==null?void 0:f.options)==null?void 0:_.firstWeekContainsDate)??s.firstWeekContainsDate??((I=(v=s.locale)==null?void 0:v.options)==null?void 0:I.firstWeekContainsDate)??1,o=Le((e==null?void 0:e.in)||n,0);o.setFullYear(r+1,0,i),o.setHours(0,0,0,0);const c=We(o,e),u=Le((e==null?void 0:e.in)||n,0);u.setFullYear(r,0,i),u.setHours(0,0,0,0);const h=We(u,e);return+t>=+c?r+1:+t>=+h?r:r-1}function Rb(n,e){var c,u,h,f;const t=yi(),r=(e==null?void 0:e.firstWeekContainsDate)??((u=(c=e==null?void 0:e.locale)==null?void 0:c.options)==null?void 0:u.firstWeekContainsDate)??t.firstWeekContainsDate??((f=(h=t.locale)==null?void 0:h.options)==null?void 0:f.firstWeekContainsDate)??1,s=Lh(n,e),i=Le((e==null?void 0:e.in)||n,0);return i.setFullYear(s,0,r),i.setHours(0,0,0,0),We(i,e)}function Pb(n,e){const t=xe(n,e==null?void 0:e.in),r=+We(t,e)-+Rb(t,e);return Math.round(r/xh)+1}function X(n,e){const t=n<0?"-":"",r=Math.abs(n).toString().padStart(e,"0");return t+r}const Ct={y(n,e){const t=n.getFullYear(),r=t>0?t:1-t;return X(e==="yy"?r%100:r,e.length)},M(n,e){const t=n.getMonth();return e==="M"?String(t+1):X(t+1,2)},d(n,e){return X(n.getDate(),e.length)},a(n,e){const t=n.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return t.toUpperCase();case"aaa":return t;case"aaaaa":return t[0];case"aaaa":default:return t==="am"?"a.m.":"p.m."}},h(n,e){return X(n.getHours()%12||12,e.length)},H(n,e){return X(n.getHours(),e.length)},m(n,e){return X(n.getMinutes(),e.length)},s(n,e){return X(n.getSeconds(),e.length)},S(n,e){const t=e.length,r=n.getMilliseconds(),s=Math.trunc(r*Math.pow(10,t-3));return X(s,e.length)}},gn={midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},su={G:function(n,e,t){const r=n.getFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return t.era(r,{width:"abbreviated"});case"GGGGG":return t.era(r,{width:"narrow"});case"GGGG":default:return t.era(r,{width:"wide"})}},y:function(n,e,t){if(e==="yo"){const r=n.getFullYear(),s=r>0?r:1-r;return t.ordinalNumber(s,{unit:"year"})}return Ct.y(n,e)},Y:function(n,e,t,r){const s=Lh(n,r),i=s>0?s:1-s;if(e==="YY"){const o=i%100;return X(o,2)}return e==="Yo"?t.ordinalNumber(i,{unit:"year"}):X(i,e.length)},R:function(n,e){const t=Oh(n);return X(t,e.length)},u:function(n,e){const t=n.getFullYear();return X(t,e.length)},Q:function(n,e,t){const r=Math.ceil((n.getMonth()+1)/3);switch(e){case"Q":return String(r);case"QQ":return X(r,2);case"Qo":return t.ordinalNumber(r,{unit:"quarter"});case"QQQ":return t.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return t.quarter(r,{width:"narrow",context:"formatting"});case"QQQQ":default:return t.quarter(r,{width:"wide",context:"formatting"})}},q:function(n,e,t){const r=Math.ceil((n.getMonth()+1)/3);switch(e){case"q":return String(r);case"qq":return X(r,2);case"qo":return t.ordinalNumber(r,{unit:"quarter"});case"qqq":return t.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return t.quarter(r,{width:"narrow",context:"standalone"});case"qqqq":default:return t.quarter(r,{width:"wide",context:"standalone"})}},M:function(n,e,t){const r=n.getMonth();switch(e){case"M":case"MM":return Ct.M(n,e);case"Mo":return t.ordinalNumber(r+1,{unit:"month"});case"MMM":return t.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return t.month(r,{width:"narrow",context:"formatting"});case"MMMM":default:return t.month(r,{width:"wide",context:"formatting"})}},L:function(n,e,t){const r=n.getMonth();switch(e){case"L":return String(r+1);case"LL":return X(r+1,2);case"Lo":return t.ordinalNumber(r+1,{unit:"month"});case"LLL":return t.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return t.month(r,{width:"narrow",context:"standalone"});case"LLLL":default:return t.month(r,{width:"wide",context:"standalone"})}},w:function(n,e,t,r){const s=Pb(n,r);return e==="wo"?t.ordinalNumber(s,{unit:"week"}):X(s,e.length)},I:function(n,e,t){const r=kb(n);return e==="Io"?t.ordinalNumber(r,{unit:"week"}):X(r,e.length)},d:function(n,e,t){return e==="do"?t.ordinalNumber(n.getDate(),{unit:"date"}):Ct.d(n,e)},D:function(n,e,t){const r=Sb(n);return e==="Do"?t.ordinalNumber(r,{unit:"dayOfYear"}):X(r,e.length)},E:function(n,e,t){const r=n.getDay();switch(e){case"E":case"EE":case"EEE":return t.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return t.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return t.day(r,{width:"short",context:"formatting"});case"EEEE":default:return t.day(r,{width:"wide",context:"formatting"})}},e:function(n,e,t,r){const s=n.getDay(),i=(s-r.weekStartsOn+8)%7||7;switch(e){case"e":return String(i);case"ee":return X(i,2);case"eo":return t.ordinalNumber(i,{unit:"day"});case"eee":return t.day(s,{width:"abbreviated",context:"formatting"});case"eeeee":return t.day(s,{width:"narrow",context:"formatting"});case"eeeeee":return t.day(s,{width:"short",context:"formatting"});case"eeee":default:return t.day(s,{width:"wide",context:"formatting"})}},c:function(n,e,t,r){const s=n.getDay(),i=(s-r.weekStartsOn+8)%7||7;switch(e){case"c":return String(i);case"cc":return X(i,e.length);case"co":return t.ordinalNumber(i,{unit:"day"});case"ccc":return t.day(s,{width:"abbreviated",context:"standalone"});case"ccccc":return t.day(s,{width:"narrow",context:"standalone"});case"cccccc":return t.day(s,{width:"short",context:"standalone"});case"cccc":default:return t.day(s,{width:"wide",context:"standalone"})}},i:function(n,e,t){const r=n.getDay(),s=r===0?7:r;switch(e){case"i":return String(s);case"ii":return X(s,e.length);case"io":return t.ordinalNumber(s,{unit:"day"});case"iii":return t.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return t.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return t.day(r,{width:"short",context:"formatting"});case"iiii":default:return t.day(r,{width:"wide",context:"formatting"})}},a:function(n,e,t){const s=n.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return t.dayPeriod(s,{width:"abbreviated",context:"formatting"});case"aaa":return t.dayPeriod(s,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return t.dayPeriod(s,{width:"narrow",context:"formatting"});case"aaaa":default:return t.dayPeriod(s,{width:"wide",context:"formatting"})}},b:function(n,e,t){const r=n.getHours();let s;switch(r===12?s=gn.noon:r===0?s=gn.midnight:s=r/12>=1?"pm":"am",e){case"b":case"bb":return t.dayPeriod(s,{width:"abbreviated",context:"formatting"});case"bbb":return t.dayPeriod(s,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return t.dayPeriod(s,{width:"narrow",context:"formatting"});case"bbbb":default:return t.dayPeriod(s,{width:"wide",context:"formatting"})}},B:function(n,e,t){const r=n.getHours();let s;switch(r>=17?s=gn.evening:r>=12?s=gn.afternoon:r>=4?s=gn.morning:s=gn.night,e){case"B":case"BB":case"BBB":return t.dayPeriod(s,{width:"abbreviated",context:"formatting"});case"BBBBB":return t.dayPeriod(s,{width:"narrow",context:"formatting"});case"BBBB":default:return t.dayPeriod(s,{width:"wide",context:"formatting"})}},h:function(n,e,t){if(e==="ho"){let r=n.getHours()%12;return r===0&&(r=12),t.ordinalNumber(r,{unit:"hour"})}return Ct.h(n,e)},H:function(n,e,t){return e==="Ho"?t.ordinalNumber(n.getHours(),{unit:"hour"}):Ct.H(n,e)},K:function(n,e,t){const r=n.getHours()%12;return e==="Ko"?t.ordinalNumber(r,{unit:"hour"}):X(r,e.length)},k:function(n,e,t){let r=n.getHours();return r===0&&(r=24),e==="ko"?t.ordinalNumber(r,{unit:"hour"}):X(r,e.length)},m:function(n,e,t){return e==="mo"?t.ordinalNumber(n.getMinutes(),{unit:"minute"}):Ct.m(n,e)},s:function(n,e,t){return e==="so"?t.ordinalNumber(n.getSeconds(),{unit:"second"}):Ct.s(n,e)},S:function(n,e){return Ct.S(n,e)},X:function(n,e,t){const r=n.getTimezoneOffset();if(r===0)return"Z";switch(e){case"X":return au(r);case"XXXX":case"XX":return Jt(r);case"XXXXX":case"XXX":default:return Jt(r,":")}},x:function(n,e,t){const r=n.getTimezoneOffset();switch(e){case"x":return au(r);case"xxxx":case"xx":return Jt(r);case"xxxxx":case"xxx":default:return Jt(r,":")}},O:function(n,e,t){const r=n.getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+iu(r,":");case"OOOO":default:return"GMT"+Jt(r,":")}},z:function(n,e,t){const r=n.getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+iu(r,":");case"zzzz":default:return"GMT"+Jt(r,":")}},t:function(n,e,t){const r=Math.trunc(+n/1e3);return X(r,e.length)},T:function(n,e,t){return X(+n,e.length)}};function iu(n,e=""){const t=n>0?"-":"+",r=Math.abs(n),s=Math.trunc(r/60),i=r%60;return i===0?t+String(s):t+String(s)+e+X(i,2)}function au(n,e){return n%60===0?(n>0?"-":"+")+X(Math.abs(n)/60,2):Jt(n,e)}function Jt(n,e=""){const t=n>0?"-":"+",r=Math.abs(n),s=X(Math.trunc(r/60),2),i=X(r%60,2);return t+s+e+i}const ou=(n,e)=>{switch(n){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});case"PPPP":default:return e.date({width:"full"})}},$h=(n,e)=>{switch(n){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});case"pppp":default:return e.time({width:"full"})}},Cb=(n,e)=>{const t=n.match(/(P+)(p+)?/)||[],r=t[1],s=t[2];if(!s)return ou(n,e);let i;switch(r){case"P":i=e.dateTime({width:"short"});break;case"PP":i=e.dateTime({width:"medium"});break;case"PPP":i=e.dateTime({width:"long"});break;case"PPPP":default:i=e.dateTime({width:"full"});break}return i.replace("{{date}}",ou(r,e)).replace("{{time}}",$h(s,e))},Db={p:$h,P:Cb},xb=/^D+$/,Mb=/^Y+$/,Nb=["D","DD","YY","YYYY"];function Ob(n){return xb.test(n)}function Vb(n){return Mb.test(n)}function Lb(n,e,t){const r=$b(n,e,t);if(console.warn(r),Nb.includes(n))throw new RangeError(r)}function $b(n,e,t){const r=n[0]==="Y"?"years":"days of the month";return`Use \`${n.toLowerCase()}\` instead of \`${n}\` (in \`${e}\`) for formatting ${r} to the input \`${t}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`}const Fb=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,Ub=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,Bb=/^'([^]*?)'?$/,jb=/''/g,qb=/[a-zA-Z]/;function K(n,e,t){var f,_,v,I;const r=yi(),s=r.locale??Ab,i=r.firstWeekContainsDate??((_=(f=r.locale)==null?void 0:f.options)==null?void 0:_.firstWeekContainsDate)??1,o=r.weekStartsOn??((I=(v=r.locale)==null?void 0:v.options)==null?void 0:I.weekStartsOn)??0,c=xe(n,t==null?void 0:t.in);if(!qw(c))throw new RangeError("Invalid time value");let u=e.match(Ub).map(R=>{const C=R[0];if(C==="p"||C==="P"){const D=Db[C];return D(R,s.formatLong)}return R}).join("").match(Fb).map(R=>{if(R==="''")return{isToken:!1,value:"'"};const C=R[0];if(C==="'")return{isToken:!1,value:Wb(R)};if(su[C])return{isToken:!0,value:R};if(C.match(qb))throw new RangeError("Format string contains an unescaped latin alphabet character `"+C+"`");return{isToken:!1,value:R}});s.localize.preprocessor&&(u=s.localize.preprocessor(c,u));const h={firstWeekContainsDate:i,weekStartsOn:o,locale:s};return u.map(R=>{if(!R.isToken)return R.value;const C=R.value;(Vb(C)||Ob(C))&&Lb(C,e,String(n));const D=su[C[0]];return D(c,C,s.localize,h)}).join("")}function Wb(n){const e=n.match(Bb);return e?e[1].replace(jb,"'"):n}function Vo(n){return+xe(n)<Date.now()}function vi(n,e){return Bw(Le(n,n),Uw(n))}function rt(n,e){const t=()=>Le(e==null?void 0:e.in,NaN),s=Kb(n);let i;if(s.date){const h=Qb(s.date,2);i=Yb(h.restDateString,h.year)}if(!i||isNaN(+i))return t();const o=+i;let c=0,u;if(s.time&&(c=Jb(s.time),isNaN(c)))return t();if(s.timezone){if(u=Xb(s.timezone),isNaN(u))return t()}else{const h=new Date(o+c),f=xe(0,e==null?void 0:e.in);return f.setFullYear(h.getUTCFullYear(),h.getUTCMonth(),h.getUTCDate()),f.setHours(h.getUTCHours(),h.getUTCMinutes(),h.getUTCSeconds(),h.getUTCMilliseconds()),f}return xe(o+c+u,e==null?void 0:e.in)}const ps={dateTimeDelimiter:/[T ]/,timeZoneDelimiter:/[Z ]/i,timezone:/([Z+-].*)$/},Hb=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,zb=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,Gb=/^([+-])(\d{2})(?::?(\d{2}))?$/;function Kb(n){const e={},t=n.split(ps.dateTimeDelimiter);let r;if(t.length>2)return e;if(/:/.test(t[0])?r=t[0]:(e.date=t[0],r=t[1],ps.timeZoneDelimiter.test(e.date)&&(e.date=n.split(ps.timeZoneDelimiter)[0],r=n.substr(e.date.length,n.length))),r){const s=ps.timezone.exec(r);s?(e.time=r.replace(s[1],""),e.timezone=s[1]):e.time=r}return e}function Qb(n,e){const t=new RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+e)+"})|(\\d{2}|[+-]\\d{"+(2+e)+"})$)"),r=n.match(t);if(!r)return{year:NaN,restDateString:""};const s=r[1]?parseInt(r[1]):null,i=r[2]?parseInt(r[2]):null;return{year:i===null?s:i*100,restDateString:n.slice((r[1]||r[2]).length)}}function Yb(n,e){if(e===null)return new Date(NaN);const t=n.match(Hb);if(!t)return new Date(NaN);const r=!!t[4],s=lr(t[1]),i=lr(t[2])-1,o=lr(t[3]),c=lr(t[4]),u=lr(t[5])-1;if(r)return rE(e,c,u)?Zb(e,c,u):new Date(NaN);{const h=new Date(0);return!tE(e,i,o)||!nE(e,s)?new Date(NaN):(h.setUTCFullYear(e,i,Math.max(s,o)),h)}}function lr(n){return n?parseInt(n):1}function Jb(n){const e=n.match(zb);if(!e)return NaN;const t=na(e[1]),r=na(e[2]),s=na(e[3]);return sE(t,r,s)?t*Nh+r*Mh+s*1e3:NaN}function na(n){return n&&parseFloat(n.replace(",","."))||0}function Xb(n){if(n==="Z")return 0;const e=n.match(Gb);if(!e)return 0;const t=e[1]==="+"?-1:1,r=parseInt(e[2]),s=e[3]&&parseInt(e[3])||0;return iE(r,s)?t*(r*Nh+s*Mh):NaN}function Zb(n,e,t){const r=new Date(0);r.setUTCFullYear(n,0,4);const s=r.getUTCDay()||7,i=(e-1)*7+t+1-s;return r.setUTCDate(r.getUTCDate()+i),r}const eE=[31,null,31,30,31,30,31,31,30,31,30,31];function Fh(n){return n%400===0||n%4===0&&n%100!==0}function tE(n,e,t){return e>=0&&e<=11&&t>=1&&t<=(eE[e]||(Fh(n)?29:28))}function nE(n,e){return e>=1&&e<=(Fh(n)?366:365)}function rE(n,e,t){return e>=1&&e<=53&&t>=0&&t<=6}function sE(n,e,t){return n===24?e===0&&t===0:t>=0&&t<60&&e>=0&&e<60&&n>=0&&n<25}function iE(n,e){return e>=0&&e<=59}function Uh(n,e,t){return No(n,-1,t)}function cu(n,e,t){return Ca(n,-1,t)}async function Bh(n){const e=He(),t=new Date,r=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}`,s=K(t,"yyyy-MM-dd"),[i,o,c,u]=await Promise.all([Dh(r),Ph(14),bw(7),Rh()]),f=(await Ch(t.getFullYear(),t.getMonth()+1)).reduce((p,se)=>p+(se.amount||0),0),_=(i==null?void 0:i.amount)||0,v=_-f,I=_>0?Math.min(f/_*100,100):0,R=f>_?"danger":f>_*.8?"warning":"success",C=t.getDay();let D;if(C===0)D=We(t,{weekStartsOn:6});else{const p=(6-C+7)%7||7;D=nt(t,p),D=new Date(D.getFullYear(),D.getMonth(),D.getDate())}const q=K(D,"yyyy-MM-dd"),F=K(nt(D,1),"yyyy-MM-dd"),[W,J]=await Promise.all([Je(q),Je(F)]),ge=oE(W,J),re=We(t,{weekStartsOn:1}),T=K(nt(re,5),"yyyy-MM-dd"),y=await Dr(T),w=["monday","tuesday","wednesday","thursday","friday","saturday","sunday"],b=w[t.getDay()===0?6:t.getDay()-1],g=u.filter(p=>!p.isPaid),E=g.filter(p=>p.dueDate<s);n.innerHTML=`
    <div class="space-y-4">
      <!-- Greeting -->
      <div class="card">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">👨‍👩‍👦</div>
          <div>
            <p class="text-sm text-gray-500">${aE(e)}</p>
            <p class="text-lg font-semibold text-gray-800">${Xe(s,e)}</p>
          </div>
        </div>
      </div>

      <!-- Budget Summary Card -->
      <div class="card cursor-pointer" onclick="window.location.hash='budget'">
        <div class="card-header">
          <span class="card-title">${S("home_budget_summary")}</span>
          <span class="badge badge-${R}">${_>0?Math.round(I)+"%":S("common_no_data")}</span>
        </div>
        ${_>0?`
          <div class="progress-bar mb-2">
            <div class="progress-fill progress-fill-${R}" style="width: ${I}%"></div>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-500">${S("budget_spent")}: <span class="font-tabular font-medium text-gray-800">${je(f)}</span></span>
            <span class="text-gray-500">${v>=0?S("budget_remaining"):S("budget_over")}: <span class="font-tabular font-medium ${v<0?"text-danger":"text-success"}">${je(Math.abs(v))}</span></span>
          </div>
        `:`
          <p class="text-sm text-gray-400">${S("budget_set_budget")}</p>
        `}
      </div>

      <!-- Quick Actions Grid -->
      <div class="grid grid-cols-2 gap-3">
        <!-- Upcoming Events -->
        <div class="card cursor-pointer" onclick="window.location.hash='events'">
          <div class="card-header">
            <span class="card-title">${S("home_upcoming_events")}</span>
            <span class="badge badge-primary">${o.length}</span>
          </div>
          ${o.length>0?`
            <div class="space-y-2">
              ${o.slice(0,2).map(p=>`
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full event-${p.type}"></span>
                  <span class="text-sm text-gray-700 truncate-2">${p.title}</span>
                </div>
                <p class="text-xs text-gray-400">${Xe(p.date,e)}</p>
              `).join("")}
            </div>
          `:`
            <p class="text-sm text-gray-400">${S("home_no_events")}</p>
          `}
        </div>

        <!-- Bills Due Soon -->
        <div class="card cursor-pointer" onclick="window.location.hash='bills'">
          <div class="card-header">
            <span class="card-title">${S("home_bills_due")}</span>
            ${E.length>0?`<span class="badge badge-danger">${E.length} ${e==="id"?"lewat":"overdue"}</span>`:""}
          </div>
          ${c.length>0?`
            <div class="space-y-2">
              ${c.slice(0,2).map(p=>`
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-700 truncate">${p.title}</span>
                  <span class="text-xs font-tabular font-medium text-warning">${je(p.amount)}</span>
                </div>
                <p class="text-xs text-gray-400">${e==="id"?"Jatuh tempo":"Due"}: ${Xe(p.dueDate,e)}</p>
              `).join("")}
            </div>
          `:`
            <p class="text-sm text-gray-400">${S("home_no_bills")}</p>
          `}
        </div>
      </div>

      <!-- Weekend Progress -->
      <div class="card cursor-pointer" onclick="window.location.hash='weekend'">
        <div class="card-header">
          <span class="card-title">${S("weekend_title")}</span>
          <span class="badge badge-success">${ge}%</span>
        </div>
        <div class="flex gap-4">
          <div class="flex-1">
            <p class="text-xs text-gray-500 mb-1">${S("weekend_saturday")}</p>
            <div class="progress-bar">
              <div class="progress-fill progress-fill-success" style="width: ${W?W.activities.filter(p=>p.status==="done").length/Math.max(W.activities.length,1)*100:0}%"></div>
            </div>
          </div>
          <div class="flex-1">
            <p class="text-xs text-gray-500 mb-1">${S("weekend_sunday")}</p>
            <div class="progress-bar">
              <div class="progress-fill progress-fill-success" style="width: ${J?J.activities.filter(p=>p.status==="done").length/Math.max(J.activities.length,1)*100:0}%"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Meal Plan Preview -->
      <div class="card cursor-pointer" onclick="window.location.hash='mealplan'">
        <div class="card-header">
          <span class="card-title">${S("mealplan_title")}</span>
          <span class="badge badge-primary">${K(t,"d MMM")}</span>
        </div>
        ${y!=null&&y.meals?(()=>{let p=y.meals;if(typeof p=="string")try{p=JSON.parse(p)}catch{p={}}return`
            <div class="space-y-2">
              ${w.slice(0,7).map(se=>{var It;const me=p[se]||{},ot=me.breakfast||me.lunch||me.dinner,ct=se===b;return`
                  <div class="flex items-center gap-2 text-sm ${ct?"bg-primary/5 p-2 rounded-lg":""}">
                    <span class="text-xs font-medium text-gray-500 w-10">${(It=S("mealplan_days."+se))==null?void 0:It.substring(0,3)}</span>
                    <span class="flex-1 truncate ${ot?"text-gray-700":"text-gray-300"}">
                      ${me.lunch||me.breakfast||me.dinner||(ct?"🍽️ Hari ini belum ada menu":"...")}
                    </span>
                    ${ct?'<span class="text-xs text-primary font-medium">Hari ini</span>':""}
                  </div>
                `}).join("")}
            </div>
            `})():`
            <p class="text-sm text-gray-400 text-center py-2">${S("mealplan_no_menu")}</p>
          `}
      </div>

      <!-- Unpaid Bills Summary -->
      ${g.length>0?`
        <div class="card">
          <div class="card-header">
            <span class="card-title">${e==="id"?"Tagihan Belum Lunas":"Unpaid Bills"}</span>
            <span class="text-sm font-tabular font-bold text-warning">${je(g.reduce((p,se)=>p+se.amount,0))}</span>
          </div>
          <div class="space-y-2">
            ${g.slice(0,3).map(p=>`
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-700">${p.title}</span>
                <span class="font-tabular text-gray-600">${je(p.amount)}</span>
              </div>
            `).join("")}
            ${g.length>3?`<p class="text-xs text-gray-400">+${g.length-3} ${e==="id"?"lebih banyak":"more"}</p>`:""}
          </div>
        </div>
      `:""}
    </div>
  `}function aE(n){const e=new Date().getHours();return n==="id"?e<12?"Selamat Pagi":e<15?"Selamat Siang":e<18?"Selamat Sore":"Selamat Malam":e<12?"Good Morning":e<15?"Good Afternoon":e<18?"Good Evening":"Good Night"}function oE(n,e){var c,u,h,f;const t=((c=n==null?void 0:n.activities)==null?void 0:c.length)||0,r=((u=e==null?void 0:e.activities)==null?void 0:u.length)||0,s=((h=n==null?void 0:n.activities)==null?void 0:h.filter(_=>_.status==="done").length)||0,i=((f=e==null?void 0:e.activities)==null?void 0:f.filter(_=>_.status==="done").length)||0,o=t+r;return o===0?0:Math.round((s+i)/o*100)}window.renderHome=Bh;const cE=["salary_farhan","salary_inne","freelance","thr","ortu_gift","other_income"],lE=["makan","transportasi","belanja","zaidan","utilitas","lainnya","loan","core_needed","budget_personal","gift","deposit","utility"];async function mr(n){const e=He(),t=new Date;let r=t.getFullYear(),s=t.getMonth()+1;const i=new URLSearchParams(window.location.hash.split("?")[1]||"");i.get("year")&&i.get("month")&&(r=parseInt(i.get("year")),s=parseInt(i.get("month")));const o=`${r}-${String(s).padStart(2,"0")}`,[c,u]=await Promise.all([Ch(r,s),Dh(o)]),h=c.filter(I=>I.type==="income").reduce((I,R)=>I+(R.amount||0),0),f=c.filter(I=>I.type==="expense").reduce((I,R)=>I+(R.amount||0),0),_=h-f;u!=null&&u.amount;const v={};c.sort((I,R)=>R.date.localeCompare(I.date)).forEach(I=>{v[I.date]||(v[I.date]=[]),v[I.date].push(I)}),n.innerHTML=`
    <div class="space-y-4">
      <!-- Month Navigator -->
      <div class="flex items-center justify-between">
        <button class="btn btn-outline btn-sm" id="prev-month">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <span class="text-sm font-medium text-gray-700">${K(new Date(r,s-1),"MMMM yyyy")}</span>
        <button class="btn btn-outline btn-sm" id="next-month">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>

      <!-- Budget Summary Cards -->
      <div class="grid grid-cols-3 gap-3">
        <div class="card text-center">
          <p class="text-xs text-gray-500 mb-1">${S("budget_income")}</p>
          <p class="text-lg font-bold font-tabular text-success">${je(h)}</p>
        </div>
        <div class="card text-center">
          <p class="text-xs text-gray-500 mb-1">${S("budget_expense")}</p>
          <p class="text-lg font-bold font-tabular text-danger">${je(f)}</p>
        </div>
        <div class="card text-center">
          <p class="text-xs text-gray-500 mb-1">${S("budget_cash_left")}</p>
          <p class="text-lg font-bold font-tabular ${_>=0?"text-success":"text-danger"}">${je(Math.abs(_))}</p>
        </div>
      </div>

      <!-- Add Income/Expense Buttons -->
      <div class="grid grid-cols-2 gap-3">
        <button class="btn btn-success btn-block" id="add-income-btn">
          ➕ ${S("budget_type_income")}
        </button>
        <button class="btn btn-danger btn-block" id="add-expense-btn">
          ➖ ${S("budget_type_expense")}
        </button>
      </div>

      <!-- Transactions List -->
      <div class="card">
        <div class="card-header">
          <span class="text-sm font-medium text-gray-500">${S("budget_today")}</span>
          <span class="text-sm font-tabular font-medium text-gray-700">${c.length} transaksi</span>
        </div>

        ${Object.keys(v).length>0?`
          <div>
            ${Object.entries(v).map(([I,R])=>`
              <div class="mb-3">
                <p class="text-xs text-gray-400 mb-2">${Xe(I,e)}</p>
                ${R.map(C=>`
                  <div class="list-item cursor-pointer" data-id="${C.id}">
                    <div class="list-item-content">
                      <div class="flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full ${C.type==="income"?"bg-success":"bg-danger"}"></span>
                        <span class="list-item-title">${S("budget_categories."+C.category)||C.category}</span>
                        ${C.status==="done"?'<span class="badge badge-success text-xs ml-1">✓</span>':'<span class="badge badge-warning text-xs ml-1">○</span>'}
                      </div>
                      ${C.note?`<p class="list-item-subtitle">${C.note}</p>`:""}
                    </div>
                    <div class="list-item-action text-right">
                      <span class="font-tabular font-medium ${C.type==="income"?"text-success":"text-danger"}">
                        ${C.type==="income"?"+":"-"}${je(C.amount)}
                      </span>
                    </div>
                  </div>
                `).join("")}
              </div>
            `).join("")}
          </div>
        `:`
          <div class="empty-state">
            <div class="empty-state-icon">💸</div>
            <p class="empty-state-text">${S("budget_no_transactions")}</p>
          </div>
        `}
      </div>
    </div>
  `,document.getElementById("prev-month").addEventListener("click",I=>{I.preventDefault();const R=Uh(new Date(r,s-1));window.location.hash=`budget?year=${R.getFullYear()}&month=${R.getMonth()+1}`}),document.getElementById("next-month").addEventListener("click",I=>{I.preventDefault();const R=No(new Date(r,s-1),1);window.location.hash=`budget?year=${R.getFullYear()}&month=${R.getMonth()+1}`}),document.getElementById("add-income-btn").addEventListener("click",()=>{ra(null,"income",async I=>{await eu({...I,type:"income",status:I.status||"not_done"}),j(S("common_success")),mr(n)})}),document.getElementById("add-expense-btn").addEventListener("click",()=>{ra(null,"expense",async I=>{await eu({...I,type:"expense",status:I.status||"not_done"}),j(S("common_success")),mr(n)})}),document.querySelectorAll(".list-item").forEach(I=>{I.addEventListener("click",()=>{const R=I.dataset.id,C=c.find(D=>D.id===R);C&&ra(C,C.type,async D=>{await xw(R,{...D,type:C.type}),ne(),j(S("common_success")),mr(n)},async()=>{await Mw(R),ne(),j(S("common_success")),mr(n)})})})}function ra(n=null,e="expense",t,r){const s=He(),i=K(new Date,"yyyy-MM-dd"),o=(n==null?void 0:n.type)||e,c=o==="income"?cE:lE;dn(`
    <div class="modal-header">
      <h3 class="modal-title">${S(n?"budget_edit":o==="income"?"budget_type_income":"budget_type_expense")}</h3>
      <button class="text-gray-400 hover:text-gray-600" id="modal-close">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>
    <form id="transaction-form" class="modal-body">
      <div class="input-group">
        <label class="input-label">${S("budget_amount")}</label>
        <input type="text" inputmode="numeric" name="amount" class="input" placeholder="0" value="${(n==null?void 0:n.amount)||""}" required min="1">
      </div>
      <div class="input-group">
        <label class="input-label">${S("budget_category")}</label>
        <select name="category" class="select" required>
          ${c.map(u=>`
            <option value="${u}" ${(n==null?void 0:n.category)===u?"selected":""}>${S("budget_categories."+u)}</option>
          `).join("")}
        </select>
      </div>
      <div class="input-group">
        <label class="input-label">${S("budget_date")}</label>
        <input type="date" name="date" class="input" value="${(n==null?void 0:n.date)||i}" required>
      </div>
      <div class="input-group">
        <label class="input-label">Status</label>
        <select name="status" class="select" required>
          <option value="not_done" ${(n==null?void 0:n.status)==="not_done"||!n?"selected":""}>○ ${S("budget_status_not_done")}</option>
          <option value="done" ${(n==null?void 0:n.status)==="done"?"selected":""}>✓ ${S("budget_status_done")}</option>
        </select>
      </div>
      <div class="input-group">
        <label class="input-label">${S("budget_note")}</label>
        <input type="text" name="note" class="input" placeholder="${s==="id"?"Catatan (opsional)":"Note (optional)"}" value="${(n==null?void 0:n.note)||""}">
      </div>
    </form>
    <div class="modal-footer">
      ${n?`<button type="button" class="btn btn-danger flex-1" id="delete-btn">${S("budget_delete")}</button>`:""}
      <button type="submit" form="transaction-form" class="btn btn-primary flex-1">${S("budget_save")}</button>
    </div>
  `),document.getElementById("modal-close").addEventListener("click",ne),document.getElementById("transaction-form").addEventListener("submit",u=>{u.preventDefault();const h=new FormData(u.target),f={amount:parseInt(h.get("amount")),category:h.get("category"),date:h.get("date"),status:h.get("status"),note:h.get("note")||""};t(f)}),n&&r&&document.getElementById("delete-btn").addEventListener("click",()=>{confirm(S("common_confirm_delete"))&&r()})}const uE=[{date:"2026-01-01",name:"Tahun Baru 2026",type:"national"},{date:"2026-01-16",name:"Isra Mikraj Nabi Muhammad SAW",type:"religious"},{date:"2026-02-17",name:"Tahun Baru Imlek 2577",type:"religious"},{date:"2026-03-19",name:"Hari Raya Nyepi 2026",type:"religious"},{date:"2026-03-20",name:"Lebaran Holiday",type:"religious"},{date:"2026-03-21",name:"Lebaran Holiday",type:"religious"},{date:"2026-04-03",name:"Jumat Agung",type:"religious"},{date:"2026-05-01",name:"Hari Buruh Internasional",type:"national"},{date:"2026-05-14",name:"Kenaikan Isa Almasih",type:"religious"},{date:"2026-05-27",name:"Idul Adha 2026",type:"religious"},{date:"2026-05-31",name:"Hari Raya Waisak 2569",type:"religious"},{date:"2026-06-01",name:"Hari Pancasila",type:"national"},{date:"2026-06-17",name:"Tahun Baru Hijriyah 1448",type:"religious"},{date:"2026-08-17",name:"Hari Ulang Tahun Kemerdekaan RI ke-81",type:"national"},{date:"2026-08-25",name:"Maulid Nabi Muhammad SAW",type:"religious"},{date:"2026-12-25",name:"Natal 2026",type:"religious"}],dE=[{date:"2026-05-27",name:"Ulang Tahun Farhan",type:"personal"}];function hE(){return[...uE,...dE].sort((n,e)=>n.date.localeCompare(e.date))}const fE=["birthday","anniversary","school","holiday","other"],Ws={birthday:"#EC4899",anniversary:"#EF4444",school:"#3B82F6",holiday:"#F59E0B",other:"#64748B"};async function mE(n){var b;const e=He(),t=new Date;let r=t.getFullYear(),s=t.getMonth()+1;const i=new URLSearchParams(window.location.hash.split("?")[1]||"");i.get("year")&&i.get("month")&&(r=parseInt(i.get("year")),s=parseInt(i.get("month")));const[o]=await Promise.all([Rw()]),c=`${r}-${String(s).padStart(2,"0")}`,u=o.filter(g=>g.date&&g.date.startsWith(c)),h=hE(),f=h.filter(g=>g.date.startsWith(c)),_={};u.forEach(g=>{_[g.date]||(_[g.date]=[]),_[g.date].push(g)}),f.forEach(g=>{_[g.date]||(_[g.date]=[]),_[g.date].push({...g,title:g.name,id:-Math.abs(g.date.split("-").join("")),isHoliday:!0})});const v=(await Ph(90)).sort((g,E)=>g.date.localeCompare(E.date)),I=new Date;I.setDate(I.getDate()+90);const R=K(new Date,"yyyy-MM-dd"),C=K(I,"yyyy-MM-dd"),D=h.filter(g=>g.date>=R&&g.date<=C).map(g=>({...g,title:g.name,id:-Math.abs(g.date.split("-").join("")),isHoliday:!0})),q=[...v,...D].sort((g,E)=>g.date.localeCompare(E.date)),F=new Date;F.setDate(F.getDate()+7);const W=K(F,"yyyy-MM-dd"),J=h.filter(g=>g.date>=R&&g.date<=W).map(g=>({...g,title:g.name})),ge=new Date(r,s-1,1),re=new Date(r,s,0),T=Hw({start:ge,end:re}),y=e==="id"?["Min","Sen","Sel","Rab","Kam","Jum","Sab"]:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],w=ge.getDay();n.innerHTML=`
    <div class="space-y-4">
      <!-- Month Navigator -->
      <div class="flex items-center justify-between">
        <button class="btn btn-outline btn-sm" id="prev-month">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <span class="text-sm font-medium text-gray-700">${K(new Date(r,s-1),"MMMM yyyy")}</span>
        <button class="btn btn-outline btn-sm" id="next-month">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>

      <!-- Mini Calendar -->
      <div class="card">
        <div class="mini-calendar-grid mb-1">
          ${y.map(g=>`<div class="mini-calendar-day-header">${g}</div>`).join("")}
        </div>
        <div class="mini-calendar-grid">
          ${Array(w).fill("").map(()=>'<div class="mini-calendar-day mini-calendar-day-other"></div>').join("")}
          ${T.map(g=>{var me;const E=K(g,"yyyy-MM-dd"),p=((me=_[E])==null?void 0:me.length)>0,se=vi(g);return`
              <div class="mini-calendar-day ${se?"mini-calendar-day-today":""} ${p&&!se?"mini-calendar-day-has-event":""}"
                   data-date="${E}"
                   ${p?`title="${_[E].map(ot=>ot.title).join(", ")}"`:""}>
                ${g.getDate()}
              </div>
            `}).join("")}
        </div>

        <!-- Events for selected date -->
        <div id="selected-date-events" class="mt-3 pt-3 border-t border-gray-100">
          <p class="text-xs text-gray-400 text-center">${e==="id"?"Klik tanggal untuk lihat agenda":"Tap a date to see events"}</p>
          <button class="btn btn-primary btn-sm w-full mt-3" id="add-event-on-date-btn">+ ${S("events_add")}</button>
        </div>
      </div>

      ${J.length>0?`
      <div class="card border-purple-200 bg-purple-50">
        <div class="card-header">
          <span class="text-sm font-medium text-purple-700">${S("events_holidays_week")}</span>
          <span class="badge badge-purple">${J.length}</span>
        </div>
        <div class="space-y-2">
          ${J.map(g=>`
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-lg">${g.type==="national"?"🇮🇩":"🎉"}</span>
                <div>
                  <p class="text-sm font-medium text-gray-800">${g.name}</p>
                  <p class="text-xs text-purple-600">${Xe(g.date,e)}</p>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
      `:""}


      <!-- Upcoming Events -->
      <div class="card">
        <div class="card-header">
          <span class="text-sm font-medium text-gray-500">${S("events_upcoming")}</span>
        </div>

        ${q.length>0?`
          <div class="space-y-2">
            ${q.slice(0,10).map(g=>`
              <div class="list-item cursor-pointer event-item" data-id="${g.id}">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${g.isHoliday?"bg-purple-100":`event-${g.type}`}">
                    ${g.isHoliday?"🎉":g.type==="birthday"?"🎂":g.type==="anniversary"?"💕":g.type==="school"?"📚":g.type==="holiday"?"🎉":"📌"}
                  </div>
                  <div class="list-item-content">
                    <span class="list-item-title">${g.title}</span>
                    ${g.isHoliday?`<span class="badge badge-purple text-xs ml-2">${e==="id"?"Libur":"Holiday"}</span>`:`<span class="badge badge-${g.type==="birthday"?"primary":g.type==="anniversary"?"danger":"gray"} text-xs ml-2">${S("events_types."+g.type)}</span>`}
                    <p class="list-item-subtitle">${Xe(g.date,e)}</p>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
        `:`
          <div class="empty-state">
            <div class="empty-state-icon">📅</div>
            <p class="empty-state-text">${S("events_no_events")}</p>
          </div>
        `}
      </div>
    </div>
  `,document.getElementById("prev-month").addEventListener("click",g=>{g.preventDefault();const E=Uh(new Date(r,s-1));window.location.hash=`events?year=${E.getFullYear()}&month=${E.getMonth()+1}`}),document.getElementById("next-month").addEventListener("click",g=>{g.preventDefault();const E=No(new Date(r,s-1),1);window.location.hash=`events?year=${E.getFullYear()}&month=${E.getMonth()+1}`}),document.querySelectorAll(".mini-calendar-day:not(.mini-calendar-day-other)").forEach(g=>{g.addEventListener("click",()=>{var me;const E=g.dataset.date,p=_[E]||[],se=document.getElementById("selected-date-events");p.length>0?(se.innerHTML=`
          <p class="text-xs text-gray-500 mb-2">${Xe(E,e)}</p>
          ${p.map(ot=>`
            <div class="list-item cursor-pointer event-item" data-id="${ot.id}">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full" style="background: ${Ws[ot.type]||Ws.other}"></span>
                <span class="list-item-title">${ot.title}</span>
              </div>
            </div>
          `).join("")}
          <button class="btn btn-outline btn-sm w-full mt-2" id="add-event-on-date-btn">+ ${S("events_add")}</button>
        `,lu(se,o)):(se.innerHTML=`
          <p class="text-xs text-gray-500 mb-2">${Xe(E,e)}</p>
          <p class="text-xs text-gray-400 mb-3">${S("events_no_events")}</p>
          <button class="btn btn-primary btn-sm w-full" id="add-event-on-date-btn">+ ${S("events_add")}</button>
        `,(me=document.getElementById("add-event-on-date-btn"))==null||me.addEventListener("click",()=>Hs(null,E)))})}),lu(n,o),(b=document.getElementById("add-event-on-date-btn"))==null||b.addEventListener("click",()=>Hs())}function lu(n,e){n.querySelectorAll(".event-item").forEach(t=>{t.addEventListener("click",()=>{const r=t.dataset.id,s=e.find(i=>i.id===r);s&&Hs(s)})})}function Hs(n=null,e=null){const t=He(),r=K(new Date,"yyyy-MM-dd");dn(`
    <div class="modal-header">
      <h3 class="modal-title">${S(n?"events_edit":"events_add")}</h3>
      <button class="text-gray-400 hover:text-gray-600" id="modal-close">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>
    <form id="event-form" class="modal-body">
      <div class="input-group">
        <label class="input-label">${S("events_name")}</label>
        <input type="text" name="title" class="input" placeholder="${t==="id"?"Nama agenda":"Event name"}" value="${(n==null?void 0:n.title)||""}" required>
      </div>
      <div class="input-group">
        <label class="input-label">${S("events_date")}</label>
        <input type="date" name="date" class="input" value="${(n==null?void 0:n.date)||e||r}" required>
      </div>
      <div class="input-group">
        <label class="input-label">${S("events_type")}</label>
        <select name="type" class="select" required>
          ${fE.map(s=>`
            <option value="${s}" ${(n==null?void 0:n.type)===s?"selected":""}>${S("events_types."+s)}</option>
          `).join("")}
        </select>
      </div>
      <div class="input-group">
        <label class="input-label">${t==="id"?"Catatan":"Note"}</label>
        <input type="text" name="note" class="input" placeholder="${t==="id"?"Catatan (opsional)":"Note (optional)"}" value="${(n==null?void 0:n.note)||""}">
      </div>
    </form>
    <div class="modal-footer">
      ${n?`<button type="button" class="btn btn-danger flex-1" id="delete-btn">${S("events_delete")}</button>`:""}
      <button type="submit" form="event-form" class="btn btn-primary flex-1">${S("events_save")}</button>
    </div>
  `),document.getElementById("modal-close").addEventListener("click",ne),document.getElementById("event-form").addEventListener("submit",async s=>{s.preventDefault();const i=new FormData(s.target),o={title:i.get("title"),date:i.get("date"),type:i.get("type"),note:i.get("note")||"",color:Ws[i.get("type")]||Ws.other};if(n)try{await Cw(n.id,o),ne(),j(S("common_success")),window.location.reload()}catch(c){console.error("Error updating event:",c),j(S("common_error"),"error")}else try{await Pw(o),ne(),j(S("common_success")),window.location.reload()}catch(c){console.error("Error adding event:",c),j(S("common_error"),"error")}}),n&&document.getElementById("delete-btn").addEventListener("click",async()=>{if(confirm(S("common_confirm_delete")))try{await Dw(n.id),ne(),j(S("common_success")),window.location.reload()}catch(s){console.error("Error deleting event:",s),j(S("common_error"),"error")}})}window.showAddModal=window.showAddModal||{};window.showAddModal.events=()=>Hs();const sa=[{name:"Nasi Goreng Kampung",category:"dinner",emoji:"🍳",tags:["spicy","rice"],description:"Nasi goreng dengan telur, sayur, dan bumbu sederhana"},{name:"Ayam Geprek",category:"lunch",emoji:"🍗",tags:["ayam","pedas"],description:"Ayam crispy dengan sambal bawang pedas"},{name:"Soto Ayam",category:"lunch",emoji:"🥣",tags:["sup","kuah"],description:"Sup ayam dengan kuning, soun, dan tauge"},{name:"Rendang",category:"dinner",emoji:"🥩",tags:["daging","kental"],description:"Daging sapi dimasak lama dengan santan dan rempah"},{name:"Sayur Asem",category:"lunch",emoji:"🥗",tags:["sayur","asam"],description:"Sayur kuah asam dengan kacang tanah dan sayur"},{name:"Gulai Ikan",category:"lunch",emoji:"🐟",tags:["ikan","kuah"],description:"Ikan kuah santan dengan kunyit dan rempah"},{name:"Nasi Padang",category:"dinner",emoji:"🍚",tags:["rice","aneka"],description:"Nasi putih dengan lauk pauk padang"},{name:"Capcay Goreng",category:"dinner",emoji:"🥦",tags:["sayur","sehat"],description:"Tumisan sayuran dengan bakso dan telur"},{name:"Mie Goreng",category:"dinner",emoji:"🍝",tags:["mie","goreng"],description:"Mie goreng dengan sayuran dan telur"},{name:"Tumis Kangkung",category:"lunch",emoji:"🥬",tags:["sayur","murah"],description:"Kangkung tumis dengan bawang dan terasi"},{name:"Pepes Ikan",category:"dinner",emoji:"🐟",tags:["ikan","bungkus"],description:"Ikan bumbu lengkap dibungkus pisang"},{name:"Ayam Bakar",category:"dinner",emoji:"🔥",tags:["ayam","bakaran"],description:"Ayam bakar dengan bumbu kecap manis"},{name:"Sayur Sop",category:"lunch",emoji:"🥣",tags:["sup","sehat"],description:"Sop sayuran dengan daging ayam dan wortel"},{name:"Telur Balado",category:"lunch",emoji:"🍳",tags:["telur","pedas"],description:"Telur rebus dengan sambal balado"},{name:"Tahu Tempe Goreng",category:"lunch",emoji:"🧈",tags:["vegetarian","murah"],description:"Tahu dan tempe goreng crispy"},{name:"Sarden Goreng",category:"lunch",emoji:"🐟",tags:["ikan","simpel"],description:"Sarden kaleng yang digoreng dengan bawang"},{name:"Nasi Uduk",category:"breakfast",emoji:"🍚",tags:["nasi","sarapan"],description:"Nasi uduk dengan pelengkap like tempe dan telur"},{name:"Bubur Ayam",category:"breakfast",emoji:"🥣",tags:["bubur","sarapan"],description:"Bubur nasi dengan taburan ayam suwir dan cakwe"},{name:"Roti Bakar",category:"breakfast",emoji:"🍞",tags:["roti","sarapan"],description:"Roti bakar dengan selai kacang atau cokelat"},{name:"Nasi Kuning",category:"lunch",emoji:"🍛",tags:["nasi","kuning"],description:"Nasi kuning dengan lauk ayam geprek dan sayur"},{name:"Lalap Terong",category:"lunch",emoji:"🍆",tags:["sayur","simpel"],description:"Terong panggang dengan sambal terasi"},{name:"Bakso Goreng",category:"dinner",emoji:"🍡",tags:["bakso","goreng"],description:"Bakso goreng crispy dengan saus"},{name:"Gadogado",category:"lunch",emoji:"🥗",tags:["sayur","kacangan"],description:"Sayuran kacangan dengan bumbu kacang"},{name:"Mie Tektek",category:"dinner",emoji:"🍜",tags:["mie","kuah"],description:"Mie kuah dengan bakso dan sayuran"},{name:"Tempe Orek",category:"lunch",emoji:"🧈",tags:["tempe","goreng"],description:"Tempe potong goreng dengan kecap dan daun"},{name:"Perkedel Kentang",category:"lunch",emoji:"🥔",tags:["kentang","goreng"],description:"Kentang goreng yang dihaluskan dengan bumbu"},{name:"Sup Merah",category:"lunch",emoji:"🥣",tags:["sup","kentang"],description:"Sup dengan kentang, wortel, dan ayam"},{name:"Kerang Bening",category:"dinner",emoji:"🦪",tags:["kerang","kuah"],description:"Kerang kuah bening dengan jahe dan bawang"},{name:"Ikan Bakar",category:"dinner",emoji:"🔥",tags:["ikan","bakaran"],description:"Ikan bakar dengan sambal kecap"},{name:"Pisang Goreng",category:"breakfast",emoji:"🍌",tags:["pisang","goreng"],description:"Pisang goreng crispy sebagai cemilan sarapan"}],pE=["breakfast","lunch","dinner"],bn=["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];async function gE(n){const e=He(),t=new Date;let r=0;const s=new URLSearchParams(window.location.hash.split("?")[1]||"");if(s.get("week")){const f=rt(s.get("week"));r=Math.floor((f.getTime()-We(t,{weekStartsOn:1}).getTime())/(10080*60*1e3))}const i=We(t,{weekStartsOn:1}),o=Ca(i,r),c=K(o,"yyyy-MM-dd"),u=bn.map((f,_)=>{const v=nt(o,_);return{key:f,date:K(v,"yyyy-MM-dd"),label:S("mealplan_days."+f),shortLabel:S("mealplan_days."+f).substring(0,3),isToday:K(v,"yyyy-MM-dd")===K(t,"yyyy-MM-dd")}});let h=await Dr(c);if(!h)h={weekStart:c,meals:{}},bn.forEach(f=>{h.meals[f]={breakfast:"",lunch:"",dinner:""}});else{if(typeof h.meals=="string")try{h.meals=JSON.parse(h.meals)}catch{h.meals={}}bn.forEach(f=>{h.meals[f]||(h.meals[f]={breakfast:"",lunch:"",dinner:""})})}n.innerHTML=`
    <div class="space-y-4">
      <!-- Week Navigator -->
      <div class="flex items-center justify-between">
        <button class="btn btn-outline btn-sm" id="prev-week">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <div class="text-center">
          <span class="text-sm font-medium text-gray-700">${K(o,"d MMM")} - ${K(nt(o,6),"d MMM yyyy")}</span>
          ${r===0?`<p class="text-xs text-primary">${e==="id"?"Minggu ini":"This week"}</p>`:""}
        </div>
        <button class="btn btn-outline btn-sm" id="next-week">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>

      <!-- Copy Last Week Button -->
      <button class="btn btn-outline btn-block btn-sm" id="copy-last-week">
        📋 ${S("mealplan_copy_week")}
      </button>

      <!-- Meal Plan Grid -->
      <div class="card overflow-x-auto">
        <div class="min-w-[600px]">
          <!-- Header Row -->
          <div class="grid grid-cols-8 gap-1 mb-2">
            <div class="p-2"></div>
            ${u.map(f=>`
              <div class="p-2 text-center ${f.isToday?"bg-primary/10 rounded-lg":""}">
                <p class="text-xs font-medium text-gray-500">${f.shortLabel}</p>
                <p class="text-sm font-semibold ${f.isToday?"text-primary":"text-gray-700"}">${f.date.split("-")[2]}</p>
              </div>
            `).join("")}
          </div>

          <!-- Meal Rows -->
          ${pE.map(f=>`
            <div class="grid grid-cols-8 gap-1 mb-2">
              <div class="p-2 flex items-center">
                <span class="text-xs font-medium text-gray-500">
                  ${f==="breakfast"?"🌅":f==="lunch"?"☀️":"🌙"}
                </span>
                <span class="text-xs font-medium text-gray-500 ml-1">${S("mealplan_"+f)}</span>
              </div>
              ${u.map(_=>{var v,I;return`
                <div class="p-1">
                  <button class="meal-slot w-full min-h-[50px] p-2 text-xs text-left border border-gray-100 rounded-lg hover:border-primary/50 transition-colors ${_.isToday?"bg-primary/5 border-primary/30":"bg-gray-50"}"
                          data-day="${_.key}"
                          data-meal="${f}"
                          data-value="${((v=h.meals[_.key])==null?void 0:v[f])||""}">
                    ${((I=h.meals[_.key])==null?void 0:I[f])||'<span class="text-gray-300">+</span>'}
                  </button>
                </div>
              `}).join("")}
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Legend -->
      <div class="flex gap-4 text-xs text-gray-400 justify-center">
        <span>🌅 ${S("mealplan_breakfast")}</span>
        <span>☀️ ${S("mealplan_lunch")}</span>
        <span>🌙 ${S("mealplan_dinner")}</span>
      </div>

      <!-- Sample Menu Inspiration -->
      <div class="card bg-gradient-to-r from-orange-50 to-yellow-50">
        <div class="card-header">
          <span class="text-sm font-medium text-orange-700">💡 Inspirasi Menu Rumahan</span>
          <span class="badge badge-orange text-xs">${sa.length} resep</span>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
          ${sa.slice(0,12).map(f=>`
            <button class="sample-menu-btn text-left p-2 text-xs border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors" data-name="${f.name}">
              <span class="font-medium text-gray-800">${f.emoji} ${f.name}</span>
              <p class="text-gray-500 mt-0.5">${f.category==="breakfast"?"🌅":f.category==="lunch"?"☀️":"🌙"}</p>
            </button>
          `).join("")}
        </div>
        <div class="flex flex-wrap gap-1 mt-2">
          <span class="text-xs text-gray-500">Filter:</span>
          <button class="filter-menu-btn px-2 py-0.5 text-xs border border-gray-200 rounded-full hover:bg-gray-100 ${e==="id"?"bg-primary text-white":""}" data-filter="all">Semua</button>
          <button class="filter-menu-btn px-2 py-0.5 text-xs border border-gray-200 rounded-full hover:bg-gray-100" data-filter="breakfast">🌅 Sarapan</button>
          <button class="filter-menu-btn px-2 py-0.5 text-xs border border-gray-200 rounded-full hover:bg-gray-100" data-filter="lunch">☀️ Makan Siang</button>
          <button class="filter-menu-btn px-2 py-0.5 text-xs border border-gray-200 rounded-full hover:bg-gray-100" data-filter="dinner">🌙 Makan Malam</button>
        </div>
      </div>
    </div>
  `,document.getElementById("prev-week").addEventListener("click",()=>{const f=cu(o);window.location.hash=`mealplan?week=${K(f,"yyyy-MM-dd")}`}),document.getElementById("next-week").addEventListener("click",()=>{const f=Ca(o,1);window.location.hash=`mealplan?week=${K(f,"yyyy-MM-dd")}`}),document.getElementById("copy-last-week").addEventListener("click",async()=>{const f=cu(o),_=K(f,"yyyy-MM-dd"),v=await Dr(_);if(v&&v.meals){const I={meals:typeof v.meals=="string"?v.meals:JSON.stringify(v.meals)};await As(c,I.meals),j(S("common_success")),window.location.reload()}else j(e==="id"?"Tidak ada rencana minggu lalu":"No plan from last week","warning")}),document.querySelectorAll(".meal-slot").forEach(f=>{f.addEventListener("click",()=>{const _=f.dataset.day,v=f.dataset.meal,I=f.dataset.value||"";Da(_,v,I,async R=>{h.meals[_]||(h.meals[_]={breakfast:"",lunch:"",dinner:""}),h.meals[_][v]=R,await As(c,JSON.stringify(h.meals)),j(S("common_success")),window.location.reload()})})}),document.querySelectorAll(".sample-menu-btn").forEach(f=>{f.addEventListener("click",()=>{const _=f.dataset.name,v=bn[new Date().getDay()===0?6:new Date().getDay()-1];Da(v,"lunch",_,async I=>{h.meals[v]||(h.meals[v]={breakfast:"",lunch:"",dinner:""}),h.meals[v].lunch=I,await As(c,JSON.stringify(h.meals)),j(S("common_success")),window.location.reload()})})}),document.querySelectorAll(".filter-menu-btn").forEach(f=>{f.addEventListener("click",()=>{var R;const _=f.dataset.filter,v=(R=n.querySelector(".sample-menu-btn"))==null?void 0:R.closest(".grid");if(!v)return;v.querySelectorAll(".sample-menu-btn").forEach(C=>{const D=C.dataset.name,q=sa.find(F=>F.name===D);_==="all"||(q==null?void 0:q.category)===_?C.classList.remove("hidden"):C.classList.add("hidden")}),document.querySelectorAll(".filter-menu-btn").forEach(C=>{C.classList.remove("bg-primary","text-white")}),f.classList.add("bg-primary","text-white")})})}function Da(n,e,t,r){const s=He(),i=S("mealplan_days."+n),o=S("mealplan_"+e);dn(`
    <div class="modal-header">
      <h3 class="modal-title">${o} - ${i}</h3>
      <button class="text-gray-400 hover:text-gray-600" id="modal-close">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>
    <form id="meal-form" class="modal-body">
      <div class="input-group">
        <label class="input-label">Menu</label>
        <input type="text" name="menu" class="input" placeholder="${s==="id"?"Nama menu":"Menu name"}" value="${t}" required>
      </div>
    </form>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary flex-1" id="clear-btn">${s==="id"?"Hapus":"Clear"}</button>
      <button type="submit" form="meal-form" class="btn btn-primary flex-1">${S("common_save")}</button>
    </div>
  `),document.getElementById("modal-close").addEventListener("click",ne),document.getElementById("meal-form").addEventListener("submit",c=>{c.preventDefault();const u=new FormData(c.target);r(u.get("menu"))}),document.getElementById("clear-btn").addEventListener("click",()=>{r("")})}window.showAddModal=window.showAddModal||{};window.showAddModal.mealplan=()=>{Da("monday","breakfast","",async n=>{if(n){const e=new Date,t=We(e,{weekStartsOn:1}),r=K(t,"yyyy-MM-dd"),s=bn[e.getDay()===0?6:e.getDay()-1];let i=await Dr(r);if(!i)i={weekStart:r,meals:{}},bn.forEach(o=>i.meals[o]={breakfast:"",lunch:"",dinner:""});else if(typeof i.meals=="string")try{i.meals=JSON.parse(i.meals)}catch{i.meals={}}i.meals[s]||(i.meals[s]={breakfast:"",lunch:"",dinner:""}),i.meals[s].breakfast=n,await As(r,JSON.stringify(i.meals)),ne(),j(S("common_success")),window.location.reload()}})};const yE=["outdoor","indoor","education","family"],jh={outdoor:"🌳",indoor:"🏠",education:"📚",family:"👨‍👩‍👦"};async function _E(n){const e=new Date,t=e.getDay();let r;if(t===0)r=We(e,{weekStartsOn:6});else{const C=(6-t+7)%7||7;r=nt(e,C),r=new Date(r.getFullYear(),r.getMonth(),r.getDate())}const s=K(r,"yyyy-MM-dd"),i=K(nt(r,1),"yyyy-MM-dd"),[o,c]=await Promise.all([Je(s),Je(i)]);o||await Pa({date:s,activities:[]}),c||await Pa({date:i,activities:[]});const[u,h]=await Promise.all([Je(s),Je(i)]),f=(u==null?void 0:u.activities)||[],_=(h==null?void 0:h.activities)||[],v=du(f),I=du(_),R=wE(f,_);n.innerHTML=`
    <div class="space-y-4">
      <!-- Week Header -->
      <div class="text-center">
        <p class="text-sm font-medium text-gray-700">${K(r,"d MMM")} - ${K(nt(r,1),"d MMM yyyy")}</p>
        <p class="text-xs text-gray-400">${S("weekend_progress")}: ${R}%</p>
      </div>

      <!-- Progress Bars -->
      <div class="card">
        <div class="flex gap-4">
          <div class="flex-1">
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs font-medium text-gray-500">${S("weekend_saturday")}</span>
              <span class="text-xs font-medium text-success">${v}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill progress-fill-success" style="width: ${v}%"></div>
            </div>
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs font-medium text-gray-500">${S("weekend_sunday")}</span>
              <span class="text-xs font-medium text-success">${I}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill progress-fill-success" style="width: ${I}%"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Saturday -->
      <div class="card">
        <div class="card-header">
          <div class="flex items-center gap-2">
            <span class="text-lg">🗓️</span>
            <span class="text-sm font-semibold text-gray-700">${S("weekend_saturday")}</span>
          </div>
          <span class="text-xs text-gray-400">${K(rt(s),"d MMM")}</span>
        </div>

        ${f.length>0?`
          <div class="space-y-2">
            ${f.map((C,D)=>uu(C,s,D)).join("")}
          </div>
        `:`
          <div class="empty-state">
            <div class="empty-state-icon">🎯</div>
            <p class="empty-state-text">${S("weekend_no_activities")}</p>
          </div>
        `}

        <button class="btn btn-outline btn-block btn-sm mt-3 add-activity-btn" data-date="${s}">
          + ${S("weekend_add")}
        </button>
      </div>

      <!-- Sunday -->
      <div class="card">
        <div class="card-header">
          <div class="flex items-center gap-2">
            <span class="text-lg">🌟</span>
            <span class="text-sm font-semibold text-gray-700">${S("weekend_sunday")}</span>
          </div>
          <span class="text-xs text-gray-400">${K(rt(i),"d MMM")}</span>
        </div>

        ${_.length>0?`
          <div class="space-y-2">
            ${_.map((C,D)=>uu(C,i,D)).join("")}
          </div>
        `:`
          <div class="empty-state">
            <div class="empty-state-icon">🎯</div>
            <p class="empty-state-text">${S("weekend_no_activities")}</p>
          </div>
        `}

        <button class="btn btn-outline btn-block btn-sm mt-3 add-activity-btn" data-date="${i}">
          + ${S("weekend_add")}
        </button>
      </div>
    </div>
  `,document.querySelectorAll(".add-activity-btn").forEach(C=>{C.addEventListener("click",()=>{const D=C.dataset.date;Lo(D,null,async q=>{const F=await Je(D),W=(F==null?void 0:F.activities)||[];W.push(q),await wr(F.id,{activities:W}),ne(),j(S("common_success")),window.location.reload()})})}),vE(n)}function uu(n,e,t){const r=n.status==="done";return`
    <div class="flex items-center gap-3 p-2 rounded-lg ${r?"bg-success/5":"bg-gray-50"} activity-item" data-date="${e}" data-index="${t}">
      <button class="toggle-done w-8 h-8 rounded-full flex items-center justify-center ${r?"bg-success text-white":"bg-gray-200 text-gray-400"} hover:opacity-80 transition-opacity">
        ${r?"✓":""}
      </button>
      <div class="flex-1">
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium ${r?"line-through text-gray-400":"text-gray-700"}">${n.title}</span>
          <span class="badge weekend-${n.category} text-xs">${jh[n.category]} ${S("weekend_categories."+n.category)}</span>
        </div>
        ${n.location?`<p class="text-xs text-gray-400">📍 ${n.location}</p>`:""}
      </div>
      <button class="edit-activity w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path></svg>
      </button>
    </div>
  `}function vE(n){n.querySelectorAll(".toggle-done").forEach(e=>{e.addEventListener("click",async t=>{t.stopPropagation();const r=e.closest(".activity-item"),s=r.dataset.date,i=parseInt(r.dataset.index),o=await Je(s),c=[...(o==null?void 0:o.activities)||[]],u=c[i];u.status=u.status==="done"?"pending":"done",u.status==="done"?u.completedAt=new Date().toISOString():u.completedAt=null,await wr(o.id,{activities:c}),j(S("common_success")),window.location.reload()})}),n.querySelectorAll(".edit-activity").forEach(e=>{e.addEventListener("click",async t=>{var u;t.stopPropagation();const r=e.closest(".activity-item"),s=r.dataset.date,i=parseInt(r.dataset.index),o=await Je(s),c=(u=o==null?void 0:o.activities)==null?void 0:u[i];c&&Lo(s,c,async h=>{const f=[...(o==null?void 0:o.activities)||[]];f[i]={...f[i],...h},await wr(o.id,{activities:f}),ne(),j(S("common_success")),window.location.reload()},async()=>{const h=[...(o==null?void 0:o.activities)||[]];h.splice(i,1),await wr(o.id,{activities:h}),ne(),j(S("common_success")),window.location.reload()})})})}function Lo(n,e=null,t,r=null){const s=He();dn(`
    <div class="modal-header">
      <h3 class="modal-title">${S(e?"common_edit":"weekend_add")}</h3>
      <button class="text-gray-400 hover:text-gray-600" id="modal-close">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>
    <form id="activity-form" class="modal-body">
      <div class="input-group">
        <label class="input-label">${s==="id"?"Nama Aktivitas":"Activity Name"}</label>
        <input type="text" name="title" class="input" placeholder="${s==="id"?"Nama aktivitas":"Activity name"}" value="${(e==null?void 0:e.title)||""}" required>
      </div>
      <div class="input-group">
        <label class="input-label">${S("weekend_categories.outdoor").replace("Outdoor","Kategori")||"Category"}</label>
        <select name="category" class="select" required>
          ${yE.map(i=>`
            <option value="${i}" ${(e==null?void 0:e.category)===i?"selected":""}>${jh[i]} ${S("weekend_categories."+i)}</option>
          `).join("")}
        </select>
      </div>
      <div class="input-group">
        <label class="input-label">${s==="id"?"Lokasi (opsional)":"Location (optional)"}</label>
        <input type="text" name="location" class="input" placeholder="${s==="id"?"Tempat":"Place"}" value="${(e==null?void 0:e.location)||""}">
      </div>
    </form>
    <div class="modal-footer">
      ${e&&r?`<button type="button" class="btn btn-danger flex-1" id="delete-btn">${S("common_delete")}</button>`:""}
      <button type="submit" form="activity-form" class="btn btn-primary flex-1">${S("common_save")}</button>
    </div>
  `),document.getElementById("modal-close").addEventListener("click",ne),document.getElementById("activity-form").addEventListener("submit",i=>{i.preventDefault();const o=new FormData(i.target),c={title:o.get("title"),category:o.get("category"),location:o.get("location")||"",status:(e==null?void 0:e.status)||"pending",completedAt:(e==null?void 0:e.completedAt)||null};t(c)}),e&&r&&document.getElementById("delete-btn").addEventListener("click",r)}function du(n){if(!n||n.length===0)return 0;const e=n.filter(t=>t.status==="done").length;return Math.round(e/n.length*100)}function wE(n,e){const t=((n==null?void 0:n.length)||0)+((e==null?void 0:e.length)||0);if(t===0)return 0;const r=((n==null?void 0:n.filter(s=>s.status==="done").length)||0)+((e==null?void 0:e.filter(s=>s.status==="done").length)||0);return Math.round(r/t*100)}window.showAddModal=window.showAddModal||{};window.showAddModal.weekend=()=>{const n=new Date().getDay(),e=K(n===0?nt(We(new Date,{weekStartsOn:6}),1):We(new Date,{weekStartsOn:6}),"yyyy-MM-dd");Lo(e,null,async t=>{const r=await Je(e),s=(r==null?void 0:r.activities)||[];s.push(t),r?await wr(r.id,{activities:s}):await Pa({date:e,activities:s}),ne(),j(S("common_success")),window.location.reload()})};const bE=["air","ipl","cicilan","internet","pendidikan","lainnya"],EE=["pbb","sim","stnk","paspor","lainnya"];async function TE(n){const e=He(),t=new Date,r=K(t,"yyyy-MM-dd"),[s,i]=await Promise.all([Rh(),Ew()]);s.sort((v,I)=>(v.dueDate||"").localeCompare(I.dueDate||"")),i.sort((v,I)=>(v.dueDate||"").localeCompare(I.dueDate||""));const o=s.filter(v=>!v.isPaid),c=s.filter(v=>v.isPaid),u=i.filter(v=>!v.isPaid),h=i.filter(v=>v.isPaid),f=o.reduce((v,I)=>v+I.amount,0),_=o.filter(v=>Vo(rt(v.dueDate))&&!vi(rt(v.dueDate)));o.filter(v=>{const I=Oo(rt(v.dueDate),t);return I>=0&&I<=7}),n.innerHTML=`
    <div class="space-y-4">
      <!-- Summary Cards -->
      <div class="grid grid-cols-2 gap-3">
        <div class="card">
          <div class="card-header">
            <span class="text-xs font-medium text-gray-500">${S("bills_total_month")}</span>
          </div>
          <p class="text-lg font-bold font-tabular text-warning">${je(f)}</p>
        </div>
        <div class="card">
          <div class="card-header">
            <span class="text-xs font-medium text-gray-500">${e==="id"?"Tagihan Aktif":"Active Bills"}</span>
          </div>
          <p class="text-lg font-bold font-tabular text-primary">${o.length}</p>
        </div>
      </div>

      ${_.length>0?`
        <div class="card border-danger bg-danger/5">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-lg">⚠️</span>
            <span class="text-sm font-semibold text-danger">${S("bills_overdue")}</span>
          </div>
          <div class="space-y-2">
            ${_.slice(0,3).map(v=>`
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-700">${v.title}</span>
                <span class="text-sm font-tabular font-medium text-danger">${je(v.amount)}</span>
              </div>
            `).join("")}
          </div>
        </div>
      `:""}

      <!-- Tabs -->
      <div class="tabs">
        <div class="tab tab-active" data-tab="bills">${S("bills_title")} (${o.length})</div>
        <div class="tab" data-tab="tax">${S("tax_title")} (${u.length})</div>
      </div>

      <!-- Bills Tab Content -->
      <div id="tab-bills" class="tab-content">
        ${o.length>0?`
          <div class="space-y-2">
            ${o.map(v=>hu(v,r,e)).join("")}
          </div>
          <button class="btn btn-primary w-full mt-3" id="add-bill-btn">+ ${S("bills_add")}</button>
        `:`
          <div class="card">
            <div class="empty-state">
              <div class="empty-state-icon">📄</div>
              <p class="empty-state-text">${S("bills_no_bills")}</p>
              <button class="btn btn-primary mt-3" id="add-bill-btn">+ ${S("bills_add")}</button>
            </div>
          </div>
        `}

        ${c.length>0?`
          <div class="mt-4">
            <p class="text-xs text-gray-400 mb-2">${e==="id"?"Sudah Lunas":"Paid"}</p>
            <div class="space-y-2">
              ${c.slice(0,5).map(v=>hu(v,r,e,!0)).join("")}
            </div>
          </div>
        `:""}
      </div>

      <!-- Tax Reminders Tab Content -->
      <div id="tab-tax" class="tab-content hidden">
        ${u.length>0?`
          <div class="space-y-2">
            ${u.map(v=>fu(v,r,e)).join("")}
          </div>
        `:`
          <div class="card">
            <div class="empty-state">
              <div class="empty-state-icon">📋</div>
              <p class="empty-state-text">${S("tax_no_items")}</p>
            </div>
          </div>
        `}

        ${h.length>0?`
          <div class="mt-4">
            <p class="text-xs text-gray-400 mb-2">${e==="id"?"Sudah Lunas":"Paid"}</p>
            <div class="space-y-2">
              ${h.slice(0,5).map(v=>fu(v,r,e,!0)).join("")}
            </div>
          </div>
        `:""}
      </div>
    </div>
  `,document.querySelectorAll(".tab").forEach(v=>{v.addEventListener("click",()=>{document.querySelectorAll(".tab").forEach(I=>I.classList.remove("tab-active")),document.querySelectorAll(".tab-content").forEach(I=>I.classList.add("hidden")),v.classList.add("tab-active"),document.getElementById("tab-"+v.dataset.tab).classList.remove("hidden")})}),IE(n,s),AE(n,i)}function hu(n,e,t,r=!1){const s=rt(n.dueDate),i=Oo(s,rt(e)),o=Vo(s)&&!vi(s)&&!r,c=i>=0&&i<=7&&!r;let u="",h="";return r?(u="opacity-60",h=`<span class="badge badge-success">${S("bills_paid")}</span>`):o?(u="border-l-4 border-danger",h=`<span class="badge badge-danger">${S("bills_overdue")}</span>`):c&&(u="border-l-4 border-warning",h=`<span class="badge badge-warning">${i===0?t==="id"?"Hari ini!":"Today!":t==="id"?`${i}h`:`${i}d`}</span>`),`
    <div class="card ${u} bill-item cursor-pointer" data-id="${n.id}">
      <div class="flex items-center justify-between">
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <span class="text-sm font-medium text-gray-800">${n.title}</span>
            ${h}
          </div>
          <p class="text-xs text-gray-400 mt-1">
            ${t==="id"?"Jatuh tempo":"Due"}: ${Xe(n.dueDate,t)}
          </p>
          ${n.note?`<p class="text-xs text-gray-500 mt-1">${n.note}</p>`:""}
        </div>
        <div class="text-right ml-3">
          <p class="text-sm font-tabular font-bold ${r?"text-gray-400 line-through":"text-gray-800"}">${je(n.amount)}</p>
          ${r?`
            <button class="btn btn-sm btn-outline mt-1 mark-unpaid-btn" data-id="${n.id}">↩</button>
          `:`
            <button class="btn btn-sm btn-success mt-1 mark-paid-btn" data-id="${n.id}">✓</button>
          `}
        </div>
      </div>
    </div>
  `}function fu(n,e,t,r=!1){const s=rt(n.dueDate),i=Oo(s,rt(e)),o=Vo(s)&&!vi(s)&&!r,c=i>=0&&i<=30&&!r;let u="",h="";return r?(u="opacity-60",h=`<span class="badge badge-success">${S("tax_paid")}</span>`):o?(u="border-l-4 border-danger",h=`<span class="badge badge-danger">${S("bills_overdue")}</span>`):c&&(u="border-l-4 border-warning",h=`<span class="badge badge-warning">${i===0?t==="id"?"Hari ini!":"Today!":t==="id"?`${i}h`:`${i}d`}</span>`),`
    <div class="card ${u} reminder-item cursor-pointer" data-id="${n.id}">
      <div class="flex items-center justify-between">
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <span class="text-sm font-medium text-gray-800">${n.title}</span>
            ${h}
          </div>
          <p class="text-xs text-gray-400 mt-1">
            ${t==="id"?"Jatuh tempo":"Due"}: ${Xe(n.dueDate,t)}
            ${n.frequency?` • ${n.frequency}`:""}
          </p>
        </div>
        <div class="text-right ml-3">
          <p class="text-sm font-tabular font-bold ${r?"text-gray-400 line-through":"text-gray-800"}">${je(n.amount)}</p>
          ${r?`
            <button class="btn btn-sm btn-outline mt-1 mark-unpaid-btn" data-id="${n.id}">↩</button>
          `:`
            <button class="btn btn-sm btn-success mt-1 mark-paid-btn" data-id="${n.id}">✓</button>
          `}
        </div>
      </div>
    </div>
  `}function IE(n,e,t){n.querySelectorAll(".bill-item").forEach(r=>{r.classList.contains("reminder-item")||r.addEventListener("click",s=>{if(s.target.closest(".mark-paid-btn")||s.target.closest(".mark-unpaid-btn"))return;const i=r.dataset.id,o=e.find(c=>c.id===i);o&&xa(o)})}),n.querySelectorAll(".bill-item .mark-paid-btn").forEach(r=>{r.addEventListener("click",async s=>{s.stopPropagation();const i=r.dataset.id,o=e.find(c=>c.id===i);try{if(await vw(i),o&&o.frequency&&o.frequency!=="one_time"){const c=new Date(o.dueDate);o.frequency==="monthly"?c.setMonth(c.getMonth()+1):o.frequency==="weekly"?c.setDate(c.getDate()+7):o.frequency==="yearly"&&c.setFullYear(c.getFullYear()+1);const u=c.toISOString().split("T")[0];await Ra({title:o.title,amount:o.amount,dueDate:u,frequency:o.frequency,category:o.category,isPaid:!1,note:o.note||""})}j(S("common_success")),window.location.reload()}catch(c){console.error("Error marking bill paid:",c),j(S("common_error"),"error")}})}),n.querySelectorAll(".bill-item .mark-unpaid-btn").forEach(r=>{r.addEventListener("click",async s=>{s.stopPropagation();const i=r.dataset.id;try{await ww(i),j(S("common_success")),window.location.reload()}catch(o){console.error("Error marking bill unpaid:",o),j(S("common_error"),"error")}})}),n.querySelectorAll("#add-bill-btn").forEach(r=>{r.addEventListener("click",()=>{xa(null,async s=>{try{await Ra(s),ne(),j(S("common_success")),window.location.reload()}catch(i){console.error("Error adding bill:",i),j(S("common_error"),"error")}})})})}function AE(n,e,t){n.querySelectorAll(".reminder-item").forEach(r=>{r.addEventListener("click",s=>{if(s.target.closest(".mark-paid-btn")||s.target.closest(".mark-unpaid-btn"))return;const i=r.dataset.id,o=e.find(c=>c.id===i);o&&qh(o)})}),n.querySelectorAll(".reminder-item .mark-paid-btn").forEach(r=>{r.addEventListener("click",async s=>{s.stopPropagation();const i=r.dataset.id;try{await Sw(i),j(S("common_success")),window.location.reload()}catch(o){console.error("Error marking reminder paid:",o),j(S("common_error"),"error")}})}),n.querySelectorAll(".reminder-item .mark-unpaid-btn").forEach(r=>{r.addEventListener("click",async s=>{s.stopPropagation();const i=r.dataset.id;try{await kw(i),j(S("common_success")),window.location.reload()}catch(o){console.error("Error marking reminder unpaid:",o),j(S("common_error"),"error")}})})}function xa(n=null,e,t){var i;const r=He(),s=K(new Date,"yyyy-MM-dd");dn(`
    <div class="modal-header">
      <h3 class="modal-title">${S(n?"bills_edit":"bills_add")}</h3>
      <button class="text-gray-400 hover:text-gray-600" id="modal-close">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>
    <form id="bill-form" class="modal-body">
      <div class="input-group">
        <label class="input-label">${S("bills_name")}</label>
        <input type="text" name="title" class="input" placeholder="${r==="id"?"Nama tagihan":"Bill name"}" value="${(n==null?void 0:n.title)||""}" required>
      </div>
      <div class="input-group">
        <label class="input-label">${S("bills_amount")}</label>
        <input type="number" name="amount" class="input" placeholder="0" value="${(n==null?void 0:n.amount)||""}" required min="1">
      </div>
      <div class="input-group">
        <label class="input-label">${S("bills_due_date")}</label>
        <input type="date" name="dueDate" class="input" value="${(n==null?void 0:n.dueDate)||s}" required>
      </div>
      <div class="input-group">
        <label class="input-label">${r==="id"?"Kategori":"Category"}</label>
        <select name="category" class="select" required>
          ${bE.map(o=>`
            <option value="${o}" ${(n==null?void 0:n.category)===o?"selected":""}>${S("bills_categories."+o)}</option>
          `).join("")}
        </select>
      </div>
      <div class="input-group">
        <label class="input-label">${S("bills_frequency")}</label>
        <select name="frequency" class="select" required>
          <option value="monthly" ${(n==null?void 0:n.frequency)==="monthly"||!(n!=null&&n.frequency)?"selected":""}>${S("bills_monthly")}</option>
          <option value="weekly" ${(n==null?void 0:n.frequency)==="weekly"?"selected":""}>${S("bills_weekly")}</option>
          <option value="yearly" ${(n==null?void 0:n.frequency)==="yearly"?"selected":""}>${S("bills_yearly")}</option>
          <option value="one_time" ${(n==null?void 0:n.frequency)==="one_time"?"selected":""}>${S("bills_one_time")}</option>
        </select>
      </div>
      <div class="input-group">
        <label class="input-label">${r==="id"?"Catatan":"Note"}</label>
        <input type="text" name="note" class="input" placeholder="${r==="id"?"Catatan (opsional)":"Note (optional)"}" value="${(n==null?void 0:n.note)||""}">
      </div>
    </form>
    <div class="modal-footer">
      ${n?`<button type="button" class="btn btn-danger flex-1" id="delete-btn">${S("bills_delete")}</button>`:""}
      <button type="submit" form="bill-form" class="btn btn-primary flex-1">${S("bills_save")}</button>
    </div>
  `),document.getElementById("modal-close").addEventListener("click",ne),document.getElementById("bill-form").addEventListener("submit",async o=>{o.preventDefault();const c=new FormData(o.target),u={title:c.get("title"),amount:parseInt(c.get("amount")),dueDate:c.get("dueDate"),category:c.get("category"),note:c.get("note")||"",frequency:c.get("frequency")||"monthly"};if(n)try{await yw(n.id,u),j(S("common_success")),ne(),window.location.reload()}catch(h){console.error("Error updating bill:",h),j(S("common_error"),"error")}else e&&e(u)}),n&&((i=document.getElementById("delete-btn"))==null||i.addEventListener("click",async()=>{if(confirm(S("common_confirm_delete")))try{await _w(n.id),ne(),window.location.reload()}catch(o){console.error("Error deleting bill:",o),j(S("common_error"),"error")}}))}function qh(n=null,e,t){var i;const r=He(),s=K(new Date,"yyyy-MM-dd");dn(`
    <div class="modal-header">
      <h3 class="modal-title">${S(n?"common_edit":"tax_add")}</h3>
      <button class="text-gray-400 hover:text-gray-600" id="modal-close">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>
    <form id="reminder-form" class="modal-body">
      <div class="input-group">
        <label class="input-label">${S("tax_name")}</label>
        <input type="text" name="title" class="input" placeholder="${r==="id"?"Nama":"Name"}" value="${(n==null?void 0:n.title)||""}" required>
      </div>
      <div class="input-group">
        <label class="input-label">${S("tax_amount")}</label>
        <input type="number" name="amount" class="input" placeholder="0" value="${(n==null?void 0:n.amount)||""}" required min="1">
      </div>
      <div class="input-group">
        <label class="input-label">${S("tax_due_date")}</label>
        <input type="date" name="dueDate" class="input" value="${(n==null?void 0:n.dueDate)||s}" required>
      </div>
      <div class="input-group">
        <label class="input-label">${r==="id"?"Kategori":"Category"}</label>
        <select name="category" class="select" required>
          ${EE.map(o=>`
            <option value="${o}" ${(n==null?void 0:n.category)===o?"selected":""}>${o.toUpperCase()}</option>
          `).join("")}
        </select>
      </div>
      <div class="input-group">
        <label class="input-label">${S("tax_duration")}</label>
        <select name="duration" class="select" required>
          <option value="one_time" ${(n==null?void 0:n.duration)==="one_time"||!(n!=null&&n.duration)?"selected":""}>${S("tax_one_time")}</option>
          <option value="1_year" ${(n==null?void 0:n.duration)==="1_year"?"selected":""}>${S("tax_1_year")}</option>
          <option value="5_years" ${(n==null?void 0:n.duration)==="5_years"?"selected":""}>${S("tax_5_years")}</option>
        </select>
      </div>
      <div class="input-group">
        <label class="input-label">${r==="id"?"Catatan":"Note"}</label>
        <input type="text" name="note" class="input" placeholder="${r==="id"?"Catatan (opsional)":"Note (optional)"}" value="${(n==null?void 0:n.note)||""}">
      </div>
    </form>
    <div class="modal-footer">
      ${n?`<button type="button" class="btn btn-danger flex-1" id="delete-btn">${S("tax_delete")}</button>`:""}
      <button type="submit" form="reminder-form" class="btn btn-primary flex-1">${S("tax_save")}</button>
    </div>
  `),document.getElementById("modal-close").addEventListener("click",ne),document.getElementById("reminder-form").addEventListener("submit",async o=>{o.preventDefault();const c=new FormData(o.target),u={title:c.get("title"),amount:parseInt(c.get("amount")),dueDate:c.get("dueDate"),category:c.get("category"),duration:c.get("duration")||"one_time",note:c.get("note")||""};if(n)try{await Iw(n.id,u),j(S("common_success")),ne(),window.location.reload()}catch(h){console.error("Error updating reminder:",h),j(S("common_error"),"error")}else e&&e(u)}),n&&((i=document.getElementById("delete-btn"))==null||i.addEventListener("click",async()=>{if(confirm(S("common_confirm_delete")))try{await Aw(n.id),ne(),window.location.reload()}catch(o){console.error("Error deleting reminder:",o),j(S("common_error"),"error")}}))}window.showAddModal=window.showAddModal||{};window.showAddModal.bills=()=>{dn(`
    <div class="modal-header">
      <h3 class="modal-title">${S("common_add")}</h3>
      <button class="text-gray-400 hover:text-gray-600" id="modal-close">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>
    <div class="modal-body space-y-3">
      <button class="btn btn-outline btn-block" id="add-bill-btn">📄 ${S("bills_add")}</button>
      <button class="btn btn-outline btn-block" id="add-tax-btn">📋 ${S("tax_add")}</button>
    </div>
  `),document.getElementById("modal-close").addEventListener("click",ne),document.getElementById("add-bill-btn").addEventListener("click",()=>{ne(),xa(null,async n=>{try{await Ra(n),ne(),j(S("common_success")),window.location.reload()}catch(e){console.error("Error adding bill:",e),j(S("common_error"),"error")}})}),document.getElementById("add-tax-btn").addEventListener("click",()=>{ne(),qh(null,async n=>{try{await Tw(n),ne(),j(S("common_success")),window.location.reload()}catch(e){console.error("Error adding reminder:",e),j(S("common_error"),"error")}})})};function Wh(n){const e=He();if(pi()){window.location.hash="home";return}n.innerHTML=`
    <div class="min-h-screen bg-gradient-to-b from-primary/10 to-white flex flex-col items-center justify-center p-6">
      <!-- Logo/Title -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">🏠 SuperFamily</h1>
        <p class="text-gray-500">Dashboard keluarga Farhan & Inne</p>
      </div>

      <!-- Firebase Auth -->
      <div class="w-full max-w-sm">
        <div class="card text-center">
          <h2 class="text-xl font-semibold text-gray-700 mb-4">
            ${e==="id"?"Selamat Datang":"Welcome"}
          </h2>
          <p class="text-gray-500 mb-6 text-sm">
            ${e==="id"?"Masuk dengan akun Google Anda untuk mengakses dashboard keluarga.":"Sign in with your Google account to access the family dashboard."}
          </p>
          
          <!-- Google OAuth Button -->
          <button id="google-login-btn"
             class="flex items-center justify-center gap-3 w-full px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all text-gray-700 font-medium shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            ${e==="id"?"Masuk dengan Google":"Login with Google"}
          </button>
          
          <!-- Loading state -->
          <div id="login-loading" class="hidden mt-4">
            <div class="animate-pulse text-gray-400 text-sm">${e==="id"?"Memproses...":"Processing..."}</div>
          </div>
        </div>

        <!-- Error message container -->
        <div id="login-error" class="hidden mt-4 p-3 bg-danger/10 border border-danger/20 rounded-lg text-danger text-sm text-center"></div>

        <!-- Privacy note -->
        <p class="mt-6 text-center text-xs text-gray-400">
          ${e==="id"?"Dengan masuk, Anda menyetujui kebijakan privasi aplikasi.":"By signing in, you agree to the app privacy policy."}
        </p>
      </div>
    </div>
  `;const r=document.getElementById("google-login-btn"),s=document.getElementById("login-loading"),i=document.getElementById("login-error");r.addEventListener("click",async()=>{r.disabled=!0,r.classList.add("opacity-50","cursor-not-allowed"),s.classList.remove("hidden"),i.classList.add("hidden");try{const o=await pw();console.log("Firebase Auth successful:",o.user.email),j(e==="id"?"Login berhasil!":"Login successful!"),window.location.hash="home"}catch(o){console.error("Firebase Auth error:",o),r.disabled=!1,r.classList.remove("opacity-50","cursor-not-allowed"),s.classList.add("hidden"),i.textContent=o.message||(e==="id"?"Login gagal. Silakan coba lagi.":"Login failed. Please try again."),i.classList.remove("hidden")}})}const SE={login:Wh,home:Bh,budget:mr,events:mE,mealplan:gE,weekend:_E,bills:TE},kE=["home","budget","events","mealplan","weekend","bills"];function mu(n){return kE.includes(n)}function $o(n){var r;const e=document.getElementById("app");if(mu(n.screen)&&!Zl()&&(n={title:"Login",screen:"login"},window.location.hash="login"),n.screen==="login"){Wh(e);return}const t=He();e.innerHTML=`
    <!-- App Container -->
    <div class="app-container pb-20">
      <!-- Header -->
      <header class="fixed top-0 left-0 right-0 bg-white z-40 border-b border-gray-100">
        <div class="flex items-center justify-between px-4 py-3">
          <h1 class="text-lg font-semibold text-gray-800" id="screen-title">${S("nav_"+n.screen)}</h1>
          <div class="flex items-center gap-2">
            ${n.screen==="bills"||n.screen==="events"?`<button id="add-screen-btn" class="btn btn-sm btn-primary" title="${S("common_add")}">+</button>`:""}
            <button id="lang-toggle" class="flex items-center gap-1 text-sm text-primary font-medium">
              <span>${t==="id"?"🇮🇩":"🇬🇧"}</span>
              <span>${t.toUpperCase()}</span>
            </button>
            <button id="logout-btn" class="text-sm text-gray-500 hover:text-danger" title="${t==="id"?"Keluar":"Logout"}">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" x2="9" y1="12" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="pt-14" id="screen-content">
        <div class="p-4">
          <div class="text-center py-8 text-gray-400">${S("common_loading")}</div>
        </div>
      </main>



      <!-- Bottom Navigation -->
      <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-40">
        <div class="grid grid-cols-6">
          ${yn("home","Home")}
          ${yn("budget","Wallet")}
          ${yn("events","Calendar")}
          ${yn("mealplan","UtensilsCrossed")}
          ${yn("weekend","Target")}
          ${yn("bills","Bell")}
        </div>
      </nav>
    </div>

    <!-- Modal Container -->
    <div id="modal-container" class="hidden fixed inset-0 z-50"></div>
  `,document.querySelectorAll(".nav-item").forEach(s=>{s.addEventListener("click",i=>{i.preventDefault();const o=s.dataset.route;if(mu(o)&&!Zl()){window.location.hash="login";return}Sf(o)})}),document.getElementById("lang-toggle").addEventListener("click",()=>{Pf(),$o(Sn())}),(r=document.getElementById("add-screen-btn"))==null||r.addEventListener("click",()=>{const s=Sn().screen;window.showAddModal&&typeof window.showAddModal[s]=="function"&&window.showAddModal[s]()}),document.getElementById("logout-btn").addEventListener("click",async()=>{if(confirm(t==="id"?"Keluar dari aplikasi?":"Logout from app?"))try{await gw(),j(t==="id"?"Berhasil keluar":"Logged out successfully"),window.location.reload()}catch(s){console.error("Logout error:",s),j(t==="id"?"Gagal keluar":"Logout failed","error")}}),setTimeout(()=>{const s=SE[n.screen];s&&s(document.getElementById("screen-content"))},10)}function yn(n,e){const t=Sn().screen===n;return`
    <a href="#${n}" class="nav-item flex flex-col items-center py-2 px-1 ${t?"text-primary":"text-gray-400"}" data-route="${n}">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        ${{Home:'<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>',Wallet:'<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>',Calendar:'<rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line>',UtensilsCrossed:'<path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8"></path><path d="M15 15 .6.6a2.2 2.2 0 0 0-3.1 3.1l3.1 3.1"></path><line x1="2" x2="22" y1="2" y2="22"></line>',Target:'<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>',Bell:'<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>'}[e]}
      </svg>
      <span class="text-xs mt-1">${S("nav_"+n)}</span>
    </a>
  `}window.addEventListener("langchange",()=>{$o(Sn())});document.addEventListener("DOMContentLoaded",()=>{kf($o)});function dn(n){const e=document.getElementById("modal-container");e.innerHTML=`
    <div class="fixed inset-0 bg-black/50 z-50" id="modal-backdrop"></div>
    <div class="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-md mx-auto">
      <div class="bg-white rounded-xl shadow-2xl max-h-[80vh] overflow-auto">
        ${n}
      </div>
    </div>
  `,e.classList.remove("hidden"),document.getElementById("modal-backdrop").addEventListener("click",ne),document.body.style.overflow="hidden"}function ne(){const n=document.getElementById("modal-container");n.classList.add("hidden"),n.innerHTML="",document.body.style.overflow=""}function j(n,e="success"){const t=document.createElement("div");t.className=`fixed top-20 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg text-white text-sm z-50 ${e==="success"?"bg-success":e==="error"?"bg-danger":"bg-warning"}`,t.textContent=n,document.body.appendChild(t),setTimeout(()=>t.remove(),2500)}function je(n){return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",minimumFractionDigits:0,maximumFractionDigits:0}).format(n)}function Xe(n,e="id"){const t=new Date(n),r={weekday:"short",day:"numeric",month:"short",year:"numeric"};return t.toLocaleDateString(e==="id"?"id-ID":"en-US",r)}
