
(() => {

    const KEY = "ashwathiDanielGuest";

    // GET GUEST DETAILS
    const readGuest = () => {
        try {
            return JSON.parse(
                localStorage.getItem(KEY) || "null"
            );
        } catch (error) {
            return null;
        }
    };


    // PAGE 1: PERSONALIZED INVITATION

    const openButton = document.getElementById("openInvite");

    if (openButton) {

        openButton.addEventListener("click", () => {

            const name = document
                .getElementById("guestName")
                .value.trim();

            const address = document
                .getElementById("guestAddress")
                .value.trim();

            const error = document.getElementById("formError");

            if (!name || !address) {
                error.textContent =
                    "Please enter both your name and address.";
                return;
            }

            try {

                localStorage.setItem(
                    KEY,
                    JSON.stringify({ name, address })
                );

                window.location.href = "couple.html";

            } catch (error) {

                error.textContent =
                    "Unable to save details in this browser.";

            }

        });

    }


    // PAGE 2: DISPLAY GUEST DETAILS

    const note = document.getElementById("recipientNote");

    if (note) {

        const guest = readGuest();

        if (guest) {

            const name = document.createElement("strong");
            name.textContent =
                `A warm welcome to ${guest.name}`;

            const address = document.createElement("div");
            address.textContent = guest.address;

            note.append(name, address);

        }

    }


    // COUNTDOWN TO AUGUST 27, 2027

    const countdown = document.getElementById("countdown");

    if (countdown) {

        // Local midnight on August 27, 2027
        const target = new Date(
            2027, 7, 27, 0, 0, 0
        ).getTime();

        const updateCountdown = () => {

            const remaining = target - Date.now();

            if (remaining <= 0) {

                ["days", "hours", "minutes", "seconds"]
                    .forEach(id => {
                        document.getElementById(id).textContent = "0";
                    });

                document.getElementById("countdownCaption")
                    .textContent = "Today is the special day! ♡";

                return;
            }

            const values = {

                days: Math.floor(
                    remaining / 86400000
                ),

                hours: Math.floor(
                    (remaining % 86400000) / 3600000
                ),

                minutes: Math.floor(
                    (remaining % 3600000) / 60000
                ),

                seconds: Math.floor(
                    (remaining % 60000) / 1000
                )

            };

            Object.entries(values).forEach(([id, value]) => {

                document.getElementById(id).textContent =
                    String(value).padStart(2, "0");

            });

        };

        updateCountdown();

        window.setInterval(updateCountdown, 1000);

    }


    // RSVP FORM

    const rsvpForm = document.getElementById("rsvpForm");

    if (rsvpForm) {

        rsvpForm.addEventListener("submit", async event => {

            event.preventDefault();

            const name = document
                .getElementById("rsvpName")
                .value.trim();

            const attendance = document
                .getElementById("attendance").value;

            const guests = document
                .getElementById("guestCount").value;

            const message =
                `Wedding RSVP — Ashwathi & Daniel\n` +
                `Name: ${name}\n` +
                `Response: ${attendance}\n` +
                `Guests: ${guests}\n` +
                `Date: August 27, 2027\n` +
                `Venues: Velankanni Church and Tiruchendur Murugan Temple`;

            const status =
                document.getElementById("rsvpStatus");

            try {

                if (navigator.share) {

                    await navigator.share({
                        title: "Wedding RSVP",
                        text: message
                    });

                    status.textContent =
                        "Thank you! Your RSVP share sheet has opened. ♡";

                } else if (
                    navigator.clipboard &&
                    window.isSecureContext
                ) {

                    await navigator.clipboard.writeText(message);

                    status.textContent =
                        "RSVP copied! Paste and send it to the couple. ♡";

                } else {

                    status.textContent =
                        "Please share your RSVP with the couple directly.";

                }

            } catch (error) {

                if (error.name !== "AbortError") {

                    status.textContent =
                        "Unable to share. Please try again.";

                }

            }

        });

    }

})();
