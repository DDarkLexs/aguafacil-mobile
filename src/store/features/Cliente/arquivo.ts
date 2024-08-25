import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IArquiveStore {
  servico: IServicoArchive[];
  solicitacao?: IServicoSolicitado | null;
  servicoEmcurso: IMotoristaAceitaSolicitacaoResponse | null;
  motoristalocaizacaoEmCurso: (IAddress & {coordinates: string, endereco: string}) | null;
}

const initialState: IArquiveStore = {
  servico: [],
  solicitacao: null,
  servicoEmcurso: null,
  motoristalocaizacaoEmCurso: null,
};

const arquivoSlice = createSlice({
  name: 'clienteArquivos',
  initialState,
  reducers: {
    resetClientArquivo: () => initialState,

    setServicoArquivo: (state, action: PayloadAction<IServicoArchive[]>) => {
      state.servico = action.payload;
    },
    setServicoEmCurso: (
      state,
      action: PayloadAction<IMotoristaAceitaSolicitacaoResponse | null>,
    ) => {
      state.servicoEmcurso = action.payload;
    },
    setMotoristaLocacao: (
      state,
      action: PayloadAction<(IAddress & {coordinates: string, endereco: string}) | null>,
    ) => {
      state.motoristalocaizacaoEmCurso = action.payload;
    },
  },
});

export const {
  resetClientArquivo,
  setServicoArquivo,
  setServicoEmCurso,
  setMotoristaLocacao,
} = arquivoSlice.actions;

export default arquivoSlice.reducer;
