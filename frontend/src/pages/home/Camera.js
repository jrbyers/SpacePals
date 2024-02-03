import React, { useRef, useEffect, useState } from "react";

function sendToBackend(imgString) {
    fetch(`/graphql`, {
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
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(console.error)
        
}


function Camera() {
    const videoRef = useRef(null);
    const photoRef = useRef(null);

    const [hasPhoto, setHasPhoto] = useState(false)

    const getVideo = () => {
        navigator.mediaDevices
            .getUserMedia({
                video: { width: 100, height: 100 }
            })
            .then(stream => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
            })
            .catch(err => {
                console.error(err)
            })
    }

    const takePhoto = () => {
        const img_width = 414;
        const img_height = img_width / (16 / 9);

        let video = videoRef.current;
        let photo = photoRef.current;

        photo.width = img_width;
        photo.height = img_height;

        let ctx = photo.getContext('2d');

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
            let pixel = [pixelData[i], pixelData[i + 1], pixelData[i + 2], pixelData[i + 3]];
            pixelArray[row][col] = pixel;
        }

        // console.log(pixelArray);

        let jsonString = JSON.stringify(pixelArray);

        sendToBackend(jsonString)

        ctx.drawImage(video, 0, 0, img_width, img_height);
        setHasPhoto(true);

        // console.log('running');
        // console.log(ctx);
    }

    useEffect(() => {
        getVideo();
    }, [videoRef]);

    return (
        <div classname="Camera">
            <div className="camera">
                <video ref={videoRef}></video>
                <button onClick={takePhoto}>Catch!</button>
            </div>
            <div className={'result' + (hasPhoto ? 'hasPhoto' : '')}>
                <canvas ref={photoRef}></canvas>
                <button>Exit</button>
            </div>
        </div>
    )
};

export default Camera;