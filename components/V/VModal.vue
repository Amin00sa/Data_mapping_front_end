<template>
  <Teleport to="body">
    <TransitionRoot :show="isActive" appear as="template">
      <Dialog as="div" class="relative z-10" @close="$emit('closeModal')">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-60" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center text-white"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="transform overflow-hidden rounded-3xl bg-gray-900 text-right p-7 py-10 align-middle shadow-xl transition-all"
              >
                <slot></slot>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </Teleport>
</template>
<script setup>
import {Dialog, DialogPanel, TransitionChild, TransitionRoot} from "@headlessui/vue";

defineProps({
  isActive: Boolean
})
defineEmits(['closeModal']);
</script>


