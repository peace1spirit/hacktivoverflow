import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'
const myaxios = axios.create({
  baseURL: 'http://localhost:3000'
})

Vue.use(Vuex)
/* eslint-disable */
export default new Vuex.Store({
  state: {
    isLogin: false,
    iduser: '',
    token: localStorage.getItem('token'),
    allQuestions: '',
    allAnswers: '',
    editQ:'',
    editA:''
  },

  mutations: {
    STATUS_LOGIN (state, payload) {
      state.isLogin = payload.status
      state.iduser = payload.iduser
    },
    DATA_QUESTION(state, payload) {
      state.allQuestions = payload
    },
    DATA_ANSWER(state, payload) {
      state.allAnswers = payload
    },
    DELETEQ(state, payload) {
      state.allQuestions.splice(payload,1)
    },
    UPDATEQ_I(state, payload) {
      state.editQ=payload
    },
    SEARCHQ(state, payload) {
      state.allQuestions = payload
    },
    UPLIKEQ(state, payload) {
      state.allQuestions[payload].likes.push(state.iduser)
      let i_del=state.allQuestions[payload].unLikes.indexOf(state.iduser)
      console.log('hapus index unlike',i_del)
      if(i_del!==-1)
        state.allQuestions[payload].unLikes.splice(i_del,1)
    },
    UNLIKEQ(state, payload) {
      state.allQuestions[payload].unLikes.push(state.iduser)
      let i_del=state.allQuestions[payload].likes.indexOf(state.iduser)
      console.log('hapus index like',i_del)
      if(i_del!==-1)
        state.allQuestions[payload].likes.splice(i_del,1)
    },
    DELETEQ(state, payload) {
      state.allQuestions.splice(payload,1)
    },
    UPDATEQ_I(state, payload) {
      state.editQ=payload
    },
    SEARCHQ(state, payload) {
      state.allQuestions = payload
    },
    //---------------------------
    UPLIKEA(state, payload) {
      state.allAnswers[payload].likes.push(state.iduser)
      let i_del=state.allAnswers[payload].unLikes.indexOf(state.iduser)
      if(i_del!==-1)
        state.allAnswers[payload].unLikes.splice(i_del,1)
    },
    UNLIKEA(state, payload) {
      state.allAnswers[payload].unLikes.push(state.iduser)
      let i_del=state.allAnswers[payload].likes.indexOf(state.iduser)
      if(i_del!==-1)
        state.allAnswers[payload].likes.splice(i_del,1)
    },
    DELETEA(state, payload) {
      state.allAnswers.splice(payload,1)
    },
    UPDATEA_I(state, payload) {
      state.editA=payload
    },
    SEARCHA(state, payload) {
      state.allQuestions = payload
    },
  },

  actions: {
    setLogin ({ commit }, payload){
      console.log('setloginnn',payload)
      commit('STATUS_LOGIN', { status: true, iduser: payload.id })
    },
    checkToken ( context , payload) {
      let token =localStorage.getItem('token')
       if(token){
        myaxios.get(`/users/`, {
            headers: { token: token }
        })
        .then(({data}) => {
          console.log(data)
          context.commit('STATUS_LOGIN', { status: true, iduser: data.user.id })
        })
        .catch((err) => {
            console.log(err)
        });
      }
    },
    logout ({ commit }, payload) {
      localStorage.clear()
      commit('STATUS_LOGIN', { status: false, iduser: '' })
      router.push('/')
    },
    getAllQuestions({ commit }, payload){
      myaxios({
        url:  `/questions`,
        method: 'GET',
      })
      .then(({data}) => {
        commit('DATA_QUESTION', data.result)
      })
      .catch((err) => {
          console.log(err)
      });
    },
    getAnswersbyId({ commit }, payload){
      console.log('ini',payload)
      myaxios({
        url:  `/answers/byid`,
        method: 'POST',
        data:{
          questionId : payload
        }
      })
      .then(({data}) => {
        commit('DATA_ANSWER', data.result)
      })
      .catch((err) => {
          console.log(err)
      });
    },
    uplikeQlocal({ commit }, payload){
      commit('UPLIKEQ', payload)
    },
    unlikeQlocal({ commit }, payload){
      commit('UNLIKEQ', payload)
    },
    deleteQlocal({ commit }, payload){
      commit('DELETEQ', payload)
    },
    updateQindex({ commit }, payload){
      commit('UPDATEQ_I', payload)
    },
    searchQ({ commit }, payload){
      myaxios({
        url:  `/questions/search`,
        method: 'POST',
        data: {
          search: payload
        }
      })
      .then(({data}) => {
        commit('SEARCHQ', data.result)
      })
      .catch((err) => {
          console.log(err)
      });
    },
    ///-------------------------------
    uplikeAlocal({ commit }, payload){
      commit('UPLIKEA', payload)
    },
    unlikeAlocal({ commit }, payload){
      commit('UNLIKEA', payload)
    },
    deleteAlocal({ commit }, payload){
      commit('DELETEA', payload)
    },
    updateAindex({ commit }, payload){
      commit('UPDATEA_I', payload)
    },
    searchA({ commit }, payload){
      myaxios({
        url:  `/answers/search`,
        method: 'POST',
        data: {
          search: payload
        }
      })
      .then(({data}) => {
        commit('SEARCHA', data.result)
      })
      .catch((err) => {
          console.log(err)
      });
    },
  }
})
