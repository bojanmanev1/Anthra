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

  // Mobile Direct Call Picker Modal
  const mobileCallBtn = document.getElementById('mobileCallBtn');
  const callPickerModal = document.getElementById('callPickerModal');
  const callPickerBackdrop = document.getElementById('callPickerBackdrop');
  const closeCallPickerBtn = document.getElementById('closeCallPickerBtn');
  const cancelCallPickerBtn = document.getElementById('cancelCallPickerBtn');

  function openCallPicker() {
    if (callPickerModal) {
      callPickerModal.classList.remove('hidden');
      callPickerModal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCallPicker() {
    if (callPickerModal) {
      callPickerModal.classList.add('hidden');
      callPickerModal.classList.remove('flex');
      document.body.style.overflow = '';
    }
  }

  if (mobileCallBtn) {
    mobileCallBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openCallPicker();
    });
  }

  if (callPickerBackdrop) callPickerBackdrop.addEventListener('click', closeCallPicker);
  if (closeCallPickerBtn) closeCallPickerBtn.addEventListener('click', closeCallPicker);
  if (cancelCallPickerBtn) cancelCallPickerBtn.addEventListener('click', closeCallPicker);

  // Close modal when pressing Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && callPickerModal && !callPickerModal.classList.contains('hidden')) {
      closeCallPicker();
    }
  });

  // 2. Interactive Multi-Room Before / After Renovation Slider
  const baWrapper = document.getElementById('baWrapper');
  const baRange = document.getElementById('baRange');
  const baBeforeImg = document.getElementById('baBeforeImg');
  const baBeforeImgTag = document.getElementById('baBeforeImgTag');
  const baAfterImgTag = document.getElementById('baAfterImgTag');
  const baHandle = document.getElementById('baHandle');
  const baPercent = document.getElementById('baPercent');
  const baAfterBadge = document.getElementById('baAfterBadge');
  const baAfterDetail = document.getElementById('baAfterDetail');
  const baBeforeBadge = document.getElementById('baBeforeBadge');
  const baBeforeDetail = document.getElementById('baBeforeDetail');
  const baCurrentTitle = document.getElementById('baCurrentTitle');
  const baSlideCounter = document.getElementById('baSlideCounter');
  const baLegendBefore = document.getElementById('baLegendBefore');
  const baLegendAfter = document.getElementById('baLegendAfter');
  const baPrevBtn = document.getElementById('baPrevBtn');
  const baNextBtn = document.getElementById('baNextBtn');
  const baOuterPrevBtn = document.getElementById('baOuterPrevBtn');
  const baOuterNextBtn = document.getElementById('baOuterNextBtn');
  const baTabBtns = document.querySelectorAll('.ba-tab-btn');

  const beforeAfterSlides = [
    {
      id: 0,
      name: "Бања & Керамика",
      title: "Бања со керамика 120x60, ниша со LED и скриен сифон",
      beforeImg: "assets/images/renovation-before.jpg",
      afterImg: "assets/images/tiles-bathroom.jpg",
      beforeDetail: "Сурова состојба: отстранета стара керамика, цевки и шут",
      afterDetail: "Керамика 120x60 • Ниша со LED • 45° Герунг",
      beforeLegend: "0% Суров простор",
      afterLegend: "100% Финален луксуз"
    },
    {
      id: 1,
      name: "Дневна Соба",
      title: "Дневна соба со каскаден Knauf LED таван и ТВ панел",
      beforeImg: "assets/images/living-before.jpg",
      afterImg: "assets/images/living-after.jpg",
      beforeDetail: "Рушење, суров бетонски плафон и отворени електрични канали",
      afterDetail: "Спуштен Knauf таван со скриено LED светло • Дрвен ТВ панел",
      beforeLegend: "0% Бетон & Кабли",
      afterLegend: "100% Премиум Дневна Соба"
    },
    {
      id: 2,
      name: "Кујна & Остров",
      title: "Модерна кујна со мермерен остров и керамика 120x60",
      beforeImg: "assets/images/kitchen-before.jpg",
      afterImg: "assets/images/kitchen-after.jpg",
      beforeDetail: "Отстранети стари елементи, соголена ѕидарија и отворени цевки",
      afterDetail: "Мермерен остров • Гранитна керамика 120x60 • Вградено LED",
      beforeLegend: "0% Демонтиран простор",
      afterLegend: "100% Модерен отворен концепт"
    },
    {
      id: 3,
      name: "Спална & Под",
      title: "Спална соба со природна рибина коска паркет и сокриена завесница",
      beforeImg: "assets/images/bedroom-before.jpg",
      afterImg: "assets/images/bedroom-after.jpg",
      beforeDetail: "Испукана бетонска кошулица и припрема на подлога со прајмер",
      afterDetail: "Рибина коска паркет • 8cm бели MDF лајсни • Ласерска нивелација",
      beforeLegend: "0% Нерамен бетон",
      afterLegend: "100% Совршена подна изведба"
    }
  ];

  let currentSlideIndex = 0;

  function syncBeforeImageSize() {
    if (baWrapper && baBeforeImgTag) {
      baBeforeImgTag.style.width = baWrapper.offsetWidth + 'px';
    }
  }

  function updateSliderPosition(val) {
    if (baBeforeImg) baBeforeImg.style.width = `${val}%`;
    if (baHandle) baHandle.style.left = `${val}%`;
    if (baPercent) baPercent.textContent = `${val}%`;

    // Smoothly fade out badges when the slider covers them
    if (baAfterBadge) {
      baAfterBadge.style.opacity = val > 75 ? '0' : '1';
    }
    if (baAfterDetail) {
      baAfterDetail.style.opacity = val > 70 ? '0' : '1';
    }
    if (baBeforeBadge) {
      baBeforeBadge.style.opacity = val < 25 ? '0' : '1';
    }
    if (baBeforeDetail) {
      baBeforeDetail.style.opacity = val < 30 ? '0' : '1';
    }
  }

  function renderSlide(index) {
    if (index < 0) index = beforeAfterSlides.length - 1;
    if (index >= beforeAfterSlides.length) index = 0;
    currentSlideIndex = index;
    const slide = beforeAfterSlides[index];

    // Subtle fade effect for smooth room transition
    if (baWrapper) {
      baWrapper.style.transition = 'opacity 0.15s ease';
      baWrapper.style.opacity = '0.75';
    }

    setTimeout(() => {
      if (baAfterImgTag) baAfterImgTag.src = slide.afterImg;
      if (baBeforeImgTag) baBeforeImgTag.src = slide.beforeImg;
      if (baAfterDetail) {
        baAfterDetail.textContent = slide.afterDetail || '';
        baAfterDetail.style.display = slide.afterDetail ? '' : 'none';
      }
      if (baBeforeDetail) {
        baBeforeDetail.textContent = slide.beforeDetail || '';
        baBeforeDetail.style.display = slide.beforeDetail ? '' : 'none';
      }
      if (baCurrentTitle) baCurrentTitle.textContent = slide.title;
      if (baLegendBefore) baLegendBefore.textContent = slide.beforeLegend;
      if (baLegendAfter) baLegendAfter.textContent = slide.afterLegend;
      if (baSlideCounter) baSlideCounter.textContent = `0${index + 1} / 0${beforeAfterSlides.length}`;

      // Reset slider to 50%
      if (baRange) baRange.value = 50;
      updateSliderPosition(50);
      syncBeforeImageSize();

      if (baWrapper) {
        baWrapper.style.opacity = '1';
      }
    }, 150);

    // Update Tab Styles
    baTabBtns.forEach(btn => {
      const btnSlide = parseInt(btn.getAttribute('data-slide'), 10);
      if (btnSlide === index) {
        btn.className = 'ba-tab-btn px-4 py-2 rounded-xl text-xs font-bold transition-all bg-[#E5252A] text-white shadow-lg glow-red-sm';
      } else {
        btn.className = 'ba-tab-btn px-4 py-2 rounded-xl text-xs font-semibold transition-all bg-[#16181E] text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/5';
      }
    });
  }

  // Preload all slide images for instant, flicker-free switching
  beforeAfterSlides.forEach(s => {
    const img1 = new Image();
    img1.src = s.beforeImg;
    const img2 = new Image();
    img2.src = s.afterImg;
  });

  if (baRange && baBeforeImg && baHandle) {
    syncBeforeImageSize();
    window.addEventListener('resize', syncBeforeImageSize);

    baRange.addEventListener('input', (e) => {
      updateSliderPosition(Number(e.target.value));
    });

    // Wire up tab clicks
    baTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-slide'), 10);
        renderSlide(idx);
      });
    });

    // Wire up top arrow buttons
    if (baPrevBtn) baPrevBtn.addEventListener('click', () => renderSlide(currentSlideIndex - 1));
    if (baNextBtn) baNextBtn.addEventListener('click', () => renderSlide(currentSlideIndex + 1));

    // Wire up external side navigation arrows (bold red, no circle)
    if (baOuterPrevBtn) baOuterPrevBtn.addEventListener('click', () => renderSlide(currentSlideIndex - 1));
    if (baOuterNextBtn) baOuterNextBtn.addEventListener('click', () => renderSlide(currentSlideIndex + 1));

    // Wire up mobile bottom navigation buttons
    const baMobilePrevBtn = document.getElementById('baMobilePrevBtn');
    const baMobileNextBtn = document.getElementById('baMobileNextBtn');
    if (baMobilePrevBtn) baMobilePrevBtn.addEventListener('click', () => renderSlide(currentSlideIndex - 1));
    if (baMobileNextBtn) baMobileNextBtn.addEventListener('click', () => renderSlide(currentSlideIndex + 1));
  }

  // 3. Interactive Renovation Stage Visualizer (4 Phases with 2x2 Unified House Grid)
  const stageButtons = document.querySelectorAll('.stage-btn');
  const stageTitle = document.getElementById('stageTitle');
  const stageBadge = document.getElementById('stageBadge');
  const stageDesc = document.getElementById('stageDesc');
  const stagePoints = document.getElementById('stagePoints');
  const visualizerGrid = document.getElementById('visualizerGrid');

  const visImg0 = document.getElementById('visImg0');
  const visLabel0 = document.getElementById('visLabel0');
  const visSub0 = document.getElementById('visSub0');

  const visImg1 = document.getElementById('visImg1');
  const visLabel1 = document.getElementById('visLabel1');
  const visSub1 = document.getElementById('visSub1');

  const visImg2 = document.getElementById('visImg2');
  const visLabel2 = document.getElementById('visLabel2');
  const visSub2 = document.getElementById('visSub2');

  const visImg3 = document.getElementById('visImg3');
  const visLabel3 = document.getElementById('visLabel3');
  const visSub3 = document.getElementById('visSub3');

  const stageData = {
    1: {
      title: "Фаза 1: Увид на терен, Демонтажа & Подготовка",
      badge: "Увид & Подготовка",
      desc: "Секој успешен простор започнува со точна ласерска геометрија. Излегуваме на терен, го отстрануваме стариот материјал, ги испитуваме подовите и ѕидовите со професионални ласерски нивелири со толеранција под 1mm и ја подготвуваме основата низ сите 4 простории од објектот.",
      rooms: [
        { name: "Бања", status: "Демонтажа & шут", img: "assets/images/renovation-before.jpg" },
        { name: "Дневна Соба", status: "Суров бетон & кабли", img: "assets/images/living-before.jpg" },
        { name: "Кујна", status: "Инсталации & ѕид", img: "assets/images/kitchen-before.jpg" },
        { name: "Спална Соба", status: "Припрема на подлога", img: "assets/images/bedroom-before.jpg" }
      ],
      points: [
        "Ласерска проверка на рамнини и прави агли (90°)",
        "Чиста демонтажа и организиран одвоз на градежен шут",
        "Хидроизолациска подготовка и прајмери за максимална атхезија"
      ]
    },
    2: {
      title: "Фаза 2: Сува Градба, Гипс Картон & Скриено LED Светло",
      badge: "Архитектура на Тавани",
      desc: "Изведба на модерни каскадни спуштени тавани со Knauf системи низ целата куќа. Вградуваме алуминиумски профили за скриени индиректни LED светла, завесници и акустични преградни ѕидови со камена волна.",
      rooms: [
        { name: "Бања", status: "Влагоотпорен гипс", img: "assets/images/phase-drywall-bath.jpg" },
        { name: "Дневна Соба", status: "Knauf каскаден таван", img: "assets/images/gypsum-ceiling.jpg" },
        { name: "Кујна", status: "LED кутија за аспиратор", img: "assets/images/phase-drywall-kitchen.jpg" },
        { name: "Спална Соба", status: "Сокриена завесница", img: "assets/images/phase-drywall-bedroom.jpg" }
      ],
      points: [
        "Knauf алуминиумска подконструкција со анкер висење без вибрации",
        "Алуминиумски канали за вградени магнетни шини и LED траки",
        "Педантно бандажирање со мрежа и Q4 финиш без видливи споеви"
      ]
    },
    3: {
      title: "Фаза 3: Керамика Голем Формат & Премиум Винил Подови",
      badge: "Мајсторска Изведба",
      desc: "Поставување на керамика од голем формат (120x60 / 120x120) со дијамантски 45° герунг споеви во влажните зони, и премиум водоотпорни LVT/SPC винил подови и паркет со висока звучна изолација.",
      rooms: [
        { name: "Бања", status: "Керамика 120x60 & герунг", img: "assets/images/phase-tiling-bath.jpg" },
        { name: "Дневна Соба", status: "SPC винил монтажа", img: "assets/images/flooring-vinyl.jpg" },
        { name: "Кујна", status: "Гранитна подна керамика", img: "assets/images/phase-tiling-kitchen.jpg" },
        { name: "Спална Соба", status: "Рибина коска паркет", img: "assets/images/flooring-parquet.jpg" }
      ],
      points: [
        "Герунг обработка на сите надворешни агли под 45° без пластични лајсни",
        "Водоотпорни SPC Винил подови – тивки, топли и идеални за кујни и бањи",
        "Ласерски дистанцери и 2-компонентни епоксидни фуги отпорни на дамки"
      ]
    },
    4: {
      title: "Фаза 4: Финален Луксуз & Контрола на Квалитет",
      badge: "Твој простор. Наша експертиза.",
      desc: "Финална монтажа на санитарија, 8cm бели MDF лајсни за подови, тестирање на осветлувањето и детално примопредавање на чист и готов објект според договор клуч на рака.",
      rooms: [
        { name: "Бања", status: "Финален луксуз", img: "assets/images/tiles-bathroom.jpg" },
        { name: "Дневна Соба", status: "Премиум изведба", img: "assets/images/living-after.jpg" },
        { name: "Кујна", status: "Мермерен остров & LED", img: "assets/images/kitchen-after.jpg" },
        { name: "Спална Соба", status: "Комплетиран комфор", img: "assets/images/bedroom-after.jpg" }
      ],
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
      collapseAllCards();
      
      stageButtons.forEach(b => {
        b.classList.remove('bg-[#E5252A]', 'text-white', 'border-[#E5252A]', 'glow-red-sm');
        b.classList.add('bg-[#14161A]', 'text-zinc-400', 'border-white/10');
      });

      btn.classList.remove('bg-[#14161A]', 'text-zinc-400', 'border-white/10');
      btn.classList.add('bg-[#E5252A]', 'text-white', 'border-[#E5252A]', 'glow-red-sm');

      const data = stageData[stage];
      if (data) {
        if (visualizerGrid) {
          visualizerGrid.style.opacity = '0.3';
          setTimeout(() => {
            if (data.rooms && data.rooms.length === 4) {
              if (visImg0) visImg0.src = data.rooms[0].img;
              if (visLabel0) visLabel0.textContent = data.rooms[0].name;
              if (visSub0) visSub0.textContent = data.rooms[0].status;

              if (visImg1) visImg1.src = data.rooms[1].img;
              if (visLabel1) visLabel1.textContent = data.rooms[1].name;
              if (visSub1) visSub1.textContent = data.rooms[1].status;

              if (visImg2) visImg2.src = data.rooms[2].img;
              if (visLabel2) visLabel2.textContent = data.rooms[2].name;
              if (visSub2) visSub2.textContent = data.rooms[2].status;

              if (visImg3) visImg3.src = data.rooms[3].img;
              if (visLabel3) visLabel3.textContent = data.rooms[3].name;
              if (visSub3) visSub3.textContent = data.rooms[3].status;
            }
            visualizerGrid.style.opacity = '1';
          }, 180);
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

  // Interactive Expanding Multi-Room Grid on Hover / Tap (Smooth Luxury Transition)
  const visCards = document.querySelectorAll('.vis-card');
  const visGrid = document.getElementById('visualizerGrid');
  const visMobileCollapseBtn = document.getElementById('visMobileCollapseBtn');

  function expandCard(index) {
    visCards.forEach((c, idx) => {
      if (idx === index) {
        c.classList.add('is-expanded');
      } else {
        c.classList.remove('is-expanded');
      }
    });
    if (visMobileCollapseBtn) {
      visMobileCollapseBtn.classList.remove('opacity-0', 'pointer-events-none');
      visMobileCollapseBtn.classList.add('opacity-100', 'pointer-events-auto');
    }
  }

  function collapseAllCards() {
    visCards.forEach(c => c.classList.remove('is-expanded'));
    if (visMobileCollapseBtn) {
      visMobileCollapseBtn.classList.add('opacity-0', 'pointer-events-none');
      visMobileCollapseBtn.classList.remove('opacity-100', 'pointer-events-auto');
    }
  }

  visCards.forEach((card, idx) => {
    card.addEventListener('mouseenter', () => {
      expandCard(idx);
    });
    card.addEventListener('click', (e) => {
      if (!card.classList.contains('is-expanded')) {
        expandCard(idx);
      }
    });
  });

  if (visMobileCollapseBtn) {
    visMobileCollapseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      collapseAllCards();
    });
  }

  if (visGrid) {
    visGrid.addEventListener('mouseleave', () => {
      collapseAllCards();
    });
  }

  // Preload all stage visualizer images for instant switching
  Object.values(stageData).forEach(stg => {
    if (stg.rooms) {
      stg.rooms.forEach(r => {
        const img = new Image();
        img.src = r.img;
      });
    }
  });

  // 4. Project Gallery Filter & Lightbox (with Dynamic CMS Integration)
  const galleryFilterContainer = document.getElementById('galleryFilterContainer');
  const galleryContainer = document.getElementById('galleryContainer');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const closeLightbox = document.getElementById('closeLightbox');

  let activeGalleryFilter = 'all';

  function applyGalleryFilter(filter) {
    activeGalleryFilter = filter;
    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
      if (filter === 'all' || (item.dataset.category && item.dataset.category.includes(filter))) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  }

  // Delegated Filter Button Handler (works for both default & dynamically created category buttons)
  if (galleryFilterContainer) {
    galleryFilterContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.gallery-filter-btn');
      if (!btn) return;

      const allBtns = galleryFilterContainer.querySelectorAll('.gallery-filter-btn');
      allBtns.forEach(b => {
        b.classList.remove('bg-[#E5252A]', 'text-white', 'border-[#E5252A]');
        b.classList.add('bg-[#14161A]', 'text-zinc-400', 'border-white/10');
      });
      btn.classList.remove('bg-[#14161A]', 'text-zinc-400', 'border-white/10');
      btn.classList.add('bg-[#E5252A]', 'text-white', 'border-[#E5252A]');
      applyGalleryFilter(btn.dataset.filter);
    });
  }

  // Delegated Lightbox Click Handler (works for both static and dynamically added projects)
  if (galleryContainer) {
    galleryContainer.addEventListener('click', (e) => {
      const item = e.target.closest('.gallery-item');
      if (!item) return;

      const img = item.querySelector('img');
      const title = item.dataset.title || 'Проект на ANTHRA';
      const desc = item.dataset.desc || 'Професионална изведба со највисок квалитет.';

      if (lightboxModal && lightboxImg && img) {
        lightboxImg.src = img.src;
        if (lightboxTitle) lightboxTitle.textContent = title;
        if (lightboxDesc) lightboxDesc.textContent = desc;
        lightboxModal.classList.remove('hidden');
        lightboxModal.classList.add('flex');
      }
    });
  }

  // Dynamic CMS Project Loader
  async function loadDynamicGalleryProjects() {
    if (!window.AnthraCMS || !galleryContainer) return;

    try {
      const projects = await window.AnthraCMS.getProjects();
      if (!projects || projects.length === 0) return;

      // Create and prepend custom uploaded projects to the gallery
      const dynamicElements = projects.map(p => {
        const div = document.createElement('div');
        div.className = 'gallery-item dynamic-item group cursor-pointer';
        div.dataset.category = p.category || 'all';
        div.dataset.title = p.title || 'Проект на ANTHRA';
        div.dataset.desc = p.description || 'Професионална изведба со највисок квалитет.';

        const isContain = (p.image_fit === 'contain') || (p.image_url && p.image_url.includes('fit=contain'));

        div.innerHTML = `
          <div class="gallery-img-container rounded-2xl overflow-hidden border border-white/10 bg-[#14161A] h-72 relative flex items-center justify-center">
            ${isContain ? `
              <img src="${p.image_url}" alt="" class="absolute inset-0 w-full h-full object-cover filter blur-md opacity-30 scale-110 pointer-events-none">
              <img src="${p.image_url}" alt="${p.title}" class="relative z-10 max-h-full max-w-full object-contain p-2 group-hover:scale-105 transition-transform duration-500">
            ` : `
              <img src="${p.image_url}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            `}
            <div class="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
              <span class="text-[#E5252A] text-xs font-sans font-bold uppercase">${p.category_label || p.category}</span>
              <h4 class="text-white font-bold text-base line-clamp-1">${p.title}</h4>
              <p class="text-zinc-300 text-xs mt-1">Кликни за детален приказ</p>
            </div>
          </div>
        `;
        return div;
      });

      // Insert at the beginning of the gallery
      dynamicElements.reverse().forEach(el => {
        galleryContainer.prepend(el);
      });

      // Automatically register and display new category filter buttons if not already present
      if (galleryFilterContainer) {
        projects.forEach(p => {
          if (!p.category || p.category === 'all') return;
          const existingBtn = galleryFilterContainer.querySelector(`[data-filter="${p.category}"]`);
          if (!existingBtn) {
            const newFilterBtn = document.createElement('button');
            newFilterBtn.dataset.filter = p.category;
            newFilterBtn.className = 'gallery-filter-btn px-4 py-2 rounded-lg bg-[#14161A] text-zinc-400 border border-white/10 hover:text-white text-xs sm:text-sm font-semibold transition-all';
            newFilterBtn.textContent = p.category_label || p.category;
            galleryFilterContainer.appendChild(newFilterBtn);
          }
        });
      }

      // Re-apply active filter if any
      applyGalleryFilter(activeGalleryFilter);
    } catch (err) {
      console.warn('Anthra: Failed to load dynamic gallery items:', err);
    }
  }

  // Trigger dynamic loading
  loadDynamicGalleryProjects();

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

  // 5. Interactive On-Site Inspection Configurator (Direct WhatsApp & Viber 1-Click Send)
  const inquiryForm = document.getElementById('inquiryForm');
  const whatsappInquiryBtn = document.getElementById('whatsappInquiryBtn');
  const viberInquiryBtn = document.getElementById('viberInquiryBtn');

  // Official ANTHRA Contact Numbers
  const ANTHRA_WHATSAPP_NUMBER = '38970616028'; // WhatsApp: 070 616 028
  const ANTHRA_VIBER_NUMBER = '38971778256';    // Viber: 071 778 256

  function handleInquirySend(channel) {
    const clientName = document.getElementById('inquiryName')?.value.trim();
    const clientPhone = document.getElementById('inquiryPhone')?.value.trim();
    const city = document.getElementById('inquiryCity')?.value.trim() || 'Скопје';
    const spaceType = document.querySelector('input[name="spaceType"]:checked')?.value || 'Стан';
    const sqm = document.getElementById('inquirySqm')?.value.trim() || 'Ориентационо';
    const notes = document.getElementById('inquiryNotes')?.value.trim() || '';

    if (!clientName || !clientPhone) {
      alert('Ве молиме пополнете ги задолжителните полиња (Име и Телефон) пред да испратите.');
      if (!clientName) document.getElementById('inquiryName')?.focus();
      else document.getElementById('inquiryPhone')?.focus();
      return;
    }

    // Collect selected services
    const selectedServices = [];
    document.querySelectorAll('.inquiry-service:checked').forEach(cb => {
      selectedServices.push(cb.value);
    });
    const servicesText = selectedServices.length > 0 ? selectedServices.join(', ') : 'Општо барање за увид';

    // Structured message template
    const message = `Почитувани ANTHRA,\nБи сакал да закажам теренски увид:\n\n` +
      `👤 Име: ${clientName}\n` +
      `📞 Телефон: ${clientPhone}\n` +
      `📍 Град/Локација: ${city}\n` +
      `🏠 Објект: ${spaceType} (~${sqm})\n` +
      `🔨 Потребни услуги: ${servicesText}\n` +
      (notes ? `📝 Забелешка: ${notes}\n\n` : '\n') +
      `Ве молам за повратна информација за термин за увид.`;

    const encoded = encodeURIComponent(message);

    if (channel === 'whatsapp') {
      window.open(`https://wa.me/${ANTHRA_WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
    } else if (channel === 'viber') {
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = `viber://chat?number=%2B${ANTHRA_VIBER_NUMBER}&draft=${encoded}`;
      } else {
        window.open(`viber://chat?number=%2B${ANTHRA_VIBER_NUMBER}`, '_blank');
      }
    }
  }

  if (whatsappInquiryBtn) {
    whatsappInquiryBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handleInquirySend('whatsapp');
    });
  }

  if (viberInquiryBtn) {
    viberInquiryBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handleInquirySend('viber');
    });
  }

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleInquirySend('whatsapp');
    });
  }

  // 6. Smooth Interactive Mouse Cursor Glow & Spotlight Effect (Desktop only)
  const cursorRing = document.getElementById('cursorGlowRing');
  const cursorDot = document.getElementById('cursorGlowDot');
  const cursorSpotlight = document.getElementById('cursorAmbientSpotlight');

  if (cursorRing && cursorSpotlight && window.innerWidth > 768) {
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
    window.addEventListener('touchmove', hideCursor, { passive: true });
    window.addEventListener('touchend', hideCursor, { passive: true });
    document.addEventListener('mouseleave', hideCursor);

    const handlePointer = (e) => {
      if (e.pointerType === 'touch') {
        hideCursor();
        return;
      }

      if (window.innerWidth <= 768) {
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
    };

    if (window.PointerEvent) {
      window.addEventListener('pointermove', handlePointer, { passive: true });
    } else {
      window.addEventListener('mousemove', handlePointer, { passive: true });
    }

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
