<template>
  <div class="flex flex-col justify-start bg-gray-900 min-h-screen">
    <div class="px-8 gap-x-4 w-full mb-32">
      <div class="flex flex-col px-28">
        <div class="flex flex-col gap-y-2 py-10">
          <h2 class="text-white text-3xl">Databases</h2>
          <h4 class="text-[#4B4B4B] text-2sm">Entries Mapping</h4>
        </div>
        <div class="mb-10 flex flex-row justify-between gap-2 bg-gray-600 bg-opacity-5 py-6 px-6 rounded-3xl">
          <div class="flex flex-row justify-start gap-2 w-2/6">
            <v-search :text="selectedEntry" class="w-full" type="FilterEntries" @filter-by-name="changeDataEntry" />
            <v-dropdown :filled="true" class="w-full">
              <template #menuButton>
                <v-menu-button-text :selected-value="{name : selectedEntry}" type="Entries" />
              </template>
              <template #menuItem>
                <div v-for="selectValue in entries" :key="selectValue.id">
                  <MenuItem v-slot="{ active }">
                    <a
                      :class="[active ? 'bg-white bg-opacity-30 text-white first:rounded-t-md last:rounded-b-md' : 'text-white', 'block px-4 py-2 text-sm text-center']"
                      @click="onSelectChangeEntries({name: selectValue.name})"
                    >
                      {{ selectValue.name }}
                    </a>
                  </MenuItem>
                </div>
              </template>
            </v-dropdown>
          </div>
          <div class="flex flex-row justify-end">
            <button
              class="w-24 text-white text-2sm py-2 px-4 rounded-md bg-purple-900 hover:bg-purple-700"
              @click="filter"
            >
              <strong>
                Filter
              </strong>
            </button>
          </div>
        </div>
        <div class="px-4 sm:px-6 lg:px-8 bg-gray-600 bg-opacity-5 rounded-3xl">
          <div class="flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 relative">
              <div class="absolute bg-gray-600 bg-opacity-5 h-12 w-full top-2 rounded-t-3xl">
              </div>
              <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table class="min-w-full divide-transparent ">
                  <thead>
                    <tr v-if="isLoading.getTableHeaders">
                      <th
                        v-for="index in 11" :key="index"
                        class="py-3.5 px-3 text-left sm:pl-0 animate-pulse"
                      >
                        <div class="h-3 w-14 bg-base-975 rounded-md"></div>
                      </th>
                    </tr>
                    <tr v-else>
                      <th
                        v-for="entry in entries" :key="entry.id"
                        class="py-3.5 px-3 text-left text-xs font-semibold text-gray-100 sm:pl-0"
                      >
                        {{ entry.name }}
                      </th>
                      <th class="text-left text-xs font-semibold text-gray-100 sm:pl-0">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-base-350">
                    <template v-if="isLoading.getTableData">
                      <tr v-for="index in 12" :key="index" class="w-full">
                        <td
                          v-for="indexData in 10" :key="indexData"
                          class="whitespace-nowrap py-3.5 px-3 text-left sm:pl-0 animate-pulse"
                        >
                          <div class="h-3 w-14 bg-base-975 rounded-md"></div>
                        </td>
                        <td class="whitespace-nowrap py-3.5 pl-2 font-medium sm:pr-0 animate-pulse">
                          <button class="text-white hover:text-violet-900">
                            <div class="text-xl w-5 h-5 rounded-full bg-base-975"></div>
                          </button>
                        </td>
                      </tr>
                    </template>
                    <template v-else>
                      <template v-if="entriesData?.total > 0">
                        <tr v-for="(entryData,index) in entriesData.data" :key="index">
                          <td
                            v-for="entry_data in entryData" :key="entry_data.id"
                            class="whitespace-nowrap py-3.5 text-xsmall font-medium text-white sm:pl-0"
                          >
                            {{ entry_data.value }}
                          </td>
                          <td class="whitespace-nowrap py-3.5 pl-2 font-medium sm:pr-0">
                            <button class="text-white hover:text-violet-900" @click="editDataEntry(entryData)">
                              <Icon class="text-xl" name="material-symbols:edit-outline"></Icon>
                            </button>
                          </td>
                        </tr>
                      </template>
                      <template v-else>
                        <tr>
                          <td class="whitespace-nowrap py-3.5 text-xs font-medium text-white sm:pl-0">
                            No Data Found
                          </td>
                        </tr>
                      </template>
                    </template>
                  </tbody>
                </table>
                <v-pagination v-if="!isLoading.getTableData && links?.length > 1" :links="links" class="mt-1 mb-4" @change-data="changeDataDatabases" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-modal-update-data-entry
      :data-entry="selectedDataEntry" :is-active="isActiveUpdate" @close-modal="isActiveUpdate = false"
      @refresh-data="getDataEntries"
    />
  </div>
</template>
<script setup>
import {MenuItem} from "@headlessui/vue";
import VModalUpdateDataEntry from "~/components/V/Modals/VModalUpdateDataEntry.vue";

const route = useRoute();
const {fetchResult,fetchRequest}=useFetchRequest()
const {isLoading} = useLoading()

const selectedDataEntry = ref([]);
const selectedEntry = ref('');
const databasesData = ref();
const entriesData = ref([]);
const isActiveUpdate = ref(false);

onMounted(async () => {
  await nextTick(async () => {
    await getDatabase();
    await getDataEntries();
  });
});

const getDatabase = async () => {
  await fetchRequest("/databases/" + route.params.id,{
    loadingName: 'getTableHeaders'
  })
  if (!fetchResult.error) {
    databasesData.value = fetchResult.data
  }
}
const links = computed(() => {
  return entriesData.value?.links
})
const entries = computed(() => {
  return databasesData.value?.externalDataBase?.entries
})
let formData = reactive({});
const getDataEntries = async () => {
  await fetchRequest("/databases/dataEntries/" + route.params.id,{
    loadingName: 'getTableData'
  })
  if (!fetchResult.error) {
    entriesData.value = fetchResult.data;
  }
}
const changeDataDatabases = async (param) => {
  const url = new URL(param);
  const params = new URLSearchParams(url.search);
  const pageNumber = params.get("page");
  formData = {
    ...formData,
    page: pageNumber
  };
  await fetchRequest(!param ? "/databases/dataEntries/" + route.params.id : "/databases/dataEntries/" + route.params.id,{
    query:formData,
    loadingName: 'getTableData'
  })
  if (!fetchResult.error) {
    entriesData.value = fetchResult.data;
  }
}

const editDataEntry = async (param) => {
  selectedDataEntry.value = param;
  isActiveUpdate.value = true;
}

const onSelectChangeEntries = (param) => {
  selectedEntry.value = param.name;
}

const changeDataEntry = async (param) => {
  formData = param;
}

const filter = async () => {
  formData = {
    ...formData,
    type: selectedEntry.value
  };
  await fetchRequest("/databases/dataEntries/" + route.params.id,{
    query:formData,
    loadingName: 'getTableData'
  })
  if (!fetchResult.error) {
    entriesData.value = fetchResult.data;
  }
}
</script>