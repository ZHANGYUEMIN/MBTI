// 简易版题目：30题 (原创题库)
// 包含: IE(8), SN(8), TF(7), JP(7)

const questions = [
  // --- E/I (8) ---
  {
    id: 1,
    dimension: 'IE',
    direction: 'I',
    weight: 1,
    text: {
      zh: '周末结束后，你更可能因为独处而恢复精力，还是因为与人相处而恢复精力？',
      en: 'After the weekend, do you feel more recharged by solitude or by socializing?'
    },
    options: [
      { value: 1, text: { zh: '独处', en: 'Solitude' } },
      { value: 0, text: { zh: '与人相处', en: 'Socializing' } }
    ]
  },
  {
    id: 2,
    dimension: 'IE',
    direction: 'I',
    weight: 1,
    text: {
      zh: '一天忙碌后，你更需要安静的个人时间，还是找人聊天放松？',
      en: 'After a busy day, do you need quiet personal time or chat with someone to relax?'
    },
    options: [
      { value: 1, text: { zh: '安静的个人时间', en: 'Quiet personal time' } },
      { value: 0, text: { zh: '找人聊天', en: 'Chat with someone' } }
    ]
  },
  {
    id: 3,
    dimension: 'IE',
    direction: 'I',
    weight: 1,
    text: {
      zh: '长时间社交后，你通常感觉被消耗，还是被激发？',
      en: 'After prolonged socializing, do you usually feel drained or energized?'
    },
    options: [
      { value: 1, text: { zh: '被消耗', en: 'Drained' } },
      { value: 0, text: { zh: '被激发', en: 'Energized' } }
    ]
  },
  {
    id: 4,
    dimension: 'IE',
    direction: 'I',
    weight: 1,
    text: {
      zh: '面对压力时，你更倾向于自己消化，还是向他人倾诉？',
      en: 'When facing stress, do you prefer to process it internally or talk to others?'
    },
    options: [
      { value: 1, text: { zh: '自己消化', en: 'Process internally' } },
      { value: 0, text: { zh: '向他人倾诉', en: 'Talk to others' } }
    ]
  },
  {
    id: 5,
    dimension: 'IE',
    direction: 'I',
    weight: 1,
    text: {
      zh: '你更享受一对一深入交流，还是多人互动的氛围？',
      en: 'Do you enjoy one-on-one deep conversations or group interactions more?'
    },
    options: [
      { value: 1, text: { zh: '一对一深入交流', en: 'One-on-one' } },
      { value: 0, text: { zh: '多人互动', en: 'Group interactions' } }
    ]
  },
  {
    id: 6,
    dimension: 'IE',
    direction: 'I',
    weight: 1,
    text: {
      zh: '当需要重新找回状态时，你更愿意独处，还是外出见人？',
      en: 'When you need to get back on track, do you prefer solitude or going out?'
    },
    options: [
      { value: 1, text: { zh: '独处', en: 'Solitude' } },
      { value: 0, text: { zh: '外出见人', en: 'Going out' } }
    ]
  },
  {
    id: 7,
    dimension: 'IE',
    direction: 'I',
    weight: 1,
    text: {
      zh: '在陌生环境中，你更倾向于先观察，还是主动参与？',
      en: 'In a new environment, do you tend to observe first or participate actively?'
    },
    options: [
      { value: 1, text: { zh: '先观察', en: 'Observe first' } },
      { value: 0, text: { zh: '主动参与', en: 'Participate actively' } }
    ]
  },
  {
    id: 8,
    dimension: 'IE',
    direction: 'I',
    weight: 1,
    text: {
      zh: '你更容易在安静环境中集中精力，还是在热闹环境中？',
      en: 'Do you focus better in quiet environments or lively ones?'
    },
    options: [
      { value: 1, text: { zh: '安静环境', en: 'Quiet environments' } },
      { value: 0, text: { zh: '热闹环境', en: 'Lively environments' } }
    ]
  },

  // --- S/N (8) ---
  {
    id: 9,
    dimension: 'SN',
    direction: 'S',
    weight: 1,
    text: {
      zh: '学习新事物时，你更关注具体事实，还是整体概念？',
      en: 'When learning something new, do you focus on concrete facts or overall concepts?'
    },
    options: [
      { value: 1, text: { zh: '具体事实', en: 'Concrete facts' } },
      { value: 0, text: { zh: '整体概念', en: 'Overall concepts' } }
    ]
  },
  {
    id: 10,
    dimension: 'SN',
    direction: 'S',
    weight: 1,
    text: {
      zh: '你更信任亲身经验，还是直觉与想象？',
      en: 'Do you trust personal experience or intuition and imagination more?'
    },
    options: [
      { value: 1, text: { zh: '亲身经验', en: 'Personal experience' } },
      { value: 0, text: { zh: '直觉与想象', en: 'Intuition and imagination' } }
    ]
  },
  {
    id: 11,
    dimension: 'SN',
    direction: 'S',
    weight: 1,
    text: {
      zh: '描述一件事时，你更重视细节，还是意义与可能性？',
      en: 'When describing something, do you value details or meaning and possibilities more?'
    },
    options: [
      { value: 1, text: { zh: '细节', en: 'Details' } },
      { value: 0, text: { zh: '意义与可能性', en: 'Meaning and possibilities' } }
    ]
  },
  {
    id: 12,
    dimension: 'SN',
    direction: 'S',
    weight: 1,
    text: {
      zh: '你更喜欢循序渐进的方法，还是跳跃式思考？',
      en: 'Do you prefer step-by-step methods or leap-thinking?'
    },
    options: [
      { value: 1, text: { zh: '循序渐进', en: 'Step-by-step' } },
      { value: 0, text: { zh: '跳跃式思考', en: 'Leap-thinking' } }
    ]
  },
  {
    id: 13,
    dimension: 'SN',
    direction: 'S',
    weight: 1,
    text: {
      zh: '面对问题，你更关注“现在是什么”，还是“未来可能是什么”？',
      en: 'Facing a problem, do you focus on "what is" or "what could be"?'
    },
    options: [
      { value: 1, text: { zh: '现在是什么', en: 'What is' } },
      { value: 0, text: { zh: '未来可能是什么', en: 'What could be' } }
    ]
  },
  {
    id: 14,
    dimension: 'SN',
    direction: 'S',
    weight: 1,
    text: {
      zh: '你更容易注意到现实变化，还是潜在趋势？',
      en: 'Do you notice realistic changes or potential trends more easily?'
    },
    options: [
      { value: 1, text: { zh: '现实变化', en: 'Realistic changes' } },
      { value: 0, text: { zh: '潜在趋势', en: 'Potential trends' } }
    ]
  },
  {
    id: 15,
    dimension: 'SN',
    direction: 'S',
    weight: 1,
    text: {
      zh: '工作或学习中，你更依赖实际步骤，还是灵感启发？',
      en: 'In work or study, do you rely on practical steps or inspiration?'
    },
    options: [
      { value: 1, text: { zh: '实际步骤', en: 'Practical steps' } },
      { value: 0, text: { zh: '灵感启发', en: 'Inspiration' } }
    ]
  },
  {
    id: 16,
    dimension: 'SN',
    direction: 'N',
    weight: 1,
    text: {
      zh: '相比已被验证的方法，你更容易被新想法吸引吗？',
      en: 'Are you more attracted to new ideas than proven methods?'
    },
    options: [
      { value: 1, text: { zh: '是的', en: 'Yes' } },
      { value: 0, text: { zh: '不是，更喜欢验证过的方法', en: 'No, prefer proven methods' } }
    ]
  },

  // --- T/F (7) ---
  {
    id: 17,
    dimension: 'TF',
    direction: 'T',
    weight: 1,
    text: {
      zh: '做决定时，你更看重客观合理性，还是他人的感受？',
      en: 'When deciding, do you value objective rationality or others feelings more?'
    },
    options: [
      { value: 1, text: { zh: '客观合理性', en: 'Objective rationality' } },
      { value: 0, text: { zh: '他人的感受', en: 'Others feelings' } }
    ]
  },
  {
    id: 18,
    dimension: 'TF',
    direction: 'T',
    weight: 1,
    text: {
      zh: '你更愿意指出问题本身，还是先顾及情绪影响？',
      en: 'Would you rather point out the problem or consider emotional impact first?'
    },
    options: [
      { value: 1, text: { zh: '指出问题本身', en: 'Point out the problem' } },
      { value: 0, text: { zh: '顾及情绪影响', en: 'Consider emotions' } }
    ]
  },
  {
    id: 19,
    dimension: 'TF',
    direction: 'F',
    weight: 1,
    text: {
      zh: '冲突出现时，你更追求公平，还是和谐？',
      en: 'When conflict arises, do you seek fairness or harmony?'
    },
    options: [
      { value: 0, text: { zh: '公平', en: 'Fairness' } },
      { value: 1, text: { zh: '和谐', en: 'Harmony' } }
    ]
  },
  {
    id: 20,
    dimension: 'TF',
    direction: 'T',
    weight: 1,
    text: {
      zh: '评价一件事，你更重视逻辑一致性，还是价值意义？',
      en: 'Evaluating something, do you value logical consistency or value meaning more?'
    },
    options: [
      { value: 1, text: { zh: '逻辑一致性', en: 'Logical consistency' } },
      { value: 0, text: { zh: '价值意义', en: 'Value meaning' } }
    ]
  },
  {
    id: 21,
    dimension: 'TF',
    direction: 'F',
    weight: 1,
    text: {
      zh: '他人向你求助时，你更倾向于给建议，还是给予安慰？',
      en: 'When others ask for help, do you tend to give advice or comfort?'
    },
    options: [
      { value: 0, text: { zh: '给建议', en: 'Give advice' } },
      { value: 1, text: { zh: '给予安慰', en: 'Give comfort' } }
    ]
  },
  {
    id: 22,
    dimension: 'TF',
    direction: 'T',
    weight: 1,
    text: {
      zh: '在团队中，你更关注效率，还是成员体验？',
      en: 'In a team, do you focus more on efficiency or member experience?'
    },
    options: [
      { value: 1, text: { zh: '效率', en: 'Efficiency' } },
      { value: 0, text: { zh: '成员体验', en: 'Member experience' } }
    ]
  },
  {
    id: 23,
    dimension: 'TF',
    direction: 'T',
    weight: 1,
    text: {
      zh: '决策后，你更在意是否正确，还是是否被接受？',
      en: 'After deciding, do you care more about correctness or acceptance?'
    },
    options: [
      { value: 1, text: { zh: '是否正确', en: 'Correctness' } },
      { value: 0, text: { zh: '是否被接受', en: 'Acceptance' } }
    ]
  },

  // --- J/P (7) ---
  {
    id: 24,
    dimension: 'JP',
    direction: 'J',
    weight: 1,
    text: {
      zh: '你更喜欢提前规划，还是保持灵活？',
      en: 'Do you prefer planning ahead or staying flexible?'
    },
    options: [
      { value: 1, text: { zh: '提前规划', en: 'Planning ahead' } },
      { value: 0, text: { zh: '保持灵活', en: 'Staying flexible' } }
    ]
  },
  {
    id: 25,
    dimension: 'JP',
    direction: 'J',
    weight: 1,
    text: {
      zh: '计划被打乱时，你更感到不适，还是无所谓？',
      en: 'When plans are disrupted, do you feel uncomfortable or indifferent?'
    },
    options: [
      { value: 1, text: { zh: '感到不适', en: 'Uncomfortable' } },
      { value: 0, text: { zh: '无所谓', en: 'Indifferent' } }
    ]
  },
  {
    id: 26,
    dimension: 'JP',
    direction: 'J',
    weight: 1,
    text: {
      zh: '你更安心于“事情已确定”，还是“事情仍可调整”？',
      en: 'Do you feel more secure when "things are settled" or "things are adjustable"?'
    },
    options: [
      { value: 1, text: { zh: '事情已确定', en: 'Things are settled' } },
      { value: 0, text: { zh: '事情仍可调整', en: 'Things are adjustable' } }
    ]
  },
  {
    id: 27,
    dimension: 'JP',
    direction: 'J',
    weight: 1,
    text: {
      zh: '面对任务，你更早开始，还是临近截止才行动？',
      en: 'Facing a task, do you start early or act near the deadline?'
    },
    options: [
      { value: 1, text: { zh: '更早开始', en: 'Start early' } },
      { value: 0, text: { zh: '临近截止', en: 'Near deadline' } }
    ]
  },
  {
    id: 28,
    dimension: 'JP',
    direction: 'J',
    weight: 1,
    text: {
      zh: '你更享受完成事项，还是探索过程？',
      en: 'Do you enjoy completing items or exploring the process more?'
    },
    options: [
      { value: 1, text: { zh: '完成事项', en: 'Completing items' } },
      { value: 0, text: { zh: '探索过程', en: 'Exploring process' } }
    ]
  },
  {
    id: 29,
    dimension: 'JP',
    direction: 'J',
    weight: 1,
    text: {
      zh: '生活中你更偏好有序，还是随性？',
      en: 'Do you prefer order or spontaneity in life?'
    },
    options: [
      { value: 1, text: { zh: '有序', en: 'Order' } },
      { value: 0, text: { zh: '随性', en: 'Spontaneity' } }
    ]
  },
  {
    id: 30,
    dimension: 'JP',
    direction: 'J',
    weight: 1,
    text: {
      zh: '你更容易被清晰规则吸引，还是开放选择吸引？',
      en: 'Are you more attracted to clear rules or open choices?'
    },
    options: [
      { value: 1, text: { zh: '清晰规则', en: 'Clear rules' } },
      { value: 0, text: { zh: '开放选择', en: 'Open choices' } }
    ]
  }
];

export default questions;
