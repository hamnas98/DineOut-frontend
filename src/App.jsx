import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Help from "./pages/Help";
import Offers from "./pages/Offers";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Favourites from "./pages/Favourites";
import Payments from "./pages/Payments";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import Addresses from "./pages/Addresses";

const App = () => {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Layout>
					<Routes>
						{/* Public Routes */}
						<Route path="/" element={<Home />} />
						<Route path="/help" element={<Help />} />
						<Route path="/offers" element={<Offers />} />
						<Route path="/search" element={<Search />} />
						<Route path="/cart" element={<Cart />} />

						{/* Profile Routes - Nested */}
						<Route path="/my-account" element={<Profile />}>
							{/* <Route index element={<Orders />} /> Default: /my-account */}
							<Route path="orders" element={<Orders />} />
							<Route path="favourites" element={<Favourites />} />
							<Route path="addresses" element={<Addresses />} />
							<Route path="payments" element={<Payments />} />
							<Route path="settings" element={<Settings />} />
						</Route>

						{/* 404 - Must be last */}
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Layout>
			</BrowserRouter>
		</AuthProvider>
	);
};

export default App;
