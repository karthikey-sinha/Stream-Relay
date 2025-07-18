// Client side code
const userVideo = document.getElementById('user-video')        //
const startButton = document.getElementById('start-btn')
const state = { media: null}
const socket = io();

startButton.addEventListener('click',() => {        //Start Throwing Media To Backend
     const mediaRecorder = new MediaRecorder(state.media,{ 
        audioBitsPerSecond: 128000  ,
        videoBitsPerSecond: 2500000 ,
        framerate: 25
     })
     mediaRecorder.ondataavailable = ev => {        // Media converted to Binary
        console.log('Binary Stream Available', ev.data)
        socket.emit('binarystream', ev.data)        //Sending Binary Data to socket
     }

     mediaRecorder.start(25)
})
window.addEventListener('load',async e => {
    const media = await navigator                               // Calling USer Media in Browser
    .mediaDevices.getUserMedia( {audio : true ,video: true })
    state.media = media
    userVideo.srcObject = media
})