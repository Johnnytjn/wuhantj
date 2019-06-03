const translationMap = {
  marriage: { 0: '未婚', 1: '已婚', 2: '未知' },
  sex: { 0: '男', 1: '女', 2: '未知' },
  culture: { 0: '小学', 1: '初中', 2: '高中', 3: '大学及以上' }
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
