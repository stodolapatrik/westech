<template>
  <tr @click="toggle" class="cursor-pointer bg-gray-100 hover:bg-gray-200">
    <td class="flex items-center px-4 py-2">
      <span class="mr-2">
        <svg v-if="!isExpanded" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 4v16m8-8H4"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M4 12h16"/>
        </svg>
      </span>
      <span class="font-semibold">{{ row.category }}</span>
    </td>
    <td v-for="store in stores" :key="store" class="px-4 py-2 text-center">
      {{ row.totals[store] || 0 }}
    </td>
  </tr>
</template>

<script setup>
const props = defineProps({
  row: Object,
  stores: Array,
  isExpanded: Boolean
})
const emit = defineEmits(['toggle'])

const toggle = () => {
  emit('toggle')
}
</script>