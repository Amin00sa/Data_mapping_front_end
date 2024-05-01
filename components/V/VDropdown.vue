<template>
  <Menu as="div" class="relative">
    <slot name="menuButton"></slot>
    <transition
      enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        :class="filled?'w-full bg-black bg-opacity-70':'w-20 bg-gray-700'"
        class="absolute right-0 z-20 mt-2 origin-top-right rounded-md bg-gray-700 focus:outline-none overflow-y-auto scrollbar"
      >
        <slot name="menuItem"></slot>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup>
import {Menu, MenuItems} from '@headlessui/vue'

defineProps({
  filled: {
    type: Boolean,
    default: false
  }
});
</script>