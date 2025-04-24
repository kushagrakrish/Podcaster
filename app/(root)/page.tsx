"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import {
  BarChart2,
  Github,
  Headphones,
  Instagram,
  Menu,
  Mic,
  Pause,
  Play,
  Share2,
  Sparkles,
  Twitter,
  Wand2,
  X,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const features = [
  {
    icon: <Mic className='h-6 w-6 text-[#F97535]' />,
    title: "Professional Recording",
    description:
      "Studio-quality recording with background noise cancellation and audio enhancement.",
  },
  {
    icon: <Wand2 className='h-6 w-6 text-[#F97535]' />,
    title: "AI Content Generation",
    description:
      "Generate podcast scripts, show notes, and content ideas with our advanced AI.",
  },
  {
    icon: <Play className='h-6 w-6 text-[#F97535]' />,
    title: "Smart Playback",
    description:
      "Intelligent playback features with chapter markers and speed controls.",
  },
  {
    icon: <Share2 className='h-6 w-6 text-[#F97535]' />,
    title: "One-Click Publishing",
    description: "Publish to all major podcast platforms with a single click.",
  },
  {
    icon: <BarChart2 className='h-6 w-6 text-[#F97535]' />,
    title: "Analytics Dashboard",
    description:
      "Comprehensive analytics to track your audience and podcast performance.",
  },
  {
    icon: <Headphones className='h-6 w-6 text-[#F97535]' />,
    title: "AI Voice Cloning",
    description:
      "Create custom AI voices or clone your own for intros, outros, and ads.",
  },
];

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const { user } = useUser();
  console.log(user);
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <>
      <nav className='sticky top-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            <div className='flex items-center'>
              <Link href='/' className='flex items-center'>
                <div className='h-8 w-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mr-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='w-5 h-5 text-white-1'
                  >
                    <path d='M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z' />
                    <path d='M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z' />
                  </svg>
                </div>
                <span className='text-xl font-bold text-white-1'>
                  PodcastAI
                </span>
              </Link>
            </div>

            <div className='hidden md:block'>
              <div className='ml-10 flex items-center space-x-4'>
                <Link
                  href='#features'
                  className='text-gray-300 hover:text-white-1 px-3 py-2 rounded-md text-sm font-medium transition-colors'
                >
                  Features
                </Link>

                <Link
                  href='#about'
                  className='text-gray-300 hover:text-white-1 px-3 py-2 rounded-md text-sm font-medium transition-colors'
                >
                  About
                </Link>
              </div>
            </div>

            <div className='hidden md:block'>
              {user ? (
                <Link href='/home'>
                  <Button className='bg-orange-600 hover:bg-orange-700 text-white-1'>
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href='/sign-in'>
                    <Button variant='ghost' className='text-white-1 mr-2'>
                      Sign In
                    </Button>
                  </Link>
                  <Link href='/sign-up'>
                    <Button className='bg-orange-600 hover:bg-orange-700 text-white-1'>
                      Sign Up Free
                    </Button>
                  </Link>
                </>
              )}
            </div>

            <div className='md:hidden'>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white-1 hover:bg-gray-800 focus:outline-none'
              >
                {isMenuOpen ? (
                  <X className='block h-6 w-6' aria-hidden='true' />
                ) : (
                  <Menu className='block h-6 w-6' aria-hidden='true' />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className='md:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900'>
              <Link
                href='#features'
                className='text-gray-300 hover:text-white-1 block px-3 py-2 rounded-md text-base font-medium'
              >
                Features
              </Link>
              <Link
                href='#testimonials'
                className='text-gray-300 hover:text-white-1 block px-3 py-2 rounded-md text-base font-medium'
              >
                Testimonials
              </Link>
              <Link
                href='#about'
                className='text-gray-300 hover:text-white-1 block px-3 py-2 rounded-md text-base font-medium'
              >
                About
              </Link>
              <div className='pt-4 flex flex-col space-y-2'>
                {user ? (
                  <Link href='/dashboard'>
                    <Button className='bg-orange-600 hover:bg-orange-700 text-white-1 justify-center'>
                      Go to Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href='/sign-in'>
                      <Button
                        variant='ghost'
                        className='text-white-1 justify-center'
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link href='/sign-up'>
                      <Button className='bg-orange-600 hover:bg-orange-700 text-white-1 justify-center'>
                        Sign Up Free
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className='relative overflow-hidden py-20 sm:py-32'>
        {/* Background gradient */}
        <div className='absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950'></div>

        {/* Orange glow effect */}
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[120px] opacity-60'></div>

        <div className='container relative mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div className='text-center lg:text-left'>
              <h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight'>
                <span className='block text-white-1'>Create Amazing</span>
                <span className='block mt-2 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent'>
                  AI-Powered Podcasts
                </span>
              </h1>
              <p className='mt-6 text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0'>
                Record, edit, and publish professional-quality podcasts with the
                help of AI. Transform your ideas into engaging audio content in
                minutes.
              </p>
              <div className='mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
                <Button className='bg-orange-600 hover:bg-orange-700 text-white-1 px-8 py-6 text-lg rounded-xl'>
                  Get Started Free
                </Button>
                <Button
                  variant='outline'
                  className='border-gray-700 text-white-1 hover:bg-gray-800 px-8 py-6 text-lg rounded-xl'
                >
                  Watch Demo
                </Button>
              </div>
            </div>

            <div className='relative'>
              <div className='bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl shadow-orange-500/10'>
                <div className='aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden relative'>
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='w-3/4 h-24 bg-gray-800 rounded-xl flex items-center p-3 shadow-lg'>
                      <div
                        className='h-full aspect-square bg-orange-600 rounded-lg flex items-center justify-center cursor-pointer'
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? (
                          <Pause className='h-8 w-8 text-white-1' />
                        ) : (
                          <Play className='h-8 w-8 text-white-1 ml-1' />
                        )}
                      </div>
                      <div className='ml-3 flex-1'>
                        <div className='h-2 bg-gray-700 rounded-full overflow-hidden'>
                          <div
                            className='h-full bg-orange-500 transition-all duration-100'
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <div className='mt-2 flex justify-between text-xs text-gray-400'>
                          <span>
                            {isPlaying ? "Playing..." : "Podcast Preview"}
                          </span>
                          <span>01:23 / 05:46</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className='absolute top-6 left-6'>
                    <Mic className='h-12 w-12 text-[#F97535] opacity-20' />
                  </div>
                  <div className='absolute bottom-6 right-6'>
                    <Sparkles className='h-12 w-12 text-[#F97535] opacity-20' />
                  </div>
                </div>

                <div className='mt-6 grid grid-cols-3 gap-3'>
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className='bg-gray-800 rounded-lg p-3 hover:bg-gray-750 transition-colors'
                    >
                      <div className='h-1 w-16 bg-orange-600 rounded-full mb-2'></div>
                      <div className='h-1 w-12 bg-gray-700 rounded-full mb-2'></div>
                      <div className='h-1 w-14 bg-gray-700 rounded-full'></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badges */}
              <div className='absolute -top-4 -right-4 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 shadow-lg'>
                <div className='flex items-center'>
                  <Sparkles className='h-4 w-4 text-[#F97535] mr-2' />
                  <span className='text-sm font-medium text-white-1'>
                    AI-Enhanced
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features */}
      <section id='features' className='py-20 bg-gray-900'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center max-w-3xl mx-auto mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold mb-4'>
              <span className='bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent'>
                Powerful Features
              </span>
            </h2>
            <p className='text-gray-300 text-lg'>
              Everything you need to create, edit, and publish professional
              podcasts powered by AI
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {features.map((feature, index) => (
              <div
                key={index}
                className='bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-orange-500/50 transition-colors duration-300 hover:shadow-lg hover:shadow-orange-500/10'
              >
                <div className='h-12 w-12 rounded-lg bg-gray-700 flex items-center justify-center mb-4'>
                  {feature.icon}
                </div>
                <h3 className='text-xl font-semibold mb-2 text-white-1'>
                  {feature.title}
                </h3>
                <p className='text-white-3'>{feature.description}</p>
              </div>
            ))}
          </div>

          <div className='mt-20 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 relative overflow-hidden'>
            <div className='absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-orange-600/10 to-transparent'></div>

            <div className='relative z-10 flex flex-col md:flex-row items-center justify-between'>
              <div className='mb-8 md:mb-0 md:mr-8 text-center md:text-left'>
                <h3 className='text-2xl font-bold mb-4'>
                  AI-Powered Podcast Creation
                </h3>
                <p className='text-gray-300 max-w-xl'>
                  Our advanced AI helps you create professional podcasts in
                  minutes. From script generation to voice enhancement,
                  we&#39;ve got you covered.
                </p>
              </div>

              <div className='flex space-x-4'>
                <div className='h-16 w-16 rounded-full bg-orange-600 flex items-center justify-center'>
                  <Mic className='h-8 w-8 text-white-1' />
                </div>
                <div className='h-16 w-16 rounded-full bg-gray-700 flex items-center justify-center'>
                  <Wand2 className='h-8 w-8 text-[#F97535]' />
                </div>
                <div className='h-16 w-16 rounded-full bg-gray-700 flex items-center justify-center'>
                  <Headphones className='h-8 w-8 text-[#F97535]' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className='py-20 bg-gray-900 relative overflow-hidden'>
        {/* Orange glow effect */}
        <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-orange-500/20 rounded-full blur-[120px] opacity-60'></div>

        <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <div className='max-w-4xl mx-auto bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 md:p-12 border border-gray-700 shadow-2xl shadow-orange-500/10'>
            <div className='text-center mb-8'>
              <div className='inline-flex items-center justify-center h-12 w-12 rounded-full bg-orange-600/20 mb-4'>
                <Sparkles className='h-6 w-6 text-[#F97535]' />
              </div>
              <h2 className='text-3xl sm:text-4xl font-bold mb-4'>
                Ready to Create Amazing Podcasts?
              </h2>
              <p className='text-xl text-gray-300 max-w-2xl mx-auto'>
                Join thousands of creators who are using PodcastAI to produce
                professional-quality podcasts in minutes.
              </p>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button className='bg-orange-600 hover:bg-orange-700 text-white-1 px-8 py-6 text-lg rounded-xl'>
                Start Creating for Free
              </Button>
              <Button
                variant='outline'
                className='border-gray-700 text-white-1 hover:bg-gray-800 px-8 py-6 text-lg rounded-xl'
              >
                Schedule a Demo
              </Button>
            </div>

            <div className='mt-8 text-center text-gray-400 text-sm'>
              No credit card required. 7-day free trial.
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className='bg-gray-950 border-t border-gray-800'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            <div className='col-span-1 md:col-span-1'>
              <Link href='/' className='flex items-center'>
                <div className='h-8 w-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mr-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='w-5 h-5 text-white-1'
                  >
                    <path d='M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z' />
                    <path d='M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z' />
                  </svg>
                </div>
                <span className='text-xl font-bold text-white-1'>
                  PodcastAI
                </span>
              </Link>
              <p className='mt-4 text-gray-400'>
                Create amazing podcasts with the power of AI. Record, edit, and
                publish with ease.
              </p>
              <div className='mt-6 flex space-x-4'>
                <a
                  href='#'
                  className='text-gray-400 hover:text-[#F97535] transition-colors'
                >
                  <Twitter className='h-5 w-5' />
                </a>
                <a
                  href='#'
                  className='text-gray-400 hover:text-[#F97535] transition-colors'
                >
                  <Instagram className='h-5 w-5' />
                </a>
                <a
                  href='#'
                  className='text-gray-400 hover:text-[#F97535] transition-colors'
                >
                  <Youtube className='h-5 w-5' />
                </a>
                <a
                  href='#'
                  className='text-gray-400 hover:text-[#F97535] transition-colors'
                >
                  <Github className='h-5 w-5' />
                </a>
              </div>
            </div>

            <div>
              <h3 className='text-lg font-semibold mb-4'>Product</h3>
              <ul className='space-y-2'>
                <li>
                  <Link
                    href='#'
                    className='text-gray-400 hover:text-[#F97535] transition-colors'
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='text-gray-400 hover:text-[#F97535] transition-colors'
                  >
                    Use Cases
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='text-gray-400 hover:text-[#F97535] transition-colors'
                  >
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='text-gray-400 hover:text-[#F97535] transition-colors'
                  >
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className='text-lg font-semibold mb-4'>Resources</h3>
              <ul className='space-y-2'>
                <li>
                  <Link
                    href='#'
                    className='text-gray-400 hover:text-[#F97535] transition-colors'
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='text-gray-400 hover:text-[#F97535] transition-colors'
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='text-gray-400 hover:text-[#F97535] transition-colors'
                  >
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='text-gray-400 hover:text-[#F97535] transition-colors'
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className='text-lg font-semibold mb-4'>Company</h3>
              <ul className='space-y-2'>
                <li>
                  <Link
                    href='#'
                    className='text-gray-400 hover:text-[#F97535] transition-colors'
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='text-gray-400 hover:text-[#F97535] transition-colors'
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='text-gray-400 hover:text-[#F97535] transition-colors'
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='text-gray-400 hover:text-[#F97535] transition-colors'
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className='mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm'>
            <p>© {new Date().getFullYear()} PodcastAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
