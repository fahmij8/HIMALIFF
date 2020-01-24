const form = document.getElementById('this')
const isiNama = document.getElementById('Nama');
const isiEmail = document.getElementById('Email');
const isiJur = document.getElementById('Jurusan');

const mailNama = document.getElementById('NamaE');
const mailEm = document.getElementById('EmailE');
const mailPhone = document.getElementById('TelE');
const mailPesan = document.getElementById('MesE')
// Variable to hold request
var request;

function checkValue(){
    if (isiNama.value != "" && isiEmail.value != "" && isiJur.value != "") {
        sendData();
    } else {
        alert('Ada yang kurang!')
    }
}

function goToMail(){
    if (mailNama.value != "" && mailEm.value != "" && mailPhone.value != "" && mailPesan.value != "") {
        sendMail();
    } else {
        alert('Ada yang kurang!')
    }
}

// Bind to the submit event of our form
function sendData(){
    // Serialize the data in the form
    var serializedData = "Nama=" + isiNama.value + "&Email=" + isiEmail.value + "&Jurusan=" + isiJur.value;
    console.log(serializedData);
    request = $.ajax({
    // https://script.google.com/macros/s/AKfycbz7jy0nf-l6e16lnCgaLHJ8XBq6uglkTOf4UDvhp8VZyKseE4w/exec
        url: "https://script.google.com/macros/s/AKfycbyMtl0Qahibu3YB2mg6PyMr0Y5O7jEhZHcAMCHnQz0Z6aigdoY/exec",
        // type: "post",
        data: serializedData,
    });

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
        // Log a message to the console
        console.log("Hooray, it worked!");
        console.log(response);
        console.log(textStatus);
        console.log(jqXHR);
        //fungsi line liff
        liff.sendMessages([{
            'type': 'text',
            'text': "https://docs.google.com/spreadsheets/d/15E1dJcdYGDoYNiQleGWvj9eoUmmL9T9ii1bWDK0ssJI/edit#gid=0 <== Kuy check nama kamu!"
        }]).then(function() {
            window.alert('Sukses!\nSilahkan lihat room chatnya ya!');
        }).catch(function(error) {
            window.alert('Error sending message: ' + error);
        });
    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        console.error(
            "The following error occurred: "+
            textStatus, errorThrown
        );
    });
};

function sendMail() {
    var yourMessage = mailNama.value  + " \n" + mailEm.value  + "\n" + mailPhone.value  + "\n" + mailPesan.value ;
    var subject = "Ada pesan!";
    document.location.href = "mailto:fahmijabbar@upi.edu?subject="
        + encodeURIComponent(subject)
        + "&body=" + encodeURIComponent(yourMessage);
}