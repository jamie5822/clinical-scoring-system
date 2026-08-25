// ============================
// 临床评分系统 - 主应用逻辑
// ============================

// 所有评分系统注册表
const SCORING_SYSTEMS = {
    news: NEWS_CONFIG,
    curb65: CURB65_CONFIG,
    sofa: SOFA_CONFIG,
    qsofa: QSOFA_CONFIG,
    apache2: APACHE2_CONFIG,
    mmrc: MMRC_CONFIG,
    act: ACT_CONFIG
};

// 当前状态
let currentSystemId = null;
let currentSystemConfig = null;
let lastResult = null;

// ========== 页面导航 ==========

function showPage(pageId) {
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('scoring-page').style.display = 'none';
    document.getElementById('result-page').style.display = 'none';
    document.getElementById(pageId).style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goHome() {
    currentSystemId = null;
    currentSystemConfig = null;
    lastResult = null;
    showPage('home-page');
    document.getElementById('searchInput').value = '';
    filterCards();
}

function navigateTo(systemId) {
    currentSystemId = systemId;
    currentSystemConfig = SCORING_SYSTEMS[systemId];
    
    if (!currentSystemConfig) {
        alert('评分系统未找到');
        return;
    }
    
    document.getElementById('scoringTitle').textContent = currentSystemConfig.name;
    renderScoringForm(currentSystemConfig);
    showPage('scoring-page');
}

function retryScoring() {
    if (currentSystemId) {
        navigateTo(currentSystemId);
    }
}

// ========== 搜索过滤 ==========

function filterCards() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query) ? 'flex' : 'none';
    });
}

// ========== 渲染评分表单 ==========

function renderScoringForm(config) {
    const form = document.getElementById('scoringForm');
    form.innerHTML = '';
    
    config.parameters.forEach((param, index) => {
        const group = document.createElement('div');
        group.className = 'form-group';
        
        // 参数名称
        const label = document.createElement('label');
        label.textContent = `${index + 1}. ${param.name}`;
        group.appendChild(label);
        
        // 参数描述（如果有）
        if (param.description) {
            const desc = document.createElement('div');
            desc.className = 'param-desc';
            desc.textContent = param.description;
            group.appendChild(desc);
        }
        
        // 根据类型渲染输入控件
        if (param.type === 'radio' || param.type === 'select') {
            const optionsGrid = document.createElement('div');
            optionsGrid.className = 'options-grid';
            
            param.options.forEach(opt => {
                const item = document.createElement('div');
                item.className = 'option-item';
                
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = param.key;
                input.value = opt.value;
                input.id = `${param.key}_${opt.value}`;
                
                const optLabel = document.createElement('label');
                optLabel.htmlFor = `${param.key}_${opt.value}`;
                
                const scoreBadge = document.createElement('span');
                scoreBadge.className = 'score-badge';
                scoreBadge.textContent = opt.score;
                
                const optText = document.createElement('span');
                optText.className = 'option-text';
                optText.textContent = opt.label;
                
                if (opt.description) {
                    const optDesc = document.createElement('span');
                    optDesc.className = 'option-text';
                    optDesc.textContent = opt.description;
                    optLabel.appendChild(scoreBadge);
                    optLabel.appendChild(optText);
                    optLabel.appendChild(optDesc);
                } else {
                    optLabel.appendChild(scoreBadge);
                    optLabel.appendChild(optText);
                }
                
                item.appendChild(input);
                item.appendChild(optLabel);
                optionsGrid.appendChild(item);
            });
            
            group.appendChild(optionsGrid);
        } else if (param.type === 'number') {
            const input = document.createElement('input');
            input.type = 'number';
            input.className = 'number-input';
            input.name = param.key;
            input.id = param.key;
            input.placeholder = param.unit || '请输入数值';
            
            if (param.options && param.options[0]) {
                if (param.options[0].min !== undefined) input.min = param.options[0].min;
                if (param.options[0].max !== undefined) input.max = param.options[0].max;
            }
            
            group.appendChild(input);
            
            if (param.unit) {
                const unitDiv = document.createElement('div');
                unitDiv.className = 'input-unit';
                unitDiv.textContent = param.unit;
                group.appendChild(unitDiv);
            }
        }
        
        form.appendChild(group);
    });
}

