import React,{useState} from 'react'
export default function Skiplink({setStatusMsg}){
  const [url,setUrl]=useState(''); const [res,setRes]=useState(null); const [err,setErr]=useState(null); const [loading,setLoading]=useState(false)
  async function run(){ if(!url){ setErr('Masukkan URL'); return } setErr(null); setRes(null); setLoading(true); setStatusMsg('Skiplink')
    try{ const fd=new FormData(); fd.append('url', url); const r=await fetch('https://api.sxtream.xyz/api/tools/skiplink', {method:'POST', body:fd}); if(!r.ok) throw new Error('HTTP '+r.status); const j=await r.json(); setRes(j); setStatusMsg('Skiplink: success') }catch(e){ setErr(e.message); setStatusMsg('Skiplink: error') } finally{ setLoading(false) }
  }
  return (<div>
    <h2 className="text-lg font-semibold mb-3">Skiplink</h2>
    <input value={url} onChange={e=>setUrl(e.target.value)} className="w-full rounded p-2 bg-black/40 mb-3" />
    <button onClick={run} className="px-4 py-2 rounded bg-gradient-to-r from-[#b28cff] to-[#ff9a9e] text-black">Resolve</button>
    <div className="mt-4">{loading && 'Resolving...'}{err && <div className="text-red-300">{err}</div>}{res && <pre className="bg-black/40 p-3 rounded">{JSON.stringify(res,null,2)}</pre>}</div>
  </div>)
}
