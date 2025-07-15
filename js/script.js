// --- WOW.js Initialization ---
document.addEventListener("DOMContentLoaded", () => {
  new WOW().init();
});

// --- Typewriter Effect Class ---
class TypeWriter {
  constructor(elementId, words, delay = 100, loopDelay = 2000) {
    this.element = document.getElementById(elementId);
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.delay = delay;
    this.loopDelay = loopDelay;
    this.isDeleting = false;
    this.type();
  }

  type() {
    const currentWord = this.words[this.wordIndex % this.words.length];
    let typeSpeed = this.delay;

    if (this.isDeleting) {
      this.txt = currentWord.substring(0, this.txt.length - 1);
      typeSpeed /= 2; // Faster deletion
    } else {
      this.txt = currentWord.substring(0, this.txt.length + 1);
    }

    this.element.textContent = this.txt;

    if (!this.isDeleting && this.txt === currentWord) {
      typeSpeed = this.loopDelay; // Pause at end of word
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500; // Pause before typing new word
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// --- Initialize Typewriter Effects on DOM Load ---
document.addEventListener("DOMContentLoaded", () => {
  // For the Name
  new TypeWriter("typewriter-name", [
    "I am Mya Thwe Nyein",
    "I am a UI/UX Designer",
  ]);

  // For the Role
  // new TypeWriter('typewriter-role', ['I design user interfaces', 'I create user experiences', 'I build digital products']);
});

// --- Loading Screen Fade Out ---
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading");
  if (loadingScreen) {
    loadingScreen.style.opacity = "0";
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 500); // Wait for fade out transition to complete
  }
});

// --- Scroll Progress Bar ---
window.addEventListener("scroll", () => {
  const scrollProgress = document.getElementById("scroll-progress");
  if (scrollProgress) {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = scrollPercent + "%";
  }
});

// --- Animated Counters ---
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 100; // Adjust for smoother animation over 100 steps

  const updateCounter = () => {
    if (current < target) {
      current += increment;
      element.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target; // Ensure it ends on the exact target
    }
  };
  updateCounter();
}

// --- Intersection Observer for Counters ---
const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statElements = entry.target.querySelectorAll("[data-target]");
        statElements.forEach((stat) => {
          const target = parseInt(stat.getAttribute("data-target"), 10);
          animateCounter(stat, target);
        });
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  },
  { threshold: 0.5 }
); // Trigger when 50% of the section is visible

// Observe the section containing the stats
const projectShowcaseSection = document.getElementById("projects");
if (projectShowcaseSection) {
  counterObserver.observe(projectShowcaseSection);
}

// --- Smooth Scrolling for Navigation Links ---
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      // Close mobile menu if open
      const mobileMenu = document.getElementById("mobile-menu");
      if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden");
      }

      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// --- Mobile Menu Toggle ---
const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

if (mobileMenuToggle && mobileMenu) {
  mobileMenuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

// --- Cursor Following Particle Effect ---
const colors = ["#00d4ff", "#8a2be2", "#ff6b6b"]; // Blue, Purple, Pink
let particleCount = 0; // To limit the number of particles at any given time
const maxParticles = 15; // Max particles on screen at once

document.addEventListener("mousemove", (e) => {
  if (particleCount >= maxParticles) {
    // Remove the oldest particle if max particles reached
    const oldestParticle = document.querySelector(".particle");
    if (oldestParticle) {
      oldestParticle.remove();
      particleCount--;
    }
  }

  const particle = document.createElement("div");
  particle.className = "particle";
  particle.style.left = `${e.clientX}px`;
  particle.style.top = `${e.clientY}px`;

  // Random size between 8px and 20px
  const size = Math.random() * 12 + 8;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;

  // Random color
  particle.style.background = `radial-gradient(circle, ${
    colors[Math.floor(Math.random() * colors.length)]
  } 0%, transparent 100%)`;

  document.body.appendChild(particle);
  particleCount++;

  // Trigger the fade-out animation
  requestAnimationFrame(() => {
    // Force reflow for animation to trigger
    particle.style.opacity = "1";
    particle.style.transform = "scale(1)";

    setTimeout(() => {
      particle.style.opacity = "0";
      particle.style.transform = "scale(0.5)";
      setTimeout(() => {
        particle.remove();
        particleCount--;
      }, 500); // After fade out transition (0.5s)
    }, 100); // A small delay before starting fade out
  });
});

// --- 3D Project Card Tilt Effect ---
document.querySelectorAll(".project-card-3d-wrapper").forEach((wrapper) => {
  const card = wrapper.querySelector(".project-card-3d");
  const tiltAmount = 10; // Max degrees of tilt

  wrapper.addEventListener("mousemove", (e) => {
    const rect = wrapper.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const tiltY = ((mouseX - centerX) / (rect.width / 2)) * tiltAmount;
    const tiltX = ((centerY - mouseY) / (rect.height / 2)) * tiltAmount;

    card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
  });

  wrapper.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  });
});

