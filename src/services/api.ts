import type { IItem, IItemForm } from '../types/IItem';

const API_URL = 'http://localhost:3000/catalog';

const safeFetch = async (url: string, options?: RequestInit, retries: number = 3): Promise<Response> => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Erro HTTP! Status: ${response.status}`);
    }
    return response;
  } catch (error) {
    if (retries > 0) {
      console.warn(`Fetch falhou. Tentando novamente em 1s... (${retries} tentativas restantes)`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return safeFetch(url, options, retries - 1);
    }
    throw error;
  }
};


export const getAllItems = async (): Promise<IItem[]> => {
  const response = await safeFetch(API_URL);
  return response.json();
};

export const createItem = async (item: IItemForm): Promise<IItem> => {
  const response = await safeFetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  return response.json();
};

export const updateItem = async (item: IItem): Promise<IItem> => {
  const response = await safeFetch(`${API_URL}/${item.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  return response.json();
};

export const deleteItem = async (id: number | string): Promise<void> => {
  await safeFetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
};