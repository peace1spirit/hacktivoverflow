/* eslint-disable */
<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Hacktive Overflow</a>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <router-link to="/" class="nav-link" href="#">Home
                            <span class="sr-only">(current)</span>
                        </router-link>
                    </li>
                </ul>
                <div class="form-inline my-2 my-lg-0">
                    <span v-if="isLogin" class="login" >
                        <button  class="btn btn-outline-primary mr-2 addtask" data-toggle="modal" data-target="#addQModal" type="button">Add Question</button>
                        <router-link to="/profile" type="button" class="btn btn-outline-primary mr-2 circle"> <i class="fas fa-user-circle" style="font-size:20px"></i></router-link>
                        <button class="btn btn-outline-primary logout" type="button" @click="doLogout">Logout</button>
                    </span>
                    <div v-if="!isLogin" class="notlogin">
                        <button id="signingoogle"></button>
                        <button class="btn btn-outline-primary mr-2 login" data-toggle="modal" data-target="#loginModal" type="button">Login</button>
                        <button class="btn btn-outline-primary mr-2 register" data-toggle="modal" data-target="#registerModal" type="button">Register</button>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
/* eslint-disable */
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Navbar',
  props: [],
  data () {
    return {
    }
  },
  methods: {
    ...mapActions(['logout', 'checkToken','setLogin']),
    doLogout(){
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            this.logout();
        })
        .catch(err=>{
            this.logout();
        })
    },
    renderGoogle() {
        //console.log('masuk google');
        gapi.signin2.render('signingoogle', {
            'scope': 'profile email',
            'width': 170,
            'height': 30,
            'longtitle': true,
            'theme': 'dark',
            'onsuccess': this.onSignIn,
            'onfailure': this.onFailure
        });
    },
    onSignIn(googleUser) {
        if (this.isLogin==true)//hanya cek 1 aja
            return
        var id_token = googleUser.getAuthResponse().id_token;
        this.$server({
            url:"users/google",
            method :"POST",
            headers: {
                googletoken:id_token
            }
        })
        .then(({data}) => { 
            localStorage.setItem('token', data.token)
            this.setLogin(data.user)      
        })
        .catch(function(err){
            console.log(err)
        })
    }
  },
  computed: {
    ...mapState(['isLogin'])
  },
  mounted() {  
    if(this.isLogin===false)
        this.renderGoogle()
  }, 
  created() {
      
    //this.checkToken()
    //console.log('navbar',this)
  }
}
</script>

