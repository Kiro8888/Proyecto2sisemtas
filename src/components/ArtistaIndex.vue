<!-- BookIndex.vue -->
<template>
  <div class="row">
   <div style="margin-top: 5%">
     <h2>{{title}}</h2>
     <table><thead>
       <tr>
         <th>Nombre</th>
        <th>Nacimiento</th>
        <th>Nacionalidad</th>
        <th class="text-center">Actions</th>
      </tr>
       </thead><tbody>
       <tr v-for='artista in artistas'>
       <td>{{artista.name}}</td>
       <td>{{artista.birthYear}}</td>
       <td>{{artista.nationality}}</td>
       <td>
       <router-link class="button"
         :to="'/artista/show/'+artista.id">Show</router-link>
       &nbsp;
       <router-link class="button"
         :to="'/artista/edit/'+artista.id">Edit</router-link>
       &nbsp;
       <a class="button"
         v-on:click="deleteArtista(artista.id)">Erase</a>
       </td>
       </tr></tbody>
     </table>
     <router-link class="button button-primary" 
       to="/artista/create">New</router-link>
   </div>
  </div>
</template>
<script>
export default {
  name: "Artista Index",
  data() {
    return {
      title: 'Artista List',
      artistas: []
    };
  },
  mounted() {
    this.allArtistas()
  },
  methods: {
    allArtistas() {
      fetch(this.url+'/.netlify/functions/artistaFindAll',
        { headers: {'Accept': 'application/json'}})
        .then((response) => response.json())
        .then((items) => {
          this.artistas = items;
        })
     },
     deleteArtista(id) {
       fetch(this.url+'/.netlify/functions/artistaDelete/'+id,
         { headers: {'Content-Type': 'application/json'},
           method: 'DELETE'})
          .then((items) => {
            this.allArtistas();
          }
        )
     }
  }
};
</script>
