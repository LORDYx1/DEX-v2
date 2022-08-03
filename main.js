Moralis.initialize("xOEUam3UtPpBXxU732DW9VfWvd51LfHxtvZR9inK"); // Application id from moralis.io
Moralis.serverURL = "https://pwds3bdktutp.usemoralis.com:2053/server"; //Server url from moralis.io

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

document.getElementById("login_button").onclick = login;