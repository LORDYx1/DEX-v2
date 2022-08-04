Moralis.initialize("xOEUam3UtPpBXxU732DW9VfWvd51LfHxtvZR9inK"); // Application id from moralis.io
Moralis.serverURL = "https://pwds3bdktutp.usemoralis.com:2053/server"; //Server url from moralis.io

async function init() {
    await Moralis.initPlugins();
    await Moralis.enable();
    await listAvailableTokens();
}

async function listAvailableTokens() {
    const result = await Moralis.Plugins.oneInch.getSupportedTokens({
      chain: "eth", // The blockchain you want to use (eth/bsc/polygon)
    });
    tokens = result.tokens;
    let parent = document.getElementById("token_list");
    for (const address in tokens) {
      let token = tokens[address];
      let div = document.createElement("div");
      div.setAttribute("data-address", address);
      div.className = "token_row";
      let html = `
          <img class="token_list_img" src="${token.logoURI}">
          <span class="token_list_text">${token.symbol}</span>
          `;
      div.innerHTML = html;
      div.onclick = () => {
        selectToken(address);
      };
      parent.appendChild(div);
    }
}

async function login() {
    try {
        currentUser = Moralis.user.current();
        if(!currentUser){
            currentUser = await Moralis.Web3.authenticate();
        }
    } catch (error) {
        console.log(error);
    }
}

function openModal(){
    document.getElementById("token_modal").style.display = "block";
}

function closeModal(){
    document.getElementById("token_modal").style.display = "none";
}

init();

document.getElementById("modal_close").onclick = closeModal;
document.getElementById("from_token_select").onclick = openModal;
document.getElementById("login_button").onclick = login;