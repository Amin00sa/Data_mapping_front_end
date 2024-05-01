<template>
  <div
    class="cursor-pointer flex h-48 flex-col justify-center items-center border-spacing-9 border-dashed border-2 border-base-550 rounded-3xl bg-gray-800"
    @click="openModal"
  >
    <div class="h-10 w-10 bg-gray-600 rounded-full flex items-center justify-center">
      <Icon class="text-white" name="ph:plus-bold"></Icon>
    </div>
    <div class="font-medium text-xs text-white mt-3 capitalize">Add Database</div>
  </div>
  <v-modal-create-database :is-active="isActive" @close-database-modal="isActive = false" @refresh-data="$emit('refreshData')" />
</template>

<script setup>
import VModalCreateDatabase from "~/components/V/Modals/VModalCreateDatabase.vue";

const isActive = ref(false);
defineEmits(['refreshData']);
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  enableFiles: {
    type: Boolean,
    default: false
  },
});
const openModal = () => {
  if (!props.enableFiles) {
    isActive.value = true;
  }
}
</script>