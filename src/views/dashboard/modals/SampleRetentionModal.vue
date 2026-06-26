<template>
  <div class="modal-content">
    <div class="card-grid-wrapper">
      <div class="card-grid">
        <div class="sample-card" v-for="item in pagedData" :key="item.id">
          <img :src="item.image" class="card-img" @error="onImgError" />
          <div class="card-name">名称：{{ item.dishName }}</div>
          <div class="card-info">重量：{{ item.sampleWeight }}</div>
          <div class="card-time">时间：{{ item.sampleTime }}</div>
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

const pageSize = 18 // 6 × 3
const currentPage = ref(1)

const totalPages = computed(() => Math.max(1, Math.ceil(props.data.length / pageSize)))

const pagedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return props.data.slice(start, start + pageSize)
})

const prevPage = () => { if (currentPage.value > 1) currentPage.value-- }
const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++ }

const onImgError = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 90"><rect fill="%231a2a4a" width="120" height="90"/><text x="60" y="45" fill="%23667" text-anchor="middle" font-size="12">暂无图片</text></svg>'
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

.card-grid-wrapper {
  flex: 1;
  overflow: hidden;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 16px;
  height: 100%;
}

.sample-card {
  background: linear-gradient(180deg, rgba(4,43,73,.72), rgba(2,19,38,.6));
  border: 1px solid rgba(71,168,228,.22);
  border-radius: 6px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: border-color .2s;
  min-height: 0;
}

.sample-card:hover {
  border-color: rgba(54,224,255,.5);
}

.card-img {
  width: 100%;
  flex: 1;
  min-height: 0;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 6px;
}

.card-name {
  font-size: 13px;
  color: #eef8ff;
  font-weight: 600;
  text-align: center;
  line-height: 1.3;
  margin-bottom: 2px;
}

.card-info {
  font-size: 11px;
  color: #8899aa;
  margin-bottom: 2px;
}

.card-time {
  font-size: 11px;
  color: #4facfe;
  font-weight: 600;
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
