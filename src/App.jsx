import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ErrorBoundary from "./components/common/ErrorBoundary";

// Public Pages
import Home from "./pages/Home";
import RouteLoader from "./components/common/RouteLoader";

const Help = lazy(() => import("./pages/Help"));
const Offers = lazy(() => import("./pages/Offers"));
const Search = lazy(() => import("./pages/Search"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));
const RestaurantDetail = lazy(() => import("./pages/RestaurantDetail"));

// Protected Pages
const Cart = lazy(() => import("./pages/Cart"));
const Profile = lazy(() => import("./pages/Profile"));
const Orders = lazy(() => import("./pages/Orders"));
const Favourites = lazy(() => import("./pages/Favourites"));
const Addresses = lazy(() => import("./pages/Addresses"));
const Payments = lazy(() => import("./pages/Payments"));
const Settings = lazy(() => import("./pages/Settings"));

const App = () => {
	return (
		<AuthProvider>
			<BrowserRouter>
				<ErrorBoundary>
					<Layout>
						<Suspense fallback={<RouteLoader />}>
							<Routes>
								{/* ========== PUBLIC ROUTES ========== */}
								<Route path="/" element={<Home />} />
								<Route path="/help" element={<Help />} />
								<Route path="/offers" element={<Offers />} />
								<Route path="/search" element={<Search />} />
								<Route path="/about" element={<About />} />

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
						</Suspense>
					</Layout>
				</ErrorBoundary>
			</BrowserRouter>
		</AuthProvider>
	);
};

export default App;
