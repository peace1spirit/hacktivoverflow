<template>
    <div class="modal fade" id="addQModal" tabindex="-1" role="dialog" aria-hidden="true">
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
                            <label>Title Question </label>
                            <input v-model="QInputTitle" type="text" class="form-control" placeholder="Enter Title">
                            <small style="color: red">{{ MsgTitleQ }}</small>
                        </div>
                        <div class="form-group">
                            <label>Description </label>
                            <input v-model="QInputDescription" type="text" class="form-control" placeholder="Enter Description">
                            <small style="color: red">{{ MsgDescQ }}</small>
                        </div>
                        <div class="form-group">
                            <label>Tags </label>
                            <div class="tag-container">
                                <span class="chip" v-for="(tag, index2) in Tags" :key="index2">{{ tag }}
                                    <a href="#" class="btn btn-clear" role="button" @click="delete_tag(index2)">x</a>
                                </span>
                                <input class="input-form" type="text" placeholder="Add a new tag" v-model="input_value" @keyup.enter="add_tag">
                            </div>
                            <small style="color: red">{{ MsgTaqQ }}</small>
                        </div>
                        <button type="button" class="btn btn-primary" v-on:click="doAddQ" default>Submit</button>
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
    name:'addtask',
    data(){
        return {
            QInputTitle: '',
            QInputDescription: '',
            QInputTag: '',
            MsgTitleQ: '',
            MsgDescQ: '',
            MsgTaqQ: '',
            input_value: '',
            Tags:[]
        }
    },
    methods:{
        ...mapActions(['getAllQuestions']),
        clearTask(){
            this.QInputTitle= ''
            this.QInputDescription= ''
            this.QInputTag= ''
            this.MsgTitleQ= ''
            this.MsgDescQ= ''
            this.MsgTaqQ= '',
            this.input_value= '',
            this.Tags.length= 0
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
        doAddQ(){
            let token = localStorage.getItem('token')
            this.$server({
                url:  `/questions`,
                method: 'POST',
                data:{
                    title: this.QInputTitle,
                    description: this.QInputDescription,
                    tags:this.Tags
                },
                headers: {
                    token: token,
                }
            })
            .then(({data}) => {    
                //getAllQuestion
                this.getAllQuestions()
                this.clearTask()
                $('#addQModal').modal('hide');
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
