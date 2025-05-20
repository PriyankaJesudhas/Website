// ─── src/App.jsx (single‑page with smooth scroll + Quote modal) ────────────
import { useEffect, useState } from 'react';
import './index.css';

/* ── assets ───────────────────────────────────────────────────────────── */
import logo                from './assets/AVTEKS_logo_white_bg.png';
import services_our        from './assets/our_services_new.png';
import webdesign           from './assets/web_design_new.png';
import cloudengineering    from './assets/cloud_engineering_new.png';
import softwareengineering from './assets/software_engineering_new.png';
import audioprocessing     from './assets/audio_processing_new.png';
import aiml                from './assets/AI_ml_new.png';
import bgimage             from './assets/bg_img.png';

/* ── splash loader ────────────────────────────────────────────────────── */
function Loader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white space-y-4">
      <img src={logo} alt="AVTEKS logo" className="w-32 h-32 object-contain" />
      <p className="text-lg font-medium tracking-wide text-center">One Stop For Your Technological Needs</p>
      <div className="w-8 h-8 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin" />
    </div>
  );
}

/* ── Quote modal ──────────────────────────────────────────────────────── */
function QuoteModal({ open, onClose }) {
  const [jobType, setJobType]         = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail]             = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = encodeURIComponent(`Job Type: ${jobType}\nJob Description: ${description}\nEmail: ${email}`);
    window.location.href = `mailto:priyanka@avteks.in?subject=Quote Request&body=${body}`;
    onClose();
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-2 right-3 text-gray-500 text-xl leading-none">×</button>
        <h3 className="text-2xl font-bold text-center mb-4 text-[#1b0d18]">Request a Quote</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Job Type</label>
            <input value={jobType} onChange={(e)=>setJobType(e.target.value)} required className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Job Description</label>
            <textarea rows={4} value={description} onChange={(e)=>setDescription(e.target.value)} required className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Your Email</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <button type="submit" className="w-full bg-[#ff4c5a] text-white font-semibold py-2 rounded hover:bg-[#e03d49]">Send</button>
        </form>
      </div>
    </div>
  );
}

/* ── 50‑vh alternating card ─────────────────────────────────────────── */
function ServiceBlock({ img, title, bullets, id, big=false, reverse=false }) {
  return (
    <article id={id} className={`group relative isolate flex ${reverse?'flex-row-reverse':'flex-row'} items-center w-full h-[50vh] overflow-hidden`}>
      <div className="flex items-center justify-center w-1/2 h-full bg-gray-50/20">
        <img src={img} alt={title} className={`${big?'w-60 h-60':'w-52 h-52'} object-contain select-none pointer-events-none`} />
      </div>
      <div className={`absolute inset-y-0 ${reverse?'left-0':'right-0'} w-1/2 flex items-center justify-center bg-white/90 backdrop-blur-lg rounded-lg shadow-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none p-8`}>
        <div>
          <h3 className="text-2xl font-bold text-red-500 mb-4 text-center">{title}</h3>
          <ul className="text-base list-disc list-inside space-y-1">
            {bullets.map(b=> <li key={b}>{b}</li>)}
          </ul>
        </div>
      </div>
    </article>
  );
}

/* ── Main page ───────────────────────────────────────────────────────── */
function MainPage() {
  const [showQuote, setShowQuote] = useState(false);

  const services = [
  { id:'our-services',        img:services_our,       title:'Our Services',       bullets:['Web Design','Cloud Engineering','Software Engineering','Audio Processing','AI & ML'], big:true },
  { id:'web-design',          img:webdesign,          title:'Web Design',         bullets:['UI Design','UX Design','User Research','UX Architecture'] },
  { id:'cloud-engineering',   img:cloudengineering,   title:'Cloud Engineering',  bullets:['Cloud Migration','DevOps','Cyber Security','24/7 Support & Maintenance'] },
  { id:'software-engineering',img:softwareengineering,title:'Software Engineering',bullets:['Website Development','Mobile Apps','Custom Software','API Services','App Modernization'] },
  { id:'audio-processing',    img:audioprocessing,    title:'Audio Processing',   bullets:['Audio Classification','Emotion Detection','Source Separation','Segmentation'] },
  { id:'ai-ml',               img:aiml,               title:'AI & ML',            bullets:['Data Analytics','Data Engineering','Visualization','Supervised Learning','Regression'] },
];

  // scroll target to vertical centre, accounting for sticky header
  const goTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center bg-cover bg-center" style={{backgroundImage:`url(${bgimage})`}}>
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center w-full">
        {/* header */}
        <header className="sticky top-0 z-50 w-full bg-[#1b0d18]/70 backdrop-blur text-white border-b border-[#ff4c5a]/40">
          <div className="flex flex-col items-center pt-5">
            <img src={logo} alt="AVTEKS" className="w-20 h-20 object-contain" />
            <p className="text-sm text-[#ffb6a0] pb-3">One Stop For Your Technological Needs</p>
          </div>
          <nav>
            <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 py-2 text-sm font-semibold">
              <li><button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} className="hover:text-[#ffb6a0]">Home</button></li>
              {services.map(s=> (
                <li key={s.id}><button onClick={()=>goTo(s.id)} className="hover:text-[#ffb6a0]">{s.title}</button></li>
              ))}
              <li><button onClick={()=>setShowQuote(true)} className="hover:text-[#ffb6a0]">Quote</button></li>
              <li><button onClick={()=>goTo('contact')} className="hover:text-[#ffb6a0]">Contact</button></li>
            </ul>
          </nav>
        </header>

        {/* service cards */}
        <main className="w-full">
          {services.map((s,i)=>(<ServiceBlock key={s.id} {...s} reverse={i%2===1}/>))}
        </main>

        {/* contact */}
        <section id="contact" className="w-full py-12 text-center space-y-2 text-white">
          <h2 className="text-3xl font-extrabold tracking-wider text-[#ff4c5a]">Reach Us</h2>
          <p>Email: <a href="mailto:priyanka@avteks.in" className="text-[#ffb6a0] underline hover:text-white">priyanka@avteks.in</a></p>
          <p>Phone: <a href="tel:+919789006227" className="text-[#ffb6a0] underline hover:text-white">+91 97890 06227</a></p>
        </section>
      </div>

      {/* quote modal */}
      <QuoteModal open={showQuote} onClose={()=>setShowQuote(false)} />
    </div>
  );
}

/* ── root component ─────────────────────────────────────────────────── */
export default function App() {
  const [loading,setLoading] = useState(true);
  useEffect(()=>{const t=setTimeout(()=>setLoading(false),1500);return()=>clearTimeout(t);},[]);
  return loading? <Loader/> : <MainPage/>;
}
