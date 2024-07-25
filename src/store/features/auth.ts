import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IAuthStore {
  motorista: IUser<IMotorista, 'motorista'> | null;
  cliente: IUser<ICliente, 'cliente'> | null;
  token: string | null;
}
interface ISetUser<T extends IMotorista | ICliente, U extends IUserType> {
  data: IUser<T, U>;
  token: string;
}

const initialState: IAuthStore = {
  cliente: null,
  motorista: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetLogin: () => initialState,
    setMotorista: (
      state,
      action: PayloadAction<ISetUser<IMotorista, 'motorista'>>,
    ) => {
      state.motorista = action.payload.data;
      state.token = action.payload.token;
      // state.token = action.payload.token;
    },
    setCliente: (
      state,
      action: PayloadAction<ISetUser<ICliente, 'cliente'>>,
    ) => {
      state.cliente = action.payload.data;
      state.token = action.payload.token;
      // state.token = action.payload.token;
    },
    // setCliente: (state, action: PayloadAction<any>) => {
    //   // state.usuario = action.payload.usuario;
    //   // state.token = action.payload.token;
    // },
    /*
    setAuthBiometric: (state, action: PayloadAction<boolean>) => {
      state.authBiometrico = action.payload;
    }, */
  },
});

export const {setCliente, setMotorista, resetLogin} = authSlice.actions;

export default authSlice.reducer;
