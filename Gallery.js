
let db;
let DbOpenReq=indexedDB.open("Gallery",1);


DbOpenReq.onupgradeneeded=function(e){

db=e.target.result;
db.createObjectStore("Media", { keyPath: "mid" });

}

DbOpenReq.onsuccess=function(e){

    db=e.target.result;
    fetchMedia();
}

DbOpenReq.onerror=function(e){

   alert("error");

}


function fetchMedia(){
    let txnObject =db.transaction("Media","readonly");
    let mediaTable =txnObject.objectStore("Media");

    let cursorObject =mediaTable.openCursor(); //it iterate on all the values
    cursorObject.onsuccess =function(e){
        let cursor =cursorObject.result;
        console.log(cursor);
        if(cursor){
         let mediaObj=cursor.value;
        
         if(mediaObj.type=="photo"){
            appendPhoto(mediaObj);
         }
         else{
            appendVideo(mediaObj);
         }
            cursor.continue();
        }
    }
}


 function appendPhoto(mediaObj){
     let mediaDiv = document.createElement("div");
    mediaDiv.classList.add("media-div");
    mediaDiv.innerHTML = `<img class="media-img" src=${mediaObj.url} alt="">
      <div class="media-buttons">
          <div class="download-media">Download</div>
          <div class="delete-media">Delete</div>
      </div>`;
  
    document.querySelector(".gallery").append(mediaDiv);
 }
 function appendVideo(mediaObj){

    let mediaDiv = document.createElement("div");
  mediaDiv.classList.add("media-div");
  mediaDiv.innerHTML = `<video class="media-video" controls  ></video>
    <div class="media-buttons">
        <div class="download-media">Download</div>
        <div class="delete-media">Delete</div>
    </div>`;
  mediaDiv.querySelector("video").src = URL.createObjectURL(mediaObj.url);
  document.querySelector(".gallery").append(mediaDiv);
  }