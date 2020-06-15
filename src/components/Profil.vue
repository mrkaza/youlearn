<template>
  <div class="profil">
   <v-list-item class="mx-auto avatar-user">
          <v-avatar class="prof-avat"  @click="$refs.imageUpload.click()"  height="100px" width="100px" @mouseover="pokazi = true" @mouseleave="pokazi = false">
            <img  color="#d3d3d3" class="prof-img" :src="this.profilna" alt="">
            <div class="ispred" :class="{pokazi: pokazi}">
                <v-icon color="#d3d3d3">
                    mdi-image
                </v-icon>
            </div>
          </v-avatar>
          
          <input type="file" v-show="false" ref="imageUpload" @change="upload" accept="image/*" >
        <!-- <v-icon color="#d3d3d3" class="upload-img" @click="$refs.imageUpload.click()">
              mdi-image
          </v-icon>   -->
            
          
        </v-list-item>
        <p class="username">{{username}}</p>
  </div>
</template>

<script>
import {firebaseAuth, firebaseDb} from '../firebase/init'
import firebase from 'firebase'

export default {
  name: 'profil',
  components: {
   
  },
  data() {
      return{
          username: null,
          selectedImg: null,
          profilna: null,
          uploadValue:0,
          pokazi:false,
      }
  },
  methods: {
      fileSelect(e) {
          this.selectedImg = e.target.files[0]
          // eslint-disable-next-line no-console
          
      },
      uBazu() {
          var user = firebaseAuth.currentUser
          firebaseDb.collection('users').where('user_id','==', user.uid)
          .get().then(snapshot => {
              snapshot.forEach(doc => {
                  firebaseDb.collection('users').doc(doc.id).update({
                      profilna: this.profilna
                  })
              })
          })
          // eslint-disable-next-line no-console
          
      },
      upload(e) {
          this.fileSelect(e)
          this.profilna = null;
          const storageRef = firebase.storage().ref(`${this.selectedImg.name}`).put(this.selectedImg);
          storageRef.on(`state_changed`, snapshot => {
              this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100
          // eslint-disable-next-line no-console
          }, error => {console.log(error.message)},
          () => {
              this.uploadValue =100;
              storageRef.snapshot.ref.getDownloadURL().then((url) => {
                  this.profilna = url
                  this.uBazu()
                  // eslint-disable-next-line no-console
                  

              })
          })

      }
  },
  created() {
      var user = firebaseAuth.currentUser
      firebaseDb.collection('users').where('user_id','==',user.uid)
      .get().then(snapshot => {
          snapshot.forEach((doc) => {
              firebaseDb.collection('users').doc(doc.id).get()
              .then(() => {
                  snapshot.forEach(doc => {
                      this.username = doc.data().username
                  })
              })
          })
      })
  },
  mounted() {
      let user = firebaseAuth.currentUser
            firebaseDb.collection('users').where('user_id','==',user.uid).get().then(snapshot => {
            snapshot.forEach((doc) => {
             firebaseDb.collection('users').doc(doc.id).get()
            .then(() => {
            snapshot.forEach(doc => {
                this.profilna = doc.data().profilna
                // eslint-disable-next-line no-console
             
                 })
              })
            })
        })

        // if(this.profilna == null) {
        //     this.profilna = '../assets/computer.jpg'
        //     // eslint-disable-next-line no-console
        //     console.log(this.profilna)
        // }
  }
}
</script>
<style scoped>

  .v-avatar {
      margin:0 auto;
    }
    .prof-img {
        object-fit: cover;
    }
    .username {
      font-weight: bold;
      color:white;
      text-align: center;
      padding:10px 0;
      margin:0;
      /* border-bottom: 1px dashed #CA3E47 */
      border-bottom: 1px solid #5e5e5e
    }
    .avatar-user {
      padding-top: 30px;
    }
    /* .upload-img {
        position:absolute;
        bottom:0;
        right:135px;
        color:#d3d3d3;
    } */
    .profil {
        border-bottom:2px solid #5e5e5e
    }
    .ispred {
        height: 100px;
        width:100px;
        background:rgba(0,0,0,0.5);
        position:absolute;
        z-index:2;
        display:none;
    }
    .ispred:hover {
        cursor:pointer;
    }
  
    .prof-avat:hover {
        cursor:pointer
    }
    /* .prof-img:hover ~ .ispred {
        display:block;
     } */
     .pokazi {
         display:block;
     }
</style>