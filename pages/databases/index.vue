<template>
  <div :class="entries.length<10?'h-screen':'h-full'" class="flex flex-col justify-start bg-gray-900">
    <div class="px-8 gap-x-4 w-full mb-32">
      <div class="flex flex-col px-28">
        <div class="flex flex-col gap-y-2 py-10">
          <h2 class="text-white text-3xl">Databases</h2>
          <h4 class="text-[#4B4B4B] text-2sm">Entries Mapping</h4>
        </div>
        <div class="flex flex-row w-full">
          <div :class="!switchRows?'flex-row':'flex-row-reverse'" class="flex justify-center w-full xxl:px-36 lg:px-10 gap-0">
            <div class="relative flex flex-col gap-8 w-full max-w-[536px]">
              <v-dropdown :filled="true">
                <template #menuButton>
                  <v-menu-button-icons :selected-value="selectedDatabase" />
                </template>
                <template #menuItem>
                  <div class="flex flex-col justify-center items-center">
                    <v-search class="w-96 my-3" text="db_base" @filter-by-name="filterByNameDatabase" />
                    <div v-for="selectValue in databases" :key="selectValue.id" class="w-full">
                      <MenuItem v-slot="{ active }">
                        <a
                          :class="[active ? 'bg-white bg-opacity-30 text-white first:rounded-t-md last:rounded-b-md' : 'text-white', 'block px-4 py-2 text-sm text-center']"
                          @click="onSelectChangeDatabase({id: selectValue.id, name: selectValue.value, created_at: selectValue.created_at})"
                        >
                          {{ selectValue.value }}
                        </a>
                      </MenuItem>
                    </div>
                  </div>
                </template>
              </v-dropdown>
              <div
                :class="!switchRows?'-left-10':'-right-10'"
                class="absolute bg-gray-600 bg-opacity-10 rounded-full flex items-center justify-center w-7 h-7 top-10 cursor-pointer"
              >
                <Icon class="text-white text-2sm" name="tabler:reload" @click="getDatabase(selectedDatabase.id)" />
              </div>
              <div v-for="(entry,index) in entries" :key="entry.id">
                <button
                  class="flex items-center rounded-md p-3 bg-gray-600 bg-opacity-10 text-white hover:text-gray-600 w-full h-10"
                  type="button"
                >
                  <div class="flex flex-row justify-between w-full">
                    <div class="flex items-center justify-center mx-3">
                      <strong
                        class="text-white text-left text-xs line-clamp-1 w-40"
                      >{{ entries[index].value }}
                      </strong>
                    </div>
                  </div>
                </button>
              </div>
            </div>
            <div class="w-64 mt-3">
              <div class="flex flex-col justify-center items-center gap-[3.6rem]">
                <div
                  class="bg-gray-600 bg-opacity-10 rounded-full h-8 w-8 flex items-center justify-center mt-4 cursor-pointer mb-2"
                  @click="switchRows = !switchRows"
                >
                  <div>
                    <Icon class="text-white text-xl" name="mi:switch" />
                  </div>
                </div>
                <div v-for="entry in entries" :key="entry.id" class="xxl:w-64 lg:w-44">
                  <IntersectingLine />
                </div>
              </div>
            </div>
            <div class="relative flex flex-col gap-8 w-full max-w-[536px]">
              <v-dropdown :filled="true">
                <template #menuButton>
                  <v-menu-button-icons :selected-value="selectedFile" />
                </template>
                <template #menuItem>
                  <div class="flex flex-col justify-center items-center">
                    <v-search class="w-96 my-3" text="file" @filter-by-name="filterByNameFile" />
                    <div v-for="selectValue in files" :key="selectValue.id" class="w-full">
                      <MenuItem v-slot="{ active }">
                        <a
                          :class="[active ? 'bg-white bg-opacity-30 text-white first:rounded-t-md last:rounded-b-md' : 'text-white', 'block px-4 py-2 text-sm text-center']"
                          @click="onSelectChangeFile({id: selectValue.id, name: selectValue.value, created_at: selectValue.created_at})"
                        >
                          {{ selectValue.value }}
                        </a>
                      </MenuItem>
                    </div>
                  </div>
                </template>
              </v-dropdown>
              <div
                :class="!switchRows?'-right-10':'-left-10'"
                class="absolute bg-gray-600 bg-opacity-10 rounded-full flex items-center justify-center w-7 h-7 top-10 cursor-pointer"
                @click="getFile(selectedFile.id)"
              >
                <Icon class="text-white text-2sm" name="tabler:reload" />
              </div>
              <div
                :class="!switchRows?'-right-20':'-left-20'"
                class="absolute bg-gray-600 rounded-full flex items-center justify-center w-7 h-7 top-10 cursor-pointer"
                @click="isActiveAddFile = true"
              >
                <UploadSvg />
              </div>
              <div v-for="(entry,index) in entries" :key="entry.id">
                <v-dropdown :filled="true">
                  <template #menuButton>
                    <v-menu-button-text :selected-value="headerSelected[index]" type="Entries" />
                  </template>
                  <template #menuItem>
                    <div class="max-h-48">
                      <div v-for="selectValue in headersValue" :key="selectValue.id">
                        <MenuItem v-slot="{ active }">
                          <a
                            :class="[active ? 'bg-white bg-opacity-30 text-white first:rounded-t-md last:rounded-b-md' : 'text-white', 'block px-4 py-2 text-sm text-center']"
                            @click="onSelectChangeHeader({name: selectValue.value, keyHeader: index})"
                          >
                            {{ selectValue.value }}
                          </a>
                        </MenuItem>
                      </div>
                    </div>
                  </template>
                </v-dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex pr-28 justify-end gap-x-4 mb-10">
      <NuxtLink :to="'/'">
        <button
          class="w-24 text-white text-2sm py-2 px-4 rounded-full border border-white hover:bg-white hover:bg-opacity-20"
          type="button"
        >
          Previous
        </button>
      </NuxtLink>
      <button
        class="w-24 text-white text-2sm py-2 px-4 rounded-full bg-purple-900 hover:bg-purple-700"
        @click="isActive = true"
      >
        Save
      </button>
    </div>
    <v-modal-save-database
      :data-tronsformed="dataTronsformed" :file="selectedFile" :is-active="isActive"
      :selected-database="selectedDatabase" @close-modal="isActive = false"
    />
    <v-modal-add-file :is-active="isActiveAddFile" @close-modal="isActiveAddFile = false" @refresh-data="refreshData" />
  </div>
