<template>
  <div class="modal-content">
    <div class="table-wrapper">
      <table class="feedback-detail-table">
        <thead>
          <tr>
            <th class="col-seq">序号</th>
            <th>反馈时间</th>
            <th>处理状态</th>
            <th>问题类型</th>
            <th>处理人员</th>
            <th>审核人员</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in pagedData" :key="item.id">
            <td class="col-seq">{{ (currentPage - 1) * pageSize + index + 1 }}</td>
            <td>{{ item.feedbackTime }}</td>
            <td>
              <span :class="['tag', item.status === '已处理' ? 'tag-ok' : 'tag-warn']">{{ item.status }}</span>
            </td>
            <td>{{ item.questionType }}</td>
            <td>{{ item.handler }}</td>
            <td>{{ item.reviewer }}</td>
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

.feedback-detail-table {
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

.tag {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.tag-ok {
  background: rgba(67,233,123,.18);
  color: #43e97b;
}

.tag-warn {
  background: rgba(245,158,11,.18);
  color: #f59e0b;
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
