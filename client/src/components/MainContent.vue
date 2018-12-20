/* eslint-disable */
<template>
    <div class="col-lg-9">
        <div class="vue-wrapper">
            <div class="search-area">
                <h1>Questions</h1>
                <div class="input-wrapper">
                    <i class="fa fa-search"></i><input v-model="searchString" type="text" placeholder="Have a question? Search for questions with keywords"/>
                    <button @click="clearSearch">Clear</button>
                </div>
            </div>
            <div class="question" v-for="(question, index) in allQuestions" :key="index">
                <div class="question-and-answer">
                <h2>Q:{{ question.title }}</h2>
                <p> {{ question.description }}</p>
                <span class="atas" v-if="question.userId._id!==iduser">
                    <span class="mr-2"><a href="#" class="mr-1 atas" @click="uplike(question._id,index)"><font-awesome-icon icon="thumbs-up" /></a>{{ question.likes.length }}</span>
                    <span class="mr-2"><a href="#" class="mr-1 atas" @click="unlike(question._id,index)"><font-awesome-icon icon="thumbs-down" /></a>{{ question.unLikes.length }}</span>
                    <a href="#" class="mr-2 atas" @click="answer(question._id,index)"><font-awesome-icon icon="comments" /></a>
                </span>
                <span class="atas" v-if="question.userId._id===iduser">
                    <span class="mr-2"><a href="#" class="mr-1 bawah"><font-awesome-icon icon="thumbs-up" /></a> {{ question.likes.length }}</span>
                    <span class="mr-2"><a href="#" class="mr-1 bawah"><font-awesome-icon icon="thumbs-down" /></a>{{ question.unLikes.length }}</span>
                    <a href="#" class="mr-2 bawah" @click="editQ(question._id,index)" data-toggle="modal" data-target="#editQModal"><font-awesome-icon icon="edit" /></a>
                    <a href="#" class="mr-2 bawah" @click="deleteQ(question._id,index)"><font-awesome-icon icon="trash-alt" /></a>
                    <a href="#" class="mr-2 bawah" @click="answer(question._id,index)"><font-awesome-icon icon="comments" /></a>
                </span>
                </div>
            </div>
          </div>
    </div>
</template>

<script>
/* eslint-disable */
import { mapState, mapActions } from 'vuex';
export default {
    name:'maincontent',
    props:[],
    data(){
        return {
            searchString:''
        }
    },
    computed: {
        ...mapState(['allQuestions','iduser'])
    },
    methods:{
        ...mapActions(['getAllQuestions','uplikeQlocal','unlikeQlocal','deleteQlocal','updateQindex','searchQ','setAnswer']),
        clearSearch(){
            this.searchString= ''
        },
        answer(idQuestion){
            this.$router.push(`/detail/${idQuestion}`)
        },
        uplike(idQuestion,index){
            let token=localStorage.getItem('token')
            if(token){
                this.$server({
                    url:  `/questions/uplike`,
                    method: 'PUT',
                    data:{
                        id:idQuestion
                    },
                    headers: {
                        token: token 
                    }
                })
                .then(({data}) => {
                    //up like local
                    this.uplikeQlocal(index)
                })
                .catch((err) => {
                    console.log(err)
                });
            }
        },
        unlike(idQuestion,index){
            let token=localStorage.getItem('token')
            if(token){
                this.$server({
                    url:  `/questions/unlike`,
                    method: 'PUT',
                    data:{
                        id:idQuestion
                    },
                    headers: {
                        token: token 
                    }
                })
                .then(({data}) => {
                    //un like local
                    this.unlikeQlocal(index)
                })
                .catch((err) => {
                    console.log(err)
                });
            }
        },
        deleteQ(idQuestion,index){
            let token=localStorage.getItem('token')
            if(token){
                this.$server({
                    url:  `/questions`,
                    method: 'DELETE',
                    data:{
                        id:idQuestion
                    },
                    headers: {
                        token: token 
                    }
                })
                .then(({data}) => {
                    if(data.result!=null)
                        this.deleteQlocal(index)
                })
                .catch((err) => {
                    console.log(err)
                });
            }
        },
        editQ(idQuestion,index){
           this.updateQindex(index)
        },
        formatDate(d) {
          let datetime=new Date(d)
          let date = `${datetime.getDate()}/${datetime.getMonth() + 1}/${datetime.getFullYear()} ${datetime.getHours()}:${datetime.getMinutes()}:${datetime.getSeconds()} `
          return date
        },
        refreshQuestion(){
            this.getAllQuestions()    
        },
       

    },
    created() {
        this.getAllQuestions() 
    },
    watch:{
        searchString(){
          if(this.searchString.trim()=='')
            this.getAllQuestions()
          else
            this.searchQ(this.searchString)
        }
    }
}
</script>

