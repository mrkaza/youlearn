<template>
  <div class="notes">
      <v-list-item class="naslov" @click="pokaziNotes">
            <v-list-item-icon class="mr-1">
                <v-icon>
                    mdi-note-text-outline
                </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <p>Notes</p>
            </v-list-item-content>
            <v-list-item-icon class="ml-1" v-if="otvoreno==false" >
                <v-icon>
                    mdi-menu-down
                </v-icon>
            </v-list-item-icon>
            <v-list-item-icon class="ml-1" v-if="otvoreno==true" >
                <v-icon>
                    mdi-menu-up
                </v-icon>
            </v-list-item-icon>
        </v-list-item>

    <v-list v-if="otvoreno" class="cijela-lista">
        <v-list-item class="nota" v-for="(note,index) in notes" :key="index">
           
            <v-list-item-icon class="ml-10 mr-1 mt-3">  
                    <v-tooltip top dark small>
                <template v-slot:activator="{ on }">           
                <a :href="note.url" target="_blank" v-on="on">  
                          
                        <v-icon color="#797979" @click="vidiPdf(index)">
                         mdi-cloud-download
                    </v-icon>
                      
                </a>   
                        </template>
            <span>Download PDF</span>
            </v-tooltip>  
            </v-list-item-icon>
                
            <v-list-item-content>
                <p>{{note.id}}</p>
            </v-list-item-content>
            <v-list-item-icon class="mr-10 ml-1 mt-3">
                <v-icon color="#CA3E47" @click="deleteNotes(index)">
                    mdi-delete
                </v-icon>
            </v-list-item-icon>
            
        </v-list-item>
        <p class="no-notes" v-if="notes.length == 0">You have no notes</p>
    </v-list>

    
  </div>
</template>

<script>
import {firebaseAuth, firebaseDb} from '../firebase/init'
import jspdf from 'jspdf'


export default {
  name: 'notes',
  components: {
    
  },
  data() {
      return {
          notes: [],
          otvoreno: false,
          pdfUrl: null
      }
  },
  methods: {
      vidiPdf(index) {
          // eslint-disable-next-line no-console
          console.log(this.notes[index].html)
          var doc = new jspdf('p','pt','letter');
        //    var source = this.notes[index].thml
         
         var margins = {
             top:60,
             bottom:60,
             left:40,
             width:522
         }
         doc.fromHTML(
             this.notes[index].html,
             margins.left,
             margins.top, {
                 'width': margins.width,
             }
         )
         doc.save(this.notes[index].id + '.pdf')

      },
      getNotes() {
          let user = firebaseAuth.currentUser
      firebaseDb.collection('users').where('user_id','==',user.uid)
      .get().then(snapshot => {
          snapshot.forEach(doc => {
              firebaseDb.collection('users').doc(doc.id).get()
              .then(() => {
                  snapshot.forEach(doc => {
                      // eslint-disable-next-line no-console
                      this.notes = doc.data().pdf
                  })
              })
          })
      })
      },
      deleteNotes(index) {
          this.notes.splice(index,1)

          let user = firebaseAuth.currentUser;
          
         firebaseDb.collection('users').where('user_id','==',user.uid)
         .get().then(snapshot => {
             snapshot.forEach(doc => {
                 firebaseDb.collection('users').doc(doc.id).update({
                     pdf: this.notes
                 })
             })
         })
      },
      pokaziNotes() {
          this.otvoreno =!this.otvoreno
      }
  },
  created() {
      this.getNotes()
  },
  mounted() {
       let ref = firebaseDb.collection('users')
      ref.onSnapshot(snapshot => {
          snapshot.docChanges().forEach(() => {
              this.getNotes()
          })
      })
  }
}
</script>

<style scoped>
    .naslov p{
        margin:0;
        text-align: center;
        font-weight: bold;
    }
    .cijela-lista {
        padding:0;
        
    }
    .nota p{
        margin:0;
        text-align: center;
        color:#d3d3d3
    }
    .nota {
        height: 30px;
        border-top: 0.5px dotted #5e5e5e;
    }
    .nota a {
        text-decoration: none;
    }
    .notes {
        border-bottom: 3px solid #5e5e5e
    }
    .no-notes {
        text-align: center;
        margin:0;
        color:#797979;
        padding-bottom:5px;
    }

</style>