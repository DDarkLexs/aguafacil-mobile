import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IArquiveStore {
  servico: IServicoArchive[];
}

const initialState: IArquiveStore = {
  servico: [],
};

const clientServicoSlice = createSlice({
  name: 'clienteServico',
  initialState,
  reducers: {
    resetClientService: () => initialState,

    setServico: (state, action: PayloadAction<IServicoArchive[]>) => {
      state.servico = action.payload;
    },
    },
});

export const {
  resetClientService,
  setServico,
} = clientServicoSlice.actions;

export default clientServicoSlice.reducer;
