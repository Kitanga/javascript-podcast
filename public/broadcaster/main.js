window.onload = function() {
    var recorder = {},
        constraints = {
            "audio": true,
            "video": false
        },
        anchor = document.createElement("a");

    anchor.setAttribute("download", "recording.webm");

    /* Button Event Listeners */
    record.onclick = startRecording;
    download.onclick = function() {
        anchor.click();
    };

    function startRecording() {
        this.innerText = "Stop";
        this.onclick = stopRecording;
        
        /* Get the audio stream */
        navigator.mediaDevices.getUserMedia(constraints)
        .then(function(stream) {
            /* Initialize the recorder */
            recorder = new MediaRecorder(stream);

            /* Add recording replay and the recording download feature */
            recorder.ondataavailable = function(event) {
                /* Create file */
                var file = new Blob([event.data], { "type": "audio/webm" });

                /* Set anchor tag's href to blob link */
                anchor.href = window.URL.createObjectURL(file);

                /* Replay recording */
                audio.src = window.URL.createObjectURL(event.data);
                // console.log("Blob data:", event.data);

                audio.play();
            };

            /* Start recording */
            recorder.start();
        })
        .catch(function(error) {
            console.error(error);
        });
    }

    function stopRecording() {
        this.innerText = "Record";
        this.onclick = startRecording;

        /* Stop recording */
        recorder.stop();
    }
};