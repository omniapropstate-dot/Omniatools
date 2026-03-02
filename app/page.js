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
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      if (isSignUp) {
        if (!fullName || !phone) { setError('Completa todos los campos'); setLoading(false); return }
        const { data, error: err } = await supabase.auth.signUp({
          email, password,
          options: { data: { full_name: fullName, phone } }
        })
        if (err) { setError(err.message); setLoading(false); return }
        if (data.session) {
          onLogin(data.session)
        } else {
          setError('Registro exitoso. Revisa tu correo para confirmar tu cuenta, luego vuelve e inicia sesión.')
          setIsSignUp(false)
        }
      } else {
        const { data, error: err } = await supabase.auth.signInWithPassword({ email, password })
        if (err) { setError(err.message); setLoading(false); return }
        onLogin(data.session)
      }
    } catch (err) {
      setError('Error de conexión: ' + err.message)
    }
    setLoading(false)
  }

  const inputStyle = {
    width: '100%', padding: '12px 16px', background: colors.inputBg, border: `1px solid ${colors.border}`,
    borderRadius: '10px', color: colors.text, fontSize: '14px', outline: 'none', boxSizing: 'border-box',
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: `linear-gradient(135deg, ${colors.bg} 0%, #1a1040 50%, ${colors.bg} 100%)`, padding: '20px',
    }}>
      <div style={{
        width: '100%', maxWidth: '420px', background: colors.card,
        borderRadius: '20px', padding: '40px 32px', border: `1px solid ${colors.border}`,
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '16px',
            background: `linear-gradient(135deg, ${colors.accent}, #8B5CF6)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px', fontSize: '24px', fontWeight: 'bold', color: colors.white,
          }}>O</div>
          <h1 style={{ color: colors.text, fontSize: '24px', fontWeight: '700', margin: '0 0 4px' }}>OmniaTools</h1>
          <p style={{ color: colors.textSecondary, fontSize: '14px', margin: 0 }}>
            {isSignUp ? 'Crea tu cuenta de vendedor' : 'Ingresa a tu cuenta'}
          </p>
        </div>

        {error && (
          <div style={{
            background: error.includes('exitoso') ? colors.greenBg : colors.redBg,
            color: error.includes('exitoso') ? colors.green : colors.red,
            padding: '12px 16px', borderRadius: '10px', fontSize: '13px', marginBottom: '20px',
          }}>{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ color: colors.textSecondary, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Nombre completo</label>
                <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Ej: Franco López" style={inputStyle} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ color: colors.textSecondary, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Teléfono</label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Ej: 70012345" style={inputStyle} />
              </div>
            </>
          )}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ color: colors.textSecondary, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Correo electrónico</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@correo.com" style={inputStyle} />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ color: colors.textSecondary, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Contraseña</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" style={inputStyle} />
          </div>
          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '14px',
            background: loading ? colors.textMuted : `linear-gradient(135deg, ${colors.accent}, #8B5CF6)`,
            color: colors.white, border: 'none', borderRadius: '10px', fontSize: '15px',
            fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', boxSizing: 'border-box',
          }}>
            {loading ? 'Cargando...' : isSignUp ? 'Crear cuenta' : 'Iniciar sesión'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button onClick={() => { setIsSignUp(!isSignUp); setError('') }} style={{
            background: 'none', border: 'none', color: colors.accent, fontSize: '14px', cursor: 'pointer', textDecoration: 'underline',
          }}>
            {isSignUp ? 'Ya tengo cuenta → Iniciar sesión' : 'No tengo cuenta → Registrarme'}
          </button>
        </div>
      </div>
    </div>
  )
}

function PropertyCard({ property, agents, currentUserId, onView, onEdit, onDelete, showOwnerActions }) {
  const agent = agents.find(a => a.id === property.agent_id)
  const isOwner = property.agent_id === currentUserId
  const statusMap = {
    disponible: { bg: colors.greenBg, color: colors.green, label: 'Disponible' },
    reservada: { bg: colors.yellowBg, color: colors.yellow, label: 'Reservada' },
    vendida: { bg: colors.redBg, color: colors.red, label: 'Vendida' },
    inactiva: { bg: 'rgba(107,114,128,0.12)', color: colors.textMuted, label: 'Inactiva' },
  }
  const status = statusMap[property.status] || statusMap.disponible
  const opLabels = { venta: 'Venta', alquiler: 'Alquiler', anticretico: 'Anticrético' }
  const photo = property.photos && property.photos.length > 0 ? property.photos[0] : null

  return (
    <div onClick={() => onView(property)} style={{
      background: colors.card, borderRadius: '16px', overflow: 'hidden',
      border: `1px solid ${colors.border}`, cursor: 'pointer', transition: 'all 0.2s',
    }}>
      <div style={{
        height: '160px', background: photo ? `url(${photo}) center/cover` : 'linear-gradient(135deg, #2a2040, #1a1530)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
      }}>
        {!photo && <span style={{ fontSize: '40px' }}>🏠</span>}
        <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          <span style={{ background: 'rgba(0,0,0,0.7)', color: colors.white, padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '600' }}>
            {opLabels[property.operation_type]}
          </span>
          <span style={{ background: status.bg, color: status.color, padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '600' }}>
            {status.label}
          </span>
        </div>
        {isOwner && showOwnerActions && (
          <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '4px' }}>
            <button onClick={(e) => { e.stopPropagation(); onEdit(property) }} style={{
              background: 'rgba(0,0,0,0.7)', border: 'none', color: colors.white,
              width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{Icons.edit}</button>
            <button onClick={(e) => { e.stopPropagation(); if(confirm('¿Eliminar esta propiedad?')) onDelete(property.id) }} style={{
              background: 'rgba(220,38,38,0.8)', border: 'none', color: colors.white,
              width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px',
            }}>🗑</button>
          </div>
        )}
      </div>
      <div style={{ padding: '14px' }}>
        <h3 style={{ color: colors.text, fontSize: '14px', fontWeight: '600', margin: '0 0 6px', lineHeight: '1.3' }}>{property.title}</h3>
        <p style={{ color: colors.accent, fontSize: '18px', fontWeight: '700', margin: '0 0 8px' }}>
          Bs {Number(property.price).toLocaleString('es-BO')}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '10px', color: colors.textSecondary, fontSize: '12px' }}>
          {Icons.location} {property.zone}
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
          {property.bedrooms > 0 && <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: colors.textSecondary, fontSize: '12px' }}>{Icons.bed} {property.bedrooms}</span>}
          {property.bathrooms > 0 && <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: colors.textSecondary, fontSize: '12px' }}>{Icons.bath} {property.bathrooms}</span>}
          {property.area_m2 && <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: colors.textSecondary, fontSize: '12px' }}>{Icons.area} {property.area_m2}m²</span>}
          {property.parking_spots > 0 && <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: colors.textSecondary, fontSize: '12px' }}>{Icons.car} {property.parking_spots}</span>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', background: colors.inputBg, borderRadius: '8px' }}>
          <div>
            <span style={{ color: colors.textMuted, fontSize: '10px' }}>Agente</span>
            <p style={{ color: colors.text, fontSize: '12px', fontWeight: '500', margin: 0 }}>
              {agent?.full_name || 'Sin asignar'} {isOwner && <span style={{ color: colors.accent, fontSize: '10px' }}>(tú)</span>}
            </p>
          </div>
          <button onClick={(e) => {
            e.stopPropagation()
            const opL = { venta: 'Venta', alquiler: 'Alquiler', anticretico: 'Anticrético' }
            const msg = `🏠 *${property.title}*%0A💰 Bs ${Number(property.price).toLocaleString('es-BO')} | ${opL[property.operation_type]}%0A📍 ${property.zone}${property.address ? ' · ' + property.address : ''}%0A${property.bedrooms > 0 ? '🛏 ' + property.bedrooms + ' hab · ' : ''}${property.bathrooms > 0 ? '🚿 ' + property.bathrooms + ' baños · ' : ''}${property.area_m2 ? '📐 ' + property.area_m2 + 'm²' : ''}%0A%0A📞 Contacto: ${agent?.full_name || ''} - ${agent?.phone || ''}`
            window.open(`https://wa.me/?text=${msg}`, '_blank')
          }} style={{
            background: '#25D366', border: 'none', color: colors.white,
            padding: '6px 10px', borderRadius: '6px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: '600',
          }}>📤 Compartir</button>
        </div>
      </div>
    </div>
  )
}

