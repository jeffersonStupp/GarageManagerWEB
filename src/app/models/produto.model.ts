export default class Produto {
  id: number;
  codigo: string;
  descricao: string;
  grupo: string;
  tipo: string;
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
