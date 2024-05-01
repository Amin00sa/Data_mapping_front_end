<template>
  <div
    :class="isSelected?'bg-purple-900':isUploaded?'bg-white/10':'bg-gray-800'"
    class="h-16 items-start cursor-pointer bg-gray-800 rounded-2xl border-spacing-9 border-2 border-base-150 flex flex-col justify-center relative px-3 py-4"
    @click="addFile"
  >
    <div class="flex flex-row justify-start items-center gap-x-4 w-[14.8rem]">
      <Icon v-if="file.name.includes('csv') || file.name.includes('xls') || file.name.includes('xlsx') " class="text-amber-50 text-3xl" name="vscode-icons:file-type-excel" />
      <Icon v-else-if="file.name.includes('xml')" class="text-bleu-200 text-3xl" name="tabler:file-type-xml" />
      <SqlSvg v-else-if="file.name.includes('sql')" />
      <Icon v-else name="ri:forbid-line" class="text-red-600 text-xl" />
      <p class="text-sm w-44 text-left text-white line-clamp-1">{{ file.name }}</p>
    </div>
    <div
      v-if="isUploaded"
      class="bg-red-700 rounded-full flex items-center justify-center flex-shrink-0 w-4 h-4 absolute right-3"
      @click="removeFile(file.name)"
    >
      <Icon class="text-amber-50 w-3 h-3" name="ic:twotone-close" />
    </div>
  </div>
</template>
<script setup>
import {SqlSvg} from "~/components/icons";

const props = defineProps({
  enableFiles: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  selectedId: {
    type: String,
    default: ''
  },
  file: {
    type: Array,
    default: () => ([])
  },
  isUploaded: {
    type: String,
    default: ''
  }
});
const isSelected = computed(() => {
  return props.selectedId === props.file.id;
})
const emit = defineEmits(['addDatabase', 'removeFile','addFile']);

const addFile = () => {
  if (props.enableFiles && props.disabled) {
    emit('addFile', props.file.id);
  }
}
const removeFile = (nameFile) => {
  emit('removeFile', nameFile);
}

watch(
    () => props.disabled,
    (ButtonMapping) => {
      ButtonMapping = props.disabled;
      if (!ButtonMapping) {
        emit('addFile', null);
      }
    }
);
</script>