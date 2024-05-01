<template>
  <MenuButton
    :class="type==='typesData'||type==='typesDataBase'?'h-12 bg-gray-700':'h-10 bg-gray-800'"
    class="flex items-center rounded-md p-3 text-white hover:text-gray-600 w-full"
  >
    <div class="flex flex-row justify-between w-full">
      <div class="flex items-center justify-center mx-3">
        <strong class="text-white text-left text-xs line-clamp-1 w-40">
          {{ selectedValue.name }}
        </strong>
      </div>
      <div class="flex flex-col justify-center">
        <ChevronDownIcon aria-hidden="true" class="h-5 w-5" />
      </div>
    </div>
  </MenuButton>
</template>
<script setup>
import {MenuButton} from "@headlessui/vue";
import {ChevronDownIcon} from "@heroicons/vue/20/solid";

defineProps({
  type: {
    type: String,
    default: ''
  },
  selectedValue: {
    type: Object,
    default: () => ({})
  }
});
</script>