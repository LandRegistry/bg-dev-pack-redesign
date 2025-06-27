document.addEventListener("DOMContentLoaded", () => {
    let copyCodeButtons = document.querySelectorAll("button.copy-code");
    console.log(copyCodeButtons)
    copyCodeButtons.forEach(button => {
        button.addEventListener("click", _ => {
            let targetId = button.getAttribute("target");
            let target = document.getElementById(targetId);
            let code = target.innerText;
            let notCopied = false;
            if (navigator) {
                try {
                    navigator.clipboard.writeText(code);
                    button.innerText = "Code Copied";
                    setTimeout(() => button.innerText = "Copy Code", 5e3)
                } catch {
                    notCopied = true
                }

            } else { notCopied = true }

            if (notCopied) {
                alert("Your clipboard was not available. Copy failed.")
            }
        })
    })
})