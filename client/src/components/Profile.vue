<template>
  <div class="content" v-if="user!=null" style="width:250px; margin: 0 auto">
    <div v-if="editAlert" class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Register fail, email already exist</strong>
        <button type="button" class="close" > <span aria-hidden="true">&times;</span></button>
    </div>
        <div class="form-group">
        <label>Name </label>
        <input v-model="user.name" type="text" class="form-control" placeholder="Enter  Name">
        <small style="color: red">{{ MsgFirstNameReg }}</small>
    </div>
    <div class="form-group">
        <label>Email address</label>
        <input v-model="user.email" type="email" class="form-control" placeholder="Enter email">
        <small style="color: red">{{ MsgEmailReg }}</small>
    </div>
    <div class="form-group">
        <label>Password</label>
        <input v-model="newpassword" type="password" class="form-control"  placeholder="Password">
        <small style="color: red">{{ MsgPasswordReg }}</small>
    </div>
    <button type="button" class="btn btn-primary" v-on:click="doUpdateUser" default>Submit</button>
  </div>
</template>

<script>
/* eslint-disable */
export default {
    name:'profile',
    props:['changeStatusLogin','isLogin'],
    data() {
        return {
            editAlert: false,
            user: null,
            newpassword:'' ,
            MsgFirstNameReg: '',
            MsgEmailReg: '',
            MsgPasswordReg: ''
        }
    },
    methods: {
        doUpdateUser() {
            let token=localStorage.getItem('token')
            this.$server.put(`/users`, {
                name: this.user.name,
                email: this.user.email,
                password: this.newpassword
            },
            {
                headers: { token: token }
            })
            .then(({data}) => {
                console.log(data)
            }).catch((err) => {
                this.editAlert= true;
                console.log(err)
            });
        },
        closeAlert(){
          this.editAlert = false;
        }
    },
    created() {
        let token=localStorage.getItem('token')
        if(token){
            this.$server.get(`/users`, {
                headers: { token: token }
            })
            .then(({data}) => {
                this.user=data.user
            }).catch((err) => {
                this.editAlert= true;
                console.log(err)
            });
        }
    }
}
</script>
