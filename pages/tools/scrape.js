import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noData, setNoData] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setProducts([]);
    setNoData(false);

    try {
      const res = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      if (res.ok) {
        if (data.products.length === 0) {
          setNoData(true);
        } else {
          setProducts(data.products);
        }
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>E-Commerce Product Scraper</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter e-commerce site URL"
          style={styles.input}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Scraping...' : 'Scrape'}
        </button>
      </form>

      {error && <p style={styles.error}>{error}</p>}

      {loading && <p style={styles.loading}>Loading...</p>}

      {noData && <p style={styles.noData}>No products found on the given URL.</p>}

      {products.length > 0 && (
        <div style={styles.productContainer}>
          <h2>Scraped Products:</h2>
          <ul style={styles.productList}>
            {products.map((product, index) => (
              <li key={index} style={styles.productItem}>
                <h3>{product.name}</h3>
                <p><strong>Details:</strong> {product.details}</p>
                <p><strong>Price:</strong> {product.price}</p>
                <img src={product.image} alt={product.name} style={styles.image} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// CSS styles
const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2em',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '1em',
    width: '60%',
    marginRight: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1em',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
  loading: {
    textAlign: 'center',
    color: '#0070f3',
    fontSize: '1.2em',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: '10px',
  },
  noData: {
    color: 'gray',
    textAlign: 'center',
    marginTop: '10px',
  },
  productContainer: {
    marginTop: '20px',
  },
  productList: {
    listStyleType: 'none',
    padding: '0',
  },
  productItem: {
    border: '1px solid #ddd',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '5px',
  },
  image: {
    maxWidth: '150px',
    height: 'auto',
    marginTop: '10px',
  },
};
