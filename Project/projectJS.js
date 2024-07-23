function generatePrintableTable() {
    const printableTable = document.createElement('table');
    const originalTable = document.querySelector('table');

    // Copy the structure of the original table
    printableTable.innerHTML = originalTable.innerHTML;

    // Update the text content of the table cells with the input values
    const inputFields = document.querySelectorAll('table input[type="text"]');
    let cellIndex = 1; // Start from 1 to skip the header row
    inputFields.forEach(inputField => {
        const tableCell = printableTable.querySelectorAll('td')[cellIndex];
        tableCell.textContent = inputField.value;
        cellIndex++;
        if (cellIndex % 6 === 0) {
            cellIndex++; // skip to the next row after updating all columns for a day
        }
    });

    return printableTable;
}

function printMealPlan() {
    const emailInput = document.getElementById('email');
    const email = emailInput.value;
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    else {
        const printableTable = generatePrintableTable();

        // hide the original table
        const originalTable = document.querySelector('table');
        originalTable.style.display = 'none';

        // Append the printable table for printing
        document.body.appendChild(printableTable);

        // Print the meal plan
        window.print();

        // Remove the printable table after printing
        printableTable.remove();

        // Show the original table again
        originalTable.style.display = 'table';
    }
}

function clearPlanner() {
            // Clear all input fields for the meal plan
            const inputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea');
            inputs.forEach(input => input.value = '');
        }


let mealPlanNumber = 0;
function generateMealPlanPage() {
    // Validate the email address
    const emailInput = document.getElementById('email');
    const email = emailInput.value;

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const mealPlanContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Meal Plan</title>
           <link rel="stylesheet" type="text/css" href="styles.css">
        </head>
        <body>
            <h1>Your Meal Plan (#${++mealPlanNumber})</h1>
            <p>Name: ${document.getElementById("name").value}<br>
               Email: ${document.getElementById("email").value}<p>
            <table>
                <tr>
                    <th>Day</th>
                    <th>Breakfast</th>
                    <th>Snack</th>
                    <th>Lunch</th>
                    <th>Snack</th>
                    <th>Dinner</th>
                </tr>
                ${daysOfWeek.map(day => `
                    <tr>
                        <td>${day}</td>
                        <td>${document.getElementById(day.toLowerCase() + 'Breakfast').value}</td>
                        <td>${document.getElementById(day.toLowerCase() + 'Snack').value}</td>
                        <td>${document.getElementById(day.toLowerCase() + 'Lunch').value}</td>
                        <td>${document.getElementById(day.toLowerCase() + 'Snack2').value}</td>
                        <td>${document.getElementById(day.toLowerCase() + 'Dinner').value}</td>
                    </tr>
                `).join('')}
            </table>
        </body>
        </html>
    `;

    // Open a new window as a popup and write the styled meal plan content to it
    const mealPlanWindow = window.open('', 'MealPlanPage', 'width=800,height=600');
    mealPlanWindow.document.write(mealPlanContent);
}

function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}
