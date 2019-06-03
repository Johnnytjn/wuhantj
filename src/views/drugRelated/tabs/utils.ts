const translationMap = {
  marriage: {
    10: '未婚',
    20: '已婚',
    21: '初婚',
    22: '再婚',
    23: '复婚',
    30: '丧偶',
    40: '离婚',
    90: '未说明的婚姻状况'
  },
  sex: { 0: '未知性别', 1: '男', 2: '女', 9: '未说明性别' },
  culture: {
    10: '研究生教育及以上',
    11: '博士研究生毕业',
    12: '博士研究生结业',
    13: '博士研究生肄业',
    14: '硕士研究生毕业',
    15: '硕士研究生结业',
    16: '硕士研究生肄业',
    17: '研究生毕业',
    18: '研究生结业',
    19: '研究生班肄业',
    20: '大学本科',
    21: '大学本科毕业',
    22: '大学本科结业',
    23: '大学本科肄业',
    28: '大学普通班毕业',
    30: '大学专科',
    31: '大学专科毕业',
    32: '大学专科结业',
    33: '大学专科肄业',
    40: '中等专业学校',
    41: '中等专科毕业',
    42: '中等专科结业',
    43: '中等专科肄业',
    44: '职业高中毕业',
    45: '职业高中结业',
    46: '职业高中肄业',
    47: '技工学校毕业',
    48: '技工学校结业',
    49: '技工学校肄业',
    60: '普通高等中学',
    61: '普通高中毕业',
    62: '普通高中结业',
    63: '普通高中肄业',
    70: '初级中学教育',
    71: '初中毕业',
    73: '初中肄业',
    80: '小学',
    81: '小学毕业',
    83: '小学肄业',
    90: '文盲或半文盲'
  }
};

const arrayProps = [
  'firstAssociate',
  'sensitivePhone',
  'zfyc',
  'toPoisonPlace',
  'criminalRecord',
  'sensitiveAddress',
  'overWeightPackage',
  'sensitivePhone',
  'sensitivePlace',
  'firstAssociate'
];

export const getPropValue = (personData, name) => {
  if (personData) {
    const value = personData[name];
    if (typeof value === 'object') {
      return value;
    } else {
      const propMap = translationMap[name];
      return propMap ? propMap[+value] : value + '' || 'N/A';
    }
  } else {
    return arrayProps.includes(name) ? [] : 'N/A';
  }
};
