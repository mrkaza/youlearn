<template>
  <div class="register">
     <div class="slika">
       <div class="naslov-tekst">
          <h1 class="wlc-txt">Welcome to</h1>
          <div class="naslov-slika">
              <img src="../assets/playkapa.png" alt="">
              <h1>YouLearn</h1>
          </div>
       </div>
      
      <div class="slika-slika">

      </div>
       <!-- <img class="reg-img"  src="../assets/register.png" alt=""> -->
     </div>
     <div class="forma">
      <h1>Create your account.</h1>

         <form class="forma-input">
           <!-- <p>*required for both ways</p> -->
           <div class="inputi">
             <v-icon class="ikonica" color="#d3d3d3">mdi-account-outline</v-icon>
              <input class="inputs" type="text" placeholder="Username" v-model="username">
           </div>
           <!-- <div class="text-center">
          <button type="button" @click="googleRegister" class="s-dugme google">
              Register with   
            <v-icon right color="white">
              mdi-google
              </v-icon>           
          </button>
          <p>or</p>
        </div> -->
           
           
           <div class="inputi inp-mar">
             <v-icon class="ikonica" color="#d3d3d3">mdi-email-outline</v-icon>
              <input class="inputs" type="email" placeholder="Email" v-model="email">
           </div>
          <div class="inputi">
            <v-icon class="ikonica" color="#d3d3d3">mdi-lock-outline</v-icon>
              <input class="inputs" type="password" placeholder="Password" v-model="password">
          </div>
           <router-link class="no-account" to="/login">Already have an account?</router-link>
         </form>
         <p class="error-message" v-if="errorMessage">{{errorMessage}}</p>
         
        <div class="text-center dugmad">
          <button @click="register" class="s-dugme">
              Create account 
              <v-icon right color="white">
              mdi-account-plus
              </v-icon>
          </button>
        </div>
        
     </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {firebaseAuth, firebaseDb} from '../firebase/init'
import slugify from 'slugify'
// import firebase from 'firebase'

