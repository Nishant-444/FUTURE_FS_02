import React, { useState, createContext, useContext } from "react";

const mockProducts = [
	{
		_id: "prod1",
		name: "Modern Desk Lamp",
		description:
			"A sleek and minimalist LED desk lamp, perfect for any workspace.",
		price: 49.99,
		imageUrl: "/src/assets/lamp.jpg",
	},
	{
		_id: "prod2",
		name: "Wireless Ergonomic Mouse",
		description:
			"Experience comfort and productivity with this advanced ergonomic mouse.",
		price: 79.99,
		imageUrl: "/src/assets/mouse.jpg",
	},
	{
		_id: "prod3",
		name: "Mechanical Keyboard",
		description:
			"Clicky and responsive keys for a satisfying typing experience.",
		price: 129.99,
		imageUrl: "/src/assets/keyboard.jpg",
	},
	{
		_id: "prod4",
		name: "4K Ultra-Wide Monitor",
		description:
			"Immerse yourself in stunning visuals with this 34-inch curved monitor.",
		price: 399.99,
		imageUrl: "/src/assets/monitor.jpg",
	},
	{
		_id: "prod5",
		name: "Noise-Cancelling Headphones",
		description:
			"Block out distractions and focus with these premium over-ear headphones.",
		price: 249.99,
		imageUrl: "/src/assets/headphones.jpg",
	},
	{
		_id: "prod6",
		name: "Smartwatch with Fitness Tracker",
		description:
			"Stay connected and track your health goals with this stylish smartwatch.",
		price: 199.99,
		imageUrl: "/src/assets/smartwatch.jpg",
	},
	{
		_id: "prod7",
		name: "Portable SSD - 1TB",
		description:
			"Blazing-fast, pocket-sized storage for your files and projects.",
		price: 149.99,
		imageUrl: "/src/assets/ssd.jpg",
	},
	{
		_id: "prod8",
		name: "USB-C Docking Station",
		description:
			"Expand your connectivity with multiple ports for all your devices.",
		price: 89.99,
		imageUrl: "/src/assets/dock.jpg",
	},
];

// --- CART CONTEXT ---
// This context will manage the shopping cart state across the application.
const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState([]);

	const addToCart = (product) => {
		setCartItems((prevItems) => {
			const existingItem = prevItems.find((item) => item._id === product._id);
			if (existingItem) {
				// If item exists, increase quantity
				return prevItems.map((item) =>
					item._id === product._id
						? { ...item, quantity: item.quantity + 1 }
						: item
				);
			}
			// Otherwise, add new item with quantity 1
			return [...prevItems, { ...product, quantity: 1 }];
		});
	};

	const removeFromCart = (productId) => {
		setCartItems((prevItems) =>
			prevItems.filter((item) => item._id !== productId)
		);
	};

	const updateQuantity = (productId, quantity) => {
		if (quantity <= 0) {
			removeFromCart(productId);
		} else {
			setCartItems((prevItems) =>
				prevItems.map((item) =>
					item._id === productId ? { ...item, quantity } : item
				)
			);
		}
	};

	const clearCart = () => {
		setCartItems([]);
	};

	return (
		<CartContext.Provider
			value={{
				cartItems,
				addToCart,
				removeFromCart,
				updateQuantity,
				clearCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);

// --- COMPONENTS ---

// ProductCard Component: Displays a single product.
const ProductCard = ({ product }) => {
	const { addToCart } = useCart();

	return (
		<div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transform hover:scale-105 transition-transform duration-300">
			<img
				src={product.imageUrl}
				alt={product.name}
				className="w-full h-48 object-cover"
			/>
			<div className="p-4">
				<h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
				<p className="text-gray-600 mt-1 text-sm">{product.description}</p>
				<div className="flex justify-between items-center mt-4">
					<p className="text-xl font-bold text-gray-900">${product.price}</p>
					<button
						onClick={() => addToCart(product)}
						className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
					>
						Add to Cart
					</button>
				</div>
			</div>
		</div>
	);
};

// ProductList Component: Displays a grid of products.
const ProductList = () => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			{mockProducts.map((product) => (
				<ProductCard key={product._id} product={product} />
			))}
		</div>
	);
};

