$(document).ready(async () => {
    document.getElementById("submit-button").addEventListener("click", function() {
        var button = this;
        button.classList.add("loading");
        button.disabled = true;
    
        // Simulate an asynchronous operation
        setTimeout(function() {
            button.classList.remove("loading");
            button.classList.add("checkmark");
            button.disabled = false;
            
            // Reset button state after a delay
            setTimeout(function() {
                button.classList.remove("checkmark");
            }, 2000);
        }, 3000);
    });
    
})
