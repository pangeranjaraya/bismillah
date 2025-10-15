import React, {useState} from 'react'
export default function Primbon({setStatusMsg}){
  const [nama1,setNama1]=useState('putu'); const [nama2,setNama2]=useState('keyla');
  const [res,setRes]=useState(null); const [err,setErr]=useState(null); const [loading,setLoading]=useState(false)
  async function run(){ setErr(null); setRes(null); setLoading(true); setStatusMsg('Calling Primbon')
    try{ const params=new URLSearchParams({nama1,nama2}); const r=await fetch(`https://api.siputzx.my.id/api/primbon/kecocokan_nama_pasangan?${params.toString()}`); if(!r.ok) throw new Error('HTTP '+r.status); const j=await r.json(); setRes(j); setStatusMsg('Primbon: success') }catch(e){ setErr(e.message); setStatusMsg('Primbon: error') } finally{ setLoading(false) }
  }
  return (<div>
    <h2 className="text-lg font-semibold mb-3">Primbon Kecocokan Nama</h2>
    <input value={nama1} onChange={e=>setNama1(e.target.value)} className="w-full rounded p-2 bg-black/40 mb-2" />
    <input value={nama2} onChange={e=>setNama2(e.target.value)} className="w-full rounded p-2 bg-black/40 mb-2" />
    <button onClick={run} className="px-4 py-2 rounded bg-gradient-to-r from-[#ffcc00] to-[#ff6b6b] text-black">Check</button>
    <div className="mt-4">{loading && 'Loading...'}{err && <div className="text-red-300">{err}</div>}{res && <pre className="bg-black/40 p-3 rounded">{JSON.stringify(res,null,2)}</pre>}</div>
  </div>)
}