// ShoppingCart Component: Displays items in the cart and checkout form.
const ShoppingCart = () => {
	const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
	const [isCheckingOut, setIsCheckingOut] = useState(false);
	const [checkoutMessage, setCheckoutMessage] = useState("");

	const total = cartItems
		.reduce((sum, item) => sum + item.price * item.quantity, 0)
		.toFixed(2);

	const handleCheckout = (e) => {
		e.preventDefault();
		setIsCheckingOut(true);
		setCheckoutMessage("Processing your order...");

		// Simulate API call
		setTimeout(() => {
			setCheckoutMessage("Checkout successful! Thank you for your order.");
			clearCart();
			setTimeout(() => {
				setCheckoutMessage("");
				setIsCheckingOut(false);
				e.target.reset();
			}, 3000);
		}, 2000);
	};

	return (
		<div className="bg-white p-6 rounded-lg shadow-lg mt-12">
			<h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
			{cartItems.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				<div>
					{cartItems.map((item) => (
						<div
							key={item._id}
							className="flex justify-between items-center border-b py-3"
						>
							<div>
								<p className="font-semibold">{item.name}</p>
								<p className="text-sm text-gray-600">${item.price}</p>
							</div>
							<div className="flex items-center gap-4">
								<input
									type="number"
									value={item.quantity}
									onChange={(e) =>
										updateQuantity(item._id, parseInt(e.target.value))
									}
									className="w-16 text-center border rounded-md"
									min="1"
								/>
								<button
									onClick={() => removeFromCart(item._id)}
									className="text-red-500 hover:text-red-700"
								>
									Remove
								</button>
							</div>
						</div>
					))}
					<div className="mt-4 text-right">
						<p className="text-xl font-bold">Total: ${total}</p>
					</div>
				</div>
			)}

			{/* Checkout Form */}
			<div className="mt-8">
				<h3 className="text-xl font-bold mb-4">Checkout Simulation</h3>
				<form onSubmit={handleCheckout}>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<input
							type="text"
							placeholder="Full Name"
							className="p-2 border rounded-md w-full"
							required
						/>
						<input
							type="email"
							placeholder="Email Address"
							className="p-2 border rounded-md w-full"
							required
						/>
					</div>
					<textarea
						placeholder="Shipping Address"
						className="p-2 border rounded-md w-full mt-4"
						rows="3"
						required
					></textarea>
					<button
						type="submit"
						className="w-full bg-green-600 text-white py-3 mt-4 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
						disabled={cartItems.length === 0 || isCheckingOut}
					>
						{isCheckingOut ? "Processing..." : "Simulate Checkout"}
					</button>
				</form>
				{checkoutMessage && (
					<p className="mt-4 text-center text-green-600 font-semibold">
						{checkoutMessage}
					</p>
				)}
			</div>
		</div>
	);
};

// --- MAIN APP COMPONENT ---
export default function App() {
	return (
		<CartProvider>
			<div className="bg-gray-50 min-h-screen font-sans">
				<div className="container mx-auto px-4 py-8">
					<header className="text-center mb-12">
						<h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
							SharmaJi Tech Store
						</h1>
						<p className="text-gray-600 mt-2">
							Your one-stop shop for the latest gadgets
						</p>
					</header>

					<main>
						<ProductList />
						<ShoppingCart />
					</main>

					<footer className="text-center mt-16 text-gray-500 text-sm">
						<p>
							&copy; {new Date().getFullYear()} Future Interns - Task 2. All
							rights reserved.
						</p>
					</footer>
				</div>
			</div>
		</CartProvider>
	);
}
