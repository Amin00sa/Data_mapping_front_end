<template>
  <v-modal :is-active="isActive" @close-modal="closeDatabaseModal">
    <div class="flex flex-col gap-6 w-600 px-8">
      <div class="flex flex-col justify-start gap-8 w-full ">
        <p class="text-white font-semibold text-left">Update : {{ formDataDataBase.name }}</p>
        <div class="relative">
          <v-label
            for="name"
            label-classes="absolute -top-3 left-2 inline-block bg-gray-900 px-1 text-xs font-medium z-10  text-md font-semibold "
          >
            Database
          </v-label>
          <v-input
            id="name" v-model="formDataDataBase.name"
            classes="block w-full rounded-lg h-12 bg-transparent text-white shadow-sm placeholder:text-gray-400 focus:ring-purple-900 focus:border-purple-900 sm:text-sm sm:leading-6"
            name="name"
            placeholder="Graph 1"
            type="text"
            :error="getFormattedError(errorsStore?.errors?.name)"
          />
        </div>

        <div class="flex flex-col overflow-y-auto w-full bg-gray-800 rounded-3xl">
          <div class="flex  w-full bg-gray-600 bg-opacity-10 p-4 gap-2">
            <span class="text-white text-sm font-semibold text-left">Columns</span>
          </div>
          <div class="py-10 px-6 space-y-10 max-h-96 overflow-y-auto scrollbar">
            <div v-for="(element,index) in formDataEntry.id" :key="index" class="flex flex-row justify-between gap-4">
              <div class="relative w-full">
                <v-label
                  for="entry"
                  label-classes="absolute -top-3 left-2 inline-block bg-gray-800 px-1 text-xs font-medium z-10"
                >
                  Value
                </v-label>
                <v-input
                  id="entry" v-model="formDataEntry.name[index]"
                  classes="block w-full rounded-lg h-12 bg-transparent text-white shadow-sm placeholder:text-gray-400 focus:ring-purple-900 focus:border-purple-900 sm:text-sm sm:leading-6"
                  name="entry"
                  placeholder="value"
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
                <div v-if="formDataEntry.id[index] !== null" class="flex flex-row gap-1.5">
                  <div
                    class="bg-red-700 rounded-full flex items-center justify-center flex-shrink-0 w-5 h-5 cursor-pointer"
                    @click="removeEntry(index)"
                  >
                    <Icon class="text-amber-50 w-3 h-3" name="ic:twotone-close" />
                  </div>
                </div>
                <div
                  v-else
                  class="bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0 w-5 h-5 cursor-pointer"
                  @click="addEntry(index)"
                >
                  <Icon class="text-white w-3 h-3" name="majesticons:plus-line" />
                </div>
              </div>
            </div>
          </div>
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
            :class="[isLoading.updateDatabase?'cursor-not-allowed py-1':'py-2','w-24 text-white text-xs px-4 rounded-full bg-purple-900  hover:bg-purple-700 outline-0 leading-none']"
            :disabled="isLoading.updateDatabase"
            @click="putDatabase"
          >
            <span v-if="isLoading.updateDatabase">
              <Icon name="line-md:loading-twotone-loop" />
            </span>
            <span v-else>
              Update
            </span>
          </button>
        </div>
      </div>
    </div>
  </v-modal>
  <v-modal-delete
    :data="ElementToBeRemoved" :is-active="isActiveDelete" type="entry" @close-modal="isActiveDelete = false"
    @refresh-data="$emit('refreshData')"
  />
</template>
<script setup>
import {MenuItem} from "@headlessui/vue";
import VModalDelete from "~/components/V/Modals/VModalDelete.vue";
import {useToast} from "vue-toastification";
import getFormattedError from "~/composables/getFormattedError.ts";

const errorsStore = useErrorsStore();

const {fetchResult, fetchRequest} = useFetchRequest()
const toast = useToast();
const {addNewElement, updateLastElement, removeElement} = useAddInputsForm();

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  },
  databaseData: {
    type: Array,
    default: () => ([])
  }
});

const isActiveDelete = ref(false);
const {isLoading} = useLoading();
const formDataEntry = ref(null);
const formDataDataBase = ref(null);
const rowsNumber = computed(() => {
  return props.databaseData?.data_entries_count / props.databaseData?.entries_count;
});
watchEffect(() => {
  formDataDataBase.value = {
    name: props.databaseData.name,
    entries: formDataEntry
  }
})
watchEffect(() => {
  const ids = props.databaseData.entries.map(entry => entry.id);
  if (rowsNumber.value === 0) {
    ids.push(null);
  }
  formDataEntry.value = {
    id: ids,
    name: props.databaseData.entries.map(entry => entry.name),
    type: props.databaseData.entries.map(entry => entry.type),
  }
})
const emit = defineEmits(['closeModal', 'refreshData']);
const closeDatabaseModal = () => {
  emit('closeModal');
}
const addEntry = async (index) => {
  if (formDataEntry.value.name[index] && formDataEntry.value.type[index]) {
    updateLastElement(index, formDataEntry.value);
    addNewElement(index + 1, formDataEntry.value);
  }
}
const ElementToBeRemoved = ref({
  id: null
});

const removeEntry = async (index) => {
  if (rowsNumber.value > 0) {
    toast.error('DataBase Already Mapped ! You can only update entries');
  } else {
    console.log(formDataEntry.value.id.length);
    if (formDataEntry.value.id.length > 2) {
      if (formDataEntry.value.id[index] && !isNumber(formDataEntry.value.id[index])) {
        isActiveDelete.value = true;
        ElementToBeRemoved.value.id = formDataEntry.value.id[index];
      } else {
        removeElement(index, formDataEntry.value);
      }
    } else {
      toast.error('Entry name required');
    }
  }
}

const putDatabase = async () => {
  formDataDataBase.value.entries = {
    id: (Object.values(formDataEntry.value.id)).filter(element => element !== null),
    name: (Object.values(formDataEntry.value.name)).filter(element => element !== null),
    type: (Object.values(formDataEntry.value.type)).filter(element => element !== null),
  }
  const transformedData = {
    ...formDataDataBase.value,
    entries: formDataDataBase.value.entries.name.map((name, index) => ({
      name,
      type: formDataDataBase.value.entries.type[index],
      id: isNumber(formDataDataBase.value.entries.id[index]) ? null : formDataDataBase.value.entries.id[index],
    })),
  };
  await fetchRequest("/databases/" + props.databaseData.id, {
    method: "POST",
    body: transformedData,
    loadingName: 'updateDatabase'
  });
  if (!fetchResult?.error) {
    closeDatabaseModal();
    emit('refreshData');
    toast.success("DataBase updated successfully!");
  }
}

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
  formDataEntry.value.type[TypeSelected.keyTypes] = TypeSelected.name;
}
</script>