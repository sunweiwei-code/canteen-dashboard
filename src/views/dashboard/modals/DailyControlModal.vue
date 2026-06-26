<template>
  <div class="modal-content">
    <div class="card-grid-wrapper">
      <div class="card-grid">
        <div
          class="control-card"
          v-for="item in pagedData"
          :key="item.id"
        >
          <div class="card-school">{{ item.school }}</div>
          <div class="card-canteen">{{ item.canteen }}</div>
          <div class="card-label">完成日管控</div>
          <div class="card-progress">{{ item.progress }}</div>
          <div class="card-date">{{ item.date }}</div>
          <button class="card-btn">查看详情</button>
        </div>
      </div>
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

const pageSize = 10 // 5 × 2
const currentPage = ref(1)

const totalPages = computed(() => Math.max(1, Math.ceil(props.data.length / pageSize)))

const pagedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return props.data.slice(start, start + pageSize)
})

const prevPage = () => { if (currentPage.value > 1) currentPage.value-- }
const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++ }
</script>

<style scoped>
.modal-content {
  padding: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.card-grid-wrapper {
  flex: 1;
  overflow: hidden;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 12px;
  height: 100%;
}

.control-card {
  background: linear-gradient(180deg, rgba(6, 52, 88, .85), rgba(3, 24, 42, .78));
  border: 1px solid rgba(71, 168, 228, .25);
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: border-color .2s;
  min-height: 0;
}

.control-card:hover {
  border-color: rgba(54, 224, 255, .55);
}

.card-school {
  font-size: 13px;
  font-weight: 700;
  color: #eef8ff;
  margin-bottom: 2px;
}

.card-canteen {
  font-size: 11px;
  color: #eef8ff;
  margin-bottom: 6px;
}

.card-label {
  font-size: 11px;
  color: #8899aa;
  margin-bottom: 3px;
}

.card-progress {
  font-size: 26px;
  font-weight: 800;
  color: #fff;
  letter-spacing: 1px;
  margin-bottom: 3px;
}

.card-date {
  font-size: 11px;
  color: #8899aa;
  margin-bottom: 8px;
}

.card-btn {
  border: 1px solid rgba(71, 168, 228, .45);
  background: rgba(4, 43, 73, .55);
  color: #eef8ff;
  padding: 5px 18px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all .2s;
}

.card-btn:hover {
  background: rgba(16, 72, 112, .9);
  border-color: rgba(54, 224, 255, .7);
  color: #fff;
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
