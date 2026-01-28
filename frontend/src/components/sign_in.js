function showForm(formID){
    document.querySelectorAll(".form-box").forEach(form => {form.classList.remove("active");});
    document.getElementById(formID).classList.add("active");
}

function previewAvatar(event) {
    const file = event.target.files[0];
    const avatar = document.getElementById("avatarPreview");

    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            avatar.src = reader.result;
        };
        reader.readAsDataURL(file);
    }
}
