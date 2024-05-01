<template>
  <div>
    <div class="absolute right-20 top-28">
      <span
        v-if="!disabled && !isLoading.getDatabases"
        class="motion-safe:animate-ping z-0 absolute inline-flex h-full w-full rounded-full bg-purple-900 opacity-90"
      >
      </span>
      <button
        class="w-full text-white py-2 px-6 rounded-full bg-purple-900 flex flex-row gap-2 relative"
        @click="disabled = !disabled"
      >
        <MappingSvg />
        <p>Mapping</p>
      </button>
    </div>
    <div class="flex flex-col justify-start bg-gray-900">
      <v-container-cards :class="enableFiles?'opacity-30':''" :disabled="disabled" :enable-files="enableFiles">
        <template #title>
          <h2 class="text-white text-3xl">Databases</h2>
        </template>
        <template #header>
          <p class="text-white text-center">Select A Database To Map</p>
        </template>
        <template #search>
          <v-search text="db_base" @filter-by-name="filterDataBaseByName" />
        </template>
        <template #cards>
          <div class="col-start-1">
            <v-card-add-database :enable-files="enableFiles" @refresh-data="getDatabases" />
          </div>
          <template v-if="isLoading.getDatabases">
            <v-load-database
              v-for="index in 5"
              :key="index"
            />
          </template>
          <template v-else>
            <v-card-database
              v-for="(element,index) in databases" :key="element.id"
              :database="element" :disabled="disabled" :enable-files="enableFiles"
              :index="(index + 1 - parseInt(per_pageDatabase) + (parseInt(per_pageDatabase) * parseInt(current_pageDatabase)))"
              :selected-id="selectedElement"
              @add-database="addDatabase"
              @refresh-data="getDatabases"
            />
          </template>
        </template>
        <template #pagination>
          <v-pagination v-if="!isLoading.getDatabases" :links="linksDatabases" @change-data="changeDataDatabases" />
        </template>
      </v-container-cards>
      <div v-if="disabled" class="flex pr-28 justify-end gap-x-4">
        <button
          v-if="disabled&&!enableFiles"
          class="w-24 text-white text-2sm py-2 px-4 rounded-full bg-purple-900 hover:bg-purple-700"
          @click="enableOrDisableFiles(true)"
        >
          Next
        </button>
      </div>
      <v-container-cards
        :class="{ 'opacity-30': disabled && !enableFiles }" :disabled="disabled"
        :enable-files="enableFiles"
      >
        <template #title>
          <h2 class="text-white text-3xl">Files</h2>
        </template>
        <template #header>
          <p class="text-white text-center">Select A File To Map</p>
        </template>
        <template #search>
          <v-search text="file" @filter-by-name="filterFilesByName" />
        </template>
        <template #cards>
          <div class="col-start-1 row-span-2 flex flex-col justify-between gap-12">
            <v-card-add-file
              :disabled="disabled" :enable-files="enableFiles"
              @refresh-data="getFiles"
            />
            <v-card-connect-data-base
              :disabled="disabled" :enable-files="enableFiles"
              @refresh-data="getFiles"
            />
          </div>
          <template v-if="isLoading.getFiles">
            <v-load-file
              v-for="index in 4"
              :key="index"
            />
          </template>
          <template v-else>
            <v-card-file
              v-for="(fileUploaded,index) in files" :key="index" :disabled="disabled" :enable-files="enableFiles"
              :file="fileUploaded"
              :selected-id="selectedElement"
              @add-file="addFile"
            />
          </template>
        </template>
        <template #pagination>
          <v-pagination
            v-if="!isLoading.getFiles && linksFiles?.length > 1" :links="linksFiles"
            @change-data="changeDataFiles"
          />
        </template>
      </v-container-cards>
      <div v-if="disabled" class="flex pr-28 justify-end gap-x-4 mb-10">
        <button
          class="w-24 text-white text-2sm py-2 px-4 rounded-full border border-white hover:bg-white hover:bg-opacity-20"
          type="button"
          @click="enableOrDisableFiles(false)"
        >
          Previous
        </button>
        <button
          v-if="disabled&&enableFiles"
          class="w-24 text-white text-2sm py-2 px-4 rounded-full bg-purple-900 hover:bg-purple-700"
          @click="navigateToMapping"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {MappingSvg} from "~/components/icons";
import VContainerCards from "~/components/V/Containers/VContainerCards.vue";

const {selectedElement, selectIfNotExist} = useSelectOption();
const {fetchResult, fetchRequest} = useFetchRequest()
const {isLoading} = useLoading()

const databasesData = ref();
const filesData = ref();
const disabled = ref(false);
const database = ref(null);
const file = ref(null);
const enableFiles = ref(false);

onMounted(async () => {
  await nextTick(async () => {
    await getDatabases();
    await getFiles();
  });
});

const getDatabases = async () => {
  await fetchRequest("/databases/", {
    loadingName: 'getDatabases',
    query: {
        'include': 'entries,entriesCount,dataEntriesCount'
    }
  })
  if (!fetchResult.error) {
    databasesData.value = fetchResult.data
  }
}
const databases = computed(() => {
  return databasesData.value?.externalDataBases
})
const linksDatabases = computed(() => {
  return databasesData.value?.meta?.links;
})
const current_pageDatabase = computed(() => {
  return databasesData.value?.meta?.current_page;
})
const per_pageDatabase = computed(() => {
  return databasesData.value?.meta?.per_page;
})
const enableOrDisableFiles = (param) => {
  enableFiles.value = param;
};

const filterDataBaseByName = async (formData) => {
  await fetchRequest("/databases/", {
    query: {
      'filter[name]': formData.name,
      'include': 'entries,entriesCount,dataEntriesCount'
    },
    loadingName: 'getDatabases'
  })
  if (!fetchResult.error) {
    databasesData.value = fetchResult.data
  }
}

const changeDataDatabases = async (param) => {
  await fetchRequest(param ? param : "/databases/", {
    loadingName: 'getDatabases'
  })
  if (!fetchResult.error) {
    databasesData.value = fetchResult.data
  }
}

const addDatabase = (id_Database) => {
  selectIfNotExist(id_Database);
  database.value = id_Database;
}

const getFiles = async () => {
  await fetchRequest("/files/", {
    loadingName: 'getFiles'
  })
  if (!fetchResult.error) {
    filesData.value = fetchResult.data
  }
}

const files = computed(() => {
  return filesData.value?.files
})
const linksFiles = computed(() => {
  return filesData.value?.meta?.links;
})

const changeDataFiles = async (param) => {
  await fetchRequest(param ? param : "/files/", {
    loadingName: 'getFiles'
  })
  if (!fetchResult.error) {
    filesData.value = fetchResult.data
  }
}

const filterFilesByName = async (formData) => {
  await fetchRequest("/files/", {
    query: {'filter[name]': formData.name}
  })
  if (!fetchResult.error) {
    filesData.value = fetchResult.data
  }
}
const addFile = (id_File) => {
  selectIfNotExist(id_File);
  file.value = id_File;
}

const navigateToMapping = async () => {
  if (file && database)
    await navigateTo({
      path: '/databases/', query: {
        database: database.value,
        file: file.value,
      }
    });
}
</script>
