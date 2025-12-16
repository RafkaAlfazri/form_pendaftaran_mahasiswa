// Tunggu sampai DOM selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Ambil elemen form dan pesan sukses
    const form = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');
    
    // Fungsi untuk menampilkan pesan error
    function showError(inputId, message) {
        const errorElement = document.getElementById(inputId + 'Error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        // Tambah class error pada input
        const inputElement = document.getElementById(inputId);
        inputElement.style.borderColor = '#e74c3c';
    }
    
    // Fungsi untuk menghapus pesan error
    function clearError(inputId) {
        const errorElement = document.getElementById(inputId + 'Error');
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        
        // Hapus class error dari input
        const inputElement = document.getElementById(inputId);
        inputElement.style.borderColor = '#e0e6ed';
    }
    
    // Fungsi untuk validasi field
    function validateField(inputId, errorMessage) {
        const inputElement = document.getElementById(inputId);
        const value = inputElement.value.trim();
        
        if (value === '') {
            showError(inputId, errorMessage);
            return false;
        } else {
            clearError(inputId);
            return true;
        }
    }
    
    // Validasi khusus untuk email
    function validateEmail() {
        const email = document.getElementById('email').value.trim();
        
        if (email === '') {
            showError('email', 'Email harus diisi');
            return false;
        } else if (!isValidEmail(email)) {
            showError('email', 'Format email tidak valid');
            return false;
        } else {
            clearError('email');
            return true;
        }
    }
    
    // Validasi khusus untuk password
    function validatePassword() {
        const password = document.getElementById('password').value;
        
        if (password === '') {
            showError('password', 'Password harus diisi');
            return false;
        } else if (password.length < 8) {
            showError('password', 'Password minimal 8 karakter');
            return false;
        } else {
            clearError('password');
            return true;
        }
    }
    
    // Validasi konfirmasi password
    function validateKonfirmasiPassword() {
        const password = document.getElementById('password').value;
        const konfirmasi = document.getElementById('konfirmasi').value;
        
        if (konfirmasi === '') {
            showError('konfirmasi', 'Konfirmasi password harus diisi');
            return false;
        } else if (password !== konfirmasi) {
            showError('konfirmasi', 'Password tidak cocok');
            return false;
        } else {
            clearError('konfirmasi');
            return true;
        }
    }
    
    // Validasi jenis kelamin (radio button)
    function validateJenisKelamin() {
        const jenisKelamin = document.querySelector('input[name="jenisKelamin"]:checked');
        
        if (!jenisKelamin) {
            showError('jenisKelamin', 'Pilih jenis kelamin');
            return false;
        } else {
            clearError('jenisKelamin');
            return true;
        }
    }
    
    // Validasi persetujuan (checkbox)
    function validatePersetujuan() {
        const persetujuan = document.getElementById('persetujuan');
        
        if (!persetujuan.checked) {
            showError('persetujuan', 'Anda harus menyetujui syarat dan ketentuan');
            return false;
        } else {
            clearError('persetujuan');
            return true;
        }
    }
    
    // Fungsi untuk validasi format email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Reset form
    function resetForm() {
        form.reset();
        form.style.display = 'block';
        successMessage.style.display = 'none';
        
        // Hapus semua pesan error
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            error.textContent = '';
        });
        
        // Reset border color untuk semua input
        const inputs = document.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.style.borderColor = '#e0e6ed';
        });
    }
    
    // Event listener untuk submit form
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah pengiriman form default
        
        // Validasi semua field
        const isNamaValid = validateField('nama', 'Nama harus diisi');
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isKonfirmasiValid = validateKonfirmasiPassword();
        const isJurusanValid = validateField('jurusan', 'Pilih jurusan');
        const isJenisKelaminValid = validateJenisKelamin();
        const isPersetujuanValid = validatePersetujuan();
        
        // Jika semua validasi berhasil
        if (isNamaValid && isEmailValid && isPasswordValid && 
            isKonfirmasiValid && isJurusanValid && isJenisKelaminValid && isPersetujuanValid) {
            
            // Tampilkan pesan sukses dan sembunyikan form
            form.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Scroll ke pesan sukses
            successMessage.scrollIntoView({ behavior: 'smooth' });
            
            // Log data form ke console (simulasi pengiriman data)
            const formData = {
                nama: document.getElementById('nama').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                jurusan: document.getElementById('jurusan').value,
                jenisKelamin: document.querySelector('input[name="jenisKelamin"]:checked').value
            };
            
            console.log('Data pendaftaran mahasiswa:', formData);
            console.log('Form berhasil divalidasi dan data siap dikirim!');
        } else {
            // Jika validasi gagal, tampilkan pesan alert
            alert('Harap perbaiki kesalahan pada form sebelum mendaftar!');
        }
    });
    
    // Event listener untuk tombol reset form
    document.getElementById('resetFormBtn').addEventListener('click', resetForm);
    
    // Event listeners untuk validasi real-time pada setiap field
    document.getElementById('nama').addEventListener('blur', function() {
        validateField('nama', 'Nama harus diisi');
    });
    
    document.getElementById('email').addEventListener('blur', validateEmail);
    
    document.getElementById('password').addEventListener('blur', validatePassword);
    
    document.getElementById('konfirmasi').addEventListener('blur', validateKonfirmasiPassword);
    
    document.getElementById('jurusan').addEventListener('change', function() {
        validateField('jurusan', 'Pilih jurusan');
    });
    
    // Validasi real-time untuk radio button
    const radioButtons = document.querySelectorAll('input[name="jenisKelamin"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', validateJenisKelamin);
    });
    
    // Validasi real-time untuk checkbox
    document.getElementById('persetujuan').addEventListener('change', validatePersetujuan);
    
    // Event listener untuk menghapus error saat user mulai mengetik
    document.getElementById('nama').addEventListener('input', function() {
        clearError('nama');
    });
    
    document.getElementById('email').addEventListener('input', function() {
        clearError('email');
    });
    
    document.getElementById('password').addEventListener('input', function() {
        clearError('password');
    });
    
    document.getElementById('konfirmasi').addEventListener('input', function() {
        clearError('konfirmasi');
    });
});