let videoElement = document.querySelector("video");

let recordButton = document.querySelector(".inner-record");
let CapturePhoto = document.querySelector(".inner-capture");
let filters=document.querySelectorAll(".filter");
let ZoomIn=document.querySelector(".zoomIn");
let ZoomOut=document.querySelector(".zoomOut");


let filterSelected="none";
let recordingState = false;
let mediaRecorder;

let minZoom=1;
let maxZoom=3;
let currentZoom=1;

(async function () {

    let constraint = { video: true };
    let mediaStream = await navigator.mediaDevices.getUserMedia(constraint)

    videoElement.srcObject = mediaStream;
    mediaRecorder = new MediaRecorder(mediaStream);

    mediaRecorder.onstart = function () {
        console.log("Inside me start");
    }
    mediaRecorder.ondataavailable = function (e) {
        console.log("Inside on data available");

        let videoObj = new Blob([e.data], { type: "video/mp4" })
        console.log(videoObj);
        let videoUrl = URL.createObjectURL(videoObj);

        let aTag = document.createElement("a");

        aTag.download = `Vidoe${Date.now()}.mp4`;
        aTag.href = videoUrl;
        aTag.click();



    };

    mediaRecorder.onstop = function () {

        console.log("Inside on stop");

    }

    recordButton.addEventListener("click", function () {

        if (recordingState) {
            mediaRecorder.stop();

            recordingState = false;
            recordButton.classList.remove("animate-record");
        }
        else {

            mediaRecorder.start();

            recordingState = true;
            recordButton.classList.add("animate-record");

        }

    });

    CapturePhoto.addEventListener("click", function () {

        CapturePhoto.classList.add("animate-capture");

        setTimeout(function () {
            CapturePhoto.classList.remove("animate-capture");
        }, 1000)

        s 
        let canvas = document.createElement("canvas");
        canvas.width = 640;   
        canvas.height = 480;  


        let ctx = canvas.getContext("2d");

        ctx.drawImage(videoElement, 0, 0);

        if(filterSelected!="none"){

            ctx.fillStyle=filterSelected;
            ctx.fillRect(0,0,canvas.width,canvas.height);
        }

        //download canvas as an image 
        let aTag = document.createElement("a");
        aTag.download = `image${Date.now()}.jpg`;
        aTag.href = canvas.toDataURL("image/jpg");
        aTag.click();

    });
})();


for(let i=0;i<filters.length;i++){

    filters[i].addEventListener("click",function(e){

    let currentselect=e.target.style.backgroundColor;
    console.log(currentselect);
    
        if(currentselect==""){

            if(document.querySelector(".filter-div")){
                document.querySelector(".filter-div").remove();
                filterSelected="none";
                return;
            }
        }
        
        if(filterSelected==currentselect){
            return;
        }

        let filterDiv=document.createElement("div");
        filterDiv.classList.add("filter-div");
        filterDiv.style.backgroundColor=currentselect;

        if(filterSelected=="none"){

            document.body.append(filterDiv);

        }else{
            document.querySelector(".filter-div").remove();
            document.body.append(filterDiv);

        }
        filterSelected=currentselect;

    })
}
ZoomIn.addEventListener("click",function(){

    if(currentZoom+0.1>maxZoom){
        return;

    }
    currentZoom = currentZoom+0.1;
    videoElement.style.transform= `scale(${currentZoom})`;
});

ZoomOut.addEventListener("click",function(){

    if(currentZoom-0.1<minZoom){
        return;

    }
    currentZoom = currentZoom-0.1;
     videoElement.style.transform= `scale(${currentZoom})`;
});