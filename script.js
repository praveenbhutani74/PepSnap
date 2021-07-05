let videoElement=document.querySelector("video");
let recordButton=document.querySelector("#record");
let CapturePhoto=document.querySelector("#capture");
let  recordingState=false;
let mediaRecorder;


(async function(){

  let constraint = { video: true };
  let mediaStream= await  navigator.mediaDevices.getUserMedia(constraint)
   
   videoElement.srcObject=mediaStream;
   mediaRecorder=new MediaRecorder(mediaStream);

   mediaRecorder.onstart=function(){
    console.log("Inside me start");
   }
   mediaRecorder.ondataavailable=function(e){
    console.log("Inside on data available");

    let videoObj= new Blob([e.data],{type:"video/mp4"})
    console.log(videoObj);
    let videoUrl=URL.createObjectURL(videoObj);
  
    let aTag=document.createElement("a");

    aTag.download=`Vidoe${Date.now()}.mp4`;
    aTag.href=videoUrl;
    aTag.click();



   };
   
   mediaRecorder.onstop=function(){

    console.log("Inside on stop");

   }

   recordButton.addEventListener("click",function(){

    if(recordingState){
        mediaRecorder.stop();
        recordButton.innerHTML=`Record Video..`
        recordingState=false;

    }
    else{

        mediaRecorder.start();
        recordButton.innerHTML=`Recording Start ....`
        recordingState=true;
    }

   });

   CapturePhoto.addEventListener("click",function(){
    //canvas 
    let canvas =document.createElement("canvas");
    canvas.width = 640;   //video widht
    canvas.height =480  // video height


    let ctx =canvas.getContext("2d");

    ctx.drawImage(videoElement,0,0);

    //download canvas as an image 
    let aTag =document.createElement("a");
    aTag.download =`image${Date.now()}.jpg`;
    aTag.href = canvas.toDataURL("image/jpg");
    aTag.click();

});
})();
