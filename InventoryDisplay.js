var invButton:KeyCode = KeyCode.I;

static var dragItem:Item;
private var dragItemPos:Vector2;
private var dragItemSize:Vector2;
var windowSize:Vector2 = Vector2(375, 162.5);
private var windowPos:Vector2 = Vector2 (Screen.width/2, Screen.height/2);
private var windowRect = Rect(200,200,108,130);
var iconSize:Vector2 = Vector2(60.0, 60.0);
var invSkin:GUISkin;
var offset:Vector2 = Vector2 (7, 12);
static var invOpen = false;
private var inv:Inventory;
private var updateList:Transform[];




@script AddComponentMenu ("Inventory/Inventory Display")
@script RequireComponent(Inventory)


function Awake() {
	windowPos = Vector2(Screen.width/2 - windowSize.x/2, Screen.height-100);
	windowRect = Rect (windowPos.x, windowPos.y, windowSize.x, windowSize.y);
	inv = GetComponent(Inventory);
}


function UpdateInventory() {
	updateList = inv.items;
}


function Update() {
	if (Input.GetKeyDown(KeyCode.Escape)) {
		ClearItem();
	}
	if (Input.GetMouseButtonDown(1)) {
		ClearItem();
	}
	
	if (Input.GetKeyDown(invButton)) {
		if (invOpen) {
			invOpen = false;
			gameObject.SendMessage ("ChangedState", false, SendMessageOptions.DontRequireReceiver);
			gameObject.SendMessage("PauseGame", false, SendMessageOptions.DontRequireReceiver);
		} else {
			invOpen = true;
			gameObject.SendMessage ("ChangedState", true, SendMessageOptions.DontRequireReceiver);
			gameObject.SendMessage("PauseGame", true, SendMessageOptions.DontRequireReceiver);
		}
	}
	
	if (dragItem != null) {
		dragItemPos.y = Screen.height-Input.mousePosition.y+15;
		dragItemPos.x = Input.mousePosition.x+15;
	}
}


function OnGUI() {
	GUI.skin = invSkin;
	if(dragItem != null) {
		GUI.depth = 3;
		GUI.Button(Rect(dragItemPos.x,dragItemPos.y,dragItemSize.x,dragItemSize.y),dragItem.itemIcon);
		GUI.depth = 0;
	}
	
	if (invOpen) {
		windowRect = GUI.Window(0, windowRect, DisplayInventory, "Inventory");
	}
}


function DisplayInventory(windowID:int) {

	var currentX = 0 + offset.x;
	var currentY = 18 + offset.y;
	
	for (var i:Transform in updateList) {
		var item = i.GetComponent(Item);
		
		if(GUI.Button(Rect(currentX,currentY,iconSize.x,iconSize.y),item.itemIcon)) {
			if (Event.current.button == 0) {
				if (i.name == "Phone") {
					i.GetComponent(PhoneUse).UseAction();
				} else {
					i.GetComponent(ItemAction).UseAction();
				}
			}
			else if (Event.current.button == 1) {
				inv.Drop(item);
			}
		}
		
		if(item.stackable) {
			GUI.Label(Rect(currentX, currentY, iconSize.x, iconSize.y), "" + item.amount, "Stacks");
		}
		
		currentX += iconSize.x;
		if(currentX + iconSize.x + offset.x > windowSize.x) {
			currentX = offset.x;
			currentY += iconSize.y;
			if(currentY + iconSize.y + offset.y > windowSize.y) {
				return;
			}
		}
	}
}


function ClearItem() {
	itemBeingDragged = null;
}