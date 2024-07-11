const toDate = (date: string | Date | undefined): string => {
  if (!date) return '';
  if (typeof date === 'string') {
    return date.split('T')[0];
  } else if (date instanceof Date) {
    return date.toISOString().split('T')[0];
  } else {
    throw new Error('Invalid date format.');
  }
};

export { toDate };
