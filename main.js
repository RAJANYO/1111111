Status = "";
objects = []
function preload() {
    s=loadSound("alarm.wav")
    }

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    video=createCapture(VIDEO)
    video.size(640.420)
    video.hide()
    objectDetector = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw() {
    image(video, 0, 0, 640, 420)

    if (Status) {
        document.getElementById("status").innerHTML = "Status :  Objects detected";
        objectDetector.detect(video, gotResult);
        for (var i = 0; i < objects.length; i++) {
if (objects[i].label=="person") {
    s.play()
}

            fill("red")
            percent = floor(objects[i].confidence * 100);

            text(objects[i].label+" "+percent+"%", objects[i].x+15, objects[i].y+15)
            noFill()
            stroke("red")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }
    }
}
function modelLoaded() {
    console.log("Model Loaded!");
    Status = true; 
    objectDetector.detect(video, gotResult);
}
function gotResult(error, results) {
    if (error) {
        console.log(error);
    } console.log(results); objects = results;
}
