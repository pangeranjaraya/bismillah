import React,{useState} from 'react'
export default function MagicStudio({setStatusMsg}){
  const [prompt,setPrompt]=useState('Cyberpunk portrait neon')
  const [res,setRes]=useState(null); const [err,setErr]=useState(null); const [loading,setLoading]=useState(false)
  async function run(){ setErr(null); setRes(null); setLoading(true); setStatusMsg('MagicStudio')
    try{ const fd=new FormData(); fd.append('prompt', prompt); const r=await fetch('https://api.siputzx.my.id/api/ai/magicstudio', {method:'POST', body:fd}); if(!r.ok) throw new Error('HTTP '+r.status); const ct=r.headers.get('content-type')||''; if(ct.startsWith('image/')){ const blob=await r.blob(); setRes({image:URL.createObjectURL(blob)}) } else setRes(await r.json()); setStatusMsg('MagicStudio: success') }catch(e){ setErr(e.message); setStatusMsg('MagicStudio: error') } finally{ setLoading(false) }
  }
  return (<div>
    <h2 className="text-lg font-semibold mb-3">Magic Studio</h2>
    <input value={prompt} onChange={e=>setPrompt(e.target.value)} className="w-full rounded p-2 bg-black/40 mb-3" />
    <button onClick={run} className="px-4 py-2 rounded bg-gradient-to-r from-[#00ffbd] to-[#00a6ff] text-black">Run</button>
    <div className="mt-4">{loading && 'Working...'}{err && <div className="text-red-300">{err}</div>}{res && res.image && <img src={res.image} className="rounded shadow max-w-full" alt="res" />}{res && !res.image && <pre className="bg-black/40 p-3 rounded">{JSON.stringify(res,null,2)}</pre>}</div>
  </div>)
}
