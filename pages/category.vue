<template>
  <div class="w-1/2 mx-auto flex flex-col py-4 gap-3">
    <div class="flex items-center gap-4">
      <h1 class="text-3xl font-semibold">Add Category</h1>
      <NuxtLink to="/">To do</NuxtLink>
    </div>
    <div class="flex gap-2">
      <input
        v-model="newCategory"
        type="text"
        class="w-full border-2 border-blue-400 p-2"
        placeholder="Add Category"
      />
      <button class="bg-blue-400 text-white p-2" @click="addCategory">
        Tambah
      </button>
    </div>

    <CategoryItem
      v-for="(category, index) in categories"
      :key="index"
      :category="category"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCategoryStore } from "~/stores/category";

const categoryStore = useCategoryStore();
const { getCategories, addCategory: addCategorySupabase } = categoryStore;
const { categories } = storeToRefs(categoryStore);
getCategories();

const newCategory = ref<string>("");

const addCategory = async () => {
  if (newCategory.value.trim() !== "") {
    await addCategorySupabase(newCategory.value);
    newCategory.value = "";
  }
  await getCategories();
};
</script>
