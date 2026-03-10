'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://odefzeyiusssxzrsefbe.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kZWZ6ZXlpdXNzc3h6cnNlZmJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4MDM3MTcsImV4cCI6MjA4NzM3OTcxN30.v_ot1kr9o5flJrtfuEkpshvTHpm3Tt5U88jgiumKU1s'
)

const colors = {
  bg: "#0F1117", card: "#1A1D27", cardHover: "#222636",
  accent: "#6C63FF", accentHover: "#5A52E0", accentLight: "rgba(108,99,255,0.12)",
  green: "#34D399", greenBg: "rgba(52,211,153,0.12)",
  yellow: "#FBBF24", yellowBg: "rgba(251,191,36,0.12)",
  red: "#F87171", redBg: "rgba(248,113,113,0.12)",
  text: "#F1F1F4", textSecondary: "#9CA3AF", textMuted: "#6B7280",
  border: "#2A2D3A", inputBg: "#151722", white: "#FFFFFF",
}

const COMMON_AREAS = ['Piscina','Parrillero/BBQ','Sala de reuniones','Gimnasio','Jardín','Salón de eventos','Área de juegos infantiles','Cancha deportiva','Lavandería común','Estacionamiento de visitas']
const opLabels = { venta:'Venta', alquiler:'Alquiler', anticretico:'Anticrético', preventa:'Preventa' }
const typeLabels = { casa:'Casa', departamento:'Departamento', terreno:'Terreno', oficina:'Oficina', local_comercial:'Local comercial', otro:'Otro' }

const Icons = {
  home: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  users: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  filter: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  plus: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  logout: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  bed: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 012 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>,
  bath: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12h16a1 1 0 011 1v3a4 4 0 01-4 4H7a4 4 0 01-4-4v-3a1 1 0 011-1z"/><path d="M6 12V5a2 2 0 012-2h3v2.25"/></svg>,
  area: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 3v18"/></svg>,
  car: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 17h2V7H3v10h2"/><path d="M7 17a2 2 0 104 0H7z"/><path d="M13 17a2 2 0 104 0h-4z"/></svg>,
  phone: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
  edit: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  x: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  camera: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  file: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  location: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  user: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  save: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
  upload: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>,
  download: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="8 17 12 21 16 17"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"/></svg>,
  tools: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>,
  copy: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>,
}

