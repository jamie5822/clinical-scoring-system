// ============================
// ACT 评分系统配置
// ============================

const ACT_CONFIG = {
    id: 'act',
    name: 'ACT 评分',
    fullName: 'Asthma Control Test',
    description: '哮喘控制测试，用于评估哮喘患者近4周的控制状况',
    parameters: [
        {
            key: 'q1',
            name: '问题1：在过去4周内，哮喘影响您的工作/学习/日常活动频率？',
            type: 'radio',
            options: [
                { value: '1', label: '一直都有', score: 1 },
                { value: '2', label: '大多数时间', score: 2 },
                { value: '3', label: '有些时候', score: 3 },
                { value: '4', label: '很少时间', score: 4 },
                { value: '5', label: '从来没有', score: 5 }
            ]
        },
        {
            key: 'q2',
            name: '问题2：在过去4周内，您有多少次呼吸困难？',
            type: 'radio',
            options: [
                { value: '1', label: '每天不止1次', score: 1 },
                { value: '2', label: '每天1次', score: 2 },
                { value: '3', label: '每周3-6次', score: 3 },
                { value: '4', label: '每周1-2次', score: 4 },
                { value: '5', label: '从来没有', score: 5 }
            ]
        },
        {
            key: 'q3',
            name: '问题3：在过去4周内，哮喘症状（喘息、咳嗽、胸闷等）影响您夜间睡眠或早醒的频率？',
            type: 'radio',
            options: [
                { value: '1', label: '每周≥4晚', score: 1 },
                { value: '2', label: '每周2-3晚', score: 2 },
                { value: '3', label: '每周1晚', score: 3 },
                { value: '4', label: '1-2次', score: 4 },
                { value: '5', label: '从来没有', score: 5 }
            ]
        },
        {
            key: 'q4',
            name: '问题4：在过去4周内，您使用急救药物（如沙丁胺醇）的频率？',
            type: 'radio',
            options: [
                { value: '1', label: '每天≥3次', score: 1 },
                { value: '2', label: '每天1-2次', score: 2 },
                { value: '3', label: '每周2-3次', score: 3 },
                { value: '4', label: '每周≤1次', score: 4 },
                { value: '5', label: '从来没有', score: 5 }
            ]
        },
        {
            key: 'q5',
            name: '问题5：您如何评价过去4周内您的哮喘控制情况？',
            type: 'radio',
            options: [
                { value: '1', label: '完全没有控制', score: 1 },
                { value: '2', label: '控制很差', score: 2 },
                { value: '3', label: '有所控制', score: 3 },
                { value: '4', label: '控制良好', score: 4 },
                { value: '5', label: '完全控制', score: 5 }
            ]
        }
    ],
    interpretations: [
        { minScore: 5, maxScore: 19, level: 'high', text: '哮喘未控制 — 需要调整治疗方案，加强管理' },
        { minScore: 20, maxScore: 24, level: 'medium', text: '哮喘部分控制 — 可考虑升级治疗，密切随访' },
        { minScore: 25, maxScore: 25, level: 'low', text: '哮喘完全控制 — 维持当前治疗方案，定期随访' }
    ],
    pathways: [
        {
            level: 'high',
            steps: [
                '升级治疗：增加ICS剂量或加用LABA',
                '检查吸入技术',
                '排查过敏原和触发因素',
                '2-4周内复诊',
                '考虑生物制剂治疗（重症哮喘）',
                '提供哮喘行动计划'
            ]
        },
        {
            level: 'medium',
            steps: [
                '考虑升级治疗',
                '优化吸入技术',
                '加强环境控制',
                '4-8周内复诊',
                '更新哮喘行动计划'
            ]
        },
        {
            level: 'low',
            steps: [
                '维持当前治疗方案',
                '继续环境控制',
                '定期随访（每3个月）',
                '年度肺功能检查',
                '保持哮喘行动计划'
            ]
        }
    ]
};
