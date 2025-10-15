import React, {useState} from 'react'
export default function FaceSwap({setStatusMsg}){
  const [srcFile,setSrcFile]=useState(null); const [dstFile,setDstFile]=useState(null)
  const [res,setRes]=useState(null); const [err,setErr]=useState(null); const [loading,setLoading]=useState(false)
  async function run(){ setErr(null); setRes(null); setLoading(true); setStatusMsg('Calling FaceSwap')
    try{ const fd=new FormData(); if(srcFile) fd.append('src', srcFile); if(dstFile) fd.append('dst', dstFile);
      const r=await fetch('https://api.siputzx.my.id/api/imgedit/faceswap', {method:'POST', body:fd})
      if(!r.ok) throw new Error('HTTP '+r.status)
      const ct=r.headers.get('content-type')||''
      if(ct.startsWith('image/')){ const blob=await r.blob(); setRes({image: URL.createObjectURL(blob)}) }
      else setRes(await r.json())
      setStatusMsg('FaceSwap: success')
    }catch(e){ setErr(e.message); setStatusMsg('FaceSwap: error') } finally{ setLoading(false) }
  }
  return (<div>
    <h2 className="text-lg font-semibold mb-3">Face Swap</h2>
    <label className="text-xs">Source (face)</label>
    <input type="file" accept="image/*" onChange={e=>setSrcFile(e.target.files[0])} className="w-full mb-2" />
    <label className="text-xs">Destination (target)</label>
    <input type="file" accept="image/*" onChange={e=>setDstFile(e.target.files[0])} className="w-full mb-3" />
    <button onClick={run} className="px-4 py-2 rounded bg-gradient-to-r from-[#ff9f1c] to-[#ff2d95] text-black">Swap</button>
    <div className="mt-4">{loading && 'Processing...'}{err && <div className="text-red-300">{err}</div>}{res && res.image && <img src={res.image} alt="res" className="rounded shadow max-w-full" />}{res && !res.image && <pre className="bg-black/40 p-3 rounded">{JSON.stringify(res,null,2)}</pre>}</div>
  </div>)
}
