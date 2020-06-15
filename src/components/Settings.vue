<template>
<div class="settings">
    <v-list class="cijela-lista">
        <v-list-item class="naslov" @click="pokaziSetting">
            <v-list-item-icon>
                <v-icon>
                    mdi-settings-outline
                </v-icon>
            </v-list-item-icon>
            <v-list-item-content class="cont">
                <p>Settings</p>
            </v-list-item-content>
            <v-list-item-icon v-if="pokazi==false">
                <v-icon >
                    mdi-menu-down
                </v-icon>
            </v-list-item-icon>
            <v-list-item-icon v-if="pokazi== true">
                <v-icon >
                    mdi-menu-up
                </v-icon>
            </v-list-item-icon>
        </v-list-item>

        <v-list v-if="pokazi== true" class="drugi-dio">
            <!-- <v-list-item class="logout setting">
                <v-list-item-content class="set-cont">
                    <p>Logout</p>  
                </v-list-item-content>
                <v-list-item-icon class="set-icon mt-3 mb-3" >
                    <v-icon @click="logout" color="#d3d3d3">
                        mdi-logout-variant
                    </v-icon>
                </v-list-item-icon>
            </v-list-item> -->
            <v-list-item class="setting">
                <v-list-item-content class="set-cont">
                    <p class="svic-p">Browser</p>
                </v-list-item-content>
                
                <v-list-item-icon class="set-icon mt-2" v-if="browserOn==false">
                    <v-icon :disabled="disabledIcon" large @click="browserTrue" color="#797979">
                        mdi-toggle-switch-off-outline
                    </v-icon>
                </v-list-item-icon>
                
                
                <v-list-item-icon class="set-icon mt-2" v-if="browserOn==true">
                    <v-icon :disabled="disabledIcon" large @click="browserTrue" color="#CA3E47">
                        mdi-toggle-switch-outline
                    </v-icon> 
                </v-list-item-icon>
            </v-list-item>
        </v-list>

    </v-list>
</div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import {firebaseAuth, firebaseDb} from '../firebase/init'
import {bus } from '../main'
export default {
    name: 'settings',
    data() {
        return {
            pokazi: false,
            browserOn: null,
            disabledIcon: false,
            windowWidth: window.innerWidth
        }
    },
    methods: {
    //    logout() {
    //   firebaseAuth.signOut().then(() => {
    //     this.$router.push('/')
    //   })
    // },
    dajBrowser() {
        let user = firebaseAuth.currentUser
            firebaseDb.collection('users').where('user_id','==',user.uid).get().then(snapshot => {
            snapshot.forEach((doc) => {
             firebaseDb.collection('users').doc(doc.id).get()
            .then(() => {
            snapshot.forEach(doc => {
                this.browserOn = doc.data().browser
                // eslint-disable-next-line no-console
                
                 })
              })
            })
        })
    },
    browserTrue() {
        let user = firebaseAuth.currentUser
        firebaseDb.collection('users').where('user_id','==',user.uid)
        .get().then(snapshot => {
            snapshot.forEach(doc => {
                firebaseDb.collection('users').doc(doc.id).update({
                    browser: !this.browserOn
                })
            })
        })


        bus.$emit('change',this.browserOn)
    },
    pokaziSetting() {
        this.pokazi=!this.pokazi
    }
    },
    created() {
       this.dajBrowser()
    },
    mounted() {
        let ref = firebaseDb.collection('users')
      ref.onSnapshot(snapshot => {
          snapshot.docChanges().forEach(() => {
              this.dajBrowser()
          })
      })
      if(this.windowWidth < 1025) {
          this.disabledIcon = true
      }
    }
    
}
</script>

<style scoped>
    .naslov p {
        margin:0;
        text-align: center;
    }
    .cont p {
        margin:0;
        text-align: center;
        font-weight: bold;
    }
    .cijela-lista {
        padding:0;
        
    }
     .drugi-dio {
         padding:0;
     }
     .drugi-dio p {
         margin:0;
         padding-left:50%;
         color:#d3d3d3
     }
  
     .svic {
         width:50%;
     }
    
     .set-icon {
         width:50%;
         margin:0;
     }
     .set-icon i {
         padding-left:20%;
         padding-right: 20%;
     }
     .setting {
         border-top: 0.5px dotted #5e5e5e
         
     }
     .v-input {
         margin:0;
         
     }
     .v-messages {
         display:none;
     }
     .settings {
         border-bottom: 3px solid #5e5e5e
     }
</style> 
