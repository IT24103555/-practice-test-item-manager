import { useEffect, useMemo, useState } from 'react';

const API_BASE =
  process.env.REACT_APP_API_URL || 'https://practice-test-item-manager-production.up.railway.app';

const initialForm = {
  name: '',
  quantity: 1,
  price: 0,
  category: 'General',
};

function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const totalValue = useMemo(
    () => items.reduce((sum, item) => sum + Number(item.quantity) * Number(item.price), 0),
    [items]
  );

  const loadItems = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch(`${API_BASE}/api/items`);
      if (!res.ok) throw new Error('Failed to load items');
      const data = await res.json();
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'quantity' || name === 'price' ? Number(value) : value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setError('Item name is required');
      return;
    }

    try {
      setError('');
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId
        ? `${API_BASE}/api/items/${editingId}`
        : `${API_BASE}/api/items`;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Request failed');
      }

      await loadItems();
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const onEdit = (item) => {
    setEditingId(item._id);
    setForm({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      category: item.category || 'General',
    });
  };

  const onDelete = async (id) => {
    try {
      setError('');
      const res = await fetch(`${API_BASE}/api/items/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Delete failed');
      }
      await loadItems();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="page">
      <div className="card">
        <h1>Item Manager</h1>
        <p className="sub">Track quantity, price, and category.</p>

        <form onSubmit={onSubmit} className="form">
          <label>
            Item Name
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Item name"
              required
            />
          </label>

          <label>
            Quantity
            <input
              name="quantity"
              type="number"
              min="1"
              value={form.quantity}
              onChange={onChange}
              required
            />
          </label>

          <label>
            Price
            <input
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={onChange}
              required
            />
          </label>

          <label>
            Category
            <input
              name="category"
              value={form.category}
              onChange={onChange}
              placeholder="General"
            />
          </label>

          <div className="actions">
            <button type="submit">{editingId ? 'Update Item' : 'Add Item'}</button>
            {editingId ? (
              <button type="button" className="secondary" onClick={resetForm}>
                Cancel
              </button>
            ) : null}
          </div>
        </form>

        {error ? <p className="error">{error}</p> : null}
      </div>

      <section className="list card">
        <div className="list-head">
          <h2>Items</h2>
          <span>Total value: ${totalValue.toFixed(2)}</span>
        </div>

        {loading ? <p>Loading...</p> : null}

        {!loading && items.length === 0 ? <p>No items yet.</p> : null}

        <ul>
          {items.map((item) => (
            <li key={item._id}>
              <div>
                <strong>{item.name}</strong>
                <p>
                  Qty: {item.quantity} | Price: ${Number(item.price).toFixed(2)} | Category:{' '}
                  {item.category || 'General'}
                </p>
              </div>
              <div className="row-actions">
                <button type="button" className="secondary" onClick={() => onEdit(item)}>
                  Edit
                </button>
                <button type="button" className="danger" onClick={() => onDelete(item._id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;
