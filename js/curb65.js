// ============================
// CURB-65 评分系统配置
// ============================

const CURB65_CONFIG = {
    id: 'curb65',
    name: 'CURB-65 评分',
    fullName: 'Confusion, Urea, Respiratory rate, Blood pressure, age ≥65',
    description: '社区获得性肺炎（CAP）严重程度评估',
    parameters: [
        {
            key: 'confusion',
            name: 'C - 意识障碍（Confusion）',
            type: 'radio',
            options: [
                { value: 'yes', label: '存在意识障碍', score: 1 },
                { value: 'no', label: '意识清楚', score: 0 }
            ]
        },
        {
            key: 'urea',
            name: 'U - 尿素氮（mmol/L）',
            type: 'radio',
            options: [
                { value: 'gt7', label: '> 7 mmol/L', score: 1 },
                { value: 'le7', label: '≤ 7 mmol/L', score: 0 }
            ]
        },
        {
            key: 'respiratory_rate',
            name: 'R - 呼吸频率（次/分）',
            type: 'radio',
            options: [
                { value: 'ge30', label: '≥ 30 次/分', score: 1 },
                { value: 'lt30', label: '< 30 次/分', score: 0 }
            ]
        },
        {
            key: 'blood_pressure',
            name: 'B - 血压',
            type: 'radio',
            options: [
                { value: 'low', label: 'SBP<90 或 DBP≤60 mmHg', score: 1 },
                { value: 'normal', label: '血压正常', score: 0 }
            ]
        },
        {
            key: 'age',
            name: '65 - 年龄',
            type: 'radio',
            options: [
                { value: 'ge65', label: '≥ 65 岁', score: 1 },
                { value: 'lt65', label: '< 65 岁', score: 0 }
            ]
        }
    ],
    interpretations: [
        { minScore: 0, maxScore: 1, level: 'low', text: '低风险 — 可考虑门诊治疗，口服抗生素' },
        { minScore: 2, maxScore: 2, level: 'medium', text: '中风险 — 建议短期住院或密切门诊观察' },
        { minScore: 3, maxScore: 5, level: 'high', text: '高风险 — 需住院治疗，评分≥3分考虑ICU' }
    ],
    pathways: [
        {
            level: 'low',
            steps: [
                '门诊口服抗生素治疗',
                '阿莫西林或多西环素',
                '3天后复诊评估',
                '注意休息与充分饮水'
            ]
        },
        {
            level: 'medium',
            steps: [
                '建议住院治疗或日间病房',
                '静脉抗生素（头孢曲松+阿奇霉素）',
                '每日评估病情',
                '监测血氧饱和度'
            ]
        },
        {
            level: 'high',
            steps: [
                '立即收入ICU',
                '1小时内采集血培养（2套）',
                '1小时内启动广谱抗生素',
                '动脉血气分析+乳酸',
                '液体复苏评估',
                '考虑辅助通气支持',
                '48-72h后重新评估，降阶梯'
            ]
        }
    ]
};
