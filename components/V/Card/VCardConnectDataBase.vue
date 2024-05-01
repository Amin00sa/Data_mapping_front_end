<template>
  <div
    class="h-16 items-start cursor-pointer bg-gray-800 rounded-2xl border-spacing-9 border-dashed border-2 border-base-550 flex flex-col justify-center"
    @click="openModal"
  >
    <div class="gap-x-3 flex-row flex items-center justify-center">
      <div class="h-8 w-8 bg-gray-600 rounded-full flex items-center justify-center ml-6">
        <ConnectSvg />
      </div>
      <div class=" flex flex-col items-center">
        <div class="font-medium text-sm text-white">
          <span>Connect a Database</span>
        </div>
      </div>
    </div>
  </div>
  <v-modal-connect-database
    :is-active="isActiveConnect" @close-modal="isActiveConnect = false"
    @refresh-data="$emit('refreshData')"
  />
</template>
<script setup>
import VModalConnectDatabase from "~/components/V/Modals/VModalConnectDatabase.vue";

const isActiveConnect = ref(false);
import {ConnectSvg} from "~/components/icons";

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
    isActiveConnect.value = true;
  }
}
</script>