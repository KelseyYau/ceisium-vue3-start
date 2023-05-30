import { createRouter, createWebHistory } from 'vue-router'
import MainScene from '@/components/MainScene.vue'
import ModelGltf from '@/components/models/gltf/ModelGltf.vue'
import GeojsonSource from '@/components/source/GeojsonSource.vue'
import ModelI3sTile from '@/components/models/i3stile/ModelI3sTile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainScene
    },
    {
      path: '/model/gltf',
      name: 'gltf',
      component: ModelGltf
    },
    {
      path: '/model/i3stile',
      name: 'i3stile',
      component: ModelI3sTile
    },
    {
      path: '/source/geojson',
      component: GeojsonSource
    }
  ]
})

export default router
