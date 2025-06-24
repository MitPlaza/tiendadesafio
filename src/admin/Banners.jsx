// src/admin/Banners.jsx
import { useState, useEffect } from 'react';

export default function Banners() {
  const [banners, setBanners] = useState([]);
  const [file, setFile] = useState(null);
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    fetch('/api/banners', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(setBanners);
  }, [token]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Selecciona una imagen');
    const fd = new FormData();
    fd.append('banner', file);
    const res = await fetch('/api/banners', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: fd
    });
    const data = await res.json();
    if (res.ok) setBanners(b => [...b, data]);
    else alert(data.error);
  };

  return (
    <div>
      <h2>Gestionar Banners</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
        <button type="submit">Subir banner</button>
      </form>
      <div>
        {banners.map(b => <img key={b.url} src={b.url} alt="Banner" style={{ width: '200px', margin: '1rem' }} />)}
      </div>
    </div>
  );
}


