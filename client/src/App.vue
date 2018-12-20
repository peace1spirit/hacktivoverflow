<template>
  <div id="app">
      <navbar></navbar>
      <addQModal></addQModal>
      <loginmodal></loginmodal>
      <registermodal></registermodal>
      <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import navbar from '@/components/Navbar.vue'
import addQModal from '@/components/AddQuestion.vue'
import loginmodal from '@/components/LoginModal.vue'
import registermodal from '@/components/RegisterModal.vue'

/* eslint-disable */
import { mapState, mapActions } from 'vuex';

export default {
  name: 'appvue',
  data () {
    return {
      iduser:'',
      dataArticle:''
    }
  },
  methods:{
    ...mapActions(['logout', 'checkToken']),

    changetoLogout(){
      this.logout()
    },
    addArticle(data){
      //console.log('---data-----',data)
      //this.dataArticle=data 
      //console.log('-----this article---', this.dataArticle)
    }
  }, 
  components: {
    navbar,
    loginmodal,
    registermodal,
    addQModal
  },
  computed: {
    ...mapState(['isLogin'])
  },
  created() {
    this.checkToken()
    console.log('kkkkkkkkkk',this.isLogin); 
  },
  watch:{
    isLogin(){
      console.log('watch',this.isLogin); 
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
