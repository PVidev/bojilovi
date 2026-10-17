import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MarriageTimer from './components/MarriageTimer'
import GuestPhotosGallery from './components/GuestPhotosGallery'
import WeddingPhotosGallery from './components/WeddingPhotosGallery'
import InvitationRetro from './components/InvitationRetro'
import WishesSection from './components/WishesSection'
import Footer from './components/Footer'
import './App.css'

export const App: React.FC = () => {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Hero />
        <MarriageTimer />
        <GuestPhotosGallery />
        <WeddingPhotosGallery />
        <InvitationRetro />
        <WishesSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