// ========== 计算评分 ==========

function calculateScore() {
    if (!currentSystemConfig) return;
    
    const form = document.getElementById('scoringForm');
    const formData = {};
    let hasEmpty = false;
    
    // 收集表单数据
    currentSystemConfig.parameters.forEach(param => {
        if (param.type === 'number') {
            const input = form.querySelector(`[name="${param.key}"]`);
            if (input) {
                formData[param.key] = input.value;
                if (!input.value) hasEmpty = true;
            }
        } else {
            const selected = form.querySelector(`input[name="${param.key}"]:checked`);
            if (selected) {
                formData[param.key] = selected.value;
            } else {
                hasEmpty = true;
            }
        }
    });
    
    // 检查是否有未填项
    if (hasEmpty) {
        const confirmed = confirm('⚠️ 存在未填写的参数项，未填项将计为0分。是否继续？');
        if (!confirmed) return;
    }
    
    // 特殊处理：APACHE II 的 GCS
    let gcsOverride = null;
    if (currentSystemId === 'apache2' && formData['gcs']) {
        gcsOverride = APACHE2_CONFIG.calculateGCS(formData['gcs']);
    }
    
    // 使用引擎计算
    const result = engine.calculateScore(currentSystemConfig, formData);
    
    // APACHE II GCS 特殊处理
    if (gcsOverride !== null) {
        result.totalScore = result.totalScore - (result.details.find(d => d.name.includes('GCS'))?.score || 0) + gcsOverride;
        const gcsDetail = result.details.find(d => d.name.includes('GCS'));
        if (gcsDetail) {
            gcsDetail.score = gcsOverride;
        }
        // 重新确定风险等级
        result.riskLevel = engine.determineRiskLevel(result.totalScore, currentSystemConfig.interpretations);
        result.interpretation = engine.getInterpretation(result.riskLevel, currentSystemConfig.interpretations);
        result.pathway = engine.getPathway(result.riskLevel, currentSystemConfig.pathways);
    }
    
    lastResult = result;
    showResult(result);
}

// ========== 显示结果 ==========

function showResult(result) {
    // 总分
    const scoreEl = document.getElementById('resultScore');
    scoreEl.textContent = result.totalScore + ' 分';
    scoreEl.className = 'result-score';
    if (result.riskLevel === 'critical' || result.riskLevel === 'high') {
        scoreEl.classList.add('critical');
    }
    
    // 风险等级
    const levelEl = document.getElementById('resultLevel');
    const levelLabels = {
        low: '🟢 低风险',
        medium: '🟡 中风险',
        high: '🔴 高风险',
        critical: '🟣 极高风险'
    };
    const levelClasses = {
        low: 'level-low',
        medium: 'level-medium',
        high: 'level-high',
        critical: 'level-critical'
    };
    levelEl.textContent = levelLabels[result.riskLevel] || result.riskLevel;
    levelEl.className = 'result-level ' + (levelClasses[result.riskLevel] || '');
    
    // 解读
    document.getElementById('resultInterpretation').innerHTML = `
        <strong>📋 解读：</strong>${result.interpretation}
    `;
    
    // 各项得分
    let detailsHTML = '<h3>📊 各项得分明细</h3>';
    result.details.forEach(d => {
        detailsHTML += `
            <div class="detail-row">
                <span>${d.name}</span>
                <span class="detail-score">${d.score} 分</span>
            </div>
        `;
    });
    document.getElementById('resultDetails').innerHTML = detailsHTML;
    
    // 诊疗路径
    let pathwayHTML = '<h3>💡 推荐诊疗路径</h3><ul>';
    result.pathway.forEach(step => {
        pathwayHTML += `<li>${step}</li>`;
    });
    pathwayHTML += '</ul>';
    document.getElementById('resultPathway').innerHTML = pathwayHTML;
    
    showPage('result-page');
}

// ========== 初始化 ==========

document.addEventListener('DOMContentLoaded', () => {
    showPage('home-page');
    
    // 搜索框回车事件
    document.getElementById('searchInput').addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            filterCards();
        }
    });
});

console.log('✅ 临床评估系统已就绪');
console.log('📋 已加载评分系统：', Object.keys(SCORING_SYSTEMS).join(', '));
