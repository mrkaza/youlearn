<template>
  <div class="learn">
    <div class="lijevo" :class="{lijevoSve : !this.browserOn}">
       <div class="video" :class="{videoSve : !this.browserOn}">
         <iframe  width="100%" height="100%" :src="'https://www.youtube.com/embed/'+ this.$route.params.video_id +'?&showinfo=0&modestbranding=1&rel=0&playsinline=1'" frameborder="0" ></iframe>
      </div>
      <div class="notes" :class="{notesSve : !this.browserOn}">
        
        <div class="tekst">
          <tiptap-vuetify
            :editor="editor"
            placeholder="Write your notes..."
            v-model="content"
            :extensions="extensions"
            :toolbar-attributes="{color:'#CA3E47', dark: true,style: {
              width:'75%'
            }}"
            :card-props="{height: '100%', color: '#282828',flat:true
            ,style: {color: 'white',borderTop: '1px solid #282828'}}"
          />
        </div>

        <div class="input-pdf" v-if="pokaziInput = true">
          <input v-model="pdfName" class="pdf-name" type="text" placeholder="New note">
          <p class="name-error" v-if="nameError">{{nameError}}</p>
        </div>
        <div class="input-pdf" v-if="pokaziInput= false">
          <p>hejhej</p>
        </div>


        <div class="notes-select">
          <v-list class="notes-lista" color="#CA3E47">
            <v-list-item class="notes-lista-item" @click="pokaziNotes">
              <v-list-item-content class="notes-lista-cont">
                <p>{{odabranaNota}}</p>
              </v-list-item-content>
              <v-list-item-icon class="ml-1 mt-2 mb-1">
                <v-icon  class="ml-1">
                  mdi-menu-down
                </v-icon>
              </v-list-item-icon>
            </v-list-item>  
          </v-list>
          <v-list dense v-if="pokaziNote" class="select-lista" color="#ca3e47">
               <v-list-item   v-for="(note,index) in notes" :key="index" class=" nez" >
                <v-list-item-content class="notes-lista-cont" @click="dajNotu(index)">
                  <p>{{note.id}}</p>
                </v-list-item-content>
               </v-list-item>
               <v-list-item v-if="notes.length== 0" class=" nez">
                 <v-list-item-content class="notes-lista-cont">
                   <p class="error-note">No notes.</p>
                 </v-list-item-content>
               </v-list-item>
            </v-list>
          <p></p>
        </div>
        
        <div class="upload">
  
          <div class="upload-btn text-center" @click="getPdf">
            <p>Save</p>
            <v-icon color="white">
              mdi-cloud-upload
            </v-icon>
          </div>
          <!-- <div class="upload-btn text-center" >
            <p>download</p>
            <v-icon color="white">
              mdi-cloud-download
            </v-icon>
          </div> -->
        </div>
        <div class="upload-mob" @click="getPdf">
          <p>save</p>
          <v-icon color="white" >
            mdi-cloud-upload
          </v-icon>
        </div>
      </div>
    </div>
    <div class="desno" v-if="browserOn">
      <div class="browser">
          <iframe v-if="this.website" width="100%" height="94%"  :src='this.website' frameborder="0"></iframe>
          <div class="input-div">
            <input class="input-web" type="text" placeholder="Website" v-model.lazy="website">   
          </div>
          
      </div>
    </div>
   
    
    
  </div>
</template>

<script>
import { TiptapVuetify, Heading, Bold, Italic, Underline, Code, BulletList, OrderedList, ListItem } from 'tiptap-vuetify'
// import jspdf from 'jspdf'
// import html2canvas from 'html2canvas'
// import axios from 'axios'
import {firebaseAuth, firebaseDb} from '../firebase/init'
// eslint-disable-next-line no-unused-vars
import firebase from 'firebase'
import {bus} from '../main'

