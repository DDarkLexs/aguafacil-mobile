import {createSlice, Middleware, PayloadAction} from '@reduxjs/toolkit';
import {URL} from 'app/constants/Index';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import {io, Socket} from 'socket.io-client';
// navigator.userAgent = "react-native";
interface SocketState {
  socket: Socket | null;
  isConnected: boolean;
  messages: IMessage[];
  loading: boolean;
  
  // outros campos de estado relacionados ao socket
}

const initialState: SocketState = {
  socket: null,
  isConnected: false,
  messages: [],
  loading: false,

  // inicialize outros campos de estado, se houver
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    pushMessage(state, action: PayloadAction<IMessage>) {
      const previousMessages = state.messages;
      state.messages = GiftedChat.append(previousMessages, [action.payload]);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    connectSocket(state, action) {
      state.socket = action.payload;
      state.isConnected = true;
    },
    disconnectSocket(state) {
      if (state.socket) {
        state.socket.disconnect();
        state.socket = null;
        state.isConnected = false;
        state.messages = [];
      }
    },
    // adicione outras actions necessárias para lidar com eventos do socket
  },
});

interface ConnectPayload {
  solicitacaoId: number;
  token: string;
}

export const socketMiddleware: Middleware =
  () => (next: any) => (action: any) => {
    console.log(action.type);
    if (action.type === 'socket/connect') {
      const {solicitacaoId, token} = action.payload as ConnectPayload;
      const socket = io(URL, {
        transports: ['polling', 'websocket'],
        auth: {
          token,
        },
        query: {
          solicitacaoId,
        },
      });

      // aqui você pode configurar event listeners, emitir eventos, etc., com o socket

      socket.on('connect', (): void => {
        console.log('Conectado ao servidor Socket.IO');
      });
      socket.on('connect_error', (err: any): void => {
        console.log('Erro ao servidor Socket.IO');
        console.log(err);
        // console.log('Conectado ao servidor Socket.IO');
      });
      socket.on('disconnect', () => {
        console.log('Desconectado do servidor Socket.IO');
      });
      // dispatch da ação para atualizar o estado do Redux com o socket conectado
      next(connectSocket(socket));
    } else if (action.type === 'socket/disconnect') {
      next(disconnectSocket()); // Chama a action para desconectar o socket
    }
    // adicione outras lógicas aqui para lidar com as interações do socket.io

    return next(action);
  };
export const {connectSocket, disconnectSocket, pushMessage, setLoading} =
  socketSlice.actions;

export const socketReducer = socketSlice.reducer;
