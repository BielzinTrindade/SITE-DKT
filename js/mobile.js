function toggleDrawer() {
                var drawer = document.getElementById("drawer");
                drawer.style.display = drawer.style.display === "block" ? "none" : "block";
            }

            function navigate(url) {
            window.location.href = url;
            }