import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

const AUTH_TOKEN = "AUTH_TOKEN";

type Token = string | null | undefined;

let token: Token = undefined;

const subscribers = new Set<(t: Token) => void>();

export const initToken = async (): Promise<void> => {
  try {
    token = await SecureStore.getItemAsync(AUTH_TOKEN);
  } catch (err) {
    console.error("Failed to read token from SecureStore", err);
    token = null;
  } finally {
    subscribers.forEach((callback) => callback(token));
  }
};

export const useToken = (): Token => {
  const [state, setState] = useState<Token>(token);

  useEffect(() => {
    subscribers.add(setState);
    setState(token);

    return () => {
      subscribers.delete(setState);
    };
  }, []);

  return state;
};

export const setToken = async (value: string): Promise<void> => {
  token = value;

  subscribers.forEach((callback) => callback(token));

  try {
    await SecureStore.setItemAsync(AUTH_TOKEN, value);
  } catch (err) {
    console.error("Failed to persist token", err);
  }
};

export const clearToken = async (): Promise<void> => {
  token = null;

  subscribers.forEach((callback) => callback(token));

  try {
    await SecureStore.deleteItemAsync(AUTH_TOKEN);
  } catch (err) {
    console.error("Failed to delete token", err);
  }
};
