import React,{useState} from 'react'
export default function TextToVideo({setStatusMsg}){
  const [prompt,setPrompt]=useState('Short cyberpunk loop')
  const [res,setRes]=useState(null); const [err,setErr]=useState(null); const [loading,setLoading]=useState(false)
  async function run(){ setErr(null); setRes(null); setLoading(true); setStatusMsg('Text→Video')
    try{ const fd=new FormData(); fd.append('prompt', prompt); const r=await fetch('https://api.sxtream.xyz/ai/texttovideo', {method:'POST', body:fd}); if(!r.ok) throw new Error('HTTP '+r.status); const ct=r.headers.get('content-type')||''; if(ct.startsWith('video/')||ct.includes('application/octet-stream')){ const blob=await r.blob(); setRes({video: URL.createObjectURL(blob)}) } else setRes(await r.json()); setStatusMsg('Text→Video: success') }catch(e){ setErr(e.message); setStatusMsg('Text→Video: error') } finally{ setLoading(false) }
  }
  return (<div>
    <h2 className="text-lg font-semibold mb-3">Text → Video</h2>
    <input value={prompt} onChange={e=>setPrompt(e.target.value)} className="w-full rounded p-2 bg-black/40 mb-3" />
    <button onClick={run} className="px-4 py-2 rounded bg-gradient-to-r from-[#00ffd5] to-[#0066ff] text-black">Create</button>
    <div className="mt-4">{loading && 'Generating...'}{err && <div className="text-red-300'>{err}</div>}{res && res.video && <video src={res.video} controls className="max-w-full rounded"></video>}{res && !res.video && <pre className="bg-black/40 p-3 rounded">{JSON.stringify(res,null,2)}</pre>}</div>
  </div>)
}
