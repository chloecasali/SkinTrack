import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

const AUTH_TOKEN = "AUTH_TOKEN";

let token: string | null | undefined = undefined;
let notify: ((t: typeof token) => void) | null = null;

export const initToken = async () => {
  token = await SecureStore.getItemAsync(AUTH_TOKEN);
  notify?.(token);
};

export const useToken = () => {
  const [state, setState] = useState<typeof token>(token);

  useEffect(() => {
    notify = setState;
    setState(token);
    return () => {
      notify = null;
    };
  }, []);

  return state;
};

export const setToken = async (value: string) => {
  token = value;
  await SecureStore.setItemAsync(AUTH_TOKEN, value);
  notify?.(value);
};

export const clearToken = async () => {
  token = null;
  await SecureStore.deleteItemAsync(AUTH_TOKEN);
  notify?.(null);
};
