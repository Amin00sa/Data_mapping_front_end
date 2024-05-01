<template>
  <nav v-if="links?.length > 1" class="flex items-center justify-around border-t border-base-350 sm:px-0 w-full">
    <div class="-mt-px flex w-0 flex-1 justify-start">
      <button
        v-if="previous" :disabled="!previous.url" class="flex gap-3 items-center border-t-2 border-transparent pr-1 pt-4 text-xs font-medium text-white hover:border-purple-900 hover:text-purple-900
                      disabled:hover:border-transparent disabled:hover:text-white"
        :class="{'opacity-25':!previous.url}"
        @click="handleButtonClick(previous.url)"
      >
        <Icon
          class="border rounded-full flex items-center justify-center flex-shrink-0 w-6 h-6 p-1"
          name="mingcute:arrow-left-line"
        />
        Previous
      </button>
    </div>
    <template v-if="links">
      <div v-for="(link,index) in links" :key="index" class="hidden md:-mt-px md:flex">
        <button
          v-if="link.active && link.label" aria-current="page"
          class="inline-flex items-center border-t-4 border-violet-900 px-4 pt-4 text-sm font-bold text-violet-900"
          @click="handleButtonClick(link.url)"
        >
          {{ link.label }}
        </button>
        <button
          v-if="!link.active"
          class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-bold text-white hover:border-purple-900 hover:text-purple-900"
          @click="handleButtonClick(link.url)"
        >
          {{ link.label }}
        </button>
      </div>
    </template>
    <div class="-mt-px flex w-0 flex-1 justify-end">
      <button
        v-if="next" :disabled="!next.url" class="flex gap-3 items-center border-t-2 border-transparent pl-1 pt-4 text-xs font-medium text-white hover:border-purple-900 hover:text-purple-900
               disabled:hover:border-transparent disabled:hover:text-white"
        @click="handleButtonClick(next.url)"
      >
        Next
        <Icon
          class="border rounded-full flex items-center justify-center flex-shrink-0 w-6 h-6 p-1"
          name="mingcute:arrow-right-line"
        />
      </button>
    </div>
  </nav>
  <div v-else class="block border-base-350 sm:px-0 w-full items-center justify-around border-t"></div>
</template>

<script setup>
const props = defineProps({
  links: {
    type: Array,
    default: () => ([])
  }
});
const links = computed(() => {
  return props.links
})
const previous = computed(() => {
  return links.value?.shift()
})
const next = computed(() => {
  return links.value?.pop()
})

const emit = defineEmits(['changeData']);
const handleButtonClick = (url) => {
  emit('changeData', url)
}
</script>