function FiltersPanel({ filters, setFilters, zones }) {
  const selectStyle = {
    padding: '10px 12px', background: colors.inputBg, border: `1px solid ${colors.border}`,
    borderRadius: '10px', color: colors.text, fontSize: '13px', outline: 'none', width: '100%', boxSizing: 'border-box',
  }
  const inputStyle = { ...selectStyle }
  const labelStyle = { color: colors.textSecondary, fontSize: '12px', fontWeight: '500', display: 'block', marginBottom: '4px' }

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
      gap: '12px', padding: '16px', background: colors.card, borderRadius: '14px',
      border: `1px solid ${colors.border}`, marginBottom: '20px',
    }}>
      <div>
        <label style={labelStyle}>Operación</label>
        <select style={selectStyle} value={filters.operation} onChange={e => setFilters(f => ({ ...f, operation: e.target.value }))}>
          <option value="">Todas</option>
          <option value="venta">Venta</option>
          <option value="alquiler">Alquiler</option>
          <option value="anticretico">Anticrético</option>
        </select>
      </div>
      <div>
        <label style={labelStyle}>Tipo</label>
        <select style={selectStyle} value={filters.type} onChange={e => setFilters(f => ({ ...f, type: e.target.value }))}>
          <option value="">Todos</option>
          <option value="casa">Casa</option>
          <option value="departamento">Departamento</option>
          <option value="terreno">Terreno</option>
          <option value="oficina">Oficina</option>
          <option value="local_comercial">Local comercial</option>
        </select>
      </div>
      <div>
        <label style={labelStyle}>Zona</label>
        <select style={selectStyle} value={filters.zone} onChange={e => setFilters(f => ({ ...f, zone: e.target.value }))}>
          <option value="">Todas</option>
          {zones.map(z => <option key={z} value={z}>{z}</option>)}
        </select>
      </div>
      <div>
        <label style={labelStyle}>Precio mín (Bs)</label>
        <input type="number" style={inputStyle} placeholder="0" value={filters.priceMin} onChange={e => setFilters(f => ({ ...f, priceMin: e.target.value }))} />
      </div>
      <div>
        <label style={labelStyle}>Precio máx (Bs)</label>
        <input type="number" style={inputStyle} placeholder="Sin límite" value={filters.priceMax} onChange={e => setFilters(f => ({ ...f, priceMax: e.target.value }))} />
      </div>
      <div>
        <label style={labelStyle}>Habitaciones</label>
        <select style={selectStyle} value={filters.bedrooms} onChange={e => setFilters(f => ({ ...f, bedrooms: e.target.value }))}>
          <option value="">Todas</option>
          <option value="1">1+</option><option value="2">2+</option><option value="3">3+</option><option value="4">4+</option>
        </select>
      </div>
      <div>
        <label style={labelStyle}>Baños</label>
        <select style={selectStyle} value={filters.bathrooms} onChange={e => setFilters(f => ({ ...f, bathrooms: e.target.value }))}>
          <option value="">Todos</option>
          <option value="1">1+</option><option value="2">2+</option><option value="3">3+</option>
        </select>
      </div>
      <div>
        <label style={labelStyle}>Estado</label>
        <select style={selectStyle} value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}>
          <option value="">Todos</option>
          <option value="disponible">Disponible</option>
          <option value="reservada">Reservada</option>
          <option value="vendida">Vendida</option>
        </select>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <button onClick={() => setFilters({ operation: '', type: '', zone: '', priceMin: '', priceMax: '', bedrooms: '', bathrooms: '', status: '' })} style={{
          padding: '10px 16px', background: colors.redBg, border: `1px solid rgba(248,113,113,0.2)`,
          borderRadius: '10px', color: colors.red, fontSize: '13px', cursor: 'pointer', width: '100%',
        }}>Limpiar</button>
      </div>
    </div>
  )
}

