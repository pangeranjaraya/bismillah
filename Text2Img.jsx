import React,{useState} from 'react'
export default function Text2Img({setStatusMsg}){
  const [prompt,setPrompt]=useState('Cyberpunk city at night, neon lights')
  const [res,setRes]=useState(null); const [err,setErr]=useState(null); const [loading,setLoading]=useState(false)
  async function run(){ setErr(null); setRes(null); setLoading(true); setStatusMsg('Text2Img')
    try{ const fd=new FormData(); fd.append('prompt', prompt); const r=await fetch('https://api.sxtream.xyz/ai/text2imgnfws', {method:'POST', body:fd}); if(!r.ok) throw new Error('HTTP '+r.status); const ct=r.headers.get('content-type')||''; if(ct.startsWith('image/')){ const blob=await r.blob(); setRes({image:URL.createObjectURL(blob)}) } else setRes(await r.json()); setStatusMsg('Text2Img: success') }catch(e){ setErr(e.message); setStatusMsg('Text2Img: error') } finally{ setLoading(false) }
  }
  return (<div>
    <h2 className="text-lg font-semibold mb-3">Text → Image (NFWS)</h2>
    <input value={prompt} onChange={e=>setPrompt(e.target.value)} className="w-full rounded p-2 bg-black/40 mb-3" />
    <button onClick={run} className="px-4 py-2 rounded bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] text-black">Generate</button>
    <div className="mt-4">{loading && 'Generating...'}{err && <div className="text-red-300">{err}</div>}{res && res.image && <img src={res.image} className="rounded shadow max-w-full" alt="res" />}{res && !res.image && <pre className="bg-black/40 p-3 rounded">{JSON.stringify(res,null,2)}</pre>}</div>
  </div>)
}
