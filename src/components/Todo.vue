
<template>
  <div class="todo-input">
      <v-list-item class="mx-auto"  @click="pokaziTodo">
              <v-list-item-icon class="mr-1">
                  <v-icon>
                      mdi-format-list-checks
                  </v-icon>
              </v-list-item-icon>
              <v-list-item-content class="mx-auto">
                  <p class="naslov">Todos</p>
              </v-list-item-content>
              <v-list-item-icon class="ml-1" v-if="pokazi == false">
                  <v-icon >
                      mdi-menu-down
                  </v-icon>
              </v-list-item-icon>
              <v-list-item-icon class="ml-1" v-if="pokazi == true">
                  <v-icon >
                      mdi-menu-up
                  </v-icon>
              </v-list-item-icon>
          </v-list-item>
         
     
      <v-list class="cijela-lista" v-if="this.pokazi">
          
               <div class="input-icon">
                    <input class="addtodo" type="text" v-model="noviTodo" placeholder="Add Todo" @keyup.enter="dodajTodo">
                    <v-icon color="#797979" @click="dodajTodo">mdi-plus-circle</v-icon>
               </div>
               <p class="todo-error" v-if="todoError">{{todoError}}</p>
          
          
          <v-list-item  class="item-lista" v-for="(todo,index) in todos" :key="index">  
              <v-list-item-icon class="ikonice mr-2">
                  <v-icon color="green" class="" @click="zavrsiTodo(index)">
                      mdi-check-bold
                  </v-icon>
              </v-list-item-icon>
              <v-list-item-content color="#d3d3d3">
                  <p class="item-kontent" :class="{zavrsen : todo.gotovo}">{{todo.zadatak}}</p>
              </v-list-item-content>
              <v-list-item-icon class="ikonice ml-2">
                  <v-icon color="#CA3E47" class="" @click="obrisiTodo(index)">
                      mdi-delete
                  </v-icon>
              </v-list-item-icon>
          </v-list-item>
        
          <p class="no-tasks" v-if="todos.length == 0">You have no tasks.</p>
      </v-list>
  </div>
</template>

<script>
import {firebaseAuth, firebaseDb} from '../firebase/init'
import firebase from 'firebase'


export default {
  name: 'todo',
  components: {
    
  },
  data() {
      return {
          pokazi: false,
          todoError: null,
          noviTodo:null,
          todos: []
      }
  },
  methods: {
      pokaziTodo() {
          this.pokazi =!this.pokazi
      },
      dohvatiTodo() {
           let user = firebaseAuth.currentUser
            firebaseDb.collection('users').where('user_id','==',user.uid).get().then(snapshot => {
            snapshot.forEach((doc) => {
             firebaseDb.collection('users').doc(doc.id).get()
            .then(() => {
            snapshot.forEach(doc => {
                this.todos = doc.data().todos
                // eslint-disable-next-line no-console
             
                 })
              })
            })
        })
        this.noviTodo= null
        this.todoError = null
    // eslint-disable-next-line no-console
       
      },
      dodajTodo() {
         let user = firebaseAuth.currentUser;
          // eslint-disable-next-line no-console
          
          if(this.noviTodo) {
              firebaseDb.collection('users').where('user_id','==',user.uid)
                .get().then(snapshot => {
              snapshot.forEach((doc) => {
                  // eslint-disable-next-line no-console
                //   console.log(doc.data())
                  firebaseDb.collection('users').doc(doc.id).update({
                      todos: firebase.firestore.FieldValue.arrayUnion({
                          zadatak: this.noviTodo,
                          gotovo: false
                      })  
                  }).then(this.dohvatiTodo())            
              })
          })
            // this.todoError = null
          } else {
              this.todoError = 'You must enter todo.'
          }
          
              
      },
     
      obrisiTodo(index) {
          this.todos.splice(index,1)

          let user = firebaseAuth.currentUser;
          
         firebaseDb.collection('users').where('user_id','==',user.uid)
         .get().then(snapshot => {
             snapshot.forEach(doc => {
                 firebaseDb.collection('users').doc(doc.id).update({
                     todos: this.todos
                 })
             })
         })
      },
      zavrsiTodo(index) {
          this.todos[index].gotovo =!this.todos[index].gotovo

          let user = firebaseAuth.currentUser
          firebaseDb.collection('users').where('user_id','==',user.uid)
          .get().then(snapshot => {
              snapshot.forEach(doc => {
                  firebaseDb.collection('users').doc(doc.id).update({
                      todos: this.todos
                  })
              })
          })
      }
      
     
  },
    mounted() {
        this.dohvatiTodo()
    }
}
</script>

<style scoped>
.input-icon {
    margin:8px 10px;
    padding:5px 0;
     box-shadow:inset -2px -2px 6px 0 rgba(255,255,255,0.1),
     inset 2px 2px 6px 0 rgba(0,0,0,1); 
    border-radius: 5px;
    background:#282828;
}
.input-icon i {
    padding-right:10px;
    width:10%;
}
    .naslov {
        text-align: center;
        margin:0;
        font-weight: bold;
    }
    .zavrsen {
        color:#5e5e5e;
        text-decoration: line-through
    }
    .no-tasks {
        text-align: center;
        margin:0;
        color:#797979;
        padding-bottom:5px;
    }
    .item-lista {
        height: 30px;
        border-top: 0.5px dotted #5e5e5e
    }
    .ikonice {
        padding:12px 0;
        margin:0;
    }
    .todo-input {
        border-bottom: 3px solid #5e5e5e;  
    }

    .addtodo {
        color:white;
        width: 90%;
        height: 40px;
        padding-left:15px;
        
    }
    .addtodo:focus {
        outline: none !important;
        border:none;
    }
    .cijela-lista {
        border-top: 0.5px dotted #5e5e5e;
        padding:0;
    }
    .todo-error {
        text-align: center;
        color:#CA3E47;
        font-size: 15px;
        font-weight: bold;
    }
    .item-kontent {
        
        margin:0;
    }
</style>