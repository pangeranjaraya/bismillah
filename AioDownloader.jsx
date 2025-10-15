import React,{useState} from 'react'
export default function AioDownloader({setStatusMsg}){
  const [url,setUrl]=useState(''); const [res,setRes]=useState(null); const [err,setErr]=useState(null); const [loading,setLoading]=useState(false)
  async function run(){ if(!url){ setErr('Masukkan URL'); return } setErr(null); setRes(null); setLoading(true); setStatusMsg('AIO Download')
    try{ const params=new URLSearchParams({url}); const r=await fetch(`https://api.sxtream.xyz/downloader/aio?${params.toString()}`); if(!r.ok) throw new Error('HTTP '+r.status); const j=await r.json(); setRes(j); setStatusMsg('AIO: success') }catch(e){ setErr(e.message); setStatusMsg('AIO: error') } finally{ setLoading(false) }
  }
  return (<div>
    <h2 className="text-lg font-semibold mb-3">AIO Downloader</h2>
    <input value={url} onChange={e=>setUrl(e.target.value)} className="w-full rounded p-2 bg-black/40 mb-3" placeholder="link media" />
    <button onClick={run} className="px-4 py-2 rounded bg-gradient-to-r from-[#00f6ff] to-[#0063ff] text-black">Download</button>
    <div className="mt-4">{loading && 'Loading...'}{err && <div className="text-red-300">{err}</div>}{res && <pre className="bg-black/40 p-3 rounded">{JSON.stringify(res,null,2)}</pre>}</div>
  </div>)
}
