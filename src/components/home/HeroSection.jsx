const HeroSection = () => {
  return (
    <div className="py-10">
      <div className="sm:p-4">
        <div 
          className="flex min-h-[400px] sm:min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat sm:gap-8 sm:rounded-xl items-center justify-center p-4 text-center"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCveuiWdyawnDpagGc642CHS1IIe2oF6f9WcMJw2Xhng2ttJzX9YxTyP2lo0qWfLsR_VyO8cgwBJQP3H9ylUeh9f1uTvl2a6jn0vcFAIICDi8cvOkbyN0ZYm0yj1TGjl94_rAWbqDxyy2t_P8zWqbAyycTQZ02r5i39cPZ3uUT5SFy_cENZMPNAfrlfe2yJSYIuhaGmb5EmaUXUHicRCu_fgnbU_eMaahT9FsXsprP6hUDzNOLmIfm6dG2YFDIYwsfFRw5doXJwZHWL")'
          }}
          role="img"
          aria-label="A delicious spread of various food dishes on a dark background"
        >
          {/* Hero Text */}
          <div className="flex flex-col gap-2">
            <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] sm:text-5xl">
              Unexpected guests? Order food and get it delivered.
            </h1>
            <h2 className="text-white/90 text-sm font-normal leading-normal sm:text-base">
              Find your favorite restaurants, cuisines, and dishes.
            </h2>
          </div>
          {/* Search Bar */}
          <form 
            className="flex flex-col min-w-40 h-14 w-full max-w-[580px] sm:h-16"
          >
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full shadow-lg">
              {/* Search Icon */}
              <div className="text-slate-500 dark:text-slate-400 flex border border-slate-200 dark:border-slate-700 bg-white dark:bg-background-dark items-center justify-center pl-[15px] rounded-l-lg border-r-0">
                <span className="material-symbols-outlined" aria-hidden="true">search</span>
              </div>
              {/* Input Field */}
              <input 
                type="text"
                className="flex w-full min-w-0 flex-1 text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-700 bg-white dark:bg-background-dark h-full placeholder:text-slate-500 dark:placeholder:text-slate-400 px-[15px] border-r-0 border-l-0 text-sm font-normal leading-normal sm:text-base" 
                placeholder="Search for restaurant, cuisine or a dish"
                aria-label="Search for restaurant, cuisine or a dish"
              />
              {/* Search Button */}
              <div className="flex items-center justify-center rounded-r-lg border-l-0 border border-slate-200 dark:border-slate-700 bg-white dark:bg-background-dark pr-[7px]">
                <button 
                  type="submit"
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 sm:h-12 sm:px-5 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] sm:text-base hover:bg-primary/90 transition-colors"
                  aria-label="Submit search"
                >
                  <span className="truncate">Search</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default HeroSection