export default {
  name: 'learn',
  components: {
    TiptapVuetify
  },
  data() {
    return {
      pokaziNote: false,
      odabranaNota: 'Select note',
      editor: null,
      website: null,
      extensions: [
         Bold,
      Underline,
      Italic,
      Code,
      ListItem,
      BulletList,
      OrderedList,
      [Heading, {
        options: {
          levels: [1, 2, 3]
        }
      }],
      ],
      content:null,
      pdfName:'',
      nameError: null,
      notes:[],
      browserOn: null,
      pokaziInput: true,
      pdfUrl: null
    }
  },
  methods: {
    // changeHtml(id,html) {
    //   for ( var i in this.notes) {
    //     if(this.notes[i].id = id) {
    //       this.notes[i].html = html
    //       break
    //     }
    //   }
    // },
    getPdf() {
     

      // this.notes.push({
      //   html: this.content,
      //   id: this.pdfName
      // })
      // eslint-disable-next-line no-console
      if (this.pdfName) {
        if(this.pdfName == this.odabranaNota) {
        // eslint-disable-next-line no-console
        console.log('jeej')
        var index = this.notes.findIndex(x => x.id===this.pdfName)
        // eslint-disable-next-line no-console
        console.log(index)
        this.notes[index].html = this.content

        // eslint-disable-next-line no-console
        console.log(this.notes)
      
        
        
      } else {
        this.notes.push({
          html: this.content,
          id: this.pdfName
        })
        
      }
      let user = firebaseAuth.currentUser;
          
         firebaseDb.collection('users').where('user_id','==',user.uid)
         .get().then(snapshot => {
             snapshot.forEach(doc => {
                 firebaseDb.collection('users').doc(doc.id).update({
                     pdf: this.notes
                 })
             })
         })
        this.nameError = null
      } else {
        this.nameError ='You must enter a name.'
      }
      // eslint-disable-next-line no-console
      // console.log(this.notes)
      
      



      //  let user = firebaseAuth.currentUser;
      //     // eslint-disable-next-line no-console
          
      //     if(this.pdfName) {
      //         firebaseDb.collection('users').where('user_id','==',user.uid)
      //           .get().then(snapshot => {
      //         snapshot.forEach((doc) => {
      //             // eslint-disable-next-line no-console
      //           //   console.log(doc.data())
      //             firebaseDb.collection('users').doc(doc.id).update({
      //                 pdf: firebase.firestore.FieldValue.arrayUnion({
      //                     html: this.content,
      //                     id: this.pdfName
      //                 })  
      //             })            
      //         })
      //     })
      //       this.nameError = null
      //       // eslint-disable-next-line no-console
      //       console.log(this.content)
      //     } else {
      //         this.nameError = 'You must enter a name'
      //     }
    
       
    },
    
    dajNotu(index) {
      this.content = this.notes[index].html
      this.pdfName = this.notes[index].id
      this.odabranaNota = this.notes[index].id
      this.pokaziNote = false
      this.pokaziInput = false
      this.nameError = null
      // eslint-disable-next-line no-console
      console.log(this.odabranaNota)
      // eslint-disable-next-line no-console
      
    },
    pokaziNotes() {
      this.pokaziNote =!this.pokaziNote
    },
    pokaziBrowser(browserOn) {
      this.browserOn = browserOn
      // eslint-disable-next-line no-console
      
    }
  },
  created() {
    let user = firebaseAuth.currentUser
      firebaseDb.collection('users').where('user_id','==',user.uid)
      .get().then(snapshot => {
          snapshot.forEach(doc => {
              firebaseDb.collection('users').doc(doc.id).get()
              .then(() => {
                  snapshot.forEach(doc => {
                      // eslint-disable-next-line no-console
                      
                      this.notes = doc.data().pdf
                      // eslint-disable-next-line no-console
                     
                  })
              })
          })
      })
  },
  mounted() {
    this.pokaziInput = true
    // eslint-disable-next-line no-console
    
    bus.$on('change', (browserOn) => {
      this.pokaziBrowser(browserOn)
    })

     let ref = firebaseDb.collection('users')
      ref.onSnapshot(snapshot => {
          snapshot.docChanges().forEach(() => {
            let user = firebaseAuth.currentUser
              firebaseDb.collection('users').where('user_id','==',user.uid)
              .get().then(snapshot => {
                  snapshot.forEach(doc => {
                      firebaseDb.collection('users').doc(doc.id).get()
                      .then(() => {
                          snapshot.forEach(doc => {
                              this.notes = doc.data().pdf
                              this.browserOn = doc.data().browser
                          })
                      })
                  })
              })
          })
      })
  },

}
</script>
<style scoped>
  .upload-mob {
    display:none
  }
  .name-error {
    color:#CA3E47;
    font-weight: bold;
    font-size:15px;
    position:absolute;
    top:75px;
    right:20px;
  }
  .input-pdf {
    background:#CA3E47;
    position:absolute;
    right:5%;
    top:0;
    height: 43px;
    width:25%;
    border-left:1px solid #282828;
    border-top:1px solid #282828
  }
  .input-pdf input {
    height: 100%;
    width:100%;
    color:white;
    padding-left:10px;
  }
  .input-pdf input::placeholder {
    color:#d3d3d3;
    font-style:italic;
  }
  .input-pdf input:focus {
    outline: none !important;
    border: none
  }
  .notes-select {
    position:absolute;
    right:5%;
    top:42px;
    height: 35px;
    width:25%;
  }
  .notes-lista {
    width:100%;
    height: 110%;
    padding:0;
    border-radius: 0;
    
  }
  .notes-lista-item {
    
    border-top:1px solid #282828;
    /* border-left:1px solid #282828; */
  }
  .notes-lista-cont {
    padding:0;
  }
  .notes-lista-cont:hover {
    cursor: pointer;
  }
  .notes-lista-cont p {
    margin-bottom:10px;
    color:#d3d3d3;
    font-style:italic;
  }
  .select-lista {
    width:100%;
    border-radius:0;
    padding:0;
    
    margin:0;
  }
  .select-lista p {
    margin:0;
    color:white;
    font-style:normal;
    text-align: center;
    font-size:15px;
  }
