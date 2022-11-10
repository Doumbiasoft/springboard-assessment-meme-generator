document.addEventListener("DOMContentLoaded", () => {
  const btClear = document.querySelector("#BtClear");
  const formSubmit = document.querySelector("#from_submit");
  const memeListe = document.querySelector("#iDrowMeme");
  const dataMemeList = JSON.parse(localStorage.getItem("dataMemeList") || "[]");

  btClear.addEventListener("click", () => {
    localStorage.clear("dataMemeList");
    window.location.reload();
  });

  loadLocalStorage();

  formSubmit.addEventListener("submit", (e) => {
    e.preventDefault();
    const urlImg = document.querySelector("#urlImg").value;
    const txtOnTop = document.querySelector("#txtOnTop").value;
    const txtOnBottom = document.querySelector("#txtOnBottom").value;

    const meme = {
      urlImage: urlImg,
      textOnTop: txtOnTop,
      textOnBottom: txtOnBottom,
    };

    var save = saveInLocalStorage(meme);
    if (save) {
      CreateListElement(meme.urlImage, meme.textOnTop, meme.textOnBottom);
    }
    formSubmit.reset();
  });

  memeListe.addEventListener("click", (e) => {
    const tagName = e.target.tagName;
    if (tagName === "BUTTON") {
      let memeUrl =
        e.target.parentNode.parentNode.childNodes[1].childNodes[0].childNodes[0].src;
          
      var remove = removeFromLocalStorage(memeUrl);
      if (remove) {
        e.target.parentNode.parentNode.parentNode.remove();
      }
    }
    if (tagName === "IMG") {
      let id=e.target.parentNode.id;
      html2canvas(document.getElementById(id),{
        allowTaint: true,
        useCORS: true
      }).then((canvas)=> {
        var link = document.createElement("a");
        link.download = `Meme-${id}.jpg`;
        link.href = canvas.toDataURL();
        link.target = "_blank";
        link.click();
      });
    }
  });

  function CreateListElement(url, textOnTop, textOnBottom) {
    const column = document.createElement("div");
    column.classList.add("column");

    const card = document.createElement("div");
    card.classList.add("card");

    const cardcontainer1 = document.createElement("div");
    cardcontainer1.classList.add("cardcontainer");

    const cardcontainer2 = document.createElement("div");
    cardcontainer2.classList.add("cardcontainer");

    const cardcontainer3 = document.createElement("div");
    cardcontainer3.classList.add("cardcontainer");

    const imgcontainer = document.createElement("div");
    imgcontainer.classList.add("imgcontainer");
    imgcontainer.setAttribute("id",new Date().getTime().toString()+Math.floor(Math.random()*1000));


    const imageMeme = document.createElement("img");
    imageMeme.style.width = "100%";
    imageMeme.alt = "Meme";
    imageMeme.src = url;

    const textTop = document.createElement("div");
    textTop.classList.add("top-text-center");
    textTop.innerHTML = textOnTop;

    const textBottom = document.createElement("div");
    textBottom.classList.add("bottom-text-center");
    textBottom.innerHTML = textOnBottom;

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.classList.add("removeButton");

    const downloadMessage = document.createElement("div");
    downloadMessage.classList.add("message-container");
    downloadMessage.innerHTML = "Click on the image to download!";
    downloadMessage.style.textAlign ="center";

    imgcontainer.appendChild(imageMeme);
    imgcontainer.appendChild(textTop);
    imgcontainer.appendChild(textBottom);
    cardcontainer2.appendChild(imgcontainer);
    cardcontainer3.appendChild(deleteButton);
    cardcontainer3.appendChild(downloadMessage);
    card.appendChild(cardcontainer1);
    card.appendChild(cardcontainer2);
    card.appendChild(cardcontainer3);
    column.appendChild(card);
    memeListe.appendChild(column);
  }
  function loadLocalStorage() {
    for (let meme of dataMemeList) {
      CreateListElement(meme.urlImage, meme.textOnTop, meme.textOnBottom);
    }
  }
  function removeFromLocalStorage(urlImage) {
    var i = dataMemeList.findIndex((meme) => meme.urlImage === urlImage);
    if (i !== -1) {
      dataMemeList.splice(i, 1);
      localStorage.setItem("dataMemeList", JSON.stringify(dataMemeList));
      return true;
    }
    return false;
  }
  function saveInLocalStorage(memeSave) {
    var i = dataMemeList.findIndex(
      (meme) =>
        meme.urlImage === memeSave.urlImage &&
        meme.textOnTop === memeSave.textOnTop &&
        meme.textBottom === memeSave.textBottom
    );
    if (i === -1) {
      dataMemeList.push(memeSave);
      localStorage.setItem("dataMemeList", JSON.stringify(dataMemeList));
      return true;
    }
    alert("This meme is already exist with the same text and image!");
    return false;
  }
});
