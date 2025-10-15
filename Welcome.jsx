import React, {useState} from 'react'
export default function Welcome({setStatusMsg}){
  const [avatar, setAvatar] = useState('https://files.catbox.moe/05lpn0.jpg')
  const [background, setBackground] = useState('https://files.catbox.moe/05lpn0.jpg')
  const [description, setDescription] = useState('Welcome friend!')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  async function run(){
    setError(null); setResult(null); setLoading(true); setStatusMsg('Calling Welcome API')
    try{
      const params = new URLSearchParams({avatar, background, description})
      const res = await fetch(`https://api.siputzx.my.id/api/canvas/welcomev4avatar?${params.toString()}`)
      if(!res.ok) throw new Error('HTTP ' + res.status)
      const ct = res.headers.get('content-type')||''
      if(ct.startsWith('image/')){
        const blob = await res.blob(); setResult({image: URL.createObjectURL(blob)})
      } else {
        setResult(await res.json())
      }
      setStatusMsg('Welcome API: success')
    }catch(e){ setError(e.message); setStatusMsg('Welcome API: error') }
    finally{ setLoading(false) }
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Welcome Card Generator</h2>
      <label className="block text-xs">Avatar URL</label>
      <input value={avatar} onChange={e=>setAvatar(e.target.value)} className="w-full rounded p-2 bg-black/40 mb-2" />
      <label className="block text-xs">Background URL</label>
      <input value={background} onChange={e=>setBackground(e.target.value)} className="w-full rounded p-2 bg-black/40 mb-2" />
      <label className="block text-xs">Description</label>
      <input value={description} onChange={e=>setDescription(e.target.value)} className="w-full rounded p-2 bg-black/40 mb-4" />
      <div className="flex gap-2">
        <button onClick={run} className="px-4 py-2 rounded bg-gradient-to-r from-[#00f6ff] to-[#0063ff] text-black">Generate</button>
      </div>

      <div className="mt-6">
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-300">Error: {error}</div>}
        {result && result.image && <img src={result.image} alt="res" className="rounded shadow max-w-full" />}
        {result && result.text && <pre className="bg-black/40 p-3 rounded">{JSON.stringify(result.text, null, 2)}</pre>}
      </div>
    </div>
  )
}
