<template>
  <div class="verify">
      <h3>We've send you an email to your adress. Please click the link to verify your email.</h3>
      <div class="no-mail">
          <p>No email?</p>
          <button>Send again</button>
      </div>
      
  </div>
</template>

<script>
// import {firebaseAuth} from '../firebase/init'

export default {
    
  name: 'home',
  components: {
  
  },
  data() {
      return {
          verified: null
      }
  },
  methods: {
     
  },
  created() {
    // eslint-disable-next-line no-console
    console.log(this.$router)
  }
}
</script>
<style scoped>
  .verify {
      margin:15px 20%;
      text-align: center;
      color:#eee;
      background:#1f1f1f;
      padding:3% 10%;
      box-shadow:inset -2px -2px 6px 0 rgba(255,255,255,0.2),
     inset 2px 2px 6px 0 rgba(0,0,0,1); 
     border-radius: 10px;
  }
  .no-mail {
      position:relative;
      width:100%;
      padding-top:30px;
      display:inline-flex;
      color:#CA3E47;
      font-weight: bold;
  }
  .no-mail button {
      position:absolute;
      right:20%;
      bottom:0;
      
  }
  .no-mail p {
      margin:0;
      padding-left:20%;
  }
</style>