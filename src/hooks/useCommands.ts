import { useContext } from 'react';
import { CommandsContext } from '../context/CommandsContext';

export function useCommands() {
  const value = useContext(CommandsContext)

  return value;
}