import http from 'http'
import path from 'path'
import { spawn } from 'child_process'
import express from 'express'
import {Server as SocketIO} from 'socket.io'


const app = express();
const server = http.createServer(app);
const io = new SocketIO(server)
const FRAME_RATE =  25;
const BITRATE = 128000;
const SAMPLE_RATE = BITRATE / 4;
const STREAM_URL =    `rtmp://rtmp.youtube.com/live2/d1qxvhvvh-f22x-bgfdjmll3gwk-96ta`;

const options = [                 //Options for streaming
    '-i',
    '-',
    '-c:v', 'libx264',
    '-preset', 'ultrafast',
    '-tune', 'zerolatency',
    '-r', `${FRAME_RATE}`,
    '-g', `${FRAME_RATE * 2}`,
    '-keyint_min', FRAME_RATE,
    '-crf', '25',
    '-pix_fmt', 'yuv420p',
    '-sc_threshold', '0',
    '-profile:v', 'main',
    '-level', '3.1',
    '-c:a', 'aac',
    '-b:a', '128k',
    '-ar', SAMPLE_RATE,
    '-f', 'flv',
    STREAM_URL, 
];

const ffmpeg = spawn('ffmpeg', options); //spawn ffmpeg with options

//Event listener if Something Goes Wrong
ffmpeg.stdout.on('data', (data) => {
    console.log(`ffmpeg stdout: ${data}`);
});

ffmpeg.stderr.on('data', (data) => {
    console.error(`ffmpeg : ${data}`);
});

ffmpeg.on('close', (code) => {
    console.log(`ffmpeg process exited with code ${code}`);
});

app.use(express.static( path.resolve('./public')) )

io.on('connection', socket=>{
    console.log('Socket Connected', socket.id);
    socket.on('binarystream',stream => {
        console.log('Binary Stream Incomming...')
        ffmpegProcess.stdin.write(stream,(err)=> {
            console.log('Err',err)
        })
    })
});

server.listen(8000,() => console.log( 'HTTP Server is running on PORT 8000'))