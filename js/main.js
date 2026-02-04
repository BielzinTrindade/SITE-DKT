window.addEventListener("load", () => {
    document.body.classList.remove("exit");
});

document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", e => {
        const href = link.getAttribute("href");
        if (!href || href.startsWith("#")) return;

        e.preventDefault();
        document.body.classList.add("exit");

        setTimeout(() => {
            window.location.href = href;
        }, 400);
    });
});
