export class Match {
  fecha: Date;
  hora: Date;
  lugar: string;

  constructor() {
    this.fecha = new Date();
    this.hora = new Date();
    this.lugar = '';
  }
}
