import {createRouter,createWebHashHistory} from 'vue-router'
import Home from '../views/Home.vue'
import UserUI from '../views/UserUI.vue'
import PlaceUI from '../views/PlaceUI.vue'
import ListPlaceUI from '../views/ListPlaceUI.vue'
import Dialog from '../views/Dialog.vue'
import PlaceDetails from '../views/PlaceDetails.vue'
import ListItinerary from '../views/ListItinerary.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/userUI',
    name: 'userUI',
    component: UserUI
  },
  {
    path: '/dialog',
    name: 'dialog',
    component: Dialog
  },
  {
    path: '/listitinerary',
    name: 'listitinerary',
    component: ListItinerary
  },
  {
    path: '/placedetails',
    name: 'placedetails',
    component: PlaceDetails
  },
  {
    path: '/listplaceUI',
    name: 'listplaceUI',
    component: ListPlaceUI
  },
  {
    path: '/placeUI',
    name: 'placeUI',
    component: PlaceUI
  }
]

const router = new createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
