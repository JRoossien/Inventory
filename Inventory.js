var items : Transform[];
var maxItems : int = 12;
private var invDisplay:InventoryDisplay;
private var error:int = 0;
static var itemHolder : Transform;
public var collected = 0;
var pickupSound:AudioClip;

@script AddComponentMenu ("Inventory/Inventory")


function Awake () {
	itemHolder = gameObject.transform;
	
	invDisplay = GetComponent(InventoryDisplay);
	if (invDisplay == null) {
		Debug.LogError("No Inventory Display script found for " + transform.name);
	}
}

function AddItem(Item:Transform) {
	var newItems = new Array(items);
	
	newItems.Add(Item);
	items = newItems.ToBuiltin(Transform);
	
	if (invDisplay != null) {
		invDisplay.UpdateInventory();
		AudioSource.PlayClipAtPoint(pickupSound, transform.position);
	}
}


function RemoveItem(Item:Transform) {
	var newItems = new Array(items);
	var index = 0;
	var end = false;
	
	for (var i:Transform in newItems) {
		if (i == Item) {
			newItems.RemoveAt(index);
			end = true;
		}
		index++;
		
		if (end) {
			items = newItems.ToBuiltin(Transform);
			if (invDisplay != null) {
				invDisplay.UpdateInventory();
			}
			return;
		}
	}
}


function Drop(item) {
	if (item.canDrop) {
		var duplicate = false;
		if (item.amount == 1) {
		RemoveItem(item.transform);
		} else {
			item.amount -= 1;
			duplicate = true;
		}
		
		item.Drop(duplicate);
	} else {
		error = 1;
		yield WaitForSeconds(2.0);
		error = 0;
	}
}

function OnGUI(){
	if(error == 1) {
		if(GUI.Button (Rect (10, 10, 200, 30), "Can not drop this item.")) {
			error = 0;
		}
	}
}

public function getItems() {
	return items;
}