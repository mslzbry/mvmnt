const newFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#run-name').value.trim();
    const distance_ran = document.querySelector('#distance-ran').value.trim();
    const time_ran = document.querySelector('#time-ran').value.trim();

    if (name && distance_ran && time_ran) {
        const response = await fetch(`/api/runs`, {
            method: 'POST',
            body: JSON.stringify({ name, needed_funding, description }),
            headers: {
            'Content-Type': 'application/json',
            },
        });
    
        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to create run');
        }
        }
    };
    
const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/runs/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.replace('/profile');
    } else {
        alert('Failed to delete run');
    }
    }
};
    
document
    .querySelector('.new-run-form')
    .addEventListener('submit', newFormHandler);

document
    .querySelector('.run-list')
    .addEventListener('click', delButtonHandler);
    