'use client'

import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'
import 'leaflet/dist/leaflet.css'

// ⚠️ Dépendance requise : npm install leaflet
// (le module leaflet est importé dynamiquement plus bas, uniquement côté client)

// --- Itinéraire Hokkaido (fixe) ---
const ETAPES = [
  { jour: 1, ville: 'Otaru', date: '4 juillet', lat: 43.1907, lng: 140.9947, note: 'Canal + distillerie Nikka' },
  { jour: 2, ville: 'Otaru', date: '5 juillet', lat: 43.1951, lng: 140.9849, note: 'Cap Shakotan — Shakotan Blue' },
  { jour: 3, ville: 'Rumoi', date: '6 juillet', lat: 43.9333, lng: 141.6333, note: 'Route littorale ouest' },
  { jour: 4, ville: 'Wakkanai', date: '7 juillet', lat: 45.4158, lng: 141.6727, note: 'Pointe nord du Japon, cap Soya' },
  { jour: 5, ville: 'Abashiri', date: '8 juillet', lat: 44.0194, lng: 144.2728, note: "Côte est, mer d'Okhotsk" },
  { jour: 6, ville: 'Utoro/Shiretoko', date: '9 juillet', lat: 44.0781, lng: 144.9764, note: 'Parc national Shiretoko' },
  { jour: 7, ville: 'Kawayu Onsen', date: '10 juillet', lat: 43.6167, lng: 144.45, note: 'Onsen naturel en bord de rivière' },
  { jour: 8, ville: 'Lac Akan', date: '11 juillet', lat: 43.45, lng: 144.1, note: 'Lac volcanique, marimo' },
  { jour: 9, ville: 'Samani', date: '12 juillet', lat: 42.1236, lng: 142.9319, note: 'Côte sud, Cap Erimo' },
  { jour: 10, ville: 'Furano', date: '13 juillet', lat: 43.345, lng: 142.3833, note: 'Champs de lavande — Farm Tomita' },
  { jour: 11, ville: 'Sounkyo', date: '14 juillet', lat: 43.7333, lng: 142.75, note: 'Gorges, cascade Ryusei' },
]

const COLS = ['#378ADD', '#1D9E75', '#D85A30', '#D4537E', '#BA7517', '#639922', '#533AB7', '#0F6E56', '#E24B4A', '#3B6D11', '#993556']

// --- Repères villes (statique) ---
const VILLES = [
  {
    nom: 'Tokyo',
    duree: '4 jours',
    items: [
      'Shibuya Crossing',
      'Shibuya Sky — vue à 229m',
      'Tokyo Tower',
      'Escaliers du sanctuaire Suga (Your Name)',
      'Berges de la rivière Tama (terrains Inazuma Eleven)',
      'Shinjuku Gyoen',
      'Odaiba',
      'Harajuku / Takeshita Street',
      'Roppongi',
    ],
  },
  {
    nom: 'Kyoto',
    duree: '4 jours',
    items: [
      'Fushimi Inari Taisha — tôt le matin',
      'Arashiyama — bambouseraie + Tenryu-ji',
      'Gion — le soir',
      'Ninenzaka / Sannenzaka',
      'Nijo-jo',
      "Philosopher's Path",
      'Kiyomizu-dera',
      'Pontocho — le soir',
    ],
  },
  {
    nom: 'Fukuoka',
    duree: '4 jours',
    items: ['Hakata Ramen — tonkotsu original', 'Yatai — street food en soirée', 'Dazaifu Tenmangu', 'Canal City', 'Ohori Park', 'Ruines du château de Fukuoka'],
  },
  {
    nom: 'Nagasaki',
    duree: '4 jours',
    items: ['Mémorial de la Paix + musée', 'Dejima', 'Glover Garden — vue sur le port', 'Chinatown', 'Mont Inasa — vue nocturne', 'Sanctuaire Suwa'],
  },
]