export default {
  name: 'register',
  components: {
    
  },
  data() {
    return {
      errorMessage: null,
      username: null,
      email: null,
      password: null,
      slug: null,
    }
  },
  methods: {
    register() {
      if(this.username && this.email && this.password) {
        this.slug = slugify(this.username, {
          replacement:'-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        let ref = firebaseDb.collection('users').doc(this.slug)
        ref.get().then(doc=> {
          if(doc.exists) {
            this.errorMessage = 'This username already exists.'
          } else {
            firebaseAuth.createUserWithEmailAndPassword(this.email, this.password).then(cred => {
              ref.set({
                username: this.username,
                user_id: cred.user.uid,
                todos: [],
                playlist:[],
                pdf:[],
                browser: false,
                profilna: 'https://firebasestorage.googleapis.com/v0/b/youlearn-it.appspot.com/o/profdefau.png?alt=media&token=1b8a26db-612e-4806-b568-cfe5b2a63805',
              })
            }).then(() => {
              // firebaseAuth.onAuthStateChanged((user) => {
              //   user.sendEmailVerification().then(() => {
              //     user.reload()
              //     // eslint-disable-next-line no-console
              //     console.log('poslano')
              //     this.$router.push('/verify-email')
              //   })
              // })
              this.$router.push('/search')
              
            })
            .catch(error => {
              this.errorMessage = error.message
            })
          }
        })
      } else {
        this.errorMessage = 'You must enter all fields.'
      }
    },
    
    // googleRegister() {

    //   if(this.username) {
    //     this.slug = slugify(this.username, {
    //       replacement:'-',
    //       remove: /[$*_+~.()'"!\-:@]/g,
    //       lower: true
    //     });
    //     let ref = firebaseDb.collection('users').doc(this.slug)
    //     var provider = new firebase.auth.GoogleAuthProvider()
    //     ref.get().then(doc => {
    //       if(doc.exists) {
    //         this.errorMessage = 'This username is already in use'
    //       } else {
    //         firebaseAuth.signInWithPopup(provider).then(cred => {
    //           // eslint-disable-next-line no-console
              
    //           // eslint-disable-next-line no-unused-vars
    //           let postoji = firebaseDb.collection('users').where('user_id','==',cred.user.uid).get().then(snapshot => {
    //             // eslint-disable-next-line no-console
              
    //             if(snapshot.empty == false) {
    //               this.$router.push('/search')
    //             } else {
    //               ref.set({
    //              username: this.username,
    //             user_id: cred.user.uid,
    //             todos: [],
    //             playlist:[],
    //             pdf:[],
    //             browser: false,
    //             profilna: 'https://firebasestorage.googleapis.com/v0/b/youlearn-it.appspot.com/o/profdefau.png?alt=media&token=1b8a26db-612e-4806-b568-cfe5b2a63805'
    //           })
    //             }
    //           })
    //           // eslint-disable-next-line no-console
              
              
              
    //         }).then(() => {
    //           this.$router.push('/search')
    //         }).catch(error => {
    //           this.errorMessage = error.message
    //         })
    //       }
    //     })
    //   } else {
    //     this.errorMessage = 'You must enter your username.'
    //   }
      
      
     
    // },

    
  }
}
</script>

<style scoped>
button:focus {
  outline:none;
  box-shadow: inset -2px -2px 6px 0 rgba(255,255,255,0.1),
     inset 2px 2px 6px 0 rgba(0,0,0,1);
}
.no-account {
  color:#d3d3d3;
  padding-left:10px;
}
.wlc-txt {
  padding-top: 50px;
  
}
.naslov-slika {
  
     padding-bottom:50px;
     display:flex;
     justify-content: center;
     font-family: 'Black Ops One', cursive; 
     padding-left:100px;  
 }
 .slika-slika {
   height: 70%;
   background-image: url('../assets/register.png');
   background-repeat: no-repeat;
   background-size: contain;
   background-position: center;
 }
 .naslov-slika img {
   height: 60px;
 }
.inputs {
  width: 85%;
  height: 40px;
}
.ikonica {
  width:10%;
  color:white;
  padding-right: 10px;
}

.register {
  background: #282828;
  height: 100%;
  display:inline-flex;
  width:100%;
}
 .slika {
   width:60%;
   background:#eee
 }
 .reg-img {
   width:100%;
   padding:20px;
 }
 .forma {
   width:40%;
   background:#282828;
 }

h1 {
  text-align: center;
  font-family: 'Black Ops One', cursive;
  font-size:40px
}
.forma h1 {
  padding-top:10%;
  padding: 10% 20% 0 20%;
  color:#eee;
}
.inputi {
  padding:10px 10px;
 
  margin-bottom:10px;
  width:100%;
  
  border-radius: 10px;
  background: #1f1f1f;
  color:white;
  font-weight: bold;
  box-shadow: 
     -2px -2px 6px 0 rgba(255,255,255,0.1),
     2px 2px 6px 0 rgba(0,0,0,1);
}
.inp-mar {
  margin:30px 0;
}

.inputs:focus {
    outline: none !important;
    border: none;
    /* box-shadow: 
    inset -2px -2px 6px 0 rgba(255,255,255,0.1),
     inset 2px 2px 6px 0 rgba(0,0,0,1); */
}
.forma-input {
  padding: 0 10%;
}
.or {
  text-align: center;
  font-weight: bold;
}
.s-dugme {
  color:white;
  border-radius: 10px;
  padding:15px 20px;
  background-color:#1f1f1f;
  box-shadow: 
    -2px -2px 6px 0 rgba(255,255,255,0.1),
     2px 2px 6px 0 rgba(0,0,0,1);
  
}
.dugmad {
  padding-top:40px;
}

.error-message {
  color: #CA3E47;
  font-weight: bold;
  text-align: center;
}
.google {
  background: #CA3E47;
  margin-top:30px;
}
.forma-input p {
  color:#797979;
  margin-top:25px;
  margin-bottom:0;
}
 @media only screen and (max-width:1024px) {
   .register {
     display:block;
   }
   .slika {
     width:100%;
     height: 30%;
     display:inline-flex;
     padding:20px 0;
   }
   .forma {
     width:100%;
     /* height: 70%; */
   }
   .naslov-tekst {
     width:40%;
   }
   .slika-slika {
     height: 100%;
     width:60%;
   }
   .forma-input {
     padding: 0 20%;
   }
   .forma h1 {
     padding-top:50px;
   }
 }
 @media only screen and (max-width:768px) {
   .dugmad {
     padding-bottom:50px;
   }
 }
  @media only screen and (max-width: 600px) {
    .register {
      display:block;
    }
    /* .slika {
      width:100%;
       background-image: url('../assets/register.png');
       background-repeat: no-repeat;
       background-size:contain;
       background-position: center;
    } */
    .slika-slika {
      display:none;
    }
    .slika {
      height: 25%;
    }
    .naslov-tekst {
      width:100%;
    }
    .forma {
      width:100%;
      background:#282828;
    }
    .reg-img {
      display:none;
    }
    .forma h1 {
      font-size:30px;
    }
    .s-dugme {
      margin-bottom:50px;
    }
    .naslov-slika {
      padding-left:0;
      padding-bottom:20px;
    }
    
   
    .wlc-txt {
      padding-top:20px;
    }
    .inputi {
      margin:0;
      margin-bottom:10px;
    }
    .inp-mar {
      margin:20px 0;
    }
    .forma-input {
      padding:0 5%;
    }
    .no-account {
      margin-top:10px;
    }
    .google {
      margin:0;
      margin-top:30px;
    }
  }
</style>