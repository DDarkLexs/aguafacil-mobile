import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IArquiveStore {
    servico: IServicoArchive[]
}

const initialState: IArquiveStore = {
  servico: []
};

const arquivoSlice = createSlice({
  name: 'clienteArquivos',
  initialState,
  reducers: {
    resetClientArquivo: () => initialState,

    setServicoArquivo: (state, action: PayloadAction<IServicoArchive[]>) => {
        state.servico = action.payload;
    },

  },
});

export const {resetClientArquivo, setServicoArquivo} = arquivoSlice.actions;

export default arquivoSlice.reducer;
