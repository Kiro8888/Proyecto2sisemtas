<!-- BookDetails.vue -->
<template>
  <div class="row">
   <div class="eleven column" style="margin-top: 5%">
    <h2>{{title}}</h2>
     <form>
     <div class="row">
      <div class="six columns">
       <label for="titleInput">Nombre</label>
       <input class="u-full-width" type="text"
         v-model="museo.name">
      </div>
      <div class="six columns">
       <label for="authorInput">Ubicacion</label>
       <input class="u-full-width" type="text"
          v-model="museo.location">
      </div>
     </div>
     <div class="row">
      <div class="six columns">
       <label for="publisherInput">Creado</label>
       <input class="u-full-width" type="text"
          v-model="museo.established">
      </div>
      <div class="six columns">
       <label for="editionInput">Descripcion</label>
       <input class="u-full-width" type="text"
         v-model="museo.description">
      </div>
     </div>
     <div class="row">
      <div class="six columns">
       <label for="copyrightInput">Notables</label>
       <input class="u-full-width" type="number"
          v-model="museo.notableExhibits">
      </div>
     </div>
     <div class="row">
      <router-link class="button button-primary" 
        to="/museo">Back</router-link>
       <a v-if='edit' class="button button-primary" style="float: right"
         v-on:click="updateMuseo(museo._id)">Update</a>
       <a v-if='create' class="button button-primary" style="float: right"
         v-on:click="createMuseo()">Create</a>
     </div>
    </form>
  </div>
</div>
</template>
<script>
import { useRoute } from 'vue-router'
export default {
  name: "Museo Details",
  props: ['show','edit','create'],
  data() {
    return {
      title: "Museo Data",
      museo: {}
    }
  },
  mounted() {
    const route = useRoute()
    if (route.params.id != null)
      this.findMuseo(route.params.id);
    else {
      this.museo = {
        'id': 'museo_'+Math.floor(Math.random()*100000000),'name':'','location':'',
        'established':0,'description':'','notableExhibits':};
    }
  },
  methods: {
    findMuseo: function(id) {
      fetch(this.url+'/.netlify/functions/museoFind/'+id,
      { headers: {'Accept': 'application/json'}})
      .then((response) => response.json())
      .then((items) => {
       this.museo = items[0];
      })
    },
    updateMuseo: function(id) {
      fetch(this.url+'/.netlify/functions/museoUpdate/'+id,
        { headers: {'Content-Type':'application/json'},
          method: 'PUT',
          body: JSON.stringify(this.museo)})
        .then((data) => {
          this.$router.push('/museo');
        }
      )
    },
    createMuseo: function() {
      fetch(this.url+'/.netlify/functions/museoInsert',
        { headers: {'Content-Type':'application/json'},
          method: 'POST',
          body: JSON.stringify(this.museo)})
        .then((data) => {
           this.$router.push('/museo');
        }
      )
    }
  }
};
</script>
