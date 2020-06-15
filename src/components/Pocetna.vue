<template>
  <div class="pocetna-sve">
      <!-- <v-container class="pocetna">
          <div class="row pocetak">
              <v-col  cols="12" md="6" sm="6" xs="12">
                  <div class="naslov-slika">
                      <img src="../assets/playkapa.png" alt="">
                      <h1>YouLearn</h1>
                  </div>
                  <h3>Making learning on Youtube easy</h3>
              </v-col>
              <v-col  cols="12" md="6" sm="6" xs="12">
                  <img class="slika-pocetna" src="../assets/pocetna.png" alt="">
              </v-col>
          </div>
          <div class="row slike">
              <v-col class="visina" cols="12"  xs="12" md="4" sm="4">
                  <img class="slika" src="../assets/mobitel.png" alt="">
              </v-col>
              <v-col class="visina" cols="12" xs="12" md="4"  sm="4">
                  <img class="slika" src="../assets/notes.png" alt="">
              </v-col>
              <v-col class="visina" cols="12" xs="12" md="4"  sm="4">
                  <img class="slika" src="../assets/todo.png" alt="">
              </v-col>
          </div>
      </v-container> -->

    <div class="pocetna">
        <div class="pocetak">
             <div class="naslov-slika">
                <img src="../assets/playkapa.png" alt="">
                <h1>YouLearn</h1>
            </div>
            <h3>Making learning on Youtube easy.</h3>
        </div>
       
        <!-- <div class="slika-pocetna">
            <img src="../assets/pocetna.png" alt="">
        </div> -->
    </div>
    <div class="slike">
        <div class="slika">
            <img src="../assets/mobitel.png" alt="">
        </div>
        <div class="slika">
            <img src="../assets/notes.png" alt="">
        </div>
        <div class="slika">
            <img src="../assets/todo.png" alt="">
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'pocetna',
  components: {
  
  }
}
</script>
<style scoped>
 .pocetna-sve {
     padding-bottom:100px;
     
     margin:0 15%;
     
 }
 .pocetna {
     
     /* display:inline-flex */
 }
 .pocetak {
     width:100%;
     /* padding:50px; */
     padding:0 20%;
 }
 .slike {
     border-radius:10px;
     padding:20px;
     display:inline-flex;
     /* box-shadow: -6px -6px 12px 0 rgba(255,255,255,1),
                6px 6px 12px rgba(0,0,0,0.1); */
                
 }
 .slika {
     /* box-shadow:inset -6px -6px 12px 0 rgba(255,255,255,1),
               inset 6px 6px 12px rgba(0,0,0,0.1); */
     width:33.3%;
     margin:0 10px;
     border-radius:10px;
 }
 .slika img {
     width:100%;
     height: 100%;
     padding:30px;
 }
 .naslov-slika {
     padding-top:70px;
     display:flex;
     justify-content: center;
     font-family: 'Black Ops One', cursive;
     
 }
 .slika-pocetna {
     width:50%;
     height: 100%;
 }
 .slika-pocetna img {
     height: 100%;
     width:100%;
     padding:50px;
 }
 .naslov-slika img {
     height: 60px;
     margin:15px 0;
 }
 .naslov-slika h1 {
     font-size: 60px;
     margin:0;  
 }
 h3 {
     text-align: right;
     font-style: italic;
     font-weight: 300;
 }
  @media only screen and (max-width:1024px) {

  }

   @media only screen and (max-width: 768px) {
       .slika img {
           padding:0;
       }
       .slika {
           margin:0 20px;
       }
       .slike {
           padding: 30px 0;
       }
   }

  @media only screen and (max-width: 600px) {
      .pocetna-sve {
          margin:0 5%;
      }
      .pocetna {
          display:block
      }
      .pocetak {
          width:100%;
          padding:0;
      }
      .slika-pocetna {
          display:none;
      }
      .slike {
          display:block;
      }
      .slika {
          width:100%;
          margin:15px 0;
          padding:0;
          box-shadow:inset -6px -6px 12px 0 rgba(255,255,255,1),
               inset 6px 6px 12px rgba(0,0,0,0.1);
      }
      .slika img {
          padding:30px
      }
      .naslov-slika img {
            height: 50px;

            
        }
        .naslov-slika h1 {
            font-size: 50px;
              
        }
        h3 {
            padding-left:40%;
        }
  }
 

</style>