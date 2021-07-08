
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
      mediaDiv
    .querySelector(".download-media")
    .addEventListener("click", function () {
        console.log("helllo");
      downloadMedia(mediaObj);
    });
  mediaDiv
    .querySelector(".delete-media")
    .addEventListener("click", function () {
      deleteMedia(mediaObj, mediaDiv);
    });
  
    document.querySelector(".gallery").append(mediaDiv);
 }
 function appendVideo(mediaObj){

    let mediaDiv = document.createElement("div");
  mediaDiv.classList.add("media-div");
  mediaDiv.innerHTML = `<video class="media-video" controls autoplay loop  ></video>
    <div class="media-buttons">
        <div class="download-media">Download</div>
        <div class="delete-media">Delete</div>
    </div>`;
  mediaDiv.querySelector("video").src = URL.createObjectURL(mediaObj.url);
  mediaDiv
  .querySelector(".download-media")
  .addEventListener("click", function () {
      console.log("hello");
    downloadMedia(mediaObj);
  });
    mediaDiv
  .querySelector(".delete-media")
  .addEventListener("click", function () {
      console.log("delete");
    deleteMedia(mediaObj, mediaDiv);
  });
  document.querySelector(".gallery").append(mediaDiv);
  }



  function downloadMedia(mediaObj){
    let aTag=document.createElement("a");
    if(mediaObj.type=="photo"){
        aTag.download=`${mediaObj.mid}.jpg`;
        aTag.href=mediaObj.url;

    }
    else{
        aTag.download=`${mediaObj.mid}.mp4`;
        aTag.href=URL.createObjectURL(mediaObj.url);
    }
    aTag.click();
  }

  function deleteMedia(mediaObj,mediaDiv){

    let mid=mediaObj.mid;
    let txnObject =db.transaction("Media","readwrite");
    let mediaTable =txnObject.objectStore("Media");

    mediaTable.delete(mid);

    mediaDiv.remove();



  }