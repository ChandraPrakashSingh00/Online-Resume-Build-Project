const form = document.getElementById('resumeForm');
const output = document.getElementById('resumeOutput');
const photoContainer = document.getElementById('photoContainer');
const profilePicInput = document.getElementById('profilePic');
const downloadBtn = document.getElementById('downloadBtn');
const themeSwitcher = document.getElementById('themeSwitcher');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const summary = document.getElementById('summary').value;
  const skills = document.getElementById('skills').value.split(',');
  const experience = document.getElementById('experience').value;
  const education = document.getElementById('education').value;

  const data = { name, email, phone, summary, skills, experience, education };
  localStorage.setItem('resumeData', JSON.stringify(data));

  output.innerHTML = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Summary:</strong> ${summary}</p>
    <p><strong>Skills:</strong> ${skills.map(skill => `<span>${skill.trim()}</span>`).join(' ')}</p>
    <p><strong>Experience:</strong> ${experience}</p>
    <p><strong>Education:</strong> ${education}</p>
  `;
});

profilePicInput.addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      photoContainer.innerHTML = `<img src="${e.target.result}" alt="Profile Picture" style="width:120px;border-radius:8px;margin-bottom:10px;">`;
    };
    reader.readAsDataURL(file);
  }
});

downloadBtn.addEventListener('click', () => {
  const preview = document.getElementById('preview');
  html2pdf().from(preview).save('My_Resume.pdf');
});

themeSwitcher.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode');
});

window.addEventListener('load', () => {
  const saved = localStorage.getItem('resumeData');
  if (saved) {
    const data = JSON.parse(saved);
    document.getElementById('name').value = data.name;
    document.getElementById('email').value = data.email;
    document.getElementById('phone').value = data.phone;
    document.getElementById('summary').value = data.summary;
    document.getElementById('skills').value = data.skills.join(', ');
    document.getElementById('experience').value = data.experience;
    document.getElementById('education').value = data.education;

    output.innerHTML = `
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Summary:</strong> ${data.summary}</p>
      <p><strong>Skills:</strong> ${data.skills.map(skill => `<span>${skill.trim()}</span>`).join(' ')}</p>
      <p><strong>Experience:</strong> ${data.experience}</p>
      <p><strong>Education:</strong> ${data.education}</p>
    `;
  }
});