function LoginScreen({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setError('')
    try {
      if (isSignUp) {
        if (!fullName || !phone) { setError('Completa todos los campos'); setLoading(false); return }
        const { data, error: err } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName, phone } } })
        if (err) { setError(err.message); setLoading(false); return }
        if (data.session) { onLogin(data.session) } else { setError('Registro exitoso. Revisa tu correo.'); setIsSignUp(false) }
      } else {
        const { data, error: err } = await supabase.auth.signInWithPassword({ email, password })
        if (err) { setError(err.message); setLoading(false); return }
        onLogin(data.session)
      }
    } catch (err) { setError('Error: ' + err.message) }
    setLoading(false)
  }
  const inputStyle = { width:'100%', padding:'12px 16px', background:colors.inputBg, border:`1px solid ${colors.border}`, borderRadius:'10px', color:colors.text, fontSize:'14px', outline:'none', boxSizing:'border-box' }
  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:`linear-gradient(135deg, ${colors.bg} 0%, #1a1040 50%, ${colors.bg} 100%)`, padding:'20px' }}>
      <div style={{ width:'100%', maxWidth:'420px', background:colors.card, borderRadius:'20px', padding:'40px 32px', border:`1px solid ${colors.border}`, boxShadow:'0 20px 60px rgba(0,0,0,0.5)' }}>
        <div style={{ textAlign:'center', marginBottom:'32px' }}>
          <div style={{ width:'56px', height:'56px', borderRadius:'16px', background:`linear-gradient(135deg, ${colors.accent}, #8B5CF6)`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', fontSize:'24px', fontWeight:'bold', color:colors.white }}>O</div>
          <h1 style={{ color:colors.text, fontSize:'24px', fontWeight:'700', margin:'0 0 4px' }}>OmniaTools</h1>
          <p style={{ color:colors.textSecondary, fontSize:'14px', margin:0 }}>{isSignUp ? 'Crea tu cuenta de vendedor' : 'Ingresa a tu cuenta'}</p>
        </div>
        {error && <div style={{ background:error.includes('exitoso')?colors.greenBg:colors.redBg, color:error.includes('exitoso')?colors.green:colors.red, padding:'12px 16px', borderRadius:'10px', fontSize:'13px', marginBottom:'20px' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          {isSignUp && (<>
            <div style={{ marginBottom:'16px' }}><label style={{ color:colors.textSecondary, fontSize:'13px', display:'block', marginBottom:'6px' }}>Nombre completo</label><input type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Ej: Franco López" style={inputStyle} /></div>
            <div style={{ marginBottom:'16px' }}><label style={{ color:colors.textSecondary, fontSize:'13px', display:'block', marginBottom:'6px' }}>Teléfono</label><input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Ej: 70012345" style={inputStyle} /></div>
          </>)}
          <div style={{ marginBottom:'16px' }}><label style={{ color:colors.textSecondary, fontSize:'13px', display:'block', marginBottom:'6px' }}>Correo electrónico</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@correo.com" style={inputStyle} /></div>
          <div style={{ marginBottom:'24px' }}><label style={{ color:colors.textSecondary, fontSize:'13px', display:'block', marginBottom:'6px' }}>Contraseña</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" style={inputStyle} /></div>
          <button type="submit" disabled={loading} style={{ width:'100%', padding:'14px', background:loading?colors.textMuted:`linear-gradient(135deg, ${colors.accent}, #8B5CF6)`, color:colors.white, border:'none', borderRadius:'10px', fontSize:'15px', fontWeight:'600', cursor:loading?'not-allowed':'pointer', boxSizing:'border-box' }}>{loading ? 'Cargando...' : isSignUp ? 'Crear cuenta' : 'Iniciar sesión'}</button>
        </form>
        <div style={{ textAlign:'center', marginTop:'20px' }}><button onClick={() => { setIsSignUp(!isSignUp); setError('') }} style={{ background:'none', border:'none', color:colors.accent, fontSize:'14px', cursor:'pointer', textDecoration:'underline' }}>{isSignUp ? 'Ya tengo cuenta → Iniciar sesión' : 'No tengo cuenta → Registrarme'}</button></div>
      </div>
    </div>
  )
}

function PropertyCard({ property, agents, currentUserId, onView, onEdit, onDelete, showOwnerActions }) {
  const agent = agents.find(a => a.id === property.agent_id)
  const isOwner = property.agent_id === currentUserId
  const statusMap = { disponible:{bg:colors.greenBg,color:colors.green,label:'Disponible'}, reservada:{bg:colors.yellowBg,color:colors.yellow,label:'Reservada'}, vendida:{bg:colors.redBg,color:colors.red,label:'Vendida'}, inactiva:{bg:'rgba(107,114,128,0.12)',color:colors.textMuted,label:'Inactiva'} }
  const status = statusMap[property.status] || statusMap.disponible
  const photo = property.photos?.length > 0 ? property.photos[0] : null
  const priceBs = property.exchange_rate ? `Bs ${Math.round(Number(property.price)*Number(property.exchange_rate)).toLocaleString('es-BO')}` : ''
  return (
    <div onClick={() => onView(property)} style={{ background:colors.card, borderRadius:'16px', overflow:'hidden', border:`1px solid ${colors.border}`, cursor:'pointer' }}>
      <div style={{ height:'160px', background:photo?`url(${photo}) center/cover`:'linear-gradient(135deg, #2a2040, #1a1530)', display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>
        {!photo && <span style={{ fontSize:'40px' }}>🏠</span>}
        <div style={{ position:'absolute', top:'10px', left:'10px', display:'flex', gap:'4px', flexWrap:'wrap' }}>
          <span style={{ background:'rgba(0,0,0,0.7)', color:colors.white, padding:'4px 8px', borderRadius:'6px', fontSize:'11px', fontWeight:'600' }}>{opLabels[property.operation_type]}</span>
          <span style={{ background:status.bg, color:status.color, padding:'4px 8px', borderRadius:'6px', fontSize:'11px', fontWeight:'600' }}>{status.label}</span>
        </div>
        {isOwner && showOwnerActions && (
          <div style={{ position:'absolute', top:'10px', right:'10px', display:'flex', gap:'4px' }}>
            <button onClick={e=>{e.stopPropagation();onEdit(property)}} style={{ background:'rgba(0,0,0,0.7)', border:'none', color:colors.white, width:'32px', height:'32px', borderRadius:'8px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>{Icons.edit}</button>
            <button onClick={e=>{e.stopPropagation();if(confirm('¿Eliminar esta propiedad?'))onDelete(property.id)}} style={{ background:'rgba(220,38,38,0.8)', border:'none', color:colors.white, width:'32px', height:'32px', borderRadius:'8px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'14px' }}>🗑</button>
          </div>
        )}
      </div>
      <div style={{ padding:'14px' }}>
        <h3 style={{ color:colors.text, fontSize:'14px', fontWeight:'600', margin:'0 0 6px', lineHeight:'1.3' }}>{property.title}</h3>
        <p style={{ color:colors.accent, fontSize:'18px', fontWeight:'700', margin:'0 0 2px' }}>$ {Number(property.price).toLocaleString('en-US')}</p>
        {priceBs && <p style={{ color:colors.textMuted, fontSize:'12px', margin:'0 0 8px' }}>{priceBs}</p>}
        <div style={{ display:'flex', alignItems:'center', gap:'4px', marginBottom:'10px', color:colors.textSecondary, fontSize:'12px' }}>{Icons.location} {property.zone}</div>
        <div style={{ display:'flex', gap:'10px', flexWrap:'wrap', marginBottom:'12px' }}>
          {property.bedrooms > 0 && <span style={{ display:'flex', alignItems:'center', gap:'3px', color:colors.textSecondary, fontSize:'12px' }}>{Icons.bed} {property.bedrooms}</span>}
          {property.bathrooms > 0 && <span style={{ display:'flex', alignItems:'center', gap:'3px', color:colors.textSecondary, fontSize:'12px' }}>{Icons.bath} {property.bathrooms}</span>}
          {property.area_m2 && <span style={{ display:'flex', alignItems:'center', gap:'3px', color:colors.textSecondary, fontSize:'12px' }}>{Icons.area} {property.area_m2}m²</span>}
          {property.parking_spots > 0 && <span style={{ display:'flex', alignItems:'center', gap:'3px', color:colors.textSecondary, fontSize:'12px' }}>{Icons.car} {property.parking_spots}</span>}
        </div>
        <div style={{ display:'flex', gap:'4px', marginBottom:'10px' }}>
          <button onClick={e=>{e.stopPropagation();const msg=`🏠 *${property.title}*%0A💰 $${Number(property.price).toLocaleString('en-US')} | ${opLabels[property.operation_type]}%0A📍 ${property.zone}${property.address?' · '+property.address:''}%0A${property.bedrooms>0?'🛏 '+property.bedrooms+' hab · ':''}${property.bathrooms>0?'🚿 '+property.bathrooms+' baños · ':''}${property.area_m2?'📐 '+property.area_m2+'m²':''}%0A%0A📞 ${agent?.full_name||''} - ${agent?.phone||''}`;window.open('https://wa.me/?text='+msg,'_blank')}} style={{ flex:1, background:'#25D366', border:'none', color:colors.white, padding:'6px 8px', borderRadius:'6px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'4px', fontSize:'11px', fontWeight:'600' }}>📤 Compartir</button>
          <button onClick={e=>{e.stopPropagation();const txt=`🏠 ${property.title}\n💰 $${Number(property.price).toLocaleString('en-US')} USD | ${opLabels[property.operation_type]}\n📍 ${property.zone}${property.address?' · '+property.address:''}\n${property.bedrooms>0?'🛏 '+property.bedrooms+' habitaciones\n':''}${property.bathrooms>0?'🚿 '+property.bathrooms+' baños\n':''}${property.area_m2?'📐 '+property.area_m2+' m²\n':''}${property.parking_spots>0?'🚗 '+property.parking_spots+' estac.\n':''}${property.common_areas?.length>0?'\n✨ Áreas: '+property.common_areas.join(', ')+'\n':''}${property.description?'\n'+property.description+'\n':''}\n📞 ${agent?.full_name||''} - ${agent?.phone||''}\n\n#Inmobiliaria #BienesRaíces #Cochabamba`;navigator.clipboard.writeText(txt).then(()=>alert('¡Copiado para redes sociales!'))}} style={{ flex:1, background:colors.accentLight, border:`1px solid rgba(108,99,255,0.3)`, color:colors.accent, padding:'6px 8px', borderRadius:'6px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'4px', fontSize:'11px', fontWeight:'600' }}>{Icons.copy} Redes</button>
        </div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 10px', background:colors.inputBg, borderRadius:'8px' }}>
          <div><span style={{ color:colors.textMuted, fontSize:'10px' }}>Agente</span><p style={{ color:colors.text, fontSize:'12px', fontWeight:'500', margin:0 }}>{agent?.full_name||'Sin asignar'} {isOwner && <span style={{ color:colors.accent, fontSize:'10px' }}>(tú)</span>}</p></div>
        </div>
      </div>
    </div>
  )
}

function FiltersPanel({ filters, setFilters, zones }) {
  const ss = { padding:'10px 12px', background:colors.inputBg, border:`1px solid ${colors.border}`, borderRadius:'10px', color:colors.text, fontSize:'13px', outline:'none', width:'100%', boxSizing:'border-box' }
  const ls = { color:colors.textSecondary, fontSize:'12px', fontWeight:'500', display:'block', marginBottom:'4px' }
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(150px, 1fr))', gap:'12px', padding:'16px', background:colors.card, borderRadius:'14px', border:`1px solid ${colors.border}`, marginBottom:'20px' }}>
      <div><label style={ls}>Tipo de transacción</label><select style={ss} value={filters.operation} onChange={e=>setFilters(f=>({...f,operation:e.target.value}))}><option value="">Todas</option><option value="venta">Venta</option><option value="alquiler">Alquiler</option><option value="anticretico">Anticrético</option><option value="preventa">Preventa</option></select></div>
      <div><label style={ls}>Tipo</label><select style={ss} value={filters.type} onChange={e=>setFilters(f=>({...f,type:e.target.value}))}><option value="">Todos</option><option value="casa">Casa</option><option value="departamento">Departamento</option><option value="terreno">Terreno</option><option value="oficina">Oficina</option><option value="local_comercial">Local</option></select></div>
      <div><label style={ls}>Zona</label><select style={ss} value={filters.zone} onChange={e=>setFilters(f=>({...f,zone:e.target.value}))}><option value="">Todas</option>{zones.map(z=><option key={z} value={z}>{z}</option>)}</select></div>
      <div><label style={ls}>Precio mín ($)</label><input type="number" style={ss} placeholder="0" value={filters.priceMin} onChange={e=>setFilters(f=>({...f,priceMin:e.target.value}))} /></div>
      <div><label style={ls}>Precio máx ($)</label><input type="number" style={ss} placeholder="Sin límite" value={filters.priceMax} onChange={e=>setFilters(f=>({...f,priceMax:e.target.value}))} /></div>
      <div><label style={ls}>Habitaciones</label><select style={ss} value={filters.bedrooms} onChange={e=>setFilters(f=>({...f,bedrooms:e.target.value}))}><option value="">Todas</option>{[1,2,3,4,5,6,7,8,9,10].map(n=><option key={n} value={n}>{n}+</option>)}</select></div>
      <div><label style={ls}>Baños</label><select style={ss} value={filters.bathrooms} onChange={e=>setFilters(f=>({...f,bathrooms:e.target.value}))}><option value="">Todos</option>{[1,2,3,4,5].map(n=><option key={n} value={n}>{n}+</option>)}</select></div>
      <div><label style={ls}>Estado</label><select style={ss} value={filters.status} onChange={e=>setFilters(f=>({...f,status:e.target.value}))}><option value="">Todos</option><option value="disponible">Disponible</option><option value="reservada">Reservada</option><option value="vendida">Vendida</option></select></div>
      <div style={{ display:'flex', alignItems:'flex-end' }}><button onClick={()=>setFilters({operation:'',type:'',zone:'',priceMin:'',priceMax:'',bedrooms:'',bathrooms:'',status:''})} style={{ padding:'10px 16px', background:colors.redBg, border:'1px solid rgba(248,113,113,0.2)', borderRadius:'10px', color:colors.red, fontSize:'13px', cursor:'pointer', width:'100%' }}>Limpiar</button></div>
    </div>
  )
}

function PropertyFormModal({ property, session, onClose, onSaved }) {
  const [form, setForm] = useState({
    title:property?.title||'', description:property?.description||'',
    operation_type:property?.operation_type||'venta', property_type:property?.property_type||'casa',
    price:property?.price||'', zone:property?.zone||'', address:property?.address||'',
    bedrooms:property?.bedrooms||0, bathrooms:property?.bathrooms||0,
    area_m2:property?.area_m2||'', parking_spots:property?.parking_spots||0,
    status:property?.status||'disponible', exchange_rate:property?.exchange_rate||'6.96',
    common_areas:property?.common_areas||[],
  })
  const [photos, setPhotos] = useState(property?.photos||[])
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef()
  const handlePhotoUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (photos.length + files.length > 5) { setError('Máximo 5 fotos'); return }
    setUploading(true); setError('')
    const np = [...photos]
    for (const file of files) {
      const fn = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g,'_')}`
      const { error:upErr } = await supabase.storage.from('property-photos').upload(fn, file)
      if (!upErr) { const { data:u } = supabase.storage.from('property-photos').getPublicUrl(fn); np.push(u.publicUrl) }
    }
    setPhotos(np); setUploading(false)
  }
  const toggleArea = (a) => setForm(f=>({...f,common_areas:f.common_areas.includes(a)?f.common_areas.filter(x=>x!==a):[...f.common_areas,a]}))
  const handleSave = async () => {
    if (!form.title||!form.price||!form.zone) { setError('Título, precio y zona son obligatorios'); return }
    setSaving(true); setError('')
    const payload = { ...form, photos, agent_id:session.user.id }
    if (property?.id) {
      const { error:err } = await supabase.from('properties').update(payload).eq('id',property.id)
      if (err) { setError('Error: '+err.message); setSaving(false); return }
    } else {
      const { error:err } = await supabase.from('properties').insert(payload)
      if (err) { setError('Error: '+err.message); setSaving(false); return }
    }
    setSaving(false); onSaved()
  }
  const is = { width:'100%', padding:'10px 14px', background:colors.inputBg, border:`1px solid ${colors.border}`, borderRadius:'10px', color:colors.text, fontSize:'14px', outline:'none', boxSizing:'border-box' }
  const ls = { color:colors.textSecondary, fontSize:'12px', fontWeight:'500', display:'block', marginBottom:'4px' }
  const nums = [0,1,2,3,4,5,6,7,8,9,10]
  return (
    <div style={{ position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.7)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000, padding:'16px' }}>
      <div style={{ background:colors.card, borderRadius:'20px', width:'100%', maxWidth:'600px', maxHeight:'90vh', overflow:'auto', border:`1px solid ${colors.border}` }}>
        <div style={{ padding:'20px 24px', borderBottom:`1px solid ${colors.border}`, display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, background:colors.card, zIndex:1, borderRadius:'20px 20px 0 0' }}>
          <h2 style={{ color:colors.text, fontSize:'18px', fontWeight:'600', margin:0 }}>{property?'Editar propiedad':'Nueva propiedad'}</h2>
          <button onClick={onClose} style={{ background:'none', border:'none', color:colors.textSecondary, cursor:'pointer' }}>{Icons.x}</button>
        </div>
        <div style={{ padding:'20px 24px' }}>
          {error && <div style={{ background:colors.redBg, color:colors.red, padding:'10px 14px', borderRadius:'10px', fontSize:'13px', marginBottom:'16px' }}>{error}</div>}
          <div style={{ marginBottom:'20px' }}>
            <label style={ls}>Fotos ({photos.length}/5)</label>
            <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', marginBottom:'8px' }}>
              {photos.map((url,i) => (
                <div key={i} style={{ width:'80px', height:'80px', borderRadius:'10px', position:'relative', background:`url(${url}) center/cover`, border:`1px solid ${colors.border}` }}>
                  <button onClick={()=>setPhotos(photos.filter((_,idx)=>idx!==i))} style={{ position:'absolute', top:'-6px', right:'-6px', width:'20px', height:'20px', background:colors.red, border:'none', borderRadius:'50%', color:colors.white, fontSize:'12px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>
                </div>
              ))}
              {photos.length < 5 && <button onClick={()=>fileRef.current?.click()} style={{ width:'80px', height:'80px', borderRadius:'10px', background:colors.inputBg, border:`2px dashed ${colors.border}`, cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', color:colors.textMuted }}>{uploading?'...':Icons.camera}<span style={{ fontSize:'10px', marginTop:'4px' }}>{uploading?'Subiendo':'Agregar'}</span></button>}
            </div>
            <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={handlePhotoUpload} />
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
            <div style={{ gridColumn:'1/-1' }}><label style={ls}>Título *</label><input style={is} value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="Ej: Casa moderna zona norte" /></div>
            <div><label style={ls}>Tipo de transacción</label><select style={is} value={form.operation_type} onChange={e=>setForm(f=>({...f,operation_type:e.target.value}))}><option value="venta">Venta</option><option value="alquiler">Alquiler</option><option value="anticretico">Anticrético</option><option value="preventa">Preventa</option></select></div>
            <div><label style={ls}>Tipo de propiedad</label><select style={is} value={form.property_type} onChange={e=>setForm(f=>({...f,property_type:e.target.value}))}><option value="casa">Casa</option><option value="departamento">Departamento</option><option value="terreno">Terreno</option><option value="oficina">Oficina</option><option value="local_comercial">Local comercial</option><option value="otro">Otro</option></select></div>
            <div><label style={ls}>Precio (USD) *</label><input type="number" style={is} value={form.price} onChange={e=>setForm(f=>({...f,price:e.target.value}))} placeholder="150000" /></div>
            <div><label style={ls}>Tipo de cambio (1 USD = Bs)</label><input type="number" step="0.01" style={is} value={form.exchange_rate} onChange={e=>setForm(f=>({...f,exchange_rate:e.target.value}))} placeholder="6.96" /></div>
            {form.price && form.exchange_rate && <div style={{ gridColumn:'1/-1', background:colors.accentLight, padding:'8px 12px', borderRadius:'8px', color:colors.accent, fontSize:'13px', fontWeight:'600' }}>Equivalente: Bs {Math.round(Number(form.price)*Number(form.exchange_rate)).toLocaleString('es-BO')}</div>}
            <div><label style={ls}>Zona *</label><input style={is} value={form.zone} onChange={e=>setForm(f=>({...f,zone:e.target.value}))} placeholder="Ej: Zona Norte" /></div>
            <div><label style={ls}>Dirección</label><input style={is} value={form.address} onChange={e=>setForm(f=>({...f,address:e.target.value}))} placeholder="Ej: Av. América #1234" /></div>
            <div><label style={ls}>Habitaciones</label><select style={is} value={form.bedrooms} onChange={e=>setForm(f=>({...f,bedrooms:parseInt(e.target.value)}))}>{nums.map(n=><option key={n} value={n}>{n}</option>)}</select></div>
            <div><label style={ls}>Baños</label><select style={is} value={form.bathrooms} onChange={e=>setForm(f=>({...f,bathrooms:parseInt(e.target.value)}))}>{nums.map(n=><option key={n} value={n}>{n}</option>)}</select></div>
            <div><label style={ls}>Área (m²)</label><input type="number" style={is} value={form.area_m2} onChange={e=>setForm(f=>({...f,area_m2:e.target.value}))} placeholder="120" /></div>
            <div><label style={ls}>Estacionamientos</label><select style={is} value={form.parking_spots} onChange={e=>setForm(f=>({...f,parking_spots:parseInt(e.target.value)}))}>{nums.map(n=><option key={n} value={n}>{n}</option>)}</select></div>
            <div><label style={ls}>Estado</label><select style={is} value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}><option value="disponible">Disponible</option><option value="reservada">Reservada</option><option value="vendida">Vendida</option><option value="inactiva">Inactiva</option></select></div>
          </div>
          <div style={{ marginTop:'16px' }}>
            <label style={ls}>Áreas comunes</label>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'6px', marginTop:'8px' }}>
              {COMMON_AREAS.map(a=>(
                <button key={a} onClick={()=>toggleArea(a)} style={{ padding:'8px 12px', borderRadius:'8px', border:`1px solid ${form.common_areas.includes(a)?colors.accent:colors.border}`, background:form.common_areas.includes(a)?colors.accentLight:colors.inputBg, color:form.common_areas.includes(a)?colors.accent:colors.textSecondary, fontSize:'12px', cursor:'pointer', textAlign:'left', display:'flex', alignItems:'center', gap:'6px' }}>
                  <span style={{ width:'16px', height:'16px', borderRadius:'4px', border:`2px solid ${form.common_areas.includes(a)?colors.accent:colors.border}`, background:form.common_areas.includes(a)?colors.accent:'transparent', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'10px', color:colors.white, flexShrink:0 }}>{form.common_areas.includes(a)?'✓':''}</span>{a}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginTop:'16px' }}><label style={ls}>Descripción</label><textarea style={{ ...is, minHeight:'80px', resize:'vertical' }} value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} placeholder="Describe la propiedad..." /></div>
          <button onClick={handleSave} disabled={saving} style={{ width:'100%', padding:'14px', marginTop:'20px', background:saving?colors.textMuted:`linear-gradient(135deg, ${colors.accent}, #8B5CF6)`, color:colors.white, border:'none', borderRadius:'10px', fontSize:'15px', fontWeight:'600', cursor:saving?'not-allowed':'pointer' }}>{saving?'Guardando...':property?'Guardar cambios':'Crear propiedad'}</button>
        </div>
      </div>
    </div>
  )
}

function PropertyDetail({ property, agents, onClose, onBrochure }) {
  const agent = agents.find(a => a.id === property.agent_id)
  const [currentPhoto, setCurrentPhoto] = useState(0)
  const photos = property.photos || []
  const priceBs = property.exchange_rate ? `Bs ${Math.round(Number(property.price)*Number(property.exchange_rate)).toLocaleString('es-BO')}` : ''
  return (
    <div style={{ position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.7)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000, padding:'16px' }}>
      <div style={{ background:colors.card, borderRadius:'20px', width:'100%', maxWidth:'700px', maxHeight:'90vh', overflow:'auto', border:`1px solid ${colors.border}` }}>
        <div style={{ position:'relative', height:'300px', background:'#111' }}>
          {photos.length > 0 ? <img src={photos[currentPhoto]} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} /> : <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'60px' }}>🏠</div>}
          <button onClick={onClose} style={{ position:'absolute', top:'16px', right:'16px', width:'36px', height:'36px', background:'rgba(0,0,0,0.6)', border:'none', borderRadius:'50%', color:colors.white, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>{Icons.x}</button>
          {photos.length > 1 && <div style={{ position:'absolute', bottom:'12px', left:'50%', transform:'translateX(-50%)', display:'flex', gap:'6px' }}>{photos.map((_,i)=><button key={i} onClick={()=>setCurrentPhoto(i)} style={{ width:'8px', height:'8px', borderRadius:'50%', border:'none', cursor:'pointer', background:i===currentPhoto?colors.accent:'rgba(255,255,255,0.4)' }} />)}</div>}
        </div>
        <div style={{ padding:'24px' }}>
          <span style={{ color:colors.accent, fontSize:'12px', fontWeight:'600', textTransform:'uppercase' }}>{opLabels[property.operation_type]} · {typeLabels[property.property_type]}</span>
          <h2 style={{ color:colors.text, fontSize:'22px', fontWeight:'700', margin:'4px 0' }}>{property.title}</h2>
          <p style={{ color:colors.textSecondary, fontSize:'14px', margin:'0 0 8px', display:'flex', alignItems:'center', gap:'4px' }}>{Icons.location} {property.zone}{property.address?` · ${property.address}`:''}</p>
          <p style={{ color:colors.accent, fontSize:'26px', fontWeight:'700', margin:'0' }}>$ {Number(property.price).toLocaleString('en-US')}</p>
          {priceBs && <p style={{ color:colors.textMuted, fontSize:'14px', margin:'2px 0 20px' }}>{priceBs} (TC: {property.exchange_rate})</p>}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'12px', margin:'0 0 20px', padding:'16px', background:colors.inputBg, borderRadius:'12px' }}>
            {[{icon:Icons.bed,val:property.bedrooms,label:'Habit.'},{icon:Icons.bath,val:property.bathrooms,label:'Baños'},{icon:Icons.area,val:property.area_m2||'-',label:'m²'},{icon:Icons.car,val:property.parking_spots,label:'Estac.'}].map((f,i)=>(
              <div key={i} style={{ textAlign:'center' }}><div style={{ color:colors.textMuted, marginBottom:'4px' }}>{f.icon}</div><p style={{ color:colors.text, fontSize:'16px', fontWeight:'600', margin:0 }}>{f.val}</p><p style={{ color:colors.textMuted, fontSize:'11px', margin:0 }}>{f.label}</p></div>
            ))}
          </div>
          {property.common_areas?.length > 0 && <div style={{ marginBottom:'20px' }}><h4 style={{ color:colors.textSecondary, fontSize:'12px', fontWeight:'600', textTransform:'uppercase', marginBottom:'8px' }}>Áreas comunes</h4><div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>{property.common_areas.map(a=><span key={a} style={{ padding:'4px 10px', background:colors.greenBg, color:colors.green, borderRadius:'6px', fontSize:'12px', fontWeight:'500' }}>✓ {a}</span>)}</div></div>}
          {property.description && <div style={{ marginBottom:'20px' }}><h4 style={{ color:colors.textSecondary, fontSize:'12px', fontWeight:'600', textTransform:'uppercase', marginBottom:'8px' }}>Descripción</h4><p style={{ color:colors.text, fontSize:'14px', lineHeight:'1.6', margin:0 }}>{property.description}</p></div>}
          <div style={{ padding:'16px', background:colors.accentLight, borderRadius:'12px', border:'1px solid rgba(108,99,255,0.2)', marginBottom:'20px' }}>
            <span style={{ color:colors.textMuted, fontSize:'12px' }}>Agente</span>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'6px' }}>
              <p style={{ color:colors.text, fontSize:'16px', fontWeight:'600', margin:0 }}>{agent?.full_name||'Sin asignar'}</p>
              {agent?.phone && <a href={`https://wa.me/591${agent.phone.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" style={{ display:'flex', alignItems:'center', gap:'6px', padding:'8px 16px', background:'#25D366', color:colors.white, borderRadius:'8px', textDecoration:'none', fontSize:'13px', fontWeight:'600' }}>{Icons.phone} WhatsApp</a>}
            </div>
          </div>
          <button onClick={()=>onBrochure(property)} style={{ width:'100%', padding:'14px', background:`linear-gradient(135deg, ${colors.accent}, #8B5CF6)`, color:colors.white, border:'none', borderRadius:'10px', fontSize:'15px', fontWeight:'600', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px' }}>{Icons.file} Generar Brochure</button>
        </div>
      </div>
    </div>
  )
}

function BulkUploadModal({ session, onClose, onSaved }) {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState([])
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const fileRef = useRef()
  const downloadTemplate = () => {
    const h = 'titulo,transaccion,tipo,precio_usd,tipo_cambio,zona,direccion,habitaciones,banos,area_m2,estacionamientos,areas_comunes'
    const e1 = 'Casa moderna,venta,casa,150000,6.96,Zona Norte,Av. América #1234,3,2,120,1,Piscina|Jardín|Parrillero/BBQ'
    const e2 = 'Depto centro,alquiler,departamento,500,6.96,Centro,Calle Bolívar #567,2,1,85,0,Gimnasio|Lavandería común'
    const e3 = 'Terreno Tiquipaya,venta,terreno,95000,6.96,Tiquipaya,Km 8,0,0,300,0,'
    const csv = [h,e1,e2,e3].join('\n')
    const blob = new Blob(['\ufeff'+csv], { type:'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href=url; a.download='plantilla_propiedades.csv'; a.click()
    URL.revokeObjectURL(url)
  }
  const parseCSV = (text) => {
    const lines = text.split('\n').map(l=>l.trim()).filter(l=>l)
    if (lines.length < 2) return []
    const rows = []
    for (let i=1;i<lines.length;i++) {
      const v = lines[i].split(',').map(x=>x.trim())
      if (v.length<4) continue
      const om = {venta:'venta',alquiler:'alquiler',anticretico:'anticretico','anticrético':'anticretico',preventa:'preventa'}
      const tm = {casa:'casa',departamento:'departamento',depto:'departamento',terreno:'terreno',oficina:'oficina',local:'local_comercial',otro:'otro'}
      rows.push({ title:v[0]||'', operation_type:om[(v[1]||'').toLowerCase()]||'venta', property_type:tm[(v[2]||'').toLowerCase()]||'casa', price:parseFloat(v[3])||0, exchange_rate:parseFloat(v[4])||6.96, zone:v[5]||'', address:v[6]||'', bedrooms:parseInt(v[7])||0, bathrooms:parseInt(v[8])||0, area_m2:parseFloat(v[9])||null, parking_spots:parseInt(v[10])||0, common_areas:v[11]?v[11].split('|').map(a=>a.trim()).filter(a=>a):[], status:'disponible', agent_id:session.user.id, photos:[] })
    }
    return rows
  }
  const parseXLSX = async (buf) => {
    try {
      const XLSX = await import('xlsx')
      const wb = XLSX.read(buf,{type:'array'})
      const json = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]],{defval:''})
      return json.map(row=>{
        const g=(ks)=>{for(const k of ks){if(row[k]!==undefined&&row[k]!=='')return String(row[k])}return''}
        const om={venta:'venta',alquiler:'alquiler',anticretico:'anticretico','anticrético':'anticretico',preventa:'preventa'}
        const tm={casa:'casa',departamento:'departamento',depto:'departamento',terreno:'terreno',oficina:'oficina',local:'local_comercial',otro:'otro'}
        const ar=g(['areas_comunes','Areas_comunes','AREAS_COMUNES'])
        return { title:g(['titulo','Titulo','TITULO','título','title']), operation_type:om[g(['transaccion','Transaccion','operacion','Operacion']).toLowerCase()]||'venta', property_type:tm[g(['tipo','Tipo','TIPO']).toLowerCase()]||'casa', price:parseFloat(g(['precio_usd','Precio_usd','precio','Precio']))||0, exchange_rate:parseFloat(g(['tipo_cambio','Tipo_cambio']))||6.96, zone:g(['zona','Zona']), address:g(['direccion','Direccion','dirección']), bedrooms:parseInt(g(['habitaciones','Habitaciones']))||0, bathrooms:parseInt(g(['banos','Banos','baños','Baños']))||0, area_m2:parseFloat(g(['area_m2','Area','area']))||null, parking_spots:parseInt(g(['estacionamientos','Estacionamientos']))||0, common_areas:ar?ar.split('|').map(a=>a.trim()).filter(a=>a):[], status:'disponible', agent_id:session.user.id, photos:[] }
      }).filter(r=>r.title&&r.price>0)
    } catch(e) { setError('Error al leer Excel.'); return [] }
  }
  const handleFile = async (e) => {
    const f=e.target.files[0]; if(!f)return; setFile(f); setError(''); setPreview([])
    if(f.name.endsWith('.csv')||f.name.endsWith('.txt')){setPreview(parseCSV(await f.text()))}
    else if(f.name.endsWith('.xlsx')||f.name.endsWith('.xls')){setPreview(await parseXLSX(await f.arrayBuffer()))}
    else{setError('Usa .xlsx o .csv')}
  }
  const handleUpload = async () => {
    if(!preview.length) return; setUploading(true); setError('')
    const {error:err}=await supabase.from('properties').insert(preview)
    if(err){setError('Error: '+err.message)}else{setSuccess(`${preview.length} propiedades subidas`);setTimeout(()=>onSaved(),1500)}
    setUploading(false)
  }
  return (
    <div style={{ position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.7)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000, padding:'16px' }}>
      <div style={{ background:colors.card, borderRadius:'20px', width:'100%', maxWidth:'650px', maxHeight:'90vh', overflow:'auto', border:`1px solid ${colors.border}` }}>
        <div style={{ padding:'20px 24px', borderBottom:`1px solid ${colors.border}`, display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, background:colors.card, zIndex:1, borderRadius:'20px 20px 0 0' }}>
          <h2 style={{ color:colors.text, fontSize:'18px', fontWeight:'600', margin:0 }}>Carga masiva</h2>
          <button onClick={onClose} style={{ background:'none', border:'none', color:colors.textSecondary, cursor:'pointer' }}>{Icons.x}</button>
        </div>
        <div style={{ padding:'20px 24px' }}>
          {error && <div style={{ background:colors.redBg, color:colors.red, padding:'10px 14px', borderRadius:'10px', fontSize:'13px', marginBottom:'16px' }}>{error}</div>}
          {success && <div style={{ background:colors.greenBg, color:colors.green, padding:'10px 14px', borderRadius:'10px', fontSize:'13px', marginBottom:'16px' }}>{success}</div>}
          <div style={{ marginBottom:'20px', padding:'16px', background:colors.inputBg, borderRadius:'12px', border:`1px solid ${colors.border}` }}>
            <p style={{ color:colors.text, fontSize:'14px', fontWeight:'600', margin:'0 0 8px' }}>Paso 1: Descarga plantilla</p>
            <p style={{ color:colors.textSecondary, fontSize:'13px', margin:'0 0 12px' }}>Incluye precio USD, tipo de cambio y áreas comunes.</p>
            <button onClick={downloadTemplate} style={{ padding:'10px 16px', borderRadius:'8px', border:`1px solid ${colors.accent}`, background:'transparent', color:colors.accent, cursor:'pointer', display:'flex', alignItems:'center', gap:'6px', fontSize:'13px', fontWeight:'600' }}>{Icons.download} Descargar CSV</button>
          </div>
          <div style={{ marginBottom:'20px', padding:'16px', background:colors.inputBg, borderRadius:'12px', border:`1px solid ${colors.border}` }}>
            <p style={{ color:colors.text, fontSize:'14px', fontWeight:'600', margin:'0 0 12px' }}>Paso 2: Sube tu archivo</p>
            <button onClick={()=>fileRef.current?.click()} style={{ padding:'10px 16px', borderRadius:'8px', border:'none', background:`linear-gradient(135deg, ${colors.accent}, #8B5CF6)`, color:colors.white, cursor:'pointer', display:'flex', alignItems:'center', gap:'6px', fontSize:'13px', fontWeight:'600' }}>{Icons.upload} {file?file.name:'Seleccionar archivo'}</button>
            <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" hidden onChange={handleFile} />
          </div>
          {preview.length>0 && <div>
            <p style={{ color:colors.text, fontSize:'14px', fontWeight:'600', margin:'0 0 12px' }}>Paso 3: Confirma ({preview.length} propiedades)</p>
            <div style={{ maxHeight:'250px', overflow:'auto', borderRadius:'10px', border:`1px solid ${colors.border}` }}>{preview.map((p,i)=>(
              <div key={i} style={{ padding:'10px 14px', borderBottom:i<preview.length-1?`1px solid ${colors.border}`:'none', background:i%2===0?colors.inputBg:colors.card }}>
                <div style={{ display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:'4px' }}><span style={{ color:colors.text, fontSize:'13px', fontWeight:'600' }}>{p.title}</span><span style={{ color:colors.accent, fontSize:'13px', fontWeight:'700' }}>$ {Number(p.price).toLocaleString('en-US')}</span></div>
                <div style={{ color:colors.textMuted, fontSize:'11px', marginTop:'4px' }}>{opLabels[p.operation_type]} · {typeLabels[p.property_type]} · {p.zone}</div>
              </div>
            ))}</div>
            <button onClick={handleUpload} disabled={uploading} style={{ width:'100%', padding:'14px', marginTop:'16px', background:uploading?colors.textMuted:colors.green, color:colors.white, border:'none', borderRadius:'10px', fontSize:'15px', fontWeight:'600', cursor:uploading?'not-allowed':'pointer' }}>{uploading?'Subiendo...':`Subir ${preview.length} propiedades`}</button>
          </div>}
        </div>
      </div>
    </div>
  )
}

function ToolsScreen() {
  const [activeTool, setActiveTool] = useState('evaluador')
  const is = { width:'100%', padding:'12px 16px', background:colors.inputBg, border:`1px solid ${colors.border}`, borderRadius:'10px', color:colors.text, fontSize:'16px', outline:'none', boxSizing:'border-box' }
  const ls = { color:colors.textSecondary, fontSize:'13px', display:'block', marginBottom:'6px' }
  // Evaluador
  const [pv, setPv] = useState(''); const [cb, setCb] = useState(''); const [evResult, setEvResult] = useState(null)
  const evaluate = () => { if(!pv||!cb)return; const v=parseFloat(pv),b=parseFloat(cb),min=v*0.20; setEvResult({isApt:b>=min,min,pct:((b/v)*100).toFixed(1),missing:b>=min?0:min-b}) }
  // Cuota mensual
  const [lnPrice, setLnPrice] = useState(''); const [lnDown, setLnDown] = useState(''); const [lnRate, setLnRate] = useState(''); const [lnYears, setLnYears] = useState(''); const [lnResult, setLnResult] = useState(null)
  const calcLoan = () => { if(!lnPrice||!lnDown||!lnRate||!lnYears)return; const p=parseFloat(lnPrice)-parseFloat(lnDown),r=parseFloat(lnRate)/100/12,n=parseInt(lnYears)*12; if(r===0){setLnResult({monthly:p/n,total:p,interest:0});return}; const m=p*(r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1); setLnResult({monthly:m,total:m*n,interest:(m*n)-p}) }
  // Comisión
  const [comPrice, setComPrice] = useState(''); const [comPct, setComPct] = useState('3'); const [comResult, setComResult] = useState(null)
  const calcCom = () => { if(!comPrice||!comPct)return; const c=parseFloat(comPrice)*parseFloat(comPct)/100; setComResult({amount:c,pct:comPct}) }
  // Conversor
  const [convUsd, setConvUsd] = useState(''); const [convTc, setConvTc] = useState('6.96'); const [convDir, setConvDir] = useState('usd2bs')
  const convResult = convUsd&&convTc ? (convDir==='usd2bs' ? parseFloat(convUsd)*parseFloat(convTc) : parseFloat(convUsd)/parseFloat(convTc)) : null
  // Precio m2
  const [m2Price, setM2Price] = useState(''); const [m2Area, setM2Area] = useState('')
  const m2Result = m2Price&&m2Area ? parseFloat(m2Price)/parseFloat(m2Area) : null

  const tools = [{id:'evaluador',label:'Evaluador',icon:'🎯'},{id:'cuota',label:'Cuota mensual',icon:'📊'},{id:'comision',label:'Comisión',icon:'💰'},{id:'conversor',label:'USD ↔ Bs',icon:'💱'},{id:'m2',label:'Precio/m²',icon:'📐'}]

  return (
    <div style={{ maxWidth:'500px', margin:'0 auto' }}>
      <h1 style={{ color:colors.text, fontSize:'20px', fontWeight:'700', margin:'0 0 16px' }}>Herramientas Ágiles</h1>
      <div style={{ display:'flex', gap:'6px', flexWrap:'wrap', marginBottom:'16px' }}>
        {tools.map(t=><button key={t.id} onClick={()=>setActiveTool(t.id)} style={{ padding:'8px 12px', borderRadius:'10px', border:`1px solid ${activeTool===t.id?colors.accent:colors.border}`, background:activeTool===t.id?colors.accentLight:colors.card, color:activeTool===t.id?colors.accent:colors.textSecondary, fontSize:'12px', fontWeight:'600', cursor:'pointer' }}>{t.icon} {t.label}</button>)}
      </div>

      {activeTool==='evaluador' && <div style={{ background:colors.card, borderRadius:'16px', border:`1px solid ${colors.border}`, padding:'24px' }}>
        <h3 style={{ color:colors.text, fontSize:'16px', fontWeight:'600', margin:'0 0 4px' }}>Evaluador de Cliente</h3>
        <p style={{ color:colors.textSecondary, fontSize:'13px', margin:'0 0 20px' }}>¿Tu cliente puede adquirir la propiedad? Necesita al menos el 20% del valor total.</p>
        <div style={{ marginBottom:'16px' }}><label style={ls}>Valor de la propiedad (USD)</label><input type="number" style={is} value={pv} onChange={e=>{setPv(e.target.value);setEvResult(null)}} placeholder="Ej: 150000" /></div>
        <div style={{ marginBottom:'20px' }}><label style={ls}>Capital disponible del cliente (USD)</label><input type="number" style={is} value={cb} onChange={e=>{setCb(e.target.value);setEvResult(null)}} placeholder="Ej: 30000" /></div>
        <button onClick={evaluate} style={{ width:'100%', padding:'14px', background:`linear-gradient(135deg, ${colors.accent}, #8B5CF6)`, color:colors.white, border:'none', borderRadius:'10px', fontSize:'15px', fontWeight:'600', cursor:'pointer' }}>Evaluar</button>
        {evResult && <div style={{ marginTop:'20px', padding:'20px', borderRadius:'12px', background:evResult.isApt?colors.greenBg:colors.redBg, border:`1px solid ${evResult.isApt?'rgba(52,211,153,0.3)':'rgba(248,113,113,0.3)'}` }}>
          <div style={{ textAlign:'center', marginBottom:'12px' }}><span style={{ fontSize:'40px' }}>{evResult.isApt?'✅':'❌'}</span><h3 style={{ color:evResult.isApt?colors.green:colors.red, fontSize:'18px', fontWeight:'700', margin:'8px 0 0' }}>{evResult.isApt?'CLIENTE APTO':'CLIENTE NO APTO'}</h3></div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginTop:'12px' }}>
            <div style={{ textAlign:'center', padding:'12px', background:'rgba(0,0,0,0.2)', borderRadius:'8px' }}><p style={{ color:colors.textMuted, fontSize:'11px', margin:'0 0 4px' }}>Mínimo requerido (20%)</p><p style={{ color:colors.text, fontSize:'16px', fontWeight:'700', margin:0 }}>$ {evResult.min.toLocaleString('en-US')}</p></div>
            <div style={{ textAlign:'center', padding:'12px', background:'rgba(0,0,0,0.2)', borderRadius:'8px' }}><p style={{ color:colors.textMuted, fontSize:'11px', margin:'0 0 4px' }}>Capital del cliente</p><p style={{ color:colors.text, fontSize:'16px', fontWeight:'700', margin:0 }}>{evResult.pct}%</p></div>
          </div>
          {!evResult.isApt && <p style={{ color:colors.red, fontSize:'13px', textAlign:'center', margin:'12px 0 0' }}>Le faltan $ {evResult.missing.toLocaleString('en-US')} para alcanzar el 20%</p>}
        </div>}
      </div>}

      {activeTool==='cuota' && <div style={{ background:colors.card, borderRadius:'16px', border:`1px solid ${colors.border}`, padding:'24px' }}>
        <h3 style={{ color:colors.text, fontSize:'16px', fontWeight:'600', margin:'0 0 4px' }}>Calculadora de Cuota Mensual</h3>
        <p style={{ color:colors.textSecondary, fontSize:'13px', margin:'0 0 20px' }}>Simula el crédito hipotecario de tu cliente.</p>
        <div style={{ marginBottom:'12px' }}><label style={ls}>Precio de la propiedad (USD)</label><input type="number" style={is} value={lnPrice} onChange={e=>{setLnPrice(e.target.value);setLnResult(null)}} placeholder="150000" /></div>
        <div style={{ marginBottom:'12px' }}><label style={ls}>Enganche / Pie (USD)</label><input type="number" style={is} value={lnDown} onChange={e=>{setLnDown(e.target.value);setLnResult(null)}} placeholder="30000" /></div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'20px' }}>
          <div><label style={ls}>Tasa anual (%)</label><input type="number" step="0.1" style={is} value={lnRate} onChange={e=>{setLnRate(e.target.value);setLnResult(null)}} placeholder="7.5" /></div>
          <div><label style={ls}>Plazo (años)</label><input type="number" style={is} value={lnYears} onChange={e=>{setLnYears(e.target.value);setLnResult(null)}} placeholder="20" /></div>
        </div>
        <button onClick={calcLoan} style={{ width:'100%', padding:'14px', background:`linear-gradient(135deg, ${colors.accent}, #8B5CF6)`, color:colors.white, border:'none', borderRadius:'10px', fontSize:'15px', fontWeight:'600', cursor:'pointer' }}>Calcular</button>
        {lnResult && <div style={{ marginTop:'20px', padding:'20px', borderRadius:'12px', background:colors.greenBg, border:'1px solid rgba(52,211,153,0.3)' }}>
          <div style={{ textAlign:'center', marginBottom:'16px' }}><p style={{ color:colors.textMuted, fontSize:'12px', margin:'0 0 4px' }}>Cuota mensual estimada</p><p style={{ color:colors.green, fontSize:'28px', fontWeight:'700', margin:0 }}>$ {lnResult.monthly.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g,',')}</p></div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
            <div style={{ textAlign:'center', padding:'12px', background:'rgba(0,0,0,0.2)', borderRadius:'8px' }}><p style={{ color:colors.textMuted, fontSize:'11px', margin:'0 0 4px' }}>Total a pagar</p><p style={{ color:colors.text, fontSize:'14px', fontWeight:'700', margin:0 }}>$ {lnResult.total.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,',')}</p></div>
            <div style={{ textAlign:'center', padding:'12px', background:'rgba(0,0,0,0.2)', borderRadius:'8px' }}><p style={{ color:colors.textMuted, fontSize:'11px', margin:'0 0 4px' }}>Total intereses</p><p style={{ color:colors.yellow, fontSize:'14px', fontWeight:'700', margin:0 }}>$ {lnResult.interest.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,',')}</p></div>
          </div>
        </div>}
      </div>}

      {activeTool==='comision' && <div style={{ background:colors.card, borderRadius:'16px', border:`1px solid ${colors.border}`, padding:'24px' }}>
        <h3 style={{ color:colors.text, fontSize:'16px', fontWeight:'600', margin:'0 0 4px' }}>Calculadora de Comisión</h3>
        <p style={{ color:colors.textSecondary, fontSize:'13px', margin:'0 0 20px' }}>Calcula tu comisión por la venta.</p>
        <div style={{ marginBottom:'12px' }}><label style={ls}>Precio de venta (USD)</label><input type="number" style={is} value={comPrice} onChange={e=>{setComPrice(e.target.value);setComResult(null)}} placeholder="150000" /></div>
        <div style={{ marginBottom:'20px' }}><label style={ls}>Porcentaje de comisión (%)</label><input type="number" step="0.5" style={is} value={comPct} onChange={e=>{setComPct(e.target.value);setComResult(null)}} placeholder="3" /></div>
        <button onClick={calcCom} style={{ width:'100%', padding:'14px', background:`linear-gradient(135deg, ${colors.accent}, #8B5CF6)`, color:colors.white, border:'none', borderRadius:'10px', fontSize:'15px', fontWeight:'600', cursor:'pointer' }}>Calcular</button>
        {comResult && <div style={{ marginTop:'20px', padding:'20px', borderRadius:'12px', background:colors.greenBg, border:'1px solid rgba(52,211,153,0.3)', textAlign:'center' }}>
          <p style={{ color:colors.textMuted, fontSize:'12px', margin:'0 0 4px' }}>Tu comisión ({comResult.pct}%)</p>
          <p style={{ color:colors.green, fontSize:'28px', fontWeight:'700', margin:0 }}>$ {comResult.amount.toLocaleString('en-US')}</p>
        </div>}
      </div>}

      {activeTool==='conversor' && <div style={{ background:colors.card, borderRadius:'16px', border:`1px solid ${colors.border}`, padding:'24px' }}>
        <h3 style={{ color:colors.text, fontSize:'16px', fontWeight:'600', margin:'0 0 4px' }}>Conversor USD ↔ Bs</h3>
        <p style={{ color:colors.textSecondary, fontSize:'13px', margin:'0 0 20px' }}>Conversión rápida entre dólares y bolivianos.</p>
        <div style={{ display:'flex', marginBottom:'16px', background:colors.inputBg, borderRadius:'10px', border:`1px solid ${colors.border}`, padding:'4px' }}>
          <button onClick={()=>setConvDir('usd2bs')} style={{ flex:1, padding:'8px', borderRadius:'8px', border:'none', cursor:'pointer', background:convDir==='usd2bs'?colors.accent:'transparent', color:convDir==='usd2bs'?colors.white:colors.textSecondary, fontSize:'13px', fontWeight:'600' }}>USD → Bs</button>
          <button onClick={()=>setConvDir('bs2usd')} style={{ flex:1, padding:'8px', borderRadius:'8px', border:'none', cursor:'pointer', background:convDir==='bs2usd'?colors.accent:'transparent', color:convDir==='bs2usd'?colors.white:colors.textSecondary, fontSize:'13px', fontWeight:'600' }}>Bs → USD</button>
        </div>
        <div style={{ marginBottom:'12px' }}><label style={ls}>{convDir==='usd2bs'?'Monto en USD':'Monto en Bs'}</label><input type="number" style={is} value={convUsd} onChange={e=>setConvUsd(e.target.value)} placeholder={convDir==='usd2bs'?'Ej: 1000':'Ej: 6960'} /></div>
        <div style={{ marginBottom:'16px' }}><label style={ls}>Tipo de cambio</label><input type="number" step="0.01" style={is} value={convTc} onChange={e=>setConvTc(e.target.value)} /></div>
        {convResult!==null && <div style={{ padding:'20px', borderRadius:'12px', background:colors.accentLight, border:'1px solid rgba(108,99,255,0.3)', textAlign:'center' }}>
          <p style={{ color:colors.textMuted, fontSize:'12px', margin:'0 0 4px' }}>{convDir==='usd2bs'?'Equivalente en Bs':'Equivalente en USD'}</p>
          <p style={{ color:colors.accent, fontSize:'28px', fontWeight:'700', margin:0 }}>{convDir==='usd2bs'?'Bs':'$'} {convResult.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g,',')}</p>
        </div>}
      </div>}

      {activeTool==='m2' && <div style={{ background:colors.card, borderRadius:'16px', border:`1px solid ${colors.border}`, padding:'24px' }}>
        <h3 style={{ color:colors.text, fontSize:'16px', fontWeight:'600', margin:'0 0 4px' }}>Precio por m²</h3>
        <p style={{ color:colors.textSecondary, fontSize:'13px', margin:'0 0 20px' }}>Compara el valor real entre propiedades.</p>
        <div style={{ marginBottom:'12px' }}><label style={ls}>Precio de la propiedad (USD)</label><input type="number" style={is} value={m2Price} onChange={e=>setM2Price(e.target.value)} placeholder="150000" /></div>
        <div style={{ marginBottom:'16px' }}><label style={ls}>Superficie (m²)</label><input type="number" style={is} value={m2Area} onChange={e=>setM2Area(e.target.value)} placeholder="120" /></div>
        {m2Result!==null && <div style={{ padding:'20px', borderRadius:'12px', background:colors.accentLight, border:'1px solid rgba(108,99,255,0.3)', textAlign:'center' }}>
          <p style={{ color:colors.textMuted, fontSize:'12px', margin:'0 0 4px' }}>Precio por metro cuadrado</p>
          <p style={{ color:colors.accent, fontSize:'28px', fontWeight:'700', margin:0 }}>$ {m2Result.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g,',')} /m²</p>
        </div>}
      </div>}
    </div>
  )
}

