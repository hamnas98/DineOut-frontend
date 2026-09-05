import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const USERS_KEY = "dineout_users"; // mock "database" of registered users
const SESSION_KEY = "dineout_session"; // currently logged-in user

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const storedSession = localStorage.getItem(SESSION_KEY);
		if (storedSession) {
			setUser(JSON.parse(storedSession));
		}
		setLoading(false);
	}, []);

	const getUsers = () => {
		const stored = localStorage.getItem(USERS_KEY);
		return stored ? JSON.parse(stored) : [];
	};

	const saveUsers = (users) => {
		localStorage.setItem(USERS_KEY, JSON.stringify(users));
	};

	/**
	 * Sign up a new user.
	 * Throws an error if the email is already registered.
	 */
	const signUp = ({ name, email, password }) => {
		const users = getUsers();
		const existing = users.find(
			(u) => u.email.toLowerCase() === email.toLowerCase(),
		);

		if (existing) {
			throw new Error(
				"An account with this email already exists. Please sign in instead.",
			);
		}

		const newUser = { name, email, password };
		saveUsers([...users, newUser]);

		// Auto sign-in after successful signup
		const sessionUser = { name, email };
		localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
		setUser(sessionUser);
	};

	/**
	 * Sign in an existing user.
	 * Throws an error if the account doesn't exist or password is wrong.
	 */
	const signIn = ({ email, password }) => {
		const users = getUsers();
		const existing = users.find(
			(u) => u.email.toLowerCase() === email.toLowerCase(),
		);

		if (!existing) {
			throw new Error(
				"No account found with this email. Please sign up first.",
			);
		}

		if (existing.password !== password) {
			throw new Error("Incorrect password. Please try again.");
		}

		const sessionUser = { name: existing.name, email: existing.email };
		localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
		setUser(sessionUser);
	};

	const signOut = () => {
		setUser(null);
		localStorage.removeItem(SESSION_KEY);
	};

	const value = {
		user,
		signIn,
		signUp,
		signOut,
		loading,
		isAuthenticated: Boolean(user),
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
