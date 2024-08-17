/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from './useRedux';

export const useSocket = () => {
  const socket = useAppSelector(state => state.socket);
  const dispatch = useAppDispatch();
  const isConnected = useAppSelector(state => state.socket.isConnected);

  const connectSocket = (id_user: number, id_corrida: number) => {
    if (socket) {
      console.log('====================================');
      console.log('tentando se conectar ao socket');
      console.log('====================================');
      dispatch({
        type: 'socket/connect',
        payload: {
          id_user,
          id_corrida,
        },
      });
    }
  };

  const turnOnConnection = () => {
    console.log('====================================');
    console.log('tentando se ligar o socket');
    console.log('====================================');
    socket.socket?.connect();
  }

  const disconnectSocket = () => {
    console.log('====================================');
    console.log('tentando se desconectando do socket');
    console.log('====================================');
    dispatch({type: 'socket/disconnect'});
  };

  return { socket, connectSocket, disconnectSocket, turnOnConnection };

};
