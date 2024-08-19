import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IArquiveStore {
  servico: IServicoArchive[];
  solicitacao?: IServicoSolicitado | null;
  servicoEmcurso: IMotoristaAceitaSolicitacaoResponse | null;
}

const initialState: IArquiveStore = {
  servico: [],
  solicitacao: null,
  servicoEmcurso: null,
};

const arquivoSlice = createSlice({
  name: 'clienteArquivos',
  initialState,
  reducers: {
    resetClientArquivo: () => initialState,

    setServicoArquivo: (state, action: PayloadAction<IServicoArchive[]>) => {
      state.servico = action.payload;
    },
    setServicoEmCurso: (state, action: PayloadAction<IMotoristaAceitaSolicitacaoResponse | null>) => {
      state.servicoEmcurso = action.payload;
    },
  },
});

export const {resetClientArquivo, setServicoArquivo, setServicoEmCurso} = arquivoSlice.actions;

export default arquivoSlice.reducer;
