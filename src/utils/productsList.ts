import { v4 as uuid } from 'uuid';
import hamburgerDuplo from '../assets/lanches/tratados/hamburger-duplo.png'
import hamburgerEspeto from '../assets/lanches/tratados/hamburger-no-espetinho.png'
import hamburgerSalada from '../assets/lanches/tratados/humburget-salada.png'
import cafeDosCampeoes from '../assets/lanches/tratados/cafe-dos-campeoes.png'
import cafeColonial from '../assets/lanches/tratados/cafe-colonial.png'
import pizza from '../assets/lanches/tratados/pizza-da-casa.png'
import porcaoSalada from '../assets/lanches/tratados/porcao-de-salada.png'
import porcaoFritas from '../assets/lanches/tratados/porcao-de-fritas-com-bacon.png'
import agua from '../assets/bebidas/tratadas/agua.png'
import stella from '../assets/bebidas/tratadas/stella.png'
import heineken from '../assets/bebidas/tratadas/heineken.png'
import brahma from '../assets/bebidas/tratadas/brahma.png'
import h2o from '../assets/bebidas/tratadas/h2o.png'
import choop from '../assets/bebidas/tratadas/choop-salva.png'

export const products = [
  {
    id: uuid(),
    name: 'Hamburger Duplo',
    price: 3500,
    image: hamburgerDuplo,
    ingredients: 'Dois bifes, dois queijos e dois ovos.'
  },
  {
    id: uuid(),
    name: 'Hamburger Salada',
    price: 3000,
    image: hamburgerSalada,
    ingredients: 'Alface, tomate, um bife, um ovo e queijo cheddar'
  },
  {
    id: uuid(),
    name: 'Hamburger no Espeto',
    price: 3200,
    image: hamburgerEspeto,
    ingredients: 'Bifes, Queijos e ovo.'
  },
  {
    id: uuid(),
    name: 'Café dos campeões',
    price: 1800,
    image: cafeDosCampeoes,
    ingredients: 'Waffles com mél.'
  },
  {
    id: uuid(),
    name: 'Café colônial',
    price: 2500,
    image: cafeColonial,
    ingredients: 'Uma xicara de café com leite e um pão com chimia.'
  },
  {
    id: uuid(),
    name: 'Pizza da casa',
    price: 4500,
    image: pizza,
    ingredients: 'Bacon, orégano, molho de tomate e ovo.'
  },
  {
    id: uuid(),
    name: 'Porção de salada',
    price: 1200,
    image: porcaoSalada,
    ingredients: 'Tomate, milho, ovo de codorna, ervilha, repolho roxo e abobóra.'
  },
  {
    id: uuid(),
    name: 'Porção de fritas com bacon',
    price: 3200,
    image: porcaoFritas,
    ingredients: 'Batata frita com bacon'
  },
  {
    id: uuid(),
    name: 'Água da pedra 550ml',
    price: 500,
    image: agua,
    ingredients: ''
  },
  {
    id: uuid(),
    name: 'Stella artois Puro Malte long neck 330ml',
    price: 1000,
    image: stella,
    ingredients: ''
  },
  {
    id: uuid(),
    name: 'Heineken long neck 330ml',
    price: 1000,
    image: heineken,
    ingredients: ''
  },
  {
    id: uuid(),
    name: 'Brahma duplo malte 375ml',
    price: 800,
    image: brahma,
    ingredients: ''
  },
  {
    id: uuid(),
    name: 'H²O Limão',
    price: 600,
    image: h2o,
    ingredients: ''
  },
  {
    id: uuid(),
    name: 'Choop Salva 300ml',
    price: 800,
    image: choop,
    ingredients: ''
  },

]