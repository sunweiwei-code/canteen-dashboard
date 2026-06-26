<template>
  <div class="modal-content">
    <div class="modal-summary">
      <div class="summary-item">
        <span class="summary-label">温度</span>
        <span class="summary-value">{{ data.temperature }}°C</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">湿度</span>
        <span class="summary-value info">{{ data.humidity }}%</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">燃气探测</span>
        <span class="summary-value success">{{ data.gasLevel }}</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">烟雾探测</span>
        <span class="summary-value success">{{ data.smokeLevel }}</span>
      </div>
    </div>

    <div class="env-details">
      <div class="env-detail-item">
        <span class="detail-label">PM2.5</span>
        <span class="detail-value">{{ data.pm25 }} μg/m³</span>
      </div>
      <div class="env-detail-item">
        <span class="detail-label">噪音</span>
        <span class="detail-value">{{ data.noise }} dB</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ data: any }>()
</script>

<style scoped>
.modal-content { padding: 0; }
.modal-summary {
  display: flex; gap: 32px; margin-bottom: 16px;
  background: rgba(10, 22, 40, 0.5); border-radius: 8px; padding: 16px 20px;
}
.summary-item { display: flex; flex-direction: column; gap: 4px; }
.summary-label { font-size: 12px; color: #8899aa; }
.summary-value { font-size: 24px; font-weight: 700; color: #e0e6ed; }
.summary-value.success { color: #43e97b; }
.summary-value.info { color: #4facfe; }
.env-details {
  display: flex; gap: 24px; margin-top: 16px;
  background: rgba(10, 22, 40, 0.5); border-radius: 8px; padding: 16px 20px;
}
.env-detail-item { display: flex; flex-direction: column; gap: 4px; }
.detail-label { font-size: 12px; color: #8899aa; }
.detail-value { font-size: 18px; font-weight: 600; color: #e0e6ed; }
</style>
