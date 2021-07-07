
let db;
let DbOpenReq=indexedDB.open("Gallery",1);


DbOpenReq.onupgradeneeded=function(e){

db=e.target.result;
db.createObjectStore("Media", { keyPath: "mid" });
}

DbOpenReq.onsuccess=function(e){

    db=e.target.result;

}

DbOpenReq.onerror=function(e){

   alert("error")

}