/**
 * UnityLink Socket Simulation Service
 * Emits random events to mimic real-time server pushes.
 */

const SocketService = {
    listeners: {},

    on: (event, callback) => {
        if (!SocketService.listeners[event]) {
            SocketService.listeners[event] = [];
        }
        SocketService.listeners[event].push(callback);
    },

    emit: (event, data) => {
        if (SocketService.listeners[event]) {
            SocketService.listeners[event].forEach(cb => cb(data));
        }
    },

    // Start simulating background traffic
    start: () => {
        // Simulating Water Level updates every 15s
        setInterval(() => {
            const level = Math.floor(Math.random() * 20) + 60; // 60-80%
            SocketService.emit('iot_update', { type: 'water', value: level });
        }, 15000);

        // Simulating Fuel updates every 30s
        setInterval(() => {
            const fuel = Math.floor(Math.random() * 10) + 40; // 40-50%
            SocketService.emit('iot_update', { type: 'fuel', value: fuel });
        }, 30000);

        // Simulating Security Alerts
        setInterval(() => {
            if (Math.random() > 0.8) {
                SocketService.emit('security_alert', { 
                    id: Date.now(),
                    msg: 'Guest QR Pass Verified at Gate 2',
                    time: new Date().toLocaleTimeString()
                });
            }
        }, 20000);
    }
};

export default SocketService;
