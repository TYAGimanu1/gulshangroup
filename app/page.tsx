'use client';

import { useState, useEffect } from 'react';
import styles from '../styles/home.module.css';

const stats = [
  { number: '10',     label: 'Premium Projects Launched' },
  { number: '50+',    label: 'Accolades Won' },
  { number: '11.35L', label: 'Sqm. Delivered' },
  { number: '1.45L',  label: 'Sqm. Under Construction' },
  { number: '7500+',  label: 'Happy Families' },
  { number: '36',     label: 'Years of Excellence' },
];

const projects = [
  { id: 1, name: 'Taj Skyscape',   location: 'Sector 129, Noida',              type: '5-Star Serviced Apartments', status: 'Under Construction', units: '74 Presidential Suites', rera: 'UPRERA PRJ794678/09/2024', image: '/assets/images/gulshan2.avif' },
  { id: 2, name: 'Dynasty Noida', location: 'Sector 144, Noida',              type: 'Residential',                status: 'Ready to Move',       units: 'Approx. 203 units',      rera: 'UPRERA PRJ950870' },
  { id: 3, name: 'Avante',        location: 'Sector 16B, Greater Noida West', type: 'Residential',                status: 'Under Construction',  units: 'Limited units',          rera: 'UPRERA PRJ860880' },
];

const features = [
  { title: 'Premium Housing Experts',     desc: 'Consistent track record of building and delivering premium residential spaces that define luxury.' },
  { title: '36+ Years of Local Mastery',  desc: 'Deeply rooted in Noida and Greater Noida, with an unmatched understanding of the local market needs.' },
  { title: 'Low-Density Living',          desc: 'Projects offer more breathing space, avoiding the congested feel of modern developments.' },
  { title: 'Uncompromising Construction', desc: 'Rigorous focus on construction quality and immaculate finishing that stands the test of time.' },
  { title: 'Customer Trust & Loyalty',    desc: 'Building long-term relationships that result in repeat buyers and lasting partnerships.' },
  { title: 'Steady, Premium Growth',      desc: 'Controlled and consistent approach, prioritizing premium yet practical homes with steady delivery.' },
];

