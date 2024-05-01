<template>
  <v-modal :is-active="isActive" @close-modal="closeModal">
    <div class="flex flex-col gap-6 w-600">
      <div class="flex flex-col justify-start  w-full">
        <span class="text-white block font-medium text-left mb-10">Connect a Database</span>
        <div class="py-6">
          <div class="relative ">
            <v-label
              for="name"
              label-classes="absolute -top-3 left-2 inline-block bg-gray-900 px-1 text-xs font-medium z-10"
            >
              DataBase
              Name
            </v-label>
            <v-input
              id="name" v-model="formData.database"
              classes="block w-full rounded-lg h-12 border border-white pl-4 bg-transparent text-white shadow-sm placeholder:text-gray-400 focus:border-purple-900 sm:text-sm sm:leading-6"
              name="name"
              placeholder="database"
              type="text"
              :error="getFormattedError(errorsStore?.errors?.database)"
            />
          </div>
        </div>

        <div class="flex flex-col  w-full divide-y divide-base-325">
          <div class="flex flex-row justify-between gap-3 py-6">
            <div class="relative w-full">
              <v-label
                for="hostname"
                label-classes="absolute -top-3 left-2 inline-block bg-gray-900 px-1 text-xs font-medium z-10"
              >
                Hostname
              </v-label>
              <v-input
                id="hostname" v-model="formData.host"
                classes="block w-full rounded-lg h-12 border border-white pl-4 bg-transparent text-white shadow-sm placeholder:text-gray-400 focus:border-purple-900 sm:text-sm sm:leading-6"
                name="hostname"
                placeholder="Hostname"
                type="text"
                :error="getFormattedError(errorsStore?.errors?.host)"
              />
            </div>
            <div class="relative w-80">
              <v-dropdown :filled="true">
                <template #menuButton>
                  <v-menu-button-text :selected-value="{name : formData.driver}" type="typesData" />
                </template>
                <template #menuItem>
                  <div v-for="selectValue in typesDataBase" :key="selectValue.id">
                    <MenuItem v-slot="{ active }">
                      <a
                        :class="[active ? 'bg-white bg-opacity-30 text-white first:rounded-t-md last:rounded-b-md' : 'text-white', 'block px-4 py-2 text-sm text-center']"
                        @click="onSelectChangeTypeDataBase({name: selectValue.value})"
                      >
                        {{ selectValue.value }}
                      </a>
                    </MenuItem>
                  </div>
                </template>
              </v-dropdown>
              <span v-if="errorsStore?.errors?.driver" class="mt-0 text-sm text-red-600 text-left">{{ getFormattedError(errorsStore?.errors?.driver) }}</span>
            </div>
            <div class="relative w-36">
              <v-label
                for="port"
                label-classes="absolute -top-3 left-2 inline-block bg-gray-900 px-1 text-xs font-medium z-10"
              >
                Port
              </v-label>
              <v-input
                id="database" v-model="formData.port"
                classes="block w-full rounded-lg border border-white pl-4 h-12 bg-transparent text-white shadow-sm placeholder:text-gray-400 focus:border-purple-900 sm:text-sm sm:leading-6"
                name="port"
                placeholder="Port"
                type="text"
                :error="getFormattedError(errorsStore?.errors?.port)"
              />
            </div>
          </div>
          <div class="flex flex-row justify-between gap-3 py-6">
            <div class="relative w-full">
              <v-label
                for="authentication"
                label-classes="absolute -top-3 left-2 inline-block bg-gray-900 px-1 text-xs font-medium z-10"
              >
                Table Name
              </v-label>
              <v-input
                id="authentication" v-model="formData.name"
                classes="block w-full rounded-lg h-12 border border-white pl-4 bg-transparent text-white shadow-sm placeholder:text-gray-400 focus:border-purple-900 sm:text-sm sm:leading-6"
                name="authentication"
                placeholder="table"
                type="text"
                :error="getFormattedError(errorsStore?.errors?.name)"
              />
            </div>
            <div class="relative w-72">
              <v-label
                for="username"
                label-classes="absolute -top-3 left-2 inline-block bg-gray-900 px-1 text-xs font-medium z-10"
              >
                Username
              </v-label>
              <v-input
                id="username" v-model="formData.username"
                classes="block w-full rounded-lg h-12 border border-white pl-4 bg-transparent text-white shadow-sm placeholder:text-gray-400 focus:border-purple-900 sm:text-sm sm:leading-6"
                name="username"
                placeholder="Username"
                type="text"
                :error="getFormattedError(errorsStore?.errors?.username)"
              />
            </div>
            <div class="relative w-72">
              <v-label
                for="password"
                label-classes="absolute -top-3 left-2 inline-block bg-gray-900 px-1 text-xs font-medium z-10"
              >
                Password
              </v-label>
              <v-input
                v-if="showPassword" id="password" v-model="formData.password"
                classes="block w-full rounded-lg h-12 border border-white pl-4 bg-transparent text-white shadow-sm placeholder:text-gray-400 focus:border-purple-900 sm:text-sm sm:leading-6"
                name="password"
                placeholder="Password"
                type="text"
              />
              <v-input
                v-else id="password" v-model="formData.password"
                classes="block w-full rounded-lg h-12 border border-white pl-4 bg-transparent text-white shadow-sm placeholder:text-gray-400 focus:border-purple-900 sm:text-sm sm:leading-6"
                name="password"
                placeholder="Password"
                type="password"
              />
              <Icon
                class="absolute text-white right-3 top-3.5 text-xl cursor-pointer" name="formkit:eye"
                @click="showPassword = !showPassword"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-end gap-x-4">
        <button
          :class="[isLoading.connectDatabase?'cursor-not-allowed py-1':'py-2','w-24 text-white text-2sm px-4 rounded-full border border-white/30 hover:bg-white/20 outline-0 leading-none']"
          :disabled="isLoading.connectDatabase"
          type="button" @click="connectDataBase"
        >
          <span v-if="isLoading.connectDatabase">
            <Icon name="line-md:loading-twotone-loop" class="text-2xl" />
          </span>
          <span v-else>
            Connect
          </span>
        </button>
        <button
          :class="[isLoading.saveDatabase?'cursor-not-allowed py-1':'py-2','w-24 text-white text-2sm px-4 rounded-full bg-purple-900 hover:bg-purple-700 outline-0 leading-none']"
          :disabled="isLoading.saveDatabase"
          @click="saveDataBase"
        >
          <span v-if="isLoading.saveDatabase">
            <Icon name="line-md:loading-twotone-loop" class="text-2xl" />
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
import {MenuItem} from "@headlessui/vue";
import {useToast} from "vue-toastification";
import getFormattedError from "~/composables/getFormattedError.ts";

defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
});

let formData = reactive({
  database: '',
  host: '',
  driver: 'Database Type',
  port: '',
  name: '',
  username: '',
  password: ''
});
const emit = defineEmits(['closeDatabaseModal', 'closeModal', 'refreshData']);
const {fetchResult, fetchRequest} = useFetchRequest()
const toast = useToast();
const {isLoading} = useLoading();
const errorsStore = useErrorsStore()
const showPassword = ref(false);
const closeModal = () => {
  emit('closeModal');
}

const saveDataBase = async () => {
  if (formData.driver !== 'Database Type') {
    await fetchRequest("/connections/", {
      method:"POST",
      body:formData,
      loadingName: 'saveDatabase'
    });
    if (!fetchResult?.error) {
      closeModal();
      toast.success("File SQL downloaded from DataBases successfully!");
      formData = useEmptyForm(formData);
      formData.driver = 'Database Type';
    }
    emit('refreshData');
  } else {
    toast.error("The type database field is required");
  }
}

const connectDataBase = async () => {
  if (formData.driver !== 'Database Type') {
    await fetchRequest("/connections/connect/", {
      method:"POST",
      body:formData,
      loadingName: 'connectDatabase'
    });
    if (!fetchResult?.error) {
      toast.success("Connection Established Successfully");
    }
  } else {
    toast.error("The type database field is required");
  }
}

const typesDataBase = reactive([
  {
    value: 'mysql'
  }, {
    value: 'sqlite'
  },
  {
    value: 'pgsql'
  }, {
    value: 'sqlsrv'
  }
]);

const onSelectChangeTypeDataBase = (TypeSelected) => {
  formData.driver = TypeSelected.name;
}
</script>