import React from 'react';
import { Leaf, Droplet, RefreshCw, Smile, Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, children }) => (
  <motion.div
    className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-3xl shadow-lg"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.4 }}
  >
    <div className="p-4 bg-white rounded-full shadow-md mb-4">
      <Icon className="w-8 h-8 text-green-600 animate-pulse" />
    </div>
    <h3 className="text-xl font-bold text-green-700 mb-2">{title}</h3>
    <p className="text-gray-700 leading-tight">{children}</p>
  </motion.div>
);

const Testimonial = ({ quote, author }) => (
  <motion.div
    className="bg-white p-8 rounded-2xl shadow-xl mx-4"
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <p className="text-gray-600 italic mb-4">“{quote}”</p>
    <div className="flex items-center space-x-3">
      <Heart className="w-5 h-5 text-red-500" />
      <span className="font-semibold text-green-800">{author}</span>
    </div>
  </motion.div>
);

const AboutPage = () => (
  <section className="bg-gradient-to-b from-white via-green-50 to-white text-gray-900">
    {/* Hero Section */}
    <div className="relative h-72 md:h-96 overflow-hidden">
      <img
        src="/images/juices-hero.jpg"
        alt="Fresh juices"
        className="w-full h-full object-cover mix-blend-overlay"
      />
      <div className="absolute inset-0 bg-green-800 bg-opacity-50 flex flex-col justify-center items-center text-center px-6">
        <motion.h1
          className="text-3xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-wider"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Welcome to Juice Plus
        </motion.h1>
        <motion.p
          className="mt-4 text-md md:text-lg text-green-100 max-w-xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Where every sip celebrates health, freshness, and vibrant energy.
        </motion.p>
      </div>
    </div>

    <div className="container mx-auto py-20 px-6 md:px-12 space-y-20">
      {/* Vibrant Values */}
      <motion.div
        className="grid md:grid-cols-3 gap-8 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <Star className="mx-auto w-10 h-10 text-green-500 mb-4" />
          <h3 className="text-xl font-bold text-green-700 mb-2">
            Quality First
          </h3>
          <p className="text-gray-700">Only the best ingredients make the cut.</p>
        </div>
        <div>
          <Leaf className="mx-auto w-10 h-10 text-green-500 mb-4" />
          <h3 className="text-xl font-bold text-green-700 mb-2">
            Local Goodness
          </h3>
          <p className="text-gray-700">Sourced from farms in our community.</p>
        </div>
        <div>
          <RefreshCw className="mx-auto w-10 h-10 text-green-500 mb-4" />
          <h3 className="text-xl font-bold text-green-700 mb-2">
            Endless Variety
          </h3>
          <p className="text-gray-700">New blends to excite your taste buds.</p>
        </div>
      </motion.div>

      {/* Mission & Story */}
      <motion.div
        className="md:flex md:items-center md:space-x-10 space-y-8 md:space-y-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <img
          src="/images/team-making-juice.jpg"
          alt="Team making juice"
          className="w-full md:w-1/2 rounded-3xl shadow-2xl"
        />
        <div>
          <h2 className="text-3xl font-black text-green-600 mb-4">
            Our Story & Mission
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Born from a passion for wellness, Juice Plus was founded by a group
            of friends determined to make nutritious, delicious juices
            accessible to all. Today, we continue that legacy, blending
            organic fruits and veggies into revitalizing drinks that support
            your lifestyle and our planet.
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white font-bold rounded-full shadow-xl hover:from-green-700 hover:to-green-600 transition">
            Read Our Full Story
          </button>
        </div>
      </motion.div>

      {/* What Sets Us Apart */}
      <div>
        <h2 className="text-3xl font-black text-center text-green-600 mb-8">
          What Makes Us Shine
        </h2>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
          <FeatureCard icon={Droplet} title="Pure Ingredients">
            Zero preservatives—just nature in its purest form.
          </FeatureCard>
          <FeatureCard icon={Droplet} title="Custom Creations">
            Craft your perfect blend with our interactive flavor wheel.
          </FeatureCard>
          <FeatureCard icon={RefreshCw} title="Green Practices">
            Eco-friendly packaging and community clean-up initiatives.
          </FeatureCard>
          <FeatureCard icon={Smile} title="Welcoming Vibe">
            A friendly team ready to greet and guide you every visit.
          </FeatureCard>
        </div>
      </div>

      {/* Testimonials */}
      <div>
        <h2 className="text-3xl font-black text-center text-green-600 mb-8">
          Loved by Our Community
        </h2>
        <div className="flex overflow-x-auto py-4">
          <Testimonial
            quote="The best juice bar in town! I feel energized after every sip."
            author="Emily R."
          />
          <Testimonial
            quote="Amazing flavors and the staff are so friendly!"
            author="Carlos M."
          />
          <Testimonial
            quote="I love customizing my own juice blends. Truly unique!"
            author="Sarah L."
          />
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center py-12">
        <motion.h2
          className="text-4xl font-extrabold text-green-700 mb-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Ready to Experience the Difference?
        </motion.h2>
        <p className="text-gray-700 mb-6">
          Stop by Juice Plus and join our health movement today!
        </p>
        <button className="px-10 py-5 bg-gradient-to-r from-green-600 to-green-500 text-white font-bold rounded-full shadow-2xl hover:from-green-700 hover:to-green-600 transition">
          Find a Location Near You
        </button>
      </div>
    </div>
  </section>
);

export default AboutPage;
