import React,{useState} from 'react'
export default function Qr2Text({setStatusMsg}){
  const [url,setUrl]=useState('https://files.catbox.moe/05lpn0.jpg')
  const [res,setRes]=useState(null); const [err,setErr]=useState(null); const [loading,setLoading]=useState(false)
  async function run(){ setErr(null); setRes(null); setLoading(true); setStatusMsg('Calling QR→Text')
    try{ const params=new URLSearchParams({url}); const r=await fetch(`https://api.siputzx.my.id/api/tools/qr2text?${params.toString()}`); if(!r.ok) throw new Error('HTTP '+r.status); const j=await r.json(); setRes(j); setStatusMsg('QR→Text: success') }catch(e){ setErr(e.message); setStatusMsg('QR→Text: error') } finally{ setLoading(false) }
  }
  return (<div>
    <h2 className="text-lg font-semibold mb-3">QR → Text</h2>
    <input value={url} onChange={e=>setUrl(e.target.value)} className="w-full rounded p-2 bg-black/40 mb-3" />
    <button onClick={run} className="px-4 py-2 rounded bg-gradient-to-r from-[#7df9ff] to-[#00a6ff] text-black">Scan</button>
    <div className="mt-4">{loading && 'Loading...'}{err && <div className="text-red-300">{err}</div>}{res && <pre className="bg-black/40 p-3 rounded">{JSON.stringify(res,null,2)}</pre>}</div>
  </div>)
}
