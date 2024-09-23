const f = new Intl.DateTimeFormat('pt-BR', { timeStyle: 'medium', dateStyle: 'short' });

export const dateTimeFormatter = (d?: string | Date) => {
  if (!d) return '';

  if (typeof d === 'string') d = new Date(d);

  return f.format(d);
}