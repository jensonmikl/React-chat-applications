const WebSocketUrl = 'wss://api.chatengine.io/person_v4/?session_token=st-2fc7c070-052f-4305-b8ae-265086a4eb86';
let socket = null;
let reconnectInterval = 1000; // Initial interval for reconnection attempts in milliseconds
const maxReconnectAttempts = 5; // Maximum number of reconnect attempts

function connectWebSocket() {
    console.log('Attempting to connect to WebSocket...');
    socket = new WebSocket(WebSocketUrl);

    socket.onopen = function(event) {
        console.log('WebSocket connection established.');
        // Reset reconnect interval on successful connection
        reconnectInterval = 1000;
    };

    socket.onclose = function(event) {
        console.log('WebSocket connection closed.');

        if (reconnectInterval < maxReconnectAttempts) {
            // Attempt to reconnect after a certain interval
            setTimeout(connectWebSocket, reconnectInterval);
            // Exponential backoff: increase reconnect interval for next attempt
            reconnectInterval *= 2;
        } else {
            console.log('Maximum reconnect attempts reached.');
            // Optionally handle the case when maximum reconnect attempts are reached
        }
    };

    socket.onerror = function(event) {
        console.error('WebSocket connection error:', event.message);
        // Optionally handle WebSocket connection errors
    };

    socket.onmessage = function(event) {
        console.log('Received message from WebSocket:', event.data);
        // Handle incoming messages as needed
    };
}

// Initial connection attempt
connectWebSocket();
