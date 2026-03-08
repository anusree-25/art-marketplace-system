const user_id = sessionStorage.getItem('user_id');
if(!user_id) {
  alert('Please login first!');
  window.location.href = 'login.html';
}

// rest of code remains same
 // Replace with session user_id after login

// Fetch all artworks from backend
async function loadArtworks() {
  const res = await fetch('/artworks');
  const data = await res.json();

  const sidebar = document.getElementById('categories');
  const main = document.getElementById('artworks');

  // Get unique categories
  const categories = [...new Set(data.map(a => a.category_name))];
  sidebar.innerHTML = '';
  categories.forEach(cat => {
    const div = document.createElement('div');
    div.textContent = cat;
    div.style.cursor = 'pointer';
    div.onclick = () => showCategory(cat, data);
    sidebar.appendChild(div);
  });

  showCategory(categories[0], data);
}

function showCategory(cat, data) {
  const main = document.getElementById('artworks');
  
  // fade out
  main.style.opacity = 0;
  setTimeout(() => {
    main.innerHTML = '';
    data.filter(a => a.category_name === cat).forEach(a => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${a.image_path}" />
        <h4>${a.title}</h4>
        <p>${a.description}</p>
        <p>Price: ${a.price}</p>
        <p>Artist: ${a.artist_name}</p>
        <button onclick="buyArt(${a.art_id}, ${a.price})">Buy</button>
        ${a.is_auction ? `<button onclick="placeBid(${a.art_id})">Place Bid</button>` : ''}
      `;
      main.appendChild(card);
    });
    // fade in
    main.style.opacity = 1;
  }, 200);
}


async function buyArt(art_id, price) {
  const res = await fetch('/orders/buy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id, art_id, price })
  });
  const data = await res.json();
  alert(data.message);
  loadArtworks();
}

async function placeBid(art_id) {
  const amount = prompt('Enter your bid amount:');
  if(!amount) return;

  const res = await fetch('/bids/place', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id, art_id, bid_amount: amount })
  });
  const data = await res.json();
  alert(data.message);
  loadArtworks();
}

// Load artworks on page load
window.onload = loadArtworks;
