// ============================
// NEWS 评分系统配置
// ============================

const NEWS_CONFIG = {
    id: 'news',
    name: 'NEWS 评分',
    fullName: 'National Early Warning Score',
    description: '国家早期预警评分，用于急诊患者的快速筛查评估',
    parameters: [
        {
            key: 'respiratory_rate',
            name: '呼吸频率（次/分）',
            type: 'select',
            options: [
                { value: 'le8', label: '≤8', score: 3 },
                { value: '9-11', label: '9-11', score: 1 },
                { value: '12-20', label: '12-20', score: 0 },
                { value: '21-24', label: '21-24', score: 2 },
                { value: 'ge25', label: '≥25', score: 3 }
            ]
        },
        {
            key: 'spo2',
            name: '血氧饱和度 SpO₂ (%)',
            type: 'select',
            options: [
                { value: 'le91', label: '≤91', score: 3 },
                { value: '92-93', label: '92-93', score: 2 },
                { value: '94-95', label: '94-95', score: 1 },
                { value: 'ge96', label: '≥96', score: 0 }
            ]
        },
        {
            key: 'oxygen_supply',
            name: '是否吸氧',
            type: 'radio',
            options: [
                { value: 'yes', label: '是', score: 2 },
                { value: 'no', label: '否', score: 0 }
            ]
        },
        {
            key: 'temperature',
            name: '体温（℃）',
            type: 'select',
            options: [
                { value: 'le35.0', label: '≤35.0', score: 3 },
                { value: '35.1-36.0', label: '35.1-36.0', score: 1 },
                { value: '36.1-38.0', label: '36.1-38.0', score: 0 },
                { value: '38.1-39.0', label: '38.1-39.0', score: 1 },
                { value: 'ge39.1', label: '≥39.1', score: 2 }
            ]
        },
        {
            key: 'sbp',
            name: '收缩压（mmHg）',
            type: 'select',
            options: [
                { value: 'le90', label: '≤90', score: 3 },
                { value: '91-100', label: '91-100', score: 2 },
                { value: '101-110', label: '101-110', score: 1 },
                { value: '111-219', label: '111-219', score: 0 },
                { value: 'ge220', label: '≥220', score: 3 }
            ]
        },
        {
            key: 'heart_rate',
            name: '心率（次/分）',
            type: 'select',
            options: [
                { value: 'le40', label: '≤40', score: 3 },
                { value: '41-50', label: '41-50', score: 1 },
                { value: '51-90', label: '51-90', score: 0 },
                { value: '91-110', label: '91-110', score: 1 },
                { value: '111-130', label: '111-130', score: 2 },
                { value: 'ge131', label: '≥131', score: 3 }
            ]
        },
        {
            key: 'consciousness',
            name: '意识状态',
            type: 'radio',
            options: [
                { value: 'A', label: 'A（清醒）', score: 0 },
                { value: 'V', label: 'V（声音反应）', score: 3 },
                { value: 'P', label: 'P（疼痛反应）', score: 3 },
                { value: 'U', label: 'U（无反应）', score: 3 }
            ]
        }
    ],
    interpretations: [
        { minScore: 0, maxScore: 4, level: 'low', text: '低风险 — 建议常规病房观察，每4-6小时复评' },
        { minScore: 5, maxScore: 6, level: 'medium', text: '中风险 — 需要紧急评估，考虑升级护理级别，每1-2小时复评' },
        { minScore: 7, maxScore: 20, level: 'high', text: '高风险 — 需紧急处理，考虑转入ICU/HDU，持续监护' }
    ],
    pathways: [
        {
            level: 'low',
            steps: [
                '常规病房观察',
                '每4-6小时复评NEWS评分',
                '常规护理',
                '如病情变化及时升级'
            ]
        },
        {
            level: 'medium',
            steps: [
                '紧急评估病情',
                '通知主管医师',
                '考虑升级至HDU',
                '每1-2小时复评',
                '准备应急预案'
            ]
        },
        {
            level: 'high',
            steps: [
                '立即通知ICU团队',
                '准备转运至ICU/HDU',
                '持续心电监护',
                '建立静脉通路',
                '动脉血气分析',
                '准备急救设备'
            ]
        }
    ]
};
