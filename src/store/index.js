import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
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
    initialiseStore(state) {
      if (localStorage.getItem('store')) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('store')))
        );
        // Object.assign 기존의 state에 복제해줌
      }
      // json.parse 텍스트로 된 json파을 js로 변환하는것
    },
  },
  actions: {},
  modules: {},
});

store.subscribe((mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state));
  // 객체를 데이터로 전송할때 사용? - json 기본 텍스트로 바뀜
  // subscribe는 위의 모든 mutation을 다 수행한 후에 store에 저장 / 'store'라는 키로 저장
  // 새로고침하면 데이터가 다 날아갈까봐서 방지하려고
});

export default store;
