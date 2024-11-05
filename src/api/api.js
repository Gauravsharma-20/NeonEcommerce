import { products } from '../mock/products';

export const fetchAvailableProducts = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 1000); // Simulating network delay
  });
};

export const searchProducts = async (query) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      resolve(filteredProducts);
    }, 1000); 
  });
};

export const fetchProductById = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = products.find(product => product.id === id);
      resolve(product);
    }, 1000); 
  });
};

export const fetchCartItems = async (cart) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cart); 
    }, 1000); 
  });
};

export const fetchCartReviewItems = async (cart) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cart);
    }, 1000); 
  });
};


export const placeOrder = async (cartItems, paymentMethod) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isSuccess = true; 
      if (isSuccess) {
        resolve({ success: true, message: 'Order placed successfully!' });
      } else {
        reject(new Error('Failed to place order.'));
      }
    }, 1000);
  });
};