</template>

<script setup>
import {
  IntersectingLine,
  MappingSvg,
  UploadSvg
} from "~/components/icons";
import {MenuItem} from "@headlessui/vue";
import VModalSaveDatabase from "~/components/V/Modals/VModalSaveDatabase.vue";
import VModalAddFile from "~/components/V/Modals/VModalAddFile.vue";
import {useToast} from "vue-toastification";

const switchRows = ref(false);
const isActive = ref(false);
const isActiveAddFile = ref(false);
const databasesData = ref();
const filesData = ref();
const selectedDatabase = ref({
  id: '',
  name: '',
  created_at: '',
  entries: []
});
const selectedFile = ref({
  id: '',
  name: '',
  headers: '',
  path_file: '',
  created_at: ''
});
const headerSelected = ref([]);
const dataTronsformed = ref([]);

const {fetchResult,fetchRequest}=useFetchRequest()

const toast = useToast();
const route = useRoute();

onMounted(async () => {
  await nextTick(async () => {
    await getDatabases();
    await getFiles();
    await getDatabase(route.query.database);
    await getFile(route.query.file);
  });
});

const getFiles = async () => {
  await fetchRequest("/files/")
  if (!fetchResult.error) {
    filesData.value = fetchResult.data
  }
}

const getFile = async (id) => {
  await fetchRequest("/files/" + id)
  if (!fetchResult.error) {
    selectedFile.value.id = fetchResult.data?.file?.id;
    selectedFile.value.name = fetchResult.data?.file?.name;
    selectedFile.value.headers = fetchResult.data?.file?.headers;
    selectedFile.value.created_at = fetchResult.data?.file?.created_at;
    selectedFile.value.path_file = fetchResult.data?.file?.path_file;
    toast.success('File loaded !');
  } else {
    toast.error(fetchResult.error);
  }
}

