import { useRef, useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSignOut() {
    signOut();
    setIsOpen(false);
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* User Button - Same style as Sign In */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-primary dark:hover:text-primary transition-colors cursor-pointer"
        aria-label="User menu"
      >
        <span className="material-symbols-outlined text-lg">person</span>
        <span className="hidden sm:inline">{user?.name || "User"}</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg overflow-hidden z-50">
          {/* User Info */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <p className="font-semibold text-slate-900 dark:text-white">
              {user?.name}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {user?.email}
            </p>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-3">
              <span className="material-symbols-outlined text-xl">person</span>
              Profile
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-3">
              <span className="material-symbols-outlined text-xl">
                receipt_long
              </span>
              Orders
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-3">
              <span className="material-symbols-outlined text-xl">
                favorite
              </span>
              Favorites
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-3">
              <span className="material-symbols-outlined text-xl">
                settings
              </span>
              Settings
            </button>
          </div>

          {/* Sign Out */}
          <div className="border-t border-slate-200 dark:border-slate-700 py-2">
            <button
              onClick={handleSignOut}
              className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-3"
            >
              <span className="material-symbols-outlined text-xl">logout</span>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;