import { createRouter, createWebHistory } from 'vue-router'
import MainScene from '@/components/MainScene.vue'
import ModelGltf from '@/components/models/ModelGltf.vue'

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
    }
  ]
})

export default router
