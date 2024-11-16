<template>
<div id="app" class="container">
  <div class="row"  style="margin-top: 15px">
    <router-link class="three columns button button-primary" 
      to="/">Home</router-link>
    <router-link class="three columns button button-primary" 
      to="/pintura">Pinturas</router-link>
    <router-link class="three columns button button-primary" 
      to="/artista">Artista</router-link>
    <router-link class="three columns button button-primary" 
      to="/museo">Museos</router-link>
  </div>
 <router-view />
  <div class="row">
    <button disabled="disabled" class="twelve columns button-primary">
      Copyright (c) 2022 - Armando Arce-Orozco
    </button>
  </div>
</div>
</template>
<script>
export default {
  name: "App",
};
</script>
