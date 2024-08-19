// Interface para o Motorista
interface Motorista {
    avaliacaoMedia: number;
    coordenada: string | null;
    created: string;
    disponivel: boolean;
    fotoPerfil: string;
    id: number;
    localizacao: string;
    updated: string;
    usuarioId: number;
  }
  
  // Interface para o Utilizador
  interface Utilizador {
    created: string;
    email: string;
    exp: number;
    iat: number;
    id: number;
    motorista: Motorista;
    nome: string;
    senha: string;
    telefone: string;
    tipo: string;
    updated: string;
  }
  
  // Interface para a Solicitação
  interface Solicitacao {
    clienteId: number;
    created: string;
    dataConclusao: string | null;
    descricao: string | null;
    id: number;
    litroAgua: number;
    motorista: Motorista;
    motoristaId: number;
    preco: number;
    status: string;
    titulo: string;
    updated: string;
  }
  
  // Interface principal que contém as outras
  interface IMotoristaAceitaSolicitacaoResponse {
    solicitacao: Solicitacao;
    utilizador: Utilizador;
  }
  