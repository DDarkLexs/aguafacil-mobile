// Interface para o Motorista
interface IMotorista {
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
interface IUtilizador {
  created: string;
  email: string;
  exp: number;
  iat: number;
  id: number;
  motorista: IMotorista;
  nome: string;
  senha: string;
  telefone: string;
  tipo: string;
  updated: string;
}

// Interface para a Solicitação
interface ICreatedServicoSolicitado {
  id: number;
  titulo: string;
  descricao?: string;
  litroAgua: number;
  preco: number;
  status: ServicoStatus;
  coordenada: string;
  dataConclusao?: Date;
  clienteId: number;
  motoristaId: number;
  created: Date;
  updated: Date;
  cliente: ICliente;
  motorista: IMotorista;
  SSCoordenada: SSCoordenada[];
}

// Interface principal que contém as outras
interface IMotoristaAceitaSolicitacaoResponse {
  solicitacao: ICreatedServicoSolicitado;
  utilizador: Utilizador;
  data: IData
}

interface IAddress {
  ISO3166_2_lvl4: string;
  country: string;
  country_code: string;
  county: string;
  neighbourhood: string;
  state: string;
  suburb: string;
  village: string;
}

interface IData {
  address: IAddress;
  addresstype: string;
  boundingbox: [string, string, string, string];
  category: string;
  display_name: string;
  importance: number;
  lat: string;
  licence: string;
  lon: string;
  name: string;
  osm_id: number;
  osm_type: string;
  place_id: number;
  place_rank: number;
  type: string;
}

interface IMotoristaUpdatePositionResponse {
  data: IData;
}


interface IMotoristaOrigin {
  data: IData;
}