<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <span>Todo App</span>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/4emp1ON/vue_todo"
        target="_blank"
        text
      >
        <span class="mr-2">Git repository</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <TodoList/>
    </v-main>
  </v-app>
</template>

<script>
import TodoList from './components/TodoList';

export default {
  name: 'App',

  components: {
    TodoList,
  },

  data: () => ({
    //
  }),
};
</script>
