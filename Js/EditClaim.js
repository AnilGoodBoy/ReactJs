function checkForm() {
    var pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;

    var EmployeeId = document.getElementById("EmployeeId").value;
    var ClaimNumber = document.getElementById("ClaimNumber").value;
    var ClaimProgram = document.getElementById("ClaimProgram").value;
    var ClaimStartDate = document.getElementById("ClaimStartDate").value;
    var ClaimEndDate = document.getElementById("ClaimEndDate").value;
    var ClaimType = document.getElementById("ClaimType").value;
    ClaimNumber = ClaimNumber.split('').join('');
    ClaimNumber = ClaimNumber.split('-').join('')

    if (/[^A-Za-z0-9 ]/.test(ClaimNumber)) {
        alert("Error: ClaimNumber must contain only alphanumeric");
        return false;
    }
    else if (ClaimNumber.length > 9) {
        alert("Error: ClaimNumber must contain maximum nine characters");
        return false;
    }
    else if (ClaimProgram.length > 20) {
        alert("Error: ClaimProgram must contain maximum 20 characters");
        return false;
    }
    else if (ClaimType == '') {
        alert("Error: ClaimType must contain maximum 20 characters");
        return false;
    }
    else if (ClaimProgram == '') {
        alert("Error: ClaimProgram cannot be blank");
        return false;
    }
    else if (!pattern.test(ClaimStartDate)) {
        alert("Error: ClaimStartDate invalid");
        return false;
    }
    else if (!pattern.test(ClaimEndDate)) {
        alert("Error: ClaimEndDate invalid");
        return false;
    }
    else {
        window.location = "index.html"; // Redirecting to other page.
        return false;
    }
    return true;
}
window.addFormat = function addFormat(f) {
    var r = /(\D+)/g,
        npa = '',
        nxx = '',
        last4 = '';
    f.value = f.value.replace(r, '').replace('-', '');
    npa = f.value.substr(0, 3);
    nxx = f.value.substr(3, 3);
    last4 = f.value.substr(6, 3);
    f.value = npa + '-' + nxx + '-' + last4;
    // $(f).val($(f).val().replace(/^(\d{3})(\d{3})(\d)+$/, "($1)$2-$3"));
}

$(function () {
    $(".datepicker").datepicker();
});
