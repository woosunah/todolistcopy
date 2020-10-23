import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [
      {
        id: 0,
        complete: false,
        title: 'sample',
      },
    ],
  },
  mutations: {
    addTask(state, payload) {
      state.todos.push(payload);
    },
    editTask(state, payload) {
      let targetTask = state.todos.find((el) => el.id === payload.id);
      // targetTask.complete = payload.complete;
      // targetTask.title = payload.title;
      Object.assign(targetTask, payload);
      // Object는 타입 메서드 대문자로 입력.덮어씌우는 함수 assign
    },
    deleteTask(state, payload) {
      let targetTask = state.todos.find((el) => el.id === payload.id);
      let deleteIndex = state.todos.indexOf(targetTask);
      state.todos.splice(deleteIndex, 1);
    },
  },
  actions: {},
  modules: {},
});
