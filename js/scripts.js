document.addEventListener('DOMContentLoaded', function () {
    // Create and add the overlay element
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    // Simulating the transition to the homepage
    setTimeout(() => {
        const ipod = document.getElementById('ipod');
        const ipodScreen = document.getElementById('ipodScreen');
        const logo = document.querySelector('.logo');
        const homepage = document.getElementById('homepage');

        // Change the iPod screen to white
        ipodScreen.style.backgroundColor = 'white';

        // Immediately hide the logo image
        logo.style.visibility = 'hidden';

        // Delay to ensure smooth effect
        setTimeout(() => {
            // Ensure the iPod container and screen start in the center and scale up smoothly
            ipod.style.transform = 'scale(1)'; // Start with initial size
            ipodScreen.style.transform = 'scale(1)'; // Start with initial size

            // Smoothly expand the iPod container and screen
            setTimeout(() => {
                ipod.style.transform = 'scale(5)'; // Adjust scale for iPod container
                ipodScreen.style.transform = 'scale(5)'; // Adjust scale for iPod screen

                // After expansion is complete, start fading out the screen
                setTimeout(() => {
                    ipodScreen.style.opacity = '0'; // Fade out after expanding
                }, 2000); // Delay before fading out

                // Show the homepage right after expansion
                homepage.classList.add('show-homepage');

                const firstMenuItem = document.querySelector('.menu-sidebar ul li');
                if (firstMenuItem) {
                    updatePage(firstMenuItem); // Automatically display the first page
                    currentlyHovering = firstMenuItem; // Set the first menu item as currently hovered
                    updateHoveredState(); // Apply hover effect to the first menu item
                }

                // Remove the overlay and re-enable mouse events
                setTimeout(() => {
                    document.body.removeChild(overlay);
                }, 500); // Adjust this delay to match the loading screen duration

            }, 2000); // Adjust this delay to control timing of expansion

        }, 1000); // Adjust this delay for how long the white screen remains static

    }, 2500); // Delay before starting the transition



    let activeMenuItem = null; // Track the active menu item
    let currentlyHovering = null; // Track the currently hovering menu item
    let hoverTimeout = null; // Track hover timeout

    // Function to handle page updates
    function updatePage(menuItem) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => page.classList.remove('show-page'));

        // Show the page associated with the menu item
        const pageId = menuItem.getAttribute('data-page');
        const activePage = document.getElementById(pageId);

        if (activePage) {
            activePage.classList.add('show-page');
            document.querySelector('.right-section').classList.add('show-right-section');
        } else {
            document.querySelector('.right-section').classList.remove('show-right-section');
        }
    }

    

    // Function to update the hovered state
    function updateHoveredState() {
        document.querySelectorAll('.menu-sidebar ul li').forEach(item => {
            item.classList.remove('hovered');
        });

        if (currentlyHovering) {
            currentlyHovering.classList.add('hovered');
        } else if (activeMenuItem) {
            activeMenuItem.classList.add('hovered');
        }
        document.querySelectorAll('.board-sidebar ul li').forEach(item => {
            item.classList.remove('hovered');
        });

        if (currentlyHovering) {
            currentlyHovering.classList.add('hovered');
        } else if (activeMenuItem) {
            activeMenuItem.classList.add('hovered');
        }
        document.querySelectorAll('.girl-sidebar ul li').forEach(item => {
            item.classList.remove('hovered');
        });

        if (currentlyHovering) {
            currentlyHovering.classList.add('hovered');
        } else if (activeMenuItem) {
            activeMenuItem.classList.add('hovered');
        }
    }

    function toggleGenderSpecificFields() {
        const gender = document.getElementById('gender').value;
        const cupSizeContainer = document.getElementById('cupSizeContainer');
        const cupSizeInput = document.getElementById('cupSize');
        const dressSizeContainer = document.getElementById('dressSizeContainer');
        const dressSizeInput = document.getElementById('dressSize');
      
        // Show cup size only for Female and Other
        if (gender === 'Female' || gender === 'Other') {
          cupSizeContainer.classList.add('flex'); // Show and align cup size container
          cupSizeInput.setAttribute('required', 'required'); // Add required attribute
          dressSizeContainer.classList.add('flex'); // Show and align cup size container
          dressSizeInput.setAttribute('required', 'required'); // Add required attribute
        } else {
          cupSizeContainer.classList.remove('flex'); // Hide cup size container
          cupSizeInput.removeAttribute('required'); // Remove required attribute
          dressSizeContainer.classList.remove('flex'); // Hide cup size container
          dressSizeInput.removeAttribute('required'); // Remove required attribute
        }
      }
      
      // Add event listener to the gender dropdown
      document.getElementById('gender').addEventListener('change', toggleGenderSpecificFields);
      
      // Check gender-specific fields on page load as well
      document.addEventListener('DOMContentLoaded', toggleGenderSpecificFields);
      

    // Address required fields logic
    const requiredAddressFields = document.querySelectorAll('.address-input[required]');

    requiredAddressFields.forEach(field => {
        field.addEventListener('input', function () {
            const asterisk = this.parentElement.querySelector('.required-asterisk');
            if (this.checkValidity()) {
                asterisk.style.display = 'none';
            } else {
                asterisk.style.display = 'inline';
            }
        });
    });

    const requiredFields = document.querySelectorAll('[data-required]');
    
    requiredFields.forEach(field => {
      field.addEventListener('input', function () {
        const asterisk = this.previousElementSibling.querySelector('.required-asterisk');
        if (this.checkValidity()) {
          asterisk.style.display = 'none';
        } else {
          asterisk.style.display = 'inline';
        }
      });
    });

    const headshotInput = document.getElementById('headshot');
    const fullBodyShotInput = document.getElementById('fullBodyShot');
    const maxFiles = 5; // Maximum number of files

    function updateFileList(input, fileNamesSpan, asteriskElement) {
        const files = input.files;

        if (files.length > 0) {
            const fileNames = Array.from(files).map(file => file.name).join(', ');
            fileNamesSpan.textContent = fileNames;

            // Hide the asterisk if files are selected
            asteriskElement.style.display = 'none';
        } else {
            fileNamesSpan.textContent = 'No files chosen';

            // Show the asterisk if no files are selected
            asteriskElement.style.display = 'inline';
        }
    }

    // Update file list for headshot input
    headshotInput.addEventListener('change', function() {
        const fileNamesSpan = document.getElementById('headshot-file-names');
        const asteriskElement = document.querySelector('label[for="headshot"] .required-asterisk'); // Correct selector for the asterisk
        updateFileList(headshotInput, fileNamesSpan, asteriskElement);

        // Check the number of files
        if (headshotInput.files.length > maxFiles) {
            alert(`You can only upload up to ${maxFiles} headshot photos.`);
            
            // Keep only the first 'maxFiles' files
            const files = Array.from(headshotInput.files).slice(0, maxFiles);
            const dataTransfer = new DataTransfer();
            files.forEach(file => dataTransfer.items.add(file));
            headshotInput.files = dataTransfer.files; // Update the input's file list
            updateFileList(headshotInput, fileNamesSpan, asteriskElement);
        }
    });

    // Update file list for full body shot input
    fullBodyShotInput.addEventListener('change', function() {
        const fileNamesSpan = document.getElementById('fullBodyShot-file-names');
        const asteriskElement = document.querySelector('label[for="fullBodyShot"] .required-asterisk'); // Correct selector for the asterisk
        updateFileList(fullBodyShotInput, fileNamesSpan, asteriskElement);

        // Check the number of files
        if (fullBodyShotInput.files.length > maxFiles) {
            alert(`You can only upload up to ${maxFiles} full body shot photos.`);
            
            // Keep only the first 'maxFiles' files
            const files = Array.from(fullBodyShotInput.files).slice(0, maxFiles);
            const dataTransfer = new DataTransfer();
            files.forEach(file => dataTransfer.items.add(file));
            fullBodyShotInput.files = dataTransfer.files; // Update the input's file list
            updateFileList(fullBodyShotInput, fileNamesSpan, asteriskElement);
        }
    });

    document.getElementById('submitForm').addEventListener('submit', function(event) {
        const fileInput = document.getElementById('fullBodyShot');
        const maxFiles = 5;
    
        // Check if the number of files exceeds the limit
        if (fileInput.files.length > maxFiles) {
            alert(`You can only upload up to ${maxFiles} full body shot photos.`);
            event.preventDefault(); // Prevent the form from submitting
        }
    });

    
    document.getElementById('submitForm').addEventListener('submit', function(event) {
        const fileInput = document.getElementById('headshot');
        const maxFiles = 5;
    
        // Check if the number of files exceeds the limit
        if (fileInput.files.length > maxFiles) {
            alert(`You can only upload up to ${maxFiles} headshot photos.`);
            event.preventDefault(); // Prevent the form from submitting
        }
    });
    
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('charCount');

    messageTextarea.addEventListener('input', function() {
        const remaining = 300 - messageTextarea.value.length;
        charCount.textContent = remaining;
    });

    document.getElementById('dob').addEventListener('input', function (e) {
        let input = e.target.value.replace(/\D/g, ''); // Remove all non-numeric characters
    
        // Format as DD-MM-YYYY
        if (input.length > 2 && input.length <= 4) {
          input = input.slice(0, 2) + '-' + input.slice(2);
        } else if (input.length > 4 && input.length <= 6) {
          input = input.slice(0, 2) + '-' + input.slice(2, 4) + '-' + input.slice(4);
        } else if (input.length > 6) {
          input = input.slice(0, 2) + '-' + input.slice(2, 4) + '-' + input.slice(4, 8);
        }
    
        e.target.value = input;
      });

    document.getElementById('phone').addEventListener('input', function (e) {
        let input = e.target.value.replace(/\D/g, ''); // Remove all non-numeric characters
        if (input.length > 3 && input.length <= 6) {
          input = input.slice(0, 3) + '-' + input.slice(3);
        } else if (input.length > 6) {
          input = input.slice(0, 3) + '-' + input.slice(3, 6) + '-' + input.slice(6, 10);
        }
        e.target.value = input;
      });
