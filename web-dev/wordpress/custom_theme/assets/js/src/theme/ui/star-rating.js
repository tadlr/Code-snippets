const StartController = () => {
  // Select all star rating containers
  const starRatingContainers = document.querySelectorAll('.sk-star-rating');

  starRatingContainers.forEach((container) => {
    // Get the rating for this specific container
    const rating = parseFloat(container.getAttribute('data-rating'));
    // Get all star elements within this container
    const stars = container.querySelectorAll('.sk-star');

    for (let i = 0; i < stars.length; i++) {
      if (i < Math.floor(rating)) {
        stars[i].classList.add('filled');
      } else if (i === Math.floor(rating) && !Number.isInteger(rating)) {
        let fillPercent = ((rating % 1) * 100).toFixed(2);
        if (fillPercent === '75.00') {
          fillPercent = '68.50';
        }
        if (fillPercent === '25.00') {
          fillPercent = '30.5';
        }

        stars[i].classList.add('partial');

        stars[i].style.setProperty('--fill-percent', fillPercent + '%');
      }
    }
  });
};

export const init = () => {
  StartController();
};
