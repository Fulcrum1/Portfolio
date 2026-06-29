'use client'

import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'
import 'leaflet/dist/leaflet.css'

// ============================================
// DONNEES HOKAIDO AVEC PHOTOS SPECIFIQUES
// ============================================

const ETAPES_HOKKAIDO = [
  {
    jour: 1,
    ville: 'Shin-Chitose → Otaru',
    date: '4 juillet',
    lat: 43.199041,
    lng: 141.002118,
    note: 'Arrivée à Shin-Chitose, route vers Otaru — Canal historique + distillerie Nikka',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
    escales: [
      { nom: 'Aéroport Shin-Chitose', lat: 42.7791317, lng: 141.6866364, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/New_Chitose_Airport_Terminal_Building.jpg/800px-New_Chitose_Airport_Terminal_Building.jpg' },
      { nom: 'Canal d\'Otaru', lat: 43.199041, lng: 141.002118, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Otaru_Canal_2011.jpg/800px-Otaru_Canal_2011.jpg' },
      { nom: 'Otaru (nuit)', lat: 43.199041, lng: 141.002118, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80' },
    ],
    distance: '~50 km',
    duree: '1h',
    googleMaps: 'https://www.google.com/maps/dir/?api=1&origin=42.7791317,141.6866364&destination=43.199041,141.002118&travelmode=driving'
  },
  {
    jour: 2,
    ville: 'Otaru → Cap Shakotan → Otaru',
    date: '5 juillet',
    lat: 43.334329,
    lng: 140.346374,
    note: 'Excursion au Cap Shakotan — Shakotan Blue, falaises spectaculaires et mer de Jade',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Shakotan_Peninsula_2011.jpg/800px-Shakotan_Peninsula_2011.jpg',
    escales: [
      { nom: 'Otaru', lat: 43.199041, lng: 141.002118 },
      { nom: 'Cap Kamui (Shakotan)', lat: 43.334329, lng: 140.346374, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Shakotan_Peninsula_2011.jpg/400px-Shakotan_Peninsula_2011.jpg' },
      { nom: 'Otaru (nuit)', lat: 43.199041, lng: 141.002118 },
    ],
    distance: '~120 km (aller-retour)',
    duree: '3h',
    googleMaps: 'https://www.google.com/maps/dir/?api=1&origin=43.199041,141.002118&destination=43.334329,140.346374&waypoints=43.199041,141.002118&travelmode=driving'
  },
  {
    jour: 3,
    ville: 'Otaru → Rumoi',
    date: '6 juillet',
    lat: 43.9410074,
    lng: 141.6369432,
    note: 'Route littorale ouest — Côte sauvage du Japon de la mer',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Rumoi_Port_2011.jpg/800px-Rumoi_Port_2011.jpg',
    escales: [
      { nom: 'Otaru', lat: 43.199041, lng: 141.002118 },
      { nom: 'Rumoi (nuit)', lat: 43.9410074, lng: 141.6369432, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Rumoi_Port_2011.jpg/400px-Rumoi_Port_2011.jpg' },
    ],
    distance: '~200 km',
    duree: '3h30',
    googleMaps: 'https://www.google.com/maps/dir/?api=1&origin=43.199041,141.002118&destination=43.9410074,141.6369432&travelmode=driving'
  },
  {
    jour: 4,
    ville: 'Rumoi → Wakkanai → Cap Soya',
    date: '7 juillet',
    lat: 45.522945,
    lng: 141.9365908,
    note: 'Pointe nord du Japon — Cap Soya, vue sur Sakhaline',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Cape_Soya_Lighthouse_2011.jpg/800px-Cape_Soya_Lighthouse_2011.jpg',
    escales: [
      { nom: 'Rumoi', lat: 43.9410074, lng: 141.6369432 },
      { nom: 'Wakkanai', lat: 45.4156307, lng: 141.6733641, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Wakkanai_Port_2011.jpg/400px-Wakkanai_Port_2011.jpg' },
      { nom: 'Cap Soya (nuit)', lat: 45.522945, lng: 141.9365908, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Cape_Soya_Lighthouse_2011.jpg/400px-Cape_Soya_Lighthouse_2011.jpg' },
    ],
    distance: '~250 km',
    duree: '4h',
    googleMaps: 'https://www.google.com/maps/dir/?api=1&origin=43.9410074,141.6369432&destination=45.522945,141.9365908&waypoints=45.4156307,141.6733641&travelmode=driving'
  },
  {
    jour: 5,
    ville: 'Cap Soya → Abashiri',
    date: '8 juillet',
    lat: 44.0206059,
    lng: 144.2734837,
    note: 'Côte est — mer d\'Okhotsk, musée du givre',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Abashiri_Prison_Museum_2011.jpg/800px-Abashiri_Prison_Museum_2011.jpg',
    escales: [
      { nom: 'Cap Soya', lat: 45.522945, lng: 141.9365908 },
      { nom: 'Côte est (Omu/Monbetsu)', lat: 44.356439, lng: 143.354352, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Monbetsu_Hot_Spring_2011.jpg/400px-Monbetsu_Hot_Spring_2011.jpg' },
      { nom: 'Abashiri (nuit)', lat: 44.0206059, lng: 144.2734837, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Abashiri_Prison_Museum_2011.jpg/400px-Abashiri_Prison_Museum_2011.jpg' },
    ],
    distance: '~300 km',
    duree: '5h',
    googleMaps: 'https://www.google.com/maps/dir/?api=1&origin=45.522945,141.9365908&destination=44.0206059,144.2734837&waypoints=44.356439,143.354352&travelmode=driving'
  },
  {
    jour: 6,
    ville: 'Abashiri → Utoro / Shiretoko',
    date: '9 juillet',
    lat: 44.069034,
    lng: 144.990695,
    note: 'Parc national Shiretoko — UNESCO, cascades Furepe',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Shiretoko_National_Park_2011.jpg/800px-Shiretoko_National_Park_2011.jpg',
    escales: [
      { nom: 'Abashiri', lat: 44.0206059, lng: 144.2734837 },
      { nom: 'Utoro / Shiretoko (nuit)', lat: 44.069034, lng: 144.990695, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Shiretoko_National_Park_2011.jpg/400px-Shiretoko_National_Park_2011.jpg' },
    ],
    distance: '~150 km',
    duree: '2h30',
    googleMaps: 'https://www.google.com/maps/dir/?api=1&origin=44.0206059,144.2734837&destination=44.069034,144.990695&travelmode=driving'
  },
  {
    jour: 7,
    ville: 'Shiretoko → Rausu → Kawayu Onsen',
    date: '10 juillet',
    lat: 43.637226,
    lng: 144.4349948,
    note: 'Tour de la péninsule Shiretoko, Rausu, puis onsen naturel en bord de rivière',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Kawayu_Onsen_2011.jpg/800px-Kawayu_Onsen_2011.jpg',
    escales: [
      { nom: 'Utoro / Shiretoko', lat: 44.069034, lng: 144.990695 },
      { nom: 'Rausu', lat: 43.603204, lng: 145.292818, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Rausu_Town_2011.jpg/400px-Rausu_Town_2011.jpg' },
      { nom: 'Kawayu Onsen (nuit)', lat: 43.637226, lng: 144.4349948, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Kawayu_Onsen_2011.jpg/400px-Kawayu_Onsen_2011.jpg' },
    ],
    distance: '~200 km',
    duree: '4h',
    googleMaps: 'https://www.google.com/maps/dir/?api=1&origin=44.069034,144.990695&destination=43.637226,144.4349948&waypoints=43.603204,145.292818&travelmode=driving'
  },
  {
    jour: 8,
    ville: 'Kawayu Onsen → Lac Akan',
    date: '11 juillet',
    lat: 43.433669,
    lng: 144.089847,
    note: 'Lac Mashu, lac Kussharo, lac Akan volcanique — marimo',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Lake_Akan_2011.jpg/800px-Lake_Akan_2011.jpg',
    escales: [
      { nom: 'Kawayu Onsen', lat: 43.637226, lng: 144.4349948 },
      { nom: 'Lac Kussharo', lat: 43.587228, lng: 144.5237617, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Lake_Kussharo_2011.jpg/400px-Lake_Kussharo_2011.jpg' },
      { nom: 'Lac Mashu', lat: 43.61, lng: 144.36, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Lake_Mashu_2011.jpg/400px-Lake_Mashu_2011.jpg' },
      { nom: 'Lac Akan (nuit)', lat: 43.433669, lng: 144.089847, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Lake_Akan_2011.jpg/400px-Lake_Akan_2011.jpg' },
    ],
    distance: '~150 km',
    duree: '3h',
    googleMaps: 'https://www.google.com/maps/dir/?api=1&origin=43.637226,144.4349948&destination=43.433669,144.089847&waypoints=43.587228,144.5237617|43.61,144.36&travelmode=driving'
  },
  {
    jour: 9,
    ville: 'Lac Akan → Cap Erimo → Samani',
    date: '12 juillet',
    lat: 42.1208,
    lng: 142.935,
    note: 'Côte sud — Cap Erimo, vent et pinnipèdes, route panoramique',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Cape_Erimo_2011.jpg/800px-Cape_Erimo_2011.jpg',
    escales: [
      { nom: 'Lac Akan', lat: 43.433669, lng: 144.089847 },
      { nom: 'Cap Erimo', lat: 41.9246455, lng: 143.249249, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Cape_Erimo_2011.jpg/400px-Cape_Erimo_2011.jpg' },
      { nom: 'Samani (nuit)', lat: 42.1208, lng: 142.935, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Samani_Town_2011.jpg/400px-Samani_Town_2011.jpg' },
    ],
    distance: '~250 km',
    duree: '4h',
    googleMaps: 'https://www.google.com/maps/dir/?api=1&origin=43.433669,144.089847&destination=42.1208,142.935&waypoints=41.9246455,143.249249&travelmode=driving'
  },
  {
    jour: 10,
    ville: 'Samani → Furano → Asahikawa',
    date: '13 juillet',
    lat: 43.6306405,
    lng: 142.4283172,
    note: 'Champs de lavande — Farm Tomita, puis Asahikawa',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Furano_Lavender_Fields_2011.jpg/800px-Furano_Lavender_Fields_2011.jpg',
    escales: [
      { nom: 'Samani', lat: 42.1208, lng: 142.935 },
      { nom: 'Furano (Farm Tomita)', lat: 43.4182493, lng: 142.4280407, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Furano_Lavender_Fields_2011.jpg/400px-Furano_Lavender_Fields_2011.jpg' },
      { nom: 'Asahikawa (nuit)', lat: 43.6306405, lng: 142.4283172, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Asahikawa_City_2011.jpg/400px-Asahikawa_City_2011.jpg' },
    ],
    distance: '~250 km',
    duree: '4h',
    googleMaps: 'https://www.google.com/maps/dir/?api=1&origin=42.1208,142.935&destination=43.6306405,142.4283172&waypoints=43.4182493,142.4280407&travelmode=driving'
  },
  {
    jour: 11,
    ville: 'Asahikawa → Sounkyo → Shin-Chitose',
    date: '14 juillet',
    lat: 42.7791317,
    lng: 141.6866364,
    note: 'Gorges de Sounkyo, cascade Ryusei, retour à Shin-Chitose',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Sounkyo_Gorge_2011.jpg/800px-Sounkyo_Gorge_2011.jpg',
    escales: [
      { nom: 'Asahikawa', lat: 43.6306405, lng: 142.4283172 },
      { nom: 'Sounkyo', lat: 43.7065559, lng: 143.0075104, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Sounkyo_Gorge_2011.jpg/400px-Sounkyo_Gorge_2011.jpg' },
      { nom: 'Biei / Furano (retour)', lat: 43.7708833, lng: 142.3650083, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Biei_Hills_2011.jpg/400px-Biei_Hills_2011.jpg' },
      { nom: 'Shin-Chitose (départ)', lat: 42.7791317, lng: 141.6866364, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/New_Chitose_Airport_Terminal_Building.jpg/400px-New_Chitose_Airport_Terminal_Building.jpg' },
    ],
    distance: '~300 km',
    duree: '5h',
    googleMaps: 'https://www.google.com/maps/dir/?api=1&origin=43.6306405,142.4283172&destination=42.7791317,141.6866364&waypoints=43.7065559,143.0075104|43.7708833,142.3650083&travelmode=driving'
  },
]

// Tous les waypoints dans l'ordre pour la polyligne complète Hokkaido
const ALL_WAYPOINTS_HOKKAIDO = [
  [42.7791317, 141.6866364],
  [43.199041, 141.002118],
  [43.334329, 140.346374],
  [43.199041, 141.002118],
  [43.9410074, 141.6369432],
  [45.4156307, 141.6733641],
  [45.522945, 141.9365908],
  [44.356439, 143.354352],
  [44.0206059, 144.2734837],
  [44.069034, 144.990695],
  [43.603204, 145.292818],
  [43.637226, 144.4349948],
  [43.587228, 144.5237617],
  [43.61, 144.36],
  [43.433669, 144.089847],
  [41.9246455, 143.249249],
  [42.1208, 142.935],
  [43.4182493, 142.4280407],
  [43.6306405, 142.4283172],
  [43.7065559, 143.0075104],
  [43.7708833, 142.3650083],
  [42.7791317, 141.6866364],
]

// ============================================
// DONNEES TOKYO, KYOTO, FUKUOKA, NAGASAKI
// ============================================

const VILLES_JAPON = [
  {
    nom: 'Tokyo',
    duree: '4 jours',
    dates: '17–20 juillet',
    lat: 35.6895,
    lng: 139.6917,
    image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&q=80',
    items: [
      { nom: 'Shibuya Crossing', image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&q=80', note: 'Le carrefour le plus célèbre au monde' },
      { nom: 'Shibuya Sky', image: 'https://images.unsplash.com/photo-1604332435989-38a7a5a44417?w=400&q=80', note: 'Escalator vitré, vue à 229m (¥2 200 en ligne)' },
      { nom: 'Tokyo Tower', image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&q=80', note: 'Symbole de Tokyo, inspiré de la Tour Eiffel' },
      { nom: 'Escaliers sanctuaire Suga', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80', note: 'Lieu emblématique du film Your Name' },
      { nom: 'Berges rivière Tama', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80', note: 'Terrains inspirés d\'Inazuma Eleven' },
      { nom: 'Shinjuku Gyoen', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80', note: 'Jardin national avec serres et jardins japonais' },
      { nom: 'Odaiba', image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&q=80', note: 'Quartier futuriste avec Rainbow Bridge' },
      { nom: 'Harajuku / Takeshita Street', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80', note: 'Cœur de la mode kawaii et street food' },
      { nom: 'Roppongi', image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&q=80', note: 'Musées et vie nocturne animée' },
    ],
    googleMaps: 'https://www.google.com/maps/dir/?api=1&destination=35.6895,139.6917&travelmode=driving'
  },
  {
    nom: 'Kyoto',
    duree: '4 jours',
    dates: '21–24 juillet',
    lat: 35.0116,
    lng: 135.7681,
    image: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800&q=80',
    items: [
      { nom: 'Fushimi Inari Taisha', image: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=400&q=80', note: 'À visiter tôt le matin pour éviter la foule' },
      { nom: 'Arashiyama', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80', note: 'Bambouseraie + Tenryu-ji' },
      { nom: 'Gion', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80', note: 'Quartier des geishas, à visiter le soir' },
      { nom: 'Ninenzaka / Sannenzaka', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80', note: 'Rue pavée vers Kiyomizu-dera' },
      { nom: 'Nijo-jo', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80', note: 'Palais aux planchers chantants' },
      { nom: "Philosopher's Path", image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80', note: 'Promenade le long du canal' },
      { nom: 'Kiyomizu-dera', image: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=400&q=80', note: 'Temple avec vue imprenable sur Kyoto' },
      { nom: 'Pontocho', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80', note: 'Ruelle aux lanternes, ambiance le soir' },
    ],
    googleMaps: 'https://www.google.com/maps/dir/?api=1&destination=35.0116,135.7681&travelmode=driving'
  },
  {
    nom: 'Fukuoka',
    duree: '4 jours',
    dates: '25–28 juillet',
    lat: 33.5904,
    lng: 130.4017,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
    items: [
      { nom: 'Hakata Ramen', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80', note: 'Tonkotsu original, spécialité locale' },
      { nom: 'Yatai', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80', note: 'Stands street food en soirée' },
      { nom: 'Dazaifu Tenmangu', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Dazaifu_Tenmangu_Shrine_2011.jpg/400px-Dazaifu_Tenmangu_Shrine_2011.jpg', note: 'Sanctuaire shinto célèbre' },
      { nom: 'Canal City', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Canal_City_Hakata_2011.jpg/400px-Canal_City_Hakata_2011.jpg', note: 'Centre commercial et de loisirs' },
      { nom: 'Ohori Park', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Ohori_Park_2011.jpg/400px-Ohori_Park_2011.jpg', note: 'Grand parc avec lac et jardin japonais' },
      { nom: 'Ruines du château de Fukuoka', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Fukuoka_Castle_Ruins_2011.jpg/400px-Fukuoka_Castle_Ruins_2011.jpg', note: 'Site historique avec vue panoramique' },
    ],
    googleMaps: 'https://www.google.com/maps/dir/?api=1&destination=33.5904,130.4017&travelmode=driving'
  },
  {
    nom: 'Nagasaki',
    duree: '4 jours',
    dates: '29 juil. – 1er août',
    lat: 32.7505,
    lng: 129.8786,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
    items: [
      { nom: 'Mémorial de la Paix', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Nagasaki_Peace_Memorial_2011.jpg/400px-Nagasaki_Peace_Memorial_2011.jpg', note: 'Mémorial et musée de la bombe atomique' },
      { nom: 'Dejima', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Dejima_2011.jpg/400px-Dejima_2011.jpg', note: 'Ancienne concession hollandaise' },
      { nom: 'Glover Garden', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Glover_Garden_2011.jpg/400px-Glover_Garden_2011.jpg', note: 'Vue sur le port de Nagasaki' },
      { nom: 'Chinatown', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Nagasaki_Chinatown_2011.jpg/400px-Nagasaki_Chinatown_2011.jpg', note: 'Le plus vieux Chinatown du Japon' },
      { nom: 'Mont Inasa', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Mount_Inasa_2011.jpg/400px-Mount_Inasa_2011.jpg', note: 'Vue nocturne exceptionnelle' },
      { nom: 'Sanctuaire Suwa', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Suwa_Shrine_2011.jpg/400px-Suwa_Shrine_2011.jpg', note: 'Sanctuaire shinto historique' },
    ],
    googleMaps: 'https://www.google.com/maps/dir/?api=1&destination=32.7505,129.8786&travelmode=driving'
  },
]

// Coordinates pour la carte du Japon
const JAPON_WAYPOINTS = VILLES_JAPON.map(v => [v.lat, v.lng])

const COLS = ['#378ADD', '#1D9E75', '#D85A30', '#D4537E', '#BA7517', '#639922', '#533AB7', '#0F6E56', '#E24B4A', '#3B6D11', '#993556']

// Statistiques
const STATS = {
  hokkaido: {
    totalDistance: '~1 700 km',
    totalJours: '11 jours',
    dateDebut: '4 juillet 2026',
    dateFin: '14 juillet 2026',
    nombreEtapes: 11,
  },
  japon: {
    totalJours: '16 jours',
    dateDebut: '17 juillet 2026',
    dateFin: '1er août 2026',
    nombreVilles: 4,
  },
  total: {
    totalJours: '27 jours',
    dateDebut: '4 juillet 2026',
    dateFin: '1er août 2026',
  }
}

export default function Voyage() {
  const [posts, setPosts] = useState([])
  const [tab, setTab] = useState('hokkaido')
  const [selectedDay, setSelectedDay] = useState(null)
  const [selectedCity, setSelectedCity] = useState(null)

  const mapEl = useRef(null)
  const citiesMapEl = useRef(null)
  const mapInstance = useRef(null)
  const citiesMapInstance = useRef(null)
  const markersRef = useRef([])
  const citiesMarkersRef = useRef([])
  const polyRef = useRef(null)
  const citiesPolyRef = useRef(null)

  // Chargement des posts depuis Supabase
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

  // Initialisation de la carte Hokkaido
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const L = (await import('leaflet')).default
      if (cancelled || !mapEl.current || mapInstance.current) return

      const map = L.map(mapEl.current, {
        zoomControl: false,
        attributionControl: false,
      })
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 13,
      }).addTo(map)

      markersRef.current = ETAPES_HOKKAIDO.map((e, i) => {
        const icon = L.divIcon({
          className: '',
          html: `<div class="map-pin" style="background:${COLS[i % COLS.length]}">${e.jour}</div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        })
        const m = L.marker([e.lat, e.lng], { icon, zIndexOffset: 1000 }).addTo(map)
        m.on('click', () => setSelectedDay(e.jour))
        return m
      })

      mapInstance.current = map
      drawRoute(L, null)
    })()

    return () => { cancelled = true }
  }, [])

  // Initialisation de la carte Japon
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const L = (await import('leaflet')).default
      if (cancelled || !citiesMapEl.current || citiesMapInstance.current) return

      const map = L.map(citiesMapEl.current, {
        zoomControl: false,
        attributionControl: false,
      })
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 8,
      }).addTo(map)

      citiesMarkersRef.current = VILLES_JAPON.map((v, i) => {
        const icon = L.divIcon({
          className: '',
          html: `<div class="city-map-pin" style="background:#fff;color:#000;border:2px solid ${COLS[i % COLS.length]}">${v.nom.substring(0,2)}</div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        })
        const m = L.marker([v.lat, v.lng], { icon, zIndexOffset: 1000 }).addTo(map)
        m.on('click', () => setSelectedCity(v.nom))
        return m
      })

      citiesMapInstance.current = map
      drawCitiesRoute(L)
    })()

    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    return () => {
      mapInstance.current?.remove()
      mapInstance.current = null
      citiesMapInstance.current?.remove()
      citiesMapInstance.current = null
    }
  }, [])

  useEffect(() => {
    if (!mapInstance.current) return
    ;(async () => {
      const L = (await import('leaflet')).default
      drawRoute(L, selectedDay)
    })()
  }, [selectedDay])

  useEffect(() => {
    if (tab === 'hokkaido' && mapInstance.current) {
      setTimeout(() => mapInstance.current?.invalidateSize(), 50)
    }
    if (tab === 'japon' && citiesMapInstance.current) {
      setTimeout(() => citiesMapInstance.current?.invalidateSize(), 50)
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
      polyRef.current = L.polyline(ALL_WAYPOINTS_HOKKAIDO, {
        color: '#378ADD',
        weight: 3,
        opacity: 0.8,
        dashArray: '6 4',
      }).addTo(map)
      markersRef.current.forEach((m) => m.setOpacity(1))
      map.fitBounds(L.latLngBounds(ALL_WAYPOINTS_HOKKAIDO), { padding: [50, 50] })
    } else {
      const idx = day - 1
      const etape = ETAPES_HOKKAIDO[idx]
      const waypoints = etape.escales.map((e) => [e.lat, e.lng])
      if (waypoints.length >= 2) {
        polyRef.current = L.polyline(waypoints, {
          color: COLS[idx % COLS.length],
          weight: 4,
          opacity: 0.9,
        }).addTo(map)
      }
      markersRef.current.forEach((m, i) => m.setOpacity(i === idx ? 1 : 0.3))
      map.fitBounds(L.latLngBounds(waypoints), { padding: [50, 50], animate: true })
    }
  }

  function drawCitiesRoute(L) {
    const map = citiesMapInstance.current
    if (!map) return
    
    if (citiesPolyRef.current) {
      map.removeLayer(citiesPolyRef.current)
      citiesPolyRef.current = null
    }

    citiesPolyRef.current = L.polyline(JAPON_WAYPOINTS, {
      color: '#fff',
      weight: 2,
      opacity: 0.7,
      dashArray: '4 3',
    }).addTo(map)

    map.fitBounds(L.latLngBounds(JAPON_WAYPOINTS), { padding: [50, 50] })
  }

  const selectedHokkaido = selectedDay ? ETAPES_HOKKAIDO[selectedDay - 1] : null
  const selectedPost = selectedHokkaido ? posts.find((p) => p.jour === selectedHokkaido.jour) : null
  const selectedJapon = selectedCity ? VILLES_JAPON.find(v => v.nom === selectedCity) : null

  return (
    <main className="voyage">
      <header className="voyage-header">
        <h1>Road Trip Japon — Juillet/Août 2026</h1>
        <div className="stats-bar">
          <span className="stat-item">
            <strong>{STATS.total.totalJours}</strong>
            <small>Total</small>
          </span>
          <span className="stat-separator">·</span>
          <span className="stat-item">
            <strong>{STATS.hokkaido.totalJours}</strong>
            <small>Hokkaido</small>
          </span>
          <span className="stat-separator">·</span>
          <span className="stat-item">
            <strong>{STATS.japon.totalJours}</strong>
            <small>Tokyo · Kyoto · Fukuoka · Nagasaki</small>
          </span>
        </div>
      </header>

      <div className="vtabs" role="tablist">
        <button
          role="tab"
          aria-selected={tab === 'hokkaido'}
          className={`vtab ${tab === 'hokkaido' ? 'on' : ''}`}
          onClick={() => setTab('hokkaido')}
        >
          🏔️ Hokkaido (11 jours)
        </button>
        <button
          role="tab"
          aria-selected={tab === 'japon'}
          className={`vtab ${tab === 'japon' ? 'on' : ''}`}
          onClick={() => {
            setTab('japon')
            setSelectedCity(null)
          }}
        >
          🗼 Tokyo · Kyoto · Fukuoka · Nagasaki (16 jours)
        </button>
        <button
          role="tab"
          aria-selected={tab === 'news'}
          className={`vtab ${tab === 'news' ? 'on' : ''}`}
          onClick={() => setTab('news')}
        >
          📰 Dernières nouvelles
        </button>
      </div>

      {/* --- Hokkaido --- */}
      <section role="tabpanel" className={`section ${tab === 'hokkaido' ? 'on' : ''}`}>
        <div className="day-btns">
          <button
            className={`day-btn ${selectedDay === null ? 'on' : ''}`}
            aria-pressed={selectedDay === null}
            onClick={() => setSelectedDay(null)}
          >
            <span className="btn-icon">🗺️</span>
            Tout le trajet
          </button>
          {ETAPES_HOKKAIDO.map((e) => {
            const hasPost = posts.some((p) => p.jour === e.jour)
            return (
              <button
                key={e.jour}
                className={`day-btn ${selectedDay === e.jour ? 'on' : ''} ${hasPost ? 'has-post' : ''}`}
                aria-pressed={selectedDay === e.jour}
                onClick={() => setSelectedDay(e.jour)}
              >
                <span className="btn-icon">📍</span>
                J{e.jour} · {e.date}
              </button>
            )
          })}
        </div>

        <div className="map-container">
          <div className="hokkaido-map" ref={mapEl} />
          <div className="map-controls">
            <a 
              href={selectedHokkaido?.googleMaps || ETAPES_HOKKAIDO[0].googleMaps} 
              target="_blank" 
              rel="noopener noreferrer"
              className="google-maps-btn"
            >
              <span className="btn-icon">📱</span>
              Voir sur Google Maps
            </a>
          </div>
        </div>

        {selectedHokkaido ? (
          <div className="day-details">
            <div className="day-header">
              <div className="day-badge" style={{ background: COLS[selectedHokkaido.jour - 1] }}>
                Jour {selectedHokkaido.jour}
              </div>
              <div className="day-info">
                <h2>{selectedHokkaido.ville}</h2>
                <p className="date-muted">{selectedHokkaido.date}</p>
              </div>
            </div>

            {selectedHokkaido.image && (
              <div className="day-image-container">
                <img 
                  src={selectedHokkaido.image} 
                  alt={selectedHokkaido.ville} 
                  className="day-image"
                />
              </div>
            )}

            <div className="day-content">
              <p className="day-note">{selectedHokkaido.note}</p>
              
              <div className="day-stats">
                <span className="stat-badge">
                  <span className="stat-icon">📏</span>
                  {selectedHokkaido.distance}
                </span>
                <span className="stat-badge">
                  <span className="stat-icon">⏱️</span>
                  {selectedHokkaido.duree}
                </span>
              </div>

              <div className="escales-section">
                <h3>Escales</h3>
                <div className="escales">
                  {selectedHokkaido.escales.map((esc, i) => (
                    <div key={i} className="escale-item">
                      {i > 0 && <span className="arrow">→</span>}
                      <div className="escale-content">
                        <span className="escale-name">{esc.nom}</span>
                        {esc.image && (
                          <img 
                            src={esc.image} 
                            alt={esc.nom} 
                            className="escale-image"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedPost?.contenu && (
                <div className="post-section">
                  <h3>Mise à jour</h3>
                  <p className="post-text">{selectedPost.contenu}</p>
                </div>
              )}
              {selectedPost?.image_url && (
                <img 
                  className="post-img" 
                  src={selectedPost.image_url} 
                  alt={selectedHokkaido.ville}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="overview-card">
            <h2>Itinéraire Hokkaido complet</h2>
            <p className="muted">
              {STATS.hokkaido.totalDistance} · {STATS.hokkaido.totalJours} · {STATS.hokkaido.dateDebut} → {STATS.hokkaido.dateFin}
            </p>
            <p className="overview-text">
              Circuit complet de Hokkaido en moto, passant par les sites les plus emblématiques :
              Otaru et son canal historique, le Cap Shakotan et ses falaises, la pointe nord à Wakkanai,
              la péninsule sauvage de Shiretoko, les lacs volcaniques d\'Akan, les champs de lavande de Furano,
              et les gorges de Sounkyo.
            </p>
            <div className="overview-highlights">
              <div className="highlight"><span className="highlight-icon">🏞️</span><span>11 étapes uniques</span></div>
              <div className="highlight"><span className="highlight-icon">🌋</span><span>Paysages volcaniques</span></div>
              <div className="highlight"><span className="highlight-icon">🛶</span><span>Côtes sauvages</span></div>
              <div className="highlight"><span className="highlight-icon">🌸</span><span>Lavande en fleurs</span></div>
            </div>
          </div>
        )}
      </section>

      {/* --- Japon (Tokyo, Kyoto, Fukuoka, Nagasaki) --- */}
      <section role="tabpanel" className={`section ${tab === 'japon' ? 'on' : ''}`}>
        <div className="cities-map-container">
          <div className="cities-map" ref={citiesMapEl} />
        </div>
        
        <div className="cities-grid">
          {VILLES_JAPON.map((v, i) => (
            <div 
              className={`city-card ${selectedCity === v.nom ? 'selected' : ''}`}
              key={v.nom}
              onClick={() => setSelectedCity(selectedCity === v.nom ? null : v.nom)}
            >
              <div className="city-header">
                <h3>{v.nom}</h3>
                <span className="badge">{v.duree}</span>
              </div>
              <p className="city-dates">{v.dates}</p>
              
              {v.image && (
                <div className="city-image-container">
                  <img 
                    src={v.image} 
                    alt={v.nom} 
                    className="city-image"
                  />
                </div>
              )}
              
              <ul className="city-items">
                {v.items.map((it, idx) => (
                  <li key={idx}>
                    <div className="item-content">
                      <span className="item-name">{it.nom}</span>
                      {it.image && (
                        <img 
                          src={it.image} 
                          alt={it.nom} 
                          className="item-image"
                        />
                      )}
                    </div>
                    {it.note && <span className="item-note">{it.note}</span>}
                  </li>
                ))}
              </ul>
              
              <a 
                href={v.googleMaps} 
                target="_blank" 
                rel="noopener noreferrer"
                className="city-google-maps"
              >
                <span className="btn-icon">📱</span> Voir sur Google Maps
              </a>
            </div>
          ))}
        </div>

        {selectedJapon && (
          <div className="city-details-modal">
            <button className="modal-close" onClick={() => setSelectedCity(null)}>×</button>
            <div className="modal-content">
              <h2>{selectedJapon.nom}</h2>
              <p className="modal-dates">{selectedJapon.duree} · {selectedJapon.dates}</p>
              <img src={selectedJapon.image} alt={selectedJapon.nom} className="modal-image" />
              <h3>Activités prévues</h3>
              <ul className="modal-items">
                {selectedJapon.items.map((it, idx) => (
                  <li key={idx}>
                    <strong>{it.nom}</strong>
                    {it.note && <span> — {it.note}</span>}
                    {it.image && <img src={it.image} alt={it.nom} className="modal-item-image" />}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>

      {/* --- Dernières nouvelles --- */}
      <section role="tabpanel" className={`section ${tab === 'news' ? 'on' : ''}`}>
        <div className="news-container">
          {posts.length === 0 ? (
            <p className="muted no-news">Pas encore de nouvelles publiées.</p>
          ) : (
            posts.map((post) => {
              const etape = ETAPES_HOKKAIDO.find(e => e.jour === post.jour)
              return (
                <div className="news-card" key={post.id}>
                  <div className="news-header">
                    <div className="news-day-badge" style={{ background: etape ? COLS[etape.jour - 1] : '#378ADD' }}>
                      Jour {post.jour}
                    </div>
                    <div className="news-location">
                      <strong>{post.ville || 'Hokkaido'}</strong>
                      <span className="news-date">
                        {etape?.date ? ` · ${etape.date}` : ''}
                      </span>
                    </div>
                  </div>
                  {post.contenu && <p className="news-content">{post.contenu}</p>}
                  {post.image_url && (
                    <img 
                      src={post.image_url} 
                      alt="" 
                      className="news-image"
                    />
                  )}
                </div>
              )
            })
          )}
        </div>
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
          --radius: 12px;
          --radius-sm: 8px;
          --shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.2);

          max-width: 1200px;
          margin: 200px auto 40px;
          padding: 0 20px;
          color: var(--text-primary);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .voyage-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .voyage h1 {
          font-size: 28px;
          font-weight: 600;
          margin: 0 0 15px;
          background: linear-gradient(135deg, #378ADD, #D85A30);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stats-bar {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          padding: 15px;
          background: var(--surface-2);
          border-radius: var(--radius);
          border: 0.5px solid var(--border);
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .stat-item strong {
          font-size: 16px;
          color: var(--text-accent);
        }

        .stat-item small {
          font-size: 11px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          white-space: nowrap;
        }

        .stat-separator {
          color: var(--border-strong);
          font-size: 18px;
        }

        .vtabs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 25px;
          justify-content: center;
        }

        .vtab {
          font-size: 13px;
          padding: 10px 20px;
          border-radius: var(--radius);
          border: 0.5px solid var(--border-strong);
          background: var(--surface-2);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 500;
        }

        .vtab:hover {
          background: var(--surface-1);
          color: var(--text-primary);
          transform: translateY(-1px);
        }

        .vtab.on {
          background: linear-gradient(135deg, var(--bg-accent), rgba(224, 151, 80, 0.2));
          border-color: var(--border-accent);
          color: var(--text-accent);
          box-shadow: var(--shadow-sm);
        }

        .section {
          display: none;
        }

        .section.on {
          display: block;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .day-btns {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
          justify-content: center;
        }

        .day-btn {
          font-size: 12px;
          padding: 8px 14px;
          border-radius: var(--radius-sm);
          border: 0.5px solid var(--border);
          background: var(--surface-2);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .day-btn:hover {
          background: var(--surface-1);
          color: var(--text-primary);
          transform: translateY(-1px);
        }

        .day-btn.on {
          background: var(--bg-accent);
          border-color: var(--border-accent);
          color: var(--text-accent);
          box-shadow: var(--shadow-sm);
        }

        .day-btn.has-post::before {
          content: '';
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--text-success);
          margin-right: 4px;
        }

        .btn-icon {
          font-size: 12px;
        }

        .map-container {
          position: relative;
          border-radius: var(--radius);
          overflow: hidden;
          margin-bottom: 20px;
          box-shadow: var(--shadow);
        }

        .hokkaido-map {
          height: 500px;
          width: 100%;
          background: var(--surface-1);
        }

        .cities-map {
          height: 400px;
          width: 100%;
          background: var(--surface-1);
        }

        .map-controls {
          position: absolute;
          bottom: 15px;
          right: 15px;
          z-index: 1000;
        }

        .google-maps-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          background: rgba(255, 255, 255, 0.95);
          color: #333;
          border-radius: var(--radius-sm);
          text-decoration: none;
          font-size: 12px;
          font-weight: 500;
          transition: all 0.2s ease;
          box-shadow: var(--shadow-sm);
        }

        .google-maps-btn:hover {
          background: #fff;
          transform: translateY(-1px);
        }

        :global(.map-pin) {
          color: #fff;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 600;
          border: 2px solid #fff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
          transition: transform 0.2s ease;
        }

        :global(.map-pin:hover) {
          transform: scale(1.1);
        }

        :global(.city-map-pin) {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
        }

        .day-details {
          background: var(--surface-1);
          border: 0.5px solid var(--border);
          border-radius: var(--radius);
          padding: 25px;
          margin-bottom: 20px;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .day-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 0.5px solid var(--border);
        }

        .day-badge {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          flex-shrink: 0;
        }

        .day-info h2 {
          font-size: 20px;
          font-weight: 600;
          margin: 0 0 5px;
          color: var(--text-primary);
        }

        .date-muted {
          font-size: 13px;
          color: var(--text-muted);
          margin: 0;
        }

        .day-image-container {
          margin: 20px 0;
          border-radius: var(--radius);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
        }

        .day-image {
          width: 100%;
          height: auto;
          max-height: 300px;
          object-fit: cover;
          display: block;
        }

        .day-content {
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        .day-note {
          margin: 15px 0;
          font-size: 14px;
          color: var(--text-secondary);
        }

        .day-stats {
          display: flex;
          gap: 15px;
          margin: 15px 0;
          flex-wrap: wrap;
        }

        .stat-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: var(--surface-2);
          border-radius: 20px;
          font-size: 12px;
          color: var(--text-primary);
          border: 0.5px solid var(--border);
        }

        .stat-icon {
          font-size: 12px;
        }

        .escales-section {
          margin: 20px 0;
        }

        .escales-section h3 {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .escales-section h3::before {
          content: '📍';
        }

        .escales {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
        }

        .escale-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
        }

        .arrow {
          color: var(--border-strong);
          font-size: 14px;
        }

        .escale-content {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--surface-2);
          padding: 6px 12px;
          border-radius: 20px;
          border: 0.5px solid var(--border);
        }

        .escale-name {
          color: var(--text-primary);
          font-weight: 500;
        }

        .escale-image {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
        }

        .post-section {
          margin: 20px 0;
          padding: 15px;
          background: var(--surface-2);
          border-radius: var(--radius-sm);
          border: 0.5px solid var(--border);
        }

        .post-section h3 {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .post-section h3::before {
          content: '📝';
        }

        .post-text {
          margin: 0;
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .post-img {
          margin-top: 15px;
          max-width: 100%;
          border-radius: var(--radius-sm);
          display: block;
        }

        .overview-card {
          background: var(--surface-1);
          border: 0.5px solid var(--border);
          border-radius: var(--radius);
          padding: 25px;
          text-align: center;
        }

        .overview-card h2 {
          font-size: 20px;
          font-weight: 600;
          margin: 0 0 10px;
          color: var(--text-primary);
        }

        .overview-card .muted {
          font-size: 14px;
          color: var(--text-muted);
          margin: 0 0 20px;
        }

        .overview-text {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin: 0 0 25px;
          text-align: left;
        }

        .overview-highlights {
          display: flex;
          justify-content: center;
          gap: 15px;
          flex-wrap: wrap;
        }

        .highlight {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: var(--surface-2);
          border-radius: 20px;
          border: 0.5px solid var(--border);
          font-size: 13px;
          color: var(--text-secondary);
        }

        .highlight-icon {
          font-size: 14px;
        }

        .cities-map-container {
          position: relative;
          border-radius: var(--radius);
          overflow: hidden;
          margin-bottom: 30px;
          box-shadow: var(--shadow);
        }

        .cities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }

        .city-card {
          background: var(--surface-1);
          border: 0.5px solid var(--border);
          border-radius: var(--radius);
          overflow: hidden;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .city-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow);
          border-color: var(--border-strong);
        }

        .city-card.selected {
          border-color: var(--border-accent);
          box-shadow: 0 0 0 2px rgba(224, 151, 80, 0.3);
        }

        .city-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 15px 15px 10px;
          border-bottom: 0.5px solid var(--border);
        }

        .city-header h3 {
          font-size: 18px;
          font-weight: 600;
          margin: 0;
          color: var(--text-primary);
        }

        .badge {
          font-size: 11px;
          padding: 4px 10px;
          border-radius: 15px;
          background: var(--bg-accent);
          color: var(--text-accent);
          font-weight: 500;
        }

        .city-dates {
          font-size: 12px;
          color: var(--text-muted);
          padding: 0 15px 10px;
          margin: 0;
        }

        .city-image-container {
          padding: 0 15px;
          margin-bottom: 10px;
        }

        .city-image {
          width: 100%;
          height: 180px;
          object-fit: cover;
          border-radius: var(--radius-sm);
          display: block;
        }

        .city-items {
          margin: 0;
          padding: 0 15px 15px;
          list-style: none;
        }

        .city-items li {
          padding: 8px 0;
          border-bottom: 0.5px solid var(--border);
        }

        .city-items li:last-child {
          border-bottom: none;
        }

        .item-content {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .item-name {
          font-size: 13px;
          color: var(--text-primary);
          font-weight: 500;
        }

        .item-image {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          object-fit: cover;
          flex-shrink: 0;
        }

        .item-note {
          display: block;
          font-size: 11px;
          color: var(--text-muted);
          margin-top: 4px;
          padding-left: 42px;
        }

        .city-google-maps {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          margin: 0 15px 15px;
          background: var(--surface-2);
          color: var(--text-secondary);
          border-radius: var(--radius-sm);
          text-decoration: none;
          font-size: 12px;
          font-weight: 500;
          transition: all 0.2s ease;
          border: 0.5px solid var(--border);
        }

        .city-google-maps:hover {
          background: var(--bg-accent);
          color: var(--text-accent);
          border-color: var(--border-accent);
        }

        .city-details-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.2s ease;
        }

        .modal-close {
          position: absolute;
          top: 20px;
          right: 30px;
          background: none;
          border: none;
          color: #fff;
          font-size: 32px;
          cursor: pointer;
          padding: 5px 10px;
        }

        .modal-content {
          background: var(--surface-1);
          border: 0.5px solid var(--border);
          border-radius: var(--radius);
          max-width: 800px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          padding: 30px;
          position: relative;
        }

        .modal-content h2 {
          font-size: 24px;
          margin: 0 0 10px;
          color: var(--text-primary);
        }

        .modal-dates {
          font-size: 14px;
          color: var(--text-muted);
          margin: 0 0 20px;
        }

        .modal-image {
          width: 100%;
          height: auto;
          max-height: 300px;
          object-fit: cover;
          border-radius: var(--radius);
          margin-bottom: 20px;
        }

        .modal-content h3 {
          font-size: 18px;
          margin: 20px 0 15px;
          color: var(--text-primary);
        }

        .modal-items {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .modal-items li {
          padding: 12px 0;
          border-bottom: 0.5px solid var(--border);
        }

        .modal-items li:last-child {
          border-bottom: none;
        }

        .modal-item-image {
          width: 100%;
          height: auto;
          max-height: 200px;
          object-fit: cover;
          border-radius: var(--radius-sm);
          margin-top: 10px;
        }

        .news-container {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .no-news {
          text-align: center;
          padding: 40px;
          font-size: 14px;
        }

        .news-card {
          background: var(--surface-1);
          border: 0.5px solid var(--border);
          border-radius: var(--radius);
          padding: 20px;
          animation: slideUp 0.3s ease;
        }

        .news-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
          padding-bottom: 12px;
          border-bottom: 0.5px solid var(--border);
        }

        .news-day-badge {
          padding: 6px 12px;
          border-radius: 15px;
          font-size: 12px;
          font-weight: 600;
          color: #fff;
          flex-shrink: 0;
        }

        .news-location {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }

        .news-location strong {
          font-size: 15px;
          color: var(--text-primary);
        }

        .news-date {
          font-size: 12px;
          color: var(--text-muted);
        }

        .news-content {
          margin: 0;
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .news-image {
          margin-top: 15px;
          max-width: 100%;
          border-radius: var(--radius-sm);
          display: block;
        }

        .muted {
          color: var(--text-muted);
        }

        button:focus-visible {
          outline: 2px solid var(--border-accent);
          outline-offset: 2px;
        }

        @media (max-width: 768px) {
          .voyage {
            margin-top: 64px;
            padding: 15px;
          }

          .voyage h1 {
            font-size: 22px;
          }

          .stats-bar {
            gap: 15px;
          }

          .stat-item strong {
            font-size: 14px;
          }

          .stat-item small {
            font-size: 10px;
          }

          .vtabs {
            gap: 6px;
          }

          .vtab {
            font-size: 12px;
            padding: 8px 12px;
          }

          .day-btns {
            gap: 6px;
          }

          .day-btn {
            font-size: 11px;
            padding: 6px 10px;
          }

          .hokkaido-map {
            height: 350px;
          }

          .cities-map {
            height: 300px;
          }

          .cities-grid {
            grid-template-columns: 1fr;
          }

          .day-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .overview-highlights {
            gap: 10px;
          }

          .highlight {
            font-size: 12px;
            padding: 6px 12px;
          }

          .city-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .city-header h3 {
            font-size: 16px;
          }

          .modal-content {
            padding: 20px;
            margin: 10px;
          }

          .modal-content h2 {
            font-size: 20px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .vtab,
          .day-btn,
          .city-card,
          .news-card {
            transition: none;
          }
          * {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  )
}