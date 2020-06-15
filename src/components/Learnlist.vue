/* eslint-disable vue/no-use-v-if-with-v-for */
<template>
  <div class="learnlist">
    <v-list class="cijela">
        <v-list-item class="naslov" @click="pokaziListu">
            <v-list-item-icon class="mr-2">
                <v-icon>
                    mdi-playlist-play
                </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <p class="p-play">Playlist</p>
            </v-list-item-content>
            <v-list-item-icon v-if="pokazi==false" class="ml-2">
                <v-icon>
                    mdi-menu-down
                </v-icon>
            </v-list-item-icon>
            <v-list-item-icon v-if="pokazi==true">
                <v-icon>
                    mdi-menu-up
                </v-icon>
            </v-list-item-icon>
        </v-list-item>
        <v-list-item class="play-inp" v-if="pokazi">
            <v-list-item-content class="inp-cont">
                <input class="inp" type="text" v-model="novaPlaylist" placeholder="New Playlist" @keyup.enter="dodajPlaylistu">
               
            </v-list-item-content>
            <v-list-item-icon class="mt-3 mb-3">
                 <v-icon color="#797979" @click="dodajPlaylistu">
                    mdi-playlist-plus
                </v-icon>
            </v-list-item-icon>
        </v-list-item>
        <p class="name-error">{{nameError}}</p>
        <p v-if="playlist.length == 0 && pokazi" class="errorl">Your playlist is empty.</p>

        <v-list class="lista" v-for="(lista,indexPlay) in playlist" :key="indexPlay">
            <v-list-item v-if="pokazi" class="lista-vani">
                <v-list-item-icon class="mt-3 mr-3">
                    <v-icon color="#CA3E47" @click="deletePlaylist(indexPlay)">
                        mdi-delete
                    </v-icon>
                </v-list-item-icon>
                <v-list-item-content class="hover-list" @click="lista.pokazi =! lista.pokazi">
                    <p>{{lista.ime}}</p>
                </v-list-item-content>
                <v-list-item-icon class="ml-0 mt-3 hover-list" @click="lista.pokazi=!lista.pokazi">
                    <v-icon >
                        mdi-menu-down
                    </v-icon>
                </v-list-item-icon>
                
            </v-list-item>
            <v-list v-if="lista.pokazi && pokazi" class="lista-unutar">
                <v-list-item class="unutar-item" v-for="(video,index) in lista.rezultat" :key="index" >
                <v-list-item-icon class="mr-1 ml-1 mt-3">
                    <v-icon color="#CA3E47" @click="deleteVideo(index,indexPlay)">
                        mdi-delete-outline
                    </v-icon>
                </v-list-item-icon>
                <v-list-item-content class="lista-cont">
                    <p class="p-cont" @click="pogledanVideo(indexPlay,index)" :class="{pogledan: video.pogledano}">
                        {{video.ime}}
                    </p>
                </v-list-item-content>  
                <v-list-item-icon class="mr-1 ml-1 mt-3 mb-3">
                    <v-icon color="#797979" @click="playVideo(indexPlay,index)">
                        mdi-television-play
                    </v-icon>
                </v-list-item-icon>     
            </v-list-item>
            <p  class="error2" v-if="lista.rezultat.length==0">Playlist is empty.</p>
            </v-list>
            
        </v-list>

        <!-- <v-list-item class="lista" v-for="(lista,index) in playlist" :key="index">
            <v-list-item-icon class="mr-1 ml-1">
                <v-icon @click="deleteVideo(index)" color="red">
                    mdi-delete-outline
                </v-icon>
            </v-list-item-icon>
            <v-list-item-content class="lista-cont" color="#d3d3d3">
                <v-tooltip top>
                    <template v-slot:activator="{ on }">
                  <p v-on="on" @click="pogledanVideo(index)" class="item-kontent" :class="{pogledan : video.pogledano}">{{video.videoIme}}</p>
                    </template>
                    <span>Mark as watched</span>
                </v-tooltip>
              </v-list-item-content>
            <v-list-item-icon class="mr-2 ml-1">
                <v-tooltip top>
                    <template v-slot:activator="{ on }">
                <v-icon v-on="on" color="#797979" @click="playVideo(index)">
                    mdi-television-play
                </v-icon>
                    </template>
                    <span>Watch in learn mode</span>
                </v-tooltip>
            </v-list-item-icon>

        </v-list-item> -->
        
    </v-list>
  </div>
</template>

<script>
import {firebaseAuth, firebaseDb} from '../firebase/init'
// import firebase from 'firebase'


