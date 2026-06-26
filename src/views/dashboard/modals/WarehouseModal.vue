<template>
  <div class="modal-content">
    <div class="modal-summary">
      <div class="summary-item">
        <span class="summary-label">主食总量</span>
        <span class="summary-value">{{ stapleTotal }} kg</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">副食总量</span>
        <span class="summary-value info">{{ nonStapleTotal }} kg</span>
      </div>
    </div>

    <div class="warehouse-panels">
      <div class="warehouse-panel">
        <h4 class="panel-title">主食统计</h4>
        <div class="panel-items">
          <div class="panel-item">
            <span class="item-icon">🌾</span>
            <div class="item-data">
              <span class="item-value">{{ data.staple.rice }} kg</span>
              <span class="item-label">大米</span>
            </div>
          </div>
          <div class="panel-item">
            <span class="item-icon">🌽</span>
            <div class="item-data">
              <span class="item-value">{{ data.staple.flour }} kg</span>
              <span class="item-label">面粉</span>
            </div>
          </div>
          <div class="panel-item">
            <span class="item-icon">🫒</span>
            <div class="item-data">
              <span class="item-value">{{ data.staple.oil }} kg</span>
              <span class="item-label">食用油</span>
            </div>
          </div>
        </div>
      </div>

      <div class="warehouse-panel">
        <h4 class="panel-title">副食统计</h4>
        <div class="panel-items">
          <div class="panel-item">
            <span class="item-icon">🥩</span>
            <div class="item-data">
              <span class="item-value">{{ data.nonStaple.meat }} kg</span>
              <span class="item-label">肉类</span>
            </div>
          </div>
          <div class="panel-item">
            <span class="item-icon">🥬</span>
            <div class="item-data">
              <span class="item-value">{{ data.nonStaple.vegetable }} kg</span>
              <span class="item-label">蔬菜</span>
            </div>
          </div>
          <div class="panel-item">
            <span class="item-icon">🧂</span>
            <div class="item-data">
              <span class="item-value">{{ data.nonStaple.seasoning }} kg</span>
              <span class="item-label">调味料</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ data: any }>()

const stapleTotal = computed(() =>
  props.data.staple.rice + props.data.staple.flour + props.data.staple.oil
)

const nonStapleTotal = computed(() =>
  props.data.nonStaple.meat + props.data.nonStaple.vegetable + props.data.nonStaple.seasoning
)
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
.summary-value.info { color: #4facfe; }

.warehouse-panels {
  display: flex; gap: 24px; margin-top: 16px;
}

.warehouse-panel {
  flex: 1;
  background: rgba(10, 22, 40, 0.5); border-radius: 8px; padding: 16px;
}

.panel-title {
  font-size: 14px; font-weight: 600; color: #e0e6ed; margin: 0 0 12px 0;
  padding-bottom: 8px; border-bottom: 1px solid rgba(30, 120, 255, 0.2);
}

.panel-items {
  display: flex; flex-direction: column; gap: 12px;
}

.panel-item {
  display: flex; align-items: center; gap: 12px;
  background: rgba(20, 40, 70, 0.5); border-radius: 6px; padding: 12px;
}

.item-icon { font-size: 24px; }

.item-data { display: flex; flex-direction: column; }
.item-value { font-size: 18px; font-weight: 700; color: #e0e6ed; }
.item-label { font-size: 12px; color: #8899aa; }
</style>
