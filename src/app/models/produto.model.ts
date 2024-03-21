export default class Produto {
  id: number;
  codigo: string;
  descricao: string;
  fabricante: string;
  fornecedor: string;
  preco: number;
  garantia: number;

  constructor(obj?: any) {
    if (obj != null) {
      Object.assign(this, obj);
    }
  }
}
