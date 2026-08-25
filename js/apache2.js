// ============================
// APACHE II 评分系统配置
// ============================

const APACHE2_CONFIG = {
    id: 'apache2',
    name: 'APACHE II 评分',
    fullName: 'Acute Physiology And Chronic Health Evaluation II',
    description: '急性生理与慢性健康评分，用于ICU患者病情严重程度评估',
    parameters: [
        {
            key: 'temperature',
            name: '体温（℃）',
            type: 'select',
            options: [
                { value: 'ge41', label: '≥41', score: 4 },
                { value: '39-40.9', label: '39-40.9', score: 3 },
                { value: '38.5-38.9', label: '38.5-38.9', score: 1 },
                { value: '36-38.4', label: '36-38.4', score: 0 },
                { value: '34-35.9', label: '34-35.9', score: 1 },
                { value: '32-33.9', label: '32-33.9', score: 2 },
                { value: '30-31.9', label: '30-31.9', score: 3 },
                { value: 'le29.9', label: '≤29.9', score: 4 }
            ]
        },
        {
            key: 'map',
            name: '平均动脉压 MAP（mmHg）',
            type: 'select',
            options: [
                { value: 'ge160', label: '≥160', score: 4 },
                { value: '130-159', label: '130-159', score: 3 },
                { value: '110-129', label: '110-129', score: 2 },
                { value: '70-109', label: '70-109', score: 0 },
                { value: '50-69', label: '50-69', score: 2 },
                { value: 'le49', label: '≤49', score: 4 }
            ]
        },
        {
            key: 'heart_rate',
            name: '心率（次/分）',
            type: 'select',
            options: [
                { value: 'ge180', label: '≥180', score: 4 },
                { value: '140-179', label: '140-179', score: 3 },
                { value: '110-139', label: '110-139', score: 2 },
                { value: '70-109', label: '70-109', score: 0 },
                { value: '55-69', label: '55-69', score: 2 },
                { value: '40-54', label: '40-54', score: 3 },
                { value: 'le39', label: '≤39', score: 4 }
            ]
        },
        {
            key: 'respiratory_rate',
            name: '呼吸频率（次/分）',
            type: 'select',
            options: [
                { value: 'ge50', label: '≥50', score: 4 },
                { value: '35-49', label: '35-49', score: 3 },
                { value: '25-34', label: '25-34', score: 1 },
                { value: '12-24', label: '12-24', score: 0 },
                { value: '10-11', label: '10-11', score: 1 },
                { value: '6-9', label: '6-9', score: 2 },
                { value: 'le5', label: '≤5', score: 4 }
            ]
        },
        {
            key: 'pao2',
            name: 'PaO₂ (mmHg) — FiO₂<50%时',
            type: 'select',
            options: [
                { value: 'gt70', label: '>70', score: 0 },
                { value: '61-70', label: '61-70', score: 1 },
                { value: '55-60', label: '55-60', score: 3 },
                { value: 'le55', label: '≤55', score: 4 }
            ]
        },
        {
            key: 'ph',
            name: '动脉血 pH',
            type: 'select',
            options: [
                { value: 'ge7.7', label: '≥7.7', score: 4 },
                { value: '7.6-7.69', label: '7.6-7.69', score: 3 },
                { value: '7.5-7.59', label: '7.5-7.59', score: 1 },
                { value: '7.33-7.49', label: '7.33-7.49', score: 0 },
                { value: '7.25-7.32', label: '7.25-7.32', score: 2 },
                { value: '7.15-7.24', label: '7.15-7.24', score: 3 },
                { value: 'lt7.15', label: '<7.15', score: 4 }
            ]
        },
        {
            key: 'sodium',
            name: '血钠 Na⁺（mmol/L）',
            type: 'select',
            options: [
                { value: 'ge180', label: '≥180', score: 4 },
                { value: '160-179', label: '160-179', score: 3 },
                { value: '155-159', label: '155-159', score: 2 },
                { value: '150-154', label: '150-154', score: 1 },
                { value: '130-149', label: '130-149', score: 0 },
                { value: '120-129', label: '120-129', score: 2 },
                { value: '111-119', label: '111-119', score: 3 },
                { value: 'le110', label: '≤110', score: 4 }
            ]
        },
        {
            key: 'potassium',
            name: '血钾 K⁺（mmol/L）',
            type: 'select',
            options: [
                { value: 'ge7', label: '≥7', score: 4 },
                { value: '6-6.9', label: '6-6.9', score: 3 },
                { value: '5.5-5.9', label: '5.5-5.9', score: 1 },
                { value: '3.5-5.4', label: '3.5-5.4', score: 0 },
                { value: '3-3.4', label: '3-3.4', score: 1 },
                { value: '2.5-2.9', label: '2.5-2.9', score: 2 },
                { value: 'lt2.5', label: '<2.5', score: 4 }
            ]
        },
        {
            key: 'creatinine',
            name: '肌酐 Cr（mg/dL）',
            type: 'select',
            options: [
                { value: 'ge3.5', label: '≥3.5', score: 4 },
                { value: '2-3.4', label: '2-3.4', score: 3 },
                { value: '1.5-1.9', label: '1.5-1.9', score: 2 },
                { value: '0.6-1.4', label: '0.6-1.4', score: 0 },
                { value: 'lt0.6', label: '<0.6', score: 2 }
            ]
        },
        {
            key: 'hct',
            name: 'Hct 红细胞压积（%）',
            type: 'select',
            options: [
                { value: 'ge60', label: '≥60', score: 4 },
                { value: '50-59.9', label: '50-59.9', score: 2 },
                { value: '46-49.9', label: '46-49.9', score: 1 },
                { value: '30-45.9', label: '30-45.9', score: 0 },
                { value: '20-29.9', label: '20-29.9', score: 2 },
                { value: 'lt20', label: '<20', score: 4 }
            ]
        },
        {
            key: 'wbc',
            name: 'WBC 白细胞（×10⁹/L）',
            type: 'select',
            options: [
                { value: 'ge40', label: '≥40', score: 4 },
                { value: '20-39.9', label: '20-39.9', score: 2 },
                { value: '15-19.9', label: '15-19.9', score: 1 },
                { value: '3-14.9', label: '3-14.9', score: 0 },
                { value: '1-2.9', label: '1-2.9', score: 2 },
                { value: 'lt1', label: '<1', score: 4 }
            ]
        },
        {
            key: 'gcs',
            name: 'GCS 评分（15 - 实际GCS分）',
            type: 'number',
            unit: '请输入GCS评分（3-15）',
            options: [
                { min: 3, max: 15, score: null } // 特殊处理：score = 15 - GCS
            ]
        },
        {
            key: 'age',
            name: '年龄评分',
            type: 'select',
            options: [
                { value: 'le44', label: '≤44 岁', score: 0 },
                { value: '45-54', label: '45-54 岁', score: 2 },
                { value: '55-64', label: '55-64 岁', score: 3 },
                { value: '65-74', label: '65-74 岁', score: 5 },
                { value: 'ge75', label: '≥75 岁', score: 6 }
            ]
        },
        {
            key: 'chronic_health',
            name: '慢性健康状况',
            type: 'select',
            options: [
                { value: 'none', label: '无慢性疾病', score: 0 },
                { value: 'elective_surgery', label: '择期手术术后', score: 2 },
                { value: 'non_surgery', label: '非手术或急诊手术', score: 5 }
            ]
        }
    ],
    // APACHE II 特殊处理：GCS分数 = 15 - 实际GCS
    calculateGCS: function(gcsValue) {
        const gcs = parseInt(gcsValue);
        if (isNaN(gcs) || gcs < 3 || gcs > 15) return 0;
        return 15 - gcs;
    },
    interpretations: [
        { minScore: 0, maxScore: 9, level: 'low', text: '较低风险 — 预测病死率约 <10%' },
        { minScore: 10, maxScore: 19, level: 'medium', text: '中等风险 — 预测病死率约 10-25%' },
        { minScore: 20, maxScore: 29, level: 'high', text: '高风险 — 预测病死率约 25-55%' },
        { minScore: 30, maxScore: 71, level: 'critical', text: '极高风险 — 预测病死率约 >55%' }
    ],
    pathways: [
        {
            level: 'low',
            steps: [
                '常规ICU监护治疗',
                '每日评估APACHE II变化',
                '目标导向治疗',
                '早期康复介入'
            ]
        },
        {
            level: 'medium',
            steps: [
                '加强监护级别',
                '多学科协作',
                '积极治疗原发病',
                '预防并发症'
            ]
        },
        {
            level: 'high',
            steps: [
                '最高级别监护',
                '积极器官功能支持',
                '多学科会诊（MDT）',
                '详细记录治疗反应',
                '与家属充分沟通预后'
            ]
        },
        {
            level: 'critical',
            steps: [
                '最大程度生命支持',
                'ECMO/CRRT评估',
                '每日MDT讨论',
                '严格评估治疗有效性',
                '伦理委员会讨论（如必要）',
                '临终关怀准备'
            ]
        }
    ]
};
