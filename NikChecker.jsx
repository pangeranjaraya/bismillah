import React,{useState} from 'react'
export default function NikChecker({setStatusMsg}){
  const [nik,setNik]=useState(''); const [res,setRes]=useState(null); const [err,setErr]=useState(null); const [loading,setLoading]=useState(false)
  async function run(){ if(!nik){ setErr('Masukkan NIK'); return } setErr(null); setRes(null); setLoading(true); setStatusMsg('NIK Checker')
    try{ const params=new URLSearchParams({nik}); const r=await fetch(`https://api.siputzx.my.id/api/tools/nik-checker?${params.toString()}`); if(!r.ok) throw new Error('HTTP '+r.status); const j=await r.json(); setRes(j); setStatusMsg('NIK: success') }catch(e){ setErr(e.message); setStatusMsg('NIK: error') } finally{ setLoading(false) }
  }
  return (<div>
    <h2 className="text-lg font-semibold mb-3">NIK Checker</h2>
    <input value={nik} onChange={e=>setNik(e.target.value)} className="w-full rounded p-2 bg-black/40 mb-3" />
    <button onClick={run} className="px-4 py-2 rounded bg-gradient-to-r from-[#ff7ab6] to-[#7a6bff] text-black">Check</button>
    <div className="mt-4">{loading && 'Checking...'}{err && <div className="text-red-300">{err}</div>}{res && <pre className="bg-black/40 p-3 rounded">{JSON.stringify(res,null,2)}</pre>}</div>
  </div>)
}
