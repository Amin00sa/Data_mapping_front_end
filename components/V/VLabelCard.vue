<template>
  <span
    class="bg-opacity-20 bg-gray-600 rounded-full text-white px-4 py-1 text-xs capitalize"
  ><strong>{{ number }} </strong>
    columns</span>
</template>
<script setup>
defineProps({
  number: {
    type: Boolean,
    default: false
  }
});
</script>
