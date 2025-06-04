import { useEffect } from 'react';
import { socket } from '../socket/SocketClient';
import { useAppSelector } from '../store/hooks';
import { GetChatListParams } from '../types/interfaces';
import useFetchData from '../api/useFetchData';

export const useSocketSubscribe = () => {
  const isConnected = useAppSelector(state => state.socketIO.isConnected);
  const user = useAppSelector(state => state.user);
  const { supportRequestApi } = useFetchData();

  useEffect(() => {
    const query: GetChatListParams = {
      userId: user.id,
      isActive: true,
    }

    if (user.role === 'manager' || user.role === 'admin') {
      query.userId = null;
    }

    supportRequestApi.findRequests(query)
      .then(result => {  
        const { data } = result;
        if (isConnected) {
          data && data.forEach((el: any) => { socket.emit('subscribeToChat', { chatId: el._id }) });
        }

        // const joinRooms = (event: StorageEvent) => {
        //   if (event.key === 'token' ) {
        //     data && data.forEach((el: any) => { socket.emit('subscribeToChat', { chatId: el._id }) });
        //   }
                
        // };
            
        // window.addEventListener('storage', joinRooms);
    
        // return () => {
        //   window.removeEventListener('storage', joinRooms);
        // };
      })
      .catch(err => {
        console.error(err);
      });
  }, [isConnected]);
};