export default function Voyage() {
  const [posts, setPosts] = useState([])
  const [tab, setTab] = useState('hokkaido') // 'hokkaido' | 'villes'
  const [selectedDay, setSelectedDay] = useState(null) // null = tout le trajet

  const mapEl = useRef(null)
  const mapInstance = useRef(null)
  const markersRef = useRef([])
  const polyRef = useRef(null)

  // --- Données Supabase (temps réel) ---
  useEffect(() => {
    const load = () =>
      supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .then(({ data }) => setPosts(data || []))

    load()

    const channel = supabase
      .channel('posts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, load)
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  // --- Init carte Leaflet (une seule fois) ---
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const L = (await import('leaflet')).default
      if (cancelled || !mapEl.current || mapInstance.current) return

      const map = L.map(mapEl.current)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 13,
      }).addTo(map)

      markersRef.current = ETAPES.map((e, i) => {
        const icon = L.divIcon({
          className: '',
          html: `<div class="map-pin" style="background:${COLS[i]}">${e.jour}</div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        })
        const m = L.marker([e.lat, e.lng], { icon }).addTo(map)
        m.on('click', () => setSelectedDay(e.jour))
        return m
      })

      mapInstance.current = map
      drawRoute(L, null)
    })()

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    return () => {
      mapInstance.current?.remove()
      mapInstance.current = null
    }
  }, [])

  // --- Redessine la carte quand on change de jour ---
  useEffect(() => {
    if (!mapInstance.current) return
    ;(async () => {
      const L = (await import('leaflet')).default
      drawRoute(L, selectedDay)
    })()
  }, [selectedDay])

  // --- Recalcule la taille de la carte quand l'onglet redevient visible ---
  useEffect(() => {
    if (tab === 'hokkaido' && mapInstance.current) {
      setTimeout(() => mapInstance.current?.invalidateSize(), 50)
    }
  }, [tab])

  function drawRoute(L, day) {
    const map = mapInstance.current
    if (!map) return
    if (polyRef.current) {
      map.removeLayer(polyRef.current)
      polyRef.current = null
    }

    if (day == null) {
      const ll = ETAPES.map((e) => [e.lat, e.lng])
      polyRef.current = L.polyline(ll, { color: '#378ADD', weight: 2.5, opacity: 0.7, dashArray: '6 4' }).addTo(map)
      markersRef.current.forEach((m) => m.setOpacity(1))
      map.fitBounds(L.latLngBounds(ll), { padding: [30, 30] })
    } else {
      const idx = day - 1
      const curr = ETAPES[idx]
      const prev = idx > 0 ? ETAPES[idx - 1] : null
      if (prev) {
        polyRef.current = L.polyline(
          [
            [prev.lat, prev.lng],
            [curr.lat, curr.lng],
          ],
          { color: COLS[idx], weight: 3, opacity: 0.85 }
        ).addTo(map)
      }
      markersRef.current.forEach((m, i) => m.setOpacity(i === idx ? 1 : 0.25))
      map.setView([curr.lat, curr.lng], 9, { animate: true })
    }
  }

  const selected = selectedDay ? ETAPES[selectedDay - 1] : null
  const selectedPost = selected ? posts.find((p) => p.jour === selected.jour) : null

  return (
    <main className="voyage">
      <h1>Road Trip Hokkaido — Juillet 2026</h1>

      <div className="vtabs" role="tablist">
        <button role="tab" aria-selected={tab === 'hokkaido'} className={`vtab ${tab === 'hokkaido' ? 'on' : ''}`} onClick={() => setTab('hokkaido')}>
          Hokkaido
        </button>
        <button role="tab" aria-selected={tab === 'villes'} className={`vtab ${tab === 'villes' ? 'on' : ''}`} onClick={() => setTab('villes')}>
          Tokyo · Kyoto · Fukuoka · Nagasaki
        </button>
      </div>

      {/* --- Hokkaido --- */}
      <section role="tabpanel" className={`section ${tab === 'hokkaido' ? 'on' : ''}`}>
        <div className="day-btns">
          <button className={`day-btn ${selectedDay === null ? 'on' : ''}`} aria-pressed={selectedDay === null} onClick={() => setSelectedDay(null)}>
            Tout le trajet
          </button>
          {ETAPES.map((e) => {
            const hasPost = posts.some((p) => p.jour === e.jour)
            return (
              <button
                key={e.jour}
                className={`day-btn ${selectedDay === e.jour ? 'on' : ''} ${hasPost ? 'has-post' : ''}`}
                aria-pressed={selectedDay === e.jour}
                onClick={() => setSelectedDay(e.jour)}
              >
                J{e.jour} — {e.ville.split('/')[0]}
              </button>
            )
          })}
        </div>

        <div className="hokkaido-map" ref={mapEl} />

        <div className="map-info">
          {selected ? (
            <>
              <span className="dot" style={{ background: COLS[selected.jour - 1] }} />
              <div className="map-info-body">
                <strong>{selected.ville}</strong>
                <span className="muted"> Jour {selected.jour} · {selected.date}</span>
                <div className="note">{selected.note}</div>
                {selectedPost?.contenu && <p className="post-text">{selectedPost.contenu}</p>}
                {selectedPost?.image_url && <img className="post-img" src={selectedPost.image_url} alt={selected.ville} />}
              </div>
            </>
          ) : (
            <span className="muted">Trajet complet — ~1 700 km, 11 jours</span>
          )}
        </div>
      </section>

      {/* --- Villes --- */}
      <section role="tabpanel" className={`section ${tab === 'villes' ? 'on' : ''}`}>
        <div className="city-grid">
          {VILLES.map((v) => (
            <div className="city-card" key={v.nom}>
              <h3>
                {v.nom} <span className="badge">{v.duree}</span>
              </h3>
              <ul>
                {v.items.map((it, i) => (
                  <li key={i}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* --- Dernières nouvelles --- */}
      <section className="news">
        <h2>Dernières nouvelles</h2>
        {posts.length === 0 && <p className="muted">Pas encore de nouvelles publiées.</p>}
        {posts.map((post) => (
          <div className="news-card" key={post.id}>
            <div className="news-head">
              <strong>Jour {post.jour}</strong>
              <span className="muted"> — {post.ville}</span>
            </div>
            {post.contenu && <p>{post.contenu}</p>}
            {post.image_url && <img src={post.image_url} alt="" />}
          </div>
        ))}
      </section>

      <style jsx>{`
        .voyage {
          --surface-0: var(--surface-0, #0b0b0d);
          --surface-1: var(--surface-1, #15151a);
          --surface-2: var(--surface-2, #1b1b22);
          --border: var(--border, rgba(255, 255, 255, 0.08));
          --border-strong: var(--border-strong, rgba(255, 255, 255, 0.16));
          --border-accent: var(--border-accent, rgba(224, 151, 80, 0.4));
          --bg-accent: var(--bg-accent, rgba(224, 151, 80, 0.12));
          --text-primary: var(--text-primary, #f2f1ee);
          --text-secondary: var(--text-secondary, #a3a1ab);
          --text-muted: var(--text-muted, #6b6975);
          --text-accent: var(--text-accent, #d9924f);
          --text-success: var(--text-success, #5fb878);
          --radius: var(--radius, 8px);

          max-width: 880px;
          margin: 0 auto;
          padding: 32px 20px 64px;
          color: var(--text-primary);
        }

        .voyage h1 {
          font-size: 22px;
          font-weight: 500;
          margin: 0 0 20px;
        }

        .voyage h2 {
          font-size: 14px;
          font-weight: 500;
          color: var(--text-accent);
          margin: 28px 0 12px;
        }

        .vtabs {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-bottom: 16px;
        }

        .vtab {
          font-size: 12px;
          padding: 6px 14px;
          border-radius: var(--radius);
          border: 0.5px solid var(--border-strong);
          background: var(--surface-2);
          color: var(--text-secondary);
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
        }
        .vtab:hover {
          background: var(--surface-1);
          color: var(--text-primary);
        }
        .vtab.on {
          background: var(--bg-accent);
          border-color: var(--border-accent);
          color: var(--text-accent);
        }

        .section {
          display: none;
        }
        .section.on {
          display: block;
        }

        .day-btns {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin: 10px 0;
        }
        .day-btn {
          font-size: 11px;
          padding: 4px 10px;
          border-radius: var(--radius);
          border: 0.5px solid var(--border);
          background: var(--surface-2);
          color: var(--text-secondary);
          cursor: pointer;
          transition: background 0.12s, color 0.12s;
        }
        .day-btn:hover {
          background: var(--surface-1);
        }
        .day-btn.on {
          background: var(--bg-accent);
          border-color: var(--border-accent);
          color: var(--text-accent);
        }
        .day-btn.has-post::before {
          content: '';
          display: inline-block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--text-success);
          margin-right: 5px;
        }

        .hokkaido-map {
          height: 380px;
          border-radius: 12px;
          border: 0.5px solid var(--border);
          overflow: hidden;
          background: var(--surface-1);
        }

        :global(.map-pin) {
          color: #fff;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 500;
          border: 2px solid #fff;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
        }

        .map-info {
          background: var(--surface-1);
          border: 0.5px solid var(--border);
          border-radius: 12px;
          padding: 10px 14px;
          margin-top: 8px;
          font-size: 13px;
          color: var(--text-secondary);
          min-height: 40px;
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }
        .map-info-body {
          flex: 1;
        }
        .dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 4px;
        }
        .muted {
          color: var(--text-muted);
        }
        .note {
          font-size: 12px;
          color: var(--text-secondary);
          margin-top: 2px;
        }
        .post-text {
          margin: 8px 0 0;
          font-size: 13px;
          color: var(--text-primary);
        }
        .post-img {
          margin-top: 8px;
          max-width: 100%;
          border-radius: 10px;
          display: block;
        }

        .city-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .city-card {
          background: var(--surface-2);
          border: 0.5px solid var(--border);
          border-radius: 12px;
          padding: 12px 14px;
        }
        .city-card h3 {
          font-size: 14px;
          font-weight: 500;
          margin: 0 0 8px;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .city-card ul {
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .city-card li {
          font-size: 12px;
          color: var(--text-secondary);
          padding: 3px 0;
          border-bottom: 0.5px solid var(--border);
          line-height: 1.4;
        }
        .city-card li:last-child {
          border-bottom: none;
        }
        .badge {
          font-size: 10px;
          padding: 2px 7px;
          border-radius: 10px;
          background: var(--bg-accent);
          color: var(--text-accent);
          font-weight: 400;
        }

        .news-card {
          background: var(--surface-1);
          border: 0.5px solid var(--border);
          border-radius: 12px;
          padding: 12px 14px;
          margin-bottom: 10px;
          font-size: 13px;
        }
        .news-head {
          margin-bottom: 4px;
        }
        .news-card p {
          margin: 4px 0 0;
          color: var(--text-secondary);
        }
        .news-card img {
          margin-top: 8px;
          max-width: 100%;
          border-radius: 10px;
          display: block;
        }

        button:focus-visible {
          outline: 2px solid var(--border-accent);
          outline-offset: 2px;
        }

        @media (max-width: 560px) {
          .city-grid {
            grid-template-columns: 1fr;
          }
          .hokkaido-map {
            height: 280px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .vtab,
          .day-btn {
            transition: none;
          }
        }
      `}</style>
    </main>
  )
}