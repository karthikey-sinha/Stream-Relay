# Stream-Relay
A lightweight streaming server and client setup for broadcasting webcam/audio streams from the browser directly to YouTube Live using WebSockets and FFmpeg.A lightweight streaming server and client setup for broadcasting webcam/audio streams from the browser directly to YouTube Live using WebSockets and FFmpeg.


#Features
- Live Streaming to YouTube via RTMP and FFmpeg
- Client-Side Media Capture using browser APIs
- Real-time Binary Streaming via Socket.IO
- Express.js Static Hosting
- Dockerized Deployment
- Nodemon Dev Mode

#Tech Stack

- Node.js
- Express.js
- Socket.IO
- FFmpeg
- Docker
- Browser Media APIs (getUserMedia, MediaRecorder)

#Setup Instructions

Prerequisites
-  Node.js & NPM
-  FFmpeg installed and accessible in system path
-  Docker (optional)


#Configuration
Set your YouTube stream key in index.js:
const STREAM_URL = 'rtmp://rtmp.youtube.com/live2/YOUR_STREAM_KEY';






