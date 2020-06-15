<template>
  <div class="home">
   <Pocetna></Pocetna>
   <About></About>
   <Demo></Demo>
   <Futer></Futer>
  </div>
</template>

<script>
import Pocetna from '../components/Pocetna'
import About from '../components/PocetnaAbout'
import Demo from '../components/Demo'
import Futer from '../components/Futer'

export default {
  name: 'home',
  components: {
    Pocetna,
    About,
    Demo,
    Futer
  },
  created() {
    
  }
}
</script>
<style scoped>
  .home {
    height: 100%;
    
    background:#eee;
    /* background-image: url('../assets/background.png');
    background-repeat: no-repeat;
    background-size:contain */
  }
</style>