Believer = "";
HarryPotter = "";

statusOfTheSong = "";

function preload(){
    Believer = loadSound("Believer.mp3");
    HarryPotter = loadSound("HarryPotter.mp3");
}

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;

function setup(){
    canvas = createCanvas(370, 280);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('PoseNet is Initialized !');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
    }
}

function draw(){
    image(video, 0, 0, 380, 280);

    fill("#1E90FF");
    stroke("#FF00FF");

    Believer.isPlaying();
    statusOfTheSong = Believer;
    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        HarryPotter.stop();

        if(statusOfTheSong = false)
        {
            Believer.isPlaying();
            document.getElementById("songName").innerHTML = "Believer";
        }
    }
}