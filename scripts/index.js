$(document).ready(function () {
    $('#txtPhone').intlTelInput({
        initialCountry: "PL"
    });
});

const sendMessage = (event) => {
    event.preventDefault();
    console.log("🚀 ~ file: index.js:16 ~ sendMessage ~ message.event.target.phone.value:", event.target.phone.value)
    const message = {
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        company: event.target.company.value,
        phone: event.target.phone.value,
        message: event.target.message.value,
    }
    console.log("🚀 ~ file: index.js:15 ~ sendMessage ~ message:", message)
    console.log("🚀 ~ file: index.js:8 ~ sendMessage ~ event:", event);
}