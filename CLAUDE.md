# 食堂数据驾驶舱 - 项目规范

## 技术栈
- Vue 3 + `<script setup>` + TypeScript
- Element Plus UI 组件库
- ECharts 图表库
- Vite 构建工具

## 设计规范
- **整体风格**：深色科技风大屏
- **背景色**：`#060e1a`（深蓝/黑色渐变）
- **主色调**：荧光青 `#00E5FF` / `#4facfe`
- **卡片背景**：`rgba(8, 20, 40, 0.85)`
- **边框发光**：`rgba(30, 120, 255, 0.18)`
- **字体颜色**：白色 `#dbe4f0` / 浅灰 `#7a8ba6`

## 组件约束
- 所有弹窗使用 `el-dialog`，设置 `:draggable="false"`
- 表格使用 `el-table` 隔行换色
- 不允许硬编码死数据，必须使用 `ref`/`reactive` 响应式数据
- `onMounted` 中使用 `setTimeout` 模拟接口请求

## 文件约束
- `Safefood-Platform/` 文件夹内的文件严禁修改
- 主页面：`src/views/dashboard/index.vue`
- 弹窗组件：`src/views/dashboard/modals/`
- Mock 数据：`src/mock/data.ts`
- API 层：`src/api/dashboard.ts`
