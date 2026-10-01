import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';

import {MSSV} from '@constants/student';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];

  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  changeQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;

  totalQuantity: () => number;
  totalAmount: () => number;
}

const STORAGE_KEY = `ktxgo-cart-${MSSV}`;

const saveCart = async (items: CartItem[]) => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(items),
    );
  } catch (error) {
    console.warn('Không thể lưu giỏ hàng:', error);
  }
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: item => {
    const currentItems = get().items;

    const existingItem = currentItems.find(
      cartItem => cartItem.id === item.id,
    );

    let newItems: CartItem[];

    if (existingItem) {
      newItems = currentItems.map(cartItem =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            }
          : cartItem,
      );
    } else {
      newItems = [
        ...currentItems,
        {
          ...item,
          quantity: 1,
        },
      ];
    }

    set({items: newItems});
    saveCart(newItems);
  },

  removeItem: id => {
    const newItems = get().items.filter(
      item => item.id !== id,
    );

    set({items: newItems});
    saveCart(newItems);
  },

  changeQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }

    const newItems = get().items.map(item =>
      item.id === id
        ? {
            ...item,
            quantity,
          }
        : item,
    );

    set({items: newItems});
    saveCart(newItems);
  },

  clearCart: () => {
    set({items: []});
    saveCart([]);
  },

  totalQuantity: () =>
    get().items.reduce(
      (total, item) => total + item.quantity,
      0,
    ),

  totalAmount: () =>
    get().items.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0,
    ),
}));

export const loadCart = async () => {
  try {
    const storedCart = await AsyncStorage.getItem(
      STORAGE_KEY,
    );

    if (!storedCart) {
      return;
    }

    const items: CartItem[] = JSON.parse(storedCart);

    useCartStore.setState({
      items,
    });
  } catch (error) {
    console.warn('Không thể đọc giỏ hàng:', error);
  }
};