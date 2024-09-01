import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IEmcursoState {
    solicitacao?: IServicoSolicitado | null;
    data: IMotoristaAceitaSolicitacaoResponse | null;
    motoristalocaizacaoEmCurso: TMotoristaLocation | null;
    servicoEmcurso: IMotoristaAceitaSolicitacaoResponse | null;
}

const initialState: IEmcursoState = {
    data: null,
    motoristalocaizacaoEmCurso: null,
    solicitacao: null,
    servicoEmcurso: null

};

const clienteEmCursoSlice = createSlice({
    name: 'clienteEmCurso',
    initialState,
    reducers: {
        resetClientArquivo: () => initialState,
        setServicoEmCurso: (
            state,
            action: PayloadAction<IMotoristaAceitaSolicitacaoResponse | null>,
        ) => {
            state.data = action.payload;
        },
        setMotoristaLocacao: (
            state,
            action: PayloadAction<TMotoristaLocation | null>,
        ) => {
            state.motoristalocaizacaoEmCurso = action.payload;
        },
    },
});

export const {
    resetClientArquivo,
    setServicoEmCurso,
    setMotoristaLocacao,
} = clienteEmCursoSlice.actions;

export default clienteEmCursoSlice.reducer;
