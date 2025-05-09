import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import Gallery from "./Gallery";
import PackagesSection from "./PackagesSection";
import TestimonialsSection from "./TestimonialsSection";
import ContactForm from "./ContactForm";
import { Button } from "./ui/button";

const HomePage = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);

      // Update active section based on scroll position
      const sections = [
        "hero",
        "about",
        "gallery",
        "packages",
        "testimonials",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Adjust for header height
        behavior: "smooth",
      });
    }
  };

  return (
    <div dir="rtl" className="bg-white min-h-screen">
      {/* Header/Navigation */}
      <header className="fixed top-0 right-0 left-0 bg-white shadow-md z-50 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">استوديو اللحظات</h1>
          <nav>
            <ul className="flex space-x-reverse space-x-6">
              <li>
                <button
                  onClick={() => scrollToSection("hero")}
                  className={`px-3 py-2 ${activeSection === "hero" ? "text-primary font-bold" : "text-gray-600"}`}
                >
                  الرئيسية
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className={`px-3 py-2 ${activeSection === "about" ? "text-primary font-bold" : "text-gray-600"}`}
                >
                  من أنا
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("gallery")}
                  className={`px-3 py-2 ${activeSection === "gallery" ? "text-primary font-bold" : "text-gray-600"}`}
                >
                  معرض الصور
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("packages")}
                  className={`px-3 py-2 ${activeSection === "packages" ? "text-primary font-bold" : "text-gray-600"}`}
                >
                  الباقات
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("testimonials")}
                  className={`px-3 py-2 ${activeSection === "testimonials" ? "text-primary font-bold" : "text-gray-600"}`}
                >
                  آراء العملاء
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className={`px-3 py-2 ${activeSection === "contact" ? "text-primary font-bold" : "text-gray-600"}`}
                >
                  تواصل معنا
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        className="pt-32 pb-20 bg-gradient-to-l from-primary/10 to-secondary/10"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  لحظات لا تُنسى بعدسة احترافية
                </h2>
                <p className="text-xl mb-8">
                  هنوثق أجمل لحظات حياتك بأسلوب فني مميز يحافظ على ذكرياتك للأبد
                </p>
                <Button
                  onClick={() => scrollToSection("contact")}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  احجز جلستك الآن
                </Button>
              </motion.div>
            </div>
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80"
                  alt="صورة عروسين"
                  className="rounded-lg shadow-xl w-full"
                />
                <div className="absolute -bottom-5 -left-5 bg-white p-4 rounded-lg shadow-lg">
                  <p className="font-bold">+١٠٠٠</p>
                  <p className="text-sm">عميل سعيد</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section
        id="about"
        className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">من أنا</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-full overflow-hidden aspect-square shadow-xl border-4 border-white"
              >
                <img
                  src="https://images.unsplash.com/photo-1552168324-d612d77725e3?w=600&q=80"
                  alt="المصور"
                  className="object-cover w-full h-full"
                />
              </motion.div>
            </div>
            <div className="md:w-2/3 mt-8 md:mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold mb-4">أحمد محمد</h3>
                <p className="text-lg mb-4 leading-relaxed">
                  أهلاً بيكم في استوديو اللحظات! أنا أحمد، مصور محترف بخبرة أكتر
                  من ١٠ سنين في تصوير الأفراح والمناسبات. بحب أوثق اللحظات
                  الحقيقية والمشاعر الصادقة اللي بتحصل في أهم أيام حياتكم.
                </p>
                <p className="text-lg mb-6 leading-relaxed">
                  فلسفتي في التصوير هي إني أكون غير مرئي قدر الإمكان عشان أقدر
                  أصور اللحظات الطبيعية والعفوية. هدفي إن كل صورة تحكي قصة
                  وتخليكم تعيشوا نفس المشاعر كل ما تشوفوها.
                </p>
                <div className="flex gap-4">
                  <Button
                    onClick={() => scrollToSection("gallery")}
                    variant="outline"
                    className="bg-white hover:bg-primary/10"
                  >
                    شوف شغلي
                  </Button>
                  <Button
                    onClick={() => scrollToSection("contact")}
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    تواصل معايا
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">معرض أعمالنا</h2>
          <Gallery />
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            باقاتنا وأسعارنا
          </h2>
          <PackagesSection />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">آراء عملائنا</h2>
          <TestimonialsSection />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">تواصل معنا</h2>
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold">استوديو اللحظات</h3>
              <p className="mt-2">نوثق لحظاتك بأسلوب فني مميز</p>
            </div>
            <div className="flex space-x-reverse space-x-6">
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-gray-800 hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110 shadow-md"
                aria-label="انستجرام"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-gray-800 hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110 shadow-md"
                aria-label="فيسبوك"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-gray-800 hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110 shadow-md"
                aria-label="واتساب"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400 text-sm">
            <p>
              © {new Date().getFullYear()} استوديو اللحظات - جميع الحقوق محفوظة
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 left-6 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </motion.button>
      )}
    </div>
  );
};

export default HomePage;
