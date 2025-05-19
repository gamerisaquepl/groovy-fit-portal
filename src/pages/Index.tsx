
import React from 'react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Gallery from '@/components/Gallery';
import Plans from '@/components/Plans';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="mt-16">
        <Hero />
        <Features />
        <Gallery />
        <Plans />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
