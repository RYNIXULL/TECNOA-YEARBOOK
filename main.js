import { studentsData, classInfo, memoryGallery, vintageClassifieds, backgrounds } from './data.js';

const STUDENTS_PER_PAGE = 6;
const yearbookContainer = document.getElementById('yearbook-container');

// Helper to chunk array
function chunkArray(array, size) {
  const chunked_arr = [];
  let index = 0;
  while (index < array.length) {
    chunked_arr.push(array.slice(index, size + index));
    index += size;
  }
  return chunked_arr;
}

// Render Fastener (Tape, Paperclip, Corners)
function renderFastener(type) {
  if (type === 'washi-top') {
    return `<div class="washi-tape washi-tape-top"></div>`;
  } else if (type === 'washi-left') {
    return `<div class="washi-tape washi-tape-diagonal-left"></div>`;
  } else if (type === 'paperclip') {
    return `<div class="paperclip-top"></div>`;
  } else if (type === 'corners') {
    return `
      <div class="photo-corner-tl"></div>
      <div class="photo-corner-tr"></div>
      <div class="photo-corner-bl"></div>
      <div class="photo-corner-br"></div>
    `;
  }
  return `<div class="washi-tape washi-tape-top"></div>`;
}

// Render Rubber Stamp
function renderStamp(text, color = 'red') {
  if (!text) return '';
  const colorClass = color === 'blue' ? 'rubber-stamp rubber-stamp-blue' : 'rubber-stamp';
  return `<div class="${colorClass}">${text}</div>`;
}

// -------------------------------------------------------------
// PAGE 2: FACULTY CHRONICLES & LAB MEMOIRS
// -------------------------------------------------------------
function renderChroniclesPage() {
  const pageEl = document.createElement('div');
  pageEl.className = 'a4-page';
  pageEl.id = 'page-chronicles';
  pageEl.style.backgroundImage = backgrounds.newspaperCollage;
  pageEl.style.backgroundSize = 'cover';
  
  pageEl.innerHTML = `
    <!-- 3D Mading Pushpins -->
    <div class="pushpin pushpin-blue" style="top: 12px; left: 18px;"></div>
    <div class="pushpin pushpin-red" style="top: 12px; right: 18px;"></div>

    <div class="h-full flex flex-col justify-between relative">
      <!-- Coffee Stain Decoration -->
      <div class="coffee-ring" style="top: -20px; right: 10px;"></div>
      <div class="postal-mark" style="bottom: 80px; left: 10px;">OCT 1958</div>

      <!-- Top Header -->
      <div class="border-b-2 border-ink pb-2 mb-4 flex justify-between items-end font-typewriter text-xs">
        <div><span>DOC. NO: TECNOA-2026-CHRONICLE</span></div>
        <div class="text-center font-bold tracking-widest uppercase">FACULTY ARCHIVES & MEMORANDUM</div>
        <div><span>CLASSIFICATION: HISTORIC</span></div>
      </div>

      <!-- Main Headline -->
      <div class="text-center mb-4">
        <h2 class="font-cinzel text-3xl md:text-4xl font-black tracking-tight uppercase">THE CHRONICLES OF LAB 404</h2>
        <div class="vintage-divider font-typewriter text-xs tracking-widest text-ink/70">
          <span>MEMOIR OF OUR DIGITAL VOYAGE</span>
        </div>
      </div>

      <!-- Middle Content: Left Photo, Right Typewriter Memo -->
      <div class="grid grid-cols-12 gap-5 flex-grow items-stretch">
        
        <!-- Left: Pinned Photo with Washi Tape -->
        <div class="col-span-7 flex flex-col justify-between">
          <div class="relative cardboard-card p-3" style="transform: rotate(-1deg);">
            <div class="washi-tape washi-tape-top"></div>
            <div class="overflow-hidden border border-ink/40 bg-white p-1 shadow-inner">
              <img src="/main_photo.jpg" alt="Vintage Computing Lab" class="w-full h-56 object-cover vintage-photo-img filter contrast-125">
            </div>
            <div class="pt-2 font-typewriter text-[11px] text-ink/90 italic leading-snug">
              Fig 1.1 — "The Digital Computing Center (Harvard 1958)". Where our senior mentors mapped the earliest binary architectures.
            </div>
          </div>

          <!-- Bottom Quote Box -->
          <div class="cardboard-parchment p-3 relative mt-3" style="transform: rotate(0.8deg);">
            <div class="paperclip-top"></div>
            <p class="font-handwriting text-lg text-ink leading-tight font-bold">
              "We didn't just study algorithms; we survived the syntax errors, shared the midnight instant noodles, and forged a brotherhood in binary."
            </p>
            <span class="block text-right font-typewriter text-[10px] uppercase mt-1">— Anonymous Classmate, 3:42 AM</span>
          </div>
        </div>

        <!-- Right: Official Typewriter Memorandum -->
        <div class="col-span-5 flex flex-col justify-between cardboard-parchment p-4 border border-ink/30 relative" style="transform: rotate(0.5deg);">
          <div class="washi-tape washi-tape-diagonal-right"></div>
          
          <div>
            <div class="flex justify-between items-center mb-2 pb-1 border-b border-ink/20 font-typewriter text-[11px]">
              <span class="font-bold">SUBJECT:</span>
              <span class="italic">Class of '26 Survival Guide</span>
            </div>
            
            <p class="font-typewriter text-[11px] leading-relaxed text-justify mb-2">
              1. <strong>Rule #1:</strong> Never push straight to production on a rainy Friday afternoon.
            </p>
            <p class="font-typewriter text-[11px] leading-relaxed text-justify mb-2">
              2. <strong>Rule #2:</strong> Coffee in the laboratory is strictly classified as essential fuel, not beverage.
            </p>
            <p class="font-typewriter text-[11px] leading-relaxed text-justify mb-2">
              3. <strong>Rule #3:</strong> When the build breaks, look at the last commit by the person who claims "it was working a minute ago."
            </p>
            <p class="font-typewriter text-[11px] leading-relaxed text-justify">
              4. <strong>Legacy:</strong> 35 brilliant minds, 10,000 commits, zero regrets.
            </p>
          </div>

          <!-- Stamp & Signature -->
          <div class="pt-3 border-t border-ink/20 flex justify-between items-center">
            <div>
              ${renderStamp("OFFICIAL ARCHIVE", "red")}
            </div>
            <div class="text-right">
              <span class="font-handwriting text-xl text-ink block font-bold leading-none">Prof. Alan Turing</span>
              <span class="font-typewriter text-[9px] uppercase tracking-wider text-ink/70">Faculty Dean</span>
            </div>
          </div>

        </div>

      </div>

      <!-- Bottom Telegram Banner -->
      <div class="mt-4 border-t-2 border-b-2 border-ink py-2 bg-[#ebe2cf] flex justify-between items-center font-typewriter text-xs">
        <span class="font-bold tracking-wider">WESTERN UNION TELEGRAM:</span>
        <span class="italic tracking-widest text-[11px]">TECNOA GRADUATES DISPATCHED WORLDWIDE. MISSION ACCOMPLISHED. STOP.</span>
        <span class="font-bold">PAGE 02</span>
      </div>
    </div>
  `;

  yearbookContainer.appendChild(pageEl);
}

