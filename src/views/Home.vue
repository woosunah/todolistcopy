<template>
  <v-row class="home" justify="center">
    <div class="home-container">
      <h1>todos</h1>
      <v-card elevation="10">
        <v-text-field
          placeholder="What needs to be done?"
          prepend-inner-icon="mdi-chevron-down"
          solo
          flat
          height="80"
          class="todo-text-filed"
          v-model="newTitle"
          @keyup.enter="addTask"
        >
        </v-text-field>
        <div class="todo-list">
          <v-row
            align="center"
            class="list-item"
            v-for="(todo, i) in todos"
            :key="i"
          >
            <div class="circle">
              <v-btn icon large color="green"><v-icon>mdi-check</v-icon></v-btn>
            </div>
            <p>{{ todo.title }}</p>
            <v-spacer></v-spacer>
            <v-btn icon large><v-icon>mdi-close</v-icon></v-btn>
          </v-row>
        </div>
        <v-divider></v-divider>
        <v-row
          class="todo-footer-extention"
          justify="center"
          align="center"
          no-gutters
        >
          <p>{{ todos.length }} items left</p>
          <v-btn text small outlined>All</v-btn>
          <v-btn text small>Active</v-btn>
          <v-btn text small>Completed</v-btn>
        </v-row>
      </v-card>
      <core-app-bar></core-app-bar>
      <core-view></core-view>
      <core-footer></core-footer>
    </div>
  </v-row>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex';
export default {
  name: 'Home',
  data() {
    return {
      newTitle: '',
    };
  },
  computed: {
    ...mapState(['todos']),
    newId() {
      return (
        this.todos.reduce((acc, cur) => {
          return Math.max(acc, cur.id);
        }, 0) + 1
      );
    },
    // reduce acc값을 반복해서 변환시켜가면서 더 큰값을 반환 마지막에 내가 원하는 값을 출력
  },
  components: {
    CoreAppBar: () => import('@/components/core/AppBar.vue'),
    CoreView: () => import('@/components/core/CoreView.vue'),
    CoreFooter: () => import('@/components/core/CoreFooter.vue'),
  },
  methods: {
    addTask() {
      this.$store.commit('addTask', {
        id: this.newId,
        complete: false,
        title: this.newTitle,
      });
    },
    // todos의 모든 id값을 찾아서 적용해줌 브라우저상에선 안보임
  },
};
</script>

<style lang="scss" scoped>
.home {
  background-color: #f5f5f5;
}
.home-container {
  width: 100%;
  max-width: 600px;
  height: 100vh;
  border: 1px solid red;
}
h1 {
  font-size: 100px;
  text-align: center;
  font-weight: 300;
  color: #af2f2f26;
}
.todo-text-filed {
  height: 80px;
  background-color: #eee;
}
.list-item {
  padding: 10px 16px;
  .circle {
    width: 45px;
    height: 45px;
    border-radius: 23px;
    border: 1px solid gray;
  }
  p {
    margin: 0;
    margin-left: 20px;
    font-size: 25px;
    font-weight: 400;
  }
}
.todo-footer-extention {
  position: relative;
  p {
    position: absolute;
    left: 10px;
    top: 3px;
    font-size: 13px;
  }
}
</style>
