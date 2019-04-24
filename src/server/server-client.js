import io from 'socket.io-client';

var endpoint = 'https://az-realtime-editor.herokuapp.com/';
//var endpoint = 'http://172.19.16.126:5000/';
const socket = io(endpoint);

export default socket;