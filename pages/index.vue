<template>
  <div class="w-1/2 flex flex-col mx-auto py-4 gap-3">
    <div class="flex items-center gap-4">
      <h1 class="text-3xl font-semibold">Daftar Todo</h1>
      <NuxtLink to="/category">Add Category</NuxtLink>
      <h1>Category</h1>
    </div>
    <div class="flex gap-2">
      <input
        v-model="newTodo"
        class="w-full p-2 border-2 border-blue-400"
        type="text"
        placeholder="Tambah tugas baru"
        @keyup.enter=""
      />
      <button class="p-2 bg-blue-400 text-white" @click="addTodo">
        Tambah
      </button>
    </div>

    <TodoItem
      v-for="(todo, index) in todos"
      :key="index"
      :todo="todo"
      @update-todo="updateTodoHandler"
      @delete-todo="deleteTodoHandler"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTodoStore } from "~/stores/todo";

const todoStore = useTodoStore();
const { getTodo, addTodo: addTodoSupabase, updateTodo, deleteTodo } = todoStore;
const { todos } = storeToRefs(todoStore);

const newTodo = ref<string>("");

getTodo();

const addTodo = async () => {
  if (newTodo.value.trim() !== "") {
    await addTodoSupabase(newTodo.value);
    newTodo.value = "";
  }
  await getTodo();
};

const updateTodoHandler = async (id: number, isDone: boolean) => {
  await updateTodo(id, isDone);
  await getTodo();
};

const deleteTodoHandler = async (id: number) => {
  await deleteTodo(id);
  await getTodo();
};
</script>
