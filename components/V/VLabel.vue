<template>
  <span
    class="flex items-center justify-center px-2 py-1 text-sm mx-1"
    :class="labelClasses"
    @click="$emit('onLabelClick')"
  >
    <slot></slot>
  </span>
</template>
<script setup>
defineEmits(['onLabelClick'])
defineProps({
  labelClasses: {
    type: String,
    default: 'rounded'
  }
})
</script>

