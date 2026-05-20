let autoClick = false, // default state for auto clicker
  autoMine = false, // default state for auto miner
  cSpeed = 100; // cSpeed is in ms for time between clicks
document.addEventListener('keydown', function(event) {
    // Numpad0 to toggle auto click
    if (event.code === "Numpad0") { // code if Numpad 0 is pressed
        event.preventDefault(); 
        autoClick = !autoClick; // toggle autoClick
        console.log(`autoClick set to: ${autoClick}`);
        if (autoClick) { // sounds to play when button is pressed depending if toggle is already on or not
            new Audio("https://www.myinstants.com/media/sounds/nintendo-game-boy-startup.mp3").play();
        } else {
            new Audio("https://www.myinstants.com/media/sounds/pokemon-redblueyellow-run-away-sound-effect.mp3").play();
        }
    }
    // Numpad1 to toggle auto miner
    // currently only uses bombs when no objects are seen
    if (event.code === "Numpad1") { // code if Numpad 1 is pressed
        event.preventDefault();
        autoMine = !autoMine; // toggle autoMine
        console.log(`autoMine set to: ${autoMine}`);
        if (autoMine) { // sounds to play when button is pressed depending if toggle is already on or not
            new Audio("https://www.myinstants.com/media/sounds/minecraft-creeper-fuse-1.mp3").play();
        } else {
            new Audio("https://www.myinstants.com/media/sounds/cave11_0QWMESM.mp3").play();
        }
    }
    // Numpad9 to fire nukeMine, should complete the whole board instantly using the chisle (assumes infinite cooldown on chisle)
    if (event.code === "Numpad9") { // code if Numpad 9 is pressed
        event.preventDefault();
        nukeMine();
    }
});
function clickAttack() {
    if (App.game.gameState === GameConstants.GameState.fighting) {
        Battle.clickAttack(); // wild battles
    } else if (App.game.gameState === GameConstants.GameState.gym) {
        GymBattle.clickAttack(); // gyms and elite 4
    } else if (App.game.gameState === GameConstants.GameState.dungeon) {
        DungeonRunner.handleInteraction(); // dungeons
    } else if (App.game.gameState === GameConstants.GameState.temporaryBattle) {
        TemporaryBattleBattle.clickAttack(); // event fights like rival/ash
    }
}
function bombsAhoy() {
    while (App.game.underground.mine.itemsPartiallyFound < App.game.underground.mine.itemsBuried) {
        App.game.underground.tools.useTool(2,0,0); // while items can be found, use bombs
    }
    if (App.game.underground.battery.charges === App.game.underground.battery.maxCharges) {
        App.game.underground.battery.discharge(); // if discharge is ready use it
    }
}
function nukeMine() {
    let lastKnownFound = App.game.underground.mine.itemsFound; // track last know found value
    for (let y = 0; y < App.game.underground.mine.height; y++) { // iterate mining grid
        for (let x = 0; x < App.game.underground.mine.width; x++) {
            const found = App.game.underground.mine.itemsFound; // get current found value
            if (found < lastKnownFound) return; // kill function if board resets
            lastKnownFound = App.game.underground.mine.itemsFound; // if function didn't die update last known found value
            for (let i = 0; i < 3; i++) { // iterate 3 times to click tile 3 times
                App.game.underground.tools.useTool(0, x, y); // clicking function giving it x and y coords for click 0 = chisle
            }
        }
    }
}
const zeWorker = setInterval(() => { // use functions on interval
    if (autoClick) clickAttack();
    if (autoMine && App.game.underground.mine.itemsPartiallyFound === 0) bombsAhoy();
}, cSpeed);