import React, {useState} from 'react'
export default function Blackbox({setStatusMsg}){
  const [content, setContent] = useState('Hello, how are you today?')
  const [loading,setLoading]=useState(false)
  const [resData,setResData]=useState(null)
  const [err,setErr]=useState(null)
  async function run(){
    setErr(null); setResData(null); setLoading(true); setStatusMsg('Calling Blackbox AI')
    try{
      const params = new URLSearchParams({content})
      const r = await fetch(`https://api.siputzx.my.id/api/ai/blackboxai?${params.toString()}`)
      if(!r.ok) throw new Error('HTTP '+r.status)
      const json = await r.json(); setResData(json); setStatusMsg('Blackbox: success')
    }catch(e){ setErr(e.message); setStatusMsg('Blackbox: error') }
    finally{ setLoading(false) }
  }
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Blackbox AI</h2>
      <textarea value={content} onChange={e=>setContent(e.target.value)} className="w-full rounded p-2 bg-black/40" rows={6}></textarea>
      <div className="mt-3"><button onClick={run} className="px-4 py-2 rounded bg-gradient-to-r from-[#ff70a6] to-[#9b59ff] text-black">Ask</button></div>
      <div className="mt-4">{loading && 'Loading...'}{err && <div className="text-red-300">{err}</div>}{resData && <pre className="bg-black/40 p-3 rounded">{JSON.stringify(resData,null,2)}</pre>}</div>
    </div>
  )
}
