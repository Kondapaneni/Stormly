import React from 'react';
import { Cloud, Compass, Heart, Smartphone, Sun, Zap } from 'lucide-react';
import Favorites from './Favorites';

export default function LandingPage() {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          Real-Time Weather at Your Fingertips
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Get accurate weather forecasts and detailed conditions for any location worldwide.
        </p>
      </section>

      {/* Favorites Section */}
      <section className="max-w-md mx-auto">
        <Favorites />
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        <FeatureCard
          icon={<Zap className="h-8 w-8 text-blue-500" />}
          title="Real-Time Updates"
          description="Get instant access to current weather conditions and hourly forecasts"
        />
        <FeatureCard
          icon={<Compass className="h-8 w-8 text-blue-500" />}
          title="Location Search"
          description="Find weather information for any city worldwide with smart search"
        />
        <FeatureCard
          icon={<Heart className="h-8 w-8 text-blue-500" />}
          title="Favorite Places"
          description="Save your frequently checked locations for quick access"
        />
        <FeatureCard
          icon={<Sun className="h-8 w-8 text-blue-500" />}
          title="UV Index"
          description="Stay informed about UV radiation levels for better sun protection"
        />
        <FeatureCard
          icon={<Cloud className="h-8 w-8 text-blue-500" />}
          title="Detailed Forecasts"
          description="View precipitation chances, wind conditions, and humidity levels"
        />
        <FeatureCard
          icon={<Smartphone className="h-8 w-8 text-blue-500" />}
          title="Mobile Friendly"
          description="Access weather information on any device with our responsive design"
        />
      </section>

      {/* Demo Image */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-100 dark:from-gray-900 to-transparent" />
        <img
          src="https://images.unsplash.com/photo-1561484930-998b6a7b22e8?auto=format&fit=crop&w=2000&q=80"
          alt="Weather landscape"
          className="w-full h-[400px] object-cover rounded-xl"
        />
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="space-y-4">
        {icon}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
}