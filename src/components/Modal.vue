<script setup>
import CloseIcon from './icons/CloseIcon.vue'

defineProps({
  id: {
    type: String,
    default: 'modal'
  },
  title: {
    type: String,
    default: ''
  },
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
  <Transition name="slide">
    <div class="modal-container" v-if="modelValue" role="dialog" :aria-labelledby="id + 'Header'">
      <div class="modal" role="document">
        <div class="modal-header">
          <h2 :id="id + 'Header'">{{ title }}</h2>
          <button @click="close" class="close-button" aria-label="Tanca">
            <CloseIcon />
          </button>
        </div>
        <slot />
      </div>
    </div>
  </Transition>
  <Transition name="fade">
    <div class="backdrop" v-if="modelValue" @click="close" role="button" />
  </Transition>
</template>

<style lang="scss" scoped>
.modal {
  position: relative;
  font-size: var(--font-size-sm);
  background: var(--white);
  color: var(--black);
  border-radius: var(--border-radius);
  padding: 1rem;
  max-width: var(--view-max-width);
  margin: 0 auto;

  &-container {
    position: absolute;
    top: var(--view-padding);
    left: var(--view-padding);
    right: var(--view-padding);
    z-index: 100;
  }

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    h2 {
      margin: 0;
      line-height: 1;
      font-size: var(--font-size-md);
    }
  }

  .close-button {
    font-size: var(--font-size-md);
    color: inherit;
    padding: 1rem;
    margin: -1rem;
    display: flex;
    align-items: center;
  }
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--orange);
  z-index: 99;
}

.slide-enter-active,
.slide-leave-active {
  transition: 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-110%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>