<template>
 <div class="register">
     <div class="slika">
       <div class="naslov-tekst">
          <h1 class="wlc-txt">Welcome back to</h1>
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
      <h1>Login.</h1>

         <form action="submit" class="forma-input">

           
           <div class="inputi inp-mar">
             <v-icon class="ikonica" color="#d3d3d3">mdi-email-outline</v-icon>
              <input class="inputs" type="email" placeholder="Email" v-model="email">
           </div>
          <div class="inputi">
            <v-icon class="ikonica" color="#d3d3d3">mdi-lock-outline</v-icon>
              <input class="inputs" type="password" placeholder="Password" v-model="password">
              
          </div>
          <router-link class="no-account" to="/register">Don't have an account?</router-link>
         </form>
         <p class="error-message" v-if="errorMessage">{{errorMessage}}</p>
         
        <div class="text-center dugmad">
          <button @click="login" class="s-dugme">
              Login 
              <v-icon right color="white">
              mdi-login
              </v-icon>
          </button>
          <!-- <p class="or">or</p>
          <button class="s-dugme google" @click="loginGoogle">
          Login with 
          <v-icon color="white" right>
            mdi-google
          </v-icon>
          </button>   -->
        </div>
        
     </div>
  </div>
</template>

<script>
import {firebaseAuth} from '../firebase/init'
// import firebase from 'firebase'


export default {
  name: 'login',
  components: {
    
  },
  data() {
    return {
      errorMessage: null,
      email: null,
      password: null,
    }
  },
  methods: {
    login() {
      if(this.email && this.password) {
        // eslint-disable-next-line no-unused-vars
        firebaseAuth.signInWithEmailAndPassword(this.email, this.password).then(cred => {
          this.$router.push('/search')
        }).catch(error => {
          if(error.code == 'auth/user-not-found') {
            this.errorMessage = 'There is no user with this email adress.'
          } else {
            this.errorMessage = error.message
          }
          
        })
        this.errorMessage=null
      } else {
        this.errorMessage ="You must enter all fields."
      }
    },
    // loginGoogle() {
    //   var provider = new firebase.auth.GoogleAuthProvider()
    //   // eslint-disable-next-line no-unused-vars
    //   firebaseAuth.signInWithPopup(provider).then(cred=> {
    //     this.$router.push('/search')
    //   }).catch(error => {
    //     this.errorMessage = error.message
    //   })
    // }
  }
}
</script>

<style scoped>
button:focus {
  outline:none;
  box-shadow: inset -2px -2px 6px 0 rgba(255,255,255,0.1),
     inset 2px 2px 6px 0 rgba(0,0,0,1);
}
.wlc-txt {
  
  padding: 50px 10% 0 10%;
}
.no-account {
  color:#d3d3d3;
  padding-left:10px;
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
   background-image: url('../assets/login.png');
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
   background:#eee;
   padding:0 50px;
 }
 .reg-img {
   width:100%;
   padding:20px;
 }
 .forma {
   width:40%
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
  
  width:100%;
  margin:10px 0;
  border-radius: 10px;
  background: #1f1f1f;
  color:white;
  font-weight: bold;
  box-shadow: 
     -2px -2px 6px 0 rgba(255,255,255,0.1),
     2px 2px 6px 0 rgba(0,0,0,1);
}
.inp-mar {
  margin:30px 0
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
  color:#d3d3d3;
  margin:20px 0;
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
  margin-top:40px;
}

.error-message {
  color: #CA3E47;
  font-weight: bold;
  text-align: center;
}
.google {
  background:#cA3E47
}
 @media only screen and (max-width:1024px) {
   .register {
     display:block;
   }
   .slika {
     width:100%;
     height: 40%;
     display:inline-flex;
     padding:20px 0;
   }
   .forma {
     width:100%;
     /* height: 70%; */
     /* height: 60%; */
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
      height: 35%;
    }
    .naslov-tekst {
      width:100%;
    }
    .forma {
      width:100%;
      background:#282828;
      padding-bottom:70px;
    }
    .reg-img {
      display:none;
    }
    .forma h1 {
      font-size:30px;
    }
    .dugmad {
      padding-bottom:10px;
    }
    .naslov-slika {
      padding-left:0;
      padding-bottom:20px;
    }
    
   
    .wlc-txt {
      padding-top:20px;
    }
    .inputi {
      margin:20px 0
    }
    .forma-input {
      padding:0 5%;
    }
  }
</style>