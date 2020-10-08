function auth(user, password){
    if(typeof user != 'string' || typeof password !== 'string'){
        return false;
    }
    if(!user || !password){
        return false;
    }
    if(user.length <= 0 || password.length <= 0){
        return false;
    }
    return true;
}

async function loginToServer(url, method, data){
    method = method.toUpperCase();
    const response = await fetch(url, {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(data => data.json())
    .catch(err => console.log(err));
    return response;
};

function logsWithAlert(data){
    if(!data.success){
        return Swal.fire({
            title: 'Error!',
            text: data.data.message,
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: data.data.message,
        showConfirmButton: false,
        timer: 1500
    });
    window.location.href = '/home.html';
}

let btnLogin = document.getElementById('btn-login');
btnLogin.addEventListener('click', async function(event){
    let user = document.getElementById('user').value;
    let password = document.getElementById('password').value;
    if(!auth(user, password)){
        Swal.fire({
            title: 'Error!',
            text: 'Escribe tu usuario y/o contraseña!!',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
        return;
    }
    try {
        let url = 'http://localhost:3000/api/user/login';
        let response = await loginToServer(url, 'POST', {user, password});
        logsWithAlert(response);
    } catch(err){
        console.log(err);
    }
    event.preventDefault();
});