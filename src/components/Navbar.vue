<template>
  <div class="cijela-str">
      <v-app-bar
      color="#1F1F1F"
      dense
      flat
      dark
      app
      clipped-left
      clipped-right
     height="40"
     class="mx-auto navigacija"
    >
      
      <v-btn v-if="user" icon @click="leftDrawer=!leftDrawer">
        <v-icon>mdi-account</v-icon>
      </v-btn>

      <div class="naslov-slika">
        <div @click="idiHome" class="naslov-hover">
           <img height="27px" src="../assets/playkapa.png" alt="">
      <v-toolbar-title class="mx-auto">
        YouLearn
        </v-toolbar-title>
        </div>
       
      </div>
      
        

      <v-spacer></v-spacer>

      <!-- <v-btn v-if="user" text to="/search" class="text-lowercase" height="100%">
        search
    </v-btn> -->
      

      
      <v-app-bar-nav-icon  @click="rightDrawer=!rightDrawer"></v-app-bar-nav-icon>

    </v-app-bar>

     <v-navigation-drawer    
     app
      v-model="rightDrawer"
      clipped
      floating
      class="left-drawer"
      color="#1F1F1F"
      dark     
      :width="leftWidth"
      right
      :mini-variant="miniVariant"
      mini-variant-width="50"
      :expand-on-hover="miniVariant"
      mobile-break-point="600"
    >
    <v-list dense>
      <v-list-item to="/search" v-if="user">
        <v-list-item-icon>
          <v-icon>
            mdi-magnify
          </v-icon>
        </v-list-item-icon>
      <v-list-item-content class="src-cont">
        Search
      </v-list-item-content>
    </v-list-item>

    <v-list-item @click="logout" v-if="user">
      <v-list-item-icon>
        <v-icon>
          mdi-logout-variant
        </v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        Logout
      </v-list-item-content>
    </v-list-item>

    <v-list-item to="/login" v-if="!user">
      <v-list-item-icon>
        <v-icon>
          mdi-login-variant
        </v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        Login
      </v-list-item-content>
    </v-list-item>

    <v-list-item to="/register" v-if="!user">
      <v-list-item-icon>
        <v-icon>
          mdi-account-plus
        </v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        Register
      </v-list-item-content>
    </v-list-item>

    </v-list>
      
        
    </v-navigation-drawer>

     <v-navigation-drawer
      v-if="user"
      v-model="leftDrawer"
      app
      clipped
      color="#1F1F1F"
      dark
      floating
      
      :width=rightWidth
    >
    
     <!-- <v-list-item>
        <v-list-item-icon class="arrow-right">
            <v-icon right @click="rightDrawer=!rightDrawer">mdi-menu-right</v-icon>
        </v-list-item-icon>
     </v-list-item> -->
        

          <!-- <v-list-item class="mx-auto avatar-user">
          <v-avatar color="red" height="70px" width="70px">
            <v-icon>mdi-account</v-icon>
          </v-avatar>
        </v-list-item>
        <p class="username">{{username}}</p> -->
        <Profil></Profil>
        <Learnlist></Learnlist>
        <Todo></Todo>
        <Notes></Notes>
        
        <Settings></Settings>
 
    </v-navigation-drawer>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import {firebaseAuth, firebaseDb} from '../firebase/init'
import Todo from './Todo'
import Learnlist from './Learnlist'
import Notes from './Notes'
import Settings from './Settings'
import Profil from './Profil'

export default {
  name: 'navbar',
  components: {
    Todo,
    Learnlist,
    Notes,
    Settings,
    Profil
  },
  data() {
      return {
          leftDrawer: true,
          rightDrawer: null,
          user: null,
          // username: null,
          windowWidth: window.innerWidth,
          rightWidth: 400,
          miniVariant : true,
          leftWidth: 200
      }
  },
  methods: {
    logout() {
      firebaseAuth.signOut().then(() => {
        this.$router.push('/')
      })
    },
    idiHome() {
      this.$router.push('/')
    }
  },
  created() {
    let user = firebaseAuth.currentUser
    // eslint-disable-next-line no-console
    console.log(user)
    firebaseAuth.onAuthStateChanged((user) => {
      if(user) {
        this.user = user
        // eslint-disable-next-line no-console
      } else {
        this.user = null
      }
  
    })
  },
  mounted() {
    // eslint-disable-next-line no-console
    
    if(this.windowWidth <= 600) {
      this.rightWidth = 300
      this.leftWidth = 250
      this.rightDrawer = false
      this.miniVariant = false
    } else if(this.windowWidth <1264) {
      this.leftDrawer = false
    }
    if(this.$route.name == 'learn') {
      this.leftDrawer = false;
      this.rightDrawer = false;
    } else if (this.windowWidth <1264){
      this.leftDrawer = false
      
    } else {
      this.leftDrawer = true
      this.rightDrawer = true
    }
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to,from) {
      // eslint-disable-next-line no-console
      if(this.windowWidth < 600) {
      this.rightWidth = 300
      this.rightDrawer = false
    }
      if(this.$route.name == 'learn') {
        this.leftDrawer = false;
        this.rightDrawer= false;
      } else if (this.windowWidth < 1264) {
        this.leftDrawer = false
        
      }
       else {
        this.leftDrawer = true
      }
    },
    
  }
}
</script>

<style scoped>

.src-cont {
  padding:0;
 
}
.src-btn {
  height: 100%;
  border-radius: 0
}
.naslov-slika img {
  float:left;
  padding-right: 5px;
  margin:0 auto
}
.naslov-slika {
  width:100%;
  display: flex;
  justify-content:center;
  font-family: 'Black Ops One', cursive;
}
.naslov-hover:hover {
  cursor: pointer;
}

    button {
        color:white;
        
    }
    /* .arrow-left {
        float:right
    } */
    .ikonice {
      padding-right: 5px;
    }
    
    .cijela-str {
      /* font-family: 'Lato', sans-serif; */
      font-family: 'Poppins', sans-serif;
    }
    
</style>