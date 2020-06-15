<template>
  <div class="futer">
   <div class="sve">
     <div class="naslov-slika">
        <img src="../assets/playkapa.png" alt="">
        <h1>YouLearn</h1>
    </div>
    <!-- <div class="git">
      <v-btn text>
        <v-icon color="white" large>
        mdi-git
      </v-icon>
      </v-btn>
      
    </div> -->
      <p>Created by: <span> Marko Mrkonjic</span></p>
   </div>
  </div>
</template>

<script>



export default {
  name: 'futer',
  components: {
   
  }
}
</script>
<style scoped>
.git {
  text-align: center;
}
    .futer {
        background:#282828;
        height: 200px;
        border-top: 4px solid  linear-gradient(90deg, rgba(238,238,238,1) 60%, rgba(40,40,40,1) 60%)
    }
    .naslov-slika {
     padding-top:40px;
     display:flex;
     justify-content: center;
     font-family: 'Black Ops One', cursive;
     
 }
    .naslov-slika img {
      height: 30px;
      margin-top:3.5px
    }
    .naslov-slika h1 {
      font-size: 25px;
      color:#eee;
    }
    .sve p {
      text-align: center;
      color:#CA3E47;
      padding-top:50px;
      font-weight: bold;
      font-size:13px;
    }
    .sve span {
      color:#eee;
      text-decoration: none;
    }
</style>