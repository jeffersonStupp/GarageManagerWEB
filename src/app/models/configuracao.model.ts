export default class Configuracao {
id:number;
homologacao:boolean;
idadeMinimaCadastro:number;
idadeMaximaCadastro:number;
descontoPagamentoVista:number;
taxaDeJuros:number;
margemPecas:number;
MaoDeObra:number;
localArquivoContratoDeServico:string;
nomeOficina:string;
numeroOficina:string;
ruaOficina:string;
bairroOficina:string;
cidadeOficina:string;
cepOficina:string;
estadoOficina:string;
cnpjOficina:string;
telefoneOficina:string;
emailOficina:string

constructor(obj?: any) {
  if (obj != null) {
    Object.assign(this, obj);
  }
}

}
