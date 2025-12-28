import { useEffect, useState } from "react"
import UserMenu from "../auth/UserMenu"
import useAuth from "../../hooks/useAuth";

function Header() {
  const {user, signIn, isAuthenticated} = useAuth()

  function handleSignin() {
    signIn()
  }

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-slate-200 dark:border-b-slate-700 px-4 sm:px-6 py-3">
      {/* Left Section - Logo & Location */}
      <div className="flex items-center gap-8">
        {/* Logo */}
        <div className="flex items-center gap-2 text-primary">
          <div className="size-8">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" 
                fill="currentColor"
              />
            </svg>
          </div>
          <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight">
            DineOut
          </h2>
        </div>

        {/* Location Selector */}
        <button className="hidden md:flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors">
          <span className="font-medium text-sm">Other</span>
          <span className="text-sm text-slate-500 dark:text-slate-400 max-w-[200px] truncate">
            HSR Layout, Bengaluru, Karnataka, I...
          </span>
          <span className="material-symbols-outlined text-lg text-primary">
            keyboard_arrow_down
          </span>
        </button>
      </div>

      {/* Right Section - Navigation */}
      <nav className="flex items-center gap-6 sm:gap-8" aria-label="Main navigation">
        {/* Search */}
        <a 
          className="hidden md:flex items-center gap-2 text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-primary dark:hover:text-primary transition-colors" 
          href="#search"
        >
          <span className="material-symbols-outlined text-lg">
            search
          </span>
          <span>Search</span>
        </a>

        {/* Offers */}
        <a 
          className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-primary dark:hover:text-primary transition-colors relative" 
          href="#offers"
        >
          <span className="material-symbols-outlined text-lg">
            local_offer
          </span>
          <span className="hidden sm:inline">Offers</span>
          <span className="absolute -top-1 -right-2 bg-yellow-400 text-slate-900 text-[10px] font-bold px-1 rounded">
            NEW
          </span>
        </a>

        {/* Help */}
        <a 
          className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-primary dark:hover:text-primary transition-colors" 
          href="#help"
        >
          <span className="material-symbols-outlined text-lg">
            help
          </span>
          <span className="hidden sm:inline">Help</span>
        </a>

        {/* Sign In / User Name with Menu */}
        {isAuthenticated ? (
          <UserMenu />
        ) : (
          <button
            className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-primary dark:hover:text-primary transition-colors cursor-pointer"
            onClick={handleSignin}
          >
            <span className="material-symbols-outlined text-lg">person</span>
            <span className="hidden sm:inline">Sign In</span>
          </button>
        )}

        {/* Cart */}
        <a 
          className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-primary dark:hover:text-primary transition-colors relative" 
          href="#cart"
        >
          <span className="material-symbols-outlined text-lg">
            shopping_bag
          </span>
          <span className="hidden sm:inline">Cart</span>
          <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold size-4 flex items-center justify-center rounded-full">
            0
          </span>
        </a>
      </nav>
    </header>
  )
}

export default Header