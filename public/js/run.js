const newFormHandler = async event => {
  event.preventDefault()

  const name = document.querySelector('#run-name').value.trim()
  const distance = document.querySelector('#run-distance').value.trim()
  const time = document.querySelector('#run-time').value.trim()
  //const datetime = document.querySelector('#run-datetime').value.trim()

  if (name && distance && time) {
    const response = await fetch(`/api/runs`, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        distance_ran: distance,
        time_ran: time
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.ok) {
      document.location.replace('/run')
    } else {
      alert('Failed to create run')
    }
  }
}

const delButtonHandler = async event => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id')

    const response = await fetch(`/api/runs/${id}`, {
      method: 'DELETE'
    })

    if (response.ok) {
      document.location.replace('/run')
    } else {
      alert('Failed to delete run')
    }
  }
}

document
  .querySelector('.new-run-form')
  .addEventListener('submit', newFormHandler)

document.querySelector('.run-list').addEventListener('click', delButtonHandler)
