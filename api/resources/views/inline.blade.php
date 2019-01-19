<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>InlineWeb - new page</title>
  <style>
    html, body{
      padding: 0;
      margin: 0;
      height: 100vh;
      overflow: hidden;
    }
    #iframe{
      border: 0;
      width: 100%;
      height: 100%;
      padding: 0;
      margin: 0;
    }
  </style>
  <script src="https://unpkg.com/lzma@2.3.2/src/lzma-d-min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/js-sha256/0.9.0/sha256.min.js"></script>
</head>
<body>
  <iframe id="iframe" sandbox="allow-scripts allow-forms allow-top-navigation allow-popups allow-modals allow-popups-to-escape-sandbox" src=""></iframe>
  <script>
    const iframe = document.querySelector("#iframe");
    const Base64ToArray = base64 => atob(base64).split("").map(v=>v.charCodeAt(0));
    const placeContents = _ => {
      let hash = window.location.hash.slice(1);
      if (hash.slice(0, 1) === "/") {
        [document.title, hash] = hash.slice(1).split(/\/(.+)/);
      }
      if(hash) {
        let frameScript = `
          <script>
            const Storage = {
              getItem: name => {
                return new Promise(function(resolve, reject) {
                  window.top.postMessage({call: "getItem", name: name}, "*");
                  const resolver = e => {
                    if(typeof e.data === "string"){
                      resolve(e.data);
                      window.removeEventListener("message", resolver);
                    }
                  }
                  window.addEventListener("message", resolver, false);
                });
              },
              setItem: (name, value) => {
                window.top.postMessage({call: "setItem", name: name, value: value}, "*");
              },
              removeItem: name => {
                window.top.postMessage({call: "removeItem", name: name}, "*");
              }
            }
          <\/script>
        `;
        let hashData = LZMA.decompress(Base64ToArray(hash)).replace(/\\n/g,"\\n");
        iframe.src = "data:text/html;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(frameScript+hashData)));
        window.windowHash = sha256(window.location.hash);
      }
    }

    placeContents();

    window.addEventListener("hashchange", placeContents);

    window.addEventListener("message", e => {
      if (e.data && typeof e.data == "object") {
        if (e.data.call === "getItem") {
          iframe.contentWindow.postMessage(
            localStorage.getItem(window.windowHash + e.data.name),
          "*");
        } else if (e.data.call === "setItem") {
          localStorage.setItem(window.windowHash + e.data.name, e.data.value);
        } else if (e.data.call === "removeItem") {
          localStorage.removeItem(window.windowHash + e.data.name);
        }
      }
    });
  </script>
</body>
</html>