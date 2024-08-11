document.getElementById('toggleToSignUp').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('container').classList.add('active');
});

document.getElementById('toggleToSignIn').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('container').classList.remove('active');
});
