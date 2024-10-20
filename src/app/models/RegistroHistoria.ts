import { Indicador } from "./Indicador";

export interface RegistroHistoria {
  id: number;
  valorMedido: number;
  fecha: string;
  descripcion: string;
  indicador: Indicador;
}
