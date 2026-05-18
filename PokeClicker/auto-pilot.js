let autoClick = false,
  autoMine = false,
  cSpeed = 100; // cSpeed is in ms for time between clicks
document.addEventListener('keydown', function(event) {
    // Numpad0 to toggle auto click
    if (event.code === "Numpad0") {
        event.preventDefault(); 
        autoClick = !autoClick; // toggle autoClick
        console.log(`autoClick set to: ${autoClick}`);
        if (autoClick) {
            new Audio("https://www.myinstants.com/media/sounds/nintendo-game-boy-startup.mp3").play();
        } else {
            new Audio("https://www.myinstants.com/media/sounds/pokemon-redblueyellow-run-away-sound-effect.mp3").play();
        }
    }
    // Numpad0 to toggle auto miner
    // currently only uses bombs when no objects are seen
    if (event.code === "Numpad1") {
        event.preventDefault();
        autoMine = !autoMine; // toggle autoMine
        console.log(`autoMine set to: ${autoMine}`);
        if (autoMine) {
            new Audio("https://www.myinstants.com/media/sounds/minecraft-creeper-fuse-1.mp3").play();
        } else {
            new Audio("https://www.myinstants.com/media/sounds/cave11_0QWMESM.mp3").play();
        }
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
        App.game.underground.tools.useTool(2,0,0);
    }
    if (App.game.underground.battery.charges === App.game.underground.battery.maxCharges) {
        App.game.underground.battery.discharge();
    }
}
const zeWorker = setInterval(() => { 
    if (autoClick) clickAttack();
    if (autoMine && App.game.underground.mine.itemsPartiallyFound === 0) bombsAhoy();
}, cSpeed);