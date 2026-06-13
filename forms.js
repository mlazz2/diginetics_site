(function () {
    function initForm(form) {
        var status = form.querySelector('.form-status');
        var submitBtn = form.querySelector('[type="submit"]');

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!submitBtn) return;

            submitBtn.disabled = true;
            if (status) {
                status.textContent = 'Sending...';
                status.className = 'form-status form-status--pending is-visible';
            }

            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { Accept: 'application/json' }
            })
                .then(function (response) {
                    return response.json().then(function (data) {
                        if (!response.ok) {
                            throw new Error(data.message || 'Request failed');
                        }
                        return data;
                    });
                })
                .then(function () {
                    if (status) {
                        status.textContent = form.getAttribute('data-success') || 'Thanks. We will get back to you shortly.';
                        status.className = 'form-status form-status--success is-visible';
                    }
                    form.reset();
                })
                .catch(function () {
                    if (status) {
                        status.textContent = 'Something went wrong. Please try again in a moment.';
                        status.className = 'form-status form-status--error is-visible';
                    }
                })
                .finally(function () {
                    submitBtn.disabled = false;
                });
        });
    }

    document.querySelectorAll('[data-diginetics-form]').forEach(initForm);
})();
