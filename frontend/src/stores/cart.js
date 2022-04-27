import { defineStore } from 'pinia';

export const useCartStore = defineStore({
  id: 'cart',
  state: () => ({
    items: [],
  }),
  getters: {
    getItems: (state) => state.items,
    getTotalPrice: (state) => state.items.reduce((total, item) => {
      total += item.quantity * item.product.price.amount;
      return total/100;
    },
     0),
  },
  actions: {
    addItem(product, quantity) {
      const index = this.items.findIndex((item) => item.product.id === product.id);
      if (index !== -1) {
        if (quantity === 'inc') {
          this.items[index].quantity += 1;
        } else {
          this.items[index].quantity = quantity;
        }
      } else {
        if (quantity === 'inc') {
          quantity = 1;
        }
        this.items.push({ product, quantity });
      }
    },
    deleteItem(productId) {
      const index = this.items.findIndex((item) => item.product.id === productId);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    },
  },
});
