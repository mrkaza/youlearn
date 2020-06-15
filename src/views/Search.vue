
<template>
  <div class="search-sve" >
    <div class="search-unutar" v-bind:class="{sjena : modal}">
      <div class="s-input">
      <div class="ikona-inp">
         <input class="search" type="text" v-model="search" placeholder="Search videos" @keyup.enter="searchVideos">
       <v-icon @click="searchVideos" color="#797979" large class="ikonica">
         mdi-magnify
       </v-icon>
      </div>
       <p class="error-search">{{errorSearch}}</p>
       <h1 class="podnaslov" v-if="results.length==0">Find videos you would like to learn from.</h1>
      </div>
      <div class="video-info" v-for="(result,index) in results" :key="index">
     
        <v-tooltip top>
                    <template v-slot:activator="{ on }">
         <button class="add" @click="kliknutVideo(index)" v-on="on">
           
            <v-icon v-on="on" color="#1f1f1f" @click="kliknutVideo(index)">
              mdi-playlist-plus
            </v-icon>
                   
            
          </button>
           </template>
                    <span>Add to playlist</span>
            </v-tooltip>
    
         
          <v-snackbar v-model="snackbar" :timeout="timeout" color="#CA3E47">
            Succesfully added to playlist
          </v-snackbar>
          <button>
            <v-tooltip top >
                    <template v-slot:activator="{ on }">
            <v-icon v-on="on" class="play" color="#1f1f1f" @click="playVideo(index)">
              mdi-play
            </v-icon>
                    </template>
                    <span>Watch in learn mode</span>
            </v-tooltip>
          </button>
        <div class="video">
          <!-- <iframe  width="100%" height="280" :src="'https://www.youtube.com/embed/'+ result.id.videoId" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
          <img class="video-slika" :src="result.snippet.thumbnails.medium.url" alt="">
          <!-- <p>{{result.snippet.thumbnails.medium}}</p> -->
        </div>
        <div class="opis">
          <a :href="'https://www.youtube.com/watch?v=' + result.id.videoId" target="_blank"><h3>{{result.snippet.title}}</h3></a>
          <p><span class="debelo">Description: </span> {{result.snippet.description}}</p>
          <p><span class="debelo">Channel:</span>
          <a :href="'https://www.youtube.com/channel/' + result.snippet.channelId" target="_blank">
          {{result.snippet.channelTitle}}</a></p>
         
        </div>
        
      </div>


    </div>
    
  <div class="modal-sve" v-bind:class="{vidljiv : modal}" v-if="this.kliknut">
    <div class="close-modal">
      <v-icon @click="modal=false" right color="#CA3E47">
      mdi-close-circle
    </v-icon>
    </div>
    <h3>Add to Playlist</h3>
    <div class="modal-input">
      <input v-model="novaPlaylist" type="text" placeholder="New playlist" @keyup.enter="dodajPlaylistu">
      <v-icon color="#797979" @click="dodajPlaylistu">mdi-playlist-plus</v-icon>
      
    </div>
    <p class="m-error">{{addError}}</p>
    <v-list dense color="#1f1f1f" class="modal-list">
      <v-list-item class="modal-li" v-for="(lista,indexPlay) in playlist" :key="indexPlay">
        <v-list-item-content>
          <p>{{lista.ime}}</p>
        </v-list-item-content>
        <v-list-item-icon>
          <v-icon @click="dodajVideo(indexPlay)" color="#d3d3d3">
            mdi-plus
          </v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
// import {firebaseAuth} from '../firebase/init'
// import searchYoutube from 'youtube-api-search'
import axios from 'axios'
import slugify from 'slugify'
import {firebaseAuth, firebaseDb} from '../firebase/init'
// import firebase from 'firebase'

