function Header() {
  const handleSignIn = () => {
    console.log('Sign in clicked')
  }

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-primary/20 dark:border-b-primary/10 px-4 sm:px-6 py-4">
      {/* Logo */}
      <div className="flex items-center gap-4 text-primary">
        <div className="size-8">
          <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" 
              fill="currentColor"
            />
          </svg>
        </div>
        <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">
          DineOut
        </h2>
      </div>

      {/* Navigation & Actions */}
      <div className="flex flex-1 justify-end gap-6 sm:gap-8 items-center">
        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          <a 
            className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary transition-colors" 
            href="#offers"
          >
            Offers
          </a>
          <a 
            className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary transition-colors" 
            href="#help"
          >
            Help
          </a>
        </nav>

        {/* Sign In Button */}
        <button 
          onClick={handleSignIn}
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors"
          aria-label="Sign in to your account"
        >
          <span className="truncate">Sign In</span>
        </button>

        {/* User Avatar */}
        <div 
          className="hidden sm:block bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" 
          style={{
            backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDMEybubOsE2oM1cbXw9Kg--tn78wayXHIx__mD32wPsxy-yt0D5NXPAlzr9S6XPvc04pfjrtdzYOkTeFyq4s0PTpdaD-_YlWgilzUEiofr87W3oSu7FDvIZfpSMuLAU1QgoMmbhRA37eINzLpQIIVvSMGmJxIIrEmWFQvgi2JyPtU8PkD7oVL41wN5FdKrX1haXD0ZRHvJUcoYnhp0Ofm-5hQz37ZMdHepW3pMww1wIgo9bKQJEHm9dDFgWKL2xwFB0GZPpMRUXLuy")'
          }}
          role="img"
          aria-label="User profile picture"
        />
      </div>
    </header>
  )
}
export default Header