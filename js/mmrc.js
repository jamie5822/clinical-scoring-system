// ============================
// mMRC 评分系统配置
// ============================

const MMRC_CONFIG = {
    id: 'mmrc',
    name: 'mMRC 评分',
    fullName: 'modified Medical Research Council Dyspnea Scale',
    description: '改良版英国医学研究委员会呼吸困难量表，用于AECOPD患者呼吸困难程度评估',
    parameters: [
        {
            key: 'dyspnea_level',
            name: '呼吸困难程度',
            type: 'radio',
            options: [
                { 
                    value: '0', 
                    label: '0级', 
                    score: 0,
                    description: '仅在剧烈活动时出现呼吸困难'
                },
                { 
                    value: '1', 
                    label: '1级', 
                    score: 1,
                    description: '平地快步走或爬小坡时出现气短'
                },
                { 
                    value: '2', 
                    label: '2级', 
                    score: 2,
                    description: '平地行走比同龄人慢，需停下休息'
                },
                { 
                    value: '3', 
                    label: '3级', 
                    score: 3,
                    description: '平地行走100米或数分钟后需停下'
                },
                { 
                    value: '4', 
                    label: '4级', 
                    score: 4,
                    description: '严重呼吸困难，不能离开房间'
                }
            ]
        }
    ],
    interpretations: [
        { minScore: 0, maxScore: 1, level: 'low', text: '轻度呼吸困难 — GOLD 1-2级，基础药物治疗即可' },
        { minScore: 2, maxScore: 2, level: 'medium', text: '中度呼吸困难 — GOLD 2-3级，需规范吸入治疗' },
        { minScore: 3, maxScore: 4, level: 'high', text: '重度呼吸困难 — GOLD 3-4级，需强化治疗，考虑肺康复' }
    ],
    pathways: [
        {
            level: 'low',
            steps: [
                '按需使用SABA',
                '规律使用LAMA或LABA',
                '年度流感疫苗接种',
                '戒烟指导'
            ]
        },
        {
            level: 'medium',
            steps: [
                'LABA+LAMA联合治疗',
                '必要时加用ICS',
                '肺康复评估',
                '定期随访（每3个月）'
            ]
        },
        {
            level: 'high',
            steps: [
                'LABA+LAMA+ICS三联治疗',
                '长期氧疗评估（LTOT）',
                '肺康复计划',
                '无创通气评估',
                '肺减容手术评估',
                '姑息治疗讨论'
            ]
        }
    ]
};
