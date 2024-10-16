//buttons nav
function navigateTo(page) {
    window.location.href = page;
}

//random books
function generateRandomImage() {
    // Array of image filenames in the "images" folder
    const imageNames = [
        'TSITP.webp',
        'TBDINE.webp',
        'NP.webp',
        // Add more image filenames as needed
    ];

    // Get a random index to select a random image
    const randomIndex = Math.floor(Math.random() * imageNames.length);

    // Create an image element for the placeholder
    const placeholderImg = document.createElement('img');
    placeholderImg.src = '/images/Books/TSITP.webp'; // Path to your placeholder image
    placeholderImg.alt = 'Loading...';

    // Get the container element and clear any existing content
    const imageContainer = document.getElementById('image-container');
    imageContainer.innerHTML = '';
    imageContainer.appendChild(placeholderImg); // Display the placeholder while loading

    // Create an image element for the random image
    const imgElement = document.createElement('img');

    // Set the source attribute to the randomly selected image
    imgElement.src = 'images/books/' + imageNames[randomIndex];

    // Set additional attributes as needed (e.g., alt text, width, height)
    imgElement.alt = 'Random Book Image';
    imgElement.height = 300; // Adjust the height as needed

    // Once the image is loaded, replace the placeholder with the actual image
    imgElement.onload = function() {
        imageContainer.innerHTML = ''; // Clear the container
        imageContainer.appendChild(imgElement); // Append the loaded image
    };
}


//SIGN IN FEATURE
function signIn(event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Check credentials (Replace this with your authentication logic)
    if (username === 'user' && password === 'password') {
        document.getElementById('message').textContent = 'Sign in successful!';
        
        // Create a button element for logged in user
        var loggedInButton = document.createElement('button');
        loggedInButton.textContent = 'Go To Admin Home';
        loggedInButton.classList.add('nav-buttons'); // Add class for styling
        loggedInButton.onclick = function() {
            navigateTo('adminHome.html');
        };

        // Create a container for the button
        var buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        buttonContainer.appendChild(loggedInButton);

        // Get the container for the sign-in form
        var signInContainer = document.getElementById('loginForm').parentNode;

        // Append the button container below the sign-in form
        signInContainer.appendChild(buttonContainer);
    } else {
        document.getElementById('message').textContent = 'Invalid username or password';
    }
}




//CART
// Function to update total when quantity changes
function updateTotal(itemIndex) {
    const priceElement = document.getElementById(`price-${itemIndex}`);
    const quantityElement = document.getElementById(`quantity-${itemIndex}`);
    const totalElement = document.getElementById(`total-${itemIndex}`);

    // Extract numeric value from price (assuming it's formatted as "$XX")
    const price = parseFloat(priceElement.textContent.replace('$', ''));
    const quantity = parseInt(quantityElement.value);
    const total = price * quantity;

    // Display formatted total with a single dollar sign
    totalElement.textContent = total.toFixed(2);

    // Update the overall cart summary every time an item's total changes
    updateCartSummary();
}

// Function to update overall cart summary
function updateCartSummary() {
    let subtotal = 0;
    const taxRate = 0.08;
    const shippingCost = 10;

    // Loop through each item and calculate subtotal
    const items = document.querySelectorAll('.item');
    items.forEach((item, index) => {
        if (index > 0) { // Skip the header item
            const priceElement = item.querySelector('p[id^="price-"]');
            const quantityElement = item.querySelector('input[type="number"]');
            const price = parseFloat(priceElement.textContent.replace('$', ''));
            const quantity = parseInt(quantityElement.value);
            subtotal += price * quantity;
        }
    });

    // Calculate tax and total
    const tax = subtotal * taxRate;
    const total = subtotal + tax + shippingCost;

    // Update cart summary elements and ensure only one dollar sign appears
    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('tax').textContent = tax.toFixed(2);
    document.getElementById('shipping').textContent = shippingCost.toFixed(2);
    document.getElementById('total').textContent = total.toFixed(2);

    // Format summary elements with a dollar sign
    const summaryElements = document.querySelectorAll('#cart-summary p span');
    summaryElements.forEach(element => {
        element.textContent = `$${element.textContent}`;
    });

    // Update total items count
    document.getElementById('total-items').textContent = items.length - 1; // Subtract the header
}

// Add event listeners to quantity input fields
window.onload = function() {
    const quantityInputs = document.querySelectorAll('.quantity');
    quantityInputs.forEach((input, index) => {
        input.addEventListener('change', () => {
            updateTotal(index + 1); // Add 1 to the index because IDs start from 1 in HTML
        });
    });

    // Initial update on page load to ensure values are correct
    updateCartSummary();
};

//save changes button
document.addEventListener('DOMContentLoaded', function () {
    const saveButtons = document.querySelectorAll('.myButton'); // Select all buttons with class 'myButton'
    saveButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the closest parent .article2 element
            let displayText = this.closest('.article2').querySelector('#displayText');
            displayText.textContent = 'Your changes have been saved!';
        });
    });
});

//Dynamic greeting
function updateGreeting() {
    const today = new Date();
    const hour = today.getHours();
    const greeting = document.getElementById('dynamic-greeting');
    if (hour < 12) {
        greeting.innerText = 'Good Morning!   Welcome to the #BookTok Shop!   Enjoy your stay!';
    } else if (hour < 18) {
        greeting.innerText = 'Good Afternoon!   Welcome to the #BookTok Shop!   Enjoy your stay!';
    } else {
        greeting.innerText = 'Good Evening!   Welcome to the #BookTok Shop!   Enjoy your stay!';
    }
    showModal();
}

function showModal() {
    const modal = document.getElementById("greetingModal");
    modal.style.display = "block";
}

function closeModal() {
    var modal = document.getElementById("greetingModal");
    modal.style.display = "none";
}

document.addEventListener('DOMContentLoaded', function () {
    // Load functions on window load
    generateRandomImage(); // Assuming this function is defined elsewhere
    updateGreeting();

    // Event listener for closing the modal
    document.querySelector('.close').addEventListener('click', closeModal);

    // Clicking outside the modal closes it
    window.addEventListener('click', function(event) {
        var modal = document.getElementById("greetingModal");
        if (event.target == modal) {
            closeModal();
        }
    });
});



