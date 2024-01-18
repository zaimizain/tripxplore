import {createRouter,createWebHashHistory,createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import UserUI from '../views/UserUI.vue'
import PlaceUI from '../views/PlaceUI.vue'
import ListPlaceUI from '../views/ListPlaceUI.vue'
import PlaceDetails from '../views/PlaceDetails.vue'
import ListItinerary from '../views/ListItinerary.vue'
import LogIn from '../views/LogIn.vue'
import SignUp from '../views/SignUp.vue'
import SignOut from '../views/SignOut.vue'
import Test from "../views/Test.vue"
import Test2 from "../views/Test2.vue"
import FirstPage from "../views/FirstPage.vue"
import ItineraryInput from "../views/ItineraryInput.vue"
import Itinerary from "../views/Itinerary.vue"
import Place from "../views/Place.vue"
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  
  {
    path: '/itineraryinput',
    name: 'itineraryinput',
    component: ItineraryInput
  },
  {
    path: '/firstpage',
    name: 'firstpage',
    component: FirstPage
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
    path: '/signout',
    name: 'signout',
    component: SignOut
  },
  {
    path: '/listitinerary',
    name: 'listitinerary',
    component: ListItinerary
  },
  {
    path: '/itinerary',
    name: 'itinerary',
    component: Itinerary
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
    path: '/place',
    name: 'place',
    component: Place
  },
  {
    path: '/placeUI',
    name: 'placeUI',
    component: PlaceUI
  },
  {
    path: "/test",
    name: "Test",
    component: Test
  },
  {
    path: "/test2",
    name: "Test2",
    component: Test2
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
