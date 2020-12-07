<template>
  <div>
    <template v-if="!isUpdate">
      <b-row class="mb-1">
        <b-col>
          <b-card border-variant="info" class="mb-2" no-body>
            <template>
              <b-row class="m-1">
                <b-col class="text-left ml-3"
                  ><strong>작성자 {{ memo.userid }}</strong> {{ memo.memotime}}
                </b-col>
                <b-col class="text-right mr-3">
                  <b-button @click="modifyMemo" variant="link">수정</b-button>
                  <b-button @click="deleteMemo" variant="link">삭제</b-button>
                </b-col>
              </b-row>
            </template>
            <b-card-body class="text-left">
              <div>
                {{ memo.comment }}
              </div>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </template>
    <template v-else>
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
          @click="updateMemo"
          variant="dark">댓글수정</b-button></b-col>
      </b-row>
    </template>
  </div>
</template>

<script>
import { deleteMemo, updateMemo } from "@/api/memo.js";
export default {
  name: "memorow",
  data: function () {
    return {
      isUpdate: false,
      form: {
        memono: 0,
        articleno: 0,
        userid: "",
        comment: "",
      },
    }
  },
  props: {
    memo: {
      type: Object,
    },
  },
  methods: {
    modifyMemo() {
      this.isUpdate = true
      this.form.comment = this.memo.comment
    },
    updateMemo() {
      event.preventDefault();
      this.form.memono = this.memo.memono
      this.form.articleno = this.memo.articleno
      this.form.userid = this.memo.userid;
      updateMemo(
        this.form,
        response => {
          console.log(response);
          this.isUpdate = !this.isUpdate
          this.$emit('update-memo', response.data)
          // this.$router.push({ name: "board-list" })
        },
        error => {
          console.log(error)
        }
      )
    },
    deleteMemo() {
      console.log(this.memo.memono + "댓글삭제!!");
      if(confirm("정말 삭제?")) {
        deleteMemo(
          this.memo.articleno, this.memo.memono,
          response => {
            console.log(response)
            this.$emit('delete-memo', response.data)
            // this.$router.push({ name: "board-list" })
          },
          error => {
            console.log(error)
          }
        )
      }
    },
  },
};
</script>

<style></style>