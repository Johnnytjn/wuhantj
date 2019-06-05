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
      return (value !== undefined && value !== null && value + '') || 'N/A';
    }
  } else {
    return arrayProps.includes(name) ? [] : 'N/A';
  }
};

export default {};
