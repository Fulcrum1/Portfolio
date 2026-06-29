'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

const MOT_DE_PASSE = 'Guigui21' // changez ça

export default function Admin() {
  const [auth, setAuth] = useState(false)
  const [mdp, setMdp] = useState('')
  const [jour, setJour] = useState(1)
  const [ville, setVille] = useState('')
  const [contenu, setContenu] = useState('')
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  if (!auth) return (
    <div>
      <input 
        type="password" 
        placeholder="Mot de passe"
        onChange={e => setMdp(e.target.value)} 
      />
      <button onClick={() => setAuth(mdp === MOT_DE_PASSE)}>
        Connexion
      </button>
    </div>
  )

  const handleSubmit = async () => {
    setLoading(true)
    let image_url = null

    // Upload image si présente
    if (image) {
      const { data } = await supabase.storage
        .from('voyage-images')
        .upload(`jour-${jour}-${Date.now()}`, image)
      
      if (data) {
        const { data: urlData } = supabase.storage
          .from('voyage-images')
          .getPublicUrl(data.path)
        image_url = urlData.publicUrl
      }
    }

    // Insertion du post
    await supabase.from('posts').insert({ jour, ville, contenu, image_url })
    
    setContenu('')
    setImage(null)
    setLoading(false)
    alert('Post envoyé !')
  }

  return (
    <div>
      <h1>Poster une mise à jour</h1>
      
      <select onChange={e => setJour(Number(e.target.value))}>
        {Array.from({length: 11}, (_, i) => (
          <option key={i+1} value={i+1}>Jour {i+1}</option>
        ))}
      </select>

      <input 
        placeholder="Ville" 
        value={ville}
        onChange={e => setVille(e.target.value)} 
      />

      <textarea 
        placeholder="Votre message..."
        value={contenu}
        onChange={e => setContenu(e.target.value)}
        rows={4}
      />

      <input 
        type="file" 
        accept="image/*"
        onChange={e => setImage(e.target.files[0])} 
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Envoi...' : 'Publier'}
      </button>
    </div>
  )
}