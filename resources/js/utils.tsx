const f = new Intl.DateTimeFormat('pt-BR', { timeStyle: 'medium', dateStyle: 'short' });

export const dateTimeFormatter = (d: Date) => {
  return f.format(d);
}