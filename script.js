document.addEventListener('DOMContentLoaded', () => {
	const pw = document.getElementById('password');
	if (!pw) return; // tidak ada field password

	// Bungkus input password agar tombol bisa diposisikan relatif tanpa
	// mengubah file HTML asli secara manual.
	const wrapper = document.createElement('div');
	wrapper.style.position = 'relative';
	wrapper.style.display = 'inline-block';
	// Sisipkan wrapper sebelum input, lalu pindahkan input ke dalam wrapper
	pw.parentNode.insertBefore(wrapper, pw);
	wrapper.appendChild(pw);

	// Tambahkan tombol toggle
	const btn = document.createElement('button');
	btn.type = 'button';
	btn.setAttribute('aria-pressed', 'false');
	btn.setAttribute('aria-label', 'Tampilkan kata sandi');
	btn.title = 'Tampilkan kata sandi';
	btn.innerText = '👁️';

	// Gaya minimal agar tidak bergantung pada style.css
	btn.style.position = 'absolute';
	btn.style.right = '6px';
	btn.style.top = '50%';
	btn.style.transform = 'translateY(-50%)';
	btn.style.border = 'none';
	btn.style.background = 'transparent';
	btn.style.cursor = 'pointer';
	btn.style.padding = '0';
	btn.style.fontSize = '1rem';
	btn.style.lineHeight = '1';
	btn.style.opacity = '0.8';

	// Tambahkan padding kanan pada input agar teks tidak tertutup tombol
	const computed = window.getComputedStyle(pw);
	const padRight = parseFloat(computed.paddingRight) || 8;
	pw.style.paddingRight = (padRight + 28) + 'px';

	wrapper.appendChild(btn);

	let shown = false;
	function updateState() {
		pw.type = shown ? 'text' : 'password';
		btn.setAttribute('aria-pressed', String(shown));
		btn.setAttribute('aria-label', shown ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi');
		btn.title = shown ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi';
		btn.style.opacity = shown ? '1' : '0.8';
	}

	btn.addEventListener('click', () => {
		shown = !shown;
		updateState();
	});

	// Aksesibilitas: tangani Enter/Space
	btn.addEventListener('keydown', (e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			btn.click();
		}
	});

	// Pastikan saat form diisi cepat (quickFill) tidak otomatis menampilkan password
	// (tidak perlu penanganan khusus — state hanya berubah lewat klik)
});
