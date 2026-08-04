import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import tasksApi from '../api/tasksApi.js';

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const filterText = ref('')

  const pendingTasks = computed(() => tasks.value.filter((t) => !t.done));
  const completedTasks = computed(() => tasks.value.filter((t) => t.done));
  const filteredCompletedTasks = computed (() => {
    if(!filterText.value.trim()){
        return completedTasks.value
    }else{
        return completedTasks.value.filter((t) => t.title.toLowerCase().includes(filterText.value.toLowerCase()))
    }
  })
    const filteredPendingTasks = computed (() => {
    if(!filterText.value.trim()){
        return pendingTasks.value
    }else{
        return pendingTasks.value.filter((t) => t.title.toLowerCase().includes(filterText.value.toLowerCase()))
    }
  })

  async function fetchTasks() {
    loading.value = true;
    error.value = null;
    try {
      const response = await tasksApi.getAll();
      console.log('BLABLABLA: '+response.data)
      tasks.value = response.data;
    } catch (err) {
      error.value = 'Erro ao carregar tarefas.';
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  async function addTask(title, priority = 'normal') {
    if (!title.trim()) return;
    error.value = null;
    try {
      const response = await tasksApi.create(title.trim(), priority);
      tasks.value.push(response.data);
    } catch (err) {
      error.value = 'Erro ao adicionar tarefa.';
      console.error(err);
    }
  }

  async function toggleTask(id) {
    const task = tasks.value.find((t) => t.id === id);
    if (!task) return;
    error.value = null;
    try {
      const response = await tasksApi.update(id, { done: !task.done });
      const index = tasks.value.findIndex((t) => t.id === id);
      if (index !== -1) tasks.value[index] = response.data;
    } catch (err) {
      error.value = 'Erro ao atualizar tarefa.';
      console.error(err);
    }
  }

  async function removeTask(id) {
    error.value = null;
    try {
      await tasksApi.remove(id);
      tasks.value = tasks.value.filter((t) => t.id !== id);
    } catch (err) {
      error.value = 'Erro ao remover tarefa.';
      console.error(err);
    }
  }

  async function updateTaskTitle(id, title) {
    if (!title.trim()) return;
    error.value = null;
    try {
      const response = await tasksApi.update(id, { title: title.trim() });
      const index = tasks.value.findIndex((t) => t.id === id);
      if (index !== -1) tasks.value[index] = response.data;
    } catch (err) {
      error.value = 'Erro ao editar tarefa.';
      console.error(err);
    }
  }

  return {
    tasks,
    loading,
    error,
    pendingTasks,
    completedTasks,
    filteredPendingTasks,
    filteredCompletedTasks,
    filterText,
    fetchTasks,
    addTask,
    toggleTask,
    removeTask,
    updateTaskTitle,
  };
});