import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import useOnlineStatus from "../../hooks/useOnlineStatus";

const Layout = ({ children }) => {
  const isOnline = useOnlineStatus();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark">
      <div className="flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-5">
          <div className="flex flex-col max-w-[1200px] flex-1 px-4 sm:px-6 lg:px-8">
            <Header />

            <main className="flex-grow">
              {isOnline ? (
                children
              ) : (
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                  <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4">
                    wifi_off
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    You're offline
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    Check your internet connection and try again.
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              )}
            </main>

            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;