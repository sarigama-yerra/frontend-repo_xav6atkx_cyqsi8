import Hero from './components/Hero'
import UploadPanel from './components/UploadPanel'
import Marketplace from './components/Marketplace'

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <header className="sticky top-0 z-40 backdrop-blur bg-slate-900/70 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-rose-500" />
            <span className="font-semibold">AI Persona Coach</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
            <a href="#create" className="hover:text-white">建立分身</a>
            <a href="#market" className="hover:text-white">分身市集</a>
            <a href="/test" className="hover:text-white">系統檢測</a>
          </nav>
        </div>
      </header>

      <main>
        <Hero />
        <UploadPanel />
        <Marketplace />
        <footer className="py-10 text-center text-white/50 text-sm">
          © 2025 AI Persona Coach. All rights reserved.
        </footer>
      </main>
    </div>
  )
}

export default App
