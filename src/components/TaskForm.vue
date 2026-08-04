<template>
  <form class="task-form" @submit.prevent="handleSubmit">
    <input
      v-model="newTask.title"
      type="text"
      placeholder="Nova tarefa..."
      class="task-input"
    />
    <label for="priority">Prioridade:</label>
    <select name="priority" id="priority" v-model="newTask.priority">
      <option value="baixa">Baixa</option>
      <option value="normal">Normal</option>
      <option value="alta">Alta</option>
    </select>
    <button type="submit" class="task-button">
      {{ editingTask ? 'Alterar' : 'Adicionar' }}
    </button>
    <button
      v-if="editingTask"
      type="button"
      class="task-button-cancel"
      @click="handleCancel"
    >
      Cancelar
    </button>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  editingTask: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(['add', 'update', 'cancel']);

const newTask = ref({
  title: '',
  priority: 'normal',
});

watch(
  () => props.editingTask,
  (task) => {
    if (task) {
      newTask.value = {
        title: task.title,
        priority: task.priority || 'normal',
      };
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

function handleSubmit() {
  if (!newTask.value.title.trim()) return;

  if (props.editingTask) {
    emit('update', props.editingTask.id, newTask.value.title.trim(), newTask.value.priority);
  } else {
    emit('add', newTask.value.title.trim(), newTask.value.priority);
  }
  
  resetForm();
}

function handleCancel() {
  resetForm();
  emit('cancel');
}

function resetForm() {
  newTask.value = {
    title: '',
    priority: 'normal',
  };
}
</script>

<style scoped>
.task-form {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 24px;
}

.task-input {
  flex: 1;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.task-input:focus {
  border-color: #4a90d9;
}

select {
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  cursor: pointer;
}

.task-button {
  padding: 12px 20px;
  background-color: #4a90d9;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.task-button:hover {
  background-color: #357abd;
}

.task-button-cancel {
  padding: 12px 16px;
  background-color: transparent;
  color: #666;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition:
    border-color 0.2s,
    color 0.2s;
}

.task-button-cancel:hover {
  border-color: #aaa;
  color: #333;
}
</style>