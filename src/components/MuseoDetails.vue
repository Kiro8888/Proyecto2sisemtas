<!-- BookDetails.vue -->
<template>
  <div class="row">
   <div class="eleven column" style="margin-top: 5%">
    <h2>{{title}}</h2>
     <form>
     <div class="row">
      <div class="six columns">
       <label for="nameInput">Nombre</label>
       <input class="u-full-width" type="text"
         v-model="museo.name">
      </div>
      <div class="six columns">
       <label for="locationInput">Ubicacion</label>
       <input class="u-full-width" type="text"
          v-model="museo.location">
      </div>
     </div>
     <div class="row">
      <div class="six columns">
       <label for="establishedInput">Creado</label>
       <input class="u-full-width" type="text"
          v-model="museo.established">
      </div>
      <div class="six columns">
       <label for="descriptionInput">Descripcion</label>
       <input class="u-full-width" type="text"
         v-model="museo.description">
      </div>
     </div>
     <div class="row">
      <div class="six columns">
       <label for="notableExhibitsInput">Notables</label>
       <input class="u-full-width" type="text"
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
        'id':Math.floor(Math.random()*100000000),'name':'','location':'',
        'established':0,'description':'','notableExhibits':''};
    }
  },
  methods: {
    findMuseo: function(id) {
      console.log("ID DE ENCONTRAR MUSEO", id);
      fetch(this.url+'/.netlify/functions/museoFind/'+id,
      console.log("ID", id),
      { headers: {'Accept': 'application/json'}})
      .then((response) => response.json())
      .then((items) => {
       this.museo = items[0];
      })
    },
    updateMuseo: function() {
  const id = this.museo.id;

  if (!id) {
    console.error("Error: el ID no está definido");
    return;
  }

  console.log("ID ANTES DE ENVIAR", id);
  console.log("Datos del museo antes de enviar:", this.museo);

  fetch(this.url + '/.netlify/functions/museoUpdate/' + id, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(this.museo),
  })
    .then((response) => {
      console.log("Respuesta del servidor:", response);
      this.$router.push('/museo');
    })
    .catch((error) => {
      console.error("Error al actualizar el museo:", error);
    });
},


createMuseo: function() {
  console.log("Datos del museo antes de crear:", this.museo); // Imprime el contenido de museo.
  
  fetch(this.url + '/.netlify/functions/museoInsert', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(this.museo),
  })
    .then((response) => {
      console.log("Respuesta del servidor:", response); // Imprime la respuesta del servidor.
      this.$router.push('/museo');
      console.log("DATOS DEL MUSEO ENVIADOS:", this.museo);
    })
    .catch((error) => {
      console.error("Error al crear el museo:", error); // Manejo de errores.
    });
}
  }
};
</script>
