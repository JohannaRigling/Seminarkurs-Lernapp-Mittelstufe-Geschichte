import { useState } from 'react'
import '../styles/LoginPage.css'

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    // TODO: API-Aufruf für Login/Registrierung
    console.log('Form submitted:', formData)
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Geschichts-Lernapp</h1>
        <p className="subtitle">Lerne Geschichte auf eine neue Art</p>

        <div className="auth-tabs">
          <button
            className={isLogin ? 'active' : ''}
            onClick={() => setIsLogin(true)}
          >
            Anmelden
          </button>
          <button
            className={!isLogin ? 'active' : ''}
            onClick={() => setIsLogin(false)}
          >
            Registrieren
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Benutzername"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required={!isLogin}
            />
          )}

          <input
            type="email"
            placeholder="E-Mail"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />

          <input
            type="password"
            placeholder="Passwort"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />

          <button type="submit" className="btn btn-primary">
            {isLogin ? 'Anmelden' : 'Registrieren'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
