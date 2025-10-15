import React,{useState} from 'react'
export default function Yapping({setStatusMsg}){
  const [text,setText]=useState('Make Yapping')
  const [res,setRes]=useState(null); const [err,setErr]=useState(null); const [loading,setLoading]=useState(false)
  async function run(){ setErr(null); setRes(null); setLoading(true); setStatusMsg('Yapping Maker')
    try{ const fd=new FormData(); fd.append('text', text); const r=await fetch('https://api.sxtream.xyz/maker/yapping', {method:'POST', body:fd}); if(!r.ok) throw new Error('HTTP '+r.status); const j=await r.json(); setRes(j); setStatusMsg('Yapping: success') }catch(e){ setErr(e.message); setStatusMsg('Yapping: error') } finally{ setLoading(false) }
  }
  return (<div>
    <h2 className="text-lg font-semibold mb-3">Yapping Maker</h2>
    <input value={text} onChange={e=>setText(e.target.value)} className="w-full rounded p-2 bg-black/40 mb-3" />
    <button onClick={run} className="px-4 py-2 rounded bg-gradient-to-r from-[#ff8c42] to-[#ff6b6b] text-black">Make</button>
    <div className="mt-4">{loading && 'Working...'}{err && <div className="text-red-300">{err}</div>}{res && <pre className="bg-black/40 p-3 rounded">{JSON.stringify(res,null,2)}</pre>}</div>
  </div>)
}
