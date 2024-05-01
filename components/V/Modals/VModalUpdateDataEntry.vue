<template>
  <v-modal :is-active="isActive" @close-modal="closeDatabaseModal">
    <div class="flex flex-col gap-6 w-[1130px] px-8">
      <div class="flex flex-col justify-start gap-8 w-full">
        <div class="flex flex-col gap-8 overflow-y-auto scrollbar w-full pr-2.5">
          <p class="text-white text-left">Update Entries</p>
          <div class="flex flex-wrap justify-start gap-x-3 gap-y-4">
            <div v-for="(item,index) in FormDataEntry" :key="index">
              <div class="relative w-62">
                <v-label
                  for="entry"
                  label-classes="absolute -top-3 left-2 inline-block bg-gray-900 px-1 text-xs font-medium z-10"
                >
                  {{ item.key }}
                </v-label>
                <v-input
                  id="entry" v-model="FormDataEntry[index].value"
                  :placeholder="`Entry 1`"
                  classes="block w-full rounded-lg h-12 border border-white pl-4 bg-transparent text-white shadow-sm placeholder:text-gray-400 focus:border-purple-900 sm:text-sm sm:leading-6"
                  name="entry"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-between">
          <div class="flex flex-row">
            <button
              class="w-24 text-white text-2sm py-2 px-4 rounded-full border border-white/30 hover:bg-white/20 outline-0 leading-none"
              type="button"
              @click="closeDatabaseModal"
            >
              Cancel
            </button>
          </div>
          <div class="flex flex-row justify-end gap-x-4">
            <button
              :class="[isLoading.deleteDataEntry?'cursor-not-allowed py-1':'py-2','w-24 text-white text-2sm px-4 rounded-full bg-red-800 hover:bg-red-700 outline-0 leading-none']"
              :disabled="isLoading.deleteDataEntry"
              @click="deleteDataEntries"
            >
              <span v-if="isLoading.deleteDataEntry">
                <Icon name="line-md:loading-twotone-loop" />
              </span>
              <span v-else>
                Delete
              </span>
            </button>
            <button
              :class="[isLoading.updateDataEntry?'cursor-not-allowed py-1':'py-2','w-24 text-white text-2sm px-4 rounded-full bg-emerald-800 hover:bg-emerald-600 focus:cursor-progress']"
              :disabled="isLoading.updateDataEntry"
              @click="updateDataEntries"
            >
              <span v-if="isLoading.updateDataEntry">
                <Icon name="line-md:loading-twotone-loop" />
              </span>
              <span v-else>
                Update
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </v-modal>
</template>
<script setup>
import {useToast} from "vue-toastification";

const {fetchResult, fetchRequest} = useFetchRequest()
const toast = useToast();
const {isLoading} = useLoading();

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  },
  dataEntry: {
    type: Array,
    default: () => ([])
  }
})

const FormDataEntry = computed(() => {
  return props.dataEntry;
})

const emit = defineEmits(['closeModal', 'refreshData']);
const closeDatabaseModal = () => {
  emit('closeModal');
}

const updateDataEntries = async () => {
  await fetchRequest("/dataEntries/", {
    method:"POST",
    body:{
      dataEntries: FormDataEntry.value
    },
    loadingName: 'updateDataEntry'
  });
  if (!fetchResult?.error) {
    closeDatabaseModal();
    emit('refreshData');
    toast.success("Values updated successfully!");
  }
}
const deleteDataEntries = async () => {
  await fetchRequest("/dataEntries/delete/", {method:"POST",
    body:{dataEntries: FormDataEntry.value},
    loadingName: 'deleteDataEntry'
  });
  if (!fetchResult?.error) {
    closeDatabaseModal();
    emit('refreshData');
    toast.success("Values deleted successfully!");
  }
}
</script>