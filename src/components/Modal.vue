<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const close = () => {
  emit('update:modelValue', false)
}
</script>

<template>
  <div class="modal" v-if="modelValue">
    <button @click="close">Close</button>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.modal {
  position: absolute;
  top: var(--view-padding);
  left: var(--view-padding);
  right: var(--view-padding);
  font-size: var(--font-size-sm);
  background: var(--white);
  color: var(--black);
  border-radius: var(--border-radius);
  padding: .5rem;
  text-align: center;

  .close-button {
    font-size: var(--font-size-sm);
    position: absolute;
    top: .25rem;
    right: .75rem;
  }
}
</style>