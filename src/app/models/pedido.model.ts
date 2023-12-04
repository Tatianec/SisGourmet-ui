export interface PedidoProduct {
  id_product: number;
  qtd_sold: number;
}

export interface Pedido {
  id?: number;
  date: Date;
  employee_id: number;
  desk_id: number;
  total: number;
  observation: string;
  status: String;
  products: PedidoProduct[];
  statusChecked?: boolean;
}
