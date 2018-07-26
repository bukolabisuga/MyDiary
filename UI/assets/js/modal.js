const modal = document.getElementById('entryModal');
const btn = document.getElementById('entryModalBtn');
const span = document.getElementsByClassName('close')[0];

btn.onclick = () => {
  modal.style.display = 'block';
}

span.onclick = () => {
  modal.style.display = 'none';
}

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}
