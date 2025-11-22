import { useEffect, useState } from 'react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Marketplace() {
  const [items, setItems] = useState([])

  useEffect(()=>{ fetchList() }, [])

  const fetchList = async () => {
    const res = await fetch(`${baseUrl}/api/personas`)
    const data = await res.json()
    setItems(data.items || [])
  }

  return (
    <section id="market" className="relative py-16">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-semibold text-xl">分身市集</h3>
          <button onClick={fetchList} className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm">重新整理</button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p)=> (
            <div key={p._id} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white">
              <div className="text-sm text-white/70">{p.owner_email}</div>
              <div className="mt-1 text-lg font-semibold">{p.title}</div>
              <div className="mt-1 text-white/80 text-sm line-clamp-3">{p.description}</div>
              {p.specialties?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.specialties.map((s)=> (
                    <span key={s} className="px-2 py-0.5 rounded-full bg-white/10 text-xs">#{s}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
          {items.length === 0 && (
            <div className="col-span-full text-white/70">目前沒有公開分身，請先建立一個試試看。</div>
          )}
        </div>
      </div>
    </section>
  )
}
