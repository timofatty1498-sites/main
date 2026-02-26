

function colorWipe(color = "#c2c2c2ff", duration = 1000, direction = "bottom") {
  // Create the wipe element
  const wipe = document.createElement("div");
  wipe.style.position = "fixed";
  wipe.style.top = "0";
  wipe.style.left = "0";
  wipe.style.width = "100%";
  wipe.style.height = "100%";
  wipe.style.background = color;
  wipe.style.zIndex = "9999";
  wipe.style.transform = 
    direction === "left" ? "translateX(-100%)" :
    direction === "right" ? "translateX(100%)" :
    direction === "top" ? "translateY(-100%)" :
    "translateY(100%)";

  wipe.style.transition = `transform ${duration}ms ease-in-out`;

  document.body.appendChild(wipe);

  // Trigger the animation
  requestAnimationFrame(() => {
    wipe.style.transform = "translateX(0)";
  });

  // Remove after animation ends
  setTimeout(() => {
    wipe.style.transition = `transform ${duration}ms ease-in-out`;
    wipe.style.transform =
      direction === "left" ? "translateX(100%)" :
      direction === "right" ? "translateX(-100%)" :
      direction === "top" ? "translateY(100%)" :
      "translateY(-100%)";

    // Remove after animation completes
    setTimeout(() => wipe.remove(), duration);
  }, duration);
}

function redirectToUrl(url, delay) {
    colorWipe( "#c2c2c2ff", delay);
    colorWipe("#dbdbdbff", delay / 1)
    colorWipe("#ffffffff", delay / 2)
    setTimeout(() => {
       window.open(url, "_self") 
    }, delay - 250);
}

function redirectToUrlInstant(url) {
    window.open(url, "_self");
}

function handlePosts(data){
  console.log("[BLOGGER] RESPONDED! data: ", data);

  const posts = data.feed.entry;
  let container = document.getElementById("blog-container");
  let path = data.feed.entry

  if(!container) return;

  posts.forEach(post => {
    let card = document.createElement("div");
    card.id = "blog-cardV2";
    card.onclick = () => redirectToUrl(post.link.find(l => l.rel === "alternate").href,1000);

    let thumb = `https://picsum.photos/id/${Math.floor(Math.random() * 500)}/250/300`;
    if(post.media$thumbnail){
      thumb = post.media$thumbnail.url;
    }

    const title = post.title.$t;

    card.innerHTML = `
      <img src="${thumb}" id="blog-Card_THUMBV2" width="250" height="150">
      <h2>${title}</h2>
      <p>${post.summary ? post.summary.$t : "no summary available."}</p>
    `;

    container.append(card);
  });
  return true;
}
