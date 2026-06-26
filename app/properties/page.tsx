'use client';

import styles from '../../styles/properties.module.css';

const dummyProperties = [
  { id: 1, name: 'Taj Skyscape', price: '₹ 75 L+', beds: 3, baths: 2, sqft: '2400 sqft', image: '🏢' },
  { id: 2, name: 'Dynasty Noida', price: '₹ 1.5 Cr+', beds: 4, baths: 3, sqft: '3800 sqft', image: '🏡' },
  { id: 3, name: 'Avante', price: '₹ 2 Cr+', beds: 5, baths: 4, sqft: '4500 sqft', image: '🌇' },
];

export default function PropertiesPage() {
  return (
    <main className={styles.root}>
      {/* Navigation */}
      <nav>
        <a href="/" className={styles.navBack}>{'Gulshan Group'}</a>
        <a href="/" className={styles.navBack}>{'← Back Home'}</a>
      </nav>

      {/* Header Section */}
      <section className={styles.propertiesHeader}>
        <h1>Our Projects</h1>
        <p>Handpicked premium projects waiting for you</p>
      </section>

      {/* Filters Bar */}
      <section className={styles.filters}>
        <div className={styles.filtersContainer}>
          <input type="text" className={styles.searchInput} placeholder="Search by location..." />
          <select className={styles.searchSelect}>
            <option>All Prices</option>
            <option>Under ₹1 Cr</option>
            <option>₹1 - 3 Cr</option>
            <option>Above ₹3 Cr</option>
          </select>
          <button className={styles.searchBtn}>Search</button>
        </div>
      </section>

      {/* Properties Grid */}
      <section className={styles.propertiesSection}>
        <div className={styles.propertiesContainer}>
          <div className={styles.propertiesGrid}>
            {dummyProperties.map((property) => (
              <div key={property.id} className={styles.propertyCard}>
                <div className={styles.propertyImage}>{property.image}</div>
                <div className={styles.propertyDetails}>
                  <h3>{property.name}</h3>
                  <p className={styles.propertyPrice}>{property.price}</p>
                  <div className={styles.propertySpecs}>
                    <span>🛏️ {property.beds} Beds</span>
                    <span>🚿 {property.baths} Baths</span>
                    <span>📏 {property.sqft}</span>
                  </div>
                  <button className={styles.propertyBtn}>View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2026 Gulshan Group. All rights reserved.</p>
      </footer>
    </main>
  );
}
