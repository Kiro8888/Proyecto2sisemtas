<!-- BookIndex.vue -->
<template>
  <div class="row">
   <div style="margin-top: 5%">
     <h2>{{title}}</h2>
     <table><thead>
       <tr>
         <th>Nombre</th>
        <th>Ubicacion</th>
        <th>Creado</th>
        <th class="text-center">Actions</th>
      </tr>
       </thead><tbody>
       <tr v-for='museo in museos'>
       <td>{{museo.name}}</td>
       <td>{{museo.location}}</td>
       <td>{{museo.established}}</td>
       <td>
       <router-link class="button"
         :to="'/museo/show/'+museo.id">Show</router-link>
       &nbsp;
       <router-link class="button"
         :to="'/museo/edit/'+museo.id">Edit</router-link>
       &nbsp;
       <a class="button"
         v-on:click="deleteMuseo(museo.id)">Erase</a>
       </td>
       </tr></tbody>
     </table>
     <router-link class="button button-primary" 
       to="/museo/create">New</router-link>
   </div>
  </div>
</template>
<script>
export default {
  name: "Museo Index",
  data() {
    return {
      title: 'Museo List',
      museos: []
    };
  },
  mounted() {
    this.allMuseos()
  },
  methods: {
    allMuseos() {
      fetch(this.url+'/.netlify/functions/museoFindAll',
        { headers: {'Accept': 'application/json'}})
        .then((response) => response.json())
        .then((items) => {
          this.museos = items;
        })
     },
     deleteMuseo(id) {
       fetch(this.url+'/.netlify/functions/museoDelete/'+id,
         { headers: {'Content-Type': 'application/json'},
           method: 'DELETE'})
          .then((items) => {
            this.allMuseos();
          }
        )
     }
  }
};
</script>
