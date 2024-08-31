let tabToggle = false, resToggle = false, runeToggle = false, cycles = 0, res = 1;
document.addEventListener("keydown", k => {
    if (k.code === "Backslash") tabToggle = !tabToggle;
    if (k.code === "BracketRight") resToggle = !resToggle;
    if (k.code === "BracketLeft") runeToggle = !runeToggle;
});
function buyStuff() {
    if (res > 200) res = 1;
    const reDom = document.getElementById("res" + res);
    if (resToggle && !reDom.classList.contains("researchMaxed")) reDom.click(); 
    cycles++;
    res++;
    for (let i = 5; i > 0; i--) {
        document.getElementById("upgrades" + i).click();
        document.getElementById("buycrystalupgrade" + i).click();
    }
    for (let i = 10; i > 0; i--) {
        document.getElementById("buyConstantUpgrade" + i).click();
    }
    for (let i = 1; i < 8; i++) {
        document.getElementById("enhancetalisman" + i).click();
    }
    for (let i = 1; i < 8; i++) {
        document.getElementById("leveluptalisman" + i).click();
    }
    const choices = [];
    document.getElementById("offeringone").click();
    for (let i = 7; i > 0; i--) {
        const xp = Number(document.getElementById("rune" + i + "exp").innerText.split(" ")[2]?.replace(/,/g, ""));
        if (!isNaN(xp)) choices.push({id: "activaterune" + i, "xp": xp});
    }
    choices.sort((a,b) => a.xp - b.xp);
    if (runeToggle && choices.length > 0) document.getElementById(choices[0].id).click();
    if (tabToggle && cycles === 1) document.getElementById("buildingstab").click();
    document.getElementById("particle100k").click();
    Object.values(document.getElementsByClassName("buildingPurchaseBtnAvailable")).reverse().forEach(e => e.click());
    const antStuff = ["antUpgradeBtnAvailable", "antTierBtnAvailable"];
    if (tabToggle && cycles === 5) document.getElementById("anttab").click();
    antStuff.forEach(a => Object.values(document.getElementsByClassName(a)).reverse().forEach(e => e.click()));
    if (cycles > 10) cycles = 0;
}
setInterval(buyStuff, 10);