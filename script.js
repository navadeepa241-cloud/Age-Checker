document.addEventListener('DOMContentLoaded', () => {
    const checkBtn = document.getElementById('checkBtn');
    const birthDateInput = document.getElementById('birthDate');
    const resultDisplay = document.getElementById('result');

    // Function to display result with animation
    const showResult = (message, type) => {
        // Reset animation state
        resultDisplay.classList.remove('show', 'success', 'error');
        
        // Brief timeout to trigger reflow and restart animation if clicking multiple times
        setTimeout(() => {
            resultDisplay.textContent = message;
            resultDisplay.classList.add('show', type);
        }, 50);
    };

    checkBtn.addEventListener('click', () => {
        const birthDateValue = birthDateInput.value;

        // Input validation
        if (!birthDateValue) {
            showResult("Please enter your birth date.", "error");
            return;
        }

        const birthDate = new Date(birthDateValue);
        const today = new Date();

        if (birthDate > today) {
            showResult("You can't be born in the future!", "error");
            return;
        }

        // Calculate exact age
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        // Adjust age if birthday hasn't happened this year
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        let ageText = age === 1 ? 'year' : 'years';
        showResult(`You are ${age} ${ageText} old!`, "success");
    });

    // Allow Enter key to trigger the check
    birthDateInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkBtn.click();
            // Remove focus from input to dismiss mobile keyboards
            birthDateInput.blur();
        }
    });
});
