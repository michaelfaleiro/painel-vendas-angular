import { IProduto } from './IProduto';

export interface IOrcamento {
  id: string;
  cliente: string;
  telefone: string;
  carro: string;
  placa?: string;
  chassis?: string;
  total: number;
  produtos?: IProduto[];
  createdAt: string;
  updatedAt: string;
}