// -------------------------------------------------------------
// PAGES 3 - 8: STUDENT SCRAPBOOK CARDS
// -------------------------------------------------------------
function renderStudentPages() {
  const pages = chunkArray(studentsData, STUDENTS_PER_PAGE);

  pages.forEach((pageStudents, pageIndex) => {
    const pageNumber = pageIndex + 3; // Starts from Page 3
    const pageEl = document.createElement('div');
    pageEl.className = 'a4-page';
    pageEl.id = `page-students-${pageNumber}`;
    
    // Set alternate vintage background textures on all pages
    if (pageIndex % 2 === 1) {
      pageEl.style.backgroundImage = backgrounds.vintagePostcard;
      pageEl.style.backgroundSize = 'cover';
    } else {
      pageEl.style.backgroundImage = backgrounds.newspaperCollage;
      pageEl.style.backgroundSize = 'cover';
    }

    let studentsHTML = '';
    
    pageStudents.forEach((student, sIdx) => {
      // Cardboard variant
      const cardTypeClass = student.cardType === 'kraft' 
        ? 'cardboard-kraft' 
        : (student.cardType === 'parchment' ? 'cardboard-parchment' : 'cardboard-card');
      
      // Slight organic scrapbook rotation
      const rotations = [-1.8, 1.2, -0.9, 1.6, -1.4, 0.8];
      const rotation = rotations[sIdx % rotations.length];

      studentsHTML += `
        <div class="flex flex-col justify-between p-3.5 ${cardTypeClass} relative" style="transform: rotate(${rotation}deg);">
          
          <!-- Ephemera Fastener (Tape / Paperclip / Photo Corner) -->
          ${renderFastener(student.fastener)}

          <!-- Student Header & Stamp -->
          <div class="flex justify-between items-start gap-1 mb-1">
            <span class="font-typewriter text-[9px] font-bold tracking-widest uppercase opacity-70">CADET #${String(student.id).padStart(2, '0')}</span>
            ${renderStamp(student.stamp, student.stampColor)}
          </div>

          <!-- Vintage Photo Frame -->
          <div class="vintage-photo-frame mb-2 relative group cursor-pointer" onclick="showToast('Viewing dossier for ${student.name}', 'info')">
            <div class="w-full h-36 overflow-hidden bg-ink/10 border border-ink/20">
              <img src="${student.photo}" alt="${student.name}" class="w-full h-full object-cover vintage-photo-img">
            </div>
            <!-- Photo caption -->
            <div class="mt-1 flex justify-between items-center font-typewriter text-[9px] text-ink/70">
              <span>PHOTO: VERIFIED</span>
              <span class="font-mono text-[8px]">${student.social}</span>
            </div>
          </div>

          <!-- Name & Role -->
          <div class="text-center mb-1">
            <h3 class="font-cinzel font-bold text-sm leading-tight text-ink uppercase tracking-tight">${student.name}</h3>
            <p class="font-typewriter text-[10px] text-ink/80 italic leading-snug">${student.role}</p>
          </div>

          <!-- Quote in Typewriter Font -->
          <div class="my-1 py-1 border-t border-b border-ink/20 text-center flex-grow flex items-center justify-center">
            <p class="font-typewriter text-[10px] text-ink/90 italic leading-snug line-clamp-3">
              "${student.quote}"
            </p>
          </div>

          <!-- Handwritten Student Note / Superlative -->
          <div class="pt-1 text-center">
            <span class="font-handwriting text-base font-bold text-[#8b1e1e] block leading-none">
              ${student.handnote}
            </span>
          </div>

        </div>
      `;
    });

    const pinColorsLeft = ['pushpin-red', 'pushpin-yellow', 'pushpin-green', 'pushpin-blue'];
    const pinColorsRight = ['pushpin-yellow', 'pushpin-green', 'pushpin-blue', 'pushpin-red'];
    const pinLeft = pinColorsLeft[pageIndex % pinColorsLeft.length];
    const pinRight = pinColorsRight[pageIndex % pinColorsRight.length];

    pageEl.innerHTML = `
      <!-- 3D Mading Pushpins -->
      <div class="pushpin ${pinLeft}" style="top: 12px; left: 18px;"></div>
      <div class="pushpin ${pinRight}" style="top: 12px; right: 18px;"></div>

      <div class="h-full flex flex-col justify-between relative">
        
        <!-- Subtle Vintage Watermark / Corner Postmark -->
        <div class="postal-mark" style="top: -10px; right: 20px;">CLASS '26</div>

        <!-- Header -->
        <div class="flex justify-between items-end border-b-2 border-ink pb-1.5 mb-3 font-typewriter text-xs">
          <div class="flex items-center gap-2">
            <span class="font-gothic text-2xl leading-none">T</span>
            <span class="font-bold tracking-widest uppercase">TECNOA CADET ROSTER · SECTION ${pageIndex + 1}</span>
          </div>
          <span class="italic">ARCHIVE PAGE 0${pageNumber}</span>
        </div>
        
        <!-- 6 Students Grid -->
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 flex-grow items-stretch py-1">
          ${studentsHTML}
        </div>
        
        <!-- Footer -->
        <div class="mt-3 pt-2 border-t-2 border-ink flex justify-between items-center font-typewriter text-[10px] uppercase tracking-widest text-ink/80">
          <span>FACULTY OF INFORMATICS & COMPUTER SCIENCE</span>
          <span>EST. 2026 · VINTAGE MEMORABILIA</span>
          <span>CONFIDENTIAL REGISTER</span>
        </div>
      </div>
    `;

    yearbookContainer.appendChild(pageEl);
  });
}

