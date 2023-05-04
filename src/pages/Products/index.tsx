import { products } from "../../utils/productsList";

export default function Products() {
  return (
    <div className="w-full text-center">
      <p className="text-3xl pb-8">Produtos</p>
      <div className="flex gap-4 flex-col">

      {
         products.map((product) => (
          <div key={product.id} className="bg-gray-300 p-4 rounded-lg flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center justify-start gap-4 w-full flex-col md:flex-row">
              <img className="max-w-full md:max-w-[10rem] rounded-lg" src={product.image} alt="" />

              <div className="text-left w-full">
                <p className="text-xl text-blue-700 font-semibold w-full">{product.name}</p>
                <p className="text-xs text-gray-900">{product.ingredients}</p>
              </div>
            </div>
            <div className="flex justify-end w-full">
              <p className="text-2xl font-bold text-gray-800"><span className="text-blue-700 text-sm">R$</span>{product.price / 100},00</p>
            </div>
          </div>
        ))
      }
    </div>
    </div>
  );
}
