import React, { useRef, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

import "./Camera.css";

function sendToBackend(imgString) {
  fetch(`/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `mutation {
          sendImage(image: "${imgString}")
        }`,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch(console.error);
}

function Camera() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const [hasPhoto, setHasPhoto] = useState(false);
  const [ctx, setCTX] = useState(false);

  const img_width = 414;
  const img_height = img_width / (16 / 9);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 800, height: 600 },
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const classifyImage = () => {
    let imageData = ctx.getImageData(0, 0, photo.width, photo.height);
    let pixelData = imageData.data;

    // Convert pixel data to a 3D array
    let width = photo.width;
    // let height = photo.height;
    let pixelArray = [];

    for (let i = 0; i < pixelData.length; i += 4) {
      let row = Math.floor(i / (width * 4));
      let col = (i / 4) % width;
      if (!pixelArray[row]) pixelArray[row] = [];

      // Organize each pixel as an array with RGBA components
      let pixel = [pixelData[i], pixelData[i + 1], pixelData[i + 2]];
      pixelArray[row][col] = pixel;
    }

    let jsonString = JSON.stringify(pixelArray);
    sendToBackend(jsonString);
  };

  const takePhoto = () => {
    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = img_width;
    photo.height = img_height;

    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, img_width, img_height);
    setCTX(ctx);
    setHasPhoto(true);

    console.log("running");
  };

  const clearPhoto = () => {
    ctx.clearRect(0, 0, img_width, img_height);
    setCTX(null);
    getVideo();
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <div>
      {!ctx && (
        <div>
          <div className="spaceship-border">
            <video ref={videoRef}></video>
          </div>
          <Button variant="secondary" onClick={takePhoto}>
            Catch!
          </Button>
        </div>
      )}
      <div>
        <canvas ref={photoRef}></canvas>
        <Button variant="secondary" onClick={classifyImage}>
          Identify
        </Button>
        <Button variant="secondary" onClick={clearPhoto}>
          Retake
        </Button>
      </div>
    </div>
  );
}

export default Camera;
