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
            v-for="(todo, i) in filteredTodos"
            :key="i"
            no-gutters
          >
            <div
              class="circle"
              @click="editTask(todo)"
              :style="{ border: todo.complete ? '1px solid green' : '' }"
            >
              <!-- 인라인 스타일 바인딩 -->
              <v-btn icon large color="green" v-show="todo.complete"
                ><v-icon>mdi-check</v-icon></v-btn
              >
            </div>
            <p :class="{ 'text-complete': todo.complete }">
              {{ todo.title }}
            </p>
            <v-spacer></v-spacer>
            <v-btn icon large @click="deleteTask(todo)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-row>
        </div>
        <v-divider></v-divider>
        <v-row
          class="todo-footer-extention"
          justify="center"
          align="center"
          no-gutters
        >
          <p>{{ filteredTodos.length }} items left</p>
          <v-btn text small :outlined="filter === 'all'" @click="filter = 'all'"
            >All</v-btn
          >
          <v-btn
            text
            small
            :outlined="filter === 'active'"
            @click="filter = 'active'"
            >Active</v-btn
          >
          <v-btn
            text
            small
            :outlined="filter === 'completed'"
            @click="filter = 'completed'"
            >Completed</v-btn
          >
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
      filter: '',
    };
  },
  computed: {
    ...mapState(['todos']),
    filteredTodos() {
      switch (this.filter) {
        case 'active':
          return this.todos.filter((el) => !el.complete);
        case 'completed':
          return this.todos.filter((el) => el.complete);
        default:
          return this.todos;
      }
    },
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
      this.newTitle = '';
    },
    // todos의 모든 id값을 찾아서 적용해줌 브라우저상에선 안보임
    editTask(task) {
      task.complete = !task.complete;
      this.$store.commit('editTask', task);
    },
    deleteTask(task) {
      this.$store.commit('deleteTask', task);
    },
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
  // border: 1px solid red;
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
  height: 40px;
  p {
    position: absolute;
    left: 10px;
    top: 10px;
    font-size: 13px;
  }
}

.text-complete {
  text-decoration-line: line-through;
  opacity: 0.5;
}
</style>
