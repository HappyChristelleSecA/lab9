$(document).ready(function() {
    // Filter functionality
    $('.filter-btn').on('click', function() {
        const category = $(this).data('category');
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        updateGalleryView(category);
    });

    // Effect functionality
    $('.filter1-btn').on('click', function() {
        const effect = $(this).data('effect');
        $('.filter1-btn').removeClass('active');
        $(this).addClass('active');
        applyImageEffect(effect);
    });

    // Lightbox functionality
    $('.image-container').on('click', function() {
        const imgSrc = $(this).find('img').attr('src');
        const imgAlt = $(this).find('img').attr('alt');
        $('#lightbox-img').attr('src', imgSrc).attr('alt', imgAlt);
        $('#lightbox').removeClass('hidden').hide().fadeIn(400);
    });

    $('.close, #lightbox').on('click', function(e) {
        if (e.target !== this) return;
        $('#lightbox').fadeOut(400, function() {
            $(this).addClass('hidden');
        });
    });

    // Enhanced hover effects
    $('.image-container').hover(
        function() {
            $(this).find('img').stop(true, false).animate({
                transform: 'scale(1.1)',
                opacity: 0.8
            }, 300);
            $(this).find('figcaption').stop(true, false).fadeIn(300);
        },
        function() {
            $(this).find('img').stop(true, false).animate({
                transform: 'scale(1)',
                opacity: 1
            }, 300);
            $(this).find('figcaption').stop(true, false).fadeOut(300);
        }
    );

    // Lazy loading
    $('.image-container img').each(function() {
        $(this).attr('data-src', $(this).attr('src'));
       
    });

    $(window).on('scroll', function() {
        $('.image-container img').each(function() {
            if ($(this).offset().top < $(window).scrollTop() + $(window).height()) {
                $(this).attr('src', $(this).data('src'));
            }
        });
    });

    // Helper functions
    function updateGalleryView(category) {
        if (category === 'all') {
            $('.image-container').fadeOut(300, function() {
                $('.image-container').fadeIn(300);
            });
        } else {
            $('.image-container').fadeOut(300, function() {
                $('.image-container').hide();
                $(`.image-container[data-category="${category}"]`).fadeIn(300);
            });
        }
        setTimeout(updateImageCount, 600);
    }

    function applyImageEffect(effect) {
        $('.image-container img').removeClass('grayscale sepia blur');
        if (effect !== 'none') {
            $('.image-container img').addClass(effect);
        }
    }

    function updateImageCount() {
        const totalImages = $('.image-container').length;
        const visibleImages = $('.image-container:visible').length;
        $('#image-count').text(`Showing ${visibleImages} of ${totalImages} images`);
    }
});