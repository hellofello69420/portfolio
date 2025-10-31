// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function () {
	const btn = document.querySelector('.menu-toggle');
	const nav = document.querySelector('.nav-links');
	const themeBtn = document.querySelector('.theme-toggle');
	const root = document.documentElement;

	if (!btn || !nav) return;

	// Initialize theme (persisted or prefers-color-scheme)
	function applyTheme(t) {
		root.setAttribute('data-theme', t);
		if (themeBtn) {
			themeBtn.setAttribute('aria-pressed', t === 'dark' ? 'true' : 'false');
			themeBtn.textContent = t === 'dark' ? '🌙' : '🌞';
		}
	}

	(function initTheme() {
		const saved = localStorage.getItem('theme');
		if (saved === 'light' || saved === 'dark') {
			applyTheme(saved);
		} else {
			const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
			applyTheme(prefersDark ? 'dark' : 'light');
		}
	})();

	if (themeBtn) {
		themeBtn.addEventListener('click', function () {
			const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
			const next = current === 'dark' ? 'light' : 'dark';
			applyTheme(next);
			localStorage.setItem('theme', next);
		});
	}

	btn.addEventListener('click', function () {
			const expanded = btn.getAttribute('aria-expanded') === 'true';
			const newState = !expanded;
			btn.setAttribute('aria-expanded', String(newState));
			nav.classList.toggle('show');
			btn.classList.toggle('active');
	});

	// Close the menu when a nav link is clicked (useful on mobile)
	nav.querySelectorAll('a').forEach(function (link) {
		link.addEventListener('click', function () {
			nav.classList.remove('show');
				btn.setAttribute('aria-expanded', 'false');
				btn.classList.remove('active');
		});
	});

		// Close on Escape key for accessibility
		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape' || e.key === 'Esc') {
				if (nav.classList.contains('show')) {
					nav.classList.remove('show');
					btn.classList.remove('active');
					btn.setAttribute('aria-expanded', 'false');
					btn.focus();
				}
			}
		});
});

