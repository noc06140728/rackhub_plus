// check the TRIAL checkbox when clicked New button.
mc = document.querySelector("#main-content")
mc.addEventListener("DOMNodeInserted", function () {
    checkbox = document.querySelector("#form_rack_create_trial");
    checkbox.checked = true;
    fieldset = checkbox.parentElement;
    fieldset.style.backgroundColor = "#D6E0C0";
    fieldset.title = "rackhub+ によって自動的にチェックが付けられます。"
});