export default {
  name: 'search',
  components: {
    
  },
  data() {
    return {
      api: 'AIzaSyDWlVk4Fy1SRi-Ixf54xtZb2_0E6n7iRdw',
      url: 'https://www.googleapis.com/youtube/v3/search?',
      params:'part=snippet&order=viewCount&q=',
      search: null,
      results: [],
      slugS: null,
      errorSearch: null,
      snackbar: false,
      timeout: 1500,
      playlist:[],
      modal : false,
      addError: null,
      novaPlaylist: null,
      kliknut: null
    }
  },
  methods: {
    dodajPlaylistu() {
          if(this.novaPlaylist) {
               this.playlist.push({
              ime:this.novaPlaylist,
              pokazi:false,
              rezultat: [{
                ime:this.kliknut.snippet.title,
                pogledano:false,
                id:this.kliknut.id.videoId
              }]
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
            this.addError = null
            this.novaPlaylist = null
            this.modal = false;
          } else {
              this.addError = 'You must enter a name.'
          }
         
        // eslint-disable-next-line no-console
       
        //   let user = firebaseAuth.currentUser

      },
      kliknutVideo(index) {
       this.kliknut= this.results[index]
       // eslint-disable-next-line no-console
       
       this.modal = true
      },
    dodajVideo(indexPlay) {
      if(this.kliknut) {
        this.playlist[indexPlay].rezultat.push({
        ime:this.kliknut.snippet.title,
        pogledano: false,
        id: this.kliknut.id.videoId
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
        this.modal = false;
      }
      
      // eslint-disable-next-line no-console
      
    },
    searchVideos() {
      if(this.search) {
        this.slugS = slugify(this.search, {
          replacement:'+',
          remove: /[$*_~.()'"!\-:@]/g,
          lower: true
       })

      axios.get(`${this.url}type=video&${this.params}${this.slugS}&maxResults=20&key=${this.api}`)
      .then(res => {
        this.results= res.data.items
        // eslint-disable-next-line no-console
        
        this.errorSearch = null
      }).catch(error => {
        // eslint-disable-next-line no-console
        console.log(error)
      })
      } else {
        this.errorSearch = 'You must enter search.'
      }      
    },
    playVideo(index) {
       this.$router.push({name: 'learn', params: {video_id : this.results[index].id.videoId}})
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
                      
                  })
              })
          })
      })
    }
  },
  created() {
       this.getPlaylist()
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
.close-modal {
  width:100%;
  height: 5px;
}
.close-modal i {
  position:absolute;
  top:0;
  right:0;
  padding:4px 4px 0 0;
  
}
.modal-sve {
  width:300px;
  position:absolute;
  top:100px;
  margin-left:-150px;
  z-index: 10;
  left:50%;
  background:#1f1f1f;
  color:#eee;
  box-shadow: -10px -10px 40px 0 rgba(0,0,0,1),
    0px 0px 40px 0 rgba(0,0,0,1); 
  display:none;
  position:fixed;
  min-height: 250px;
}
.vidljiv {
  display:block;
}
.m-error {
  text-align: center;
  font-size:14px;
  color:#CA3E47;
  font-weight: bold;
  margin:0;
}
.modal-sve h3 {
  text-align: center;
  padding:10px 0;
}
.modal-list p {
  color:#eee;
  margin:0;
}
.modal-input input {
  width:90%;
  padding-left:10px;
  height: 100%;
}
.modal-input input:focus {
  outline: none !important;
    border: none;
}
.modal-input i {
  width:10%;
  padding-right:10px;
}
.modal-input {
   box-shadow:inset -2px -2px 6px 0 rgba(255,255,255,0.1),
     inset 2px 2px 6px 0 rgba(0,0,0,1); 
   margin:0 10px;
   border-radius: 5px;
   height: 40px;
}
.modal-list {
  padding-bottom:0;
}
.modal-li {
  padding:0 40px;
  border-bottom:1px solid #797979;
}



.ikona-inp {
  box-shadow:inset -2px -2px 6px 0 rgba(255,255,255,0.2),
     inset 2px 2px 6px 0 rgba(0,0,0,1); 
  border-radius: 10px;
  background:#1f1f1f;
}
.podnaslov {
  padding:20%;
  color:#eee;
  font-style:italic;
  
}
.error-search {
  color:#CA3E47;
  text-align: center;
  font-weight: bold;
}
.s-input {
  margin: 0 25%;
  height: 50px;
  background: #282828;
  margin-bottom: 20px;
  /* border-top:5px solid #282828; */
  
 
  padding-top:10px;
}
.search {
  height: 50px;
  width: 90%;
  font-size: 18px;
  padding-left:10px;
  color:white;
  /* padding-bottom:7px */
 
}
.search:focus {
  outline: none !important;
        border:none;
}

.search-sve {
  height: 100%;
  position:relative;
}
.search-unutar {
  height: 100%;
  margin: 0 10%;
  background: #282828;
}
.video-info {
  border-bottom: 2px solid #CA3E47;
  width:100%;
  overflow:hidden;
  position:relative;
  padding:20px;
  display:inline-flex;
}
.video-slika {
  display:block;
  margin:auto;
}

.video {
  width:40%;
  float:left;
  /* width:50% */
  height: 100%;
}
.opis {
  background-color:#282828;
  overflow:hidden;
  min-width: 200px;
  padding-left:30px;
  padding-right:20%;
  color:#797979;
}
.debelo {
  font-weight: bold;
  color:white;
}
.opis a {
  color:white;
}
.ikonica {
  color:#797979;
  width:10%;
  padding-right:10px;
  
  
}
.add {
  height: 50px;
  width:50px;
  position:absolute;
  right: 90px;
  bottom: 30px;
  border-radius: 50%;
  background-color:#CA3E47;
  color:white;
}
.play {
  height: 50px;
  width:50px;
  position:absolute;
  right:30px;
  bottom:30px;
  border-radius: 50%;
  background:#CA3E47;
}
.sjena {
  opacity:0.4
}

 @media only screen and (max-width:1024px) {
   .s-input {
     margin: 0 20%;
     margin-bottom: 10px;
   }
   .add {
     bottom:10px;
   }
   .play {
     bottom:10px
   }
   .opis {
     padding:0;
     padding-left:20px;
     padding-bottom:35px;
   }
 }
 @media only screen and (max-width: 600px) {
   
   .s-input {
     margin:0;
     margin-bottom: 5px;
     padding-left: 10px;
     padding-right: 10px;
   }
   .video-info {
     display:block
   }
   .search-unutar {
     margin:0;
   }
   .video {
     width:100%;
   }
   .opis {
     width:100%;
     padding:0;
     padding-bottom:35px;
   }
   .add {
     width:45px;
     height: 45px;
     bottom:20px;
     right: 65px;
   }
   .play {
     width:45px;
     height: 45px;
     bottom: 20px;
     right: 10px;
   }
    .s-input i {
      padding-right:10px
    }
    .video-slika {
      padding-bottom: 20px;
    }
    
 }
</style>