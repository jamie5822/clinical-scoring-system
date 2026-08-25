# 🏥 临床评估评分系统

一个基于网页的临床评分工具，支持多种临床评分体系，通过扫描二维码即可快速使用。

## 📋 已支持的评分系统

| 评分系统 | 适用疾病 | 用途 |
|---------|---------|------|
| NEWS | CAP | 国家早期预警评分 |
| CURB-65 | CAP | 社区获得性肺炎严重度 |
| SOFA | 脓毒症 | 序贯器官衰竭评估 |
| qSOFA | 脓毒症 | 快速筛查 |
| APACHE II | 重症 | 急性生理与慢性健康 |
| mMRC | AECOPD | 呼吸困难评估 |
| ACT | 哮喘 | 哮喘控制测试 |

## 🚀 快速部署

### 方法一：GitHub Pages（推荐）

1. Fork 本仓库
2. 进入 Settings → Pages
3. Source 选择 `main` 分支
4. 点击 Save，等待部署完成
5. 访问 `https://你的用户名.github.io/clinical-scoring-system/`

### 方法二：本地运行

```bash
# 克隆仓库
git clone https://github.com/你的用户名/clinical-scoring-system.git

# 进入目录
cd clinical-scoring-system

# 使用任意HTTP服务器启动
# Python 3
python -m http.server 8080

# 或使用 Node.js
npx serve .
