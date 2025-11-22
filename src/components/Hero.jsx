import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative min-h-[84vh] flex items-center">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/40 to-slate-900/90 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-blue-100 backdrop-blur">
            AI 分身教練平台 · 建立你的知識變現引擎
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold text-white leading-tight">
            打造你的 AI 分身，放大專業影響力與收入
          </h1>
          <p className="mt-4 text-blue-100/90 text-base md:text-lg">
            以檔案、簡報、影片、網站連結等多種方式輸入你的知識，AI 將學習你的語氣、思維與專業內容，生成專屬 AI 分身教練，讓你輕鬆分享與販售。
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a href="#create" className="inline-flex justify-center items-center px-5 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-lg shadow-blue-500/20 transition">
              立即建立 AI 分身
            </a>
            <a href="#market" className="inline-flex justify-center items-center px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/15 backdrop-blur transition">
              逛逛分身市集
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
