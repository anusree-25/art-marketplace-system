const artist_id = sessionStorage.getItem('user_id');
if(!artist_id) {
  alert('Please login first!');
  window.location.href = 'login.html';
}

// rest of code remains same
 // Replace with session user_id after login

document.getElementById('uploadForm').onsubmit = async (e) => {
  e.preventDefault();
  const form = new FormData(e.target);
  form.append('artist_id', artist_id);

  const res = await fetch('/artworks/upload', {
    method: 'POST',
    body: form
  });
  const data = await res.json();
  alert(data.message);
  e.target.reset();
};
