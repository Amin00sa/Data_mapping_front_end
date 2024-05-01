<template>
  <v-modal :is-active="isActive" @close-modal="closeModal">
    <div class="flex flex-col gap-6 w-[36rem] px-8">
      <div class="flex flex-col justify-start gap-8 w-full">
        <p class="text-white text-left">Save A DataBase</p>
      </div>
      <div class="w-full">
        <div>
          <button
            class="flex items-center rounded-md p-3 bg-gray-600 bg-opacity-5 text-white hover:text-gray-600 w-full h-20"
            type="button"
          >
            <div class="ml-2 flex flex-row justify-between w-full">
              <div class="flex flex-row gap-3">
                <div class="bg-gray-600 rounded-full flex items-center justify-center w-10 h-10">
                  <Icon class="text-purple-900 text-2xl" name="solar:database-broken" />
                </div>
                <div class="flex flex-col">
                  <strong class="text-white text-left text-2sm line-clamp-1 w-full">
                    {{ selectedDatabase.name }}
                  </strong>
                  <p class="text-white text-left text-xsmall opacity-50 tracking-largest">
                    {{ createdAt }}
                  </p>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
      <div class="flex justify-end pl-5 gap-x-4">
        <button
          class="text-white text-xs py-2 px-4 rounded-full border border-white hover:bg-white hover:bg-opacity-20 focus:cursor-progress"
          type="button" @click="download"
        >
          Download as
          <span v-if="file.name.includes('csv') || file.name.includes('xls') || file.name.includes('xlsx')">
            CSV
          </span>
          <span v-else-if="file.name.includes('sql')">
            SQL
          </span>
          <span v-else-if="file.name.includes('xml')">
            XML
          </span>
        </button>
        <button
          :disabled="isLoading.saveMapping"
          :class="[isLoading.saveMapping?'cursor-not-allowed py-1':'py-2','w-24 text-white text-xs px-4 rounded-full bg-purple-900 hover:bg-purple-700']"
          @click="saveMapping"
        >
          <span v-if="isLoading.saveMapping">
            <Icon name="line-md:loading-twotone-loop" />
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
import { useDateFormat } from '@vueuse/core'
import {useToast} from "vue-toastification";

const toast = useToast();
const {isLoading} = useLoading();
const route = useRoute();
const {fetchResult, fetchRequest} = useFetchRequest()

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  },
  selectedDatabase: {
    type: Object,
    default: () => ({})
  },
  dataTronsformed: {
    type: Array,
    default: () => ([])
  },
  file: {
    type: Object,
    default: () => ({})
  },
  database: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['closeDatabaseModal', 'closeModal']);
const closeModal = () => {
  emit('closeModal');
}

const createdAt = computed(() => {
  return useDateFormat(props?.selectedDatabase?.created_at, 'DD/MM/YYYY').value;
});

const download = async () => {
  window.open(useRuntimeConfig().public.baseUrl +'storage/'+ props?.file?.path_file)
}

const saveMapping = async () => {
  await fetchRequest("/entries/mapping/", {
    method:"POST",
    body:{
      object: props.dataTronsformed, fileId: props?.file?.id
    },
    loadingName: 'saveMapping'
  });
  if (!fetchResult?.error) {
    toast.success("Data mapped successfully!");
    navigateTo('/databases/' + route.query.database);
  }
}
</script>