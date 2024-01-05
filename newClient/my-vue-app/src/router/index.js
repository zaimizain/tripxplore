import {createRouter,createWebHashHistory,createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import UserUI from '../views/UserUI.vue'
import PlaceUI from '../views/PlaceUI.vue'
import ListPlaceUI from '../views/ListPlaceUI.vue'
import Dialog from '../views/Dialog.vue'
import PlaceDetails from '../views/PlaceDetails.vue'
import ListItinerary from '../views/ListItinerary.vue'
import LogIn from '../views/LogIn.vue'
import SignUp from '../views/SignUp.vue'
import Test from "../views/Test.vue"

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
    path: '/login',
    name: 'login',
    component: LogIn
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
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
  },{
    path: "/test",
    name: "Test",
    component: Test
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
