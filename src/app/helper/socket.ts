import colors from 'colors';
import { Server, Socket } from 'socket.io';

declare module 'socket.io' {
    interface Socket {
        userId?: string;
    }
}

// const socket = (io: Server) => {
//     io.on('connection', (socket: Socket) => {
//         console.log(colors.blue(`🔌🟢 A user connected ${socket.id}`));
//         socket.on('user-connected', (userId: string) => {
//             socket.userId = userId;
//             socket.join(userId); // Join the room for the specific user
//             console.log(
//                 colors.green(`User ${userId} joined their notification room`)
//             );
//         });
//         socket.on('disconnect', () => {
//             console.log(colors.red('🔌🔴 A user disconnected'));
//         });
//     });
// };

const socket = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log(colors.blue(`🔌🟢 A user connected ${socket.id}`));
        
        // User connected, join their room
        socket.on('user-connected', (data: { userId: string }) => {
            socket.userId = data.userId;
            socket.join(data.userId); // Join the room for the specific user
            console.log(colors.green(`User ${data.userId} joined their room`));
        });

        // Listen for the newMessage event from a client
        // socket.on('newMessage', (data: { senderId: string; receiverId: string; message: string }) => {
        //     console.log('Received newMessage event:', data); // Log the incoming data
        //     const { senderId, receiverId, message } = data;

        //     // Emit the message to the receiver's room
        //     io.to(receiverId).emit('messageReceived', {
        //         senderId,
        //         message,
        //     });

        //     // Send a notification to the receiver (you can modify the notification data as needed)
        //     io.to(receiverId).emit('notification', {
        //         senderId,
        //         message: `New message from ${senderId}: ${message}`,
        //     });

        //     console.log(colors.yellow(`New message from ${senderId} to ${receiverId}: ${message}`));
        // });

        socket.on('disconnect', () => {
            console.log(colors.red('🔌🔴 A user disconnected'));
        });
    });
};




export const socketHelper = { socket };


/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Server as IOServer, Socket } from 'socket.io';
// import { Server as HTTPServer } from 'http';
// import handleChat from './handleChat';
// import NormalUser from '../modules/normalUser/normalUser.model';
// let io: IOServer;

// const initializeSocket = (server: HTTPServer) => {
//   if (!io) {
//     io = new IOServer(server, {
//       pingTimeout: 60000,
//       cors: {
//         origin: ['http://localhost:3000', 'http://192.168.10.25:7585'],
//       },
//     });
//     // online user
//     const onlineUser = new Set();
//     io.on('connection', async (socket: Socket) => {
//       const userId = socket.handshake.query.id as string;
//       if (!userId) {
//         return;
//       }
//       const currentUser = await NormalUser.findById(userId);
//       if (!currentUser) {
//         return;
//       }
//       const currentUserId = currentUser?._id.toString();
//       // create a room-------------------------
//       socket.join(currentUserId as string);
//       // set online user
//       onlineUser.add(currentUserId);
//       // send to the client

//       // handle chat -------------------
//       await handleChat(io, socket, onlineUser, currentUserId);
//       io.emit('onlineUser', Array.from(onlineUser));
//       socket.on('disconnect', () => {
//         console.log('A user disconnected:', socket.id);
//       });
//     });
//   }
//   return io;
// };

// const getIO = () => {
//   if (!io) {
//     throw new Error(
//       'Socket.io is not initialized. Call initializeSocket first.',
//     );
//   }
//   return io;
// };

// export { initializeSocket, getIO };