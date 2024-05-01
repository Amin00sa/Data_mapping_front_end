<template>
  <v-modal :is-active="isActive" @close-modal="closeDatabaseModal">
    <div class="flex flex-col gap-6 w-600 px-8">
      <div class="flex flex-col justify-start gap-8 w-full">
        <p class="text-white text-left">Add A DataBase</p>
        <div class="relative">
          <v-label
            for="name"
            label-classes="absolute -top-3 left-2 inline-block bg-gray-900 px-1 text-xs font-medium z-10"
          >
            DataBase
            Name
          </v-label>
          <v-input
            id="name" v-model="formDataDataBase.name"
            classes="block w-full border border-white pl-4 rounded-lg h-12 bg-transparent text-white shadow-sm placeholder:text-gray-400 focus:border-red-900 sm:text-sm sm:leading-6"
            name="name"
            placeholder="Graph 1"
            type="text"
            :error="getFormattedError(errorsStore?.errors?.name)"
          />
        </div>
        <div class="flex flex-col gap-8 overflow-y-auto scrollbar w-full h-96 pr-2.5">
          <p class="text-white text-left">Entries</p>
          <div v-for="(element,index) in formDataEntry.id" :key="index" class="flex flex-row justify-between gap-5">
            <div class="relative w-full">
              <v-label
                for="entry"
                label-classes="absolute -top-3 left-2 inline-block bg-gray-900 px-1 text-xs font-medium z-10"
              >
                Entry
              </v-label>
              <v-input
                id="entry" v-model="formDataEntry.name[index]"
                :placeholder="`Entry 1`"
                classes="block w-full rounded-lg h-12 ml-2 bg-transparent border border-white pl-4 text-white shadow-sm placeholder:text-gray-400 focus:border-purple-900 sm:text-sm sm:leading-6"
                name="entry"
                type="text"
              />
            </div>
            <div class="relative w-full">
              <v-dropdown :filled="true">
                <template #menuButton>
                  <v-menu-button-text :selected-value="{name : formDataEntry.type[index]}" type="typesData" />
                </template>
                <template #menuItem>
                  <div v-for="selectValue in types" :key="selectValue.id">
                    <MenuItem v-slot="{ active }">
                      <a
                        :class="[active ? 'bg-white bg-opacity-30 text-white first:rounded-t-md last:rounded-b-md' : 'text-white', 'block px-4 py-2 text-sm text-center']"
                        @click="onSelectChangeTypes({name: selectValue.value, keyTypes: index})"
                      >
                        {{ selectValue.value }}
                      </a>
                    </MenuItem>
                  </div>
                </template>
              </v-dropdown>
            </div>
            <div class="flex flex-col justify-center items-center">
              <div
                v-if="formDataEntry.id[index] !== null"
                class="bg-red-700 rounded-full flex items-center justify-center flex-shrink-0 w-4 h-4"
                @click="removeEntry(index)"
              >
                <Icon class="text-amber-50 w-3 h-3" name="ic:twotone-close" />
              </div>
              <div
                v-else class="bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0 w-4 h-4"
                @click="addEntry(index)"
              >
                <Icon class="text-white w-3 h-3" name="majesticons:plus-line" />
              </div>
            </div>
          </div>
          <span v-if="errorsStore?.errors?.entries" class="-mt-6 text-sm text-red-600 text-center">{{ getFormattedError(errorsStore?.errors?.entries) }}</span>
        </div>
        <div class="flex justify-end pl-5 gap-x-4">
          <button
            class="w-24 text-white text-2sm py-2 px-4 rounded-full border border-white/30 hover:bg-white/20 outline-0 leading-none"
            type="button"
            @click="closeDatabaseModal"
          >
            Cancel
          </button>
          <button
            :disabled="isLoading.postDatabase"
            :class="[isLoading.postDatabase?'cursor-not-allowed py-1':'py-2','w-24 text-white text-2sm px-4 rounded-full bg-purple-900 hover:bg-purple-700 outline-0 leading-none']"
            @click="postDatabase"
          >
            <span v-if="isLoading.postDatabase">
              <Icon name="line-md:loading-twotone-loop" />
            </span>
            <span v-else>
              Save
            </span>
          </button>
        </div>
      </div>
    </div>
  </v-modal>
</template>
<script setup>
import {MenuItem} from "@headlessui/vue";
import {useToast} from "vue-toastification";
import getFormattedError from "~/composables/getFormattedError.ts";

const {fetchResult, fetchRequest} = useFetchRequest()
const {addNewElement, updateLastElement, removeElement} = useAddInputsForm();
const toast = useToast();
const {isLoading} = useLoading();
const errorsStore = useErrorsStore();

defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
});

let formDataDataBase = reactive({
  name: '',
  entries: {
    name: '',
    type: ''
  }
});
let formDataEntry = reactive({
  id: [],
  name: [],
  type: [],
});

const types = reactive([
  {
    value: 'INT'
  }, {
    value: 'VARCHAR'
  },
  {
    value: 'TEXT'
  }, {
    value: 'DATE'
  }
]);

const onSelectChangeTypes = (TypeSelected) => {
  formDataEntry.type[TypeSelected.keyTypes] = TypeSelected.name;
}

const initialiseForm = () => {
  formDataEntry.id[0] = null;
  formDataEntry.type[0] = 'Type';
}

onMounted(() => {
  initialiseForm();
})
const emit = defineEmits(['closeDatabaseModal', 'refreshData']);
const closeDatabaseModal = () => {
  emit('closeDatabaseModal');
}
const addEntry = async (index) => {
  if (formDataEntry.name[index] && formDataEntry.type[index]) {
    if (formDataEntry.type[index] !== 'Type') {
      updateLastElement(index, formDataEntry);
      addNewElement(index + 1, formDataEntry);
    } else {
      toast.error('The type entry field is required');
    }
  }
}
const removeEntry = async (index) => {
  removeElement(index, formDataEntry);
}

const emptyForm = () => {
  formDataDataBase = reactive({
    name: '',
    entries: {
      name: '',
      type: ''
    }
  });
  formDataEntry = reactive({
    id: [],
    name: [],
    type: [],
  });
}

const postDatabase = async () => {
  formDataDataBase.entries.name = (Object.values(formDataEntry.name)).filter(element => element !== null);
  formDataDataBase.entries.type = (Object.values(formDataEntry.type)).filter(element => element !== null);
  const transformedData = {
    ...formDataDataBase,
    entries: formDataDataBase.entries.name.map((name, index) => ({
      name,
      type: formDataDataBase.entries.type[index]
    }))
  };
  await fetchRequest("/databases/", {
    method:"POST",
    body:transformedData,
    loadingName: 'postDatabase'
  })
  if (!fetchResult.error) {
    closeDatabaseModal();
    emit('refreshData');
    emptyForm();
    initialiseForm();
    toast.success("DataBase created successfully!");
  }
}
</script>