// --- Animated Testimonials Carousel ---
const testimonials = [
  {
    quote:
      "Alex's UI/UX design truly transformed our app! The new interface is intuitive, beautiful, and user engagement has skyrocketed. A real star designer!",
    author: "Sarah Chen",
    title: "CEO, TechInnovate",
    avatar: "images/avatar1.jpg",
  },
  {
    quote:
      "Working with Alex was a fantastic experience. They understood our vision perfectly and delivered a sleek, modern design that exceeded all expectations. Highly recommend!",
    author: "Mark Davis",
    title: "Product Manager, FutureCorp",
    avatar: "images/avatar2.jpg",
  },
  {
    quote:
      "Beyond impressed with the user flow and visual appeal Alex brought to our platform. It's clear they have a deep understanding of user-centered design.",
    author: "Emily White",
    title: "Founder, CreativeSolutions",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29329?auto=format&fit=crop&q=80&w=1780&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

let currentTestimonialIndex = 0;
const testimonialCarousel = document.getElementById("testimonial-carousel");

function displayTestimonial(index) {
  if (!testimonialCarousel) return;

  // Fade out current testimonial if exists
  const currentCard = testimonialCarousel.querySelector(".testimonial-card");
  if (currentCard) {
    currentCard.classList.remove("active");
    currentCard.classList.add("leaving");
    currentCard.addEventListener(
      "animationend",
      () => {
        currentCard.remove();
        renderNewTestimonial(index);
      },
      { once: true }
    );
  } else {
    renderNewTestimonial(index);
  }
}

function renderNewTestimonial(index) {
  const testimonialData = testimonials[index];
  const testimonialHTML = `
        <div class="testimonial-card absolute w-full max-w-2xl bg-galaxy-gray/60 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-lg text-center">
            <img src="${testimonialData.avatar}" alt="${testimonialData.author}" class="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-galaxy-blue object-cover">
            <p class="text-lg md:text-xl text-gray-200 italic mb-6">"${testimonialData.quote}"</p>
            <p class="font-bold text-galaxy-blue text-lg">${testimonialData.author}</p>
            <p class="text-sm text-gray-400">${testimonialData.title}</p>
        </div>
    `;
  testimonialCarousel.innerHTML = testimonialHTML;
  // Add active class after appending to trigger fade-in animation
  requestAnimationFrame(() => {
    testimonialCarousel
      .querySelector(".testimonial-card")
      .classList.add("active");
  });
}

// Initial display and then cycle
document.addEventListener("DOMContentLoaded", () => {
  displayTestimonial(currentTestimonialIndex);
  setInterval(() => {
    currentTestimonialIndex =
      (currentTestimonialIndex + 1) % testimonials.length;
    displayTestimonial(currentTestimonialIndex);
  }, 8000); // Change testimonial every 8 seconds
}); // Select all wrappers

// --- Project Image Modal Functionality ---
// const projectModal = document.getElementById('project-modal');
// const modalImage = document.getElementById('modal-image');
// const modalCloseBtn = document.getElementById('modal-close-btn');
// const projectCardWrappers = document.querySelectorAll('.project-card-3d-wrapper')
// Open modal
// projectCardWrappers.forEach(wrapper => {
//     wrapper.addEventListener('click', () => {
//         const imageUrl = wrapper.getAttribute('data-project-image');
//         if (imageUrl) {
//             modalImage.src = imageUrl;
//             projectModal.classList.remove('hidden');
//             modalImage.classList.add('animate-zoom-grow');
//             document.body.style.overflow = 'hidden';
//         }
//     });
// });

// Close modal
modalCloseBtn.addEventListener("click", () => {
  closeProjectModal();
});

projectModal.addEventListener("click", (e) => {
  // Close if clicking outside the modal content
  if (e.target === projectModal) {
    closeProjectModal();
  }
});

function closeProjectModal() {
  projectModal.classList.add("hidden");
  modalImage.classList.remove("animate-zoom-grow"); // Remove animation class
  modalImage.src = ""; // Clear image source
  document.body.style.overflow = ""; // Restore scrolling
}

// sent message

// EmailJS လိုင်းရေးရီ ကို HTML head မှာ include လုပ်ရပါမယ်
// <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

// EmailJS initialize လုပ်ခြင်း
 // မင်းရဲ့ EmailJS public key

// Message ပို့တဲ့ function
function sentMessage() {
    emailjs.init("aM6FDZgixYBpO8hKI");
    // Form data ကို collect လုပ်ခြင်း
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Validation check
    if (!name || !email || !message) {
        alert('ကျေးဇူးပြု၍ အားလုံးကို ဖြည့်ပါ!');
        return;
    }
    
    // Button text ကို changing
    const button = document.querySelector('#messageBtn');
    const originalText = button.innerHTML;
    button.innerHTML = 'ပို့နေပါသည်...';
    button.disabled = true;
    
    // Template parameters
    const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
        to_name: 'Mya Thwe Nyein' // မင်းရဲ့ နာမည်
    };
    
    
    // EmailJS service ကို သုံးပြီး email ပို့ခြင်း
    emailjs.send('service_i6x956a', 'template_mtn', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Success message
            alert('Message ပို့ပြီးပါပြီ! ကျေးဇူးတင်ပါတယ်။');
            
            // Form ကို clear လုပ်ခြင်း
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('message').value = '';
            
            // Button ကို reset လုပ်ခြင်း
            button.innerHTML = originalText;
            button.disabled = false;
            
        })
        .catch(function(error) {
            console.log('FAILED...', error);
            
            // Error message
            alert('Message ပို့ရာတွင် အမှားရှိနေပါတယ်။ နောက်မှ ထပ်ကြိုးစားပါ။');
            
            // Button ကို reset လုပ်ခြင်း
            button.innerHTML = originalText;
            button.disabled = false;
        });
}