.tekst {
    float:left;
    height: 100%;
    width:95%;
    overflow:auto;
    color:white;
    /* border-right:1px solid #ca3e47; */
    color:red;
}
  .upload {
    position:relative;
    float:right;
    background:#CA3E47;
    width:5%;
    height: 100%;
    border-left: 1px solid #282828;
    border-top:1px solid #282828;
  }
  .upload-btn {
    border-bottom: 1px solid #282828;
    
    padding:0;
    height: 50%;
    width:100%;
    color:white;
   
  }
  .upload-btn:hover {
    cursor: pointer;
  }
  .upload-btn p {
    height: 70%;
    margin:0 25%;
    width:50%;
    padding-top:20px;
    writing-mode: vertical-rl;
    text-orientation: mixed;
  }
  .upload-btn i {
    height: 30%;
  }

  .input-div {
    height: 5%;
  }
  .input-web {
    height: 100%;
    width:50%;
    margin: 0 25%;
    color:white;
    padding:0 20px;
    border-bottom: 3px solid #CA3E47
  }
  .input-web:focus {
    outline: none !important;
    border-bottom: 3px solid #CA3E47
  }
  .input-web::placeholder {
    color:#d3d3d3
  }
  .learn {
    position:relative;
    height:100%;
  }
  .lijevo {
    /* position:absolute;
    top:0;
    left:0; */
    width:50%;
    height: 100%;
    float:left
  }
  .lijevoSve {
    height: 100%;
    width:100%;
    display:inline-flex;
  }
  
  .desno {
    /* position:absolute;
    top:0;
    right:0; */
    width:50%;
    height: 100%;
    float:right
  }
  .video {
    height: 65%;
    border-bottom:1px solid #282828;
  }
  .notes {
    position:relative;
    height: 35%;
  }
  .videoSve {
    width:50%;
    height: 100%;
  }
  .notesSve {
    width:50%;
    height: 100%;
  }
  .text-area {
    height: 100%;
    color:white;
  }
  .browser {
    height: 100%;
  }
  .tiptap-vuetify-editor__content {
    margin-top:42px;
  }
  .nez {
    background:#282828;
    border-left:1px solid #CA3E47;
    border-bottom: 1px solid #CA3E47

  }

  @media only screen and (max-width:1024px) {
    .desno {
      display:none;
    }
    .lijevo {
      width:100%;
    }
    .video {
      height: 55%;
    }
    .notes {
      height: 45%;
    }
    .lijevoSve {
      display:block;
      width:100%
    }
    .videoSve {
      height: 55%;
      width:100%;
    }
    .notesSve {
      width:100%;
      height: 45%;
    }
  }
  @media only screen and (max-width: 600px) {
    .video {
      height: 35%;
    }
    .notes {
      height: 65%;
    }
    .upload {
      display:none;
    }
    .input-pdf {
      width:30%;
      right:0;
      height: 38px;
    }
    .upload-mob {
      display: inline-block;
      position: absolute;
      right:0;
      top:38px;
      height: 36px;
      width:30%;
      background: #CA3E47;
      color:white;
      border-left:1px solid #282828;
      border-top:1px solid #282828;
    }
    .upload-mob p {
      margin:0;
      padding-left:5px;
      padding-top:5px;
      width:70%;
    }
    .upload-mob i {
      position:absolute;
      right:5px;
      top:4px;
    }
    .notes-select {
    position:absolute;
    right:0%;
    top:74px;
    
    width:30%;
  }
  .notes-lista-item {
    margin:0;
    padding:0 10px;
    height: 40px;
  }
  .notes-lista-cont {
    height: 40px;
  }
  .name-error {
    top:110px;
    right:0;
    text-align: right;
  }
  .notes-lista {
    height: 40px;
  }
  }

   /* @media (max-width: 600px) and (orientation: landscape) {
     .lijevo {
       display:inline-flex;

     }
     .video {
       width:50%;
     }
     .notes {
       width:50%
     }
  } */

</style>