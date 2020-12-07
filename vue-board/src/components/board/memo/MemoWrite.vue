<template>
  <b-row class="mb-3 mt-2"> 
    <b-col cols="11">
      <b-form-textarea
        id="content"
        v-model="form.comment"
        placeholder="댓글 입력..."
        rows="2"
      ></b-form-textarea>
    </b-col>
    <b-col><b-button 
      @click="memoSubmit"
      variant="dark">댓글등록</b-button></b-col>
  </b-row>
</template>

<script>
import { mapState } from 'vuex';
import { registerMemo } from '@/api/memo.js'

export default {
  name: "memowrite",
  data: function () {
    return {
      form: {
        userid: "",
        comment: "",
        articleno: 0,
      }
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  props:{
    articleId: Number,
  },
  methods: {
    memoSubmit(event) {
      event.preventDefault();
      this.form.userid = this.userInfo.userid
      this.form.articleno = this.articleId
      // console.log(this.form.articleno)
      registerMemo(
        this.form,
        (response) => {
          console.log(response)
          this.$emit('update-memo', response.data)
          // this.$router.push({ name:"board-list" })
        },
        (error) => {
          console.log(error)
        }
      )
      this.form.userid = ""
      this.form.comment = ""
    },
  }
};
</script>
<style></style>