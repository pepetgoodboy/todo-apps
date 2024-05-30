<script setup lang="ts">
defineProps(["todo"]);
defineEmits(["update-todo", "delete-todo"]);
</script>

<template>
  <div class="flex gap-2 justify-between pb-2 border-b-[1px] border-gray-300">
    <div class="flex gap-2">
      <input
        v-model="todo.isDone"
        type="checkbox"
        @change="$emit('update-todo', todo.id, todo.isDone)"
      />
      <span :class="todo.isDone ? 'line-through' : ''">{{ todo.title }}</span>
    </div>
    <button @click="$emit('delete-todo', todo.id)">Hapus</button>
  </div>
</template>
