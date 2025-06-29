<template>
  <table class="min-w-full table-auto border-collapse">
    <thead>
    <tr>
      <th class="px-4 py-2"></th>
      <SortableHeader
          v-for="store in stores"
          :key="store"
          :label="store"
          :columnKey="store"
          :currentSort="{ column: sortColumn, dir: sortDir }"
          @sort-changed="changeSort"
      />
    </tr>
    </thead>
    <tbody>
    <template v-for="row in sortedData" :key="row.category">
      <CategoryRow
          :row="row"
          :stores="stores"
          :isExpanded="expanded.has(row.category)"
          @toggle="() => toggle(row.category)"
      />
      <tr
          v-if="expanded.has(row.category)"
          v-for="child in row.children"
          :key="child.product"
          class="bg-white"
      >
        <td class="pl-12 py-1">{{ child.product }}</td>
        <td v-for="store in stores" :key="store" class="py-1 text-center">
          {{ child.sales[store] || 0 }}
        </td>
      </tr>
    </template>
    </tbody>
  </table>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePivotData } from '../composables/usePivotData'
import SortableHeader from './SortableHeader.vue'
import CategoryRow from './CategoryRow.vue'

const { stores, pivot } = usePivotData()
const sortColumn = ref(null)
const sortDir = ref(1)
const expanded = ref(new Set())

const sortedData = computed(() => {
  if (!sortColumn.value) return pivot.value
  return [...pivot.value].sort((a, b) => {
    const aVal = a.totals[sortColumn.value] || 0
    const bVal = b.totals[sortColumn.value] || 0
    return sortDir.value * (aVal - bVal)
  })
})

const changeSort = ({ columnKey }) => {
  if (sortColumn.value === columnKey) {
    sortDir.value = sortDir.value === 1 ? -1 : 1
  } else {
    sortColumn.value = columnKey
    sortDir.value = 1
  }
}

const toggle = (category) => {
  expanded.value.has(category)
      ? expanded.value.delete(category)
      : expanded.value.add(category)
}
</script>