const t={startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]"),body:document.querySelector("body")};let e=null;function r(){t.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}t.startBtn.addEventListener("click",(()=>{t.startBtn.setAttribute("disabled","true"),t.stopBtn.removeAttribute("disabled"),e=setInterval(r,1e3)})),t.stopBtn.addEventListener("click",(()=>{t.startBtn.removeAttribute("disabled"),t.stopBtn.setAttribute("disabled","true"),clearInterval(e)}));
//# sourceMappingURL=01-color-switcher.70ea173e.js.map
