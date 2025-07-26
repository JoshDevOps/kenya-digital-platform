import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Target, Award, Globe, ArrowRight, CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              SkillBridge
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
                Home
              </Link>
              <Link to="/login" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
                Sign In
              </Link>
              <Link to="/register" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-20">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
            About SkillBridge
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-slate-300">
            Bridging the digital skills gap in Kenya through world-class education and training
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-800 mb-6">Our Mission</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                We're on a mission to democratize access to high-quality digital education in Kenya. 
                By connecting learners with industry experts and cutting-edge curriculum, we're building 
                the next generation of digital professionals.
              </p>
              <div className="space-y-4">
                {[
                  'Empower 100,000+ Kenyan professionals with digital skills',
                  'Bridge the gap between education and industry needs',
                  'Create sustainable career opportunities in tech',
                  'Foster innovation and entrepreneurship'
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-2xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">10K+</div>
                  <div className="text-sm text-slate-600">Active Learners</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                  <div className="text-sm text-slate-600">Expert Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
                  <div className="text-sm text-slate-600">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">50+</div>
                  <div className="text-sm text-slate-600">Industry Partners</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-6">Our Values</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: 'Community First',
                description: 'Building a supportive learning community where everyone can thrive'
              },
              {
                icon: Target,
                title: 'Excellence',
                description: 'Delivering world-class education with measurable outcomes'
              },
              {
                icon: Award,
                title: 'Innovation',
                description: 'Embracing new technologies and teaching methodologies'
              },
              {
                icon: Globe,
                title: 'Accessibility',
                description: 'Making quality education accessible to all Kenyans'
              }
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-gradient-to-br from-purple-500 to-blue-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">{value.title}</h3>
                  <p className="text-slate-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-6">Meet Our Team</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Passionate educators and technologists dedicated to your success
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Wanjiku',
                role: 'Founder & CEO',
                image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face'
              },
              {
                name: 'James Ochieng',
                role: 'Head of Engineering',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face'
              },
              {
                name: 'Grace Muthoni',
                role: 'Head of Education',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face'
              }
            ].map((member, index) => (
              <div key={index} className="text-center bg-white p-8 rounded-2xl shadow-lg">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
                />
                <h3 className="text-xl font-bold text-slate-800 mb-2">{member.name}</h3>
                <p className="text-purple-600 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of Kenyans building their digital future with SkillBridge
          </p>
          <Link 
            to="/register" 
            className="inline-flex items-center bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Get Started Today
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;