1

    document.getElementById('sub-button').addEventListener('click', function() {
        // Select the left and right sections
        const leftSection = document.querySelector('.left-section');
        const rightSection = document.querySelector('.right-section');
        const submissionSection = document.querySelector('.submission-section');
        const subBack = document.querySelector('.sub-back-button');
        const modalstat = document.querySelector('.modal');
        const subMenuBatteryContainer = document.querySelector('.sub-menu-battery-container');
        
        // Add classes to slide them out of the frame
        leftSection.classList.add('slide-left');
        rightSection.classList.add('slide-right');
        submissionSection.classList.add('active');
        subBack.classList.remove('disabled');
        modalstat.classList.remove('show');
        subMenuBatteryContainer.classList.add('show');
        document.getElementById('submitForm').reset();
        const formContainer = document.querySelector('.height-form-container');

            // Scroll the form container to the top
            formContainer.scrollTo({
                top: 0,
                behavior: 'instant' // Smooth scrolling
            });
        setTimeout(() => {
            submissionSection.classList.remove('disabled');
        }, 1000)
    });

    document.getElementById('sub-button-model').addEventListener('click', function() {
        // Select the left and right sections
        const leftSection = document.querySelector('.new-left-section');
        const rightSection = document.querySelector('.right-section');
        const submissionSection = document.querySelector('.submission-section');
        const subBack = document.querySelector('.sub-back-button');
        const modalstat = document.querySelector('.modal');
        const subMenuBatteryContainer = document.querySelector('.sub-menu-battery-container');
        
        // Add classes to slide them out of the frame
        leftSection.classList.add('slide-left');
        rightSection.classList.add('slide-right');
        submissionSection.classList.add('active');
        subBack.classList.remove('disabled');
        modalstat.classList.remove('show');
        subMenuBatteryContainer.classList.add('show');
        document.getElementById('submitForm').reset();
        const formContainer = document.querySelector('.height-form-container');

            // Scroll the form container to the top
            formContainer.scrollTo({
                top: 0,
                behavior: 'instant' // Smooth scrolling
            });
        setTimeout(() => {
            submissionSection.classList.remove('disabled');
        }, 1000)
    });

    document.getElementById('sub-button-male-model').addEventListener('click', function() {
        // Select the left and right sections
        const leftSection = document.querySelector('.new-left-section');
        const rightSection = document.querySelector('.right-section');
        const submissionSection = document.querySelector('.submission-section');
        const subBack = document.querySelector('.sub-back-button');
        const modalstat = document.querySelector('.modal');
        const subMenuBatteryContainer = document.querySelector('.sub-menu-battery-container');
        
        // Add classes to slide them out of the frame
        leftSection.classList.add('slide-left');
        rightSection.classList.add('slide-right');
        submissionSection.classList.add('active');
        subBack.classList.remove('disabled');
        modalstat.classList.remove('show');
        subMenuBatteryContainer.classList.add('show');
        document.getElementById('submitForm').reset();
        const formContainer = document.querySelector('.height-form-container');

            // Scroll the form container to the top
            formContainer.scrollTo({
                top: 0,
                behavior: 'instant' // Smooth scrolling
            });
        setTimeout(() => {
            submissionSection.classList.remove('disabled');
        }, 1000)
    });


    

    document.querySelector('.back-button').addEventListener('click', function() {
        const boardSidebar = document.querySelector('.board-sidebar');
        const menuSidebar = document.querySelector('.menu-sidebar');
        const newLeftSection = document.querySelector('.new-left-section');
        const LeftSection = document.querySelector('.left-section');
        const thirdMenuItem = document.querySelectorAll('.menu-sidebar ul li')[2];
        

        // Hide the board sidebar
        boardSidebar.classList.add('hidden');

        
        // Show the menu sidebar
        menuSidebar.classList.remove('hidden');
        menuSidebar.classList.add('show');
        document.querySelectorAll('.board-sidebar ul li').forEach(item => {
            item.classList.add('disabled');

        });
        currentlyHovering = thirdMenuItem; // Set the first menu item as currently hovered
        setTimeout(() => {
            document.querySelector('.new-menu-battery-container').style.visibility = 'hidden';
            newLeftSection.classList.remove('active');
            boardSidebar.classList.remove('hidden');
            document.querySelectorAll('.menu-sidebar ul li').forEach(item => {
                item.classList.remove('disabled');
            });
            boardSidebar.classList.remove('show')
            
            updatePage(thirdMenuItem); // Automatically display the first page
            activeMenuItem= thirdMenuItem
            updateHoveredState(); // Apply hover effect to the first menu item
        }, 1000)
        

      });

      // Get elements
        const backButton = document.querySelector('.sub-back-button');
        const confirmationModal = document.getElementById('confirmation-modal');
        const confirmYes = document.getElementById('confirm-yes');
        const confirmNo = document.getElementById('confirm-no');

        // Show confirmation modal when back button is clicked
        backButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default back action
        confirmationModal.classList.add('show'); // Show the confirmation modal
        });

        // Handle "Yes" click (go back a page)
        confirmYes.addEventListener('click', function() {
            const leftSection = document.querySelector('.left-section');
            const newLeftSection = document.querySelector('.new-left-section');
            const rightSection = document.querySelector('.right-section');
            const submissionSection = document.querySelector('.submission-section');
            const subMenuBatteryContainer = document.querySelector('.sub-menu-battery-container');

            confirmationModal.classList.remove('show'); // Hide the modal
            submissionSection.classList.add('disabled');
            subMenuBatteryContainer.classList.remove('show');
            
            // Add classes to slide them out of the frame
            leftSection.classList.remove('slide-left');
            newLeftSection.classList.remove('slide-left');
            rightSection.classList.remove('slide-right');
            submissionSection.classList.remove('active')
        });

        // Handle "No" click (just close the modal)
        confirmNo.addEventListener('click', function() {
        confirmationModal.classList.remove('show'); // Hide the modal
        });


      document.querySelector('.girl-back-button').addEventListener('click', function() {
        const girlSidebar = document.querySelector('.girl-sidebar');
        const boardSidebar = document.querySelector('.board-sidebar');
        const newLeftSection = document.querySelector('.girl-left-section');
        const LeftSection = document.querySelector('.new-left-section');
        
        // Hide the board sidebar
        girlSidebar.classList.add('hidden');

        
        // Show the menu sidebar
        boardSidebar.classList.remove('next');
        boardSidebar.classList.add('show');
        document.querySelectorAll('.girl-sidebar ul li').forEach(item => {
            item.classList.add('disabled');
        });
        setTimeout(() => {
            document.querySelector('.girl-menu-battery-container').style.visibility = 'hidden';
            newLeftSection.classList.remove('active');
            girlSidebar.classList.remove('hidden');
            document.querySelectorAll('.board-sidebar ul li').forEach(item => {
                item.classList.remove('disabled');
            });
            girlSidebar.classList.remove('show')
        }, 1000)
        

      });

    const genderSelect = document.getElementById('gender'); // Replace with your actual gender select element
    const cupSizeInput = document.getElementById('cup-size'); // Replace with your actual cup size input element
    const dressSizeInput = document.getElementById('dress-size'); // Replace with your actual dress size input element

    genderSelect.addEventListener('change', function () {
        if (this.value === 'Male') { // Check if the selected value is 'male'
            cupSizeInput.value = ''; // Reset cup size
            dressSizeInput.value = ''; // Reset dress size
        }
    });

      const form = document.getElementById('submitForm');
      const submitButton = document.getElementById('submitButton');
      const confirmationInfoModal = document.querySelector('.confirm-modal'); // Assuming this is the class for your modal
      const waitModal = document.querySelector('.modal'); 
      const subBack = document.querySelector('.sub-back-button');
      const confirmSubmitButton = document.getElementById('confirmSubmit');
      const confirmCancelButton = document.getElementById('confirmCancel');
      
      let isSubmitting = false; // To track if the form is already being submitted
      
      form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting
    
        if (isSubmitting) {
            return; // Exit if already submitting
        }
    
        // Get values from the form
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const dob = document.getElementById('dob').value;
        const gender = document.getElementById('gender').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const instagram = document.getElementById('instagram').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const state = document.getElementById('state').value;
        const postalCode = document.getElementById('postalCode').value;
        const waistSize = document.getElementById('waistSize').value;
        const hipSize = document.getElementById('hipSize').value;
        const bustSize = document.getElementById('bustSize').value; // Always show bust size
        const cupSize = document.getElementById('cupSize').value;
        const dressSize = document.getElementById('dressSize').value;
        const height = document.getElementById('height').value;
        const shoeSize = document.getElementById('shoeSize').value;
        const hairColor = document.getElementById('hairColor').value;
        const message = document.getElementById('message').value;
    
        // Get image elements
        const headshots = document.getElementById('headshot').files;
        const fullBodyShots = document.getElementById('fullBodyShot').files;
    
        // Get additional address inputs
        const addressLine2 = document.getElementById('addressLine2').value;
        const apartmentNumber = document.getElementById('apartmentNumber').value;

        // Prepare the confirmation details
        let confirmationDetails = `
            <p style="text-align: left;"><strong>First Name:</strong> ${firstName}</p>
            <p style="text-align: left;"><strong>Last Name:</strong> ${lastName}</p>
            <p style="text-align: left;"><strong>Date of Birth:</strong> ${dob}</p>
            <p style="text-align: left;"><strong>Gender:</strong> ${gender}</p>
            <p style="text-align: left;"><strong>Email:</strong> ${email}</p>
            <p style="text-align: left;"><strong>Phone:</strong> ${phone}</p>
            <p style="text-align: left;"><strong>Instagram Handle:</strong> ${instagram}</p>
            <p style="text-align: left;"><strong>Address:</strong> ${address}${addressLine2 ? `, ${addressLine2}` : ''}${apartmentNumber ? `, Apt ${apartmentNumber}` : ''}, ${city}, ${state}, ${postalCode}</p>
            <p style="text-align: left;"><strong>Waist Size:</strong> ${waistSize}</p>
            <p style="text-align: left;"><strong>Hip Size:</strong> ${hipSize}</p>
            <p style="text-align: left;"><strong>Bust Size:</strong> ${bustSize}</p>
            ${cupSize ? `<p style="text-align: left;"><strong>Cup Size:</strong> ${cupSize}</p>` : ''}
            ${dressSize ? `<p style="text-align: left;"><strong>Dress Size:</strong> ${dressSize}</p>` : ''}
            <p style="text-align: left;"><strong>Height:</strong> ${height}</p>
            <p style="text-align: left;"><strong>Shoe Size:</strong> ${shoeSize}</p>
            <p style="text-align: left;"><strong>Hair Color:</strong> ${hairColor}</p>
            <p style="text-align: left;"><strong>Message:</strong> ${message}</p>
            <h4 style="text-align: center;">Headshots:</h4>
        `;
    
        // Append headshots
        for (const file of headshots) {
            confirmationDetails += `<img src="${URL.createObjectURL(file)}" alt="Headshot" style="width:100px;height:auto;"/>`;
        }
    
        confirmationDetails += `<h4 style="text-align: center;">Full Body Shots:</h4>`;
    
        // Append full body shots
        for (const file of fullBodyShots) {
            confirmationDetails += `<img src="${URL.createObjectURL(file)}" alt="Full Body Shot" style="width:100px;height:auto;"/>`;
        }
    
        // Display confirmation details in the modal
        document.getElementById('confirmation-details').innerHTML = confirmationDetails;
    
        // Show the modal
        confirmationInfoModal.classList.add('show');
    });
    
        // Confirm submission
        confirmSubmitButton.addEventListener('click', function () {
            // Hide the modal
            confirmationInfoModal.classList.remove('show');
            waitModal.classList.add('show');

            // Proceed with form submission
            isSubmitting = true; // Prevent further submissions
            form.submit(); // Submit the form
        });

        // Cancel submission
        confirmCancelButton.addEventListener('click', function () {
            // Hide the confirmation modal
            confirmationInfoModal.classList.remove('show');

            // Reset the isSubmitting flag
            isSubmitting = false;
            submitButton.disabled = false;
            subBack.classList.remove('disabled');
        });

    // Navigation functionality
    document.querySelectorAll('.menu-sidebar ul li').forEach(menuItem => {
        menuItem.addEventListener('click', function() {
            // Update the page and set the clicked menu item as active
            updatePage(menuItem);
            activeMenuItem = menuItem;
            currentlyHovering = null; // Clear current hover state on click
            updateHoveredState();

        });
    });

    // Add event listener to the 'board-button' instead of 'menu-option-3'
    document.getElementById('board-button').addEventListener('click', function() {
        const menuSidebar = document.querySelector('.menu-sidebar');
        const boardSidebar = document.querySelector('.board-sidebar');
        const newLeftSection = document.querySelector('.new-left-section');
        const FemaleMenuItem = document.querySelectorAll('.board-sidebar ul li')[0];

        console.log('Board button clicked. Adding hidden class.');
        boardSidebar.classList.add('show');
        menuSidebar.classList.add('hidden'); // Trigger the sidebar swipe out
        boardSidebar.classList.remove('hidden');

        newLeftSection.classList.add('active');
        // Disable all menu-sidebar options
        document.querySelectorAll('.menu-sidebar ul li').forEach(item => {
            item.classList.add('disabled');
        });

        setTimeout(() => {
            document.querySelector('.new-menu-battery-container').style.visibility = 'visible';
            document.querySelectorAll('.board-sidebar ul li').forEach(item => {
                item.classList.remove('disabled');
            });
            updatePage(FemaleMenuItem); // Automatically display the first page
            activeMenuItem = FemaleMenuItem
            currentlyHovering = null
            updateHoveredState(); // Apply hover effect to the first menu item

        }, 1000); // Show after 1 second

        // Show the new left section and shift the right section
        // Match this delay with the transition duration of the old left section
    });

    document.querySelectorAll('.board-sidebar ul li').forEach(menuItem => {
        menuItem.addEventListener('click', function() {
            // Update the page and set the clicked menu item as active
            updatePage(menuItem);
            activeMenuItem = menuItem;
            currentlyHovering = null; // Clear current hover state on click
            updateHoveredState();

            
            // Add back once there are models! 

        /*  if (menuItem.id === 'girl-page') {
                const girlSidebar = document.querySelector('.girl-sidebar');
                const boardSidebar = document.querySelector('.board-sidebar');
                const newLeftSection = document.querySelector('.girl-left-section');

                console.log('Menu option 3 clicked. Adding hidden class.');
                boardSidebar.classList.add('next'); // Trigger the sidebar swipe out
                girlSidebar.classList.remove('hidden');
                girlSidebar.classList.add('show')

                newLeftSection.classList.add('active');
                // Disable all menu-sidebar options
                document.querySelectorAll('.board-sidebar ul li').forEach(item => {
                    item.classList.add('disabled');
                });
                setTimeout(() => {
                    document.querySelector('.girl-menu-battery-container').style.visibility = 'visible';
                    document.querySelectorAll('.girl-sidebar ul li').forEach(item => {
                        item.classList.remove('disabled');
                    });
                  }, 1000); // Show after 1 second
                
                // Show the new left section and shift the right section

             // Match this delay with the transition duration of the old left section
            }   */
        });
    });

    document.querySelectorAll('.girl-sidebar ul li').forEach(menuItem => {
        menuItem.addEventListener('click', function() {
            // Update the page and set the clicked menu item as active
            updatePage(menuItem);
            activeMenuItem = menuItem;
            currentlyHovering = null; // Clear current hover state on click
            updateHoveredState();

            if (menuItem.id === 'girl-page') {
                const girlSidebar = document.querySelector('.girl-sidebar');
                const boardSidebar = document.querySelector('.board-sidebar');
                const newLeftSection = document.querySelector('.girl-left-section');

                console.log('Menu option 3 clicked. Adding hidden class.');
                boardSidebar.classList.add('next'); // Trigger the sidebar swipe out
                girlSidebar.classList.remove('hidden');

                newLeftSection.classList.add('active');
                // Disable all menu-sidebar options
                document.querySelectorAll('.board-sidebar ul li').forEach(item => {
                    item.classList.add('disabled');
                });
                setTimeout(() => {
                    document.querySelector('.girl-menu-battery-container').style.visibility = 'visible';
                    document.querySelectorAll('.girl-sidebar ul li').forEach(item => {
                        item.classList.remove('disabled');
                    });
                  }, 1000); // Show after 1 second
                
                // Show the new left section and shift the right section

             // Match this delay with the transition duration of the old left section
            }
        });
    });


    // Hover detection with delay to trigger page change
    document.querySelectorAll('.girl-sidebar ul li').forEach(menuItem => {
        menuItem.addEventListener('mouseenter', function() {
            clearTimeout(hoverTimeout);
            currentlyHovering = menuItem; // Update currently hovering

            hoverTimeout = setTimeout(() => {
                // Update the page and menu item
                updatePage(menuItem);
                activeMenuItem = menuItem;
                currentlyHovering = null;
                updateHoveredState();
            }, 500); // Set the delay for hovering here (0.5 seconds)
        });
        
        menuItem.addEventListener('mouseleave', function() {
            clearTimeout(hoverTimeout);

            // Delay before removing hover effect
            setTimeout(() => {
                // If the menu item being left is the currently hovering one, clear it
                if (currentlyHovering === menuItem) {
                    currentlyHovering = null;
                    updateHoveredState(); // Update hovered state when leaving
                }
            }, 200); // Adjust this delay as needed (0.2 seconds)
        });
    });

    document.querySelectorAll('.menu-sidebar ul li').forEach(menuItem => {
        menuItem.addEventListener('mouseenter', function() {
            clearTimeout(hoverTimeout);
            currentlyHovering = menuItem; // Update currently hovering

            hoverTimeout = setTimeout(() => {
                // Update the page and menu item
                updatePage(menuItem);
                activeMenuItem = menuItem;
                currentlyHovering = null;
                updateHoveredState();
            }, 500); // Set the delay for hovering here (0.5 seconds)
        });
        
        menuItem.addEventListener('mouseleave', function() {
            clearTimeout(hoverTimeout);

            // Delay before removing hover effect
            setTimeout(() => {
                // If the menu item being left is the currently hovering one, clear it
                if (currentlyHovering === menuItem) {
                    currentlyHovering = null;
                    updateHoveredState(); // Update hovered state when leaving
                }
            }, 200); // Adjust this delay as needed (0.2 seconds)
        });
    });

    document.querySelectorAll('.board-sidebar ul li').forEach(menuItem => {
        menuItem.addEventListener('mouseenter', function() {
            clearTimeout(hoverTimeout);
            currentlyHovering = menuItem; // Update currently hovering

            hoverTimeout = setTimeout(() => {
                // Update the page and menu item
                updatePage(menuItem);
                activeMenuItem = menuItem;
                currentlyHovering = null;
                updateHoveredState();
            }, 500); // Set the delay for hovering here (0.5 seconds)
        });
        
        menuItem.addEventListener('mouseleave', function() {
            clearTimeout(hoverTimeout);

            // Delay before removing hover effect
            setTimeout(() => {
                // If the menu item being left is the currently hovering one, clear it
                if (currentlyHovering === menuItem) {
                    currentlyHovering = null;
                    updateHoveredState(); // Update hovered state when leaving
                }
            }, 200); // Adjust this delay as needed (0.2 seconds)
        });
    });

    // Ensure active menu item is always highlighted if no other item is hovered
    setInterval(updateHoveredState, 100); // Adjust the interval time as needed

    // Photo slideshow functionality for page1
    const page1 = document.getElementById('page1');
    const slides = document.querySelectorAll('.slideshow-slide');
    const images = [
        'images/model2.jpg',
        'images/model1.jpg'
        // Add more images as needed
    ];

    let currentSlideIndex = 0;

    // Initialize slides with images only once
    function initializeSlides() {
        slides.forEach((slide, index) => {
            slide.style.backgroundImage = `url('${images[index]}')`;
            if (index === 0) {
                slide.classList.add('active');  // Show the first image
            } else {
                slide.classList.add('hidden');  // Hide all others initially
            }
        });
    }

    // Change the slide without altering the images
    function changeSlide() {
        const currentSlide = slides[currentSlideIndex];
        const nextSlideIndex = (currentSlideIndex + 1) % slides.length;
        const nextSlide = slides[nextSlideIndex];

        // Handle visibility and class transitions only
        nextSlide.classList.remove('hidden');
        nextSlide.classList.add('enter');

        // Start the slide transition
        setTimeout(() => {
            currentSlide.classList.add('leave');
            nextSlide.classList.remove('enter');
            nextSlide.classList.add('active');

            // Hide the previous slide after the transition ends
            setTimeout(() => {
                currentSlide.classList.add('hidden');
                currentSlide.classList.remove('active', 'leave');
            }, 1000); // Match the CSS transition duration
        }, 10); // Short delay to ensure transitions begin properly

        // Update the current slide index
        currentSlideIndex = nextSlideIndex;
    }

    // Initialize the slideshow only once
    initializeSlides();

    // Start the slideshow
    setInterval(changeSlide, 5000);
});