<style scoped>
       @import url(https://fonts.googleapis.com/css?family=Open+Sans);
* {
  box-sizing: border-box;
  font-family: "Open Sans";
}

h1, h2, p {
  margin: 0 auto 5px auto;
  padding: 0;
}

.vue-wrapper {
  text-align: center;
}
.vue-wrapper {
  margin: 0 auto;
  width: 100%;
  max-width: 1024px;
  text-align: left;
}
.vue-wrapper .input-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 1em;
  width: calc(100% - 5.275em);
}
.vue-wrapper .input-wrapper input {
  width: 70%;
  padding: 0.5em;
  padding-left: 2em;
  border: 2px solid rgba(198, 198, 198, 0.9);
  font-size: 1em;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  border-radius: 4px;
}
.vue-wrapper .input-wrapper i {
  position: absolute;
  top: 50%;
  left: 0.75em;
  -webkit-transform: translateY(-50%);
          transform: translateY(-50%);
  color: rgba(198, 198, 198, 0.9);
}
.vue-wrapper button {
  position: relative;
  display: inline-block;
  margin-left: 0.5em;
  padding: 0.6em 1em;
  background: #fefefe;
  cursor: pointer;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  overflow: hidden;
  z-index: 1;
  transition: all 0.1s;
  font-size: 15px;
  font-weight: bold;
  border: 2px solid rgba(198, 198, 198, 0.9);
  border-radius: 4px;
  color: rgba(160, 160, 160, 0.9);
}
.vue-wrapper button:hover {
  color: white;
}
.vue-wrapper button:hover:after {
  background: rgba(198, 198, 198, 0.9);
  -webkit-transform: translate(0%);
          transform: translate(0%);
}
.vue-wrapper button:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-transform: translateX(-100%);
          transform: translateX(-100%);
  transition: all 0.1s;
  z-index: -1;
}
.vue-wrapper .question {
  margin: 0.75em auto;
  padding: 0.5em;
  background: rgba(198, 198, 198, 0.1);
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.25);
  transition: all 0.1s, border 0.25s ease-out;
}
.vue-wrapper .question[data-color="gray"] {
  border-left: 4px solid rgba(198, 198, 198, 0.9);
}
.vue-wrapper .question[data-color="yellow"] {
  border-left: 4px solid #ffba00;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
}
.vue-wrapper .question[data-color="green"] {
  border-left: 4px solid #7ad03a;
  box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.25);
}
.vue-wrapper .question[data-color="red"] {
  border-left: 4px solid #ea0000;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.15);
}
.vue-wrapper .question .votes {
  display: inline-block;
  vertical-align: middle;
  margin: 0 0.5em 0 0;
}
.vue-wrapper .question .votes .upvote {
  position: relative;
  padding: 1em;
  cursor: pointer;
}
.vue-wrapper .question .votes .upvote:after {
  content: "";
  width: 0;
  height: 0;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  text-align: center;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: 7px solid rgba(0, 0, 0, 0.75);
}
.vue-wrapper .question .votes .number-of-votes {
  margin: 0 auto;
  text-align: center;
  font-size: 1.25em;
}
.vue-wrapper .question .votes .downvote {
  position: relative;
  padding: 1em;
  cursor: pointer;
}
.vue-wrapper .question .votes .downvote:after {
  content: "";
  width: 0;
  height: 0;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  text-align: center;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-top: 7px solid rgba(0, 0, 0, 0.75);
}
.vue-wrapper .question .question-and-answer {
  display: inline-block;
  vertical-align: top;
  width: calc(100% - 5em);
}
</style>
