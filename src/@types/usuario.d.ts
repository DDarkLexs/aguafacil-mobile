type IUserType = "motorista" | "cliente";

type IUser<T extends IMotorista | ICliente, U extends IUserType> = {
  usuario: IUsuario;
} & {
  [P in U]: T;
}

interface IUserBase {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  senha: string;
  tipo: UsuarioTipo;
  created: Date;
  updated: Date;
}


