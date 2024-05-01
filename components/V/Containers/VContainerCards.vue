<template>
  <div class="flex flex-col justify-between px-28">
    <div class="flex flex-col gap-y-8 py-10">
      <slot name="title"></slot>
      <div class="flex flex-col w-full justify-between gap-6">
        <div
          class="grid xxl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xxl:gap-12 lg:gap-10 md:gap-6 sm:gap-6 pb-10 w-full"
        >
          <div class="rounded-2xl col-start-1 col-end-2">
            <slot name="search"></slot>
          </div>
          <div v-if="disabled" class="xxl:col-start-3 lg:col-start-2 flex flex-row gap-2 justify-center">
            <slot name="header"></slot>
          </div>
          <slot name="cards"></slot>
        </div>
        <slot name="pagination"></slot>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
});
</script>