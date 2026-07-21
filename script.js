(function() {
      
      AOS.init({
        once: false,
        mirror: false,
        offset: 80,
        duration: 700,
        easing: 'ease-out-cubic'
      });

      
      const tiltElements = document.querySelectorAll('[data-tilt]');
      tiltElements.forEach(el => {
        if (!el.hasAttribute('data-tilt-initialized')) {
          VanillaTilt.init(el, {
            max: el.getAttribute('data-tilt-max') || 12,
            speed: 600,
            glare: true,
            "max-glare": 0.4,
            scale: 1.03,
          });
          el.setAttribute('data-tilt-initialized', 'true');
        }
      });

      // Particles canvas background
      const canvas = document.getElementById('particle-canvas');
      const ctx = canvas.getContext('2d');
      let width, height;
      let particles = [];

      function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
      }
      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();

      class Particle {
        constructor() {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          this.size = Math.random() * 2.5 + 0.8;
          this.speedX = (Math.random() - 0.5) * 0.4;
          this.speedY = (Math.random() - 0.5) * 0.4;
          this.color = `rgba(120, 100, 255, ${Math.random() * 0.7 + 0.2})`;
        }
        update() {
          this.x += this.speedX;
          this.y += this.speedY;
          if (this.x < 0 || this.x > width) this.speedX *= -1;
          if (this.y < 0 || this.y > height) this.speedY *= -1;
        }
        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.shadowColor = '#6d5cff';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      function initParticles(count = 80) {
        particles = [];
        for (let i = 0; i < count; i++) {
          particles.push(new Particle());
        }
      }
      initParticles();

      function animateParticles() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
          p.update();
          p.draw();
        });
        requestAnimationFrame(animateParticles);
      }
      animateParticles();

      
      window.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth/2) * 0.005;
        const moveY = (e.clientY - window.innerHeight/2) * 0.005;
        document.querySelectorAll('.glass-card, .skill-card').forEach(card => {
          card.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
      });

     
      document.querySelectorAll('.social-icon').forEach(icon => {
        icon.addEventListener('mouseenter', () => {
          gsap.to(icon, { scale: 1.25, color: '#cbb9ff', duration: 0.3, ease: "power2.out" });
        });
        icon.addEventListener('mouseleave', () => {
          gsap.to(icon, { scale: 1, color: '#b7adff', duration: 0.3 });
        });
      });

      // Refresh tilt on dynamic elements if needed
      window.addEventListener('load', () => {
        AOS.refresh();
      });
    })();