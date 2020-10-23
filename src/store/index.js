import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        tasks: [],
        droppedTasks: [],
        editedTasks: {},
    },
    mutations: {
        ADD_TASK: (state, task) => {
            state.tasks.push(task);
        },
        ADD_DROPPED_TASKS: (state, id) => {
            state.droppedTasks.push(id);
        },
        ADD_TASKS_CHANGES: (state, input) => {
            Vue.set(
                state.editedTasks,
                input.id, {
                    newTitle: input.newTitle,
                    newCompleted: input.newCompleted,
                    newImportant: input.newImportant
                })
        }
    },
    actions: {
        LOAD_TASKS({commit}) {
            fetch(`https://jsonplaceholder.typicode.com/todos/${Math.floor(Math.random() * 200)}`)
                .then(response => response.json())
                .then(tasks => {
                    commit('ADD_TASK', {...tasks, isImportant: false})
                })
        },
        DROP_TASK({commit}, id) {
            commit('ADD_DROPPED_TASKS', id);
            return id;
        },
        EDIT_TASK({commit}, input) {
            commit('ADD_TASKS_CHANGES', input);
            return input;
        },
        NEW_TASK({commit, getters}, task) {
            const data = {
                userId: task.userId ? task.userId : 1,
                id: Math.max.apply(Math, getters.TASKS.map(function (o) {
                    return o.id;
                })) + 1,
                title: task.title,
                completed: false,
                isImportant: task.isImportant ? task.isImportant : false
            }
            commit('ADD_TASK', data);
        },
    },
    getters: {
        TASKS(state) {
            return state.tasks
        },
        DROPPED_TASKS(state) {
            return state.tasks
                .filter(t => state.droppedTasks.includes(t.id))
        },
        EDITED_TASKS(state) {
            return state.editedTasks
        },
        TASKS_VIEW: (state) => (completed) => {
            return state.tasks
                .filter(t => {
                        const edited = state.editedTasks[t.id];
                        const completeStatus = edited ? state.editedTasks[t.id].newCompleted : t.completed;
                        return !state.droppedTasks.includes(t.id) && completeStatus === completed
                    }
                )
                .map(t => {
                    const edited = state.editedTasks[t.id];
                    return edited ? {
                            ...t,
                            title: edited.newTitle,
                            isImportant: edited.newIsImportant,
                            completed: edited.newCompleted,
                        }
                        : t;
                });
        },
    }
})
