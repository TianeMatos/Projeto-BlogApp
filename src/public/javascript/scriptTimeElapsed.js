const timeElapsed  = (date) => {
  const now = new Date();
  const dateInformed = new Date(date);
  const timePast = now.getTime() - dateInformed.getTime();

  const daysPast = Math.round(timePast / (1000 * 60 * 60 * 24)); 
  const housPast = Math.round((timePast - daysPast * 1000 * 60 * 60 * 24) / (1000 * 60 * 60)); 
  const minPast = Math.round((timePast - daysPast * 1000 * 60 * 60 * 24 - housPast * 1000 * 60 * 60) / (1000 * 60));
  const secPast = Math.round((timePast - daysPast * 1000 * 60 * 60 * 24 - housPast * 1000 * 60 * 60 - minPast * 1000 * 60) / 1000); 

  if (daysPast > 0) return `${daysPast} dias atrás`;
  if (housPast > 0) return `${housPast} horas atrás`;
  if (minPast > 0) return `${minPast} minutos atrás`;
  if (secPast > 0) return `${secPast} segundos atrás`;

  return "agora mesmo";
}

document.querySelectorAll('.comment-date').forEach(el => {
  const rawDate = el.getAttribute('data-date');
  el.innerText = timeElapsed(rawDate);
});