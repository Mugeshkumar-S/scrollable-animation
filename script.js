const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const frameCount = 242;
const images = [];
let currentFrame = 0;

// Function to generate image path
function getImagePath(index) {
  return `images/ezgif-3920020ebc895e3f-jpg/ezgif-frame-${String(index).padStart(3, "0")}.jpg`;
}

// Preload images
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = getImagePath(i);
  images.push(img);
}

// Draw image
function drawImage(index) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(images[index], 0, 0, canvas.width, canvas.height);
}

// Scroll listener
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScroll;

  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );

  if (frameIndex !== currentFrame) {
    currentFrame = frameIndex;
    requestAnimationFrame(() => drawImage(frameIndex));
  }
});

// Draw first frame
images[0].onload = () => {
  drawImage(0);
};
