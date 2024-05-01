<template>
  <v-modal :is-active="isActive" @close-modal="closeModal">
    <div class="flex flex-col justify-center w-[540px] space-y-8">
      <div class="flex items-start flex-col space-y-8">
        <div class="relative w-full">
          <input
            id="fileInput" ref="file" accept=".csv, .xml, .xls, .xlsx, .sql" class="hidden" multiple type="file"
            @change="onChange"
          />
          <label
            :class="isDragging?'bg-purple-900/10':'bg-slate-700'"
            class=" flex justify-center items-center  cursor-pointer w-full rounded-3xl h-80 border-spacing-9 border-dashed border-2 border-base-550 bg-opacity-20"
            for="fileInput" @dragleave="dragleave" @dragover="dragover"
            @drop="drop"
          >
            <div v-if="!isDragging" class="flex justify-center items-center flex-col  w-full h-full m-0.5 rounded-3xl">
              <Icon class="text-7xl text-white/60" name="solar:upload-minimalistic-bold" />
              <h3 class="py-3 text-white/60 tracking-wider">Drag & drop files or click </h3>
            </div>
            <div v-else class="py-3 text-white/60">
              Release to drop files here
            </div>
          </label>
        </div>
        <div class="flex flex-wrap w-full gap-2.5 justify-start ">
          <v-card-file
            v-for="(fileUploaded,index) in files" :key="index" :file="fileUploaded" :is-uploaded="true"
            @remove-file="removeFile"
          />
        </div>
      </div>
      <div class="flex justify-end gap-x-4">
        <button
          class="w-24 text-white text-2sm py-2 px-4 rounded-full border border-white/30 hover:bg-white/20 outline-0 leading-none"
          type="button"
          @click="closeModal"
        >
          Cancel
        </button>
        <button
          :disabled="isLoading.postFiles"
          :class="[isLoading.postFiles?'cursor-not-allowed py-1':'py-2','w-24 text-white text-2sm px-4 rounded-full border border-transparent bg-purple-900 hover:bg-purple-700 leading-none']"
          @click="uploadFiles"
        >
          <span v-if="isLoading.postFiles">
            <Icon class="text-2xl" name="line-md:loading-twotone-loop" />
          </span>
          <span v-else>
            Save
          </span>
        </button>
      </div>
    </div>
  </v-modal>
</template>
<script setup>
import VCardFile from "~/components/V/Card/VCardFile.vue";
import {useToast} from "vue-toastification";

const emit = defineEmits(['refreshData', 'closeModal']);
const {fetchResult, fetchRequest} = useFetchRequest()
const toast = useToast();
const isDragging = ref(false);
const file = ref(null);
const {isLoading} = useLoading();
const files = ref([]);
defineProps({
  data: {
    type: Array,
    default: () => ([])
  },
  type: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: false
  }
});

const removeFile = (NameFile) => {
  files.value.map(file => {
    if (file.name === NameFile) {
      files.value.splice(files.value.indexOf(file), 1);
    }
  });
}
const dragover = (e) => {
  e.preventDefault();
  isDragging.value = true;
}

const dragleave = () => {
  isDragging.value = false;
}
const closeModal = () => {
  emit('closeModal');
}

const drop = (e) => {
  e.preventDefault();
  Array.from(e.dataTransfer.files).map(file => {
    files.value.push(file)
  });
  isDragging.value = false;
}

const onChange = (e) => {
  const input = e.target
  if (input.files) {
    Array.from(input.files).map(file => {
      files.value.push(file)
    })
  }
}

const uploadFiles = async () => {
  const form = new FormData();
  for (let i = 0; i < files.value.length; i++) {
    form.append('files[]', files.value[i]);
  }
  await fetchRequest("/files/", {
    method:"POST",
    body:form,
    loadingName: 'postFiles'
  });
  if (!fetchResult?.error) {
    closeModal();
    emit('refreshData', fetchResult?.value?.file);
    files.value = [];
    toast.success("Files uploaded successfully!");
  }
}
</script>