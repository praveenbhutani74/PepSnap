let videoElement=document.querySelector("video");
let constraint = { video: true };

navigator.mediaDevices.getUserMedia(constraint).then(
    function (mediaStream) {
    videoElement.srcObject=mediaStream;
      
    }).catch(
    function (error) { console.log(error); 
});

