import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAppDispatch } from '../store/hooks';
import { setConnectedStatus } from '../store/socket/socketSlice';

export const socket = io(`${import.meta.env.VITE_SERVER_URL}`, {
  autoConnect: false,
});

export const SocketClient = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    function onConnect() {
      dispatch(setConnectedStatus({ isConnected: true }));
    }

    function onDisconnect() {
      dispatch(setConnectedStatus({ isConnected: false }));
    }
    
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
  
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);
};