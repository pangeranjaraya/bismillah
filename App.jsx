import React, {useState} from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Welcome from './pages/Welcome'
import Blackbox from './pages/Blackbox'
import GithubFetch from './pages/GithubFetch'
import Primbon from './pages/Primbon'
import Qr2Text from './pages/Qr2Text'
import FaceSwap from './pages/FaceSwap'
import Text2Img from './pages/Text2Img'
import MagicStudio from './pages/MagicStudio'
import DescribeImage from './pages/DescribeImage'
import TextToVideo from './pages/TextToVideo'
import NikChecker from './pages/NikChecker'
import AioDownloader from './pages/AioDownloader'
import Skiplink from './pages/Skiplink'
import Iqc from './pages/Iqc'
import Yapping from './pages/Yapping'

const menu = [
  {id:'welcome', label:'Welcome Card', to:'/welcome'},
  {id:'blackbox', label:'Blackbox AI', to:'/blackbox'},
  {id:'github', label:'GitHub Fetch', to:'/github'},
  {id:'primbon', label:'Primbon Pasangan', to:'/primbon'},
  {id:'qr2text', label:'QR → Text', to:'/qr2text'},
  {id:'faceswap', label:'Face Swap', to:'/faceswap'},
  {id:'text2img', label:'Text → Image', to:'/text2img'},
  {id:'magicstudio', label:'Magic Studio', to:'/magicstudio'},
  {id:'describe', label:'Describe Image', to:'/describe'},
  {id:'texttovideo', label:'Text → Video', to:'/texttovideo'},
  {id:'nik', label:'NIK Checker', to:'/nik'},
  {id:'aio', label:'AIO Downloader', to:'/aio'},
  {id:'skiplink', label:'Skiplink', to:'/skiplink'},
  {id:'iqc', label:'IQC Maker', to:'/iqc'},
  {id:'yapping', label:'Yapping Maker', to:'/yapping'},
]

export default function App(){
  const [statusMsg, setStatusMsg] = useState('Ready')
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071022] via-[#0a1530] to-[#081421] text-white">
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-3">
            <div className="p-4 rounded-2xl neon-border border border-neonCyan/10 backdrop-blur-md">
              <div className="text-center mb-4">
                <div className="mx-auto w-20 h-20 rounded-full border-2 border-neonCyan p-1 overflow-hidden">
                  <img src="https://files.catbox.moe/05lpn0.jpg" alt="avatar" className="w-full h-full object-cover" />
                </div>
                <h2 className="mt-3 text-xl font-bold">SIPUTZX Hub</h2>
                <p className="text-sm text-[#a8f0ff]">Cyberpunk Neon • API Suite</p>
              </div>

              <nav className="space-y-2">
                {menu.map(m=> (
                  <Link to={m.to} key={m.id} className="block px-3 py-2 rounded-lg hover:bg-black/30 transition border border-transparent hover:border-neonCyan/30">{m.label}</Link>
                ))}
              </nav>

              <div className="mt-6 text-xs text-[#9be5ff]/70">
                <p>Status: <span className="font-semibold">{statusMsg}</span></p>
              </div>
            </div>
          </aside>

          <main className="col-span-9">
            <div className="p-6 rounded-2xl border border-neonCyan/6 bg-black/20 backdrop-blur-md">
              <Routes>
                <Route path="/welcome" element={<Welcome setStatusMsg={setStatusMsg} />} />
                <Route path="/blackbox" element={<Blackbox setStatusMsg={setStatusMsg} />} />
                <Route path="/github" element={<GithubFetch setStatusMsg={setStatusMsg} />} />
                <Route path="/primbon" element={<Primbon setStatusMsg={setStatusMsg} />} />
                <Route path="/qr2text" element={<Qr2Text setStatusMsg={setStatusMsg} />} />
                <Route path="/faceswap" element={<FaceSwap setStatusMsg={setStatusMsg} />} />
                <Route path="/text2img" element={<Text2Img setStatusMsg={setStatusMsg} />} />
                <Route path="/magicstudio" element={<MagicStudio setStatusMsg={setStatusMsg} />} />
                <Route path="/describe" element={<DescribeImage setStatusMsg={setStatusMsg} />} />
                <Route path="/texttovideo" element={<TextToVideo setStatusMsg={setStatusMsg} />} />
                <Route path="/nik" element={<NikChecker setStatusMsg={setStatusMsg} />} />
                <Route path="/aio" element={<AioDownloader setStatusMsg={setStatusMsg} />} />
                <Route path="/skiplink" element={<Skiplink setStatusMsg={setStatusMsg} />} />
                <Route path="/iqc" element={<Iqc setStatusMsg={setStatusMsg} />} />
                <Route path="/yapping" element={<Yapping setStatusMsg={setStatusMsg} />} />
                <Route path="/" element={<div className="p-6 text-center">Selamat datang — pilih fitur dari sidebar.</div>} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
