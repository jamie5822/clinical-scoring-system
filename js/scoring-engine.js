// ============================
// 临床评分引擎 - 核心模块
// ============================

class ScoringEngine {
    constructor() {
        this.currentSystem = null;
        this.currentData = {};
    }

    // 根据参数定义和用户输入计算分数
    calculateScore(systemConfig, formData) {
        let totalScore = 0;
        const details = [];

        for (const param of systemConfig.parameters) {
            const value = formData[param.key];
            let score = 0;

            if (param.type === 'select' || param.type === 'radio') {
                score = this.matchOptionScore(param.options, value);
            } else if (param.type === 'number') {
                score = this.matchRangeScore(param.options, parseFloat(value));
            }

            details.push({
                name: param.name,
                value: value,
                score: score
            });

            totalScore += score;
        }

        // 确定风险等级
        const riskLevel = this.determineRiskLevel(totalScore, systemConfig.interpretations);

        // 获取诊疗路径
        const pathway = this.getPathway(riskLevel, systemConfig.pathways);

        return {
            totalScore,
            details,
            riskLevel,
            pathway,
            interpretation: this.getInterpretation(riskLevel, systemConfig.interpretations)
        };
    }

    matchOptionScore(options, selectedValue) {
        for (const opt of options) {
            if (opt.value === selectedValue || String(opt.value) === String(selectedValue)) {
                return opt.score;
            }
        }
        return 0;
    }

    matchRangeScore(options, numericValue) {
        if (isNaN(numericValue)) return 0;
        
        for (const opt of options) {
            const min = opt.min !== undefined ? opt.min : -Infinity;
            const max = opt.max !== undefined ? opt.max : Infinity;
            
            if (numericValue >= min && numericValue <= max) {
                return opt.score;
            }
        }
        return 0;
    }

    determineRiskLevel(score, interpretations) {
        for (const interp of interpretations) {
            if (score >= interp.minScore && score <= interp.maxScore) {
                return interp.level;
            }
        }
        return 'unknown';
    }

    getInterpretation(level, interpretations) {
        const match = interpretations.find(i => i.level === level);
        return match ? match.text : '';
    }

    getPathway(level, pathways) {
        const match = pathways.find(p => p.level === level);
        return match ? match.steps : [];
    }
}

// 全局引擎实例
const engine = new ScoringEngine();
