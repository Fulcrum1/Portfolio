'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

// Votre itinéraire fixe
const ETAPES = [
  { jour: 1,  ville: 'Otaru',           date: '4 juillet' },
  { jour: 2,  ville: 'Otaru',           date: '5 juillet' },
  { jour: 3,  ville: 'Rumoi',           date: '6 juillet' },
  { jour: 4,  ville: 'Wakkanai',        date: '7 juillet' },
  { jour: 5,  ville: 'Abashiri',        date: '8 juillet' },
  { jour: 6,  ville: 'Utoro/Shiretoko', date: '9 juillet' },
  { jour: 7,  ville: 'Kawayu Onsen',    date: '10 juillet' },
  { jour: 8,  ville: 'Lac Akan',        date: '11 juillet' },
  { jour: 9,  ville: 'Samani',          date: '12 juillet' },
  { jour: 10, ville: 'Furano',          date: '13 juillet' },
  { jour: 11, ville: 'Sounkyo',         date: '14 juillet' },
]

export default function Voyage() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    // Chargement initial
    supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => setPosts(data || []))

    // Mise à jour en temps réel
    const channel = supabase
      .channel('posts')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'posts' },
        () => {
          supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false })
            .then(({ data }) => setPosts(data || []))
        }
      )
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  return (
    <main>
      <h1>Road Trip Hokkaido — Juillet 2026</h1>

      {/* Itinéraire */}
      <section>
        <h2>Parcours</h2>
        {ETAPES.map(e => {
          const post = posts.find(p => p.jour === e.jour)
          return (
            <div key={e.jour} className={post ? 'active' : 'pending'}>
              <span>Jour {e.jour} — {e.date}</span>
              <strong>{e.ville}</strong>
              {post && <p>{post.contenu}</p>}
              {post?.image_url && <img src={post.image_url} alt={e.ville} />}
            </div>
          )
        })}
      </section>

      {/* Posts récents */}
      <section>
        <h2>Dernières nouvelles</h2>
        {posts.map(post => (
          <div key={post.id}>
            <span>Jour {post.jour} — {post.ville}</span>
            {post.contenu && <p>{post.contenu}</p>}
            {post.image_url && <img src={post.image_url} alt="" />}
          </div>
        ))}
      </section>
    </main>
  )
}