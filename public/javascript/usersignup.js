
//Similar to Module 14 code 
async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-usersignup').value.trim();
    const email = document.querySelector('#email-usersignup').value.trim();
    const password = document.querySelector('#password-usersignup').value.trim();
  
    if (username && email && password) {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          username,
          password,
          email
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      // check the response status
      if (response.ok) {
        console.log('success');
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
}
  
document.querySelector('.usersignup-form').addEventListener('submit', signupFormHandler);