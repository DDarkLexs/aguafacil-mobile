const {UsuarioEnum} = Modules

interface IAuthUserMotoristaSuccess {
  usuario: IUsuario;
  token: string; // Token de autenticação JWT
  ['motorista']: IMotorista;
}

interface IAuthUserClienteSuccess {
  usuario: IUsuario;
  token: string; // Token de autenticação JWT
  ['cliente']: ICliente;
}

interface IUserLogin {
  senha: string;
  telefone: string;
}

interface IUserSignUp {
  nome: string;
  email?: string;
  tipo: UsuarioEnum;
  senha: string;
  telefone: string;
}

interface IUserSignUpProp {
  telefone: string;
}

interface IUserSignUpSuccess extends ICliente {
  usuario: IUsuario;
}
