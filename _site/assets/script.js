function resetCopyCodeButton(button) {
    button.innerText = "Code code";
}

function activateCopyCodeButton(button) {
    button.innerText = "Code Copied";
    // Reset in 5 seconds
    setTimeout(() => resetCopyCodeButton(button), 5e3);
}

document.addEventListener("DOMContentLoaded", () => {
    let copyCodeButtons = document.querySelectorAll("button.copy-code");
    copyCodeButtons.forEach(button => {
        button.addEventListener("click", _ => {
            let target = button.parentElement.querySelector("code");
            let code = target.innerText;
            let notCopied = false;
            if (navigator) {
                try {
                    navigator.clipboard.writeText(code);
                    activateCopyCodeButton(button)
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