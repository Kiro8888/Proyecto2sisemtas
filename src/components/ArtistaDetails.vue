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
         v-model="artista.name">
      </div>
      <div class="six columns">
       <label for="authorInput">Nacimiento</label>
       <input class="u-full-width" type="text"
          v-model="artista.birthYear">
      </div>
     </div>
     <div class="row">
      <div class="six columns">
       <label for="publisherInput">Nacionalidad</label>
       <input class="u-full-width" type="text"
          v-model="artista.nationality">
      </div>
      <div class="six columns">
       <label for="editionInput">Biografia</label>
       <input class="u-full-width" type="text"
         v-model="artista.biography">
      </div>
     </div>
     <div class="row">
      <div class="six columns">
       <label for="copyrightInput">famousWorks</label>
       <input class="u-full-width" type="text"
          v-model="artista.famousWorks">
      </div>
     </div>
     <div class="row">
      <router-link class="button button-primary" 
        to="/artista">Back</router-link>
       <a v-if='edit' class="button button-primary" style="float: right"
         v-on:click="updateArtista(artista._id)">Update</a>
       <a v-if='create' class="button button-primary" style="float: right"
         v-on:click="createArtista()">Create</a>
     </div>
    </form>
  </div>
</div>
</template>
<script>
import { useRoute } from 'vue-router'
export default {
  name: "Artista Details",
  props: ['show','edit','create'],
  data() {
    return {
      title: "Artista Data",
      artista: {}
    }
  },
  mounted() {
    const route = useRoute()
    if (route.params.id != null)
      this.findArtista(route.params.id);
    else {
      this.artista = {
        'id': 'artista_'+Math.floor(Math.random()*100000000),'name':'','birthYear':'',
        'nationality':'','biography':'','famousWorks': ''};
    }
  },
  methods: {
    findArtista: function(id) {
      fetch(this.url+'/.netlify/functions/artistaFind/'+id,
      { headers: {'Accept': 'application/json'}})
      .then((response) => response.json())
      .then((items) => {
       this.artista = items[0];
      })
    },
    updateArtista: function() {
  const id = this.artista.id;

  if (!id) {
    console.error("Error: el ID no está definido");
    return;
  }

  console.log("ID ANTES DE ENVIAR", id);
  console.log("Datos del artista antes de enviar:", this.artista);

  fetch(this.url + '/.netlify/functions/artistaUpdate/' + id, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(this.artista),
  })
    .then((response) => {
      console.log("Respuesta del servidor:", response);
      this.$router.push('/artista');
    })
    .catch((error) => {
      console.error("Error al actualizar el artista:", error);
    });
},


    createArtista: function() {
      fetch(this.url+'/.netlify/functions/artistaInsert',
        { headers: {'Content-Type':'application/json'},
          method: 'POST',
          body: JSON.stringify(this.artista)})
        .then((data) => {
           this.$router.push('/artista');
        }
      )
    }
  }
};
</script>
