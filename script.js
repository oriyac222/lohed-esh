const scenes = [...document.querySelectorAll('.scene')];
const cinematic = document.querySelector('.cinematic');
const counter = document.querySelector('.current-scene');
const header = document.querySelector('.site-header');

function updateCinematic() {
  const rect = cinematic.getBoundingClientRect();
  const travel = Math.max(1, cinematic.offsetHeight - innerHeight);
  const p = Math.max(0, Math.min(0.999, -rect.top / travel));
  const sceneIndex = Math.min(2, Math.floor(p * 3));
  const local = (p * 3) % 1;
  scenes.forEach((scene, i) => {
    scene.classList.toggle('active', i === sceneIndex);
    if (i === sceneIndex) {
      scene.className = `scene active show-${Math.min(10, Math.floor(local * 11) + 1)}`;
      const video = scene.querySelector('video');
      if (video && video.paused) video.play().catch(() => {});
    } else scene.className = 'scene';
  });
  counter.textContent = String(sceneIndex + 1).padStart(2, '0');
  header.style.background = scrollY > 30 ? '#080909e8' : 'linear-gradient(#000a,transparent)';
}
addEventListener('scroll', updateCinematic, { passive: true });
addEventListener('resize', updateCinematic);
updateCinematic();

document.querySelector('#readiness-form').addEventListener('submit', event => {
  event.preventDefault();
  document.querySelector('#check-result').hidden = false;
  document.querySelector('#check-result').scrollIntoView({ behavior: 'smooth', block: 'center' });
});

document.querySelector('#year').textContent = new Date().getFullYear();
