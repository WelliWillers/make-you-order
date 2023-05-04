import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Layout from "../pages/Layout";
import IsNotLoged from "./IsNotLoged";
import IsLoged from "./IsLoged";
import NotFound from "../pages/NotFound";
import CommandItem from "../pages/CommandItem";
import Commands from "../pages/Commands";
import Products from "../pages/Products";
import Orders from "../pages/Orders";

export function Router() {

  return (
    <Routes>
      <Route element={<Layout />}>
        
        <Route element={<IsLoged />}>
          <Route path="/" element={<Login />} />
        </Route>

        <Route element={<IsNotLoged />}>
          <Route path="/home" element={<Home />} />
          <Route path="/commands">
            <Route path="" element={<Commands />} />
            <Route path=":command" element={<CommandItem />} />
          </Route>
          <Route path="/orders" element={<Orders />} />
        </Route>
        
        <Route path="/products" element={<Products />} />
        
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
