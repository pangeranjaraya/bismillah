import React,{useState} from 'react'
export default function Iqc({setStatusMsg}){
  const [text,setText]=useState('Generate IQC')
  const [res,setRes]=useState(null); const [err,setErr]=useState(null); const [loading,setLoading]=useState(false)
  async function run(){ setErr(null); setRes(null); setLoading(true); setStatusMsg('IQC Maker')
    try{ const fd=new FormData(); fd.append('text', text); const r=await fetch('https://api.sxtream.xyz/maker/iqc', {method:'POST', body:fd}); if(!r.ok) throw new Error('HTTP '+r.status); const j=await r.json(); setRes(j); setStatusMsg('IQC: success') }catch(e){ setErr(e.message); setStatusMsg('IQC: error') } finally{ setLoading(false) }
  }
  return (<div>
    <h2 className="text-lg font-semibold mb-3">IQC Maker</h2>
    <input value={text} onChange={e=>setText(e.target.value)} className="w-full rounded p-2 bg-black/40 mb-3" />
    <button onClick={run} className="px-4 py-2 rounded bg-gradient-to-r from-[#00ffd5] to-[#00a6ff] text-black">Make</button>
    <div className="mt-4">{loading && 'Working...'}{err && <div className="text-red-300">{err}</div>}{res && <pre className="bg-black/40 p-3 rounded">{JSON.stringify(res,null,2)}</pre>}</div>
  </div>)
}
