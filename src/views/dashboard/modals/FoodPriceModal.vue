<template>
  <div class="modal-content">
    <div class="table-wrapper">
      <el-table :data="pagedData" stripe style="width: 100%;" height="100%">
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column label="公示日期" width="110" align="center">
          <template #default="{ row }">
            {{ formatDate(row.date) }}
          </template>
        </el-table-column>
        <el-table-column prop="dish" label="菜品名称" min-width="140" />
        <el-table-column label="菜价" width="80" align="center">
          <template #default="{ row }">
            <span style="color: #f59e0b; font-weight: 600;">¥{{ row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="publisher" label="公示人员" width="90" align="center" />
        <el-table-column prop="reviewer" label="审核人员" width="90" align="center" />
      </el-table>
    </div>

    <div class="pagination-bar">
      <button class="page-btn" :disabled="currentPage <= 1" @click="prevPage">&#9664;</button>
      <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
      <button class="page-btn" :disabled="currentPage >= totalPages" @click="nextPage">&#9654;</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{ data: any[] }>()

const pageSize = 9
const currentPage = ref(1)

const totalPages = computed(() => Math.max(1, Math.ceil(props.data.length / pageSize)))

const pagedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return props.data.slice(start, start + pageSize)
})

const prevPage = () => { if (currentPage.value > 1) currentPage.value-- }
const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++ }

const formatDate = (dateStr: string) => {
  const parts = dateStr.split('-')
  if (parts.length === 2) {
    return `${parseInt(parts[0])}月${parseInt(parts[1])}日`
  }
  return dateStr
}
</script>

<style scoped>
.modal-content {
  padding: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.table-wrapper {
  flex: 1;
  overflow: hidden;
}

.pagination-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 14px 0 4px;
  flex-shrink: 0;
}

.page-btn {
  width: 32px;
  height: 32px;
  border: 1px solid rgba(71,168,228,.35);
  border-radius: 4px;
  background: rgba(4,43,73,.6);
  color: #eef8ff;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .2s;
}

.page-btn:hover:not(:disabled) {
  background: rgba(16,72,112,.9);
  border-color: rgba(54,224,255,.6);
  color: #fff;
}

.page-btn:disabled {
  opacity: .35;
  cursor: not-allowed;
  color: #556;
}

.page-info {
  font-size: 14px;
  color: #eef8ff;
  letter-spacing: 2px;
}
</style>
