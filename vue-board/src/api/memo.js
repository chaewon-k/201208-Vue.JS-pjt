import { createInstance } from "./index.js";

const instance = createInstance();
// const config = {
//   headers: { "access-token": localStorage.getItem("access-token") }
// };

function registerMemo(memo, success, fail) {
  instance
    .post(`memo`, JSON.stringify(memo))
    .then(success)
    .catch(fail);
}

function listMemo(articleno, success, fail) {
  instance
    .get(`memo/${articleno}`)
    .then(success)
    .catch(fail);
}

function deleteMemo(articleno, memono, success, fail) {
  instance
    .delete(`memo/${articleno}/${memono}`)
    .then(success)
    .catch(fail);
}

function updateMemo(memo, success, fail) {
  instance
    .put(`memo`, JSON.stringify(memo))
    .then(success)
    .catch(fail);
}

export { registerMemo, listMemo, deleteMemo, updateMemo };