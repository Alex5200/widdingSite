import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

// Wedding data
const weddingData = {
  couple: {
    groom: {
      name: 'Александр',
      role: 'Жених',
      description: 'Любящий сын, верный друг и скоро — лучший муж!',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop'
    },
    bride: {
      name: 'Алевтина',
      role: 'Невеста',
      description: 'Красивая, умная и soon-to-be замужем!',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop'
    }
  },
  date: '15 Июля 2025',
  details: [
    { icon: '📅', title: 'Дата', text: '15 Июля 2025', subtext: 'Вторник' },
    { icon: '⏰', title: 'Время сбора гостей', text: '14:00', subtext: 'Начало вечера' },
    { icon: '📍', title: 'Место проведения', text: 'Ресторан "Дюна"', subtext: 'Юбилейный проспект, 23В' }
  ],
  program: [
    { time: '14:00', title: 'Сбор гостей', description: 'Welcome-зона, легкие закуски и напитки' },
    { time: '15:00', title: 'Торжественная церемония', description: 'Обмен кольцами и клятвами' },
    { time: '16:00', title: 'Праздничный банкет', description: 'Ужин, тосты и поздравления' },
    { time: '20:00', title: 'Торт и салют', description: 'Сладкое завершение вечера' },
    { time: '22:00', title: 'Завершение вечера', description: 'Бенгальские огни и прощальные слова' }
  ],
  location: {
    name: 'Ресторан "Дюна"',
    address: 'Юбилейный проспект, 23В',
    description: 'Прекрасное место для празднования самого важного дня в нашей жизни. Уютная атмосфера и великолепная кухня сделают ваш вечер незабываемым.',
    amenities: ['🅿️ Парковка', '🌟 Банкетный зал', '🎵 Танцевальная площадка']
  }
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
  }
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.8 }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
}

const floatingAnimation = {
  y: [0, -20, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut"
  }
}

const heartbeatAnimation = {
  scale: [1, 1.2, 1],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut"
  }
}

// Page Loader Component
function PageLoader({ onComplete }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onComplete, 800)
    }, 1500)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, visibility: 'hidden' }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="loader-heart"
            animate={heartbeatAnimation}
          >
            <span>💕</span>
            <motion.span
              className="loader-star loader-star-1"
              animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ✨
            </motion.span>
            <motion.span
              className="loader-star loader-star-2"
              animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              💫
            </motion.span>
          </motion.div>
          <motion.p
            className="loader-text"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Загрузка...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Falling Petals Component
