<template>
  <div class="modal-content">
    <div class="table-wrapper">
      <table class="snapshot-detail-table">
        <thead>
          <tr>
            <th class="col-seq">序号</th>
            <th>抓拍日期</th>
            <th>抓拍时间</th>
            <th>抓拍问题</th>
            <th>抓拍图片</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in pagedData" :key="item.id">
            <td class="col-seq">{{ (currentPage - 1) * pageSize + index + 1 }}</td>
            <td>{{ item.captureDate }}</td>
            <td>{{ item.captureTime }}</td>
            <td>{{ item.problem }}</td>
            <td>
              <button class="view-btn" @click="openPreview(item.imageUrl)">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <path d="M21 15l-5-5L5 21"/>
                </svg>
                查看
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination-bar">
      <button class="page-btn" :disabled="currentPage <= 1" @click="prevPage">&#9664;</button>
      <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
      <button class="page-btn" :disabled="currentPage >= totalPages" @click="nextPage">&#9654;</button>
    </div>

    <!-- 图片预览 -->
    <div v-if="previewUrl" class="image-preview" @click.self="closePreview">
      <div class="preview-box">
        <img :src="previewUrl" alt="抓拍图片" @error="onPreviewError" />
        <button class="preview-close" @click="closePreview">&#10005;</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{ data: any[] }>()

const pageSize = 9
const currentPage = ref(1)
const previewUrl = ref<string | null>(null)

const totalPages = computed(() => Math.max(1, Math.ceil(props.data.length / pageSize)))

const pagedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return props.data.slice(start, start + pageSize)
})

const prevPage = () => { if (currentPage.value > 1) currentPage.value-- }
const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++ }

const openPreview = (url: string) => { previewUrl.value = url }
const closePreview = () => { previewUrl.value = null }
const onPreviewError = () => { previewUrl.value = null }
</script>

<style scoped>
.modal-content {
  padding: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.table-wrapper {
  flex: 1;
  overflow: hidden;
}

.snapshot-detail-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  color: #eaf6ff;
  text-align: center;

  thead th {
    height: 40px;
    color: #22a9ff;
    font-weight: 800;
    background: rgba(4,43,73,.72);
    border-bottom: 1px solid rgba(38,130,197,.24);
    position: sticky;
    top: 0;
  }

  tbody td {
    padding: 10px 8px;
    background: rgba(8,37,62,.72);
    border-top: 1px solid rgba(38,130,197,.24);
  }

  tbody tr:hover td {
    background: rgba(16,72,112,.82);
    color: #fff;
  }

  .col-seq { width: 60px; }
}

.view-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border: 1px solid rgba(71,168,228,.4);
  border-radius: 4px;
  background: rgba(4,43,73,.55);
  color: #eef8ff;
  font-size: 12px;
  cursor: pointer;
  transition: all .2s;

  &:hover {
    background: rgba(16,72,112,.9);
    border-color: rgba(54,224,255,.6);
    color: #fff;
  }
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

/* 图片预览 */
.image-preview {
  position: absolute;
  inset: 0;
  z-index: 100;
  background: rgba(0,0,0,.78);
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-box {
  position: relative;
  max-width: 80%;
  max-height: 80%;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(54,224,255,.3);
  background: rgba(4,43,73,.9);

  img {
    display: block;
    max-width: 100%;
    max-height: 520px;
    object-fit: contain;
  }
}

.preview-close {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: rgba(0,0,0,.55);
  color: #fff;
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover { background: rgba(245,87,108,.85); }
}
</style>