const faqs = [
  { q: 'What is Gulshan Group?',            a: 'Gulshan Group is a real estate developer based in NCR known for luxurious residential and commercial projects in Noida and Greater Noida West.' },
  { q: 'Where are projects located?',       a: 'Most projects are located in prime sectors in Noida and Greater Noida West with excellent connectivity.' },
  { q: 'Are projects good for investment?', a: 'Yes, we select prime locations with future growth potential, ensuring excellent price appreciation and rental income.' },
  { q: 'Does Gulshan deliver on time?',     a: 'Yes, Gulshan Group is known for maintaining timely delivery on all residential projects.' },
  { q: 'What types of homes are offered?',  a: 'We offer premium and luxury residential apartments, serviced apartments, and commercial projects.' },
];

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add(styles.visible);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    const els = document.querySelectorAll(`.${styles.reveal}, .${styles.revealLeft}`);
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Home() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const carouselImages = [
    '/assets/images/gulshan1.jpg',
    '/assets/images/gulshan5.jpeg',
    '/assets/images/gulshan3.jpg',
  ];

  useScrollReveal();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFormMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log('API Response:', result);

      if (response.ok) {
        setFormMessage({ type: 'success', text: result.message });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        const errorText = result.details || result.error || 'Failed to submit form';
        console.error('API Error:', errorText);
        setFormMessage({ type: 'error', text: errorText });
      }
    } catch (error) {
      console.error('Network Error:', error);
      setFormMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.root}>

      {/* Navigation */}
      <nav className={styles.nav}>
        <span className={styles.navLogo}>Gulshan Group</span>
        <div className={styles.navLinks}>
          <a href="#projects" className={styles.navLink}>Projects</a>
          <a href="#about"    className={styles.navLink}>About</a>
          <a href="#why-us"   className={styles.navLink}>Why Us</a>
          <a href="#faq"      className={styles.navLink}>FAQ</a>
          <a href="#contact"  className={styles.navLink}>Contact</a>
        </div>
      </nav>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroLeft}>
            <div className={styles.heroCarousel}>
              {carouselImages.map((image, index) => (
                <div
                  key={index}
                  className={`${styles.heroSlide} ${index === currentImageIndex ? styles.heroSlideActive : ''}`}
                  style={{
                    backgroundImage: `linear-gradient(rgba(123, 45, 62, 0.15), rgba(123, 45, 62, 0.15)), url('${image}')`,
                  }}
                />
              ))}
            </div>
            <div className={styles.heroOverlayText}>
              <h1 className={styles.heroTitle}>Gulshan Group</h1>
              <p className={styles.heroSubtitle}>36 Years of Creating Unparalleled Luxury with Heart and Trust</p>
            </div>
          </div>

          <aside className={styles.heroRight}>
            <div className={styles.leadCard}>
              <div className={styles.leadHeader}>
                <h3>Gulshan Raj Nagar Extension</h3>
                <p className={styles.leadSub}>Enter your details and we'll call you</p>
              </div>

              <form className={styles.leadForm} onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Enter Name*"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className={styles.input}
                />

                <input
                  type="email"
                  placeholder="Enter Email id*"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className={styles.input}
                />

                <input
                  type="tel"
                  placeholder="Enter 10 Digit Mobile No.*"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className={styles.input}
                />

                <textarea
                  placeholder="Message*"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className={styles.textarea}
                />

                <button type="submit" className={styles.submitBtn} disabled={isLoading}>
                  {isLoading ? 'Submitting...' : 'Submit'}
                </button>
                {formMessage && (
                  <div className={formMessage.type === 'success' ? styles.msgSuccess : styles.msgError}>
                    {formMessage.text}
                  </div>
                )}
              </form>
            </div>
          </aside>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.stats}>
        <div className={`${styles.statsContainer} ${styles.stagger}`}>
          {stats.map((stat, i) => (
            <div key={i} className={`${styles.statItem} ${styles.reveal}`}>
              <div className={styles.statNumber}>{stat.number}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Price CTA */}
      <section className={styles.priceSection}>
    
      </section>

      {/* About */}
      <section id="about" className={styles.about}>
        <div className={styles.aboutContainer}>
          <h2 className={`${styles.sectionTitle} ${styles.revealLeft}`}>About Gulshan Group</h2>
          <p className={`${styles.aboutTextLead} ${styles.reveal}`}>
            Gulshan Group has been part of the NCR real estate market for 36 years, with experience in delivering luxuries and enduring grandeur. If you have looked at properties in Noida and Greater Noida West, chances are you have already come across our name.
          </p>
          <p className={`${styles.aboutText} ${styles.reveal}`}>
            What has made Gulshan so popular over the years is that we have stayed consistent. We focus on delivering homes that actually make sense for the people living in them. The basics like good layouts, enough space and better ventilation are done right.
          </p>
          <p className={`${styles.aboutText} ${styles.reveal}`}>
            What most buyers really want is for their projects to feel lived-in and not just the design to look good on paper. There is attention to how families will actually use spaces, for which balconies, room sizes, or common areas are planned very well.
          </p>
          <p className={`${styles.aboutText} ${styles.reveal}`}>
            We have also built a reputation for being fairly reliable when it comes to delivery timelines, which, as you know, is a big deal in real estate.
          </p>
          <p className={`${styles.aboutText} ${styles.reveal}`}>
            Overall, Gulshan Group Noida is not about some normal projects. It is more about steady work, premium homes and building trust over time, which is why more than 7500 customers and investors keep trusting and investing in Gulshan Homes.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className={styles.projects}>
        <div className={styles.projectsContainer}>
          <h2 className={`${styles.sectionTitleCenter} ${styles.reveal}`}>Our Projects</h2>
          <div className={`${styles.projectsGrid} ${styles.stagger}`}>
            {projects.map((project) => (
              <div 
                key={project.id} 
                className={`${styles.projectCard} ${styles.reveal}`}
                style={project.image ? {
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${project.image}.jpg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                } : {}}
              >
                <div className={styles.projectHeader}>
                  <div className={styles.projectName}>{project.name}</div>
                  <div className={styles.projectLocation}>{project.location}</div>
                </div>
                <div className={styles.projectBody}>
                  <p className={styles.projectMeta}><span className={styles.projectMetaLabel}>Type: </span>{project.type}</p>
                  <p className={styles.projectMeta}><span className={styles.projectMetaLabel}>Status: </span><span className={styles.projectStatus}>{project.status}</span></p>
                  <p className={styles.projectMeta}><span className={styles.projectMetaLabel}>Units: </span>{project.units}</p>
                  <p className={styles.projectMeta}><span className={styles.projectMetaLabel}>RERA: </span>{project.rera}</p>
                  <button className={styles.projectBtn}>View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section id="why-us" className={styles.whyUs}>
        <div className={styles.whyUsContainer}>
          <h2 className={`${styles.sectionTitleCenter} ${styles.reveal}`}>Why Choose Gulshan Group?</h2>
          <div className={`${styles.featuresGrid} ${styles.stagger}`}>
            {features.map((feature, i) => (
              <div key={i} className={`${styles.featureCard} ${styles.reveal}`}>
                <div className={styles.featureTitle}>{feature.title}</div>
                <p className={styles.featureDesc}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className={styles.faq}>
        <div className={styles.faqContainer}>
          <h2 className={`${styles.sectionTitleCenter} ${styles.reveal}`}>Frequently Asked Questions</h2>
          <div className={styles.faqList}>
            {faqs.map((faq, i) => (
              <div key={i} className={`${styles.faqItem} ${styles.reveal}`}>
                <button
                  className={`${styles.faqButton} ${expandedFaq === i ? styles.faqButtonExpanded : ''}`}
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                >
                  {faq.q}
                  <span className={`${styles.faqToggle} ${expandedFaq === i ? styles.faqToggleExpanded : ''}`}>
                    {expandedFaq === i ? '−' : '+'}
                  </span>
                </button>
                {expandedFaq === i && <div className={styles.faqAnswer}>{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className={styles.contact}>
        <div className={styles.contactContainer}>
          <h2 className={`${styles.sectionTitleCenter} ${styles.reveal}`}>Contact With Us!</h2>
          <form className={`${styles.contactForm} ${styles.reveal}`} onSubmit={handleSubmit}>
            <input 
              type="text"  
              className={styles.formInput}    
              placeholder="Your Name"         
              value={formData.name}    
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}    
              required 
              disabled={isLoading}
            />
            <input 
              type="email" 
              className={styles.formInput}    
              placeholder="Your Email"        
              value={formData.email}   
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}   
              required 
              disabled={isLoading}
            />
            <input 
              type="tel"   
              className={styles.formInput}    
              placeholder="Your Phone Number" 
              value={formData.phone}   
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}   
              required 
              disabled={isLoading}
            />
            <textarea           
              className={styles.formTextarea} 
              placeholder="Your Message"      
              value={formData.message} 
              onChange={(e) => setFormData({ ...formData, message: e.target.value })} 
              rows={5}
              disabled={isLoading}
            />
            <label className={styles.formCheckbox}>
              <input 
                type="checkbox" 
                className={styles.formCheckboxInput} 
                required 
                disabled={isLoading}
              />
              I authorize company representatives to Call, SMS, Email or WhatsApp me about its products and offers.
            </label>
            {formMessage && (
              <div style={{
                padding: '12px 16px',
                marginBottom: '12px',
                borderRadius: '6px',
                backgroundColor: formMessage.type === 'success' ? '#d4edda' : '#f8d7da',
                color: formMessage.type === 'success' ? '#155724' : '#721c24',
                border: `1px solid ${formMessage.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
              }}>
                {formMessage.text}
              </div>
            )}
            <button 
              type="submit" 
              className={styles.formSubmit}
              disabled={isLoading}
              style={{ opacity: isLoading ? 0.6 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerLogo}>Gulshan Group</div>
        <p className={styles.footerTagline}>Connecting buyers, sellers, and investors with premium properties in NCR</p>
        <div className={styles.footerLinks}>
        </div>
        <p className={styles.copyright}>&copy; 2026 Gulshan Group. All rights reserved.</p>
      </footer>

    </main>
  );
}