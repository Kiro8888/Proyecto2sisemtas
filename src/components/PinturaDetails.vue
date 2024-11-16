<!-- BookDetails.vue -->
<template>
  <div class="row">
   <div class="eleven column" style="margin-top: 5%">
    <h2>{{title}}</h2>
     <form>
     <div class="row">
      <div class="six columns">
       <label for="titleInput">Title</label>
       <input class="u-full-width" type="text"
         v-model="pintura.title">
      </div>
      <div class="six columns">
       <label for="authorInput">Artista</label>
       <input class="u-full-width" type="text"
          v-model="pintura.artist">
      </div>
     </div>
     <div class="row">
      <div class="six columns">
       <label for="publisherInput">year</label>
       <input class="u-full-width" type="text"
          v-model="pintura.year">
      </div>
      <div class="six columns">
       <label for="editionInput">Description</label>
       <input class="u-full-width" type="text"
         v-model="pintura.description">
      </div>
     </div>
     <div class="row">
      <div class="six columns">
       <label for="copyrightInput">museum</label>
       <input class="u-full-width" type="number"
          v-model="pintura.museum">
      </div>
     </div>
     <div class="row">
      <router-link class="button button-primary" 
        to="/pintura">Back</router-link>
       <a v-if='edit' class="button button-primary" style="float: right"
         v-on:click="updatePintura(pintura._id)">Update</a>
       <a v-if='create' class="button button-primary" style="float: right"
         v-on:click="createPintura()">Create</a>
     </div>
    </form>
  </div>
</div>
</template>
<script>
import { useRoute } from 'vue-router'
export default {
  name: "Pintura Details",
  props: ['show','edit','create'],
  data() {
    return {
      title: "Pintura Data",
      pintura: {}
    }
  },
  mounted() {
    const route = useRoute()
    if (route.params.id != null)
      this.findPintura(route.params.id);
    else {
      this.pintura = {
        'id': 'pintura_'+Math.floor(Math.random()*100000000),'title':'','artist':'',
        'year':0,'description':'','museum':0};
    }
  },
  methods: {
    findPintura: function(id) {
      fetch(this.url+'/.netlify/functions/pinturaFind/'+id,
      { headers: {'Accept': 'application/json'}})
      .then((response) => response.json())
      .then((items) => {
       this.pintura = items[0];
      })
    },
    updatePintura: function(id) {
      fetch(this.url+'/.netlify/functions/pinturaUpdate/'+id,
        { headers: {'Content-Type':'application/json'},
          method: 'PUT',
          body: JSON.stringify(this.pintura)})
        .then((data) => {
          this.$router.push('/pintura');
        }
      )
    },
    createPintura: function() {
      fetch(this.url+'/.netlify/functions/pinturaInsert',
        { headers: {'Content-Type':'application/json'},
          method: 'POST',
          body: JSON.stringify(this.pintura)})
        .then((data) => {
           this.$router.push('/pintura');
        }
      )
    }
  }
};
</script>
