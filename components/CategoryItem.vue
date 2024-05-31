<script setup lang="ts">
defineProps(["category"]);
</script>

<template>
  <div class="flex gap-2 justify-between pb-2 border-b-[1px] border-gray-300">
    <div class="flex gap-2">
      <span>{{ category.name }}</span>
    </div>
  </div>
</template>
