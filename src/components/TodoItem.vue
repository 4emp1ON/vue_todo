<template>
    <v-row v-if="task_data">
        <v-col cols="12">
            <div :class="{ important : task_data.isImportant, task_item : true }">
                <div @click="editTask({completed: !task_data.completed})">
                    <v-icon
                            :color="taskColor"
                            center
                    >
                        {{ task_data.completed ? 'mdi-checkbox-marked-circle' : 'mdi-minus-circle'}}
                    </v-icon>

                    <span class="col-3">{{task_data.title}} <span
                            v-if="task_data.isImportant">(this task is important)</span></span>
                </div>
                <v-row class="mt-3">
                    <v-btn
                            class="col-12 col-sm-1"
                            color="red"
                            dark
                            @click="DROP_TASK(task_data.id)"
                    >
                        Drop task
                        <v-icon
                                dark
                                right
                        >
                            mdi-cancel
                        </v-icon>
                    </v-btn>
                    <v-btn
                            class="mt-3 mt-sm-0 ml-0 ml-sm-3 col-12 col-sm-1"
                            color="purple"
                            dark
                    > Edit task
                        <v-icon dark right>
                            mdi-wrench
                        </v-icon>
                    </v-btn>
                </v-row>
            </div>
        </v-col>
    </v-row>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "TaskItem",
        props: {
            task_data: {
                type: Object,
            }
        },
        methods: {
            ...mapActions([
                    "DROP_TASK",
                ]
            ),
            editTask(params) {
                const data = {
                    id: params.id ? params.id : this.task_data.id,
                    newTitle: params.title ? params.title : this.task_data.title,
                    newIsImportant: params.isImportant ? params.isImportant : this.task_data.isImportant,
                    newCompleted: params.completed,
                }
                this.$emit('editTask', data)
            }
        },
        computed: {
            taskColor() {
                return this.task_data.completed ? 'green' : 'grey'
            }
        }
    }
</script>
<style scoped>
    .task_item {
        padding: 20px;
        border-radius: 20px;
        background: gainsboro;
        border: 1px solid black;;
    }

    .important {
        background: burlywood;
    }
</style>
