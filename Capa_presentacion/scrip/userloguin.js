
function Loguin() {

    let usuario = $("#Email").val();
    let clave = $("#clave").val();

    if (usuario.length == 0 || clave.length == 0) {
        return Swal.fire("Mensaje De Advertencia", "Llene los campos vacios", "warning");
    }

    var data = {
        objeto: {
            correo: $("#Email").val(),
            clave: $("#clave").val()
        }
    }

    $.ajax({
        type: "POST",
        url: "loguin.aspx/Ingreso",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            var datos = $.parseJSON(msg.d);

            if (datos.length == 0) {
                Swal.fire("Mensaje De Error", 'Usuario y/o contrase\u00f1a incorrecta', "error");
            }

            $(datos).each(function () {

                let timerInterval
                Swal.fire({
                    title: 'Bienvendido al sistema !',
                    html: 'en un segundos le redigimos al sistema <b></b> ',
                    timer: 1000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading()
                        const b = Swal.getHtmlContainer().querySelector('b')
                        timerInterval = setInterval(() => {
                            b.textContent = Swal.getTimerLeft()
                        }, 100)
                    },
                    willClose: () => {
                        clearInterval(timerInterval)
                    }
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {

                        /* redireccionamiento */
                        window.location.href = 'index.aspx'
                    }
                })
            });

        },
        error: function (msg) {
            Swal.fire("Mensaje De Error", 'Usuario y/o contrase\u00f1a incorrecta', "error");

        }
    });

}