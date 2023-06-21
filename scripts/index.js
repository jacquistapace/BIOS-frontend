$(document).ready(function () {
    $('#txtPhone').intlTelInput({
        initialCountry: "PL"
    });
});

const sendMessage = (event) => {
    event.preventDefault();
    const selectedCountryData = $("#txtPhone").intlTelInput("getSelectedCountryData");
    const message = {
        firstName: event.target.firstName.value,
        email: event.target.email.value,
        lastName: event.target.lastName.value,
        company: event.target.company.value,
        country: {
            code: selectedCountryData.iso2,
            name: selectedCountryData.name
        },
        phone: event.target.phone.value,
        message: event.target.message.value,
    }
    console.log("🚀 ~ file: index.js:22 ~ sendMessage ~ message:", message)
    setModalInformation(message);
    $('#messageModal').modal('show')
}

const setModalInformation = (messageInfo) => {
    document.getElementById('message-modal-name').innerText = `${messageInfo.firstName} ${messageInfo.lastName}`;
    document.getElementById('message-modal-email').innerText = messageInfo.email;
    
    const selectedCountryFlag = document.querySelector('.iti__' + messageInfo.country.code);
    const clonedCountryFlag = selectedCountryFlag.cloneNode();
    clonedCountryFlag.style.display = 'inline-block';
    clonedCountryFlag.style.marginRight = '1rem';
    const messageModalPhoneElement = document.getElementById('message-modal-phone');
    messageModalPhoneElement.innerHTML = '';
    messageModalPhoneElement.appendChild(clonedCountryFlag);
    messageModalPhoneElement.append(`${messageInfo.country.name} - ${messageInfo.phone}`);
    
    document.getElementById('message-modal-message').innerText = messageInfo.message;
    
    const companyContainer = document.getElementById('message-modal-company-container');
    if (!messageInfo.company){
        companyContainer.style.display = 'none';
        return;
    }
    companyContainer.style.display = 'block';
    document.getElementById('message-modal-company').innerText = messageInfo.company;
}