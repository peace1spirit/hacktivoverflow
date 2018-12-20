<template>
  <div class="home">
    <div class="container">
      <!-- <button type="button" @click="hh">cobaa {{ $route.params.id!=undefined }}</button> -->
      <div class="row" style="margin:20px auto">
        <leftside ></leftside>
        <maincontent v-if="$route.params.id==null"></maincontent>
        <maindetail v-if="$route.params.id!=undefined"></maindetail>
        <editquestion></editquestion>
        <addanswer></addanswer>
        <editanswer></editanswer>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState, mapActions } from 'vuex';
import leftside from '@/components/LeftSide.vue'
import maincontent from '@/components/MainContent.vue'
import maindetail from '@/components/MainDetail.vue'
import editquestion from '@/components/EditQuestion.vue'
import addanswer from '@/components/AddAnswer.vue'
import editanswer from '@/components/EditAnswer.vue'

export default {
  props:['dataArticle','iduser','id'],
  name: 'home',
  data() {
    return {
      searchtxt:'',
      idTask:'',
      detailId: ''
    }
  },
  computed: {
    ...mapState(['isLogin'])
  },
  components: {
    leftside,
    maincontent,
    maindetail,
    editquestion,
    addanswer,
    editanswer

  },
  methods: {
      hh(){
        console.log(this.$route.params.id)
      },
      refreshContent(){
        this.$refs.childcontent.refreshArticle();
      },
      searchtitle(data){
        //console.log('parent',data)
        this.searchtxt=data
      },
      edittask(data){
        //console.log('parent editid',data)
        this.idTask=data
      },
      detailarticle(data){
        this.detailId=data
      }
  } 
}
</script>
