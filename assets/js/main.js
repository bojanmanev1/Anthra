document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('hidden');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.add('hidden');
      });
    });
  }

  // 2. Interactive Before / After Renovation Slider
  const baWrapper = document.getElementById('baWrapper');
  const baRange = document.getElementById('baRange');
  const baBeforeImg = document.getElementById('baBeforeImg');
  const baBeforeImgTag = document.getElementById('baBeforeImgTag');
  const baHandle = document.getElementById('baHandle');
  const baPercent = document.getElementById('baPercent');

  function syncBeforeImageSize() {
    if (baWrapper && baBeforeImgTag) {
      baBeforeImgTag.style.width = baWrapper.offsetWidth + 'px';
    }
  }

  if (baRange && baBeforeImg && baHandle) {
    syncBeforeImageSize();
    window.addEventListener('resize', syncBeforeImageSize);

    baRange.addEventListener('input', (e) => {
      const val = e.target.value;
      baBeforeImg.style.width = `${val}%`;
      baHandle.style.left = `${val}%`;
      if (baPercent) {
        baPercent.textContent = `${val}%`;
      }
    });
  }

  // 3. Interactive Renovation Stage Visualizer (4 Phases)
  const stageButtons = document.querySelectorAll('.stage-btn');
  const stageTitle = document.getElementById('stageTitle');
  const stageBadge = document.getElementById('stageBadge');
  const stageDesc = document.getElementById('stageDesc');
  const stagePoints = document.getElementById('stagePoints');
  const visualizerImg = document.getElementById('visualizerImg');

  const stageData = {
    1: {
      title: "Фаза 1: Увид на терен, Демонтажа & Премер",
      badge: "Увид & Подготовка",
      img: "assets/images/renovation-before.jpg",
      desc: "Секој успешен простор започнува со точна ласерска геометрија. Излегуваме на терен, го отстрануваме стариот материјал, ги испитуваме подовите и ѕидовите со професионални ласерски нивелири со толеранција под 1mm и ја подготвуваме основата.",
      points: [
        "Ласерска проверка на рамнини и прави агли (90°)",
        "Чиста демонтажа и организиран одвоз на градежен шут",
        "Хидроизолациска подготовка и прајмери за максимална атхезија"
      ]
    },
    2: {
      title: "Фаза 2: Сува Градба, Гипс Картон & Скриено LED Светло",
      badge: "Архитектура на Тавани",
      img: "assets/images/gypsum-ceiling.jpg",
      desc: "Изведба на модерни каскадни спуштени тавани со Knauf системи. Вградуваме алуминиумски профили за скриени индиректни LED светла, завесници и акустични преградни ѕидови со камена волна.",
      points: [
        "Knauf алуминиумска подконструкција со анкер висење без вибрации",
        "Алуминиумски канали за вградени магнетни шини и LED траки",
        "Педантно бандажирање со мрежа и Q4 финиш без видливи споеви"
      ]
    },
    3: {
      title: "Фаза 3: Керамика Голем Формат & Премиум Винил Подови",
      badge: "Мајсторска Изведба",
      img: "assets/images/flooring-vinyl.jpg",
      desc: "Поставување на плочки од голем формат (120x60 / 120x120) со дијамантски 45° герунг споеви, како и премиум водоотпорни LVT/SPC винил подови со висока звучна изолација.",
      points: [
        "Герунг обработка на сите надворешни агли под 45° без пластични лајсни",
        "Водоотпорни SPC Винил подови – тивки, топли и идеални за кујни и бањи",
        "Ласерски дистанцери и 2-компонентни епоксидни фуги отпорни на дамки"
      ]
    },
    4: {
      title: "Фаза 4: Финален Луксуз & Контрола на Квалитет",
      badge: "Твој простор. Наша експертиза.",
      img: "assets/images/apartment-complete.jpg",
      desc: "Финална монтажа на санитарија, лајсни за подови, тестирање на осветлувањето и детално примопредавање на чист и готов објект според договор.",
      points: [
        "Детална проверка на секој раб и фуга со сопственикот",
        "Писмена гаранција за стабилност и квалитет на изведбата",
        "Просторот се предава целосно исчистен и подготвен за живеење"
      ]
    }
  };

  stageButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const stage = btn.dataset.stage;
      
      stageButtons.forEach(b => {
        b.classList.remove('bg-[#E5252A]', 'text-white', 'border-[#E5252A]', 'glow-red-sm');
        b.classList.add('bg-[#14161A]', 'text-zinc-400', 'border-white/10');
      });

      btn.classList.remove('bg-[#14161A]', 'text-zinc-400', 'border-white/10');
      btn.classList.add('bg-[#E5252A]', 'text-white', 'border-[#E5252A]', 'glow-red-sm');

      const data = stageData[stage];
      if (data) {
        if (visualizerImg) {
          visualizerImg.style.opacity = '0.3';
          setTimeout(() => {
            visualizerImg.src = data.img;
            visualizerImg.style.opacity = '1';
          }, 200);
        }
        if (stageTitle) stageTitle.textContent = data.title;
        if (stageBadge) stageBadge.textContent = data.badge;
        if (stageDesc) stageDesc.textContent = data.desc;
        if (stagePoints) {
          stagePoints.innerHTML = data.points
            .map(p => `<li class="flex items-start gap-2.5 text-zinc-300 text-sm">
              <span class="w-1.5 h-1.5 rounded-full bg-[#E5252A] mt-2 shrink-0"></span>
              <span>${p}</span>
            </li>`).join('');
        }
      }
    });
  });

  // 4. Project Gallery Filter & Lightbox
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const closeLightbox = document.getElementById('closeLightbox');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-[#E5252A]', 'text-white', 'border-[#E5252A]');
        b.classList.add('bg-[#14161A]', 'text-zinc-400', 'border-white/10');
      });
      btn.classList.remove('bg-[#14161A]', 'text-zinc-400', 'border-white/10');
      btn.classList.add('bg-[#E5252A]', 'text-white', 'border-[#E5252A]');

      const filter = btn.dataset.filter;
      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category.includes(filter)) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.dataset.title || 'Проект на ANTHRA';
      const desc = item.dataset.desc || 'Професионална изведба со највисок квалитет.';

      if (lightboxModal && lightboxImg) {
        lightboxImg.src = img.src;
        if (lightboxTitle) lightboxTitle.textContent = title;
        if (lightboxDesc) lightboxDesc.textContent = desc;
        lightboxModal.classList.remove('hidden');
        lightboxModal.classList.add('flex');
      }
    });
  });

  if (closeLightbox && lightboxModal) {
    closeLightbox.addEventListener('click', () => {
      lightboxModal.classList.add('hidden');
      lightboxModal.classList.remove('flex');
    });

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.add('hidden');
        lightboxModal.classList.remove('flex');
      }
    });
  }

  // 5. Interactive Free On-Site Inspection Configurator (NO PRICE, just direct custom inquiry)
  const inquiryForm = document.getElementById('inquiryForm');
  const whatsappInquiryBtn = document.getElementById('whatsappInquiryBtn');

  if (whatsappInquiryBtn) {
    whatsappInquiryBtn.addEventListener('click', (e) => {
      e.preventDefault();

      // Collect selected services
      const selectedServices = [];
      document.querySelectorAll('.inquiry-service:checked').forEach(cb => {
        selectedServices.push(cb.value);
      });

      const spaceType = document.querySelector('input[name="spaceType"]:checked')?.value || 'Не е наведено';
      const sqm = document.getElementById('inquirySqm')?.value || 'Ориентационо';
      const city = document.getElementById('inquiryCity')?.value || 'Скопје';
      const clientName = document.getElementById('inquiryName')?.value || 'Клиент';
      const clientPhone = document.getElementById('inquiryPhone')?.value || '';
      const notes = document.getElementById('inquiryNotes')?.value || '';

      const servicesText = selectedServices.length > 0 ? selectedServices.join(', ') : 'Општа реновација';

      const message = `Почитувани ANTHRA,\nБи сакал да закажам бесплатен увид за реновација:\n` +
        `👤 Име: ${clientName}\n` +
        `📞 Телефон: ${clientPhone}\n` +
        `📍 Локација: ${city}\n` +
        `🏠 Тип простор: ${spaceType} (~${sqm} m²)\n` +
        `🔨 Потребни услуги: ${servicesText}\n` +
        (notes ? `📝 Забелешка: ${notes}\n` : '') +
        `Ве молам за контакт за увид на лице место.`;

      const encoded = encodeURIComponent(message);
      // Opens WhatsApp chat
      window.open(`https://wa.me/38970000000?text=${encoded}`, '_blank');
    });
  }

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const successBanner = document.getElementById('inquirySuccessBanner');
      if (successBanner) {
        successBanner.classList.remove('hidden');
        inquiryForm.reset();
        setTimeout(() => {
          successBanner.classList.add('hidden');
        }, 6000);
      }
    });
  }

  // 6. Smooth Interactive Mouse Cursor Glow & Spotlight Effect (Desktop only)
  const cursorRing = document.getElementById('cursorGlowRing');
  const cursorDot = document.getElementById('cursorGlowDot');
  const cursorSpotlight = document.getElementById('cursorAmbientSpotlight');

  if (cursorRing && cursorSpotlight && window.innerWidth > 1024 && !window.matchMedia('(pointer: coarse)').matches) {
    let mouseX = -500, mouseY = -500;
    let ringX = -500, ringY = -500;
    let spotX = -500, spotY = -500;
    let isVisible = false;

    const hideCursor = () => {
      isVisible = false;
      cursorRing.style.opacity = '0';
      if (cursorDot) cursorDot.style.opacity = '0';
      cursorSpotlight.style.opacity = '0';
      document.body.classList.remove('cursor-hover');
    };

    window.addEventListener('touchstart', hideCursor, { passive: true });
    window.addEventListener('touchend', hideCursor, { passive: true });
    window.addEventListener('touchcancel', hideCursor, { passive: true });
    document.addEventListener('mouseleave', hideCursor);

    window.addEventListener('mousemove', (e) => {
      if (window.innerWidth <= 1024) {
        hideCursor();
        return;
      }

      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        ringX = mouseX;
        ringY = mouseY;
        spotX = mouseX;
        spotY = mouseY;
        cursorRing.style.opacity = '1';
        cursorSpotlight.style.opacity = '1';
      }
    });

    // Smooth animation loop for the glowing ring and ambient spotlight
    function animateCursor() {
      if (isVisible) {
        // Fluid interpolation for the glowing ring
        ringX += (mouseX - ringX) * 0.22;
        ringY += (mouseY - ringY) * 0.22;
        cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

        // Ambient spotlight follows with smooth gentle trailing
        spotX += (mouseX - spotX) * 0.09;
        spotY += (mouseY - spotY) * 0.09;
        cursorSpotlight.style.transform = `translate3d(${spotX}px, ${spotY}px, 0) translate(-50%, -50%)`;
      }
      requestAnimationFrame(animateCursor);
    }
    requestAnimationFrame(animateCursor);

    // Event delegation: expands glowing circle when hovering any clickable item
    document.addEventListener('mouseover', (e) => {
      if (!isVisible) return;
      const interactive = e.target.closest('a, button, input, label, select, textarea, .gallery-item, .stage-btn, [role="button"], #baWrapper');
      if (interactive) {
        document.body.classList.add('cursor-hover');
      } else {
        document.body.classList.remove('cursor-hover');
      }
    });
  }
});