function PropertyFormModal({ property, session, onClose, onSaved }) {
  const [form, setForm] = useState({
    title: property?.title || '', description: property?.description || '',
    operation_type: property?.operation_type || 'venta', property_type: property?.property_type || 'casa',
    price: property?.price || '', zone: property?.zone || '', address: property?.address || '',
    bedrooms: property?.bedrooms || 0, bathrooms: property?.bathrooms || 0,
    area_m2: property?.area_m2 || '', parking_spots: property?.parking_spots || 0,
    status: property?.status || 'disponible',
  })
  const [photos, setPhotos] = useState(property?.photos || [])
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef()

  const handlePhotoUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (photos.length + files.length > 10) { setError('Máximo 10 fotos'); return }
    setUploading(true); setError('')
    const newPhotos = [...photos]
    for (const file of files) {
      const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`
      const { data, error: upErr } = await supabase.storage.from('property-photos').upload(fileName, file)
      if (!upErr) {
        const { data: urlData } = supabase.storage.from('property-photos').getPublicUrl(fileName)
        newPhotos.push(urlData.publicUrl)
      }
    }
    setPhotos(newPhotos); setUploading(false)
  }

  const handleSave = async () => {
    if (!form.title || !form.price || !form.zone) { setError('Título, precio y zona son obligatorios'); return }
    setSaving(true); setError('')
    const payload = { ...form, photos, agent_id: session.user.id }
    if (property?.id) {
      const { error: err } = await supabase.from('properties').update(payload).eq('id', property.id)
      if (err) { setError('Error: ' + err.message); setSaving(false); return }
    } else {
      const { error: err } = await supabase.from('properties').insert(payload)
      if (err) { setError('Error: ' + err.message); setSaving(false); return }
    }
    setSaving(false); onSaved()
  }

  const inputStyle = {
    width: '100%', padding: '10px 14px', background: colors.inputBg, border: `1px solid ${colors.border}`,
    borderRadius: '10px', color: colors.text, fontSize: '14px', outline: 'none', boxSizing: 'border-box',
  }
  const labelStyle = { color: colors.textSecondary, fontSize: '12px', fontWeight: '500', display: 'block', marginBottom: '4px' }

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px',
    }}>
      <div style={{
        background: colors.card, borderRadius: '20px', width: '100%', maxWidth: '600px',
        maxHeight: '90vh', overflow: 'auto', border: `1px solid ${colors.border}`,
      }}>
        <div style={{
          padding: '20px 24px', borderBottom: `1px solid ${colors.border}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          position: 'sticky', top: 0, background: colors.card, zIndex: 1, borderRadius: '20px 20px 0 0',
        }}>
          <h2 style={{ color: colors.text, fontSize: '18px', fontWeight: '600', margin: 0 }}>
            {property ? 'Editar propiedad' : 'Nueva propiedad'}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: colors.textSecondary, cursor: 'pointer' }}>{Icons.x}</button>
        </div>
        <div style={{ padding: '20px 24px' }}>
          {error && <div style={{ background: colors.redBg, color: colors.red, padding: '10px 14px', borderRadius: '10px', fontSize: '13px', marginBottom: '16px' }}>{error}</div>}

          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Fotos ({photos.length}/10)</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
              {photos.map((url, i) => (
                <div key={i} style={{ width: '80px', height: '80px', borderRadius: '10px', position: 'relative', background: `url(${url}) center/cover`, border: `1px solid ${colors.border}` }}>
                  <button onClick={() => setPhotos(photos.filter((_, idx) => idx !== i))} style={{
                    position: 'absolute', top: '-6px', right: '-6px', width: '20px', height: '20px',
                    background: colors.red, border: 'none', borderRadius: '50%', color: colors.white, fontSize: '12px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>✕</button>
                </div>
              ))}
              {photos.length < 10 && (
                <button onClick={() => fileRef.current?.click()} style={{
                  width: '80px', height: '80px', borderRadius: '10px', background: colors.inputBg,
                  border: `2px dashed ${colors.border}`, cursor: 'pointer', display: 'flex',
                  flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: colors.textMuted,
                }}>
                  {uploading ? '...' : Icons.camera}
                  <span style={{ fontSize: '10px', marginTop: '4px' }}>{uploading ? 'Subiendo' : 'Agregar'}</span>
                </button>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={handlePhotoUpload} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Título *</label>
              <input style={inputStyle} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Ej: Casa moderna zona norte" />
            </div>
            <div>
              <label style={labelStyle}>Operación</label>
              <select style={inputStyle} value={form.operation_type} onChange={e => setForm(f => ({ ...f, operation_type: e.target.value }))}>
                <option value="venta">Venta</option><option value="alquiler">Alquiler</option><option value="anticretico">Anticrético</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Tipo</label>
              <select style={inputStyle} value={form.property_type} onChange={e => setForm(f => ({ ...f, property_type: e.target.value }))}>
                <option value="casa">Casa</option><option value="departamento">Departamento</option><option value="terreno">Terreno</option>
                <option value="oficina">Oficina</option><option value="local_comercial">Local comercial</option><option value="otro">Otro</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Precio (Bs) *</label>
              <input type="number" style={inputStyle} value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="150000" />
            </div>
            <div>
              <label style={labelStyle}>Zona *</label>
              <input style={inputStyle} value={form.zone} onChange={e => setForm(f => ({ ...f, zone: e.target.value }))} placeholder="Ej: Zona Norte" />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Dirección</label>
              <input style={inputStyle} value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} placeholder="Ej: Av. América #1234" />
            </div>
            <div>
              <label style={labelStyle}>Habitaciones</label>
              <input type="number" style={inputStyle} value={form.bedrooms} min="0" onChange={e => setForm(f => ({ ...f, bedrooms: parseInt(e.target.value) || 0 }))} />
            </div>
            <div>
              <label style={labelStyle}>Baños</label>
              <input type="number" style={inputStyle} value={form.bathrooms} min="0" onChange={e => setForm(f => ({ ...f, bathrooms: parseInt(e.target.value) || 0 }))} />
            </div>
            <div>
              <label style={labelStyle}>Área (m²)</label>
              <input type="number" style={inputStyle} value={form.area_m2} onChange={e => setForm(f => ({ ...f, area_m2: e.target.value }))} placeholder="120" />
            </div>
            <div>
              <label style={labelStyle}>Estacionamientos</label>
              <input type="number" style={inputStyle} value={form.parking_spots} min="0" onChange={e => setForm(f => ({ ...f, parking_spots: parseInt(e.target.value) || 0 }))} />
            </div>
            <div>
              <label style={labelStyle}>Estado</label>
              <select style={inputStyle} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                <option value="disponible">Disponible</option><option value="reservada">Reservada</option>
                <option value="vendida">Vendida</option><option value="inactiva">Inactiva</option>
              </select>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Descripción</label>
              <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Describe la propiedad..." />
            </div>
          </div>

          <button onClick={handleSave} disabled={saving} style={{
            width: '100%', padding: '14px', marginTop: '20px',
            background: saving ? colors.textMuted : `linear-gradient(135deg, ${colors.accent}, #8B5CF6)`,
            color: colors.white, border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: saving ? 'not-allowed' : 'pointer',
          }}>
            {saving ? 'Guardando...' : property ? 'Guardar cambios' : 'Crear propiedad'}
          </button>
        </div>
      </div>
    </div>
  )
}

function PropertyDetail({ property, agents, onClose, onBrochure }) {
  const agent = agents.find(a => a.id === property.agent_id)
  const opLabels = { venta: 'Venta', alquiler: 'Alquiler', anticretico: 'Anticrético' }
  const typeLabels = { casa: 'Casa', departamento: 'Departamento', terreno: 'Terreno', oficina: 'Oficina', local_comercial: 'Local comercial', otro: 'Otro' }
  const [currentPhoto, setCurrentPhoto] = useState(0)
  const photos = property.photos || []

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px',
    }}>
      <div style={{
        background: colors.card, borderRadius: '20px', width: '100%', maxWidth: '700px',
        maxHeight: '90vh', overflow: 'auto', border: `1px solid ${colors.border}`,
      }}>
        <div style={{ position: 'relative', height: '300px', background: '#111' }}>
          {photos.length > 0 ? (
            <img src={photos[currentPhoto]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '60px' }}>🏠</div>
          )}
          <button onClick={onClose} style={{
            position: 'absolute', top: '16px', right: '16px', width: '36px', height: '36px',
            background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%', color: colors.white, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>{Icons.x}</button>
          {photos.length > 1 && (
            <div style={{ position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px' }}>
              {photos.map((_, i) => (
                <button key={i} onClick={() => setCurrentPhoto(i)} style={{
                  width: '8px', height: '8px', borderRadius: '50%', border: 'none', cursor: 'pointer',
                  background: i === currentPhoto ? colors.accent : 'rgba(255,255,255,0.4)',
                }} />
              ))}
            </div>
          )}
        </div>
        <div style={{ padding: '24px' }}>
          <span style={{ color: colors.accent, fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>
            {opLabels[property.operation_type]} · {typeLabels[property.property_type]}
          </span>
          <h2 style={{ color: colors.text, fontSize: '22px', fontWeight: '700', margin: '4px 0' }}>{property.title}</h2>
          <p style={{ color: colors.textSecondary, fontSize: '14px', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            {Icons.location} {property.zone}{property.address ? ` · ${property.address}` : ''}
          </p>
          <p style={{ color: colors.accent, fontSize: '26px', fontWeight: '700', margin: '0 0 20px' }}>
            Bs {Number(property.price).toLocaleString('es-BO')}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', margin: '0 0 20px', padding: '16px', background: colors.inputBg, borderRadius: '12px' }}>
            {[
              { icon: Icons.bed, val: property.bedrooms, label: 'Habit.' },
              { icon: Icons.bath, val: property.bathrooms, label: 'Baños' },
              { icon: Icons.area, val: property.area_m2 || '-', label: 'm²' },
              { icon: Icons.car, val: property.parking_spots, label: 'Estac.' },
            ].map((f, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ color: colors.textMuted, marginBottom: '4px' }}>{f.icon}</div>
                <p style={{ color: colors.text, fontSize: '16px', fontWeight: '600', margin: 0 }}>{f.val}</p>
                <p style={{ color: colors.textMuted, fontSize: '11px', margin: 0 }}>{f.label}</p>
              </div>
            ))}
          </div>

          {property.description && (
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: colors.textSecondary, fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '8px' }}>Descripción</h4>
              <p style={{ color: colors.text, fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{property.description}</p>
            </div>
          )}

          <div style={{ padding: '16px', background: colors.accentLight, borderRadius: '12px', border: '1px solid rgba(108,99,255,0.2)', marginBottom: '20px' }}>
            <span style={{ color: colors.textMuted, fontSize: '12px' }}>Agente asignado</span>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
              <p style={{ color: colors.text, fontSize: '16px', fontWeight: '600', margin: 0 }}>{agent?.full_name || 'Sin asignar'}</p>
              {agent?.phone && (
                <a href={`https://wa.me/591${agent.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px',
                  background: '#25D366', color: colors.white, borderRadius: '8px', textDecoration: 'none', fontSize: '13px', fontWeight: '600',
                }}>{Icons.phone} WhatsApp</a>
              )}
            </div>
          </div>

          <button onClick={() => onBrochure(property)} style={{
            width: '100%', padding: '14px', background: `linear-gradient(135deg, ${colors.accent}, #8B5CF6)`,
            color: colors.white, border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          }}>{Icons.file} Generar Brochure</button>
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
    const headers = 'titulo,operacion,tipo,precio,zona,direccion,habitaciones,banos,area_m2,estacionamientos'
    const example1 = 'Casa moderna zona norte,venta,casa,150000,Zona Norte,Av. América #1234,3,2,120,1'
    const example2 = 'Departamento centro,alquiler,departamento,3500,Centro,Calle Bolívar #567,2,1,85,0'
    const example3 = 'Terreno Tiquipaya,venta,terreno,95000,Tiquipaya,Km 8 carretera,0,0,300,0'
    const csv = [headers, example1, example2, example3].join('\n')
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'plantilla_propiedades.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  const parseCSV = (text) => {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l)
    if (lines.length < 2) return []
    const rows = []
    for (let i = 1; i < lines.length; i++) {
      const vals = lines[i].split(',').map(v => v.trim())
      if (vals.length < 4) continue
      const opMap = { 'venta': 'venta', 'alquiler': 'alquiler', 'anticretico': 'anticretico', 'anticrético': 'anticretico' }
      const typeMap = { 'casa': 'casa', 'departamento': 'departamento', 'depto': 'departamento', 'terreno': 'terreno', 'oficina': 'oficina', 'local': 'local_comercial', 'local comercial': 'local_comercial', 'otro': 'otro' }
      rows.push({
        title: vals[0] || '',
        operation_type: opMap[(vals[1] || '').toLowerCase()] || 'venta',
        property_type: typeMap[(vals[2] || '').toLowerCase()] || 'casa',
        price: parseFloat(vals[3]) || 0,
        zone: vals[4] || '',
        address: vals[5] || '',
        bedrooms: parseInt(vals[6]) || 0,
        bathrooms: parseInt(vals[7]) || 0,
        area_m2: parseFloat(vals[8]) || null,
        parking_spots: parseInt(vals[9]) || 0,
        status: 'disponible',
        agent_id: session.user.id,
        photos: [],
      })
    }
    return rows
  }

  const parseXLSX = async (arrayBuffer) => {
    try {
      const XLSX = await import('https://cdn.sheetjs.com/xlsx-0.20.1/package/xlsx.mjs')
      const workbook = XLSX.read(arrayBuffer, { type: 'array' })
      const sheet = workbook.Sheets[workbook.SheetNames[0]]
      const json = XLSX.utils.sheet_to_json(sheet, { defval: '' })
      return json.map(row => {
        const get = (keys) => { for (const k of keys) { if (row[k] !== undefined && row[k] !== '') return String(row[k]); } return '' }
        const opMap = { 'venta': 'venta', 'alquiler': 'alquiler', 'anticretico': 'anticretico', 'anticrético': 'anticretico' }
        const typeMap = { 'casa': 'casa', 'departamento': 'departamento', 'depto': 'departamento', 'terreno': 'terreno', 'oficina': 'oficina', 'local': 'local_comercial', 'local comercial': 'local_comercial', 'otro': 'otro' }
        return {
          title: get(['titulo', 'Titulo', 'TITULO', 'título', 'Título', 'title', 'Title']),
          operation_type: opMap[(get(['operacion', 'Operacion', 'OPERACION', 'operación', 'Operación', 'operation'])).toLowerCase()] || 'venta',
          property_type: typeMap[(get(['tipo', 'Tipo', 'TIPO', 'type'])).toLowerCase()] || 'casa',
          price: parseFloat(get(['precio', 'Precio', 'PRECIO', 'price'])) || 0,
          zone: get(['zona', 'Zona', 'ZONA', 'zone']),
          address: get(['direccion', 'Direccion', 'DIRECCION', 'dirección', 'Dirección', 'address']),
          bedrooms: parseInt(get(['habitaciones', 'Habitaciones', 'HABITACIONES', 'bedrooms'])) || 0,
          bathrooms: parseInt(get(['banos', 'Banos', 'BANOS', 'baños', 'Baños', 'bathrooms'])) || 0,
          area_m2: parseFloat(get(['area_m2', 'Area', 'AREA', 'area', 'área', 'Área', 'm2'])) || null,
          parking_spots: parseInt(get(['estacionamientos', 'Estacionamientos', 'ESTACIONAMIENTOS', 'parking', 'estac'])) || 0,
          status: 'disponible',
          agent_id: session.user.id,
          photos: [],
        }
      }).filter(r => r.title && r.price > 0)
    } catch (err) {
      setError('Error al leer el archivo Excel. Intenta con CSV.')
      return []
    }
  }

  const handleFile = async (e) => {
    const f = e.target.files[0]
    if (!f) return
    setFile(f); setError(''); setPreview([])
    
    if (f.name.endsWith('.csv') || f.name.endsWith('.txt')) {
      const text = await f.text()
      const rows = parseCSV(text)
      if (rows.length === 0) { setError('No se encontraron propiedades en el archivo. Verifica el formato.'); return }
      setPreview(rows)
    } else if (f.name.endsWith('.xlsx') || f.name.endsWith('.xls')) {
      const buffer = await f.arrayBuffer()
      const rows = await parseXLSX(buffer)
      if (rows.length === 0) { setError('No se encontraron propiedades en el archivo. Verifica el formato.'); return }
      setPreview(rows)
    } else {
      setError('Formato no soportado. Usa .xlsx, .xls o .csv')
    }
  }

  const handleUpload = async () => {
    if (preview.length === 0) return
    setUploading(true); setError('')
    const { error: err } = await supabase.from('properties').insert(preview)
    if (err) {
      setError('Error al subir: ' + err.message)
    } else {
      setSuccess(`${preview.length} propiedades subidas correctamente`)
      setTimeout(() => { onSaved() }, 1500)
    }
    setUploading(false)
  }

  const opLabels = { venta: 'Venta', alquiler: 'Alquiler', anticretico: 'Anticrético' }
  const typeLabels = { casa: 'Casa', departamento: 'Depto', terreno: 'Terreno', oficina: 'Oficina', local_comercial: 'Local', otro: 'Otro' }

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px',
    }}>
      <div style={{
        background: colors.card, borderRadius: '20px', width: '100%', maxWidth: '650px',
        maxHeight: '90vh', overflow: 'auto', border: `1px solid ${colors.border}`,
      }}>
        <div style={{
          padding: '20px 24px', borderBottom: `1px solid ${colors.border}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          position: 'sticky', top: 0, background: colors.card, zIndex: 1, borderRadius: '20px 20px 0 0',
        }}>
          <h2 style={{ color: colors.text, fontSize: '18px', fontWeight: '600', margin: 0 }}>Carga masiva de propiedades</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: colors.textSecondary, cursor: 'pointer' }}>{Icons.x}</button>
        </div>

        <div style={{ padding: '20px 24px' }}>
          {error && <div style={{ background: colors.redBg, color: colors.red, padding: '10px 14px', borderRadius: '10px', fontSize: '13px', marginBottom: '16px' }}>{error}</div>}
          {success && <div style={{ background: colors.greenBg, color: colors.green, padding: '10px 14px', borderRadius: '10px', fontSize: '13px', marginBottom: '16px' }}>{success}</div>}

          {/* Step 1: Download template */}
          <div style={{ marginBottom: '20px', padding: '16px', background: colors.inputBg, borderRadius: '12px', border: `1px solid ${colors.border}` }}>
            <p style={{ color: colors.text, fontSize: '14px', fontWeight: '600', margin: '0 0 8px' }}>Paso 1: Descarga la plantilla</p>
            <p style={{ color: colors.textSecondary, fontSize: '13px', margin: '0 0 12px' }}>
              Descarga este archivo CSV de ejemplo, llénalo con tus propiedades y súbelo.
            </p>
            <button onClick={downloadTemplate} style={{
              padding: '10px 16px', borderRadius: '8px', border: `1px solid ${colors.accent}`,
              background: 'transparent', color: colors.accent, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600',
            }}>{Icons.download} Descargar plantilla CSV</button>
          </div>

          {/* Step 2: Upload file */}
          <div style={{ marginBottom: '20px', padding: '16px', background: colors.inputBg, borderRadius: '12px', border: `1px solid ${colors.border}` }}>
            <p style={{ color: colors.text, fontSize: '14px', fontWeight: '600', margin: '0 0 8px' }}>Paso 2: Sube tu archivo</p>
            <p style={{ color: colors.textSecondary, fontSize: '13px', margin: '0 0 12px' }}>
              Acepta archivos .xlsx (Excel) o .csv
            </p>
            <button onClick={() => fileRef.current?.click()} style={{
              padding: '10px 16px', borderRadius: '8px', border: 'none',
              background: `linear-gradient(135deg, ${colors.accent}, #8B5CF6)`,
              color: colors.white, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600',
            }}>{Icons.upload} {file ? file.name : 'Seleccionar archivo'}</button>
            <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" hidden onChange={handleFile} />
          </div>

          {/* Preview */}
          {preview.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <p style={{ color: colors.text, fontSize: '14px', fontWeight: '600', margin: '0 0 12px' }}>
                Paso 3: Confirma ({preview.length} propiedades encontradas)
              </p>
              <div style={{ maxHeight: '250px', overflow: 'auto', borderRadius: '10px', border: `1px solid ${colors.border}` }}>
                {preview.map((p, i) => (
                  <div key={i} style={{
                    padding: '10px 14px', borderBottom: i < preview.length - 1 ? `1px solid ${colors.border}` : 'none',
                    background: i % 2 === 0 ? colors.inputBg : colors.card,
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '4px' }}>
                      <span style={{ color: colors.text, fontSize: '13px', fontWeight: '600' }}>{p.title}</span>
                      <span style={{ color: colors.accent, fontSize: '13px', fontWeight: '700' }}>Bs {Number(p.price).toLocaleString('es-BO')}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '4px', flexWrap: 'wrap' }}>
                      <span style={{ color: colors.textMuted, fontSize: '11px' }}>{opLabels[p.operation_type]}</span>
                      <span style={{ color: colors.textMuted, fontSize: '11px' }}>·</span>
                      <span style={{ color: colors.textMuted, fontSize: '11px' }}>{typeLabels[p.property_type]}</span>
                      <span style={{ color: colors.textMuted, fontSize: '11px' }}>·</span>
                      <span style={{ color: colors.textMuted, fontSize: '11px' }}>{p.zone}</span>
                      {p.bedrooms > 0 && <span style={{ color: colors.textMuted, fontSize: '11px' }}>· {p.bedrooms} hab</span>}
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={handleUpload} disabled={uploading} style={{
                width: '100%', padding: '14px', marginTop: '16px',
                background: uploading ? colors.textMuted : colors.green,
                color: colors.white, border: 'none', borderRadius: '10px', fontSize: '15px',
                fontWeight: '600', cursor: uploading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              }}>
                {uploading ? 'Subiendo...' : `Subir ${preview.length} propiedades`}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ProfileScreen({ session, currentUser, onSaved }) {
  const [form, setForm] = useState({
    full_name: currentUser?.full_name || '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || session.user?.email || '',
  })
  const [avatarUrl, setAvatarUrl] = useState(currentUser?.avatar_url || '')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const fileRef = useRef()

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true); setError('')
    const fileName = `avatar_${session.user.id}_${Date.now()}`
    const { data, error: upErr } = await supabase.storage.from('property-photos').upload(fileName, file)
    if (!upErr) {
      const { data: urlData } = supabase.storage.from('property-photos').getPublicUrl(fileName)
      setAvatarUrl(urlData.publicUrl)
    } else {
      setError('Error al subir foto: ' + upErr.message)
    }
    setUploading(false)
  }

  const handleSave = async () => {
    if (!form.full_name) { setError('El nombre es obligatorio'); return }
    setSaving(true); setError(''); setSuccess('')
    const { error: err } = await supabase.from('profiles').update({
      full_name: form.full_name,
      phone: form.phone,
      email: form.email,
      avatar_url: avatarUrl,
    }).eq('id', session.user.id)
    if (err) {
      setError('Error al guardar: ' + err.message)
    } else {
      setSuccess('Perfil actualizado correctamente')
      onSaved()
    }
    setSaving(false)
  }

  const inputStyle = {
    width: '100%', padding: '12px 16px', background: colors.inputBg, border: `1px solid ${colors.border}`,
    borderRadius: '10px', color: colors.text, fontSize: '14px', outline: 'none', boxSizing: 'border-box',
  }
  const labelStyle = { color: colors.textSecondary, fontSize: '13px', fontWeight: '500', display: 'block', marginBottom: '6px' }

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h1 style={{ color: colors.text, fontSize: '24px', fontWeight: '700', margin: '0 0 24px' }}>Mi Perfil</h1>
      
      <div style={{ background: colors.card, borderRadius: '16px', border: `1px solid ${colors.border}`, padding: '24px' }}>
        {error && <div style={{ background: colors.redBg, color: colors.red, padding: '10px 14px', borderRadius: '10px', fontSize: '13px', marginBottom: '16px' }}>{error}</div>}
        {success && <div style={{ background: colors.greenBg, color: colors.green, padding: '10px 14px', borderRadius: '10px', fontSize: '13px', marginBottom: '16px' }}>{success}</div>}

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div onClick={() => fileRef.current?.click()} style={{
            width: '100px', height: '100px', borderRadius: '50%', margin: '0 auto 12px', cursor: 'pointer',
            background: avatarUrl ? `url(${avatarUrl}) center/cover` : `linear-gradient(135deg, ${colors.accent}, #8B5CF6)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: `3px solid ${colors.border}`, position: 'relative',
          }}>
            {!avatarUrl && <span style={{ color: colors.white, fontSize: '36px', fontWeight: '700' }}>{form.full_name ? form.full_name[0].toUpperCase() : '?'}</span>}
            <div style={{
              position: 'absolute', bottom: '0', right: '0', width: '28px', height: '28px',
              background: colors.accent, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `2px solid ${colors.card}`,
            }}>{Icons.camera}</div>
          </div>
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleAvatarUpload} />
          <p style={{ color: colors.textMuted, fontSize: '12px', margin: 0 }}>{uploading ? 'Subiendo...' : 'Toca para cambiar foto'}</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Nombre completo *</label>
            <input style={inputStyle} value={form.full_name} onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))} placeholder="Tu nombre completo" />
          </div>
          <div>
            <label style={labelStyle}>Teléfono</label>
            <input type="tel" style={inputStyle} value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="Ej: 70012345" />
          </div>
          <div>
            <label style={labelStyle}>Correo electrónico</label>
            <input type="email" style={inputStyle} value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="tu@correo.com" />
          </div>
          <button onClick={handleSave} disabled={saving} style={{
            width: '100%', padding: '14px', marginTop: '8px',
            background: saving ? colors.textMuted : `linear-gradient(135deg, ${colors.accent}, #8B5CF6)`,
            color: colors.white, border: 'none', borderRadius: '10px', fontSize: '15px',
            fontWeight: '600', cursor: saving ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          }}>
            {Icons.save} {saving ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('properties')
  const [properties, setProperties] = useState([])
  const [agents, setAgents] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({ operation: '', type: '', zone: '', priceMin: '', priceMax: '', bedrooms: '', bathrooms: '', status: '' })
  const [showForm, setShowForm] = useState(false)
  const [editProperty, setEditProperty] = useState(null)
  const [viewProperty, setViewProperty] = useState(null)
  const [propView, setPropView] = useState('all') // 'all' or 'mine'
  const [showBulkUpload, setShowBulkUpload] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  const loadData = useCallback(async () => {
    if (!session) return
    const [{ data: props }, { data: profs }] = await Promise.all([
      supabase.from('properties').select('*').order('created_at', { ascending: false }),
      supabase.from('profiles').select('id, full_name, phone, email, role'),
    ])
    if (props) setProperties(props)
    if (profs) setAgents(profs)
  }, [session])

  useEffect(() => { loadData() }, [loadData])

  const deleteProperty = async (id) => {
    await supabase.from('properties').delete().eq('id', id)
    loadData()
  }

  const filteredProperties = properties.filter(p => {
    if (propView === 'mine' && p.agent_id !== session?.user?.id) return false
    if (filters.operation && p.operation_type !== filters.operation) return false
    if (filters.type && p.property_type !== filters.type) return false
    if (filters.zone && p.zone !== filters.zone) return false
    if (filters.priceMin && Number(p.price) < Number(filters.priceMin)) return false
    if (filters.priceMax && Number(p.price) > Number(filters.priceMax)) return false
    if (filters.bedrooms && p.bedrooms < Number(filters.bedrooms)) return false
    if (filters.bathrooms && p.bathrooms < Number(filters.bathrooms)) return false
    if (filters.status && p.status !== filters.status) return false
    return true
  })

  const zones = [...new Set(properties.map(p => p.zone).filter(Boolean))].sort()

  const generateBrochure = (property) => {
    const agent = agents.find(a => a.id === property.agent_id)
    const opLabels = { venta: 'VENTA', alquiler: 'ALQUILER', anticretico: 'ANTICRÉTICO' }
    const typeLabels = { casa: 'Casa', departamento: 'Departamento', terreno: 'Terreno', oficina: 'Oficina', local_comercial: 'Local', otro: 'Otro' }
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${property.title}</title>
    <style>@media print{body{margin:0}.no-print{display:none}}body{font-family:'Segoe UI',sans-serif;max-width:800px;margin:0 auto;padding:24px;color:#222}
    .header{background:linear-gradient(135deg,#1B4F72,#6C63FF);color:white;padding:32px;border-radius:16px;margin-bottom:24px}
    .badge{display:inline-block;background:rgba(255,255,255,0.2);padding:4px 12px;border-radius:6px;font-size:13px;font-weight:600;margin-bottom:12px}
    .title{font-size:28px;font-weight:700;margin:8px 0}.price{font-size:32px;font-weight:700}
    .features{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin:24px 0}
    .feature{text-align:center;padding:16px;background:#f8f9fa;border-radius:12px}
    .feature-value{font-size:24px;font-weight:700;color:#1B4F72}.feature-label{font-size:12px;color:#666;margin-top:4px}
    .description{line-height:1.7;color:#444;margin:24px 0;padding:20px;background:#f8f9fa;border-radius:12px}
    .photos{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin:24px 0}.photos img{width:100%;height:200px;object-fit:cover;border-radius:12px}
    .agent{padding:20px;background:#1B4F72;color:white;border-radius:12px;display:flex;justify-content:space-between;align-items:center}
    .btn{display:block;width:100%;padding:14px;background:#6C63FF;color:white;border:none;border-radius:10px;font-size:16px;font-weight:600;cursor:pointer;margin-top:20px;box-sizing:border-box}</style></head>
    <body><div class="header"><span class="badge">${opLabels[property.operation_type]} · ${typeLabels[property.property_type]}</span>
    <div class="title">${property.title}</div><div class="price">Bs ${Number(property.price).toLocaleString('es-BO')}</div>
    <div style="opacity:0.9;font-size:15px;margin-top:8px">📍 ${property.zone}${property.address ? ` · ${property.address}` : ''} · Cochabamba</div></div>
    <div class="features"><div class="feature"><div class="feature-value">${property.bedrooms}</div><div class="feature-label">Habitaciones</div></div>
    <div class="feature"><div class="feature-value">${property.bathrooms}</div><div class="feature-label">Baños</div></div>
    <div class="feature"><div class="feature-value">${property.area_m2||'-'}</div><div class="feature-label">m²</div></div>
    <div class="feature"><div class="feature-value">${property.parking_spots}</div><div class="feature-label">Estacionamientos</div></div></div>
    ${property.description?`<div class="description"><strong>Descripción:</strong><br>${property.description}</div>`:''}
    ${property.photos?.length?`<div class="photos">${property.photos.map(u=>`<img src="${u}"/>`).join('')}</div>`:''}
    <div class="agent"><div><div style="font-size:12px;opacity:0.8">Contacto</div><div style="font-size:18px;font-weight:600">${agent?.full_name||'Sin asignar'}</div></div>
    <div style="text-align:right"><div style="font-size:12px;opacity:0.8">Teléfono</div><div style="font-size:18px;font-weight:600">${agent?.phone||'-'}</div></div></div>
    <button class="btn no-print" onclick="window.print()">🖨️ Imprimir / Guardar PDF</button></body></html>`
    const w = window.open('', '_blank')
    w.document.write(html)
    w.document.close()
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setSession(null)
  }

  if (loading) return <div style={{ minHeight: '100vh', background: colors.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.text }}>Cargando...</div>
  if (!session) return <LoginScreen onLogin={setSession} />

  const currentUser = agents.find(a => a.id === session.user?.id)

  return (
    <div style={{ minHeight: '100vh', background: colors.bg, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '10px 16px', background: colors.card, borderBottom: `1px solid ${colors.border}`,
        position: 'sticky', top: 0, zIndex: 100, flexWrap: 'wrap', gap: '6px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '8px',
            background: `linear-gradient(135deg, ${colors.accent}, #8B5CF6)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '14px', fontWeight: 'bold', color: colors.white,
          }}>O</div>
          <span style={{ color: colors.text, fontSize: '15px', fontWeight: '700' }}>OmniaTools</span>
        </div>
        <div style={{ display: 'flex', gap: '2px' }}>
          {[
            { key: 'properties', icon: Icons.home, label: 'Propiedades' },
            { key: 'clients', icon: Icons.users, label: 'Clientes' },
            { key: 'profile', icon: Icons.user, label: 'Perfil' },
          ].map(tab => (
            <button key={tab.key} onClick={() => setView(tab.key)} style={{
              padding: '6px 10px', borderRadius: '8px', border: 'none', cursor: 'pointer',
              background: view === tab.key ? colors.accentLight : 'transparent',
              color: view === tab.key ? colors.accent : colors.textSecondary, fontSize: '12px', fontWeight: '500',
              display: 'flex', alignItems: 'center', gap: '4px',
            }}>{tab.icon} <span style={{ display: 'inline' }}>{tab.label}</span></button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: colors.textSecondary, fontSize: '12px', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {currentUser?.full_name || session.user?.email}
          </span>
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: colors.textMuted, cursor: 'pointer', display: 'flex' }}>{Icons.logout}</button>
        </div>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>
        {view === 'properties' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h1 style={{ color: colors.text, fontSize: '20px', fontWeight: '700', margin: '0 0 4px' }}>Propiedades</h1>
                <p style={{ color: colors.textSecondary, fontSize: '13px', margin: 0 }}>{filteredProperties.length} de {properties.length} propiedades</p>
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <button onClick={() => setShowFilters(!showFilters)} style={{
                  padding: '8px 12px', borderRadius: '10px', border: `1px solid ${colors.border}`,
                  background: showFilters ? colors.accentLight : colors.card,
                  color: showFilters ? colors.accent : colors.textSecondary, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: '500',
                }}>{Icons.filter} Filtros</button>
                <button onClick={() => setShowBulkUpload(true)} style={{
                  padding: '8px 12px', borderRadius: '10px', border: `1px solid ${colors.border}`,
                  background: colors.card, color: colors.textSecondary, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: '500',
                }}>{Icons.upload} Excel</button>
                <button onClick={() => { setEditProperty(null); setShowForm(true) }} style={{
                  padding: '8px 12px', borderRadius: '10px', border: 'none',
                  background: `linear-gradient(135deg, ${colors.accent}, #8B5CF6)`,
                  color: colors.white, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: '600',
                }}>{Icons.plus} Nueva</button>
              </div>
            </div>

            {/* Toggle Todas / Mis propiedades */}
            <div style={{
              display: 'flex', marginBottom: '14px', background: colors.card,
              borderRadius: '10px', border: `1px solid ${colors.border}`, padding: '4px', width: 'fit-content',
            }}>
              <button onClick={() => setPropView('all')} style={{
                padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                background: propView === 'all' ? colors.accent : 'transparent',
                color: propView === 'all' ? colors.white : colors.textSecondary,
                fontSize: '13px', fontWeight: '600', transition: 'all 0.2s',
              }}>Todas</button>
              <button onClick={() => setPropView('mine')} style={{
                padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                background: propView === 'mine' ? colors.accent : 'transparent',
                color: propView === 'mine' ? colors.white : colors.textSecondary,
                fontSize: '13px', fontWeight: '600', transition: 'all 0.2s',
              }}>Mis propiedades</button>
            </div>

            {showFilters && <FiltersPanel filters={filters} setFilters={setFilters} zones={zones} />}

            {filteredProperties.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '50px 20px', color: colors.textSecondary, background: colors.card, borderRadius: '16px', border: `1px solid ${colors.border}` }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>🏠</div>
                <p style={{ fontSize: '16px', margin: '0 0 4px', color: colors.text }}>No hay propiedades</p>
                <p style={{ fontSize: '14px', margin: 0 }}>{properties.length > 0 ? 'Ajusta los filtros' : 'Agrega tu primera propiedad'}</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
                {filteredProperties.map(p => (
                  <PropertyCard key={p.id} property={p} agents={agents} currentUserId={session.user?.id}
                    onView={setViewProperty} onEdit={(prop) => { setEditProperty(prop); setShowForm(true) }}
                    onDelete={deleteProperty} showOwnerActions={propView === 'mine'} />
                ))}
              </div>
            )}
          </>
        )}

        {view === 'clients' && (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: colors.textSecondary, background: colors.card, borderRadius: '16px', border: `1px solid ${colors.border}` }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>👥</div>
            <h2 style={{ color: colors.text, fontSize: '20px', margin: '0 0 8px' }}>Módulo de Clientes</h2>
            <p style={{ fontSize: '14px', margin: 0 }}>Próximamente: gestión de clientes, calificación automática y seguimiento</p>
          </div>
        )}

        {view === 'profile' && (
          <ProfileScreen session={session} currentUser={currentUser} onSaved={loadData} />
        )}
      </div>

      {showForm && (
        <PropertyFormModal property={editProperty} session={session}
          onClose={() => { setShowForm(false); setEditProperty(null) }}
          onSaved={() => { setShowForm(false); setEditProperty(null); loadData() }} />
      )}
      {viewProperty && (
        <PropertyDetail property={viewProperty} agents={agents}
          onClose={() => setViewProperty(null)} onBrochure={generateBrochure} />
      )}
      {showBulkUpload && (
        <BulkUploadModal session={session}
          onClose={() => setShowBulkUpload(false)}
          onSaved={() => { setShowBulkUpload(false); loadData() }} />
      )}
    </div>
  )
}
