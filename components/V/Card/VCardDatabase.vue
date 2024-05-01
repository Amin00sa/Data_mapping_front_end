<template>
  <div class="relative">
    <div
      :class="isSelected?'bg-purple-900':'bg-gray-800'"
      class="flex flex-col justify-between rounded-2xl cursor-pointer h-48"
      @click="addDatabase"
    >
      <div class="flex  justify-between items-start h-full relative px-3 pt-8">
        <div class="flex flex-row w-full justify-satrt  items-center gap-x-3">
          <div class="bg-gray-600 rounded-full flex items-center justify-center w-14 h-14">
            <Icon class="text-purple-900 text-2xl" name="solar:database-broken" />
          </div>
          <div class="text-left flex gap-1 items-center justify-start flex-col">
            <p class="text-white text-xs opacity-20 line-clamp-1 w-40">Database {{ index }}</p>
            <strong class="text-white text-md font-medium line-clamp-1 w-40 capitalize tracking-xlarge">{{ database?.name }}</strong>
          </div>
        </div>
        <p class="text-white text-xs opacity-50 absolute z-0 right-[17px] bottom-[9px]">{{ timeFormatted.value }}</p>
      </div>
      <div class="flex items-center w-full bg-gray-600 bg-opacity-10 rounded-2xl px-4 p-2 h-12 gap-2">
        <v-label-card :number="database?.entries_count" />
        <v-label-card :number="RowsNumber" />
      </div>
    </div>
    <div v-if="!props.enableFiles" class="absolute top-8 right-1">
      <v-dropdown :select-values="actions" icon="ph:dots-three-vertical-bold">
        <template #menuButton>
          <MenuButton
            class="flex items-center rounded-full bg-transparent text-white hover:text-gray-600"
          >
            <span class="sr-only">Open options</span>
            <EllipsisVerticalIcon aria-hidden="true" class="w-6" />
          </MenuButton>
        </template>
        <template #menuItem>
          <div v-for="selectValue in actions" :key="selectValue.id">
            <MenuItem v-slot="{ active }">
              <a
                :class="[active ? 'bg-white bg-opacity-30 text-white first:rounded-t-md last:rounded-b-md' : 'text-white', 'block px-4 py-2 text-sm text-center cursor-pointer']"
                @click="openModal(selectValue.value)"
              >
                {{ selectValue.value }}
              </a>
            </MenuItem>
          </div>
        </template>
      </v-dropdown>
    </div>
  </div>
  <v-modal-update-data-base
    :database-data="database" :is-active="isActiveUpdate" @close-modal="isActiveUpdate = false"
    @refresh-data="refreshData"
  />
  <v-modal-delete
    :data="database" :is-active="isActiveDelete" @close-modal="isActiveDelete = false"
    @refresh-data="refreshData"
  />
</template>
<script setup>
import { useDateFormat } from '@vueuse/core'
import {MenuButton, MenuItem} from "@headlessui/vue";
import {EllipsisVerticalIcon} from "@heroicons/vue/20/solid/index.js";
import VModalUpdateDataBase from "~/components/V/Modals/VModalUpdateDataBase.vue";
import VModalDelete from "~/components/V/Modals/VModalDelete.vue";
import {useToast} from "vue-toastification";

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  enableFiles: {
    type: Boolean,
    default: false
  },
  database: {
    type: Array,
    default: () => ([])
  },
  index: {
    type: String,
    default: ''
  },
  selectedId: {
    type: String,
    default: ''
  }
});
const isActiveUpdate = ref(false);
const isActiveDelete = ref(false);
const isSelected = computed(() => {
  return props.selectedId === props.database.id
})

const emit = defineEmits(['addDatabase', 'refreshData']);
const toast = useToast();
const actions = [
  {
    value: 'Update'
  }, {
    value: 'Delete'
  }];

const addDatabase = () => {
  if (props.disabled && !props.enableFiles) {
    if (RowsNumber.value === 0) {
      emit('addDatabase', props.database.id);
    }
  } else {
    if (RowsNumber.value > 0) {
      navigateTo('/databases/' + props?.database?.id);
    } else {
      toast.error('DataBase Not Mapped Yet !');
    }
  }
}

const RowsNumber = computed(() => {
  return props.database?.data_entries_count / props.database?.entries_count;
});

const timeFormatted = computed(()=>{
  return useDateFormat(props.database?.created_at, 'DD/MM/YYYY');
});

watch(
    () => props.disabled,
    (ButtonMapping) => {
      ButtonMapping = props.disabled;
      if (!ButtonMapping) {
        emit('addDatabase', null);
      }
    }
);

const openModal = (selectedValue) => {
  if (selectedValue === 'Update') {
    isActiveUpdate.value = true;
  } else {
    isActiveDelete.value = true;
  }
}
const refreshData = () => {
  emit('refreshData');
}
</script>