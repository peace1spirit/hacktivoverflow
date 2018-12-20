<template>
    <div class="modal fade" id="editAModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit Answer</h5>
                    <button type="button" class="close" data-dismiss="modal">
                    <span>&times;</span>
                    </button>
                </div>
                <div class="modal-body" v-if="editA!==''">
                    <form>
                        <div class="form-group">
                            <label>Answer </label>
                            <input v-model="allAnswers[editA].answer" type="text" class="form-control" placeholder="Enter Answer">
                            <small style="color: red">{{ MsgTitleQ }}</small>
                        </div>
                        <button type="button" class="btn btn-primary" v-on:click="doEditA" default>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import { mapState, mapActions } from 'vuex'
export default {
    name:'editAnswer',
    props:[],
    data(){
        return {
            MsgTitleQ: ''
        }
    },
    computed: {
        ...mapState(['allAnswers','editA'])
    },
    methods:{
        ...mapActions(['getAnswersbyId']),
        clearTask(){
            this.MsgTitleQ= ''

        },
        doEditA(){
            let token = localStorage.getItem('token')
            this.$server({
                url:  `/answers`,
                method: 'PUT',
                data:{
                    id : this.allAnswers[this.editA]._id,
                    answer: this.allAnswers[this.editA].answer
                },
                headers: {
                    token: token,
                }
            })
            .then(({data}) => {    
                //getAllQuestion
                this.getAnswersbyId(this.$route.params.id)
                this.clearTask()
                $('#editAModal').modal('hide');
            })
            .catch((err) => {
                console.log(err)
            });
        }
    }
}
</script>
<style scoped>
.tag-container {
    border-bottom: solid 1px;
    padding: 10px;
}

.tag-container .input-form {
    border: none;
}
</style>