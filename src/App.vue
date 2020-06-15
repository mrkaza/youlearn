<template>
  <v-app>
   <Navbar/>
    <v-content class="sve">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  name: 'App',

  components: {
    Navbar
  },

  data: () => ({
    //
  }),
};
</script>

<style>
 .sve {
   position:relative;
   background: #282828;
   /* font-family: 'Lato', sans-serif; */
   font-family: 'Poppins', sans-serif;
   
 }
</style>
