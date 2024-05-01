<template>
  <div class="flex justify-between px-20 py-6 bg-neutral">
    <div class="flex justify-around items-center w-[45%] text-white ">
      <div class="flex items-end font-bold">
        <NuxtLink to="/">
          Colectify
        </NuxtLink>
        <icon name="heroicons:bars-3-bottom-left" class="mx-12" />
      </div>
      <div class="w-96">
        <v-input
          id="default-search" type="search"
          classes="block w-full h-12 pl-6 text-sm text-white focus:outline-none backdrop-blur rounded-2xl bg-base-500 "
          placeholder="Search..." required
        />
      </div>
    </div>
    <div class="flex justify-around items-center w-1/5">
      <Icon name="ion:notifications" class="text-2xl text-white" />
      <nuxt-img
        class="inline-block h-10 w-10 rounded-full"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
    </div>
  </div>
</template>

<script setup>
</script>