<template>
  <div class="about">
    <div class="naslov-slika">
        <h1 class="why">Why</h1>
        <img src="../assets/playkapa.png" alt="">
        <h1>YouLearn</h1>
    </div>
    <p class="about-tekst">Many people learn online and one of the best free resources for learning is Youtube. YouLearn wants to make learning easier, more organized and simpler.</p>
    <div class="try">
        <button @click="goReg">Try now</button>
    </div>
  </div>
</template>

<script>



export default {
  name: 'about',
  components: {
    
  },
  methods: {
      goReg() {
          this.$router.push('/register')
      }
  }
}
</script>
<style scoped>
button:focus {
    outline:none;
}
 .about {
     margin:0 15%;
     padding-bottom:70px
 }
  .naslov-slika {
     padding-left:20%;
     display:flex;
     
     font-family: 'Black Ops One', cursive;   
 }
 .naslov-slika img {
     height: 50px;
 }
 .why {
     padding-right:15px;
 }
 .about-tekst {
     padding:0 30%;
     font-size:20px;
     padding-top:20px;
     font-style: italic;
     
 }
 .try {
     text-align: center;
     padding:0 20%;
     padding-top:50px;
     padding-bottom:20px;
 }
 .try button {
     background:#282828;
    
     color:#eee;
     padding:18px;
     font-weight: bold;
     
     transition: transform 0.5s;
     border-radius: 10px;
 }
 .try button:hover {
     transform:scale(1.2)
 }


    @media only screen and (max-width: 1024px) {
        .about-tekst {
            padding:0 20%;
        }
        .naslov-slika {
            padding-left:10%;
        }
    }

  @media only screen and (max-width: 600px) {
      .naslov-slika {
          padding-left:0;
          justify-content: center;
          
      }
      .about-tekst {
          padding:0;
          padding-top:20px;
          letter-spacing: 1px
      }
  }
</style>