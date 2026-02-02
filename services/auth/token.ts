import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

const AUTH_TOKEN = "AUTH_TOKEN";

let token: string | null | undefined = undefined;
const subscribers = new Set<(t: typeof token) => void>();

export const initToken = async () => {
  token = await SecureStore.getItemAsync(AUTH_TOKEN);
  subscribers.forEach((callback) => callback(token));
};

export const useToken = () => {
  const [state, setState] = useState<typeof token>(token);

  useEffect(() => {
    subscribers.add(setState);
    setState(token);
    return () => {
      subscribers.delete(setState);
    };
  }, []);

  return state;
};

export const setToken = async (value: string) => {
  token = value;
  await SecureStore.setItemAsync(AUTH_TOKEN, value);
  subscribers.forEach((callback) => callback(value));
};

export const clearToken = async () => {
  token = null;
  await SecureStore.deleteItemAsync(AUTH_TOKEN);
  subscribers.forEach((callback) => callback(null));
};
