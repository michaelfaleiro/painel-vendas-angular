export interface IProduto {
  id?: string;
  quantidade: number;
  sku: string;
  nomeProduto: string;
  marca?: string;
  precoVenda: number;
  link?: string;
  observacao?: string;
  createdAt: string;
  updatedAt: string;
}
