import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Public Pages
import Home from "./pages/Home";
import Help from "./pages/Help";
import Offers from "./pages/Offers";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";

// Protected Pages
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Favourites from "./pages/Favourites";
import Addresses from "./pages/Addresses";
import Payments from "./pages/Payments";
import Settings from "./pages/Settings";
import RestaurantDetail from "./pages/RestaurantDetail";

const App = () => {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Layout>
					<Routes>
						{/* ========== PUBLIC ROUTES ========== */}
						<Route path="/" element={<Home />} />
						<Route path="/help" element={<Help />} />
						<Route path="/offers" element={<Offers />} />
						<Route path="/search" element={<Search />} />

						{/* Restaurant Detail - Dynamic Route */}
						<Route
							path="/restaurant/:restaurantId"
							element={<RestaurantDetail />}
						/>

						{/* ========== PROTECTED ROUTES ========== */}

						{/* Single Protected Route */}
						<Route
							path="/cart"
							element={
								<ProtectedRoute>
									<Cart />
								</ProtectedRoute>
							}
						/>

						{/* Protected Parent with Nested Routes */}
						<Route
							path="/my-account"
							element={
								<ProtectedRoute>
									<Profile />
								</ProtectedRoute>
							}
						>
							<Route index element={<Orders />} />
							<Route path="orders" element={<Orders />} />
							<Route path="favourites" element={<Favourites />} />
							<Route path="addresses" element={<Addresses />} />
							<Route path="payments" element={<Payments />} />
							<Route path="settings" element={<Settings />} />
						</Route>

						{/* ========== 404 ========== */}
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Layout>
			</BrowserRouter>
		</AuthProvider>
	);
};

export default App;
