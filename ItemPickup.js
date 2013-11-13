#pragma strict

var infoSkin : GUISkin;
var pickupButton : KeyCode = KeyCode.E;
var pickupDistance = 2f;
var isNote = false;

private var canPickUp = false;
private var item:Item;
private var inv:Inventory;
private var player:GameObject;
private var dist = 9999f;

@script AddComponentMenu ("Inventory/Items/Item Pickup")
@script RequireComponent(Item)


function Awake () {
	item = (GetComponent(Item));
	
	inv = FindObjectOfType(Inventory);
	player = GameObject.Find("Player");
	
	if (infoSkin == null) {
		infoSkin = Resources.Load("InfoSkin", GUISkin);
	}
}

function OnGUI () {
	GUI.skin = infoSkin;
	GUI.color = Color(1, 1, 1, 0.7);
	
	if (canPickUp == true) {
		if (transform.name.Length <= 7) {
			GUI.Box (Rect (Screen.width*0.5-(165*0.5), 200, 165, 22), "Press E to pick up " + transform.name + ".");
		} else {
			GUI.Box (Rect (Screen.width*0.5-(185*0.5), 200, 185, 22), "Press E to pick up " + transform.name + ".");
		}
	}
}

function Update () {
	if (player != null) {
		dist = Vector3.Distance(player.transform.position, transform.position);
		if (dist <= pickupDistance) {
			canPickUp = true;
		} else {
			canPickUp = false;
		}
		
		if (Input.GetKeyDown(pickupButton) && canPickUp == true) {
			item.Pickup();
			
			if (isNote) {
				inv.collected += 1;
				if (inv.collected >= 3) {
					Debug.Log("All notes collected!");
					if (GameObject.FindGameObjectWithTag("ExitClosed") != null) {
						Debug.Log("Exit opened!");
						Destroy(GameObject.FindGameObjectWithTag("ExitClosed"));
					}
				}
			}
		}
	}
}