<template>
  <div class="animate-pulse">
    <div class="flex flex-col justify-between bg-gray-800 h-48 rounded-2xl">
      <div class="flex flex-col justify-center items-center h-24 mt-4">
        <div class="flex flex-row w-full justify-center gap-3">
          <div class="bg-gray-600 rounded-full p-3 flex items-center justify-center w-16 h-16">
            <div class="text-amber-50 text-2xl" />
          </div>
          <div class="flex flex-col mt-2.5 gap-y-1.5">
            <div class="bg-white bg-opacity-20 h-2 w-28 rounded"></div>
            <div class="bg-white h-2.5 w-36 rounded">
            </div>
            <div class="bg-white opacity-50 h-2 w-32 rounded">
            </div>
          </div>
          <div class="bg-gray-600 rounded-full flex items-center justify-center w-4 h-4">
            <div class="text-amber-50 w-3 h-3" />
          </div>
        </div>
      </div>
      <div class="flex items-center w-full bg-opacity-10 bg-gray-600 rounded-2xl px-4 p-2 h-12 gap-2">
        <span v-for="index in 2" :key="index" class="bg-opacity-20 bg-gray-600 rounded-2xl text-white px-4 py-1 text-sm h-7 w-20"></span>
      </div>
    </div>
  </div>
</template>
<script setup>
</script>