<template>
  <div class="demo">
    <div class="todo">
      <div class="todo-tekst tekst">
        <h3>Add tasks.</h3>
        <p>Make a list of your tasks and keep track off them or make a list of what you want to learn.</p>
      </div>
      <div class="video-todo video">

      </div>
    </div>

    <div class="playlist">
      <div class="playlist-tekst tekst">
        <h3>Make playlists.</h3>
        <p>Create playlists for you to learn from. Mark them as watched and keep track of your progress. </p>
      </div>
      <div class="video-playlist video"></div>
    </div>

    <div class="playvideo">
      <div class="playvideo-tekst tekst">
        <h3>Watch videos.</h3>
        <p>Watch Youtube videos in learning mode, where everything is in one place</p>
      </div>
      <div class="video-playvideo video"></div>
    </div>

    <div class="notes">
      <div class="notes-tekst tekst">
        <h3>Take notes.</h3>
        <p>Write down most important stuff. Save notes when you are done and export them as PDF or continue taking notes later.</p>
      </div>
      <div class="video-notes video"></div>
    </div>

    <div class="try">
      <button @click="goReg">Sign up</button>
    </div>

  </div>
</template>

<script>



export default {
  name: 'demo',
  components: {
    
  },
  methods: {
    goReg() {
      this.$router.push('/register')
    }
  }
}
</script>
<style scoped>
button:focus {
  outline:none;
}
    .try {
      
      padding-top:70px;
      text-align: center;
    }
    .try button {
      text-align: center;
      background:#1f1f1f;
      color:#eee;
      font-weight: bold;
      padding:18px;
      border-radius: 10px;
    }

    .demo {
       background: linear-gradient(90deg, rgba(238,238,238,1) 60%, rgba(40,40,40,1) 60%);
        padding:100px 5% 100px 15%;
        
        
    }
    .tekst {
      height: 400px;
    }
    .video {
      height: 400px;
    }
    .todo {
      display:inline-flex;
      width:100%;
      
    }
    .todo-tekst {
      width:30%;
    }
    .video-todo {
      background-image: url('../assets/todogif.gif');
      width:70%;
      background-size:contain;
      background-position:center;
    }
    .playlist {
      width:100%;
      
      display:inline-flex;
      margin:100px 0 50px 0;
    }
    .playlist-tekst {
      width:30%;
    }
    .video-playlist {
      background-image: url('../assets/playlistgif.gif');
      width:70%;
      background-position: center;
      background-size:contain;
    }

    .playvideo {
      width:100%;
   
      display:inline-flex;
      margin:50px 0 100px 0;
    }
    .playvideo-tekst {
      width:30%;
    }
    .notes {
      width:100%;
      
      display:inline-flex;
    }
    .notes-tekst {
      width:30%;
    }

    .tekst p {
      text-align:left;
      padding-left:15%;
      padding-right:10%;
      font-style:italic;
      padding-top:5px;
    }
    .tekst h3 {
      text-align: left;
      font-family: 'Black Ops One', cursive;
      letter-spacing: 1px;
      padding-top:100px;
    }


    
    
    .video-notes {
      background-image: url('../assets/notes1gif.gif');
      width:70%;
      background-position: center;
      background-size: contain;
    }
    .video-playvideo {
      background-image: url('../assets/playvideogif.gif');
      width:70%;
      background-position: center;
      background-size: contain;
    }

     

     
     @media only screen and (max-width: 1024px) {
       .tekst {
         width:40%;
         height: 300px;
       }
       .video {
         width:60%;
         height: 300px;
       }
       .playlist {
         margin: 50px 0 25px 0;
       }
       .playvideo {
         margin:25px 0 50px 0;
       }
       .tekst h3 {
         padding-top:50px;
       }
       
     }
     @media only screen and (max-width: 768px) {
       .demo {
         background:#eee;
         padding:0;
         padding-bottom:50px;
       }
       .playlist, .playvideo, .todo, .notes {
         display:block;
       }
       .tekst {
         width:100%;
         height: 100%;
         padding-top:0;
         margin:0;
       }
       .tekst p {
         padding:0 30%;
        margin: 10px 0 30px 0;
       }
       .tekst h3 {
         padding-left:25%;
         padding-top:0;
       }
       .video {
         width:100%;
         padding:0 5%;
         height: 250px;
         
       }
       .playlist {
         margin: 40px 0 40px 0;
       }
       .playvideo {
         margin:0 0 40px 0;
       }
     }

     @media only screen and (max-width: 600px) {
       .tekst p {
         padding: 0 10% 0 20%;
         margin:0;
       }
       .tekst h3 {
         padding-left:10%;
       }
       .try {
         padding-top:40px;
       }
     }
    
</style>