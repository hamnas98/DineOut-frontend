import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'

const Layout = ({ children }) => {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark">
      <div className="flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-5">
          <div className="flex flex-col max-w-[1200px] flex-1 px-4 sm:px-6 lg:px-8">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout