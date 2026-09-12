chrome.storage.local.get(
    ["graveyard"],
    (result) => {

        const data =
            result.graveyard || [];

        renderAnalytics(data);

        renderGraveyard(data);

    });


/* =========================
   ANALYTICS
========================= */

function renderAnalytics(data) {

    let heaven = 0;
    let hell = 0;
    let limbo = 0;

    data.forEach(tab => {

        if (
            tab.destination &&
            tab.destination.includes("HEAVEN")
        ) {
            heaven++;
        }

        else if (
            tab.destination &&
            tab.destination.includes("HELL")
        ) {
            hell++;
        }

        else {
            limbo++;
        }

    });

    let tragic = null;

    data.forEach(tab => {

        if (
            !tragic ||
            tab.age < tragic.age
        ) {
            tragic = tab;
        }

    });

    document
        .getElementById("analytics")
        .innerHTML = `

    <h1>
     Ministry of Tab Affairs
    </h1>

    <h3>
    Official Census Report
    </h3>

    <p>
    Total Deceased Citizens:
    ${data.length}
    </p>

    <p>
    Most Tragic Loss:
    ${tragic ? tragic.title : "None"}
    </p>

    <p>
     Heaven Admissions:
    ${heaven}
    </p>

    <p>
     Hell Deportations:
    ${hell}
    </p>

    <p>
     Limbo Backlog:
    ${limbo}
    </p>

    <h2>
     NATIONAL TAB CRISIS
    </h2>

    <hr>

    `;
}

/* =========================
   GRAVEYARD
========================= */

function renderGraveyard(data) {

    const container =
        document.getElementById(
            "graveyard"
        );

    data.reverse();

    data.forEach(tab => {

        const card =
            document.createElement(
                "div"
            );

        card.className = "card";

        card.innerHTML = `

        <h2> ${tab.title}</h2>

        <p>
        <b>Cause:</b>
        ${tab.cause}
        </p>

        <p>
        <b>Destination:</b>
        ${tab.destination}
        </p>

        <p>
        <b>Reborn As:</b>
        ${tab.reincarnation}
        </p>

        <p>
        <b>Obituary:</b>
        ${tab.obituary}
        </p>

        <p>
        <b>Lifespan:</b>
        ${tab.age}s
        </p>

        <button class="respectBtn">
        F Pay Respect
        </button>

        <button class="musicBtn">
         Funeral Music
        </button>

        <button
class="pdfBtn"
data-title="${tab.title}"
data-cause="${tab.cause}"
data-destination="${tab.destination}"
data-age="${tab.age}">
 Death Certificate
</button>

        <hr>

        `;

        container.appendChild(card);
        card.addEventListener("click", () => {
            openFuneral(tab);
        });
    });

    setupButtons();

}


/* =========================
   BUTTONS
========================= */

function setupButtons() {

    document
        .querySelectorAll(".respectBtn")
        .forEach(btn => {

            btn.addEventListener("click", (e) => {

                e.stopPropagation();

                btn.textContent =
                    " Respect Paid";

            });

        });

    document
        .querySelectorAll(".musicBtn")
        .forEach(btn => {

            btn.addEventListener("click", (e) => {

                e.stopPropagation();

                const music =
                    document.getElementById("music");

                if (music) {

                    music.currentTime = 0;

                    music.play();

                }

            });

        });

    document
        .querySelectorAll(".pdfBtn")
        .forEach(btn => {

            btn.addEventListener("click", (e) => {

                e.stopPropagation();

                generateCertificate(btn);

            });

        });

}


const musicBtns =
    document.querySelectorAll(".musicBtn");

musicBtns.forEach(btn => {

    btn.addEventListener("click", function () {

        const music =
            document.getElementById("music");

        if (music) {

            music.play();

        } else {

            alert("Funeral music not found");

        }

    });

});


document
    .querySelectorAll(".pdfBtn")
    .forEach(btn => {

        btn.addEventListener(
            "click",
            () => {

                generateCertificate(btn);

            });

    });

function openFuneral(tab) {

    const modal =
        document.getElementById(
            "funeralModal"
        );

    const content =
        document.getElementById(
            "memorialContent"
        );

    content.innerHTML = `

    <h2>${tab.title}</h2>

    <p>
    Cause of Death:
    ${tab.cause}
    </p>

    <p>
    Destination:
    ${tab.destination}
    </p>

    <p>
    Reincarnated As:
    ${tab.reincarnation}
    </p>

    <h3>
    "${tab.obituary}"
    </h3>

    <button id="payRespect">
 Press F To Pay Respects
</button>
    `;

    modal.style.display =
        "block";
    document
        .getElementById("payRespect")
        .addEventListener("click", () => {

            document
                .getElementById("payRespect")
                .innerText =
                " Respect Paid";

        });
}
document.addEventListener(
    "click",
    (e) => {

        if (
            e.target.id === "closeModal"
        ) {

            document
                .getElementById(
                    "funeralModal"
                )
                .style.display = "none";

        }

    });
function generateCertificate(btn) {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();
    doc.setDrawColor(0, 0, 0);

    doc.rect(
        10,
        10,
        190,
        277
    );

    const title =
        btn.dataset.title;

    const cause =
        btn.dataset.cause;

    const destination =
        btn.dataset.destination;

    const age =
        btn.dataset.age;

    const certNo =
        "TAB-" +
        Math.floor(
            Math.random() * 99999
        );

    const today =
        new Date()
            .toLocaleDateString();

    /* HEADER */

    doc.setFontSize(18);

    doc.text(
        "REPUBLIC OF THE INTERNET",
        40,
        20
    );

    doc.setFontSize(14);

    doc.text(
        "MINISTRY OF TAB AFFAIRS",
        55,
        30
    );

    doc.text(
        "DEPARTMENT OF DIGITAL AFTERLIFE",
        35,
        38
    );

    doc.line(
        15,
        45,
        195,
        45
    );

    doc.setFontSize(20);

    doc.text(
        "CERTIFICATE OF TAB DEATH",
        35,
        60
    );

    /* DETAILS */

    doc.setFontSize(12);

    doc.text(
        `Registration No: ${certNo}`,
        20,
        80
    );

    doc.text(
        `Date Registered: ${today}`,
        20,
        90
    );

    doc.line(
        20,
        95,
        190,
        95
    );

    doc.text(
        `Name of Deceased Tab:`,
        20,
        110
    );

    doc.text(
        title,
        90,
        110
    );

    doc.text(
        `Cause of Death:`,
        20,
        125
    );

    doc.text(
        cause,
        90,
        125
    );

    doc.text(
        `Place of Death:`,
        20,
        140
    );

    doc.text(
        "Google Chrome",
        90,
        140
    );

    doc.text(
        `Age at Death:`,
        20,
        155
    );

    doc.text(
        `${age} seconds`,
        90,
        155
    );

    doc.text(
        `Final Destination:`,
        20,
        170
    );

    doc.text(
        destination,
        90,
        170
    );

    doc.text(
        `Reincarnation Status:`,
        20,
        185
    );

    doc.text(
        "Learn React Again",
        90,
        185
    );

    /* REMARKS */

    doc.line(
        20,
        195,
        190,
        195
    );

    doc.text(
        "OFFICIAL REMARKS",
        20,
        210
    );

    doc.text(
        "Opened with hope. Closed with uncertainty.",
        20,
        220
    );

    /* RED STAMP */

    doc.setTextColor(
        220,
        0,
        0
    );

    doc.setFontSize(28);

    doc.text(
        "DECEASED",
        115,
        245,
        {
            angle: -20
        }
    );

    doc.setTextColor(
        0,
        0,
        0
    );

    /* SIGNATURE */

    doc.setFontSize(12);

    doc.text(
        "R. Cacheman",
        130,
        270
    );

    doc.text(
        "Chief Registrar",
        130,
        278
    );

    doc.text(
        "Ministry of Tab Affairs",
        130,
        286
    );

    /* WARNING */

    doc.setFontSize(8);

    doc.text(
        "Unauthorized resurrection of browser tabs",
        20,
        275
    );

    doc.text(
        "is punishable under the Digital Afterlife Act 2026.",
        20,
        282
    );
    doc.setFontSize(10);

    doc.text(
        "AI Mortality Board Verified",
        20,
        250
    );

    doc.text(
        "Document ID: " + certNo,
        20,
        258
    );
    doc.save(
        `${title}-Death-Certificate.pdf`
    );

}

document.addEventListener(
    "keydown",
    (e) => {

        if (
            e.key.toLowerCase() === "f"
        ) {

            const btn =
                document.getElementById(
                    "payRespect"
                );

            if (btn) {

                btn.innerText =
                    " Respect Paid";

            }

        }

    });