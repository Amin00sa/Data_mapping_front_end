<template>
  <nav class="flex items-center justify-between border-t border-base-350 px-4 sm:px-0">
    <div class="-mt-px flex w-0 flex-1">
      <button
        class="flex gap-3 items-center border-t-2 border-transparent pr-1 pt-4 text-xs font-medium text-white hover:border-purple-900 hover:text-purple-900
                      disabled:hover:border-transparent disabled:hover:text-white" href="#"
      >
        <Icon
          class="border rounded-full flex items-center justify-center flex-shrink-0 w-6 h-6 p-1"
          name="mingcute:arrow-left-line"
        />
        Previous
      </button>
    </div>
    <div class="hidden md:-mt-px md:flex">
      <a
        class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-bold text-white hover:border-purple-900 hover:text-purple-900"
        href="#"
      >1</a>
      <a
        aria-current="page"
        class="inline-flex items-center border-t-4 border-violet-900 px-4 pt-4 text-sm font-bold text-violet-900"
        href="#"
      >2</a>
      <a
        class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-bold text-white hover:border-purple-900 hover:text-purple-900"
        href="#"
      >3</a>
      <span
        class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-bold text-white"
      >...</span>
      <a
        class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-bold text-white hover:border-purple-900 hover:text-purple-900"
        href="#"
      >8</a>
      <a
        class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-bold text-white hover:border-purple-900 hover:text-purple-900"
        href="#"
      >9</a>
      <a
        class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-bold text-white hover:border-purple-900 hover:text-purple-900"
        href="#"
      >10</a>
    </div>
    <div class="-mt-px flex w-0 flex-1 justify-end">
      <button
        class="flex gap-3 items-center border-t-2 border-transparent pl-1 pt-4 text-xs font-medium text-white hover:border-purple-900 hover:text-purple-900
               disabled:hover:border-transparent disabled:hover:text-white" href="#"
      >
        Next
        <Icon
          class="border rounded-full flex items-center justify-center flex-shrink-0 w-6 h-6 p-1"
          name="mingcute:arrow-right-line"
        />
      </button>
    </div>
  </nav>
</template>
<script setup>
</script>