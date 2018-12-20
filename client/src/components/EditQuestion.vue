<template>
    <div class="modal fade" id="editQModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit Question</h5>
                    <button type="button" class="close" data-dismiss="modal">
                    <span>&times;</span>
                    </button>
                </div>
                <div class="modal-body" v-if="editQ!==''">
                    <form>
                        <div class="form-group">
                            <label>Title Question </label>
                            <input v-model="allQuestions[editQ].title" type="text" class="form-control" placeholder="Enter Title">
                            <small style="color: red">{{ MsgTitleQ }}</small>
                        </div>
                        <div class="form-group">
                            <label>Description </label>
                            <input v-model="allQuestions[editQ].description" type="text" class="form-control" placeholder="Enter Description">
                            <small style="color: red">{{ MsgDescQ }}</small>
                        </div>
                        <div class="form-group">
                            <label>Tags </label>
                            <div class="tag-container">
                                <span class="chip" v-for="(tag, index2) in allQuestions[editQ].tags" :key="index2">{{ tag }}
                                    <a href="#" class="btn btn-clear" role="button" @click="delete_tag(index2)">x</a>
                                </span>
                                <input class="input-form" type="text" placeholder="Add a tag" v-model="input_value" @keyup.enter="add_tag">
                            </div>
                            <small style="color: red">{{ MsgTaqQ }}</small>
                        </div>
                        <button type="button" class="btn btn-primary" v-on:click="doEditQ" default>Submit</button>
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
    name:'editQuestion',
    props:[],
    data(){
        return {
            MsgTitleQ: '',
            MsgDescQ: '',
            MsgTaqQ: '',
            input_value:''
        }
    },
    computed: {
        ...mapState(['allQuestions','editQ'])
    },
    methods:{
        ...mapActions(['getAllQuestions']),
        clearTask(){
            this.MsgTitleQ= ''
            this.MsgDescQ= ''
            this.MsgTaqQ= ''
        },
        add_tag() {
          if (this.input_value !== '') {
            this.allQuestions[this.editQ].tags.push(this.input_value);
            this.input_value = '';
          }
        },
        delete_tag (i) {
          this.allQuestions[this.editQ].tags.splice(i, 1);
        },
        doEditQ(){
            let token = localStorage.getItem('token')
            this.$server({
                url:  `/questions`,
                method: 'PUT',
                data:{
                    id : this.allQuestions[this.editQ]._id,
                    title: this.allQuestions[this.editQ].title,
                    description: this.allQuestions[this.editQ].description,
                    tags: this.allQuestions[this.editQ].tags
                },
                headers: {
                    token: token,
                }
            })
            .then(({data}) => {    
                //getAllQuestion
                this.getAllQuestions()
                this.clearTask()
                $('#editQModal').modal('hide');
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