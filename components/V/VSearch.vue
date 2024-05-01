<template>
  <div>
    <div class="absolute mt-1.5 ml-4">
      <Icon class="text-white text-xl" name="ph:magnifying-glass-bold" />
    </div>
    <div>
      <v-input
        id="default-search" v-model="formData.name" :classes="type==='FilterEntries'?'bg-gray-800 h-10 pl-14 pr-10 text-sm text-white border-transparent w-64 rounded-md':'bg-gray-600 h-10 pl-14 pr-10 text-sm text-white border-transparent w-full bg-opacity-10 rounded-full outline-0'"
        :placeholder="`Search ${text}`"
        type="text"
        @input="throttleSearch"
      />
    </div>
  </div>
</template>
<script setup>
const emit = defineEmits(['filterByName']);

defineProps({
  text: {
    type: String,
    default: ''
  },
  type:{
    type: String,
    default: ''
  }
});
const formData = reactive({
  name: ""
});
const throttleSearch = () => {
  emit('filterByName', formData);
}
</script>