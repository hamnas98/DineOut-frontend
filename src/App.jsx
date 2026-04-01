import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../src/components/layout/Layout";
import Home from "../src/pages/Home";

import { AuthProvider } from "./contexts/AuthContext";
import Help from "./pages/Help";
import Offers from "./pages/Offers";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Favourites from "./pages/Favourites";
import Orders from "./pages/Orders";
import NotFound from "./pages/NotFound";

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Layout>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/help" element={<Help />} />
						<Route path="/offers" element={<Offers />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/favourites" element={<Favourites />} />
						<Route path="/orders" element={<Orders />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Layout>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
