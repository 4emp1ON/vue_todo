<template>
    <v-container>
        <v-row>
            <v-col cols="12" sm="8">
                <v-text-field
                        class="col-12"
                        label="Enter your task"
                        hide-details="auto"
                        v-model="newTodo"
                        :rules="[rules.required, rules.counter]"
                        @keyup.enter="addTodo"
                ></v-text-field>
                <v-checkbox
                        v-model="isImportant"
                        label="This task is important"
                ></v-checkbox>
            </v-col>
            <v-col cols="4">
                <v-btn class="col-12 col-sm-2"
                       @click="addTodo">
                    Add Todo
                </v-btn>
            </v-col>
        </v-row>
        <h1 v-if="h1Status(uncompletedTasks)">Uncompleted:</h1>
        <TodoItem
                v-for="task in uncompletedTasks"

                :key="task.id"
                :task_data="task"
                @editTask="makeTaskChanges"
        />
        <h1 v-if="h1Status(completedTasks)">Completed:</h1>
        <TodoItem
                v-for="task in completedTasks"

                :key="task.id"
                :task_data="task"
                @editTask="makeTaskChanges"
        />
        <h1 v-if="h1Status(DROPPED_TASKS)">Dropped:</h1>
        <TodoItem
                v-for="task in DROPPED_TASKS"

                :key="task.id"
                :task_data="task"
                @editTask="makeTaskChanges"
        />
    </v-container>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import TodoItem from './TodoItem';

    export default {
        name: 'TodoList',
        components: {
            TodoItem
        },

        data: () => ({
            newTodo: '',
            isImportant: false,
            componentReloader: 1,
            rules: {
                required: value => !!value || 'Required.',
                counter: value => value.length >= 3 || 'Min 3 characters',
            },
        }),
        methods: {
            ...mapActions([
                    "DROP_TASK",
                    "LOAD_TASKS",
                    "EDIT_TASK",
                    "NEW_TASK",
                ]
            ),
            addTodo() {
                const task = {
                    title: this.newTodo,
                    isImportant: this.isImportant,
                }
                this.isImportant = false;
                this.NEW_TASK(task)
            },
            makeTaskChanges(input) {
                this.EDIT_TASK(input)
                this.componentReloader++;
            },
            h1Status(category) {
                return Object.keys(category).length
            }
        },
        computed: {
            ...mapGetters([
                'TASKS',
                'TASKS_VIEW',
                'DROPPED_TASKS',
                'EDITED_TASKS',
            ]),
            completedTasks() {
                return this.TASKS_VIEW(true)
            },
            uncompletedTasks() {
                return this.TASKS_VIEW(false)
            },
        },
        mounted() {
            this.LOAD_TASKS();
        }
    }
</script>