export default {
  name: 'learnlist',
  components: {
    
  },
  data() {
      return {
          playlist: [],
          pokazi: false,
          novaPlaylist: null,
          nameError: null,
      }
  },
  methods: {
      pokaziListu() {
          this.pokazi=!this.pokazi
      },
      dodajPlaylistu() {
          if(this.novaPlaylist) {
               this.playlist.push({
              ime:this.novaPlaylist,
              pokazi:false,
              rezultat: []
              })
            let user = firebaseAuth.currentUser
            firebaseDb.collection('users').where('user_id','==',user.uid)
            .get().then(snapshot => {
                snapshot.forEach(doc => {
                    firebaseDb.collection('users').doc(doc.id).update({
                        playlist:this.playlist
                    })
                })
            })
            this.nameError = null
            this.novaPlaylist = null
          } else {
              this.nameError = 'You must enter a name.'
          }
         
        // eslint-disable-next-line no-console
       
        //   let user = firebaseAuth.currentUser

      }
      ,
      deletePlaylist(indexPlay) {
           this.playlist.splice(indexPlay,1)
           // eslint-disable-next-line no-console
           

          let user = firebaseAuth.currentUser;
          
         firebaseDb.collection('users').where('user_id','==',user.uid)
         .get().then(snapshot => {
             snapshot.forEach(doc => {
                 firebaseDb.collection('users').doc(doc.id).update({
                    playlist: this.playlist
                 })
             })
         })
      },
      deleteVideo(index,indexPlay) {
          this.playlist[indexPlay].rezultat.splice(index,1)

           let user = firebaseAuth.currentUser;
          
         firebaseDb.collection('users').where('user_id','==',user.uid)
         .get().then(snapshot => {
             snapshot.forEach(doc => {
                 firebaseDb.collection('users').doc(doc.id).update({
                    playlist: this.playlist
                 })
             })
         })
      },
      playVideo(indexPlay,index) {
          
        this.$router.push({name: 'learn', params: {video_id : this.playlist[indexPlay].rezultat[index].id}})
      },
      getPlaylist() {
          let user = firebaseAuth.currentUser

      firebaseDb.collection('users').where('user_id','==',user.uid)
      .get().then(snapshot => {
          snapshot.forEach(doc => {
              firebaseDb.collection('users').doc(doc.id).get()
              .then(() => {
                  snapshot.forEach(doc => {
                      this.playlist = doc.data().playlist
                      // eslint-disable-next-line no-console
                      
                        
                      // eslint-disable-next-line no-console
                      
                  })
              })
          })
      })
      // eslint-disable-next-line no-console
      
      },
      pogledanVideo(indexPlay, index) {
          // eslint-disable-next-line no-console
          
          this.playlist[indexPlay].rezultat[index].pogledano =!this.playlist[indexPlay].rezultat[index].pogledano
          let user = firebaseAuth.currentUser

          firebaseDb.collection('users').where('user_id','==',user.uid)
          .get().then(snapshot => {
              snapshot.forEach(doc => {
                  firebaseDb.collection('users').doc(doc.id).update({
                      playlist: this.playlist
                  })
              })
          })
      }
  },
  mounted() {
      let ref = firebaseDb.collection('users')
      ref.onSnapshot(snapshot => {
          snapshot.docChanges().forEach(() => {
              this.getPlaylist()
          })
      })
    
  }
}
</script>
<style scoped>
.learnlist {
    border-bottom: 3px solid #5e5e5e;
    
}
.p-play {
    margin:0;
    text-align: center;
    font-weight: bold;
}
.lista-vani {
    height: 48px;
    border-top:1px solid #797979;
    padding:0 50px;
}
.lista-vani p {
    text-align: center;
}
.hover-list:hover {
    cursor:pointer
}
.name-error {
    font-size:14px;
    text-align:center;
    color:#CA3E47;
    font-weight: bold;
    margin:0;
}
.inp {
    height: 100%;
}
.inp:focus {
    outline: none !important;
    border: none;
}
.inp-cont {
    padding:0;
    height: 100%;
}
.play-inp {
     box-shadow:inset -2px -2px 6px 0 rgba(255,255,255,0.1),
     inset 2px 2px 6px 0 rgba(0,0,0,1); 
     margin:5px 10px;
     height: 48px;
     background:#282828;
     border-radius: 5px;
}
.lista-unutar {
    padding:0;
    
}
.unutar-item {
    height: 48px;
    border-top:1px dotted #5e5e5e;
    padding:0 70px;
}
   
    .cijela {
        padding-bottom: 0;
        padding:0;
    }

    .lista-cont {
        padding:0;
        font-size: 14px
    }
    .p-cont {
        margin:0;
        text-align: center;
        color:#d3d3d3
    }
    .lista-cont p:hover {
        cursor:pointer
    }
    .lista {
        padding: 0;
        /* border-bottom: 3px solid#CA3E47; */
    }
    .lista p {
        margin:0;
    }
    .errorl {
        color:#797979;
        text-align: center;
        margin:8px 0;
    }
    .error2 {
        color:#797979;
        text-align: center;
        padding-bottom:5px;
    }
     .pogledan {
        color:#5e5e5e;
    }
   
    @media only screen and (max-width: 600px) {
        .unutar-item {
            padding:0 30px;
        }
        .lista-vani {
            padding:0 10px;
        }
    }
</style>