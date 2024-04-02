function kjopBilletter() {
    const antallOK= validerAntall($("#antall").val());
    const fornavnOK = validerFornavn($("#fornavn").val());
    const etternavnOK = validerEtternavn($("#etternavn").val());
    const telefonnrOK = validerTelefonnr($("#telefonnr").val());
    const emailOK = validerEmail($("#email").val());

    if (antallOK && fornavnOK && etternavnOK && telefonnrOK && emailOK) {
        const billett = {
            film: $("#film").val(),
            antall: $("#antall").val(),
            fornavn: $("#fornavn").val(),
            etternavn: $("#etternavn").val(),
            telefonnr: $("#telefonnr").val(),
            email: $("#email").val(),
        }

        $.post("/lagre", billett, function () {
            hentAlle();

            $("#film").val("");
            $("#antall").val("");
            $("#fornavn").val("");
            $("#etternavn").val("");
            $("#telefonnr").val("");
            $("#email").val("");
        });
    }
}

function hentAlle(){
    $.get("/hentAlle", function (billetter){
        formaterData(billetter);
    });
}

function validerFilm() {
    const film = $("#film").val();

    if (!film || film === "") {
        $("#feilFilm").html("Vennligst velg en film");
        return false;
    } else if (film !== "Black Widow" && film !== "Avengers Endgame" && film !== "Scarlet Witch") {
        $("#feilFilm").html("Vennligst velg en gyldig film");
        return false;
    } else {
        $("#feilFilm").html(""); // Fjerner feilmeldingen hvis en gyldig film er valgt
        return true;
    }
}






function validerAntall() {
    var antall = document.getElementById('antall').value;
    if (!antall) {
        $("#feilAntall").html("Du må skrive inn antall");
        return false;
    } else {
        $("#feilAntall").html("");
        return true;
    }
}

function validerFornavn(fornavn){
    const  regexp = /^[a-zA-ZæøåÆØÅ. \-]{2,20}$/;
    const ok = regexp.test(fornavn);
    if(!ok){
        $("#feilFornavn").html("Navnet må bestå av 2 til 20 bokstaver");
        return false;
    }
    else{
        $("#feilFornavn").html("");
        return true;
    }
}

function validerEtternavn(etternavn){
    const  regexp = /^[a-zA-ZæøåÆØÅ. \-]{2,20}$/;
    const ok = regexp.test(etternavn);
    if(!ok){
        $("#feilEtternavn").html("Navnet må bestå av 2 til 20 bokstaver");
        return false;
    }
    else{
        $("#feilEtternavn").html("");
        return true;
    }
}

function validerTelefonnr(telefonnr){
    const regexp = /^[0-9+()#. \s-]{6,20}$/;
    const ok = regexp.test(telefonnr);
    if(!ok){
        $("#feilTelefonnr").html("Ugyldig telefonr");
        return false;
    }
    else{
        $("#feilTelefonnr").html("");
        return true;
    }
}

function validerEmail(email){
    const regexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const ok = regexp.test(email);
    if(!ok){
        $("#feilEmail").html("Ugyldig email");
        return false;
    }
    else{
        $("#feilEmail").html("");
        return true;
    }
}

function formaterData(billetter) {
    let ut = "<table class='table table-striped'><tr>" +
        "<th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnr</th><th>Email</th>" +
        "</tr>";

    for (const enBillett of billetter) {
        ut += "<tr>";
        ut += "<td>" + enBillett.film + "</td><td>" + enBillett.antall + "</td><td>" + enBillett.fornavn + "</td><td>" + enBillett.etternavn + "</td><td>" + enBillett.telefonnr + "</td><td>" + enBillett.email + "</td>";
        ut += "</tr>";
    }
    ut += "</table>"; 
    $("#billettRegister").html(ut);
}

function slettBilletter() {
    $.get("/slettAlle", function(){
        hentAlle();
    });
}