function ProfileScreen({ session, currentUser, onSaved }) {
  const [form, setForm] = useState({ full_name:currentUser?.full_name||'', phone:currentUser?.phone||'', email:currentUser?.email||session.user?.email||'' })
  const [avatarUrl, setAvatarUrl] = useState(currentUser?.avatar_url||'')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const fileRef = useRef()
  const handleAvatarUpload = async (e) => {
    const file=e.target.files[0]; if(!file) return; setUploading(true); setError('')
    const fn=`avatar_${session.user.id}_${Date.now()}`
    const {error:upErr}=await supabase.storage.from('property-photos').upload(fn,file)
    if(!upErr){const{data:u}=supabase.storage.from('property-photos').getPublicUrl(fn);setAvatarUrl(u.publicUrl)}
    else{setError('Error: '+upErr.message)}
    setUploading(false)
  }
  const handleSave = async () => {
    if(!form.full_name){setError('Nombre obligatorio');return}
    setSaving(true);setError('');setSuccess('')
    const{error:err}=await supabase.from('profiles').update({full_name:form.full_name,phone:form.phone,email:form.email,avatar_url:avatarUrl}).eq('id',session.user.id)
    if(err){setError('Error: '+err.message)}else{setSuccess('Perfil actualizado');onSaved()}
    setSaving(false)
  }
  const is = { width:'100%', padding:'12px 16px', background:colors.inputBg, border:`1px solid ${colors.border}`, borderRadius:'10px', color:colors.text, fontSize:'14px', outline:'none', boxSizing:'border-box' }
  return (
    <div style={{ maxWidth:'500px', margin:'0 auto' }}>
      <h1 style={{ color:colors.text, fontSize:'24px', fontWeight:'700', margin:'0 0 24px' }}>Mi Perfil</h1>
      <div style={{ background:colors.card, borderRadius:'16px', border:`1px solid ${colors.border}`, padding:'24px' }}>
        {error && <div style={{ background:colors.redBg, color:colors.red, padding:'10px 14px', borderRadius:'10px', fontSize:'13px', marginBottom:'16px' }}>{error}</div>}
        {success && <div style={{ background:colors.greenBg, color:colors.green, padding:'10px 14px', borderRadius:'10px', fontSize:'13px', marginBottom:'16px' }}>{success}</div>}
        <div style={{ textAlign:'center', marginBottom:'24px' }}>
          <div onClick={()=>fileRef.current?.click()} style={{ width:'100px', height:'100px', borderRadius:'50%', margin:'0 auto 12px', cursor:'pointer', background:avatarUrl?`url(${avatarUrl}) center/cover`:`linear-gradient(135deg, ${colors.accent}, #8B5CF6)`, display:'flex', alignItems:'center', justifyContent:'center', border:`3px solid ${colors.border}`, position:'relative' }}>
            {!avatarUrl && <span style={{ color:colors.white, fontSize:'36px', fontWeight:'700' }}>{form.full_name?form.full_name[0].toUpperCase():'?'}</span>}
            <div style={{ position:'absolute', bottom:0, right:0, width:'28px', height:'28px', background:colors.accent, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', border:`2px solid ${colors.card}` }}>{Icons.camera}</div>
          </div>
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleAvatarUpload} />
          <p style={{ color:colors.textMuted, fontSize:'12px', margin:0 }}>{uploading?'Subiendo...':'Toca para cambiar foto'}</p>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
          <div><label style={{ color:colors.textSecondary, fontSize:'13px', display:'block', marginBottom:'6px' }}>Nombre completo *</label><input style={is} value={form.full_name} onChange={e=>setForm(f=>({...f,full_name:e.target.value}))} /></div>
          <div><label style={{ color:colors.textSecondary, fontSize:'13px', display:'block', marginBottom:'6px' }}>Teléfono</label><input type="tel" style={is} value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} /></div>
          <div><label style={{ color:colors.textSecondary, fontSize:'13px', display:'block', marginBottom:'6px' }}>Correo</label><input type="email" style={is} value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} /></div>
          <button onClick={handleSave} disabled={saving} style={{ width:'100%', padding:'14px', marginTop:'8px', background:saving?colors.textMuted:`linear-gradient(135deg, ${colors.accent}, #8B5CF6)`, color:colors.white, border:'none', borderRadius:'10px', fontSize:'15px', fontWeight:'600', cursor:saving?'not-allowed':'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px' }}>{Icons.save} {saving?'Guardando...':'Guardar cambios'}</button>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [properties, setProperties] = useState([])
  const [agents, setAgents] = useState([])
  const [view, setView] = useState('properties')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({ operation:'', type:'', zone:'', priceMin:'', priceMax:'', bedrooms:'', bathrooms:'', status:'' })
  const [showForm, setShowForm] = useState(false)
  const [editProperty, setEditProperty] = useState(null)
  const [viewProperty, setViewProperty] = useState(null)
  const [propView, setPropView] = useState('all')
  const [showBulkUpload, setShowBulkUpload] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({data:{session}})=>{setSession(session);setLoading(false)})
    const {data:{subscription}}=supabase.auth.onAuthStateChange((_,session)=>{setSession(session)})
    return ()=>subscription.unsubscribe()
  },[])

  const loadData = useCallback(async () => {
    if(!session) return
    const [{data:props},{data:profs}] = await Promise.all([
      supabase.from('properties').select('*').order('created_at',{ascending:false}),
      supabase.from('profiles').select('id, full_name, phone, email, role, avatar_url'),
    ])
    if(props) setProperties(props)
    if(profs) setAgents(profs)
  },[session])

  useEffect(()=>{loadData()},[loadData])

  const deleteProperty = async (id) => { await supabase.from('properties').delete().eq('id',id); loadData() }

  const filteredProperties = properties.filter(p => {
    if(propView==='mine'&&p.agent_id!==session?.user?.id) return false
    if(filters.operation&&p.operation_type!==filters.operation) return false
    if(filters.type&&p.property_type!==filters.type) return false
    if(filters.zone&&p.zone!==filters.zone) return false
    if(filters.priceMin&&Number(p.price)<Number(filters.priceMin)) return false
    if(filters.priceMax&&Number(p.price)>Number(filters.priceMax)) return false
    if(filters.bedrooms&&p.bedrooms<Number(filters.bedrooms)) return false
    if(filters.bathrooms&&p.bathrooms<Number(filters.bathrooms)) return false
    if(filters.status&&p.status!==filters.status) return false
    return true
  })

  const zones = [...new Set(properties.map(p=>p.zone).filter(Boolean))].sort()

  const generateBrochure = (property) => {
    const agent = agents.find(a=>a.id===property.agent_id)
    const priceBs = property.exchange_rate ? `Bs ${Math.round(Number(property.price)*Number(property.exchange_rate)).toLocaleString('es-BO')}` : ''
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${property.title}</title>
    <style>@media print{body{margin:0}.no-print{display:none}}body{font-family:'Segoe UI',sans-serif;max-width:800px;margin:0 auto;padding:24px;color:#222}
    .header{background:linear-gradient(135deg,#1B4F72,#6C63FF);color:white;padding:32px;border-radius:16px;margin-bottom:24px}
    .badge{display:inline-block;background:rgba(255,255,255,0.2);padding:4px 12px;border-radius:6px;font-size:13px;font-weight:600;margin-bottom:12px}
    .title{font-size:28px;font-weight:700;margin:8px 0}.price{font-size:32px;font-weight:700}.price-bs{font-size:16px;opacity:0.8;margin-top:4px}
    .features{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin:24px 0}
    .feature{text-align:center;padding:16px;background:#f8f9fa;border-radius:12px}
    .feature-value{font-size:24px;font-weight:700;color:#1B4F72}.feature-label{font-size:12px;color:#666;margin-top:4px}
    .areas{margin:24px 0;padding:20px;background:#f8f9fa;border-radius:12px}.areas-title{font-weight:600;margin-bottom:10px}
    .areas-grid{display:flex;flex-wrap:wrap;gap:8px}.area-tag{padding:4px 12px;background:#e8f5e9;color:#2e7d32;border-radius:6px;font-size:13px}
    .description{line-height:1.7;color:#444;margin:24px 0;padding:20px;background:#f8f9fa;border-radius:12px}
    .photos{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin:24px 0}.photos img{width:100%;height:200px;object-fit:cover;border-radius:12px}
    .agent{padding:20px;background:#1B4F72;color:white;border-radius:12px;display:flex;justify-content:space-between;align-items:center}
    .btn{display:block;width:100%;padding:14px;background:#6C63FF;color:white;border:none;border-radius:10px;font-size:16px;font-weight:600;cursor:pointer;margin-top:20px;box-sizing:border-box}</style></head>
    <body><div class="header"><span class="badge">${opLabels[property.operation_type]} · ${typeLabels[property.property_type]}</span>
    <div class="title">${property.title}</div><div class="price">$ ${Number(property.price).toLocaleString('en-US')} USD</div>
    <div style="opacity:0.9;font-size:15px;margin-top:8px">📍 ${property.zone}${property.address?` · ${property.address}`:''} · Cochabamba</div></div>
    <div class="features"><div class="feature"><div class="feature-value">${property.bedrooms}</div><div class="feature-label">Habitaciones</div></div>
    <div class="feature"><div class="feature-value">${property.bathrooms}</div><div class="feature-label">Baños</div></div>
    <div class="feature"><div class="feature-value">${property.area_m2||'-'}</div><div class="feature-label">m²</div></div>
    <div class="feature"><div class="feature-value">${property.parking_spots}</div><div class="feature-label">Estacionamientos</div></div></div>
    ${property.common_areas?.length>0?`<div class="areas"><div class="areas-title">Áreas Comunes</div><div class="areas-grid">${property.common_areas.map(a=>`<span class="area-tag">✓ ${a}</span>`).join('')}</div></div>`:''}
    ${property.description?`<div class="description"><strong>Descripción:</strong><br>${property.description}</div>`:''}
    ${property.photos?.length?`<div class="photos">${property.photos.map(u=>`<img src="${u}"/>`).join('')}</div>`:''}
    <div class="agent"><div><div style="font-size:12px;opacity:0.8">Contacto</div><div style="font-size:18px;font-weight:600">${agent?.full_name||'Sin asignar'}</div></div>
    <div style="text-align:right"><div style="font-size:12px;opacity:0.8">Teléfono</div><div style="font-size:18px;font-weight:600">${agent?.phone||'-'}</div></div></div>
    <button class="btn no-print" onclick="window.print()">🖨️ Imprimir / Guardar PDF</button></body></html>`
    const w = window.open('','_blank'); w.document.write(html); w.document.close()
  }

  const handleLogout = async () => { await supabase.auth.signOut(); setSession(null) }

  if(loading) return <div style={{ minHeight:'100vh', background:colors.bg, display:'flex', alignItems:'center', justifyContent:'center', color:colors.text }}>Cargando...</div>
  if(!session) return <LoginScreen onLogin={setSession} />
  const currentUser = agents.find(a=>a.id===session.user?.id)

  return (
    <div style={{ minHeight:'100vh', background:colors.bg, fontFamily:"'Segoe UI', system-ui, sans-serif" }}>
      <nav style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 16px', background:colors.card, borderBottom:`1px solid ${colors.border}`, position:'sticky', top:0, zIndex:100, flexWrap:'wrap', gap:'6px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
          <div style={{ width:'32px', height:'32px', borderRadius:'8px', background:`linear-gradient(135deg, ${colors.accent}, #8B5CF6)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'14px', fontWeight:'bold', color:colors.white }}>O</div>
          <span style={{ color:colors.text, fontSize:'15px', fontWeight:'700' }}>OmniaTools</span>
        </div>
        <div style={{ display:'flex', gap:'2px' }}>
          {[{key:'properties',icon:Icons.home,label:'Propiedades'},{key:'tools',icon:Icons.tools,label:'Herramientas'},{key:'clients',icon:Icons.users,label:'Clientes'},{key:'profile',icon:Icons.user,label:'Perfil'}].map(tab=>(
            <button key={tab.key} onClick={()=>setView(tab.key)} style={{ padding:'6px 10px', borderRadius:'8px', border:'none', cursor:'pointer', background:view===tab.key?colors.accentLight:'transparent', color:view===tab.key?colors.accent:colors.textSecondary, fontSize:'12px', fontWeight:'500', display:'flex', alignItems:'center', gap:'4px' }}>{tab.icon} {tab.label}</button>
          ))}
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
          <span style={{ color:colors.textSecondary, fontSize:'12px', maxWidth:'100px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{currentUser?.full_name||session.user?.email}</span>
          <button onClick={handleLogout} style={{ background:'none', border:'none', color:colors.textMuted, cursor:'pointer', display:'flex' }}>{Icons.logout}</button>
        </div>
      </nav>

      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'16px' }}>
        {view==='properties' && (<>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px', flexWrap:'wrap', gap:'10px' }}>
            <div>
              <h1 style={{ color:colors.text, fontSize:'20px', fontWeight:'700', margin:'0 0 4px' }}>Propiedades</h1>
              <p style={{ color:colors.textSecondary, fontSize:'13px', margin:0 }}>{filteredProperties.length} de {properties.length} propiedades</p>
            </div>
            <div style={{ display:'flex', gap:'6px', flexWrap:'wrap' }}>
              <button onClick={()=>setShowFilters(!showFilters)} style={{ padding:'8px 12px', borderRadius:'10px', border:`1px solid ${colors.border}`, background:showFilters?colors.accentLight:colors.card, color:showFilters?colors.accent:colors.textSecondary, cursor:'pointer', display:'flex', alignItems:'center', gap:'4px', fontSize:'13px', fontWeight:'500' }}>{Icons.filter} Filtros</button>
              <button onClick={()=>setShowBulkUpload(true)} style={{ padding:'8px 12px', borderRadius:'10px', border:`1px solid ${colors.border}`, background:colors.card, color:colors.textSecondary, cursor:'pointer', display:'flex', alignItems:'center', gap:'4px', fontSize:'13px', fontWeight:'500' }}>{Icons.upload} Excel</button>
              <button onClick={()=>{setEditProperty(null);setShowForm(true)}} style={{ padding:'8px 12px', borderRadius:'10px', border:'none', background:`linear-gradient(135deg, ${colors.accent}, #8B5CF6)`, color:colors.white, cursor:'pointer', display:'flex', alignItems:'center', gap:'4px', fontSize:'13px', fontWeight:'600' }}>{Icons.plus} Nueva</button>
            </div>
          </div>
          <div style={{ display:'flex', marginBottom:'14px', background:colors.card, borderRadius:'10px', border:`1px solid ${colors.border}`, padding:'4px', width:'fit-content' }}>
            <button onClick={()=>setPropView('all')} style={{ padding:'8px 16px', borderRadius:'8px', border:'none', cursor:'pointer', background:propView==='all'?colors.accent:'transparent', color:propView==='all'?colors.white:colors.textSecondary, fontSize:'13px', fontWeight:'600' }}>Todas</button>
            <button onClick={()=>setPropView('mine')} style={{ padding:'8px 16px', borderRadius:'8px', border:'none', cursor:'pointer', background:propView==='mine'?colors.accent:'transparent', color:propView==='mine'?colors.white:colors.textSecondary, fontSize:'13px', fontWeight:'600' }}>Mis propiedades</button>
          </div>
          {showFilters && <FiltersPanel filters={filters} setFilters={setFilters} zones={zones} />}
          {filteredProperties.length===0 ? (
            <div style={{ textAlign:'center', padding:'50px 20px', color:colors.textSecondary, background:colors.card, borderRadius:'16px', border:`1px solid ${colors.border}` }}>
              <div style={{ fontSize:'40px', marginBottom:'12px' }}>🏠</div>
              <p style={{ fontSize:'16px', margin:'0 0 4px', color:colors.text }}>No hay propiedades</p>
              <p style={{ fontSize:'14px', margin:0 }}>{properties.length>0?'Ajusta los filtros':'Agrega tu primera propiedad'}</p>
            </div>
          ) : (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:'14px' }}>
              {filteredProperties.map(p=>(
                <PropertyCard key={p.id} property={p} agents={agents} currentUserId={session.user?.id} onView={setViewProperty} onEdit={prop=>{setEditProperty(prop);setShowForm(true)}} onDelete={deleteProperty} showOwnerActions={propView==='mine'} />
              ))}
            </div>
          )}
        </>)}

        {view==='tools' && <ToolsScreen />}

        {view==='clients' && (
          <div style={{ textAlign:'center', padding:'80px 20px', color:colors.textSecondary, background:colors.card, borderRadius:'16px', border:`1px solid ${colors.border}` }}>
            <div style={{ fontSize:'48px', marginBottom:'16px' }}>👥</div>
            <h2 style={{ color:colors.text, fontSize:'20px', margin:'0 0 8px' }}>Módulo de Clientes</h2>
            <p style={{ fontSize:'14px', margin:0 }}>Próximamente</p>
          </div>
        )}

        {view==='profile' && <ProfileScreen session={session} currentUser={currentUser} onSaved={loadData} />}
      </div>

      {showForm && <PropertyFormModal property={editProperty} session={session} onClose={()=>{setShowForm(false);setEditProperty(null)}} onSaved={()=>{setShowForm(false);setEditProperty(null);loadData()}} />}
      {viewProperty && <PropertyDetail property={viewProperty} agents={agents} onClose={()=>setViewProperty(null)} onBrochure={generateBrochure} />}
      {showBulkUpload && <BulkUploadModal session={session} onClose={()=>setShowBulkUpload(false)} onSaved={()=>{setShowBulkUpload(false);loadData()}} />}
    </div>
  )
}
