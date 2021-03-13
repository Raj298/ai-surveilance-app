video="";
status=""
objects=[]
function preload(){
    video=createVideo('video.mp4');
    
}


function setup(){
canvas=createCanvas(480,380);
canvas.center();
video.hide();
}


function draw(){
image(video,0,0,480,380);
if(status != ""){
    objectDetector.detect(video,gotResult);
    for(i=0; i<objects.length;i++ ){
        document.getElementById("status").innerHTML="Satus : Object Detected";
        document.getElementById("objects_detected").innerHTML="Number of objects detected :"+objects.length;

        fill('#fc031c');
        percent= floor(objects[i].confidence*100);
        text(objects[i].label + " " + percent + "%", objects[i].x +15, objects[i].y+15);
        noFill();
        stroke('#fc031c')
        rect(objects[i].x,objects[i].y,objects[i].width, objects[i].height);
    }
}
}
function begin(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting objects"
}
function modelLoaded(){
console.log("model is loaded")
status=true
video.loop()
video.speed(1)
video.volume(0)
}
function gotResult(error,result){
    if(error){
        console.log(error);

    }
    else{
        console.log(result);
        objects=result;
    }
    
}