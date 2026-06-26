<template>
  <div class="modal-content">
    <!-- 左侧 -->
    <div class="left-side">
      <!-- 冰箱温度卡片 -->
      <div class="fridge-card">
        <div class="fridge-icon">
          <svg viewBox="0 0 48 48" width="28" height="28" fill="none" stroke="#36e0ff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 42h20c3.3 0 6-2.7 6-6V12c0-3.3-2.7-6-6-6H14c-3.3 0-6 2.7-6 6v24c0 3.3 2.7 6 6 6z"/>
            <path d="M12 18h24M12 30h24"/>
          </svg>
        </div>
        <div class="fridge-info">
          <div class="fridge-temp">{{ data.days[0]?.fridgeTemp || '5°C' }}</div>
          <div class="fridge-label">留样冰箱</div>
        </div>
      </div>

      <!-- 日期卡片 -->
      <div v-for="day in data.days" :key="day.date" class="day-card-row">
        <div class="day-row-left">
          <div class="day-row-icon">
            <svg viewBox="0 0 48 48" width="26" height="26" fill="none" stroke="#36e0ff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="8" y="14" width="32" height="28" rx="3"/>
              <path d="M16 6v8M32 6v8M8 22h32"/>
            </svg>
          </div>
          <div class="day-row-date">{{ day.date }}</div>
        </div>
        <div class="day-row-tags">
          <div
            v-for="meal in day.meals"
            :key="meal.mealType"
            :class="['meal-tag', meal.status === '已消样' ? 'meal-tag--done' : '']"
          >
            {{ meal.mealType }} {{ meal.status }}
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧表格 -->
    <div class="right-side">
      <div class="table-wrapper">
        <table class="storage-detail-table">
          <thead>
            <tr>
              <th class="col-seq">序号</th>
              <th>开门日期</th>
              <th>开门时间</th>
              <th>开门人员</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in pagedData" :key="item.id">
              <td class="col-seq">{{ (currentPage - 1) * pageSize + index + 1 }}</td>
              <td>{{ item.openDate }}</td>
              <td>{{ item.openTime }}</td>
              <td>{{ item.opener }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pagination-bar">
        <button class="page-btn" :disabled="currentPage <= 1" @click="prevPage">&#9664;</button>
        <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
        <button class="page-btn" :disabled="currentPage >= totalPages" @click="nextPage">&#9654;</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{ data: { days: any[]; records: any[] } }>()

const pageSize = 9
const currentPage = ref(1)

const totalPages = computed(() => Math.max(1, Math.ceil(props.data.records.length / pageSize)))

const pagedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return props.data.records.slice(start, start + pageSize)
})

const prevPage = () => { if (currentPage.value > 1) currentPage.value-- }
const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++ }
</script>

<style scoped>
.modal-content {
  padding: 0;
  display: flex;
  gap: 12px;
  height: 100%;
  overflow: hidden;
}

/* 左侧 */
.left-side {
  width: 170px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
}

.fridge-card {
  background: rgba(8, 30, 52, 0.72);
  border: 1px solid rgba(71, 168, 228, 0.22);
  border-radius: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.fridge-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(54, 224, 255, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(4, 43, 73, 0.5);
  flex-shrink: 0;
}

.fridge-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.fridge-temp {
  font-size: 20px;
  font-weight: 800;
  color: #fff;
  line-height: 1.1;
}

.fridge-label {
  font-size: 11px;
  color: #8899aa;
}

.day-card-row {
  background: rgba(8, 30, 52, 0.72);
  border: 1px solid rgba(71, 168, 228, 0.22);
  border-radius: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-height: 0;
}

.day-row-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.day-row-icon {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid rgba(54, 224, 255, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(4, 43, 73, 0.5);
}

.day-row-date {
  font-size: 11px;
  font-weight: 700;
  color: #eef8ff;
  white-space: nowrap;
}

.day-row-tags {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.meal-tag {
  padding: 3px 6px;
  border-radius: 4px;
  background: rgba(67, 233, 123, 0.15);
  border: 1px solid rgba(67, 233, 123, 0.25);
  color: #fff;
  font-size: 10px;
  text-align: center;
  white-space: nowrap;
}

.meal-tag--done {
  background: rgba(245, 158, 11, 0.25);
  border-color: rgba(245, 158, 11, 0.5);
}

/* 右侧 */
.right-side {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
}

.table-wrapper {
  flex: 1;
  overflow: hidden;
}

.storage-detail-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  color: #eaf6ff;
  text-align: center;
}

.storage-detail-table thead th {
  height: 40px;
  color: #22a9ff;
  font-weight: 800;
  background: rgba(4, 43, 73, 0.72);
  border-bottom: 1px solid rgba(38, 130, 197, 0.24);
  position: sticky;
  top: 0;
}

.storage-detail-table tbody td {
  padding: 10px 8px;
  background: rgba(8, 37, 62, 0.72);
  border-top: 1px solid rgba(38, 130, 197, 0.24);
}

.storage-detail-table tbody tr:hover td {
  background: rgba(16, 72, 112, 0.82);
  color: #fff;
}

.col-seq {
  width: 60px;
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
  border: 1px solid rgba(71, 168, 228, 0.35);
  border-radius: 4px;
  background: rgba(4, 43, 73, 0.6);
  color: #eef8ff;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .2s;
}

.page-btn:hover:not(:disabled) {
  background: rgba(16, 72, 112, 0.9);
  border-color: rgba(54, 224, 255, 0.6);
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
