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
