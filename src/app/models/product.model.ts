export interface Product {
  id: number; 
  name: string;
  qtd_items: number;
  description: string;
  total: number;
  qtd_sold?: number; 
  estoque?: boolean;
}
