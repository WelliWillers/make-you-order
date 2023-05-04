export type CommandsProps = {
  commandNumber?: string
  commandId?: string
  commandtype?: string
  commandtypeName?: string
  commandStatus?: string
  commandtypeConsumation?: string
  openedBy?: string
  local?: {
    table: string
    type: string
  }
  ordersList?: OrdersListProps
}

export type ProductProps = {
  id: string;
  name: string;
  price: number;
  ingredients: string;
  qtd: number
}

export type OrdersListProps = {
  orderId: string;
  orderDate: number;
  orderListItems: ProductProps[];
  orderOpenedBy: string;
  orderStatus: 'pronto' | 'realizado';
  orderDescription: string;
}[]