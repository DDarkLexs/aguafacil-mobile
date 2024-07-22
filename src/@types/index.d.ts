type TUsuarioTipo = 'CLIENTE' | 'MOTORISTA';

interface IUsuario {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  senha: string;
  tipo: TUsuarioTipo;
  created: Date;
  updated: Date;
}

interface IMotorista {
  id: number;
  usuarioId: number;
  fotoPerfil: string;
  localizacao: string;
  coordenada?: string;
  avaliacaoMedia: number;
  disponivel: boolean;
  created: Date;
  updated: Date;
}

interface ICliente {
  id: number;
  usuarioId: number;
  fotoPerfil: string;
  created: Date;
  updated: Date;
  // Usuario: Usuario;
}

interface IServicoMotorista {
  id: number;
  titulo: string;
  descricao?: string;
  preco: number;
  ocupado: boolean;
  litroAgua: number;
  motoristaId: number;
  motorista: Motorista;
}

interface IServicoSolicitado {
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
  Cliente: Cliente;
  Motorista: Motorista;
}

interface IAvaliacao {
  id: number;
  clienteId: number;
  motoristaId: number;
  nota: number;
  comentario?: string;
  created: Date;
  updated: Date;
  Cliente: Cliente;
  Motorista: Motorista;
}

interface ToastNotificationProps {
  text1: string;
  text2: string;
  img: any;
}

interface IServicoAvaliable extends IServicoMotorista {
  motorista: IMotorista & {
    Usuario: IUsuario
  };
}
