import { useEffect } from 'react';
import { socket } from '../socket/SocketClient';
import { getToken } from '../helpers/localStorage.helpers';

export const useSocket = () => {
  useEffect(() => {
    const token = getToken();
    socket.io.opts.extraHeaders = {
      Authorization: token,
    };
    socket.connect();

    const listener = (event: StorageEvent) => {
      if (event.key === 'token') {
        socket.io.opts.extraHeaders = {
          Authorization: event.newValue!,
        };
      }
    };

    window.addEventListener('storage', listener);
      
    return () => { 
      socket.disconnect(); 
      window.removeEventListener('storage', listener);
    };
  }, []);
};