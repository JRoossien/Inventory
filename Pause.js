#pragma strict
#pragma downcast

var pause = true;

var disableMouseLook = true;
var player : Transform;
var cam : Transform;

var lockTheCursor = true;

private var lookAround1 : Behaviour;
private var lookAround2 : Behaviour;

@script AddComponentMenu ("Inventory/Other/Pause")


function Awake () {

	if (disableMouseLook == true) {
		if (player != null && cam != null) {
			if (player.GetComponent("MouseLook") != null && cam.GetComponent("MouseLook") != null) {
				lookAround1 = player.GetComponent("MouseLook");
				lookAround2 = cam.GetComponent("MouseLook");
			} else {
				Debug.LogError("No MouseLook script found.");
				disableMouseLook = false;
			}
		} else {
			disableMouseLook = false;
		}
	}
}

function PauseGame (pauseGame:boolean) {
	if (lockTheCursor == true) {
		if (pauseGame == true) {
			Screen.lockCursor = false;
		} else {
			Screen.lockCursor = true;
		}
	}
	
	if (pause == true) {
		if (pauseGame == true) {
			Time.timeScale = 0.0;
			Time.fixedDeltaTime = 0.02 * Time.timeScale;
		} else {
			Time.timeScale = 1.0;
			Time.fixedDeltaTime = 0.02 * Time.timeScale;
		}
	}
	
	if (disableMouseLook == true) {
		if (player != null && cam != null) {
			if (pauseGame == true) {
				lookAround1.enabled = false;
				lookAround2.enabled = false;
			} else {
				lookAround1.enabled = true;
				lookAround2.enabled = true;
			}
		}
	}
}