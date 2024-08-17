import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IArquiveStore {
  servico: IServicoArchive[];
  solicitacao?: IServicoSolicitado | null;
}

const initialState: IArquiveStore = {
  servico: [],
  solicitacao: null,
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
