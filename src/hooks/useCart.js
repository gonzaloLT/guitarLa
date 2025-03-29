import { useEffect, useState } from "react"
import { db } from "../data/db";

export const useCart = () => {
    const initialCart = () => {
		const localStorageCart = localStorage.getItem('cart');
		return localStorageCart ? JSON.parse(localStorageCart) : [];
	}


	const [data, setData] = useState(db);
	const [cart, setCart] = useState(initialCart);

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart])

	const MAX_ITEMS = 5;
	const MIN_ITEMS = 1;

	const addToCart = (item) => {
		const itemExist = cart.findIndex((guitar) => guitar.id === item.id);

		if (itemExist >= 0) {
			if (cart[itemExist].quantity >= MAX_ITEMS) return;
			const updateCart = [...cart];
			updateCart[itemExist].quantity++;
			setCart(updateCart);
		} else {
			item.quantity = 1;
			setCart([...cart, item])
		}
	}

	const removeFromCart = (id) => {
		setCart(prevCart => prevCart.filter(item => item.id !== id));
	}

	const increaseQuantity = (id) => {
		const updateCart = cart.map(item => {
			if (item.id === id && item.quantity < MAX_ITEMS) {
				return {
					...item,
					quantity: item.quantity + 1
				}
			}
			return item;
		})
		setCart(updateCart);
	}

	const decreaseQuantity = (id) => {
		const updateCart = cart.map(item => {
			if (item.id === id && item.quantity > MIN_ITEMS) {
				return {
					...item,
					quantity: item.quantity - 1
				}
			}
			return item;
		})

		setCart(updateCart);
	}

	const clearCart = () => {
		setCart([]);
	}

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart
    }

}
