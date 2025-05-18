document.addEventListener("DOMContentLoaded", () => {
    const gsapBtn = document.querySelector(".get-gsap-btn");
    const flair = gsapBtn.querySelector(".button__flair");
    let lastDirection = { x: 0, y: 0 }; // Store entry direction for exit animation
  
    gsapBtn.addEventListener("mouseenter", (e) => {
      const rect = gsapBtn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
  
      const distances = {
        top: y,
        bottom: rect.height - y,
        left: x,
        right: rect.width - x,
      };
  
      const minDist = Math.min(distances.top, distances.bottom, distances.left, distances.right);
  
      let offsetX = 0;
      let offsetY = 0;
  
      if (minDist === distances.top) {
        offsetX = 0;
        offsetY = -rect.height;  // Move flair up outside button
      } else if (minDist === distances.bottom) {
        offsetX = 0;
        offsetY = rect.height;   // Move flair down outside button
      } else if (minDist === distances.left) {
        offsetX = -rect.width;   // Move flair left outside button
        offsetY = 0;
      } else {
        offsetX = rect.width;    // Move flair right outside button
        offsetY = 0;
      }
  
      lastDirection = { x: offsetX, y: offsetY }; // Save direction for mouseleave
  
      gsap.set(flair, {
        scale: 0,
        x: offsetX,
        y: offsetY,
      });
  
      gsap.to(flair, {
        scale: 1,
        x: 0,
        y: 0,
        duration: 0.05,
        ease: "none",
      });
    });
  
    gsapBtn.addEventListener("mouseleave", () => {
      gsap.to(flair, {
        scale: 0,
        x: lastDirection.x,
        y: lastDirection.y,
        duration: 0.05,
        ease: "none",
      });
    });
  });
  
