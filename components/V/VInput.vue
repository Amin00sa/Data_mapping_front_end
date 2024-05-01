<template>
  <div class=" flex flex-col w-full gap-y-2">
    <v-label v-if="label" :class="labelClasses">{{ label }}</v-label>
    <div class="relative rounded-md">
      <input
        v-if="type!=='date'" ref="input"
        :class="classes"
        :disabled="disabled"
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :step="step"
        @input="$emit('update:modelValue', $event.target.value)"
      >
    </div>
    <span v-if="error" :class="errorClasses">{{ error }}</span>
  </div>
</template>
<script setup>
const emit=defineEmits(['update:modelValue'])
const date=ref(null);
watch(date,newDate=>{
  emit('update:modelValue',newDate)
})
defineProps({
  type: {
    type: String,
    default: 'text',
  },
  step: {
    type: Number,
    default: 0.1
  },
  label: {
    type: String,
    default: '',
  },
  labelClasses: {
    type: String,
    default: 'block text-xs font-medium text-agatha-400',
  },
  placeholder: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  },
  classes: {
    type: String,
    default: '',
  },
  error: {
    type: String,
    default: '',
  },
  errorClasses: {
    type: String,
    default: 'mt-0 text-sm text-red-600 text-left',
  },
  disabled: {
    type: Boolean,
    default: false
  }

})
</script>
<style scoped lang="scss">
.dp__theme_dark {
  --dp-background-color: #212121;
  --dp-text-color: #ffffff;
  --dp-hover-color: #de1414;
  --dp-hover-text-color: #ffffff;
  --dp-hover-icon-color: #959595;
  --dp-purple-900-color: #a21de8;
  --dp-purple-900-text-color: #ffffff;
  --dp-secondary-color: #a9a9a9;
  --dp-border-color: #2d2d2d;
  --dp-menu-border-color: #2d2d2d;
  --dp-border-color-hover: #aaaeb7;
  --dp-disabled-color: #737373;
  --dp-scroll-bar-background: #212121;
  --dp-scroll-bar-color: #484848;
  --dp-success-color: #470070;
  --dp-success-color-disabled: #428f59;
  --dp-icon-color: #959595;
  --dp-danger-color: #e53935;
  --dp-highlight-color: rgba(0, 92, 178, 0.2);
}
</style>