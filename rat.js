const ratingSlider = document.getElementById('id-rating');
const stars = ratingSlider.querySelectorAll('.rating');

// Add click and keyboard event listeners to stars
stars.forEach(star => {
  star.addEventListener('click', () => {
    const value = star.getAttribute('data-value');
    setRating(value);
  });
  
  star.addEventListener('mouseenter', () => {
    highlightStars(star.getAttribute('data-value'));
  });

  star.addEventListener('mouseleave', () => {
    resetStars();
  });
});

// Keyboard navigation
ratingSlider.addEventListener('keydown', (e) => {
  const currentRating = parseInt(ratingSlider.getAttribute('aria-valuenow'));
  if (e.key === 'ArrowRight' && currentRating < 10) {
    setRating(currentRating + 1);
  } else if (e.key === 'ArrowLeft' && currentRating > 1) {
    setRating(currentRating - 1);
  }
});

function setRating(value) {
    stars.forEach(star => {
      const starValue = star.getAttribute('data-value');
      if (starValue <= value) {
        star.querySelector('.star').classList.add('selected');
      } else {
        star.querySelector('.star').classList.remove('selected');
      }
    });
    
    ratingSlider.setAttribute('aria-valuenow', value);
    ratingSlider.setAttribute('aria-valuetext', `Rating: ${value}`);
  
    // Announce the rating based on the selected value
    const announcement = document.getElementById('announcement');
    if (value === "1") {
      announcement.textContent = "Extremely Unsatisfied";
    } else if (value === "10") {
      announcement.textContent = "Extremely Satisfied";
    } else {
      announcement.textContent = `Rating: ${value}`;
    }
    
    // Clear the announcement text after 100 ms
    setTimeout(() => {
      announcement.textContent = '';
    }, 2000);
  }
  
  
  

function highlightStars(value) {
  stars.forEach(star => {
    if (star.getAttribute('data-value') <= value) {
      star.querySelector('.star').classList.add('hover');
    } else {
      star.querySelector('.star').classList.remove('hover');
    }
  });
}

function resetStars() {
  stars.forEach(star => {
    star.querySelector('.star').classList.remove('hover');
  });
}
