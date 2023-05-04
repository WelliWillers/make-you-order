import { useContext } from 'react';
import { LoaderContext } from '../context/LoaderContext';

export function useLoader() {
  const value = useContext(LoaderContext)

  return value;
}