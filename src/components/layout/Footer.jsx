const Footer = () => {

  const currrentYear = new Date().getFullYear();
  return (
    <footer className="mt-12 border-t border-solid border-primary/20 dark:border-primary/10 pt-8 pb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div className="col-span-1 md:col-span-2">
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
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm">
            © {currrentYear} DineOut Inc.
          </p>
        </div>

        {/* Company Links */}
        <div className="col-span-1">
          <h3 className="font-bold text-slate-800 dark:text-slate-200">Company</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <a className="text-slate-600 dark:text-slate-400 hover:text-primary text-sm transition-colors" href="#about">
                About Us
              </a>
            </li>
            <li>
              <a className="text-slate-600 dark:text-slate-400 hover:text-primary text-sm transition-colors" href="#blog">
                Blog
              </a>
            </li>
            <li>
              <a className="text-slate-600 dark:text-slate-400 hover:text-primary text-sm transition-colors" href="#contact">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div className="col-span-1">
          <h3 className="font-bold text-slate-800 dark:text-slate-200">Support</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <a className="text-slate-600 dark:text-slate-400 hover:text-primary text-sm transition-colors" href="#help">
                Help Center
              </a>
            </li>
            <li>
              <a className="text-slate-600 dark:text-slate-400 hover:text-primary text-sm transition-colors" href="#terms">
                Terms &amp; Conditions
              </a>
            </li>
            <li>
              <a className="text-slate-600 dark:text-slate-400 hover:text-primary text-sm transition-colors" href="#privacy">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* App Store Badges */}
      <div className="flex justify-center md:justify-end mt-8">
        <div className="flex items-center gap-4">
          <img 
            alt="Download on the App Store" 
            className="h-10 cursor-pointer hover:opacity-80 transition-opacity" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCe6CRZrkFligJyqSwtHTU6tLBLzEO2AhqfmqbD7y1tSGVLl40upab_t-n6kb402sj9WKis06Pmt_BPqDLOvc68JHFeR8QLGnn4zgXxSOWYkoIULfhNknNy-zRqGeix91sk12zvehKUPeAwgpt7Wsd2nhqkPAIPiHQhG48xp56xSfNVTPZ0ruWOaB6jXzx1f34agXhsA8vrGck1Gmy0tDgq-LxB25GAkipKUupxHxSnN3bpSpY3GIUFGpM3drDbD3If4t8_jpn4oGc5"
          />
          <img 
            alt="Get it on Google Play" 
            className="h-10 cursor-pointer hover:opacity-80 transition-opacity" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5IQbBTEWDNy4j4sgnli6OzVAKvD_OjPbKhXTLONZUshxWx9j3eiQC4T76khwzUw-elfELoWD9UFtW8vtkdqXLb_zu4b0v1myXW2Ay4S1PoxmEor4yn-Up3OK47KLYpJYkH9hn1nDMzVK7d4KGWkvOaZiW68a_MKBuBp9DgxfFu6i6NvKXnF0ifaRyI3v7kpmc6P7__3t0BO6qZku2XLi-thc3tpT1nFqNWL2fs98AW-SFqq4qqLHDRQSikKwflW-98ySNZ-cpb7zh"
          />
        </div>
      </div>
    </footer>
  )
}
export default Footer