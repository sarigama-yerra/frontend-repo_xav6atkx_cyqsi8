import { useState } from 'react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function UploadPanel() {
  const [ownerEmail, setOwnerEmail] = useState('')
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [tone, setTone] = useState('專業、友善、精準')
  const [specialties, setSpecialties] = useState('')
  const [personaId, setPersonaId] = useState('')
  const [message, setMessage] = useState('')
  const [reply, setReply] = useState('')
  const [status, setStatus] = useState('')

  const createPersona = async () => {
    setStatus('建立中...')
    const res = await fetch(`${baseUrl}/api/personas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        owner_email: ownerEmail,
        title,
        description: desc,
        tone,
        specialties: specialties.split(',').map(s => s.trim()).filter(Boolean),
        visibility: 'private'
      })
    })
    const data = await res.json()
    if (res.ok) {
      setPersonaId(data.id)
      setStatus('建立成功')
    } else {
      setStatus('錯誤：' + (data.detail || '建立失敗'))
    }
  }

  const addSource = async (type) => {
    if (!personaId) return alert('請先建立分身')
    setStatus('新增知識來源...')
    const sample = {
      text: { content: '這是一段示範文字，描述你的方法論與關鍵原則。' },
      link: { url: 'https://example.com/my-article', title: '我的文章' },
      video: { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', title: '演講影片' },
      image: { url: 'https://picsum.photos/600/400', title: '範例圖片' },
      website: { url: 'https://example.com', title: '官方網站' },
      slides: { url: 'https://example.com/slides.pdf', title: '簡報' },
      file: { url: 'https://example.com/whitepaper.pdf', title: '白皮書', file_name: 'whitepaper.pdf' },
    }[type]

    const res = await fetch(`${baseUrl}/api/sources`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ persona_id: personaId, type, ...sample })
    })
    const data = await res.json()
    setStatus(res.ok ? '已新增來源' : ('錯誤：' + (data.detail || '新增失敗')))
  }

  const trainPersona = async () => {
    if (!personaId) return alert('請先建立分身')
    setStatus('訓練中...')
    const res = await fetch(`${baseUrl}/api/train`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ persona_id: personaId })
    })
    const data = await res.json()
    setStatus(res.ok ? '已送出訓練工作 (' + data.job_id + ')' : '訓練送出失敗')
  }

  const askPersona = async () => {
    if (!personaId) return alert('請先建立分身')
    setReply('')
    const res = await fetch(`${baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ persona_id: personaId, message })
    })
    const data = await res.json()
    if (res.ok) setReply(data.response)
  }

  return (
    <section id="create" className="relative py-16">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur">
            <h3 className="text-white font-semibold text-xl mb-4">建立你的 AI 分身</h3>
            <div className="space-y-3">
              <input value={ownerEmail} onChange={e=>setOwnerEmail(e.target.value)} placeholder="Email" className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder:text-white/60" />
              <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="分身名稱" className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder:text-white/60" />
              <input value={desc} onChange={e=>setDesc(e.target.value)} placeholder="分身描述" className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder:text-white/60" />
              <input value={tone} onChange={e=>setTone(e.target.value)} placeholder="說話風格 (如：專業、友善、精準)" className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder:text-white/60" />
              <input value={specialties} onChange={e=>setSpecialties(e.target.value)} placeholder="專長 (以逗號分隔)" className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder:text-white/60" />
              <button onClick={createPersona} className="w-full mt-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold">建立分身</button>
              <p className="text-blue-100 text-sm">{status}</p>
            </div>

            <div className="mt-6">
              <h4 className="text-white/90 font-medium mb-2">新增知識來源</h4>
              <div className="grid grid-cols-3 gap-2">
                {['text','link','video','image','website','slides','file'].map(t=> (
                  <button key={t} onClick={()=>addSource(t)} className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm capitalize">{t}</button>
                ))}
              </div>
              <button onClick={trainPersona} className="mt-3 px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold">送出訓練</button>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur">
            <h3 className="text-white font-semibold text-xl mb-4">與分身對話 (Demo)</h3>
            <div className="space-y-3">
              <input value={personaId} onChange={e=>setPersonaId(e.target.value)} placeholder="Persona ID (建立後自動填入)" className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder:text-white/60" />
              <textarea value={message} onChange={e=>setMessage(e.target.value)} rows={4} placeholder="輸入你的問題或場景..." className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder:text-white/60" />
              <button onClick={askPersona} className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold">發送</button>
              {reply && (
                <div className="mt-2 p-3 rounded-lg bg-black/30 border border-white/10 text-blue-50 whitespace-pre-wrap text-sm">
                  {reply}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
