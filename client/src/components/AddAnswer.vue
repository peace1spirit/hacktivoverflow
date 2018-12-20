<template>
    <div class="modal fade" id="addAModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add Question</h5>
                    <button type="button" class="close" data-dismiss="modal">
                    <span>&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label>Answer </label>
                            <input v-model="AInput" type="text" class="form-control" placeholder="Enter Title">
                            <small style="color: red">{{ MsgTitleQ }}</small>
                        </div>
                        <button type="button" class="btn btn-primary" v-on:click="doAddA" default>Submit</button>
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
    name:'addanswer',
    data(){
        return {
            AInput: '',
            MsgTitleQ: ''
        }
    },
    methods:{
        ...mapActions(['getAnswersbyId']),
        clearTask(){
            this.AInput= ''
            this.MsgTitleQ= ''
        },
        add_tag() {
          if (this.input_value !== '') {
            this.Tags.push(this.input_value);
            this.input_value = '';
          }
        },
        delete_tag (i) {
          this.Tags.splice(i, 1);
        },
        doAddA(){
            let token = localStorage.getItem('token')
            this.$server({
                url:  `/answers`,
                method: 'POST',
                data:{
                    answer: this.AInput,
                    questionId: this.$route.params.id
                },
                headers: {
                    token: token,
                }
            })
            .then(({data}) => {    
                //getAllQuestion
                this.getAnswersbyId(this.$route.params.id) 
                this.clearTask()
                $('#addAModal').modal('hide');
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