const files = computed(() => {
  return filesData.value?.files?.map(item => ({
    id: item.id,
    value: item.name,
    created_at: item.created_at
  }));
})

const getDatabases = async () => {
  await fetchRequest("/databases/")
  if (!fetchResult.error) {
    databasesData.value = fetchResult.data
  }
}

const getDatabase = async (id) => {
  await fetchRequest("/databases/" + id)
  if (!fetchResult.error) {
    if (fetchResult.data?.externalDataBase?.data_entries_count === 0) {
      selectedDatabase.value.name = fetchResult.data?.externalDataBase?.name;
      selectedDatabase.value.created_at = fetchResult?.data?.externalDataBase?.created_at;
      selectedDatabase.value.entries = fetchResult?.data?.externalDataBase?.entries;
      toast.success('DataBase loaded !');
    } else {
      toast.error('DataBase Already Mapped !');
    }
  }
  initialiseHeaderSelected();
}

const databases = computed(() => {
  return databasesData.value?.externalDataBases?.map(item => ({
    id: item.id,
    value: item.name,
    created_at: item.created_at,
  }));
})

const entries = computed(() => {
  return selectedDatabase?.value?.entries?.map(item => ({
    id: item.id,
    value: item.name,
  }));
})
const initialiseHeaderSelected = () => {
  let i;
  headerSelected.value = ([]);
  dataTronsformed.value = ([]);
  for (i = 0; i < entries.value.length; i++) {
    headerSelected.value.push({name: ''});
    dataTronsformed.value.push({
      entryId: entries.value[i].id,
      header: ''
    });
  }
}

const onSelectChangeHeader = (HeaderSelected) => {
  let count = 0;
  headerSelected.value.map(item => {
    if (item.name === HeaderSelected.name) {
      count++;
    }
  });
  if (count === 0) {
    headerSelected.value[HeaderSelected.keyHeader].name = HeaderSelected.name;
    dataTronsformed.value[HeaderSelected.keyHeader].header = HeaderSelected.name;
  } else {
    toast.error('Element already selected !');
  }
}

const onSelectChangeFile = (FileSelected) => {
  selectedFile.value.id = FileSelected.id;
  selectedFile.value.name = FileSelected.name;
  selectedFile.value.created_at = FileSelected.created_at;
}

const onSelectChangeDatabase = (DataBaseSelected) => {
  selectedDatabase.value.id = DataBaseSelected.id;
  selectedDatabase.value.name = DataBaseSelected.name;
  selectedDatabase.value.created_at = DataBaseSelected.created_at;
}

const filterByNameDatabase = async (formData) => {
  await fetchRequest("/databases/", formData)
  if (!fetchResult.error) {
    databasesData.value = fetchResult.data
  }
}

const filterByNameFile = async (formData) => {
  await fetchRequest("/files/", formData)
  if (!fetchResult.error) {
    filesData.value = fetchResult.data
  }
}

const refreshData = async () => {
  selectedFile.value.id = null;
  selectedFile.value.name = null;
  selectedFile.value.created_at = null;
  await getFiles()
}

const headersValue = computed(() => {
  const headers = JSON.parse(selectedFile.value.headers);
  const result = [];
  headers.forEach(header => {
    result.push({value: header});
  });
  return result;
});
</script>