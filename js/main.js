(() => {
  // navigatie
  const $mainNav = document.getElementById("mainNav");

  for (const navigatie of mainNav) {
    const link = document.createElement("a");
    link.textContent = navigatie.name;
    link.href = navigatie.link;

    if (navigatie.type === "external") {
      link.target = "_blank";
    }

    $mainNav.appendChild(link);
  }

  // countdown
  const $countDown = document.getElementById("countDown");
  const countDownDate = new Date(countDown);

  function adjustCountdown() {
    const diff = countDownDate - new Date().getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    $countDown.innerHTML = `
    <div class="countDownVariables">
    ${days}days ${hours}h ${minutes}m ${seconds}s
    </div>
    <div class="countDown-text">till next edition</div>`;
  }
  setInterval(adjustCountdown, 1000);
  adjustCountdown();

  // modals
  const $eventModal = document.getElementById("eventModal");

  function formatDateTime(start, end) {
    const startDate = new Date(start).toLocaleString();
    const endDate = new Date(end).toLocaleString();
    return `${startDate} - ${endDate}`;
  }
  function getHTMLForLineUp(lineUp) {
    let html = "";
    for (const card of lineUp) {
      html += `
        <div class="eventBox" id="${card.id}">
          <img src="${card.event.image}" alt="${card.event.name}">
          <h2>${card.event.name}</h2>
          <p>${card.stage} | ${formatDateTime(card.start, card.end)}</p>
        </div>
      `;
    }
    return html;
  }

  $eventModal.innerHTML = getHTMLForLineUp(lineUp);

  // eventmodal
  for (const card of lineUp) {
    const eventListener = document.getElementById(card.id);
    eventListener.addEventListener("click", () => {
      showCardDetails(card);
    });
  }

  // Modal details
  const $modalDetail = document.getElementById("modal-detail");
  function showCardDetails(details) {
    $modalDetail.innerHTML = `
    <div class="modalContent">
      <div class="modalMain">
        <div class="modalImage">
          <img src="${details.event.image}" alt="${details.event.name}">
        </div>
        <div class="modalInfo">
          <p>${details.stage} | ${formatDateTime(details.start, details.end)}
          </p>
            <h2>${details.event.name}
            </h2>
            <div class=ModalSocials">
                  ${
                    details.event.socials.instagram
                      ? `<a href="${details.event.socials.instagram}" target="_blank">instagram
                      </a>`
                      : ""
                  }
                  ${
                    details.event.socials.twitter
                      ? `<a href="${details.event.socials.twitter}" target="_blank">twitter
                      </a>`
                      : ""
                  }
                  ${
                    details.event.socials.website
                      ? `<a href="${details.event.socials.website}" target="_blank">website
                      </a>`
                      : ""
                  }
                  ${
                    details.event.socials.youtube
                      ? `<a href="${details.event.socials.youtube}" target="_blank">youtube
                      </a>`
                      : ""
                  }
                </div>
            <p>${details.event.description}
            </p>
            <button id="modalClose" class="modal-close">X
            </button>
          </div>
        </div>
      </div>
`;
    // modal visible
    $modalDetail.classList.add("visible");
  }

  // hide modal
  $modalDetail.addEventListener("click", () => {
    $modalDetail.classList.remove("visible");
  });
})();
