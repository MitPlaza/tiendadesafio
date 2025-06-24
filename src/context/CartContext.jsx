import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = (producto, cantidad) => {
    const existe = cart.find(p => p.id === producto.id)
    if (existe) {
      setCart(cart.map(p => 
        p.id === producto.id ? { ...p, cantidad: p.cantidad + cantidad } : p
      ))
    } else {
      setCart([...cart, { ...producto, cantidad }])
    }
  }

  const removeFromCart = (id) => {
    setCart(cart.filter(p => p.id !== id))
  }

  const updateCantidad = (id, nuevaCantidad) => {
    setCart(cart.map(p => 
      p.id === id ? { ...p, cantidad: nuevaCantidad } : p
    ))
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCantidad, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
