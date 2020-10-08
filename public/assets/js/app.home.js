async function connectToServer(url, method, data) {
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

async function selectFile() {
    const { value: file } = await Swal.fire({
        title: 'Selecconar excel',
        input: 'file',
        inputAttributes: {
            'accept': 'file/*',
            'aria-label': 'Upload your profile picture'
        }
    });
    if (file) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        Toast.fire({
            icon: 'success',
            title: 'Subiendo...'
        });
        // const reader = new FileReader()
        // reader.onload = (e) => {
        //     Swal.fire({
        //         title: 'Your uploaded picture',
        //         imageUrl: e.target.result,
        //         imageAlt: 'The uploaded picture'
        //     })
        // }
        let url = 'http://localhost:3000/api/file/upload';
        let method = 'post';
        let data = {file};
        // console.log(file);
        // reader.readAsDataURL(file);
        let response = await connectToServer(url, method, data);

    } else {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        Toast.fire({
            icon: 'error',
            title: 'Algo fue mal...'
        });
    }
}

let box = document.getElementById('btn-upload');
box.addEventListener('click', function (e) {
    selectFile();
});