// -------------------------------------------------------------
// PAGE 9: CLASSIFIEDS, SUPERLATIVES & FAREWELL TRANSMISSION
// -------------------------------------------------------------
function renderFarewellPage() {
  const pageEl = document.createElement('div');
  pageEl.className = 'a4-page';
  pageEl.id = 'page-farewell';
  pageEl.style.backgroundImage = backgrounds.newspaperCollage;
  pageEl.style.backgroundSize = 'cover';
  
  let classifiedsHTML = '';
  vintageClassifieds.forEach(ad => {
    classifiedsHTML += `
      <div class="classified-box mb-2">
        <h4 class="font-typewriter font-bold text-[11px] uppercase border-b border-ink/40 pb-0.5 mb-1">${ad.title}</h4>
        <p class="font-typewriter text-[10px] text-justify leading-tight">${ad.desc}</p>
      </div>
    `;
  });

  pageEl.innerHTML = `
    <!-- 3D Mading Pushpins -->
    <div class="pushpin pushpin-green" style="top: 12px; left: 18px;"></div>
    <div class="pushpin pushpin-red" style="top: 12px; right: 18px;"></div>

    <div class="h-full flex flex-col justify-between relative">
      
      <!-- Corner Postage Stamps & Seals -->
      <div class="coffee-ring" style="bottom: 60px; right: 10px;"></div>
      <div class="postal-mark" style="top: 10px; right: 15px;">FINAL AIR MAIL</div>

      <!-- Top Header -->
      <div class="border-b-2 border-ink pb-2 mb-3 flex justify-between items-end font-typewriter text-xs">
        <div><span>TECNOA DISPATCH</span></div>
        <div class="text-center font-bold tracking-widest uppercase">CLASSIFIEDS & FAREWELL TRANSMISSIONS</div>
        <div><span>FINAL EDITION</span></div>
      </div>

      <!-- Headline -->
      <div class="text-center mb-3">
        <h2 class="font-cinzel text-3xl font-black tracking-tight uppercase">THE FINAL SIGN-OFF</h2>
        <div class="vintage-divider font-typewriter text-xs tracking-widest text-ink/70">
          <span>UNTIL WE MEET AT THE NEXT REFACTOR</span>
        </div>
      </div>

      <!-- Main Columns -->
      <div class="grid grid-cols-12 gap-5 flex-grow">
        
        <!-- Left: Vintage Classifieds -->
        <div class="col-span-5 flex flex-col justify-between">
          <div class="border-2 border-ink p-3 bg-[#ede4d3]">
            <div class="bg-ink text-newspaper p-1.5 text-center mb-2">
              <h3 class="font-typewriter font-bold text-xs uppercase tracking-widest">VINTAGE CLASSIFIEDS</h3>
            </div>
            ${classifiedsHTML}
          </div>

          <!-- Bottom Superlative Scrap -->
          <div class="cardboard-card p-3 relative mt-2" style="transform: rotate(-1deg);">
            <div class="washi-tape washi-tape-top"></div>
            <h4 class="font-cinzel font-bold text-xs uppercase text-center mb-1">MOST LIKELY TO...</h4>
            <ul class="font-typewriter text-[10px] space-y-1">
              <li>— <strong>Debug with coffee:</strong> 100% of Class</li>
              <li>— <strong>Automate their job:</strong> Hardware Crew</li>
              <li>— <strong>Never leave Vim:</strong> Jonathan S.</li>
            </ul>
          </div>
        </div>

        <!-- Right: Official Farewell Letter & Stamp Collection -->
        <div class="col-span-7 flex flex-col justify-between cardboard-parchment p-4 border border-ink/40 relative" style="transform: rotate(0.6deg);">
          <div class="paperclip-top"></div>

          <div>
            <div class="text-center border-b border-ink/30 pb-2 mb-3">
              <span class="font-gothic text-3xl">The Valedictory Address</span>
            </div>

            <p class="font-typewriter text-[11px] leading-relaxed text-justify mb-2">
              To the formidable class of TECNOA: Four years ago, we entered this institution with empty text editors and uncertain terminal prompts. Today, we leave as architects of the digital frontier.
            </p>

            <p class="font-typewriter text-[11px] leading-relaxed text-justify mb-2">
              We have deciphered cryptic compiler warnings, endured late-night deadlock dilemmas, and witnessed ideas transform from fleeting whiteboard sketches into robust systems.
            </p>

            <p class="font-handwriting text-xl text-ink font-bold leading-snug text-center my-3 text-[#7a1c1c]">
              "May your functions always return truthy, your latency stay near zero, and your bonds remain unbreakable."
            </p>
          </div>

          <!-- Signatures Grid -->
          <div class="border-t border-ink/30 pt-3 flex justify-between items-end">
            <div>
              ${renderStamp("VALEDICTORY SEAL", "red")}
              <span class="block font-typewriter text-[9px] mt-1 text-ink/70">ARCHIVED IN TECNOA REPOSITORY</span>
            </div>
            <div class="text-right">
              <span class="font-handwriting text-2xl font-bold text-ink block leading-none">Class of 2026</span>
              <span class="font-typewriter text-[10px] uppercase tracking-wider text-ink/80">TECNOA Cadets</span>
            </div>
          </div>

        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="mt-4 border-t-2 border-ink pt-2 flex justify-between items-center font-typewriter text-xs">
        <span class="font-bold tracking-wider">END OF VOLUME XXIV</span>
        <span class="italic text-[11px]">PRINTED ON A4 ARCHIVAL MEDIUM · TECNOA 2026</span>
        <span class="font-bold">PAGE 09</span>
      </div>

    </div>
  `;

  yearbookContainer.appendChild(pageEl);
}

// -------------------------------------------------------------
// INITIALIZE RENDER
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  renderChroniclesPage();  // Page 2
  renderStudentPages();     // Pages 3 to 8
  renderFarewellPage();     // Page 9
  
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
