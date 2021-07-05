let videoElement=document.querySelector("video");
let recordButton=document.querySelector("#record");
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

   })



})();
