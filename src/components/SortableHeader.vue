<template>
  <th class="cursor-pointer select-none px-4 py-2 relative">
    <span
        v-if="isActive"
        @click.stop="onReset"
        class="-top-5 w-full text-center font-light text-xs text-red-500 hover:underline"
    >
      reset
    </span>

    <div class="flex items-center" @click="onClick">
      <span class="w-full text-center">{{ label }}</span>
      <span v-if="isActive" class="ml-1">
        <svg v-if="dir === 1" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5 12l5-5 5 5H5z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5 8l5 5 5-5H5z" />
        </svg>
      </span>
    </div>
  </th>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: String,
  columnKey: String,
  currentSort: Object
})
const emit = defineEmits(['sort-changed'])

const isActive = computed(() => props.currentSort.column === props.columnKey)
const dir = computed(() => props.currentSort.dir)

const onClick = () => {
  emit('sort-changed', { columnKey: props.columnKey })
}

const onReset = () => {
  emit('sort-changed', { columnKey: null })
}
</script>