function FallingPetals() {
  const [petals, setPetals] = useState([])

  useEffect(() => {
    const newPetals = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 7,
      emoji: ['🌸', '🌺', '🌹', '💮', '🌷'][Math.floor(Math.random() * 5)]
    }))
    setPetals(newPetals)
  }, [])

  return (
    <div className="falling-petals">
      {petals.map(petal => (
        <motion.div
          key={petal.id}
          className="petal"
          style={{ left: `${petal.left}%` }}
          initial={{ top: '-10%', rotate: 0 }}
          animate={{ 
            top: '110%', 
            rotate: 720 
          }}
          transition={{ 
            duration: petal.duration, 
            delay: petal.delay, 
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {petal.emoji}
        </motion.div>
      ))}
    </div>
  )
}

// Hero Section Component
function HeroSection() {
  return (
    <motion.header
      className="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <FallingPetals />
      <div className="hero-overlay" />
      <motion.div
        className="hero-particles"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="hero-content"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="hero-date" variants={fadeInUp}>
          {weddingData.date}
        </motion.p>
        <motion.h1 className="hero-title" variants={scaleIn}>
          <span className="name-first">{weddingData.couple.groom.name}</span>
          <motion.span 
            className="ampersand"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            &
          </motion.span>
          <span className="name-second">{weddingData.couple.bride.name}</span>
        </motion.h1>
        <motion.p className="hero-subtitle" variants={fadeInUp}>
          Приглашаем вас на нашу свадьбу!
        </motion.p>
        <motion.a
          href="#details"
          className="btn-primary"
          variants={fadeInUp}
          whileHover={{ y: -5, boxShadow: "0 20px 60px rgba(212, 165, 165, 0.25)" }}
          whileTap={{ y: -2 }}
        >
          Подробнее
        </motion.a>
      </motion.div>
      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, -10, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span>
          <motion.div
            className="scroll-dot"
            animate={{ opacity: [1, 0], top: [8, 25] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </span>
      </motion.div>
    </motion.header>
  )
}

// Couple Card Component
function CoupleCard({ person, direction, delay }) {
  return (
    <motion.div
      className="couple-card"
      initial={{ opacity: 0, x: direction === 'left' ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay }}
    >
      <motion.div
        className="photo-frame"
        whileHover={{ scale: 1.02 }}
      >
        <motion.div
          className="frame-shine"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        />
        <img src={person.photo} alt={person.name} className="couple-photo" />
      </motion.div>
      <motion.h3
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        {person.name}
      </motion.h3>
      <p className="couple-role">{person.role}</p>
      <p className="couple-description">{person.description}</p>
    </motion.div>
  )
}

// Couple Section Component
function CoupleSection() {
  return (
    <section className="couple" id="couple">
      <div className="container">
        <motion.h2
          className="section-title"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Жених и Невеста
        </motion.h2>
        <motion.div
          className="decorative-divider"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span className="leaf" animate={{ rotate: [-15, 15, -15] }} transition={{ duration: 3, repeat: Infinity }}>🌿</motion.span>
          <motion.span className="heart" animate={heartbeatAnimation}>💕</motion.span>
          <motion.span className="leaf" animate={{ rotate: [-15, 15, -15] }} transition={{ duration: 3, repeat: Infinity }}>🌿</motion.span>
        </motion.div>
        <div className="couple-grid">
          <CoupleCard person={weddingData.couple.groom} direction="left" delay={0.2} />
          <motion.div
            className="couple-divider"
            animate={heartbeatAnimation}
          >
            <span className="divider-heart">💖</span>
          </motion.div>
          <CoupleCard person={weddingData.couple.bride} direction="right" delay={0.4} />
        </div>
      </div>
    </section>
  )
}

// Detail Card Component
function DetailCard({ detail, index }) {
  return (
    <motion.div
      className="detail-card"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -15, scale: 1.02 }}
    >
      <motion.div
        className="detail-icon-wrapper"
        whileHover={{ scale: 1.1 }}
      >
        <motion.div
          className="detail-icon"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
        >
          {detail.icon}
        </motion.div>
        <div className="icon-glow" />
      </motion.div>
      <h3>{detail.title}</h3>
      <p className="detail-text">{detail.text}</p>
      <p className="detail-subtext">{detail.subtext}</p>
    </motion.div>
  )
}

// Details Section Component
function DetailsSection() {
  return (
    <section className="details" id="details">
      <div className="container">
        <motion.h2
          className="section-title"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Детали События
        </motion.h2>
        <motion.div
          className="decorative-divider"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span className="leaf" animate={{ rotate: [-15, 15, -15] }} transition={{ duration: 3, repeat: Infinity }}>🌿</motion.span>
          <motion.span className="heart" animate={heartbeatAnimation}>💕</motion.span>
          <motion.span className="leaf" animate={{ rotate: [-15, 15, -15] }} transition={{ duration: 3, repeat: Infinity }}>🌿</motion.span>
        </motion.div>
        <motion.div
          className="details-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {weddingData.details.map((detail, index) => (
            <DetailCard key={index} detail={detail} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Location Section Component
function LocationSection() {
  return (
    <section className="location" id="location">
      <div className="container">
        <motion.h2
          className="section-title"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Место Проведения
        </motion.h2>
        <motion.div
          className="location-info"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="restaurant-details" variants={fadeInUp}>
            <h3>{weddingData.location.name}</h3>
            <p className="address">{weddingData.location.address}</p>
            <p className="description">{weddingData.location.description}</p>
            <div className="amenities">
              {weddingData.location.amenities.map((amenity, index) => (
                <motion.span
                  key={index}
                  whileHover={{ y: -3, scale: 1.05 }}
                >
                  {amenity}
                </motion.span>
              ))}
            </div>
          </motion.div>
          <motion.div className="map-container" variants={fadeInUp}>
            <div id="map" />
            <a
              href="https://yandex.ru/maps/-/CPsn6H-A"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-map"
            >
              Открыть в Яндекс.Картах
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// Timeline Item Component
function TimelineItem({ item, index }) {
  return (
    <motion.div
      className="timeline-item"
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <div className="timeline-time">
        <motion.span
          className="time-circle"
          whileHover={{ scale: 1.2 }}
        >
          {item.time}
        </motion.span>
      </div>
      <div className="timeline-content">
        <h4>{item.title}</h4>
        <p>{item.description}</p>
      </div>
    </motion.div>
  )
}

// Program Section Component
function ProgramSection() {
  return (
    <section className="program">
      <div className="container">
        <motion.h2
          className="section-title"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Программа Дня
        </motion.h2>
        <motion.div
          className="decorative-divider"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span className="leaf" animate={{ rotate: [-15, 15, -15] }} transition={{ duration: 3, repeat: Infinity }}>🌿</motion.span>
          <motion.span className="heart" animate={heartbeatAnimation}>💕</motion.span>
          <motion.span className="leaf" animate={{ rotate: [-15, 15, -15] }} transition={{ duration: 3, repeat: Infinity }}>🌿</motion.span>
        </motion.div>
        <motion.div
          className="timeline"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {weddingData.program.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// RSVP Form Component
function RSVPSection() {
  const [formData, setFormData] = useState({
    name: '',
    attendance: '',
    phone: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('RSVP Data:', formData)
    alert(`Спасибо, ${formData.name}! Ваш ответ успешно отправлен.`)
    setFormData({ name: '', attendance: '', phone: '', message: '' })
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section className="rsvp">
      <div className="container">
        <motion.h2
          className="section-title"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Подтвердите Присутствие
        </motion.h2>
        <motion.div
          className="decorative-divider"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span className="leaf" animate={{ rotate: [-15, 15, -15] }} transition={{ duration: 3, repeat: Infinity }}>🌿</motion.span>
          <motion.span className="heart" animate={heartbeatAnimation}>💕</motion.span>
          <motion.span className="leaf" animate={{ rotate: [-15, 15, -15] }} transition={{ duration: 3, repeat: Infinity }}>🌿</motion.span>
        </motion.div>
        <motion.p
          className="rsvp-text"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Пожалуйста, подтвердите ваше присутствие до 1 июля 2025
        </motion.p>
        <motion.form
          className="rsvp-form"
          onSubmit={handleSubmit}
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className="form-group"
            whileFocusWithin={{ scale: 1.02 }}
          >
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Ваше имя и фамилия"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </motion.div>
          <motion.div className="form-group">
            <select
              id="attendance"
              name="attendance"
              value={formData.attendance}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Сможете ли вы прийти?</option>
              <option value="yes">С удовольствием приду</option>
              <option value="no">К сожалению, не смогу</option>
            </select>
          </motion.div>
          <motion.div className="form-group">
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Ваш телефон"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </motion.div>
          <motion.div className="form-group">
            <textarea
              id="message"
              name="message"
              placeholder="Пожелания или комментарии (необязательно)"
              rows="3"
              value={formData.message}
              onChange={handleChange}
            />
          </motion.div>
          <motion.button
            type="submit"
            className="btn-primary btn-submit"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            Отправить
          </motion.button>
          <AnimatePresence>
            {submitted && (
              <motion.div
                className="success-message"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                ✅ Спасибо за подтверждение!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  )
}

// Footer Component
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <motion.div
          className="footer-hearts"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span animate={heartbeatAnimation}>💕</motion.span>
          <motion.span animate={{ ...heartbeatAnimation, delay: 0.3 }}>💗</motion.span>
          <motion.span animate={heartbeatAnimation}>💕</motion.span>
        </motion.div>
        <p className="footer-text">С любовью, Александр и Алевтина</p>
        <p className="footer-date">15.07.2025</p>
        <motion.div
          className="hashtag"
          whileHover={{ scale: 1.05 }}
        >
          #СвадьбаАиА2025
        </motion.div>
      </div>
    </footer>
  )
}

// Main App Component
function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <PageLoader onComplete={() => setLoading(false)} />
      {!loading && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <HeroSection />
          <CoupleSection />
          <DetailsSection />
          <LocationSection />
          <ProgramSection />
          <RSVPSection />
          <Footer />
        </motion.main>
      )}
    </>
  )
}

export default App
