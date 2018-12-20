<template>
    <div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Register</h5>
                    <button type="button" class="close" data-dismiss="modal">
                    <span>&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div v-if="regAlert" class="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Register fail, email already exist</strong>
                        <button type="button" class="close" > <span aria-hidden="true">&times;</span></button>
                    </div>
                    <form>
                        <div class="form-group">
                            <label>Name </label>
                            <input v-model="regInputName" type="text" class="form-control" id="regInputName" placeholder="Enter Name">
                            <small style="color: red">{{ MsgNameReg }}</small>
                        </div>
                        <div class="form-group">
                            <label>Email address</label>
                            <input v-model="regInputEmail" type="email" class="form-control" id="regInputEmail"  placeholder="Enter email">
                            <small style="color: red">{{ MsgEmailReg }}</small>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input v-model="regInputPassword" type="password" class="form-control" id="regInputPassword" placeholder="Password">
                            <small style="color: red">{{ MsgPasswordReg }}</small>
                        </div>
                        <button type="button" class="btn btn-primary" v-on:click="doRegister" default>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name:'registermodal',
    props: ['isLogin'],
    data() {
        return {
            regAlert: false,
            regInputName: '',
            regInputEmail: '',
            regInputPassword: '',
            MsgNameReg: '',
            MsgEmailReg: '',
            MsgPasswordReg: ''
        }
    },
    methods: {
        doRegister() {
            this.$server.post(`/users/register`, {
                name: this.regInputName,
                email: this.regInputEmail,
                password: this.regInputPassword
            })
            .then(({data}) => {
                $('#registerModal').modal('hide');
            }).catch((err) => {
                this.regAlert= true;
                console.log(err)
            });
        },
        closeAlert(){
          this.regAlert = false;
        }
    }
}
</script>
