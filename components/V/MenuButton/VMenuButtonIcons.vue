<template>
  <MenuButton
    class="flex items-center rounded-md p-3 bg-gray-800 text-white hover:text-gray-600 w-full h-20"
  >
    <div class="ml-2 flex flex-row justify-between w-full">
      <div class="flex flex-row gap-3">
        <div class="flex items-center justify-center ">
          <div v-if="selectedValue?.name">
            <Icon
              v-if="selectedValue?.name?.includes('csv')" class="text-amber-50 text-3xl"
              name="vscode-icons:file-type-excel"
            />
            <Icon
              v-else-if="selectedValue?.name.includes('xml')" class="text-bleu-200 text-3xl"
              name="tabler:file-type-xml"
            />
            <SqlSvg v-else-if="selectedValue?.name?.includes('sql')" />
            <div v-else class="bg-gray-600 rounded-full flex items-center justify-center w-10 h-10">
              <Icon class="text-purple-900 text-2xl" name="solar:database-broken" />
            </div>
          </div>
          <div v-else>
            <div class="w-10 h-10 bg-white/40 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div class="flex flex-col">
          <strong class="text-white text-left text-2sm line-clamp-1 w-full">{{ selectedValue.name }}</strong>
          <p v-if="selectedValue?.created_at" class="text-white text-left text-xsmall opacity-50 tracking-largest">
            {{ createdAt }}
          </p>
          <div v-else class="flex flex-col gap-4 mt-1">
            <div class="w-16 h-2 bg-white/50 animate-pulse rounded-2xl">
            </div>
            <div class="w-36 h-2 bg-white/30 animate-pulse rounded-2xl">
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col justify-center">
        <ChevronDownIcon aria-hidden="true" class="h-5 w-5" />
      </div>
    </div>
  </MenuButton>
</template>
<script setup>
import { useDateFormat } from '@vueuse/core'
import {MenuButton} from "@headlessui/vue";
import {ChevronDownIcon} from "@heroicons/vue/20/solid";
import {SqlSvg} from "~/components/icons";

const props = defineProps({
  selectedValue: {
    type: Object,
    default: () => ({})
  }
});

const createdAt = computed(() => {
  return useDateFormat(props?.selectedValue?.created_at, 'DD/MM/YYYY').value;
});
</script>