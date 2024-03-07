export default class Cliente {
  id: number;
  nome: string;
  dataNascimento: Date;
  cpf: string;

  email: string;
  celular:string;
  telefone: string;
  rua: string;
  numero: string;

  cep: string;
  bairro: string;
  cidade: string;
  estado: string;
  situacao: string;
  obs:string;
  constructor(obj?: any) {
    if (obj != null) {
      Object.assign(this, obj);
    }
  }
}
