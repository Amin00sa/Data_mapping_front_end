<template>
  <v-modal :is-active="isActive" @close-modal="emit('closeModal')">
    <div class="flex flex-col justify-between w-96 gap-6">
      <div class="flex items-start">
        <div class="relative">
          <strong class="text-left inline-block bg-gray-900 text-xs font-medium">Are you sure you
            want to delete this item?
          </strong>
        </div>
      </div>
      <div class="flex justify-end gap-x-4">
        <button
          class="w-24 h-10 text-white text-2sm rounded-full border border-white/30 hover:bg-white/20 outline-0 leading-none"
          type="button"
          @click="emit('closeModal')"
        >
          Cancel
        </button>
        <button
          :class="[clicked?'cursor-not-allowed':'','w-24 h-10 text-white text-2sm rounded-full bg-red-800 hover:bg-red-700 outline-0 leading-none']"
          :disabled="clicked"
          @click="deleteElement"
        >
          <span v-if="isLoading.deleteElement">
            <Icon name="line-md:loading-twotone-loop" />
          </span>
          <span v-else>
            Delete
          </span>
        </button>
      </div>
    </div>
  </v-modal>
</template>
<script setup>
import {useToast} from "vue-toastification";

const emit = defineEmits(['refreshData', 'closeModal'])
const {fetchResult, fetchRequest} = useFetchRequest()
const {isLoading} = useLoading();
const props = defineProps({
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

const toast = useToast();
const deleteElement = async () => {
  if (props.type === 'entry') {
    await fetchRequest("/entries/" + props.data.id,{
      method:"DELETE",
      loadingName: 'deleteElement'
    })
    if (!fetchResult?.error) {
      toast.success("Entry deleted successfully!");
      emit('refreshData');
    }
  } else {
    await fetchRequest("/databases/" + props.data.id,{
      method:"DELETE",
      loadingName: 'deleteElement'
    })
    if (!fetchResult?.error) {
      toast.success("DataBase deleted successfully!");
      emit('refreshData');
    }
  }
}

</script>