import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import BookIndex from "./components/BookIndex.vue";
import BookDetails from "./components/BookDetails.vue";
const routes = [
  { path: "/", component: Home },
  { path: "/book", component: BookIndex },
  { path: "/book/show/:id", 
    component: BookDetails, props: {show:true} },
  { path: "/book/edit/:id", 
    component: BookDetails, props: {edit:true} },
  { path: "/book/create", 
    component: BookDetails, props: {create:true} },
  { path: "/book/delete/:id", 
    component: BookDetails, props: {delete:true} },



    // PINTURA
    { path: "/pintura", component: PinturaIndex },
    { path: "/pintura/show/:id", 
      component: PinturaDetails, props: {show:true} },
    { path: "/pintura/edit/:id", 
      component: PinturaDetails, props: {edit:true} },
    { path: "/pintura/create", 
      component: PinturaDetails, props: {create:true} },
    { path: "/pintura/delete/:id", 
      component: PinturaDetails, props: {delete:true} },


          // ARTISTA
    { path: "/artista", component: ArtistaIndex },
    { path: "/artista/show/:id", 
      component: ArtistaDetails, props: {show:true} },
    { path: "/artista/edit/:id", 
      component: ArtistaDetails, props: {edit:true} },
    { path: "/artista/create", 
      component: ArtistaDetails, props: {create:true} },
    { path: "/artista/delete/:id", 
      component: ArtistaDetails, props: {delete:true} },

                // MUSEO
    { path: "/museo", component: MuseoIndex },
    { path: "/museo/show/:id", 
      component: MuseoDetails, props: {show:true} },
    { path: "/museo/edit/:id", 
      component: MuseoDetails, props: {edit:true} },
    { path: "/museo/create", 
      component: MuseoDetails, props: {create:true} },
    { path: "/museo/delete/:id", 
      component: MuseoDetails, props: {delete:true} },
];
const history = createWebHistory();
const router = createRouter({
  history,
  routes,
});
export default router;
