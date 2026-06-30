'use client'

import { useEffect, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'

// ─────────────────────────────────────────────
// PHOTOS — regroupées par THÈME plutôt que par lieu exact.
// Limite assumée : je ne peux pas obtenir d'URL hotlink vérifiée vers
// la photo précise d'un lieu donné. Plutôt que de deviner un lien qui
// risque de ne pas correspondre, chaque entrée pointe vers une photo
// stock dont le THÈME est cohérent avec le lieu (cascade pour une
// cascade, lac pour un lac, sanctuaire pour un sanctuaire, etc.).
// → Les vraies photos du voyage remplaceront ça au fur et à mesure
//   via la page /voyage/admin (postActif.image_url prend le dessus).
// ─────────────────────────────────────────────
const PH = {
  // Ville / canal / port
  otaru:        'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=1000&q=80', // canal urbain
  nikka:        'https://images.unsplash.com/photo-1582819509237-d3a890c9c2f9?w=1000&q=80', // distillerie / fûts
  rumoi:        'https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?w=1000&q=80', // port de pêche
  monbetsu:     'https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?w=1000&q=80', // port de pêche
  wakkanai:     'https://images.unsplash.com/photo-1605648916319-cf082f7634b5?w=1000&q=80', // ville côtière nord
  chitose:      'https://images.unsplash.com/photo-1542296332-2e4473faf563?w=1000&q=80', // aéroport / terminal
  abashiri:     'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1000&q=80', // bâtiment historique

  // Côte / falaises / cap
  shakotan:     'https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=1000&q=80', // côte rocheuse eau turquoise
  soya:         'https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=1000&q=80', // cap / phare / horizon
  erimo:        'https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=1000&q=80', // cap venteux
  erimo2:       'https://images.unsplash.com/photo-1551244072-5d12893278ab?w=1000&q=80', // côte rocheuse / faune marine

  // Plaines / nature sauvage
  sarobetsu:    'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1000&q=80', // plaine fleurie
  notsuke:      'https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=1000&q=80', // forêt / arbres morts dans l'eau
  obihiro:      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000&q=80', // plaine agricole

  // UNESCO / parc national / montagne
  shiretoko5:   'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1000&q=80', // lac forestier
  shiretoko:    'https://images.unsplash.com/photo-1493815793585-d94ccbc86df8?w=1000&q=80', // vue aérienne nature
  colShiretoko: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=1000&q=80', // route de montagne
  utoro:        'https://images.unsplash.com/photo-1545419913-775e3e82c7db?w=1000&q=80', // port / coucher de soleil mer

  // Cascade
  oshinkoshin:  'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1000&q=80',
  sounkyo:      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1000&q=80',

  // Lacs volcaniques
  mashu:        'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1000&q=80',
  kussharo:     'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1000&q=80',
  akan:         'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1000&q=80',
  ainu:         'https://images.unsplash.com/photo-1601758125946-6ac8a6acb7d2?w=1000&q=80', // artisanat / culture traditionnelle

  // Lavande / champs colorés
  furano:       'https://images.unsplash.com/photo-1498963564893-c11b6b67d52e?w=1000&q=80',
  farmTomita:   'https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=1000&q=80',
  biei:         'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1000&q=80',

  // Ville
  asahikawa:    'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=1000&q=80',

  // Tokyo
  tokyo:        'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1000&q=80', // skyline nuit
  tokyoTower:   'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1000&q=80', // tour illuminée
  shibuya:      'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1000&q=80', // carrefour urbain
  shibuyaSky:   'https://images.unsplash.com/photo-1601823984263-b87b59798b00?w=1000&q=80', // vue depuis hauteur
  yourName:     'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=1000&q=80', // ruelle / escaliers urbains
  tamaRiver:    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000&q=80', // berge / terrain

  // Kyoto
  kyoto:        'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=1000&q=80', // torii rouges
  fushimi:      'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=1000&q=80', // torii rouges
  arashiyama:   'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000&q=80', // bambous
  gion:         'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1000&q=80', // ruelle traditionnelle
  ninenzaka:    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1000&q=80', // rue pavée traditionnelle
  kiyomizu:     'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=1000&q=80', // temple en bois

  // Fukuoka
  fukuoka:      'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=1000&q=80',
  yatai:        'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1000&q=80', // street food / ramen
  ramen:        'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1000&q=80',
  dazaifu:      'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=1000&q=80', // sanctuaire / temple

  // Nagasaki
  nagasaki:     'https://images.unsplash.com/photo-1545419913-775e3e82c7db?w=1000&q=80', // port / mer
  peace:        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000&q=80', // mémorial / parc
  dejima:       'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1000&q=80', // bâtiment historique
  glover:       'https://images.unsplash.com/photo-1551244072-5d12893278ab?w=1000&q=80', // jardin avec vue
}

// ─────────────────────────────────────────────
// ITINÉRAIRE HOKKAIDO — 11 jours
// ─────────────────────────────────────────────
const ETAPES = [
  {
    jour: 1, ville: 'Shin-Chitose → Otaru', date: '4 juillet', emoji: '✈️',
    lat: 43.199041, lng: 141.002118, image: PH.otaru,
    note: 'Arrivée à 15h à Shin-Chitose. Dépôt de la valise à la consigne de l\'aéroport, puis train direct vers Otaru (1h20). Soirée au bord du canal historique illuminé, sushis dans la ruelle Sushiya-dori.',
    distance: '~50 km', duree: '1h20 en train', arrivee: '~17h00',
    tags: ['Arrivée', 'Train', 'Pas de moto aujourd\'hui'],
    escales: [
      { nom: 'Aéroport Shin-Chitose', lat: 42.7791317, lng: 141.6866364, image: PH.chitose, note: 'Dépôt valise consigne T. International 2F (¥880/j)' },
      { nom: 'Canal d\'Otaru', lat: 43.199041, lng: 141.002118, image: PH.otaru, note: 'Canal historique de l\'ère Meiji, illuminé le soir' },
      { nom: 'Sushiya-dori', lat: 43.195, lng: 141.003, image: PH.otaru, note: 'Rue des sushis — dîner incontournable à Otaru' },
    ],
    googleMaps: 'https://www.google.com/maps/dir/42.7791317,141.6866364/43.199041,141.002118',
  },
  {
    jour: 2, ville: 'Otaru → Cap Shakotan → Otaru', date: '5 juillet', emoji: '🏍️',
    lat: 43.334329, lng: 140.346374, image: PH.shakotan,
    note: '1er jour en moto ! Retrait de la V-Strom 650XT à Rental819 Shin-Chitose dès 8h, retour vers Otaru pour la grande excursion de la journée. La péninsule de Shakotan et son "Shakotan Blue". Randonnée 50 min A/R jusqu\'au phare du Cap Kamui. Retour à Otaru le soir (2ème nuit).',
    distance: '~120 km (aller-retour)', duree: '3h de route', arrivee: '~18h00',
    tags: ['1er jour moto', 'Excursion', 'Plage', 'Falaises'],
    escales: [
      { nom: 'Rental819 Shin-Chitose', lat: 42.7791317, lng: 141.6866364, image: PH.chitose, note: 'Retrait V-Strom 650XT dès 8h — navette gratuite depuis l\'aéroport' },
      { nom: 'Distillerie Nikka (Yoichi)', lat: 43.199, lng: 140.784, image: PH.nikka, note: 'La distillerie de whisky la plus réputée d\'Hokkaido, fondée en 1934' },
      { nom: 'Cap Kamui (Shakotan)', lat: 43.334329, lng: 140.346374, image: PH.shakotan, note: 'Le "Shakotan Blue" — eau émeraude entre les falaises volcaniques' },
      { nom: 'Otaru (2ème nuit)', lat: 43.199041, lng: 141.002118, image: PH.otaru, note: 'Retour à l\'hébergement' },
    ],
    googleMaps: 'https://www.google.com/maps/dir/43.199041,141.002118/43.199,140.784/43.334329,140.346374/43.199041,141.002118',
  },
  {
    jour: 3, ville: 'Otaru → Côte de la mer du Japon → Rumoi', date: '6 juillet', emoji: '🏍️',
    lat: 43.9410074, lng: 141.6369432, image: PH.rumoi,
    note: 'Route littorale de la mer du Japon vers le nord. Paysages côtiers sauvages, falaises noires, peu de touristes. Arrivée à Rumoi en milieu d\'après-midi — port de pêche typique d\'Hokkaido.',
    distance: '~200 km', duree: '3h30', arrivee: '~13h00',
    tags: ['Côte ouest', 'Route littorale', 'Pêche'],
    escales: [
      { nom: 'Otaru (départ)', lat: 43.199041, lng: 141.002118, image: PH.otaru },
      { nom: 'Route côtière R231', lat: 43.6, lng: 141.3, image: PH.rumoi, note: 'Route nationale longeant la mer du Japon — tunnels, falaises, villages de pêcheurs' },
      { nom: 'Rumoi (nuit)', lat: 43.9410074, lng: 141.6369432, image: PH.rumoi, note: 'Port de Rumoi — spécialité locale : harrako-meshi (riz aux œufs de saumon)' },
    ],
    googleMaps: 'https://www.google.com/maps/dir/43.199041,141.002118/43.9410074,141.6369432',
  },
  {
    jour: 4, ville: 'Rumoi → Plaine de Sarobetsu → Wakkanai → Cap Sōya', date: '7 juillet', emoji: '🏍️',
    lat: 45.522945, lng: 141.9365908, image: PH.soya,
    note: 'Grande remontée vers le nord. Plaine de Sarobetsu en chemin — marais fleuris, chevaux sauvages, paysages quasi arctiques. Déjeuner à Wakkanai, puis cap Sōya : le point le plus septentrional du Japon. Vue sur l\'île russe de Sakhaline par temps clair.',
    distance: '~210 km', duree: '4h', arrivee: '~15h00 (cap Sōya)',
    tags: ['Point le + au nord', 'Russie visible', 'Vent fort'],
    escales: [
      { nom: 'Rumoi (départ)', lat: 43.9410074, lng: 141.6369432, image: PH.rumoi },
      { nom: 'Plaine de Sarobetsu', lat: 45.0, lng: 141.7, image: PH.sarobetsu, note: 'Marais fleuris et prairies sauvages — paysage quasi arctique, chevaux Dosanko' },
      { nom: 'Wakkanai', lat: 45.4156307, lng: 141.6733641, image: PH.wakkanai, note: 'Ville la plus au nord du Japon — Dôme de brise-lames, sanctuaire Wakkanai-jinja' },
      { nom: 'Cap Sōya (nuit à Wakkanai)', lat: 45.522945, lng: 141.9365908, image: PH.soya, note: 'Monument du point le plus nord du Japon — vue sur Sakhaline (Russie) à 43 km' },
    ],
    googleMaps: 'https://www.google.com/maps/dir/43.9410074,141.6369432/45.4156307,141.6733641/45.522945,141.9365908',
  },
  {
    jour: 5, ville: 'Wakkanai → Monbetsu → Abashiri', date: '8 juillet', emoji: '🏍️',
    lat: 44.0206059, lng: 144.2734837, image: PH.abashiri,
    note: 'Traversée vers la côte d\'Okhotsk — paysages de toundra, lacs côtiers. Déjeuner à Monbetsu avec le crabe de Hokkaido (incontournable). Arrivée à Abashiri en fin d\'après-midi.',
    distance: '~270 km', duree: '4h30', arrivee: '~16h30',
    tags: ['Côte Okhotsk', 'Toundra', 'Crabe Hokkaido'],
    escales: [
      { nom: 'Wakkanai (départ)', lat: 45.4156307, lng: 141.6733641, image: PH.wakkanai },
      { nom: 'Monbetsu', lat: 44.356439, lng: 143.354352, image: PH.monbetsu, note: 'Déjeuner — crabe de Hokkaido en saison, musée des glaces de banquise' },
      { nom: 'Abashiri (nuit)', lat: 44.0206059, lng: 144.2734837, image: PH.abashiri, note: 'Musée de la Prison à visiter dès l\'arrivée ou le lendemain matin' },
    ],
    googleMaps: 'https://www.google.com/maps/dir/45.4156307,141.6733641/44.356439,143.354352/44.0206059,144.2734837',
  },
  {
    jour: 6, ville: 'Abashiri → Cascade Oshinkoshin → Utoro / Shiretoko', date: '9 juillet', emoji: '🏍️',
    lat: 44.069034, lng: 144.990695, image: PH.shiretoko5,
    note: 'Matinée au Musée de la Prison d\'Abashiri (architecture en étoile à 5 branches). Route côtière d\'Okhotsk, cascade Oshinkoshin qui se divise en deux. Entrée dans le parc national de Shiretoko — les Shiretoko Five Lakes l\'après-midi.',
    distance: '~90 km', duree: '2h', arrivee: '~14h00',
    tags: ['UNESCO Shiretoko', 'Prison museum', 'Oshinkoshin'],
    escales: [
      { nom: 'Musée Prison d\'Abashiri', lat: 43.9952454, lng: 144.2299177, image: PH.abashiri, note: 'Architecture unique en étoile, histoire de la colonisation d\'Hokkaido (¥1 500)' },
      { nom: 'Cascade Oshinkoshin', lat: 44.0716, lng: 144.8482, image: PH.oshinkoshin, note: 'La cascade "double" qui se scinde en deux en tombant dans la mer d\'Okhotsk' },
      { nom: 'Shiretoko Five Lakes', lat: 44.069, lng: 144.95, image: PH.shiretoko5, note: '5 lacs reliés par un chemin de bois — ours possibles, entrée guidée en saison' },
      { nom: 'Utoro / Shiretoko (nuit)', lat: 44.069034, lng: 144.990695, image: PH.utoro, note: 'Port d\'Utoro — croisières Shiretoko, coucher de soleil sur le Pacifique' },
    ],
    googleMaps: 'https://www.google.com/maps/dir/44.0206059,144.2734837/43.9952454,144.2299177/44.0716,144.8482/44.069034,144.990695',
  },
  {
    jour: 7, ville: 'Utoro → Col de Shiretoko → Presqu\'île de Notsuke → Kawayu', date: '10 juillet', emoji: '🏍️',
    lat: 43.637226, lng: 144.4349948, image: PH.notsuke,
    note: 'La plus belle journée de route. Col de Shiretoko (route spectaculaire, ours fréquents). Descente vers Rausu côté Pacifique. Presqu\'île de Notsuke : forêt de pins morts de Todowara dans la mer — ambiance fin du monde. Ryokan à Kawayu le soir.',
    distance: '~170 km', duree: '4h', arrivee: '~17h00',
    tags: ['Col de Shiretoko', 'Ours possibles', 'Notsuke', 'Ryokan'],
    escales: [
      { nom: 'Utoro (départ)', lat: 44.069034, lng: 144.990695, image: PH.utoro },
      { nom: 'Col de Shiretoko (738m)', lat: 44.11, lng: 145.02, image: PH.colShiretoko, note: 'Route de montagne spectaculaire — ours apparaissent régulièrement' },
      { nom: 'Rausu', lat: 43.81, lng: 145.18, image: PH.shiretoko, note: 'Côté Pacifique, village de pêcheurs — observation des orques en saison' },
      { nom: 'Todowara (Notsuke)', lat: 43.6032035, lng: 145.2928179, image: PH.notsuke, note: 'Forêt de pins morts dans la mer d\'Okhotsk — silence absolu, cerfs sauvages' },
      { nom: 'Kawayu Onsen (nuit)', lat: 43.637226, lng: 144.4349948, image: PH.mashu, note: '🏯 RYOKAN #1 — Kawayu Kanko Hotel. Onsen naturel pH 1.4' },
    ],
    googleMaps: 'https://www.google.com/maps/dir/44.069034,144.990695/44.11,145.02/43.81,145.18/43.6032035,145.2928179/43.637226,144.4349948',
  },
  {
    jour: 8, ville: 'Kawayu → Lac Mashu → Lac Kussharo → Lac Akan', date: '11 juillet', emoji: '🏍️',
    lat: 43.433669, lng: 144.089847, image: PH.mashu,
    note: 'La journée des 3 lacs volcaniques. Lac Mashu tôt le matin (souvent dans la brume). Lac Kussharo, le plus grand lac de caldera du Japon avec ses sources chaudes naturelles. Village Aïnou d\'Akan le soir.',
    distance: '~130 km', duree: '3h', arrivee: '~16h00',
    tags: ['3 lacs volcaniques', 'Lac Mashu', 'Village Aïnou'],
    escales: [
      { nom: 'Kawayu (départ)', lat: 43.637226, lng: 144.4349948, image: PH.mashu },
      { nom: 'Lac Mashu (belvédère)', lat: 43.5872284, lng: 144.5237617, image: PH.mashu, note: 'Un des lacs les plus clairs au monde — arriver tôt avant la brume' },
      { nom: 'Lac Kussharo', lat: 43.61, lng: 144.36, image: PH.kussharo, note: 'Le plus grand lac de caldera du Japon. Sources chaudes sur la plage de sable' },
      { nom: 'Village Aïnou d\'Akan', lat: 43.433669, lng: 144.089847, image: PH.ainu, note: 'Culture des peuples premiers d\'Hokkaido. Danses traditionnelles (¥1 000 env.)' },
      { nom: 'Lac Akan (nuit)', lat: 43.4572585, lng: 144.1040147, image: PH.akan, note: 'Lac volcanique avec les marimo, symbole d\'Hokkaido' },
    ],
    googleMaps: 'https://www.google.com/maps/dir/43.637226,144.4349948/43.5872284,144.5237617/43.61,144.36/43.433669,144.089847',
  },
  {
    jour: 9, ville: 'Lac Akan → Obihiro → Route 336 → Cap Erimo → Samani', date: '12 juillet', emoji: '🏍️',
    lat: 42.1208, lng: 142.935, image: PH.erimo,
    note: 'Traversée de la plaine du Tokachi, déjeuner à Obihiro (Butadon). Route 336 "Golden Road". Cap Erimo : l\'endroit le plus venté du Japon, lions de mer sur les rochers.',
    distance: '~270 km', duree: '5h', arrivee: '~18h00',
    tags: ['Plaine du Tokachi', 'Golden Road', 'Lions de mer'],
    escales: [
      { nom: 'Lac Akan (départ)', lat: 43.4572585, lng: 144.1040147, image: PH.akan },
      { nom: 'Obihiro (déjeuner)', lat: 42.9233354, lng: 143.197199, image: PH.obihiro, note: 'Butadon — bol de tranches de porc grillé, spécialité d\'Obihiro' },
      { nom: 'Route 336 "Golden Road"', lat: 42.3, lng: 143.2, image: PH.erimo, note: 'Route panoramique surnommée "Golden Road" pour son coût de construction' },
      { nom: 'Cap Erimo', lat: 41.9246455, lng: 143.249249, image: PH.erimo2, note: 'L\'endroit le plus venté du Japon — lions de mer, musée du vent (¥600)' },
      { nom: 'Samani / Urakawa (nuit)', lat: 42.1208, lng: 142.935, image: PH.erimo, note: 'Petite ville côtière — élevage de chevaux Hidaka' },
    ],
    googleMaps: 'https://www.google.com/maps/dir/43.4572585,144.1040147/42.9233354,143.197199/41.9246455,143.249249/42.1208,142.935',
  },
  {
    jour: 10, ville: 'Samani → Furano (Farm Tomita) → Biei → Sounkyo', date: '13 juillet', emoji: '🏍️',
    lat: 43.7065559, lng: 143.0075104, image: PH.furano,
    note: 'Remontée par les montagnes du Hidaka, champs de lavande iconiques de Furano en plein pic. L\'après-midi, le Patchwork Road de Biei. Arrivée aux gorges de Sounkyo.',
    distance: '~230 km', duree: '4h30', arrivee: '~16h00',
    tags: ['Lavande en pic', 'Farm Tomita', 'Biei', 'Sounkyo'],
    escales: [
      { nom: 'Samani (départ)', lat: 42.1208, lng: 142.935, image: PH.erimo },
      { nom: 'Farm Tomita (Furano)', lat: 43.4182493, lng: 142.4280407, image: PH.farmTomita, note: 'L\'image symbole d\'Hokkaido — lavande, coquelicots en juillet (glace lavande ¥400)' },
      { nom: 'Patchwork Road (Biei)', lat: 43.5874261, lng: 142.4666158, image: PH.biei, note: 'Collines de cultures multicolores — Ken & Mary Tree' },
      { nom: 'Gorges de Sounkyo (nuit)', lat: 43.7065559, lng: 143.0075104, image: PH.sounkyo, note: 'Cascades Ginga et Ryusei à 5 min à pied' },
    ],
    googleMaps: 'https://www.google.com/maps/dir/42.1208,142.935/43.4182493,142.4280407/43.5874261,142.4666158/43.7065559,143.0075104',
  },
  {
    jour: 11, ville: 'Sounkyo → Asahikawa (ramen) → Col de Mikuni → Shin-Chitose', date: '14 juillet', emoji: '🏁',
    lat: 42.7791317, lng: 141.6866364, image: PH.sounkyo,
    note: 'Dernière journée. Col de Mikuni pour une dernière vue sur le Daisetsuzan. Ramen d\'Asahikawa en chemin. Retour à Shin-Chitose, restitution de la moto. 11 jours, ~1 700 km.',
    distance: '~150 km', duree: '3h', arrivee: '~13h00 (retour moto)',
    tags: ['Dernier jour', 'Ramen Asahikawa', 'Retour moto'],
    escales: [
      { nom: 'Sounkyo (départ)', lat: 43.7065559, lng: 143.0075104, image: PH.sounkyo },
      { nom: 'Col de Mikuni (Daisetsuzan)', lat: 43.5, lng: 142.9, image: PH.sounkyo, note: 'Vue panoramique sur les plus hauts sommets d\'Hokkaido' },
      { nom: 'Asahikawa (ramen)', lat: 43.7708833, lng: 142.3650083, image: PH.asahikawa, note: 'Ramen shoyu + beurre + maïs, incontournable' },
      { nom: 'Shin-Chitose (retour moto)', lat: 42.7791317, lng: 141.6866364, image: PH.chitose, note: '🏁 Retour V-Strom + récupération valise. Fin du road trip !' },
    ],
    googleMaps: 'https://www.google.com/maps/dir/43.7065559,143.0075104/43.5,142.9/43.7708833,142.3650083/42.7791317,141.6866364',
  },
]

// ─────────────────────────────────────────────
// VILLES JAPON
// ─────────────────────────────────────────────
const VILLES = [
  {
    nom: 'Tokyo', dates: '15 – 19 juillet', lat: 35.6895, lng: 139.6917,
    image: PH.tokyo, couleur: '#4A9EE8',
    items: [
      { nom: 'Tokyo Tower', image: PH.tokyoTower, note: 'Le monument emblématique de Tokyo, vue panoramique sur la ville' },
      { nom: 'Shibuya Sky', image: PH.shibuyaSky, note: 'Escalator vitré + plateforme à 229m. Réserver en ligne ¥2 200' },
      { nom: 'Escaliers sanctuaire Suga', image: PH.yourName, note: '"Your Name" — station Yotsuya, 10 min à pied. Y aller tôt le matin' },
      { nom: 'Berges rivière Tama', image: PH.tamaRiver, note: 'Les terrains de foot d\'Inazuma Eleven — Futako-Tamagawa / Noborito' },
      { nom: 'Shibuya Crossing', image: PH.shibuya, note: 'Le soir, depuis le 2F du Starbucks en face' },
      { nom: 'Shinjuku Gyoen', image: PH.tokyo, note: 'Jardin national immense (¥500)' },
      { nom: 'Odaiba', image: PH.tokyo, note: 'Rainbow Bridge illuminé, Gundam géant' },
    ],
  },
  {
    nom: 'Kyoto', dates: '20 – 23 juillet', lat: 35.0116, lng: 135.7681,
    image: PH.kyoto, couleur: '#D85A30',
    items: [
      { nom: 'Fushimi Inari Taisha', image: PH.fushimi, note: '10 000 torii rouges — à 6h du matin, avant les touristes' },
      { nom: 'Arashiyama + Bambouseraie', image: PH.arashiyama, note: 'Bambouseraie + Tenryu-ji + bateau sur la rivière Oi' },
      { nom: 'Ninenzaka / Sannenzaka', image: PH.ninenzaka, note: 'Rue pavée vers Kiyomizu-dera' },
      { nom: 'Kiyomizu-dera', image: PH.kiyomizu, note: 'Temple sur pilotis, vue sur Kyoto au coucher de soleil' },
      { nom: 'Gion (le soir)', image: PH.gion, note: 'Quartier des geishas — ruelles Hanamikoji et Shimbashi après 19h' },
      { nom: 'Pontocho', image: PH.gion, note: 'Ruelle aux lanternes, restaurants sur terrasses' },
      { nom: 'Nijo-jo', image: PH.kiyomizu, note: 'Château aux "planchers chantants" (¥620)' },
    ],
  },
  {
    nom: 'Fukuoka', dates: '24 – 27 juillet', lat: 33.5904, lng: 130.4017,
    image: PH.fukuoka, couleur: '#1D9E75',
    items: [
      { nom: 'Hakata Ramen (tonkotsu)', image: PH.ramen, note: 'Le ramen tonkotsu original — Shin-Shin, Ichiran, Ippudo' },
      { nom: 'Yatai (stands de nuit)', image: PH.yatai, note: 'Stands street food en bord de rivière, à partir de 18h' },
      { nom: 'Dazaifu Tenmangu', image: PH.dazaifu, note: 'Sanctuaire millénaire — 40 min de Fukuoka en train' },
      { nom: 'Canal City', image: PH.fukuoka, note: 'Centre commercial futuriste avec canal intérieur' },
      { nom: 'Ohori Park', image: PH.fukuoka, note: 'Grand parc avec lac central + jardin japonais' },
      { nom: 'Château de Fukuoka (ruines)', image: PH.fukuoka, note: 'Vue panoramique sur la ville, entrée libre' },
    ],
  },
  {
    nom: 'Nagasaki', dates: '28 – 31 juillet', lat: 32.7505, lng: 129.8786,
    image: PH.nagasaki, couleur: '#D4537E',
    items: [
      { nom: 'Mémorial de la Paix + Musée', image: PH.peace, note: 'Incontournable — monument + musée de la bombe atomique (¥200)' },
      { nom: 'Dejima', image: PH.dejima, note: 'Île artificielle reconstituée — concession hollandaise (¥510)' },
      { nom: 'Glover Garden', image: PH.glover, note: 'Jardins ère Meiji, vue sur le port de Nagasaki (¥620)' },
      { nom: 'Chinatown de Nagasaki', image: PH.nagasaki, note: 'Le plus vieux Chinatown du Japon' },
      { nom: 'Mont Inasa (vue nocturne)', image: PH.nagasaki, note: 'Une des 3 plus belles vues nocturnes du monde — téléphérique ¥1 250 A/R' },
    ],
  },
]

const ROUTE_HOKKAIDO = [
  [42.7791317,141.6866364],[43.199041,141.002118],[43.334329,140.346374],
  [43.199041,141.002118],[43.9410074,141.6369432],[45.4156307,141.6733641],
  [45.522945,141.9365908],[44.356439,143.354352],[44.0206059,144.2734837],
  [44.069034,144.990695],[44.11,145.02],[43.81,145.18],
  [43.6032035,145.2928179],[43.637226,144.4349948],[43.5872284,144.5237617],
  [43.61,144.36],[43.433669,144.089847],[42.9233354,143.197199],
  [41.9246455,143.249249],[42.1208,142.935],[43.4182493,142.4280407],
  [43.5874261,142.4666158],[43.7065559,143.0075104],[43.7708833,142.3650083],
  [42.7791317,141.6866364],
]

const COULEURS = ['#4A9EE8','#1D9E75','#D85A30','#D4537E','#BA7517','#639922','#533AB7','#0F6E56','#E24B4A','#3B6D11','#993556']

// Gestionnaire d'erreur de chargement d'image — bascule sur une image de
// secours sans déclencher de boucle infinie d'erreurs.
function handleImgError(e) {
  const target = e.currentTarget
  target.onerror = null
  target.src = PH.tokyo
}

// ─────────────────────────────────────────────
// COMPOSANT PRINCIPAL
// ─────────────────────────────────────────────
export default function Voyage() {
  const [posts, setPosts] = useState([])
  const [tab, setTab] = useState('hokkaido')
  const [jourActif, setJourActif] = useState(null)
  const [villeActive, setVilleActive] = useState(null)

  const mapHokRef = useRef(null)
  const mapJapRef = useRef(null)
  const instHok = useRef(null)
  const instJap = useRef(null)
  const markersHok = useRef([])
  const markersJap = useRef([])
  const polyHok = useRef(null)
  const polyJap = useRef(null)

  // ── Les DEUX cartes sont créées UNE SEULE FOIS au montage du composant. ──
  // ── Elles ne sont JAMAIS démontées : on bascule juste leur visibilité   ──
  // ── en CSS (display:none) selon l'onglet actif. C'est ce qui élimine   ──
  // ── le bug de remontage/markers fantômes entre les deux parties.       ──
  useEffect(() => {
    let dead = false
    ;(async () => {
      const L = (await import('leaflet')).default
      if (dead) return

      // Carte Hokkaido
      // Le check sur _leaflet_id empêche une double-init quand React Strict
      // Mode (dev only) monte → démonte → remonte l'effet très rapidement.
      if (mapHokRef.current && !instHok.current && !mapHokRef.current._leaflet_id) {
        const map = L.map(mapHokRef.current, { zoomControl: false, attributionControl: false })
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { maxZoom: 18 }).addTo(map)
        instHok.current = map

        markersHok.current = ETAPES.map((e, i) => {
          const col = COULEURS[i % COULEURS.length]
          const icon = L.divIcon({
            className: '',
            html: `<div style="background:${col};color:#fff;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;border:2.5px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.5);cursor:pointer">${e.jour}</div>`,
            iconSize: [30, 30], iconAnchor: [15, 15],
          })
          const m = L.marker([e.lat, e.lng], { icon }).addTo(map)
          m.on('click', () => setJourActif(j => j === e.jour ? null : e.jour))
          return m
        })

        polyHok.current = L.polyline(ROUTE_HOKKAIDO, { color: '#4A9EE8', weight: 3, dashArray: '6 4', opacity: .85 }).addTo(map)
        map.fitBounds(L.latLngBounds(ROUTE_HOKKAIDO), { padding: [50, 50] })
      }

      // Carte Japon
      if (mapJapRef.current && !instJap.current && !mapJapRef.current._leaflet_id) {
        const map = L.map(mapJapRef.current, { zoomControl: false, attributionControl: false })
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { maxZoom: 18 }).addTo(map)
        instJap.current = map

        markersJap.current = VILLES.map((v, i) => {
          const col = COULEURS[i % COULEURS.length]
          const icon = L.divIcon({
            className: '',
            html: `<div style="background:${col};color:#fff;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;border:2.5px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.5);cursor:pointer">${v.nom.substring(0, 3)}</div>`,
            iconSize: [36, 36], iconAnchor: [18, 18],
          })
          const m = L.marker([v.lat, v.lng], { icon }).addTo(map)
          m.on('click', () => setVilleActive(x => x === v.nom ? null : v.nom))
          return m
        })

        const pts = VILLES.map(v => [v.lat, v.lng])
        polyJap.current = L.polyline(pts, { color: '#fff', weight: 2, dashArray: '5 3', opacity: .7 }).addTo(map)
        // Pas de fitBounds ici : le conteneur est display:none au montage
        // (onglet "hokkaido" actif), donc sa taille vaut 0px et Leaflet
        // calculerait un zoom complètement faux. On pose juste une vue
        // neutre ; le vrai cadrage se fait dans l'effet de changement
        // d'onglet ci-dessous, une fois le conteneur visible et mesurable.
        map.setView([36.5, 136], 5)
      }
    })()

    return () => {
      dead = true
      try { instHok.current?.remove() } catch {}
      try { instJap.current?.remove() } catch {}
      instHok.current = null
      instJap.current = null
      markersHok.current = []
      markersJap.current = []
    }
  }, []) // ← une seule fois, jamais ré-exécuté

  // Mise à jour du tracé Hokkaido quand on sélectionne un jour
  useEffect(() => {
    if (!instHok.current || markersHok.current.length === 0) return
    ;(async () => {
      const L = (await import('leaflet')).default
      const map = instHok.current
      if (polyHok.current) { map.removeLayer(polyHok.current); polyHok.current = null }

      if (jourActif == null) {
        polyHok.current = L.polyline(ROUTE_HOKKAIDO, { color: '#4A9EE8', weight: 3, dashArray: '6 4', opacity: .85 }).addTo(map)
        markersHok.current.forEach((m) => m.setOpacity(1))
        map.fitBounds(L.latLngBounds(ROUTE_HOKKAIDO), { padding: [50, 50] })
      } else {
        const idx = jourActif - 1
        const pts = ETAPES[idx].escales.map(e => [e.lat, e.lng])
        if (pts.length >= 2)
          polyHok.current = L.polyline(pts, { color: COULEURS[idx % COULEURS.length], weight: 4, opacity: .95 }).addTo(map)
        markersHok.current.forEach((m, i) => m.setOpacity(i === idx ? 1 : 0.25))
        map.fitBounds(L.latLngBounds(pts), { padding: [60, 60], animate: true })
      }
    })()
  }, [jourActif])

  // Invalidation de taille + cadrage quand on change d'onglet.
  // La carte Japon n'a jamais reçu de fitBounds() correct à l'init (elle
  // était cachée), donc on le fait ici, une fois que invalidateSize() a
  // permis à Leaflet de remesurer le vrai conteneur visible.
  const japanFitted = useRef(false)
  useEffect(() => {
    const t = setTimeout(() => {
      if (tab === 'hokkaido') {
        instHok.current?.invalidateSize()
      }
      if (tab === 'japon' && instJap.current) {
        instJap.current.invalidateSize()
        if (!japanFitted.current) {
          ;(async () => {
            const L = (await import('leaflet')).default
            const pts = VILLES.map(v => [v.lat, v.lng])
            instJap.current.fitBounds(L.latLngBounds(pts), { padding: [60, 60], maxZoom: 5.5 })
            japanFitted.current = true
          })()
        }
      }
    }, 60)
    return () => clearTimeout(t)
  }, [tab])

  const etapeActive = jourActif ? ETAPES[jourActif - 1] : null
  const postActif = etapeActive ? posts.find(p => p.jour === etapeActive.jour) : null

  return (
    <main className="voy">

      {/* HEADER */}
      <header className="voy-head">
        <div className="voy-pretitle">🏍️ Juillet – Août 2026</div>
        <h1 className="voy-title">Road Trip Japon</h1>
        <p className="voy-sub">Guillaume — Hokkaido × Tokyo × Kyoto × Fukuoka × Nagasaki</p>
        <div className="stats-row">
          <div className="stat-pill"><span className="stat-num">27</span><span className="stat-label">jours</span></div>
          <div className="stat-pill"><span className="stat-num">~1 700</span><span className="stat-label">km en moto</span></div>
          <div className="stat-pill"><span className="stat-num">5</span><span className="stat-label">destinations</span></div>
          <div className="stat-pill"><span className="stat-num">4 juil.</span><span className="stat-label">départ</span></div>
        </div>
      </header>

      {/* TABS */}
      <nav className="tabs" role="tablist">
        {[
          { id: 'hokkaido', label: '🏔️ Hokkaido', sub: '11 jours · 1 700 km' },
          { id: 'japon', label: '🗼 Villes', sub: 'Tokyo · Kyoto · Fukuoka · Nagasaki' },
          { id: 'news', label: '📰 Nouvelles', sub: `${posts.length} pub.` },
        ].map(t => (
          <button key={t.id} role="tab" aria-selected={tab === t.id}
            className={`tab${tab === t.id ? ' active' : ''}`}
            onClick={() => { setTab(t.id); if (t.id !== 'hokkaido') setJourActif(null) }}>
            <span className="tab-label">{t.label}</span>
            <span className="tab-sub">{t.sub}</span>
          </button>
        ))}
      </nav>

      {/* ── HOKKAIDO ── */}
      <section className="section" style={{ display: tab === 'hokkaido' ? 'block' : 'none' }}>

        <div className="jour-strip-wrap">
          <div className="jour-strip">
            <button className={`jour-all${jourActif === null ? ' active' : ''}`} onClick={() => setJourActif(null)}>
              <span className="ja-icon">🗺️</span>
              <span className="ja-text">Tout le trajet</span>
            </button>
            {ETAPES.map((e, i) => {
              const col = COULEURS[i % COULEURS.length]
              const hasPost = posts.some(p => p.jour === e.jour)
              const isActive = jourActif === e.jour
              return (
                <button key={e.jour}
                  className={`jour-btn${isActive ? ' active' : ''}`}
                  style={isActive ? { background: col, borderColor: col } : { borderColor: col + '55' }}
                  onClick={() => setJourActif(j => j === e.jour ? null : e.jour)}>
                  <span className="jb-num" style={{ background: isActive ? '#fff2' : col }}>{e.jour}</span>
                  <span className="jb-text">
                    <span className="jb-date">{e.date}</span>
                    <span className="jb-ville">{e.ville.split('→')[0].trim()}</span>
                  </span>
                  {hasPost && <span className="jb-dot" />}
                </button>
              )
            })}
          </div>
        </div>

        {/* La carte Hokkaido reste TOUJOURS dans le DOM */}
        <div className="map-wrap">
          <div className="map-inner" ref={mapHokRef} />
          <a className="gmaps-btn"
            href={etapeActive?.googleMaps || 'https://www.google.com/maps/dir/42.7791317,141.6866364/43.199041,141.002118'}
            target="_blank" rel="noopener noreferrer">
            📱 Ouvrir dans Google Maps
          </a>
        </div>

        {etapeActive ? (
          <div className="card" style={{ borderTopColor: COULEURS[(etapeActive.jour - 1) % COULEURS.length] }}>
            <div className="card-head">
              <div className="card-badge" style={{ background: COULEURS[(etapeActive.jour - 1) % COULEURS.length] }}>
                {etapeActive.emoji} Jour {etapeActive.jour}
              </div>
              <div>
                <h2 className="card-title">{etapeActive.ville}</h2>
                <p className="card-meta">{etapeActive.date} · {etapeActive.distance} · {etapeActive.duree} · Arrivée {etapeActive.arrivee}</p>
              </div>
            </div>

            <img src={etapeActive.image} alt={etapeActive.ville} className="card-img"
              onError={handleImgError} />

            <p className="card-note">{etapeActive.note}</p>

            <div className="tags-row">
              {etapeActive.tags.map(t => <span key={t} className="tag">{t}</span>)}
            </div>

            <h3 className="section-h">📍 Étapes de la journée</h3>
            <div className="escales">
              {etapeActive.escales.map((esc, i) => (
                <div key={i} className="escale">
                  {i > 0 && <div className="escale-arrow">↓</div>}
                  <div className="escale-card">
                    {esc.image && <img src={esc.image} alt={esc.nom} className="escale-img"
                      onError={handleImgError} />}
                    <div className="escale-body">
                      <strong className="escale-name">{esc.nom}</strong>
                      {esc.note && <p className="escale-note">{esc.note}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {postActif && (
              <div className="post-box">
                <h3 className="section-h">✏️ Mise à jour en direct</h3>
                {postActif.contenu && <p className="post-text">{postActif.contenu}</p>}
                {postActif.image_url && <img src={postActif.image_url} alt="" className="post-img" />}
              </div>
            )}

            <a className="gmaps-btn-inline" href={etapeActive.googleMaps} target="_blank" rel="noopener noreferrer">
              📱 Itinéraire du jour sur Google Maps
            </a>
          </div>
        ) : (
          <div className="card overview">
            <h2 className="overview-title">🏍️ Hokkaido — boucle complète</h2>
            <p className="overview-sub">4 juillet → 14 juillet · ~1 700 km · 11 jours</p>
            <p className="overview-text">
              Tour complet de l&apos;île : côte de la mer du Japon, remontée jusqu&apos;au cap Sōya, côte d&apos;Okhotsk,
              presqu&apos;île de Shiretoko classée UNESCO, lacs volcaniques, cap Erimo et champs de lavande de Furano.
              Cliquez sur un jour pour voir le détail.
            </p>
            <div className="overview-grid">
              {ETAPES.map((e, i) => (
                <button key={e.jour} className="ov-item" onClick={() => setJourActif(e.jour)}
                  style={{ borderLeftColor: COULEURS[i % COULEURS.length] }}>
                  <span className="ov-num" style={{ color: COULEURS[i % COULEURS.length] }}>J{e.jour}</span>
                  <span className="ov-ville">{e.ville}</span>
                  <span className="ov-date">{e.date}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── VILLES ── */}
      <section className="section" style={{ display: tab === 'japon' ? 'block' : 'none' }}>
        <div className="map-wrap" style={{ marginBottom: 30 }}>
          <div className="map-inner" ref={mapJapRef} />
        </div>

        <div className="villes-grid">
          {VILLES.map(v => (
            <div key={v.nom} className={`ville-card${villeActive === v.nom ? ' expanded' : ''}`}
              style={{ '--vcol': v.couleur }}>
              <button className="ville-head" onClick={() => setVilleActive(x => x === v.nom ? null : v.nom)}>
                <img src={v.image} alt={v.nom} className="ville-img"
                  onError={handleImgError} />
                <div className="ville-overlay">
                  <h2 className="ville-name">{v.nom}</h2>
                  <p className="ville-dates">{v.dates}</p>
                </div>
                <span className="ville-arrow">{villeActive === v.nom ? '▲' : '▼'}</span>
              </button>

              {villeActive === v.nom && (
                <ul className="ville-items">
                  {v.items.map((it, i) => (
                    <li key={i} className="ville-item">
                      {it.image && <img src={it.image} alt={it.nom} className="vi-img"
                        onError={handleImgError} />}
                      <div className="vi-body">
                        <strong className="vi-name">{it.nom}</strong>
                        {it.note && <p className="vi-note">{it.note}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── NOUVELLES ── */}
      <section className="section" style={{ display: tab === 'news' ? 'block' : 'none' }}>
        {posts.length === 0
          ? <div className="empty">Aucune nouvelle pour l&apos;instant.<br /><small>Guillaume postera dès son arrivée au Japon !</small></div>
          : posts.map(post => {
            const etape = ETAPES.find(e => e.jour === post.jour)
            const col = COULEURS[(etape?.jour || 1) - 1]
            return (
              <div key={post.id} className="news-card">
                <div className="news-head">
                  <span className="news-badge" style={{ background: col }}>Jour {post.jour}</span>
                  <div>
                    <strong>{post.ville || etape?.ville || 'Hokkaido'}</strong>
                    {etape && <span className="news-date"> · {etape.date}</span>}
                  </div>
                </div>
                {post.contenu && <p className="news-text">{post.contenu}</p>}
                {post.image_url && <img src={post.image_url} alt="" className="news-img" />}
              </div>
            )
          })
        }
      </section>

      <style jsx>{`
        *, *::before, *::after { box-sizing: border-box; }

        .voy {
          --bg:    #0c0e14;
          --s1:    #13151e;
          --s2:    #191c28;
          --s3:    #1e2233;
          --brd:   rgba(255,255,255,.08);
          --brds:  rgba(255,255,255,.15);
          --acc:   #4A9EE8;
          --org:   #F0873D;
          --tx:    #ecedf5;
          --txm:   #8b8fa8;
          --txd:   #555970;
          --r:     14px;
          --rs:    8px;
          --sh:    0 4px 24px rgba(0,0,0,.4);
          --shs:   0 2px 12px rgba(0,0,0,.3);

          color: var(--tx);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          min-height: 100vh;
          max-width: 1100px;
          margin: 0 auto;
          padding: 110px 20px 60px;
        }

        .voy-head { text-align: center; margin-bottom: 36px; }
        .voy-pretitle { font-size: 13px; letter-spacing: 2px; text-transform: uppercase; color: var(--org); margin-bottom: 10px; font-weight: 600; }
        .voy-title {
          font-size: clamp(28px, 6vw, 48px);
          font-weight: 800; margin: 0 0 8px;
          background: linear-gradient(120deg, var(--acc), var(--org));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .voy-sub { font-size: 14px; color: var(--txm); margin: 0 0 24px; }
        .stats-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
        .stat-pill { display: flex; flex-direction: column; align-items: center; padding: 12px 20px; background: var(--s2); border: 1px solid var(--brd); border-radius: 40px; min-width: 80px; }
        .stat-num { font-size: 18px; font-weight: 700; color: var(--acc); line-height: 1; }
        .stat-label { font-size: 11px; color: var(--txm); margin-top: 3px; white-space: nowrap; }

        .tabs { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-bottom: 28px; }
        .tab { display: flex; flex-direction: column; align-items: center; padding: 12px 22px; border-radius: var(--r); border: 1.5px solid var(--brds); background: var(--s2); color: var(--txm); cursor: pointer; transition: all .2s; min-width: 140px; }
        .tab:hover { background: var(--s3); color: var(--tx); transform: translateY(-2px); box-shadow: var(--shs); }
        .tab.active { background: linear-gradient(135deg, rgba(74,158,232,.2), rgba(240,135,61,.15)); border-color: var(--acc); color: var(--tx); box-shadow: 0 0 0 1px var(--acc)33; }
        .tab-label { font-size: 14px; font-weight: 600; }
        .tab-sub { font-size: 11px; color: var(--txd); margin-top: 3px; }
        .tab.active .tab-sub { color: var(--txm); }

        .section { animation: fadeUp .3s ease; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }

        .jour-strip-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; padding-bottom: 10px; margin-bottom: 20px; }
        .jour-strip-wrap::-webkit-scrollbar { height: 4px; }
        .jour-strip-wrap::-webkit-scrollbar-thumb { background: var(--brds); border-radius: 2px; }
        .jour-strip { display: flex; gap: 8px; min-width: max-content; padding: 4px 2px; }

        .jour-all { display: flex; align-items: center; gap: 8px; padding: 10px 18px; border-radius: var(--r); border: 1.5px solid var(--brds); background: var(--s2); color: var(--txm); cursor: pointer; transition: all .2s; white-space: nowrap; }
        .jour-all.active { background: var(--s3); color: var(--tx); border-color: var(--acc); }
        .jour-all:hover { background: var(--s3); color: var(--tx); }
        .ja-icon { font-size: 16px; }
        .ja-text { font-size: 13px; font-weight: 600; }

        .jour-btn { display: flex; align-items: center; gap: 8px; padding: 8px 14px 8px 8px; border-radius: var(--r); border: 1.5px solid var(--brds); background: var(--s2); color: var(--tx); cursor: pointer; transition: all .2s; position: relative; text-align: left; }
        .jour-btn:hover { background: var(--s3); transform: translateY(-1px); box-shadow: var(--shs); }
        .jour-btn.active { color: #fff; box-shadow: var(--sh); transform: translateY(-2px); }
        .jb-num { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: #fff; flex-shrink: 0; }
        .jb-text { display: flex; flex-direction: column; }
        .jb-date { font-size: 10px; opacity: .8; }
        .jb-ville { font-size: 12px; font-weight: 600; max-width: 120px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .jb-dot { position: absolute; top: 6px; right: 6px; width: 7px; height: 7px; border-radius: 50%; background: #4ade80; box-shadow: 0 0 6px #4ade80; }

        .map-wrap { position: relative; border-radius: var(--r); overflow: hidden; box-shadow: var(--sh); margin-bottom: 20px; }
        .map-inner { height: 460px; width: 100%; background: var(--s1); }
        .gmaps-btn { position: absolute; bottom: 14px; right: 14px; z-index: 999; display: inline-flex; align-items: center; gap: 6px; padding: 9px 16px; background: #fff; color: #111; border-radius: var(--rs); text-decoration: none; font-size: 12px; font-weight: 600; box-shadow: var(--shs); transition: transform .2s; }
        .gmaps-btn:hover { transform: translateY(-2px); }

        .card { background: var(--s1); border: 1px solid var(--brd); border-top: 3px solid var(--acc); border-radius: var(--r); padding: 24px; margin-bottom: 20px; box-shadow: var(--shs); }
        .card-head { display: flex; align-items: flex-start; gap: 16px; margin-bottom: 20px; flex-wrap: wrap; }
        .card-badge { padding: 8px 16px; border-radius: 30px; font-size: 13px; font-weight: 700; color: #fff; white-space: nowrap; flex-shrink: 0; box-shadow: 0 2px 8px rgba(0,0,0,.3); }
        .card-title { font-size: clamp(16px,3vw,22px); font-weight: 700; margin: 0 0 6px; }
        .card-meta { font-size: 12px; color: var(--txm); margin: 0; }
        .card-img { width: 100%; max-height: 320px; object-fit: cover; border-radius: var(--rs); margin-bottom: 18px; display: block; background: var(--s2); }
        .card-note { font-size: 14px; color: var(--txm); line-height: 1.7; margin: 0 0 16px; }
        .tags-row { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
        .tag { padding: 5px 12px; background: var(--s3); border: 1px solid var(--brd); border-radius: 20px; font-size: 12px; color: var(--txm); }
        .section-h { font-size: 14px; font-weight: 700; color: var(--tx); margin: 20px 0 14px; }

        .escales { display: flex; flex-direction: column; gap: 0; }
        .escale { display: flex; flex-direction: column; }
        .escale-arrow { font-size: 18px; color: var(--txd); text-align: center; padding: 4px; }
        .escale-card { display: flex; gap: 14px; align-items: flex-start; background: var(--s2); border: 1px solid var(--brd); border-radius: var(--rs); padding: 12px; transition: border-color .2s; }
        .escale-card:hover { border-color: var(--brds); }
        .escale-img { width: 72px; height: 54px; object-fit: cover; border-radius: var(--rs); flex-shrink: 0; background: var(--s3); }
        .escale-name { font-size: 13px; font-weight: 600; display: block; margin-bottom: 4px; }
        .escale-note { font-size: 12px; color: var(--txm); margin: 0; line-height: 1.5; }

        .post-box { margin-top: 20px; padding: 16px; background: var(--s2); border-radius: var(--rs); border: 1px solid rgba(74,158,232,.3); }
        .post-text { font-size: 14px; color: var(--tx); line-height: 1.7; margin: 0; }
        .post-img { max-width: 100%; border-radius: var(--rs); margin-top: 14px; display: block; }
        .gmaps-btn-inline { display: inline-flex; align-items: center; gap: 6px; margin-top: 20px; padding: 10px 18px; background: var(--s3); border: 1px solid var(--brds); border-radius: var(--rs); color: var(--tx); text-decoration: none; font-size: 13px; font-weight: 600; transition: all .2s; }
        .gmaps-btn-inline:hover { background: var(--acc); border-color: var(--acc); }

        .overview { text-align: left; }
        .overview-title { font-size: 22px; font-weight: 700; margin: 0 0 8px; }
        .overview-sub { font-size: 13px; color: var(--txm); margin: 0 0 16px; }
        .overview-text { font-size: 14px; color: var(--txm); line-height: 1.7; margin: 0 0 24px; }
        .overview-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 8px; }
        .ov-item { display: flex; flex-direction: column; gap: 3px; padding: 12px 14px; border-radius: var(--rs); border: 1px solid var(--brd); border-left: 3px solid; background: var(--s2); cursor: pointer; transition: all .2s; text-align: left; }
        .ov-item:hover { background: var(--s3); transform: translateY(-1px); box-shadow: var(--shs); }
        .ov-num { font-size: 11px; font-weight: 700; }
        .ov-ville { font-size: 12px; font-weight: 600; color: var(--tx); }
        .ov-date { font-size: 11px; color: var(--txd); }

        .villes-grid { display: flex; flex-direction: column; gap: 12px; }
        .ville-card { border-radius: var(--r); overflow: hidden; border: 1.5px solid var(--brd); background: var(--s1); transition: border-color .2s; }
        .ville-card.expanded { border-color: var(--vcol, var(--acc)); }
        .ville-head { position: relative; width: 100%; border: none; background: none; cursor: pointer; padding: 0; display: block; }
        .ville-img { width: 100%; height: 200px; object-fit: cover; display: block; filter: brightness(.65); transition: filter .3s; background: var(--s2); }
        .ville-head:hover .ville-img { filter: brightness(.8); }
        .ville-overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 20px; background: linear-gradient(transparent, rgba(0,0,0,.8)); text-align: left; }
        .ville-name { font-size: 24px; font-weight: 800; color: #fff; margin: 0 0 4px; }
        .ville-dates { font-size: 13px; color: rgba(255,255,255,.8); margin: 0; }
        .ville-arrow { position: absolute; top: 14px; right: 16px; color: #fff; font-size: 14px; }
        .ville-items { list-style: none; margin: 0; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
        .ville-item { display: flex; gap: 12px; align-items: flex-start; }
        .vi-img { width: 64px; height: 48px; object-fit: cover; border-radius: var(--rs); flex-shrink: 0; background: var(--s2); }
        .vi-name { font-size: 13px; font-weight: 600; display: block; margin-bottom: 3px; }
        .vi-note { font-size: 12px; color: var(--txm); margin: 0; line-height: 1.5; }

        .empty { text-align: center; padding: 60px 20px; color: var(--txm); font-size: 15px; line-height: 1.8; }
        .news-card { background: var(--s1); border: 1px solid var(--brd); border-radius: var(--r); padding: 20px; margin-bottom: 14px; }
        .news-head { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
        .news-badge { padding: 5px 14px; border-radius: 20px; font-size: 12px; font-weight: 700; color: #fff; }
        .news-date { font-size: 12px; color: var(--txm); }
        .news-text { font-size: 14px; color: var(--txm); margin: 0; line-height: 1.7; }
        .news-img { max-width: 100%; border-radius: var(--rs); margin-top: 14px; display: block; }

        @media (max-width: 768px) {
          .voy { padding: 72px 14px 48px; }
          .map-inner { height: 320px; }
          .card { padding: 16px; }
          .card-img { max-height: 220px; }
          .escale-img { width: 54px; height: 40px; }
          .ville-img { height: 160px; }
          .overview-grid { grid-template-columns: 1fr 1fr; }
          .stats-row { gap: 8px; }
          .stat-pill { padding: 10px 14px; min-width: 70px; }
          .stat-num { font-size: 15px; }
          .tab { min-width: 100px; padding: 10px 14px; }
          .tab-label { font-size: 13px; }
          .jour-btn { padding: 8px 12px 8px 8px; }
          .jb-ville { max-width: 90px; }
        }

        @media (max-width: 480px) {
          .voy { padding: 68px 12px 40px; }
          .voy-title { font-size: 26px; }
          .voy-sub { font-size: 13px; }
          .map-inner { height: 280px; }
          .tabs { gap: 8px; }
          .tab { min-width: auto; flex: 1; }
          .tab-sub { display: none; }
          .overview-grid { grid-template-columns: 1fr; }
          .jour-btn { padding: 7px 10px 7px 7px; }
          .jb-num { width: 24px; height: 24px; font-size: 10px; }
          .jb-ville { max-width: 70px; font-size: 11px; }
          .card-head { flex-direction: column; gap: 10px; }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { transition: none !important; animation: none !important; }
        }
      `}</style>
    </main>
  )
}