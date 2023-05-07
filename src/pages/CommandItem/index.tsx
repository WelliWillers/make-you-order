import { CircleNotch, Minus, Plus, Trash, User, Users, X } from "@phosphor-icons/react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { getDatabase, onValue, ref, remove, update } from "firebase/database";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../../hooks/useLoader";
import { returnErrorMsg } from "../../utils/ErrorReport";
import { toast } from "react-toastify";
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from "@radix-ui/react-tabs";
import { useAuth } from "../../hooks/useAuth";
import { format } from "date-fns";
import UUID from "uuid-int";
import { products } from "../../utils/productsList";
import { CommandsProps, OrdersListProps, ProductProps } from "../../types";
import { useParams } from 'react-router-dom'
import * as RadioGroup from "@radix-ui/react-radio-group";

export default function CommandItem() {
  const [commandtype, setCommandtype] = useState<'homem' | 'mulher' | 'criança'>();
  const [ambiente, setAmbiente] = useState<'mesa' | 'drive'>("mesa");
  const [tab, setTab] = useState("pedido");
  const [massageInOrder, setMassageInOrder] = useState("");
  const [commandNumber, setCommandNumber] = useState('');
  const [orderList, setOrderList] = useState<OrdersListProps>([]);
  const [tableNumber, setTableNumber] = useState('');
  const { setLoading, show } = useLoader()
  const navigate = useNavigate()
  const { command } = useParams()

  const { user } = useAuth()
  const [newOrderListItems, setNewOrderListItems] = useState<ProductProps[]>([])
  const db = getDatabase();
  const generator = UUID(0);

  
  async function handleAddProductInListOrder(type: 'plus' | 'minus', item: ProductProps){
    try {
      const updatedOrderListItems = [...newOrderListItems];
      const extistProduct = updatedOrderListItems.find(product => product.id === item.id);

      const currentqtd = extistProduct ? extistProduct.qtd : 0;
      const qtd = type === 'plus' ? currentqtd + 1 : currentqtd >= 1 ? currentqtd - 1 : currentqtd;

      if(extistProduct) {
        extistProduct.qtd = qtd;
      } else {
        if(qtd > 0){
          updatedOrderListItems.push(item);
        }
      }
      
      setNewOrderListItems(updatedOrderListItems);

    } catch {
      toast.error('Erro ao realizar pedido');
    }    
  }

  function handleRemoveItemOrder(orderListIndex: string, productIndex:string){
    setLoading(true)
    remove(ref(db, `commands/${command}/ordersList/${orderListIndex}/orderListItems/${productIndex}`))
    .then(() => {
      toast.success('Item removido do pedido com sucesso')
    }).finally(() => {
      setLoading(false)
    })
  }

  function handleRemoveOrder(orderListIndex: string){
    setLoading(true)
    remove(ref(db, `commands/${command}/ordersList/${orderListIndex}`))
    .then(() => {
      navigate(0)
      toast.success('Pedido removido com sucesso')
    }).finally(() => {
      setLoading(false)
    })
  }

  function handleSaveOrder() {
    if(ambiente === 'mesa' && !tableNumber){
      toast.error('É obrigatório informar o número da mesa')
      setTab('local')
      return
    } 

    setLoading(true)

    const data = {
      local: {
        type: ambiente,
        table: ambiente === 'mesa' ? tableNumber : '',
      },
      ordersList: [
        ...orderList,
        {
          orderId: generator.uuid(),
          orderListItems: newOrderListItems,
          orderStatus: 'realizado',
          orderDate: Date.now(),
          orderOpenedBy: user.data.user.name,
          orderDescription: massageInOrder
        }
      ]
    }

    update(ref(db, 'commands/' + command), data).then(() => {
      toast.success('Tipo de comanda alterada com sucesso')
    }).catch((error) => {      
      returnErrorMsg(error, 'Algum erro aconteceu, tente novamente')
    }).finally(() => {
      setNewOrderListItems([])
      setAmbiente('mesa')
      setTab('pedido')
      setMassageInOrder('')
      setLoading(false)
    })
  }

  function handleDiscartOrder(){
    setNewOrderListItems([])
    setAmbiente('mesa')
    setTab('pedido')
    setMassageInOrder('')
  }

  function handleUpdateCommandType(value: 'homem' | 'mulher' | 'criança') {
    setCommandtype(value)
    const data = {
      commandtype: value === 'criança' ? '1500' : value === 'homem' ? '3000' : '2000',
      commandtypeName: value,
      commandtypeConsumation: value === 'criança' ? '1000' : value === 'homem' ? '1500' : '1500'
    }

    setLoading(true)

    update(ref(db, 'commands/' + command), data).then(() => {
      toast.success('Tipo de comanda alterada com sucesso')
    }).catch((error) => {      
      returnErrorMsg(error, 'Algum erro aconteceu, tente novamente')
    }).finally(() => {
      setLoading(false)
    })
  }

  function getCommand(){
    const commandFound = ref(db, 'commands/' + command)
    onValue(commandFound, (snapshot) => {
      const data: CommandsProps = snapshot.val();
      if(!data){
        toast.warning('Esta comanda já foi fechada')
        navigate('/home')
        return
      } 
      data.commandNumber && setCommandNumber(data.commandNumber)
      data.ordersList && setOrderList(data.ordersList)
      data.commandtype && setCommandtype(data.commandtypeName as 'homem' | 'mulher' | 'criança')
    });
  }

  useEffect(() => {
    if(command){
      getCommand()
    }
  }, [])

  return (
    <div className="w-full text-center">
      <p className="text-3xl pb-4">Comanda número {commandNumber}</p>
      
      <div className="pt-4 text-left">
        <p className="pb-4">Marque o tipo de comanda</p>

          <RadioGroup.Root className="flex flex-col md:flex-row rounded-md w-full gap-4" onValueChange={handleUpdateCommandType} value={commandtype} aria-label="View density">
            <div className={`group bg-white transition-colors text-gray-900 p-4 flex gap-4 flex-row relative justify-between w-full text-base leading-4 items-center md:justify-center ml-[1px] first:ml-0 rounded-xl hover:bg-blue-500 focus:relative focus:shadow`}>
              <RadioGroup.Item className="w-9 h-8 rounded-full bg-gray-200 hover:bg-blue-300" value="homem" id="homem">
                <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:block after:w-3 after:h-3 after:bg-blue-600 after:rounded-full" style={{content: ''}} />
              </RadioGroup.Item>
              <label className="w-full cursor-pointer flex items-center justify-center gap-4" htmlFor="homem">
                <User className="group-data-[state=checked]:text-white" size={35} />
                <div>
                  <p className="text-xl font-bold group-data-[state=checked]:text-white">Homem</p>
                  <p className="text-xs group-data-[state=checked]:text-white">R$ 30,00</p>
                </div>
              </label>
            </div>
            
            <div className={`group bg-white transition-colors text-gray-900 p-4 flex gap-4 flex-row relative justify-between w-full text-base leading-4 items-center md:justify-center ml-[1px] first:ml-0 rounded-xl hover:bg-blue-500 focus:relative focus:shadow`}>
              <RadioGroup.Item className="w-9 h-8 rounded-full bg-gray-200 hover:bg-blue-300" value="mulher" id="mulher">
                <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:block after:w-3 after:h-3 after:bg-blue-600 after:rounded-full" style={{content: ''}} />
              </RadioGroup.Item>
              <label className="w-full cursor-pointer flex items-center justify-center gap-4" htmlFor="mulher">
                <User className="group-data-[state=checked]:text-white" size={35} />
                <div>
                  <p className="text-xl font-bold group-data-[state=checked]:text-white">Mulher</p>
                  <p className="text-xs group-data-[state=checked]:text-white">R$ 20,00</p>
                </div>
              </label>
            </div>

            <div className={`group bg-white transition-colors text-gray-900 p-4 flex gap-4 flex-row relative justify-between w-full text-base leading-4 items-center md:justify-center ml-[1px] first:ml-0 rounded-xl hover:bg-blue-500 focus:relative focus:shadow`}>
              <RadioGroup.Item className="w-9 h-8 rounded-full bg-gray-200 hover:bg-blue-300" value="criança" id="criança">
                <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:block after:w-3 after:h-3 after:bg-blue-600 after:rounded-full" style={{content: ''}} />
              </RadioGroup.Item>
              <label className="w-full cursor-pointer flex items-center justify-center gap-4" htmlFor="criança">
                <Users className="group-data-[state=checked]:text-white" size={35} />
                <div>
                  <p className="text-xl font-bold group-data-[state=checked]:text-white">Criança</p>
                  <p className="text-xs group-data-[state=checked]:text-white">R$ 15,00</p>
                </div>
              </label>
            </div>
          </RadioGroup.Root>
      </div>

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <div>
            
            <button
              disabled={!commandtype}
              className="flex w-full justify-center rounded-md disabled:bg-gray-400 disabled:text-gray-800 disabled:cursor-not-allowed bg-blue-600 px-3 mt-8 py-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {
                show ? (<CircleNotch className="animate-spin" size={30} />) : !commandtype ? 'É nescessário informar o tipo de comanda' : 'Fazer um novo pedido'
              }
            </button>
          </div>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black opacity-40 fixed inset-0" />

          <Dialog.Content className="animate-fadeIn overflow-hidden bg-gray-50 p-4 mr-2 w-full rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[95%] max-h-[90%]">
            
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-2xl pb-4">Montar pedido</Dialog.Title>
              <Dialog.Close asChild>
                <button aria-label="Fechar">
                  <X size={20} />
                </button>
              </Dialog.Close>
            </div>
            
            <div className="h-full">
              <Tabs.Root className="h-auto" defaultValue={tab} onValueChange={setTab}>
                <Tabs.List className="flex items-center justify-evenly" aria-label="Manage your account">
                  <Tabs.Trigger className="w-full px-4 py-1 border-b border-blue-600 rounded-t-2xl hover:bg-blue-100 transition-colors data-[state=active]:bg-blue-600 data-[state=active]:text-white" value="pedido">
                    Pedido
                  </Tabs.Trigger>
                  <Tabs.Trigger className="w-full px-4 py-1 border-b border-blue-600 rounded-t-2xl hover:bg-blue-100 transition-colors data-[state=active]:bg-blue-600 data-[state=active]:text-white" value="local">
                    Local
                  </Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content className="p-4 overflow-scroll h-[60vh]" value="pedido">
                  <Dialog.Description className="pb-4">
                    Escolha a bebida ou alimento desejado clicando no icone a direita
                  </Dialog.Description>

                  <div className="pb-4">
                    <input
                      type="text"
                      id="email"
                      onChange={(e) => setMassageInOrder(e.target.value)}
                      name="email"
                      placeholder="Descrição para o pedido"
                      className="block w-full rounded-md border-0 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                  </div>

                  <div className="flex gap-4 flex-col pr-2">
                    {
                      products.map((product) => (
                        <div key={product.id} className="bg-gray-300 p-4 rounded-lg flex flex-col md:flex-row items-center justify-between text-left">
                          <div className="flex items-center gap-4 w-full">
                            <div className="w-full flex items-center gap-4 flex-col md:flex-row">
                              <img className="max-w-full md:max-w-[10rem] rounded-lg" src={product.image} alt="" />
                              <div className="w-full">
                                <p>{product.name}</p>
                                <p className="text-sm text-gray-500 pb-4">{product.ingredients}</p>
                                <p className="text-2xl font-bold md:text-left text-right text-blue-600">{new Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                  }).format(product.price / 100)}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 justify-center mt-4 md:mt-0 w-full md:w-fit">
                            <button onClick={() => handleAddProductInListOrder('minus', {...product, qtd: 1})} className="p-2 bg-blue-500 w-full md:w-auto rounded-lg md:rounded-full text-white flex justify-center">
                              <Minus size={30} />
                            </button>
                            {
                              newOrderListItems.map(item => 
                                item.id === product.id && (
                                  <div key={item.id} className="flex items-center justify-center rounded-lg bg-gray-100 p-4">
                                    <p>
                                      {item.qtd}
                                    </p>
                                  </div>
                                )
                              )
                            }
                            <button onClick={() => handleAddProductInListOrder('plus', {...product, qtd: 1})} className="p-2 bg-blue-500 w-full md:w-auto rounded-lg md:rounded-full text-white flex justify-center">
                              <Plus size={30} />
                            </button>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </Tabs.Content>

                <Tabs.Content className="p-4" value="local">
                  <Dialog.Description className="DialogDescription">
                    É importante sinalizar o local para a entrega do pedido.
                  </Dialog.Description>
                  <div className="text-left">
                    <p className="pb-4">Informe o ambiente</p>
                    <ToggleGroup.Root
                      className="flex flex-col md:flex-row rounded-lg w-full gap-4"
                      type="single"
                      defaultValue="mesa"
                      value={ambiente}
                      onValueChange={(value:'mesa' | 'drive') => setAmbiente(value)}
                      aria-label="type"
                    >
                      <ToggleGroup.Item
                        className="group bg-gray-200 transition-colors text-gray-900 p-4 flex gap-4 flex-row md:flex-col w-full text-base leading-4 items-center justify-center ml-[1px] first:ml-0 rounded-xl hover:bg-blue-500 focus:relative focus:shadow data-[state=on]:bg-blue-700 data-[state=on]::test-white"
                        value="mesa"
                        aria-label="Mesa"
                      >
                        <p className="text-xl font-bold group-data-[state=on]:text-white">Mesa</p>
                      </ToggleGroup.Item>
                      <ToggleGroup.Item
                        className="group bg-gray-200 transition-colors text-gray-900 p-4 flex gap-4 flex-row md:flex-col w-full text-base leading-4 items-center justify-center ml-[1px] first:ml-0 rounded-xl hover:bg-blue-500 focus:relative focus:shadow data-[state=on]:bg-blue-700 data-[state=on]::test-white"
                        value="drive"
                        aria-label="drive thru"
                      >
                        <p className="text-xl font-bold group-data-[state=on]:text-white">Drive thru</p>
                      </ToggleGroup.Item>
                    </ToggleGroup.Root>
                  </div>

                  {
                    ambiente === 'mesa' && (
                      <div className="py-8 text-left">
                        <p className="pb-4">Informe o número da mesa</p>
                        <input
                          id="table"
                          name="mesa"
                          type="number"
                          value={tableNumber}
                          onChange={(e) => setTableNumber(e.target.value)}
                          placeholder="Número da mesa"
                          className="block w-full rounded-md border-0 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    )
                  }
                </Tabs.Content>
              </Tabs.Root>
            </div>

            <Dialog.Close asChild className="sticky bottom-0 left-0 right-0 w-full px-4 p-6 shadow-gray-400 shadow-md rounded-lg bg-gray-200">
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={handleDiscartOrder}
                  className="flex w-full justify-center rounded-md bg-gray-700 px-3 py-4 text-sm font-semibold leading-6 text-gray-50 shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Descartar
                </button>
                <button
                  type="submit"
                  disabled={ambiente === 'mesa' && !tableNumber}
                  onClick={handleSaveOrder}
                  className="flex w-full justify-center rounded-md bg-blue-600 disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed px-3 py-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  {
                    show ? (<CircleNotch className="animate-spin" size={30} />) : 'Salvar'
                  }
                </button>
              </div>
            </Dialog.Close>

          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <div className="pt-8">
        {
          orderList.length > 0 && (
            <>
              <p className="text-2xl pb-4">Pedidos desta comanda</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                  orderList.map((item, itemListIndex) => (
                    <Dialog.Root key={item.orderId}>
                      <Dialog.Trigger asChild>
                        <button className="bg-gray-100 text-gray-900 rounded-lg p-4">
                          <p className="pb-2">{item.orderId}</p>
                          <p className="text-xs text-gray-500">Solicitado por: {item.orderOpenedBy}</p>
                          <p className="text-xs text-gray-400">Pedido às: {format(Number(item.orderDate), 'HH:mm - dd/MM/yyyy')}</p>
                          <p className={`${item.orderStatus === 'pronto' ? 'bg-green-700' : 'bg-orange-600'} capitalize text-white p-3 rounded-lg mt-4`}>{item.orderStatus}</p>
                        </button>
                      </Dialog.Trigger>
                      <Dialog.Portal>
                        <Dialog.Overlay className="bg-black opacity-50 fixed inset-0" />

                        <Dialog.Content className="animate-fadeIn overflow-scroll bg-gray-50 p-4 mr-2 w-full rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[95%] max-h-[90%]">
                          
                          <div className="flex items-center justify-between">
                            <Dialog.Title className="text-xl pb-4">Resumo do pedido: <b>{item.orderId}</b> </Dialog.Title>
                            <Dialog.Close asChild>
                              <button aria-label="Fechar">
                                <X size={20} />
                              </button>
                            </Dialog.Close>
                          </div>
                          
                          <div className="flex gap-4 flex-row md:flex-col my-4">
                            {
                              item.orderListItems ?
                              item.orderListItems.map((product, index) => (
                                <div key={product.id} className="flex items-center justify-between bg-gray-200 p-2 rounded-lg gap-4 w-full">
                                  <div className="flex items-center justify-center gap-4">
                                    <div className="flex items-center justify-center rounded-lg bg-gray-100 p-4 min-w-[4rem]">
                                      <p>
                                        <span className="text-blue-600 bg-gray-100 px-3 py-1 rounded-lg">{product.qtd}x</span>
                                      </p>
                                    </div>
                                    <div>
                                      <p>{product.name}</p>
                                    </div>
                                  </div>
                                  {
                                    item.orderStatus != "pronto" && (
                                      <button onClick={() => handleRemoveItemOrder(String(itemListIndex), String(index))}>
                                        <Trash size={30} weight="bold" className="text-blue-600 m-2" />
                                      </button>
                                    )
                                  }
                                </div>
                              )) : (
                                <p className="text-xl ">Este pedido não possui mais items, deseja <span className="text-blue-600 underline cursor-pointer" onClick={() => handleRemoveOrder(String(itemListIndex))}>remover o pedido</span>?</p>
                              )
                            }
                          </div>
                          <p className="pb-4">Descrição: <b> {item.orderDescription ? item.orderDescription : 'Sem descrição'}</b></p>

                          <Dialog.Close asChild className="sticky bottom-0 left-0 right-0 w-full px-4 p-6 shadow-gray-400 shadow-md rounded-lg bg-gray-200">
                            <button
                              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-4 text-sm font-semibold leading-6 text-blue-900 hover:text-blue-50 transition-colors shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                              Fechar
                            </button>
                          </Dialog.Close>

                        </Dialog.Content>
                      </Dialog.Portal>
                    </Dialog.Root>
                  ))
                }
              </div>
            </>
          )
        }
      </div>
      
    </div>
  );
}


