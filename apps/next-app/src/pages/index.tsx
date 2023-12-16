import Link from "next/link"
import {BookIcon, ClockIcon, GaugeIcon, GithubIcon, Navbar, XIcon} from "ui"

export default function Home() {
  return (
    <main key="1" className="flex flex-col min-h-screen">
      <Navbar />
      <section className="flex-grow w-full flex items-center justify-center py-12 dark:bg-black dark:text-white bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col justify-center items-center space-y-8">
            <div className="space-y-2 mt-[-20px] ">
              <h1 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl xl:text-6xl/none text-black bg-clip-text text-transparent dark:bg-gradient-to-r dark:from-white dark:to-gray-500 bg-gradient-to-r from-gray-900 to-gray-500">
                Your One Stop Interview Preparation Platform
              </h1>
              
              <p className="max-w-[600px] text-gray-500 md:text-xl text-center dark:text-gray-400 mx-auto">
                Prepare for your interviews with confidence. Practice, learn, and succeed.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-10 my-36">

              <div className="flex flex-col items-center space-y-4">
                <ClockIcon className="w-4 h-4 text-black dark:text-white" />
                <h2 className="font-bold text-lg mt-2 text-black dark:text-white">Real Time Interviewing Experience</h2>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <BookIcon className="w-4 h-4 text-black dark:text-white" />
                <h2 className="font-bold text-lg mt-2 text-black dark:text-white">Test Your Knowledge Depth</h2>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <GaugeIcon className="w-4 h-4 text-black dark:text-white" />
                <h2 className="font-bold text-lg mt-2 text-black dark:text-white">Handle Pressure Situations like a Pro</h2>
              </div>
            </div>
            <div className="flex flex-col gap-4 min-[400px]:flex-row">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300 mt-4"
                href="#"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full py-8 bg-black text-white flex items-center justify-between">
        <div className="container px-4 md:px-6 flex justify-between">
          <p className="text-left text-white ml-5">
            <Link href="/">
              Built by <span className="hover:animate-pulse">VK</span>
            </Link>
            
          </p>
          <div />
          <div className="flex space-x-4">
            <Link href="/">
              <GithubIcon className="w-4 h-4 text-white" />
            </Link>
            <Link href="/">
              <XIcon className="w-4 h-4 text-white" />
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}