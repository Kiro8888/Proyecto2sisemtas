<!-- BookIndex.vue -->
<template>
  <div class="row">
   <div style="margin-top: 5%">
     <h2>{{title}}</h2>
     <table><thead>
       <tr>
         <th>Title</th>
        <th>Artista</th>
        <th>Año</th>
        <th class="text-center">Actions</th>
      </tr>
       </thead><tbody>
       <tr v-for='pintura in pinturas'>
       <td>{{pintura.title}}</td>
       <td>{{pintura.artist}}</td>
       <td>{{pintura.year}}</td>
       <td>
       <router-link class="button"
         :to="'/pintura/show/'+pintura.id">Show</router-link>
       &nbsp;
       <router-link class="button"
         :to="'/pintura/edit/'+pintura.id">Edit</router-link>
       &nbsp;
       <a class="button"
         v-on:click="deletePintura(pintura.id)">Erase</a>
       </td>
       </tr></tbody>
     </table>
     <router-link class="button button-primary" 
       to="/pintura/create">New</router-link>
   </div>
  </div>
</template>
<script>
export default {
  name: "Pintura Index",
  data() {
    return {
      title: 'Pintura List',
      pinturas: []
    };
  },
  mounted() {
    this.allPinturas()
  },
  methods: {
    allPinturas() {
      fetch(this.url+'/.netlify/functions/pinturaFindAll',
        { headers: {'Accept': 'application/json'}})
        .then((response) => response.json())
        .then((items) => {
          this.pinturas = items;
        })
     },
     deletePintura(id) {
       fetch(this.url+'/.netlify/functions/pinturaDelete/'+id,
         { headers: {'Content-Type': 'application/json'},
           method: 'DELETE'})
          .then((items) => {
            this.allPinturas();
          }
        )
     }
  }
};
</script>
