export default class Configuracao {
id:number;
homologacao:boolean;
idadeMinimaCadastro:number;
idadeMaximaCadastro:number;


constructor(obj?: any) {
  if (obj != null) {
    Object.assign(this, obj);
  }
}

}
