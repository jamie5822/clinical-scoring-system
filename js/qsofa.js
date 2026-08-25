// ============================
// qSOFA 快速评分配置
// ============================

const QSOFA_CONFIG = {
    id: 'qsofa',
    name: 'qSOFA 评分',
    fullName: 'Quick Sequential Organ Failure Assessment',
    description: '快速序贯器官衰竭评估，用于脓毒症床旁快速筛查',
    parameters: [
        {
            key: 'respiratory_rate',
            name: '呼吸频率',
            type: 'radio',
            options: [
                { value: 'ge22', label: '≥ 22 次/分', score: 1 },
                { value: 'lt22', label: '< 22 次/分', score: 0 }
            ]
        },
        {
            key: 'consciousness',
            name: '意识状态改变（GCS < 15）',
            type: 'radio',
            options: [
                { value: 'yes', label: '是（GCS < 15）', score: 1 },
                { value: 'no', label: '否（GCS = 15）', score: 0 }
            ]
        },
        {
            key: 'sbp',
            name: '收缩压',
            type: 'radio',
            options: [
                { value: 'le100', label: '≤ 100 mmHg', score: 1 },
                { value: 'gt100', label: '> 100 mmHg', score: 0 }
            ]
        }
    ],
    interpretations: [
        { minScore: 0, maxScore: 1, level: 'low', text: '低风险 — 继续监测，但保持警惕' },
        { minScore: 2, maxScore: 3, level: 'high', text: '高风险 — 疑似脓毒症，需立即进一步评估（SOFA评分），启动脓毒症 bundle' }
    ],
    pathways: [
        {
            level: 'low',
            steps: [
                '继续常规监测',
                '如临床怀疑感染，进一步检查',
                '定期复评qSOFA'
            ]
        },
        {
            level: 'high',
            steps: [
                '立即启动脓毒症1小时bundle',
                '测量血乳酸水平',
                '采集血培养（抗生素前）',
                '启动广谱抗生素',
                '开始快速液体复苏（30mL/kg晶体液）',
                '应用血管活性药物（如液体复苏后仍低血压）',
                '完善SOFA评分'
            ]
        }
    ]
};
