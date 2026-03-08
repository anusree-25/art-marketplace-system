// Login form
document.getElementById('loginForm').onsubmit = async (e) => {
  e.preventDefault();
  const form = e.target;
  const res = await fetch('/auth/login', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      email: form.email.value,
      password: form.password.value
    })
  });
  const data = await res.json();

  if(data.role) {
    alert('Login successful!');

    // Store user_id in sessionStorage
    sessionStorage.setItem('user_id', data.user_id);

    // Redirect to dashboard based on role
    if(data.role === 'buyer') window.location.href = 'buyer-dashboard.html';
    else if(data.role === 'artist') window.location.href = 'artist-dashboard.html';
  } else {
    alert(data.message || 'Login failed');
  }
};

// Signup form
document.getElementById('signupForm').onsubmit = async (e) => {
  e.preventDefault();
  const form = e.target;
  const res = await fetch('/auth/signup', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
      role: form.role.value
    })
  });
  const data = await res.json();
  alert(data.message);
  form.reset();
};
