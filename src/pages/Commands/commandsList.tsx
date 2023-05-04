import { format } from "date-fns";
import { CaretDoubleRight } from "@phosphor-icons/react";
import { OrdersListProps } from "../../types";

type Props = {
  orders: OrdersListProps;
  commandTypeAmount: string;
  consumation: string;
};

export default function CommandList({ orders, commandTypeAmount, consumation }: Props) {
  const calc = orders.reduce(
    (acc, item) => {
      item.orderListItems &&
      item.orderListItems.map((productItem) => {
        acc.total += (productItem.price * productItem.qtd);
      });
      return acc;
    },
    {
      total: 0,
    }
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <p className="bg-blue-600 p-4 rounded-lg w-full text-center text-gray-50">
          Entrada:{" "} <b>{new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(Number(commandTypeAmount) / 100)}</b>
        </p>

        <p className="bg-blue-600 p-4 rounded-lg w-full text-center text-gray-50">
          Consumação:{" "}
          <b>{new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(Number(consumation) / 100)}</b>
        </p>

        <p className="bg-green-600 p-4 rounded-lg w-full text-center text-gray-50">
          Total:{" "}
          <b>{new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format((calc.total >= Number(consumation) ? calc.total + Number(commandTypeAmount) - Number(consumation) : Number(commandTypeAmount) ) / 100)}</b>
        </p>
      </div>

      <p className="text-xl pb-4 pt-6">Lista de pedidos desta comanda:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.orderId}
              className="flex items-center justify-between  flex-col bg-gray-200 p-2 rounded-lg"
            >
              <p className="mb-2 font-semibold">Pedido: {order.orderId}</p>
              <div className="flex items-center justify-center flex-col rounded-lg bg-gray-100 p-4 min-w-[4rem] w-full">
                {
                order.orderListItems ?
                order.orderListItems.map((product) => (
                  <div key={product.id} className="w-full flex justify-between border-b-2 mb-2 pb-2">
                    <p className="flex gap-2 items-center">
                      <CaretDoubleRight className="mr-2 text-blue-600" /> <span className="text-blue-100 bg-gray-600 px-3 py-1 rounded-lg">{product.qtd}x</span> - {product.name}
                    </p>
                    <p className="text-blue-600">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format((product.price * product.qtd) / 100)}
                    </p>
                  </div>
                )) : (
                  <p>Este pedido teve seus itens deletados</p>
                )}
              </div>
              <div className="flex justify-between items-center w-full p-2">
                <p className="text-xs mt-2 text-gray-600">
                  Pedido em:{" "}
                  {format(Number(order.orderDate), "dd/MM/yyyy às HH:mm")}
                </p>
                <p className="text-xs mt-2 text-gray-600">
                  Aberto por: {order.orderOpenedBy}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>Esta comanda não teve nenhum pedido</p>
        )}
      </div>
      <p className="bg-orange-600 p-4 rounded-lg w-full text-center text-gray-50">
        Total em produtos:{" "}
        <b>{new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(calc.total / 100)}</b>
      </p>
    </div>
  );
}
