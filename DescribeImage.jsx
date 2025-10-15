import React,{useState} from 'react'
export default function DescribeImage({setStatusMsg}){
  const [url,setUrl]=useState('')
  const [res,setRes]=useState(null); const [err,setErr]=useState(null); const [loading,setLoading]=useState(false)
  async function run(){ if(!url){ setErr('Masukkan URL gambar'); return } setErr(null); setRes(null); setLoading(true); setStatusMsg('Describe Image')
    try{ const fd=new FormData(); fd.append('url', url); const r=await fetch('https://api.sxtream.xyz/ai/describe-image', {method:'POST', body:fd}); if(!r.ok) throw new Error('HTTP '+r.status); const j=await r.json(); setRes(j); setStatusMsg('Describe: success') }catch(e){ setErr(e.message); setStatusMsg('Describe: error') } finally{ setLoading(false) }
  }
  return (<div>
    <h2 className="text-lg font-semibold mb-3">Describe Image</h2>
    <input value={url} onChange={e=>setUrl(e.target.value)} className="w-full rounded p-2 bg-black/40 mb-3" placeholder="https://..." />
    <button onClick={run} className="px-4 py-2 rounded bg-gradient-to-r from-[#ffd8a9] to-[#ff6b6b] text-black">Describe</button>
    <div className="mt-4">{loading && 'Describing...'}{err && <div className="text-red-300">{err}</div>}{res && <pre className="bg-black/40 p-3 rounded">{JSON.stringify(res,null,2)}</pre>}</div>
  </div>)
}
