// ==========================================
// COUNTDOWN — ANTÓNIO & SARIA
// ==========================================

const weddingDate = new Date("2026-09-14T10:00:00+02:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = document.getElementById("days");
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");

    if (!days || !hours || !minutes || !seconds) return;

    if (distance <= 0) {
        days.textContent = "00";
        hours.textContent = "00";
        minutes.textContent = "00";
        seconds.textContent = "00";
        return;
    }

    days.textContent = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    ).toString().padStart(2, "0");

    hours.textContent = Math.floor(
        (distance / (1000 * 60 * 60)) % 24
    ).toString().padStart(2, "0");

    minutes.textContent = Math.floor(
        (distance / (1000 * 60)) % 60
    ).toString().padStart(2, "0");

    seconds.textContent = Math.floor(
        (distance / 1000) % 60
    ).toString().padStart(2, "0");
}

updateCountdown();

setInterval(updateCountdown, 1000);
