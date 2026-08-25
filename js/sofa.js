// ============================
// SOFA 评分系统配置
// ============================

const SOFA_CONFIG = {
    id: 'sofa',
    name: 'SOFA 评分',
    fullName: 'Sequential Organ Failure Assessment',
    description: '序贯器官衰竭评估，用于脓毒症患者器官功能评估',
    parameters: [
        {
            key: 'pao2_fio2',
            name: 'PaO₂/FiO₂ (mmHg)',
            type: 'select',
            options: [
                { value: 'ge400', label: '≥400', score: 0 },
                { value: '300-399', label: '300-399', score: 1 },
                { value: '200-299', label: '200-299', score: 2 },
                { value: '100-199', label: '100-199（呼吸支持）', score: 3 },
                { value: 'lt100', label: '<100（呼吸支持）', score: 4 }
            ]
        },
        {
            key: 'platelets',
            name: '血小板 (×10³/μL)',
            type: 'select',
            options: [
                { value: 'ge150', label: '≥150', score: 0 },
                { value: '100-149', label: '100-149', score: 1 },
                { value: '50-99', label: '50-99', score: 2 },
                { value: '20-49', label: '20-49', score: 3 },
                { value: 'lt20', label: '<20', score: 4 }
            ]
        },
        {
            key: 'bilirubin',
            name: '胆红素 (mg/dL)',
            type: 'select',
            options: [
                { value: 'lt1.2', label: '<1.2', score: 0 },
                { value: '1.2-1.9', label: '1.2-1.9', score: 1 },
                { value: '2.0-5.9', label: '2.0-5.9', score: 2 },
                { value: '6.0-11.9', label: '6.0-11.9', score: 3 },
                { value: 'ge12.0', label: '≥12.0', score: 4 }
            ]
        },
        {
            key: 'hypotension',
            name: '低血压/血管活性药物',
            type: 'select',
            options: [
                { value: 'map_ge70', label: 'MAP ≥70 mmHg', score: 0 },
                { value: 'map_lt70', label: 'MAP <70 mmHg', score: 1 },
                { value: 'da_le5', label: '多巴胺 ≤5 或任何多巴酚丁胺', score: 2 },
                { value: 'da_gt5_ne_le0.1', label: '多巴胺>5 或 NE≤0.1', score: 3 },
                { value: 'da_gt15_ne_gt0.1', label: '多巴胺>15 或 NE>0.1', score: 4 }
            ]
        },
        {
            key: 'gcs',
            name: 'GCS 评分',
            type: 'select',
            options: [
                { value: '15', label: '15', score: 0 },
                { value: '13-14', label: '13-14', score: 1 },
                { value: '10-12', label: '10-12', score: 2 },
                { value: '6-9', label: '6-9', score: 3 },
                { value: 'lt6', label: '<6', score: 4 }
            ]
        },
        {
            key: 'creatinine',
            name: '肌酐 (mg/dL) / 尿量',
            type: 'select',
            options: [
                { value: 'lt1.2', label: '<1.2', score: 0 },
                { value: '1.2-1.9', label: '1.2-1.9', score: 1 },
                { value: '2.0-3.4', label: '2.0-3.4', score: 2 },
                { value: '3.5-4.9_or_lt500', label: '3.5-4.9 或尿量<500mL/d', score: 3 },
                { value: 'ge5.0_or_lt200', label: '≥5.0 或尿量<200mL/d', score: 4 }
            ]
        }
    ],
    interpretations: [
        { minScore: 0, maxScore: 6, level: 'low', text: '较低风险 — 病死率 <10%，常规ICU治疗' },
        { minScore: 7, maxScore: 9, level: 'medium', text: '中等风险 — 病死率 15-20%，需加强监护' },
        { minScore: 10, maxScore: 12, level: 'high', text: '高风险 — 病死率 40-50%，需积极干预' },
        { minScore: 13, maxScore: 24, level: 'critical', text: '极高风险 — 病死率 >80%，需最大力度支持' }
    ],
    pathways: [
        {
            level: 'low',
            steps: [
                '常规ICU监护',
                '每日评估SOFA变化趋势',
                '感染源控制',
                '合理使用抗生素'
            ]
        },
        {
            level: 'medium',
            steps: [
                '加强器官功能监测',
                '每6小时评估',
                '优化液体管理',
                '考虑器官支持治疗'
            ]
        },
        {
            level: 'high',
            steps: [
                '多学科团队协作',
                '积极器官功能支持',
                '血液净化评估',
                '严格感染控制',
                '家属沟通'
            ]
        },
        {
            level: 'critical',
            steps: [
                '最大程度器官支持',
                'ECMO评估',
                '持续血液净化',
                '多学科会诊',
                '预后评估与伦理讨论'
            ]
        }
    ]
};
