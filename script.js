document.addEventListener('DOMContentLoaded', () => {
  // 1. 연도 자동 표기
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // 2. 모바일 메뉴 토글
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  const setMenu = (open) => {
    mobileMenu.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  };

  menuToggle.addEventListener('click', () => {
    setMenu(!mobileMenu.classList.contains('open'));
  });

  // 모바일 메뉴 항목 클릭 시 닫기
  document.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });

  // 3. 다크모드 토글
  const themeToggle = document.getElementById('theme-toggle');
  const moonIcon = document.querySelector('.icon-moon');
  const sunIcon = document.querySelector('.icon-sun');

  const updateThemeIcon = () => {
    const isDark = document.documentElement.classList.contains('dark');
    moonIcon.classList.toggle('hidden', isDark);
    sunIcon.classList.toggle('hidden', !isDark);
  };

  updateThemeIcon();

  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon();
  });

  // 4. 스크롤 등장 애니메이션
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealElements.forEach((el) => revealObserver.observe(el));

  // 5. 현재 섹션에 맞춰 네비게이션 강조
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  sections.forEach((section) => sectionObserver.observe(section));

  // 6. 헤더 그림자 (스크롤 시)
  const header = document.getElementById('header');
  const onScroll = () => {
    header.classList.toggle('shadow-md', window.scrollY > 10);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 7. 전화번호 복사 + 토스트
  const copyBtn = document.getElementById('copy-phone');
  const toast = document.getElementById('toast');
  let toastTimer = null;

  const showToast = (message) => {
    toast.textContent = message;
    toast.classList.remove('translate-y-20', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.add('translate-y-20', 'opacity-0');
      toast.classList.remove('translate-y-0', 'opacity-100');
    }, 2000);
  };

  copyBtn.addEventListener('click', async () => {
    const phone = '010-5419-7881';
    try {
      await navigator.clipboard.writeText(phone);
      showToast('전화번호가 복사되었습니다');
    } catch (err) {
      showToast('복사에 실패했습니다');
    }
  });
});
