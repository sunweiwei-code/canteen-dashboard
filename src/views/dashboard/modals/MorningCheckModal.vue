<template>
  <div class="modal-content">
    <div class="card-grid-wrapper">
      <div class="card-grid">
        <div
          class="check-card"
          v-for="item in pagedData"
          :key="item.id"
          :class="{ 'check-card--error': item.result !== '通过' }"
        >
          <img :src="item.image" class="card-img" @error="onImgError" />
          <div class="card-row">
            <span class="card-label">姓名</span>
            <span class="card-value">{{ item.name }}</span>
          </div>
          <div class="card-row">
            <span class="card-label">体温</span>
            <span class="card-value" :class="{ 'card-value--warn': parseFloat(item.bodyTemp) > 37 }">
              {{ item.bodyTemp }}
            </span>
          </div>
          <div class="card-row">
            <span class="card-label">结果</span>
            <span :class="['result-tag', item.result === '通过' ? 'result-pass' : 'result-fail']">
              {{ item.result === '通过' ? '合格' : '不合格' }}
            </span>
          </div>
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
  gap: 12px;
  height: 100%;
}

.check-card {
  background: linear-gradient(180deg, rgba(4,43,73,.72), rgba(2,19,38,.6));
  border: 1px solid rgba(71,168,228,.22);
  border-radius: 6px;
  padding: 6px;
  display: flex;
  flex-direction: column;
  transition: border-color .2s;
  min-height: 0;
}

.check-card:hover {
  border-color: rgba(54,224,255,.5);
}

.check-card--error {
  border-color: rgba(245,87,54,.45);
  background: linear-gradient(180deg, rgba(80,24,24,.62), rgba(2,19,38,.6));
}

.card-img {
  width: 100%;
  flex: 1;
  min-height: 0;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 4px;
}

.card-row {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  line-height: 1.4;
}

.card-label {
  color: #8899aa;
  flex-shrink: 0;
}

.card-value {
  color: #eef8ff;
  font-weight: 600;
}

.card-value--warn {
  color: #f5576c;
}

.result-tag {
  display: inline-block;
  padding: 0 6px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 600;
}

.result-pass {
  background: rgba(67,233,123,.18);
  color: #43e97b;
}

.result-fail {
  background: rgba(245,87,54,.18);
  color: #f5576c;
}

.pagination-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 12px 0 0;
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
