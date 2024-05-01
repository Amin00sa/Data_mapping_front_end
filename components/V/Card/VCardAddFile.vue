<template>
  <div
    class="h-16 items-start cursor-pointer bg-gray-800 rounded-2xl border-spacing-9 border-dashed border-2 border-base-550 flex flex-col justify-center"
    @click="openModal"
  >
    <div class="gap-x-3 flex-row flex items-center justify-center">
      <div class="h-8 w-8 bg-gray-600 rounded-full flex items-center justify-center ml-6">
        <Icon class="text-white" name="ph:plus-bold"></Icon>
      </div>
      <div class=" flex flex-col items-center">
        <div class="font-medium text-sm text-white">
          <span>Add Files</span>
        </div>
      </div>
    </div>
  </div>
  <v-modal-add-file
    :is-active="isActiveAddFile" @close-modal="isActiveAddFile = false"
    @refresh-data="$emit('refreshData')"
  />
</template>
<script setup>
import VModalAddFile from "~/components/V/Modals/VModalAddFile.vue";

const isActiveAddFile = ref(false);

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
  if (props.enableFiles || !props.disabled) {
    isActiveAddFile.value = true;
  }
}
</script>