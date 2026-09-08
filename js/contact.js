/**
 * AJITESH SAI N. - DATA ANALYST PORTFOLIO
 * Contact Form Controller & Dual Gmail / Mailto Draft Generator
 */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  const statusBanner = document.getElementById('contact-status-banner');
  const statusMessage = document.getElementById('contact-status-text');

  // Helper validation functions
  function validateName(value) {
    const trimmed = value.trim();
    if (!trimmed) return 'Please enter your full name.';
    if (trimmed.length < 2) return 'Name must be at least 2 characters.';
    return '';
  }

  function validateEmail(value) {
    const trimmed = value.trim();
    if (!trimmed) return 'Please enter your email address.';
    // RFC 5322 compliant regex for robust email validation
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!emailRegex.test(trimmed)) return 'Please provide a valid email address (e.g. name@domain.com).';
    return '';
  }

  function validateMessage(value) {
    const trimmed = value.trim();
    if (!trimmed) return 'Please enter your message.';
    if (trimmed.length < 10) return 'Please provide a little more detail (at least 10 characters).';
    return '';
  }

  // Real-time input validation listeners
  nameInput.addEventListener('input', () => {
    const error = validateName(nameInput.value);
    if (!error) {
      nameInput.classList.remove('error');
      nameError.classList.remove('visible');
      nameError.textContent = '';
    }
  });

  emailInput.addEventListener('input', () => {
    const error = validateEmail(emailInput.value);
    if (!error) {
      emailInput.classList.remove('error');
      emailError.classList.remove('visible');
      emailError.textContent = '';
    }
  });

  messageInput.addEventListener('input', () => {
    const error = validateMessage(messageInput.value);
    if (!error) {
      messageInput.classList.remove('error');
      messageError.classList.remove('visible');
      messageError.textContent = '';
    }
  });

  // Form Submit Handler
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reset banner
    statusBanner.className = 'contact-status-banner';
    statusBanner.style.display = 'none';

    const nameVal = nameInput.value;
    const emailVal = emailInput.value;
    const messageVal = messageInput.value;

    const nameErr = validateName(nameVal);
    const emailErr = validateEmail(emailVal);
    const messageErr = validateMessage(messageVal);

    let hasError = false;

    if (nameErr) {
      nameInput.classList.add('error');
      nameError.textContent = nameErr;
      nameError.classList.add('visible');
      hasError = true;
    } else {
      nameInput.classList.remove('error');
      nameError.classList.remove('visible');
    }

    if (emailErr) {
      emailInput.classList.add('error');
      emailError.textContent = emailErr;
      emailError.classList.add('visible');
      hasError = true;
    } else {
      emailInput.classList.remove('error');
      emailError.classList.remove('visible');
    }

    if (messageErr) {
      messageInput.classList.add('error');
      messageError.textContent = messageErr;
      messageError.classList.add('visible');
      hasError = true;
    } else {
      messageInput.classList.remove('error');
      messageError.classList.remove('visible');
    }

    if (hasError) return;

    // Build Email Draft
    const recipient = 'nagellasai06@gmail.com';
    const subject = 'Portfolio Contact — Ajitesh Sai';
    const bodyContent = `Name: ${nameVal.trim()}\n\nEmail: ${emailVal.trim()}\n\nMessage:\n\n${messageVal.trim()}`;

    // Prefer web-based Gmail composer URL
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyContent)}`;
    const mailtoUrl = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyContent)}`;

    // Open Web Gmail in new tab/window
    let opened = false;
    try {
      const newWin = window.open(gmailComposeUrl, '_blank');
      if (newWin && !newWin.closed) {
        opened = true;
      }
    } catch (err) {
      opened = false;
    }

    // If popup was blocked or unable to open, trigger mailto fallback
    if (!opened) {
      const fallbackAnchor = document.createElement('a');
      fallbackAnchor.href = mailtoUrl;
      fallbackAnchor.target = '_blank';
      fallbackAnchor.rel = 'noopener noreferrer';
      document.body.appendChild(fallbackAnchor);
      fallbackAnchor.click();
      document.body.removeChild(fallbackAnchor);
    }

    // Display subtle review banner (Never claims message was sent automatically)
    statusBanner.className = 'contact-status-banner info';
    statusMessage.innerHTML = '<strong>Your email draft is ready</strong> — just review and send in your email client.';
    statusBanner.style.display = 'flex';
  });
});
