// تسجيل الدخول
function login() {
  const username = document.getElementById('username').value.trim();
  const userCode = document.getElementById('userCode').value.trim();

  if (username === '' || userCode === '') {
    alert('من فضلك أدخل اسم المستخدم وكود المستخدم');
    return;
  }

  if (userCode !== '50') {
    alert('كود المستخدم غير صحيح! يجب أن يكون 50 جنيه للدخول');
    return;
  }

  // تخزين بيانات المستخدم مؤقتًا
  localStorage.setItem('username', username);
  window.location.href = 'index.html';
}

// التحقق من تسجيل الدخول في الصفحة الرئيسية
if (window.location.pathname.includes('index.html')) {
  const username = localStorage.getItem('username');
  if (!username) {
    window.location.href = 'login.html';
  }
}

// تسجيل الخروج
function logout() {
  localStorage.removeItem('username');
  window.location.href = 'login.html';
}

// شراء الكورس
function buyCourse() {
  const username = localStorage.getItem('username');
  const params = new URLSearchParams(window.location.search);
  const courseName = params.get('course');

  if (!username) {
    alert('يجب تسجيل الدخول أولاً');
    window.location.href = 'login.html';
    return;
  }

  // حفظ اسم الكورس في localStorage
  localStorage.setItem('purchasedCourse', courseName);

  alert(`✅ تم شراء ${courseName} بنجاح!`);

  // تحويل حسب نوع الكورس
  if (courseName === 'HTML') {
    window.location.href = 'firstPrepVideos.html';
  } else if (courseName === 'CSS') {
    window.location.href = 'secondPrepVideos.html';
  } else if (courseName === 'JavaScript') {
    window.location.href = 'thirdPrepVideos.html';
  }
}



// صفحة فيديوهات الكورس
if (window.location.pathname.includes('course_videos.html')) {
  const username = localStorage.getItem('username');
  const purchasedCourse = localStorage.getItem('purchasedCourse');
  const params = new URLSearchParams(window.location.search);
  const courseName = params.get('course');

  if (!username) {
    window.location.href = 'login.html';
  }

  if (purchasedCourse !== courseName) {
    alert('❌ يجب شراء الكورس أولاً قبل مشاهدة الفيديوهات');
    window.location.href = `course.html?course=${courseName}`;
  }

  document.getElementById('courseTitle').textContent = `فيديوهات كورس ${courseName}`;

  const videoList = document.getElementById('videoList');
  const videos = {
    'HTML': [
      'https://www.youtube.com/embed/qz0aGYrrlhU',
      'videos/vid-1.mp4'
    ],
    'CSS': [
      'https://www.youtube.com/embed/yfoY53QXEnI',
      'https://www.youtube.com/embed/1Rs2ND1ryYc'
    ],
    'JavaScript': [
      'https://www.youtube.com/embed/W6NZfCO5SIk',
      'https://www.youtube.com/embed/hdI2bqOjy3c'
    ]
  };

  if (videos[courseName]) {
    videos[courseName].forEach(link => {
      const iframe = document.createElement('iframe');
      iframe.src = link;
      iframe.allowFullscreen = true;
      videoList.appendChild(iframe);
    });
  } else {
    videoList.innerHTML = '<p>لا توجد فيديوهات متاحة لهذا الكورس حالياً.</p>';
  }
}


